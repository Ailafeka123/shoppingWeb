/*! For license information please see 35.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkshoppingweb=self.webpackChunkshoppingweb||[]).push([[35],{35:(e,t,r)=>{r.r(t),r.d(t,{default:()=>x});var n=r(540),o=r(175),a=r(404),i=r(597),c=r(594),u=r(817);const l=function(e){var t=e.imgLink,r=e.name,o=e.number,a=e.category,i=e.price,c=e.content,u=e.finalFix,l=e.id,s=e.fixClick,f=e.deleteClick;return n.createElement("div",{className:"ProductionDiv"},n.createElement("div",{className:"productionImgDiv"},n.createElement("img",{className:"productionImg",src:t})),n.createElement("div",null,n.createElement("p",null,"名稱:",r),n.createElement("p",null,"剩餘數量:",o)),n.createElement("div",null,n.createElement("p",null,"價格:",i),n.createElement("p",null,"種類:",a)),n.createElement("div",null,n.createElement("p",null,"說明:",c),n.createElement("p",null,"最後修改者:",u)),n.createElement("div",{className:"ProductionButtonDiv"},n.createElement("button",{onClick:function(){return s(l)}},"修改"),n.createElement("button",{onClick:function(){return f(l)}},"刪除")))},s=function(e){return n.createElement("div",{className:"databaseShowDiv"},n.createElement("div",{className:"databaseHeader"},n.createElement("button",{onClick:e.closeClick},"關閉")),n.createElement("div",{className:"dataFixBox"},n.createElement("div",null,e.datainputbox)),n.createElement("div",{className:"dataSubmitDiv"},n.createElement("button",{onClick:e.submitClick},"確定")))};function f(e){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f(e)}function p(){return p=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},p.apply(null,arguments)}function m(){m=function(){return t};var e,t={},r=Object.prototype,n=r.hasOwnProperty,o=Object.defineProperty||function(e,t,r){e[t]=r.value},a="function"==typeof Symbol?Symbol:{},i=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",u=a.toStringTag||"@@toStringTag";function l(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{l({},"")}catch(e){l=function(e,t,r){return e[t]=r}}function s(e,t,r,n){var a=t&&t.prototype instanceof b?t:b,i=Object.create(a.prototype),c=new _(n||[]);return o(i,"_invoke",{value:C(e,r,c)}),i}function p(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}t.wrap=s;var h="suspendedStart",v="suspendedYield",y="executing",d="completed",g={};function b(){}function w(){}function E(){}var x={};l(x,i,(function(){return this}));var k=Object.getPrototypeOf,L=k&&k(k(D([])));L&&L!==r&&n.call(L,i)&&(x=L);var S=E.prototype=b.prototype=Object.create(x);function O(e){["next","throw","return"].forEach((function(t){l(e,t,(function(e){return this._invoke(t,e)}))}))}function j(e,t){function r(o,a,i,c){var u=p(e[o],e,a);if("throw"!==u.type){var l=u.arg,s=l.value;return s&&"object"==f(s)&&n.call(s,"__await")?t.resolve(s.__await).then((function(e){r("next",e,i,c)}),(function(e){r("throw",e,i,c)})):t.resolve(s).then((function(e){l.value=e,i(l)}),(function(e){return r("throw",e,i,c)}))}c(u.arg)}var a;o(this,"_invoke",{value:function(e,n){function o(){return new t((function(t,o){r(e,n,t,o)}))}return a=a?a.then(o,o):o()}})}function C(t,r,n){var o=h;return function(a,i){if(o===y)throw Error("Generator is already running");if(o===d){if("throw"===a)throw i;return{value:e,done:!0}}for(n.method=a,n.arg=i;;){var c=n.delegate;if(c){var u=N(c,n);if(u){if(u===g)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===h)throw o=d,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=y;var l=p(t,r,n);if("normal"===l.type){if(o=n.done?d:v,l.arg===g)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(o=d,n.method="throw",n.arg=l.arg)}}}function N(t,r){var n=r.method,o=t.iterator[n];if(o===e)return r.delegate=null,"throw"===n&&t.iterator.return&&(r.method="return",r.arg=e,N(t,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),g;var a=p(o,t.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,g;var i=a.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,g):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,g)}function P(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function A(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function _(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(P,this),this.reset(!0)}function D(t){if(t||""===t){var r=t[i];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function r(){for(;++o<t.length;)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}throw new TypeError(f(t)+" is not iterable")}return w.prototype=E,o(S,"constructor",{value:E,configurable:!0}),o(E,"constructor",{value:w,configurable:!0}),w.displayName=l(E,u,"GeneratorFunction"),t.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===w||"GeneratorFunction"===(t.displayName||t.name))},t.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,E):(e.__proto__=E,l(e,u,"GeneratorFunction")),e.prototype=Object.create(S),e},t.awrap=function(e){return{__await:e}},O(j.prototype),l(j.prototype,c,(function(){return this})),t.AsyncIterator=j,t.async=function(e,r,n,o,a){void 0===a&&(a=Promise);var i=new j(s(e,r,n,o),a);return t.isGeneratorFunction(r)?i:i.next().then((function(e){return e.done?e.value:i.next()}))},O(S),l(S,u,"Generator"),l(S,i,(function(){return this})),l(S,"toString",(function(){return"[object Generator]"})),t.keys=function(e){var t=Object(e),r=[];for(var n in t)r.push(n);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},t.values=D,_.prototype={constructor:_,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(A),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return c.type="throw",c.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],c=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var u=n.call(i,"catchLoc"),l=n.call(i,"finallyLoc");if(u&&l){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!l)throw Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===e||"continue"===e)&&a.tryLoc<=t&&t<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=e,i.arg=t,a?(this.method="next",this.next=a.finallyLoc,g):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),g},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),A(r),g}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var o=n.arg;A(r)}return o}}throw Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:D(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),g}},t}function h(e,t,r,n,o,a,i){try{var c=e[a](i),u=c.value}catch(e){return void r(e)}c.done?t(u):Promise.resolve(u).then(n,o)}function v(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var a=e.apply(t,r);function i(e){h(a,n,o,i,c,"next",e)}function c(e){h(a,n,o,i,c,"throw",e)}i(void 0)}))}}function y(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?y(Object(r),!0).forEach((function(t){g(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):y(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function g(e,t,r){return(t=function(e){var t=function(e){if("object"!=f(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var r=t.call(e,"string");if("object"!=f(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==f(t)?t:t+""}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function b(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,a,i,c=[],u=!0,l=!1;try{if(a=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=a.call(r)).done)&&(c.push(n.value),c.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=r.return&&(i=r.return(),Object(i)!==i))return}finally{if(l)throw o}}return c}}(e,t)||w(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function w(e,t){if(e){if("string"==typeof e)return E(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?E(e,t):void 0}}function E(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}r(975);const x=function(){var e=(0,o.Zp)(),t=(0,n.useContext)(i.k);(0,n.useEffect)((function(){"auth"!==t.Role&&"editor"!==t.Role&&"test"!==t.Role&&e("/")}),[t]);var r=(0,n.useContext)(a.h),f=b((0,n.useState)(!1),2),h=f[0],y=f[1],E=b((0,n.useState)(""),2),x=E[0],k=E[1],L=b((0,n.useState)(),2),S=L[0],O=L[1],j=b((0,n.useState)(1),2),C=j[0],N=j[1],P=b((0,n.useState)("all"),2),A=P[0],_=P[1],D=b((0,n.useState)({search:"",method:"",limit:10}),2),I=D[0],T=D[1],F=b((0,n.useState)({name:"",number:0,category:"",content:"",pic:"",price:0}),2),G=F[0],R=F[1],B=function(e){var t=e.target,r=t.name,n=t.value,o=n;"number"!==r&&"price"!==r||(o=parseInt(n,10)),R((function(e){return d(d({},e),{},g({},r,o))}))},H=function(){R({name:"",number:0,category:"",content:"",pic:"",price:0})},M=[["名稱:","text","name",B,G.name],["剩餘數量:","number","number",B,G.number],["圖片:","text","pic",B,G.pic],["種類:","text","category",B,G.category],["價格:","number","price",B,G.price],["說明:","text","content",B,G.content]].map((function(e,t){var r=b(e,5),o=r[0],a=r[1],i=r[2],c=r[3],u=r[4];return n.createElement("div",{key:t,className:"dataInputDiv"},n.createElement("label",{className:"dataLable"},n.createElement("p",null,o),n.createElement("input",{type:a,name:i,onChange:function(e){return c(e)},value:u,className:"dataInput"})))})),J=function(){y(!1),O(),H()},K=function(e){var t,r=e.split(",").map((function(e){return e.trim()})),n=new Set,o=function(e){var t="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!t){if(Array.isArray(e)||(t=w(e))){t&&(e=t);var r=0,n=function(){};return{s:n,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,a=!0,i=!1;return{s:function(){t=t.call(e)},n:function(){var e=t.next();return a=e.done,e},e:function(e){i=!0,o=e},f:function(){try{a||null==t.return||t.return()}finally{if(i)throw o}}}}(r);try{for(o.s();!(t=o.n()).done;)for(var a=t.value,i=0;i<a.length;i++)for(var c=i+1;c<=a.length;c++)n.add(a.slice(i,c))}catch(e){o.e(e)}finally{o.f()}return Array.from(n)},Y=function(){var e=v(m().mark((function e(){var t,n,o;return m().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n="".concat(G.name.toLocaleLowerCase(),",").concat(G.category.toLocaleLowerCase()),o=K(n),e.next=5,(0,c.gS)((0,c.rJ)(u.kA,"production"),{name:G.name,number:G.number,pic:G.pic,category:G.category,price:G.price,content:G.content,finalfix:null===(t=r.LoginState)||void 0===t?void 0:t.email,searchKey:o,createTime:new Date,lastFixTime:new Date});case 5:e.sent,alert("新增成功"),H(),y(!1),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(0),console.error("發生錯誤"+e.t0.message),alert("很抱歉 您無此權限 請通知管理員");case 15:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(){return e.apply(this,arguments)}}(),U=function(){var e=v(m().mark((function e(t){var r,n,o;return m().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=(0,c.H9)(u.kA,"production",t),e.next=3,(0,c.x7)(r);case 3:(n=e.sent).exists()?(o=n.data(),R((function(e){return{name:o.name||"",number:o.number||0,category:o.category||"",content:o.content||"",pic:o.pic||"",price:o.price||0}}))):console.log("查無資料");case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Z=function(){var e=v(m().mark((function e(t){var n,o,a,i,l;return m().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,o=(0,c.H9)(u.kA,"production",t),a="".concat(G.name.toLocaleLowerCase(),",").concat(G.category.toLocaleLowerCase()),i=K(a),l={name:G.name,number:G.number,pic:G.pic,category:G.category,price:G.price,content:G.content,searchKey:i,finalfix:null===(n=r.LoginState)||void 0===n?void 0:n.email,lastFixTime:new Date},e.next=7,(0,c.BN)(o,l,{merge:!0});case 7:alert("更新成功"),H(),y(!1),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),console.error("error:"+e.t0.message);case 15:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(t){return e.apply(this,arguments)}}(),$=function(){var e=v(m().mark((function e(t){var r;return m().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=(0,c.H9)(u.kA,"production",t),e.prev=1,e.next=4,(0,c.kd)(r);case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(1),console.error("error:"+e.t0.message);case 9:case"end":return e.stop()}}),e,null,[[1,6]])})));return function(t){return e.apply(this,arguments)}}(),q=function(e){if(confirm("請問是否要刪除"))if(confirm("真的確定要刪除嗎?\n此步驟不可復原")){if("test"===t.Role)return void alert("很抱歉，測試用帳號僅可觀看使用，無法實際操作，避免資料混亂");$(e),alert("已刪除")}else alert("已取消");else alert("已取消")},z=function(e){O(e),U(e),k("update"),y(!0)},Q=b((0,n.useState)([]),2),V=Q[0],W=Q[1],X=[],ee=function(){var e=v(m().mark((function e(){var t;return m().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,c.GG)((0,c.rJ)(u.kA,"production"));case 3:t=e.sent,X=[],t.forEach((function(e){var t=e.data();X.push({imgLink:t.pic,name:t.name,number:t.number,category:t.category,price:t.price,content:t.content,finalFix:t.finalfix,id:e.id,fixClick:z,deleteClick:q})})),_("all"),W(X),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.error("發生錯誤"+e.t0.message);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}}(),te=function(){var e=v(m().mark((function e(t){var r,n,o,a;return m().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=(0,c.rJ)(u.kA,"production"),n=t.search,o=(0,c.P)(r,(0,c._M)("searchKey","array-contains",n)),e.prev=3,e.next=6,(0,c.GG)(o);case 6:a=e.sent,X=[],a.forEach((function(e){var t=e.data();X.push({imgLink:t.pic,name:t.name,number:t.number,category:t.category,price:t.price,content:t.content,finalFix:t.finalfix,id:e.id,fixClick:z,deleteClick:q})})),_("search"),W(X),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(3),console.error("error:"+e.t0.message);case 16:case"end":return e.stop()}}),e,null,[[3,13]])})));return function(t){return e.apply(this,arguments)}}();return(0,n.useEffect)((function(){window.scrollTo(0,0),ee()}),[]),(0,n.useEffect)((function(){switch(A){case"all":ee();break;case"search":te(I);break;default:console.log("未知")}}),[C]),n.createElement(n.Fragment,null,n.createElement("h1",null,"產品管理頁面"),n.createElement("div",{className:"dataSearchDiv"},n.createElement("search",{className:"dataSearch"},n.createElement("input",{placeholder:"搜尋關鍵字",name:"search",id:"databaseSearch",onChange:function(e){!function(e){var t=e.target,r=t.name,n=t.value;T((function(e){return d(d({},e),{},g({},r,n))}))}(e)}}),n.createElement("button",{onClick:function(){te(I)}},"查詢"),n.createElement("button",{onClick:function(){document.getElementById("databaseSearch").value=""}},"清除")),n.createElement("div",null,n.createElement("button",{onClick:function(){ee()}},"查詢所有商品")),n.createElement("div",null,n.createElement("button",{onClick:function(){y(!0),k("add")}},"增新產品"))),0===V.length?n.createElement("p",null,"尚未載入資料"):V.map((function(e,t){return n.createElement(l,p({key:t},e))})),h&&n.createElement(s,{closeClick:function(){return J()},submitClick:function(){!function(e){if(confirm("請問是否確認提交")){if(!(""===G.name.trim()?(alert("名稱不可為空"),0):isNaN(G.number)||G.number<=0?(alert("剩餘數量不可為空或小於0"),0):""===G.category.trim()?(alert("產品種類不可以為空"),0):""===G.content.trim()?(alert("產品內容不可以為空"),0):isNaN(G.price)||G.price<=0?(alert("產品價格不可為空或小於0"),0):""!==G.pic.trim()||(alert("照片不可以為空"),0)))return;if("test"===t.Role)return alert("很抱歉，測試用帳號僅可觀看使用，無法實際操作，避免資料混亂"),void J();switch(e){case"add":Y(),N(C+1);break;case"update":Z(S),O(),N(C+1);break;default:console.log("未知")}}else console.log("已取消")}(x)},datainputbox:M}))}},975:(e,t,r)=>{r.d(t,{A:()=>o});var n=r(540);const o=function(e){var t=e.data,r=e.onClick;return n.createElement("div",{id:"alterMessage",className:"alterMessage",style:{display:""===t?"none":"flex"}},n.createElement("h1",null,t),n.createElement("button",{onClick:r},"確定"))}}}]);