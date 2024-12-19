import{a as R,b as F,e as ve,V as M,f as me}from"./VTextField-Bw_ieaeC.js";import{k as Q,p as S,m as Z,h as he,i as ge,j as $,l as ye,u as Ve,n as ee,q as we,r as U,s as P,v as X,x,y as ke,b as s,V as T,z as A,A as te,B as _e,I as Ce,C as ne,D as Pe,F as j,E as oe,G as I,H as Te,J as Y,K as be,L as Ie,M as Ee,N as xe,O as Be,P as Se,Q as ae,R as $e,S as z,_ as O,e as H,c as B,w as l,T as Ae,o as _,d as k,t as E,a as L,U as De,W as We,X as Le,Y as Re,Z as G,g as q,$ as Ue}from"./index-MNRb34Qu.js";import{m as He,u as Xe,a as Ye,V as Fe,b as p,c as Me}from"./filter-C6EPhXZz.js";import{b as je,V as W,a as Oe}from"./VSpacer-w6wQFIMN.js";import{V as Ne}from"./VTextarea-CqpB5ai5.js";import{V as ze}from"./VContainer-CidzjlCO.js";import{V as Ge}from"./VDataTableServer-C1-IP18b.js";const qe=e=>{const{touchstartX:t,touchendX:n,touchstartY:a,touchendY:r}=e,u=.5,o=16;e.offsetX=n-t,e.offsetY=r-a,Math.abs(e.offsetY)<u*Math.abs(e.offsetX)&&(e.left&&n<t-o&&e.left(e),e.right&&n>t+o&&e.right(e)),Math.abs(e.offsetX)<u*Math.abs(e.offsetY)&&(e.up&&r<a-o&&e.up(e),e.down&&r>a+o&&e.down(e))};function pe(e,t){var a;const n=e.changedTouches[0];t.touchstartX=n.clientX,t.touchstartY=n.clientY,(a=t.start)==null||a.call(t,{originalEvent:e,...t})}function Je(e,t){var a;const n=e.changedTouches[0];t.touchendX=n.clientX,t.touchendY=n.clientY,(a=t.end)==null||a.call(t,{originalEvent:e,...t}),qe(t)}function Ke(e,t){var a;const n=e.changedTouches[0];t.touchmoveX=n.clientX,t.touchmoveY=n.clientY,(a=t.move)==null||a.call(t,{originalEvent:e,...t})}function Qe(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const t={touchstartX:0,touchstartY:0,touchendX:0,touchendY:0,touchmoveX:0,touchmoveY:0,offsetX:0,offsetY:0,left:e.left,right:e.right,up:e.up,down:e.down,start:e.start,move:e.move,end:e.end};return{touchstart:n=>pe(n,t),touchend:n=>Je(n,t),touchmove:n=>Ke(n,t)}}function Ze(e,t){var c;const n=t.value,a=n!=null&&n.parent?e.parentElement:e,r=(n==null?void 0:n.options)??{passive:!0},u=(c=t.instance)==null?void 0:c.$.uid;if(!a||!u)return;const o=Qe(t.value);a._touchHandlers=a._touchHandlers??Object.create(null),a._touchHandlers[u]=o,Q(o).forEach(f=>{a.addEventListener(f,o[f],r)})}function et(e,t){var u,o;const n=(u=t.value)!=null&&u.parent?e.parentElement:e,a=(o=t.instance)==null?void 0:o.$.uid;if(!(n!=null&&n._touchHandlers)||!a)return;const r=n._touchHandlers[a];Q(r).forEach(c=>{n.removeEventListener(c,r[c])}),delete n._touchHandlers[a]}const se={mounted:Ze,unmounted:et},ie=Symbol.for("vuetify:v-window"),le=Symbol.for("vuetify:v-window-group"),re=S({continuous:Boolean,nextIcon:{type:[Boolean,String,Function,Object],default:"$next"},prevIcon:{type:[Boolean,String,Function,Object],default:"$prev"},reverse:Boolean,showArrows:{type:[Boolean,String],validator:e=>typeof e=="boolean"||e==="hover"},touch:{type:[Object,Boolean],default:void 0},direction:{type:String,default:"horizontal"},modelValue:null,disabled:Boolean,selectedClass:{type:String,default:"v-window-item--active"},mandatory:{type:[Boolean,String],default:"force"},...Z(),...he(),...ge()},"VWindow"),J=$()({name:"VWindow",directives:{Touch:se},props:re(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:n}=t;const{themeClasses:a}=ye(e),{isRtl:r}=Ve(),{t:u}=ee(),o=we(e,le),c=U(),f=P(()=>r.value?!e.reverse:e.reverse),i=X(!1),v=P(()=>{const g=e.direction==="vertical"?"y":"x",C=(f.value?!i.value:i.value)?"-reverse":"";return`v-window-${g}${C}-transition`}),m=X(0),h=U(void 0),y=P(()=>o.items.value.findIndex(g=>o.selected.value.includes(g.id)));x(y,(g,V)=>{const C=o.items.value.length,N=C-1;C<=2?i.value=g<V:g===N&&V===0?i.value=!0:g===0&&V===N?i.value=!1:i.value=g<V}),ke(ie,{transition:v,isReversed:i,transitionCount:m,transitionHeight:h,rootRef:c});const d=P(()=>e.continuous||y.value!==0),w=P(()=>e.continuous||y.value!==o.items.value.length-1);function b(){d.value&&o.prev()}function D(){w.value&&o.next()}const de=P(()=>{const g=[],V={icon:r.value?e.nextIcon:e.prevIcon,class:`v-window__${f.value?"right":"left"}`,onClick:o.prev,"aria-label":u("$vuetify.carousel.prev")};g.push(d.value?n.prev?n.prev({props:V}):s(T,V,null):s("div",null,null));const C={icon:r.value?e.prevIcon:e.nextIcon,class:`v-window__${f.value?"left":"right"}`,onClick:o.next,"aria-label":u("$vuetify.carousel.next")};return g.push(w.value?n.next?n.next({props:C}):s(T,C,null):s("div",null,null)),g}),fe=P(()=>e.touch===!1?e.touch:{...{left:()=>{f.value?b():D()},right:()=>{f.value?D():b()},start:V=>{let{originalEvent:C}=V;C.stopPropagation()}},...e.touch===!0?{}:e.touch});return A(()=>te(s(e.tag,{ref:c,class:["v-window",{"v-window--show-arrows-on-hover":e.showArrows==="hover"},a.value,e.class],style:e.style},{default:()=>{var g,V;return[s("div",{class:"v-window__container",style:{height:h.value}},[(g=n.default)==null?void 0:g.call(n,{group:o}),e.showArrows!==!1&&s("div",{class:"v-window__controls"},[de.value])]),(V=n.additional)==null?void 0:V.call(n,{group:o})]}}),[[_e("touch"),fe.value]])),{group:o}}}),tt=S({color:String,cycle:Boolean,delimiterIcon:{type:Ce,default:"$delimiter"},height:{type:[Number,String],default:500},hideDelimiters:Boolean,hideDelimiterBackground:Boolean,interval:{type:[Number,String],default:6e3,validator:e=>Number(e)>0},progress:[Boolean,String],verticalDelimiters:[Boolean,String],...re({continuous:!0,mandatory:"force",showArrows:!0})},"VCarousel"),nt=$()({name:"VCarousel",props:tt(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:n}=t;const a=ne(e,"modelValue"),{t:r}=ee(),u=U();let o=-1;x(a,f),x(()=>e.interval,f),x(()=>e.cycle,i=>{i?f():window.clearTimeout(o)}),Pe(c);function c(){!e.cycle||!u.value||(o=window.setTimeout(u.value.group.next,+e.interval>0?+e.interval:6e3))}function f(){window.clearTimeout(o),window.requestAnimationFrame(c)}return A(()=>{const i=J.filterProps(e);return s(J,I({ref:u},i,{modelValue:a.value,"onUpdate:modelValue":v=>a.value=v,class:["v-carousel",{"v-carousel--hide-delimiter-background":e.hideDelimiterBackground,"v-carousel--vertical-delimiters":e.verticalDelimiters},e.class],style:[{height:Y(e.height)},e.style]}),{default:n.default,additional:v=>{let{group:m}=v;return s(j,null,[!e.hideDelimiters&&s("div",{class:"v-carousel__controls",style:{left:e.verticalDelimiters==="left"&&e.verticalDelimiters?0:"auto",right:e.verticalDelimiters==="right"?0:"auto"}},[m.items.value.length>0&&s(oe,{defaults:{VBtn:{color:e.color,icon:e.delimiterIcon,size:"x-small",variant:"text"}},scoped:!0},{default:()=>[m.items.value.map((h,y)=>{const d={id:`carousel-item-${h.id}`,"aria-label":r("$vuetify.carousel.ariaLabel.delimiter",y+1,m.items.value.length),class:["v-carousel__controls__item",m.isSelected(h.id)&&"v-btn--active"],onClick:()=>m.select(h.id,!0)};return n.item?n.item({props:d,item:h}):s(T,I(h,d),null)})]})]),e.progress&&s(Te,{class:"v-carousel__progress",color:typeof e.progress=="string"?e.progress:void 0,modelValue:(m.getItemIndex(a.value)+1)/m.items.value.length*100},null)])},prev:n.prev,next:n.next})}),{}}}),ue=S({reverseTransition:{type:[Boolean,String],default:void 0},transition:{type:[Boolean,String],default:void 0},...Z(),...be(),...He()},"VWindowItem"),K=$()({name:"VWindowItem",directives:{Touch:se},props:ue(),emits:{"group:selected":e=>!0},setup(e,t){let{slots:n}=t;const a=Ie(ie),r=Ee(e,le),{isBooted:u}=xe();if(!a||!r)throw new Error("[Vuetify] VWindowItem must be used inside VWindow");const o=X(!1),c=P(()=>u.value&&(a.isReversed.value?e.reverseTransition!==!1:e.transition!==!1));function f(){!o.value||!a||(o.value=!1,a.transitionCount.value>0&&(a.transitionCount.value-=1,a.transitionCount.value===0&&(a.transitionHeight.value=void 0)))}function i(){var d;o.value||!a||(o.value=!0,a.transitionCount.value===0&&(a.transitionHeight.value=Y((d=a.rootRef.value)==null?void 0:d.clientHeight)),a.transitionCount.value+=1)}function v(){f()}function m(d){o.value&&ae(()=>{!c.value||!o.value||!a||(a.transitionHeight.value=Y(d.clientHeight))})}const h=P(()=>{const d=a.isReversed.value?e.reverseTransition:e.transition;return c.value?{name:typeof d!="string"?a.transition.value:d,onBeforeEnter:i,onAfterEnter:f,onEnterCancelled:v,onBeforeLeave:i,onAfterLeave:f,onLeaveCancelled:v,onEnter:m}:!1}),{hasContent:y}=Xe(e,r.isSelected);return A(()=>s(Se,{transition:h.value,disabled:!u.value},{default:()=>{var d;return[te(s("div",{class:["v-window-item",r.selectedClass.value,e.class],style:e.style},[y.value&&((d=n.default)==null?void 0:d.call(n))]),[[Be,r.isSelected.value]])]}})),{groupItem:r}}}),ot=S({...$e(),...ue()},"VCarouselItem"),at=$()({name:"VCarouselItem",inheritAttrs:!1,props:ot(),setup(e,t){let{slots:n,attrs:a}=t;A(()=>{const r=z.filterProps(e),u=K.filterProps(e);return s(K,I({class:["v-carousel-item",e.class]},u),{default:()=>[s(z,I(a,r),n)]})})}}),st={name:"AccountsCarousel",data:()=>({loading:!1,accounts:[]}),async created(){await this.fetchAccounts()},methods:{async fetchAccounts(){this.loading=!0;try{const{data:e}=await R.accounts.getList();this.accounts=e,console.log(this.accounts,"accounts")}finally{this.loading=!1}}}},it={key:0},lt={class:"text-h4"};function rt(e,t,n,a,r,u){return e.loading?(_(),H("div",it," loading ")):(_(),B(nt,{key:1,"hide-delimiter-background":"","show-arrows":!1,dark:"",height:"150",class:"rounded-lg"},{default:l(()=>[(_(!0),H(j,null,Ae(e.accounts,(o,c)=>(_(),B(at,{key:c},{default:l(()=>[s(F,{variant:"flat",color:"#191f2f",height:"150"},{default:l(()=>[s(ve,{class:"mt-2 mb-3 text-body-1"},{default:l(()=>[k(E(o.name),1)]),_:2},1024),s(M,null,{default:l(()=>[L("h3",lt,E(e.formatPriceMixin(o.balance)),1)]),_:2},1024)]),_:2},1024)]),_:2},1024))),128))]),_:1}))}const ce=O(st,[["render",rt],["__file","/Users/reuvenyanturin/Projects/WiseWallet/admin/src/components/accounts-carousel/AccountsCarousel.vue"]]),ut=S({fullscreen:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,...Ye({origin:"center center",scrollStrategy:"block",transition:{component:Fe},zIndex:2400})},"VDialog"),ct=$()({name:"VDialog",props:ut(),emits:{"update:modelValue":e=>!0,afterEnter:()=>!0,afterLeave:()=>!0},setup(e,t){let{emit:n,slots:a}=t;const r=ne(e,"modelValue"),{scopeId:u}=De(),o=U();function c(v){var y,d;const m=v.relatedTarget,h=v.target;if(m!==h&&((y=o.value)!=null&&y.contentEl)&&((d=o.value)!=null&&d.globalTop)&&![document,o.value.contentEl].includes(h)&&!o.value.contentEl.contains(h)){const w=Re(o.value.contentEl);if(!w.length)return;const b=w[0],D=w[w.length-1];m===b?D.focus():b.focus()}}We(()=>{document.removeEventListener("focusin",c)}),Le&&x(()=>r.value&&e.retainFocus,v=>{v?document.addEventListener("focusin",c):document.removeEventListener("focusin",c)},{immediate:!0});function f(){var v;n("afterEnter"),(v=o.value)!=null&&v.contentEl&&!o.value.contentEl.contains(document.activeElement)&&o.value.contentEl.focus({preventScroll:!0})}function i(){n("afterLeave")}return x(r,async v=>{var m;v||(await ae(),(m=o.value.activatorEl)==null||m.focus({preventScroll:!0}))}),A(()=>{const v=p.filterProps(e),m=I({"aria-haspopup":"dialog"},e.activatorProps),h=I({tabindex:-1},e.contentProps);return s(p,I({ref:o,class:["v-dialog",{"v-dialog--fullscreen":e.fullscreen,"v-dialog--scrollable":e.scrollable},e.class],style:e.style},v,{modelValue:r.value,"onUpdate:modelValue":y=>r.value=y,"aria-modal":"true",activatorProps:m,contentProps:h,height:e.fullscreen?void 0:e.height,width:e.fullscreen?void 0:e.width,maxHeight:e.fullscreen?void 0:e.maxHeight,maxWidth:e.fullscreen?void 0:e.maxWidth,role:"dialog",onAfterEnter:f,onAfterLeave:i},u),{activator:a.activator,default:function(){for(var y=arguments.length,d=new Array(y),w=0;w<y;w++)d[w]=arguments[w];return s(oe,{root:"VDialog"},{default:()=>{var b;return[(b=a.default)==null?void 0:b.call(a,...d)]}})}})}),me({},o)}}),dt={data:()=>({cookies:void 0,loading:!1,dialog:!1}),methods:{async save(){this.loading=!0;try{await R.transactions.upload({cookies:this.cookies}),this.cookies=void 0,this.dialog=!1}finally{this.loading=!1}}}};function ft(e,t,n,a,r,u){return _(),B(ct,{modelValue:e.dialog,"onUpdate:modelValue":t[2]||(t[2]=o=>e.dialog=o),scrollable:"",width:"600"},{activator:l(({props:o})=>[s(T,I({color:"success",variant:"flat"},o),{default:l(()=>t[3]||(t[3]=[k(" Upload transactions ")])),_:2},1040)]),default:l(()=>[s(F,{title:"Upload transactions"},{actions:l(()=>[s(je),s(T,{color:"primary",variant:"text",onClick:t[1]||(t[1]=o=>e.dialog=!1)},{default:l(()=>t[4]||(t[4]=[k(" Cancel ")])),_:1}),s(T,{color:"primary",variant:"flat",loading:e.loading,onClick:u.save},{default:l(()=>t[5]||(t[5]=[k(" Send ")])),_:1},8,["loading","onClick"])]),default:l(()=>[s(M,{class:"pt-2"},{default:l(()=>[s(Ne,{modelValue:e.cookies,"onUpdate:modelValue":t[0]||(t[0]=o=>e.cookies=o),rows:"24",label:"Cookies",variant:"outlined","hide-details":""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])}const vt=O(dt,[["render",ft],["__file","/Users/reuvenyanturin/Projects/WiseWallet/admin/src/pages/transactions/UploadTransactions.vue"]]),mt={name:"Transactions",components:{UploadTransactions:vt,AccountsCarousel:ce},data:()=>({loading:!1,itemsPerPage:15,transactions:[],totalItems:0}),async created(){await this.getTransactions()},methods:{async getTransactions(){this.loading=!0;try{const{data:e}=await R.transactions.getAll({skip:0,take:this.itemsPerPage});this.transactions=e.transactions,this.totalItems=e.count}finally{this.loading=!1}},async deleteTransaction(e){this.loading=!0;try{await R.transactions.delete(e.id),await this.getTransactions()}finally{this.loading=!1}}}},ht={class:"d-flex"},gt={key:0};function yt(e,t,n,a,r,u){const o=ce,c=G("UploadTransactions"),f=G("FontAwesomeIcon");return _(),B(ze,{fluid:""},{default:l(()=>[s(Oe,null,{default:l(()=>[s(W,{cols:"12"},{default:l(()=>t[1]||(t[1]=[L("h1",null,"Transactions",-1)])),_:1}),s(W,{cols:"12",md:"4"},{default:l(()=>[s(o)]),_:1}),s(W,{cols:"12",class:"d-flex gap-4"},{default:l(()=>[s(T,{color:"primary",variant:"flat",to:{name:"transaction-create"}},{default:l(()=>t[2]||(t[2]=[k(" Add New ")])),_:1}),s(c)]),_:1}),s(W,{cols:"12"},{default:l(()=>[s(F,{variant:"flat",rounded:"lg"},{default:l(()=>[s(M,null,{default:l(()=>[s(Ge,{"items-per-page":e.itemsPerPage,"onUpdate:itemsPerPage":t[0]||(t[0]=i=>e.itemsPerPage=i),headers:[{title:"Id",key:"id"},{title:"Category",key:"category"},{title:"Type",key:"type"},{title:"Amount",key:"amount"},{title:"Account",key:"account"},{title:"Actions",key:"actions"}],items:e.transactions,"items-length":e.totalItems,loading:e.loading},{"item.category":l(({item:i})=>[k(E(i.category.name),1)]),"item.type":l(({item:i})=>[s(Me,{color:i.type==="income"?"success":"error"},{prepend:l(()=>[i.type==="income"?(_(),B(f,{key:0,icon:"arrow-trend-up",class:"mr-2"})):q("",!0),i.type==="expense"?(_(),B(f,{key:1,icon:"arrow-trend-down",class:"mr-2"})):q("",!0)]),default:l(()=>[k(" "+E(i.type),1)]),_:2},1032,["color"])]),"item.amount":l(({item:i})=>[L("span",{class:Ue({"text-success":i.type==="income","text-error":i.type==="expense"})},E(e.formatPriceMixin(i.amount)),3)]),"item.account":l(({item:i})=>[k(E(i.account.name),1)]),"item.actions":l(({item:i})=>[L("div",ht,[i.isDeleted?(_(),H("span",gt,"deleted")):(_(),H(j,{key:1},[s(T,{to:{name:"transaction",params:{transactionId:i.id}}},{default:l(()=>t[3]||(t[3]=[k(" Show ")])),_:2},1032,["to"]),s(T,{onClick:v=>u.deleteTransaction(i)},{default:l(()=>t[4]||(t[4]=[k("delete")])),_:2},1032,["onClick"])],64))])]),_:1},8,["items-per-page","items","items-length","loading"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}const bt=O(mt,[["render",yt],["__file","/Users/reuvenyanturin/Projects/WiseWallet/admin/src/pages/transactions/Transactions.vue"]]);export{bt as default};
