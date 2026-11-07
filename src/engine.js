// Generated from the legacy scheduling engine. No browser or WebView required.
// Treat this as migration work: parity has NOT been established for all states.
export function createEngine(seed = {}, options = {}) {
  const Date = options.Date || globalThis.Date;
  const storage = {...seed};
  function get(k){return Object.prototype.hasOwnProperty.call(storage,k) ? storage[k] : null;}
  function set(k,v){storage[k]=String(v);return true;}
  var T = {
  add:["Add","Ajouter une heure","إضافة وقت"], theme:["Theme","Thème","المظهر"], language:["Language","Langue","اللغة"], data:["Your data","Vos données","بياناتك"],
  thAuto:["Automatic","Automatique","تلقائي"], thLight:["Light","Clair","فاتح"], thDark:["Dark","Sombre","داكن"],
  export:["Export backup","Exporter","تصدير نسخة"], import:["Import backup","Importer","استيراد نسخة"],
  foot:["Stored on this device · works offline","Sur cet appareil · hors ligne","على هذا الجهاز · بدون إنترنت"],
  zoneNote:["Task times use {z}.","Les horaires utilisent {z}.","تستخدم أوقات المهام {z}."],
  zoneLocal:["the device time zone","le fuseau horaire de l’appareil","المنطقة الزمنية للجهاز"],
  ofDone:["{a} of {b} done","{a} sur {b} faits","{a} من {b} منجزة"], streak:["{n}-day streak","{n} jours d’affilée","{n} أيام متتالية"],
  noTasks:["Nothing planned today","Rien de prévu aujourd’hui","لا شيء اليوم"],
  tabD:["Today","Jour","اليوم"], tabW:["Week","Semaine","الأسبوع"], tabM:["Month","Mois","الشهر"],
  grpAny:["Anytime today","Dans la journée","في أي وقت اليوم"], grpAnyW:["Anytime this week","Dans la semaine","في أي وقت هذا الأسبوع"], grpAnyM:["Anytime this month","Dans le mois","في أي وقت هذا الشهر"],
  grpTimed:["On the clock","À heure fixe","بوقت محدد"], grpDays:["On a day","À date fixe","بتاريخ محدد"], grpLate:["Overdue","En retard","متأخرة"],
  nextX:["next: {n} {w}","ensuite : {n} {w}","التالي: {n} {w}"], tabEmpty:["Nothing here","Rien ici","لا شيء هنا"], tabEmptyD:["Nothing left for today.","Plus rien pour aujourd’hui.","لا شيء متبقٍ لليوم."],
  tabEmptyW:["Nothing else this week.","Rien d’autre cette semaine.","لا شيء آخر هذا الأسبوع."], tabEmptyM:["Nothing else this month.","Rien d’autre ce mois-ci.","لا شيء آخر هذا الشهر."],
  dLeftS:["{n}d left","reste {n} j","باقي {n} ي"], hLeftS:["{x} left","reste {x}","باقي {x}"], lastDayS:["last day","dernier jour","آخر يوم"],
  kNow:["Now","Maintenant","الآن"], kLate:["Late","En retard","متأخر"], kNext:["Next","Ensuite","التالي"], kAny:["Anytime today","Dans la journée","خلال اليوم"],
  kGoal:["Goal","Objectif","هدف"],
  allDone:["Everything is checked","Tout est coché","كل شيء منجز"], allDoneSub:["Next: {n} · {w}","Ensuite : {n} · {w}","التالي: {n} · {w}"], allDoneNone:["Nothing else today","Rien d’autre aujourd’hui","لا شيء آخر اليوم"],
  inX:["in {x}","dans {x}","بعد {x}"], lateX:["{x} late","{x} de retard","متأخر {x}"], hAbbr:["h","h","س"], min:["min","min","د"],
  clock24Toggle:["24-Hour Time","Format 24 heures","نظام 24 ساعة"], clockF:["Time format","Format de l’heure","صيغة الوقت"], c24:["24-hour","24 heures","24 ساعة"], c12:["12-hour","12 heures","12 ساعة"],
  none:["Nothing","Rien","لا شيء"], noFixWhy:["Available for daily, weekly or monthly repeats","Seulement pour « chaque jour, semaine ou mois »","فقط لـ«كل يوم أو أسبوع أو شهر»"],
  somed:["Any time today","Quand vous voulez aujourd’hui","في أي وقت اليوم"], somew:["Anytime this week","Dans la semaine","في أي وقت هذا الأسبوع"], somem:["Anytime this month","Dans le mois","في أي وقت هذا الشهر"],
  nowTag:["now","maintenant","الآن"], doneAt:["done {t}","fait à {t}","أُنجز {t}"],
  overdue:["Overdue","En retard","متأخرة"], schedule:["Today","Aujourd’hui","اليوم"], anytime:["Anytime today","Dans la journée","خلال اليوم"],
  week:["This week","Cette semaine","هذا الأسبوع"], month:["This month","Ce mois-ci","هذا الشهر"], coming:["Coming up","À venir","قادم"],
  daysLeft:["{n} days left","{n} jours restants","باقي {n} أيام"], lastDay:["last day","dernier jour","آخر يوم"], oneLeft:["2 days left","2 jours restants","باقي يومان"],
  goalDd:["done for today","fait pour aujourd’hui","منجز لهذا اليوم"], goalDw:["done for this week","fait pour cette semaine","منجز لهذا الأسبوع"], goalDm:["done for this month","fait pour ce mois","منجز لهذا الشهر"], pd:["day","jour","اليوم"], pw:["week","semaine","الأسبوع"], pm:["month","mois","الشهر"],
  pickerHour:["Hour","Heure","الساعة"], pickerMinute:["Minute","Minute","الدقيقة"], pickerPeriod:["AM / PM","AM / PM","صباحًا / مساءً"], selectedDate:["Selected: {d}","Sélection : {d}","التاريخ المختار: {d}"], previousMonth:["Previous month","Mois précédent","الشهر السابق"], nextMonth:["Next month","Mois suivant","الشهر التالي"],
  lateD:["{n}d late","{n} j de retard","متأخر {n} ي"], lateY:["due yesterday","prévu hier","كان مستحقًا أمس"], tomorrow:["Tomorrow","Demain","غدًا"],
  showMore:["Show {n} more","Afficher {n} de plus","عرض {n} أخرى"], showLess:["Show less","Moins","أقل"],
  emptyT:["No tasks yet","Aucune tâche","لا توجد مهام بعد"], emptyP:["Add tasks you do regularly, then check them off.","Ajoutez vos tâches régulières, puis cochez-les une fois terminées.","أضف مهامك المتكررة، وعلّم عليها عند إنجازها."], addFirst:["Add your first task","Ajouter une tâche","أضف أول مهمة"],
  newT:["New task","Nouvelle tâche","مهمة جديدة"], addTask:["Add task","Ajouter une tâche","إضافة مهمة"], editT:["Edit task","Modifier","تعديل"], fName:["Name","Nom","الاسم"], more2:["More","Plus","المزيد"], less:["Less","Moins","أقل"], descPh:["Notes","Notes","ملاحظات"], ph:["Task name","Nom de la tâche","اسم المهمة"],
  fKind:["Every","Tous les","كل"],
  fixedD:["Scheduled","Planifiée","بموعد محدد"], fixedT:["Scheduled","Planifiée","بموعد محدد"],
  fixedS:["On the calendar","Au calendrier","في التقويم"], fixedSH:["On the clock: {x}","Sur l’horloge : {x}","على الساعة: {x}"],
  flexD:["Flexible","Flexible","بلا موعد محدد"], flexT:["Flexible","Flexible","بلا موعد محدد"],
  modeFixedHelp:["Follows a set schedule","Selon un calendrier défini","تتكرر في مواعيد محددة"], modeFlexHelp:["Complete your target within each day, week or month","Atteignez votre objectif dans la journée, la semaine ou le mois","أنجز العدد المطلوب خلال اليوم أو الأسبوع أو الشهر"],
  flexS:["Counts from the day you do it","Compte à partir du jour où c’est fait","يُحسب من يوم إنجازه"], flexSH:["Counts from the moment you check it","Compte à partir du moment où vous cochez","يُحسب من لحظة الإنجاز"],
  shiftT:["Repeat from when done","Répéter à partir de la fin de la tâche","احسب التكرار من وقت الإنجاز"], shiftS:["Next time is based on completion","La prochaine heure dépend de la fin","يُحدد الوقت التالي حسب وقت الإنجاز"],
  shiftSD:["Next date is based on completion","La prochaine date dépend de la fin","يُحدد الموعد التالي حسب يوم الإنجاز"],
  goalT:["Any day this {p}","N’importe quel jour de la {p}","أي يوم في {p}"], goalS:["Shows under “{s}” until you've done it","Reste dans « {s} » jusqu’à ce que ce soit fait","يظهر في «{s}» حتى تنجزه"], howMany:["How many times","Combien de fois","كم مرة"],
  fStartAt:["Starts at","Commence à","يبدأ في"], change:["Change","Changer","تغيير"],
  noFixS:["Any time this {p}","N’importe quand ce {p}","في أي وقت هذا {p}"], noFixDis:["Only when repeating every 1","Seulement « tous les 1 »","فقط عند التكرار كل 1"],
  sumAny:["{q} a {p}, any time","{q} par {p}, n’importe quand","{q} في {p}، في أي وقت"],
  laterN:["Later · {n}","Plus tard · {n}","لاحقًا · {n}"], onLbl:["On","Le","في"], onDayLbl:["On day","Le jour","في يوم"], startsNow:["starting when you save","à partir de l’enregistrement","يبدأ عند الحفظ"],
  catchT:["While you were away","Pendant votre absence","أثناء غيابك"], catchPos:["{a} of {b}","{a} sur {b}","{a} من {b}"],
  onTimeAt:["Did it at {t}","Fait à {t}","أنجزته في {t}"], didIt:["Did it","Fait","أنجزته"], missedB:["Missed it","Raté","فاتني"],
  plus30:["Later…","Plus tard…","لاحقًا…"], tomorrowB:["Move to tomorrow","Reporter à demain","انقل للغد"],
  caught:["All caught up","Tout est à jour","كل شيء محدّث"], caughtS:["You’re all caught up.","Vous êtes à jour.","أنجزت كل المهام المتأخرة."],
  catchBtn:["Catch up","Rattraper","استدراك"], swipeHint:["Swipe right: did it · left: later","Glissez à droite : fait · à gauche : plus tard","اسحب يمينًا: أنجزت · يسارًا: لاحقًا"],
  onTimeBtn:["On time","À l’heure","في وقته"], markedOT:["Saved as done at {t}","Enregistré à {t}","حُفظ كمنجز في {t}"],
  ontimeN:["{n} on time","{n} à l’heure","{n} في وقتها"], missedTag:["missed","raté","فاتت"], movedTo:["moved to {t}","décalé à {t}","نُقل إلى {t}"], moved:["Moved to {t}","Décalé à {t}","نُقل إلى {t}"], toTomorrow:["Moved to tomorrow","Reporté à demain","نُقل للغد"],
  sumGoal:["{q} a {p}, any day","{q} par {p}, n’importe quel jour","{q} في {p}، أي يوم"], sumAt:[" at {t}"," à {t}"," في {t}"], sumFrom:["Starts {d}","Commence {d}","يبدأ {d}"], sumNext:["Next: {d}","Prochaine : {d}","التالي: {d}"], and:[" and "," et "," و"],
  sumShift:["moves to when you check it","se décale quand vous cochez","يتحرك عند الإنجاز"], eHour:["Every hour","Toutes les heures","كل ساعة"], fromT:["from {t}","à partir de {t}","من {t}"],
  fEvery:["Every","Tous les","كل"], fQuota:["Times per","Fois par","مرات في"], h:["Hour","Heure","ساعة"], hh:["Hours","Heures","ساعات"], d:["Day","Jour","يوم"], w:["Week","Semaine","أسبوع"], m:["Month","Mois","شهر"],
  dd:["Days","Jours","أيام"], ww:["Weeks","Semaines","أسابيع"], mm:["Months","Mois","أشهر"],
  fTimes:["Time","Heure","الوقت"], optional:["optional","facultatif","اختياري"], addTime:["Add time","Ajouter","إضافة"], cancel:["Cancel","Annuler","إلغاء"],
  morning:["Morning","Matin","صباح"], noon:["Noon","Midi","ظهر"], evening:["Evening","Soir","مساء"], night:["Night","Nuit","ليل"],
  fStart:["Starts","Commence","يبدأ"], fNext:["Next on","Prochaine fois","المرة القادمة"],
  hFixed:["Repeats every {e} from this date, even if you check it late.","Se répète tous les {e} depuis cette date, même cochée en retard.","تتكرر كل {e} من هذا التاريخ حتى لو تأخرت."],
  hFlex:["When you check it, the next one is {e} later.","Une fois cochée, la suivante tombe {e} plus tard.","عند إنجازها، تأتي التالية بعد {e}."],
  hWin:["Shows under “{p}” until you've done it {q}. Resets every {u}.","Reste dans « {p} » jusqu’à {q}. Repart chaque {u}.","تظهر في «{p}» حتى تنجزها {q}. تتجدد كل {u}."],
  hTimes:[" Missed hours roll over to the next day."," Les heures manquées passent au lendemain."," الساعات الفائتة تنتقل لليوم التالي."],
  once:["once","1 fois","مرة"], timesN:["{n} times","{n} fois","{n} مرات"],
  save:["Save","Enregistrer","حفظ"], del2:["Tap again to delete","Touchez encore pour supprimer","اضغط مجددًا للحذف"], undo:["Undo","Annuler","تراجع"],
  checked:["Completed “{n}”","Tâche « {n} » terminée","تم إنجاز «{n}»"], unchecked:["Marked incomplete","Tâche rouverte","أُعيدت المهمة إلى قائمة المهام"], removed:["Deleted","Supprimé","حُذف"],
  skipped:["Skipped to {d}","Reporté au {d}","أُجّل إلى {d}"], added:["Added “{n}”","« {n} » ajouté","أُضيف «{n}»"], addedT:["Added “{n}” · starts tomorrow","« {n} » ajouté · commence demain","أُضيف «{n}» · يبدأ غدًا"],
  imported:["Imported {n} tasks","{n} tâches importées","تم استيراد المهام: {n}"], badFile:["That file isn't a Routines backup","Ce fichier n’est pas une sauvegarde","الملف ليس نسخة صالحة"],
  notSet:["Not set","Non défini","غير محدد"], needWake:["Choose how long after waking","Choisissez combien de temps attendre après le réveil","حدد المدة التي تريد انتظارها بعد الاستيقاظ"], needStart:["Choose a start time","Choisissez une heure de début","اختر وقت البدء"], needName:["Give it a name first","Donnez-lui un nom","أعطها اسمًا"],
  eDay:["Every day","Tous les jours","كل يوم"], eWeekOn:["Every {w}","Chaque {w}","كل {w}"], eMonth:["Every month","Tous les mois","كل شهر"], eN:["Every {n} {u}","Tous les {n} {u}","كل {n} {u}"],
  uh:["hours","heures","ساعات"], u1h:["hour","heure","ساعة"], ud:["days","jours","أيام"], uw:["weeks","semaines","أسابيع"], um:["months","mois","أشهر"], u1d:["day","jour","يوم"], u1w:["week","semaine","أسبوع"], u1m:["month","mois","شهر"],
  onDay:["on the {n}","le {n}","يوم {n}"], afterDone:["repeats from when done","répétée depuis la dernière fois","تتكرر من وقت الإنجاز"], onW:["on {w}","le {w}","يوم {w}"], atT:["at {t}","à {t}","في {t}"], stAt:["starts at {t}","dès {t}","يبدأ في {t}"], stFrom:["starts {d}","début : {d}","يبدأ {d}"], stonLbl:["Starts on","Commence le","يبدأ يوم"], stonDayLbl:["Starts on day","Commence le jour","يبدأ في يوم"], winSub:["{q} a {p}","{q} par {p}","{q} في {p}"],
  lastDone:["done {x}","fait {x}","أُنجز {x}"], ago:["{n}d ago","il y a {n} j","منذ {n} ي"], agoToday:["today","aujourd’hui","اليوم"],
  today:["Today","Aujourd’hui","اليوم"], nextWeek:["In a week","Dans 1 sem.","بعد أسبوع"],
  mAb:["m","min","د"], eOne:["Every {u}","Chaque {u}","كل {u}"], movedFrom:["moved from {t}","décalé de {t}","نُقل من {t}"],
  secTodo:["To do","À faire","المتبقية"], secDone:["Done","Terminées","المنجزة"], hideB:["Hide","Masquer","إخفاء"], showB:["Show","Afficher","إظهار"], missedT:["Marked as missed","Marquée comme ratée","حُدِّدت كفائتة"],
  mActs:["Actions","Actions","إجراءات"], mDone:["Mark as done","Marquer comme fait","تحديد كمنجز"], mUndo:["Mark as not done","Marquer comme non terminée","إعادة إلى قائمة المهام"],
  mDoneAt:["Done at another time…","Fait à une autre heure…","أُنجز في وقت آخر…"], mTime:["Change the time…","Modifier l’heure…","تغيير الوقت…"], mSkip:["Skip this time","Passer cette fois","تخطَّ هذه المرة"], skipPlain:["Skipped","Passée","تم تخطي المهمة"],
  laterT:["Do it later","Plus tard","لاحقًا"], laterB:["Later…","Plus tard…","لاحقًا…"], laterChip:["Later","Plus tard","لاحقًا"],
  pickTime:["Pick a time","Choisir l’heure","اختر وقتًا"], nextFree:["Next free time","Prochain créneau libre","أقرب وقت فارغ"],
  withX:["same time as {n}","en même temps que {n}","نفس وقت {n}"], setTime:["Set","Valider","تأكيد"],
  inDays:["In {n} days","Dans {n} jours","بعد {n} أيام"], movedDay:["Moved to {d}","Reporté au {d}","نُقل إلى {d}"],
  allNow:["Did all just now","Tout fait à l’instant","أنجزتها كلها الآن"], allMissed:["Missed all","Tout raté","فاتتني كلها"],
  bulkDone:["Updated {n} tasks","{n} tâches mises à jour","حُدّثت {n} مهام"], pastTime:["Pick a time later than now","Choisissez une heure plus tard","اختر وقتًا بعد الآن"],
  chooseDuration:["Set duration","Choisir la durée","تحديد المدة"],
  hoursUnit:["hours","heures","ساعات"], minutesUnit:["min","min","دقيقة"], applyDuration:["Set duration","Confirmer la durée","تأكيد المدة"], startDateLabel:["Starting day","Date de début","يوم البدء"], invalidStart:["Choose a valid starting day","Choisissez une date de début valide","اختر يوم بدء صالحًا"],
  chooseDate:["Date","Date","التاريخ"], timeToday:["Time today","Heure pour aujourd’hui","الوقت اليوم"], chooseWake:["Wake-up date and time","Date et heure du réveil","تاريخ ووقت الاستيقاظ"], chooseExact:["Choose a date and time","Choisissez une date et une heure","اختر التاريخ والوقت"], chooseValidTime:["Choose a valid time","Choisissez une heure valide","اختر وقتًا صالحًا"], chooseFutureDate:["Choose a later date","Choisissez une date ultérieure","اختر تاريخًا لاحقًا"], exactWakeMinutes:["Minutes after waking","Minutes après le réveil","الدقائق بعد الاستيقاظ"],
  dueTodayLabel:["Due today","À faire aujourd’hui","مستحقة اليوم"], dueTomorrowLabel:["Due tomorrow","À faire demain","مستحقة غدًا"], dueInLabel:["Due in {n} days","À faire dans {n} jours","موعدها بعد {n} يومًا"],
  weekRemain:["{x} left this week","{x} avant la fin de la semaine","باقي {x} حتى نهاية الأسبوع"], monthRemain:["{x} left this month","{x} avant la fin du mois","باقي {x} حتى نهاية الشهر"], dayRemain:["{x} left today","{x} avant la fin de la journée","باقي {x} حتى نهاية اليوم"], daysShort:["d","j","ي"],
  leftX:["{x} left","{x} restantes","باقي {x}"], clockBack:["Your clock went back — list restored","L’horloge a reculé — liste restaurée","رجعت الساعة — تمت استعادة القائمة"],
  allT:["All tasks","Toutes les tâches","كل المهام"], manageSub:["Your active and paused tasks","Vos tâches actives et en pause","مهامك النشطة والموقوفة"], pausedN:["{n} paused","{n} en pause","{n} موقوفة"], activeT:["Active","Actives","نشطة"], pausedT:["Paused","En pause","موقوفة"],
  pauseT:["Pause this task","Mettre en pause","إيقاف المهمة مؤقتًا"], pauseS:["Hidden from your day until you turn this off","Masquée jusqu’à la reprise","مخفية حتى تعيد تشغيلها"],
  paused1:["Paused","En pause","موقوفة"], resumed:["Resumed “{n}”","« {n} » reprise","استُؤنفت «{n}»"], pausedMsg:["Paused “{n}”","« {n} » en pause","أُوقفت «{n}»"],
  noneYet:["No tasks yet","Aucune tâche","لا توجد مهام"], dueToday:["Today","Aujourd’hui","اليوم"], thisP:["this {p}","ce/cette {p}","هذا {p}"],
  noneDue:["Nothing due right now","Rien de prévu maintenant","لا شيء مستحق الآن"], openToday:["{n} left today, whenever suits you","{n} à faire aujourd’hui, quand vous voulez","{n} متبقية اليوم، متى شئت"],
  repairedN:["Fixed {n} tasks moved by a clock change","{n} tâches corrigées après un changement d’heure","صُحّحت {n} مهام بعد تغيير الساعة"],
  wakeAutoS:["Set by itself. Not right? Pick when you woke up, or Yesterday if you haven’t slept.","Réglée toute seule. Pas juste ? Choisissez l’heure de votre réveil, ou Hier si vous n’avez pas dormi.","ضُبط تلقائيًا. غير صحيح؟ اختر وقت استيقاظك، أو «أمس» إن لم تنم."],
  wakeYS:["Haven’t slept? Choose Yesterday and the time you woke up.","Pas dormi ? Choisissez Hier et l’heure de votre réveil.","لم تنم؟ اختر «أمس» ووقت استيقاظك."],
  wakeUpS:["No sleep since {t}. Today’s tasks started at {s}. If you slept, choose when you woke up.","Pas de sommeil depuis {t}. Les tâches du jour ont commencé à {s}. Si vous avez dormi, choisissez l’heure du réveil.","لم تنم منذ {t}. بدأت مهام اليوم في {s}. إذا نمت، اختر وقت استيقاظك."],
  noSleepB:["Didn’t sleep","Pas dormi","لم أنم"],
  noSleepQ:["Didn’t sleep? Count from {t}","Pas dormi ? Compter depuis {t}","لم تنم؟ احسب من {t}"],
  upSinceT:["Up since {t}","Debout depuis {t}","مستيقظ منذ {t}"],
  wakeQ:["What time did you wake up?","À quelle heure a eu lieu votre réveil ?","متى استيقظت؟"], wakeHi:["Good morning","Bonjour","صباح الخير"],
  onced:["Once a day","Une fois par jour","مرة في اليوم"], oncew:["Once a week","Une fois par semaine","مرة في الأسبوع"], oncem:["Once a month","Une fois par mois","مرة في الشهر"],
  timesd:["{n} times a day","{n} fois par jour","{n} مرات في اليوم"], timesw:["{n} times a week","{n} fois par semaine","{n} مرات في الأسبوع"], timesm:["{n} times a month","{n} fois par mois","{n} مرات في الشهر"],
  upFor:["Up for {x}","Debout depuis {x}","مستيقظ منذ {x}"],
  ndNow:["Yes","Oui","نعم"], ndNotYet:["Not yet","Pas encore","ليس بعد"], ndKeep:["Okay — your day continues","D’accord — votre journée continue","حسنًا — يومك مستمر"], ndSlept:["Did you sleep?","Avez-vous dormi ?","هل نمت؟"], ndSleptS:["Tap Yes to start a new day.","Touchez « Oui » pour commencer une nouvelle journée.","اضغط «نعم» لتبدأ يومًا جديدًا."], ndDayS:["Your day starts from then.","Votre journée commence à ce moment-là.","يبدأ يومك من حينها."], ndBackT:["Back","Retour","رجوع"], ndNotNow:["Not now","Pas maintenant","ليس الآن"],
  andMore:[" and {n} more"," et {n} de plus"," و{n} أخرى"],
  wokeS:["Woke up","Réveil à","استيقظت"], extS:["Your {d} continues","Votre {d} continue","يوم {d} مستمر"],
  ndHint:["Tap New Day when you’re up","Touchez « Nouveau jour » au réveil","اضغط «يوم جديد» عند استيقاظك"],
  setT:["Settings","Réglages","الإعدادات"], delT:["Delete task","Supprimer la tâche","حذف المهمة"], pauseB:["Pause task","Mettre en pause","إيقاف مؤقت"], resumeB:["Resume task","Reprendre","استئناف"], skipB:["Skip the next one","Passer la prochaine","تخطَّ القادمة"],
 
  ndWhere:["It’s always at the top, next to the time left.","Le bouton est toujours en haut, à côté du temps restant.","تجده دائمًا في الأعلى بجانب الوقت المتبقي."],
  ndEarlier:["Earlier…","Plus tôt…","في وقت سابق…"],
  ndLater:["Okay — tap New Day when you’re up","D’accord — touchez « Nouveau jour » au réveil","حسنًا — اضغط «يوم جديد» عند استيقاظك"],
  ndDone:["Day started at {t}","Journée commencée à {t}","بدأ يومك في {t}"],
  nfH:["Notifications","Notifications","الإشعارات"], nfTasks:["Task reminders","Rappels des tâches","تذكير بالمهام"], nfLeft:["Evening check-ins","Rappels du soir","تذكيرات المساء"], nfMorning:["Morning New Day reminder","Rappel du matin","تذكير الصباح"],
  nfDone:["Notifications are on ✓","Notifications activées ✓","الإشعارات مفعّلة ✓"], nfManual:["Open iPhone Settings → Routines → Notifications","Ouvrez Réglages → Routines → Notifications","افتح الإعدادات ← Routines ← الإشعارات"],
  nfAllow:["Allow notifications","Autoriser les notifications","السماح بالإشعارات"], nfAllowSub:["So Routines can remind you","Pour que Routines puisse vous rappeler","ليذكّرك Routines بمهامك"],
  nfOn:["Turn on notifications","Activer les notifications","تفعيل الإشعارات"], nfOnSub:["They’re off for Routines","Désactivées pour Routines","متوقفة لتطبيق Routines"],
  nNow:["It’s {t} — time for it","Il est {t} — c’est l’heure","الساعة {t} — حان وقتها"], nLate:["Still to do: {n}","Encore à faire : {n}","ما زال عليك: {n}"], nWas:["Was due at {t}","Prévu à {t}","كان موعدها {t}"],
  nLeft:["⏳ Still to do today","⏳ Encore à faire aujourd’hui","⏳ ما زال عليك اليوم"], nOpen:["Still open: {list}","Reste : {list}","متبقٍ: {list}"],
  nMorning:["☀️ Good morning","☀️ Bonjour","☀️ صباح الخير"], nMorningB:["Tap New Day to start your day","Touchez « Nouveau jour » pour commencer","اضغط «يوم جديد» لتبدأ يومك"], nDoneAct:["Done ✓","Fait ✓","تم ✓"], wakeHi2:["Wake-up","Réveil","الاستيقاظ"], dayLeft:["{x} until midnight","{x} avant minuit","{x} حتى منتصف الليل"], toDoN:["{n} to do","{n} à faire","{n} متبقية"], allClear:["All done","Tout est fait","أُنجز الكل"],
  wakeStarts:["{list} will be scheduled from this time.","{list} : horaires calculés à partir de cette heure.","تُحدد مواعيد {list} بناءً على هذا الوقت."], wakeNow:["Just now","À l’instant","الآن"], wakeEarlier:["Earlier…","Plus tôt…","في وقت سابق…"],
  todayW:["Today","Aujourd’hui","اليوم"], agoT:["{x} ago","il y a {x}","قبل {x}"], future:["That’s in the future","C’est dans le futur","هذا في المستقبل"],
  justNow:["Just now","À l’instant","الآن"], newWake:["New Day","Nouveau jour","يوم جديد"], yest:["Yesterday","Hier","أمس"],
  ndOn:["Starts {d}","Commence le {d}","يبدأ {d}"], ndWeek:["new week","nouvelle semaine","أسبوع جديد"], ndMonth:["new month","nouveau mois","شهر جديد"],
  newDayQ:["New Day","Nouvelle journée","يوم جديد"], newDaySub:["When did you wake up? Today’s tasks restart from this time.","À quelle heure vous êtes-vous levé ? Les tâches repartent de cette heure.","متى استيقظت؟ تبدأ مهام اليوم من هذا الوقت."],
  wokeAt:["Woke up at {t}","Réveil à {t}","استيقظت في {t}"], edit:["Edit","Modifier","تعديل"], wakeSet:["Woke up at {t}","Réveil à {t}","استيقظت في {t}"],
  wakeClear:["Clear wake time","Effacer l’heure du réveil","مسح وقت الاستيقاظ"], wakeCleared:["Wake time cleared","Heure du réveil effacée","مُسح وقت الاستيقاظ"],
  wakeOff:["{x} after waking","{x} après le réveil","بعد {x} من الاستيقاظ"], wake0:["right after waking","dès le réveil","فور الاستيقاظ"],
  fromWake:["starts {x} after waking","dès {x} après le réveil","يبدأ بعد {x} من الاستيقاظ"], fromWake0:["starts when you wake up","dès le réveil","يبدأ عند الاستيقاظ"], wakeLbl2:["First one after waking","Premier après le réveil","الأول بعد الاستيقاظ"],
  doneT:["done","fait","أُنجز"], timeUp:["Time’s up: {n}","Temps écoulé : {n}","انتهى الوقت: {n}"], catchN:["Catch up · {n}","Rattraper · {n}","استدراك · {n}"], wakeWait:["starts when you’re up","commence à votre réveil","يبدأ عند استيقاظك"],
  tmClock:["At a time","À une heure","في وقت محدد"], tmWake:["After waking","Après le réveil","بعد الاستيقاظ"], wakeLbl:["How long after you wake up","Combien de temps après le réveil","كم من الوقت بعد استيقاظك؟"],
  agoX:["{x} ago","il y a {x}","قبل {x}"], asSched:["As scheduled","Comme prévu","كما هو مقرر"], didWhen:["When did you do it?","Quand l’avez-vous fait ?","متى أنجزتها؟"],
  setTimeB:["Set time","Heure…","الوقت…"], didAt:["Done at {t}","Fait à {t}","أُنجز في {t}"], futureNo:["That time hasn’t happened yet","Cette heure n’est pas encore passée","هذا الوقت لم يأتِ بعد"],
  otherTime:["I did it at another time…","Fait à une autre heure…","أنجزتها في وقت آخر…"],
  dueAgo:["due {x} ago","prévu il y a {x}","مستحق منذ {x}"], kDue:["Due","À faire","مستحق"],
  midnight:["past the end of your day","après la fin de votre journée","بعد نهاية يومك"], plusX:["+{x}","+{x}","+{x}"],
};
  var LANGS=['en','fr','ar'], lang=get('r.lang')||'en'; if(!LANGS.includes(lang))lang='en';
  var items=[], hist={}, LI=Date.now(), QG={k:null,pts:[]}, DI=null, RDY=false, SYNC={c:null,a:null}, warped=null, repaired=0, ND2=false, NWDay=0;
  try{items=JSON.parse(get('r.items')||'[]'); if(!Array.isArray(items))items=[];}catch(e){items=[];}
  try{hist=JSON.parse(get('r.hist')||'{}')||{};}catch(e){hist={};}
function CUT(){ return dayInfo().cut; }

function DE(){ return CUT() + 1440; }

function actList(){ try{ var a = JSON.parse(get("r.act") || "[]"); return Array.isArray(a) ? a.filter(function(x){ return Array.isArray(x) && typeof x[0] === "number" && typeof x[1] === "number"; }) : []; }catch(e){ return []; } }

function actNote(n){
  var a = actList(), L = a[a.length - 1];
  if(L && n >= L[0] && n - L[1] < 15*6e4){ if(n - L[1] < 60e3) return; L[1] = n; }
  else a.push([n, n]);
  set("r.act", JSON.stringify(a.filter(function(x){ return n - x[1] < 4*864e5 && x[0] <= n + 6e5; }).slice(-300)));
}

function actPts(){   /* every moment you used the app: open time + every change you made */
  var ra = get("r.act") || "", rs = get("r.snaps") || "", k = ra.length + "|" + rs.length + "|" + ra.slice(-30) + "|" + rs.slice(-40);
  if(QG.k === k) return QG.pts;
  var pts = actList().map(function(x){ return [x[0], x[1]]; });
  snaps().forEach(function(x){ if(x && typeof x.ts === "number") pts.push([x.ts, x.ts]); });
  pts.sort(function(a, b){ return a[0] - b[0]; });
  QG = {k:k, pts:pts}; return pts;
}

function addDays(d, n){ var x = new Date(d); x.setDate(x.getDate()+n); return x; }

function addMonths(d, n, day){ var x = new Date(d.getFullYear(), d.getMonth()+n, 1, 12); var last = new Date(x.getFullYear(), x.getMonth()+1, 0).getDate(); x.setDate(Math.min(day || d.getDate(), last)); return x; }

function advance(it, o){
  o = o || {};
  var td = today(), T0 = iso(td);
  /* Hourly tasks can be checked repeatedly in one day. Keep the earlier undo
     chain so unchecking the most recent, then the preceding occurrence works. */
  var prior = it.unit === "h" && it.prev && it.prev.date === T0 && it.prev.slot !== undefined ? it.prev : null;
  it.prev = {next:it.next, last:it.last, anchor:it.anchor, times:it.times.slice(), at0:it.at0, laterDate:it.laterDate, date:T0};
  if(prior){ it.prev.parent = prior; var link=it.prev, depth=0; while(link.parent && ++depth<48) link=link.parent; if(link.parent) link.parent=null; }
  it.laterDate = null;
  if(!o.missed) it.last = T0;
  if(it.unit === "h"){
    var occ = dt(it.next, it.times[0]), now = new Date(), base, N; now.setSeconds(0, 0);
    base = o.at ? dt(T0, o.at) : now; if(base > now) base = new Date(base.getTime() - 864e5); /* a done time is never in the future: before wake-up = earlier, not tomorrow */
    if(it.kind === "fixed" && !it.shift) N = gridAfter(it, now > occ ? now : occ);
    else { N = new Date(base.getTime() + it.n*36e5); if(it.shift && !o.missed){ it.anchor = ldate(base); it.at0 = hm(base.getHours()*60 + base.getMinutes()); } }
    setOcc(it, N); return;
  }
  if(it.kind === "fixed" && !it.shift) it.next = iso(nextFixed(it, parse(it.next) > td ? parse(it.next) : td));
  else { it.next = iso(step(it, td, 1)); if(it.shift) it.anchor = it.next; }
}

function ap(h){ return lang === "ar" ? (h < 12 ? "ص" : "م") : (h < 12 ? "AM" : "PM"); }

function apply(kind, id, time, o){
  o = o || {}; syncCut();
  var it = find(id); if(!it) return null;
  var T0 = iso(today()), res = {on:true, it:it, time:time};
  if(kind === "slot"){
    if(!it.slots || it.slots.date !== T0) it.slots = {date:T0, done:{}, snz:{}};
    if(!it.slots.snz) it.slots.snz = {};
    var cur = it.slots.done[time] || dlGet(it)[time], has = cur && cur !== "×";
    if(o.later){
      var nv = o.to && mins(o.to) !== null ? lm(o.to) : Math.min(DE() - 5, nowMin() + 30);
      if(it.unit === "h"){ setOcc(it, dt(T0, hm(nv))); it.slots.mv = it.times[0]; } else it.slots.snz[time] = hm(nv);   /* mv: you moved it yourself */
      res.later = hm(nv); return res;
    }
    if(it.unit === "h"){
      if(has && !o.at){
        delete it.slots.done[time]; dlSet(it, time, null); res.on = false;
        if(it.prev && (it.prev.slot === undefined || it.prev.slot === time)){
          restore(it);
          /* Older checks may already have been unchecked out of order. Once no
             later check depends on them, rewind their snapshots as well. */
          while(it.prev && it.prev.date === T0 && it.prev.slot !== undefined && !Object.prototype.hasOwnProperty.call(it.slots.done,it.prev.slot) && !Object.prototype.hasOwnProperty.call(dlGet(it),it.prev.slot)) restore(it);
        }
      }   /* unchecking an older check alone must not rewind past a later check */
      else if(o.missed){ it.slots.done[time] = "×"; dlSet(it, time, "×"); advance(it, {missed:true}); it.prev.slot = time; }
      else if(has){ it.slots.done[time] = o.at; dlSet(it, time, o.at); if(it.prev && it.prev.date === T0 && it.prev.slot === time && (it.shift || it.kind === "flex")){ restore(it); advance(it, {at:o.at}); it.prev.slot = time; } }   /* new time for a done one: never a second step */
      else { var st = o.at || stamp(); it.slots.done[time] = st; dlSet(it, time, st); advance(it, {at:st}); it.prev.slot = time; }
    } else {
      var allDone = it.last === T0 && it.next !== T0;
      if((has || (allDone && !cur)) && !o.at){
        delete it.slots.done[time]; dlSet(it, time, null); res.on = false; if(it.next !== T0) restore(it);
        if(it.next !== T0 && it.last === T0 && !Object.keys(dlGet(it)).some(function(k){ return dlGet(it)[k] !== "×"; })){ it.next = T0; it.last = null; it.prev = null; }   /* not done today any more → due today */
      }
      else {
        var st2 = o.missed ? "×" : (o.at || stamp());
        it.slots.done[time] = st2; dlSet(it, time, st2);   /* the row stays where it was: planned time, or the time it was moved to */
        if(it.next === T0 && it.times.every(function(x){ return it.slots.done[x]; })) advance(it, {missed:o.missed});
        retime(it);
      }
    }
    if(o.missed) res.on = false;
  } else if(kind === "win"){
    var k = winToday(it);
    if(k !== null){ it.log.splice(k, 1); res.on = false; if(it.prev && it.prev.date === T0) it.last = it.prev.last; }
    else { it.prev = {last:it.last, date:T0}; it.log.push(logKey(it)); it.last = T0; }
  } else {
    if(o.later){
      var chosen = typeof o.date === "string" && parse(o.date) && iso(parse(o.date)) === o.date && o.date > T0 ? o.date : iso(addDays(today(), o.days || 1));
      it.next = chosen; it.laterDate = chosen; res.later = "d:" + chosen; return res;
    }
    if(o.missed){ skipItem(it); res.on = false; return res; }
    if(it.last === T0 && parse(it.next) > today()){   /* done today → tap again = not done */
      if(it.prev && it.prev.date === T0) restore(it); else { it.next = T0; it.last = null; }
      dlSet(it, "*", null); res.on = false;
    }
    else { advance(it); dlSet(it, "*", stamp()); }
  }
  return res;
}

function askRec(){ try{ return JSON.parse(get("r.ask") || "null"); }catch(e){ return null; } }

function askSet(o){ set("r.ask", o ? JSON.stringify(o) : ""); if(!o){ ND2 = false; NWDay = 0; } }

function atDay(d, m){ return new Date(d.getFullYear(), d.getMonth(), d.getDate(), Math.floor(m/60), m % 60, 0, 0).getTime(); }

function autoWake(){
  if(ND2 || askRec() || Date.now() - LI >= 5*60e3) return;  /* do not guess while awaiting an answer or the screen is idle */
  var d = dayInfo(); if(d.ext || d.wake !== null) return;
  if(get("r.autoOff") === iso(d.D)) return;
  var now = Date.now(), w = wakeRec(), u = usualWake(), rec = null;
  if(w && w.at <= now + 6e5 && w.at >= d.mid - 864e5){
    var up = typeof w.up === "number" && w.up <= w.at ? w.up : w.at;
    if(now - up < 60*36e5 && stillUp(w, now)){
      var wd = new Date(w.at), C = w.at < d.mid ? extCut(wd.getHours()*60 + wd.getMinutes(), true) : 0;
      rec = {at:Math.min(now, d.mid + Math.max(C, u === null ? 0 : u)*6e4), up:up}; if(w.still) rec.still = w.still;
    }
  }
  if(!rec){
    if(u === null) return;
    var S = d.mid + u*6e4; if(now < S) return;
    var wake = S, g = w ? quietGaps(Math.max(sleepFrom(w), d.mid - 864e5), now).pop() : null;
    if(g) wake = g[0] > S ? g[1] : Math.min(S, g[1]);
    rec = {at:wake};
    if(w && w.at >= d.mid - 864e5){ var pu = typeof w.up === "number" && w.up <= w.at ? w.up : w.at; if(pu < wake && wake - pu < 48*36e5){ rec.pu = pu; if(g && g[0] - pu >= 14*36e5) rec.late = 1; } }   /* for "Didn't sleep?" (late night = ask on the main screen too) */
  }
  var rd = new Date(rec.at); rec.a = 1; rec.date = iso(rd); rec.t = hm(rd.getHours()*60 + rd.getMinutes());
  set("r.wake", JSON.stringify(rec)); set("r.ndSeen", "1"); DI = null;
  if(askRec()) askSet(null);
}

function awakeList(){ try{ var a = JSON.parse(get("r.awake") || "[]"); return Array.isArray(a) ? a.filter(function(x){ return typeof x === "number"; }) : []; }catch(e){ return []; } }

function badgePlan(out, ev, m, wk, uw){
  var now = Date.now(), lim = now + 50*36e5, td = today(), T0 = iso(td);
  function owed(d){ var D = iso(d), n = 0; items.forEach(function(it){ if(!it.paused && it.kind !== "window" && it.unit !== "h" && it.wake === null && !it.times.length && it.next < D) n++; }); return n; }
  function endOf(d, w){   /* when day d gives way to the next one if you don't touch the app (see dayInfo / extCut) */
    var n = addDays(d, 1); if(w === null) return atDay(n, 0);
    return Math.min(atDay(n, extCut(w, true)), Math.max(atDay(n, extCut(w, false)), Math.ceil((now + 3*36e5) / 9e5) * 9e5));   /* 3 h quiet = asleep (to the next quarter hour, so the plan doesn't change every minute) */
  }
  var pts = [], seen = {}, early = {}, cnt = m.pending, curD = T0, shown = cnt, sil = [], d1 = addDays(td, 1), d2 = addDays(td, 2), d3 = addDays(td, 3);
  m.slots.forEach(function(s){ if(!s.done && !s.missed && (s.state === "now" || s.state === "late")) seen[s.it.unit === "h" ? s.it.id + "|" + T0 : s.it.id + "|" + T0 + "|" + s.time] = 1; });
  if(Date.now() >= calEnd()){ m.any.forEach(function(a){ if(!a.done && !a.wh && a.it.wake === null) seen["*" + a.it.id] = 1; }); m.dayWin.forEach(function(o){ if(!o.met) seen["*" + o.it.id] = 1; }); }
  /* still up after midnight: what was "anytime today" is now late */
  m.any.forEach(function(a){ if(!a.done && !a.wh && a.it.wake === null) ev.push({at:calEnd(), D:T0, k:"*" + a.it.id}); });
  m.dayWin.forEach(function(o){ if(!o.met) ev.push({at:calEnd(), D:T0, k:"*" + o.it.id}); });
  var D1 = iso(d1);
  items.forEach(function(it){ if(!it.paused && it.unit !== "h" && it.wake === null && (it.kind === "window" ? it.period === "d" : !it.times.length && it.next === D1)) ev.push({at:atDay(d2, 0), D:D1, k:"*" + it.id}); });
  [[endOf(td, wk), d1], [endOf(d1, uw), d2], [endOf(d2, uw), d3]].forEach(function(x){ if(x[0] > now && x[0] < lim) pts.push({at:x[0], o:0, D:iso(x[1]), d:x[1]}); });
  ev.forEach(function(e){ if(e.at > now && e.at < lim) pts.push({at:e.at, o:1, e:e}); });
  out.forEach(function(n){ pts.push({at:n.at, o:2, n:n}); });
  pts.sort(function(a, b){ return a.at - b.at || a.o - b.o; });
  for(var i = 0; i < pts.length;){
    var at = pts[i].at, rang = false;
    for(; i < pts.length && pts[i].at === at; i++){
      var p = pts[i];
      if(p.o === 0){ if(p.D <= curD) continue; curD = p.D; seen = early[curD] || {}; cnt = owed(p.d) + Object.keys(seen).length; }
      else if(p.o === 1){ var e = p.e;
        if(e.D === curD){ if(!seen[e.k]){ seen[e.k] = 1; cnt++; } }
        else if(e.D > curD){ (early[e.D] = early[e.D] || {})[e.k] = 1; } }   /* tomorrow's task due before today has ended: counts once tomorrow starts */
      else { p.n.badge = cnt; rang = true; }
    }
    if(!rang && cnt !== shown && at > now + 3e4) sil.push({at:at, kind:"badge", title:"", body:"", data:{}, badge:cnt});
    shown = cnt;
  }
  return out.concat(sil).sort(function(a, b){ return a.at - b.at; });
}

function calDay(){ return today(); }

function calEnd(){ var e = addDays(today(), 1); e.setHours(0,0,0,0); return e.getTime(); }

function dayEnd(){ return calEnd(); }

function dayInfo(){
  var now = Date.now(), raw = get("r.wake") || "";
  if(DI && DI.raw === raw && Math.abs(now - DI.t) < 1000) return DI;
  var D = new Date(now); D.setHours(12,0,0,0);
  var mid = new Date(D); mid.setHours(0,0,0,0);
  var M = mid.getTime(), w = wakeRec(), ok = !!(w && w.at >= M && w.at <= now + 6e5);   /* today's wake-up, never one "in the future" */
  var di = {raw:raw, t:now, D:D, mid:M, cut:0, wake:ok ? w.at : null, ext:false};
  if(w && w.at < M && String(w.at) !== get("r.noext")){
    var Y = addDays(D, -1), ym = new Date(Y); ym.setHours(0,0,0,0);
    if(w.at >= ym.getTime()){   /* woke up yesterday and no New Day since: still up? */
      var wd = new Date(w.at), C = extCut(wd.getHours()*60 + wd.getMinutes(), stillUp(w, now));
      if((now - M) / 6e4 < C) di = {raw:raw, t:now, D:Y, mid:ym.getTime(), cut:C, wake:w.at, ext:true};
    }
  }
  DI = di;
  if(RDY) syncCut();
  return DI;
}

function dayLen(){                     /* hours you usually stay up: from your answers, 16 until it knows you */
  var a = awakeList().sort(function(x, y){ return x - y; }); if(!a.length) return 16;
  var md = a[a.length >> 1] / 60; return a.length < 3 ? (md + 16) / 2 : md;
}

function describe(it, full){
  var p = [freq(it)];
  if(it.kind === "window") return p[0];
  if(it.wake !== null && it.wake !== undefined) p.push(it.unit === "h" ? (it.wake ? t("fromWake", {x:dur(it.wake)}) : t("fromWake0")) : (it.wake ? t("wakeOff", {x:dur(it.wake)}) : t("wake0")));
  if(full && floats(it) && (it.unit === "w" || it.unit === "m") && parse(it.next) && it.wake === null){ var g0 = diff(today(), parse(it.next)); p.push(t("stFrom", {d:g0 === 0 ? t("todayW").toLowerCase() : g0 === 1 ? t("tomorrow").toLowerCase() : fmt(parse(it.next), {weekday:"short", day:"numeric", month:"short"})})); }
  if(full && it.times.length && (it.wake === null || it.wake === undefined)) p.push(it.unit === "h" ? t("stAt", {t:ft(it.times[0])}) : t("atT", {t:joinTimes(it.times)}));
  if(floats(it)) p.push(t("afterDone"));
  if(!full && it.last && !it.times.length && (it.wake === null || it.wake === undefined) && it.unit !== "h"){ var g = diff(parse(it.last), today()); p.push(t("lastDone", {x: g <= 0 ? t("agoToday") : t("ago", {n:g})})); }
  return p.join(" · ");
}

function diff(a, b){ return Math.round((b - a) / 864e5); }

function dlGet(it){ return it.dl && it.dl.date === iso(today()) ? it.dl.k : {}; }

function dlSet(it, k, v){ var T0 = iso(today()); if(!it.dl || it.dl.date !== T0) it.dl = {date:T0, k:{}}; if(v === null) delete it.dl.k[k]; else it.dl.k[k] = v; }

function dt(d, h){ var x = parse(d) || today(), m = lm(h) || 0; return new Date(x.getFullYear(), x.getMonth(), x.getDate(), Math.floor(m/60), m % 60, 0, 0); }

function dtC(d, h, cut){ var x = parse(d), m = mins(h); if(!x || m === null) return null; m = m < cut ? m + 1440 : m; return new Date(x.getFullYear(), x.getMonth(), x.getDate(), Math.floor(m/60), m % 60, 0, 0); }

function dueOn(it, d){   /* does a daily/weekly/monthly task fall on day d? (d after today) */
  var n0 = parse(it.next), td = today(); if(!n0) return false; if(n0 < td) n0 = td;
  var D = iso(d); if(iso(n0) === D) return true; if(n0 > d) return false;
  for(var k = 1; k < 800; k++){ var x = step(it, n0, k), X = iso(x); if(X === D) return true; if(X > D) return false; }
  return false;
}

function dur(m){ m = Math.abs(m); var h = Math.floor(m/60), r = m % 60; return h ? h+t("hAbbr")+(r ? " "+r+t("mAb") : "") : r+" "+t("min"); }

function everyN(n, u){
  if(lang === "ar"){ var du = {h:"ساعتين", d:"يومين", w:"أسبوعين", m:"شهرين"}, sg = {h:"ساعة", d:"يومًا", w:"أسبوعًا", m:"شهرًا"};
    return n === 2 ? "كل " + du[u] : n <= 10 ? t("eN", {n:n, u:t("u" + u)}) : "كل " + n + " " + sg[u]; }
  if(lang === "fr" && (u === "h" || u === "w")) return "Toutes les " + n + " " + t("u" + u);
  return t("eN", {n:n, u:t("u" + u)});
}

function extCut(wt, up){
  var C = up ? Math.max(60, Math.min(wt, 720))                                         /* still up: until the time you woke up (or noon) */
    : Math.max(60, Math.min(wt, 720, Math.round(wt + dayLen()*60 + 240 - 1440)));   /* usual day + 4 h, never past your wake-up time or noon */
  (Array.isArray(items) ? items : []).forEach(function(i){
    if(!i || i.paused || i.kind === "window" || i.unit === "h" || (typeof i.wake === "number" && i.wake >= 0)) return;
    (Array.isArray(i.times) ? i.times : []).forEach(function(x){ var m = mins(x); if(m !== null && m < C) C = m; });
  });
  return C;
}

function find(id){ for(var i = 0; i < items.length; i++) if(items[i].id === id) return items[i]; return null; }

function firstOnOrAfter(it, day){ return nextFixed(it, addDays(day, -1)); }

function floats(it){ return it.kind === "flex" || !!it.shift; }

function fmt(d, o){ try{ return new Intl.DateTimeFormat(lang === "ar" ? "ar-MA" : lang, o).format(d); }catch(e){ return iso(d); } }

function freq(it){
  if(it.kind === "window"){ var sp = t("some" + it.period); return it.quota > 1 ? qtxt(it.quota) + " · " + sp.charAt(0).toLowerCase() + sp.slice(1) : sp; }
  var a = parse(it.anchor) || parse(it.next) || today(), n = it.n, fl = floats(it);
  if(it.unit === "h") return n === 1 ? t("eHour") : everyN(n, "h");
  if(it.unit === "d") return n === 1 ? t("eDay") : everyN(n, "d");
  if(it.unit === "w"){
    if(fl) return n === 1 ? t("eOne", {u:t("u1w")}) : everyN(n, "w");
    var w = fmt(a, {weekday:"long"}); return n === 1 ? t("eWeekOn", {w:w}) : everyN(n, "w") + " " + t("onW", {w:w});
  }
  var f = n === 1 ? t("eMonth") : everyN(n, "m");
  return fl ? f : f + " " + t("onDay", {n:ord(a.getDate())});
}

function ft(x){ var m = typeof x === "number" ? x : mins(x); if(m === null || m === undefined) return x || ""; m = ((m % 1440) + 1440) % 1440; if(!h12()) return hm(m); var h = Math.floor(m/60); return ((h % 12) || 12)+":"+("0"+(m%60)).slice(-2)+" "+ap(h); }

function getWake(){ var d = dayInfo(); return d.wake === null ? null : Math.round((d.wake - d.mid) / 6e4); }

function gridA(it){ return dt(it.anchor, it.at0); }

function gridAfter(it, x){ var A = gridA(it), s = it.n*36e5; if(x < A) return A; return new Date(A.getTime() + (Math.floor((x - A)/s) + 1)*s); }

function gridLE(it, x){ var A = gridA(it), s = it.n*36e5; if(x < A) return A; return new Date(A.getTime() + Math.floor((x - A)/s)*s); }

function guardClock(){
  var now = Date.now(), seen = +get("r.seen") || 0;
  if(seen && now < seen - 5*60e3){
    var a = snaps(), pick = null, T0 = iso(today());
    for(var i = a.length - 1; i >= 0; i--) if(a[i].ts <= now){ pick = a[i]; break; }
    var before = JSON.stringify(items);
    if(pick){ try{ items = JSON.parse(pick.s).map(norm).filter(Boolean); }catch(e){} }
    items.forEach(function(it){                     /* nothing can have happened after "now" */
      if(it.last && it.last > T0) it.last = null;
      it.log = it.log.filter(function(d){ return d <= iso(calDay()); });
      if(it.slots && it.slots.date > T0) it.slots = null;
      if(it.dl && it.dl.date > T0) it.dl = null;
      if(it.prev && it.prev.date > T0) it.prev = null;
    });
    Object.keys(hist).forEach(function(k){ if(k > T0) delete hist[k]; });
    set("r.hist", JSON.stringify(hist));
    set("r.snaps", JSON.stringify(a.filter(function(x){ return x.ts <= now; })));
    if((+get("r.catchAt") || 0) > now) set("r.catchAt", "0");
    set("r.items", JSON.stringify(items));
    warped = before;
  }
  syncCut(); repairFuture();
  if(!warped) pushSnap(JSON.stringify(items));   /* baseline: the state as it is right now */
  set("r.seen", String(now));
}

function h12(){ return get("r.clock") === "12"; }

function hm(m){ m = ((m % 1440) + 1440) % 1440; return ("0"+Math.floor(m/60)).slice(-2)+":"+("0"+(m%60)).slice(-2); }

function iso(d){ return d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2); }

