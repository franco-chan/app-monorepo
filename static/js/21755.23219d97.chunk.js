"use strict";(self.webpackChunkweb=self.webpackChunkweb||[]).push([[21755,48878],{250766:(t,e,r)=>{r.r(e),r.d(e,{KeyringHardware:()=>a});var n=r(887371),u=r(545754),o=r(411987),i=r(695058);function c(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=(0,i.default)(t);if(e){var u=(0,i.default)(this).constructor;r=Reflect.construct(n,arguments,u)}else r=n.apply(this,arguments);return(0,o.default)(this,r)}}var a=function(t){(0,u.default)(r,t);var e=c(r);function r(){return e.apply(this,arguments)}return(0,n.default)(r)}(r(479480).KeyringHardware)},66176:(t,e,r)=>{r.r(e),r.d(e,{KeyringHd:()=>b});var n=r(968079),u=r(634795),o=r(887371),i=r(545754),c=r(411987),a=r(695058),f=r(36832),l=r(344075),s=r.n(l),p=r(605851),d=r(111365),y=r(613549),v=r(940915),h=r(997293),g=r(278489),m=r(398145),R=r(16280),P=r(348834).Buffer;function B(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=(0,a.default)(t);if(e){var u=(0,a.default)(this).constructor;r=Reflect.construct(n,arguments,u)}else r=n.apply(this,arguments);return(0,c.default)(this,r)}}var b=function(t){(0,i.default)(r,t);var e=B(r);function r(){return e.apply(this,arguments)}return r.prototype.prepareAccounts=function(){var t=(0,u.default)((function*(t){var e=t.password,r=t.indexes,u=t.purpose,o=t.names,i=t.template,c=t.skipCheckAccountExist;(0,R.initBitcoinEcc)();var a=yield this.getNetworkImpl(),l=this.vault,d=l.getDefaultPurpose(),B=l.getCoinName(),b=l.getCoinType(),w=u||d,T=0!==r[0],x=[].concat((0,n.default)(T?[r[0]-1]:[]),(0,n.default)(r)),A=(0,R.getAccountDefaultByPurpose)(w,B).addressEncoding,k=(0,g.getAccountNameInfoByTemplate)(a,i).prefix,I=yield this.engine.dbApi.getCredential(this.walletId,e),C=I.seed,O=I.entropy,E=yield this.vault.getProvider(),K=E.network,S=(0,h.slicePathTemplate)(i).pathPrefix,N=(0,p.batchGetPublicKeys)("secp256k1",C,e,S,x.map((function(t){return`${t.toString()}'`})));if(N.length!==x.length)throw new v.OneKeyInternalError("Unable to get publick key.");var $=((K.segwitVersionBytes||{})[A]||K.bip32).public,W=[],X=0,H=(0,p.mnemonicFromEntropy)(O,e),D=(0,R.getBitcoinBip32)().fromSeed((0,f.mnemonicToSeedSync)(H));for(var _ of N){var U,F=_.path,M=_.parentFingerPrint,Y=_.extendedKey,L=D.derivePath(`${F}/0/0`),z=(0,R.getBitcoinECPair)().fromWIF(L.toWIF()),V=s().encode(P.concat([P.from($.toString(16).padStart(8,"0"),"hex"),P.from([3]),M,P.from((x[X]+2**31).toString(16).padStart(8,"0"),"hex"),Y.chainCode,Y.key])),q="0/0",G=E.xpubToAddresses(V,[q],A)[q],j=[y.COINTYPE_DOGE,y.COINTYPE_BCH].includes(b)?B:k,J=(o||[])[X]||`${j} #${x[X]+1}`,Q=V;if((0,R.isTaprootPath)(S)){var Z=(0,p.generateRootFingerprint)("secp256k1",C,e);Q=`tr([${`${Number(P.from(Z).readUInt32BE(0)||0).toString(16).padStart(8,"0")}${F.substring(1)}`}]${V}/<0;1>/*)`}if(!T||X>0)W.push({id:`${this.walletId}--${F}`,name:J,type:m.AccountType.UTXO,path:F,coinType:b,pub:z.publicKey.toString("hex"),xpub:V,xpubSegwit:Q,address:G,addresses:(U={},U[q]=G,U),template:i});if(1===x.length)break;if(c)X+=1;else{if(!((yield E.getAccount({type:"simple",xpub:Q||V},A)).txs>0))break;X+=1,yield new Promise((function(t){return setTimeout(t,200)}))}}return W}));return function(e){return t.apply(this,arguments)}}(),(0,o.default)(r)}(d.KeyringHd)},729278:(t,e,r)=>{r.r(e),r.d(e,{KeyringImported:()=>B});var n=r(817620),u=r.n(n),o=r(968079),i=r(634795),c=r(887371),a=r(545754),f=r(411987),l=r(695058),s=r(344075),p=r.n(s),d=r(478557),y=r(602219),v=r(940915),h=r(398145),g=r(755074),m=r(16280),R=r(348834).Buffer;function P(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=(0,l.default)(t);if(e){var u=(0,l.default)(this).constructor;r=Reflect.construct(n,arguments,u)}else r=n.apply(this,arguments);return(0,f.default)(this,r)}}var B=function(t){(0,a.default)(r,t);var e=P(r);function r(){return e.apply(this,arguments)}return r.prototype.prepareAccounts=function(){var t=(0,i.default)((function*(t){var e;(0,m.initBitcoinEcc)();var r,n=t.privateKey,i=t.name,c=t.template,a=yield this.vault.getProvider(),f=this.vault.getCoinType(),l="",s="",y=a.network,P=parseInt(n.slice(0,4).toString("hex"),16),B=[].concat((0,o.default)(Object.values(u()(y.segwitVersionBytes,g.AddressEncodings.P2TR))),[y.bip32]);for(var b of B)if(b.private===P){var w=d.secp256k1.publicFromPrivate(n.slice(46,78)),T=R.from(b.public.toString(16).padStart(8,"0"),"hex");try{l=p().encode(n.fill(T,0,4).fill(w,45,78)),s=w.toString("hex")}catch(I){console.error(I)}}if(""===l)throw new v.OneKeyInternalError("Invalid private key.");var x=l;c&&(c.startsWith("m/44'/")?r=g.AddressEncodings.P2PKH:c.startsWith("m/86'/")?(r=g.AddressEncodings.P2TR,x=`tr(${l})`):r=void 0);var A="0/0",k=a.xpubToAddresses(l,[A],r)[A];return Promise.resolve([{id:`imported--${f}--${l}--${r===g.AddressEncodings.P2TR?"86'/":""}`,name:i||"",type:h.AccountType.UTXO,path:"",coinType:f,pub:s,xpub:l,xpubSegwit:x,address:k,addresses:(e={},e[A]=k,e)}])}));return function(e){return t.apply(this,arguments)}}(),(0,c.default)(r)}(y.KeyringImported)},127839:(t,e,r)=>{r.r(e),r.d(e,{KeyringWatching:()=>d});var n=r(634795),u=r(887371),o=r(545754),i=r(411987),c=r(695058),a=r(520173),f=r(940915),l=r(398145),s=r(755074);function p(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=(0,c.default)(t);if(e){var u=(0,c.default)(this).constructor;r=Reflect.construct(n,arguments,u)}else r=n.apply(this,arguments);return(0,i.default)(this,r)}}var d=function(t){(0,o.default)(r,t);var e=p(r);function r(){return e.apply(this,arguments)}var i=r.prototype;return i.checkTargetXpubOrAddress=function(t){var e=t.target,r=t.provider,n=!0,u=!1;try{r.isValidXpub(e)||(n=!1)}catch(o){n=!1,console.error(o)}try{!n&&r.verifyAddress(e)&&(u=!0)}catch(o){u=!1,console.error(o)}if(!n&&!u)throw new f.InvalidAddress;return{isXpub:n,isAddress:u}},i.prepareAccounts=function(){var t=(0,n.default)((function*(t){var e;console.log("btcfork watching prepareAccount");var r,n=t.target,u=t.name,o=t.accountIdPrefix,i=t.template,c=yield this.vault.getProvider(),a=this.vault.getCoinType(),f=this.checkTargetXpubOrAddress({target:n,provider:c}),p=f.isXpub,d=f.isAddress,y=n;i&&p&&(i.startsWith("m/44'/")?r=s.AddressEncodings.P2PKH:i.startsWith("m/86'/")?(r=s.AddressEncodings.P2TR,y=`tr(${n})`):r=void 0);var v="0/0",h="";p?h=c.xpubToAddresses(n,[v],r)[v]:d&&(h=n);return[{id:`${o}--${a}--${n}--${r===s.AddressEncodings.P2TR?"86'/":""}`,name:u||"",type:l.AccountType.UTXO,path:"",coinType:a,xpub:p?n:"",xpubSegwit:p?y:"",address:h,addresses:(e={},e[v]=h,e)}]}));return function(e){return t.apply(this,arguments)}}(),(0,u.default)(r)}(a.KeyringWatching)},748878:(t,e,r)=>{r.r(e),r.d(e,{default:()=>R});var n=r(634795),u=r(887371),o=r(545754),i=r(411987),c=r(695058),a=r(690350),f=r(613549),l=r(997293),s=r(278489),p=r(250766),d=r(66176),y=r(729278),v=r(127839),h=r(613722),g=r(666574);function m(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=(0,c.default)(t);if(e){var u=(0,c.default)(this).constructor;r=Reflect.construct(n,arguments,u)}else r=n.apply(this,arguments);return(0,i.default)(this,r)}}var R=function(t){(0,o.default)(r,t);var e=m(r);function r(){for(var t,r=arguments.length,n=new Array(r),u=0;u<r;u++)n[u]=arguments[u];return(t=e.call.apply(e,[this].concat(n))).providerClass=h.default,t.keyringMap={hd:d.KeyringHd,hw:p.KeyringHardware,imported:y.KeyringImported,watching:v.KeyringWatching,external:v.KeyringWatching},t.settings=g.default,t}var i=r.prototype;return i.getDefaultPurpose=function(){return(0,l.getDefaultPurpose)(f.IMPL_BTC)},i.getCoinName=function(){return"BTC"},i.getCoinType=function(){return f.COINTYPE_BTC},i.getXprvReg=function(){return/^([xyz]prv)/},i.getXpubReg=function(){return/^([xyz]pub)/},i.getDefaultBlockNums=function(){return[25,5,1]},i.getDefaultBlockTime=function(){return 600},i.getAccountXpub=function(t){return t.xpubSegwit||t.xpub},i.canAutoCreateNextAccount=function(){var t=(0,n.default)((function*(t){var e=yield this.engine.getWallet(this.walletId),r=yield this.getAccountNameInfoMap();if("hd"!==e.type)return!1;var n=(0,l.getDefaultPurpose)(f.IMPL_BTC),u=r.default.template,o=e.nextAccountIds[u]||0,i=yield this.keyring.prepareAccounts({type:"SEARCH_ACCOUNTS",password:t,indexes:[o],purpose:n,coinType:f.COINTYPE_BTC,template:u});return yield this.checkAccountExistence((null==i?void 0:i[0]).xpub)}));return function(e){return t.apply(this,arguments)}}(),i.getAccountNameInfosByImportedOrWatchingCredential=function(){var t=(0,n.default)((function*(t){if(t.startsWith("xpub")||t.startsWith("xprv")){var e=(0,s.getAccountNameInfoByImpl)(f.IMPL_BTC);return Promise.resolve([e.BIP86,e.BIP44])}return Promise.resolve([])}));return function(e){return t.apply(this,arguments)}}(),(0,u.default)(r)}(a.default)},613722:(t,e,r)=>{r.r(e),r.d(e,{default:()=>m,tweakSigner:()=>g});var n=r(196234),u=r(634795),o=r(887371),i=r(545754),c=r(411987),a=r(695058),f=r(376314),l=r(797376),s=r(396564),p=r(882914),d=r(605415),y=r(16280),v=r(348834).Buffer;function h(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=(0,a.default)(t);if(e){var u=(0,a.default)(this).constructor;r=Reflect.construct(n,arguments,u)}else r=n.apply(this,arguments);return(0,c.default)(this,r)}}function g(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=new Uint8Array(t.buffer);if(!n)throw new Error("Private key is required for tweaking signer!");if(3===e[0]&&(n=d.default.privateNegate(n)),!n)throw new Error("Private key is required for tweaking signer!");var u,o,i=d.default.privateAdd(n,(u=(0,l.toXOnly)(e),o=r.tweakHash,f.crypto.taggedHash("TapTweak",v.concat(o?[u,o]:[u]))));if(!i)throw new Error("Invalid tweaked private key!");return(0,y.getBitcoinECPair)().fromPrivateKey(v.from(i),{network:r.network})}var m=function(t){(0,i.default)(r,t);var e=h(r);function r(){for(var t,r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return(t=e.call.apply(e,[this].concat(n))).getUTXOs=(0,s.memoizee)(function(){var e=(0,u.default)((function*(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t.blockbook.then((function(n){return n.getUTXOsFromBackendApi({xpub:e,impl:t.chainInfo.impl,options:r})}))}));return function(t){return e.apply(this,arguments)}}(),{promise:!0,max:1,maxAge:3e4}),t}return r.prototype.getBitcoinSigner=function(){var t=(0,u.default)((function*(t,e){var r=yield t.getPubkey(!0);return e.tapInternalKey?g(yield t.getPrvkey(),r,{network:this.network}):{publicKey:r,sign:function(){var e=(0,u.default)((function*(e){var r=yield t.sign(e);return(0,n.default)(r,1)[0]}));return function(t){return e.apply(this,arguments)}}()}}));return function(e,r){return t.apply(this,arguments)}}(),(0,o.default)(r)}(p.Provider)},21755:(t,e,r)=>{r.r(e),r.d(e,{default:()=>b});var n=r(634795),u=r(887371),o=r(545754),i=r(411987),c=r(695058),a=r(748878),f=r(613549),l=r(278489),s=r(613722);function p(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=(0,c.default)(t);if(e){var u=(0,c.default)(this).constructor;r=Reflect.construct(n,arguments,u)}else r=n.apply(this,arguments);return(0,i.default)(this,r)}}var d=function(t){(0,o.default)(r,t);var e=p(r);function r(){return e.apply(this,arguments)}return(0,u.default)(r)}(r(250766).KeyringHardware);function y(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=(0,c.default)(t);if(e){var u=(0,c.default)(this).constructor;r=Reflect.construct(n,arguments,u)}else r=n.apply(this,arguments);return(0,i.default)(this,r)}}var v=function(t){(0,o.default)(r,t);var e=y(r);function r(){return e.apply(this,arguments)}return(0,u.default)(r)}(r(66176).KeyringHd);function h(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=(0,c.default)(t);if(e){var u=(0,c.default)(this).constructor;r=Reflect.construct(n,arguments,u)}else r=n.apply(this,arguments);return(0,i.default)(this,r)}}var g=function(t){(0,o.default)(r,t);var e=h(r);function r(){return e.apply(this,arguments)}return(0,u.default)(r)}(r(729278).KeyringImported);function m(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=(0,c.default)(t);if(e){var u=(0,c.default)(this).constructor;r=Reflect.construct(n,arguments,u)}else r=n.apply(this,arguments);return(0,i.default)(this,r)}}var R=function(t){(0,o.default)(r,t);var e=m(r);function r(){return e.apply(this,arguments)}return(0,u.default)(r)}(r(127839).KeyringWatching),P=r(548313);function B(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=(0,c.default)(t);if(e){var u=(0,c.default)(this).constructor;r=Reflect.construct(n,arguments,u)}else r=n.apply(this,arguments);return(0,i.default)(this,r)}}var b=function(t){(0,o.default)(r,t);var e=B(r);function r(){for(var t,r=arguments.length,n=new Array(r),u=0;u<r;u++)n[u]=arguments[u];return(t=e.call.apply(e,[this].concat(n))).providerClass=s.default,t.keyringMap={hd:v,hw:d,imported:g,watching:R,external:R},t.settings=P.default,t}var i=r.prototype;return i.getDefaultPurpose=function(){return 49},i.getCoinName=function(){return"TEST"},i.getCoinType=function(){return f.COINTYPE_TBTC},i.getXprvReg=function(){return/^([tuv]prv)/},i.getXpubReg=function(){return/^([tuv]pub)/},i.getDefaultBlockNums=function(){return[25,5,1]},i.getDefaultBlockTime=function(){return 600},i.getAccountXpub=function(t){return t.xpubSegwit||t.xpub},i.getAccountNameInfosByImportedOrWatchingCredential=function(){var t=(0,n.default)((function*(t){if(t.startsWith("tpub")||t.startsWith("tprv")){var e=(0,l.getAccountNameInfoByImpl)(f.IMPL_TBTC);return Promise.resolve([e.BIP86,e.BIP44])}return Promise.resolve([])}));return function(e){return t.apply(this,arguments)}}(),i.canAutoCreateNextAccount=function(){var t=(0,n.default)((function*(t){return Promise.resolve(!1)}));return function(e){return t.apply(this,arguments)}}(),(0,u.default)(r)}(a.default)}}]);