(function(e){function t(t){for(var c,o,s=t[0],a=t[1],i=t[2],p=0,d=[];p<s.length;p++)o=s[p],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&d.push(r[o][0]),r[o]=0;for(c in a)Object.prototype.hasOwnProperty.call(a,c)&&(e[c]=a[c]);l&&l(t);while(d.length)d.shift()();return u.push.apply(u,i||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],c=!0,s=1;s<n.length;s++){var a=n[s];0!==r[a]&&(c=!1)}c&&(u.splice(t--,1),e=o(o.s=n[0]))}return e}var c={},r={app:0},u=[];function o(t){if(c[t])return c[t].exports;var n=c[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=c,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)o.d(n,c,function(t){return e[t]}.bind(null,c));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],a=s.push.bind(s);s.push=t,s=s.slice();for(var i=0;i<s.length;i++)t(s[i]);var l=a;u.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"117b":function(e,t,n){"use strict";n("3c96")},"2bab":function(e,t,n){},"3c96":function(e,t,n){},"3d57":function(e,t,n){"use strict";n("c25a")},"40a2":function(e,t,n){},5476:function(e,t,n){"use strict";n("a946")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var c=n("7a23");function r(e,t,n,r,u,o){var s=Object(c["resolveComponent"])("Styles"),a=Object(c["resolveComponent"])("router-view");return Object(c["openBlock"])(),Object(c["createBlock"])("div",{id:"app",class:[{mobile:e.isMobile}]},[Object(c["createVNode"])(s),Object(c["createVNode"])("main",null,[Object(c["createVNode"])(a,null,{default:Object(c["withCtx"])((function(e){var t=e.Component;return[Object(c["createVNode"])(c["Transition"],{name:"component-fade",mode:"out-in"},{default:Object(c["withCtx"])((function(){return[(Object(c["openBlock"])(),Object(c["createBlock"])(Object(c["resolveDynamicComponent"])(t)))]})),_:2},1024)]})),_:1})])],2)}var u=n("5530"),o=(n("ac1f"),n("5319"),n("4de4"),n("2ca0"),n("b0c0"),n("caad"),n("2532"),n("d81d"),n("5502")),s=(n("d3b7"),n("fbb9")),a={username:Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_ZULIP_email,apiKey:Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_ZULIP_key,realm:Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_ZULIP_site},i=function(){return new Promise((function(e,t){s(a).then((function(t){return e(t)})).catch((function(e){return t(e)}))}))},l=function(e){return new Promise((function(t,n){e.streams.retrieve().then((function(e){return t(e)})).catch((function(e){return n(e)}))}))},p=function(e,t,n,c){return new Promise((function(r,u){e.messages.retrieve(c||{anchor:"newest",num_before:100,num_after:0,narrow:[{operator:"stream",operand:t},{operator:"topic",operand:n}]}).then((function(e){return r(e)})).catch((function(e){return u(e)}))}))},d=function(e,t,n){return new Promise((function(c,r){e.messages.retrieve(n||{anchor:"newest",num_before:100,num_after:0,narrow:[{operator:"stream",operand:t}]}).then((function(e){return c(e)})).catch((function(e){return r(e)}))}))},m=function(e,t){e.callOnEachEvent((function(e){return t(e)}),["message"],[{operator:"stream",operand:"chatty"}])},f=function(e){return new Promise((function(t,n){e.streams.subscriptions.retrieve().then((function(e){return t(e)})).catch((function(e){return n(e)}))}))},b=function(e,t){return new Promise((function(n,c){e.users.me.subscriptions.add({subscriptions:JSON.stringify([{name:t}])}).then((function(e){return n(e)})).catch((function(e){return c(e)}))}))},D=function(e,t){return new Promise((function(n,c){e.messages.send(t||{to:"chatty",type:"stream",topic:"content",content:"I come not, friends, to steal away your hearts."}).then((function(e){return n(e)})).catch((function(e){return c(e)}))}))},j={init:i,config:a,getStreams:l,getMsgs:p,getAllMsgs:d,listen:m,sendMsg:D,getSubs:f,addSub:b},O={zulip:j},h=(n("99af"),n("25f0"),n("f5b2"),{methods:{toEmojiCode:function(e){return console.log(e),e.replace(/(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])/g,(function(e){return e.codePointAt(0).toString(16)}))},containsEmoji:function(e){var t=/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi;return t.test(e)}}}),g={name:"Styles",mixins:[h],computed:Object(u["a"])({},Object(o["c"])(["rules"])),data:function(){return{el:null}},methods:{generateStyleRules:function(){var e=this,t="";return this.rules.map((function(n){t+=".".concat(n.parentClassName," ").concat(n.className),e.containsEmoji(n.className)&&(t+=", .".concat(n.parentClassName," .u").concat(e.toEmojiCode(n.className))),t+="{",n.rules.map((function(e){t+=e})),t+="}"})),t},createStyleElement:function(){var e=document.createElement("style");return e.innerText=this.generateStyleRules(),e}},mounted:function(){this.el=this.createStyleElement(),document.head.appendChild(this.el)},watch:{rules:function(){console.log("rules!");var e=this.createStyleElement();document.head.replaceChild(e,this.el),this.el=e}}},v=g,E={name:"App",components:{Styles:v},data:function(){return{api:O,zulipClient:null}},computed:Object(u["a"])({},Object(o["c"])(["isMobile","pubStr","currentStream"])),created:function(){var e=this;this.$store.commit("setMobile",this.checkIfMobile()),window.addEventListener("resize",(function(){e.$store.commit("setMobile",e.checkIfMobile())})),this.getStreams(),this.$router.afterEach((function(t){e.$store.commit("setTopics",[]),e.$store.commit("setRules",[]),e.$store.commit("setCurStream",t.path.replace("/","")),""!=e.currentStream&&e.setUpDoc(e.currentStream)}))},methods:{checkIfMobile:function(){return window.innerWidth<700},getStreams:function(){var e=this;O.zulip.init().then((function(t){e.zulipClient=t,O.zulip.getStreams(t).then((function(t){e.$store.commit("setStreams",t.streams.filter((function(t){return t.name.startsWith(e.pubStr)})))})),O.zulip.listen(e.zulipClient,e.eventHandler)}))},setUpDoc:function(e){var t=this;O.zulip.getSubs(this.zulipClient).then((function(e){e.subscriptions.map((function(e){return e.name})).includes(t.currentStream)||O.zulip.addSub(t.zulipClient,t.currentStream)})),O.zulip.getAllMsgs(this.zulipClient,e).then((function(e){for(var n=0;n<e.messages.length;n++){var c=e.messages[n];"rules"==c.subject?t.$store.commit("addRule",c):t.$store.commit("addMessage",c)}}))},eventHandler:function(e){switch(console.log(e),e.type){case"message":switch(e.message.subject){case"content":this.$store.commit("addMessage",e.message);break;case"rules":this.$store.commit("addRule",e.message);break}break;case"delete_message":this.$store.commit("deleteMessage",e.message_id);break;case"update_message":this.$store.commit("editMessage",{mid:e.message_id,content:e.rendered_content});break;case"reaction":this.$store.commit("".concat(e.op,"Reaction"),{mid:e.message_id,reaction:{emoji_code:e.emoji_code,emoji_name:e.emoji_name,reaction_type:e.reaction_type}});break;default:console.log("Event type unknown",e.type)}}}};n("c0ee");E.render=r;var _=E,C=n("bc3a"),S=n.n(C),k=n("d4cd"),B=n.n(k),F=n("f03e"),y=n.n(F),w=n("6c02");function A(e,t,n,r,u,o){var s=Object(c["resolveComponent"])("Streams"),a=Object(c["resolveComponent"])("pane"),i=Object(c["resolveComponent"])("Content"),l=Object(c["resolveComponent"])("Rules"),p=Object(c["resolveComponent"])("splitpanes");return Object(c["openBlock"])(),Object(c["createBlock"])("div",{class:["pane-wrapper",o.classes]},[e.show_ui?Object(c["createCommentVNode"])("",!0):(Object(c["openBlock"])(),Object(c["createBlock"])("button",{key:0,onClick:t[1]||(t[1]=function(){return o.toggle_ui&&o.toggle_ui.apply(o,arguments)}),class:"float-btn ui"},Object(c["toDisplayString"])(e.show_ui?"Hide":"Show")+" UI ",1)),Object(c["createVNode"])(p,{class:"default-theme"},{default:Object(c["withCtx"])((function(){return[e.show_ui?(Object(c["openBlock"])(),Object(c["createBlock"])(a,{key:0,size:"10","min-size":"5"},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(s),Object(c["createVNode"])("button",{onClick:t[2]||(t[2]=function(){return o.toggle_ui&&o.toggle_ui.apply(o,arguments)})},Object(c["toDisplayString"])(e.show_ui?"Hide":"Show")+" UI",1),Object(c["createVNode"])("button",{onClick:t[3]||(t[3]=function(){return o.print&&o.print.apply(o,arguments)})},"Print")]})),_:1})):Object(c["createCommentVNode"])("",!0),Object(c["createVNode"])(a,{size:"55"},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(i)]})),_:1}),e.show_ui?(Object(c["openBlock"])(),Object(c["createBlock"])(a,{key:1,size:"35","min-size":"15"},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(l)]})),_:1})):Object(c["createCommentVNode"])("",!0)]})),_:1})],2)}var N=Object(c["withScopeId"])("data-v-b5c7b5e8");Object(c["pushScopeId"])("data-v-b5c7b5e8");var V={class:"streams"};Object(c["popScopeId"])();var P=N((function(e,t,n,r,u,o){var s=Object(c["resolveComponent"])("Stream");return Object(c["openBlock"])(),Object(c["createBlock"])("section",V,[(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(e.streams,(function(e){return Object(c["openBlock"])(),Object(c["createBlock"])(s,{key:e.id,stream:e},null,8,["stream"])})),128))])})),I=Object(c["withScopeId"])("data-v-1af39708");Object(c["pushScopeId"])("data-v-1af39708");var M={class:"name"};Object(c["popScopeId"])();var x=I((function(e,t,n,r,u,o){var s=Object(c["resolveComponent"])("router-link");return Object(c["openBlock"])(),Object(c["createBlock"])("div",{class:{selected:o.selected}},[Object(c["createVNode"])("p",M,[Object(c["createVNode"])(s,{to:n.stream.name},{default:I((function(){return[Object(c["createTextVNode"])(Object(c["toDisplayString"])(n.stream.name),1)]})),_:1},8,["to"])])],2)})),T={name:"Stream",props:["stream"],computed:{selected:function(){return this.$store.state.currentStream==this.stream.name}}};n("eebe");T.render=x,T.__scopeId="data-v-1af39708";var R=T,$={name:"Streams",components:{Stream:R},computed:Object(u["a"])({},Object(o["c"])(["streams"]))};n("f021");$.render=P,$.__scopeId="data-v-b5c7b5e8";var z=$,U=Object(c["withScopeId"])("data-v-dc984294");Object(c["pushScopeId"])("data-v-dc984294");var L={class:"title"};Object(c["popScopeId"])();var q=U((function(e,t,n,r,u,o){var s=Object(c["resolveComponent"])("Chapter");return Object(c["openBlock"])(),Object(c["createBlock"])("section",{class:["content",e.currentStream]},[Object(c["createVNode"])("h1",L,Object(c["toDisplayString"])(e.currentStream.replace("pub-","")),1),(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(e.sortedTopics,(function(e){return Object(c["openBlock"])(),Object(c["createBlock"])(s,{key:e.title,topic:e},null,8,["topic"])})),128))],2)})),H=Object(c["withScopeId"])("data-v-0c879992");Object(c["pushScopeId"])("data-v-0c879992");var J={class:"expandToggle"},W={key:0},Z=Object(c["createVNode"])("span",null," ",-1);Object(c["popScopeId"])();var K=H((function(e,t,n,r,u,o){var s=Object(c["resolveComponent"])("Message");return Object(c["openBlock"])(),Object(c["createBlock"])("div",{class:["body",n.topic.title]},[Object(c["createVNode"])("h3",{onClick:t[1]||(t[1]=function(e){return u.desiresContent=!u.desiresContent}),class:"header"},[Object(c["createVNode"])("span",J,Object(c["toDisplayString"])(u.desiresContent?"▼ ":"► "),1),Object(c["createVNode"])("span",null,Object(c["toDisplayString"])(n.topic.title),1)]),u.desiresContent?(Object(c["openBlock"])(),Object(c["createBlock"])("div",W,[(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(n.topic.messages,(function(e){return Object(c["openBlock"])(),Object(c["createBlock"])("span",{key:e.id},[Object(c["createVNode"])(s,{message:e},null,8,["message"]),Z])})),128))])):Object(c["createCommentVNode"])("",!0)],2)})),G={class:"reactions"};function Q(e,t,n,r,u,o){var s=Object(c["resolveComponent"])("vue3-markdown-it");return Object(c["openBlock"])(),Object(c["createBlock"])("span",{class:[o.classes,"message"]},[Object(c["createVNode"])(s,Object(c["mergeProps"])({source:o.content},e.$mdOpts),null,16,["source"]),Object(c["createVNode"])("div",G,[(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(o.reactions,(function(e){return Object(c["openBlock"])(),Object(c["createBlock"])(c["Fragment"],{key:e},[Object(c["createTextVNode"])(Object(c["toDisplayString"])(e),1)],64)})),128))])],2)}n("7db0"),n("159b"),n("a15b");var X=n("edbf"),Y=new X,ee={name:"Message",props:["message"],computed:{rawJSON:function(){return"```json\n"+JSON.stringify(this.message,null,2)+"\n```"},content:function(){var e=this,t=Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_ZULIP_site,n=this.message.content.replace("\n","<br/>");n=n.replaceAll('src="','src="'+t),n=n.replaceAll('href="/','href="'+t+"/");var c=this.$store.state.topics.find((function(t){return t.title==e.message.subject})).messages.filter((function(t){return t.responseTo&&t.responseTo.id==e.message.id&&t.responseTo.sender_id==e.message.sender_id&&e.message.content.includes(t.responseTo.quote)}));return c.forEach((function(e){var t=e.reactions.map((function(e){return"u"+e.emoji_code})).join(" ");n=n.replace(e.responseTo.quote,'<span class="'.concat(t,'">').concat(e.responseTo.quote,"</span>"))})),n},reactions:function(){return this.message.reactions.map((function(e){return Y.replace_colons(":"+e.emoji_name+":")}))},classes:function(){return this.message.reactions.map((function(e){return"u"+e.emoji_code}))}},created:function(){}};n("117b");ee.render=Q;var te=ee,ne={name:"Chapter",components:{Message:te},data:function(){return{desiresContent:!1}},props:["topic"]};n("681e");ne.render=K,ne.__scopeId="data-v-0c879992";var ce=ne,re={name:"Content",components:{Chapter:ce},computed:Object(u["a"])(Object(u["a"])({},Object(o["c"])(["currentStream"])),Object(o["b"])(["sortedTopics"])),methods:{}};n("d9cf");re.render=q,re.__scopeId="data-v-dc984294";var ue=re,oe=Object(c["withScopeId"])("data-v-16b43aee");Object(c["pushScopeId"])("data-v-16b43aee");var se={class:"rules"};Object(c["popScopeId"])();var ae=oe((function(e,t,n,r,u,o){var s=Object(c["resolveComponent"])("Rule");return Object(c["openBlock"])(),Object(c["createBlock"])("section",se,[(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(e.rules,(function(e){return Object(c["openBlock"])(),Object(c["createBlock"])(s,{key:e.id,rule:e},null,8,["rule"])})),128))])})),ie=Object(c["withScopeId"])("data-v-497ad388");Object(c["pushScopeId"])("data-v-497ad388");var le=Object(c["createVNode"])("p",null,"}",-1);Object(c["popScopeId"])();var pe=ie((function(e,t,n,r,u,o){return Object(c["openBlock"])(),Object(c["createBlock"])("div",{class:"rule",style:n.rule.rules},[Object(c["createVNode"])("p",{title:e.toEmojiCode(n.rule.className)},Object(c["toDisplayString"])(n.rule.className)+" {",9,["title"]),(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(n.rule.rules,(function(e){return Object(c["openBlock"])(),Object(c["createBlock"])("p",{key:e},"  "+Object(c["toDisplayString"])(e),1)})),128)),le],4)})),de={name:"Rule",mixins:[h],props:["rule"],computed:{}};n("3d57");de.render=pe,de.__scopeId="data-v-497ad388";var me=de,fe={name:"Rules",components:{Rule:me},computed:Object(u["a"])({},Object(o["c"])(["rules"])),watch:{rules:function(){console.log("rules")}}};n("5476");fe.render=ae,fe.__scopeId="data-v-16b43aee";var be=fe,De=n("512e"),je=(n("c1ea"),n("676e")),Oe={name:"Home",components:{Streams:z,Content:ue,Rules:be,Splitpanes:De["Splitpanes"],Pane:De["Pane"]},data:function(){return{show_ui:!0}},computed:{classes:function(){return this.show_ui?"ui":"print"}},methods:{print:function(){var e=this;this.toggle_ui(null,!1),setTimeout((function(){window.print(),prev&&e.toggle_ui(null,!0)}),1e3);var t=new je["Previewer"];console.log(t)},toggle_ui:function(e,t){this.show_ui=void 0!==t?t:!this.show_ui}}};n("d899");Oe.render=A;var he=Oe,ge="/",ve=Object(w["a"])({history:Object(w["b"])(ge),routes:[{path:"/",name:"Home",component:he},{path:"/:pathMatch(.*)*",name:"Home",component:he}]}),Ee=n("2909"),_e=n("9558"),Ce=(n("a1f0"),n("a630"),n("3ca3"),n("1276"),n("466d"),n("a434"),n("0481"),n("4e82"),n("cd8a")),Se=n("edbf"),ke=new Se,Be=function(e,t){var n="",c="",r=[],u=t,o=e.id,s=Object(_e["a"])(/[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]?(.+)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*\n?\{\n?((.*;\n?)+)\}/gm,{selector:1,props:2}),a=Object(Ce["stripHtml"])(e.content).result,i=a.matchAll(s);return i=Array.from(i),i.length>0?(n=ke.replace_colons(i[0]["groups"]["selector"]),h.methods.containsEmoji(n)&&(c=h.methods.toEmojiCode(n)),r=i[0]["groups"]["props"].split("\n"),r=r.filter((function(e){return Fe(e)})),{className:n,emoji_code:c,rules:r,parentClassName:u,id:o}):null},Fe=function(e){return e.match(/.+:.+;/gm)},ye=function(e){e.responseTo={id:e.content.replace(/.*\/near\//gm,"").replace(/\):.*[^]+/gm,""),sender_id:e.content.replace(/@_\*\*.*\|/gm,"").replace(/\*\*.\[said\].*[^]+/gm,""),quote:e.content.replace(/[^]+.*```quote\n/gm,"").replace(/ \n```/gm,"")}},we=function(e){e.responseTo={id:e.content.replace(/.*\/near\//gm,"").replace(/".*[^]+/gm,""),sender_id:e.content.replace(/[^]+data-user-id="/gm,"").replace(/">[^]+/gm,""),quote:e.content.replace(/.*[^]+<\/p>\n<blockquote>\n<p>/gm,"").replace(/ <\/p>\n<\/blockquote>/gm,"")}},Ae=Object(o["a"])({strict:!1,state:{isMobile:!1,streams:[],currentStream:"",rules:[],topics:[],pubStr:"pub-"},mutations:{setMobile:function(e,t){return e.isMobile=t},setStreams:function(e,t){return e.streams=t},setCurStream:function(e,t){return e.currentStream=t},setTopics:function(e,t){return e.topics=t},addMessage:function(e,t){if(t.display_recipient==e.currentStream){t.content.startsWith("@_**")?ye(t):t.content.includes("user-mention")&&t.content.includes("blockquote")&&we(t);var n=e.topics.find((function(e){return e.title==t.subject}));n?n.messages.push(t):e.topics.push({title:t.subject,messages:[t]})}},deleteMessage:function(e,t){var n=t.mid,c=t.subject,r=e.topics.find((function(e){return e.title==c}));if(r){var u=r.messages.find((function(e){return e.id==n}));u&&r.messages.splice(r.messages.indexOf(u),1)}},addReaction:function(e,t){var n=t.mid,c=t.reaction,r=e.topics.map((function(e){return e.messages})).flat().find((function(e){return e.id==n}));r&&r.reactions.push(c)},removeReaction:function(e,t){var n=t.mid,c=t.reaction,r=e.topics.map((function(e){return e.messages})).flat().find((function(e){return e.id==n}));r&&r.reactions.splice(r.reactions.indexOf(c),1)},setRules:function(e,t){e.rules=t.reduce((function(t,n){var c=Be(n,e.currentStream);return null!==c&&t.push(c),t}),[])},addRule:function(e,t){null!==Be(t)&&(e.rules=[].concat(Object(Ee["a"])(e.rules),[Be(t,e.currentStream)]))},editMessage:function(e,t){var n=t.mid,c=t.content,r=e.topics.map((function(e){return e.messages})).flat().find((function(e){return e.id==n})),u=e.rules.find((function(e){return e.id==n}));if(r)r.content=c,r.content.startsWith("@_**")?ye(r):r.content.includes("user-mention")&&r.content.includes("blockquote")&&we(r);else if(u){var o=[].concat(Object(Ee["a"])(e.rules),[Be({id:n,content:c},e.currentStream)]);e.rules=o}},updateTopic:function(e,t){var n=t.orig_subject,c=t.subject,r=e.topics.find((function(e){return e.title==n}));r&&(r.title=c,r.messages.forEach((function(e){return e.subject=c})))}},actions:{},getters:{rules:function(e){return e.rules},sortedTopics:function(e){return Object(Ee["a"])(e.topics).sort((function(e,t){return e.title.localeCompare(t.title)})).filter((function(e){return e.messages.length>0}))}}}),Ne=(n("85e4"),Object(c["createApp"])(_)),Ve={html:!0,linkify:!0,typographer:!0};Ne.config.globalProperties.$http=S.a,Ne.config.globalProperties.$mdOpts=Ve,Ne.config.globalProperties.$md=new B.a(Ve),Ne.use(y.a).use(ve).use(Ae).mount("#app")},6338:function(e,t,n){},"681e":function(e,t,n){"use strict";n("f240")},a946:function(e,t,n){},c0ee:function(e,t,n){"use strict";n("40a2")},c25a:function(e,t,n){},d899:function(e,t,n){"use strict";n("2bab")},d9cf:function(e,t,n){"use strict";n("e1c4")},e1c4:function(e,t,n){},e915:function(e,t,n){},eebe:function(e,t,n){"use strict";n("6338")},f021:function(e,t,n){"use strict";n("e915")},f240:function(e,t,n){}});
//# sourceMappingURL=app.9dc5e224.js.map