function joinTimes(a){ a = a.map(ft); return a.length < 2 ? a.join("") : a.slice(0, -1).join(", ") + t("and") + a[a.length-1]; }

function lastWake(){ var w = wakeRec(); if(!w) return null; var n = Date.now(); return w.at > n + 6e5 || n - w.at > 48*3600e3 ? null : w.at; }

function ldC(X, cut){ return iso(new Date(X.getTime() - cut*6e4)); }

function ldate(X){ return iso(new Date(X.getTime() - CUT()*6e4)); }

function learnWake(at){ var d = new Date(at), a = wakeList(); a.push(d.getHours()*60 + d.getMinutes()); set("r.wakes", JSON.stringify(a.slice(-9))); }

function lm(x){ var m = typeof x === "number" ? x : mins(x); if(m === null) return null; return m < CUT() ? m + 1440 : m; }

function logKey(it){ return it.period === "d" ? iso(today()) : iso(calDay()); }

function mins(s){ var p = /^(\d{1,2}):(\d{2})$/.exec(s || ""); return p ? (+p[1])*60 + (+p[2]) : null; }

function model(){
  syncCut();
  var td = today(), T0 = iso(td), nm = nowMin();
  /* pending = the red badge: tasks whose time has come and aren't checked (due now or late) + tasks from an earlier day.
     "Anytime today" ones count only once today's date is over (still up after midnight) — until then they have the whole day. */
  var m = {overdue:[], slots:[], any:[], dayWin:[], week:[], month:[], coming:[], done:0, total:0, pending:0, ontime:0}, pastD = Date.now() >= calEnd();
  function slot(it, tm, sd, snz, forceDone){
    var v = sd[tm], eff = (snz && snz[tm]) || tm, mm = lm(eff);
    var s = {it:it, time:tm, eff:eff, snoozed:eff !== tm, min:mm, delta:mm - nm, at:null, done:false, missed:false};
    if(v === "×"){ s.missed = true; s.state = "missed"; }
    else if(v || forceDone){ s.done = true; s.at = v || null; s.state = "done"; if(!v || lm(v) <= lm(tm) + 30) m.ontime++; }
    else s.state = s.delta < -30 ? "late" : s.delta <= 0 ? "now" : "soon";
    m.slots.push(s); m.total++; if(it === CUR) SHOWN[tm] = 1;
    if(s.done) m.done++; else if(s.state === "late" || s.state === "now") m.pending++;
  }
  var CUR = null, SHOWN = {}, ANYDONE = false;
  function anyDone(it){ m.any.push({it:it, done:true}); m.total++; m.done++; ANYDONE = true; }
  items.forEach(function(it){
    CUR = it; SHOWN = {}; ANYDONE = false;
    var DL = dlGet(it);
    one(it);
    /* anything checked today that the schedule no longer shows (edited, skipped, paused…) */
    Object.keys(DL).forEach(function(k){ if(k === "*"){ if(!ANYDONE) anyDone(it); } else if(!SHOWN[k] && mins(k) !== null) slot(it, k, DL, it.slots && it.slots.date === T0 ? it.slots.snz : null, false); });
  });
  function one(it){
    if(it.paused) return;
    if(it.kind === "window"){
      var pd = it.period === "d" ? td : calDay(), pr = period(it.period, pd), a = iso(pr[0]), b = iso(pr[1]);
      var c = it.log.filter(function(d){ return d >= a && d <= b; }).length;
      var o = {it:it, count:c, today:winToday(it) !== null, left:diff(pd, pr[1])};
      o.met = c >= it.quota;
      if(it.period === "d"){ m.dayWin.push(o); m.total += it.quota; m.done += Math.min(c, it.quota); if(!o.met && pastD) m.pending++; }
      else (it.period === "m" ? m.month : m.week).push(o);
      return;
    }
    var on = it.slots && it.slots.date === T0, sd = on ? it.slots.done : {}, snz = on ? it.slots.snz : null, DL = dlGet(it), hasDL = Object.keys(DL).length > 0;
    if(it.unit === "h" && it.wake !== null){
      if(it.next > T0){ m.coming.push({it:it, d:diff(td, parse(it.next))}); return; }
      var wk0 = getWake();
      if(wk0 === null || it.wakeAt !== T0 + "|" + hm(wk0)){ m.any.push({it:it, done:false, wh:true}); m.total++; return; }   /* waits for your wake-up: not counted on the badge */
    }
    if(it.unit === "h"){
      var dh = diff(td, parse(it.next));
      Object.keys(sd).forEach(function(tm){ if(!(dh === 0 && tm === it.times[0])) slot(it, tm, sd, null, false); });
      if(dh === 0) slot(it, it.times[0], sd, null, false);
      else if(dh > 0) m.coming.push({it:it, d:dh});
      return;
    }
    var d = diff(td, parse(it.next)), doneToday = it.last === T0;
    if(it.times.length && (d === 0 || doneToday || (on && it.times.every(function(x){ return sd[x]; })))){
      if(!(d !== 0 && doneToday && hasDL)) it.times.forEach(function(tm){ slot(it, tm, sd, snz, doneToday && d !== 0); });   /* finished today: the done list says exactly what was done */
      if(d > 0) m.coming.push({it:it, d:d});
      return;
    }
    if(d < 0){ m.overdue.push({it:it, d:d}); m.total++; m.pending++; return; }
    if(d === 0){ m.any.push({it:it, done:false}); m.total++; if(pastD && it.wake === null) m.pending++; return; }
    if(doneToday && !hasDL) anyDone(it);
    m.coming.push({it:it, d:d});
  }
  m.slots.sort(function(a, b){ return a.min - b.min || (b.done ? 1 : 0) - (a.done ? 1 : 0) || a.it.name.localeCompare(b.it.name); });   /* same minute: done first */
  m.coming.sort(function(a, b){ return a.d - b.d || (a.it.times[0] || "99").localeCompare(b.it.times[0] || "99"); });
  m.overdue.sort(function(a, b){ return a.d - b.d; });
  m.any.sort(function(a, b){ return a.done - b.done; });
  function ws(a, b){ return a.met - b.met || (b.it.quota - b.count) - (a.it.quota - a.count); }
  m.week.sort(ws); m.month.sort(ws); m.dayWin.sort(ws);
  return m;
}

