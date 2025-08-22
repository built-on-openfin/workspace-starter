/******/ var __webpack_modules__ = ({

/***/ "../../node_modules/@openfin/excel/openfin.excel.mjs":
/*!***********************************************************!*\
  !*** ../../node_modules/@openfin/excel/openfin.excel.mjs ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdapterError: () => (/* binding */ Ne),
/* harmony export */   ApiError: () => (/* binding */ Se),
/* harmony export */   EventError: () => (/* binding */ De),
/* harmony export */   ExcelCellBorderLineStyle: () => (/* binding */ Ue),
/* harmony export */   ExcelCellHorizontalAlignment: () => (/* binding */ Fe),
/* harmony export */   ExcelCellPattern: () => (/* binding */ Pe),
/* harmony export */   ExcelCellVerticalAlignment: () => (/* binding */ xe),
/* harmony export */   ExcelFilterOperator: () => (/* binding */ Le),
/* harmony export */   InitializationError: () => (/* binding */ Be),
/* harmony export */   InvalidCellRangeAddressError: () => (/* binding */ je),
/* harmony export */   ParameterError: () => (/* binding */ Re),
/* harmony export */   disableLogging: () => (/* binding */ Oe),
/* harmony export */   enableLogging: () => (/* binding */ Ve),
/* harmony export */   getExcelApplication: () => (/* binding */ ze)
/* harmony export */ });
var e,t,r={d:(e,t)=>{for(var a in t)r.o(t,a)&&!r.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},a={};r.d(a,{dq:()=>AdapterError,MS:()=>ApiError,xQ:()=>EventError,sO:()=>We,Zu:()=>fe,I3:()=>$e,$U:()=>Ge,i0:()=>Ie,cX:()=>InitializationError,gH:()=>InvalidCellRangeAddressError,_W:()=>ParameterError,U$:()=>i,U7:()=>l,rd:()=>be});class ApiError extends Error{constructor(e="An unexpected error has occurred",t){var r;super(e),t&&(this.innerError=t&&t),this.stack=null===(r=this.stack)||void 0===r?void 0:r.replace(/^(\w*Error)/,`${this.constructor.name}`)}}class AdapterError extends ApiError{constructor(e="Failed to execute adapter function",t){super(e,t)}}class EventError extends ApiError{constructor(e="Failed to raise event",t){super(e,t)}}class InitializationError extends ApiError{constructor(e="Failed to initialize adapter",t){super(e,t)}}class InvalidCellRangeAddressError extends ApiError{constructor(e="The cell range address is not valid",t){super(e,t)}}class ParameterError extends ApiError{constructor(e="Invalid parameter value",t){super(e,t)}}!function(e){e.ActivateWorkbook="ActivateWorkbook",e.ActivateWorksheet="ActivateWorksheet",e.AddWorksheet="AddWorksheet",e.CalculateWorkbook="CalculateWorkbook",e.CalculateWorksheet="CalculateWorksheet",e.ClearAllCells="ClearAllCells",e.ClearAllCellValues="ClearAllCellValues",e.ClearAllCellFormatting="ClearAllCellFormatting",e.ClearCellValues="ClearCellValues",e.ClearCellFormatting="ClearCellFormatting",e.ClearCells="ClearCells",e.CloseWorkbook="CloseWorkbook",e.CreateWorkbook="CreateWorkbook",e.DeleteWorksheet="DeleteWorksheet",e.DeregisterEvent="DeregisterEvent",e.EventFired="EventFired",e.FilterCells="FilterCells",e.GetActiveWorksheet="GetActiveWorksheet",e.GetCalculationMode="GetCalculationMode",e.GetCellNames="GetCellNames",e.GetCells="GetCells",e.GetRangeAddress="GetRangeAddress",e.GetWorkbookById="GetWorkbookById",e.GetWorkbookFilePath="GetWorkbookFilePath",e.GetWorkbookName="GetWorkbookName",e.GetWorkbooks="GetWorkbooks",e.GetWorkbookWindowBounds="GetWorkbookWindowBounds",e.GetWorksheetById="GetWorksheetById",e.GetWorksheetByName="GetWorksheetByName",e.GetWorksheetName="GetWorksheetName",e.GetWorksheets="GetWorksheets",e.LogMessage="LogMessage",e.OpenWorkbook="OpenWorkbook",e.ProtectWorksheet="ProtectWorksheet",e.QuitApplication="QuitApplication",e.RegisterEvent="RegisterEvent",e.SaveWorkbook="SaveWorkbook",e.SaveWorkbookAs="SaveWorkbookAs",e.SetCellValues="SetCellValues",e.SetCellFormatting="SetCellFormatting",e.SetCellName="SetCellName",e.SetWorkbookWindowBounds="SetWorkbookWindowBounds",e.SetWorksheetName="SetWorksheetName"}(e||(e={})),function(e){e.Activate="Activate",e.ActivateWorksheet="ActivateWorksheet",e.AddWorksheet="AddWorksheet",e.Change="Change",e.Close="Close",e.Deactivate="Deactivate",e.DeleteWorksheet="DeleteWorksheet"}(t||(t={}));const o="1.5.0";let n=!1;const s="[@openfin/excel]",i=()=>{n=!1},l=()=>{n=!0,d(`v${o}`)},c=(e,t)=>{n&&(e.innerError?console.error(t?`${s} ${t}`:s,e,"\n\n(inner)",e.innerError):console.error(t?`${s} ${t}`:s,e))},d=(...e)=>{n&&console.log(s,...e)},h=(...e)=>{n&&console.warn(s,...e)};"undefined"==typeof fin&&Object.assign(window,{fin:{}}),Object.assign(fin,{Integrations:{Excel:{enableLogging:l,disableLogging:i}}});const w=new Map,p=async(r,a,o,n,s)=>{if(!a||!a.eventTarget||!a.objectId){const e=new EventError("Event registration missing required values");throw c(e),e}const i=Object.keys(t).find((e=>e.toLowerCase()===o.toLowerCase()));if(!i){const e=new EventError(`Unsupported event name: ${o}`);throw c(e),e}const l=Object.assign({eventName:t[i]},a);d("Registering event",l);try{const t=await r.dispatch(e.RegisterEvent,l),a={handler:s,listener:n};w.set(t,a)}catch(e){throw new AdapterError(void 0,e)}},k=(e,t)=>{const{eventRegistrationId:r}=e,a=w.get(r);if(!a)throw new EventError(`No registered event listener found for id: ${r}`);d("Event payload received",e),a.handler(e)},u=t=>async r=>{let a;for(const[e,t]of w)if(t.listener===r){a=e;break}if(!a)throw new EventError;d("Deregistering event:",a);try{await t.dispatch(e.DeregisterEvent,a),w.delete(a)}catch(e){throw new AdapterError}};var g;!function(e){e.Workbook="Workbook",e.Worksheet="Worksheet",e.CellRange="CellRange"}(g||(g={}));const m=()=>void 0!==crypto.randomUUID?crypto.randomUUID():"10000000-1000-4000-8000-100000000000".replace(/[018]/g,(e=>{const t=window.crypto.getRandomValues(new Uint8Array(1))[0]&15>>Number(e)/4;return(Number(e)^t).toString(16)})),C=new Map,y=(e,t)=>async(r,a)=>p(e,t,r,a,W(a)),v=(t,r,a)=>async()=>{d(`Cell range: Clear; address:${a} (${r})`);const o={address:a,objectId:r};try{await t.dispatch(e.ClearCells,o)}catch(e){throw new AdapterError}},b=(t,r,a)=>async()=>{d(`Cell range: Clear formatting; address:${a} (${r})`);const o={address:a,objectId:r};try{await t.dispatch(e.ClearCellFormatting,o)}catch(e){throw new AdapterError}},A=(t,r,a)=>async()=>{d(`Cell range: Clear values; address:${a} (${r})`);const o={address:a,objectId:r};try{await t.dispatch(e.ClearCellValues,o)}catch(e){throw new AdapterError}},E=(e,t,r)=>(a,o=1e3)=>{if(o<=0)throw new ApiError("Update interval must be a positive number");const n=m();d(`Cell range: Create data stream; streamId:${n}; address:${r}; updateInterval:${o} (${t})`);const s={address:r,close:()=>{d(`Closed stream (${n})`),(e=>{var t;try{const r=C.get(e);if(!r)throw new ApiError(`Unable to find registered data stream with id ${e}`);void 0!==(null!==(t=r.timer)&&void 0!==t?t:void 0)&&F(e),C.delete(e)}catch(e){throw c(e),e}})(n)},id:n,start:()=>{d(`Started streaming (${n})`),U(n,a,e,t)},stop:()=>{d(`Stopped streaming (${n})`),F(n)},updateInterval:o,worksheetId:t};return C.set(n,{dataStream:s}),s},W=e=>r=>{var a;try{if((null===(a=r.eventName)||void 0===a?void 0:a.toUpperCase())===t.Change.toUpperCase())return e(r.changedCells);throw new EventError(`Unexpected cell range event: ${r.eventName}`)}catch(e){c(e)}},f=(e,t,r)=>async()=>{d(`Cell range: Get cells; address:${r} (${t})`);const a=await $(e,t,r);return d(`${r}:`,a),a},$=async(t,r,a)=>{const o={address:a,objectId:r};try{return await t.dispatch(e.GetCells,o)}catch(e){throw new AdapterError}},G=(t,r,a)=>async()=>{d(`Cell range: Get name; address:${a} (${r})`);const o={address:a,objectId:r};try{return await t.dispatch(e.GetCellNames,o)}catch(e){throw new AdapterError}},I=(t,r,a)=>async(o,n,s,i,l=!0)=>{d(`Cell range: Set filter; address:${a} (${r})`,{columnIndex:o,filterOperator:n,criteria1:s,criteria2:i,visibleDropDown:l});const c={address:a,criteria1:s,criteria2:i,columnIndex:o,filterOperator:n,objectId:r,visibleDropDown:l};try{await t.dispatch(e.FilterCells,c)}catch(e){throw new AdapterError}},N=(t,r,a)=>async o=>{d(`Cell range: Set formatting; address:${a} (${r})`,o);const n={address:a,formatting:o,objectId:r};try{await t.dispatch(e.SetCellFormatting,n)}catch(e){throw new AdapterError}},S=(t,r,a)=>async o=>{const n=o.trim();let s;if(!n)throw s=new ParameterError("Name cannot be an empty string"),c(s),s;if(n.length>255)throw s=new ParameterError("Name must be 255 characters or less"),c(s),s;if(/[^a-zA-Z0-9_.?\\"']/.test(n))throw s=new ParameterError("Name contains invalid characters"),c(s),s;if(/^\d/.test(n))throw s=new ParameterError("Name cannot start with a number"),c(s),s;d(`Cell range: Set name; address:${a}; newName:${n} (${r})`);const i={address:a,name:n,objectId:r};try{await t.dispatch(e.SetCellName,i)}catch(e){throw new AdapterError}},D=(t,r,a)=>async o=>{d(`Cell range: Set values; address:${a} (${r})`,o);const n={address:a,objectId:r,valuesMap:o};try{await t.dispatch(e.SetCellValues,n)}catch(e){throw new AdapterError}},U=(e,t,r,a)=>{var o;try{const n=C.get(e);if(!n)throw new ApiError(`Unable to find registered data stream with id ${e}`);void 0!==(null!==(o=n.timer)&&void 0!==o?o:void 0)&&F(e);const{address:s,updateInterval:i}=n.dataStream,l=async()=>{const o=await t();try{await D(r,a,s)([[o]])}catch(t){h(`Unable to update cell range for stream with id ${e}: ${null==t?void 0:t.message}`)}},c=window.setInterval(l,i);n.timer=c}catch(e){throw c(e),e}},F=e=>{var t;try{const r=C.get(e);if(!r)throw new ApiError(`Unable to find registered data stream with id ${e}`);if(void 0===(null!==(t=r.timer)&&void 0!==t?t:void 0))return;window.clearInterval(r.timer),r.timer=void 0}catch(e){throw c(e),e}},P=(t,r)=>async()=>{d(`Worksheet: Activate (${r})`);try{await t.dispatch(e.ActivateWorksheet,r)}catch(e){throw new AdapterError}},x=(e,t)=>async(r,a)=>p(e,t,r,a,V(a)),L=(t,r)=>async()=>{d(`Worksheet: Calculate (${r})`);try{await t.dispatch(e.CalculateWorksheet,r)}catch(e){throw new AdapterError}},B=(t,r)=>async()=>{d(`Worksheet: Clear all cell formatting (${r})`);try{await t.dispatch(e.ClearAllCellFormatting,r)}catch(e){throw new AdapterError}},j=(t,r)=>async()=>{d(`Worksheet: Clear all cells (${r})`);try{await t.dispatch(e.ClearAllCells,r)}catch(e){throw new AdapterError}},R=(t,r)=>async()=>{d(`Worksheet: Clear all cell values (${r})`);try{await t.dispatch(e.ClearAllCellValues,r)}catch(e){throw new AdapterError}},O=(e,t)=>{const r={eventTarget:g.Worksheet,objectId:t};return{objectId:t,activate:P(e,t),addEventListener:x(e,r),calculate:L(e,t),clearAllCellFormatting:B(e,t),clearAllCells:j(e,t),clearAllCellValues:R(e,t),clearCellFormatting:r=>b(e,t,r)(),clearCells:r=>v(e,t,r)(),clearCellValues:r=>A(e,t,r)(),createDataStream:(r,a,o)=>E(e,t,r)(a,o),delete:z(e,t),filterCells:(r,a,o,n,s,i)=>I(e,t,r)(a,o,n,s,i),getCellRange:M(e,r),getCells:r=>f(e,t,r)(),getName:T(e,t),protect:H(e,t),removeEventListener:u(e),setCellFormatting:(r,a)=>N(e,t,r)(a),setCellName:(r,a)=>S(e,t,r)(a),setCellValues:(r,a)=>D(e,t,r)(a),setName:Q(e,t)}},V=e=>r=>{var a;try{switch(null===(a=r.eventName)||void 0===a?void 0:a.toUpperCase()){case t.Activate.toUpperCase():case t.Deactivate.toUpperCase():return e();case t.Change.toUpperCase():return e(r.changedCells);default:throw new EventError(`Unexpected worksheet event: ${r.eventName}`)}}catch(e){c(e)}},z=(t,r)=>async()=>{d(`Worksheet: Delete (${r})`);try{await t.dispatch(e.DeleteWorksheet,r)}catch(e){throw new AdapterError}},M=(t,r)=>async a=>{const{objectId:o}=r;d(`Worksheet: Get cell range; address:${a} (${o})`);try{const n={address:a,objectId:o},s=await t.dispatch(e.GetRangeAddress,n);return((e,t,r)=>{const{objectId:a}=t,o={cellRangeAddress:r,eventTarget:g.CellRange,objectId:a};return{addEventListener:y(e,o),address:r,clear:v(e,a,r),clearFormatting:b(e,a,r),clearValues:A(e,a,r),createDataStream:E(e,a,r),getCells:f(e,a,r),getNames:G(e,a,r),removeEventListener:u(e),setFilter:I(e,a,r),setFormatting:N(e,a,r),setName:S(e,a,r),setValues:D(e,a,r)}})(t,r,s)}catch(e){if(e.message.indexOf("Unable to get cell range")>=0){const e=new InvalidCellRangeAddressError;throw c(e),e}throw new AdapterError}},T=(t,r)=>async()=>{d(`Worksheet: Get name (${r})`);try{return await t.dispatch(e.GetWorksheetName,r)}catch(e){throw new AdapterError}},H=(t,r)=>async()=>{d(`Worksheet: Protect (${r})`);try{await t.dispatch(e.ProtectWorksheet,r)}catch(e){throw new AdapterError}},Q=(t,r)=>async a=>{const o=a.slice(0,31).replace(/[:\\/?*[\]]/g,"").trim();let n;if(!o)throw n=new ParameterError("Invalid worksheet name"),c(n),n;d(`Worksheet: Set name; newWorksheetName:${o} (${r})`);const s={newWorksheetName:o,objectId:r};try{return await t.dispatch(e.SetWorksheetName,s)}catch(e){throw new AdapterError}},_=(t,r)=>async()=>{d(`Workbook: Activate (${r})`);try{return await t.dispatch(e.ActivateWorkbook,r)}catch(e){throw new AdapterError}},q=(e,t)=>async(r,a)=>p(e,t,r,a,Y(e,a)),J=(t,r)=>async()=>{let a;d(`Workbook: Add worksheet (${r})`);try{a=await t.dispatch(e.AddWorksheet,r)}catch(e){throw new AdapterError}return O(t,a)},K=(t,r)=>async()=>{d(`Workbook: Calculate (${r})`);try{await t.dispatch(e.CalculateWorkbook,r)}catch(e){throw new AdapterError}},X=(t,r)=>async()=>{d(`Workbook: Close (${r})`);try{return await t.dispatch(e.CloseWorkbook,r)}catch(e){throw new AdapterError}},Z=(e,t)=>{const r={eventTarget:g.Workbook,objectId:t};return{objectId:t,activate:_(e,t),addWorksheet:J(e,t),addEventListener:q(e,r),calculate:K(e,t),close:X(e,t),getActiveWorksheet:ee(e,t),getCalculationMode:te(e,t),getFilePath:re(e,t),getName:ae(e,t),getWindowBounds:oe(e,t),getWorksheetByName:ne(e,t),getWorksheets:se(e,t),removeEventListener:u(e),save:ie(e,t),saveAs:le(e,t),setWindowBounds:ce(e,t)}},Y=(e,r)=>a=>{var o;try{switch(null===(o=a.eventName)||void 0===o?void 0:o.toUpperCase()){case t.Activate.toUpperCase():case t.Close.toUpperCase():case t.Deactivate.toUpperCase():return r();case t.ActivateWorksheet.toUpperCase():case t.AddWorksheet.toUpperCase():return r(O(e,a.worksheetObjectId));case t.DeleteWorksheet.toUpperCase():return r(a.worksheetName);default:throw new EventError(`Unexpected workbook event: ${a.eventName}`)}}catch(e){c(e)}},ee=(t,r)=>async()=>{let a;d(`Workbook: Get active worksheet: (${r})`);try{a=await t.dispatch(e.GetActiveWorksheet,r)}catch(e){throw new AdapterError}return O(t,a)},te=(t,r)=>async()=>{d("Workbook: Get calculation mode");try{return await t.dispatch(e.GetCalculationMode,r)}catch(e){throw new AdapterError}},re=(t,r)=>async()=>{d(`Workbook: Get file path (${r})`);try{return await t.dispatch(e.GetWorkbookFilePath,r)}catch(e){throw new AdapterError}},ae=(t,r)=>async()=>{d(`Workbook: Get name (${r})`);try{return await t.dispatch(e.GetWorkbookName,r)}catch(e){throw new AdapterError}},oe=(t,r)=>async()=>{d(`Workbook: Get window bounds (${r})`);try{return await t.dispatch(e.GetWorkbookWindowBounds,r)}catch(e){throw new AdapterError}},ne=(t,r)=>async a=>{let o;d(`Workbook: Get worksheet by name: ${a} (${r})`);try{if(o=await t.dispatch(e.GetWorksheetByName,{objectId:r,worksheetName:a}),null===o)return null}catch(e){throw new AdapterError}return O(t,o)},se=(t,r)=>async()=>{let a;d(`Workbook: Get worksheets (${r})`);try{a=await t.dispatch(e.GetWorksheets,r)}catch(e){throw new AdapterError}return a.map((e=>O(t,e)))},ie=(t,r)=>async()=>{d(`Workbook: Save (${r})`);try{return await t.dispatch(e.SaveWorkbook,r)}catch(e){throw new AdapterError}},le=(t,r)=>async a=>{d(`Workbook: Save as; filePath:${a} (${r})`);try{return await t.dispatch(e.SaveWorkbookAs,{filePath:a,objectId:r})}catch(e){throw new AdapterError}},ce=(t,r)=>async a=>{d(`Workbook: Set window bounds (${r})`,a);const{height:o,left:n,top:s,width:i}=a;if(null!=o&&(Number.isNaN(o)||o<=0)){const e=new ParameterError("Workbook window height must be a number greater than zero.");throw c(e),e}if(null!=n&&Number.isNaN(n)){const e=new ParameterError("Workbook window left position must be a valid number.");throw c(e),e}if(null!=s&&Number.isNaN(s)){const e=new ParameterError("Workbook window top position must be a valid number.");throw c(e),e}if(null!=i&&(Number.isNaN(i)||i<=0)){const e=new ParameterError("Workbook window width must be a number greater than zero.");throw c(e),e}const l={newWindowBounds:a,objectId:r};try{return await t.dispatch(e.SetWorkbookWindowBounds,l)}catch(e){throw new AdapterError}},de=t=>async r=>{let a;d(`Application: Get workbook; id:${r}`);try{a=await t.dispatch(e.GetWorkbookById,r)}catch(e){throw new AdapterError}return Z(t,a)},he=t=>async()=>{let r;d("Application: Get workbooks");try{r=await t.dispatch(e.GetWorkbooks)}catch(e){throw new AdapterError}return r.map((e=>Z(t,e)))},we=t=>async r=>{d(`Application: Get worksheet; id:${r}`);try{r=await t.dispatch(e.GetWorksheetById,r)}catch(e){throw new AdapterError}return O(t,r)},pe=t=>async r=>{let a;d(`Application: Open workbook; filePath:${r}`);try{a=await t.dispatch(e.OpenWorkbook,r)}catch(e){throw new AdapterError}return Z(t,a)},ke=t=>async(r=!0)=>{d(`Application: Quit; displayAlerts:${r}`);try{return await t.dispatch(e.QuitApplication,r)}catch(e){throw new AdapterError}};var ue,ge;!function(e){e.ExcelApplication="EXCEL-APP"}(ue||(ue={})),function(e){e[e.Info=1]="Info",e[e.Warn=2]="Warn",e[e.Error=3]="Error"}(ge||(ge={}));const me="excel-adapter",Ce=m();let ye;const ve=()=>o,be=async(t=!1)=>{try{if(await(async e=>{try{d("Registering usage"),await fin.System.registerUsage({type:"integration-feature",data:{apiVersion:o,componentName:e}})}catch(t){h(`Unable to register usage for feature ${e}: ${null==t?void 0:t.message}`)}})(ue.ExcelApplication),!await(async e=>(await fin.InterApplicationBus.Channel.getAllChannels()).some((t=>t.channelName===e)))(Ce)){await(async()=>{var e;const t=null===(e=(await fin.Application.getCurrentSync().getManifest()).appAssets)||void 0===e?void 0:e.find((e=>e.alias===me));if(t)return void h("Detected adapter package in app manifest appAssets",t);if(await Ee())return void d("Using existing adapter package");const r={alias:me,src:`https://cdn.openfin.co/release/integrations/excel/${ve()}/OpenFin.Excel.zip`,target:"OpenFin.Excel.exe",version:ve()};d("Downloading adapter package",r);try{await fin.System.downloadAsset(r,(()=>{}))}catch(e){throw c("Unable to download adapter package"),e}})();const{securityRealm:e,port:r}=await fin.System.getRuntimeInfo();let{licenseKey:a}=await fin.Application.getCurrentSync().getManifest();a=null!=a?a:"NO_LICENSE_KEY";const o=fin.me.uuid;d("Initializing adapter",{adapterLoggingEnabled:t,channelName:Ce,licenseKey:a,port:r,securityRealm:e,uuid:o}),fin.System.launchExternalProcess({alias:me,arguments:`${o} ${a} ${r} ${e} ${Ce} ${t}`})}const r=fin.InterApplicationBus.Channel.connect(Ce,{payload:{version:ve()}}),a=new Promise((e=>{setTimeout(e,2e4)})).then((()=>{throw new Error("Connection to adapter timed out")}));ye=await Promise.race([r,a]),d(`Connected to adapter ${ye.providerIdentity.uuid} on channel ${Ce}`),ye.register(e.LogMessage,Ae),ye.register(e.EventFired,k)}catch(e){const t=new InitializationError(void 0,e);throw c(t),t}return{adapter:{channelName:Ce,version:ve()},createWorkbook:(r=ye,async()=>{let t;d("Application: Create workbook");try{t=await r.dispatch(e.CreateWorkbook)}catch(e){throw new AdapterError}return Z(r,t)}),getWorkbookById:de(ye),getWorkbooks:he(ye),getWorksheetById:we(ye),openWorkbook:pe(ye),quit:ke(ye)};// removed by dead control flow
 var r; },Ae=(e,t)=>{const{message:r,type:a}=e,o="[adapter]";switch(a){case ge.Error:c(r,o);break;case ge.Info:d(o,r);break;case ge.Warn:h(o,r);break;default:c(new Error(`Unknown log type: ${a}`))}},Ee=async()=>{try{const e=await fin.System.getAppAssetInfo({alias:me});return e&&e.version===ve()}catch(e){return!1}};var We,fe,$e,Ge,Ie;!function(e){e.Continuous="Continuous",e.Dash="Dash",e.DashDot="DashDot",e.DashDotDot="DashDotDot",e.Dot="Dot",e.Double="Double",e.SlantDashDot="SlantDashDot",e.None="None"}(We||(We={})),function(e){e.Center="Center",e.CenterAcrossSelection="CenterAcrossSelection",e.Distributed="Distributed",e.Fill="Fill",e.General="General",e.Justify="Justify",e.Left="Left",e.Right="Right"}(fe||(fe={})),function(e){e.Automatic="Automatic",e.Checker="Checker",e.CrissCross="CrissCross",e.Down="Down",e.Gray16="Gray16",e.Gray25="Gray25",e.Gray50="Gray50",e.Gray75="Gray75",e.Gray8="Gray8",e.Grid="Grid",e.Horizontal="Horizontal",e.LightDown="LightDown",e.LightHorizontal="LightHorizontal",e.LightUp="LightUp",e.LightVertical="LightVertical",e.LinearGradient="LinearGradient",e.None="None",e.RectangularGradient="RectangularGradient",e.SemiGray75="SemiGray75",e.Solid="Solid",e.Up="Up",e.Vertical="Vertical"}($e||($e={})),function(e){e.Bottom="Bottom",e.Center="Center",e.Distributed="Distributed",e.Justify="Justify",e.Top="Top"}(Ge||(Ge={})),function(e){e.And="And",e.Or="Or",e.Top10Items="Top10Items",e.Bottom10Items="Bottom10Items",e.Top10Percent="Top10Percent",e.Bottom10Percent="Bottom10Percent",e.FilterValues="FilterValues"}(Ie||(Ie={}));var Ne=a.dq,Se=a.MS,De=a.xQ,Ue=a.sO,Fe=a.Zu,Pe=a.I3,xe=a.$U,Le=a.i0,Be=a.cX,je=a.gH,Re=a._W,Oe=a.U$,Ve=a.U7,ze=a.rd;

/***/ }),

/***/ "./client/src/excel.ts":
/*!*****************************!*\
  !*** ./client/src/excel.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeDown: () => (/* binding */ closeDown),
