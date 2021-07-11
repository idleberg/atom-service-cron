var k=Object.create;var l=Object.defineProperty;var x=Object.getOwnPropertyDescriptor;var _=Object.getOwnPropertyNames;var C=Object.getPrototypeOf,j=Object.prototype.hasOwnProperty;var d=t=>l(t,"__esModule",{value:!0});var D=(t,o)=>{d(t);for(var e in o)l(t,e,{get:o[e],enumerable:!0})},A=(t,o,e)=>{if(o&&typeof o=="object"||typeof o=="function")for(let r of _(o))!j.call(t,r)&&r!=="default"&&l(t,r,{get:()=>o[r],enumerable:!(e=x(o,r))||e.enumerable});return t},g=t=>A(d(l(t!=null?k(C(t)):{},"default",t&&t.__esModule&&"default"in t?{get:()=>t.default,enumerable:!0}:{value:t,enumerable:!0})),t);D(exports,{default:()=>S});var b=g(require("atom"));var h=g(require("path"));var u="service-cron";function a(t,o){for(var e=0,r=o.length,n=t.length;e<r;e++,n++)t[n]=o[e];return t}var E=function(){function t(o){o===void 0&&(o={}),this.name=o.name,this.styleSheet=`
      background-color: `+(o.backgroundColor||"darkgrey")+`;
      border-radius: 2px;
      color: `+(o.color||"white")+`;
      line-height: 1.5;
      padding: 1px 4px;
      text-shadow: 0 1px 0px rgba(0, 0, 0, 0.2);
    `}return t.prototype.__console__=function(o){for(var e,r=[],n=1;n<arguments.length;n++)r[n-1]=arguments[n];!(atom==null?void 0:atom.inDevMode())||(r.unshift("%c"+this.name+"%c",this.styleSheet,""),(e=window.console)[o].apply(e,r))},t.prototype.debug=function(){for(var o=[],e=0;e<arguments.length;e++)o[e]=arguments[e];this.__console__.apply(this,a(["debug"],o))},t.prototype.error=function(){for(var o=[],e=0;e<arguments.length;e++)o[e]=arguments[e];this.__console__.apply(this,a(["error"],o))},t.prototype.info=function(){for(var o=[],e=0;e<arguments.length;e++)o[e]=arguments[e];this.__console__.apply(this,a(["info"],o))},t.prototype.log=function(){for(var o=[],e=0;e<arguments.length;e++)o[e]=arguments[e];this.__console__.apply(this,a(["log"],o))},t.prototype.trace=function(){for(var o=[],e=0;e<arguments.length;e++)o[e]=arguments[e];this.__console__.apply(this,a(["trace"],o))},t.prototype.warn=function(){for(var o=[],e=0;e<arguments.length;e++)o[e]=arguments[e];this.__console__.apply(this,a(["warn"],o))},t}(),v=E;var s=new v({name:u,backgroundColor:"black",color:"paleturquoise"});var f=new Worker((0,h.resolve)(__dirname,"cron.worker.js"));function M(t){return new Promise((o,e)=>{let r={view:"atom-workspace",...t};s.log("Registering cronjob",r),f.postMessage(r),f.onmessage=async n=>{let{commands:p,view:c}=n.data,m;switch(c){case"atom-workspace":m=atom.views.getView(atom.workspace);break;case"atom-text-editor":m=atom.views.getView(atom.workspace.getActiveTextEditor());break;default:throw Error(`Cannot dispatch commands to unsupported view ${c}`)}let w=Array.isArray(p)?p:[p];try{w.map(i=>{s.log("Dispatching command",{command:i,view:c}),atom.commands.dispatch(m,i)})}catch(i){e(i)}o(!0)}})}var y=M;var S={subscriptions:new b.CompositeDisposable,activate(){s.log("Activating package")},deactivate(){s.log("Deactivating package"),this.subscriptions?.dispose()},provideCron(){return s.log("Providing service"),y}};0&&(module.exports={});
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
//# sourceMappingURL=main.js.map
