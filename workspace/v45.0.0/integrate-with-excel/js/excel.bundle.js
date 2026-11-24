/******/ var __webpack_modules__ = ({

/***/ "./client/src/excel.ts"
/*!*****************************!*\
  !*** ./client/src/excel.ts ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
        ;(0,_openfin_excel__WEBPACK_IMPORTED_MODULE_0__.enableLogging)();
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


/***/ },

/***/ "../../node_modules/@openfin/excel/openfin.excel.mjs"
/*!***********************************************************!*\
  !*** ../../node_modules/@openfin/excel/openfin.excel.mjs ***!
  \***********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdapterError: () => (/* binding */ AdapterError),
/* harmony export */   ApiError: () => (/* binding */ ApiError),
/* harmony export */   EventError: () => (/* binding */ EventError),
/* harmony export */   ExcelCellBorderLineStyle: () => (/* binding */ be),
/* harmony export */   ExcelCellHorizontalAlignment: () => (/* binding */ We),
/* harmony export */   ExcelCellPattern: () => (/* binding */ Ae),
/* harmony export */   ExcelCellVerticalAlignment: () => (/* binding */ Ee),
/* harmony export */   ExcelFilterOperator: () => (/* binding */ fe),
/* harmony export */   InitializationError: () => (/* binding */ InitializationError),
/* harmony export */   InvalidCellRangeAddressError: () => (/* binding */ InvalidCellRangeAddressError),
/* harmony export */   ParameterError: () => (/* binding */ ParameterError),
/* harmony export */   disableLogging: () => (/* binding */ o),
/* harmony export */   enableLogging: () => (/* binding */ n),
/* harmony export */   getExcelApplication: () => (/* binding */ Ce)
/* harmony export */ });
class ApiError extends Error{constructor(e="An unexpected error has occurred",t){var r;super(e),t&&(this.innerError=t&&t),this.stack=null===(r=this.stack)||void 0===r?void 0:r.replace(/^(\w*Error)/,`${this.constructor.name}`)}}class AdapterError extends ApiError{constructor(e="Failed to execute adapter function",t){super(e,t)}}class EventError extends ApiError{constructor(e="Failed to raise event",t){super(e,t)}}class InitializationError extends ApiError{constructor(e="Failed to initialize adapter",t){super(e,t)}}class InvalidCellRangeAddressError extends ApiError{constructor(e="The cell range address is not valid",t){super(e,t)}}class ParameterError extends ApiError{constructor(e="Invalid parameter value",t){super(e,t)}}var e,t;!function(e){e.ActivateWorkbook="ActivateWorkbook",e.ActivateWorksheet="ActivateWorksheet",e.AddWorksheet="AddWorksheet",e.CalculateWorkbook="CalculateWorkbook",e.CalculateWorksheet="CalculateWorksheet",e.ClearAllCells="ClearAllCells",e.ClearAllCellValues="ClearAllCellValues",e.ClearAllCellFormatting="ClearAllCellFormatting",e.ClearCellValues="ClearCellValues",e.ClearCellFormatting="ClearCellFormatting",e.ClearCells="ClearCells",e.CloseWorkbook="CloseWorkbook",e.CreateWorkbook="CreateWorkbook",e.DeleteWorksheet="DeleteWorksheet",e.DeregisterEvent="DeregisterEvent",e.EventFired="EventFired",e.FilterCells="FilterCells",e.GetActiveWorksheet="GetActiveWorksheet",e.GetCalculationMode="GetCalculationMode",e.GetCellNames="GetCellNames",e.GetCells="GetCells",e.GetRangeAddress="GetRangeAddress",e.GetWorkbookById="GetWorkbookById",e.GetWorkbookFilePath="GetWorkbookFilePath",e.GetWorkbookName="GetWorkbookName",e.GetWorkbooks="GetWorkbooks",e.GetWorkbookWindowBounds="GetWorkbookWindowBounds",e.GetWorksheetById="GetWorksheetById",e.GetWorksheetByName="GetWorksheetByName",e.GetWorksheetName="GetWorksheetName",e.GetWorksheets="GetWorksheets",e.LogMessage="LogMessage",e.OpenWorkbook="OpenWorkbook",e.ProtectWorksheet="ProtectWorksheet",e.QuitApplication="QuitApplication",e.RegisterEvent="RegisterEvent",e.SaveWorkbook="SaveWorkbook",e.SaveWorkbookAs="SaveWorkbookAs",e.SetCellValues="SetCellValues",e.SetCellFormatting="SetCellFormatting",e.SetCellName="SetCellName",e.SetWorkbookWindowBounds="SetWorkbookWindowBounds",e.SetWorksheetName="SetWorksheetName"}(e||(e={})),function(e){e.Activate="Activate",e.ActivateWorksheet="ActivateWorksheet",e.AddWorksheet="AddWorksheet",e.Change="Change",e.Close="Close",e.Deactivate="Deactivate",e.DeleteWorksheet="DeleteWorksheet"}(t||(t={}));let r=!1;const a="[@openfin/excel]",o=()=>{r=!1},n=()=>{r=!0,i("v1.5.2")},s=(e,t)=>{r&&(e.innerError?console.error(t?`${a} ${t}`:a,e,"\n\n(inner)",e.innerError):console.error(t?`${a} ${t}`:a,e))},i=(...e)=>{r&&console.log(a,...e)},c=(...e)=>{r&&console.warn(a,...e)};"undefined"==typeof fin&&Object.assign(window,{fin:{}}),Object.assign(fin,{Integrations:{Excel:{enableLogging:n,disableLogging:o}}});const l=new Map,d=async(r,a,o,n,c)=>{if(!a||!a.eventTarget||!a.objectId){const e=new EventError("Event registration missing required values");throw s(e),e}const d=Object.keys(t).find(e=>e.toLowerCase()===o.toLowerCase());if(!d){const e=new EventError(`Unsupported event name: ${o}`);throw s(e),e}const h=Object.assign({eventName:t[d]},a);i("Registering event",h);try{const t=await r.dispatch(e.RegisterEvent,h),a={handler:c,listener:n};l.set(t,a)}catch(e){throw new AdapterError(void 0,e)}},h=(e,t)=>{const{eventRegistrationId:r}=e,a=l.get(r);if(!a)throw new EventError(`No registered event listener found for id: ${r}`);i("Event payload received",e),a.handler(e)},w=t=>async r=>{let a;for(const[e,t]of l)if(t.listener===r){a=e;break}if(!a)throw new EventError;i("Deregistering event:",a);try{await t.dispatch(e.DeregisterEvent,a),l.delete(a)}catch(e){throw new AdapterError}};var p;!function(e){e.Workbook="Workbook",e.Worksheet="Worksheet",e.CellRange="CellRange"}(p||(p={}));const k=()=>void 0!==crypto.randomUUID?crypto.randomUUID():"10000000-1000-4000-8000-100000000000".replace(/[018]/g,e=>{const t=window.crypto.getRandomValues(new Uint8Array(1))[0]&15>>Number(e)/4;return(Number(e)^t).toString(16)}),u=new Map,m=(e,t)=>async(r,a)=>d(e,t,r,a,b(a)),g=(t,r,a)=>async()=>{i(`Cell range: Clear; address:${a} (${r})`);const o={address:a,objectId:r};try{await t.dispatch(e.ClearCells,o)}catch(e){throw new AdapterError}},C=(t,r,a)=>async()=>{i(`Cell range: Clear formatting; address:${a} (${r})`);const o={address:a,objectId:r};try{await t.dispatch(e.ClearCellFormatting,o)}catch(e){throw new AdapterError}},y=(t,r,a)=>async()=>{i(`Cell range: Clear values; address:${a} (${r})`);const o={address:a,objectId:r};try{await t.dispatch(e.ClearCellValues,o)}catch(e){throw new AdapterError}},v=(e,t,r)=>(a,o=1e3)=>{if(o<=0)throw new ApiError("Update interval must be a positive number");const n=k();i(`Cell range: Create data stream; streamId:${n}; address:${r}; updateInterval:${o} (${t})`);const c={address:r,close:()=>{i(`Closed stream (${n})`),(e=>{var t;try{const r=u.get(e);if(!r)throw new ApiError(`Unable to find registered data stream with id ${e}`);void 0!==(null!==(t=r.timer)&&void 0!==t?t:void 0)&&D(e),u.delete(e)}catch(e){throw s(e),e}})(n)},id:n,start:()=>{i(`Started streaming (${n})`),N(n,a,e,t)},stop:()=>{i(`Stopped streaming (${n})`),D(n)},updateInterval:o,worksheetId:t};return u.set(n,{dataStream:c}),c},b=e=>r=>{var a;try{if((null===(a=r.eventName)||void 0===a?void 0:a.toUpperCase())===t.Change.toUpperCase())return e(r.changedCells);throw new EventError(`Unexpected cell range event: ${r.eventName}`)}catch(e){s(e)}},W=(e,t,r)=>async()=>{i(`Cell range: Get cells; address:${r} (${t})`);const a=await A(e,t,r);return i(`${r}:`,a),a},A=async(t,r,a)=>{const o={address:a,objectId:r};try{return await t.dispatch(e.GetCells,o)}catch(e){throw new AdapterError}},E=(t,r,a)=>async()=>{i(`Cell range: Get name; address:${a} (${r})`);const o={address:a,objectId:r};try{return await t.dispatch(e.GetCellNames,o)}catch(e){throw new AdapterError}},f=(t,r,a)=>async(o,n,s,c,l=!0)=>{i(`Cell range: Set filter; address:${a} (${r})`,{columnIndex:o,filterOperator:n,criteria1:s,criteria2:c,visibleDropDown:l});const d={address:a,criteria1:s,criteria2:c,columnIndex:o,filterOperator:n,objectId:r,visibleDropDown:l};try{await t.dispatch(e.FilterCells,d)}catch(e){throw new AdapterError}},$=(t,r,a)=>async o=>{i(`Cell range: Set formatting; address:${a} (${r})`,o);const n={address:a,formatting:o,objectId:r};try{await t.dispatch(e.SetCellFormatting,n)}catch(e){throw new AdapterError}},G=(t,r,a)=>async o=>{const n=o.trim();let c;if(!n)throw c=new ParameterError("Name cannot be an empty string"),s(c),c;if(n.length>255)throw c=new ParameterError("Name must be 255 characters or less"),s(c),c;if(/[^a-zA-Z0-9_.?\\"']/.test(n))throw c=new ParameterError("Name contains invalid characters"),s(c),c;if(/^\d/.test(n))throw c=new ParameterError("Name cannot start with a number"),s(c),c;i(`Cell range: Set name; address:${a}; newName:${n} (${r})`);const l={address:a,name:n,objectId:r};try{await t.dispatch(e.SetCellName,l)}catch(e){throw new AdapterError}},I=(t,r,a)=>async o=>{i(`Cell range: Set values; address:${a} (${r})`,o);const n={address:a,objectId:r,valuesMap:o};try{await t.dispatch(e.SetCellValues,n)}catch(e){throw new AdapterError}},N=(e,t,r,a)=>{var o;try{const n=u.get(e);if(!n)throw new ApiError(`Unable to find registered data stream with id ${e}`);void 0!==(null!==(o=n.timer)&&void 0!==o?o:void 0)&&D(e);const{address:s,updateInterval:i}=n.dataStream,l=async()=>{const o=await t();try{await I(r,a,s)([[o]])}catch(t){c(`Unable to update cell range for stream with id ${e}: ${null==t?void 0:t.message}`)}},d=window.setInterval(l,i);n.timer=d}catch(e){throw s(e),e}},D=e=>{var t;try{const r=u.get(e);if(!r)throw new ApiError(`Unable to find registered data stream with id ${e}`);if(void 0===(null!==(t=r.timer)&&void 0!==t?t:void 0))return;window.clearInterval(r.timer),r.timer=void 0}catch(e){throw s(e),e}},S=(t,r)=>async()=>{i(`Worksheet: Activate (${r})`);try{await t.dispatch(e.ActivateWorksheet,r)}catch(e){throw new AdapterError}},U=(e,t)=>async(r,a)=>d(e,t,r,a,x(a)),F=(t,r)=>async()=>{i(`Worksheet: Calculate (${r})`);try{await t.dispatch(e.CalculateWorksheet,r)}catch(e){throw new AdapterError}},P=(t,r)=>async()=>{i(`Worksheet: Clear all cell formatting (${r})`);try{await t.dispatch(e.ClearAllCellFormatting,r)}catch(e){throw new AdapterError}},B=(t,r)=>async()=>{i(`Worksheet: Clear all cells (${r})`);try{await t.dispatch(e.ClearAllCells,r)}catch(e){throw new AdapterError}},L=(t,r)=>async()=>{i(`Worksheet: Clear all cell values (${r})`);try{await t.dispatch(e.ClearAllCellValues,r)}catch(e){throw new AdapterError}},j=(e,t)=>{const r={eventTarget:p.Worksheet,objectId:t};return{objectId:t,activate:S(e,t),addEventListener:U(e,r),calculate:F(e,t),clearAllCellFormatting:P(e,t),clearAllCells:B(e,t),clearAllCellValues:L(e,t),clearCellFormatting:r=>C(e,t,r)(),clearCells:r=>g(e,t,r)(),clearCellValues:r=>y(e,t,r)(),createDataStream:(r,a,o)=>v(e,t,r)(a,o),delete:R(e,t),filterCells:(r,a,o,n,s,i)=>f(e,t,r)(a,o,n,s,i),getCellRange:V(e,r),getCells:r=>W(e,t,r)(),getName:O(e,t),protect:z(e,t),removeEventListener:w(e),setCellFormatting:(r,a)=>$(e,t,r)(a),setCellName:(r,a)=>G(e,t,r)(a),setCellValues:(r,a)=>I(e,t,r)(a),setName:M(e,t)}},x=e=>r=>{var a;try{switch(null===(a=r.eventName)||void 0===a?void 0:a.toUpperCase()){case t.Activate.toUpperCase():case t.Deactivate.toUpperCase():return e();case t.Change.toUpperCase():return e(r.changedCells);default:throw new EventError(`Unexpected worksheet event: ${r.eventName}`)}}catch(e){s(e)}},R=(t,r)=>async()=>{i(`Worksheet: Delete (${r})`);try{await t.dispatch(e.DeleteWorksheet,r)}catch(e){throw new AdapterError}},V=(t,r)=>async a=>{const{objectId:o}=r;i(`Worksheet: Get cell range; address:${a} (${o})`);try{const n={address:a,objectId:o},s=await t.dispatch(e.GetRangeAddress,n);return((e,t,r)=>{const{objectId:a}=t,o={cellRangeAddress:r,eventTarget:p.CellRange,objectId:a};return{addEventListener:m(e,o),address:r,clear:g(e,a,r),clearFormatting:C(e,a,r),clearValues:y(e,a,r),createDataStream:v(e,a,r),getCells:W(e,a,r),getNames:E(e,a,r),removeEventListener:w(e),setFilter:f(e,a,r),setFormatting:$(e,a,r),setName:G(e,a,r),setValues:I(e,a,r)}})(t,r,s)}catch(e){if(e.message.indexOf("Unable to get cell range")>=0){const e=new InvalidCellRangeAddressError;throw s(e),e}throw new AdapterError}},O=(t,r)=>async()=>{i(`Worksheet: Get name (${r})`);try{return await t.dispatch(e.GetWorksheetName,r)}catch(e){throw new AdapterError}},z=(t,r)=>async()=>{i(`Worksheet: Protect (${r})`);try{await t.dispatch(e.ProtectWorksheet,r)}catch(e){throw new AdapterError}},M=(t,r)=>async a=>{const o=a.slice(0,31).replace(/[:\\/?*[\]]/g,"").trim();let n;if(!o)throw n=new ParameterError("Invalid worksheet name"),s(n),n;i(`Worksheet: Set name; newWorksheetName:${o} (${r})`);const c={newWorksheetName:o,objectId:r};try{return await t.dispatch(e.SetWorksheetName,c)}catch(e){throw new AdapterError}},T=(t,r)=>async()=>{i(`Workbook: Activate (${r})`);try{return await t.dispatch(e.ActivateWorkbook,r)}catch(e){throw new AdapterError}},H=(e,t)=>async(r,a)=>d(e,t,r,a,q(e,a)),J=(t,r)=>async()=>{let a;i(`Workbook: Add worksheet (${r})`);try{a=await t.dispatch(e.AddWorksheet,r)}catch(e){throw new AdapterError}return j(t,a)},Q=(t,r)=>async()=>{i(`Workbook: Calculate (${r})`);try{await t.dispatch(e.CalculateWorkbook,r)}catch(e){throw new AdapterError}},K=(t,r)=>async()=>{i(`Workbook: Close (${r})`);try{return await t.dispatch(e.CloseWorkbook,r)}catch(e){throw new AdapterError}},_=(e,t)=>{const r={eventTarget:p.Workbook,objectId:t};return{objectId:t,activate:T(e,t),addWorksheet:J(e,t),addEventListener:H(e,r),calculate:Q(e,t),close:K(e,t),getActiveWorksheet:X(e,t),getCalculationMode:Y(e,t),getFilePath:Z(e,t),getName:ee(e,t),getWindowBounds:te(e,t),getWorksheetByName:re(e,t),getWorksheets:ae(e,t),removeEventListener:w(e),save:oe(e,t),saveAs:ne(e,t),setWindowBounds:se(e,t)}},q=(e,r)=>a=>{var o;try{switch(null===(o=a.eventName)||void 0===o?void 0:o.toUpperCase()){case t.Activate.toUpperCase():case t.Close.toUpperCase():case t.Deactivate.toUpperCase():return r();case t.ActivateWorksheet.toUpperCase():case t.AddWorksheet.toUpperCase():return r(j(e,a.worksheetObjectId));case t.DeleteWorksheet.toUpperCase():return r(a.worksheetName);default:throw new EventError(`Unexpected workbook event: ${a.eventName}`)}}catch(e){s(e)}},X=(t,r)=>async()=>{let a;i(`Workbook: Get active worksheet: (${r})`);try{a=await t.dispatch(e.GetActiveWorksheet,r)}catch(e){throw new AdapterError}return j(t,a)},Y=(t,r)=>async()=>{i("Workbook: Get calculation mode");try{return await t.dispatch(e.GetCalculationMode,r)}catch(e){throw new AdapterError}},Z=(t,r)=>async()=>{i(`Workbook: Get file path (${r})`);try{return await t.dispatch(e.GetWorkbookFilePath,r)}catch(e){throw new AdapterError}},ee=(t,r)=>async()=>{i(`Workbook: Get name (${r})`);try{return await t.dispatch(e.GetWorkbookName,r)}catch(e){throw new AdapterError}},te=(t,r)=>async()=>{i(`Workbook: Get window bounds (${r})`);try{return await t.dispatch(e.GetWorkbookWindowBounds,r)}catch(e){throw new AdapterError}},re=(t,r)=>async a=>{let o;i(`Workbook: Get worksheet by name: ${a} (${r})`);try{if(o=await t.dispatch(e.GetWorksheetByName,{objectId:r,worksheetName:a}),null===o)return null}catch(e){throw new AdapterError}return j(t,o)},ae=(t,r)=>async()=>{let a;i(`Workbook: Get worksheets (${r})`);try{a=await t.dispatch(e.GetWorksheets,r)}catch(e){throw new AdapterError}return a.map(e=>j(t,e))},oe=(t,r)=>async()=>{i(`Workbook: Save (${r})`);try{return await t.dispatch(e.SaveWorkbook,r)}catch(e){throw new AdapterError}},ne=(t,r)=>async a=>{i(`Workbook: Save as; filePath:${a} (${r})`);try{return await t.dispatch(e.SaveWorkbookAs,{filePath:a,objectId:r})}catch(e){throw new AdapterError}},se=(t,r)=>async a=>{i(`Workbook: Set window bounds (${r})`,a);const{height:o,left:n,top:c,width:l}=a;if(null!=o&&(Number.isNaN(o)||o<=0)){const e=new ParameterError("Workbook window height must be a number greater than zero.");throw s(e),e}if(null!=n&&Number.isNaN(n)){const e=new ParameterError("Workbook window left position must be a valid number.");throw s(e),e}if(null!=c&&Number.isNaN(c)){const e=new ParameterError("Workbook window top position must be a valid number.");throw s(e),e}if(null!=l&&(Number.isNaN(l)||l<=0)){const e=new ParameterError("Workbook window width must be a number greater than zero.");throw s(e),e}const d={newWindowBounds:a,objectId:r};try{return await t.dispatch(e.SetWorkbookWindowBounds,d)}catch(e){throw new AdapterError}},ie=t=>async r=>{let a;i(`Application: Get workbook; id:${r}`);try{a=await t.dispatch(e.GetWorkbookById,r)}catch(e){throw new AdapterError}return _(t,a)},ce=t=>async()=>{let r;i("Application: Get workbooks");try{r=await t.dispatch(e.GetWorkbooks)}catch(e){throw new AdapterError}return r.map(e=>_(t,e))},le=t=>async r=>{i(`Application: Get worksheet; id:${r}`);try{r=await t.dispatch(e.GetWorksheetById,r)}catch(e){throw new AdapterError}return j(t,r)},de=t=>async r=>{let a;i(`Application: Open workbook; filePath:${r}`);try{a=await t.dispatch(e.OpenWorkbook,r)}catch(e){throw new AdapterError}return _(t,a)},he=t=>async(r=!0)=>{i(`Application: Quit; displayAlerts:${r}`);try{return await t.dispatch(e.QuitApplication,r)}catch(e){throw new AdapterError}};var we,pe;!function(e){e.ExcelApplication="EXCEL-APP"}(we||(we={})),function(e){e[e.Info=1]="Info",e[e.Warn=2]="Warn",e[e.Error=3]="Error"}(pe||(pe={}));const ke="excel-adapter",ue=k();let me;const ge=()=>"1.5.2",Ce=async(t=!1)=>{try{if(await(async e=>{try{i("Registering usage"),await fin.System.registerUsage({type:"integration-feature",data:{apiVersion:"1.5.2",componentName:e}})}catch(t){c(`Unable to register usage for feature ${e}: ${null==t?void 0:t.message}`)}})(we.ExcelApplication),!await(async e=>(await fin.InterApplicationBus.Channel.getAllChannels()).some(t=>t.channelName===e))(ue)){await(async()=>{var e;const t=null===(e=(await fin.Application.getCurrentSync().getManifest()).appAssets)||void 0===e?void 0:e.find(e=>e.alias===ke);if(t)return void c("Detected adapter package in app manifest appAssets",t);if(await ve())return void i("Using existing adapter package");const r={alias:ke,src:`https://cdn.openfin.co/release/integrations/excel/${ge()}/OpenFin.Excel.zip`,target:"OpenFin.Excel.exe",version:ge()};i("Downloading adapter package",r);try{await fin.System.downloadAsset(r,()=>{})}catch(e){throw s("Unable to download adapter package"),e}})();const{securityRealm:e,port:r}=await fin.System.getRuntimeInfo();let{licenseKey:a}=await fin.Application.getCurrentSync().getManifest();a=null!=a?a:"NO_LICENSE_KEY";const o=fin.me.uuid;i("Initializing adapter",{adapterLoggingEnabled:t,channelName:ue,licenseKey:a,port:r,securityRealm:e,uuid:o}),fin.System.launchExternalProcess({alias:ke,arguments:`${o} ${a} ${r} ${e} ${ue} ${t}`})}const r=fin.InterApplicationBus.Channel.connect(ue,{payload:{version:ge()}}),a=new Promise(e=>{setTimeout(e,2e4)}).then(()=>{throw new Error("Connection to adapter timed out")});me=await Promise.race([r,a]),i(`Connected to adapter ${me.providerIdentity.uuid} on channel ${ue}`),me.register(e.LogMessage,ye),me.register(e.EventFired,h)}catch(e){const t=new InitializationError(void 0,e);throw s(t),t}return{adapter:{channelName:ue,version:ge()},createWorkbook:(r=me,async()=>{let t;i("Application: Create workbook");try{t=await r.dispatch(e.CreateWorkbook)}catch(e){throw new AdapterError}return _(r,t)}),getWorkbookById:ie(me),getWorkbooks:ce(me),getWorksheetById:le(me),openWorkbook:de(me),quit:he(me)};// removed by dead control flow
 var r; },ye=(e,t)=>{const{message:r,type:a}=e,o="[adapter]";switch(a){case pe.Error:s(r,o);break;case pe.Info:i(o,r);break;case pe.Warn:c(o,r);break;default:s(new Error(`Unknown log type: ${a}`))}},ve=async()=>{try{const e=await fin.System.getAppAssetInfo({alias:ke});return e&&e.version===ge()}catch(e){return!1}};var be,We,Ae,Ee,fe;!function(e){e.Continuous="Continuous",e.Dash="Dash",e.DashDot="DashDot",e.DashDotDot="DashDotDot",e.Dot="Dot",e.Double="Double",e.SlantDashDot="SlantDashDot",e.None="None"}(be||(be={})),function(e){e.Center="Center",e.CenterAcrossSelection="CenterAcrossSelection",e.Distributed="Distributed",e.Fill="Fill",e.General="General",e.Justify="Justify",e.Left="Left",e.Right="Right"}(We||(We={})),function(e){e.Automatic="Automatic",e.Checker="Checker",e.CrissCross="CrissCross",e.Down="Down",e.Gray16="Gray16",e.Gray25="Gray25",e.Gray50="Gray50",e.Gray75="Gray75",e.Gray8="Gray8",e.Grid="Grid",e.Horizontal="Horizontal",e.LightDown="LightDown",e.LightHorizontal="LightHorizontal",e.LightUp="LightUp",e.LightVertical="LightVertical",e.LinearGradient="LinearGradient",e.None="None",e.RectangularGradient="RectangularGradient",e.SemiGray75="SemiGray75",e.Solid="Solid",e.Up="Up",e.Vertical="Vertical"}(Ae||(Ae={})),function(e){e.Bottom="Bottom",e.Center="Center",e.Distributed="Distributed",e.Justify="Justify",e.Top="Top"}(Ee||(Ee={})),function(e){e.And="And",e.Or="Or",e.Top10Items="Top10Items",e.Bottom10Items="Bottom10Items",e.Top10Percent="Top10Percent",e.Bottom10Percent="Bottom10Percent",e.FilterValues="FilterValues"}(fe||(fe={}));

/***/ }

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ const __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	const cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	const module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	if (!(moduleId in __webpack_modules__)) {
/******/ 		delete __webpack_module_cache__[moduleId];
/******/ 		const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 		e.code = 'MODULE_NOT_FOUND';
/******/ 		throw e;
/******/ 	}
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ // define getter/value functions for harmony exports
/******/ __webpack_require__.d = (exports, definition) => {
/******/ 	for(var key in definition) {
/******/ 		if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 			Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 		}
/******/ 	}
/******/ };
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ __webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ // define __esModule on exports
/******/ __webpack_require__.r = (exports) => {
/******/ 	Object.defineProperties(exports, { [Symbol.toStringTag]: { value: 'Module' }, __esModule: { value: true } });
/******/ };
/******/ 
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************************!*\
  !*** ./client/src/excel-window.ts ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _excel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./excel */ "./client/src/excel.ts");

window.addEventListener("DOMContentLoaded", async () => {
    const root = "https://built-on-openfin.github.io/workspace-starter/workspace/v45.0.0/integrate-with-excel";
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