/* harmony export */   init: () => (/* binding */ init),
/* harmony export */   launchExcel: () => (/* binding */ launchExcel)
/* harmony export */ });
/* harmony import */ var _openfin_excel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @openfin/excel */ "../../node_modules/@openfin/excel/openfin.excel.mjs");

let excel;
/**
 * The interop clients for the different contexts.
 */
let interopClients;
let settings;
let workbookFound;
/**
 * Initialize the Excel interop.
 * @param excelSettings The settings to use for initializing the Excel interop.
 */
async function init(excelSettings) {
    if (!settings) {
        settings = excelSettings;
        const brokerClient = fin.Interop.connectSync(fin.me.identity.uuid, {});
        const contextGroups = await brokerClient.getContextGroups();
        interopClients = {};
        for (const contextGroup of contextGroups) {
            const contextClient = fin.Interop.connectSync(fin.me.identity.uuid, {});
            await contextClient.joinContextGroup(contextGroup.id);
            await contextClient.addContextHandler(async (ctx) => {
                await handleContext(contextGroup.id, ctx);
            });
            interopClients[contextGroup.id] = contextClient;
        }
        (0,_openfin_excel__WEBPACK_IMPORTED_MODULE_0__.enableLogging)();
    }
}
/**
 * Get the Excel application.
 * @param assetSettings The settings to use for getting the Excel application.
 * @returns The Excel application.
 */
