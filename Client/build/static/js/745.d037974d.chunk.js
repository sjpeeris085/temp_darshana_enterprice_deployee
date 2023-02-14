"use strict";(self.webpackChunktea_factory_client=self.webpackChunktea_factory_client||[]).push([[745],{1955:function(e,t,n){var a=n(19860),r=n(57829),s=n(46417);t.Z=function(e){var t,n=e.color,i=e.size,l=(0,a.Z)();switch(n){case"secondary":t=l.palette.secondary.main;break;case"error":t=l.palette.error.main;break;case"warning":t=l.palette.warning.main;break;case"info":t=l.palette.info.main;break;case"success":t=l.palette.success.main;break;default:t=l.palette.primary.main}return(0,s.jsx)(r.Z,{sx:{width:i||8,height:i||8,borderRadius:"50%",bgcolor:t}})}},41255:function(e,t,n){n.d(t,{Z:function(){return m}});var a=n(29439),r=n(1413),s=n(47313),i=n(35898),l=n(58359),o=n(34953),c=n.p+"static/media/success.fec2b23f07f1802f3e94.mp3",d=n.p+"static/media/error.68bacdfdbf6f7e34fcd6.mp3",u=n.p+"static/media/info.a800d8f6d77100112d71.mp3",h=n(85876),f=n(46417),x=s.forwardRef((function(e,t){return(0,f.jsx)(o.Z,(0,r.Z)({elevation:6,ref:t,variant:"filled"},e))})),m=(0,s.forwardRef)((function(e,t){var n=s.useState(!1),r=(0,a.Z)(n,2),o=r[0],m=r[1],p=s.useState("success"),Z=(0,a.Z)(p,2),_=Z[0],y=Z[1],g=s.useState("successsful"),v=(0,a.Z)(g,2),j=v[0],b=v[1],w=s.useState(2500),S=(0,a.Z)(w,2),C=S[0],k=S[1],P=(0,s.useState)(new Audio(c)),A=(0,a.Z)(P,1)[0],E=(0,s.useState)(!1),F=(0,a.Z)(E,2),D=F[0],O=F[1];(0,s.useEffect)((function(){D?A.play():A.pause()}),[D]),(0,s.useEffect)((function(){return A.addEventListener("ended",(function(){return O(!1)})),function(){A.removeEventListener("ended",(function(){return O(!1)}))}}),[]),s.useEffect((function(){switch(_){case h.z.SUCCESS:A.src!==c&&(A.src=c);break;case h.z.ERROR:A.src!==d&&(A.src=d);break;case h.z.WARNING:case h.z.INFO:A.src!==u&&(A.src=u)}o&&O(!D)}),[o]),(0,s.useImperativeHandle)(t,(function(){return{showAlert:function(e){var t=e.type,n=e.message,a=e.autoHideDuration;m(!0),y(t),b(n),a&&k(a)}}}));var T=function(e,t){"clickaway"!==t&&m(!1)};return(0,f.jsx)(f.Fragment,{children:(0,f.jsx)(i.Z,{spacing:2,sx:{width:"100%"},children:(0,f.jsx)(l.Z,{open:o,autoHideDuration:C,onClose:T,children:(0,f.jsx)(x,{onClose:T,severity:_,sx:{width:"100%"},children:j})})})})}))},85876:function(e,t,n){n.d(t,{V:function(){return r},z:function(){return a}});var a={SUCCESS:"success",ERROR:"error",WARNING:"warning",INFO:"info"},r=Object.freeze({SAVED:"SAVED",CSV:"CSV"})},8491:function(e,t,n){n.r(t),n.d(t,{default:function(){return pe}});var a=n(74165),r=n(15861),s=n(1413),i=n(29439),l=n(47313),o=n(9019),c=n(57829),d=n(35898),u=n(1550),h=n(24631),f=n(23306),x=n(37843),m=n(61113),p=n(79176),Z=n(24193),_=n(48310),y=n(60194),g=n(41727),v=n(77970),j=n(85554),b=n(10658),w=n.n(b),S=n(43394),C=n(72905),k=n(44948),P=n(40765),A=n(41255),E=n(9478),F=n(47192),D=(n(3463),n(79429),n(93646)),O=n(55630),T=n(85876),W=n(2135),Y=n(23477),I=n(24076),R=n(67478),z=n(85281),M=n(51629),L=n(66835),N=n(57861),H=n(90891),V=n(61689),B=n(47131),U=n(16430),X=n(3598),G=n(69888),$=n(91805),q=(n(1955),n(46417)),J=[];function K(e,t,n){return t[n]<e[n]?-1:t[n]>e[n]?1:0}function Q(e,t){return"desc"===e?function(e,n){return K(e,n,t)}:function(e,n){return-K(e,n,t)}}function ee(e,t){var n=e.map((function(e,t){return[e,t]}));return n.sort((function(e,n){var a=t(e[0],n[0]);return 0!==a?a:e[1]-n[1]})),n.map((function(e){return e[0]}))}var te=[{id:"employee_id",align:"left",disablePadding:!1,label:"Employee"},{id:"name",align:"left",disablePadding:!0,label:"Name"},{id:"designation",align:"left",disablePadding:!1,label:"Designation"},{id:"saved",align:"right",disablePadding:!1,label:"Saved"},{id:"timestamps",align:"right",disablePadding:!1,label:"Timestamps"}];function ne(e){var t=e.order,n=e.orderBy;return(0,q.jsx)(Y.Z,{children:(0,q.jsx)(I.Z,{children:te.map((function(e){return(0,q.jsx)(R.Z,{align:e.align,padding:e.disablePadding?"none":"normal",sortDirection:n===e.id&&t,children:e.label},e.id)}))})})}var ae=function(e){var t=e.handleTimesClick,n=e.hasAttendance,a=e.selectEmployee,r=(0,l.useState)("asc"),s=(0,i.Z)(r,1)[0],o=(0,l.useState)("trackingNo"),d=(0,i.Z)(o,1)[0],u=(0,l.useState)([]),h=(0,i.Z)(u,1)[0],f=(0,j.v9)((function(e){return e.employees})),x=f.employees,m=f.isLoading;J=x;return m?(0,q.jsx)(c.Z,{sx:{display:"flex",alignItems:"center",justifyContent:"center",height:"50vh"},children:(0,q.jsx)(z.Z,{})}):(0,q.jsx)(q.Fragment,{children:(0,q.jsx)(c.Z,{children:(0,q.jsx)(M.Z,{sx:{width:"100%",overflowX:"auto",position:"relative",display:"block",maxWidth:"100%","& td, & th":{whiteSpace:"nowrap"}},children:(0,q.jsxs)(L.Z,{"aria-labelledby":"tableTitle",sx:{"& .MuiTableCell-root:first-of-type":{pl:2},"& .MuiTableCell-root:last-child":{pr:3}},children:[(0,q.jsx)(ne,{order:s,orderBy:d}),(0,q.jsx)(N.Z,{children:ee(J,Q(s,d)).map((function(e,r){var s,i=(s=e.trackingNo,-1!==h.indexOf(s)),l="enhanced-table-checkbox-".concat(r);return(0,q.jsxs)(I.Z,{hover:!0,role:"checkbox",sx:{"&:last-child td, &:last-child th":{border:0}},"aria-checked":i,tabIndex:-1,selected:i,onClick:function(){return a(e._id)},children:[(0,q.jsx)(R.Z,{component:"th",id:l,scope:"row",align:"left",children:(0,q.jsx)(H.Z,{color:"secondary",component:W.rU,to:"",children:e.emp_id})}),(0,q.jsx)(R.Z,{align:"left",children:e.full_name}),(0,q.jsx)(R.Z,{align:"left",children:e.designation}),(0,q.jsx)(R.Z,{align:"right",children:e.isAttendanceSaved?(0,q.jsx)(V.Z,{title:e.isAttendanceSaved?"Attendace Saved":"Attendance Not Saved",children:(0,q.jsx)(B.Z,{size:"large",color:"secondary",children:e.isAttendanceSaved?(0,q.jsx)(U.Z,{style:{color:"#23D18B"}}):(0,q.jsx)(X.Z,{style:{color:"#FFCA28"}})})}):(0,q.jsx)(V.Z,{title:"No Timestamps found",children:(0,q.jsx)(G.Z,{})})}),(0,q.jsx)(R.Z,{align:"right",children:n||e.isAttendanceSaved?(0,q.jsx)(B.Z,{disabled:!e.isAttendanceSaved,size:"large",color:"secondary",onClick:function(){return t(e._id)},children:(0,q.jsx)($.Z,{style:{color:T.V.SAVED?e.isAttendanceSaved?"#1FA5AC":"FFCA28":"#1FA5AC"}})}):(0,q.jsx)(V.Z,{title:"No Timestamps found",children:(0,q.jsx)(G.Z,{})})})]},e._id)}))})]})})})})},re=n(94469),se=n(33604),ie=n(96467),le=n(4117),oe=n(61851),ce=[];function de(e,t,n){return t[n]<e[n]?-1:t[n]>e[n]?1:0}function ue(e,t){return"desc"===e?function(e,n){return de(e,n,t)}:function(e,n){return-de(e,n,t)}}function he(e,t){var n=e.map((function(e,t){return[e,t]}));return n.sort((function(e,n){var a=t(e[0],n[0]);return 0!==a?a:e[1]-n[1]})),n.map((function(e){return e[0]}))}var fe=[{id:"date",align:"left",disablePadding:!0,label:"Date"},{id:"present",align:"left",disablePadding:!0,label:"Present"},{id:"in",align:"left",disablePadding:!0,label:"In"},{id:"out",align:"left",disablePadding:!0,label:"Out"},{id:"working_h",align:"left",disablePadding:!0,label:"Work H"},{id:"ot_hours",align:"left",disablePadding:!0,label:"OT H"}];function xe(e){var t=e.order,n=e.orderBy;return(0,q.jsx)(Y.Z,{children:(0,q.jsx)(I.Z,{children:fe.map((function(e){return(0,q.jsx)(R.Z,{align:e.align,padding:e.disablePadding?"none":"normal",sortDirection:n===e.id&&t,children:e.label},e.id)}))})})}var me=function(e){var t=e.open,n=e.setOpen,a=e.employee,r=e.attendance,o=(e.alertRef,e.year),d=e.month,f=((0,j.I0)(),(0,l.useState)("asc")),x=(0,i.Z)(f,1)[0],p=(0,l.useState)("trackingNo"),_=(0,i.Z)(p,1)[0],y=(0,l.useState)([]),g=(0,i.Z)(y,1)[0];ce=r;return(0,q.jsxs)(re.Z,{fullWidth:!0,maxWidth:"lg",minwidth:"lg",open:t,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",disableEscapeKeyDown:!0,children:[(0,q.jsxs)(se.Z,{id:"alert-dialog-title",style:{fontWeight:"bold",fontSize:"13pt"},children:["Timestamps of ","".concat(null===a||void 0===a?void 0:a.full_name," (ID: ").concat(null===a||void 0===a?void 0:a.emp_id," | ").concat(o,"-").concat(d,")")]}),(0,q.jsx)(ie.Z,{children:(0,q.jsx)(E.Z,{sx:{mt:2},content:!1,children:(0,q.jsx)(c.Z,{children:r&&(0,q.jsx)(M.Z,{sx:{width:"100%",overflowX:"auto",position:"relative",display:"block",maxWidth:"100%","& td, & th":{whiteSpace:"nowrap"}},children:(0,q.jsxs)(L.Z,{"aria-labelledby":"tableTitle",sx:{"& .MuiTableCell-root:first-of-type":{pl:2},"& .MuiTableCell-root:last-child":{pr:3}},children:[(0,q.jsx)(xe,{order:x,orderBy:_}),(0,q.jsx)(N.Z,{children:he(ce,ue(x,_)).map((function(e,t){var n,a=(n=e.trackingNo,-1!==g.indexOf(n));"enhanced-table-checkbox-".concat(t);return(0,q.jsxs)(I.Z,{hover:!0,role:"checkbox",sx:{"&:last-child td, &:last-child th":{border:0}},"aria-checked":a,tabIndex:-1,selected:a,children:[(0,q.jsx)(R.Z,{align:"left",children:w()(e.date).format("DD/MM/YYYY")}),(0,q.jsx)(R.Z,{align:"left",style:{color:e.is_present?"green":"tomato"},children:(0,q.jsx)(m.Z,{children:e.is_present?"Present":"Absent"})}),(0,q.jsx)(R.Z,{align:"left",children:(0,q.jsx)(u.Z,{variant:"standard",children:(0,q.jsx)(S._,{dateAdapter:C.y,children:(0,q.jsx)(oe.j,{label:"In",value:""!==e.in?e.in:"",disabled:!0,renderInput:function(e){return(0,q.jsx)(h.Z,(0,s.Z)({},e))},onChange:function(e){}})})})}),(0,q.jsx)(R.Z,{align:"left",children:(0,q.jsx)(S._,{dateAdapter:C.y,children:(0,q.jsx)(oe.j,{label:"out",value:""!==e.in?e.out:"",disabled:!0,renderInput:function(e){return(0,q.jsx)(h.Z,(0,s.Z)({},e))},onChange:function(e){}})})}),(0,q.jsx)(R.Z,{align:"left",children:e.work_hours?e.work_hours:0}),(0,q.jsx)(R.Z,{align:"left",children:e.ot_hours?e.ot_hours:0})]},e.date)}))})]})})})})}),(0,q.jsx)(le.Z,{children:(0,q.jsx)(Z.Z,{onClick:function(){return n(!1)},autoFocus:!0,children:"Close"})})]})},pe=(n(35281),function(){var e=(0,j.I0)(),t=(0,j.v9)((function(e){return e.employees})),n=t.numberOfPages,b=t.employees,W=(0,l.useState)(0),Y=(0,i.Z)(W,2),I=Y[0],R=Y[1],z=(0,j.v9)((function(e){return I?e.employees.employees.find((function(e){return e._id===I})):null})),M=(0,l.useState)(1),L=(0,i.Z)(M,2),N=L[0],H=L[1],V=(0,l.useState)(!1),B=(0,i.Z)(V,2),U=B[0],X=B[1],G=(0,l.useState)(!1),$=(0,i.Z)(G,2),J=$[0],K=$[1],Q=(0,l.useState)(""),ee=(0,i.Z)(Q,2),te=ee[0],ne=ee[1],re=((0,l.useRef)(),l.useState(w()())),se=(0,i.Z)(re,2),ie=se[0],le=se[1],oe=(0,l.useState)(""),ce=(0,i.Z)(oe,2),de=(ce[0],ce[1]),ue=l.useState(),he=(0,i.Z)(ue,2),fe=he[0],xe=he[1],pe=l.useState(),Ze=(0,i.Z)(pe,2),_e=Ze[0],ye=Ze[1],ge=(0,l.useState)([]),ve=(0,i.Z)(ge,2),je=(ve[0],ve[1]),be=(0,l.useState)(""),we=(0,i.Z)(be,2),Se=we[0],Ce=we[1],ke=(0,l.useState)(""),Pe=(0,i.Z)(ke,2),Ae=Pe[0],Ee=Pe[1],Fe=(0,l.useState)([]),De=(0,i.Z)(Fe,2),Oe=De[0],Te=(De[1],l.useState(!1)),We=(0,i.Z)(Te,2),Ye=We[0],Ie=We[1],Re=l.useState(""),ze=(0,i.Z)(Re,2),Me=ze[0],Le=ze[1],Ne=(0,l.useRef)(),He=(0,l.useState)({emp_id:"",year:_e,month:fe,basic_salary:0,present_days:0,absent_days:0,day_hours:0,normal_ot:0,earnings_for_normal_ot:0,sunday_ot:0,earnings_for_sunday_ot:0,deduct_for_absent:0,deduct_for_advance:0,allowance:0,total_earnings:0,net_salary:0,user_ref:""}),Ve=(0,i.Z)(He,2),Be=Ve[0],Ue=Ve[1],Xe=(0,l.useState)({with_normal_OT:0,with_sunday_OT:0,with_absent:0,with_advance:0,with_allowance:0}),Ge=(0,i.Z)(Xe,2),$e=Ge[0],qe=Ge[1];(0,l.useEffect)((function(){for(var t=w()("".concat(_e,"-").concat(fe,"-01")).daysInMonth(),n=[],a=1;a<=parseInt(t);a++){var r=w()("".concat(_e,"-").concat(fe,"-").concat(a)),s=r.startOf("day"),i=r.endOf("day");n.push({start:s,end:i})}je(n),Ce(w()("".concat(_e,"-").concat(fe,"-01")).format("YYYY-MM-DD")),Ee(w()("".concat(_e,"-").concat(fe,"-").concat(t)).format("YYYY-MM-DD")),N&&_e&&fe&&e((0,F.zL)(N,w()("".concat(_e,"-").concat(fe,"-01")).format("YYYY-MM-DD"),w()("".concat(_e,"-").concat(fe,"-").concat(t)).format("YYYY-MM-DD")))}),[fe,_e]),(0,l.useEffect)((function(){var e=w()(),t=w()(e);le(w()(t).format()),xe(w()(t).month()+1),ye(w()(t).year()),Ue((0,s.Z)((0,s.Z)({},Be),{},{month:w()(t).month()+1,year:w()(t).year()}))}),[]),(0,l.useEffect)((function(){N&&_e&&fe&&e((0,F.zL)(N,Se,Ae))}),[N]);var Je=function(e){le(e);var t=w()(e).month()+1;xe(t);var n=w()(e).year();ye(n),Ue((0,s.Z)((0,s.Z)({},Be),{},{year:n,month:t}))};(0,l.useEffect)((function(){Qe(!1)}),[Me]),(0,l.useEffect)((function(){}),[Be]);var Ke=function(){var e=(0,r.Z)((0,a.Z)().mark((function e(t){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),Qe(!0);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Qe=function(e){if(z&&Me){var t=Be.normal_ot,n=Be.sunday_ot,a=Be.day_hours,r=Be.present_days,i=Be.absent_days,l=0,o=0,c=0,d=0,u=0;if(e||Me.map((function(e){e.is_present?(r++,0!==w()(e.date).get("day")?(t+=parseFloat(e.ot_hours),a+=parseFloat(e.work_hours)):n+=parseFloat(e.ot_hours)+parseFloat(e.work_hours)):i++})),Me){var h=104*t,f=h+z.salary;l=f;var x=104*n;o=f+=x;var m=833*i;c=f-=m,d=f-=parseFloat(Be.deduct_for_advance),u=f+=parseFloat(Be.allowance),Ue((0,s.Z)((0,s.Z)({},Be),{},{deduct_for_absent:m,earnings_for_sunday_ot:x,sunday_ot:n,normal_ot:t,earnings_for_normal_ot:h,day_hours:a,present_days:r,absent_days:i,net_salary:f,emp_id:z.emp_id,user_ref:z._id,basic_salary:z.salary,year:_e,month:fe})),qe({with_normal_OT:l,with_sunday_OT:o,with_absent:c,with_advance:d,with_allowance:u})}}},et=function(){var e=(0,r.Z)((0,a.Z)().mark((function e(){var t,n,r,s,i;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,X(!0),e.next=4,O.du(Be);case 4:t=e.sent,t.data,X(!1),R(null),de(""),Ne.current.showAlert({type:T.z.SUCCESS,message:"Successfully saved"}),tt(),e.next=18;break;case 13:e.prev=13,e.t0=e.catch(0),Ne.current.showAlert({type:T.z.ERROR,message:null===e.t0||void 0===e.t0||null===(n=e.t0.response)||void 0===n||null===(r=n.data)||void 0===r?void 0:r.message}),de(null===e.t0||void 0===e.t0||null===(s=e.t0.response)||void 0===s||null===(i=s.data)||void 0===i?void 0:i.message),X(!1);case 18:case"end":return e.stop()}}),e,null,[[0,13]])})));return function(){return e.apply(this,arguments)}}(),tt=function(){Ue({emp_id:"",year:_e,month:fe,present_days:0,absent_days:0,day_hours:0,normal_ot:0,earnings_for_normal_ot:0,sunday_ot:0,earnings_for_sunday_ot:0,deduct_for_absent:0,deduct_for_advance:0,allowance:0,total_earnings:0,net_salary:0,user_ref:""})},nt=function(){var e=(0,r.Z)((0,a.Z)().mark((function e(){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:X(!0),K("Downloading..."),fetch("http://localhost:5000/salary/get-paysheet?year=".concat(Be.year,"&month=").concat(Be.month,"&emp_id=").concat(Be.emp_id)).then((function(e){e.blob().then((function(e){var t=window.URL.createObjectURL(e),n=document.createElement("a");n.href=t,n.download="monthly_bill_of_".concat(fe,"-").concat(_e,".pdf"),n.click(),X(!1),K("")}))}));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,q.jsxs)(o.ZP,{container:!0,rowSpacing:4.5,columnSpacing:2.75,children:[(0,q.jsx)(o.ZP,{item:!0,xs:12,md:5,lg:5,children:(0,q.jsxs)(E.Z,{sx:{mt:2},content:!0,children:[(0,q.jsx)(c.Z,{sx:{p:2,pb:0}}),(0,q.jsx)("form",{noValidate:!0,onSubmit:Ke,children:(0,q.jsxs)(o.ZP,{container:!0,spacing:3,children:[(0,q.jsx)(o.ZP,{item:!0,xs:12,children:(0,q.jsx)(d.Z,{spacing:1,children:(0,q.jsx)(u.Z,{variant:"standard",children:(0,q.jsx)(S._,{dateAdapter:C.y,children:(0,q.jsx)(k.M,{views:["year","month"],label:"Year and Month",minDate:w()("2012-03-01"),maxDate:w()("2060-06-01"),value:ie,onChange:Je,renderInput:function(e){return(0,q.jsx)(h.Z,(0,s.Z)((0,s.Z)({},e),{},{helperText:null}))}})})})})}),(0,q.jsx)(o.ZP,{item:!0,xs:12,md:12,children:(0,q.jsxs)(d.Z,{spacing:1,children:[(0,q.jsx)(f.Z,{htmlFor:"employee",children:"Employee"}),(0,q.jsx)(x.Z,{id:"employee",type:"text",value:z?" ".concat(z.emp_id," - ").concat(z.first_name," ").concat(z.last_name):"",name:"employee",onChange:function(){},disabled:!1,readOnly:!0,style:{color:"#096DD9"},fullWidth:!0})]})}),(0,q.jsx)(o.ZP,{item:!0,xs:12,md:12,children:(0,q.jsxs)(d.Z,{spacing:1,children:[(0,q.jsx)(f.Z,{htmlFor:"employee",children:"Basic Salary"}),(0,q.jsx)(x.Z,{id:"basic_salary",type:"text",value:z?z.salary:"",name:"basic_salary",onChange:function(){},disabled:!1,readOnly:!0,style:{color:"#096DD9"},fullWidth:!0})]})}),(0,q.jsx)(o.ZP,{item:!0,xs:12,md:3,children:(0,q.jsxs)(d.Z,{spacing:1,children:[(0,q.jsx)(f.Z,{htmlFor:"present_days",children:"Present Days"}),(0,q.jsx)(x.Z,{id:"present_days",type:"number",value:Be.present_days,name:"present_days",onChange:function(e){Ue((0,s.Z)((0,s.Z)({},Be),{},{present_days:""===e.target.value.toString().trim()?0:e.target.value}))},disabled:!1,style:{color:"#36C656"},fullWidth:!0})]})}),(0,q.jsx)(o.ZP,{item:!0,xs:12,md:5,children:(0,q.jsxs)(d.Z,{spacing:1,children:[(0,q.jsxs)(f.Z,{htmlFor:"day_hours",children:["Day Hours ","(8:00-17:00)"]}),(0,q.jsx)(x.Z,{id:"day_hours",type:"text",value:Be.day_hours,name:"day_hours",onChange:function(e){Ue((0,s.Z)((0,s.Z)({},Be),{},{day_hours:""===e.target.value.toString().trim()?0:e.target.value}))},disabled:!1,style:{color:"#641C54"},fullWidth:!0})]})}),(0,q.jsx)(o.ZP,{item:!0,xs:12,md:4,children:(0,q.jsxs)(d.Z,{spacing:1,children:[(0,q.jsx)(f.Z,{htmlFor:"absent_days",children:"Absent Days"}),(0,q.jsx)(x.Z,{id:"absent_days",type:"number",value:Be.absent_days,name:"absent_days",onChange:function(e){Ue((0,s.Z)((0,s.Z)({},Be),{},{absent_days:""===e.target.value.toString().trim()?0:e.target.value}))},disabled:!1,style:{color:"#FEAC0A"},fullWidth:!0})]})}),(0,q.jsx)(o.ZP,{item:!0,xs:12,md:2,children:(0,q.jsxs)(d.Z,{spacing:1,children:[(0,q.jsxs)(f.Z,{htmlFor:"normal_ot",children:["Normal OT ","| Rate: 000"]}),(0,q.jsx)(x.Z,{id:"normal_ot",type:"text",value:Be.normal_ot,name:"normal_ot",onChange:function(e){Ue((0,s.Z)((0,s.Z)({},Be),{},{normal_ot:""===e.target.value.toString().trim()?0:e.target.value}))},disabled:!1,fullWidth:!0})]})}),(0,q.jsx)(o.ZP,{item:!0,xs:12,md:6,children:(0,q.jsxs)(d.Z,{spacing:1,children:[(0,q.jsx)(f.Z,{htmlFor:"earnings_for_normal_ot",children:"Earnings"}),(0,q.jsx)(x.Z,{id:"earnings_for_normal_ot",type:"text",value:Be.earnings_for_normal_ot,name:"earnings_for_normal_ot",onChange:function(e){Ue((0,s.Z)((0,s.Z)({},Be),{},{earnings_for_normal_ot:""===e.target.value.toString().trim()?0:e.target.value}))},disabled:!1,fullWidth:!0})]})}),(0,q.jsx)(o.ZP,{item:!0,xs:12,md:4,children:(0,q.jsxs)(d.Z,{spacing:1,children:[(0,q.jsx)(f.Z,{htmlFor:"with_normal_OT",children:"="}),(0,q.jsx)(x.Z,{id:"with_normal_OT",type:"text",value:$e.with_normal_OT,disabled:!0,fullWidth:!0})]})}),(0,q.jsx)(o.ZP,{item:!0,xs:12,md:2,children:(0,q.jsxs)(d.Z,{spacing:1,children:[(0,q.jsxs)(f.Z,{htmlFor:"sunday_ot",children:["Sunday OT ","| Rate: 000"]}),(0,q.jsx)(x.Z,{id:"sunday_ot",type:"text",value:Be.sunday_ot,name:"sunday_ot",onChange:function(e){Ue((0,s.Z)((0,s.Z)({},Be),{},{sunday_ot:""===e.target.value.toString().trim()?0:e.target.value}))},disabled:!1,fullWidth:!0})]})}),(0,q.jsx)(o.ZP,{item:!0,xs:12,md:6,children:(0,q.jsxs)(d.Z,{spacing:1,children:[(0,q.jsx)(f.Z,{htmlFor:"earnings_for_sunday_ot",children:"Earnings"}),(0,q.jsx)(x.Z,{id:"earnings_for_sunday_ot",type:"text",value:Be.earnings_for_sunday_ot,name:"earnings_for_sunday_ot",onChange:function(e){Ue((0,s.Z)((0,s.Z)({},Be),{},{earnings_for_sunday_ot:""===e.target.value.toString().trim()?0:e.target.value}))},disabled:!1,fullWidth:!0})]})}),(0,q.jsx)(o.ZP,{item:!0,xs:12,md:4,children:(0,q.jsxs)(d.Z,{spacing:1,children:[(0,q.jsx)(f.Z,{htmlFor:"with_sunday_OT",children:"="}),(0,q.jsx)(x.Z,{id:"with_sunday_OT",type:"text",value:$e.with_sunday_OT,disabled:!0,fullWidth:!0})]})}),(0,q.jsx)(o.ZP,{item:!0,xs:12,md:8,children:(0,q.jsxs)(d.Z,{spacing:1,children:[(0,q.jsx)(f.Z,{htmlFor:"deduct_for_absent",children:"Deduction for Absent"}),(0,q.jsx)(x.Z,{id:"deduct_for_absent",type:"text",value:Be.deduct_for_absent,name:"deduct_for_absent",onChange:function(e){Ue((0,s.Z)((0,s.Z)({},Be),{},{deduct_for_absent:""===e.target.value.toString().trim()?0:e.target.value}))},disabled:!1,style:{color:"#FEAC0A"},fullWidth:!0})]})}),(0,q.jsx)(o.ZP,{item:!0,xs:12,md:4,children:(0,q.jsxs)(d.Z,{spacing:1,children:[(0,q.jsx)(f.Z,{htmlFor:"with_absent",children:"="}),(0,q.jsx)(x.Z,{id:"with_absent",type:"text",value:$e.with_absent,disabled:!0,fullWidth:!0})]})}),(0,q.jsx)(o.ZP,{item:!0,xs:12,md:8,children:(0,q.jsxs)(d.Z,{spacing:1,children:[(0,q.jsx)(f.Z,{htmlFor:"deduct_for_advance",children:"Deduction for Advance"}),(0,q.jsx)(x.Z,{id:"deduct_for_advance",type:"text",value:Be.deduct_for_advance,name:"deduct_for_advance",onChange:function(e){Ue((0,s.Z)((0,s.Z)({},Be),{},{deduct_for_advance:""===e.target.value.toString().trim()?0:e.target.value}))},disabled:!1,style:{color:"#FEAC0A"},fullWidth:!0})]})}),(0,q.jsx)(o.ZP,{item:!0,xs:12,md:4,children:(0,q.jsxs)(d.Z,{spacing:1,children:[(0,q.jsx)(f.Z,{htmlFor:"with_advance",children:"="}),(0,q.jsx)(x.Z,{id:"with_advance",type:"text",value:$e.with_advance,disabled:!0,fullWidth:!0})]})}),(0,q.jsx)(o.ZP,{item:!0,xs:12,md:8,children:(0,q.jsxs)(d.Z,{spacing:1,children:[(0,q.jsx)(f.Z,{htmlFor:"allowance",children:"Allowance"}),(0,q.jsx)(x.Z,{id:"allowance",type:"number",value:Be.allowance,name:"allowance",onChange:function(e){Ue((0,s.Z)((0,s.Z)({},Be),{},{allowance:""===e.target.value.toString().trim()?0:e.target.value}))},disabled:!1,style:{color:"#36C656"},fullWidth:!0})]})}),(0,q.jsx)(o.ZP,{item:!0,xs:12,md:4,children:(0,q.jsxs)(d.Z,{spacing:1,children:[(0,q.jsx)(f.Z,{htmlFor:"with_allowance",children:"="}),(0,q.jsx)(x.Z,{id:"with_allowance",type:"text",value:$e.with_allowance,disabled:!0,fullWidth:!0})]})}),(0,q.jsx)(o.ZP,{item:!0,xs:12,md:12,children:(0,q.jsxs)(d.Z,{spacing:1,children:[(0,q.jsx)(f.Z,{htmlFor:"net_salary",children:"Net Salary"}),(0,q.jsx)(x.Z,{id:"net_salary",type:"number",value:Be.net_salary,name:"net_salary",onChange:function(e){Ue((0,s.Z)((0,s.Z)({},Be),{},{net_salary:""===e.target.value.toString().trim()?0:e.target.value}))},disabled:!1,style:{color:"#096DD9"},fullWidth:!0})]})}),(0,q.jsx)(o.ZP,{item:!0,xs:12,children:U&&(0,q.jsxs)(c.Z,{sx:{width:"100%",marginTop:"10px"},children:[(0,q.jsx)(m.Z,{children:J}),(0,q.jsx)(p.Z,{})]})}),(0,q.jsx)(o.ZP,{item:!0,xs:12,md:12,children:(0,q.jsx)(D.Z,{children:(0,q.jsx)(Z.Z,{disableElevation:!0,disabled:U,fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"primary",children:"Calculate"})})}),(0,q.jsx)(o.ZP,{item:!0,xs:12,md:12,children:(0,q.jsx)(D.Z,{children:(0,q.jsx)(Z.Z,{disableElevation:!0,disabled:U,fullWidth:!0,size:"large",type:"button",variant:"contained",color:"primary",onClick:et,children:"Save Paysheet"})})}),(0,q.jsx)(o.ZP,{item:!0,xs:12,md:6,children:(0,q.jsx)(D.Z,{children:(0,q.jsx)(Z.Z,{disableElevation:!0,disabled:U,fullWidth:!0,size:"large",type:"reset",variant:"contained",color:"success",onClick:nt,children:"download paysheet"})})}),(0,q.jsx)(o.ZP,{item:!0,xs:12,md:6,children:(0,q.jsx)(D.Z,{children:(0,q.jsx)(Z.Z,{disableElevation:!0,disabled:U,fullWidth:!0,size:"large",type:"reset",variant:"contained",color:"success",onClick:function(){var e="http://localhost:5000/salary/get-paysheet?year=".concat(Be.year,"&month=").concat(Be.month,"&emp_id=").concat(Be.emp_id);window.open(e,"_blank","noreferrer")},children:"Open in browser"})})})]})})]})}),(0,q.jsxs)(o.ZP,{item:!0,xs:12,md:7,lg:7,children:[(0,q.jsxs)(E.Z,{sx:{mt:2},content:!1,children:[(0,q.jsx)(_.Z,{sx:{p:0,"& .MuiListItemButton-root":{py:2}},children:(0,q.jsxs)(y.ZP,{divider:!0,children:[(0,q.jsx)(u.Z,{sx:{width:{xs:"60%",md:"60%"}},children:(0,q.jsx)(x.Z,{id:"table-search",size:"small",onChange:function(e){return ne(e.target.value)},startAdornment:(0,q.jsx)(g.Z,{position:"start",sx:{mr:-.5},children:(0,q.jsx)(P.Z,{})}),"aria-describedby":"header-search-text",inputProps:{"aria-label":"amount"},placeholder:"Search by supplier"})}),(0,q.jsx)(u.Z,{sx:{m:1},variant:"standard",children:(0,q.jsx)(S._,{dateAdapter:C.y,children:(0,q.jsx)(k.M,{views:["year","month"],label:"Year and Month",minDate:w()("2012-03-01"),maxDate:w()("2060-06-01"),value:ie,onChange:Je,renderInput:function(e){return(0,q.jsx)(h.Z,(0,s.Z)((0,s.Z)({},e),{},{helperText:null}))}})})})]})}),(0,q.jsx)(ae,{selectEmployee:function(e){var t=b.find((function(t){return t._id===e}));Le(t.attendance),R(e)},handleTimesClick:function(e){var t=b.find((function(t){return t._id===e}));Le(t.attendance),R(e),Ie(!0)},hasAttendance:Oe.length>0}),!te&&(0,q.jsxs)(d.Z,{spacing:2,style:{padding:"15px"},children:[(0,q.jsxs)(m.Z,{children:["Page: ",N," of ",n]}),(0,q.jsx)(v.Z,{count:n,page:N,onChange:function(e,t){H(t)}})]})]}),(0,q.jsx)(A.Z,{ref:Ne,message:"Successfully saved!"})]}),(0,q.jsx)(me,{open:Ye,setOpen:Ie,employee:z,attendance:Me,alertRef:Ne,year:_e,month:fe})]})})},47192:function(e,t,n){n.d(t,{fN:function(){return c},Oy:function(){return u},zL:function(){return d}});var a=n(74165),r=n(15861),s=n(26373),i=n(87755),l=((0,s.xC)({reducer:i.Z}).dispatch,n(18375)),o=n(55630),c=function(e){return function(){var t=(0,r.Z)((0,a.Z)().mark((function t(n){var r,s;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n({type:l.s5}),t.next=4,o.$V(e);case 4:r=t.sent,s=r.data,console.log("====== API CALL:fetchEmployees ======"),n({type:l.vY.FETCH_ALL,payload:s}),n({type:l.cy}),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),console.log(t.t0);case 14:case"end":return t.stop()}}),t,null,[[0,11]])})));return function(e){return t.apply(this,arguments)}}()},d=function(e,t,n){return function(){var s=(0,r.Z)((0,a.Z)().mark((function r(s){var i,c;return(0,a.Z)().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,s({type:l.s5}),a.next=4,o.Xw(e,t,n);case 4:i=a.sent,c=i.data,console.log("====== API CALL:fetchEmployees ======"),s({type:l.vY.FETCH_ALL,payload:c}),s({type:l.cy}),a.next=14;break;case 11:a.prev=11,a.t0=a.catch(0),console.log(a.t0);case 14:case"end":return a.stop()}}),r,null,[[0,11]])})));return function(e){return s.apply(this,arguments)}}()},u=function(e){return function(){var t=(0,r.Z)((0,a.Z)().mark((function t(n){var r,s;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n({type:l.s5}),t.next=4,o.vc(e);case 4:r=t.sent,s=r.data.data,n({type:l.vY.FETCH_BY_SEARCH,payload:s}),n({type:l.cy}),t.next=13;break;case 10:t.prev=10,t.t0=t.catch(0),console.log(t.t0);case 13:case"end":return t.stop()}}),t,null,[[0,10]])})));return function(e){return t.apply(this,arguments)}}()}},55630:function(e,t,n){n.d(t,{$V:function(){return r},HG:function(){return o},Xw:function(){return s},aX:function(){return c},du:function(){return d},vc:function(){return i},xk:function(){return l}});var a=n(33711).Z.create({baseURL:"http://35.209.133.25"});a.interceptors.request.use((function(e){return localStorage.getItem("profile")&&(e.headers.Authorization="Bearer ".concat(JSON.parse(localStorage.getItem("profile")).token)),e}));var r=function(e){return a.get("/employee?page=".concat(e))},s=function(e,t,n){return a.get("/employee/get-with-attendance?page=".concat(e,"&monthStart=").concat(t,"&monthEnd=").concat(n))},i=function(e){return a.post("/employee/search",{search_text:e})},l=function(e){return a.post("/employee/create-account",e)},o=function(e,t){return a.patch("/employee/".concat(e),t)},c=function(e){return a.post("/attendance/add-list",e)},d=function(e){return a.post("/salary/save",e)}}}]);