function nList(a){ return a.length <= 3 ? a.join(", ") : a.slice(0, 3).join(", ") + " +" + (a.length - 3); }

function ndUsed(){ return get("r.ndSeen") === "1"; }

function nextFixed(it, after){
  var a = parse(it.anchor) || parse(it.next); if(after < a) return a;
  /* Jump near the answer rather than walking from an old anchor: there is no
     arbitrary 5,000-occurrence ceiling. step() still applies end-of-month rules. */
  var k = it.unit === "m" ? Math.floor(((after.getFullYear()-a.getFullYear())*12 + after.getMonth()-a.getMonth())/it.n) : Math.floor(diff(a,after)/(it.n*(it.unit === "w" ? 7 : 1)));
  k = Math.max(0,k); var d=step(it,a,k); while(d<=after) d=step(it,a,++k); return d;
}

function nfGet(){ var o = {}; try{ o = JSON.parse(get("r.nf") || "{}") || {}; }catch(e){} return {t:o.t !== 0, a:o.a !== 0, m:o.m !== 0}; }

function nightish(g){
  var u = usualWake(); if(u === null) u = 480;
  var d = new Date(g[0]); d.setHours(0,0,0,0); d = addDays(d, -1);
  for(var k = 0; k < 4; k++){
    var m = new Date(d); m.setHours(0,0,0,0); var a = m.getTime() + (u - 480)*6e4, b = m.getTime() + (u + 120)*6e4;
    if(Math.min(g[1], b) - Math.max(g[0], a) >= 2*36e5) return true;
    d = addDays(d, 1);
  }
  return false;
}

