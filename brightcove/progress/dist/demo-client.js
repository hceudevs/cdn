!function(e){var r={};function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=r,o.d=function(t,n,e){o.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:e})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(n,t){if(1&t&&(n=o(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var e=Object.create(null);if(o.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var r in n)o.d(e,r,function(t){return n[t]}.bind(null,r));return e},o.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(n,"a",n),n},o.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},o.p="",o(o.s=71)}({0:function(t,n,e){"use strict";e.r(n),e.d(n,"__extends",function(){return o}),e.d(n,"__assign",function(){return u}),e.d(n,"__rest",function(){return i}),e.d(n,"__decorate",function(){return c}),e.d(n,"__param",function(){return a}),e.d(n,"__metadata",function(){return f}),e.d(n,"__awaiter",function(){return l}),e.d(n,"__generator",function(){return s}),e.d(n,"__exportStar",function(){return y}),e.d(n,"__values",function(){return d}),e.d(n,"__read",function(){return p}),e.d(n,"__spread",function(){return _}),e.d(n,"__spreadArrays",function(){return v}),e.d(n,"__await",function(){return b}),e.d(n,"__asyncGenerator",function(){return h}),e.d(n,"__asyncDelegator",function(){return w}),e.d(n,"__asyncValues",function(){return g}),e.d(n,"__makeTemplateObject",function(){return m}),e.d(n,"__importStar",function(){return O}),e.d(n,"__importDefault",function(){return P});
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var r=function(t,n){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])})(t,n)};function o(t,n){function e(){this.constructor=t}r(t,n),t.prototype=null===n?Object.create(n):(e.prototype=n.prototype,new e)}var u=function(){return(u=Object.assign||function(t){for(var n,e=1,r=arguments.length;e<r;e++)for(var o in n=arguments[e])Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o]);return t}).apply(this,arguments)};function i(t,n){var e={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&n.indexOf(r)<0&&(e[r]=t[r]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(t);o<r.length;o++)n.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(t,r[o])&&(e[r[o]]=t[r[o]])}return e}function c(t,n,e,r){var o,u=arguments.length,i=u<3?n:null===r?r=Object.getOwnPropertyDescriptor(n,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,n,e,r);else for(var c=t.length-1;0<=c;c--)(o=t[c])&&(i=(u<3?o(i):3<u?o(n,e,i):o(n,e))||i);return 3<u&&i&&Object.defineProperty(n,e,i),i}function a(e,r){return function(t,n){r(t,n,e)}}function f(t,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,n)}function l(u,i,c,a){return new(c=c||Promise)(function(t,n){function e(t){try{o(a.next(t))}catch(t){n(t)}}function r(t){try{o(a.throw(t))}catch(t){n(t)}}function o(n){n.done?t(n.value):new c(function(t){t(n.value)}).then(e,r)}o((a=a.apply(u,i||[])).next())})}function s(e,r){var o,u,i,t,c={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return t={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(t[Symbol.iterator]=function(){return this}),t;function n(n){return function(t){return function(n){if(o)throw new TypeError("Generator is already executing.");for(;c;)try{if(o=1,u&&(i=2&n[0]?u.return:n[0]?u.throw||((i=u.return)&&i.call(u),0):u.next)&&!(i=i.call(u,n[1])).done)return i;switch(u=0,i&&(n=[2&n[0],i.value]),n[0]){case 0:case 1:i=n;break;case 4:return c.label++,{value:n[1],done:!1};case 5:c.label++,u=n[1],n=[0];continue;case 7:n=c.ops.pop(),c.trys.pop();continue;default:if(!(i=0<(i=c.trys).length&&i[i.length-1])&&(6===n[0]||2===n[0])){c=0;continue}if(3===n[0]&&(!i||n[1]>i[0]&&n[1]<i[3])){c.label=n[1];break}if(6===n[0]&&c.label<i[1]){c.label=i[1],i=n;break}if(i&&c.label<i[2]){c.label=i[2],c.ops.push(n);break}i[2]&&c.ops.pop(),c.trys.pop();continue}n=r.call(e,c)}catch(t){n=[6,t],u=0}finally{o=i=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}([n,t])}}}function y(t,n){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}function d(t){var n="function"==typeof Symbol&&t[Symbol.iterator],e=0;return n?n.call(t):{next:function(){return t&&e>=t.length&&(t=void 0),{value:t&&t[e++],done:!t}}}}function p(t,n){var e="function"==typeof Symbol&&t[Symbol.iterator];if(!e)return t;var r,o,u=e.call(t),i=[];try{for(;(void 0===n||0<n--)&&!(r=u.next()).done;)i.push(r.value)}catch(t){o={error:t}}finally{try{r&&!r.done&&(e=u.return)&&e.call(u)}finally{if(o)throw o.error}}return i}function _(){for(var t=[],n=0;n<arguments.length;n++)t=t.concat(p(arguments[n]));return t}function v(){for(var t=0,n=0,e=arguments.length;n<e;n++)t+=arguments[n].length;var r=Array(t),o=0;for(n=0;n<e;n++)for(var u=arguments[n],i=0,c=u.length;i<c;i++,o++)r[o]=u[i];return r}function b(t){return this instanceof b?(this.v=t,this):new b(t)}function h(t,n,e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var o,u=e.apply(t,n||[]),i=[];return o={},r("next"),r("throw"),r("return"),o[Symbol.asyncIterator]=function(){return this},o;function r(r){u[r]&&(o[r]=function(e){return new Promise(function(t,n){1<i.push([r,e,t,n])||c(r,e)})})}function c(t,n){try{(e=u[t](n)).value instanceof b?Promise.resolve(e.value.v).then(a,f):l(i[0][2],e)}catch(t){l(i[0][3],t)}var e}function a(t){c("next",t)}function f(t){c("throw",t)}function l(t,n){t(n),i.shift(),i.length&&c(i[0][0],i[0][1])}}function w(r){var t,o;return t={},n("next"),n("throw",function(t){throw t}),n("return"),t[Symbol.iterator]=function(){return this},t;function n(n,e){t[n]=r[n]?function(t){return(o=!o)?{value:b(r[n](t)),done:"return"===n}:e?e(t):t}:e}}function g(a){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t,n=a[Symbol.asyncIterator];return n?n.call(a):(a=d(a),t={},e("next"),e("throw"),e("return"),t[Symbol.asyncIterator]=function(){return this},t);function e(c){t[c]=a[c]&&function(i){return new Promise(function(t,n){var e,r,o,u;i=a[c](i),e=t,r=n,o=i.done,u=i.value,Promise.resolve(u).then(function(t){e({value:t,done:o})},r)})}}}function m(t,n){return Object.defineProperty?Object.defineProperty(t,"raw",{value:n}):t.raw=n,t}function O(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var e in t)Object.hasOwnProperty.call(t,e)&&(n[e]=t[e]);return n.default=t,n}function P(t){return t&&t.__esModule?t:{default:t}}},71:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=e(0),o=0,u={getProgress:function(){return r.__awaiter(this,void 0,void 0,function(){return r.__generator(this,function(t){return console.log("Getting Progress",o),[2,o]})})},setProgress:function(n){return r.__awaiter(this,void 0,void 0,function(){return r.__generator(this,function(t){return o=n,console.log("Setting Progress",n),[2]})})}};document.addEventListener("DOMContentLoaded",function(){var t=document.querySelector("iframe");console.log(t);new ProgressPluginClient(t?t.contentWindow:window,u)})}});