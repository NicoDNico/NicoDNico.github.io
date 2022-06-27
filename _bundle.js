/*! For license information please see _bundle.js.LICENSE.txt */
(()=>{var e={460:function(e,t){var n,r;n=function e(){"use strict";var t="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==t?t:{},n=!t.document&&!!t.postMessage,r=n&&/blob:/i.test((t.location||{}).protocol),i={},s=0,a={parse:function(n,r){var o=(r=r||{}).dynamicTyping||!1;if(k(o)&&(r.dynamicTypingFunction=o,o={}),r.dynamicTyping=o,r.transform=!!k(r.transform)&&r.transform,r.worker&&a.WORKERS_SUPPORTED){var l=function(){if(!a.WORKERS_SUPPORTED)return!1;var n,r,o=(n=t.URL||t.webkitURL||null,r=e.toString(),a.BLOB_URL||(a.BLOB_URL=n.createObjectURL(new Blob(["(",r,")();"],{type:"text/javascript"})))),l=new t.Worker(o);return l.onmessage=m,l.id=s++,i[l.id]=l}();return l.userStep=r.step,l.userChunk=r.chunk,l.userComplete=r.complete,l.userError=r.error,r.step=k(r.step),r.chunk=k(r.chunk),r.complete=k(r.complete),r.error=k(r.error),delete r.worker,void l.postMessage({input:n,config:r,workerId:l.id})}var f=null;return a.NODE_STREAM_INPUT,"string"==typeof n?f=r.download?new d(r):new h(r):!0===n.readable&&k(n.read)&&k(n.on)?f=new c(r):(t.File&&n instanceof File||n instanceof Object)&&(f=new u(r)),f.stream(n)},unparse:function(e,t){var n=!1,r=!0,i=",",s="\r\n",o='"',l=o+o,d=!1,u=null,h=!1;!function(){if("object"==typeof t){if("string"!=typeof t.delimiter||a.BAD_DELIMITERS.filter((function(e){return-1!==t.delimiter.indexOf(e)})).length||(i=t.delimiter),("boolean"==typeof t.quotes||"function"==typeof t.quotes||Array.isArray(t.quotes))&&(n=t.quotes),"boolean"!=typeof t.skipEmptyLines&&"string"!=typeof t.skipEmptyLines||(d=t.skipEmptyLines),"string"==typeof t.newline&&(s=t.newline),"string"==typeof t.quoteChar&&(o=t.quoteChar),"boolean"==typeof t.header&&(r=t.header),Array.isArray(t.columns)){if(0===t.columns.length)throw new Error("Option columns is empty");u=t.columns}void 0!==t.escapeChar&&(l=t.escapeChar+o),("boolean"==typeof t.escapeFormulae||t.escapeFormulae instanceof RegExp)&&(h=t.escapeFormulae instanceof RegExp?t.escapeFormulae:/^[=+\-@\t\r].*$/)}}();var c=new RegExp(p(o),"g");if("string"==typeof e&&(e=JSON.parse(e)),Array.isArray(e)){if(!e.length||Array.isArray(e[0]))return f(null,e,d);if("object"==typeof e[0])return f(u||Object.keys(e[0]),e,d)}else if("object"==typeof e)return"string"==typeof e.data&&(e.data=JSON.parse(e.data)),Array.isArray(e.data)&&(e.fields||(e.fields=e.meta&&e.meta.fields||u),e.fields||(e.fields=Array.isArray(e.data[0])?e.fields:"object"==typeof e.data[0]?Object.keys(e.data[0]):[]),Array.isArray(e.data[0])||"object"==typeof e.data[0]||(e.data=[e.data])),f(e.fields||[],e.data||[],d);throw new Error("Unable to serialize unrecognized input");function f(e,t,n){var a="";"string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t));var o=Array.isArray(e)&&0<e.length,l=!Array.isArray(t[0]);if(o&&r){for(var d=0;d<e.length;d++)0<d&&(a+=i),a+=g(e[d],d);0<t.length&&(a+=s)}for(var u=0;u<t.length;u++){var h=o?e.length:t[u].length,c=!1,f=o?0===Object.keys(t[u]).length:0===t[u].length;if(n&&!o&&(c="greedy"===n?""===t[u].join("").trim():1===t[u].length&&0===t[u][0].length),"greedy"===n&&o){for(var p=[],m=0;m<h;m++){var _=l?e[m]:m;p.push(t[u][_])}c=""===p.join("").trim()}if(!c){for(var y=0;y<h;y++){0<y&&!f&&(a+=i);var v=o&&l?e[y]:y;a+=g(t[u][v],y)}u<t.length-1&&(!n||0<h&&!f)&&(a+=s)}}return a}function g(e,t){if(null==e)return"";if(e.constructor===Date)return JSON.stringify(e).slice(1,25);var r=!1;h&&"string"==typeof e&&h.test(e)&&(e="'"+e,r=!0);var s=e.toString().replace(c,l);return(r=r||!0===n||"function"==typeof n&&n(e,t)||Array.isArray(n)&&n[t]||function(e,t){for(var n=0;n<t.length;n++)if(-1<e.indexOf(t[n]))return!0;return!1}(s,a.BAD_DELIMITERS)||-1<s.indexOf(i)||" "===s.charAt(0)||" "===s.charAt(s.length-1))?o+s+o:s}}};if(a.RECORD_SEP=String.fromCharCode(30),a.UNIT_SEP=String.fromCharCode(31),a.BYTE_ORDER_MARK="\ufeff",a.BAD_DELIMITERS=["\r","\n",'"',a.BYTE_ORDER_MARK],a.WORKERS_SUPPORTED=!n&&!!t.Worker,a.NODE_STREAM_INPUT=1,a.LocalChunkSize=10485760,a.RemoteChunkSize=5242880,a.DefaultDelimiter=",",a.Parser=g,a.ParserHandle=f,a.NetworkStreamer=d,a.FileStreamer=u,a.StringStreamer=h,a.ReadableStreamStreamer=c,t.jQuery){var o=t.jQuery;o.fn.parse=function(e){var n=e.config||{},r=[];return this.each((function(e){if("INPUT"!==o(this).prop("tagName").toUpperCase()||"file"!==o(this).attr("type").toLowerCase()||!t.FileReader||!this.files||0===this.files.length)return!0;for(var i=0;i<this.files.length;i++)r.push({file:this.files[i],inputElem:this,instanceConfig:o.extend({},n)})})),i(),this;function i(){if(0!==r.length){var t,n,i,l=r[0];if(k(e.before)){var d=e.before(l.file,l.inputElem);if("object"==typeof d){if("abort"===d.action)return"AbortError",t=l.file,n=l.inputElem,i=d.reason,void(k(e.error)&&e.error({name:"AbortError"},t,n,i));if("skip"===d.action)return void s();"object"==typeof d.config&&(l.instanceConfig=o.extend(l.instanceConfig,d.config))}else if("skip"===d)return void s()}var u=l.instanceConfig.complete;l.instanceConfig.complete=function(e){k(u)&&u(e,l.file,l.inputElem),s()},a.parse(l.file,l.instanceConfig)}else k(e.complete)&&e.complete()}function s(){r.splice(0,1),i()}}}function l(e){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(e){var t=v(e);t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null),this._handle=new f(t),(this._handle.streamer=this)._config=t}.call(this,e),this.parseChunk=function(e,n){if(this.isFirstChunk&&k(this._config.beforeFirstChunk)){var i=this._config.beforeFirstChunk(e);void 0!==i&&(e=i)}this.isFirstChunk=!1,this._halted=!1;var s=this._partialLine+e;this._partialLine="";var o=this._handle.parse(s,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var l=o.meta.cursor;this._finished||(this._partialLine=s.substring(l-this._baseIndex),this._baseIndex=l),o&&o.data&&(this._rowCount+=o.data.length);var d=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(r)t.postMessage({results:o,workerId:a.WORKER_ID,finished:d});else if(k(this._config.chunk)&&!n){if(this._config.chunk(o,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);o=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(o.data),this._completeResults.errors=this._completeResults.errors.concat(o.errors),this._completeResults.meta=o.meta),this._completed||!d||!k(this._config.complete)||o&&o.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),d||o&&o.meta.paused||this._nextChunk(),o}this._halted=!0},this._sendError=function(e){k(this._config.error)?this._config.error(e):r&&this._config.error&&t.postMessage({workerId:a.WORKER_ID,error:e,finished:!1})}}function d(e){var t;(e=e||{}).chunkSize||(e.chunkSize=a.RemoteChunkSize),l.call(this,e),this._nextChunk=n?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(e){this._input=e,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(t=new XMLHttpRequest,this._config.withCredentials&&(t.withCredentials=this._config.withCredentials),n||(t.onload=E(this._chunkLoaded,this),t.onerror=E(this._chunkError,this)),t.open(this._config.downloadRequestBody?"POST":"GET",this._input,!n),this._config.downloadRequestHeaders){var e=this._config.downloadRequestHeaders;for(var r in e)t.setRequestHeader(r,e[r])}if(this._config.chunkSize){var i=this._start+this._config.chunkSize-1;t.setRequestHeader("Range","bytes="+this._start+"-"+i)}try{t.send(this._config.downloadRequestBody)}catch(e){this._chunkError(e.message)}n&&0===t.status&&this._chunkError()}},this._chunkLoaded=function(){4===t.readyState&&(t.status<200||400<=t.status?this._chunkError():(this._start+=this._config.chunkSize?this._config.chunkSize:t.responseText.length,this._finished=!this._config.chunkSize||this._start>=function(e){var t=e.getResponseHeader("Content-Range");return null===t?-1:parseInt(t.substring(t.lastIndexOf("/")+1))}(t),this.parseChunk(t.responseText)))},this._chunkError=function(e){var n=t.statusText||e;this._sendError(new Error(n))}}function u(e){var t,n;(e=e||{}).chunkSize||(e.chunkSize=a.LocalChunkSize),l.call(this,e);var r="undefined"!=typeof FileReader;this.stream=function(e){this._input=e,n=e.slice||e.webkitSlice||e.mozSlice,r?((t=new FileReader).onload=E(this._chunkLoaded,this),t.onerror=E(this._chunkError,this)):t=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var e=this._input;if(this._config.chunkSize){var i=Math.min(this._start+this._config.chunkSize,this._input.size);e=n.call(e,this._start,i)}var s=t.readAsText(e,this._config.encoding);r||this._chunkLoaded({target:{result:s}})},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result)},this._chunkError=function(){this._sendError(t.error)}}function h(e){var t;l.call(this,e=e||{}),this.stream=function(e){return t=e,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var e,n=this._config.chunkSize;return n?(e=t.substring(0,n),t=t.substring(n)):(e=t,t=""),this._finished=!t,this.parseChunk(e)}}}function c(e){l.call(this,e=e||{});var t=[],n=!0,r=!1;this.pause=function(){l.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){l.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(e){this._input=e,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){r&&1===t.length&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),t.length?this.parseChunk(t.shift()):n=!0},this._streamData=E((function(e){try{t.push("string"==typeof e?e:e.toString(this._config.encoding)),n&&(n=!1,this._checkIsFinished(),this.parseChunk(t.shift()))}catch(e){this._streamError(e)}}),this),this._streamError=E((function(e){this._streamCleanUp(),this._sendError(e)}),this),this._streamEnd=E((function(){this._streamCleanUp(),r=!0,this._streamData("")}),this),this._streamCleanUp=E((function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)}),this)}function f(e){var t,n,r,i=Math.pow(2,53),s=-i,o=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,l=/^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$/,d=this,u=0,h=0,c=!1,f=!1,m=[],_={data:[],errors:[],meta:{}};if(k(e.step)){var y=e.step;e.step=function(t){if(_=t,b())w();else{if(w(),0===_.data.length)return;u+=t.data.length,e.preview&&u>e.preview?n.abort():(_.data=_.data[0],y(_,d))}}}function E(t){return"greedy"===e.skipEmptyLines?""===t.join("").trim():1===t.length&&0===t[0].length}function w(){return _&&r&&(R("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+a.DefaultDelimiter+"'"),r=!1),e.skipEmptyLines&&(_.data=_.data.filter((function(e){return!E(e)}))),b()&&function(){if(_)if(Array.isArray(_.data[0])){for(var t=0;b()&&t<_.data.length;t++)_.data[t].forEach(n);_.data.splice(0,1)}else _.data.forEach(n);function n(t,n){k(e.transformHeader)&&(t=e.transformHeader(t,n)),m.push(t)}}(),function(){if(!_||!e.header&&!e.dynamicTyping&&!e.transform)return _;function t(t,n){var r,i=e.header?{}:[];for(r=0;r<t.length;r++){var s=r,a=t[r];e.header&&(s=r>=m.length?"__parsed_extra":m[r]),e.transform&&(a=e.transform(a,s)),a=C(s,a),"__parsed_extra"===s?(i[s]=i[s]||[],i[s].push(a)):i[s]=a}return e.header&&(r>m.length?R("FieldMismatch","TooManyFields","Too many fields: expected "+m.length+" fields but parsed "+r,h+n):r<m.length&&R("FieldMismatch","TooFewFields","Too few fields: expected "+m.length+" fields but parsed "+r,h+n)),i}var n=1;return!_.data.length||Array.isArray(_.data[0])?(_.data=_.data.map(t),n=_.data.length):_.data=t(_.data,0),e.header&&_.meta&&(_.meta.fields=m),h+=n,_}()}function b(){return e.header&&0===m.length}function C(t,n){return r=t,e.dynamicTypingFunction&&void 0===e.dynamicTyping[r]&&(e.dynamicTyping[r]=e.dynamicTypingFunction(r)),!0===(e.dynamicTyping[r]||e.dynamicTyping)?"true"===n||"TRUE"===n||"false"!==n&&"FALSE"!==n&&(function(e){if(o.test(e)){var t=parseFloat(e);if(s<t&&t<i)return!0}return!1}(n)?parseFloat(n):l.test(n)?new Date(n):""===n?null:n):n;var r}function R(e,t,n,r){var i={type:e,code:t,message:n};void 0!==r&&(i.row=r),_.errors.push(i)}this.parse=function(i,s,o){var l=e.quoteChar||'"';if(e.newline||(e.newline=function(e,t){e=e.substring(0,1048576);var n=new RegExp(p(t)+"([^]*?)"+p(t),"gm"),r=(e=e.replace(n,"")).split("\r"),i=e.split("\n"),s=1<i.length&&i[0].length<r[0].length;if(1===r.length||s)return"\n";for(var a=0,o=0;o<r.length;o++)"\n"===r[o][0]&&a++;return a>=r.length/2?"\r\n":"\r"}(i,l)),r=!1,e.delimiter)k(e.delimiter)&&(e.delimiter=e.delimiter(i),_.meta.delimiter=e.delimiter);else{var d=function(t,n,r,i,s){var o,l,d,u;s=s||[",","\t","|",";",a.RECORD_SEP,a.UNIT_SEP];for(var h=0;h<s.length;h++){var c=s[h],f=0,p=0,m=0;d=void 0;for(var _=new g({comments:i,delimiter:c,newline:n,preview:10}).parse(t),y=0;y<_.data.length;y++)if(r&&E(_.data[y]))m++;else{var v=_.data[y].length;p+=v,void 0!==d?0<v&&(f+=Math.abs(v-d),d=v):d=v}0<_.data.length&&(p/=_.data.length-m),(void 0===l||f<=l)&&(void 0===u||u<p)&&1.99<p&&(l=f,o=c,u=p)}return{successful:!!(e.delimiter=o),bestDelimiter:o}}(i,e.newline,e.skipEmptyLines,e.comments,e.delimitersToGuess);d.successful?e.delimiter=d.bestDelimiter:(r=!0,e.delimiter=a.DefaultDelimiter),_.meta.delimiter=e.delimiter}var u=v(e);return e.preview&&e.header&&u.preview++,t=i,n=new g(u),_=n.parse(t,s,o),w(),c?{meta:{paused:!0}}:_||{meta:{paused:!1}}},this.paused=function(){return c},this.pause=function(){c=!0,n.abort(),t=k(e.chunk)?"":t.substring(n.getCharIndex())},this.resume=function(){d.streamer._halted?(c=!1,d.streamer.parseChunk(t,!0)):setTimeout(d.resume,3)},this.aborted=function(){return f},this.abort=function(){f=!0,n.abort(),_.meta.aborted=!0,k(e.complete)&&e.complete(_),t=""}}function p(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function g(e){var t,n=(e=e||{}).delimiter,r=e.newline,i=e.comments,s=e.step,o=e.preview,l=e.fastMode,d=t=void 0===e.quoteChar||null===e.quoteChar?'"':e.quoteChar;if(void 0!==e.escapeChar&&(d=e.escapeChar),("string"!=typeof n||-1<a.BAD_DELIMITERS.indexOf(n))&&(n=","),i===n)throw new Error("Comment character same as delimiter");!0===i?i="#":("string"!=typeof i||-1<a.BAD_DELIMITERS.indexOf(i))&&(i=!1),"\n"!==r&&"\r"!==r&&"\r\n"!==r&&(r="\n");var u=0,h=!1;this.parse=function(e,a,c){if("string"!=typeof e)throw new Error("Input must be a string");var f=e.length,g=n.length,m=r.length,_=i.length,y=k(s),v=[],E=[],w=[],b=u=0;if(!e)return B();if(l||!1!==l&&-1===e.indexOf(t)){for(var C=e.split(r),R=0;R<C.length;R++){if(w=C[R],u+=w.length,R!==C.length-1)u+=r.length;else if(c)return B();if(!i||w.substring(0,_)!==i){if(y){if(v=[],D(w.split(n)),M(),h)return B()}else D(w.split(n));if(o&&o<=R)return v=v.slice(0,o),B(!0)}}return B()}for(var O=e.indexOf(n,u),x=e.indexOf(r,u),S=new RegExp(p(d)+p(t),"g"),I=e.indexOf(t,u);;)if(e[u]!==t)if(i&&0===w.length&&e.substring(u,u+_)===i){if(-1===x)return B();u=x+m,x=e.indexOf(r,u),O=e.indexOf(n,u)}else if(-1!==O&&(O<x||-1===x))w.push(e.substring(u,O)),u=O+g,O=e.indexOf(n,u);else{if(-1===x)break;if(w.push(e.substring(u,x)),j(x+m),y&&(M(),h))return B();if(o&&v.length>=o)return B(!0)}else for(I=u,u++;;){if(-1===(I=e.indexOf(t,I+1)))return c||E.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:v.length,index:u}),F();if(I===f-1)return F(e.substring(u,I).replace(S,t));if(t!==d||e[I+1]!==d){if(t===d||0===I||e[I-1]!==d){-1!==O&&O<I+1&&(O=e.indexOf(n,I+1)),-1!==x&&x<I+1&&(x=e.indexOf(r,I+1));var T=A(-1===x?O:Math.min(O,x));if(e.substr(I+1+T,g)===n){w.push(e.substring(u,I).replace(S,t)),e[u=I+1+T+g]!==t&&(I=e.indexOf(t,u)),O=e.indexOf(n,u),x=e.indexOf(r,u);break}var L=A(x);if(e.substring(I+1+L,I+1+L+m)===r){if(w.push(e.substring(u,I).replace(S,t)),j(I+1+L+m),O=e.indexOf(n,u),I=e.indexOf(t,u),y&&(M(),h))return B();if(o&&v.length>=o)return B(!0);break}E.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:v.length,index:u}),I++}}else I++}return F();function D(e){v.push(e),b=u}function A(t){var n=0;if(-1!==t){var r=e.substring(I+1,t);r&&""===r.trim()&&(n=r.length)}return n}function F(t){return c||(void 0===t&&(t=e.substring(u)),w.push(t),u=f,D(w),y&&M()),B()}function j(t){u=t,D(w),w=[],x=e.indexOf(r,u)}function B(e){return{data:v,errors:E,meta:{delimiter:n,linebreak:r,aborted:h,truncated:!!e,cursor:b+(a||0)}}}function M(){s(B()),v=[],E=[]}},this.abort=function(){h=!0},this.getCharIndex=function(){return u}}function m(e){var t=e.data,n=i[t.workerId],r=!1;if(t.error)n.userError(t.error,t.file);else if(t.results&&t.results.data){var s={abort:function(){r=!0,_(t.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:y,resume:y};if(k(n.userStep)){for(var a=0;a<t.results.data.length&&(n.userStep({data:t.results.data[a],errors:t.results.errors,meta:t.results.meta},s),!r);a++);delete t.results}else k(n.userChunk)&&(n.userChunk(t.results,s,t.file),delete t.results)}t.finished&&!r&&_(t.workerId,t.results)}function _(e,t){var n=i[e];k(n.userComplete)&&n.userComplete(t),n.terminate(),delete i[e]}function y(){throw new Error("Not implemented.")}function v(e){if("object"!=typeof e||null===e)return e;var t=Array.isArray(e)?[]:{};for(var n in e)t[n]=v(e[n]);return t}function E(e,t){return function(){e.apply(t,arguments)}}function k(e){return"function"==typeof e}return r&&(t.onmessage=function(e){var n=e.data;if(void 0===a.WORKER_ID&&n&&(a.WORKER_ID=n.workerId),"string"==typeof n.input)t.postMessage({workerId:a.WORKER_ID,results:a.parse(n.input,n.config),finished:!0});else if(t.File&&n.input instanceof File||n.input instanceof Object){var r=a.parse(n.input,n.config);r&&t.postMessage({workerId:a.WORKER_ID,results:r,finished:!0})}}),(d.prototype=Object.create(l.prototype)).constructor=d,(u.prototype=Object.create(l.prototype)).constructor=u,(h.prototype=Object.create(h.prototype)).constructor=h,(c.prototype=Object.create(l.prototype)).constructor=c,a},void 0===(r=n.apply(t,[]))||(e.exports=r)}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var s=t[r]={exports:{}};return e[r].call(s.exports,s,s.exports,n),s.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";var e=n(460),t=n.n(e),r=[],i=[],s=[],a=[],o=[],l="",d="",u=[],h=[];const c={header:!0};var f=!1,p=!1;const g=document.getElementById("btn"),m=document.getElementById("topbar"),_=document.getElementById("test"),y=document.getElementById("userfile"),v=document.getElementById("comparefile");async function E(e){let t=Object.keys(e).length;0==D&&e.sort((function(e,t){return e.Rating<t.Rating?1:e.Rating>t.Rating?-1:0}));for(let n=0;n<t-1;n++){let t=Object.entries(e[n]);return 0==D?t[4][1]>=4&&(r.push(t[1][1]),s.push(t[4][1]),i.push(t[3][1])):t[4][1]>=7&&(a.push(t[1][1]),o.push(t[4][1]),linksother.push(t[3][1])),console.log("test DataofMovies"),[r,s]}}async function k(){g.style.display="none",S.style.display="none",x.style.display="none",document.getElementById("examplePoster").style.display="none";const e=document.createElement("div");e.className="titulo",e.innerHTML="";const t=document.createElement("div");t.className="poster";const n=document.getElementById("ImgList"),i=document.createElement("img"),a=document.createElement("h3");a.className="info";for(let e=0;e<r.length;e++){let r=a.cloneNode(!0);r.id="info"+e;let i=t.cloneNode(!0);i.id="poster"+e,n.appendChild(i),console.log("2primer for loop");let s="poster"+e;document.getElementById(s).appendChild(r)}for(let t=0;t<r.length;t++){let n=e.cloneNode(!0);n.innerHTML=r[t],n.id="namediv"+t;let i="poster"+t;document.getElementById(i).appendChild(n)}for(let t=0;t<r.length;t++){let n=await w(r[t]),a=i.cloneNode(!0),o=e.cloneNode(!0);o.innerHTML=s[t],o.className="one",o.id="ratindiv"+t,a.src="https://image.tmdb.org/t/p/w500"+n.poster_path;let l="poster"+t,d=document.getElementById(l);d.appendChild(a),d.appendChild(o),document.getElementById("info"+t).innerHTML=n.overview}for(let e=0;e<r.length;e++);}async function w(e){let t=e.replace(/\s+/g,"%20"),n=await fetch("https://api.themoviedb.org/3/search/multi?api_key=5625c97a465184ed5c6509459a4505fb&language=en-US&query="+t).then((e=>e.json()));return null==n.results[0]?{poster_path:"/fj21HwUprqjjwTdkKC1XZurRSpV.jpg"}:n.results[0]}function b(){console.log("comparator: "+a),console.log("names: "+r);const e=document.createElement("div");for(let t=0;t<a.length;t++)if(r.indexOf(a[t])>-1){let n=r.indexOf(a[t]);console.log("Este nombre esta en el array original: "+a[t]),console.log("En la posicion: "+r.indexOf(a[t]));let i=e.cloneNode(!0);i.id="ratingtwo"+n,i.innerHTML=o[t],i.className="two";let s="poster"+n;document.getElementById(s).appendChild(i)}else console.log("no comparten esta pelicula "),console.log(a[t])}g.addEventListener("pointerdown",(async function(e){if(m.className="barraleft shadowred ",0==D){e.preventDefault;let n=csvFile.files[0];1==f&&(n=u);let i=new FileReader;i.onload=async function(e){let n=e.target.result,i=t().parse(n,c).data;console.log(await E(i)),console.log(r.length),await async function(){let e=csvFile2.files[0];1==p&&(e=h);let n=new FileReader;n.onload=async function(e){let n=e.target.result,r=t().parse(n,c).data;console.log(await DataofMovies2(r))},n.readAsText(e)}(),await k(),await b()},i.readAsText(n)}else{let e=C.value,n=R.value;console.log("You're:"+e),console.log("Other is:"+n);let r=await O(e);l=t().parse(r,c).data;let i=await O(n);d=t().parse(i,c).data,await E(l),await DataofMovies2(d),await k(),await b()}m.className="barraleft shadowgreen "}));const C=document.getElementById("search"),R=document.getElementById("searchOther");async function O(e){return await fetch("http://localhost:8000/api/"+e).then((e=>e.json()))}_.addEventListener("pointerdown",(async function(){let e=C.value,n=R.value;console.log("You're: "+e),console.log("Other is: "+n),console.log("algo raro esta pasando");let r=await O(e);l=t().parse(r,c).data,console.log(l.json)}));const x=document.getElementById("downloadyourself"),S=document.getElementById("downloadother");x.addEventListener("dragover",(e=>{e.preventDefault(),console.log("dragtest")})),x.addEventListener("drop",(function(e){e.preventDefault(),u=e.dataTransfer.files[0],console.log(u),f=!0})),S.addEventListener("dragover",(e=>{e.preventDefault(),console.log("dropothertest")})),S.addEventListener("drop",(function(e){e.preventDefault(),h=e.dataTransfer.files[0],console.log(h),p=!0})),document.addEventListener("dragover",(e=>{e.preventDefault()})),document.addEventListener("drop",(e=>{e.preventDefault()}));const I=document.getElementById("switch"),T=document.getElementById("searchBoxOtherContainer"),L=document.getElementById("searchBoxContainer");var D=!1;I.addEventListener("change",(function(){console.log("x"),I.checked?(console.log("checked"),S.style.display="none",x.style.display="none",y.style.display="none",v.style.display="none",L.style.display="block",T.style.display="block",D=!0):(console.log("unchecked"),S.style.display="block",x.style.display="block",y.style.display="block",v.style.display="block",L.style.display="none",T.style.display="none",D=!1)}))})()})();