async function launchExcel(assetSettings) {
    const assetAvailable = await getAppAsset();
    if (!assetAvailable) {
        return false;
    }
    await fin.System.launchExternalProcess({
        alias: settings?.appAsset.alias
    });
    // The workbook is not always available immediately, so start a background process
    // to wait for the workbook being ready
    await listenToExcel(assetSettings);
    return true;
}
/**
 * Listen to the Excel application.
 * @param assetSettings The settings to use for listening to the Excel application.
 * @param tryCount The number of times the function has been called.
 * @returns A promise that resolves when the Excel application is available.
 */
async function listenToExcel(assetSettings, tryCount = 0) {
    if (tryCount === 10) {
        console.error("Excel workbook not available after 10 attempts");
        return;
    }
    if (workbookFound) {
        console.info("Workbook already found");
        return;
    }
    setTimeout(async () => {
        const excelInstance = await getExcel();
        if (excelInstance) {
            const workbooks = await excelInstance.getWorkbooks();
            if (workbooks.length === 0) {
                tryCount++;
                await listenToExcel(assetSettings, tryCount);
            }
            else {
                workbookFound = false;
                for (const workbook of workbooks) {
                    const name = await workbook.getName();
                    if (name === assetSettings.workbook) {
                        for (const worksheetSettings of assetSettings.worksheets) {
                            const worksheet = await workbook.getWorksheetByName(worksheetSettings.name);
                            if (worksheet) {
                                workbookFound = true;
                                await worksheet.addEventListener("change", async (cells) => {
                                    await handleCellChanges(assetSettings, worksheetSettings, cells);
                                });
                            }
                        }
                    }
                }
                if (!workbookFound) {
                    tryCount++;
                    await listenToExcel(assetSettings, tryCount);
                }
            }
        }
    }, 1000);
}
/**
 * Do any cleanup that is required.
 */
