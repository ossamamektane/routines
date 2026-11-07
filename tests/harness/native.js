// Browser-only stand-ins to exercise state wiring. Not a React Native renderer.
import React from 'react';
const flat=v=>Array.isArray(v)?Object.assign({},...v.map(flat)):v&&typeof v==='object'?v:{};
function style(v){const x={...flat(typeof v==='function'?v({pressed:false}):v)};delete x.transform;delete x.shadowOffset;delete x.fontVariant;delete x.elevation;delete x.textAlignVertical;for(const k of Object.keys(x)){if(x[k]&&typeof x[k]==='object')delete x[k];}return x;}
function elem(tag){return React.forwardRef(({children,style:st,onPress,onChangeText,accessibilityLabel,accessibilityRole,accessibilityState,contentContainerStyle,keyboardType,placeholderTextColor,returnKeyType,numberOfLines,adjustsFontSizeToFit,hitSlop,pointerEvents,accessibilityActions,onAccessibilityAction,accessibilityValue,showsVerticalScrollIndicator,snapToInterval,decelerationRate,contentOffset,nestedScrollEnabled,onMomentumScrollEnd,onScrollEndDrag,...rest},ref)=>{const props={style:style(st),'aria-label':accessibilityLabel,...(accessibilityRole?{role:accessibilityRole}:{}),...(accessibilityState?.checked!==undefined?{'aria-checked':accessibilityState.checked}:{}),...rest};if(onPress)props.onClick=onPress;if(tag==='input'||tag==='textarea'){props.onChange=e=>onChangeText?.(e.target.value);delete props.onTouchStart;}if(tag==='button')props.type='button';return React.createElement(tag,props,children);});}
export const View=elem('div'),Text=elem('span'),Pressable=elem('button'),ScrollView=elem('div'),KeyboardAvoidingView=elem('div');
export const TextInput=React.forwardRef((p,r)=>React.createElement(p.multiline?elem('textarea'):elem('input'),{...p,multiline:undefined,ref:r}));
export function Switch({value,onValueChange}){return React.createElement('input',{type:'checkbox',checked:value,onChange:e=>onValueChange(e.target.checked)});}
export function Modal({visible,children}){return visible?React.createElement('div',{'data-modal':true},children):null;}
export const StyleSheet={create:x=>x,absoluteFill:{position:'absolute',top:0,left:0,right:0,bottom:0},hairlineWidth:1};
class Value{constructor(v){this.v=v;}setValue(v){this.v=v;}stopAnimation(){}interpolate(){return 0;}}
const animation=(v,o)=>({start:fn=>{v.setValue(o.toValue);setTimeout(()=>fn?.({finished:true}),10);},stop(){}});
export const Animated={Value,View,spring:animation,timing:animation};
export const Platform={OS:'ios'},AppState={addEventListener:()=>({remove(){}})},AccessibilityInfo={isReduceMotionEnabled:async()=>false,addEventListener:()=>({remove(){}})},Linking={openSettings:async()=>{}};
export const Alert={alert:(a,b,actions)=>{console.log('ALERT',a,b||'');if(globalThis.__acceptAlerts)actions?.find(x=>x.style==='destructive'||x.text==='Import')?.onPress?.();}};
export const useColorScheme=()=> 'light',useWindowDimensions=()=>({height:844,width:390});

export const PanResponder={create(config){globalThis.__catchPan=config;return {panHandlers:{}}}};
