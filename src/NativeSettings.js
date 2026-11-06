// Native settings sheet: Bills' Modal + native-driver spring pattern. The page
// remains the settings/data source; actions return over the existing bridge.
import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Dimensions, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function NativeSettings({ visible, data, dark, onClose, onAction }) {
  const insets = useSafeAreaInsets();
  const [mounted, setMounted] = useState(visible);
  const [reduceMotion, setReduceMotion] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;
  const isVisible = useRef(visible); isVisible.current = visible;
  useEffect(() => {
    let live = true;
    AccessibilityInfo.isReduceMotionEnabled().then(v => { if (live) setReduceMotion(v); }).catch(() => {});
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion);
    return () => { live = false; sub && sub.remove(); };
  }, []);
  useEffect(() => {
    anim.stopAnimation();
    if (visible) {
      setMounted(true);
      if (reduceMotion) anim.setValue(1);
      else Animated.spring(anim, { toValue: 1, useNativeDriver: true, damping: 25, stiffness: 160, mass: 1 }).start();
    } else if (mounted) {
      if (reduceMotion) { anim.setValue(0); setMounted(false); }
      else Animated.timing(anim, { toValue: 0, duration: 260, useNativeDriver: true }).start(({ finished }) => { if (finished && !isVisible.current) setMounted(false); });
    }
  }, [visible, reduceMotion]);
  if (!mounted || !data) return null;
  const c = dark ? {bg:'#1C1C1E',surface:'#1D1D1F',strong:'#2C2C2E',text:'#F5F5F7',muted:'#A1A1A6',line:'#424245',scrim:'rgba(0,0,0,.6)',accent:'#F5F5F7',onAccent:'#000'}
    : {bg:'#FFFFFF',surface:'#F1F1F3',strong:'#E5E5E9',text:'#1D1D1F',muted:'#6E6E73',line:'#D2D2D7',scrim:'rgba(0,0,0,.32)',accent:'#1D1D1F',onAccent:'#fff'};
  const l = data.labels || {}, rtl = data.lang === 'ar';
  const closeLabel = {en:'Close',fr:'Fermer',ar:'إغلاق'}[data.lang] || 'Close';
  const txt = (value, style) => <Text style={[styles.text,{color:c.text,textAlign:'center'},style]}>{value}</Text>;
  const label = (value) => <Text style={[styles.label,{color:c.muted,textAlign:rtl?'right':'left'}]}>{value}</Text>;
  const segments = (items, selected, action) => (
    <View style={[styles.segment,{backgroundColor:c.strong,flexDirection:rtl?'row-reverse':'row'}]}>
      {items.map(([value,title]) => <Pressable key={value} onPress={()=>onAction(action,value)} accessibilityRole="button" accessibilityState={{selected:value===selected}}
        style={({pressed})=>[styles.segmentButton,value===selected&&{backgroundColor:c.bg},pressed&&{opacity:.65}]}>
        {txt(title,{fontSize:15,fontWeight:value===selected?'600':'400',color:value===selected?c.text:c.muted})}
      </Pressable>)}
    </View>
  );
  const toggle = (title, value, action, last) => <View style={[styles.row,!last&&{borderBottomWidth:StyleSheet.hairlineWidth,borderBottomColor:c.line}, {flexDirection:rtl?'row-reverse':'row'}]}>
    <View style={styles.balance}/><Text style={[styles.text,styles.centerText,{color:c.text}]}>{title}</Text>
    <Switch accessibilityLabel={title} value={!!value} onValueChange={()=>onAction(action)} trackColor={{false:c.strong,true:'#34C759'}} />
  </View>;
  const actionRow = (name,icon,action,last) => <Pressable onPress={()=>onAction(action)} accessibilityRole="button" style={({pressed})=>[styles.row,!last&&{borderBottomWidth:StyleSheet.hairlineWidth,borderBottomColor:c.line},{flexDirection:rtl?'row-reverse':'row'},pressed&&{opacity:.65}]}>
    <Ionicons name={icon} size={20} color={c.text} style={styles.balance}/><Text style={[styles.text,styles.centerText,{color:c.text}]}>{name}</Text><View style={styles.balance}/>
  </Pressable>;
  const h=Dimensions.get('window').height;
  return <Modal transparent visible animationType="none" onRequestClose={onClose} statusBarTranslucent navigationBarTranslucent>
    <View style={StyleSheet.absoluteFill}>
      <Animated.View style={[StyleSheet.absoluteFill,{backgroundColor:c.scrim,opacity:anim}]}><Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel={closeLabel} accessibilityRole="button" /></Animated.View>
      <KeyboardAvoidingView behavior={Platform.OS==='ios'?'padding':undefined} pointerEvents="box-none" style={styles.sheetWrap}>
        <Animated.View accessibilityViewIsModal style={[styles.sheet,{backgroundColor:c.bg,maxHeight:h-insets.top-24,paddingBottom:Math.max(insets.bottom,16),transform:[{translateY:anim.interpolate({inputRange:[0,1],outputRange:[h*.6,0]})}]}]}>
          <View style={[styles.grabber,{backgroundColor:c.line}]} />
          <View style={styles.header}><View style={styles.headerSpace}/>{txt(l.title,{fontSize:19,fontWeight:'600',flex:1})}<Pressable onPress={onClose} accessibilityRole="button" accessibilityLabel={closeLabel} style={[styles.close,{backgroundColor:c.surface}]}><Ionicons name="close" size={24} color={c.text}/></Pressable></View>
          <ScrollView style={{flexShrink:1}} keyboardShouldPersistTaps="handled" bounces={false} contentContainerStyle={{paddingHorizontal:20,paddingBottom:4}}>
            {label(l.theme)}{segments([['auto',l.auto],['light',l.light],['dark',l.dark]],data.theme,'theme')}
            {label(l.language)}{segments([['en','English'],['fr','Français'],['ar','العربية']],data.lang,'language')}
            {label(l.clock)}<View style={[styles.group,{backgroundColor:c.surface}]}>{toggle(l.clock24,data.clock24,'clock',true)}</View>
            {label(l.notifications)}<View style={[styles.group,{backgroundColor:c.surface}]}>{toggle(l.taskReminders,data.taskReminders,'taskReminders',false)}{toggle(l.evening,data.evening,'evening',true)}</View>
            {label(l.data)}<View style={[styles.group,{backgroundColor:c.surface}]}>{actionRow(l.export,'download-outline','export',false)}{actionRow(l.import,'cloud-upload-outline','import',true)}</View>
          </ScrollView>
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  </Modal>;
}
const styles=StyleSheet.create({
 sheetWrap:{flex:1,justifyContent:'flex-end'},sheet:{borderTopLeftRadius:28,borderTopRightRadius:28,overflow:'hidden'},grabber:{alignSelf:'center',width:38,height:5,borderRadius:5,marginTop:9,marginBottom:4},
 header:{height:52,flexDirection:'row',alignItems:'center',paddingHorizontal:16},headerSpace:{width:44},close:{width:44,height:44,borderRadius:22,alignItems:'center',justifyContent:'center'},
 text:{fontSize:17,letterSpacing:-.3},label:{fontSize:13,fontWeight:'500',marginTop:18,marginBottom:7,marginHorizontal:4},segment:{borderRadius:13,padding:3,minHeight:44},segmentButton:{flex:1,minHeight:38,borderRadius:10,alignItems:'center',justifyContent:'center',paddingHorizontal:2},
 group:{borderRadius:14,overflow:'hidden'},row:{minHeight:52,alignItems:'center',paddingHorizontal:14,gap:8},balance:{width:51,textAlign:'center'},centerText:{flex:1,textAlign:'center',flexShrink:1}
});
