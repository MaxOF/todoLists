(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{125:function(t,e,a){"use strict";a.r(e);var r=a(0),n=a.n(r),s=a(11),c=a.n(s);a(98),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(99);var i,o,l=a(169),d=a(170),u=a(171),b=a(162),f=a(127),j=a(165),p=a(173),h=a(174),O=a(172),m=a(14),v=a(20),x=a(21),g=a(10),k=a.n(g),C=a(76),y=a.n(C);!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(i||(i={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(o||(o={}));var w=y.a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"b588c31f-bc7d-4fbb-8788-c7e4777eca7b"}}),I=function(){return w.get("todo-lists")},T=function(t){return w.post("todo-lists",{title:t})},A=function(t){return w.delete("todo-lists/".concat(t))},S=function(t,e){return w.put("todo-lists/".concat(t),{title:e})},E=function(t){return w.get("todo-lists/".concat(t,"/tasks"))},F=function(t,e){return w.post("todo-lists/".concat(t,"/tasks"),{title:e})},L=function(t,e){return w.delete("todo-lists/".concat(t,"/tasks/").concat(e))},W=function(t,e,a){return w.put("todo-lists/".concat(t,"/tasks/").concat(e),a)},P=function(t){return w.post("auth/login",t)},V=function(){return w.get("auth/me")},D=function(){return w.delete("auth/login")},N=function(t,e){t.messages.length?e(_({error:t.messages[0]})):e(_({error:"Some error \ud83d\ude20"})),e(G({status:"failed"}))},R=function(t,e){e(_({error:t.message?t.message:"Some error occurred"})),e(G({status:"failed"}))},B=a(17),z=Object(B.b)("auth/login",function(){var t=Object(x.a)(k.a.mark((function t(e,a){var r;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(G({status:"loading"})),t.prev=1,t.next=4,P(e);case 4:if(0!==(r=t.sent).data.resultCode){t.next=10;break}return a.dispatch(G({status:"succeeded"})),t.abrupt("return");case 10:return N(r.data,a.dispatch),t.abrupt("return",a.rejectWithValue({errors:r.data.messages,fieldsErrors:r.data.fieldsErrors}));case 12:t.next=18;break;case 14:return t.prev=14,t.t0=t.catch(1),R({message:t.t0},a.dispatch),t.abrupt("return",a.rejectWithValue({errors:[t.t0],fieldsErrors:void 0}));case 18:case"end":return t.stop()}}),t,null,[[1,14]])})));return function(e,a){return t.apply(this,arguments)}}()),M=Object(B.b)("auth/logout",function(){var t=Object(x.a)(k.a.mark((function t(e,a){var r;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(G({status:"loading"})),t.prev=1,t.next=4,D();case 4:if(0!==(r=t.sent).data.resultCode){t.next=11;break}return a.dispatch(G({status:"succeeded"})),a.dispatch(st()),t.abrupt("return");case 11:return N(r.data,a.dispatch),t.abrupt("return",a.rejectWithValue({errors:r.data.messages,fieldsErrors:r.data.fieldsErrors}));case 13:t.next=19;break;case 15:return t.prev=15,t.t0=t.catch(1),R({message:t.t0},a.dispatch),t.abrupt("return",a.rejectWithValue({}));case 19:case"end":return t.stop()}}),t,null,[[1,15]])})));return function(e,a){return t.apply(this,arguments)}}()),U=Object(B.c)({name:"auth",initialState:{isLoggedIn:!1},reducers:{setIsLoggedInAC:function(t,e){t.isLoggedIn=e.payload.value}},extraReducers:function(t){t.addCase(z.fulfilled,(function(t){t.isLoggedIn=!0})),t.addCase(M.fulfilled,(function(t){t.isLoggedIn=!1}))}}),q=U.reducer,H=U.actions.setIsLoggedInAC,K=Object(B.b)("app/initializeApp",function(){var t=Object(x.a)(k.a.mark((function t(e,a){var r,n;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=a.dispatch,t.prev=1,t.next=4,V();case 4:0===(n=t.sent).data.resultCode?r(H({value:!0})):N(n.data,r),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(1),R({message:t.t0},r);case 11:case"end":return t.stop()}}),t,null,[[1,8]])})));return function(e,a){return t.apply(this,arguments)}}()),Z=Object(B.c)({name:"app",initialState:{status:"idle",error:null,isInitialized:!1},reducers:{setAppErrorAC:function(t,e){t.error=e.payload.error},setAppStatusAC:function(t,e){t.status=e.payload.status}},extraReducers:function(t){t.addCase(K.fulfilled,(function(t){t.isInitialized=!0}))}}),J=Z.reducer,$=Z.actions,_=$.setAppErrorAC,G=$.setAppStatusAC,Y=Object(B.b)("todolists/fetchTodolists",function(){var t=Object(x.a)(k.a.mark((function t(e,a){var r,n,s;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=a.dispatch,n=a.rejectWithValue,r(G({status:"loading"})),t.next=4,I();case 4:return s=t.sent,t.prev=5,r(G({status:"succeeded"})),t.abrupt("return",{todolists:s.data});case 10:return t.prev=10,t.t0=t.catch(5),R(t.t0,r),t.abrupt("return",n(null));case 14:case"end":return t.stop()}}),t,null,[[5,10]])})));return function(e,a){return t.apply(this,arguments)}}()),Q=Object(B.b)("todolists/removeTodolist",function(){var t=Object(x.a)(k.a.mark((function t(e,a){var r,n;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=a.dispatch,n=a.rejectWithValue,r(G({status:"loading"})),r(nt({id:e,status:"loading"})),t.prev=3,t.next=6,A(e);case 6:return t.sent,r(G({status:"succeeded"})),t.abrupt("return",{todolistId:e});case 11:return t.prev=11,t.t0=t.catch(3),R(t.t0,r),t.abrupt("return",n(null));case 15:case"end":return t.stop()}}),t,null,[[3,11]])})));return function(e,a){return t.apply(this,arguments)}}()),X=Object(B.b)("todolists/updateTodolist",function(){var t=Object(x.a)(k.a.mark((function t(e,a){var r,n;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=a.dispatch,n=a.rejectWithValue,r(G({status:"loading"})),t.prev=2,t.next=5,S(e.id,e.title);case 5:return t.sent,r(G({status:"succeeded"})),t.abrupt("return",{id:e.id,title:e.title});case 10:return t.prev=10,t.t0=t.catch(2),R(t.t0,r),t.abrupt("return",n(null));case 14:case"end":return t.stop()}}),t,null,[[2,10]])})));return function(e,a){return t.apply(this,arguments)}}()),tt=Object(B.b)("todolists/createTodolist",function(){var t=Object(x.a)(k.a.mark((function t(e,a){var r,n,s;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=a.dispatch,n=a.rejectWithValue,r(G({status:"loading"})),t.prev=2,t.next=5,T(e);case 5:return s=t.sent,r(G({status:"succeeded"})),t.abrupt("return",{todolist:s.data.data.item});case 10:return t.prev=10,t.t0=t.catch(2),R(t.t0,r),t.abrupt("return",n(null));case 14:case"end":return t.stop()}}),t,null,[[2,10]])})));return function(e,a){return t.apply(this,arguments)}}()),et=Object(B.c)({name:"todolists",initialState:[],reducers:{changeTodolistFilterAC:function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.id}));a>-1&&(t[a].filter=e.payload.filter)},changeTodolistEntityStatusAC:function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.id}));a>-1&&(t[a].entityStatus=e.payload.status)},clearTodosDataAC:function(t,e){[]}},extraReducers:function(t){t.addCase(Y.fulfilled,(function(t,e){return e.payload.todolists.map((function(t){return Object(v.a)(Object(v.a)({},t),{},{filter:"all",entityStatus:"idle"})}))})),t.addCase(Q.fulfilled,(function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.todolistId}));a>-1&&t.splice(a,1)})),t.addCase(tt.fulfilled,(function(t,e){t.unshift(Object(v.a)(Object(v.a)({},e.payload.todolist),{},{filter:"all",entityStatus:"idle"}))})),t.addCase(X.fulfilled,(function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.id}));a>-1&&(t[a].title=e.payload.title)}))}}),at=et.actions,rt=at.changeTodolistFilterAC,nt=at.changeTodolistEntityStatusAC,st=at.clearTodosDataAC,ct=et.reducer,it=Object(B.b)("tasks/fetchTasks",function(){var t=Object(x.a)(k.a.mark((function t(e,a){var r,n,s;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return(r=a.dispatch)(G({status:"loading"})),t.next=4,E(e);case 4:return n=t.sent,s=n.data.items,r(G({status:"succeeded"})),t.abrupt("return",{tasks:s,todolistId:e});case 8:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()),ot=Object(B.b)("tasks/removeTask",function(){var t=Object(x.a)(k.a.mark((function t(e,a){return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return(0,a.dispatch)(G({status:"loading"})),t.next=4,L(e.todolistId,e.taskId);case 4:return t.sent,t.abrupt("return",{taskId:e.taskId,todolistId:e.todolistId});case 6:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()),lt=Object(B.b)("tasks/createTask",function(){var t=Object(x.a)(k.a.mark((function t(e,a){var r,n,s,c;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=a.dispatch,n=a.rejectWithValue,r(G({status:"loading"})),t.prev=2,t.next=5,F(e.todolistId,e.title);case 5:if(0!==(s=t.sent).data.resultCode){t.next=12;break}return r(G({status:"succeeded"})),c=s.data.data.item,t.abrupt("return",c);case 12:return N(s.data,r),t.abrupt("return",n(null));case 14:t.next=20;break;case 16:return t.prev=16,t.t0=t.catch(2),R(t.t0,r),t.abrupt("return",n(null));case 20:case"end":return t.stop()}}),t,null,[[2,16]])})));return function(e,a){return t.apply(this,arguments)}}()),dt=Object(B.b)("tasks/updateTask",function(){var t=Object(x.a)(k.a.mark((function t(e,a){var r,n,s,c,i,o,l;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=a.dispatch,n=a.getState,s=a.rejectWithValue,r(G({status:"loading"})),c=n(),i=c.tasks[e.todolistId].find((function(t){return t.id===e.taskId}))){t.next=6;break}return t.abrupt("return",s("task not found in the state"));case 6:return o=Object(v.a)({deadline:i.deadline,description:i.description,priority:i.priority,startDate:i.startDate,title:i.title,status:i.status},e.model),t.prev=7,t.next=10,W(e.todolistId,e.taskId,o);case 10:if(0!==(l=t.sent).data.resultCode){t.next=16;break}return r(G({status:"succeeded"})),t.abrupt("return",e);case 16:return N(l.data,r),t.abrupt("return",s(null));case 18:t.next=24;break;case 20:return t.prev=20,t.t0=t.catch(7),R(t.t0,r),t.abrupt("return",s(null));case 24:case"end":return t.stop()}}),t,null,[[7,20]])})));return function(e,a){return t.apply(this,arguments)}}()),ut=Object(B.c)({name:"tasks",initialState:{},reducers:{clearTodosDataAC:function(t,e){({})}},extraReducers:function(t){t.addCase(tt.fulfilled,(function(t,e){t[e.payload.todolist.id]=[]})),t.addCase(Q.fulfilled,(function(t,e){delete t[e.payload.todolistId]})),t.addCase(Y.fulfilled,(function(t,e){e.payload.todolists.forEach((function(e){t[e.id]=[]}))})),t.addCase(it.fulfilled,(function(t,e){t[e.payload.todolistId]=e.payload.tasks})),t.addCase(ot.fulfilled,(function(t,e){var a=t[e.payload.todolistId],r=a.findIndex((function(t){return t.id===e.payload.taskId}));r>-1&&a.splice(r,1)})),t.addCase(lt.fulfilled,(function(t,e){t[e.payload.todoListId].unshift(e.payload)})),t.addCase(dt.fulfilled,(function(t,e){var a=t[e.payload.todolistId],r=a.findIndex((function(t){return t.id===e.payload.taskId}));r>-1&&(a[r]=Object(v.a)(Object(v.a)({},a[r]),e.payload.model))}))}}).reducer,bt=a(166),ft=a(126),jt=a(16),pt=a(2),ht=a(175),Ot=a(163),mt=a(3),vt=["disabled"],xt=n.a.memo((function(t){var e=t.disabled,a=void 0!==e&&e,n=Object(pt.a)(t,vt),s=Object(r.useState)(""),c=Object(jt.a)(s,2),i=c[0],o=c[1],l=Object(r.useState)(null),d=Object(jt.a)(l,2),u=d[0],f=d[1],j=function(){""!==i.trim()?(n.addItem(i),o("")):f("Title is required")};return Object(mt.jsxs)("div",{children:[Object(mt.jsx)(ht.a,{variant:"outlined",error:!!u,value:i,onChange:function(t){o(t.currentTarget.value)},onKeyPress:function(t){u&&f(null),13===t.charCode&&j()},label:"Title",helperText:u,disabled:a}),Object(mt.jsx)(b.a,{color:"primary",onClick:j,disabled:a,children:Object(mt.jsx)(Ot.a,{})})]})})),gt=n.a.memo((function(t){var e=Object(r.useState)(!1),a=Object(jt.a)(e,2),n=a[0],s=a[1],c=Object(r.useState)(t.value),i=Object(jt.a)(c,2),o=i[0],l=i[1],d=function(){s(!1),t.onChange(o)};return n?Object(mt.jsx)(ht.a,{value:o,onChange:function(t){l(t.currentTarget.value)},autoFocus:!0,onBlur:d,onKeyPress:function(t){"Enter"===t.key&&d()}}):Object(mt.jsx)("span",{onDoubleClick:function(){s(!0),l(t.value)},children:t.value})})),kt=a(164),Ct=a(177),yt=n.a.memo((function(t){var e=t.todolistId,a=t.taskId,n=t.changeTaskStatus,s=t.changeTaskTitle,c=t.removeTask,o=Object(m.c)((function(t){return t.tasks[e].filter((function(t){return t.id===a}))[0]})),l=(Object(m.b)(),Object(r.useCallback)((function(){return c(a,e)}),[a,e])),d=Object(r.useCallback)((function(t){var r=t.currentTarget.checked;n(a,r?i.Completed:i.New,e)}),[a,e]),u=Object(r.useCallback)((function(t){s(o.id,t,e)}),[a,e]);return Object(mt.jsxs)("div",{className:o.status===i.Completed?"is-done":"",children:[Object(mt.jsx)(Ct.a,{checked:o.status===i.Completed,color:"primary",onChange:d}),Object(mt.jsx)(gt,{value:o.title,onChange:u}),Object(mt.jsx)(b.a,{onClick:l,children:Object(mt.jsx)(kt.a,{})})]},o.id)})),wt=["demo"],It=n.a.memo((function(t){t.demo;var e=Object(pt.a)(t,wt),a=(Object(m.b)(),Object(r.useCallback)((function(t){e.addTask(t,e.todolist.id)}),[e.addTask,e.todolist.id])),n=Object(r.useCallback)((function(){e.removeTodolist(e.todolist.id)}),[e.removeTodolist,e.todolist.id]),s=Object(r.useCallback)((function(t){e.changeTodolistTitle(e.todolist.id,t)}),[e.changeTodolistTitle,e.todolist.id]),c=Object(r.useCallback)((function(){return e.changeFilter("all",e.todolist.id)}),[e.todolist.id,e.changeFilter]),o=Object(r.useCallback)((function(){return e.changeFilter("active",e.todolist.id)}),[e.todolist.id,e.changeFilter]),l=Object(r.useCallback)((function(){return e.changeFilter("completed",e.todolist.id)}),[e.todolist.id,e.changeFilter]),d=e.tasks;return"active"===e.todolist.filter&&(d=d.filter((function(t){return t.status===i.New}))),"completed"===e.todolist.filter&&(d=d.filter((function(t){return t.status===i.Completed}))),Object(mt.jsxs)("div",{children:[Object(mt.jsxs)("h3",{children:[" ",Object(mt.jsx)(gt,{value:e.todolist.title,onChange:s}),Object(mt.jsx)(b.a,{onClick:n,disabled:"loading"===e.todolist.entityStatus,children:Object(mt.jsx)(kt.a,{})})]}),Object(mt.jsx)(xt,{addItem:a,disabled:"loading"===e.todolist.entityStatus}),Object(mt.jsx)("div",{children:d.map((function(t){return Object(mt.jsx)(yt,{todolistId:e.todolist.id,taskId:t.id,changeTaskStatus:e.changeTaskStatus,changeTaskTitle:e.changeTaskTitle,removeTask:e.removeTask},t.id)}))}),Object(mt.jsxs)("div",{style:{paddingTop:"10px"},children:[Object(mt.jsx)(j.a,{variant:"all"===e.todolist.filter?"outlined":"text",onClick:c,color:"default",children:"All"}),Object(mt.jsx)(j.a,{variant:"active"===e.todolist.filter?"outlined":"text",onClick:o,color:"primary",children:"Active"}),Object(mt.jsx)(j.a,{variant:"completed"===e.todolist.filter?"outlined":"text",onClick:l,color:"secondary",children:"Completed"})]})]})})),Tt=a(8),At=function(t){var e=t.demo,a=void 0!==e&&e,n=Object(m.c)((function(t){return t.auth.isLoggedIn})),s=Object(m.c)((function(t){return t.todolists})),c=Object(m.c)((function(t){return t.tasks})),i=Object(m.b)();Object(r.useEffect)((function(){!a&&n&&i(Y())}),[]);var o=Object(r.useCallback)((function(t,e){i(lt({todolistId:e,title:t}))}),[i]),l=Object(r.useCallback)((function(t,e,a){var r=dt({taskId:t,todolistId:a,model:{status:e}});i(r)}),[]),d=Object(r.useCallback)((function(t,e,a){var r=dt({taskId:t,todolistId:a,model:{title:e}});i(r)}),[]),u=Object(r.useCallback)((function(t,e){var a=ot({taskId:t,todolistId:e});i(a)}),[]),b=Object(r.useCallback)((function(t,e){var a=rt({id:e,filter:t});i(a)}),[i]),f=Object(r.useCallback)((function(t){i(Q(t))}),[i]),j=Object(r.useCallback)((function(t,e){i(X({id:t,title:e}))}),[i]),p=Object(r.useCallback)((function(t){i(tt(t))}),[i]);return n?Object(mt.jsxs)(mt.Fragment,{children:[Object(mt.jsx)(bt.a,{container:!0,style:{padding:"20px"},children:Object(mt.jsx)(xt,{addItem:p})}),Object(mt.jsx)(bt.a,{container:!0,spacing:3,children:s.map((function(t){return Object(mt.jsx)(bt.a,{item:!0,children:Object(mt.jsx)(ft.a,{style:{padding:"10px"},children:Object(mt.jsx)(It,{todolist:t,tasks:c[t.id],changeFilter:b,changeTaskStatus:l,changeTaskTitle:d,addTask:o,removeTodolist:f,changeTodolistTitle:j,removeTask:u,demo:a})})},t.id)}))})]}):Object(mt.jsx)(Tt.a,{to:"/login"})},St=a(179),Et=a(176),Ft=n.a.forwardRef((function(t,e){return Object(mt.jsx)(Et.a,Object(v.a)({elevation:6,ref:e,variant:"filled"},t))}));function Lt(){var t=Object(m.c)((function(t){return t.app.error})),e=Object(m.b)(),a=function(t,a){"clickaway"!==a&&e(_({error:null}))};return Object(mt.jsx)(St.a,{open:null!=t,autoHideDuration:6e3,onClose:a,children:Object(mt.jsx)(Ft,{onClose:a,severity:"error",children:t})})}var Wt=a(180),Pt=a(161),Vt=a(167),Dt=a(168),Nt=a(83),Rt=a(29),Bt=a(50),zt=Object(Rt.b)({tasks:ut,todolists:ct,app:J,auth:q}),Mt=Object(B.a)({reducer:zt,middleware:function(t){return t().prepend(Bt.a)}});window.store=Mt;var Ut=function(){var t=Object(m.c)((function(t){return t.auth.isLoggedIn})),e=Object(m.b)(),a=Object(Nt.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(t){var e={};return t.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(t.email)||(e.email="Invalid email address"):e.email="Required",t.password?t.password.length<=2&&(e.password="The length of password must be 3 or more"):e.password="Required",e},onSubmit:function(){var t=Object(x.a)(k.a.mark((function t(r,n){var s,c,i,o,l;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e(z(r));case 2:s=t.sent,z.rejected.match(s)&&null!==(c=s.payload)&&void 0!==c&&null!==(i=c.fieldsErrors)&&void 0!==i&&i.length&&(l=null===(o=s.payload)||void 0===o?void 0:o.fieldsErrors[0],n.setFieldError(l.field,l.error)),a.resetForm();case 5:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()});return t?Object(mt.jsx)(Tt.a,{to:"/"}):Object(mt.jsx)(bt.a,{container:!0,justifyContent:"center",children:Object(mt.jsx)(bt.a,{item:!0,justifyContent:"center",children:Object(mt.jsx)("form",{onSubmit:a.handleSubmit,children:Object(mt.jsxs)(Wt.a,{children:[Object(mt.jsxs)(Pt.a,{children:[Object(mt.jsxs)("p",{children:["To log in get registered",Object(mt.jsx)("a",{href:"https://social-network.samuraijs.com/",target:"_blank",children:" here"})]}),Object(mt.jsx)("p",{children:"or use common test account credentials:"}),Object(mt.jsx)("p",{children:"Email: free@samuraijs.com"}),Object(mt.jsx)("p",{children:"Password: free"})]}),Object(mt.jsxs)(Vt.a,{children:[Object(mt.jsx)(ht.a,Object(v.a)(Object(v.a)({label:"Email",margin:"normal"},a.getFieldProps("email")),{},{onBlur:a.handleBlur})),a.touched.email&&a.errors.email?Object(mt.jsx)("div",{style:{color:"red"},children:a.errors.email}):null,Object(mt.jsx)(ht.a,Object(v.a)(Object(v.a)({type:"password",label:"Password",margin:"normal"},a.getFieldProps("password")),{},{onBlur:a.handleBlur})),a.touched.password&&a.errors.password?Object(mt.jsx)("div",{style:{color:"red"},children:a.errors.password}):null,Object(mt.jsx)(Dt.a,{label:"Remember me",control:Object(mt.jsx)(Ct.a,Object(v.a)({},a.getFieldProps("rememberMe")))}),Object(mt.jsx)(j.a,{type:"submit",variant:"contained",color:"primary",children:"Login"})]})]})})})})};var qt=function(t){var e=t.demo,a=void 0!==e&&e,n=Object(m.b)(),s=Object(m.c)((function(t){return t.app.isInitialized})),c=Object(m.c)((function(t){return t.auth.isLoggedIn}));Object(r.useEffect)((function(){n(K())}),[]);var i=Object(m.c)((function(t){return t.app.status})),o=Object(r.useCallback)((function(){n(M())}),[]);return s?Object(mt.jsxs)("div",{className:"App",children:[Object(mt.jsx)(Lt,{}),Object(mt.jsx)(d.a,{position:"static",children:Object(mt.jsxs)(u.a,{children:[Object(mt.jsx)(b.a,{edge:"start",color:"inherit","aria-label":"menu",children:Object(mt.jsx)(O.a,{})}),Object(mt.jsx)(f.a,{variant:"h6",children:"News"}),c&&Object(mt.jsx)(j.a,{color:"inherit",onClick:o,children:"Log out"})]})}),"loading"===i&&Object(mt.jsx)(p.a,{color:"secondary"}),Object(mt.jsx)(h.a,{fixed:!0,children:Object(mt.jsxs)(Tt.d,{children:[Object(mt.jsx)(Tt.b,{path:"/",element:Object(mt.jsx)(At,{demo:a})}),Object(mt.jsx)(Tt.b,{path:"/login",element:Object(mt.jsx)(Ut,{})}),Object(mt.jsx)(Tt.b,{path:"/404",element:Object(mt.jsx)("h1",{style:{textAlign:"center"},children:"404: PAGE NOT FOUND"})}),Object(mt.jsx)(Tt.b,{path:"/*",element:Object(mt.jsx)(Tt.a,{to:"/404"})})]})})]}):Object(mt.jsx)("div",{style:{position:"fixed",top:"30%",textAlign:"center",width:"100%"},children:Object(mt.jsx)(l.a,{color:"secondary"})})},Ht=a(49);c.a.render(Object(mt.jsx)(m.a,{store:Mt,children:Object(mt.jsx)(Ht.a,{children:Object(mt.jsx)(qt,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},98:function(t,e,a){},99:function(t,e,a){}},[[125,1,2]]]);
//# sourceMappingURL=main.9521888e.chunk.js.map