function norm(i){
  if(!i || !i.name) return null;
  var it = {id:String(i.id || uid()), name:String(i.name).slice(0,120)};
  it.kind = i.kind === "window" || i.kind === "fixed" || i.kind === "flex" ? i.kind : (i.mode === "fixed" ? "fixed" : "flex");
  it.n = Math.min(365, Math.max(1, +i.n || 1)); it.unit = /^[hdwm]$/.test(i.unit) ? i.unit : "w"; it.shift = !!i.shift;
  it.quota = Math.min(31, Math.max(1, +i.quota || 1)); it.period = i.period === "m" || i.period === "d" ? i.period : "w";
  var tm = (Array.isArray(i.times) ? i.times : []).filter(function(x){ return mins(x) !== null; }).map(function(x){ return hm(mins(x)); });
  it.times = tm.filter(function(x, k){ return tm.indexOf(x) === k; }).sort();
  it.next = parse(i.next) ? i.next : iso(today()); it.anchor = parse(i.anchor) ? i.anchor : it.next;
  it.last = parse(i.last) ? i.last : null;
  it.laterDate = typeof i.laterDate === "string" && i.laterDate === it.next && parse(i.laterDate) && iso(parse(i.laterDate)) === i.laterDate ? i.laterDate : null;
  it.slots = i.slots && i.slots.date ? {date:i.slots.date, done:i.slots.done || {}, snz:i.slots.snz || {}} : null; if(it.slots && typeof i.slots.mv === "string") it.slots.mv = i.slots.mv;
  it.log = Array.isArray(i.log) ? i.log.filter(parse) : [];
  it.prev = i.prev || null; it.paused = !!i.paused; it.dl = i.dl && parse(i.dl.date) && i.dl.k && typeof i.dl.k === "object" ? {date:i.dl.date, k:i.dl.k} : null; it.desc = typeof i.desc === "string" ? i.desc.trim().slice(0,500) : "";
  it.wake = typeof i.wake === "number" && i.wake >= 0 && i.wake <= 1080 ? Math.round(i.wake) : null;
  if(it.wake !== null && (it.kind === "window" || !((it.unit === "d" && it.n === 1) || it.unit === "h"))) it.wake = null;
  it.wakeAt = it.wake !== null && typeof i.wakeAt === "string" ? i.wakeAt : null;
  if(it.kind === "window") it.times = [];
  if(it.unit === "h"){ if(it.kind === "window") it.kind = "flex"; if(!it.times.length){ var _n = new Date(); it.times = [hm(_n.getHours()*60 + _n.getMinutes())]; } it.times = [it.times[0]]; it.n = Math.min(23, it.n); }
  it.at0 = mins(i.at0) !== null ? hm(mins(i.at0)) : (it.times[0] || null);
  if(it.unit === "h" && it.kind !== "window" && typeof i.cx === "number" && i.cx > 0 && i.cx < 1440) it.cx = Math.round(i.cx);
  return it;
}

