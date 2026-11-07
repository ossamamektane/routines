// Native React Native controls. The calendar follows Bills' six-week grid;
// canonical date/time values stay in YYYY-MM-DD and HH:MM for the model.
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const DAY=86400000, pad=n=>String(n).padStart(2,'0');
function parseDate(value){const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(value||'');return m?Date.UTC(+m[1],+m[2]-1,+m[3]):Date.now();}
function asISO(ms){const d=new Date(ms);return `${d.getUTCFullYear()}-${pad(d.getUTCMonth()+1)}-${pad(d.getUTCDate())}`;}
export function Calendar({value,onPick,colors:c,lang='en',t}){
  const cursor=new Date(parseDate(value)),[view,setView]=useState({y:cursor.getUTCFullYear(),m:cursor.getUTCMonth()});
  const first=Date.UTC(view.y,view.m,1),start=first-new Date(first).getUTCDay()*DAY;
  const step=delta=>setView(v=>{const d=new Date(Date.UTC(v.y,v.m+delta,1));return {y:d.getUTCFullYear(),m:d.getUTCMonth()};});
  const rtl=lang==='ar',locale=rtl?'ar-MA':lang,month=new Intl.DateTimeFormat(locale,{month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(first));
  const today=new Date(),todayKey=`${today.getFullYear()}-${pad(today.getMonth()+1)}-${pad(today.getDate())}`;
  return <View style={[s.calendar,{backgroundColor:c.surface}]}><View style={[s.calendarHead,{flexDirection:rtl?'row-reverse':'row'}]}><Pressable onPress={()=>step(-1)} accessibilityLabel={t('previousMonth')} style={s.nav}><Ionicons name={rtl?'chevron-forward':'chevron-back'} size={20} color={c.text}/></Pressable><Text style={{fontSize:17,fontWeight:'600',color:c.text}}>{month}</Text><Pressable onPress={()=>step(1)} accessibilityLabel={t('nextMonth')} style={s.nav}><Ionicons name={rtl?'chevron-back':'chevron-forward'} size={20} color={c.text}/></Pressable></View>
    <View style={{flexDirection:rtl?'row-reverse':'row'}}>{Array.from({length:7},(_,i)=><Text key={i} style={[s.dayHead,{color:c.muted}]}>{new Intl.DateTimeFormat(locale,{weekday:'short',timeZone:'UTC'}).format(new Date(Date.UTC(2023,0,1+i)))}</Text>)}</View>
    {Array.from({length:6},(_,w)=><View key={w} style={{flexDirection:rtl?'row-reverse':'row'}}>{Array.from({length:7},(_,i)=>{const dt=new Date(start+(w*7+i)*DAY),v=asISO(dt.getTime()),selected=v===value,out=dt.getUTCMonth()!==view.m;return <Pressable key={v} onPress={()=>onPick(v)} style={s.dayCell} accessibilityRole="button" accessibilityLabel={v} accessibilityState={{selected}}><View style={[s.day,selected&&{backgroundColor:c.accent},!selected&&v===todayKey&&{borderWidth:1,borderColor:c.text}]}><Text style={{color:selected?c.on:out?c.muted:c.text,fontSize:16,opacity:out&&!selected?.5:1}}>{dt.getUTCDate()}</Text></View></Pressable>})}</View>)}
  </View>;
}
function Wheel({value,min=0,max,onChange,colors:c,label}){
 const row=44,items=Array.from({length:max-min+1},(_,i)=>i+min),ref=React.useRef(null),set=n=>{n=Math.max(min,Math.min(max,n));onChange(n);ref.current?.scrollTo({y:(n-min)*row,animated:true});};
 return <View style={s.wheelWrap} accessible accessibilityRole="adjustable" accessibilityLabel={label} accessibilityValue={{min,max,now:value}} accessibilityActions={[{name:'increment'},{name:'decrement'}]} onAccessibilityAction={e=>set(value+(e.nativeEvent.actionName==='increment'?1:-1))}>
   <View pointerEvents="none" style={[s.selection,{backgroundColor:c.line,opacity:.3}]}/><ScrollView ref={ref} nestedScrollEnabled showsVerticalScrollIndicator={false} snapToInterval={row} decelerationRate="fast" contentOffset={{x:0,y:(value-min)*row}} contentContainerStyle={{paddingVertical:row}} onScrollEndDrag={e=>onChange(Math.max(min,Math.min(max,min+Math.round(e.nativeEvent.contentOffset.y/row))))} onMomentumScrollEnd={e=>onChange(Math.max(min,Math.min(max,min+Math.round(e.nativeEvent.contentOffset.y/row))))}>
   {items.map(n=><Pressable key={n} onPress={()=>set(n)} style={{height:row,justifyContent:'center',alignItems:'center'}}><Text style={{color:c.text,fontSize:20,fontVariant:['tabular-nums']}}>{pad(n)}</Text></Pressable>)}</ScrollView>
 </View>;
}
export function TimeWheel({value,onConfirm,onCancel,colors:c,t,maxHour=23,use24Hour=true,rtl=false}){
 const h=typeof value==='number'?Math.floor(value/60):Number((value||'00:00').split(':')[0]),m=typeof value==='number'?value%60:Number((value||'00:00').split(':')[1]);
 const [hour,setHour]=useState(Math.min(maxHour,Math.max(0,h||0))),[minute,setMinute]=useState(Math.min(59,Math.max(0,m||0)));
 const clock12=maxHour===23&&!use24Hour;
 return <View style={[s.picker,{backgroundColor:c.surface}]}><View style={{flexDirection:rtl?'row-reverse':'row'}}><Wheel key={clock12?'12':'24'} value={clock12?(hour%12||12):hour} min={clock12?1:0} max={clock12?12:maxHour} onChange={n=>setHour(clock12?(n%12)+(hour>=12?12:0):n)} colors={c} label={t('pickerHour')}/><Wheel value={minute} max={59} onChange={setMinute} colors={c} label={t('pickerMinute')}/></View>{clock12&&<View style={{flexDirection:rtl?'row-reverse':'row',gap:8,marginTop:8}}>{[t('pickerAM'),t('pickerPM')].map((part,i)=><Pressable key={part} accessibilityRole="button" accessibilityState={{selected:(hour>=12)===(i===1)}} onPress={()=>setHour(hour%12+i*12)} style={[s.action,{backgroundColor:(hour>=12)===(i===1)?c.accent:c.sheet}]}><Text style={{fontSize:16,color:(hour>=12)===(i===1)?c.on:c.text}}>{part}</Text></Pressable>)}</View>}
 <View style={{flexDirection:rtl?'row-reverse':'row',gap:8,marginTop:12}}>{[[t('cancel'),onCancel,false],[t('setTime'),()=>onConfirm(maxHour===18?Math.min(1080,hour*60+minute):`${pad(hour)}:${pad(minute)}`),true]].map(([name,fn,solid])=><Pressable key={name} onPress={fn} style={[s.action,{backgroundColor:solid?c.accent:c.sheet}]}><Text style={{fontSize:16,fontWeight:'600',color:solid?c.on:c.text}}>{name}</Text></Pressable>)}</View></View>;
}
const s=StyleSheet.create({calendar:{borderRadius:18,padding:10,marginTop:10},calendarHead:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},nav:{width:36,height:36,alignItems:'center',justifyContent:'center'},dayHead:{flex:1,textAlign:'center',fontSize:11,paddingVertical:5},dayCell:{flex:1,alignItems:'center',paddingVertical:2},day:{width:36,height:36,borderRadius:18,alignItems:'center',justifyContent:'center'},picker:{borderRadius:18,padding:12,marginTop:8},wheelWrap:{flex:1,height:132,overflow:'hidden'},selection:{position:'absolute',left:0,right:0,top:44,height:44,borderRadius:10},action:{flex:1,minHeight:44,borderRadius:12,alignItems:'center',justifyContent:'center'}});
