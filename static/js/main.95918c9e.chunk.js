(this.webpackJsonpchess=this.webpackJsonpchess||[]).push([[0],{22:function(e,t,n){},23:function(e,t,n){},27:function(e,t,n){},29:function(e,t,n){},34:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n(12),o=n.n(c),a=(n(22),n(8)),i=n(4),u=n(11),s=n(2),l=(n(23),n(48)),b=n(13),j=n(14),d=n.n(j),f=n(16),O=n(10),h=n.p+"static/media/thump1.5dc21a1c.wav",v=n.p+"static/media/thump2.a452eeaf.wav",p=(n(27),n(1));function g(e){var t=e.importFEN,n=e.importPGN,c=Object(r.useState)(""),o=Object(s.a)(c,2),a=o[0],i=o[1],u=Object(r.useState)(!1),l=Object(s.a)(u,2),b=l[0],j=l[1];return Object(p.jsxs)("div",{children:[Object(p.jsx)("textarea",{placeholder:"Input PGN or FEN notation",rows:"2",cols:"77",value:a,onChange:function(e){return i(e.target.value)}}),b?Object(p.jsx)("p",{className:"error-message",children:"Input is not in valid FEN or PGN notation"}):Object(p.jsx)("br",{}),Object(p.jsx)("button",{onClick:function(){j(!1),t(a)||n(a)||setTimeout((function(){return j(!0)}),200)},children:"Import"})]})}n(29);function m(e){var t=e.history,n=e.selectedMove,r=e.onClickMove,c=function(e){r(e)};return Object(p.jsxs)("div",{className:"box",children:[Object(p.jsx)("h3",{className:"header",children:"Move History"}),Object(p.jsx)("table",{children:Object(p.jsx)("tbody",{children:t.map((function(e,t,r){var o=Math.floor(t/2)+1,a=r.length&&r.length-1;if("b"===e.color){var i=t>=1?r[t-1].san:null,u=e.san,s=null===i?"empty-move":(t-1===n?"selected":"")+" move",l=(t===n?"selected":"")+" move";return Object(p.jsxs)("tr",{children:[Object(p.jsx)("td",{className:"rowTurn",children:o}),Object(p.jsx)("td",{className:s,onClick:function(){return i&&c(t-1)},children:i||"..."}),Object(p.jsx)("td",{className:l,onClick:function(){return u&&c(t)},children:u})]},t)}if("w"===e.color&&t===a){var b=e.san,j="".concat(t===n?"selected":""," move");return Object(p.jsxs)("tr",{children:[Object(p.jsx)("td",{className:"rowTurn",children:o}),Object(p.jsx)("td",{className:j,onClick:function(){return c(t)},children:b}),Object(p.jsx)("td",{})]},t)}}))})})]})}function x(){var e=Object(r.useState)("white"),t=Object(s.a)(e,2),n=t[0],c=t[1],o=Object(r.useState)("start"),j=Object(s.a)(o,2),x=j[0],k=j[1],w=Object(r.useState)([]),S=Object(s.a)(w,2),N=S[0],y=S[1],C=Object(r.useState)(-1),q=Object(s.a)(C,2),P=q[0],E=q[1],M=Object(r.useState)(""),F=Object(s.a)(M,2),I=F[0],R=F[1],A=Object(r.useState)({}),B=Object(s.a)(A,2),G=B[0],D=B[1],K=Object(r.useState)({}),T=Object(s.a)(K,2),H=T[0],J=T[1],Q=Object(r.useState)([]),_=Object(s.a)(Q,2),L=_[0],U=_[1],z=Object(r.useRef)(null);Object(r.useEffect)((function(){z.current=new b}),[]);var V=function(){return P+1===N.length},W=function(e){k(e<0?"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1":N[e].fen),R(""),E(e);var t=e>=0?N[e]:void 0;D(te("",t))},X=function(e){k(z.current.fen());var t=z.current.history({verbose:!0}),n=z.current.fen();Y(t[t.length-1],n),R(""),E(t.length-1),D(te("",e)),ne(e)},Y=function(e,t){y((function(n){return[].concat(Object(u.a)(n),[Object(i.a)(Object(i.a)({},e),{},{fen:t})])}))},Z=function(){"white"===n?c("black"):"black"===n&&c("white")},$=function(e){return z.current.moves({square:e,verbose:!0}).map((function(e){return e.to}))},ee=function(e,t){return Object(i.a)(Object(i.a)({},e),t)},te=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,n={},r=z.current.turn(),c=z.current.get(e);if(c&&r===c.color){n[e]={backgroundColor:"rgba(255, 255, 0, 0.3)"};var o=$(e);o.forEach((function(e){n[e]={background:"radial-gradient(circle, #ffff00 20%, transparent 30%)",borderRadius:"50%"}}))}var a=t;if(a){var i=a.from,u=a.to;n[i]={backgroundColor:"rgba(0, 200, 0, 0.3)"},n[u]={backgroundColor:"rgba(0, 200, 0, 0.3)"}}return n},ne=function(e){null!=e&&(e.flags.includes("c")||e.flags.includes("e")?ae():e.flags.includes("k")||e.flags.includes("q")?(ae(),setTimeout((function(){return ce()}),100)):ce())},re=Object(O.a)(h,{volume:1.5}),ce=Object(s.a)(re,1)[0],oe=Object(O.a)(v,{volume:1.5}),ae=Object(s.a)(oe,1)[0];return Object(p.jsxs)("div",{className:"App",onKeyDown:function(e){"ArrowLeft"===e.key?P>=0&&W(P-1):"ArrowRight"===e.key?P+1<N.length&&W(P+1):"ArrowUp"===e.key||"0"===e.key?W(-1):"ArrowDown"===e.key?W(N.length-1):"f"===e.key&&Z()},tabIndex:"0",children:[Object(p.jsx)("h1",{children:"Chess"}),Object(p.jsxs)(l.a,{container:!0,children:[Object(p.jsxs)("div",{children:[Object(p.jsx)(d.a,{position:x,orientation:n,width:600,onDrop:function(e){var t=e.sourceSquare,n=e.targetSquare;if(V()){var r=z.current.move({from:t,to:n,promotion:"q"});null!==r&&X(r)}},onMouseOverSquare:function(e){},onMouseOutSquare:function(e){},boardStyle:{borderRadius:"5px",boxShadow:"0 5px 15px rgba(0, 0, 0, 0.5)",cursor:"pointer"},squareStyles:G,dropSquareStyle:H,onDragOverSquare:function(e){L.length&&U([]),J("e4"===e||"d4"===e||"e5"===e||"d5"===e?{backgroundColor:"cornFlowerBlue"}:{boxShadow:"inset 0 0 1px 4px rgb(255, 255, 0)"})},onSquareClick:function(e){if(L.length&&U([]),I===e)R(""),D(te(""));else{if(!V())return;var t=z.current.move({from:I,to:e,promotion:"q"});null===t?(R(e),D(te(e))):null!==t&&X(t)}},onSquareRightClick:function(e){var t;L.includes(e)?(t=L.filter((function(t){return t!==e})),U(t)):(t=[].concat(Object(u.a)(L),[e]),U(t)),D(ee(te(""),t.reduce((function(e,t){return Object(i.a)(Object(i.a)({},e),{},Object(a.a)({},t,{backgroundColor:"rgba(205, 92, 92, 0.8)"}))}),{})))}}),Object(p.jsx)("br",{}),Object(p.jsx)(g,{importFEN:function(e){var t=z.current.validate_fen(e).valid;return console.log("Import FEN "+(t?"success":"failed")),t&&(y([]),D({}),z.current.load(e),k(e)),t},importPGN:function(e){var t=z.current.load_pgn(e),n=new f.a(e).history.moves;if(console.log("Import PGN "+(t?"success":"failed")),t){y(n),D({}),k(n[n.length-1].fen),E(n.length-1);var r=n[n.length-1];D(te("",r))}return t}}),Object(p.jsx)("br",{}),Object(p.jsx)("button",{onClick:Z,children:"Flip"})]}),Object(p.jsx)("div",{style:{position:"absolute",left:"1000px"},children:Object(p.jsx)(m,{history:N,selectedMove:P,onClickMove:W})})]}),Object(p.jsx)("footer",{children:Object(p.jsxs)("div",{children:["Built by ",Object(p.jsx)("a",{href:"https://hwkerr.github.io",children:"Harrison Kerr"})]})})]})}o.a.render(Object(p.jsx)(x,{}),document.getElementById("root"))}},[[34,1,2]]]);
//# sourceMappingURL=main.95918c9e.chunk.js.map