function notifPlan(){
  if(!items.length) return [];
  syncCut();
  var nf = nfGet(), out = [], ev = [], now = Date.now(), lim = now + 50*36e5, td = today(), T0 = iso(td), m = model(), wk = getWake();
  var uw = usualWake(), uT = uw !== null && wk === null && !dayInfo().ext && get("r.autoOff") !== T0 ? uw : null;   /* today, not up yet: from your usual wake-up */
  var days = [td, addDays(td, 1), addDays(td, 2)];
  function add(at, kind, title, body, data){ if(at > now + 3e4 && at < lim) out.push({at:at, kind:kind, title:title, body:body, data:data || {}}); }
  /* a task comes due: from then on it counts on the badge until you check it (an hourly one counts once: only its latest one is open) */
  function key(it, D, tm){ return it.unit === "h" ? it.id + "|" + D : it.id + "|" + D + "|" + tm; }
  function slotN(it, d, mm, tm, late, ring){
    var D = iso(d), at = atDay(d, mm);
    if(at > now && at < lim) ev.push({at:at, D:D, k:key(it, D, tm)});
    if(!ring) return;
    add(at, "slot", "⏰ " + it.name, it.desc ? ft(mm) + " · " + it.desc.slice(0, 120) : t("nNow", {t:ft(mm)}), {id:it.id, time:tm, date:D});
    if(late) add(at + 30*6e4, "late", t("nLate", {n:it.name}), t("nWas", {t:ft(mm)}), {id:it.id, time:tm, date:D});
  }
  m.slots.forEach(function(s){
    if(s.done || s.missed) return;
    var at = atDay(td, s.min), mine = s.snoozed || (s.it.unit === "h" && s.it.slots && s.it.slots.date === T0 && s.it.slots.mv === s.time);
    var ring = nf.t && !(s.it.unit === "h" && wk === null)   /* hourly ones start ringing once you tap New Day */
      && (at < calEnd() || mine);                              /* still up after midnight: quiet unless you moved it there yourself (you may fall asleep) */
    slotN(s.it, td, s.min, s.time, s.it.unit !== "h" && at < calEnd(), ring);
  });
  items.forEach(function(it){
    if(it.paused || it.kind === "window") return;
    if(it.unit === "h"){
      if(wk === null) return;
      var st = it.times[0] && dt(it.next, it.times[0]); if(!st) return;
      for(var k = 1, x = st.getTime() + it.n*36e5; k < 60 && x < lim; k++, x += it.n*36e5){
        var xd = new Date(x), xm = xd.getHours()*60 + xd.getMinutes(), dd = new Date(xd); dd.setHours(12,0,0,0);
        if(iso(dd) !== T0) break;   /* tomorrow's start when you tap New Day tomorrow */
        if(xm < wk) continue;
        slotN(it, dd, xm, hm(xm), false, nf.t);
      }
      return;
    }
    if(!it.times.length || it.wake !== null) return;
    for(var j = 1; j < days.length; j++) if(dueOn(it, days[j])) it.times.forEach(function(tm){ slotN(it, days[j], mins(tm), tm, true, nf.t); });
  });
  /* tasks "after waking" on days you haven't woken up yet: from your usual wake-up (the app takes it by itself then) */
  function wakeDay(d, w, first){
    items.forEach(function(it){
      if(it.paused || it.wake === null || it.kind === "window") return;
      var st = Math.min(1435, w + it.wake);
      if(it.unit === "h"){ for(var x = st; x < 1440; x += it.n*60) slotN(it, d, x, hm(x), false, nf.t); return; }
      if(first ? it.last === T0 || parse(it.next) > td : !dueOn(it, d)) return;
      slotN(it, d, st, hm(st), true, nf.t);
    });
  }
  if(uT !== null) wakeDay(td, uT, true);
  if(uw !== null) for(var j = 1; j < days.length; j++) wakeDay(days[j], uw, false);
  if(nf.a){
    function nudge(d, list){ if(!list.length) return; [[6, 1080], [3, 1260], [1, 1380]].forEach(function(p){ add(atDay(d, p[1]), "left", t("nLeft", {x:dur(p[0]*60)}), t("nOpen", {list:nList(list)}), {date:iso(d)}); }); }
    var open = [];
    m.overdue.forEach(function(o){ open.push(o.it.name); });
    m.any.forEach(function(a){ if(!a.done && !a.wh && a.it.wake === null) open.push(a.it.name); });
    m.dayWin.forEach(function(o){ if(!o.met) open.push(o.it.name + " (" + o.count + "/" + o.it.quota + ")"); });
    if(!periodLeft("w").days) m.week.forEach(function(o){ if(!o.met) open.push(o.it.name + " (" + o.count + "/" + o.it.quota + ")"); });
    if(!periodLeft("m").days) m.month.forEach(function(o){ if(!o.met) open.push(o.it.name + " (" + o.count + "/" + o.it.quota + ")"); });
    nudge(td, open);
    for(var j = 1; j < days.length; j++){
      var d = days[j], lst = [];
      items.forEach(function(it){
        if(it.paused || it.unit === "h") return;
        if(it.kind === "window"){
          var pr = period(it.period, d), end = iso(pr[1]);
          var count = it.log.filter(function(x){ return x >= iso(pr[0]) && x <= end; }).length;
          if((it.period === "d" || iso(d) === end) && count < it.quota) lst.push(it.name);
          return;
        }
        if(!it.times.length && it.wake === null && dueOn(it, d)) lst.push(it.name);
      });
      nudge(d, lst);
    }
  }
  out.sort(function(a, b){ return a.at - b.at; });
  return badgePlan(out.slice(0, 60), ev, m, wk, uw).slice(0, 60);
}

