import{a as d,V as g,b as p}from"./VTextField-Bw_ieaeC.js";import{_ as y,c,w as a,a as l,b as r,d as i,V as o,t as m,e as u,F as k,o as n}from"./index-MNRb34Qu.js";import{V as U}from"./VContainer-CidzjlCO.js";import{V}from"./VDataTableServer-C1-IP18b.js";import"./filter-C6EPhXZz.js";const P={name:"Users",data:()=>({loading:!1,itemsPerPage:15,users:[],totalItems:0}),async created(){await this.getUsers()},methods:{async getUsers(){this.loading=!0;try{const{data:e}=await d.users.getAll({skip:0,take:this.itemsPerPage});this.users=e.users,this.totalItems=e.count}finally{this.loading=!1}},async deleteUser(e){this.loading=!0;try{await d.users.delete(e.id),await this.getUsers()}finally{this.loading=!1}}}},h={class:"d-flex justify-space-between align-center mb-4"},w={class:"d-flex"},_={key:0};function v(e,t,N,C,b,f){return n(),c(U,{fluid:""},{default:a(()=>[l("div",h,[t[2]||(t[2]=l("h1",null,"Users",-1)),r(o,{color:"primary",variant:"flat",to:{name:"user-create"}},{default:a(()=>t[1]||(t[1]=[i(" Add New ")])),_:1})]),r(p,{variant:"flat",class:"rounded-lg"},{default:a(()=>[r(g,null,{default:a(()=>[r(V,{"items-per-page":e.itemsPerPage,"onUpdate:itemsPerPage":t[0]||(t[0]=s=>e.itemsPerPage=s),headers:[{title:"Id",key:"id"},{title:"User",key:"fullName"},{title:"Email",key:"email"},{title:"Действие",key:"actions"}],items:e.users,"items-length":e.totalItems,loading:e.loading},{"item.fullName":a(({item:s})=>[i(m(s.firstName)+" "+m(s.lastName),1)]),"item.actions":a(({item:s})=>[l("div",w,[s.isDeleted?(n(),u("span",_,"deleted")):(n(),u(k,{key:1},[r(o,{to:{name:"user",params:{userId:s.id}}},{default:a(()=>t[3]||(t[3]=[i(" Show ")])),_:2},1032,["to"]),r(o,{onClick:B=>f.deleteUser(s)},{default:a(()=>t[4]||(t[4]=[i("delete")])),_:2},1032,["onClick"])],64))])]),_:1},8,["items-per-page","items","items-length","loading"])]),_:1})]),_:1})]),_:1})}const T=y(P,[["render",v],["__file","/Users/reuvenyanturin/Projects/WiseWallet/admin/src/pages/users/Users.vue"]]);export{T as default};
