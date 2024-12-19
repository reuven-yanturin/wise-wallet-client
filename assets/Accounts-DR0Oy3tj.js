import{a as c,V as f,b as g}from"./VTextField-Bw_ieaeC.js";import{_ as p,c as y,w as s,a as i,b as n,d as o,V as l,t as d,e as u,F as A,o as r}from"./index-MNRb34Qu.js";import{V as k}from"./VContainer-CidzjlCO.js";import{V as P}from"./VDataTableServer-C1-IP18b.js";import"./filter-C6EPhXZz.js";const V={name:"Accounts",data:()=>({loading:!1,itemsPerPage:15,accounts:[],totalItems:0}),async created(){await this.getAccounts()},methods:{async getAccounts(){this.loading=!0;try{const{data:t}=await c.accounts.getAll({skip:0,take:this.itemsPerPage});this.accounts=t.accounts,this.totalItems=t.count}finally{this.loading=!1}},async deleteAccount(t){this.loading=!0;try{await c.accounts.delete(t.id),await this.getAccounts()}finally{this.loading=!1}}}},h={class:"d-flex justify-space-between align-center mb-4"},w={class:"d-flex"},b={key:0};function v(t,e,C,_,B,m){return r(),y(k,{fluid:""},{default:s(()=>[i("div",h,[e[2]||(e[2]=i("h1",null,"Accounts",-1)),n(l,{color:"primary",variant:"flat",to:{name:"account-create"}},{default:s(()=>e[1]||(e[1]=[o(" Add New ")])),_:1})]),n(g,{variant:"flat",class:"rounded-lg"},{default:s(()=>[n(f,null,{default:s(()=>[n(P,{"items-per-page":t.itemsPerPage,"onUpdate:itemsPerPage":e[0]||(e[0]=a=>t.itemsPerPage=a),headers:[{title:"Id",key:"id"},{title:"Account",key:"name"},{title:"Balance",key:"balance"},{title:"Created at",key:"createdAt"},{title:"Actions",key:"actions"}],items:t.accounts,"items-length":t.totalItems,loading:t.loading},{"item.balance":s(({item:a})=>[o(d(t.formatPriceMixin(a.balance)),1)]),"item.createdAt":s(({item:a})=>[o(d(t.$dayjs(a.createdAt).format("DD MMM, YYYY")),1)]),"item.actions":s(({item:a})=>[i("div",w,[a.isDeleted?(r(),u("span",b,"deleted")):(r(),u(A,{key:1},[n(l,{to:{name:"account",params:{accountId:a.id}}},{default:s(()=>e[3]||(e[3]=[o(" Show ")])),_:2},1032,["to"]),n(l,{onClick:D=>m.deleteAccount(a)},{default:s(()=>e[4]||(e[4]=[o("delete")])),_:2},1032,["onClick"])],64))])]),_:1},8,["items-per-page","items","items-length","loading"])]),_:1})]),_:1})]),_:1})}const j=p(V,[["render",v],["__file","/Users/reuvenyanturin/Projects/WiseWallet/admin/src/pages/accounts/Accounts.vue"]]);export{j as default};