function nowMin(){ return Math.floor((Date.now() - dayInfo().mid) / 6e4); }

function ord(n){ if(lang !== "en") return lang === "fr" && n === 1 ? "1er" : n; var v = n % 100; return n + (v >= 11 && v <= 13 ? "th" : ["th","st","nd","rd"][n % 10] || "th"); }

function parse(s){ var p = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ""); return p ? new Date(+p[1], p[2]-1, +p[3], 12) : null; }

function period(p, d){ if(p === "d") return [d, d]; if(p === "m") return [new Date(d.getFullYear(), d.getMonth(), 1, 12), new Date(d.getFullYear(), d.getMonth()+1, 0, 12)]; var w = weekStart(d); return [w, addDays(w, 6)]; }

function periodLeft(p){
  var cd = calDay(), hrs = Math.max(0, Math.round((calEnd() - Date.now()) / 6e4)), end;
  if(p === "d"){ var dm = Math.ceil((dayEnd() - Date.now()) / 6e4); return dm <= 0 ? {x:t("leftX", {x:dur(0)}), red:true, min:0, past:true} : {x:t("leftX", {x:dur(dm)}), red:dm <= 180, min:dm}; }
  end = p === "w" ? addDays(weekStart(cd), 6) : new Date(cd.getFullYear(), cd.getMonth()+1, 0, 12);
  var l = diff(cd, end);
  return l === 0 ? {x:t("leftX", {x:dur(hrs)}), red:true, min:hrs} : {x:t("daysLeft", {n:l + 1}), red:l <= 1, min:hrs + l*1440, days:l + 1};
}

