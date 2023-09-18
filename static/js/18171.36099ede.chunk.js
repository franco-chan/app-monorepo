"use strict";(self.webpackChunkweb=self.webpackChunkweb||[]).push([[18171],{18171:(e,t,s)=>{s.r(t),s.d(t,{default:()=>b});var d=s(539144),l=s(468702),n=s(321668),a=s(170766),i=s(307061),u=s(10918),o=s(18861),r=s(634795),c=s(196234),f=s(202784),m=s(150489),p=s(531675),g=s(825756),y=s(465146),h=s(552322),x=s(210201),j=(0,s(324665).default)(),v=[{name:x.MonitorRoutes.monitorSetting,component:function(){var e=(0,f.useState)(y.default.getSettingBoolean(g.AppSettingKey.perf_switch)),t=(0,c.default)(e,2),s=t[0],d=t[1],x=(0,f.useState)(),j=(0,c.default)(x,2),v=j[0],b=j[1],B=(0,f.useState)(),S=(0,c.default)(B,2),T=S[0],w=S[1],I=(0,f.useState)(),M=(0,c.default)(I,2),N=M[0],C=M[1],U=(0,f.useState)(),D=(0,c.default)(U,2),F=D[0],H=D[1],R=(0,f.useState)(),k=(0,c.default)(R,2),L=k[0],P=k[1],V=(0,p.getMeasureTime)();return(0,f.useEffect)((function(){(0,r.default)((function*(){w(yield(0,p.getUsedBatterySinceStartup)()),b({commitHash:"75da7199a6d0f141317bff96119948a924ac54aa",brand:(0,m.getBrand)(),buildNumber:(0,m.getBuildNumber)()||"",deviceId:(0,m.getDeviceId)()||"",model:(0,m.getModel)(),systemName:(0,m.getSystemName)(),systemVersion:(0,m.getSystemVersion)()})}))();var e=(0,p.subscribeToMetrics)(P);return function(){e()}}),[]),(0,h.jsxs)(l.ScrollView,{p:4,flex:"1",bg:"background-hovered",children:[(0,h.jsx)(o.default,{py:4}),(0,h.jsx)(u.default.Heading,{children:"Enable Metrics Recording"}),(0,h.jsx)(i.default,{testID:"MetricsSwitch",mr:1,labelType:"false",isChecked:s,onToggle:function(){var e=!s;d(e),y.default.setSetting(g.AppSettingKey.perf_switch,e),e||((0,p.stopRecordingMetrics)(),P(void 0))}}),(0,h.jsx)(o.default,{py:4}),(0,h.jsx)(u.default.Heading,{children:"Upload metrics to regression Testing server"}),(0,h.jsxs)(o.default,{flex:1,w:"100%",children:[(0,h.jsx)(a.default,{testID:"UnitTestingNameInput",placeholder:"Unit testing name",onChangeText:C,value:N}),(0,h.jsx)(o.default,{py:1}),(0,h.jsx)(a.default,{testID:"UnitTestingPasswordInput",placeholder:"Password for uploading log file",value:F,onChangeText:H}),(0,h.jsx)(o.default,{py:1}),(0,h.jsx)(n.default,{testID:"UnitTestingUploadButton",type:"primary",onPress:(0,r.default)((function*(){try{if(N&&F&&v){(0,p.stopRecordingMetrics)();var e=yield(0,p.uploadMetricsInfo)(N,F,v);console.log("uploaded result",e),e.success?alert("file uploaded successfully"):alert(`${String(e.success)}, ${e.message}`)}else alert("Please input all fields")}catch(t){t instanceof Error&&alert(t.message)}})),children:"Upload"}),(0,h.jsx)(o.default,{py:1}),(0,h.jsx)(n.default,{testID:"UnitTestingClearButton",type:"primary",onPress:(0,r.default)((function*(){yield(0,p.clearLogFolder)(),alert("Clear successfully")})),children:"Clear Log Now"})]}),(0,h.jsx)(o.default,{py:4}),(0,h.jsx)(u.default.Heading,{children:"Living Data"}),(0,h.jsxs)(u.default.Body2,{children:["jsBundleLoadedTime: ",V.jsBundleLoadedTime]}),(0,h.jsxs)(u.default.Body2,{children:["fpTime: ",V.fpTime]}),(0,h.jsxs)(u.default.Body2,{children:["jsFps: ",null==L?void 0:L.jsFps]}),(0,h.jsxs)(u.default.Body2,{children:["uiFps: ",null==L?void 0:L.uiFps]}),(0,h.jsxs)(u.default.Body2,{children:["usedCpu: ",null==L?void 0:L.usedCpu.toFixed(2),"%"]}),(0,h.jsxs)(u.default.Body2,{children:["usedRam:"," ",`${(((null==L?void 0:L.usedRam)||0)/1024/1024).toFixed(2)} Mb`]}),(0,h.jsxs)(u.default.Body2,{children:["usedBattery: ",T]}),(0,h.jsx)(o.default,{py:4}),(0,h.jsx)(u.default.Heading,{children:"Device Info"}),(0,h.jsxs)(u.default.Body2,{children:["commitHash: ",null==v?void 0:v.commitHash]}),(0,h.jsxs)(u.default.Body2,{children:["brand: ",null==v?void 0:v.brand]}),(0,h.jsxs)(u.default.Body2,{children:["buildNumber: ",null==v?void 0:v.buildNumber]}),(0,h.jsxs)(u.default.Body2,{children:["deviceId: ",null==v?void 0:v.deviceId]}),(0,h.jsxs)(u.default.Body2,{children:["model: ",null==v?void 0:v.model]}),(0,h.jsxs)(u.default.Body2,{children:["systemName: ",null==v?void 0:v.systemName]}),(0,h.jsxs)(u.default.Body2,{children:["systemVersion: ",null==v?void 0:v.systemVersion]})]})}}];const b=function(){var e=(0,d.default)();return(0,h.jsx)(j.Navigator,{screenOptions:{headerShown:!1,animationEnabled:!!e},children:v.map((function(e){return(0,h.jsx)(j.Screen,{name:e.name,component:e.component},e.name)}))})}},210201:(e,t,s)=>{var d;s.r(t),s.d(t,{MonitorRoutes:()=>d}),function(e){e.monitorSetting="monitorSetting"}(d||(d={}))}}]);