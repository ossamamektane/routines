// Native first step of the Routines migration. Timing and the single animated
// value mirror Bills' Sheet: the backdrop and panel move in lockstep. Task
// decisions stay in the existing model until that model is migrated separately.
// Travel is a full screen so a tall sheet never peeks into view on small phones.
import { useEffect, useRef, useState } from "react";
import { AccessibilityInfo, Animated, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const ICONS = { undo:"arrow-undo-outline", check:"checkmark", clock:"time-outline", fwd:"arrow-forward", ban:"ban-outline", pen:"pencil-outline" };
export default function TaskActionsSheet({ menu, dark, onChoose, onExited }) {
  const insets = useSafeAreaInsets();
  const { height, width } = useWindowDimensions();
  const anim = useRef(new Animated.Value(0)).current;
  const [reduce, setReduce] = useState(false);
  const visible = !!menu?.visible;
  const finishedRef = useRef(onExited);
  finishedRef.current = onExited;
  useEffect(() => {
    let active = true;
    AccessibilityInfo.isReduceMotionEnabled().then(v => { if(active) setReduce(v); }).catch(() => {});
    const sub = AccessibilityInfo.addEventListener("reduceMotionChanged", setReduce);
    return () => { active = false; sub?.remove(); };
  }, []);
  useEffect(() => {
    // stop() invalidates old completions when a new menu supersedes a closing one.
    anim.stopAnimation();
    if(reduce){ anim.setValue(visible ? 1 : 0); if(!visible) finishedRef.current(); return; }
    const movement = visible
      ? Animated.spring(anim, { toValue:1, useNativeDriver:true, damping:22, stiffness:220, mass:0.9 })
      : Animated.timing(anim, { toValue:0, duration:180, useNativeDriver:true });
    movement.start(({finished}) => { if(finished && !visible) finishedRef.current(); });
    return () => movement.stop();
  }, [visible, reduce, anim]);
  const fg = dark ? "#F5F5F7" : "#1D1D1F", muted = dark ? "#A1A1A6" : "#6E6E73";
  return (
    <Modal visible transparent animationType="none" onRequestClose={() => onChoose(null)} statusBarTranslucent navigationBarTranslucent>
      <View style={StyleSheet.absoluteFill}>
        <Animated.View style={[StyleSheet.absoluteFill,{backgroundColor:dark ? "rgba(0,0,0,0.60)" : "rgba(0,0,0,0.32)",opacity:anim}]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => onChoose(null)} accessibilityRole="button" accessibilityLabel={menu.cancelLabel} />
        </Animated.View>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.wrap} pointerEvents="box-none">
          <Animated.View accessibilityViewIsModal onAccessibilityEscape={() => onChoose(null)} style={[styles.sheet, {width:Math.min(width,640),maxHeight:height-insets.top-24,backgroundColor:dark ? "#1C1C1E" : "#FFFFFF",paddingBottom:Math.max(12,insets.bottom-20),transform:[{translateY:anim.interpolate({inputRange:[0,1],outputRange:[height,0]})}]}]}>
            <View style={[styles.grabber,{backgroundColor:dark ? "#424245" : "#E5E5E9"}]} />
            <ScrollView bounces={false} style={{flexShrink:1}} keyboardShouldPersistTaps="handled" contentContainerStyle={{paddingHorizontal:20}}>
              <Text accessibilityRole="header" style={[styles.title,{color:muted,borderBottomColor:dark?"#424245":"#D2D2D7"}]}>{menu.title}</Text>
              {menu.options.map(item => <Pressable key={item.key} disabled={!visible} onPress={() => onChoose(item.key)} accessibilityRole="button" style={({pressed})=>[styles.action,pressed&&{backgroundColor:dark?"#2C2C2E":"#F1F1F3"}]}>
                <View style={styles.icon} pointerEvents="none"><Ionicons name={ICONS[item.icon] || "ellipse-outline"} size={22} color={fg} /></View>
                <Text style={[styles.label,{color:fg}]}>{item.label}</Text>
              </Pressable>)}
            </ScrollView>
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}
const styles=StyleSheet.create({
  wrap:{flex:1,justifyContent:"flex-end",alignItems:"center"},
  sheet:{borderTopLeftRadius:28,borderTopRightRadius:28,paddingTop:8,overflow:"hidden"},
  grabber:{alignSelf:"center",width:38,height:5,borderRadius:3,marginBottom:10},
  title:{fontSize:15,fontWeight:"600",lineHeight:21,textAlign:"center",paddingVertical:12,marginBottom:4,borderBottomWidth:StyleSheet.hairlineWidth},
  action:{position:"relative",minHeight:48,justifyContent:"center",alignItems:"center",paddingVertical:10,paddingHorizontal:44,borderRadius:10},
  icon:{position:"absolute",left:12,top:0,bottom:0,justifyContent:"center",width:28,alignItems:"center"},
  label:{fontSize:17,lineHeight:23,textAlign:"center"},
});
