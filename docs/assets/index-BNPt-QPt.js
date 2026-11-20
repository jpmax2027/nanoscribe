(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();async function tn(){const t=globalThis.LanguageModel;if(!t||typeof t.availability!="function")return"unsupported";try{const e=await t.availability();switch(e){case"available":case"downloadable":case"downloading":case"unavailable":return e;default:return"unavailable"}}catch{return"unavailable"}}function nn(t){switch(t){case"available":return"Gemini Nano ready on this device";case"downloadable":return"Gemini Nano can be downloaded (use “Prepare on-device model”)";case"downloading":return"Gemini Nano is downloading…";case"unavailable":return"On-device model not available on this device";case"unsupported":return"On-device needs Chrome 139+ on desktop"}}const ze={apiKey:"AIzaSyCLEESUNF6sKoZbK0s5spF0pNQvlA1e2YA",authDomain:"nanoscribe-6c7a0.firebaseapp.com",projectId:"nanoscribe-6c7a0",storageBucket:"nanoscribe-6c7a0.firebasestorage.app",messagingSenderId:"359148709353",appId:"1:359148709353:web:a24f623fd746a8887f1778"};function an(t){return[t.apiKey,t.projectId,t.appId].some(n=>!n)?!1:!Object.values(t).some(n=>typeof n=="string"&&n.startsWith("REPLACE_WITH"))}const It={the:"",a:"",an:"",is:"adalah",are:"adalah",was:"adalah",and:"dan",or:"atau",of:"dari",to:"ke",in:"di",on:"di",at:"di",for:"untuk",with:"dengan",from:"dari",by:"oleh",this:"ini",that:"itu",it:"itu",i:"saya",you:"kamu",he:"dia",she:"dia",we:"kami",they:"mereka",my:"saya",your:"kamu",can:"bisa",will:"akan",not:"tidak",very:"sangat",good:"baik",big:"besar",small:"kecil",new:"baru",old:"lama",day:"hari",night:"malam",morning:"pagi",water:"air",food:"makanan",house:"rumah",book:"buku",school:"sekolah",teacher:"guru",student:"siswa",cat:"kucing",dog:"anjing",work:"kerja",learn:"belajar",read:"membaca",write:"menulis",speak:"berbicara",language:"bahasa",world:"dunia",life:"hidup",time:"waktu",year:"tahun",people:"orang",man:"pria",woman:"wanita",child:"anak",friend:"teman",family:"keluarga",city:"kota",country:"negara",sun:"matahari",moon:"bulan",star:"bintang",sea:"laut",mountain:"gunung",river:"sungai",tree:"pohon",flower:"bunga",happy:"senang",sad:"sedih",fast:"cepat",slow:"lambat",hot:"panas",cold:"dingin",eat:"makan",drink:"minum",sleep:"tidur",walk:"berjalan",run:"berlari",beautiful:"indah",important:"penting",easy:"mudah",difficult:"sulit",question:"pertanyaan",answer:"jawaban",story:"cerita",music:"musik",money:"uang",market:"pasar",price:"harga",buy:"membeli",sell:"menjual",help:"membantu",love:"cinta",like:"suka",want:"ingin",need:"butuh",go:"pergi",come:"datang",see:"melihat",make:"membuat",use:"menggunakan",device:"perangkat",phone:"ponsel",computer:"komputer",internet:"internet",data:"data",cloud:"awan",model:"model",text:"teks",today:"hari ini",tomorrow:"besok",yesterday:"kemarin",always:"selalu",never:"tidak pernah",often:"sering",now:"sekarang",here:"di sini",there:"di sana",where:"di mana",when:"kapan",because:"karena",but:"tetapi",so:"jadi",if:"jika",also:"juga",more:"lebih",many:"banyak",much:"banyak",one:"satu",two:"dua",three:"tiga",first:"pertama",every:"setiap",all:"semua",some:"beberapa",no:"tidak",yes:"ya",please:"tolong",thanks:"terima kasih",hello:"halo"},sn=(()=>{const t={};for(const[e,n]of Object.entries(It))n&&!(n in t)&&(t[n]=e);return t})();function rn(t){return(t.replace(/\s+/g," ").trim().match(/[^.!?]+[.!?]+["')\]]*|[^.!?]+$/g)??[]).map(n=>n.trim()).filter(Boolean)}function on(t){const e=new Map;for(const n of t.toLowerCase().match(/[a-zà-ÿ']+/g)??[])n.length>2&&e.set(n,(e.get(n)??0)+1);return e}function cn(t){const e=rn(t);if(e.length<=2)return e.join(" ");const n=on(t),a=e.map((c,l)=>{const h=(c.toLowerCase().match(/[a-zà-ÿ']+/g)??[]).filter(w=>w.length>2),f=h.reduce((w,se)=>w+(n.get(se)??0),0)/Math.max(h.length,1),m=1+.25*(1-l/e.length);return{sentence:c,index:l,score:f*m}}),s=Math.min(3,Math.max(1,Math.ceil(e.length/3))),r=[...a].sort((c,l)=>l.score-c.score).slice(0,s).sort((c,l)=>c.index-l.index),o=r.map(c=>c.sentence).join(" "),i=r.map(c=>`- ${c.sentence}`).join(`
`);return`${o}

Key points:
${i}`}const ln={"don't":"do not","doesn't":"does not","can't":"cannot","won't":"will not","it's":"it is","i'm":"I am","we're":"we are","they're":"they are","that's":"that is",gonna:"going to",wanna:"want to",yeah:"yes",hi:"hello",thanks:"thank you"},dn={"do not":"don't","does not":"doesn't",cannot:"can't","will not":"won't","it is":"it's","that is":"that's",hello:"hi","thank you":"thanks"};function We(t,e){let n=t;for(const[a,s]of Object.entries(e)){const r=new RegExp(`\\b${a.replace(/'/g,"['’]")}\\b`,"gi");n=n.replace(r,o=>o[0]===o[0]?.toUpperCase()&&o.length>1?s.charAt(0).toUpperCase()+s.slice(1):s)}return n}function re(t){return t.replace(/(^\s*[a-z])|([.!?]\s+[a-z])/g,e=>e.toUpperCase())}function oe(t){const e=t.replace(/\s+/g," ").trim();return/[.!?]$/.test(e)?e:`${e}.`}function un(t,e){const n=t.trim();switch(e){case"formal":return oe(re(We(n,ln)));case"casual":return We(n,dn).trim();case"concise":{const a=n.replace(/\bin order to\b/gi,"to").replace(/\bdue to the fact that\b/gi,"because").replace(/\b(very|really|just|actually|basically)\s+/gi,"");return oe(re(a))}case"grammar":return oe(re(n.replace(/\bi\b/g,"I")))}}function hn(t,e){const n=e==="en-id"?It:sn;return t.replace(/[A-Za-zÀ-ÿ]+/g,a=>{const s=n[a.toLowerCase()];return s===void 0?a:s===""?"":a[0]===a[0]?.toUpperCase()?s.charAt(0).toUpperCase()+s.slice(1):s}).replace(/\s{2,}/g," ").replace(/\s+([.,!?])/g,"$1").trim()}class fn{kind="demo";async prepareDeviceModel(){}async run(e,n,a){const s=performance.now();let r;switch(e.kind){case"summarize":r=cn(e.text);break;case"rewrite":r=un(e.text,e.rewriteStyle);break;case"translate":r=hn(e.text,e.direction);break}const o=r.split(/(?<=\s)/);let i="";for(const c of o)i+=c,a(i),await new Promise(l=>setTimeout(l,12));return{text:r,path:"demo",modelLabel:"Local demo engine (no AI model — add a Firebase config)",latencyMs:Math.max(1,Math.round(performance.now()-s))}}}const pn=()=>{};var qe={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ct=function(t){const e=[];let n=0;for(let a=0;a<t.length;a++){let s=t.charCodeAt(a);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&a+1<t.length&&(t.charCodeAt(a+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++a)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},mn=function(t){const e=[];let n=0,a=0;for(;n<t.length;){const s=t[n++];if(s<128)e[a++]=String.fromCharCode(s);else if(s>191&&s<224){const r=t[n++];e[a++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=t[n++],o=t[n++],i=t[n++],c=((s&7)<<18|(r&63)<<12|(o&63)<<6|i&63)-65536;e[a++]=String.fromCharCode(55296+(c>>10)),e[a++]=String.fromCharCode(56320+(c&1023))}else{const r=t[n++],o=t[n++];e[a++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Ne={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,a=[];for(let s=0;s<t.length;s+=3){const r=t[s],o=s+1<t.length,i=o?t[s+1]:0,c=s+2<t.length,l=c?t[s+2]:0,h=r>>2,f=(r&3)<<4|i>>4;let m=(i&15)<<2|l>>6,w=l&63;c||(w=64,o||(m=64)),a.push(n[h],n[f],n[m],n[w])}return a.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Ct(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):mn(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,a=[];for(let s=0;s<t.length;){const r=n[t.charAt(s++)],i=s<t.length?n[t.charAt(s)]:0;++s;const l=s<t.length?n[t.charAt(s)]:64;++s;const f=s<t.length?n[t.charAt(s)]:64;if(++s,r==null||i==null||l==null||f==null)throw new gn;const m=r<<2|i>>4;if(a.push(m),l!==64){const w=i<<4&240|l>>2;if(a.push(w),f!==64){const se=l<<6&192|f;a.push(se)}}}return a},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class gn extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const bn=function(t){const e=Ct(t);return Ne.encodeByteArray(e,!0)},Ot=function(t){return bn(t).replace(/\./g,"")},yn=function(t){try{return Ne.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function P(t){return At(void 0,t)}function At(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!En(n)||(t[n]=At(t[n],e[n]));return t}function En(t){return t!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function St(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wn=()=>St().__FIREBASE_DEFAULTS__,_n=()=>{if(typeof process>"u"||typeof qe>"u")return;const t=qe.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},In=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&yn(t[1]);return e&&JSON.parse(e)},Cn=()=>{try{return pn()||wn()||_n()||In()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Rt=()=>Cn()?.config;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,a)=>{n?this.reject(n):this.resolve(a),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,a))}}}function Tt(){try{return typeof indexedDB=="object"}catch{return!1}}function On(){return new Promise((t,e)=>{try{let n=!0;const a="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(a);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(a),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const An="FirebaseError";class G extends Error{constructor(e,n,a){super(n),this.code=e,this.customData=a,this.name=An,Object.setPrototypeOf(this,G.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Pe.prototype.create)}}class Pe{constructor(e,n,a){this.service=e,this.serviceName=n,this.errors=a}create(e,...n){const a=n[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?Sn(r,a):"Error",i=`${this.serviceName}: ${o} (${s}).`;return new G(s,i,a)}}function Sn(t,e){try{let n=0,a="";for(;n<t.length;){const s=t.indexOf("{$",n);if(s===-1){a+=t.substring(n);break}const r=t.indexOf("}",s+2);if(r===-1){a+=t.substring(n);break}const o=t.substring(s+2,r),i=e[o];a+=t.substring(n,s)+(i!=null?String(i):`<${o}?>`),n=r+1}return a}catch{return t}}function we(t,e){if(t===e)return!0;const n=Object.keys(t),a=Object.keys(e);for(const s of n){if(!a.includes(s))return!1;const r=t[s],o=e[s];if(Ke(r)&&Ke(o)){if(!we(r,o))return!1}else if(r!==o)return!1}for(const s of a)if(!n.includes(s))return!1;return!0}function Ke(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rn(t){return t&&t._delegate?t._delegate:t}class M{constructor(e,n,a){this.name=e,this.instanceFactory=n,this.type=a,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tn{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const a=new Ee;if(this.instancesDeferred.set(n,a),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&a.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),a=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(a)return null;throw s}else{if(a)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(kn(e))try{this.getOrInitializeService({instanceIdentifier:D})}catch{}for(const[n,a]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const r=this.getOrInitializeService({instanceIdentifier:s});a.resolve(r)}catch{}}}}clearInstance(e=D){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=D){return this.instances.has(e)}getOptions(e=D){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,a=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(a))throw Error(`${this.name}(${a}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:a,options:n});for(const[r,o]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(r);a===i&&o.resolve(s)}return s}onInit(e,n){const a=this.normalizeInstanceIdentifier(n),s=this.onInitCallbacks.get(a)??new Set;s.add(e),this.onInitCallbacks.set(a,s);const r=this.instances.get(a);return r&&e(r,a),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const a=this.onInitCallbacks.get(n);if(a)for(const s of a)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let a=this.instances.get(e);if(!a&&this.component&&(a=this.component.instanceFactory(this.container,{instanceIdentifier:vn(e),options:n}),this.instances.set(e,a),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(a,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,a)}catch{}return a||null}normalizeInstanceIdentifier(e=D){return this.component?this.component.multipleInstances?e:D:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function vn(t){return t===D?void 0:t}function kn(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dn{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Tn(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var p;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(p||(p={}));const Nn={debug:p.DEBUG,verbose:p.VERBOSE,info:p.INFO,warn:p.WARN,error:p.ERROR,silent:p.SILENT},Pn=p.INFO,Ln={[p.DEBUG]:"log",[p.VERBOSE]:"log",[p.INFO]:"info",[p.WARN]:"warn",[p.ERROR]:"error"},Mn=(t,e,...n)=>{if(e<t.logLevel)return;const a=new Date().toISOString(),s=Ln[e];if(s)console[s](`[${a}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Le{constructor(e){this.name=e,this._logLevel=Pn,this._logHandler=Mn,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in p))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Nn[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,p.DEBUG,...e),this._logHandler(this,p.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,p.VERBOSE,...e),this._logHandler(this,p.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,p.INFO,...e),this._logHandler(this,p.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,p.WARN,...e),this._logHandler(this,p.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,p.ERROR,...e),this._logHandler(this,p.ERROR,...e)}}const xn=(t,e)=>e.some(n=>t instanceof n);let Ye,Je;function $n(){return Ye||(Ye=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Fn(){return Je||(Je=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const vt=new WeakMap,_e=new WeakMap,kt=new WeakMap,ie=new WeakMap,Me=new WeakMap;function Bn(t){const e=new Promise((n,a)=>{const s=()=>{t.removeEventListener("success",r),t.removeEventListener("error",o)},r=()=>{n(k(t.result)),s()},o=()=>{a(t.error),s()};t.addEventListener("success",r),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&vt.set(n,t)}).catch(()=>{}),Me.set(e,t),e}function Un(t){if(_e.has(t))return;const e=new Promise((n,a)=>{const s=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",o),t.removeEventListener("abort",o)},r=()=>{n(),s()},o=()=>{a(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",r),t.addEventListener("error",o),t.addEventListener("abort",o)});_e.set(t,e)}let Ie={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return _e.get(t);if(e==="objectStoreNames")return t.objectStoreNames||kt.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return k(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Gn(t){Ie=t(Ie)}function Hn(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const a=t.call(ce(this),e,...n);return kt.set(a,e.sort?e.sort():[e]),k(a)}:Fn().includes(t)?function(...e){return t.apply(ce(this),e),k(vt.get(this))}:function(...e){return k(t.apply(ce(this),e))}}function jn(t){return typeof t=="function"?Hn(t):(t instanceof IDBTransaction&&Un(t),xn(t,$n())?new Proxy(t,Ie):t)}function k(t){if(t instanceof IDBRequest)return Bn(t);if(ie.has(t))return ie.get(t);const e=jn(t);return e!==t&&(ie.set(t,e),Me.set(e,t)),e}const ce=t=>Me.get(t);function Vn(t,e,{blocked:n,upgrade:a,blocking:s,terminated:r}={}){const o=indexedDB.open(t,e),i=k(o);return a&&o.addEventListener("upgradeneeded",c=>{a(k(o.result),c.oldVersion,c.newVersion,k(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),i.then(c=>{r&&c.addEventListener("close",()=>r()),s&&c.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),i}const zn=["get","getKey","getAll","getAllKeys","count"],Wn=["put","add","delete","clear"],le=new Map;function Xe(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(le.get(e))return le.get(e);const n=e.replace(/FromIndex$/,""),a=e!==n,s=Wn.includes(n);if(!(n in(a?IDBIndex:IDBObjectStore).prototype)||!(s||zn.includes(n)))return;const r=async function(o,...i){const c=this.transaction(o,s?"readwrite":"readonly");let l=c.store;return a&&(l=l.index(i.shift())),(await Promise.all([l[n](...i),s&&c.done]))[0]};return le.set(e,r),r}Gn(t=>({...t,get:(e,n,a)=>Xe(e,n)||t.get(e,n,a),has:(e,n)=>!!Xe(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qn{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Kn(n)){const a=n.getImmediate();return`${a.library}/${a.version}`}else return null}).filter(n=>n).join(" ")}}function Kn(t){return t.getComponent()?.type==="VERSION"}const Ce="@firebase/app",Qe="0.16.7";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const R=new Le("@firebase/app"),Yn="@firebase/app-compat",Jn="@firebase/analytics-compat",Xn="@firebase/analytics",Qn="@firebase/app-check-compat",Zn="@firebase/app-check",ea="@firebase/auth",ta="@firebase/auth-compat",na="@firebase/crashlytics",aa="@firebase/database",sa="@firebase/data-connect",ra="@firebase/database-compat",oa="@firebase/functions",ia="@firebase/functions-compat",ca="@firebase/installations",la="@firebase/installations-compat",da="@firebase/messaging",ua="@firebase/messaging-compat",ha="@firebase/performance",fa="@firebase/performance-compat",pa="@firebase/remote-config",ma="@firebase/remote-config-compat",ga="@firebase/storage",ba="@firebase/storage-compat",ya="@firebase/firestore",Ea="@firebase/ai",wa="@firebase/firestore-compat",_a="firebase";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oe="[DEFAULT]",Ia={[Ce]:"fire-core",[Yn]:"fire-core-compat",[Xn]:"fire-analytics",[Jn]:"fire-analytics-compat",[Zn]:"fire-app-check",[Qn]:"fire-app-check-compat",[ea]:"fire-auth",[ta]:"fire-auth-compat",[na]:"fire-cls",[aa]:"fire-rtdb",[sa]:"fire-data-connect",[ra]:"fire-rtdb-compat",[oa]:"fire-fn",[ia]:"fire-fn-compat",[ca]:"fire-iid",[la]:"fire-iid-compat",[da]:"fire-fcm",[ua]:"fire-fcm-compat",[ha]:"fire-perf",[fa]:"fire-perf-compat",[pa]:"fire-rc",[ma]:"fire-rc-compat",[ga]:"fire-gcs",[ba]:"fire-gcs-compat",[ya]:"fire-fst",[wa]:"fire-fst-compat",[Ea]:"fire-vertex","fire-js":"fire-js",[_a]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Q=new Map,Ca=new Map,Ae=new Map;function Ze(t,e){try{t.container.addComponent(e)}catch(n){R.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function F(t){const e=t.name;if(Ae.has(e))return R.debug(`There were multiple attempts to register component ${e}.`),!1;Ae.set(e,t);for(const n of Q.values())Ze(n,t);for(const n of Ca.values())Ze(n,t);return!0}function Oa(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Aa(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sa={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},S=new Pe("app","Firebase",Sa);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ra{constructor(e,n,a){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=a,this.container.addComponent(new M("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw S.create("app-deleted",{appName:this._name})}}function Dt(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const a={name:Oe,automaticDataCollectionEnabled:!0,...e},s=a.name;if(typeof s!="string"||!s)throw S.create("bad-app-name",{appName:String(s)});if(n||(n=Rt()),!n)throw S.create("no-options");const r=Q.get(s);if(r)if(we(n,r.options)){if(we(a,r.config))return r;throw S.create("duplicate-app",{appName:s,mismatchedParam:"config",oldValue:JSON.stringify(r.config),newValue:JSON.stringify(a)})}else throw S.create("duplicate-app",{appName:s,mismatchedParam:"options",oldValue:JSON.stringify(r.options),newValue:JSON.stringify(n)});const o=new Dn(s);for(const c of Ae.values())o.addComponent(c);const i=new Ra(n,a,o);return Q.set(s,i),i}function Ta(t=Oe){const e=Q.get(t);if(!e&&t===Oe&&Rt())return Dt();if(!e)throw S.create("no-app",{appName:t});return e}function L(t,e,n){let a=Ia[t]??t;n&&(a+=`-${n}`);const s=a.match(/\s|\//),r=e.match(/\s|\//);if(s||r){const o=[`Unable to register library "${a}" with version "${e}":`];s&&o.push(`library name "${a}" contains illegal characters (whitespace or "/")`),s&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),R.warn(o.join(" "));return}F(new M(`${a}-version`,()=>({library:a,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const va="firebase-heartbeat-database",ka=1,q="firebase-heartbeat-store";let de=null;function Nt(){return de||(de=Vn(va,ka,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(q)}catch(n){console.warn(n)}}}}).catch(t=>{throw S.create("idb-open",{originalErrorMessage:t.message})})),de}async function Da(t){try{const n=(await Nt()).transaction(q),a=await n.objectStore(q).get(Pt(t));return await n.done,a}catch(e){if(e instanceof G)R.warn(e.message);else{const n=S.create("idb-get",{originalErrorMessage:e?.message});R.warn(n.message)}}}async function et(t,e){try{const a=(await Nt()).transaction(q,"readwrite");await a.objectStore(q).put(e,Pt(t)),await a.done}catch(n){if(n instanceof G)R.warn(n.message);else{const a=S.create("idb-set",{originalErrorMessage:n?.message});R.warn(a.message)}}}function Pt(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Na=1024,Pa=30;class La{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new xa(n),this._heartbeatsCachePromise=this._storage.read().then(a=>(this._heartbeatsCache=a,a))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),a=tt();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===a||this._heartbeatsCache.heartbeats.some(s=>s.date===a))return;if(this._heartbeatsCache.heartbeats.push({date:a,agent:n}),this._heartbeatsCache.heartbeats.length>Pa){const s=$a(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){R.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=tt(),{heartbeatsToSend:n,unsentEntries:a}=Ma(this._heartbeatsCache.heartbeats),s=Ot(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,a.length>0?(this._heartbeatsCache.heartbeats=a,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return R.warn(e),""}}}function tt(){return new Date().toISOString().substring(0,10)}function Ma(t,e=Na){const n=[];let a=t.slice();for(const s of t){const r=n.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),nt(n)>e){r.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),nt(n)>e){n.pop();break}a=a.slice(1)}return{heartbeatsToSend:n,unsentEntries:a}}class xa{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Tt()?On().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Da(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const a=await this.read();return et(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??a.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const a=await this.read();return et(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??a.lastSentHeartbeatDate,heartbeats:[...a.heartbeats,...e.heartbeats]})}else return}}function nt(t){return Ot(JSON.stringify({version:2,heartbeats:t})).length}function $a(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let a=1;a<t.length;a++)t[a].date<n&&(n=t[a].date,e=a);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fa(t){F(new M("platform-logger",e=>new qn(e),"PRIVATE")),F(new M("heartbeat",e=>new La(e),"PRIVATE")),L(Ce,Qe,t),L(Ce,Qe,"esm2020"),L("fire-js","")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Fa("");var Ba="firebase",Ua="13.4.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */L(Ba,Ua,"app");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ga=new Map,Ha={activated:!1,tokenObservers:[]};function I(t){return Ga.get(t)||{...Ha}}const at={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:960*1e3};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ja{constructor(e,n,a,s,r){if(this.operation=e,this.retryPolicy=n,this.getWaitDuration=a,this.lowerBound=s,this.upperBound=r,this.pending=null,this.nextErrorWaitInterval=s,s>r)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new Ee,this.pending.promise.catch(n=>{}),await Va(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new Ee,this.pending.promise.catch(n=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(n){this.retryPolicy(n)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const n=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),n}}}function Va(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const za={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},Z=new Pe("appCheck","AppCheck",za);function Lt(t){if(!I(t).activated)throw Z.create("use-before-activation",{appName:t.name})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wa="firebase-app-check-database",qa=1,Se="firebase-app-check-store";let K=null;function Ka(){return K||(K=new Promise((t,e)=>{try{const n=indexedDB.open(Wa,qa);n.onsuccess=a=>{t(a.target.result)},n.onerror=a=>{e(Z.create("storage-open",{originalErrorMessage:a.target.error?.message}))},n.onupgradeneeded=a=>{const s=a.target.result;switch(a.oldVersion){case 0:s.createObjectStore(Se,{keyPath:"compositeKey"})}}}catch(n){e(Z.create("storage-open",{originalErrorMessage:n?.message}))}}),K)}function Ya(t,e){return Ja(Xa(t),e)}async function Ja(t,e){const a=(await Ka()).transaction(Se,"readwrite"),r=a.objectStore(Se).put({compositeKey:t,value:e});return new Promise((o,i)=>{r.onsuccess=c=>{o()},a.onerror=c=>{i(Z.create("storage-set",{originalErrorMessage:c.target.error?.message}))}})}function Xa(t){return`${t.options.appId}-${t.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Re=new Le("@firebase/app-check");function st(t,e){return Tt()?Ya(t,e).catch(n=>{Re.warn(`Failed to write token to IndexedDB. Error: ${n}`)}):Promise.resolve()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qa={error:"UNKNOWN_ERROR"};function Za(t){return Ne.encodeString(JSON.stringify(t),!1)}async function Te(t,e=!1,n=!1){const a=t.app;Lt(a);const s=I(a);let r=s.token,o;if(r&&!j(r)&&(s.token=void 0,r=void 0),!r){const l=await s.cachedTokenPromise;l&&(j(l)?r=l:await st(a,void 0))}if(!e&&r&&j(r))return{token:r.token};let i=!1;try{s.exchangeTokenPromise||(s.exchangeTokenPromise=s.provider.getToken().finally(()=>{s.exchangeTokenPromise=void 0}),i=!0),r=await I(a).exchangeTokenPromise}catch(l){l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?Re.warn(l.message):n&&Re.error(l),o=l}let c;return r?o?j(r)?c={token:r.token,internalError:o}:c=ot(o):(c={token:r.token},s.token=r,await st(a,r)):c=ot(o),i&&as(a,c),c}async function es(t){const e=t.app;Lt(e);const{provider:n}=I(e);{const{token:a}=await n.getToken(!0);return{token:a}}}function ts(t,e,n,a){const{app:s}=t,r=I(s),o={next:n,error:a,type:e};if(r.tokenObservers=[...r.tokenObservers,o],r.token&&j(r.token)){const i=r.token;Promise.resolve().then(()=>{n({token:i.token}),rt(t)}).catch(()=>{})}r.cachedTokenPromise.then(()=>rt(t))}function Mt(t,e){const n=I(t),a=n.tokenObservers.filter(s=>s.next!==e);a.length===0&&n.tokenRefresher&&n.tokenRefresher.isRunning()&&n.tokenRefresher.stop(),n.tokenObservers=a}function rt(t){const{app:e}=t,n=I(e);let a=n.tokenRefresher;a||(a=ns(t),n.tokenRefresher=a),!a.isRunning()&&n.isTokenAutoRefreshEnabled&&a.start()}function ns(t){const{app:e}=t;return new ja(async()=>{const n=I(e);let a;if(n.token?a=await Te(t,!0):a=await Te(t),a.error)throw a.error;if(a.internalError)throw a.internalError},()=>!0,()=>{const n=I(e);if(n.token){let a=n.token.issuedAtTimeMillis+(n.token.expireTimeMillis-n.token.issuedAtTimeMillis)*.5+3e5;const s=n.token.expireTimeMillis-300*1e3;return a=Math.min(a,s),Math.max(0,a-Date.now())}else return 0},at.RETRIAL_MIN_WAIT,at.RETRIAL_MAX_WAIT)}function as(t,e){const n=I(t).tokenObservers;for(const a of n)try{a.type==="EXTERNAL"&&e.error!=null?a.error(e.error):a.next(e)}catch{}}function j(t){return t.expireTimeMillis-Date.now()>0}function ot(t){return{token:Za(Qa),error:t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ss{constructor(e,n){this.app=e,this.heartbeatServiceProvider=n}_delete(){const{tokenObservers:e}=I(this.app);for(const n of e)Mt(this.app,n.next);return Promise.resolve()}}function rs(t,e){return new ss(t,e)}function os(t){return{getToken:e=>Te(t,e),getLimitedUseToken:()=>es(t),addTokenListener:e=>ts(t,"INTERNAL",e),removeTokenListener:e=>Mt(t.app,e)}}const is="@firebase/app-check",cs="0.13.2";/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ls="app-check",it="app-check-internal";function ds(){F(new M(ls,t=>{const e=t.getProvider("app").getImmediate(),n=t.getProvider("heartbeat");return rs(e,n)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,n)=>{t.getProvider(it).initialize()})),F(new M(it,t=>{const e=t.getProvider("app-check").getImmediate();return os(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),L(is,cs)}ds();var ct="@firebase/ai",ve="3.1.0";/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const B="AI",us="global",hs="firebasevertexai.googleapis.com",ee="v1beta",lt=ve,fs="gl-js",ps="hybrid",ms=180*1e3,gs="gemini-3.5-flash-lite";/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u extends G{constructor(e,n,a){const s=B,r=`${s}/${e}`,o=`${s}: ${n} (${r})`;super(e,o),this.code=e,this.customErrorData=a,Error.captureStackTrace&&Error.captureStackTrace(this,u),Object.setPrototypeOf(this,u.prototype),this.toString=()=>o}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dt=["user","model","function","system"],xt={HARM_SEVERITY_UNSUPPORTED:"HARM_SEVERITY_UNSUPPORTED"},y={SAFETY:"SAFETY",RECITATION:"RECITATION",BLOCKLIST:"BLOCKLIST",PROHIBITED_CONTENT:"PROHIBITED_CONTENT",SPII:"SPII",MALFORMED_FUNCTION_CALL:"MALFORMED_FUNCTION_CALL",IMAGE_SAFETY:"IMAGE_SAFETY",IMAGE_PROHIBITED_CONTENT:"IMAGE_PROHIBITED_CONTENT",IMAGE_OTHER:"IMAGE_OTHER",NO_IMAGE:"NO_IMAGE",IMAGE_RECITATION:"IMAGE_RECITATION",LANGUAGE:"LANGUAGE",UNEXPECTED_TOOL_CALL:"UNEXPECTED_TOOL_CALL",TOO_MANY_TOOL_CALLS:"TOO_MANY_TOOL_CALLS",MISSING_THOUGHT_SIGNATURE:"MISSING_THOUGHT_SIGNATURE",MALFORMED_RESPONSE:"MALFORMED_RESPONSE"},E={PREFER_ON_DEVICE:"prefer_on_device",ONLY_ON_DEVICE:"only_on_device",ONLY_IN_CLOUD:"only_in_cloud",PREFER_IN_CLOUD:"prefer_in_cloud"},v={ON_DEVICE:"on_device",IN_CLOUD:"in_cloud"};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const d={ERROR:"error",REQUEST_ERROR:"request-error",RESPONSE_ERROR:"response-error",FETCH_ERROR:"fetch-error",SESSION_CLOSED:"session-closed",INVALID_CONTENT:"invalid-content",API_NOT_ENABLED:"api-not-enabled",ALREADY_INITIALIZED:"already-initialized",INVALID_SCHEMA:"invalid-schema",NO_API_KEY:"no-api-key",NO_APP_ID:"no-app-id",NO_MODEL:"no-model",NO_PROJECT_ID:"no-project-id",PARSE_FAILED:"parse-failed",UNSUPPORTED:"unsupported"};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const T={AGENT_PLATFORM:"AGENT_PLATFORM",GOOGLE_AI:"GOOGLE_AI"};/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t{constructor(e){this.backendType=e}}class ae extends $t{constructor(){super(T.GOOGLE_AI)}_getModelPath(e,n){return`/${ee}/projects/${e}/${n}`}_getTemplatePath(e,n){return`/${ee}/projects/${e}/templates/${n}`}}class Ft extends $t{constructor(e){super(T.AGENT_PLATFORM),this.location=us,e&&(this.location=e)}_getModelPath(e,n){return`/${ee}/projects/${e}/locations/${this.location}/${n}`}_getTemplatePath(e,n){return`/${ee}/projects/${e}/locations/${this.location}/templates/${n}`}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bs(t){if(t instanceof ae)return`${B}/googleai`;if(t instanceof Ft)return`${B}/agentplatform/${t.location}`;throw new u(d.ERROR,`Invalid backend: ${JSON.stringify(t.backendType)}`)}function ys(t){const e=t.split("/");if(e[0]!==B)throw new u(d.ERROR,`Invalid instance identifier, unknown prefix '${e[0]}'`);switch(e[1]){case"agentplatform":const a=e[2];if(!a)throw new u(d.ERROR,`Invalid instance identifier, unknown location '${t}'`);return new Ft(a);case"googleai":return new ae;default:throw new u(d.ERROR,`Invalid instance identifier string: '${t}'`)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b=new Le("@firebase/ai");var A;(function(t){t.UNAVAILABLE="unavailable",t.DOWNLOADABLE="downloadable",t.DOWNLOADING="downloading",t.AVAILABLE="available"})(A||(A={}));/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bt={type:"text",languages:["en"]},ue=[Bt,{type:"image"}],he=[Bt];class _{constructor(e,n,a){this.languageModelProvider=e,this.mode=n,this.downloadPromise=null,this.onDeviceParams={createOptions:{expectedInputs:ue,expectedOutputs:he}},a&&(this.onDeviceParams=a,this.onDeviceParams.createOptions?(this.onDeviceParams.createOptions.expectedInputs||(this.onDeviceParams.createOptions.expectedInputs=ue),this.onDeviceParams.createOptions.expectedOutputs||(this.onDeviceParams.createOptions.expectedOutputs=he)):this.onDeviceParams.createOptions={expectedInputs:ue,expectedOutputs:he})}async isAvailable(e){if(!this.mode)return b.debug("On-device inference unavailable because mode is undefined."),!1;if(this.mode===E.ONLY_IN_CLOUD)return b.debug('On-device inference unavailable because mode is "only_in_cloud".'),!1;const n=await this.languageModelProvider?.availability(this.onDeviceParams.createOptions);if(this.mode===E.ONLY_ON_DEVICE){if(n===A.UNAVAILABLE)throw new u(d.API_NOT_ENABLED,"Local LanguageModel API not available in this environment.");if(n===A.DOWNLOADABLE||n===A.DOWNLOADING){b.debug("Waiting for download of LanguageModel to complete.");try{await this.downloadPromise}catch(a){throw new u(d.ERROR,a.message)}return!0}return!0}return n!==A.AVAILABLE?(b.debug(`On-device inference unavailable because availability is "${n}".`),!1):_.isOnDeviceRequest(e)?!0:(b.debug("On-device inference unavailable because request is incompatible."),!1)}async generateContent(e){const n=await this.createSession(),a=await Promise.all(e.contents.map(_.toLanguageModelMessage)),s=await n.prompt(a,this.onDeviceParams.promptOptions);return _.toResponse(s)}async generateContentStream(e){const n=await this.createSession(),a=await Promise.all(e.contents.map(_.toLanguageModelMessage)),s=n.promptStreaming(a,this.onDeviceParams.promptOptions);return _.toStreamResponse(s)}async countTokens(e){throw new u(d.REQUEST_ERROR,"Count Tokens is not yet available for on-device model.")}static isOnDeviceRequest(e){if(e.contents.length===0)return b.debug("Empty prompt rejected for on-device inference."),!1;for(const n of e.contents){if(n.parts.some(a=>"functionResponse"in a))return b.debug("Content with a function response part rejected for on-device inference."),!1;for(const a of n.parts)if("inlineData"in a&&a.inlineData&&_.SUPPORTED_MIME_TYPES.indexOf(a.inlineData.mimeType)===-1)return b.debug(`Unsupported mime type "${a.inlineData.mimeType}" rejected for on-device inference.`),!1}return!0}async downloadIfAvailable(e){const n=await this.languageModelProvider?.availability(this.onDeviceParams.createOptions);return(n===A.DOWNLOADABLE||n===A.DOWNLOADING)&&this.download(e),n}download(e){if(this.downloadPromise)return;const n={...this.onDeviceParams.createOptions};n&&!n.monitor&&e&&(n.monitor=a=>{a.addEventListener("downloadprogress",s=>{e(s.loaded)})}),this.downloadPromise=this.languageModelProvider?.create(n).finally(()=>{this.downloadPromise=null})}static async toLanguageModelMessage(e){const n=await Promise.all(e.parts.map(_.toLanguageModelMessageContent));return{role:_.toLanguageModelMessageRole(e.role),content:n}}static async toLanguageModelMessageContent(e){if("text"in e&&typeof e.text=="string")return{type:"text",value:e.text};if("inlineData"in e&&e.inlineData){const a=await(await fetch(`data:${e.inlineData.mimeType};base64,${e.inlineData.data}`)).blob();return{type:"image",value:await createImageBitmap(a)}}throw new u(d.REQUEST_ERROR,"Processing of this Part type is not currently supported.")}static toLanguageModelMessageRole(e){return e==="model"?"assistant":"user"}async createSession(){if(!this.languageModelProvider)throw new u(d.UNSUPPORTED,"Chrome AI requested for unsupported browser version.");const e=await this.languageModelProvider.create(this.onDeviceParams.createOptions);return this.oldSession&&this.oldSession.destroy(),this.oldSession=e,e}static toResponse(e){return{json:async()=>({candidates:[{content:{parts:[{text:e}]}}]})}}static toStreamResponse(e){const n=new TextEncoder;return{body:e.pipeThrough(new TransformStream({transform(a,s){const r=JSON.stringify({candidates:[{content:{role:"model",parts:[{text:a}]}}]});s.enqueue(n.encode(`data: ${r}

`))}}))}}}_.SUPPORTED_MIME_TYPES=["image/jpeg","image/png"];function Es(t,e,n){const s=(e||St()).LanguageModel;if(s&&t)return new _(s,t,n)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ws{constructor(e,n,a,s,r){this.app=e,this.backend=n,this.chromeAdapterFactory=r;const o=s?.getImmediate({optional:!0}),i=a?.getImmediate({optional:!0});this.auth=i||null,this.appCheck=o||null}_delete(){return Promise.resolve()}set options(e){this._options=e}get options(){return this._options}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _s(t,{instanceIdentifier:e}){if(!e)throw new u(d.ERROR,"AIService instance identifier is undefined.");const n=ys(e),a=t.getProvider("app").getImmediate(),s=t.getProvider("auth-internal"),r=t.getProvider("app-check-internal");return new ws(a,n,s,r,Es)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Is(t){if(t.app?.options?.apiKey)if(t.app?.options?.projectId){if(!t.app?.options?.appId)throw new u(d.NO_APP_ID,'The "appId" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid app ID.')}else throw new u(d.NO_PROJECT_ID,'The "projectId" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid project ID.');else throw new u(d.NO_API_KEY,'The "apiKey" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid API key.');const e={apiKey:t.app.options.apiKey,project:t.app.options.projectId,appId:t.app.options.appId,automaticDataCollectionEnabled:t.app.automaticDataCollectionEnabled,backend:t.backend};if(Aa(t.app)&&t.app.settings.appCheckToken){const n=t.app.settings.appCheckToken;e.getAppCheckToken=()=>Promise.resolve({token:n})}else t.appCheck&&(t.options?.useLimitedUseAppCheckTokens?e.getAppCheckToken=()=>t.appCheck.getLimitedUseToken():e.getAppCheckToken=()=>t.appCheck.getToken());return t.auth&&(e.getAuthToken=()=>t.auth.getToken()),e}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z{constructor(e,n){this._apiSettings=Is(e),this.model=z.normalizeModelName(n,this._apiSettings.backend.backendType)}static normalizeModelName(e,n){return n===T.GOOGLE_AI?z.normalizeGoogleAIModelName(e):z.normalizeVertexAIModelName(e)}static normalizeGoogleAIModelName(e){return`models/${e}`}static normalizeVertexAIModelName(e){let n;return e.includes("/")?e.startsWith("models/")?n=`publishers/google/${e}`:n=e:n=`publishers/google/models/${e}`,n}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cs="Timeout has expired.",fe="AbortError";class Os{constructor(e){this.params=e}toString(){const e=new URL(this.baseUrl);return e.pathname=this.pathname,e.search=this.queryParams.toString(),e.toString()}get pathname(){return this.params.templateId?`${this.params.apiSettings.backend._getTemplatePath(this.params.apiSettings.project,this.params.templateId)}:${this.params.task}`:`${this.params.apiSettings.backend._getModelPath(this.params.apiSettings.project,this.params.model)}:${this.params.task}`}get baseUrl(){return this.params.singleRequestOptions?.baseUrl??`https://${hs}`}get queryParams(){const e=new URLSearchParams;return this.params.stream&&e.set("alt","sse"),e}}function As(t){const e=[];return e.push(`${fs}/${lt}`),e.push(`fire/${lt}`),(t.params.apiSettings.inferenceMode===E.PREFER_ON_DEVICE||t.params.apiSettings.inferenceMode===E.PREFER_IN_CLOUD)&&e.push(ps),e.join(" ")}async function Ss(t){const e=new Headers;if(e.append("Content-Type","application/json"),e.append("x-goog-api-client",As(t)),e.append("x-goog-api-key",t.params.apiSettings.apiKey),t.params.apiSettings.automaticDataCollectionEnabled&&e.append("X-Firebase-Appid",t.params.apiSettings.appId),t.params.apiSettings.getAppCheckToken){const n=await t.params.apiSettings.getAppCheckToken();n&&(e.append("X-Firebase-AppCheck",n.token),n.error&&b.warn(`Unable to obtain a valid App Check token: ${n.error.message}`))}if(t.params.apiSettings.getAuthToken){const n=await t.params.apiSettings.getAuthToken();n&&e.append("Authorization",`Firebase ${n.accessToken}`)}return e}async function xe(t,e){const n=new Os(t);let a;const s=t.singleRequestOptions?.signal,r=t.singleRequestOptions?.timeout!=null&&t.singleRequestOptions.timeout>=0?t.singleRequestOptions.timeout:ms,o=new AbortController,i=setTimeout(()=>{o.abort(new DOMException(Cs,fe)),b.debug(`Aborting request to ${n} due to timeout (${r}ms)`)},r),c=AbortSignal.any(s?[s,o.signal]:[o.signal]);if(s&&s.aborted)throw clearTimeout(i),new DOMException(s.reason??"Aborted externally before fetch",fe);try{const l={method:"POST",headers:await Ss(n),signal:c,body:e};if(a=await fetch(n.toString(),l),!a.ok){let h="",f;try{const m=await a.json();h=m.error.message,m.error.details&&(h+=` ${JSON.stringify(m.error.details)}`,f=m.error.details)}catch{}throw a.status===403&&f&&f.some(m=>m.reason==="SERVICE_DISABLED")&&f.some(m=>m.links?.[0]?.description.includes("Google developers console API activation"))?new u(d.API_NOT_ENABLED,`The Firebase AI SDK requires the Firebase AI API ('firebasevertexai.googleapis.com') to be enabled in your Firebase project. Enable this API by visiting the Firebase Console at https://console.firebase.google.com/project/${n.params.apiSettings.project}/ailogic/ and clicking "Get started". If you enabled this API recently, wait a few minutes for the action to propagate to our systems and then retry.`,{status:a.status,statusText:a.statusText,errorDetails:f}):new u(d.FETCH_ERROR,`Error fetching from ${n}: [${a.status} ${a.statusText}] ${h}`,{status:a.status,statusText:a.statusText,errorDetails:f})}}catch(l){let h=l;throw l.code!==d.FETCH_ERROR&&l.code!==d.API_NOT_ENABLED&&l instanceof Error&&l.name!==fe&&(h=new u(d.ERROR,`Error fetching from ${n.toString()}: ${l.message}`),h.stack=l.stack),h}finally{clearTimeout(i)}return a}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Y(t){if(t.candidates&&t.candidates.length>0){if(t.candidates.length>1&&b.warn(`This response had ${t.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),Gt(t.candidates[0]))throw new u(d.RESPONSE_ERROR,`Response error: ${N(t)}. Response body stored in error.response`,{response:t});return!0}else return!1}function O(t){return"type"in t&&t.type?t:t.text!==void 0?{...t,type:"text"}:t.inlineData!==void 0?{...t,type:"inlineData"}:t.functionCall!==void 0?{...t,type:"functionCall"}:t.functionResponse!==void 0?{...t,type:"functionResponse"}:t.fileData!==void 0?{...t,type:"fileData"}:t.executableCode!==void 0?{...t,type:"executableCode"}:t.codeExecutionResult!==void 0?{...t,type:"codeExecutionResult"}:t}function te(t,e=v.IN_CLOUD){if(t.candidates?.[0]&&!t.candidates[0].hasOwnProperty("index")&&(t.candidates[0].index=0),t.candidates)for(const a of t.candidates)a.content?.parts&&(a.content.parts=a.content.parts.map(O));const n=Rs(t);return n.inferenceSource=e,n}function Rs(t){return t.text=()=>{if(Y(t))return ut(t,e=>!("thought"in e&&e.thought));if(t.promptFeedback)throw new u(d.RESPONSE_ERROR,`Text not available. ${N(t)}`,{response:t});return""},t.thoughtSummary=()=>{if(Y(t)){const e=ut(t,n=>!!("thought"in n&&n.thought));return e===""?void 0:e}else if(t.promptFeedback)throw new u(d.RESPONSE_ERROR,`Thought summary not available. ${N(t)}`,{response:t})},t.inlineDataParts=()=>{if(Y(t))return Ts(t);if(t.promptFeedback)throw new u(d.RESPONSE_ERROR,`Data not available. ${N(t)}`,{response:t})},t.functionCalls=()=>{if(Y(t))return Ut(t);if(t.promptFeedback)throw new u(d.RESPONSE_ERROR,`Function call not available. ${N(t)}`,{response:t})},t}function ut(t,e){const n=[];if(t.candidates?.[0].content?.parts)for(const a of t.candidates?.[0].content?.parts){const s=O(a);s.type==="text"&&e(s)&&n.push(s.text)}return n.length>0?n.join(""):""}function Ut(t){if(!t)return;const e=[];if(t.candidates?.[0].content?.parts)for(const n of t.candidates?.[0].content?.parts){const a=O(n);a.type==="functionCall"&&e.push(a.functionCall)}if(e.length>0)return e}function Ts(t){const e=[];if(t.candidates?.[0].content?.parts)for(const n of t.candidates?.[0].content?.parts){const a=O(n);a.type==="inlineData"&&e.push(a)}if(e.length>0)return e}const vs=[y.RECITATION,y.SAFETY,y.BLOCKLIST,y.PROHIBITED_CONTENT,y.SPII,y.MALFORMED_FUNCTION_CALL,y.IMAGE_SAFETY,y.IMAGE_PROHIBITED_CONTENT,y.IMAGE_OTHER,y.NO_IMAGE,y.IMAGE_RECITATION,y.LANGUAGE,y.UNEXPECTED_TOOL_CALL,y.TOO_MANY_TOOL_CALLS,y.MISSING_THOUGHT_SIGNATURE,y.MALFORMED_RESPONSE];function Gt(t){return!!t.finishReason&&vs.some(e=>e===t.finishReason)}function N(t){let e="";if((!t.candidates||t.candidates.length===0)&&t.promptFeedback)e+="Response was blocked",t.promptFeedback?.blockReason&&(e+=` due to ${t.promptFeedback.blockReason}`),t.promptFeedback?.blockReasonMessage&&(e+=`: ${t.promptFeedback.blockReasonMessage}`);else if(t.candidates?.[0]){const n=t.candidates[0];Gt(n)&&(e+=`Candidate was blocked due to ${n.finishReason}`,n.finishMessage&&(e+=`: ${n.finishMessage}`))}return e}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $e(t){if(t!=null){if(typeof t=="string")return{role:"system",parts:[{type:"text",text:t}]};if(t.type==="text"||"text"in t&&typeof t.text=="string")return{role:"system",parts:[P(O(t))]};if(t.parts){const e=t.parts.map(n=>P(O(n)));return t.role?{...t,parts:e}:{role:"system",parts:e}}}}function V(t){let e=[];if(typeof t=="string")e=[{type:"text",text:t}];else for(const n of t)typeof n=="string"?e.push({type:"text",text:n}):e.push(P(O(n)));return ks(e)}function ks(t){const e={role:"user",parts:[]};let n=!1,a=!1;for(const s of t)s.type==="functionResponse"||"functionResponse"in s?a=!0:n=!0,e.parts.push(s);if(n&&a)throw new u(d.INVALID_CONTENT,"Within a single message, FunctionResponse cannot be mixed with other type of Part in the request for sending chat message.");if(!n&&!a)throw new u(d.INVALID_CONTENT,"No Content is provided for sending chat message.");return e}function pe(t){let e;if(t.contents){const n=t;e={...n,contents:n.contents.map(a=>({...a,parts:a.parts?a.parts.map(O):[]}))}}else e={contents:[V(t)]};return t.systemInstruction&&(e.systemInstruction=$e(t.systemInstruction)),e}function Ds(t){return t.parts&&Array.isArray(t.parts)?{...t,parts:t.parts.map(Fe)}:t}function Fe(t){let e;if("type"in t){const{type:n,...a}=t;e=a}else e=t;return e.functionResponse&&(e={...e,functionResponse:Ds(e.functionResponse)}),e}function Be(t){return t.parts?{...t,parts:t.parts.map(Fe)}:t}function Ht(t){return t==null||typeof t=="string"?t:"parts"in t&&Array.isArray(t.parts)?Be(t):Fe(t)}function jt(t){const e={...t};return e.contents&&(e.contents=e.contents.map(Be)),e.systemInstruction&&(e.systemInstruction=Ht(e.systemInstruction)),e}function Ns(t){const e={...t};return e.contents&&(e.contents=e.contents.map(Be)),e.systemInstruction&&(e.systemInstruction=Ht(e.systemInstruction)),e}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vt(t){if(t.safetySettings?.forEach(e=>{if(e.method)throw new u(d.UNSUPPORTED,"SafetySetting.method is not supported in the the Gemini Developer API. Please remove this property.")}),t.generationConfig?.topK){const e=Math.round(t.generationConfig.topK);e!==t.generationConfig.topK&&(b.warn("topK in GenerationConfig has been rounded to the nearest integer to match the format for requests to the Gemini Developer API."),t.generationConfig.topK=e)}return t}function Ue(t){return{candidates:t.candidates?Ls(t.candidates):void 0,promptFeedback:t.promptFeedback?Ms(t.promptFeedback):void 0,usageMetadata:t.usageMetadata}}function Ps(t,e){return{generateContentRequest:{model:e,...t}}}function Ls(t){const e=[];let n;return e&&t.forEach(a=>{let s;if(a.citationMetadata&&(s={citations:a.citationMetadata.citationSources}),a.safetyRatings&&(n=a.safetyRatings.map(o=>({...o,severity:o.severity??xt.HARM_SEVERITY_UNSUPPORTED,probabilityScore:o.probabilityScore??0,severityScore:o.severityScore??0}))),a.content?.parts?.some(o=>"videoMetadata"in o&&o.videoMetadata))throw new u(d.UNSUPPORTED,"Part.videoMetadata is not supported in the Gemini Developer API. Please remove this property.");const r={index:a.index,content:a.content,finishReason:a.finishReason,finishMessage:a.finishMessage,safetyRatings:n,citationMetadata:s,groundingMetadata:a.groundingMetadata,urlContextMetadata:a.urlContextMetadata};e.push(r)}),e}function Ms(t){const e=[];return(t.safetyRatings??[]).forEach(a=>{e.push({category:a.category,probability:a.probability,severity:a.severity??xt.HARM_SEVERITY_UNSUPPORTED,probabilityScore:a.probabilityScore??0,severityScore:a.severityScore??0,blocked:a.blocked})}),{blockReason:t.blockReason,safetyRatings:e,blockReasonMessage:t.blockReasonMessage}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ht=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;async function xs(t,e,n){const a=t.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),s=Us(a),[r,o]=s.tee(),{response:i,firstValue:c}=await $s(o,e,n);return{stream:Bs(r,e,n),response:i,firstValue:c}}async function $s(t,e,n){const[a,s]=t.tee(),r=a.getReader(),{value:o}=await r.read();return{firstValue:o,response:Fs(s,e,n)}}async function Fs(t,e,n){const a=[],s=t.getReader();for(;;){const{done:r,value:o}=await s.read();if(r){let i=Gs(a);return e.backend.backendType===T.GOOGLE_AI&&(i=Ue(i)),te(i,n)}a.push(o)}}async function*Bs(t,e,n){const a=t.getReader();for(;;){const{value:s,done:r}=await a.read();if(r)break;let o;e.backend.backendType===T.GOOGLE_AI?o=te(Ue(s),n):o=te(s,n);const i=o.candidates?.[0];!i?.content?.parts&&!i?.finishReason&&!i?.citationMetadata&&!i?.urlContextMetadata||(yield o)}}function Us(t){const e=t.getReader();return new ReadableStream({start(a){let s="";return r();function r(){return e.read().then(({value:o,done:i})=>{if(i){if(s.trim()){a.error(new u(d.PARSE_FAILED,"Failed to parse stream"));return}a.close();return}s+=o;let c=s.match(ht),l;for(;c;){try{l=JSON.parse(c[1])}catch{a.error(new u(d.PARSE_FAILED,`Error parsing JSON response: "${c[1]}`));return}a.enqueue(l),s=s.substring(c[0].length),c=s.match(ht)}return r()})}}})}function Gs(t){const n={promptFeedback:t[t.length-1]?.promptFeedback};for(const a of t)if(a.candidates)for(const s of a.candidates){const r=s.index||0;n.candidates||(n.candidates=[]),n.candidates[r]||(n.candidates[r]={index:s.index}),n.candidates[r].citationMetadata=s.citationMetadata,n.candidates[r].finishReason=s.finishReason,n.candidates[r].finishMessage=s.finishMessage,n.candidates[r].safetyRatings=s.safetyRatings,n.candidates[r].groundingMetadata=s.groundingMetadata;const o=s.urlContextMetadata;if(typeof o=="object"&&o!==null&&Object.keys(o).length>0&&(n.candidates[r].urlContextMetadata=o),s.content){if(!s.content.parts)continue;n.candidates[r].content||(n.candidates[r].content={role:s.content.role||"user",parts:[]});for(const i of s.content.parts){if("text"in i&&i.text==="")continue;if(Object.keys(i).length===0)throw new u(d.INVALID_CONTENT,"Part should have at least one property, but there are none. This is likely caused by a malformed response from the backend.");const c=O({...i});Object.keys(c).length>0&&n.candidates[r].content.parts.push(c)}}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hs=[d.FETCH_ERROR,d.ERROR,d.API_NOT_ENABLED];async function zt(t,e,n,a){if(!e)return{response:await a(),inferenceSource:v.IN_CLOUD};switch(e.mode){case E.ONLY_ON_DEVICE:if(await e.isAvailable(t))return{response:await n(),inferenceSource:v.ON_DEVICE};throw new u(d.UNSUPPORTED,"Inference mode is ONLY_ON_DEVICE, but an on-device model is not available.");case E.ONLY_IN_CLOUD:return{response:await a(),inferenceSource:v.IN_CLOUD};case E.PREFER_IN_CLOUD:try{return{response:await a(),inferenceSource:v.IN_CLOUD}}catch(s){if(s instanceof u&&Hs.includes(s.code)&&await e.isAvailable(t))return{response:await n(),inferenceSource:v.ON_DEVICE};throw s}case E.PREFER_ON_DEVICE:return await e.isAvailable(t)?{response:await n(),inferenceSource:v.ON_DEVICE}:{response:await a(),inferenceSource:v.IN_CLOUD};default:throw new u(d.ERROR,`Unexpected infererence mode: ${e.mode}`)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function js(t,e,n,a){return n=jt(n),t.backend.backendType===T.GOOGLE_AI&&(n=Vt(n)),xe({task:"streamGenerateContent",model:e,apiSettings:t,stream:!0,singleRequestOptions:a},JSON.stringify(n))}async function Wt(t,e,n,a,s){const r=await zt(n,a,()=>a.generateContentStream(n),()=>js(t,e,n,s));return xs(r.response,t,r.inferenceSource)}async function Vs(t,e,n,a){return n=jt(n),t.backend.backendType===T.GOOGLE_AI&&(n=Vt(n)),xe({model:e,task:"generateContent",apiSettings:t,stream:!1,singleRequestOptions:a},JSON.stringify(n))}async function qt(t,e,n,a,s){const r=await zt(n,a,()=>a.generateContent(n),()=>Vs(t,e,n,s)),o=await zs(r.response,t);return{response:te(o,r.inferenceSource)}}async function zs(t,e){const n=await t.json();return e.backend.backendType===T.GOOGLE_AI?Ue(n):n}/**
 * @license
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ft="SILENT_ERROR",pt=10;class Ws{constructor(e,n,a){this.params=n,this.requestOptions=a,this._history=[],this._sendPromise=Promise.resolve(),this._apiSettings=e}async getHistory(){return await this._sendPromise,P(this._history).map(e=>({...e,parts:e.parts?e.parts.map(O):[]}))}async _sendMessage(e,n){let a={};await this._sendPromise;const s=[];return this._sendPromise=this._sendPromise.then(async()=>{let r,o=0;const i=this.requestOptions?.maxSequentialFunctionCalls??pt;do{let c;if(r){o++;const f=await this._callFunctionsAsNeeded(r);c=V(f)}else c=V(e);const l=this._formatRequest(c,[...s]);s.push(c);const h=await this._callGenerateContent(l,n);if(h)if(a=h,r=this._getCallableFunctionCalls(h.response),h.response.candidates&&h.response.candidates.length>0){const f={parts:h.response.candidates?.[0].content.parts||[],role:h.response.candidates?.[0].content.role||"model"};s.push(P(f))}else{const f=N(h.response);f&&b.warn(`sendMessage() was unsuccessful. ${f}. Inspect response object for details.`)}else r=void 0}while(r&&o<i);r&&o>=i&&b.warn(`Automatic function calling exceeded the limit of ${i} function calls. Returning last model response.`)}),await this._sendPromise,this._history=this._history.concat(s),a}async _sendMessageStream(e,n){await this._sendPromise;const a=[],r=(async()=>{let o,i=0;const c=this.requestOptions?.maxSequentialFunctionCalls??pt;let l;do{let h;if(o){i++;const m=await this._callFunctionsAsNeeded(o);h=V(m)}else h=V(e);const f=this._formatRequest(h,[...a]);if(a.push(h),l=await this._callGenerateContentStream(f,n),o=this._getCallableFunctionCalls(l.firstValue),o&&l.firstValue&&l.firstValue.candidates&&l.firstValue.candidates.length>0){const m={...l.firstValue.candidates[0].content};m.role||(m.role="model"),a.push(m)}}while(o&&i<c);return o&&i>=c&&b.warn(`Automatic function calling exceeded the limit of ${c} function calls. Returning last model response.`),{stream:l.stream,response:l.response}})();return this._sendPromise=this._sendPromise.then(async()=>r).catch(o=>{throw new Error(ft)}).then(o=>o.response).then(o=>{if(o.candidates&&o.candidates.length>0){this._history=this._history.concat(a);const i={...o.candidates[0].content};i.role||(i.role="model"),this._history.push(P(i))}else{const i=N(o);i&&b.warn(`sendMessageStream() was unsuccessful. ${i}. Inspect response object for details.`)}}).catch(o=>{o.message!==ft&&o.name!=="AbortError"&&b.error(o)}),r}_getCallableFunctionCalls(e){const n=this.params?.tools?.find(s=>s.functionDeclarations);if(!n?.functionDeclarations)return;const a=Ut(e);if(a){for(const s of a)if(!n.functionDeclarations?.some(o=>o.name===s.name&&typeof o.functionReference=="function"))return;return a}}async _callFunctionsAsNeeded(e){const n=[],a=[],s=this.params?.tools?.find(r=>r.functionDeclarations);if(s&&s.functionDeclarations){for(const o of e){const i=s.functionDeclarations.find(c=>c.name===o.name);if(i?.functionReference){const c=Promise.resolve(i.functionReference(o.args)).catch(l=>{const h=new u(d.ERROR,`Error in user-defined function "${i.name}": ${l.message}`);throw h.stack=l.stack,h});n.push({name:o.name,id:o.id,results:c}),a.push(c)}}await Promise.all(a);const r=[];for(const{name:o,id:i,results:c}of n){const l={name:o,response:await c};i&&(l.id=i),r.push({type:"functionResponse",functionResponse:l})}return r}else throw new u(d.REQUEST_ERROR,'No function declarations were provided in "tools".')}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qs=["text","inlineData","functionCall","functionResponse","thought","thoughtSignature"],Ks={user:["text","inlineData","functionResponse"],function:["functionResponse"],model:["text","functionCall","thought","thoughtSignature"],system:["text"]},mt={user:["model"],function:["model"],model:["user","function"],system:[]};function Ys(t){let e=null;for(const n of t){const{role:a,parts:s}=n;if(!e&&a!=="user")throw new u(d.INVALID_CONTENT,`First Content should be with role 'user', got ${a}`);if(!dt.includes(a))throw new u(d.INVALID_CONTENT,`Each item should include role field. Got ${a} but valid roles are: ${JSON.stringify(dt)}`);if(!Array.isArray(s))throw new u(d.INVALID_CONTENT,"Content should have 'parts' property with an array of Parts");if(s.length===0)throw new u(d.INVALID_CONTENT,"Each Content should have at least one part");const r={text:0,inlineData:0,functionCall:0,functionResponse:0,thought:0,thoughtSignature:0,fileData:0,executableCode:0,codeExecutionResult:0};for(const i of s){if(i.type)r[i.type]+=1;else for(const c of["text","inlineData","functionCall","functionResponse","fileData","executableCode","codeExecutionResult"])c in i&&(r[c]+=1);"thought"in i&&i.thought&&(r.thought+=1),"thoughtSignature"in i&&i.thoughtSignature&&(r.thoughtSignature+=1)}const o=Ks[a];for(const i of qs)if(!o.includes(i)&&r[i]>0)throw new u(d.INVALID_CONTENT,`Content with role '${a}' can't contain '${i}' part`);if(e&&!mt[a].includes(e.role))throw new u(d.INVALID_CONTENT,`Content with role '${a}' can't follow '${e.role}'. Valid previous roles: ${JSON.stringify(mt)}`);e=n}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Js extends Ws{constructor(e,n,a,s,r){super(e,s,r),this.model=n,this.chromeAdapter=a,this.params=s,this.requestOptions=r,s?.history&&(Ys(s.history),this._history=P(s.history)),this.params?.systemInstruction!=null&&(this.params={...this.params,systemInstruction:$e(this.params.systemInstruction)})}_formatRequest(e,n){return{safetySettings:this.params?.safetySettings,generationConfig:this.params?.generationConfig,tools:this.params?.tools,toolConfig:this.params?.toolConfig,systemInstruction:this.params?.systemInstruction,contents:[...this._history,...n,e]}}_callGenerateContent(e,n){return qt(this._apiSettings,this.model,e,this.chromeAdapter,{...this.requestOptions,...n})}_callGenerateContentStream(e,n){return Wt(this._apiSettings,this.model,e,this.chromeAdapter,{...this.requestOptions,...n})}async sendMessage(e,n){return this._sendMessage(e,n)}async sendMessageStream(e,n){return this._sendMessageStream(e,n)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xs(t,e,n,a){n=Ns(n);let s="";if(t.backend.backendType===T.GOOGLE_AI){const o=Ps(n,e);s=JSON.stringify(o)}else s=JSON.stringify(n);return(await xe({model:e,task:"countTokens",apiSettings:t,stream:!1,singleRequestOptions:a},s)).json()}async function Qs(t,e,n,a,s){if(a?.mode===E.ONLY_ON_DEVICE)throw new u(d.UNSUPPORTED,"countTokens() is not supported for on-device models.");return Xs(t,e,n,s)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zs extends z{constructor(e,n,a,s){super(e,n.model),this.chromeAdapter=s,this.generationConfig=n.generationConfig||{},er(this.generationConfig),this.safetySettings=n.safetySettings||[],this.tools=n.tools,this.toolConfig=n.toolConfig,this.systemInstruction=$e(n.systemInstruction),this.requestOptions=a||{}}async initializeDeviceModel(e){if(!this.chromeAdapter||this.chromeAdapter.mode===E.ONLY_IN_CLOUD)return;if(await this.chromeAdapter.downloadIfAvailable(e)===A.UNAVAILABLE){const a=new u(d.API_NOT_ENABLED,"Local LanguageModel API not available in this environment.");if(this.chromeAdapter.mode===E.ONLY_ON_DEVICE)throw a;b.debug(a.message)}await this.chromeAdapter.downloadPromise}async generateContent(e,n){const a=pe(e);return qt(this._apiSettings,this.model,{generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,...a},this.chromeAdapter,{...this.requestOptions,...n})}async generateContentStream(e,n){const a=pe(e),{stream:s,response:r}=await Wt(this._apiSettings,this.model,{generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,...a},this.chromeAdapter,{...this.requestOptions,...n});return{stream:s,response:r}}startChat(e){return new Js(this._apiSettings,this.model,this.chromeAdapter,{tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,generationConfig:this.generationConfig,safetySettings:this.safetySettings,...e},this.requestOptions)}async countTokens(e,n){const a=pe(e);return Qs(this._apiSettings,this.model,a,this.chromeAdapter,{...this.requestOptions,...n})}}function er(t){if(t.thinkingConfig?.thinkingBudget!=null&&t.thinkingConfig?.thinkingLevel)throw new u(d.UNSUPPORTED,"Cannot set both thinkingBudget and thinkingLevel in a config.");if(t.responseSchema!=null&&t.responseJsonSchema!=null)throw new u(d.UNSUPPORTED,"Cannot set both responseSchema and responseJsonSchema in a config.");if((t.responseSchema!=null||t.responseJsonSchema!=null)&&t.responseMimeType!=="application/json"&&t.responseMimeType!=="text/x.enum")throw new u(d.UNSUPPORTED,'responseMimeType must be set to "application/json" or "text/x.enum" if responseSchema or responseJsonSchema are set.')}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tr(t=Ta(),e){t=Rn(t);const n=Oa(t,B),a=e?.backend??new ae,s=bs(a),r=n.getImmediate({identifier:s}),o=r.options;if(o){const i=e?.useLimitedUseAppCheckTokens,c=!!o.useLimitedUseAppCheckTokens;if(i!=null&&!!i!==c)throw new u(d.ALREADY_INITIALIZED,`getAI() has already been called for app "${t.name}" and this backend with useLimitedUseAppCheckTokens: ${c}. This option cannot be changed after the AI instance has been initialized. Pass the desired options to the first getAI() call for this app and backend, or omit useLimitedUseAppCheckTokens to reuse the existing instance.`);return r}return r.options={useLimitedUseAppCheckTokens:e?.useLimitedUseAppCheckTokens??!1},r}const nr=["mode","onDeviceParams","inCloudParams"];function ar(t,e,n){const a=e;let s;if(a.mode){for(const i of Object.keys(e))nr.includes(i)||b.warn(`When a hybrid inference mode is specified (mode is currently set to ${a.mode}), "${i}" cannot be configured at the top level. Configuration for in-cloud and on-device must be done separately in inCloudParams and onDeviceParams. Configuration values set outside of inCloudParams and onDeviceParams will be ignored.`);s=a.inCloudParams||{model:gs}}else s=e;if(!s.model)throw new u(d.NO_MODEL,"Must provide a model name. Example: getGenerativeModel({ model: 'my-model-name' })");const r=t.chromeAdapterFactory?.(a.mode,typeof window>"u"?void 0:window,a.onDeviceParams),o=new Zs(t,s,n,r);return o._apiSettings.inferenceMode=a.mode,o}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sr(){F(new M(B,_s,"PUBLIC").setMultipleInstances(!0)),L(ct,ve),L(ct,ve,"esm2020")}sr();const rr={formal:"Rewrite it in a formal, professional tone suitable for a business email. Use complete sentences and polite, precise wording.",casual:"Rewrite it in a friendly, casual tone, like a message to a colleague you know well. Keep it natural and warm, but still clear.",concise:"Rewrite it to be as concise as possible without losing any key information. Cut filler words and redundant phrases.",grammar:"Fix all grammar, spelling, and punctuation errors. Keep the original wording, tone, and meaning as close as possible — only correct what is wrong."};function or(t){const e=t.text.trim();switch(t.kind){case"summarize":return["Summarize the text below. Respond in the same language as the text.","Format your answer exactly like this:","First a summary paragraph of at most 3 sentences, then a blank line,",'then the line "Key points:" followed by 3 to 5 short bullet points,',"each starting with '- '.","","Text to summarize:",'"""',e,'"""'].join(`
`);case"rewrite":return[`Rewrite the text below. ${rr[t.rewriteStyle]}`,"Output only the rewritten text — no explanations, no quotation marks around it.","","Text to rewrite:",'"""',e,'"""'].join(`
`);case"translate":{const n=t.direction==="en-id"?"English":"Bahasa Indonesia",a=t.direction==="en-id"?"Bahasa Indonesia":"English";return[`Translate the text below from ${n} into natural, fluent ${a}.`,"Preserve the tone and formatting. Output only the translation.","","Text to translate:",'"""',e,'"""'].join(`
`)}}}function ir(t){return t==="on_device"?"on-device":"cloud"}function Kt(t){switch(t){case"on-device":return{label:"ON-DEVICE",className:"badge-device",blurb:"Answered by Gemini Nano inside Chrome. Nothing left this device — it works offline and costs nothing."};case"cloud":return{label:"CLOUD",className:"badge-cloud",blurb:"Answered by a cloud Gemini model through Firebase AI Logic (on-device was unavailable or not selected)."};case"demo":return{label:"DEMO MODE",className:"badge-demo",blurb:"Answered by the built-in demo engine — no AI model and no network. Add a Firebase config to go live."}}}const gt="gemini-3.5-flash-lite",cr={hybrid:E.PREFER_ON_DEVICE,device:E.ONLY_ON_DEVICE,cloud:E.ONLY_IN_CLOUD};class lr{kind="firebase";config;app=null;models=new Map;deviceModelReady=null;progressListener=null;constructor(e){this.config=e}ensureApp(){if(this.app)return this.app;const e=Dt(this.config),n=typeof location<"u"&&(location.hostname==="localhost"||location.hostname==="127.0.0.1");return n&&(globalThis.FIREBASE_APPCHECK_DEBUG_TOKEN=!0),n||console.info("[NanoScribe] App Check site key not set — AI Logic requests may be rejected while App Check enforcement is on. See README.md."),this.app=e,e}modelFor(e){const n=this.models.get(e);if(n)return n;const a=tr(this.ensureApp(),{backend:new ae}),s=ar(a,{mode:cr[e],inCloudParams:{model:gt}});return this.models.set(e,s),s}async prepareDeviceModel(e){this.progressListener=e,await this.ensureDeviceModel()}ensureDeviceModel(){return this.deviceModelReady||(this.deviceModelReady=(async()=>{try{await this.modelFor("hybrid").initializeDeviceModel(e=>{this.progressListener?.(e)})}catch(e){console.info("[NanoScribe] On-device model could not be initialised; hybrid requests will use the cloud model.",e)}})()),this.deviceModelReady}async run(e,n,a){await this.ensureDeviceModel();const s=this.modelFor(n),r=or(e),o=performance.now(),{stream:i,response:c}=await s.generateContentStream(r);let l="";for await(const m of i){const w=m.text();w&&(l+=w,a(l))}const h=await c;l||(l=h.text());const f=ir(h.inferenceSource);return{text:l,path:f,modelLabel:f==="on-device"?"Gemini Nano — on-device (Chrome Prompt API)":`${gt} — cloud (Firebase AI Logic)`,latencyMs:Math.max(1,Math.round(performance.now()-o))}}}function dr(){return an(ze)?new lr(ze):new fn}const ur=["Hybrid inference is changing how web apps use AI. Instead of sending every","request to a distant data centre, the browser first asks the model that","already lives on the user's device. That model answers in milliseconds,","works on a plane with no connection, and never sees a server log. When a","request is too hard, or the device has no local model, the same app quietly","falls back to a large cloud model. For a writing assistant this split is","ideal: quick summaries and translations stay private and free on the","device, while the cloud is reserved for work that truly needs it. Users","get speed and privacy, developers get lower bills, and nobody has to","choose between the two."].join(" "),hr=["Kecerdasan buatan kini dapat berjalan langsung di perangkat pengguna.","Model kecil di dalam peramban mampu meringkas teks dan menerjemahkan","kalimat tanpa koneksi internet, sehingga data pribadi tidak pernah","meninggalkan perangkat. Jika tugas terlalu berat, aplikasi yang sama","dapat meminta bantuan model besar di awan. Bagi penulis dan pelajar,","cara kerja ini sangat membantu: pekerjaan ringan selesai dengan cepat","dan gratis, sedangkan pekerjaan sulit tetap ditangani dengan baik.","Pengguna mendapat kecepatan dan privasi, dan pengembang menghemat biaya."].join(" "),Yt="nanoscribe-history",Jt=20;function g(t){const e=document.getElementById(t);if(!e)throw new Error(`Missing element #${t}`);return e}const U=g("input-text"),fr=g("char-count"),pr=g("rewrite-options"),mr=g("translate-options"),gr=g("rewrite-style"),br=g("translate-direction"),yr=g("routing-mode"),ke=g("run-btn"),W=g("prepare-btn"),x=g("prepare-note"),J=g("download-progress"),ne=g("result-badge"),me=g("result-meta"),ge=g("result-blurb"),H=g("error-box"),be=g("output"),$=g("copy-btn"),bt=g("stats-line"),ye=g("history-list"),X=g("pill-config"),yt=g("pill-device"),Et=g("pill-net"),wt=g("demo-banner"),Ge=dr();let Xt="summarize",De=null,C=Er();function Er(){try{const t=localStorage.getItem(Yt);if(!t)return[];const e=JSON.parse(t);return Array.isArray(e)?e:[]}catch{return[]}}function Qt(){try{localStorage.setItem(Yt,JSON.stringify(C.slice(0,Jt)))}catch{}}function He(){if(ye.replaceChildren(),C.length===0){const a=document.createElement("li");a.className="history-empty",a.textContent="Nothing yet — your runs will be listed here.",ye.append(a),bt.textContent="No runs yet this session.";return}for(const a of C){const s=document.createElement("li"),r=document.createElement("span"),o=Kt(a.path);r.className=`badge ${o.className}`,r.textContent=o.label;const i=document.createElement("span");i.textContent=`${a.at} · ${a.taskLabel} · ${a.modelLabel} · ${a.latencyMs.toLocaleString()} ms`,s.append(r,i),ye.append(s)}const t=C.length,e=C.filter(a=>a.path==="on-device").length,n=Math.round(C.reduce((a,s)=>a+s.latencyMs,0)/t);bt.textContent=`${t} run${t===1?"":"s"} recorded · ${e} answered on-device (${Math.round(e/t*100)}%) · average latency ${n.toLocaleString()} ms. Every on-device answer is a cloud call that never happened.`}function je(){const t=navigator.onLine;Et.textContent=t?"Network: online":"Network: offline",Et.className=`pill ${t?"pill-good":"pill-bad"}`}async function Zt(){const t=await tn();yt.textContent=`On-device: ${nn(t)}`,yt.className=`pill ${t==="available"?"pill-good":t==="unsupported"?"pill-bad":"pill-warn"}`}function wr(){Ge.kind==="firebase"?(X.textContent="Engine: Firebase AI Logic (live)",X.className="pill pill-good",wt.hidden=!0,W.disabled=!1,x.textContent="Downloads Gemini Nano in Chrome (once, ~1–2 GB) so hybrid requests can run on-device."):(X.textContent="Engine: demo mode (no Firebase config)",X.className="pill pill-warn",wt.hidden=!1,W.disabled=!0,x.textContent="On-device preparation activates once a real Firebase config is added.")}function en(t){Xt=t,document.querySelectorAll(".task-tab").forEach(e=>{const n=e.dataset.task===t;e.classList.toggle("is-active",n),e.setAttribute("aria-selected",String(n))}),pr.hidden=t!=="rewrite",mr.hidden=t!=="translate"}document.querySelectorAll(".task-tab").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.task;(e==="summarize"||e==="rewrite"||e==="translate")&&en(e)})});document.querySelectorAll(".sample-btn").forEach(t=>{t.addEventListener("click",()=>{U.value=t.dataset.sample==="id"?hr:ur,Ve(),U.focus()})});function Ve(){const t=U.value.length;fr.textContent=`${t.toLocaleString()} character${t===1?"":"s"}`}U.addEventListener("input",Ve);function _r(){return{kind:Xt,text:U.value,rewriteStyle:gr.value,direction:br.value}}function Ir(t){switch(t.kind){case"summarize":return"Summarize";case"rewrite":return`Rewrite (${t.rewriteStyle})`;case"translate":return t.direction==="en-id"?"Translate EN→ID":"Translate ID→EN"}}function _t(t,e=!1){ne.textContent=t,ne.className=`badge${e?" badge-busy":""}`}async function Cr(){const t=_r();if(H.hidden=!0,!t.text.trim()){H.textContent="Please paste or type some text first — or use one of the sample buttons.",H.hidden=!1,U.focus();return}ke.disabled=!0,$.disabled=!0,_t("WORKING…",!0),me.textContent="Streaming the answer…",ge.textContent="",be.textContent="";try{const e=yr.value,n=await Ge.run(t,e,s=>{be.textContent=s});De=n;const a=Kt(n.path);ne.textContent=a.label,ne.className=`badge ${a.className}`,me.textContent=`${n.modelLabel} · ${n.latencyMs.toLocaleString()} ms`,ge.textContent=a.blurb,be.textContent=n.text,$.disabled=!1,C.unshift({at:new Date().toLocaleTimeString(),taskLabel:Ir(t),path:n.path,modelLabel:n.modelLabel,latencyMs:n.latencyMs}),C=C.slice(0,Jt),Qt(),He()}catch(e){_t("ERROR"),me.textContent="The request failed.",ge.textContent="",H.textContent=e instanceof Error?e.message:String(e),H.hidden=!1}finally{ke.disabled=!1}}ke.addEventListener("click",()=>{Cr()});W.addEventListener("click",()=>{(async()=>{W.disabled=!0,J.hidden=!1,J.value=0,x.textContent="Preparing the on-device model…";try{await Ge.prepareDeviceModel(t=>{J.value=t,x.textContent=t>=1?"On-device model ready.":`Downloading Gemini Nano… ${Math.round(t*100)}%`}),x.textContent="On-device model prepared. Run a task in Hybrid mode and watch the badge."}catch(t){x.textContent=`Could not prepare the on-device model: ${t instanceof Error?t.message:String(t)}`}finally{J.hidden=!0,W.disabled=!1,Zt()}})()});$.addEventListener("click",()=>{(async()=>{if(De)try{await navigator.clipboard.writeText(De.text),$.textContent="Copied!",setTimeout(()=>{$.textContent="Copy"},1500)}catch{$.textContent="Copy failed"}})()});g("clear-history-btn").addEventListener("click",()=>{C=[],Qt(),He()});window.addEventListener("online",je);window.addEventListener("offline",je);en("summarize");Ve();wr();je();He();Zt();
