"use strict";(self.webpackChunktea_factory_client=self.webpackChunktea_factory_client||[]).push([[966],{1955:function(e,n,t){var r=t(19860),i=t(57829),a=t(46417);n.Z=function(e){var n,t=e.color,l=e.size,s=(0,r.Z)();switch(t){case"secondary":n=s.palette.secondary.main;break;case"error":n=s.palette.error.main;break;case"warning":n=s.palette.warning.main;break;case"info":n=s.palette.info.main;break;case"success":n=s.palette.success.main;break;default:n=s.palette.primary.main}return(0,a.jsx)(i.Z,{sx:{width:l||8,height:l||8,borderRadius:"50%",bgcolor:n}})}},41255:function(e,n,t){t.d(n,{Z:function(){return p}});var r=t(29439),i=t(1413),a=t(47313),l=t(35898),s=t(58359),d=t(34953),o=t.p+"static/media/success.fec2b23f07f1802f3e94.mp3",c=t.p+"static/media/error.68bacdfdbf6f7e34fcd6.mp3",u=t.p+"static/media/info.a800d8f6d77100112d71.mp3",m=t(85876),h=t(46417),x=a.forwardRef((function(e,n){return(0,h.jsx)(d.Z,(0,i.Z)({elevation:6,ref:n,variant:"filled"},e))})),p=(0,a.forwardRef)((function(e,n){var t=a.useState(!1),i=(0,r.Z)(t,2),d=i[0],p=i[1],f=a.useState("success"),Z=(0,r.Z)(f,2),g=Z[0],j=Z[1],y=a.useState("successsful"),v=(0,r.Z)(y,2),b=v[0],_=v[1],C=a.useState(2500),S=(0,r.Z)(C,2),w=S[0],E=S[1],k=(0,a.useState)(new Audio(o)),R=(0,r.Z)(k,1)[0],P=(0,a.useState)(!1),F=(0,r.Z)(P,2),A=F[0],N=F[1];(0,a.useEffect)((function(){A?R.play():R.pause()}),[A]),(0,a.useEffect)((function(){return R.addEventListener("ended",(function(){return N(!1)})),function(){R.removeEventListener("ended",(function(){return N(!1)}))}}),[]),a.useEffect((function(){switch(g){case m.z.SUCCESS:R.src!==o&&(R.src=o);break;case m.z.ERROR:R.src!==c&&(R.src=c);break;case m.z.WARNING:case m.z.INFO:R.src!==u&&(R.src=u)}d&&N(!A)}),[d]),(0,a.useImperativeHandle)(n,(function(){return{showAlert:function(e){var n=e.type,t=e.message,r=e.autoHideDuration;p(!0),j(n),_(t),r&&E(r)}}}));var B=function(e,n){"clickaway"!==n&&p(!1)};return(0,h.jsx)(h.Fragment,{children:(0,h.jsx)(l.Z,{spacing:2,sx:{width:"100%"},children:(0,h.jsx)(s.Z,{open:d,autoHideDuration:w,onClose:B,children:(0,h.jsx)(x,{onClose:B,severity:g,sx:{width:"100%"},children:b})})})})}))},85876:function(e,n,t){t.d(n,{V:function(){return i},z:function(){return r}});var r={SUCCESS:"success",ERROR:"error",WARNING:"warning",INFO:"info"},i=Object.freeze({SAVED:"SAVED",CSV:"CSV"})},22114:function(e,n,t){t.r(n),t.d(n,{default:function(){return xe}});var r=t(74165),i=t(15861),a=t(29439),l=t(47313),s=t(85554),d=t(9019),o=t(61113),c=t(77970),u=t(35898),m=t(24193),h=t(57829),x=t(1550),p=t(37843),f=t(41727),Z=t(40765),g=t(94469),j=t(4117),y=t(96467),v=t(33604),b=t(41255),_=t(2135),C=t(23477),S=t(24076),w=t(67478),E=t(85281),k=t(51629),R=t(66835),P=t(57861),F=t(90891),A=t(47131),N=t(47515),B=t(12019),I=(t(1955),t(46417)),q=[];function z(e,n,t){return n[t]<e[t]?-1:n[t]>e[t]?1:0}function O(e,n){return"desc"===e?function(e,t){return z(e,t,n)}:function(e,t){return-z(e,t,n)}}function D(e,n){var t=e.map((function(e,n){return[e,n]}));return t.sort((function(e,t){var r=n(e[0],t[0]);return 0!==r?r:e[1]-t[1]})),t.map((function(e){return e[0]}))}var L=[{id:"employee_id",align:"left",disablePadding:!1,label:"Employee"},{id:"name",align:"left",disablePadding:!0,label:"Name"},{id:"nic",align:"left",disablePadding:!0,label:"NIC"},{id:"designation",align:"left",disablePadding:!1,label:"Designation"},{id:"actions",align:"right",disablePadding:!1,label:"Actions"}];function W(e){var n=e.order,t=e.orderBy;return(0,I.jsx)(C.Z,{children:(0,I.jsx)(S.Z,{children:L.map((function(e){return(0,I.jsx)(w.Z,{align:e.align,padding:e.disablePadding?"none":"normal",sortDirection:t===e.id&&n,children:e.label},e.id)}))})})}var T=function(e){var n=e.deleteOnClick,t=e.editOnClick,r=(0,l.useState)("asc"),i=(0,a.Z)(r,1)[0],d=(0,l.useState)("trackingNo"),o=(0,a.Z)(d,1)[0],c=(0,l.useState)([]),u=(0,a.Z)(c,1)[0],m=(0,s.v9)((function(e){return e.employees})),x=m.employees,p=m.isLoading;q=x;return p?(0,I.jsx)(h.Z,{sx:{display:"flex",alignItems:"center",justifyContent:"center",height:"50vh"},children:(0,I.jsx)(E.Z,{})}):(0,I.jsx)(I.Fragment,{children:(0,I.jsx)(h.Z,{children:(0,I.jsx)(k.Z,{sx:{width:"100%",overflowX:"auto",position:"relative",display:"block",maxWidth:"100%","& td, & th":{whiteSpace:"nowrap"}},children:(0,I.jsxs)(R.Z,{"aria-labelledby":"tableTitle",sx:{"& .MuiTableCell-root:first-of-type":{pl:2},"& .MuiTableCell-root:last-child":{pr:3}},children:[(0,I.jsx)(W,{order:i,orderBy:o}),(0,I.jsx)(P.Z,{children:D(q,O(i,o)).map((function(e,r){var i,a=(i=e.trackingNo,-1!==u.indexOf(i)),l="enhanced-table-checkbox-".concat(r);return(0,I.jsxs)(S.Z,{hover:!0,role:"checkbox",sx:{"&:last-child td, &:last-child th":{border:0}},"aria-checked":a,tabIndex:-1,selected:a,children:[(0,I.jsx)(w.Z,{component:"th",id:l,scope:"row",align:"left",children:(0,I.jsx)(F.Z,{color:"secondary",component:_.rU,to:"",children:e.emp_id})}),(0,I.jsx)(w.Z,{align:"left",children:e.full_name}),(0,I.jsx)(w.Z,{align:"left",children:e.nic}),(0,I.jsx)(w.Z,{align:"left",children:e.designation}),(0,I.jsxs)(w.Z,{align:"right",children:[(0,I.jsx)(A.Z,{size:"large",color:"secondary",onClick:function(){return e.supplier_code,void n()},children:(0,I.jsx)(N.Z,{style:{color:"#FF6347"}})}),(0,I.jsx)(A.Z,{size:"large",color:"secondary",onClick:function(){return n=e._id,void t(n);var n},children:(0,I.jsx)(B.Z,{style:{color:"#1FA5AC"}})})]})]},e._id)}))})]})})})})},M=t(9478),V=t(47192),H=t(97762),Y=function(e){var n=e.state,t=e.heading,r=e.bodyText,i=e.alertResult,s=l.useState(n),d=(0,a.Z)(s,2),o=d[0],c=d[1],u=function(e){c(!1),i(e)};return(0,I.jsx)("div",{children:(0,I.jsxs)(g.Z,{open:o,onClose:u,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[(0,I.jsx)(v.Z,{id:"alert-dialog-title",style:{fontWeight:"bold",fontSize:"13pt"},children:t}),(0,I.jsx)(y.Z,{children:(0,I.jsx)(H.Z,{id:"alert-dialog-description",children:r})}),(0,I.jsxs)(j.Z,{children:[(0,I.jsx)(m.Z,{onClick:function(){return u(!1)},children:"Not now"}),(0,I.jsx)(m.Z,{onClick:function(){return u(!0)},autoFocus:!0,children:"Yes"})]})]})})},U=t(1413),G=t(19536),X=t(66212),K=t(23306),J=t(15480),$=t(55685),Q=t(83929),ee=t(33827),ne=t(24631),te=t(22548),re=t(51405),ie=(t(10658),t(43394)),ae=t(72905),le=t(44948),se=t(3463),de=t(79429),oe=t(93646),ce=function(e){var n=e.employee,t=e.handleSubmitForm,a=e.error,l=e._isSubmitting;return console.log(n),(0,I.jsx)(I.Fragment,{children:(0,I.jsx)(de.J9,{initialValues:{role:"EMPLOYEE",emp_id:n?null===n||void 0===n?void 0:n.emp_id:"",full_name:n?null===n||void 0===n?void 0:n.full_name:"",first_name:n?null===n||void 0===n?void 0:n.first_name:"",last_name:n?null===n||void 0===n?void 0:n.last_name:"",tel:n?null===n||void 0===n?void 0:n.tel:"",nic:n?null===n||void 0===n?void 0:n.nic:"",email:n?null===n||void 0===n?void 0:n.user_ref.email:"",address:n?null===n||void 0===n?void 0:n.address:"",city:n?null===n||void 0===n?void 0:n.city:"",image:n?null===n||void 0===n?void 0:n.image:"",gender:n?null===n||void 0===n?void 0:n.gender:"Male",salary:n?null===n||void 0===n?void 0:n.salary:"",designation:n?null===n||void 0===n?void 0:n.designation:"",date_hired:n?null===n||void 0===n?void 0:n.date_hired:new Date},validationSchema:se.Ry().shape({emp_id:se.Z_().max(255).required("Employee ID Required"),full_name:se.Z_().max(255).required("Full Name Required"),first_name:se.Z_().max(255).required("First Name Required"),last_name:se.Z_().max(255).required("Last Name Required"),tel:se.Z_().max(255),nic:se.Z_().max(255).required("NIC No Required"),email:se.Z_().email().max(255).required("Email Required"),address:se.Z_().max(255),city:se.Z_().max(255),image:se.Z_().max(255),gender:se.Z_().max(255).required("Gender Required"),salary:se.Rx().required("Salary Required"),designation:se.Z_().max(255).required("Designation Required"),date_hired:se.Z_().max(255).required("Date hired Required")}),onSubmit:function(){var e=(0,i.Z)((0,r.Z)().mark((function e(n,i){var a,l,s,d;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=i.setErrors,l=i.setStatus,s=i.setSubmitting,d=i.resetForm;try{l({success:!1}),s(!1),t({role:n.role,emp_id:n.emp_id.trim(),full_name:n.full_name.trim(),first_name:n.first_name.trim(),last_name:n.last_name.trim(),tel:n.tel.trim(),nic:n.nic.trim(),email:n.email.trim(),address:n.address.trim(),city:n.city.trim(),image:n.image.trim(),gender:n.gender.trim(),designation:n.designation.trim(),salary:n.salary,date_hired:n.date_hired}).then((function(e){e.success&&d()}))}catch(r){l({success:!1}),a({submit:r.message}),s(!1)}case 2:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}(),children:function(e){var t=e.errors,r=e.handleBlur,i=e.handleChange,s=e.handleSubmit,c=e.handleReset,f=(e.isSubmitting,e.touched),Z=e.values,g=e.setFieldValue;return(0,I.jsx)("form",{noValidate:!0,onSubmit:s,children:(0,I.jsxs)(d.ZP,{container:!0,spacing:3,children:[(0,I.jsx)(d.ZP,{item:!0,xs:12,md:12,children:(0,I.jsx)(G.Z,{children:(0,I.jsx)(X.Z,{label:"PERSONAL"})})}),(0,I.jsx)(d.ZP,{item:!0,xs:12,md:6,children:(0,I.jsxs)(u.Z,{spacing:1,children:[(0,I.jsx)(K.Z,{htmlFor:"first_name",children:"First name"}),(0,I.jsx)(p.Z,{id:"first_name",type:"text",value:Z.first_name,name:"first_name",onBlur:r,onChange:i,placeholder:"Enter First name",disabled:l,fullWidth:!0,error:Boolean(f.first_name&&t.first_name)}),f.first_name&&t.first_name&&(0,I.jsx)(J.Z,{error:!0,id:"standard-weight-helper-text-first_name",children:t.first_name})]})}),(0,I.jsx)(d.ZP,{item:!0,xs:12,md:6,children:(0,I.jsxs)(u.Z,{spacing:1,children:[(0,I.jsx)(K.Z,{htmlFor:"last_name",children:"Last name"}),(0,I.jsx)(p.Z,{id:"last_name",type:"text",value:Z.last_name,name:"last_name",onBlur:r,onChange:i,placeholder:"Enter Last name",disabled:l,fullWidth:!0,error:Boolean(f.last_name&&t.last_name)}),f.last_name&&t.last_name&&(0,I.jsx)(J.Z,{error:!0,id:"standard-weight-helper-text-last_name",children:t.last_name})]})}),(0,I.jsx)(d.ZP,{item:!0,xs:12,md:12,children:(0,I.jsxs)(u.Z,{spacing:1,children:[(0,I.jsx)(K.Z,{htmlFor:"full_name",children:"Full Name"}),(0,I.jsx)(p.Z,{id:"full_name",type:"text",value:Z.full_name,name:"full_name",onBlur:r,onChange:i,placeholder:"Enter Full Name",disabled:l,fullWidth:!0,error:Boolean(f.full_name&&t.full_name)}),f.full_name&&t.full_name&&(0,I.jsx)(J.Z,{error:!0,id:"standard-weight-helper-text-full_name",children:t.full_name})]})}),(0,I.jsx)(d.ZP,{item:!0,xs:12,md:12,children:(0,I.jsxs)(u.Z,{spacing:1,children:[(0,I.jsx)(K.Z,{htmlFor:"email",children:"Email"}),(0,I.jsx)(p.Z,{id:"email",type:"email",value:Z.email,name:"email",onBlur:r,onChange:i,placeholder:"Enter Email",disabled:l,fullWidth:!0,error:Boolean(f.email&&t.email)}),f.email&&t.email&&(0,I.jsx)(J.Z,{error:!0,id:"standard-weight-helper-text-email",children:t.email})]})}),(0,I.jsx)(d.ZP,{item:!0,xs:12,md:4,children:(0,I.jsxs)(u.Z,{spacing:1,children:[(0,I.jsxs)(K.Z,{htmlFor:"tel",children:["Contact number ","(optional)"]}),(0,I.jsx)(p.Z,{id:"tel",type:"tel",value:Z.tel,name:"tel",onBlur:r,onChange:i,placeholder:"Enter Contact number",disabled:l,fullWidth:!0,error:Boolean(f.tel&&t.tel)}),f.tel&&t.tel&&(0,I.jsx)(J.Z,{error:!0,id:"standard-weight-helper-text-tel",children:t.tel})]})}),(0,I.jsx)(d.ZP,{item:!0,xs:12,md:4,children:(0,I.jsxs)(u.Z,{spacing:1,children:[(0,I.jsx)(K.Z,{htmlFor:"nic",children:"NIC Number"}),(0,I.jsx)(p.Z,{id:"nic",type:"text",value:Z.nic,name:"nic",onBlur:r,onChange:i,placeholder:"Enter NIC No",disabled:l,fullWidth:!0,error:Boolean(f.nic&&t.nic)}),f.nic&&t.nic&&(0,I.jsx)(J.Z,{error:!0,id:"standard-weight-helper-text-nic",children:t.nic})]})}),(0,I.jsx)(d.ZP,{item:!0,xs:12,md:4,children:(0,I.jsxs)(u.Z,{spacing:1,children:[(0,I.jsxs)(K.Z,{htmlFor:"city",children:["City ","(optional)"]}),(0,I.jsx)(p.Z,{id:"city",type:"text",value:Z.city,name:"city",onBlur:r,onChange:i,placeholder:"Enter city",disabled:l,fullWidth:!0,error:Boolean(f.city&&t.city)}),f.city&&t.city&&(0,I.jsx)(J.Z,{error:!0,id:"standard-weight-helper-text-city",children:t.city})]})}),(0,I.jsx)(d.ZP,{item:!0,xs:12,md:8,children:(0,I.jsxs)(u.Z,{spacing:1,children:[(0,I.jsxs)(K.Z,{htmlFor:"address",children:["Address ","(optional)"]}),(0,I.jsx)(p.Z,{id:"address",type:"text",value:Z.address,name:"address",onBlur:r,onChange:i,placeholder:"Enter address",disabled:l,fullWidth:!0,error:Boolean(f.address&&t.address)}),f.address&&t.address&&(0,I.jsx)(J.Z,{error:!0,id:"standard-weight-helper-text-address",children:t.address})]})}),(0,I.jsx)(d.ZP,{item:!0,xs:12,md:4,children:(0,I.jsxs)(u.Z,{spacing:1,children:[(0,I.jsx)(K.Z,{htmlFor:"address",children:"Gender"}),(0,I.jsx)(x.Z,{children:(0,I.jsxs)($.Z,{row:!0,"aria-labelledby":"demo-row-radio-buttons-group-label",name:"gender",onChange:i,defaultValue:"Male",children:[(0,I.jsx)(Q.Z,{value:"Male",control:(0,I.jsx)(ee.Z,{}),label:"Male"}),(0,I.jsx)(Q.Z,{value:"Female",control:(0,I.jsx)(ee.Z,{}),label:"Female"})]})})]})}),(0,I.jsx)(d.ZP,{item:!0,xs:12,md:12,children:(0,I.jsx)(G.Z,{children:(0,I.jsx)(X.Z,{label:"EMPLOYEEMENT"})})}),(0,I.jsx)(d.ZP,{item:!0,xs:12,md:6,children:(0,I.jsxs)(u.Z,{spacing:1,children:[(0,I.jsx)(K.Z,{htmlFor:"emp_id",children:"Employee ID"}),(0,I.jsx)(p.Z,{id:"emp_id",type:"text",value:Z.emp_id,name:"emp_id",onBlur:r,onChange:i,placeholder:"Enter Employee ID",disabled:l,fullWidth:!0,error:Boolean(f.emp_id&&t.emp_id)}),f.emp_id&&t.emp_id&&(0,I.jsx)(J.Z,{error:!0,id:"standard-weight-helper-text-emp_id",children:t.emp_id})]})}),(0,I.jsx)(d.ZP,{item:!0,xs:12,md:6,children:(0,I.jsxs)(u.Z,{spacing:1,children:[(0,I.jsx)(K.Z,{htmlFor:"emp_id",children:"Date Hired"}),(0,I.jsx)(ie._,{dateAdapter:ae.y,children:(0,I.jsx)(le.M,{views:["day"],label:"",name:"date_hired",value:Z.date_hired,onChange:function(e){g("date_hired",null!==e?e.toISOString():Z.date_hired)},renderInput:function(e){return(0,I.jsx)(ne.Z,(0,U.Z)((0,U.Z)({},e),{},{helperText:null}))}})})]})}),(0,I.jsx)(d.ZP,{item:!0,xs:12,md:6,children:(0,I.jsxs)(u.Z,{spacing:1,children:[(0,I.jsx)(K.Z,{htmlFor:"salary",children:"Salary"}),(0,I.jsx)(p.Z,{id:"salary",type:"number",value:Z.salary,name:"salary",onBlur:r,onChange:i,placeholder:"Enter salary",disabled:l,fullWidth:!0,error:Boolean(f.salary&&t.salary)}),f.salary&&t.salary&&(0,I.jsx)(J.Z,{error:!0,id:"standard-weight-helper-text-salary",children:t.salary})]})}),(0,I.jsx)(d.ZP,{item:!0,xs:12,md:6,children:(0,I.jsxs)(u.Z,{spacing:1,children:[(0,I.jsx)(K.Z,{htmlFor:"salary",children:"Designation"}),(0,I.jsxs)(te.Z,{labelId:"demo-simple-select-autowidth-label",id:"demo-simple-select-autowidth",value:Z.designation,onChange:function(e,n){g("designation",null!==e.target.value?e.target.value:Z.designation)},autoWidth:!0,label:"Designation",children:[(0,I.jsx)(re.Z,{value:"Clerk",children:"Clerk"}),(0,I.jsx)(re.Z,{value:"Account Manager",children:"Account Manager"}),(0,I.jsx)(re.Z,{value:"Store Keeper",children:"Store Keeper"})]}),f.designation&&t.designation&&(0,I.jsx)(J.Z,{error:!0,id:"standard-weight-helper-text-designation",children:t.designation})]})}),""!==a&&(0,I.jsx)(d.ZP,{item:!0,xs:12,children:(0,I.jsxs)(o.Z,{variant:"subtitle1",sx:{color:"##595959"},children:[(0,I.jsx)("span",{style:{color:"#FF6347"},children:"ERROR: "}),a]})}),l&&(0,I.jsx)(d.ZP,{item:!0,xs:12,children:(0,I.jsx)(h.Z,{sx:{display:"flex",alignItems:"center",justifyContent:"center",height:"5vh"},children:(0,I.jsx)(E.Z,{})})}),t.submit&&(0,I.jsx)(d.ZP,{item:!0,xs:12,children:(0,I.jsx)(J.Z,{error:!0,children:t.submit})}),(0,I.jsx)(d.ZP,{item:!0,xs:12,md:6,children:(0,I.jsx)(oe.Z,{children:(0,I.jsx)(m.Z,{disableElevation:!0,disabled:l,fullWidth:!0,size:"large",type:"reset",variant:"contained",color:"secondary",onClick:c,children:"Reset"})})}),(0,I.jsx)(d.ZP,{item:!0,xs:12,md:6,children:(0,I.jsx)(oe.Z,{children:(0,I.jsx)(m.Z,{disableElevation:!0,disabled:l,fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"primary",children:n?"Update":"Save"})})})]})})}})})},ue=t(55630),me=t(18375),he=t(85876),xe=function(){var e=(0,s.v9)((function(e){return e.employees})).numberOfPages,n=(0,s.I0)(),t=(0,l.useState)(0),_=(0,a.Z)(t,2),C=_[0],S=_[1],w=(0,s.v9)((function(e){return C?e.employees.employees.find((function(e){return e._id===C})):null})),E=(0,l.useState)(!1),k=(0,a.Z)(E,2),R=k[0],P=(k[1],(0,l.useState)(1)),F=(0,a.Z)(P,2),A=F[0],N=F[1],B=(0,l.useState)(""),q=(0,a.Z)(B,2),z=q[0],O=q[1],D=(0,l.useRef)(),L=l.useState(!1),W=(0,a.Z)(L,2),H=W[0],U=W[1],G=(0,l.useState)(!1),X=(0,a.Z)(G,2),K=X[0],J=X[1],$=(0,l.useState)(""),Q=(0,a.Z)($,2),ee=Q[0],ne=Q[1],te=(0,l.useState)(!1),re=(0,a.Z)(te,2),ie=re[0],ae=re[1],le=(0,l.useRef)();(0,l.useEffect)((function(){A&&n((0,V.fN)(A))}),[A]),(0,l.useEffect)((function(){D.current=z,se()}),[z]);var se=function(){z.trim()?n((0,V.Oy)(z)):n((0,V.fN)(A))},de=function(){},oe=function(){U(!0)},xe=function(e,n){"backdropClick"!==n&&(U(!1),S(null),ne(""))},pe=function(){var e=(0,i.Z)((0,r.Z)().mark((function e(t){var i,a,l,s,d,o,c,u,m,h,x;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(C&&0!==C){e.next=25;break}return ae(!0),e.prev=2,e.next=5,ue.xk(t);case 5:return i=e.sent,a=i.data,n({type:me.vY.CREATE,payload:a}),ne(""),ae(!1),xe(),le.current.showAlert({type:he.z.SUCCESS,message:"Successfully saved"}),e.abrupt("return",{success:!0});case 15:return e.prev=15,e.t0=e.catch(2),console.info("--------- error ---------"),d=null===e.t0||void 0===e.t0||null===(l=e.t0.response)||void 0===l||null===(s=l.data)||void 0===s?void 0:s.error.replace(/"/g,""),le.current.showAlert({type:he.z.ERROR,message:d}),ne(d),ae(!1),e.abrupt("return",{success:!1});case 23:e.next=45;break;case 25:return ae(!0),e.prev=26,e.next=29,ue.HG(C,t);case 29:return o=e.sent,c=o.data,n({type:me.vY.UPDATE,payload:c}),ne(""),ae(!1),xe(),le.current.showAlert({type:he.z.SUCCESS,message:"Successfully updated"}),e.abrupt("return",{success:!0});case 39:return e.prev=39,e.t1=e.catch(26),le.current.showAlert({type:he.z.ERROR,message:null===e.t1||void 0===e.t1||null===(u=e.t1.response)||void 0===u||null===(m=u.data)||void 0===m?void 0:m.message}),ne(null===e.t1||void 0===e.t1||null===(h=e.t1.response)||void 0===h||null===(x=h.data)||void 0===x?void 0:x.message),ae(!1),e.abrupt("return",{success:!1});case 45:case"end":return e.stop()}}),e,null,[[2,15],[26,39]])})));return function(n){return e.apply(this,arguments)}}();return(0,I.jsx)(d.ZP,{container:!0,rowSpacing:4.5,columnSpacing:2.75,children:(0,I.jsxs)(d.ZP,{item:!0,xs:12,md:12,lg:12,children:[(0,I.jsxs)(d.ZP,{container:!0,alignItems:"center",justifyContent:"space-between",children:[(0,I.jsx)(d.ZP,{item:!0,children:(0,I.jsx)(h.Z,{sx:{width:"100%",ml:{xs:0,md:0}},children:(0,I.jsx)(x.Z,{sx:{width:{xs:"100%",md:1e3}},children:(0,I.jsx)(p.Z,{id:"table-search",size:"small",onChange:function(e){return O(e.target.value)},startAdornment:(0,I.jsx)(f.Z,{position:"start",sx:{mr:-.5},children:(0,I.jsx)(Z.Z,{})}),"aria-describedby":"header-search-text",inputProps:{"aria-label":"weight"},placeholder:"Search employees"})})})}),(0,I.jsx)(d.ZP,{item:!0,children:(0,I.jsx)(m.Z,{size:"small",onClick:oe,color:"primary",variant:"outlined",children:"Add New Employee"})})]}),(0,I.jsxs)(M.Z,{sx:{mt:2},content:!1,children:[(0,I.jsx)(T,{deleteOnClick:function(){J(!0),console.log(K)},editOnClick:function(e){S(e),oe()}}),!z&&(0,I.jsxs)(u.Z,{spacing:2,style:{padding:"15px"},children:[(0,I.jsxs)(o.Z,{children:["Page: ",A," of ",e]}),(0,I.jsx)(c.Z,{count:e,page:A,onChange:function(e,n){N(n)}})]}),K&&(0,I.jsx)(Y,{heading:"Delete a Record?",bodyText:"Are you sure, you want to delete this record?. This is cannot revers after delete",state:!0,alertResult:function(e){J(!1),e&&de()}})]}),(0,I.jsxs)(g.Z,{open:H,onClose:xe,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",disableEscapeKeyDown:!0,children:[(0,I.jsx)(v.Z,{id:"alert-dialog-title",style:{fontWeight:"bold",fontSize:"13pt"},children:C?"Edit Employee Details":"Register New Employee"}),(0,I.jsx)(y.Z,{children:(0,I.jsx)(ce,{employee:w,handleSubmitForm:pe,error:ee,_isSubmitting:ie})}),(0,I.jsx)(j.Z,{children:(0,I.jsx)(m.Z,{disabled:ie,onClick:xe,autoFocus:!0,children:"Cancel"})})]}),(0,I.jsx)(b.Z,{ref:le,state:R,message:"Successfully saved!"})]})})}},47192:function(e,n,t){t.d(n,{fN:function(){return o},Oy:function(){return u},zL:function(){return c}});var r=t(74165),i=t(15861),a=t(26373),l=t(87755),s=((0,a.xC)({reducer:l.Z}).dispatch,t(18375)),d=t(55630),o=function(e){return function(){var n=(0,i.Z)((0,r.Z)().mark((function n(t){var i,a;return(0,r.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,t({type:s.s5}),n.next=4,d.$V(e);case 4:i=n.sent,a=i.data,console.log("====== API CALL:fetchEmployees ======"),t({type:s.vY.FETCH_ALL,payload:a}),t({type:s.cy}),n.next=14;break;case 11:n.prev=11,n.t0=n.catch(0),console.log(n.t0);case 14:case"end":return n.stop()}}),n,null,[[0,11]])})));return function(e){return n.apply(this,arguments)}}()},c=function(e,n,t){return function(){var a=(0,i.Z)((0,r.Z)().mark((function i(a){var l,o;return(0,r.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,a({type:s.s5}),r.next=4,d.Xw(e,n,t);case 4:l=r.sent,o=l.data,console.log("====== API CALL:fetchEmployees ======"),a({type:s.vY.FETCH_ALL,payload:o}),a({type:s.cy}),r.next=14;break;case 11:r.prev=11,r.t0=r.catch(0),console.log(r.t0);case 14:case"end":return r.stop()}}),i,null,[[0,11]])})));return function(e){return a.apply(this,arguments)}}()},u=function(e){return function(){var n=(0,i.Z)((0,r.Z)().mark((function n(t){var i,a;return(0,r.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,t({type:s.s5}),n.next=4,d.vc(e);case 4:i=n.sent,a=i.data.data,t({type:s.vY.FETCH_BY_SEARCH,payload:a}),t({type:s.cy}),n.next=13;break;case 10:n.prev=10,n.t0=n.catch(0),console.log(n.t0);case 13:case"end":return n.stop()}}),n,null,[[0,10]])})));return function(e){return n.apply(this,arguments)}}()}},55630:function(e,n,t){t.d(n,{$V:function(){return i},HG:function(){return d},Xw:function(){return a},aX:function(){return o},du:function(){return c},vc:function(){return l},xk:function(){return s}});var r=t(33711).Z.create({baseURL:"http://35.209.133.25"});r.interceptors.request.use((function(e){return localStorage.getItem("profile")&&(e.headers.Authorization="Bearer ".concat(JSON.parse(localStorage.getItem("profile")).token)),e}));var i=function(e){return r.get("/employee?page=".concat(e))},a=function(e,n,t){return r.get("/employee/get-with-attendance?page=".concat(e,"&monthStart=").concat(n,"&monthEnd=").concat(t))},l=function(e){return r.post("/employee/search",{search_text:e})},s=function(e){return r.post("/employee/create-account",e)},d=function(e,n){return r.patch("/employee/".concat(e),n)},o=function(e){return r.post("/attendance/add-list",e)},c=function(e){return r.post("/salary/save",e)}}}]);