async function closeDown() {
    for (const client in interopClients) {
        await interopClients[client].removeFromContextGroup();
    }
    interopClients = {};
}
/**
 * Gets the configured app asset and ensures it is available.
 * @returns A boolean indicating if the app asset is available.
 */
async function getAppAsset() {
    let availableAppAsset;
    try {
        if (settings?.appAsset !== undefined) {
            availableAppAsset = await fin.System.getAppAssetInfo({ alias: settings.appAsset.alias });
        }
    }
    catch (appAssetError) {
        console.debug(`App asset info for alias: ${settings?.appAsset.alias} is not available. Response from getAppAssetInfo`, appAssetError);
    }
    if ((availableAppAsset === undefined || settings?.appAsset.version !== availableAppAsset.version) &&
        settings?.appAsset !== undefined) {
        console.info(`App asset with alias: ${settings?.appAsset.alias} does not exist in memory. Fetching it.`);
        try {
            await fin.System.downloadAsset(settings.appAsset, (progress) => {
                const downloadedPercent = Math.floor((progress.downloadedBytes / progress.totalBytes) * 100);
                console.info(`Downloaded ${downloadedPercent}% of app asset with alias of ${settings?.appAsset.alias}`);
            });
        }
        catch (error) {
            console.error(`Error trying to download app asset with alias: ${settings?.appAsset.alias}`, error);
            return false;
        }
    }
    return true;
}
/**
 * Get the excel application.
 * @returns The application.
 * @internal
 */