function pushSnap(j){
  var a = snaps(), now = Date.now();
  if(a.length && a[a.length-1].s === j) return;
  a.push({ts:now, s:j, d:iso(today())});
  /* never prune by age: "now" may be fake. Keep the last 30 states + the last state of each of 14 days */
  if(a.length > 30){
    var last = {}; a.forEach(function(x, k){ last[iso(new Date(x.ts))] = k; });
    var keepK = Object.keys(last).sort().slice(-14).map(function(d){ return last[d]; }), n = a.length;
    a = a.filter(function(x, k){ return k >= n - 30 || keepK.indexOf(k) > -1; });
  }
  set("r.snaps", JSON.stringify(a));
}

function qtxt(q){ if(q === 1) return t("once"); if(lang === "ar") return q === 2 ? "مرتين" : q <= 10 ? q+" مرات" : q+" مرة"; return t("timesN", {n:q}); }

function quietGaps(from, to){
  var gaps = [], cur = from, G = 3*36e5;
  actPts().forEach(function(p){ if(p[1] < from || p[0] > to) return; var st = Math.max(p[0], from); if(st - cur >= G) gaps.push([cur, st]); if(p[1] > cur) cur = Math.min(p[1], to); });
  if(to - cur >= G) gaps.push([cur, to]);
  return gaps.filter(nightish);
}

function recut(it, c0, c1){
  var r = it.times[0] && dtC(it.next, it.times[0], c0); if(r) it.next = ldC(r, c1);
  var a = it.at0 && dtC(it.anchor, it.at0, c0); if(a) it.anchor = ldC(a, c1);
  if(it.prev && it.prev.times && it.prev.times[0] && it.prev.next){ var p = dtC(it.prev.next, it.prev.times[0], c0); if(p) it.prev.next = ldC(p, c1); }
  if(it.prev && it.prev.anchor && it.prev.at0){ var q = dtC(it.prev.anchor, it.prev.at0, c0); if(q) it.prev.anchor = ldC(q, c1); }
}

function rel(s){ if(s.state === "missed") return t("missedTag"); return s.state === "done" ? (s.at ? t("doneAt", {t:ft(s.at)}) : "") : s.state === "now" ? (s.delta >= -2 ? t("nowTag") : t("lateX", {x:dur(s.delta)})) : s.state === "late" ? t("lateX", {x:dur(s.delta)}) : t("inX", {x:dur(s.delta)}); }

function repairFuture(){
  var td = today(), T0 = iso(td), n = 0;
  items.forEach(function(it){
    var bad = false;
    if(it.last && it.last > T0){ it.last = null; bad = true; }
    var l = it.log.length, C0 = iso(calDay()); it.log = it.log.filter(function(d){ return d <= C0; }); if(l !== it.log.length) bad = true;
    if(it.slots && it.slots.date > T0){ it.slots = null; bad = true; }
    if(it.dl && it.dl.date > T0){ it.dl = null; bad = true; }
    if(it.prev && it.prev.date > T0) it.prev = null;
    if(it.kind !== "window" && !it.paused){
      var nx = parse(it.next), lim;
      if(it.unit === "h") lim = addDays(td, 1);
      else { var a = it.kind === "fixed" && !it.shift ? nextFixed(it, td) : step(it, td, 1); lim = step(it, a, 1); }
      /* A deliberately selected future start must never be repaired as clock drift. */
      var futureStart = it.anchor === it.next && it.next > T0;
      if(nx > lim && it.laterDate !== it.next && !futureStart){
        if(it.unit === "h"){ var nw = new Date(); nw.setSeconds(0, 0); setOcc(it, nw); if(it.shift || it.kind === "flex"){ it.anchor = it.next; it.at0 = it.times[0]; } }
        else it.next = iso(it.kind === "fixed" && !it.shift ? firstOnOrAfter(it, td) : td);
        if(it.shift && it.unit !== "h") it.anchor = it.next;
        it.slots = null; it.prev = null; bad = true;
      }
    }
    if(bad) n++;
  });
  var hk = Object.keys(hist).filter(function(k){ return k > T0; });
  if(hk.length){ hk.forEach(function(k){ delete hist[k]; }); set("r.hist", JSON.stringify(hist)); }
  if(n){ set("r.items", JSON.stringify(items)); repaired += n; }
}

function restore(it){
  var p = it.prev; if(!p || p.date !== iso(today()) || !p.next) return;
  it.next = p.next; it.last = p.last; if(p.anchor) it.anchor = p.anchor; if(p.times) it.times = p.times.slice(); if(Object.prototype.hasOwnProperty.call(p,"at0")) it.at0 = p.at0; if(Object.prototype.hasOwnProperty.call(p,"laterDate")) it.laterDate = p.laterDate; it.prev = it.unit === "h" && p.parent ? p.parent : null;
}

function retime(it){
  var p = it.prev, T0 = iso(today()), DL = dlGet(it);
  if(it.kind !== "fixed" || !it.shift || it.unit === "h" || it.wake !== null || !p || p.date !== T0 || !p.times || it.last !== T0 || it.next === T0) return;
  var tt = p.times.map(function(x){ return DL[x] && DL[x] !== "×" ? DL[x] : x; });
  tt = tt.filter(function(x, k){ return tt.indexOf(x) === k; }); if(tt.length < p.times.length) tt = p.times.slice();   /* two times can't merge into one */
  it.times = tt.sort(); it.at0 = it.times[0] || null;
}

function roll(){
  syncCut();
  var td = today(), T0 = iso(td), ch = false, cut = iso(addDays(td, -70));
  var wk = getWake();
  items.forEach(function(it){
    if(it.dl && it.dl.date < T0){ it.dl = null; ch = true; }
    if(it.paused) return;
    if(it.wake !== null && it.unit === "h"){   /* hourly, first one X after waking */
      if(it.next > T0) return; /* don't pull an imported future start into today */
      var key = wk === null ? null : T0 + "|" + hm(wk), on1 = it.slots && it.slots.date === T0;
      var doneT = on1 && Object.keys(it.slots.done).length > 0;
      if(it.slots && it.slots.date < T0){ it.slots = null; ch = true; }
      if(key && it.wakeAt !== key){
        if(!doneT){ var st = Math.min(DE() - 5, wk + it.wake); setOcc(it, dt(T0, hm(st))); it.anchor = T0; it.at0 = hm(st); }
        it.wakeAt = key; ch = true;
      }
      if(!key || it.wakeAt !== key) return;
    }
    else if(it.wake !== null){
      if(parse(it.next) < td){ it.next = T0; ch = true; }
      var on = it.slots && it.slots.date === T0, did = it.last === T0 || (on && Object.keys(it.slots.done).length);
      if(!did && it.next === T0){
        var want = wk === null ? [] : [hm(Math.min(DE() - 5, wk + it.wake))];
        if(want.join() !== it.times.join()){ it.times = want; it.at0 = want[0] || null; if(on) it.slots.snz = {}; ch = true; }
      }
      if(it.slots && it.slots.date < T0){ it.slots = null; ch = true; }
      return;
    }
    if(it.unit === "h"){
      var occ = dt(it.next, it.times[0]), now = new Date();
      if(it.kind === "fixed" && !it.shift){ var L = gridLE(it, now), ds = new Date(dayInfo().mid); if(L < ds) L = gridAfter(it, new Date(ds.getTime() - 1)); if(occ < L){ setOcc(it, L); ch = true; } }   /* one that fell while you slept: the first one of your day */
      else if(parse(it.next) < td){ setOcc(it, dt(T0, it.times[0])); ch = true; }
    }
    else if(it.kind !== "window" && it.times.length && parse(it.next) < td){ it.next = iso(it.kind === "fixed" ? firstOnOrAfter(it, td) : td); ch = true; }
    if(it.slots && it.slots.date < T0){ it.slots = null; ch = true; }
    var l = it.log.length; it.log = it.log.filter(function(d){ return d >= cut; }); if(l !== it.log.length) ch = true;
  });
  if(ch) save();
}

