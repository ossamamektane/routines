// Standalone native sheet prototype based on the Bills app's Sheet component.
// This is not connected to Routines yet; it must be tested on a real device.
import React, { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function NativeSheet({ visible, onClose, children, colors = {}, closeLabel = 'Close', onExited }) {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const [mounted, setMounted] = useState(visible);
  const anim = useRef(new Animated.Value(0)).current;
  const visibleRef = useRef(visible);
  const onExitedRef = useRef(onExited); onExitedRef.current = onExited;
  // Keep content mounted while closing, avoiding an empty sliding sheet.
  const lastChildren = useRef(children); if (visible && children) lastChildren.current = children;
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => { let live = true; AccessibilityInfo.isReduceMotionEnabled().then(v => { if (live) setReduceMotion(v); }).catch(() => {}); const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion); return () => { live = false; sub?.remove(); }; }, []);
  visibleRef.current = visible;

  useEffect(() => {
    if (visible) {
      setMounted(true);
      // Match Bills: a shared native-driven animation for the sheet and scrim.
      if (reduceMotion) { anim.setValue(1); return; }
      Animated.spring(anim, { toValue: 1, useNativeDriver: true, damping: 22, stiffness: 220, mass: 0.9 }).start();
    } else if (mounted) {
      if (reduceMotion) { anim.setValue(0); setMounted(false); onExitedRef.current?.(); return; }
      Animated.timing(anim, { toValue: 0, duration: 180, useNativeDriver: true }).start(({ finished }) => {
        if (finished && !visibleRef.current) { setMounted(false); onExitedRef.current?.(); }
      });
    }
    return () => anim.stopAnimation();
  }, [visible, anim, reduceMotion]);

  if (!mounted) return null;
  return (
    <Modal visible transparent animationType="none" onRequestClose={onClose} statusBarTranslucent navigationBarTranslucent>
      <View style={StyleSheet.absoluteFill}>
        <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: colors.scrim || 'rgba(0,0,0,0.36)', opacity: anim }]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityRole="button" accessibilityLabel={closeLabel} />
        </Animated.View>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.wrap} pointerEvents="box-none">
          <Animated.View style={[styles.sheet, { backgroundColor: colors.sheet || '#fff', maxHeight: height - insets.top - 24, paddingBottom: Math.max(insets.bottom, 16), transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [height, 0] }) }] }]}>
            <View style={[styles.grabber, { backgroundColor: colors.grabber || '#e5e5ea' }]} />
            <ScrollView style={{ flexShrink: 1 }} keyboardShouldPersistTaps="handled" bounces={false} contentContainerStyle={styles.content}>{visible ? children : lastChildren.current}</ScrollView>
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  wrap: { flex: 1, justifyContent: 'flex-end' },
  sheet: { width: '100%', borderTopLeftRadius: 28, borderTopRightRadius: 28, overflow: 'hidden' },
  grabber: { width: 36, height: 5, borderRadius: 3, alignSelf: 'center', marginTop: 8, marginBottom: 12 },
  content: { paddingHorizontal: 20, paddingBottom: 4 },
});