async function getExcel() {
    try {
        excel = await (0,_openfin_excel__WEBPACK_IMPORTED_MODULE_0__.getExcelApplication)();
        return excel;
    }
    catch (err) {
        console.error("Error getting Excel application", err);
    }
}
/**
 * Handle the cell changes.
 * @param excelAsset The asset to use for processing the cell changes.
 * @param worksheet The asset to use for processing the cell changes.
 * @param cells The cells that have changed.
 */
async function handleCellChanges(excelAsset, worksheet, cells) {
    if (interopClients && worksheet.cellHandlers) {
        for (const cell of cells) {
            const cellHandler = worksheet.cellHandlers.find((c) => c.cell === cell.address);
            if (cellHandler) {
                const client = interopClients[cellHandler.contextGroup];
                if (client &&
                    (cellHandler.types.includes("instrument") || cellHandler.types.includes("fdc3.instrument"))) {
                    await client.setContext({
                        type: "fdc3.instrument",
                        id: {
                            ticker: cell.value,
                            _source: `excel.${excelAsset.workbook}.${worksheet.name}`
                        }
                    });
                }
            }
        }
    }
}
/**
 * Handle a context.
 * @param contextGroup The group receiving the context.
 * @param context The context being received.
 */
async function handleContext(contextGroup, context) {
    if (settings?.asset) {
        const excelInstance = await getExcel();
        if (excelInstance) {
            const workbooks = await excelInstance.getWorkbooks();
            for (const workbook of workbooks) {
                const workbookName = await workbook.getName();
                const connectedWorkbook = settings?.asset;
                if (connectedWorkbook?.worksheets) {
                    for (const worksheetSettings of connectedWorkbook.worksheets) {
                        if (worksheetSettings.cellHandlers) {
                            const incomingSource = `excel.${workbookName}.${worksheetSettings.name}`;
                            if (incomingSource !== context?.id?._source) {
                                const cellHandlers = worksheetSettings.cellHandlers?.filter((ch) => ch.contextGroup === contextGroup && ch.types.includes(context.type));
                                for (const cellHandler of cellHandlers) {
                                    const worksheet = await workbook.getWorksheetByName(worksheetSettings.name);
                                    if (worksheet) {
                                        let cellValue;
                                        if (context.type === "fdc3.instrument" || context.type === "instrument") {
                                            cellValue = context.id?.ticker;
                                        }
                                        if (cellValue !== undefined) {
                                            await worksheet.setCellValues(cellHandler.cell, [[cellValue]]);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}


/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************************!*\
  !*** ./client/src/excel-window.ts ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _excel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./excel */ "./client/src/excel.ts");

window.addEventListener("DOMContentLoaded", async () => {
    const root = "https://built-on-openfin.github.io/workspace-starter/workspace/v22.0.0/integrate-with-excel";
    const excelSettings = {
        appAsset: {
            alias: "excel-interop-example.xlsx",
            version: "0.0.5",
            src: `${root}/assets/excel-interop-example.zip`,
            target: "excel-interop-example.xlsx"
        },
        icon: `${root}/assets/excel.svg`,
        asset: {
            title: "Excel Interop Example",
            description: "Demonstrate interop with Excel workbook",
            workbook: "excel-interop-example.xlsx",
            worksheets: [
                {
                    name: "Sheet1",
                    cellHandlers: [
                        {
                            cell: "$B$3",
                            types: ["instrument", "fdc3.instrument"],
                            contextGroup: "green"
                        },
                        {
                            cell: "$B$4",
                            types: ["instrument", "fdc3.instrument"],
                            contextGroup: "purple"
                        },
                        {
                            cell: "$B$5",
                            types: ["instrument", "fdc3.instrument"],
                            contextGroup: "orange"
                        },
                        {
                            cell: "$B$6",
                            types: ["instrument", "fdc3.instrument"],
                            contextGroup: "red"
                        },
                        {
                            cell: "$B$7",
                            types: ["instrument", "fdc3.instrument"],
                            contextGroup: "pink"
                        },
                        {
                            cell: "$B$8",
                            types: ["instrument", "fdc3.instrument"],
                            contextGroup: "yellow"
                        }
                    ]
                }
            ]
        }
    };
    await (0,_excel__WEBPACK_IMPORTED_MODULE_0__.init)(excelSettings);
    await (0,_excel__WEBPACK_IMPORTED_MODULE_0__.launchExcel)(excelSettings.asset);
});

})();


//# sourceMappingURL=excel.bundle.js.map