function save(){ var j = JSON.stringify(items); set("r.items", j); pushSnap(j); }

function setOcc(it, D){ it.next = ldate(D); it.times = [hm(D.getHours()*60 + D.getMinutes())]; }

function setWake(m){
  var d = iso(today());
  if(m === null) set("r.wake", "null"); else { var at = dayInfo().mid + m*6e4; set("r.wake", JSON.stringify({at:at, date:iso(new Date(at)), t:hm(m)})); }
  if(m !== null) set("r.ndSeen", "1");
  DI = null;
}

function skipItem(it){
  it.laterDate = null;
  if(it.unit === "h"){ var occ = dt(it.next, it.times[0]); setOcc(it, it.kind === "fixed" && !it.shift ? gridAfter(it, occ) : new Date(occ.getTime() + it.n*36e5)); }
  else it.next = iso(it.kind === "fixed" && !it.shift ? nextFixed(it, parse(it.next)) : step(it, parse(it.next), 1));
  it.slots = null;
}

function sleepFrom(w){ return Math.max((w.up || w.at) + 10*36e5, w.still || 0); }

function sleptLikely(l, n){
  if(!l || n <= l || n - l < 3*36e5) return false;
  var w = lastWake(), rec = wakeRec();
  if(w === null && !(wakeTasks().length || ndUsed())) return false;
  if(rec && typeof rec.still === "number" && l < rec.still) l = rec.still;
  if(n - l < 3*36e5) return false;
  if(w !== null && n - (rec && typeof rec.up === "number" ? rec.up : w) < 12*36e5) return false;
  var d = new Date(n); d.setHours(0,0,0,0);
  var u = usualWake(); if(u === null) u = 480;
  var usual = new Date(d); usual.setMinutes(u);
  /* Two night hours must be before the usual wake, not merely an afternoon gap. */
  if(!nightish([l, Math.min(n, usual.getTime())])) return false;
  /* Four hours before the usual wake time is the earliest reasonable check-in.
     Use local calendar time, including on daylight-saving transition days. */
  var earliest = new Date(d); earliest.setMinutes(u - 240);
  return n >= earliest.getTime();
}

function snaps(){ try{ var a = JSON.parse(get("r.snaps") || "[]"); return Array.isArray(a) ? a : []; }catch(e){ return []; } }

function stamp(){ return hm(nowMin()); }

function step(it, d, k){ if(it.unit === "m") return addMonths(d, it.n*k, parse(it.anchor) ? parse(it.anchor).getDate() : d.getDate()); return addDays(d, it.n*k*(it.unit === "w" ? 7 : 1)); }

function stillUp(w, now){ var f = sleepFrom(w); return f >= now || !quietGaps(f, now).length; }

function syncCut(){
  if(!RDY) return;
  var c = (DI || dayInfo()).cut; if(SYNC.c === c && SYNC.a === items) return;
  SYNC.c = c; SYNC.a = items; var ch = false;
  items.forEach(function(it){ if(it.unit !== "h" || it.kind === "window") return; var c0 = it.cx || 0; if(c0 !== c){ recut(it, c0, c); it.cx = c; ch = true; } });
  if(ch) set("r.items", JSON.stringify(items));
}

function t(k, v){ var r = T[k], s = r ? (r[LANGS.indexOf(lang)] || r[0]) : k; if(v) for(var x in v) s = s.split("{"+x+"}").join(v[x]); return s; }

function today(){ return new Date(dayInfo().D); }

function touch(){
  var n = Date.now(), l = +get("r.open") || 0;
  if(l > n + 6e5) l = 0;
  if(!askRec()){
    if(!l){ if(lastWake() === null && (wakeTasks().length || ndUsed())) askSet({from:n, auto:0}); }
    else if(sleptLikely(l, n) && !((lastWake() || 0) > l)) askSet({from:l, auto:1});
  }
  if(!l || (n - LI < 5*60e3 && n - l >= 60e3)) set("r.open", String(n));
  if(n - LI < 5*60e3) actNote(n);
}

function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,6); }

function upSince(){
  var a = lastWake(), w = wakeRec(); if(a === null || !w) return null;
  var up = typeof w.up === "number" && w.up <= a && a - w.up < 72*36e5 ? w.up : a, d = dayInfo();
  if(d.wake === null && !d.ext && !stillUp(w, Date.now())) return null;
  return up;
}

function usualWake(){ var a = wakeList().sort(function(x, y){ return x - y; }), n = a.length; return n ? (n % 2 ? a[n >> 1] : Math.round((a[n/2 - 1] + a[n/2]) / 2)) : null; }

function wakeList(){ try{ var a = JSON.parse(get("r.wakes") || "[]"); return Array.isArray(a) ? a.filter(function(x){ return typeof x === "number" && x >= 0 && x < 1440; }) : []; }catch(e){ return []; } }

function wakeRec(){ try{ var w = JSON.parse(get("r.wake") || "null"); if(!w) return null;
  if(typeof w.at === "number") return w;
  if(w.date && /^\d\d:\d\d$/.test(w.t || "")){ var p = w.date.split("-"); return {at:new Date(+p[0], p[1]-1, +p[2], +w.t.slice(0,2), +w.t.slice(3)).getTime()}; }
  }catch(e){} return null; }

function wakeTasks(){ return items.filter(function(i){ return i.wake !== null && !i.paused; }); }

function weekStart(d){ return addDays(d, -((d.getDay()+6) % 7)); }

function winToday(it){ var a = iso(today()), b = logKey(it), k = -1; it.log.forEach(function(d, i){ if(d >= a && d <= b) k = i; }); return k > -1 ? k : null; }
  items=items.map(norm).filter(Boolean);
  if(get('r.cutv')!=='3'){ var w=wakeRec(), old=0; if(w&&w.at<=Date.now()+6e5){var wd=new Date(w.at);old=wd.getHours()*60+wd.getMinutes();if(get('r.cutv')!=='2')old=Math.min(360,old);} items.forEach(function(it){if(it.unit==='h'&&it.kind!=='window'){recut(it,old,0);delete it.cx;}});set('r.items',JSON.stringify(items));set('r.bed','');set('r.cutv','3'); }
  RDY=true;DI=null;
  if(get('r.v9')!=='1'){var d=dayInfo(),cal=iso(new Date());if(d.ext&&(hist[cal]||snaps().some(function(x){return x.d===cal;})))set('r.noext',String(d.wake));set('r.v9','1');DI=null;}
  dayInfo();
  if(!wakeList().length){var w=wakeRec(),best=null;if(w&&!w.a&&w.at<=Date.now()+6e5)learnWake(w.at);else{items.forEach(function(it){var p=/^(\d{4}-\d\d-\d\d)\|(\d\d:\d\d)$/.exec(it.wakeAt||'');if(p&&(!best||p[1]>best[1]))best=p;});if(best){var m=mins(best[2]);if(m!==null)set('r.wakes',JSON.stringify([m]));}}}
  // Native editor adapter: mirrors the existing task-save rules and preserves
  // prior task state unless a recurrence change intentionally resets it.
  function saveDraft(f) {
    const editing = f.id ? find(f.id) : null;
    if (f.id && !editing) throw new Error('Task not found');
    const name = String(f.name || '').trim();
    const n = Number(f.n), unit = f.unit, flex = f.mode === 'flex';
    if (!name || !['h','d','w','m'].includes(unit) || !Number.isInteger(n) || n < 1 || n > (unit === 'h' ? 23 : 365)) throw new Error('Invalid task or repeat');
    if (flex && (unit === 'h' || n !== 1 || !Number.isInteger(f.quota) || f.quota < 1 || f.quota > 31)) throw new Error('Invalid flexible repeat');
    const date = String(f.start || ''), parsed = parse(date);
    if (!flex && unit !== 'h' && (!parsed || iso(parsed) !== date)) throw new Error('Invalid starting date');
    const canWake = !flex && (unit === 'h' || (unit === 'd' && n === 1));
    const wake = canWake && f.wake !== null ? Number(f.wake) : null;
    if (wake !== null && (!Number.isInteger(wake) || wake < 0 || wake > 1080)) throw new Error('Invalid wake duration');
    let times = (f.times || []).slice().sort();
    if (times.some(x => !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(x)) || new Set(times).size !== times.length || (unit === 'h' && times.length > 1)) throw new Error('Invalid times');
    if (flex || wake !== null) times = [];
    if (!flex && (unit === 'h' || (unit === 'd' && n === 1)) && wake === null && !times.length) throw new Error('Choose a time');
    if (!flex && unit === 'h' && wake !== null && editing && editing.unit === 'h' && editing.wake !== null) times = editing.times.slice();
    if (!flex && unit === 'h' && !times.length) times = [stamp()];
    const it = editing ? JSON.parse(JSON.stringify(editing)) : {id:uid(),last:null,log:[]};
    const kind = flex ? 'window' : 'fixed', count = flex ? 1 : n;
    const changed = !editing || editing.kind !== kind || editing.n !== count || editing.unit !== unit || editing.period !== (flex ? unit : editing.period) || (!flex && unit !== 'h' && editing.anchor !== date) || (unit === 'h' && wake === null && editing.times[0] !== times[0]) || (editing.wake === null) !== (wake === null);
    it.name=name; it.desc=String(f.notes||'').trim().slice(0,500); it.kind=kind; it.n=count; it.unit=flex?'d':unit; it.quota=f.quota; it.period=flex?unit:'w'; it.times=times; it.shift=!flex && !!f.shift; it.wake=wake;
    if(editing && editing.wake !== null && wake !== null && editing.wake !== wake){if(unit==='h') it.wakeAt=null;else if(it.last!==iso(today())){it.times=[];it.slots=null;}}
    if(changed){
      it.wakeAt=null; const td=today(), start = unit==='h'||flex ? (dayInfo().ext && unit!=='h' ? addDays(td,1):td) : parsed, sd=iso(start);
      it.next=sd;it.anchor=sd;
      if(editing && !flex && unit!=='h' && date===f.initialStart && parse(editing.next) && editing.next>sd) it.next=it.shift?editing.next:iso(firstOnOrAfter(it,parse(editing.next)));
      it.at0=times[0]||null;it.prev=null;it.slots=null;
    }
    const wasPaused=!!(editing&&editing.paused);it.paused=!!f.paused;
    if(wasPaused&&!it.paused&&!changed&&kind!=='window'){
      const td=today(), td0=dayInfo().ext&&it.unit!=='h'?addDays(td,1):td, ni=norm(it);
      if(it.unit==='h')it.next=iso(td0);else if(parse(it.next)<td0)it.next=iso(ni.kind==='fixed'&&!ni.shift?firstOnOrAfter(ni,td0):td0);
      it.slots=null;it.prev=null;
    }
    it.cx=CUT();const result=norm(it);
    if(changed&&editing&&result.kind!=='window'&&result.unit!=='h'&&result.last===iso(today())&&result.next===iso(today())) {result.next=iso(result.kind==='fixed'&&!result.shift?nextFixed(result,today()):step(result,today(),1));if(result.shift)result.anchor=result.next;}
    if(editing)items[items.indexOf(editing)]=result;else items.push(result);
    save(); return result;
  }
  return { saveDraft, model, apply, roll, save, notifPlan, describe, freq, rel, today, iso, norm, getWake, setWake, learnWake, wakeRec, upSince, periodLeft, touch, autoWake, guardClock, t, ft, setValue:set, getValue:get, getState:()=>({...storage}), getItems:()=>items, replaceItems:(v)=>{items=v.map(norm).filter(Boolean);}, setLanguage:(v)=>{if(LANGS.includes(v)){lang=v;set('r.lang',v);}} };
}
