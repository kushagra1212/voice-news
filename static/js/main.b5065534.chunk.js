(this["webpackJsonpvoice-news"]=this["webpackJsonpvoice-news"]||[]).push([[0],{19:function(e,t,n){e.exports={maindiv:"Newscards_maindiv__2_QMB"}},2:function(e,t,n){e.exports={main:"Home_main__4gFUv",cont:"Home_cont__2jD3p",container:"Home_container__17iBJ",header:"Home_header__2yBOn",label:"Home_label__8FhBh"}},26:function(e,t,n){},45:function(e,t,n){"use strict";n.r(t);var s=n(0),c=n(1),a=n.n(c),i=n(17),o=n.n(i),r=(n(26),n(8)),d=n.n(r),l=n(18),h=n(4),u=n(5),b=n.n(u),j=n(6),p=n.n(j),O=function(e){var t=e.article,n=e.count,a=e.i,i=t.description,o=t.url,r=t.publishedAt,d=t.source,l=t.title,h=t.image,u=Object(c.useRef)(null);return Object(c.useEffect)((function(){u.current&&n===a&&u.current.scrollIntoView({behavior:"smooth"})})),Object(s.jsx)(s.Fragment,{children:Object(s.jsxs)("div",{className:p.a.mydiv,ref:u,style:n===a?{borderBottomWidth:"5px",borderBottomColor:"blue"}:{},children:[Object(s.jsx)("div",{className:p.a.imgdiv,children:Object(s.jsx)("img",{src:h,width:"100%",height:"100%",alt:"../news.png"})}),Object(s.jsx)("div",{className:p.a.carddiv,children:Object(s.jsx)("strong",{children:l})}),Object(s.jsxs)("div",{className:p.a.sourcedate,children:[" ",new Date(r).toDateString(),Object(s.jsx)(s.Fragment,{}),"  source :",d.name]}),Object(s.jsx)("div",{className:p.a.description,children:i}),Object(s.jsx)("button",{className:p.a.read,children:Object(s.jsx)("a",{href:o,children:"Read more"})})]})})},f=n(19),m=n.n(f),x=function(e){var t=e.articles,n=e.count;return Object(s.jsx)("div",{className:m.a.maindiv,children:t.map((function(e,t){return Object(s.jsx)("div",{children:Object(s.jsx)(O,{article:e,count:n,i:t})},t)}))})},v=n(20),w=n.n(v).a.create({baseURL:"https://gnews.io/api/v4"}),g=n(2),S=n.n(g),_=function(){return Object(s.jsx)("div",{className:S.a.main,children:Object(s.jsxs)("div",{className:S.a.cont,children:[Object(s.jsxs)("div",{className:S.a.container,style:{backgroundColor:"lightblue"},children:[Object(s.jsx)("div",{className:S.a.header,children:"TOP NEWS"}),Object(s.jsxs)("div",{className:S.a.label,children:["Show me top news",Object(s.jsx)("br",{}),"Show me top news from india"]})]}),Object(s.jsxs)("div",{className:S.a.container,style:{backgroundColor:"lightpink"},children:[Object(s.jsx)("div",{className:S.a.header,children:"NEWS BY CATEGORY"}),Object(s.jsxs)("div",{className:S.a.label,children:["Show me sports news",Object(s.jsx)("br",{}),"Show me business news",Object(s.jsx)("br",{}),"other categories",Object(s.jsx)("br",{}),'business" "entertainment" "world" "health" "science" "sports" "technology"']})]}),Object(s.jsxs)("div",{className:S.a.container,style:{backgroundColor:"orange"},children:[Object(s.jsx)("div",{className:S.a.header,children:"SEARCH ANYTHING"}),Object(s.jsxs)("div",{className:S.a.label,children:["Give me bitcoin news",Object(s.jsx)("br",{}),"Give me Covid-19 News"]})]}),Object(s.jsxs)("div",{className:S.a.container,style:{backgroundColor:"white"},children:[Object(s.jsx)("div",{className:S.a.header,children:"RETURN COMMANDS"}),Object(s.jsxs)("div",{className:S.a.label,children:["return home ",Object(s.jsx)("br",{}),"go back"]})]})]})})},N=new(window.SpeechRecognition||window.webkitSpeechRecognition);N.lang="en-IN";var y=!0;N.onstart=function(){console.log("listening your voice"),y=!1};var k="803bffcdf109a9cc8e6c7c7ba4f70a8e",E=function(){var e=Object(c.useState)(""),t=Object(h.a)(e,2),n=t[0],a=t[1],i=Object(c.useState)([]),o=Object(h.a)(i,2),r=o[0],u=o[1],j=Object(c.useState)(""),p=Object(h.a)(j,2),O=p[0],f=p[1],m=Object(c.useState)(""),v=Object(h.a)(m,2),g=v[0],S=v[1],E=Object(c.useState)(""),A=Object(h.a)(E,2),C=A[0],H=A[1],I=Object(c.useState)({notunderstand:!1,home:!0}),R=Object(h.a)(I,2),U=R[0],B=R[1],T=Object(c.useState)(["can you speak that again ?","Sorry I did not understand","can you repeat that "]),M=Object(h.a)(T,1)[0],D=Object(c.useState)(""),Y=Object(h.a)(D,2),F=Y[0],G=Y[1],J=Object(c.useState)(""),Q=Object(h.a)(J,2),W=Q[0],z=Q[1],L=Object(c.useState)(!1),q=Object(h.a)(L,2),K=q[0],P=q[1],V=Object(c.useState)(-1),Z=Object(h.a)(V,2),X=Z[0],$=Z[1],ee=Object(c.useState)(!1),te=Object(h.a)(ee,2),ne=te[0],se=te[1];Object(c.useEffect)((function(){var e=new SpeechSynthesisUtterance("Here it is ");n.length>1&&w.get("/search?q=".concat(n,"&token=").concat(k)).then((function(t){u(t.data.articles),window.speechSynthesis.speak(e),e=new SpeechSynthesisUtterance("would you like me to read that ?"),window.speechSynthesis.speak(e),e.onstart=function(){setTimeout((function(){N.start()}),1e3)},P(!0),a("")})).catch((function(e){return console.log(e)}))}),[n]),Object(c.useEffect)((function(){if(g.length>1){var e=new SpeechSynthesisUtterance("Here it is ");w.get("/".concat(g,"?").concat(C.length>1?"&topic=".concat(C):"&topic=breaking-news","&lang=").concat(W).concat(O.length>1?"&country=".concat(O):"&country=us","&token=").concat(k)).then((function(t){u(t.data.articles),window.speechSynthesis.speak(e),e=new SpeechSynthesisUtterance("would you like me to read that ?"),window.speechSynthesis.speak(e),e.onstart=function(){setTimeout((function(){N.start()}),1e3)},P(!0),S("")})).catch((function(e){return console.log(e)}))}}),[g,C,W,O]),Object(c.useEffect)((function(){if(U.notunderstand){console.log("did not understand");var e=new SpeechSynthesisUtterance(M[Math.floor(3*Math.random())]);window.speechSynthesis.speak(e)}}),[U]),Object(c.useEffect)((function(){if(ne)for(var e=function(e){if(ne){var t=new SpeechSynthesisUtterance(r[e].title);t.onstart=function(){console.log("started"),$(e)},window.speechSynthesis.speak(t)}},t=0;t<r.length;t++)e(t)}),[ne]);Object(c.useEffect)((function(){N.onresult=function(e){var t=e.resultIndex;console.log(e.results[t][0].transcript),console.log(F),-1!==e.results[t][0].transcript.indexOf("yes")?(console.log("can"),B({notunderstand:!1,home:!1}),a(""),H(""),S(""),G(e.results[t][0].transcript),se(!0)):e.results[t][0].transcript!==F&&function(e){var t=e.resultIndex;G(e.results[t][0].transcript);var n=e.results[t][0].transcript,s=e.results[t][0].transcript.split(" ");if(console.log(s),-1!==n.indexOf("top")){console.log("from top");var c=s[s.length-1];"India"===c&&f("in"),"Tamil"===c&&f("ta"),H(""),B({notunderstand:!1,home:!1}),a(""),S("top-headlines")}else if(-1!==n.indexOf("India")){for(var i in console.log("from india"),["business","entertainment","world","health","science","sports","technology"])if(n.search(i)){H(i);break}n.search("Hindi")&&z("hi"),n.search("Tamil")&&z("ta"),f("in"),B({notunderstand:!1,home:!1}),a(""),S("top-headlines")}else if(-1!==n.indexOf("news")&&-1===n.indexOf("India")&&-1===n.indexOf("Hindi")){var o="";console.log("from news"),-1!==n.indexOf("business")||-1!==n.indexOf("entertainment")||-1!==n.indexOf("world")||-1!==n.indexOf("health")||-1!==n.indexOf("science")||-1!==n.indexOf("sports")||-1!==n.indexOf("technology")?(o=s[s.length-2],console.log(o),H(o),f(""),B({notunderstand:!1,home:!1}),a(""),S("top-headlines")):(o=s[s.length-2],console.log(o),H(""),f(""),B({notunderstand:!1,home:!1}),S(""),a(o))}else-1!==n.indexOf("return home")||-1!==F.indexOf("go back")?(H(""),S(""),a(""),B({notunderstand:!1,home:!0})):(B({notunderstand:!0,home:!1}),a(""),H(""),S(""))}(e)}})),Object(c.useState)((function(){N.onend=function(){P(!1),y=!0}}));var ce=function(){var e=Object(l.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:se(!1);case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(s.jsxs)("div",{className:b.a.App,children:[Object(s.jsx)("button",{disabled:K,className:K?b.a.speakclick:b.a.speak,onClick:function(){var e=new SpeechSynthesisUtterance("listening");window.speechSynthesis.speak(e),P(!0),y&&N.start(),$(-1)},children:"Say"}),U.home?null:Object(s.jsxs)("div",{className:b.a.textdiv,children:[" ",Object(s.jsx)("h3",{children:F})," "]}),U.home?Object(s.jsx)(_,{}):Object(s.jsx)(x,{className:b.a.newscards,count:X,articles:r}),Object(s.jsx)("button",{className:b.a.stop,onClick:ce,style:{display:ne?"block":"none"},children:"Stop"})]})};o.a.render(Object(s.jsx)(a.a.StrictMode,{children:Object(s.jsx)(E,{})}),document.getElementById("root"))},5:function(e,t,n){e.exports={textdiv:"App_textdiv__3zcL3",speak:"App_speak__3R_2m",speakclick:"App_speakclick__1QtfQ",butani:"App_butani__1uYEZ",stop:"App_stop__1etuN"}},6:function(e,t,n){e.exports={sourcedate:"Newscard_sourcedate__noYgK",mydiv:"Newscard_mydiv__xeeDu",carddiv:"Newscard_carddiv__32Igl",description:"Newscard_description__15z8S",read:"Newscard_read__snhbE"}}},[[45,1,2]]]);
//# sourceMappingURL=main.b5065534.chunk.js.map