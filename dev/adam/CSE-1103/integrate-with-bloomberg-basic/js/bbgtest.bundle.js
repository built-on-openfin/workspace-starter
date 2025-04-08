/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../node_modules/@finos/fdc3/dist/fdc3.esm.js":
/*!*******************************************************!*\
  !*** ../../node_modules/@finos/fdc3/dist/fdc3.esm.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BridgingError: () => (/* binding */ BridgingError),
/* harmony export */   BridgingTypes: () => (/* binding */ BridgingTypes),
/* harmony export */   ChannelError: () => (/* binding */ ChannelError),
/* harmony export */   ContextTypes: () => (/* binding */ ContextTypes),
/* harmony export */   Convert: () => (/* binding */ Convert),
/* harmony export */   Intents: () => (/* binding */ Intents),
/* harmony export */   OpenError: () => (/* binding */ OpenError),
/* harmony export */   ResolveError: () => (/* binding */ ResolveError),
/* harmony export */   ResultError: () => (/* binding */ ResultError),
/* harmony export */   addContextListener: () => (/* binding */ addContextListener),
/* harmony export */   addIntentListener: () => (/* binding */ addIntentListener),
/* harmony export */   broadcast: () => (/* binding */ broadcast),
/* harmony export */   compareVersionNumbers: () => (/* binding */ compareVersionNumbers),
/* harmony export */   createPrivateChannel: () => (/* binding */ createPrivateChannel),
/* harmony export */   fdc3Ready: () => (/* binding */ fdc3Ready),
/* harmony export */   findInstances: () => (/* binding */ findInstances),
/* harmony export */   findIntent: () => (/* binding */ findIntent),
/* harmony export */   findIntentsByContext: () => (/* binding */ findIntentsByContext),
/* harmony export */   getAppMetadata: () => (/* binding */ getAppMetadata),
/* harmony export */   getCurrentChannel: () => (/* binding */ getCurrentChannel),
/* harmony export */   getInfo: () => (/* binding */ getInfo),
/* harmony export */   getOrCreateChannel: () => (/* binding */ getOrCreateChannel),
/* harmony export */   getSystemChannels: () => (/* binding */ getSystemChannels),
/* harmony export */   getUserChannels: () => (/* binding */ getUserChannels),
/* harmony export */   isStandardContextType: () => (/* binding */ isStandardContextType),
/* harmony export */   isStandardIntent: () => (/* binding */ isStandardIntent),
/* harmony export */   joinChannel: () => (/* binding */ joinChannel),
/* harmony export */   joinUserChannel: () => (/* binding */ joinUserChannel),
/* harmony export */   leaveCurrentChannel: () => (/* binding */ leaveCurrentChannel),
/* harmony export */   open: () => (/* binding */ open),
/* harmony export */   raiseIntent: () => (/* binding */ raiseIntent),
/* harmony export */   raiseIntentForContext: () => (/* binding */ raiseIntentForContext),
/* harmony export */   versionIsAtLeast: () => (/* binding */ versionIsAtLeast)
/* harmony export */ });
// To parse this data:
//
//   import { Convert, AgentErrorResponseMessage, AgentRequestMessage, AgentResponseMessage, BridgeErrorResponseMessage, BridgeRequestMessage, BridgeResponseMessage, BroadcastAgentRequest, BroadcastBridgeRequest, ConnectionStepMessage, ConnectionStep2Hello, ConnectionStep3Handshake, ConnectionStep4AuthenticationFailed, ConnectionStep6ConnectedAgentsUpdate, FindInstancesAgentErrorResponse, FindInstancesAgentRequest, FindInstancesAgentResponse, FindInstancesBridgeErrorResponse, FindInstancesBridgeRequest, FindInstancesBridgeResponse, FindIntentAgentErrorResponse, FindIntentAgentRequest, FindIntentAgentResponse, FindIntentBridgeErrorResponse, FindIntentBridgeRequest, FindIntentBridgeResponse, FindIntentsByContextAgentErrorResponse, FindIntentsByContextAgentRequest, FindIntentsByContextAgentResponse, FindIntentsByContextBridgeErrorResponse, FindIntentsByContextBridgeRequest, FindIntentsByContextBridgeResponse, GetAppMetadataAgentErrorResponse, GetAppMetadataAgentRequest, GetAppMetadataAgentResponse, GetAppMetadataBridgeErrorResponse, GetAppMetadataBridgeRequest, GetAppMetadataBridgeResponse, OpenAgentErrorResponse, OpenAgentRequest, OpenAgentResponse, OpenBridgeErrorResponse, OpenBridgeRequest, OpenBridgeResponse, PrivateChannelBroadcastAgentRequest, PrivateChannelBroadcastBridgeRequest, PrivateChannelEventListenerAddedAgentRequest, PrivateChannelEventListenerAddedBridgeRequest, PrivateChannelEventListenerRemovedAgentRequest, PrivateChannelEventListenerRemovedBridgeRequest, PrivateChannelOnAddContextListenerAgentRequest, PrivateChannelOnAddContextListenerBridgeRequest, PrivateChannelOnDisconnectAgentRequest, PrivateChannelOnDisconnectBridgeRequest, PrivateChannelOnUnsubscribeAgentRequest, PrivateChannelOnUnsubscribeBridgeRequest, RaiseIntentAgentErrorResponse, RaiseIntentAgentRequest, RaiseIntentAgentResponse, RaiseIntentBridgeErrorResponse, RaiseIntentBridgeRequest, RaiseIntentBridgeResponse, RaiseIntentResultAgentErrorResponse, RaiseIntentResultAgentResponse, RaiseIntentResultBridgeErrorResponse, RaiseIntentResultBridgeResponse, Context } from "./file";
//
//   const fDC3DesktopAgentAPISchema = Convert.toFDC3DesktopAgentAPISchema(json);
//   const agentErrorResponseMessage = Convert.toAgentErrorResponseMessage(json);
//   const agentRequestMessage = Convert.toAgentRequestMessage(json);
//   const agentResponseMessage = Convert.toAgentResponseMessage(json);
//   const bridgeErrorResponseMessage = Convert.toBridgeErrorResponseMessage(json);
//   const bridgeRequestMessage = Convert.toBridgeRequestMessage(json);
//   const bridgeResponseMessage = Convert.toBridgeResponseMessage(json);
//   const broadcastAgentRequest = Convert.toBroadcastAgentRequest(json);
//   const broadcastBridgeRequest = Convert.toBroadcastBridgeRequest(json);
//   const bridgingCommons = Convert.toBridgingCommons(json);
//   const connectionStepMessage = Convert.toConnectionStepMessage(json);
//   const connectionStep2Hello = Convert.toConnectionStep2Hello(json);
//   const connectionStep3Handshake = Convert.toConnectionStep3Handshake(json);
//   const connectionStep4AuthenticationFailed = Convert.toConnectionStep4AuthenticationFailed(json);
//   const connectionStep6ConnectedAgentsUpdate = Convert.toConnectionStep6ConnectedAgentsUpdate(json);
//   const findInstancesAgentErrorResponse = Convert.toFindInstancesAgentErrorResponse(json);
//   const findInstancesAgentRequest = Convert.toFindInstancesAgentRequest(json);
//   const findInstancesAgentResponse = Convert.toFindInstancesAgentResponse(json);
//   const findInstancesBridgeErrorResponse = Convert.toFindInstancesBridgeErrorResponse(json);
//   const findInstancesBridgeRequest = Convert.toFindInstancesBridgeRequest(json);
//   const findInstancesBridgeResponse = Convert.toFindInstancesBridgeResponse(json);
//   const findIntentAgentErrorResponse = Convert.toFindIntentAgentErrorResponse(json);
//   const findIntentAgentRequest = Convert.toFindIntentAgentRequest(json);
//   const findIntentAgentResponse = Convert.toFindIntentAgentResponse(json);
//   const findIntentBridgeErrorResponse = Convert.toFindIntentBridgeErrorResponse(json);
//   const findIntentBridgeRequest = Convert.toFindIntentBridgeRequest(json);
//   const findIntentBridgeResponse = Convert.toFindIntentBridgeResponse(json);
//   const findIntentsByContextAgentErrorResponse = Convert.toFindIntentsByContextAgentErrorResponse(json);
//   const findIntentsByContextAgentRequest = Convert.toFindIntentsByContextAgentRequest(json);
//   const findIntentsByContextAgentResponse = Convert.toFindIntentsByContextAgentResponse(json);
//   const findIntentsByContextBridgeErrorResponse = Convert.toFindIntentsByContextBridgeErrorResponse(json);
//   const findIntentsByContextBridgeRequest = Convert.toFindIntentsByContextBridgeRequest(json);
//   const findIntentsByContextBridgeResponse = Convert.toFindIntentsByContextBridgeResponse(json);
//   const getAppMetadataAgentErrorResponse = Convert.toGetAppMetadataAgentErrorResponse(json);
//   const getAppMetadataAgentRequest = Convert.toGetAppMetadataAgentRequest(json);
//   const getAppMetadataAgentResponse = Convert.toGetAppMetadataAgentResponse(json);
//   const getAppMetadataBridgeErrorResponse = Convert.toGetAppMetadataBridgeErrorResponse(json);
//   const getAppMetadataBridgeRequest = Convert.toGetAppMetadataBridgeRequest(json);
//   const getAppMetadataBridgeResponse = Convert.toGetAppMetadataBridgeResponse(json);
//   const openAgentErrorResponse = Convert.toOpenAgentErrorResponse(json);
//   const openAgentRequest = Convert.toOpenAgentRequest(json);
//   const openAgentResponse = Convert.toOpenAgentResponse(json);
//   const openBridgeErrorResponse = Convert.toOpenBridgeErrorResponse(json);
//   const openBridgeRequest = Convert.toOpenBridgeRequest(json);
//   const openBridgeResponse = Convert.toOpenBridgeResponse(json);
//   const privateChannelBroadcastAgentRequest = Convert.toPrivateChannelBroadcastAgentRequest(json);
//   const privateChannelBroadcastBridgeRequest = Convert.toPrivateChannelBroadcastBridgeRequest(json);
//   const privateChannelEventListenerAddedAgentRequest = Convert.toPrivateChannelEventListenerAddedAgentRequest(json);
//   const privateChannelEventListenerAddedBridgeRequest = Convert.toPrivateChannelEventListenerAddedBridgeRequest(json);
//   const privateChannelEventListenerRemovedAgentRequest = Convert.toPrivateChannelEventListenerRemovedAgentRequest(json);
//   const privateChannelEventListenerRemovedBridgeRequest = Convert.toPrivateChannelEventListenerRemovedBridgeRequest(json);
//   const privateChannelOnAddContextListenerAgentRequest = Convert.toPrivateChannelOnAddContextListenerAgentRequest(json);
//   const privateChannelOnAddContextListenerBridgeRequest = Convert.toPrivateChannelOnAddContextListenerBridgeRequest(json);
//   const privateChannelOnDisconnectAgentRequest = Convert.toPrivateChannelOnDisconnectAgentRequest(json);
//   const privateChannelOnDisconnectBridgeRequest = Convert.toPrivateChannelOnDisconnectBridgeRequest(json);
//   const privateChannelOnUnsubscribeAgentRequest = Convert.toPrivateChannelOnUnsubscribeAgentRequest(json);
//   const privateChannelOnUnsubscribeBridgeRequest = Convert.toPrivateChannelOnUnsubscribeBridgeRequest(json);
//   const raiseIntentAgentErrorResponse = Convert.toRaiseIntentAgentErrorResponse(json);
//   const raiseIntentAgentRequest = Convert.toRaiseIntentAgentRequest(json);
//   const raiseIntentAgentResponse = Convert.toRaiseIntentAgentResponse(json);
//   const raiseIntentBridgeErrorResponse = Convert.toRaiseIntentBridgeErrorResponse(json);
//   const raiseIntentBridgeRequest = Convert.toRaiseIntentBridgeRequest(json);
//   const raiseIntentBridgeResponse = Convert.toRaiseIntentBridgeResponse(json);
//   const raiseIntentResultAgentErrorResponse = Convert.toRaiseIntentResultAgentErrorResponse(json);
//   const raiseIntentResultAgentResponse = Convert.toRaiseIntentResultAgentResponse(json);
//   const raiseIntentResultBridgeErrorResponse = Convert.toRaiseIntentResultBridgeErrorResponse(json);
//   const raiseIntentResultBridgeResponse = Convert.toRaiseIntentResultBridgeResponse(json);
//   const context = Convert.toContext(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.
// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
var Convert$1 = /** @class */ (function () {
    function Convert() {
    }
    Convert.toFDC3DesktopAgentAPISchema = function (json) {
        return cast$1(JSON.parse(json), "any");
    };
    Convert.fDC3DesktopAgentAPISchemaToJson = function (value) {
        return JSON.stringify(uncast$1(value, "any"), null, 2);
    };
    Convert.toAgentErrorResponseMessage = function (json) {
        return cast$1(JSON.parse(json), r$1("AgentErrorResponseMessage"));
    };
    Convert.agentErrorResponseMessageToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("AgentErrorResponseMessage")), null, 2);
    };
    Convert.toAgentRequestMessage = function (json) {
        return cast$1(JSON.parse(json), r$1("AgentRequestMessage"));
    };
    Convert.agentRequestMessageToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("AgentRequestMessage")), null, 2);
    };
    Convert.toAgentResponseMessage = function (json) {
        return cast$1(JSON.parse(json), r$1("AgentResponseMessage"));
    };
    Convert.agentResponseMessageToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("AgentResponseMessage")), null, 2);
    };
    Convert.toBridgeErrorResponseMessage = function (json) {
        return cast$1(JSON.parse(json), r$1("BridgeErrorResponseMessage"));
    };
    Convert.bridgeErrorResponseMessageToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("BridgeErrorResponseMessage")), null, 2);
    };
    Convert.toBridgeRequestMessage = function (json) {
        return cast$1(JSON.parse(json), r$1("BridgeRequestMessage"));
    };
    Convert.bridgeRequestMessageToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("BridgeRequestMessage")), null, 2);
    };
    Convert.toBridgeResponseMessage = function (json) {
        return cast$1(JSON.parse(json), r$1("BridgeResponseMessage"));
    };
    Convert.bridgeResponseMessageToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("BridgeResponseMessage")), null, 2);
    };
    Convert.toBroadcastAgentRequest = function (json) {
        return cast$1(JSON.parse(json), r$1("BroadcastAgentRequest"));
    };
    Convert.broadcastAgentRequestToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("BroadcastAgentRequest")), null, 2);
    };
    Convert.toBroadcastBridgeRequest = function (json) {
        return cast$1(JSON.parse(json), r$1("BroadcastBridgeRequest"));
    };
    Convert.broadcastBridgeRequestToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("BroadcastBridgeRequest")), null, 2);
    };
    Convert.toBridgingCommons = function (json) {
        return cast$1(JSON.parse(json), m$1("any"));
    };
    Convert.bridgingCommonsToJson = function (value) {
        return JSON.stringify(uncast$1(value, m$1("any")), null, 2);
    };
    Convert.toConnectionStepMessage = function (json) {
        return cast$1(JSON.parse(json), r$1("ConnectionStepMessage"));
    };
    Convert.connectionStepMessageToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("ConnectionStepMessage")), null, 2);
    };
    Convert.toConnectionStep2Hello = function (json) {
        return cast$1(JSON.parse(json), r$1("ConnectionStep2Hello"));
    };
    Convert.connectionStep2HelloToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("ConnectionStep2Hello")), null, 2);
    };
    Convert.toConnectionStep3Handshake = function (json) {
        return cast$1(JSON.parse(json), r$1("ConnectionStep3Handshake"));
    };
    Convert.connectionStep3HandshakeToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("ConnectionStep3Handshake")), null, 2);
    };
    Convert.toConnectionStep4AuthenticationFailed = function (json) {
        return cast$1(JSON.parse(json), r$1("ConnectionStep4AuthenticationFailed"));
    };
    Convert.connectionStep4AuthenticationFailedToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("ConnectionStep4AuthenticationFailed")), null, 2);
    };
    Convert.toConnectionStep6ConnectedAgentsUpdate = function (json) {
        return cast$1(JSON.parse(json), r$1("ConnectionStep6ConnectedAgentsUpdate"));
    };
    Convert.connectionStep6ConnectedAgentsUpdateToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("ConnectionStep6ConnectedAgentsUpdate")), null, 2);
    };
    Convert.toFindInstancesAgentErrorResponse = function (json) {
        return cast$1(JSON.parse(json), r$1("FindInstancesAgentErrorResponse"));
    };
    Convert.findInstancesAgentErrorResponseToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("FindInstancesAgentErrorResponse")), null, 2);
    };
    Convert.toFindInstancesAgentRequest = function (json) {
        return cast$1(JSON.parse(json), r$1("FindInstancesAgentRequest"));
    };
    Convert.findInstancesAgentRequestToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("FindInstancesAgentRequest")), null, 2);
    };
    Convert.toFindInstancesAgentResponse = function (json) {
        return cast$1(JSON.parse(json), r$1("FindInstancesAgentResponse"));
    };
    Convert.findInstancesAgentResponseToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("FindInstancesAgentResponse")), null, 2);
    };
    Convert.toFindInstancesBridgeErrorResponse = function (json) {
        return cast$1(JSON.parse(json), r$1("FindInstancesBridgeErrorResponse"));
    };
    Convert.findInstancesBridgeErrorResponseToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("FindInstancesBridgeErrorResponse")), null, 2);
    };
    Convert.toFindInstancesBridgeRequest = function (json) {
        return cast$1(JSON.parse(json), r$1("FindInstancesBridgeRequest"));
    };
    Convert.findInstancesBridgeRequestToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("FindInstancesBridgeRequest")), null, 2);
    };
    Convert.toFindInstancesBridgeResponse = function (json) {
        return cast$1(JSON.parse(json), r$1("FindInstancesBridgeResponse"));
    };
    Convert.findInstancesBridgeResponseToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("FindInstancesBridgeResponse")), null, 2);
    };
    Convert.toFindIntentAgentErrorResponse = function (json) {
        return cast$1(JSON.parse(json), r$1("FindIntentAgentErrorResponse"));
    };
    Convert.findIntentAgentErrorResponseToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("FindIntentAgentErrorResponse")), null, 2);
    };
    Convert.toFindIntentAgentRequest = function (json) {
        return cast$1(JSON.parse(json), r$1("FindIntentAgentRequest"));
    };
    Convert.findIntentAgentRequestToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("FindIntentAgentRequest")), null, 2);
    };
    Convert.toFindIntentAgentResponse = function (json) {
        return cast$1(JSON.parse(json), r$1("FindIntentAgentResponse"));
    };
    Convert.findIntentAgentResponseToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("FindIntentAgentResponse")), null, 2);
    };
    Convert.toFindIntentBridgeErrorResponse = function (json) {
        return cast$1(JSON.parse(json), r$1("FindIntentBridgeErrorResponse"));
    };
    Convert.findIntentBridgeErrorResponseToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("FindIntentBridgeErrorResponse")), null, 2);
    };
    Convert.toFindIntentBridgeRequest = function (json) {
        return cast$1(JSON.parse(json), r$1("FindIntentBridgeRequest"));
    };
    Convert.findIntentBridgeRequestToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("FindIntentBridgeRequest")), null, 2);
    };
    Convert.toFindIntentBridgeResponse = function (json) {
        return cast$1(JSON.parse(json), r$1("FindIntentBridgeResponse"));
    };
    Convert.findIntentBridgeResponseToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("FindIntentBridgeResponse")), null, 2);
    };
    Convert.toFindIntentsByContextAgentErrorResponse = function (json) {
        return cast$1(JSON.parse(json), r$1("FindIntentsByContextAgentErrorResponse"));
    };
    Convert.findIntentsByContextAgentErrorResponseToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("FindIntentsByContextAgentErrorResponse")), null, 2);
    };
    Convert.toFindIntentsByContextAgentRequest = function (json) {
        return cast$1(JSON.parse(json), r$1("FindIntentsByContextAgentRequest"));
    };
    Convert.findIntentsByContextAgentRequestToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("FindIntentsByContextAgentRequest")), null, 2);
    };
    Convert.toFindIntentsByContextAgentResponse = function (json) {
        return cast$1(JSON.parse(json), r$1("FindIntentsByContextAgentResponse"));
    };
    Convert.findIntentsByContextAgentResponseToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("FindIntentsByContextAgentResponse")), null, 2);
    };
    Convert.toFindIntentsByContextBridgeErrorResponse = function (json) {
        return cast$1(JSON.parse(json), r$1("FindIntentsByContextBridgeErrorResponse"));
    };
    Convert.findIntentsByContextBridgeErrorResponseToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("FindIntentsByContextBridgeErrorResponse")), null, 2);
    };
    Convert.toFindIntentsByContextBridgeRequest = function (json) {
        return cast$1(JSON.parse(json), r$1("FindIntentsByContextBridgeRequest"));
    };
    Convert.findIntentsByContextBridgeRequestToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("FindIntentsByContextBridgeRequest")), null, 2);
    };
    Convert.toFindIntentsByContextBridgeResponse = function (json) {
        return cast$1(JSON.parse(json), r$1("FindIntentsByContextBridgeResponse"));
    };
    Convert.findIntentsByContextBridgeResponseToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("FindIntentsByContextBridgeResponse")), null, 2);
    };
    Convert.toGetAppMetadataAgentErrorResponse = function (json) {
        return cast$1(JSON.parse(json), r$1("GetAppMetadataAgentErrorResponse"));
    };
    Convert.getAppMetadataAgentErrorResponseToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("GetAppMetadataAgentErrorResponse")), null, 2);
    };
    Convert.toGetAppMetadataAgentRequest = function (json) {
        return cast$1(JSON.parse(json), r$1("GetAppMetadataAgentRequest"));
    };
    Convert.getAppMetadataAgentRequestToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("GetAppMetadataAgentRequest")), null, 2);
    };
    Convert.toGetAppMetadataAgentResponse = function (json) {
        return cast$1(JSON.parse(json), r$1("GetAppMetadataAgentResponse"));
    };
    Convert.getAppMetadataAgentResponseToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("GetAppMetadataAgentResponse")), null, 2);
    };
    Convert.toGetAppMetadataBridgeErrorResponse = function (json) {
        return cast$1(JSON.parse(json), r$1("GetAppMetadataBridgeErrorResponse"));
    };
    Convert.getAppMetadataBridgeErrorResponseToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("GetAppMetadataBridgeErrorResponse")), null, 2);
    };
    Convert.toGetAppMetadataBridgeRequest = function (json) {
        return cast$1(JSON.parse(json), r$1("GetAppMetadataBridgeRequest"));
    };
    Convert.getAppMetadataBridgeRequestToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("GetAppMetadataBridgeRequest")), null, 2);
    };
    Convert.toGetAppMetadataBridgeResponse = function (json) {
        return cast$1(JSON.parse(json), r$1("GetAppMetadataBridgeResponse"));
    };
    Convert.getAppMetadataBridgeResponseToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("GetAppMetadataBridgeResponse")), null, 2);
    };
    Convert.toOpenAgentErrorResponse = function (json) {
        return cast$1(JSON.parse(json), r$1("OpenAgentErrorResponse"));
    };
    Convert.openAgentErrorResponseToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("OpenAgentErrorResponse")), null, 2);
    };
    Convert.toOpenAgentRequest = function (json) {
        return cast$1(JSON.parse(json), r$1("OpenAgentRequest"));
    };
    Convert.openAgentRequestToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("OpenAgentRequest")), null, 2);
    };
    Convert.toOpenAgentResponse = function (json) {
        return cast$1(JSON.parse(json), r$1("OpenAgentResponse"));
    };
    Convert.openAgentResponseToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("OpenAgentResponse")), null, 2);
    };
    Convert.toOpenBridgeErrorResponse = function (json) {
        return cast$1(JSON.parse(json), r$1("OpenBridgeErrorResponse"));
    };
    Convert.openBridgeErrorResponseToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("OpenBridgeErrorResponse")), null, 2);
    };
    Convert.toOpenBridgeRequest = function (json) {
        return cast$1(JSON.parse(json), r$1("OpenBridgeRequest"));
    };
    Convert.openBridgeRequestToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("OpenBridgeRequest")), null, 2);
    };
    Convert.toOpenBridgeResponse = function (json) {
        return cast$1(JSON.parse(json), r$1("OpenBridgeResponse"));
    };
    Convert.openBridgeResponseToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("OpenBridgeResponse")), null, 2);
    };
    Convert.toPrivateChannelBroadcastAgentRequest = function (json) {
        return cast$1(JSON.parse(json), r$1("PrivateChannelBroadcastAgentRequest"));
    };
    Convert.privateChannelBroadcastAgentRequestToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("PrivateChannelBroadcastAgentRequest")), null, 2);
    };
    Convert.toPrivateChannelBroadcastBridgeRequest = function (json) {
        return cast$1(JSON.parse(json), r$1("PrivateChannelBroadcastBridgeRequest"));
    };
    Convert.privateChannelBroadcastBridgeRequestToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("PrivateChannelBroadcastBridgeRequest")), null, 2);
    };
    Convert.toPrivateChannelEventListenerAddedAgentRequest = function (json) {
        return cast$1(JSON.parse(json), r$1("PrivateChannelEventListenerAddedAgentRequest"));
    };
    Convert.privateChannelEventListenerAddedAgentRequestToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("PrivateChannelEventListenerAddedAgentRequest")), null, 2);
    };
    Convert.toPrivateChannelEventListenerAddedBridgeRequest = function (json) {
        return cast$1(JSON.parse(json), r$1("PrivateChannelEventListenerAddedBridgeRequest"));
    };
    Convert.privateChannelEventListenerAddedBridgeRequestToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("PrivateChannelEventListenerAddedBridgeRequest")), null, 2);
    };
    Convert.toPrivateChannelEventListenerRemovedAgentRequest = function (json) {
        return cast$1(JSON.parse(json), r$1("PrivateChannelEventListenerRemovedAgentRequest"));
    };
    Convert.privateChannelEventListenerRemovedAgentRequestToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("PrivateChannelEventListenerRemovedAgentRequest")), null, 2);
    };
    Convert.toPrivateChannelEventListenerRemovedBridgeRequest = function (json) {
        return cast$1(JSON.parse(json), r$1("PrivateChannelEventListenerRemovedBridgeRequest"));
    };
    Convert.privateChannelEventListenerRemovedBridgeRequestToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("PrivateChannelEventListenerRemovedBridgeRequest")), null, 2);
    };
    Convert.toPrivateChannelOnAddContextListenerAgentRequest = function (json) {
        return cast$1(JSON.parse(json), r$1("PrivateChannelOnAddContextListenerAgentRequest"));
    };
    Convert.privateChannelOnAddContextListenerAgentRequestToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("PrivateChannelOnAddContextListenerAgentRequest")), null, 2);
    };
    Convert.toPrivateChannelOnAddContextListenerBridgeRequest = function (json) {
        return cast$1(JSON.parse(json), r$1("PrivateChannelOnAddContextListenerBridgeRequest"));
    };
    Convert.privateChannelOnAddContextListenerBridgeRequestToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("PrivateChannelOnAddContextListenerBridgeRequest")), null, 2);
    };
    Convert.toPrivateChannelOnDisconnectAgentRequest = function (json) {
        return cast$1(JSON.parse(json), r$1("PrivateChannelOnDisconnectAgentRequest"));
    };
    Convert.privateChannelOnDisconnectAgentRequestToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("PrivateChannelOnDisconnectAgentRequest")), null, 2);
    };
    Convert.toPrivateChannelOnDisconnectBridgeRequest = function (json) {
        return cast$1(JSON.parse(json), r$1("PrivateChannelOnDisconnectBridgeRequest"));
    };
    Convert.privateChannelOnDisconnectBridgeRequestToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("PrivateChannelOnDisconnectBridgeRequest")), null, 2);
    };
    Convert.toPrivateChannelOnUnsubscribeAgentRequest = function (json) {
        return cast$1(JSON.parse(json), r$1("PrivateChannelOnUnsubscribeAgentRequest"));
    };
    Convert.privateChannelOnUnsubscribeAgentRequestToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("PrivateChannelOnUnsubscribeAgentRequest")), null, 2);
    };
    Convert.toPrivateChannelOnUnsubscribeBridgeRequest = function (json) {
        return cast$1(JSON.parse(json), r$1("PrivateChannelOnUnsubscribeBridgeRequest"));
    };
    Convert.privateChannelOnUnsubscribeBridgeRequestToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("PrivateChannelOnUnsubscribeBridgeRequest")), null, 2);
    };
    Convert.toRaiseIntentAgentErrorResponse = function (json) {
        return cast$1(JSON.parse(json), r$1("RaiseIntentAgentErrorResponse"));
    };
    Convert.raiseIntentAgentErrorResponseToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("RaiseIntentAgentErrorResponse")), null, 2);
    };
    Convert.toRaiseIntentAgentRequest = function (json) {
        return cast$1(JSON.parse(json), r$1("RaiseIntentAgentRequest"));
    };
    Convert.raiseIntentAgentRequestToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("RaiseIntentAgentRequest")), null, 2);
    };
    Convert.toRaiseIntentAgentResponse = function (json) {
        return cast$1(JSON.parse(json), r$1("RaiseIntentAgentResponse"));
    };
    Convert.raiseIntentAgentResponseToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("RaiseIntentAgentResponse")), null, 2);
    };
    Convert.toRaiseIntentBridgeErrorResponse = function (json) {
        return cast$1(JSON.parse(json), r$1("RaiseIntentBridgeErrorResponse"));
    };
    Convert.raiseIntentBridgeErrorResponseToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("RaiseIntentBridgeErrorResponse")), null, 2);
    };
    Convert.toRaiseIntentBridgeRequest = function (json) {
        return cast$1(JSON.parse(json), r$1("RaiseIntentBridgeRequest"));
    };
    Convert.raiseIntentBridgeRequestToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("RaiseIntentBridgeRequest")), null, 2);
    };
    Convert.toRaiseIntentBridgeResponse = function (json) {
        return cast$1(JSON.parse(json), r$1("RaiseIntentBridgeResponse"));
    };
    Convert.raiseIntentBridgeResponseToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("RaiseIntentBridgeResponse")), null, 2);
    };
    Convert.toRaiseIntentResultAgentErrorResponse = function (json) {
        return cast$1(JSON.parse(json), r$1("RaiseIntentResultAgentErrorResponse"));
    };
    Convert.raiseIntentResultAgentErrorResponseToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("RaiseIntentResultAgentErrorResponse")), null, 2);
    };
    Convert.toRaiseIntentResultAgentResponse = function (json) {
        return cast$1(JSON.parse(json), r$1("RaiseIntentResultAgentResponse"));
    };
    Convert.raiseIntentResultAgentResponseToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("RaiseIntentResultAgentResponse")), null, 2);
    };
    Convert.toRaiseIntentResultBridgeErrorResponse = function (json) {
        return cast$1(JSON.parse(json), r$1("RaiseIntentResultBridgeErrorResponse"));
    };
    Convert.raiseIntentResultBridgeErrorResponseToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("RaiseIntentResultBridgeErrorResponse")), null, 2);
    };
    Convert.toRaiseIntentResultBridgeResponse = function (json) {
        return cast$1(JSON.parse(json), r$1("RaiseIntentResultBridgeResponse"));
    };
    Convert.raiseIntentResultBridgeResponseToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("RaiseIntentResultBridgeResponse")), null, 2);
    };
    Convert.toContext = function (json) {
        return cast$1(JSON.parse(json), r$1("Context"));
    };
    Convert.contextToJson = function (value) {
        return JSON.stringify(uncast$1(value, r$1("Context")), null, 2);
    };
    return Convert;
}());
function invalidValue$1(typ, val, key, parent) {
    if (parent === void 0) { parent = ''; }
    var prettyTyp = prettyTypeName$1(typ);
    var parentText = parent ? " on ".concat(parent) : '';
    var keyText = key ? " for key \"".concat(key, "\"") : '';
    throw Error("Invalid value".concat(keyText).concat(parentText, ". Expected ").concat(prettyTyp, " but got ").concat(JSON.stringify(val)));
}
function prettyTypeName$1(typ) {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return "an optional ".concat(prettyTypeName$1(typ[1]));
        }
        else {
            return "one of [".concat(typ.map(function (a) { return prettyTypeName$1(a); }).join(", "), "]");
        }
    }
    else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    }
    else {
        return typeof typ;
    }
}
function jsonToJSProps$1(typ) {
    if (typ.jsonToJS === undefined) {
        var map_1 = {};
        typ.props.forEach(function (p) { return map_1[p.json] = { key: p.js, typ: p.typ }; });
        typ.jsonToJS = map_1;
    }
    return typ.jsonToJS;
}
function jsToJSONProps$1(typ) {
    if (typ.jsToJSON === undefined) {
        var map_2 = {};
        typ.props.forEach(function (p) { return map_2[p.js] = { key: p.json, typ: p.typ }; });
        typ.jsToJSON = map_2;
    }
    return typ.jsToJSON;
}
function transform$1(val, typ, getProps, key, parent) {
    if (key === void 0) { key = ''; }
    if (parent === void 0) { parent = ''; }
    function transformPrimitive(typ, val) {
        if (typeof typ === typeof val)
            return val;
        return invalidValue$1(typ, val, key, parent);
    }
    function transformUnion(typs, val) {
        // val must validate against one typ in typs
        var l = typs.length;
        for (var i = 0; i < l; i++) {
            var typ_1 = typs[i];
            try {
                return transform$1(val, typ_1, getProps);
            }
            catch (_) { }
        }
        return invalidValue$1(typs, val, key, parent);
    }
    function transformEnum(cases, val) {
        if (cases.indexOf(val) !== -1)
            return val;
        return invalidValue$1(cases.map(function (a) { return l$1(a); }), val, key, parent);
    }
    function transformArray(typ, val) {
        // val must be an array with no invalid elements
        if (!Array.isArray(val))
            return invalidValue$1(l$1("array"), val, key, parent);
        return val.map(function (el) { return transform$1(el, typ, getProps); });
    }
    function transformDate(val) {
        if (val === null) {
            return null;
        }
        var d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue$1(l$1("Date"), val, key, parent);
        }
        return d;
    }
    function transformObject(props, additional, val) {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue$1(l$1(ref || "object"), val, key, parent);
        }
        var result = {};
        Object.getOwnPropertyNames(props).forEach(function (key) {
            var prop = props[key];
            var v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform$1(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(function (key) {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform$1(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }
    if (typ === "any")
        return val;
    if (typ === null) {
        if (val === null)
            return val;
        return invalidValue$1(typ, val, key, parent);
    }
    if (typ === false)
        return invalidValue$1(typ, val, key, parent);
    var ref = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap$1[typ.ref];
    }
    if (Array.isArray(typ))
        return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems") ? transformArray(typ.arrayItems, val)
                : typ.hasOwnProperty("props") ? transformObject(getProps(typ), typ.additional, val)
                    : invalidValue$1(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number")
        return transformDate(val);
    return transformPrimitive(typ, val);
}
function cast$1(val, typ) {
    return transform$1(val, typ, jsonToJSProps$1);
}
function uncast$1(val, typ) {
    return transform$1(val, typ, jsToJSONProps$1);
}
function l$1(typ) {
    return { literal: typ };
}
function a$1(typ) {
    return { arrayItems: typ };
}
function u$1() {
    var typs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        typs[_i] = arguments[_i];
    }
    return { unionMembers: typs };
}
function o$1(props, additional) {
    return { props: props, additional: additional };
}
function m$1(additional) {
    return { props: [], additional: additional };
}
function r$1(name) {
    return { ref: name };
}
var typeMap$1 = {
    "AgentErrorResponseMessage": o$1([
        { json: "meta", js: "meta", typ: r$1("AgentResponseMetadata") },
        { json: "payload", js: "payload", typ: r$1("ErrorResponseMessagePayload") },
        { json: "type", js: "type", typ: r$1("ResponseMessageType") },
    ], false),
    "AgentResponseMetadata": o$1([
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "responseUuid", js: "responseUuid", typ: "" },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "ErrorResponseMessagePayload": o$1([
        { json: "error", js: "error", typ: r$1("ResponseErrorDetail") },
    ], "any"),
    "AgentRequestMessage": o$1([
        { json: "meta", js: "meta", typ: r$1("AgentRequestMetadata") },
        { json: "payload", js: "payload", typ: m$1("any") },
        { json: "type", js: "type", typ: r$1("RequestMessageType") },
    ], false),
    "AgentRequestMetadata": o$1([
        { json: "destination", js: "destination", typ: u$1(undefined, r$1("BridgeParticipantIdentifier")) },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "source", js: "source", typ: u$1(undefined, r$1("SourceIdentifier")) },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "BridgeParticipantIdentifier": o$1([
        { json: "desktopAgent", js: "desktopAgent", typ: "" },
        { json: "appId", js: "appId", typ: u$1(undefined, "") },
        { json: "instanceId", js: "instanceId", typ: u$1(undefined, "") },
    ], "any"),
    "SourceIdentifier": o$1([
        { json: "appId", js: "appId", typ: u$1(undefined, "") },
        { json: "desktopAgent", js: "desktopAgent", typ: u$1(undefined, "") },
        { json: "instanceId", js: "instanceId", typ: u$1(undefined, "") },
    ], "any"),
    "AgentResponseMessage": o$1([
        { json: "meta", js: "meta", typ: r$1("AgentResponseMetadata") },
        { json: "payload", js: "payload", typ: m$1("any") },
        { json: "type", js: "type", typ: r$1("ResponseMessageType") },
    ], false),
    "BridgeErrorResponseMessage": o$1([
        { json: "meta", js: "meta", typ: r$1("BridgeErrorResponseMessageMeta") },
        { json: "payload", js: "payload", typ: r$1("ResponseErrorMessagePayload") },
        { json: "type", js: "type", typ: "" },
    ], false),
    "BridgeErrorResponseMessageMeta": o$1([
        { json: "errorDetails", js: "errorDetails", typ: a$1(r$1("ResponseErrorDetail")) },
        { json: "errorSources", js: "errorSources", typ: a$1(r$1("DesktopAgentIdentifier")) },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "responseUuid", js: "responseUuid", typ: "" },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "DesktopAgentIdentifier": o$1([
        { json: "desktopAgent", js: "desktopAgent", typ: "" },
    ], "any"),
    "ResponseErrorMessagePayload": o$1([
        { json: "error", js: "error", typ: u$1(undefined, r$1("ResponseErrorDetail")) },
    ], "any"),
    "BridgeRequestMessage": o$1([
        { json: "meta", js: "meta", typ: r$1("BridgeRequestMetadata") },
        { json: "payload", js: "payload", typ: m$1("any") },
        { json: "type", js: "type", typ: "" },
    ], false),
    "BridgeRequestMetadata": o$1([
        { json: "destination", js: "destination", typ: u$1(undefined, r$1("BridgeParticipantIdentifier")) },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "source", js: "source", typ: r$1("BridgeParticipantIdentifier") },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "BridgeResponseMessage": o$1([
        { json: "meta", js: "meta", typ: r$1("BridgeResponseMessageMeta") },
        { json: "payload", js: "payload", typ: m$1("any") },
        { json: "type", js: "type", typ: "" },
    ], false),
    "BridgeResponseMessageMeta": o$1([
        { json: "errorDetails", js: "errorDetails", typ: u$1(undefined, a$1(r$1("ResponseErrorDetail"))) },
        { json: "errorSources", js: "errorSources", typ: u$1(undefined, a$1(r$1("DesktopAgentIdentifier"))) },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "responseUuid", js: "responseUuid", typ: "" },
        { json: "sources", js: "sources", typ: u$1(undefined, a$1(r$1("DesktopAgentIdentifier"))) },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "BroadcastAgentRequest": o$1([
        { json: "meta", js: "meta", typ: r$1("BroadcastAgentRequestMeta") },
        { json: "payload", js: "payload", typ: r$1("BroadcastAgentRequestPayload") },
        { json: "type", js: "type", typ: r$1("BroadcastAgentRequestType") },
    ], false),
    "BroadcastAgentRequestMeta": o$1([
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "source", js: "source", typ: r$1("SourceObject") },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "SourceObject": o$1([
        { json: "appId", js: "appId", typ: "" },
        { json: "desktopAgent", js: "desktopAgent", typ: u$1(undefined, "") },
        { json: "instanceId", js: "instanceId", typ: u$1(undefined, "") },
    ], "any"),
    "BroadcastAgentRequestPayload": o$1([
        { json: "channelId", js: "channelId", typ: "" },
        { json: "context", js: "context", typ: r$1("ContextElement") },
    ], false),
    "ContextElement": o$1([
        { json: "id", js: "id", typ: u$1(undefined, m$1("any")) },
        { json: "name", js: "name", typ: u$1(undefined, "") },
        { json: "type", js: "type", typ: "" },
    ], "any"),
    "BroadcastBridgeRequest": o$1([
        { json: "meta", js: "meta", typ: r$1("BroadcastBridgeRequestMeta") },
        { json: "payload", js: "payload", typ: r$1("BroadcastBridgeRequestPayload") },
        { json: "type", js: "type", typ: r$1("BroadcastAgentRequestType") },
    ], false),
    "BroadcastBridgeRequestMeta": o$1([
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "source", js: "source", typ: r$1("MetaSource") },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "MetaSource": o$1([
        { json: "appId", js: "appId", typ: "" },
        { json: "desktopAgent", js: "desktopAgent", typ: "" },
        { json: "instanceId", js: "instanceId", typ: u$1(undefined, "") },
    ], "any"),
    "BroadcastBridgeRequestPayload": o$1([
        { json: "channelId", js: "channelId", typ: "" },
        { json: "context", js: "context", typ: r$1("ContextElement") },
    ], false),
    "ConnectionStepMessage": o$1([
        { json: "meta", js: "meta", typ: r$1("ConnectionStepMetadata") },
        { json: "payload", js: "payload", typ: m$1("any") },
        { json: "type", js: "type", typ: r$1("ConnectionStepMessageType") },
    ], false),
    "ConnectionStepMetadata": o$1([
        { json: "requestUuid", js: "requestUuid", typ: u$1(undefined, "") },
        { json: "responseUuid", js: "responseUuid", typ: u$1(undefined, "") },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "ConnectionStep2Hello": o$1([
        { json: "meta", js: "meta", typ: r$1("ConnectionStep2HelloMeta") },
        { json: "payload", js: "payload", typ: r$1("ConnectionStep2HelloPayload") },
        { json: "type", js: "type", typ: r$1("ConnectionStep2HelloType") },
    ], false),
    "ConnectionStep2HelloMeta": o$1([
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "ConnectionStep2HelloPayload": o$1([
        { json: "authRequired", js: "authRequired", typ: true },
        { json: "authToken", js: "authToken", typ: u$1(undefined, "") },
        { json: "desktopAgentBridgeVersion", js: "desktopAgentBridgeVersion", typ: "" },
        { json: "supportedFDC3Versions", js: "supportedFDC3Versions", typ: a$1("") },
    ], false),
    "ConnectionStep3Handshake": o$1([
        { json: "meta", js: "meta", typ: r$1("ConnectionStep3HandshakeMeta") },
        { json: "payload", js: "payload", typ: r$1("ConnectionStep3HandshakePayload") },
        { json: "type", js: "type", typ: r$1("ConnectionStep3HandshakeType") },
    ], false),
    "ConnectionStep3HandshakeMeta": o$1([
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "ConnectionStep3HandshakePayload": o$1([
        { json: "authToken", js: "authToken", typ: u$1(undefined, "") },
        { json: "channelsState", js: "channelsState", typ: m$1(a$1(r$1("ContextElement"))) },
        { json: "implementationMetadata", js: "implementationMetadata", typ: r$1("ConnectingAgentImplementationMetadata") },
        { json: "requestedName", js: "requestedName", typ: "" },
    ], false),
    "ConnectingAgentImplementationMetadata": o$1([
        { json: "fdc3Version", js: "fdc3Version", typ: "" },
        { json: "optionalFeatures", js: "optionalFeatures", typ: r$1("OptionalFeatures") },
        { json: "provider", js: "provider", typ: "" },
        { json: "providerVersion", js: "providerVersion", typ: u$1(undefined, "") },
    ], false),
    "OptionalFeatures": o$1([
        { json: "DesktopAgentBridging", js: "DesktopAgentBridging", typ: true },
        { json: "OriginatingAppMetadata", js: "OriginatingAppMetadata", typ: true },
        { json: "UserChannelMembershipAPIs", js: "UserChannelMembershipAPIs", typ: true },
    ], false),
    "ConnectionStep4AuthenticationFailed": o$1([
        { json: "meta", js: "meta", typ: r$1("ConnectionStep4AuthenticationFailedMeta") },
        { json: "payload", js: "payload", typ: r$1("ConnectionStep4AuthenticationFailedPayload") },
        { json: "type", js: "type", typ: r$1("ConnectionStep4AuthenticationFailedType") },
    ], false),
    "ConnectionStep4AuthenticationFailedMeta": o$1([
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "responseUuid", js: "responseUuid", typ: "" },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "ConnectionStep4AuthenticationFailedPayload": o$1([
        { json: "message", js: "message", typ: u$1(undefined, "") },
    ], false),
    "ConnectionStep6ConnectedAgentsUpdate": o$1([
        { json: "meta", js: "meta", typ: r$1("ConnectionStep6ConnectedAgentsUpdateMeta") },
        { json: "payload", js: "payload", typ: r$1("ConnectionStep6ConnectedAgentsUpdatePayload") },
        { json: "type", js: "type", typ: r$1("ConnectionStep6ConnectedAgentsUpdateType") },
    ], false),
    "ConnectionStep6ConnectedAgentsUpdateMeta": o$1([
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "responseUuid", js: "responseUuid", typ: "" },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "ConnectionStep6ConnectedAgentsUpdatePayload": o$1([
        { json: "addAgent", js: "addAgent", typ: u$1(undefined, "") },
        { json: "allAgents", js: "allAgents", typ: a$1(r$1("DesktopAgentImplementationMetadata")) },
        { json: "channelsState", js: "channelsState", typ: u$1(undefined, m$1(a$1(r$1("ContextElement")))) },
        { json: "removeAgent", js: "removeAgent", typ: u$1(undefined, "") },
    ], false),
    "DesktopAgentImplementationMetadata": o$1([
        { json: "desktopAgent", js: "desktopAgent", typ: "" },
        { json: "fdc3Version", js: "fdc3Version", typ: "" },
        { json: "optionalFeatures", js: "optionalFeatures", typ: r$1("OptionalFeatures") },
        { json: "provider", js: "provider", typ: "" },
        { json: "providerVersion", js: "providerVersion", typ: u$1(undefined, "") },
    ], false),
    "FindInstancesAgentErrorResponse": o$1([
        { json: "meta", js: "meta", typ: r$1("FindInstancesAgentErrorResponseMeta") },
        { json: "payload", js: "payload", typ: r$1("FindInstancesAgentErrorResponsePayload") },
        { json: "type", js: "type", typ: r$1("FindInstancesAgentErrorResponseType") },
    ], false),
    "FindInstancesAgentErrorResponseMeta": o$1([
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "responseUuid", js: "responseUuid", typ: "" },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "FindInstancesAgentErrorResponsePayload": o$1([
        { json: "error", js: "error", typ: r$1("ErrorMessage") },
    ], false),
    "FindInstancesAgentRequest": o$1([
        { json: "meta", js: "meta", typ: r$1("FindInstancesAgentRequestMeta") },
        { json: "payload", js: "payload", typ: r$1("FindInstancesAgentRequestPayload") },
        { json: "type", js: "type", typ: r$1("FindInstancesAgentRequestType") },
    ], false),
    "FindInstancesAgentRequestMeta": o$1([
        { json: "destination", js: "destination", typ: u$1(undefined, r$1("DestinationObject")) },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "source", js: "source", typ: u$1(undefined, r$1("SourceIdentifier")) },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "DestinationObject": o$1([
        { json: "desktopAgent", js: "desktopAgent", typ: "" },
        { json: "appId", js: "appId", typ: u$1(undefined, "") },
        { json: "instanceId", js: "instanceId", typ: u$1(undefined, "") },
    ], "any"),
    "FindInstancesAgentRequestPayload": o$1([
        { json: "app", js: "app", typ: r$1("AppIdentifier") },
    ], false),
    "AppIdentifier": o$1([
        { json: "appId", js: "appId", typ: "" },
        { json: "desktopAgent", js: "desktopAgent", typ: u$1(undefined, "") },
        { json: "instanceId", js: "instanceId", typ: u$1(undefined, "") },
    ], "any"),
    "FindInstancesAgentResponse": o$1([
        { json: "meta", js: "meta", typ: r$1("FindInstancesAgentResponseMeta") },
        { json: "payload", js: "payload", typ: r$1("FindInstancesAgentResponsePayload") },
        { json: "type", js: "type", typ: r$1("FindInstancesAgentErrorResponseType") },
    ], false),
    "FindInstancesAgentResponseMeta": o$1([
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "responseUuid", js: "responseUuid", typ: "" },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "FindInstancesAgentResponsePayload": o$1([
        { json: "appIdentifiers", js: "appIdentifiers", typ: a$1(r$1("AppMetadata")) },
    ], false),
    "AppMetadata": o$1([
        { json: "appId", js: "appId", typ: "" },
        { json: "description", js: "description", typ: u$1(undefined, "") },
        { json: "desktopAgent", js: "desktopAgent", typ: u$1(undefined, "") },
        { json: "icons", js: "icons", typ: u$1(undefined, a$1(r$1("Icon"))) },
        { json: "instanceId", js: "instanceId", typ: u$1(undefined, "") },
        { json: "instanceMetadata", js: "instanceMetadata", typ: u$1(undefined, m$1("any")) },
        { json: "name", js: "name", typ: u$1(undefined, "") },
        { json: "resultType", js: "resultType", typ: u$1(undefined, u$1(null, "")) },
        { json: "screenshots", js: "screenshots", typ: u$1(undefined, a$1(r$1("Image"))) },
        { json: "title", js: "title", typ: u$1(undefined, "") },
        { json: "tooltip", js: "tooltip", typ: u$1(undefined, "") },
        { json: "version", js: "version", typ: u$1(undefined, "") },
    ], false),
    "Icon": o$1([
        { json: "size", js: "size", typ: u$1(undefined, "") },
        { json: "src", js: "src", typ: "" },
        { json: "type", js: "type", typ: u$1(undefined, "") },
    ], false),
    "Image": o$1([
        { json: "label", js: "label", typ: u$1(undefined, "") },
        { json: "size", js: "size", typ: u$1(undefined, "") },
        { json: "src", js: "src", typ: "" },
        { json: "type", js: "type", typ: u$1(undefined, "") },
    ], false),
    "FindInstancesBridgeErrorResponse": o$1([
        { json: "meta", js: "meta", typ: r$1("FindInstancesBridgeErrorResponseMeta") },
        { json: "payload", js: "payload", typ: r$1("FindInstancesBridgeErrorResponsePayload") },
        { json: "type", js: "type", typ: r$1("FindInstancesAgentErrorResponseType") },
    ], false),
    "FindInstancesBridgeErrorResponseMeta": o$1([
        { json: "errorDetails", js: "errorDetails", typ: a$1(r$1("ResponseErrorDetail")) },
        { json: "errorSources", js: "errorSources", typ: a$1(r$1("DesktopAgentIdentifier")) },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "responseUuid", js: "responseUuid", typ: "" },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "FindInstancesBridgeErrorResponsePayload": o$1([
        { json: "error", js: "error", typ: r$1("ErrorMessage") },
    ], false),
    "FindInstancesBridgeRequest": o$1([
        { json: "meta", js: "meta", typ: r$1("FindInstancesBridgeRequestMeta") },
        { json: "payload", js: "payload", typ: r$1("FindInstancesBridgeRequestPayload") },
        { json: "type", js: "type", typ: r$1("FindInstancesAgentRequestType") },
    ], false),
    "FindInstancesBridgeRequestMeta": o$1([
        { json: "destination", js: "destination", typ: u$1(undefined, r$1("DestinationObject")) },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "source", js: "source", typ: r$1("MetaSourceObject") },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "MetaSourceObject": o$1([
        { json: "appId", js: "appId", typ: u$1(undefined, "") },
        { json: "desktopAgent", js: "desktopAgent", typ: "" },
        { json: "instanceId", js: "instanceId", typ: u$1(undefined, "") },
    ], "any"),
    "FindInstancesBridgeRequestPayload": o$1([
        { json: "app", js: "app", typ: r$1("AppIdentifier") },
    ], false),
    "FindInstancesBridgeResponse": o$1([
        { json: "meta", js: "meta", typ: r$1("FindInstancesBridgeResponseMeta") },
        { json: "payload", js: "payload", typ: r$1("FindInstancesBridgeResponsePayload") },
        { json: "type", js: "type", typ: r$1("FindInstancesAgentErrorResponseType") },
    ], false),
    "FindInstancesBridgeResponseMeta": o$1([
        { json: "errorDetails", js: "errorDetails", typ: u$1(undefined, a$1(r$1("ResponseErrorDetail"))) },
        { json: "errorSources", js: "errorSources", typ: u$1(undefined, a$1(r$1("DesktopAgentIdentifier"))) },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "responseUuid", js: "responseUuid", typ: "" },
        { json: "sources", js: "sources", typ: u$1(undefined, a$1(r$1("DesktopAgentIdentifier"))) },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "FindInstancesBridgeResponsePayload": o$1([
        { json: "appIdentifiers", js: "appIdentifiers", typ: a$1(r$1("AppMetadata")) },
    ], false),
    "FindIntentAgentErrorResponse": o$1([
        { json: "meta", js: "meta", typ: r$1("FindIntentAgentErrorResponseMeta") },
        { json: "payload", js: "payload", typ: r$1("FindIntentAgentErrorResponsePayload") },
        { json: "type", js: "type", typ: r$1("FindIntentAgentErrorResponseType") },
    ], false),
    "FindIntentAgentErrorResponseMeta": o$1([
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "responseUuid", js: "responseUuid", typ: "" },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "FindIntentAgentErrorResponsePayload": o$1([
        { json: "error", js: "error", typ: r$1("ErrorMessage") },
    ], false),
    "FindIntentAgentRequest": o$1([
        { json: "meta", js: "meta", typ: r$1("FindIntentAgentRequestMeta") },
        { json: "payload", js: "payload", typ: r$1("FindIntentAgentRequestPayload") },
        { json: "type", js: "type", typ: r$1("FindIntentAgentRequestType") },
    ], false),
    "FindIntentAgentRequestMeta": o$1([
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "source", js: "source", typ: u$1(undefined, r$1("SourceIdentifier")) },
        { json: "timestamp", js: "timestamp", typ: Date },
        { json: "destination", js: "destination", typ: u$1(undefined, r$1("BridgeParticipantIdentifier")) },
    ], false),
    "FindIntentAgentRequestPayload": o$1([
        { json: "context", js: "context", typ: u$1(undefined, r$1("ContextElement")) },
        { json: "intent", js: "intent", typ: "" },
        { json: "resultType", js: "resultType", typ: u$1(undefined, "") },
    ], false),
    "FindIntentAgentResponse": o$1([
        { json: "meta", js: "meta", typ: r$1("FindIntentAgentResponseMeta") },
        { json: "payload", js: "payload", typ: r$1("FindIntentAgentResponsePayload") },
        { json: "type", js: "type", typ: r$1("FindIntentAgentErrorResponseType") },
    ], false),
    "FindIntentAgentResponseMeta": o$1([
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "responseUuid", js: "responseUuid", typ: "" },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "FindIntentAgentResponsePayload": o$1([
        { json: "appIntent", js: "appIntent", typ: r$1("AppIntent") },
    ], false),
    "AppIntent": o$1([
        { json: "apps", js: "apps", typ: a$1(r$1("AppMetadata")) },
        { json: "intent", js: "intent", typ: r$1("IntentMetadata") },
    ], false),
    "IntentMetadata": o$1([
        { json: "displayName", js: "displayName", typ: "" },
        { json: "name", js: "name", typ: "" },
    ], false),
    "FindIntentBridgeErrorResponse": o$1([
        { json: "meta", js: "meta", typ: r$1("FindIntentBridgeErrorResponseMeta") },
        { json: "payload", js: "payload", typ: r$1("FindIntentBridgeErrorResponsePayload") },
        { json: "type", js: "type", typ: r$1("FindIntentAgentErrorResponseType") },
    ], false),
    "FindIntentBridgeErrorResponseMeta": o$1([
        { json: "errorDetails", js: "errorDetails", typ: a$1(r$1("ResponseErrorDetail")) },
        { json: "errorSources", js: "errorSources", typ: a$1(r$1("DesktopAgentIdentifier")) },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "responseUuid", js: "responseUuid", typ: "" },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "FindIntentBridgeErrorResponsePayload": o$1([
        { json: "error", js: "error", typ: r$1("ErrorMessage") },
    ], false),
    "FindIntentBridgeRequest": o$1([
        { json: "meta", js: "meta", typ: r$1("FindIntentBridgeRequestMeta") },
        { json: "payload", js: "payload", typ: r$1("FindIntentBridgeRequestPayload") },
        { json: "type", js: "type", typ: r$1("FindIntentAgentRequestType") },
    ], false),
    "FindIntentBridgeRequestMeta": o$1([
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "source", js: "source", typ: r$1("BridgeParticipantIdentifier") },
        { json: "timestamp", js: "timestamp", typ: Date },
        { json: "destination", js: "destination", typ: u$1(undefined, r$1("BridgeParticipantIdentifier")) },
    ], false),
    "FindIntentBridgeRequestPayload": o$1([
        { json: "context", js: "context", typ: u$1(undefined, r$1("ContextElement")) },
        { json: "intent", js: "intent", typ: "" },
        { json: "resultType", js: "resultType", typ: u$1(undefined, "") },
    ], false),
    "FindIntentBridgeResponse": o$1([
        { json: "meta", js: "meta", typ: r$1("FindIntentBridgeResponseMeta") },
        { json: "payload", js: "payload", typ: r$1("FindIntentBridgeResponsePayload") },
        { json: "type", js: "type", typ: r$1("FindIntentAgentErrorResponseType") },
    ], false),
    "FindIntentBridgeResponseMeta": o$1([
        { json: "errorDetails", js: "errorDetails", typ: u$1(undefined, a$1(r$1("ResponseErrorDetail"))) },
        { json: "errorSources", js: "errorSources", typ: u$1(undefined, a$1(r$1("DesktopAgentIdentifier"))) },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "responseUuid", js: "responseUuid", typ: "" },
        { json: "sources", js: "sources", typ: u$1(undefined, a$1(r$1("DesktopAgentIdentifier"))) },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "FindIntentBridgeResponsePayload": o$1([
        { json: "appIntent", js: "appIntent", typ: r$1("AppIntent") },
    ], false),
    "FindIntentsByContextAgentErrorResponse": o$1([
        { json: "meta", js: "meta", typ: r$1("FindIntentsByContextAgentErrorResponseMeta") },
        { json: "payload", js: "payload", typ: r$1("FindIntentsByContextAgentErrorResponsePayload") },
        { json: "type", js: "type", typ: r$1("FindIntentsByContextAgentErrorResponseType") },
    ], false),
    "FindIntentsByContextAgentErrorResponseMeta": o$1([
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "responseUuid", js: "responseUuid", typ: "" },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "FindIntentsByContextAgentErrorResponsePayload": o$1([
        { json: "error", js: "error", typ: r$1("ErrorMessage") },
    ], false),
    "FindIntentsByContextAgentRequest": o$1([
        { json: "meta", js: "meta", typ: r$1("FindIntentsByContextAgentRequestMeta") },
        { json: "payload", js: "payload", typ: r$1("FindIntentsByContextAgentRequestPayload") },
        { json: "type", js: "type", typ: r$1("FindIntentsByContextAgentRequestType") },
    ], false),
    "FindIntentsByContextAgentRequestMeta": o$1([
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "source", js: "source", typ: u$1(undefined, r$1("SourceObject")) },
        { json: "timestamp", js: "timestamp", typ: Date },
        { json: "destination", js: "destination", typ: u$1(undefined, r$1("BridgeParticipantIdentifier")) },
    ], false),
    "FindIntentsByContextAgentRequestPayload": o$1([
        { json: "context", js: "context", typ: r$1("ContextElement") },
    ], false),
    "FindIntentsByContextAgentResponse": o$1([
        { json: "meta", js: "meta", typ: r$1("FindIntentsByContextAgentResponseMeta") },
        { json: "payload", js: "payload", typ: r$1("FindIntentsByContextAgentResponsePayload") },
        { json: "type", js: "type", typ: r$1("FindIntentsByContextAgentErrorResponseType") },
    ], false),
    "FindIntentsByContextAgentResponseMeta": o$1([
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "responseUuid", js: "responseUuid", typ: "" },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "FindIntentsByContextAgentResponsePayload": o$1([
        { json: "appIntents", js: "appIntents", typ: a$1(r$1("AppIntent")) },
    ], false),
    "FindIntentsByContextBridgeErrorResponse": o$1([
        { json: "meta", js: "meta", typ: r$1("FindIntentsByContextBridgeErrorResponseMeta") },
        { json: "payload", js: "payload", typ: r$1("FindIntentsByContextBridgeErrorResponsePayload") },
        { json: "type", js: "type", typ: r$1("FindIntentsByContextAgentErrorResponseType") },
    ], false),
    "FindIntentsByContextBridgeErrorResponseMeta": o$1([
        { json: "errorDetails", js: "errorDetails", typ: a$1(r$1("ResponseErrorDetail")) },
        { json: "errorSources", js: "errorSources", typ: a$1(r$1("DesktopAgentIdentifier")) },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "responseUuid", js: "responseUuid", typ: "" },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "FindIntentsByContextBridgeErrorResponsePayload": o$1([
        { json: "error", js: "error", typ: r$1("ErrorMessage") },
    ], false),
    "FindIntentsByContextBridgeRequest": o$1([
        { json: "meta", js: "meta", typ: r$1("FindIntentsByContextBridgeRequestMeta") },
        { json: "payload", js: "payload", typ: r$1("FindIntentsByContextBridgeRequestPayload") },
        { json: "type", js: "type", typ: r$1("FindIntentsByContextAgentRequestType") },
    ], false),
    "FindIntentsByContextBridgeRequestMeta": o$1([
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "source", js: "source", typ: r$1("MetaSource") },
        { json: "timestamp", js: "timestamp", typ: Date },
        { json: "destination", js: "destination", typ: u$1(undefined, r$1("BridgeParticipantIdentifier")) },
    ], false),
    "FindIntentsByContextBridgeRequestPayload": o$1([
        { json: "context", js: "context", typ: r$1("ContextElement") },
    ], false),
    "FindIntentsByContextBridgeResponse": o$1([
        { json: "meta", js: "meta", typ: r$1("FindIntentsByContextBridgeResponseMeta") },
        { json: "payload", js: "payload", typ: r$1("FindIntentsByContextBridgeResponsePayload") },
        { json: "type", js: "type", typ: r$1("FindIntentsByContextAgentErrorResponseType") },
    ], false),
    "FindIntentsByContextBridgeResponseMeta": o$1([
        { json: "errorDetails", js: "errorDetails", typ: u$1(undefined, a$1(r$1("ResponseErrorDetail"))) },
        { json: "errorSources", js: "errorSources", typ: u$1(undefined, a$1(r$1("DesktopAgentIdentifier"))) },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "responseUuid", js: "responseUuid", typ: "" },
        { json: "sources", js: "sources", typ: u$1(undefined, a$1(r$1("DesktopAgentIdentifier"))) },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "FindIntentsByContextBridgeResponsePayload": o$1([
        { json: "appIntents", js: "appIntents", typ: a$1(r$1("AppIntent")) },
    ], false),
    "GetAppMetadataAgentErrorResponse": o$1([
        { json: "meta", js: "meta", typ: r$1("GetAppMetadataAgentErrorResponseMeta") },
        { json: "payload", js: "payload", typ: r$1("GetAppMetadataAgentErrorResponsePayload") },
        { json: "type", js: "type", typ: r$1("GetAppMetadataAgentErrorResponseType") },
    ], false),
    "GetAppMetadataAgentErrorResponseMeta": o$1([
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "responseUuid", js: "responseUuid", typ: "" },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "GetAppMetadataAgentErrorResponsePayload": o$1([
        { json: "error", js: "error", typ: r$1("ErrorMessage") },
    ], false),
    "GetAppMetadataAgentRequest": o$1([
        { json: "meta", js: "meta", typ: r$1("GetAppMetadataAgentRequestMeta") },
        { json: "payload", js: "payload", typ: r$1("GetAppMetadataAgentRequestPayload") },
        { json: "type", js: "type", typ: r$1("GetAppMetadataAgentRequestType") },
    ], false),
    "GetAppMetadataAgentRequestMeta": o$1([
        { json: "destination", js: "destination", typ: u$1(undefined, r$1("DestinationObject")) },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "source", js: "source", typ: u$1(undefined, r$1("SourceIdentifier")) },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "GetAppMetadataAgentRequestPayload": o$1([
        { json: "app", js: "app", typ: r$1("AppDestinationIdentifier") },
    ], false),
    "AppDestinationIdentifier": o$1([
        { json: "desktopAgent", js: "desktopAgent", typ: "" },
        { json: "appId", js: "appId", typ: "" },
        { json: "instanceId", js: "instanceId", typ: u$1(undefined, "") },
    ], "any"),
    "GetAppMetadataAgentResponse": o$1([
        { json: "meta", js: "meta", typ: r$1("GetAppMetadataAgentResponseMeta") },
        { json: "payload", js: "payload", typ: r$1("GetAppMetadataAgentResponsePayload") },
        { json: "type", js: "type", typ: r$1("GetAppMetadataAgentErrorResponseType") },
    ], false),
    "GetAppMetadataAgentResponseMeta": o$1([
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "responseUuid", js: "responseUuid", typ: "" },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "GetAppMetadataAgentResponsePayload": o$1([
        { json: "appMetadata", js: "appMetadata", typ: r$1("AppMetadata") },
    ], false),
    "GetAppMetadataBridgeErrorResponse": o$1([
        { json: "meta", js: "meta", typ: r$1("GetAppMetadataBridgeErrorResponseMeta") },
        { json: "payload", js: "payload", typ: r$1("GetAppMetadataBridgeErrorResponsePayload") },
        { json: "type", js: "type", typ: r$1("GetAppMetadataAgentErrorResponseType") },
    ], false),
    "GetAppMetadataBridgeErrorResponseMeta": o$1([
        { json: "errorDetails", js: "errorDetails", typ: a$1(r$1("ResponseErrorDetail")) },
        { json: "errorSources", js: "errorSources", typ: a$1(r$1("DesktopAgentIdentifier")) },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "responseUuid", js: "responseUuid", typ: "" },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "GetAppMetadataBridgeErrorResponsePayload": o$1([
        { json: "error", js: "error", typ: r$1("ErrorMessage") },
    ], false),
    "GetAppMetadataBridgeRequest": o$1([
        { json: "meta", js: "meta", typ: r$1("GetAppMetadataBridgeRequestMeta") },
        { json: "payload", js: "payload", typ: r$1("GetAppMetadataBridgeRequestPayload") },
        { json: "type", js: "type", typ: r$1("GetAppMetadataAgentRequestType") },
    ], false),
    "GetAppMetadataBridgeRequestMeta": o$1([
        { json: "destination", js: "destination", typ: u$1(undefined, r$1("DestinationObject")) },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "source", js: "source", typ: r$1("MetaSourceObject") },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "GetAppMetadataBridgeRequestPayload": o$1([
        { json: "app", js: "app", typ: r$1("AppDestinationIdentifier") },
    ], false),
    "GetAppMetadataBridgeResponse": o$1([
        { json: "meta", js: "meta", typ: r$1("GetAppMetadataBridgeResponseMeta") },
        { json: "payload", js: "payload", typ: r$1("GetAppMetadataBridgeResponsePayload") },
        { json: "type", js: "type", typ: r$1("GetAppMetadataAgentErrorResponseType") },
    ], false),
    "GetAppMetadataBridgeResponseMeta": o$1([
        { json: "errorDetails", js: "errorDetails", typ: u$1(undefined, a$1(r$1("ResponseErrorDetail"))) },
        { json: "errorSources", js: "errorSources", typ: u$1(undefined, a$1(r$1("DesktopAgentIdentifier"))) },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "responseUuid", js: "responseUuid", typ: "" },
        { json: "sources", js: "sources", typ: u$1(undefined, a$1(r$1("DesktopAgentIdentifier"))) },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "GetAppMetadataBridgeResponsePayload": o$1([
        { json: "appMetadata", js: "appMetadata", typ: r$1("AppMetadata") },
    ], false),
    "OpenAgentErrorResponse": o$1([
        { json: "meta", js: "meta", typ: r$1("OpenAgentErrorResponseMeta") },
        { json: "payload", js: "payload", typ: r$1("OpenAgentErrorResponsePayload") },
        { json: "type", js: "type", typ: r$1("OpenAgentErrorResponseType") },
    ], false),
    "OpenAgentErrorResponseMeta": o$1([
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "responseUuid", js: "responseUuid", typ: "" },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "OpenAgentErrorResponsePayload": o$1([
        { json: "error", js: "error", typ: r$1("OpenErrorMessage") },
    ], false),
    "OpenAgentRequest": o$1([
        { json: "meta", js: "meta", typ: r$1("OpenAgentRequestMeta") },
        { json: "payload", js: "payload", typ: r$1("OpenAgentRequestPayload") },
        { json: "type", js: "type", typ: r$1("OpenAgentRequestType") },
    ], false),
    "OpenAgentRequestMeta": o$1([
        { json: "destination", js: "destination", typ: u$1(undefined, r$1("DestinationObject")) },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "source", js: "source", typ: r$1("SourceObject") },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "OpenAgentRequestPayload": o$1([
        { json: "app", js: "app", typ: r$1("AppToOpen") },
        { json: "context", js: "context", typ: u$1(undefined, r$1("ContextElement")) },
    ], false),
    "AppToOpen": o$1([
        { json: "desktopAgent", js: "desktopAgent", typ: "" },
        { json: "appId", js: "appId", typ: "" },
        { json: "instanceId", js: "instanceId", typ: u$1(undefined, "") },
    ], "any"),
    "OpenAgentResponse": o$1([
        { json: "meta", js: "meta", typ: r$1("OpenAgentResponseMeta") },
        { json: "payload", js: "payload", typ: r$1("OpenAgentResponsePayload") },
        { json: "type", js: "type", typ: r$1("OpenAgentErrorResponseType") },
    ], false),
    "OpenAgentResponseMeta": o$1([
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "responseUuid", js: "responseUuid", typ: "" },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "OpenAgentResponsePayload": o$1([
        { json: "appIdentifier", js: "appIdentifier", typ: r$1("AppIdentifier") },
    ], false),
    "OpenBridgeErrorResponse": o$1([
        { json: "meta", js: "meta", typ: r$1("OpenBridgeErrorResponseMeta") },
        { json: "payload", js: "payload", typ: r$1("OpenBridgeErrorResponsePayload") },
        { json: "type", js: "type", typ: r$1("OpenAgentErrorResponseType") },
    ], false),
    "OpenBridgeErrorResponseMeta": o$1([
        { json: "errorDetails", js: "errorDetails", typ: a$1(r$1("ResponseErrorDetail")) },
        { json: "errorSources", js: "errorSources", typ: a$1(r$1("DesktopAgentIdentifier")) },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "responseUuid", js: "responseUuid", typ: "" },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "OpenBridgeErrorResponsePayload": o$1([
        { json: "error", js: "error", typ: r$1("OpenErrorMessage") },
    ], false),
    "OpenBridgeRequest": o$1([
        { json: "meta", js: "meta", typ: r$1("OpenBridgeRequestMeta") },
        { json: "payload", js: "payload", typ: r$1("OpenBridgeRequestPayload") },
        { json: "type", js: "type", typ: r$1("OpenAgentRequestType") },
    ], false),
    "OpenBridgeRequestMeta": o$1([
        { json: "destination", js: "destination", typ: u$1(undefined, r$1("DestinationObject")) },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "source", js: "source", typ: r$1("MetaSource") },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "OpenBridgeRequestPayload": o$1([
        { json: "app", js: "app", typ: r$1("AppToOpen") },
        { json: "context", js: "context", typ: u$1(undefined, r$1("ContextElement")) },
    ], false),
    "OpenBridgeResponse": o$1([
        { json: "meta", js: "meta", typ: r$1("OpenBridgeResponseMeta") },
        { json: "payload", js: "payload", typ: r$1("OpenBridgeResponsePayload") },
        { json: "type", js: "type", typ: r$1("OpenAgentErrorResponseType") },
    ], false),
    "OpenBridgeResponseMeta": o$1([
        { json: "errorDetails", js: "errorDetails", typ: u$1(undefined, a$1(r$1("ResponseErrorDetail"))) },
        { json: "errorSources", js: "errorSources", typ: u$1(undefined, a$1(r$1("DesktopAgentIdentifier"))) },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "responseUuid", js: "responseUuid", typ: "" },
        { json: "sources", js: "sources", typ: u$1(undefined, a$1(r$1("DesktopAgentIdentifier"))) },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "OpenBridgeResponsePayload": o$1([
        { json: "appIdentifier", js: "appIdentifier", typ: r$1("AppIdentifier") },
    ], false),
    "PrivateChannelBroadcastAgentRequest": o$1([
        { json: "meta", js: "meta", typ: r$1("PrivateChannelBroadcastAgentRequestMeta") },
        { json: "payload", js: "payload", typ: r$1("PrivateChannelBroadcastAgentRequestPayload") },
        { json: "type", js: "type", typ: r$1("PrivateChannelBroadcastAgentRequestType") },
    ], false),
    "PrivateChannelBroadcastAgentRequestMeta": o$1([
        { json: "destination", js: "destination", typ: u$1(undefined, r$1("MetaDestination")) },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "source", js: "source", typ: u$1(undefined, r$1("SourceObject")) },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "MetaDestination": o$1([
        { json: "desktopAgent", js: "desktopAgent", typ: "" },
        { json: "appId", js: "appId", typ: "" },
        { json: "instanceId", js: "instanceId", typ: u$1(undefined, "") },
    ], "any"),
    "PrivateChannelBroadcastAgentRequestPayload": o$1([
        { json: "channelId", js: "channelId", typ: "" },
        { json: "context", js: "context", typ: r$1("ContextElement") },
    ], false),
    "PrivateChannelBroadcastBridgeRequest": o$1([
        { json: "meta", js: "meta", typ: r$1("PrivateChannelBroadcastBridgeRequestMeta") },
        { json: "payload", js: "payload", typ: r$1("PrivateChannelBroadcastBridgeRequestPayload") },
        { json: "type", js: "type", typ: r$1("PrivateChannelBroadcastAgentRequestType") },
    ], false),
    "PrivateChannelBroadcastBridgeRequestMeta": o$1([
        { json: "destination", js: "destination", typ: u$1(undefined, r$1("MetaDestination")) },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "source", js: "source", typ: r$1("MetaSource") },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "PrivateChannelBroadcastBridgeRequestPayload": o$1([
        { json: "channelId", js: "channelId", typ: "" },
        { json: "context", js: "context", typ: r$1("ContextElement") },
    ], false),
    "PrivateChannelEventListenerAddedAgentRequest": o$1([
        { json: "meta", js: "meta", typ: r$1("PrivateChannelEventListenerAddedAgentRequestMeta") },
        { json: "payload", js: "payload", typ: r$1("PrivateChannelEventListenerAddedAgentRequestPayload") },
        { json: "type", js: "type", typ: r$1("PrivateChannelEventListenerAddedAgentRequestType") },
    ], false),
    "PrivateChannelEventListenerAddedAgentRequestMeta": o$1([
        { json: "destination", js: "destination", typ: u$1(undefined, r$1("MetaDestination")) },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "source", js: "source", typ: u$1(undefined, r$1("SourceObject")) },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "PrivateChannelEventListenerAddedAgentRequestPayload": o$1([
        { json: "channelId", js: "channelId", typ: "" },
        { json: "listenerType", js: "listenerType", typ: r$1("PrivateChannelEventListenerTypes") },
    ], false),
    "PrivateChannelEventListenerAddedBridgeRequest": o$1([
        { json: "meta", js: "meta", typ: r$1("PrivateChannelEventListenerAddedBridgeRequestMeta") },
        { json: "payload", js: "payload", typ: r$1("PrivateChannelEventListenerAddedBridgeRequestPayload") },
        { json: "type", js: "type", typ: r$1("PrivateChannelEventListenerAddedAgentRequestType") },
    ], false),
    "PrivateChannelEventListenerAddedBridgeRequestMeta": o$1([
        { json: "destination", js: "destination", typ: u$1(undefined, r$1("MetaDestination")) },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "source", js: "source", typ: r$1("MetaSource") },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "PrivateChannelEventListenerAddedBridgeRequestPayload": o$1([
        { json: "channelId", js: "channelId", typ: "" },
        { json: "listenerType", js: "listenerType", typ: r$1("PrivateChannelEventListenerTypes") },
    ], false),
    "PrivateChannelEventListenerRemovedAgentRequest": o$1([
        { json: "meta", js: "meta", typ: r$1("PrivateChannelEventListenerRemovedAgentRequestMeta") },
        { json: "payload", js: "payload", typ: r$1("PrivateChannelEventListenerRemovedAgentRequestPayload") },
        { json: "type", js: "type", typ: r$1("PrivateChannelEventListenerRemovedAgentRequestType") },
    ], false),
    "PrivateChannelEventListenerRemovedAgentRequestMeta": o$1([
        { json: "destination", js: "destination", typ: u$1(undefined, r$1("MetaDestination")) },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "source", js: "source", typ: u$1(undefined, r$1("SourceObject")) },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "PrivateChannelEventListenerRemovedAgentRequestPayload": o$1([
        { json: "channelId", js: "channelId", typ: "" },
        { json: "listenerType", js: "listenerType", typ: r$1("PrivateChannelEventListenerTypes") },
    ], false),
    "PrivateChannelEventListenerRemovedBridgeRequest": o$1([
        { json: "meta", js: "meta", typ: r$1("PrivateChannelEventListenerRemovedBridgeRequestMeta") },
        { json: "payload", js: "payload", typ: r$1("PrivateChannelEventListenerRemovedBridgeRequestPayload") },
        { json: "type", js: "type", typ: r$1("PrivateChannelEventListenerRemovedAgentRequestType") },
    ], false),
    "PrivateChannelEventListenerRemovedBridgeRequestMeta": o$1([
        { json: "destination", js: "destination", typ: u$1(undefined, r$1("MetaDestination")) },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "source", js: "source", typ: r$1("MetaSource") },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "PrivateChannelEventListenerRemovedBridgeRequestPayload": o$1([
        { json: "channelId", js: "channelId", typ: "" },
        { json: "listenerType", js: "listenerType", typ: r$1("PrivateChannelEventListenerTypes") },
    ], false),
    "PrivateChannelOnAddContextListenerAgentRequest": o$1([
        { json: "meta", js: "meta", typ: r$1("PrivateChannelOnAddContextListenerAgentRequestMeta") },
        { json: "payload", js: "payload", typ: r$1("PrivateChannelOnAddContextListenerAgentRequestPayload") },
        { json: "type", js: "type", typ: r$1("PrivateChannelOnAddContextListenerAgentRequestType") },
    ], false),
    "PrivateChannelOnAddContextListenerAgentRequestMeta": o$1([
        { json: "destination", js: "destination", typ: u$1(undefined, r$1("MetaDestination")) },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "source", js: "source", typ: u$1(undefined, r$1("SourceObject")) },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "PrivateChannelOnAddContextListenerAgentRequestPayload": o$1([
        { json: "channelId", js: "channelId", typ: "" },
        { json: "contextType", js: "contextType", typ: u$1(null, "") },
    ], false),
    "PrivateChannelOnAddContextListenerBridgeRequest": o$1([
        { json: "meta", js: "meta", typ: r$1("PrivateChannelOnAddContextListenerBridgeRequestMeta") },
        { json: "payload", js: "payload", typ: r$1("PrivateChannelOnAddContextListenerBridgeRequestPayload") },
        { json: "type", js: "type", typ: r$1("PrivateChannelOnAddContextListenerAgentRequestType") },
    ], false),
    "PrivateChannelOnAddContextListenerBridgeRequestMeta": o$1([
        { json: "destination", js: "destination", typ: u$1(undefined, r$1("MetaDestination")) },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "source", js: "source", typ: r$1("MetaSource") },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "PrivateChannelOnAddContextListenerBridgeRequestPayload": o$1([
        { json: "channelId", js: "channelId", typ: "" },
        { json: "contextType", js: "contextType", typ: u$1(null, "") },
    ], false),
    "PrivateChannelOnDisconnectAgentRequest": o$1([
        { json: "meta", js: "meta", typ: r$1("PrivateChannelOnDisconnectAgentRequestMeta") },
        { json: "payload", js: "payload", typ: r$1("PrivateChannelOnDisconnectAgentRequestPayload") },
        { json: "type", js: "type", typ: r$1("PrivateChannelOnDisconnectAgentRequestType") },
    ], false),
    "PrivateChannelOnDisconnectAgentRequestMeta": o$1([
        { json: "destination", js: "destination", typ: u$1(undefined, r$1("MetaDestination")) },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "source", js: "source", typ: u$1(undefined, r$1("SourceObject")) },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "PrivateChannelOnDisconnectAgentRequestPayload": o$1([
        { json: "channelId", js: "channelId", typ: "" },
    ], false),
    "PrivateChannelOnDisconnectBridgeRequest": o$1([
        { json: "meta", js: "meta", typ: r$1("PrivateChannelOnDisconnectBridgeRequestMeta") },
        { json: "payload", js: "payload", typ: r$1("PrivateChannelOnDisconnectBridgeRequestPayload") },
        { json: "type", js: "type", typ: r$1("PrivateChannelOnDisconnectAgentRequestType") },
    ], false),
    "PrivateChannelOnDisconnectBridgeRequestMeta": o$1([
        { json: "destination", js: "destination", typ: u$1(undefined, r$1("MetaDestination")) },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "source", js: "source", typ: r$1("MetaSource") },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "PrivateChannelOnDisconnectBridgeRequestPayload": o$1([
        { json: "channelId", js: "channelId", typ: "" },
    ], false),
    "PrivateChannelOnUnsubscribeAgentRequest": o$1([
        { json: "meta", js: "meta", typ: r$1("PrivateChannelOnUnsubscribeAgentRequestMeta") },
        { json: "payload", js: "payload", typ: r$1("PrivateChannelOnUnsubscribeAgentRequestPayload") },
        { json: "type", js: "type", typ: r$1("PrivateChannelOnUnsubscribeAgentRequestType") },
    ], false),
    "PrivateChannelOnUnsubscribeAgentRequestMeta": o$1([
        { json: "destination", js: "destination", typ: u$1(undefined, r$1("MetaDestination")) },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "source", js: "source", typ: u$1(undefined, r$1("SourceObject")) },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "PrivateChannelOnUnsubscribeAgentRequestPayload": o$1([
        { json: "channelId", js: "channelId", typ: "" },
        { json: "contextType", js: "contextType", typ: u$1(null, "") },
    ], false),
    "PrivateChannelOnUnsubscribeBridgeRequest": o$1([
        { json: "meta", js: "meta", typ: r$1("ERequestMetadata") },
        { json: "payload", js: "payload", typ: r$1("PrivateChannelOnUnsubscribeBridgeRequestPayload") },
        { json: "type", js: "type", typ: r$1("PrivateChannelOnUnsubscribeAgentRequestType") },
    ], false),
    "ERequestMetadata": o$1([
        { json: "destination", js: "destination", typ: u$1(undefined, r$1("MetaDestination")) },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "source", js: "source", typ: r$1("MetaSource") },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "PrivateChannelOnUnsubscribeBridgeRequestPayload": o$1([
        { json: "channelId", js: "channelId", typ: "" },
        { json: "contextType", js: "contextType", typ: u$1(null, "") },
    ], false),
    "RaiseIntentAgentErrorResponse": o$1([
        { json: "meta", js: "meta", typ: r$1("RaiseIntentAgentErrorResponseMeta") },
        { json: "payload", js: "payload", typ: r$1("RaiseIntentAgentErrorResponsePayload") },
        { json: "type", js: "type", typ: r$1("RaiseIntentAgentErrorResponseType") },
    ], false),
    "RaiseIntentAgentErrorResponseMeta": o$1([
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "responseUuid", js: "responseUuid", typ: "" },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "RaiseIntentAgentErrorResponsePayload": o$1([
        { json: "error", js: "error", typ: r$1("ErrorMessage") },
    ], false),
    "RaiseIntentAgentRequest": o$1([
        { json: "meta", js: "meta", typ: r$1("RaiseIntentAgentRequestMeta") },
        { json: "payload", js: "payload", typ: r$1("RaiseIntentAgentRequestPayload") },
        { json: "type", js: "type", typ: r$1("RaiseIntentAgentRequestType") },
    ], false),
    "RaiseIntentAgentRequestMeta": o$1([
        { json: "destination", js: "destination", typ: r$1("MetaDestination") },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "source", js: "source", typ: r$1("SourceObject") },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "RaiseIntentAgentRequestPayload": o$1([
        { json: "app", js: "app", typ: r$1("AppDestinationIdentifier") },
        { json: "context", js: "context", typ: r$1("ContextElement") },
        { json: "intent", js: "intent", typ: "" },
    ], false),
    "RaiseIntentAgentResponse": o$1([
        { json: "meta", js: "meta", typ: r$1("RaiseIntentAgentResponseMeta") },
        { json: "payload", js: "payload", typ: r$1("RaiseIntentAgentResponsePayload") },
        { json: "type", js: "type", typ: r$1("RaiseIntentAgentErrorResponseType") },
    ], false),
    "RaiseIntentAgentResponseMeta": o$1([
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "responseUuid", js: "responseUuid", typ: "" },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "RaiseIntentAgentResponsePayload": o$1([
        { json: "intentResolution", js: "intentResolution", typ: r$1("IntentResolution") },
    ], false),
    "IntentResolution": o$1([
        { json: "intent", js: "intent", typ: "" },
        { json: "source", js: "source", typ: r$1("AppIdentifier") },
        { json: "version", js: "version", typ: u$1(undefined, "") },
    ], false),
    "RaiseIntentBridgeErrorResponse": o$1([
        { json: "meta", js: "meta", typ: r$1("RaiseIntentBridgeErrorResponseMeta") },
        { json: "payload", js: "payload", typ: r$1("RaiseIntentBridgeErrorResponsePayload") },
        { json: "type", js: "type", typ: r$1("RaiseIntentAgentErrorResponseType") },
    ], false),
    "RaiseIntentBridgeErrorResponseMeta": o$1([
        { json: "errorDetails", js: "errorDetails", typ: a$1(r$1("ResponseErrorDetail")) },
        { json: "errorSources", js: "errorSources", typ: a$1(r$1("DesktopAgentIdentifier")) },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "responseUuid", js: "responseUuid", typ: "" },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "RaiseIntentBridgeErrorResponsePayload": o$1([
        { json: "error", js: "error", typ: r$1("ErrorMessage") },
    ], false),
    "RaiseIntentBridgeRequest": o$1([
        { json: "meta", js: "meta", typ: r$1("RaiseIntentBridgeRequestMeta") },
        { json: "payload", js: "payload", typ: r$1("RaiseIntentBridgeRequestPayload") },
        { json: "type", js: "type", typ: r$1("RaiseIntentAgentRequestType") },
    ], false),
    "RaiseIntentBridgeRequestMeta": o$1([
        { json: "destination", js: "destination", typ: r$1("MetaDestination") },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "source", js: "source", typ: r$1("MetaSource") },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "RaiseIntentBridgeRequestPayload": o$1([
        { json: "app", js: "app", typ: r$1("AppDestinationIdentifier") },
        { json: "context", js: "context", typ: r$1("ContextElement") },
        { json: "intent", js: "intent", typ: "" },
    ], false),
    "RaiseIntentBridgeResponse": o$1([
        { json: "meta", js: "meta", typ: r$1("RaiseIntentBridgeResponseMeta") },
        { json: "payload", js: "payload", typ: r$1("RaiseIntentBridgeResponsePayload") },
        { json: "type", js: "type", typ: r$1("RaiseIntentAgentErrorResponseType") },
    ], false),
    "RaiseIntentBridgeResponseMeta": o$1([
        { json: "errorDetails", js: "errorDetails", typ: u$1(undefined, a$1(r$1("ResponseErrorDetail"))) },
        { json: "errorSources", js: "errorSources", typ: u$1(undefined, a$1(r$1("DesktopAgentIdentifier"))) },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "responseUuid", js: "responseUuid", typ: "" },
        { json: "sources", js: "sources", typ: u$1(undefined, a$1(r$1("DesktopAgentIdentifier"))) },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "RaiseIntentBridgeResponsePayload": o$1([
        { json: "intentResolution", js: "intentResolution", typ: r$1("IntentResolution") },
    ], false),
    "RaiseIntentResultAgentErrorResponse": o$1([
        { json: "meta", js: "meta", typ: r$1("RaiseIntentResultAgentErrorResponseMeta") },
        { json: "payload", js: "payload", typ: r$1("RaiseIntentResultAgentErrorResponsePayload") },
        { json: "type", js: "type", typ: r$1("RaiseIntentResultAgentErrorResponseType") },
    ], false),
    "RaiseIntentResultAgentErrorResponseMeta": o$1([
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "responseUuid", js: "responseUuid", typ: "" },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "RaiseIntentResultAgentErrorResponsePayload": o$1([
        { json: "error", js: "error", typ: r$1("RaiseIntentResultErrorMessage") },
    ], false),
    "RaiseIntentResultAgentResponse": o$1([
        { json: "meta", js: "meta", typ: r$1("RaiseIntentResultAgentResponseMeta") },
        { json: "payload", js: "payload", typ: r$1("RaiseIntentResultAgentResponsePayload") },
        { json: "type", js: "type", typ: r$1("RaiseIntentResultAgentErrorResponseType") },
    ], false),
    "RaiseIntentResultAgentResponseMeta": o$1([
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "responseUuid", js: "responseUuid", typ: "" },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "RaiseIntentResultAgentResponsePayload": o$1([
        { json: "intentResult", js: "intentResult", typ: r$1("IntentResult") },
    ], false),
    "IntentResult": o$1([
        { json: "context", js: "context", typ: u$1(undefined, r$1("ContextElement")) },
        { json: "channel", js: "channel", typ: u$1(undefined, r$1("Channel")) },
    ], false),
    "Channel": o$1([
        { json: "displayMetadata", js: "displayMetadata", typ: u$1(undefined, r$1("DisplayMetadata")) },
        { json: "id", js: "id", typ: "" },
        { json: "type", js: "type", typ: r$1("Type") },
    ], false),
    "DisplayMetadata": o$1([
        { json: "color", js: "color", typ: u$1(undefined, "") },
        { json: "glyph", js: "glyph", typ: u$1(undefined, "") },
        { json: "name", js: "name", typ: u$1(undefined, "") },
    ], false),
    "RaiseIntentResultBridgeErrorResponse": o$1([
        { json: "meta", js: "meta", typ: r$1("RaiseIntentResultBridgeErrorResponseMeta") },
        { json: "payload", js: "payload", typ: r$1("RaiseIntentResultBridgeErrorResponsePayload") },
        { json: "type", js: "type", typ: r$1("RaiseIntentResultAgentErrorResponseType") },
    ], false),
    "RaiseIntentResultBridgeErrorResponseMeta": o$1([
        { json: "errorDetails", js: "errorDetails", typ: a$1(r$1("ResponseErrorDetail")) },
        { json: "errorSources", js: "errorSources", typ: a$1(r$1("DesktopAgentIdentifier")) },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "responseUuid", js: "responseUuid", typ: "" },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "RaiseIntentResultBridgeErrorResponsePayload": o$1([
        { json: "error", js: "error", typ: r$1("RaiseIntentResultErrorMessage") },
    ], false),
    "RaiseIntentResultBridgeResponse": o$1([
        { json: "meta", js: "meta", typ: r$1("RaiseIntentResultBridgeResponseMeta") },
        { json: "payload", js: "payload", typ: r$1("RaiseIntentResultBridgeResponsePayload") },
        { json: "type", js: "type", typ: r$1("RaiseIntentResultAgentErrorResponseType") },
    ], false),
    "RaiseIntentResultBridgeResponseMeta": o$1([
        { json: "errorDetails", js: "errorDetails", typ: u$1(undefined, a$1(r$1("ResponseErrorDetail"))) },
        { json: "errorSources", js: "errorSources", typ: u$1(undefined, a$1(r$1("DesktopAgentIdentifier"))) },
        { json: "requestUuid", js: "requestUuid", typ: "" },
        { json: "responseUuid", js: "responseUuid", typ: "" },
        { json: "sources", js: "sources", typ: u$1(undefined, a$1(r$1("DesktopAgentIdentifier"))) },
        { json: "timestamp", js: "timestamp", typ: Date },
    ], false),
    "RaiseIntentResultBridgeResponsePayload": o$1([
        { json: "intentResult", js: "intentResult", typ: r$1("IntentResult") },
    ], false),
    "Context": o$1([
        { json: "id", js: "id", typ: u$1(undefined, m$1("any")) },
        { json: "name", js: "name", typ: u$1(undefined, "") },
        { json: "type", js: "type", typ: "" },
    ], "any"),
    "ResponseErrorDetail": [
        "AccessDenied",
        "AgentDisconnected",
        "AppNotFound",
        "AppTimeout",
        "CreationFailed",
        "DesktopAgentNotFound",
        "ErrorOnLaunch",
        "IntentDeliveryFailed",
        "IntentHandlerRejected",
        "MalformedContext",
        "MalformedMessage",
        "NoAppsFound",
        "NoChannelFound",
        "NoResultReturned",
        "NotConnectedToBridge",
        "ResolverTimeout",
        "ResolverUnavailable",
        "ResponseToBridgeTimedOut",
        "TargetAppUnavailable",
        "TargetInstanceUnavailable",
        "UserCancelledResolution",
    ],
    "ResponseMessageType": [
        "findInstancesResponse",
        "findIntentResponse",
        "findIntentsByContextResponse",
        "getAppMetadataResponse",
        "openResponse",
        "raiseIntentResponse",
        "raiseIntentResultResponse",
    ],
    "RequestMessageType": [
        "broadcastRequest",
        "findInstancesRequest",
        "findIntentRequest",
        "findIntentsByContextRequest",
        "getAppMetadataRequest",
        "openRequest",
        "PrivateChannel.broadcast",
        "PrivateChannel.eventListenerAdded",
        "PrivateChannel.eventListenerRemoved",
        "PrivateChannel.onAddContextListener",
        "PrivateChannel.onDisconnect",
        "PrivateChannel.onUnsubscribe",
        "raiseIntentRequest",
    ],
    "BroadcastAgentRequestType": [
        "broadcastRequest",
    ],
    "ConnectionStepMessageType": [
        "authenticationFailed",
        "connectedAgentsUpdate",
        "handshake",
        "hello",
    ],
    "ConnectionStep2HelloType": [
        "hello",
    ],
    "ConnectionStep3HandshakeType": [
        "handshake",
    ],
    "ConnectionStep4AuthenticationFailedType": [
        "authenticationFailed",
    ],
    "ConnectionStep6ConnectedAgentsUpdateType": [
        "connectedAgentsUpdate",
    ],
    "ErrorMessage": [
        "AgentDisconnected",
        "DesktopAgentNotFound",
        "IntentDeliveryFailed",
        "MalformedContext",
        "MalformedMessage",
        "NoAppsFound",
        "NotConnectedToBridge",
        "ResolverTimeout",
        "ResolverUnavailable",
        "ResponseToBridgeTimedOut",
        "TargetAppUnavailable",
        "TargetInstanceUnavailable",
        "UserCancelledResolution",
    ],
    "FindInstancesAgentErrorResponseType": [
        "findInstancesResponse",
    ],
    "FindInstancesAgentRequestType": [
        "findInstancesRequest",
    ],
    "FindIntentAgentErrorResponseType": [
        "findIntentResponse",
    ],
    "FindIntentAgentRequestType": [
        "findIntentRequest",
    ],
    "FindIntentsByContextAgentErrorResponseType": [
        "findIntentsByContextResponse",
    ],
    "FindIntentsByContextAgentRequestType": [
        "findIntentsByContextRequest",
    ],
    "GetAppMetadataAgentErrorResponseType": [
        "getAppMetadataResponse",
    ],
    "GetAppMetadataAgentRequestType": [
        "getAppMetadataRequest",
    ],
    "OpenErrorMessage": [
        "AgentDisconnected",
        "AppNotFound",
        "AppTimeout",
        "DesktopAgentNotFound",
        "ErrorOnLaunch",
        "MalformedContext",
        "MalformedMessage",
        "NotConnectedToBridge",
        "ResolverUnavailable",
        "ResponseToBridgeTimedOut",
    ],
    "OpenAgentErrorResponseType": [
        "openResponse",
    ],
    "OpenAgentRequestType": [
        "openRequest",
    ],
    "PrivateChannelBroadcastAgentRequestType": [
        "PrivateChannel.broadcast",
    ],
    "PrivateChannelEventListenerTypes": [
        "onAddContextListener",
        "onDisconnect",
        "onUnsubscribe",
    ],
    "PrivateChannelEventListenerAddedAgentRequestType": [
        "PrivateChannel.eventListenerAdded",
    ],
    "PrivateChannelEventListenerRemovedAgentRequestType": [
        "PrivateChannel.eventListenerRemoved",
    ],
    "PrivateChannelOnAddContextListenerAgentRequestType": [
        "PrivateChannel.onAddContextListener",
    ],
    "PrivateChannelOnDisconnectAgentRequestType": [
        "PrivateChannel.onDisconnect",
    ],
    "PrivateChannelOnUnsubscribeAgentRequestType": [
        "PrivateChannel.onUnsubscribe",
    ],
    "RaiseIntentAgentErrorResponseType": [
        "raiseIntentResponse",
    ],
    "RaiseIntentAgentRequestType": [
        "raiseIntentRequest",
    ],
    "RaiseIntentResultErrorMessage": [
        "AgentDisconnected",
        "IntentHandlerRejected",
        "MalformedMessage",
        "NoResultReturned",
        "NotConnectedToBridge",
        "ResponseToBridgeTimedOut",
    ],
    "RaiseIntentResultAgentErrorResponseType": [
        "raiseIntentResultResponse",
    ],
    "Type": [
        "app",
        "private",
        "user",
    ]
};

var BridgingTypes = {
    __proto__: null,
    Convert: Convert$1
};

/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright FINOS FDC3 contributors - see NOTICE file
 */
/** Constants representing the errors that can be encountered when calling the `open` method on the DesktopAgent object (`fdc3`). */
var OpenError;
(function (OpenError) {
    /** Returned if the specified application is not found.*/
    OpenError["AppNotFound"] = "AppNotFound";
    /** Returned if the specified application fails to launch correctly.*/
    OpenError["ErrorOnLaunch"] = "ErrorOnLaunch";
    /** Returned if the specified application launches but fails to add a context listener in order to receive the context passed to the `fdc3.open` call.*/
    OpenError["AppTimeout"] = "AppTimeout";
    /** Returned if the FDC3 desktop agent implementation is not currently able to handle the request.*/
    OpenError["ResolverUnavailable"] = "ResolverUnavailable";
    /** Returned if a call to the `open` function is made with an invalid context argument. Contexts should be Objects with at least a `type` field that has a `string` value.*/
    OpenError["MalformedContext"] = "MalformedContext";
    /** @experimental Returned if the specified Desktop Agent is not found, via a connected Desktop Agent Bridge.*/
    OpenError["DesktopAgentNotFound"] = "DesktopAgentNotFound";
})(OpenError || (OpenError = {}));
/** Constants representing the errors that can be encountered when calling the `findIntent`, `findIntentsByContext`, `raiseIntent` or `raiseIntentForContext` methods on the DesktopAgent (`fdc3`). */
var ResolveError;
(function (ResolveError) {
    /** SHOULD be returned if no apps are available that can resolve the intent and context combination.*/
    ResolveError["NoAppsFound"] = "NoAppsFound";
    /** Returned if the FDC3 desktop agent implementation is not currently able to handle the request.*/
    ResolveError["ResolverUnavailable"] = "ResolverUnavailable";
    /** Returned if the user cancelled the resolution request, for example by closing or cancelling a resolver UI.*/
    ResolveError["UserCancelled"] = "UserCancelledResolution";
    /** SHOULD be returned if a timeout cancels an intent resolution that required user interaction. Please use `ResolverUnavailable` instead for situations where a resolver UI or similar fails.*/
    ResolveError["ResolverTimeout"] = "ResolverTimeout";
    /** Returned if a specified target application is not available or a new instance of it cannot be opened. */
    ResolveError["TargetAppUnavailable"] = "TargetAppUnavailable";
    /** Returned if a specified target application instance is not available, for example because it has been closed. */
    ResolveError["TargetInstanceUnavailable"] = "TargetInstanceUnavailable";
    /** Returned if the intent and context could not be delivered to the selected application or instance, for example because it has not added an intent handler within a timeout.*/
    ResolveError["IntentDeliveryFailed"] = "IntentDeliveryFailed";
    /** Returned if a call to one of the `raiseIntent` functions is made with an invalid context argument. Contexts should be Objects with at least a `type` field that has a `string` value.*/
    ResolveError["MalformedContext"] = "MalformedContext";
    /** @experimental Returned if the specified Desktop Agent is not found, via a connected Desktop Agent Bridge.*/
    ResolveError["DesktopAgentNotFound"] = "DesktopAgentNotFound";
})(ResolveError || (ResolveError = {}));
var ResultError;
(function (ResultError) {
    /** Returned if the intent handler exited without returning a valid result (a promise resolving to a Context, Channel object or void). */
    ResultError["NoResultReturned"] = "NoResultReturned";
    /** Returned if the Intent handler function processing the raised intent throws an error or rejects the Promise it returned. */
    ResultError["IntentHandlerRejected"] = "IntentHandlerRejected";
})(ResultError || (ResultError = {}));
var ChannelError;
(function (ChannelError) {
    /** Returned if the specified channel is not found when attempting to join a channel via the `joinUserChannel` function  of the DesktopAgent (`fdc3`).*/
    ChannelError["NoChannelFound"] = "NoChannelFound";
    /** SHOULD be returned when a request to join a user channel or to a retrieve a Channel object via the `joinUserChannel` or `getOrCreateChannel` methods of the DesktopAgent (`fdc3`) object is denied. */
    ChannelError["AccessDenied"] = "AccessDenied";
    /** SHOULD be returned when a channel cannot be created or retrieved via the `getOrCreateChannel` method of the DesktopAgent (`fdc3`).*/
    ChannelError["CreationFailed"] = "CreationFailed";
    /** Returned if a call to the `broadcast` functions is made with an invalid context argument. Contexts should be Objects with at least a `type` field that has a `string` value.*/
    ChannelError["MalformedContext"] = "MalformedContext";
})(ChannelError || (ChannelError = {}));
var BridgingError;
(function (BridgingError) {
    /** @experimental Returned if a Desktop Agent did not return a response, via Desktop Agent Bridging, within the alloted timeout. */
    BridgingError["ResponseTimedOut"] = "ResponseToBridgeTimedOut";
    /** @experimental Returned if a Desktop Agent that has been targeted by a particular request has been disconnected from the Bridge before a response has been received from it. */
    BridgingError["AgentDisconnected"] = "AgentDisconnected";
    /** @experimental Returned for FDC3 API calls that are specified with arguments indicating that a remote Desktop agent should be targeted (e.g. raiseIntent with an app on a remote DesktopAgent targeted), when the local Desktop Agent is not connected to a bridge. */
    BridgingError["NotConnectedToBridge"] = "NotConnectedToBridge";
    /** @experimental Returned if a message to a Bridge deviates from the schema for that message sufficiently that it could not be processed. */
    BridgingError["MalformedMessage"] = "MalformedMessage";
})(BridgingError || (BridgingError = {}));

/******************************************************************************
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
/* global Reflect, Promise, SuppressedError, Symbol */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * Ensures at compile time that the given string tuple is exhaustive on a given union type, i.e. contains ALL possible values of the given UNION_TYPE.
 */
var exhaustiveStringTuple = function () { return function () {
    var tuple = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        tuple[_i] = arguments[_i];
    }
    return tuple;
}; };

var STANDARD_CONTEXT_TYPES = exhaustiveStringTuple()('fdc3.action', 'fdc3.chart', 'fdc3.chat.initSettings', 'fdc3.chat.message', 'fdc3.chat.room', 'fdc3.chat.searchCriteria', 'fdc3.contact', 'fdc3.contactList', 'fdc3.country', 'fdc3.currency', 'fdc3.email', 'fdc3.instrument', 'fdc3.instrumentList', 'fdc3.interaction', 'fdc3.message', 'fdc3.organization', 'fdc3.portfolio', 'fdc3.position', 'fdc3.nothing', 'fdc3.timeRange', 'fdc3.transactionResult', 'fdc3.valuation');
// used internally to check if a given intent/context is a standard one
var StandardContextsSet = new Set(STANDARD_CONTEXT_TYPES);

var STANDARD_INTENTS = exhaustiveStringTuple()('CreateInteraction', 'SendChatMessage', 'StartCall', 'StartChat', 'StartEmail', 'ViewAnalysis', 'ViewChat', 'ViewChart', 'ViewContact', 'ViewHoldings', 'ViewInstrument', 'ViewInteractions', 'ViewMessages', 'ViewNews', 'ViewOrders', 'ViewProfile', 'ViewQuote', 'ViewResearch');
// used internally to check if a given intent/context is a standard one
var StandardIntentsSet = new Set(STANDARD_INTENTS);

var DEFAULT_TIMEOUT = 5000;
var UnavailableError = new Error('FDC3 DesktopAgent not available at `window.fdc3`.');
var TimeoutError = new Error('Timed out waiting for `fdc3Ready` event.');
var UnexpectedError = new Error('`fdc3Ready` event fired, but `window.fdc3` not set to DesktopAgent.');
function rejectIfNoGlobal(f) {
    return window.fdc3 ? f() : Promise.reject(UnavailableError);
}
/**
 * Utility function that returns a promise that will resolve immeadiately
 * if the desktop agent API is found at `window.fdc3`. If the API is found,
 * the promise will resolve when the `fdc3Ready` event is received or if it
 * is found at the end of the specified timeout. If the API is not found, it
 * will reject with an error.
 *
 * ```javascript
 * await fdc3Ready();
 * const intentListener = await addIntentListener("ViewChart", intentHandlerFn);
 * ```
 *
 * @param waitForMs The number of milliseconds to wait for the FDC3 API to be
 * ready. Defaults to 5 seconds.
 */
var fdc3Ready = function (waitForMs) {
    if (waitForMs === void 0) { waitForMs = DEFAULT_TIMEOUT; }
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    // if the global is already available resolve immediately
                    if (window.fdc3) {
                        resolve();
                    }
                    else {
                        // if its not available setup a timeout to return a rejected promise
                        var timeout_1 = setTimeout(function () { return (window.fdc3 ? resolve() : reject(TimeoutError)); }, waitForMs);
                        // listen for the fdc3Ready event
                        window.addEventListener('fdc3Ready', function () {
                            clearTimeout(timeout_1);
                            window.fdc3 ? resolve() : reject(UnexpectedError);
                        }, { once: true });
                    }
                })];
        });
    });
};
function isString(app) {
    return !!app && typeof app === 'string';
}
function open(app, context) {
    if (isString(app)) {
        return rejectIfNoGlobal(function () { return window.fdc3.open(app, context); });
    }
    else {
        return rejectIfNoGlobal(function () { return window.fdc3.open(app, context); });
    }
}
function findIntent(intent, context, resultType) {
    return rejectIfNoGlobal(function () { return window.fdc3.findIntent(intent, context, resultType); });
}
function findIntentsByContext(context, resultType) {
    return rejectIfNoGlobal(function () { return window.fdc3.findIntentsByContext(context, resultType); });
}
function broadcast(context) {
    return rejectIfNoGlobal(function () { return window.fdc3.broadcast(context); });
}
function raiseIntent(intent, context, app) {
    if (isString(app)) {
        return rejectIfNoGlobal(function () { return window.fdc3.raiseIntent(intent, context, app); });
    }
    else {
        return rejectIfNoGlobal(function () { return window.fdc3.raiseIntent(intent, context, app); });
    }
}
function raiseIntentForContext(context, app) {
    if (isString(app)) {
        return rejectIfNoGlobal(function () { return window.fdc3.raiseIntentForContext(context, app); });
    }
    else {
        return rejectIfNoGlobal(function () { return window.fdc3.raiseIntentForContext(context, app); });
    }
}
function addIntentListener(intent, handler) {
    return rejectIfNoGlobal(function () { return window.fdc3.addIntentListener(intent, handler); });
}
function addContextListener(contextTypeOrHandler, handler) {
    //Handle (deprecated) function signature that allowed contextType argument to be omitted
    if (typeof contextTypeOrHandler !== 'function') {
        return rejectIfNoGlobal(function () { return window.fdc3.addContextListener(contextTypeOrHandler, handler); });
    }
    else {
        return rejectIfNoGlobal(function () { return window.fdc3.addContextListener(null, contextTypeOrHandler); });
    }
}
function getUserChannels() {
    return rejectIfNoGlobal(function () {
        //fallback to getSystemChannels for FDC3 <2.0 implementations
        if (window.fdc3.getUserChannels) {
            return window.fdc3.getUserChannels();
        }
        else {
            return window.fdc3.getSystemChannels();
        }
    });
}
function getSystemChannels() {
    //fallforward to getUserChannels for FDC3 2.0+ implementations
    return getUserChannels();
}
function joinUserChannel(channelId) {
    return rejectIfNoGlobal(function () {
        //fallback to joinChannel for FDC3 <2.0 implementations
        if (window.fdc3.joinUserChannel) {
            return window.fdc3.joinUserChannel(channelId);
        }
        else {
            return window.fdc3.joinChannel(channelId);
        }
    });
}
function joinChannel(channelId) {
    //fallforward to joinUserChannel for FDC3 2.0+ implementations
    return joinUserChannel(channelId);
}
function getOrCreateChannel(channelId) {
    return rejectIfNoGlobal(function () { return window.fdc3.getOrCreateChannel(channelId); });
}
function getCurrentChannel() {
    return rejectIfNoGlobal(function () { return window.fdc3.getCurrentChannel(); });
}
function leaveCurrentChannel() {
    return rejectIfNoGlobal(function () { return window.fdc3.leaveCurrentChannel(); });
}
function createPrivateChannel() {
    return rejectIfNoGlobal(function () { return window.fdc3.createPrivateChannel(); });
}
function getInfo() {
    return rejectIfNoGlobal(function () { return window.fdc3.getInfo(); });
}
function getAppMetadata(app) {
    return rejectIfNoGlobal(function () { return window.fdc3.getAppMetadata(app); });
}
function findInstances(app) {
    return rejectIfNoGlobal(function () { return window.fdc3.findInstances(app); });
}
/**
 * Check if the given context is a standard context type.
 * @param contextType
 */
function isStandardContextType(contextType) {
    return StandardContextsSet.has(contextType);
}
/**
 * Check if the given intent is a standard intent.
 * @param intent
 */
function isStandardIntent(intent) {
    return StandardIntentsSet.has(intent);
}
/**
 * Compare numeric semver version number strings (in the form `1.2.3`).
 *
 * Returns `-1` if the first argument is a lower version number than the second,
 * `1` if the first argument is greater than the second, 0 if the arguments are
 * equal and `null` if an error occurred during the comparison.
 *
 * @param a
 * @param b
 */
var compareVersionNumbers = function (a, b) {
    try {
        var aVerArr = a.split('.').map(Number);
        var bVerArr = b.split('.').map(Number);
        for (var index = 0; index < Math.max(aVerArr.length, bVerArr.length); index++) {
            /* If one version number has more digits and the other does not, and they are otherwise equal,
               assume the longer is greater. E.g. 1.1.1 > 1.1 */
            if (index === aVerArr.length || aVerArr[index] < bVerArr[index]) {
                return -1;
            }
            else if (index === bVerArr.length || aVerArr[index] > bVerArr[index]) {
                return 1;
            }
        }
        return 0;
    }
    catch (e) {
        console.error('Failed to compare version strings', e);
        return null;
    }
};
/**
 * Check if the FDC3 version in an ImplementationMetadata object is greater than
 * or equal to the supplied numeric semver version number string (in the form `1.2.3`).
 *
 * Returns a boolean or null if an error occurred while comparing the version numbers.
 *
 * @param metadata
 * @param version
 */
var versionIsAtLeast = function (metadata, version) {
    var comparison = compareVersionNumbers(metadata.fdc3Version, version);
    return comparison === null ? null : comparison >= 0 ? true : false;
};

/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright FINOS FDC3 contributors - see NOTICE file
 */
/**
 * @deprecated Use {@link StandardContextType} instead
 */
var ContextTypes;
(function (ContextTypes) {
    ContextTypes["Chart"] = "fdc3.chart";
    ContextTypes["ChatInitSettings"] = "fdc3.chat.initSettings";
    ContextTypes["ChatRoom"] = "fdc3.chat.room";
    ContextTypes["Contact"] = "fdc3.contact";
    ContextTypes["ContactList"] = "fdc3.contactList";
    ContextTypes["Country"] = "fdc3.country";
    ContextTypes["Currency"] = "fdc3.currency";
    ContextTypes["Email"] = "fdc3.email";
    ContextTypes["Instrument"] = "fdc3.instrument";
    ContextTypes["InstrumentList"] = "fdc3.instrumentList";
    ContextTypes["Interaction"] = "fdc3.interaction";
    ContextTypes["Nothing"] = "fdc3.nothing";
    ContextTypes["Organization"] = "fdc3.organization";
    ContextTypes["Portfolio"] = "fdc3.portfolio";
    ContextTypes["Position"] = "fdc3.position";
    ContextTypes["ChatSearchCriteria"] = "fdc3.chat.searchCriteria";
    ContextTypes["TimeRange"] = "fdc3.timeRange";
    ContextTypes["TransactionResult"] = "fdc3.transactionResult";
    ContextTypes["Valuation"] = "fdc3.valuation";
})(ContextTypes || (ContextTypes = {}));

// To parse this data:
//
//   import { Convert, Action, Chart, ChatInitSettings, ChatMessage, ChatRoom, ChatSearchCriteria, Contact, ContactList, Context, Country, Currency, Email, Instrument, InstrumentList, Interaction, Message, Nothing, Order, OrderList, Organization, Portfolio, Position, Product, TimeRange, Trade, TradeList, TransactionResult, Valuation } from "./file";
//
//   const action = Convert.toAction(json);
//   const chart = Convert.toChart(json);
//   const chatInitSettings = Convert.toChatInitSettings(json);
//   const chatMessage = Convert.toChatMessage(json);
//   const chatRoom = Convert.toChatRoom(json);
//   const chatSearchCriteria = Convert.toChatSearchCriteria(json);
//   const contact = Convert.toContact(json);
//   const contactList = Convert.toContactList(json);
//   const context = Convert.toContext(json);
//   const country = Convert.toCountry(json);
//   const currency = Convert.toCurrency(json);
//   const email = Convert.toEmail(json);
//   const instrument = Convert.toInstrument(json);
//   const instrumentList = Convert.toInstrumentList(json);
//   const interaction = Convert.toInteraction(json);
//   const message = Convert.toMessage(json);
//   const nothing = Convert.toNothing(json);
//   const order = Convert.toOrder(json);
//   const orderList = Convert.toOrderList(json);
//   const organization = Convert.toOrganization(json);
//   const portfolio = Convert.toPortfolio(json);
//   const position = Convert.toPosition(json);
//   const product = Convert.toProduct(json);
//   const timeRange = Convert.toTimeRange(json);
//   const trade = Convert.toTrade(json);
//   const tradeList = Convert.toTradeList(json);
//   const transactionResult = Convert.toTransactionResult(json);
//   const valuation = Convert.toValuation(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.
/**
 * Free text to be used for a keyword search
 *
 * `interactionType` SHOULD be one of `'Instant Message'`, `'Email'`, `'Call'`, or
 * `'Meeting'` although other string values are permitted.
 */
// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
var Convert = /** @class */ (function () {
    function Convert() {
    }
    Convert.toAction = function (json) {
        return cast(JSON.parse(json), r("Action"));
    };
    Convert.actionToJson = function (value) {
        return JSON.stringify(uncast(value, r("Action")), null, 2);
    };
    Convert.toChart = function (json) {
        return cast(JSON.parse(json), r("Chart"));
    };
    Convert.chartToJson = function (value) {
        return JSON.stringify(uncast(value, r("Chart")), null, 2);
    };
    Convert.toChatInitSettings = function (json) {
        return cast(JSON.parse(json), r("ChatInitSettings"));
    };
    Convert.chatInitSettingsToJson = function (value) {
        return JSON.stringify(uncast(value, r("ChatInitSettings")), null, 2);
    };
    Convert.toChatMessage = function (json) {
        return cast(JSON.parse(json), r("ChatMessage"));
    };
    Convert.chatMessageToJson = function (value) {
        return JSON.stringify(uncast(value, r("ChatMessage")), null, 2);
    };
    Convert.toChatRoom = function (json) {
        return cast(JSON.parse(json), r("ChatRoom"));
    };
    Convert.chatRoomToJson = function (value) {
        return JSON.stringify(uncast(value, r("ChatRoom")), null, 2);
    };
    Convert.toChatSearchCriteria = function (json) {
        return cast(JSON.parse(json), r("ChatSearchCriteria"));
    };
    Convert.chatSearchCriteriaToJson = function (value) {
        return JSON.stringify(uncast(value, r("ChatSearchCriteria")), null, 2);
    };
    Convert.toContact = function (json) {
        return cast(JSON.parse(json), r("Contact"));
    };
    Convert.contactToJson = function (value) {
        return JSON.stringify(uncast(value, r("Contact")), null, 2);
    };
    Convert.toContactList = function (json) {
        return cast(JSON.parse(json), r("ContactList"));
    };
    Convert.contactListToJson = function (value) {
        return JSON.stringify(uncast(value, r("ContactList")), null, 2);
    };
    Convert.toContext = function (json) {
        return cast(JSON.parse(json), r("Context"));
    };
    Convert.contextToJson = function (value) {
        return JSON.stringify(uncast(value, r("Context")), null, 2);
    };
    Convert.toCountry = function (json) {
        return cast(JSON.parse(json), r("Country"));
    };
    Convert.countryToJson = function (value) {
        return JSON.stringify(uncast(value, r("Country")), null, 2);
    };
    Convert.toCurrency = function (json) {
        return cast(JSON.parse(json), r("Currency"));
    };
    Convert.currencyToJson = function (value) {
        return JSON.stringify(uncast(value, r("Currency")), null, 2);
    };
    Convert.toEmail = function (json) {
        return cast(JSON.parse(json), r("Email"));
    };
    Convert.emailToJson = function (value) {
        return JSON.stringify(uncast(value, r("Email")), null, 2);
    };
    Convert.toInstrument = function (json) {
        return cast(JSON.parse(json), r("Instrument"));
    };
    Convert.instrumentToJson = function (value) {
        return JSON.stringify(uncast(value, r("Instrument")), null, 2);
    };
    Convert.toInstrumentList = function (json) {
        return cast(JSON.parse(json), r("InstrumentList"));
    };
    Convert.instrumentListToJson = function (value) {
        return JSON.stringify(uncast(value, r("InstrumentList")), null, 2);
    };
    Convert.toInteraction = function (json) {
        return cast(JSON.parse(json), r("Interaction"));
    };
    Convert.interactionToJson = function (value) {
        return JSON.stringify(uncast(value, r("Interaction")), null, 2);
    };
    Convert.toMessage = function (json) {
        return cast(JSON.parse(json), r("Message"));
    };
    Convert.messageToJson = function (value) {
        return JSON.stringify(uncast(value, r("Message")), null, 2);
    };
    Convert.toNothing = function (json) {
        return cast(JSON.parse(json), r("Nothing"));
    };
    Convert.nothingToJson = function (value) {
        return JSON.stringify(uncast(value, r("Nothing")), null, 2);
    };
    Convert.toOrder = function (json) {
        return cast(JSON.parse(json), r("Order"));
    };
    Convert.orderToJson = function (value) {
        return JSON.stringify(uncast(value, r("Order")), null, 2);
    };
    Convert.toOrderList = function (json) {
        return cast(JSON.parse(json), r("OrderList"));
    };
    Convert.orderListToJson = function (value) {
        return JSON.stringify(uncast(value, r("OrderList")), null, 2);
    };
    Convert.toOrganization = function (json) {
        return cast(JSON.parse(json), r("Organization"));
    };
    Convert.organizationToJson = function (value) {
        return JSON.stringify(uncast(value, r("Organization")), null, 2);
    };
    Convert.toPortfolio = function (json) {
        return cast(JSON.parse(json), r("Portfolio"));
    };
    Convert.portfolioToJson = function (value) {
        return JSON.stringify(uncast(value, r("Portfolio")), null, 2);
    };
    Convert.toPosition = function (json) {
        return cast(JSON.parse(json), r("Position"));
    };
    Convert.positionToJson = function (value) {
        return JSON.stringify(uncast(value, r("Position")), null, 2);
    };
    Convert.toProduct = function (json) {
        return cast(JSON.parse(json), r("Product"));
    };
    Convert.productToJson = function (value) {
        return JSON.stringify(uncast(value, r("Product")), null, 2);
    };
    Convert.toTimeRange = function (json) {
        return cast(JSON.parse(json), r("TimeRange"));
    };
    Convert.timeRangeToJson = function (value) {
        return JSON.stringify(uncast(value, r("TimeRange")), null, 2);
    };
    Convert.toTrade = function (json) {
        return cast(JSON.parse(json), r("Trade"));
    };
    Convert.tradeToJson = function (value) {
        return JSON.stringify(uncast(value, r("Trade")), null, 2);
    };
    Convert.toTradeList = function (json) {
        return cast(JSON.parse(json), r("TradeList"));
    };
    Convert.tradeListToJson = function (value) {
        return JSON.stringify(uncast(value, r("TradeList")), null, 2);
    };
    Convert.toTransactionResult = function (json) {
        return cast(JSON.parse(json), r("TransactionResult"));
    };
    Convert.transactionResultToJson = function (value) {
        return JSON.stringify(uncast(value, r("TransactionResult")), null, 2);
    };
    Convert.toValuation = function (json) {
        return cast(JSON.parse(json), r("Valuation"));
    };
    Convert.valuationToJson = function (value) {
        return JSON.stringify(uncast(value, r("Valuation")), null, 2);
    };
    return Convert;
}());
function invalidValue(typ, val, key, parent) {
    if (parent === void 0) { parent = ''; }
    var prettyTyp = prettyTypeName(typ);
    var parentText = parent ? " on ".concat(parent) : '';
    var keyText = key ? " for key \"".concat(key, "\"") : '';
    throw Error("Invalid value".concat(keyText).concat(parentText, ". Expected ").concat(prettyTyp, " but got ").concat(JSON.stringify(val)));
}
function prettyTypeName(typ) {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return "an optional ".concat(prettyTypeName(typ[1]));
        }
        else {
            return "one of [".concat(typ.map(function (a) { return prettyTypeName(a); }).join(", "), "]");
        }
    }
    else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    }
    else {
        return typeof typ;
    }
}
function jsonToJSProps(typ) {
    if (typ.jsonToJS === undefined) {
        var map_1 = {};
        typ.props.forEach(function (p) { return map_1[p.json] = { key: p.js, typ: p.typ }; });
        typ.jsonToJS = map_1;
    }
    return typ.jsonToJS;
}
function jsToJSONProps(typ) {
    if (typ.jsToJSON === undefined) {
        var map_2 = {};
        typ.props.forEach(function (p) { return map_2[p.js] = { key: p.json, typ: p.typ }; });
        typ.jsToJSON = map_2;
    }
    return typ.jsToJSON;
}
function transform(val, typ, getProps, key, parent) {
    if (key === void 0) { key = ''; }
    if (parent === void 0) { parent = ''; }
    function transformPrimitive(typ, val) {
        if (typeof typ === typeof val)
            return val;
        return invalidValue(typ, val, key, parent);
    }
    function transformUnion(typs, val) {
        // val must validate against one typ in typs
        var l = typs.length;
        for (var i = 0; i < l; i++) {
            var typ_1 = typs[i];
            try {
                return transform(val, typ_1, getProps);
            }
            catch (_) { }
        }
        return invalidValue(typs, val, key, parent);
    }
    function transformEnum(cases, val) {
        if (cases.indexOf(val) !== -1)
            return val;
        return invalidValue(cases.map(function (a) { return l(a); }), val, key, parent);
    }
    function transformArray(typ, val) {
        // val must be an array with no invalid elements
        if (!Array.isArray(val))
            return invalidValue(l("array"), val, key, parent);
        return val.map(function (el) { return transform(el, typ, getProps); });
    }
    function transformDate(val) {
        if (val === null) {
            return null;
        }
        var d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }
    function transformObject(props, additional, val) {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        var result = {};
        Object.getOwnPropertyNames(props).forEach(function (key) {
            var prop = props[key];
            var v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(function (key) {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }
    if (typ === "any")
        return val;
    if (typ === null) {
        if (val === null)
            return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false)
        return invalidValue(typ, val, key, parent);
    var ref = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ))
        return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems") ? transformArray(typ.arrayItems, val)
                : typ.hasOwnProperty("props") ? transformObject(getProps(typ), typ.additional, val)
                    : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number")
        return transformDate(val);
    return transformPrimitive(typ, val);
}
function cast(val, typ) {
    return transform(val, typ, jsonToJSProps);
}
function uncast(val, typ) {
    return transform(val, typ, jsToJSONProps);
}
function l(typ) {
    return { literal: typ };
}
function a(typ) {
    return { arrayItems: typ };
}
function u() {
    var typs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        typs[_i] = arguments[_i];
    }
    return { unionMembers: typs };
}
function o(props, additional) {
    return { props: props, additional: additional };
}
function m(additional) {
    return { props: [], additional: additional };
}
function r(name) {
    return { ref: name };
}
var typeMap = {
    "Action": o([
        { json: "app", js: "app", typ: u(undefined, r("ActionTargetApp")) },
        { json: "context", js: "context", typ: r("ContextElement") },
        { json: "intent", js: "intent", typ: u(undefined, "") },
        { json: "title", js: "title", typ: "" },
        { json: "type", js: "type", typ: r("ActionType") },
        { json: "id", js: "id", typ: u(undefined, m("any")) },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "ActionTargetApp": o([
        { json: "appId", js: "appId", typ: "" },
        { json: "desktopAgent", js: "desktopAgent", typ: u(undefined, "") },
        { json: "instanceId", js: "instanceId", typ: u(undefined, "") },
    ], "any"),
    "ContextElement": o([
        { json: "id", js: "id", typ: u(undefined, m("any")) },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "type", js: "type", typ: "" },
    ], "any"),
    "Chart": o([
        { json: "instruments", js: "instruments", typ: a(r("InstrumentElement")) },
        { json: "otherConfig", js: "otherConfig", typ: u(undefined, a(r("ContextElement"))) },
        { json: "range", js: "range", typ: u(undefined, r("TimeRangeObject")) },
        { json: "style", js: "style", typ: u(undefined, r("ChartStyle")) },
        { json: "type", js: "type", typ: r("ChartType") },
        { json: "id", js: "id", typ: u(undefined, m("any")) },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "InstrumentElement": o([
        { json: "id", js: "id", typ: r("PurpleInstrumentIdentifiers") },
        { json: "market", js: "market", typ: u(undefined, r("OrganizationMarket")) },
        { json: "type", js: "type", typ: r("PurpleInteractionType") },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "PurpleInstrumentIdentifiers": o([
        { json: "BBG", js: "BBG", typ: u(undefined, "") },
        { json: "CUSIP", js: "CUSIP", typ: u(undefined, "") },
        { json: "FDS_ID", js: "FDS_ID", typ: u(undefined, "") },
        { json: "FIGI", js: "FIGI", typ: u(undefined, "") },
        { json: "ISIN", js: "ISIN", typ: u(undefined, "") },
        { json: "PERMID", js: "PERMID", typ: u(undefined, "") },
        { json: "RIC", js: "RIC", typ: u(undefined, "") },
        { json: "SEDOL", js: "SEDOL", typ: u(undefined, "") },
        { json: "ticker", js: "ticker", typ: u(undefined, "") },
    ], "any"),
    "OrganizationMarket": o([
        { json: "BBG", js: "BBG", typ: u(undefined, "") },
        { json: "COUNTRY_ISOALPHA2", js: "COUNTRY_ISOALPHA2", typ: u(undefined, "") },
        { json: "MIC", js: "MIC", typ: u(undefined, "") },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "TimeRangeObject": o([
        { json: "endTime", js: "endTime", typ: u(undefined, Date) },
        { json: "startTime", js: "startTime", typ: u(undefined, Date) },
        { json: "type", js: "type", typ: r("TimeRangeType") },
        { json: "id", js: "id", typ: u(undefined, m("any")) },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "ChatInitSettings": o([
        { json: "chatName", js: "chatName", typ: u(undefined, "") },
        { json: "members", js: "members", typ: u(undefined, r("ContactListObject")) },
        { json: "message", js: "message", typ: u(undefined, u(r("MessageObject"), "")) },
        { json: "options", js: "options", typ: u(undefined, r("ChatOptions")) },
        { json: "type", js: "type", typ: r("ChatInitSettingsType") },
        { json: "id", js: "id", typ: u(undefined, m("any")) },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "ContactListObject": o([
        { json: "contacts", js: "contacts", typ: a(r("ContactElement")) },
        { json: "type", js: "type", typ: r("ContactListType") },
        { json: "id", js: "id", typ: u(undefined, m("any")) },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "ContactElement": o([
        { json: "id", js: "id", typ: r("PurpleContactIdentifiers") },
        { json: "type", js: "type", typ: r("FluffyInteractionType") },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "PurpleContactIdentifiers": o([
        { json: "email", js: "email", typ: u(undefined, "") },
        { json: "FDS_ID", js: "FDS_ID", typ: u(undefined, "") },
    ], "any"),
    "MessageObject": o([
        { json: "entities", js: "entities", typ: u(undefined, m(r("PurpleAction"))) },
        { json: "text", js: "text", typ: u(undefined, r("PurpleMessageText")) },
        { json: "type", js: "type", typ: r("MessageType") },
        { json: "id", js: "id", typ: u(undefined, m("any")) },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "PurpleAction": o([
        { json: "app", js: "app", typ: u(undefined, r("ActionTargetApp")) },
        { json: "context", js: "context", typ: u(undefined, r("ContextElement")) },
        { json: "intent", js: "intent", typ: u(undefined, "") },
        { json: "title", js: "title", typ: u(undefined, "") },
        { json: "type", js: "type", typ: r("EntityType") },
        { json: "id", js: "id", typ: u(undefined, m("any")) },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "data", js: "data", typ: u(undefined, r("PurpleData")) },
    ], "any"),
    "PurpleData": o([
        { json: "dataUri", js: "dataUri", typ: "" },
        { json: "name", js: "name", typ: "" },
    ], "any"),
    "PurpleMessageText": o([
        { json: "text/markdown", js: "text/markdown", typ: u(undefined, "") },
        { json: "text/plain", js: "text/plain", typ: u(undefined, "") },
    ], "any"),
    "ChatOptions": o([
        { json: "allowAddUser", js: "allowAddUser", typ: u(undefined, true) },
        { json: "allowHistoryBrowsing", js: "allowHistoryBrowsing", typ: u(undefined, true) },
        { json: "allowMessageCopy", js: "allowMessageCopy", typ: u(undefined, true) },
        { json: "groupRecipients", js: "groupRecipients", typ: u(undefined, true) },
        { json: "isPublic", js: "isPublic", typ: u(undefined, true) },
    ], "any"),
    "ChatMessage": o([
        { json: "chatRoom", js: "chatRoom", typ: r("ChatRoomObject") },
        { json: "message", js: "message", typ: r("MessageObject") },
        { json: "type", js: "type", typ: r("ChatMessageType") },
        { json: "id", js: "id", typ: u(undefined, m("any")) },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "ChatRoomObject": o([
        { json: "id", js: "id", typ: m("any") },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "providerName", js: "providerName", typ: "" },
        { json: "type", js: "type", typ: r("ChatRoomType") },
        { json: "url", js: "url", typ: u(undefined, "") },
    ], "any"),
    "ChatRoom": o([
        { json: "id", js: "id", typ: m("any") },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "providerName", js: "providerName", typ: "" },
        { json: "type", js: "type", typ: r("ChatRoomType") },
        { json: "url", js: "url", typ: u(undefined, "") },
    ], "any"),
    "ChatSearchCriteria": o([
        { json: "criteria", js: "criteria", typ: a(u(r("OrganizationObject"), "")) },
        { json: "type", js: "type", typ: r("ChatSearchCriteriaType") },
        { json: "id", js: "id", typ: u(undefined, m("any")) },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "OrganizationObject": o([
        { json: "id", js: "id", typ: r("Identifiers") },
        { json: "market", js: "market", typ: u(undefined, r("OrganizationMarket")) },
        { json: "type", js: "type", typ: r("TentacledInteractionType") },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "Identifiers": o([
        { json: "BBG", js: "BBG", typ: u(undefined, "") },
        { json: "CUSIP", js: "CUSIP", typ: u(undefined, "") },
        { json: "FDS_ID", js: "FDS_ID", typ: u(undefined, "") },
        { json: "FIGI", js: "FIGI", typ: u(undefined, "") },
        { json: "ISIN", js: "ISIN", typ: u(undefined, "") },
        { json: "PERMID", js: "PERMID", typ: u(undefined, "") },
        { json: "RIC", js: "RIC", typ: u(undefined, "") },
        { json: "SEDOL", js: "SEDOL", typ: u(undefined, "") },
        { json: "ticker", js: "ticker", typ: u(undefined, "") },
        { json: "LEI", js: "LEI", typ: u(undefined, "") },
        { json: "email", js: "email", typ: u(undefined, "") },
    ], "any"),
    "Contact": o([
        { json: "id", js: "id", typ: r("FluffyContactIdentifiers") },
        { json: "type", js: "type", typ: r("FluffyInteractionType") },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "FluffyContactIdentifiers": o([
        { json: "email", js: "email", typ: u(undefined, "") },
        { json: "FDS_ID", js: "FDS_ID", typ: u(undefined, "") },
    ], "any"),
    "ContactList": o([
        { json: "contacts", js: "contacts", typ: a(r("ContactElement")) },
        { json: "type", js: "type", typ: r("ContactListType") },
        { json: "id", js: "id", typ: u(undefined, m("any")) },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "Context": o([
        { json: "id", js: "id", typ: u(undefined, m("any")) },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "type", js: "type", typ: "" },
    ], "any"),
    "Country": o([
        { json: "id", js: "id", typ: r("CountryID") },
        { json: "type", js: "type", typ: r("CountryType") },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "CountryID": o([
        { json: "COUNTRY_ISOALPHA2", js: "COUNTRY_ISOALPHA2", typ: u(undefined, "") },
        { json: "COUNTRY_ISOALPHA3", js: "COUNTRY_ISOALPHA3", typ: u(undefined, "") },
        { json: "ISOALPHA2", js: "ISOALPHA2", typ: u(undefined, "") },
        { json: "ISOALPHA3", js: "ISOALPHA3", typ: u(undefined, "") },
    ], "any"),
    "Currency": o([
        { json: "id", js: "id", typ: r("CurrencyID") },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "type", js: "type", typ: r("CurrencyType") },
    ], "any"),
    "CurrencyID": o([
        { json: "CURRENCY_ISOCODE", js: "CURRENCY_ISOCODE", typ: u(undefined, "") },
    ], "any"),
    "Email": o([
        { json: "recipients", js: "recipients", typ: r("EmailRecipients") },
        { json: "subject", js: "subject", typ: u(undefined, "") },
        { json: "textBody", js: "textBody", typ: u(undefined, "") },
        { json: "type", js: "type", typ: r("EmailType") },
        { json: "id", js: "id", typ: u(undefined, m("any")) },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "EmailRecipients": o([
        { json: "id", js: "id", typ: u(undefined, r("EmailRecipientsID")) },
        { json: "type", js: "type", typ: r("EmailRecipientsType") },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "contacts", js: "contacts", typ: u(undefined, a(r("ContactElement"))) },
    ], "any"),
    "EmailRecipientsID": o([
        { json: "email", js: "email", typ: u(undefined, "") },
        { json: "FDS_ID", js: "FDS_ID", typ: u(undefined, "") },
    ], "any"),
    "Instrument": o([
        { json: "id", js: "id", typ: r("FluffyInstrumentIdentifiers") },
        { json: "market", js: "market", typ: u(undefined, r("PurpleMarket")) },
        { json: "type", js: "type", typ: r("PurpleInteractionType") },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "FluffyInstrumentIdentifiers": o([
        { json: "BBG", js: "BBG", typ: u(undefined, "") },
        { json: "CUSIP", js: "CUSIP", typ: u(undefined, "") },
        { json: "FDS_ID", js: "FDS_ID", typ: u(undefined, "") },
        { json: "FIGI", js: "FIGI", typ: u(undefined, "") },
        { json: "ISIN", js: "ISIN", typ: u(undefined, "") },
        { json: "PERMID", js: "PERMID", typ: u(undefined, "") },
        { json: "RIC", js: "RIC", typ: u(undefined, "") },
        { json: "SEDOL", js: "SEDOL", typ: u(undefined, "") },
        { json: "ticker", js: "ticker", typ: u(undefined, "") },
    ], "any"),
    "PurpleMarket": o([
        { json: "BBG", js: "BBG", typ: u(undefined, "") },
        { json: "COUNTRY_ISOALPHA2", js: "COUNTRY_ISOALPHA2", typ: u(undefined, "") },
        { json: "MIC", js: "MIC", typ: u(undefined, "") },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "InstrumentList": o([
        { json: "instruments", js: "instruments", typ: a(r("InstrumentElement")) },
        { json: "type", js: "type", typ: r("InstrumentListType") },
        { json: "id", js: "id", typ: u(undefined, m("any")) },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "Interaction": o([
        { json: "description", js: "description", typ: "" },
        { json: "id", js: "id", typ: u(undefined, r("InteractionID")) },
        { json: "initiator", js: "initiator", typ: u(undefined, r("ContactElement")) },
        { json: "interactionType", js: "interactionType", typ: "" },
        { json: "origin", js: "origin", typ: u(undefined, "") },
        { json: "participants", js: "participants", typ: r("ContactListObject") },
        { json: "timeRange", js: "timeRange", typ: r("TimeRangeObject") },
        { json: "type", js: "type", typ: r("InteractionType") },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "InteractionID": o([
        { json: "SALESFORCE", js: "SALESFORCE", typ: u(undefined, "") },
        { json: "SINGLETRACK", js: "SINGLETRACK", typ: u(undefined, "") },
        { json: "URI", js: "URI", typ: u(undefined, "") },
    ], "any"),
    "Message": o([
        { json: "entities", js: "entities", typ: u(undefined, m(r("FluffyAction"))) },
        { json: "text", js: "text", typ: u(undefined, r("FluffyMessageText")) },
        { json: "type", js: "type", typ: r("MessageType") },
        { json: "id", js: "id", typ: u(undefined, m("any")) },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "FluffyAction": o([
        { json: "app", js: "app", typ: u(undefined, r("ActionTargetApp")) },
        { json: "context", js: "context", typ: u(undefined, r("ContextElement")) },
        { json: "intent", js: "intent", typ: u(undefined, "") },
        { json: "title", js: "title", typ: u(undefined, "") },
        { json: "type", js: "type", typ: r("EntityType") },
        { json: "id", js: "id", typ: u(undefined, m("any")) },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "data", js: "data", typ: u(undefined, r("FluffyData")) },
    ], "any"),
    "FluffyData": o([
        { json: "dataUri", js: "dataUri", typ: "" },
        { json: "name", js: "name", typ: "" },
    ], "any"),
    "FluffyMessageText": o([
        { json: "text/markdown", js: "text/markdown", typ: u(undefined, "") },
        { json: "text/plain", js: "text/plain", typ: u(undefined, "") },
    ], "any"),
    "Nothing": o([
        { json: "type", js: "type", typ: r("NothingType") },
        { json: "id", js: "id", typ: u(undefined, m("any")) },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "Order": o([
        { json: "details", js: "details", typ: u(undefined, r("PurpleOrderDetails")) },
        { json: "id", js: "id", typ: m("") },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "type", js: "type", typ: r("OrderType") },
    ], "any"),
    "PurpleOrderDetails": o([
        { json: "product", js: "product", typ: u(undefined, r("ProductObject")) },
    ], "any"),
    "ProductObject": o([
        { json: "id", js: "id", typ: m("") },
        { json: "instrument", js: "instrument", typ: u(undefined, r("InstrumentElement")) },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "type", js: "type", typ: r("ProductType") },
    ], "any"),
    "OrderList": o([
        { json: "orders", js: "orders", typ: a(r("OrderElement")) },
        { json: "type", js: "type", typ: r("OrderListType") },
        { json: "id", js: "id", typ: u(undefined, m("any")) },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "OrderElement": o([
        { json: "details", js: "details", typ: u(undefined, r("FluffyOrderDetails")) },
        { json: "id", js: "id", typ: m("") },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "type", js: "type", typ: r("OrderType") },
    ], "any"),
    "FluffyOrderDetails": o([
        { json: "product", js: "product", typ: u(undefined, r("ProductObject")) },
    ], "any"),
    "Organization": o([
        { json: "id", js: "id", typ: r("OrganizationIdentifiers") },
        { json: "type", js: "type", typ: r("StickyInteractionType") },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "OrganizationIdentifiers": o([
        { json: "FDS_ID", js: "FDS_ID", typ: u(undefined, "") },
        { json: "LEI", js: "LEI", typ: u(undefined, "") },
        { json: "PERMID", js: "PERMID", typ: u(undefined, "") },
    ], "any"),
    "Portfolio": o([
        { json: "positions", js: "positions", typ: a(r("PositionElement")) },
        { json: "type", js: "type", typ: r("PortfolioType") },
        { json: "id", js: "id", typ: u(undefined, m("any")) },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "PositionElement": o([
        { json: "holding", js: "holding", typ: 3.14 },
        { json: "instrument", js: "instrument", typ: r("InstrumentElement") },
        { json: "type", js: "type", typ: r("PositionType") },
        { json: "id", js: "id", typ: u(undefined, m("any")) },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "Position": o([
        { json: "holding", js: "holding", typ: 3.14 },
        { json: "instrument", js: "instrument", typ: r("InstrumentElement") },
        { json: "type", js: "type", typ: r("PositionType") },
        { json: "id", js: "id", typ: u(undefined, m("any")) },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "Product": o([
        { json: "id", js: "id", typ: m("") },
        { json: "instrument", js: "instrument", typ: u(undefined, r("InstrumentElement")) },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "type", js: "type", typ: r("ProductType") },
    ], "any"),
    "TimeRange": o([
        { json: "endTime", js: "endTime", typ: u(undefined, Date) },
        { json: "startTime", js: "startTime", typ: u(undefined, Date) },
        { json: "type", js: "type", typ: r("TimeRangeType") },
        { json: "id", js: "id", typ: u(undefined, m("any")) },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "Trade": o([
        { json: "id", js: "id", typ: m("") },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "product", js: "product", typ: r("ProductObject") },
        { json: "type", js: "type", typ: r("TradeType") },
    ], "any"),
    "TradeList": o([
        { json: "trades", js: "trades", typ: a(r("TradeElement")) },
        { json: "type", js: "type", typ: r("TradeListType") },
        { json: "id", js: "id", typ: u(undefined, m("any")) },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "TradeElement": o([
        { json: "id", js: "id", typ: m("") },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "product", js: "product", typ: r("ProductObject") },
        { json: "type", js: "type", typ: r("TradeType") },
    ], "any"),
    "TransactionResult": o([
        { json: "context", js: "context", typ: u(undefined, r("ContextElement")) },
        { json: "message", js: "message", typ: u(undefined, "") },
        { json: "status", js: "status", typ: r("TransactionStatus") },
        { json: "type", js: "type", typ: r("TransactionResultType") },
        { json: "id", js: "id", typ: u(undefined, m("any")) },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "Valuation": o([
        { json: "CURRENCY_ISOCODE", js: "CURRENCY_ISOCODE", typ: "" },
        { json: "expiryTime", js: "expiryTime", typ: u(undefined, Date) },
        { json: "price", js: "price", typ: u(undefined, 3.14) },
        { json: "type", js: "type", typ: r("ValuationType") },
        { json: "valuationTime", js: "valuationTime", typ: u(undefined, Date) },
        { json: "value", js: "value", typ: 3.14 },
        { json: "id", js: "id", typ: u(undefined, m("any")) },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "ActionType": [
        "fdc3.action",
    ],
    "PurpleInteractionType": [
        "fdc3.instrument",
    ],
    "TimeRangeType": [
        "fdc3.timeRange",
    ],
    "ChartStyle": [
        "bar",
        "candle",
        "custom",
        "heatmap",
        "histogram",
        "line",
        "mountain",
        "pie",
        "scatter",
        "stacked-bar",
    ],
    "ChartType": [
        "fdc3.chart",
    ],
    "FluffyInteractionType": [
        "fdc3.contact",
    ],
    "ContactListType": [
        "fdc3.contactList",
    ],
    "EntityType": [
        "fdc3.action",
        "fdc3.entity.fileAttachment",
    ],
    "MessageType": [
        "fdc3.message",
    ],
    "ChatInitSettingsType": [
        "fdc3.chat.initSettings",
    ],
    "ChatRoomType": [
        "fdc3.chat.room",
    ],
    "ChatMessageType": [
        "fdc3.chat.message",
    ],
    "TentacledInteractionType": [
        "fdc3.contact",
        "fdc3.instrument",
        "fdc3.organization",
    ],
    "ChatSearchCriteriaType": [
        "fdc3.chat.searchCriteria",
    ],
    "CountryType": [
        "fdc3.country",
    ],
    "CurrencyType": [
        "fdc3.currency",
    ],
    "EmailRecipientsType": [
        "fdc3.contact",
        "fdc3.contactList",
    ],
    "EmailType": [
        "fdc3.email",
    ],
    "InstrumentListType": [
        "fdc3.instrumentList",
    ],
    "InteractionType": [
        "fdc3.interaction",
    ],
    "NothingType": [
        "fdc3.nothing",
    ],
    "ProductType": [
        "fdc3.product",
    ],
    "OrderType": [
        "fdc3.order",
    ],
    "OrderListType": [
        "fdc3.orderList",
    ],
    "StickyInteractionType": [
        "fdc3.organization",
    ],
    "PositionType": [
        "fdc3.position",
    ],
    "PortfolioType": [
        "fdc3.portfolio",
    ],
    "TradeType": [
        "fdc3.trade",
    ],
    "TradeListType": [
        "fdc3.tradeList",
    ],
    "TransactionStatus": [
        "Created",
        "Deleted",
        "Failed",
        "Updated",
    ],
    "TransactionResultType": [
        "fdc3.transactionResult",
    ],
    "ValuationType": [
        "fdc3.valuation",
    ]
};

/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright FINOS FDC3 contributors - see NOTICE file
 */
/**
 * @deprecated Use {@link StandardIntent} instead
 */
var Intents;
(function (Intents) {
    Intents["CreateInteraction"] = "CreateInteraction";
    Intents["SendChatMessage"] = "SendChatMessage";
    Intents["StartCall"] = "StartCall";
    Intents["StartChat"] = "StartChat";
    Intents["StartEmail"] = "StartEmail";
    Intents["ViewAnalysis"] = "ViewAnalysis";
    Intents["ViewChat"] = "ViewChat";
    Intents["ViewChart"] = "ViewChart";
    Intents["ViewContact"] = "ViewContact";
    Intents["ViewHoldings"] = "ViewHoldings";
    Intents["ViewInstrument"] = "ViewInstrument";
    Intents["ViewInteractions"] = "ViewInteractions";
    Intents["ViewMessages"] = "ViewMessages";
    Intents["ViewNews"] = "ViewNews";
    Intents["ViewOrders"] = "ViewOrders";
    Intents["ViewProfile"] = "ViewProfile";
    Intents["ViewQuote"] = "ViewQuote";
    Intents["ViewResearch"] = "ViewResearch";
})(Intents || (Intents = {}));


//# sourceMappingURL=fdc3.esm.js.map


/***/ }),

/***/ "../../node_modules/@openfin/bloomberg/openfin.bloomberg.mjs":
/*!*******************************************************************!*\
  !*** ../../node_modules/@openfin/bloomberg/openfin.bloomberg.mjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdapterError: () => (/* binding */ oe),
/* harmony export */   ApiError: () => (/* binding */ ae),
/* harmony export */   InitializationError: () => (/* binding */ ie),
/* harmony export */   InteropError: () => (/* binding */ se),
/* harmony export */   TerminalConnectRequestError: () => (/* binding */ ce),
/* harmony export */   TerminalConnectionError: () => (/* binding */ ue),
/* harmony export */   connect: () => (/* binding */ le),
/* harmony export */   disableLogging: () => (/* binding */ pe),
/* harmony export */   enableLogging: () => (/* binding */ de),
/* harmony export */   getSecurityFromInstrumentContext: () => (/* binding */ ge)
/* harmony export */ });
var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},t={};e.d(t,{AdapterError:()=>AdapterError,ApiError:()=>ApiError,InitializationError:()=>InitializationError,InteropError:()=>InteropError,TerminalConnectRequestError:()=>TerminalConnectRequestError,TerminalConnectionError:()=>TerminalConnectionError,connect:()=>te,disableLogging:()=>I,enableLogging:()=>A,getSecurityFromInstrumentContext:()=>b});class ApiError extends Error{constructor(e="An unexpected error has occurred",t){super(e),this.name=this.constructor.name,this.stack=this.stack?.replace(/^(\w*Error)/,`${this.constructor.name}`),t&&(this.data=t)}}class AdapterError extends ApiError{constructor(e="Failed to execute adapter function",t){super(e,t)}}class InitializationError extends ApiError{constructor(e="Failed to initialize adapter",t){super(e,t)}}class InteropError extends ApiError{constructor(e="Failed to execute the interop function",t){super(e,t)}}class ParameterError extends ApiError{constructor(e){super(e=e??"Invalid parameter detected")}}class TerminalConnectionError extends ApiError{constructor(e="Failed to connect to the terminal",t){super(e,t)}}class TerminalConnectRequestError extends ApiError{constructor(e="Terminal Connect request failed",t){super(e,t)}}function n(e){return{arrayItems:e}}function r(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return{unionMembers:t}}function o(e,t){return{props:e,additional:t}}function a(e){return{props:[],additional:e}}function i(e){return{ref:e}}var s,c,u,l,p;Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date;!function(e){e.AppNotFound="AppNotFound",e.ErrorOnLaunch="ErrorOnLaunch",e.AppTimeout="AppTimeout",e.ResolverUnavailable="ResolverUnavailable",e.MalformedContext="MalformedContext",e.DesktopAgentNotFound="DesktopAgentNotFound"}(s||(s={})),function(e){e.NoAppsFound="NoAppsFound",e.ResolverUnavailable="ResolverUnavailable",e.UserCancelled="UserCancelledResolution",e.ResolverTimeout="ResolverTimeout",e.TargetAppUnavailable="TargetAppUnavailable",e.TargetInstanceUnavailable="TargetInstanceUnavailable",e.IntentDeliveryFailed="IntentDeliveryFailed",e.MalformedContext="MalformedContext",e.DesktopAgentNotFound="DesktopAgentNotFound"}(c||(c={})),function(e){e.NoResultReturned="NoResultReturned",e.IntentHandlerRejected="IntentHandlerRejected"}(u||(u={})),function(e){e.NoChannelFound="NoChannelFound",e.AccessDenied="AccessDenied",e.CreationFailed="CreationFailed",e.MalformedContext="MalformedContext"}(l||(l={})),function(e){e.ResponseTimedOut="ResponseToBridgeTimedOut",e.AgentDisconnected="AgentDisconnected",e.NotConnectedToBridge="NotConnectedToBridge",e.MalformedMessage="MalformedMessage"}(p||(p={}));var d;!function(e){e.Chart="fdc3.chart",e.ChatInitSettings="fdc3.chat.initSettings",e.ChatRoom="fdc3.chat.room",e.Contact="fdc3.contact",e.ContactList="fdc3.contactList",e.Country="fdc3.country",e.Currency="fdc3.currency",e.Email="fdc3.email",e.Instrument="fdc3.instrument",e.InstrumentList="fdc3.instrumentList",e.Interaction="fdc3.interaction",e.Nothing="fdc3.nothing",e.Organization="fdc3.organization",e.Portfolio="fdc3.portfolio",e.Position="fdc3.position",e.ChatSearchCriteria="fdc3.chat.searchCriteria",e.TimeRange="fdc3.timerange",e.TransactionResult="fdc3.transactionResult",e.Valuation="fdc3.valuation"}(d||(d={}));function g(e){return{arrayItems:e}}function m(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return{unionMembers:t}}function f(e,t){return{props:e,additional:t}}function w(e){return{props:[],additional:e}}function h(e){return{ref:e}}var y;Date,Date,Date,Date,Date,Date;!function(e){e.CreateInteraction="CreateInteraction",e.SendChatMessage="SendChatMessage",e.StartCall="StartCall",e.StartChat="StartChat",e.StartEmail="StartEmail",e.ViewAnalysis="ViewAnalysis",e.ViewChat="ViewChat",e.ViewChart="ViewChart",e.ViewContact="ViewContact",e.ViewHoldings="ViewHoldings",e.ViewInstrument="ViewInstrument",e.ViewInteractions="ViewInteractions",e.ViewMessages="ViewMessages",e.ViewNews="ViewNews",e.ViewOrders="ViewOrders",e.ViewProfile="ViewProfile",e.ViewQuote="ViewQuote",e.ViewResearch="ViewResearch"}(y||(y={}));const C=e=>{const t=Date.parse(e);if(!Number.isNaN(t))return new Date(t)},E=e=>{let t=/\s+([\w-]+$)/.exec(e)?.[1];if(t)return t=t.charAt(0).toUpperCase()+t.slice(1).toLowerCase().replace("-m","-M"),t},b=e=>{if(e.type!==d.Instrument)return;const{id:t,market:n}=e,{BBG:r,FIGI:o,ticker:a}=t;if(r||o)return r??o;if(!a)return;return`${a} ${n?.BBG?n.BBG:"US"} Equity`};let v=!1;const D="[@openfin/bloomberg]",I=()=>{v=!1},A=()=>{v=!0,N("v2.0.0")},R=(e,t)=>{if(!v)return;const n=t?`${D} ${t}`:D;e instanceof ApiError&&e.data?console.error(n,e,e.data):console.error(n,e)},N=(...e)=>{v&&console.log(D,...e)},x=(...e)=>{v&&console.warn(D,...e)};var T,S,M;"undefined"==typeof fin&&Object.assign(window,{fin:{}}),Object.assign(fin,{Integrations:{Bloomberg:{enableLogging:A,disableLogging:I}}}),function(e){e.CancelSubscription="CancelSubscription",e.Connect="Connect",e.CreateSubscription="CreateSubscription",e.Disconnect="Disconnect",e.ExecuteRequest="ExecuteRequest",e.LogMessage="LogMessage",e.SubscriptionEvent="SubscriptionEvent"}(T||(T={})),function(e){e[e.Error=0]="Error",e[e.Info=1]="Info",e[e.Warn=2]="Warn"}(S||(S={})),function(e){e.Local="Local",e.Remote="Remote"}(M||(M={}));const V=e=>async()=>{N("Retrieving launchpad groups");const t={query:"query {\n          groups {\n            ... on Groups {\n              items {\n                id\n                name\n                type\n                value\n              }\n            }\n            ... on Error {\n              errorCategory\n              errorMessage\n            }\n          }\n        }"};let n;try{n=await e(T.ExecuteRequest,t)}catch(e){const t=new AdapterError(void 0,e);throw R(t),t}if(!n.success){const e=new TerminalConnectRequestError(n.error?.message,n.error);throw R(e),e}if(!n.data){const e=new TerminalConnectRequestError("Unexpected empty response data",n);throw R(e),e}const{groups:r}=JSON.parse(n.data);if(r.items)return r.items;const o=new TerminalConnectRequestError(r.errorMessage,r);throw R(o),o},$=e=>async(t,n)=>{if(null==t||"number"!=typeof t||Number.isNaN(t))throw new ParameterError("Group ID must be a valid number");if(!n?.trim())throw new ParameterError("Group value must be a non-empty string");N("Setting group value",{groupId:t,newValue:n});const r={query:`mutation {\n          setGroupValue(\n            filter: {id: [${t}]},\n            value: "${n}") {\n            ... on GroupResults {\n              results {\n                result {\n                  succeeded\n                  details\n                }\n              }\n            }\n            ... on Error {\n              errorCategory\n              errorMessage\n            }\n          }\n        }`};let o;try{o=await e(T.ExecuteRequest,r)}catch(e){const t=new AdapterError(void 0,e);throw R(t),t}if(!o.success){const e=new TerminalConnectRequestError(o.error?.message,o.error);throw R(e),e}if(!o.data){const e=new TerminalConnectRequestError("Unexpected empty response data",o);throw R(e),e}const{setGroupValue:a}=JSON.parse(o.data);if("errorMessage"in a){const e=new TerminalConnectRequestError(a.errorMessage,a);throw R(e),e}},q=new Map,B=async(e,t,n,r)=>{const o=await O(e)(t);if(!o)return;const a=await(e=>async(t=[])=>{N("Creating group subscription",{groupIdFilter:t});const n={query:`subscription {\n        subscribeGroupEvents (\n          filter:{\n            event: [\n              VALUE_CHANGED\n            ]\n            ${t.length?`,group: {id: ${JSON.stringify(t)}}`:""}\n          }){\n          type\n          group{\n            id\n            name\n            value\n          }\n        }\n      }`};let r;try{r=await e(T.CreateSubscription,n)}catch(e){const t=new AdapterError(void 0,e);throw R(t),t}if(!r.success){const e=new TerminalConnectRequestError(r.error?.message,r.error);throw R(e),e}if(!r.data){const e=new TerminalConnectRequestError("Unexpected empty response data",r);throw R(e),e}const{subscriptionId:o}=JSON.parse(r.data);return o})(e)(o),i={id:a,listener:U(n,r),unsubscribe:F(e,a)};return q.set(a,i),i},F=(e,t)=>async()=>{N("Unsubscribing group events",{subscriptionId:t});try{await(e=>async t=>{const n={subscriptionId:t};let r;try{r=await e(T.CancelSubscription,n)}catch(e){const t=new AdapterError(void 0,e);throw R(t),t}if(!r.success){const e=new TerminalConnectRequestError(r.error?.message,r.error);throw R(e),e}})(e)(t)}catch(e){R(e)}q.delete(t)},U=(e,t)=>async n=>{try{e?.(n),N("Setting new context: ",n),await fin.me.interop.setContext(n)}catch(e){const n=new InteropError(void 0,e);R(n),t?.(n)}},P=async(e,t)=>{N("Group event received",{data:t,subscriptionId:e});const{group:n}=t.subscribeGroupEvents;if(!n)return void x("Received group event with no group",{subscriptionId:e});if(!q.has(e))return void x("Received group event for unknown subscription",{subscriptionId:e});const r=q.get(e),o=(e=>{const t={type:d.Instrument,id:{BBG:e}};if("Equity"===E(e)){const[n,r]=e.split(/\s+/);t.id.ticker=n?.toUpperCase(),t.market={BBG:r?.toUpperCase()}}return t})(n.value);o.openfinBbgApi=!0,r?.listener(o)},O=e=>async t=>{if(!t)return;if("*"===t)return[];Array.isArray(t)||(t=[t]);const n=await V(e)(),r=t.map((e=>{const t=n.find((t=>t.name?.toUpperCase()===e.toUpperCase()))?.id;return t||x(`Group not found: ${e}`),t})).filter(Boolean);return r.length?r:void 0},G="bloomberg-adapter",L=`bloomberg-adapter-${void 0!==crypto.randomUUID?crypto.randomUUID():"10000000-1000-4000-8000-100000000000".replace(/[018]/g,(e=>{const t=crypto.getRandomValues(new Uint8Array(1))[0]&15>>Number(e)/4;return(Number(e)^t).toString(16)}))}`;let k;const z=async(e=!1)=>{try{if(!await(async e=>(await fin.InterApplicationBus.Channel.getAllChannels()).some((t=>t.channelName===e)))(L)){const{port:t,securityRealm:n}=await fin.System.getRuntimeInfo(),{licenseKey:r}=await fin.Application.getCurrentSync().getManifest(),o=fin.me.uuid;N("Initializing adapter",{channelName:L,licenseKey:r,port:t,securityRealm:n,uuid:o,adapterLoggingEnabled:e}),await(async()=>{const e=await fin.Application.getCurrentSync().getManifest(),t=e.appAssets?.find((e=>e.alias===G));if(t)return void x("Detected adapter package in app manifest appAssets",t);if(await j())return void N("Using existing adapter package");const n={alias:G,src:"https://cdn.openfin.co/release/integrations/bloomberg/2.0.0/OpenFin.Bloomberg.zip",target:"OpenFin.Bloomberg.exe",version:"2.0.0"};N("Downloading adapter package",n);try{await fin.System.downloadAsset(n,(()=>{}))}catch(e){throw R("Unable to download adapter package"),e}})(),fin.System.launchExternalProcess({alias:G,arguments:`"${o}" "${r??""}" "${t}" "${n??""}" "${L}" "${e}"`,lifetime:"application"})}const n=fin.InterApplicationBus.Channel.connect(L,{payload:{version:"2.0.0"}}),r=new Promise((e=>{setTimeout(e,2e4)})).then((()=>{throw new ApiError("Connection to adapter timed out")}));return k=await Promise.race([n,r]),k.register(T.LogMessage,H),k.register(T.SubscriptionEvent,J),N("Connected to adapter",{uuid:k.providerIdentity.uuid}),{channelName:L,dispatch:(...e)=>k.dispatch(...e),initTerminal:(t=k,async e=>{const n={apiKey:e};let r;try{r=await t.dispatch(T.Connect,n)}catch(e){const t=new AdapterError(void 0,e);throw R(t),t}if(!r.success){const e=new TerminalConnectionError(r.error?.message,r.error);throw R(e),e}}),version:"2.0.0"}}catch(e){const t=e instanceof ApiError?new InitializationError(e.message):new InitializationError(void 0,e);throw R(t),t}var t},H=e=>{const{level:t,message:n}=e,r="[adapter]";switch(t){case S.Error:R(n,r);break;case S.Warn:x(r,n);break;case S.Info:default:N(r,n)}},J=async e=>{const{data:t,error:n,subscriptionId:r}=e;if(!r||!t){const t=new TerminalConnectRequestError("Invalid subscription event",e);throw R(t),t}if(n){const e=new TerminalConnectRequestError(void 0,n);throw R(e),e}const o=JSON.parse(t);if(!0===Boolean(o.subscribeGroupEvents))await P(r,o);else x("Received unknown subscription event",t)},j=async()=>{try{return"2.0.0"===(await fin.System.getAppAssetInfo({alias:G})).version}catch(e){return!1}},Q=async(e,t)=>{if(!e)return void x("No action specified, ignoring");if("group"in e){const{group:n,security:r}=e;return void await(e=>async(t,n)=>{if(!n)return;N(`Setting ${"*"===t?"every group":`group ${t}`} security to ${n}`);const r=await V(e)();if("*"===t)await Promise.all(r.map((t=>t.id?$(e)(t.id,n):Promise.resolve())));else{const o=r.find((e=>e.name?.toUpperCase()===t.toUpperCase()))?.id;null==o?x(`Unable to update group security for ${t}: group not found`):await $(e)(o,n)}})(t)(n,r)}const{mnemonic:n,securities:r,target:o,tail:a}=e,[i,s]=r??[];await(e=>async(t,n,r,o,a)=>{if(!t?.trim())throw new ParameterError("Mnemonic must be a non-empty string");if(null==n||"string"==typeof n&&!n?.trim())throw new ParameterError("Target must be a number (0-3) or non-empty string");N("Running terminal function",{mnemonic:t,target:n,security1:r,security2:o,tail:a});const i=t.trim().toUpperCase();let s,c;"number"==typeof n?(s="runFunctionInPanel",c="panel: "+(1===n?"ONE":2===n?"TWO":3===n?"THREE":"ZERO")):(s="runFunctionInTab",c=`tabName: "${n.trim()}"`);const u={query:`mutation {\n        ${s}(input: {\n          mnemonic: "${i}",\n          ${c},\n          ${r?`security1: "${r}"`:""}\n          ${o?`security2: "${o}"`:""}\n          ${a?`tail: "${a}"`:""}\n        }) {\n          ... on Result {\n            succeeded\n            details\n          }\n          ... on Error {\n            errorCategory\n            errorMessage\n          }\n        }\n      }`};let l;try{l=await e(T.ExecuteRequest,u)}catch(e){const t=new AdapterError(void 0,e);throw R(t),t}if(!l.success){const e=new TerminalConnectRequestError(l.error?.message,l.error);throw R(e),e}if(l.data){const e=JSON.parse(l.data);let t;if("runFunctionInTab"in e?t=e.runFunctionInTab.errorMessage:"runFunctionInPanel"in e&&(t=e.runFunctionInPanel.errorMessage),t){const n=new TerminalConnectRequestError(t,e);throw R(n),n}}})(t)(n,o,i,s,a)},W=()=>e=>{const t=e,{name:n,id:r}=t,o=r?.BBG??n;if(o)return{mnemonic:"BIO",target:0,tail:o};x("No valid identifier provided in context, ignoring")},Y=e=>t=>{const n=b(t);if(n)return{mnemonic:e,securities:[n],target:0};x("No security provided in context, ignoring")},K=async(e,t,n,r)=>{const o=(()=>{const e=[],t=[];return e.push([d.Instrument,Y("DES")]),e.push([d.Contact,W()]),e.push([d.Organization,_()]),t.push([y.StartChat,[[d.Nothing,Z("IB")],[d.Contact,e=>{const{id:t,name:n}=e;return{mnemonic:"IB",target:0,tail:t.email??n}}]]]),t.push([y.ViewAnalysis,[[d.Nothing,Z("ANR")],[d.Instrument,e=>{const t=b(e);if(!t)return void x("No security provided in context, ignoring");let n;switch(E(t)){case"Equity":case"Index":n="FA";break;case"Corp":case"Govt":case"Mtge":case"Muni":case"Pfd":n="YAS";break;default:n="ANR"}return{mnemonic:n,securities:[t],target:0}}]]]),t.push([y.ViewChart,[[d.Nothing,Z("GIP")],[d.Instrument,Y("GIP")],[d.Chart,e=>{const{interval:t,instruments:n,range:r,style:o}=e,a={mnemonic:"GIP",target:0};let i=!0;const s=b(n?.[0]??e);s&&(a.securities=[s]);const{endTime:c,startTime:u}=r??{};if(u){const e=C(u.toString());if(e&&(a.tail=`${e.getMonth()+1}/${e.getDate()}/${e.getFullYear()}`,i=!1,c)){const e=C(c.toString());e&&(a.tail+=` ${e.getMonth()+1}/${e.getDate()}/${e.getFullYear()}`)}}switch(o?.toLowerCase()){case"bar":a.mnemonic=i?"IGPO":"GPO";break;case"candle":a.mnemonic=i?"IGPC":"GPC";break;default:a.mnemonic=i?"GIP":"GP"}if(!i&&t)switch(t.toLowerCase()){case"daily":a.tail+=" D";break;case"weekly":a.tail+=" W";break;case"monthly":a.tail+="M";break;case"quarterly":a.tail+=" Q";break;case"yearly":a.tail+=" Y"}return a}]]]),t.push([y.ViewChat,[[d.Nothing,Z("IB")],[d.Contact,e=>{const{id:t,name:n}=e;return{mnemonic:"IB",target:0,tail:t.email??n}}]]]),t.push([y.ViewContact,[[d.Nothing,Z("BIO")],[d.Contact,W()]]]),t.push([y.ViewInstrument,[[d.Nothing,Z("DES")],[d.Instrument,Y("DES")]]]),t.push([y.ViewNews,[[d.Nothing,Z("CN")],[d.Instrument,Y("CN")]]]),t.push([y.ViewProfile,[[d.Nothing,Z("DES")],[d.Contact,W()],[d.Organization,_()]]]),t.push([y.ViewQuote,[[d.Nothing,Z("ALLQ")],[d.Instrument,Y("ALLQ")]]]),t.push([y.ViewResearch,[[d.Nothing,Z("BRC")],[d.Instrument,Y("BRC")]]]),{contexts:e,intents:t}})(),a=(e=>{const t=([e])=>!!(e??"").trim();return{contexts:[...e?.contexts??[]].filter(t),intents:[...e?.intents??[]].filter((([e,n])=>{const r=[...n??[]].filter(t);return!!(e??"").trim()&&r.length>0}))}})(t),i=new Map(o.contexts);a.contexts?.forEach((([e])=>{i.has(e)&&i.delete(e)})),o.contexts=Array.from(i);const s=new Map(o.intents);a.intents?.forEach((([e])=>{s.has(e)&&s.delete(e)})),o.intents=Array.from(s);const c=[...o.contexts,...a.contexts??[]],u=[...o.intents,...a.intents??[]],l=[];let p;c.length&&l.push(fin.me.interop.addContextHandler(((e,t,n,r)=>async o=>{o?!0!==o.openfinBbgApi&&(N("Context received",o),o.type!==d.Nothing?await X(e,o,t,n,r):N("Null context received, ignoring")):N("No context info provided, ignoring")})(e,c,n,r))),u.length&&u.forEach((([t,o])=>{l.push(fin.me.interop.registerIntentHandler(((e,t,n,r)=>async o=>{N("Intent received",o),t?await X(e,o.context,t,n,r):x(`No actions have been provided for intent ${o.name}, ignoring`)})(e,o,n,r),t))}));try{p=await Promise.all(l)}catch(e){const t=new InteropError("Failed to register interop handlers",e);throw R(t),t}return p},Z=e=>t=>({mnemonic:e,target:0}),_=()=>e=>{const{name:t}=e;if(t)return{mnemonic:"SEAR",target:0,tail:t};x("No valid identifier provided in context, ignoring")},X=async(e,t,n,r,o)=>{r?.(t),N("Processing context",t),n.some((([e])=>e===t.type))?await Promise.all(n.filter((([e])=>e===t.type)).map((async([,n])=>{let r;try{r=await n(t)}catch(e){const t=new ApiError("Unexpected error in context action handler",e);return R(t),void o?.(t)}try{await Q(r,e)}catch(e){const t=e instanceof ApiError?e:new ApiError(void 0,e);R(t),o?.(t)}}))):x(`No action has been defined for context type ${t.type}, ignoring`)};var ee;!function(e){e.Bloomberg="BLOOMBERG"}(ee||(ee={}));const te=async(e,t)=>{N("Creating connection",{config:t}),re(ee.Bloomberg);const n=await z(v);await n.initTerminal(e);const{actions:r,interopDisabled:o,onContextChanged:a,onError:i}=t??{},s=void 0===t?.groups?"*":t.groups,c=[];if(!0!==o){c.push(...await K(n.dispatch,r,a,i));const e=await B(n.dispatch,s,a,i);e&&c.push(e)}return{disconnect:ne(n.dispatch,c),executeApiRequest:(u=n.dispatch,async(e,t)=>{N("Executing API request",{query:e});const n={query:e};let r;t&&(n.service=t);try{r=await u(T.ExecuteRequest,n)}catch(e){const t=new AdapterError(void 0,e);throw R(t),t}if(!r.success){const e=new TerminalConnectRequestError(r.error?.message,r.error);throw R(e),e}if(!r.data){const e=new TerminalConnectRequestError("Unexpected empty response data",r);throw R(e),e}const o=JSON.parse(r.data);if("errorMessage"in o){const e=new TerminalConnectRequestError(o.errorMessage,o);throw R(e),e}return o})};var u},ne=(e,t=[])=>async()=>{N("Disconnecting");try{await Promise.all(t.map((async e=>{await e.unsubscribe()}))),await(e=>async()=>{let t;try{t=await e(T.Disconnect,null)}catch(e){const t=new AdapterError(void 0,e);throw R(t),t}if(!t.success){const e=new TerminalConnectionError("Failed to disconnect terminal",t.error);throw R(e),e}})(e)()}catch(e){const t=new ApiError("Disconnection failed",e);throw R(t),t}},re=async e=>{try{await fin.System.registerUsage({type:"integration-feature",data:{apiVersion:"2.0.0",componentName:e}})}catch(t){x(`Unable to register usage for feature ${e}: ${t?.message}`)}};var oe=t.AdapterError,ae=t.ApiError,ie=t.InitializationError,se=t.InteropError,ce=t.TerminalConnectRequestError,ue=t.TerminalConnectionError,le=t.connect,pe=t.disableLogging,de=t.enableLogging,ge=t.getSecurityFromInstrumentContext;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*******************************!*\
  !*** ./client/src/bbgtest.ts ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _finos_fdc3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @finos/fdc3 */ "../../node_modules/@finos/fdc3/dist/fdc3.esm.js");
/* harmony import */ var _openfin_bloomberg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @openfin/bloomberg */ "../../node_modules/@openfin/bloomberg/openfin.bloomberg.mjs");


let bbgConnection;
let selectedIntentType = "";
let selectedIntentValue = "";
let fdc3Denomination = "";
let bbgMnemonic = "";
let btnConnect;
let btnDisconnect;
let btnClearLogs;
let btnQuery;
let intentTypeElement;
let intentValueElement;
let logOutput;
const API_KEY = "";
const config = {
    onContextChanged: (context) => {
        logInformation(`Received context: ${JSON.stringify(context)}`);
    },
    onError: (error) => logInformation(error.message),
    groups: ["Group-A"],
    interopDisabled: false,
    actions: {
        contexts: [
            [
                _finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.ContextTypes.Instrument,
                (context) => {
                    // Use the getSecurityFromInstrumentContext utility function to extract the security string from the context
                    const security = (0,_openfin_bloomberg__WEBPACK_IMPORTED_MODULE_1__.getSecurityFromInstrumentContext)(context);
                    if (!security) {
                        return;
                    }
                    logInformation(`Received Instrument Context: ${security}`);
                    // Return a BloombergGroupUpdate object that updates Launchpad group A with the security
                    return {
                        group: "Group-A",
                        security
                    };
                }
            ]
        ]
    }
};
window.addEventListener("DOMContentLoaded", async () => {
    // Enable logging in the BBG package
    (0,_openfin_bloomberg__WEBPACK_IMPORTED_MODULE_1__.enableLogging)();
    // Initialize the DOM elements.
    initializeDOM();
});
/**
 * Initialize the DOM.
 */
function initializeDOM() {
    btnConnect = document.querySelector("#btnConnect");
    btnDisconnect = document.querySelector("#btnDisconnect");
    btnClearLogs = document.querySelector("#btnClear");
    btnQuery = document.querySelector("#btnQuery");
    intentTypeElement = document.querySelector("#intentType");
    intentValueElement = document.querySelector("#intentValue");
    logOutput = document.querySelector("#logOutput");
    if (btnConnect) {
        btnConnect.addEventListener("click", async () => {
            if (btnConnect) {
                btnConnect.disabled = true;
            }
            await connectToBBGTerminal();
            updateState();
        });
    }
    if (btnDisconnect) {
        btnDisconnect.addEventListener("click", async () => {
            if (btnDisconnect) {
                btnDisconnect.disabled = true;
            }
            await disconnectFromBBGTerminal();
            updateState();
        });
    }
    if (btnClearLogs) {
        btnClearLogs.addEventListener("click", clearLogs);
    }
    if (btnQuery) {
        btnQuery.addEventListener("click", fireIntentForBBG);
    }
    if (intentTypeElement) {
        intentTypeElement.addEventListener("change", (event) => {
            if (intentTypeElement?.value) {
                if (btnQuery) {
                    btnQuery.disabled = true;
                }
                switch (intentTypeElement?.value) {
                    case "ViewChart":
                        logInformation("Intent to be fired is ViewChart. Content Type is fdc3.instrument. Bloomberg Terminal Mnemonic: GP");
                        selectedIntentType = "ViewChart";
                        fdc3Denomination = "fdc3.instrument";
                        bbgMnemonic = "GP";
                        populateSelect(intentValueElement, [
                            {
                                value: "ORCL",
                                label: "Oracle Corp"
                            },
                            {
                                value: "MSFT",
                                label: "Microsoft"
                            },
                            {
                                value: "IBM",
                                label: "IBM"
                            }
                        ]);
                        break;
                    case "ViewContact":
                        logInformation("Intent to be fired is ViewContact. Content Type is fdc3.contact. Bloomberg Terminal Mnemonic: BIO");
                        selectedIntentType = "ViewContact";
                        fdc3Denomination = "fdc3.contact";
                        bbgMnemonic = "BIO";
                        populateSelect(intentValueElement, [
                            {
                                value: "William Henry Gates",
                                label: "William Henry Gates"
                            },
                            {
                                value: "Larry Ellison",
                                label: "Larry Ellison"
                            },
                            {
                                value: "Robert Iger",
                                label: "Robert Iger"
                            }
                        ]);
                        break;
                    case "ViewInstrument":
                        logInformation("Intent to be fired is ViewInstrument. Content Type is fdc3.instrument. Bloomberg Terminal Mnemonic: DES");
                        selectedIntentType = "ViewInstrument";
                        fdc3Denomination = "fdc3.instrument";
                        bbgMnemonic = "DES";
                        populateSelect(intentValueElement, [
                            {
                                value: "ORCL",
                                label: "Oracle Corp"
                            },
                            {
                                value: "MSFT",
                                label: "Microsoft"
                            },
                            {
                                value: "IBM",
                                label: "IBM"
                            }
                        ]);
                        break;
                    case "ViewQuote":
                        logInformation("Intent to be fired is ViewQuote. Content Type is fdc3.instrument. Bloomberg Terminal Mnemonic: Q");
                        selectedIntentType = "ViewQuote";
                        fdc3Denomination = "fdc3.instrument";
                        bbgMnemonic = "Q";
                        populateSelect(intentValueElement, [
                            {
                                value: "ORCL",
                                label: "Oracle Corp"
                            },
                            {
                                value: "MSFT",
                                label: "Microsoft"
                            },
                            {
                                value: "IBM",
                                label: "IBM"
                            }
                        ]);
                        break;
                }
                updateState();
            }
        });
    }
    if (intentValueElement) {
        intentValueElement.addEventListener("change", () => {
            if (intentValueElement) {
                selectedIntentValue = intentValueElement.value;
                if (selectedIntentValue.length > 0) {
                    logInformation(`action: ${selectedIntentType}, type: ${fdc3Denomination}, bbg mnemonic: ${bbgMnemonic}, search value: ${selectedIntentValue}`);
                }
                updateState();
            }
        });
    }
    updateState();
}
/**
 * Connect to Bloomberg Terminal.
 */
async function connectToBBGTerminal() {
    try {
        logInformation("Checking Bloomberg Terminal Status");
        bbgConnection = await (0,_openfin_bloomberg__WEBPACK_IMPORTED_MODULE_1__.connect)(API_KEY, config);
        logInformation("Connection successful");
    }
    catch (error) {
        bbgConnection = undefined;
        console.log(error);
        logInformation(errorToString(error));
    }
}
/**
 * Disconnect from Bloomberg Terminal.
 */
async function disconnectFromBBGTerminal() {
    if (bbgConnection) {
        try {
            logInformation("Disconnecting from Bloomberg Terminal");
            await bbgConnection.disconnect();
        }
        finally {
            bbgConnection = undefined;
            logInformation("Disconnected from Bloomberg Terminal");
        }
    }
}
/**
 * Fire an intent.
 */
async function fireIntentForBBG() {
    if (bbgConnection) {
        try {
            logInformation(`action: ${selectedIntentType}, type: ${fdc3Denomination}, bbg mnemonic: ${bbgMnemonic}, search value: ${selectedIntentValue}`);
            let intent;
            switch (selectedIntentType) {
                case "ViewContact":
                    intent = {
                        name: selectedIntentType,
                        context: {
                            type: fdc3Denomination,
                            name: selectedIntentValue,
                            id: {}
                        }
                    };
                    break;
                default:
                    intent = {
                        name: selectedIntentType,
                        context: {
                            type: fdc3Denomination,
                            id: {
                                ticker: selectedIntentValue
                            }
                        }
                    };
                    break;
            }
            await fin.me.interop.fireIntent(intent);
        }
        catch (error) {
            logInformation(`Error while trying to raise intent: ${errorToString(error)}`);
        }
    }
    else {
        logInformation("Not connected to the Bloomberg Terminal. Please check your status or log in again.");
    }
}
/**
 * Update the state of the DOM.
 */
function updateState() {
    const isConnected = bbgConnection !== undefined;
    if (btnConnect) {
        btnConnect.disabled = isConnected;
    }
    if (btnDisconnect) {
        btnDisconnect.disabled = !isConnected;
    }
    if (intentTypeElement) {
        intentTypeElement.disabled = !isConnected;
    }
    if (intentValueElement) {
        intentValueElement.disabled = !isConnected || selectedIntentType.length === 0;
    }
    if (btnQuery) {
        btnQuery.disabled = !isConnected || selectedIntentValue.length === 0;
    }
}
/**
 * Log information to the output element.
 * @param info The information to log.
 */
function logInformation(info) {
    if (logOutput) {
        logOutput.textContent = `${logOutput.textContent}${info}\n\n`;
        logOutput.scrollTop = logOutput.scrollHeight;
    }
}
/**
 * Convert and error to a string.
 * @param err The error to convert.
 * @returns The error as a string.
 */
function errorToString(err) {
    if (err instanceof Error) {
        return err.message;
    }
    else if (typeof err === "string") {
        return err;
    }
    return JSON.stringify(err);
}
/**
 * Clear the logs.
 */
function clearLogs() {
    if (logOutput) {
        logOutput.textContent = "";
        logOutput.scrollTop = 0;
    }
}
/**
 * Populate a select control with a list of items.
 * @param select The select element to populate.
 * @param values The values to populate the element with.
 */
function populateSelect(select, values) {
    if (select) {
        select.innerHTML = "";
        const opt = document.createElement("option");
        opt.value = "";
        opt.text = "Please select value";
        opt.disabled = true;
        opt.selected = true;
        select.append(opt);
        for (const val of values) {
            const optVal = document.createElement("option");
            optVal.value = val.value;
            optVal.text = val.label;
            select.append(optVal);
        }
    }
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmJndGVzdC5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQSxjQUFjLDJnRUFBMmdFO0FBQ3poRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDREQUE0RCw2QkFBNkI7QUFDekY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDhCQUE4QjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLG9DQUFvQztB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7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QUcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLEdBQUcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbkIsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQztZQUMxQixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2hELE1BQU0sQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUN6QixNQUFNLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFDeEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QixDQUFDO0lBQ0YsQ0FBQztBQUNGLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pbnRlZ3JhdGUtd2l0aC1ibG9vbWJlcmctYmFzaWMvLi4vLi4vbm9kZV9tb2R1bGVzL0BmaW5vcy9mZGMzL2Rpc3QvZmRjMy5lc20uanMiLCJ3ZWJwYWNrOi8vaW50ZWdyYXRlLXdpdGgtYmxvb21iZXJnLWJhc2ljLy4uLy4uL25vZGVfbW9kdWxlcy9Ab3BlbmZpbi9ibG9vbWJlcmcvb3BlbmZpbi5ibG9vbWJlcmcubWpzIiwid2VicGFjazovL2ludGVncmF0ZS13aXRoLWJsb29tYmVyZy1iYXNpYy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9pbnRlZ3JhdGUtd2l0aC1ibG9vbWJlcmctYmFzaWMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2ludGVncmF0ZS13aXRoLWJsb29tYmVyZy1iYXNpYy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2ludGVncmF0ZS13aXRoLWJsb29tYmVyZy1iYXNpYy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2ludGVncmF0ZS13aXRoLWJsb29tYmVyZy1iYXNpYy8uL2NsaWVudC9zcmMvYmJndGVzdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUbyBwYXJzZSB0aGlzIGRhdGE6XG4vL1xuLy8gICBpbXBvcnQgeyBDb252ZXJ0LCBBZ2VudEVycm9yUmVzcG9uc2VNZXNzYWdlLCBBZ2VudFJlcXVlc3RNZXNzYWdlLCBBZ2VudFJlc3BvbnNlTWVzc2FnZSwgQnJpZGdlRXJyb3JSZXNwb25zZU1lc3NhZ2UsIEJyaWRnZVJlcXVlc3RNZXNzYWdlLCBCcmlkZ2VSZXNwb25zZU1lc3NhZ2UsIEJyb2FkY2FzdEFnZW50UmVxdWVzdCwgQnJvYWRjYXN0QnJpZGdlUmVxdWVzdCwgQ29ubmVjdGlvblN0ZXBNZXNzYWdlLCBDb25uZWN0aW9uU3RlcDJIZWxsbywgQ29ubmVjdGlvblN0ZXAzSGFuZHNoYWtlLCBDb25uZWN0aW9uU3RlcDRBdXRoZW50aWNhdGlvbkZhaWxlZCwgQ29ubmVjdGlvblN0ZXA2Q29ubmVjdGVkQWdlbnRzVXBkYXRlLCBGaW5kSW5zdGFuY2VzQWdlbnRFcnJvclJlc3BvbnNlLCBGaW5kSW5zdGFuY2VzQWdlbnRSZXF1ZXN0LCBGaW5kSW5zdGFuY2VzQWdlbnRSZXNwb25zZSwgRmluZEluc3RhbmNlc0JyaWRnZUVycm9yUmVzcG9uc2UsIEZpbmRJbnN0YW5jZXNCcmlkZ2VSZXF1ZXN0LCBGaW5kSW5zdGFuY2VzQnJpZGdlUmVzcG9uc2UsIEZpbmRJbnRlbnRBZ2VudEVycm9yUmVzcG9uc2UsIEZpbmRJbnRlbnRBZ2VudFJlcXVlc3QsIEZpbmRJbnRlbnRBZ2VudFJlc3BvbnNlLCBGaW5kSW50ZW50QnJpZGdlRXJyb3JSZXNwb25zZSwgRmluZEludGVudEJyaWRnZVJlcXVlc3QsIEZpbmRJbnRlbnRCcmlkZ2VSZXNwb25zZSwgRmluZEludGVudHNCeUNvbnRleHRBZ2VudEVycm9yUmVzcG9uc2UsIEZpbmRJbnRlbnRzQnlDb250ZXh0QWdlbnRSZXF1ZXN0LCBGaW5kSW50ZW50c0J5Q29udGV4dEFnZW50UmVzcG9uc2UsIEZpbmRJbnRlbnRzQnlDb250ZXh0QnJpZGdlRXJyb3JSZXNwb25zZSwgRmluZEludGVudHNCeUNvbnRleHRCcmlkZ2VSZXF1ZXN0LCBGaW5kSW50ZW50c0J5Q29udGV4dEJyaWRnZVJlc3BvbnNlLCBHZXRBcHBNZXRhZGF0YUFnZW50RXJyb3JSZXNwb25zZSwgR2V0QXBwTWV0YWRhdGFBZ2VudFJlcXVlc3QsIEdldEFwcE1ldGFkYXRhQWdlbnRSZXNwb25zZSwgR2V0QXBwTWV0YWRhdGFCcmlkZ2VFcnJvclJlc3BvbnNlLCBHZXRBcHBNZXRhZGF0YUJyaWRnZVJlcXVlc3QsIEdldEFwcE1ldGFkYXRhQnJpZGdlUmVzcG9uc2UsIE9wZW5BZ2VudEVycm9yUmVzcG9uc2UsIE9wZW5BZ2VudFJlcXVlc3QsIE9wZW5BZ2VudFJlc3BvbnNlLCBPcGVuQnJpZGdlRXJyb3JSZXNwb25zZSwgT3BlbkJyaWRnZVJlcXVlc3QsIE9wZW5CcmlkZ2VSZXNwb25zZSwgUHJpdmF0ZUNoYW5uZWxCcm9hZGNhc3RBZ2VudFJlcXVlc3QsIFByaXZhdGVDaGFubmVsQnJvYWRjYXN0QnJpZGdlUmVxdWVzdCwgUHJpdmF0ZUNoYW5uZWxFdmVudExpc3RlbmVyQWRkZWRBZ2VudFJlcXVlc3QsIFByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lckFkZGVkQnJpZGdlUmVxdWVzdCwgUHJpdmF0ZUNoYW5uZWxFdmVudExpc3RlbmVyUmVtb3ZlZEFnZW50UmVxdWVzdCwgUHJpdmF0ZUNoYW5uZWxFdmVudExpc3RlbmVyUmVtb3ZlZEJyaWRnZVJlcXVlc3QsIFByaXZhdGVDaGFubmVsT25BZGRDb250ZXh0TGlzdGVuZXJBZ2VudFJlcXVlc3QsIFByaXZhdGVDaGFubmVsT25BZGRDb250ZXh0TGlzdGVuZXJCcmlkZ2VSZXF1ZXN0LCBQcml2YXRlQ2hhbm5lbE9uRGlzY29ubmVjdEFnZW50UmVxdWVzdCwgUHJpdmF0ZUNoYW5uZWxPbkRpc2Nvbm5lY3RCcmlkZ2VSZXF1ZXN0LCBQcml2YXRlQ2hhbm5lbE9uVW5zdWJzY3JpYmVBZ2VudFJlcXVlc3QsIFByaXZhdGVDaGFubmVsT25VbnN1YnNjcmliZUJyaWRnZVJlcXVlc3QsIFJhaXNlSW50ZW50QWdlbnRFcnJvclJlc3BvbnNlLCBSYWlzZUludGVudEFnZW50UmVxdWVzdCwgUmFpc2VJbnRlbnRBZ2VudFJlc3BvbnNlLCBSYWlzZUludGVudEJyaWRnZUVycm9yUmVzcG9uc2UsIFJhaXNlSW50ZW50QnJpZGdlUmVxdWVzdCwgUmFpc2VJbnRlbnRCcmlkZ2VSZXNwb25zZSwgUmFpc2VJbnRlbnRSZXN1bHRBZ2VudEVycm9yUmVzcG9uc2UsIFJhaXNlSW50ZW50UmVzdWx0QWdlbnRSZXNwb25zZSwgUmFpc2VJbnRlbnRSZXN1bHRCcmlkZ2VFcnJvclJlc3BvbnNlLCBSYWlzZUludGVudFJlc3VsdEJyaWRnZVJlc3BvbnNlLCBDb250ZXh0IH0gZnJvbSBcIi4vZmlsZVwiO1xuLy9cbi8vICAgY29uc3QgZkRDM0Rlc2t0b3BBZ2VudEFQSVNjaGVtYSA9IENvbnZlcnQudG9GREMzRGVza3RvcEFnZW50QVBJU2NoZW1hKGpzb24pO1xuLy8gICBjb25zdCBhZ2VudEVycm9yUmVzcG9uc2VNZXNzYWdlID0gQ29udmVydC50b0FnZW50RXJyb3JSZXNwb25zZU1lc3NhZ2UoanNvbik7XG4vLyAgIGNvbnN0IGFnZW50UmVxdWVzdE1lc3NhZ2UgPSBDb252ZXJ0LnRvQWdlbnRSZXF1ZXN0TWVzc2FnZShqc29uKTtcbi8vICAgY29uc3QgYWdlbnRSZXNwb25zZU1lc3NhZ2UgPSBDb252ZXJ0LnRvQWdlbnRSZXNwb25zZU1lc3NhZ2UoanNvbik7XG4vLyAgIGNvbnN0IGJyaWRnZUVycm9yUmVzcG9uc2VNZXNzYWdlID0gQ29udmVydC50b0JyaWRnZUVycm9yUmVzcG9uc2VNZXNzYWdlKGpzb24pO1xuLy8gICBjb25zdCBicmlkZ2VSZXF1ZXN0TWVzc2FnZSA9IENvbnZlcnQudG9CcmlkZ2VSZXF1ZXN0TWVzc2FnZShqc29uKTtcbi8vICAgY29uc3QgYnJpZGdlUmVzcG9uc2VNZXNzYWdlID0gQ29udmVydC50b0JyaWRnZVJlc3BvbnNlTWVzc2FnZShqc29uKTtcbi8vICAgY29uc3QgYnJvYWRjYXN0QWdlbnRSZXF1ZXN0ID0gQ29udmVydC50b0Jyb2FkY2FzdEFnZW50UmVxdWVzdChqc29uKTtcbi8vICAgY29uc3QgYnJvYWRjYXN0QnJpZGdlUmVxdWVzdCA9IENvbnZlcnQudG9Ccm9hZGNhc3RCcmlkZ2VSZXF1ZXN0KGpzb24pO1xuLy8gICBjb25zdCBicmlkZ2luZ0NvbW1vbnMgPSBDb252ZXJ0LnRvQnJpZGdpbmdDb21tb25zKGpzb24pO1xuLy8gICBjb25zdCBjb25uZWN0aW9uU3RlcE1lc3NhZ2UgPSBDb252ZXJ0LnRvQ29ubmVjdGlvblN0ZXBNZXNzYWdlKGpzb24pO1xuLy8gICBjb25zdCBjb25uZWN0aW9uU3RlcDJIZWxsbyA9IENvbnZlcnQudG9Db25uZWN0aW9uU3RlcDJIZWxsbyhqc29uKTtcbi8vICAgY29uc3QgY29ubmVjdGlvblN0ZXAzSGFuZHNoYWtlID0gQ29udmVydC50b0Nvbm5lY3Rpb25TdGVwM0hhbmRzaGFrZShqc29uKTtcbi8vICAgY29uc3QgY29ubmVjdGlvblN0ZXA0QXV0aGVudGljYXRpb25GYWlsZWQgPSBDb252ZXJ0LnRvQ29ubmVjdGlvblN0ZXA0QXV0aGVudGljYXRpb25GYWlsZWQoanNvbik7XG4vLyAgIGNvbnN0IGNvbm5lY3Rpb25TdGVwNkNvbm5lY3RlZEFnZW50c1VwZGF0ZSA9IENvbnZlcnQudG9Db25uZWN0aW9uU3RlcDZDb25uZWN0ZWRBZ2VudHNVcGRhdGUoanNvbik7XG4vLyAgIGNvbnN0IGZpbmRJbnN0YW5jZXNBZ2VudEVycm9yUmVzcG9uc2UgPSBDb252ZXJ0LnRvRmluZEluc3RhbmNlc0FnZW50RXJyb3JSZXNwb25zZShqc29uKTtcbi8vICAgY29uc3QgZmluZEluc3RhbmNlc0FnZW50UmVxdWVzdCA9IENvbnZlcnQudG9GaW5kSW5zdGFuY2VzQWdlbnRSZXF1ZXN0KGpzb24pO1xuLy8gICBjb25zdCBmaW5kSW5zdGFuY2VzQWdlbnRSZXNwb25zZSA9IENvbnZlcnQudG9GaW5kSW5zdGFuY2VzQWdlbnRSZXNwb25zZShqc29uKTtcbi8vICAgY29uc3QgZmluZEluc3RhbmNlc0JyaWRnZUVycm9yUmVzcG9uc2UgPSBDb252ZXJ0LnRvRmluZEluc3RhbmNlc0JyaWRnZUVycm9yUmVzcG9uc2UoanNvbik7XG4vLyAgIGNvbnN0IGZpbmRJbnN0YW5jZXNCcmlkZ2VSZXF1ZXN0ID0gQ29udmVydC50b0ZpbmRJbnN0YW5jZXNCcmlkZ2VSZXF1ZXN0KGpzb24pO1xuLy8gICBjb25zdCBmaW5kSW5zdGFuY2VzQnJpZGdlUmVzcG9uc2UgPSBDb252ZXJ0LnRvRmluZEluc3RhbmNlc0JyaWRnZVJlc3BvbnNlKGpzb24pO1xuLy8gICBjb25zdCBmaW5kSW50ZW50QWdlbnRFcnJvclJlc3BvbnNlID0gQ29udmVydC50b0ZpbmRJbnRlbnRBZ2VudEVycm9yUmVzcG9uc2UoanNvbik7XG4vLyAgIGNvbnN0IGZpbmRJbnRlbnRBZ2VudFJlcXVlc3QgPSBDb252ZXJ0LnRvRmluZEludGVudEFnZW50UmVxdWVzdChqc29uKTtcbi8vICAgY29uc3QgZmluZEludGVudEFnZW50UmVzcG9uc2UgPSBDb252ZXJ0LnRvRmluZEludGVudEFnZW50UmVzcG9uc2UoanNvbik7XG4vLyAgIGNvbnN0IGZpbmRJbnRlbnRCcmlkZ2VFcnJvclJlc3BvbnNlID0gQ29udmVydC50b0ZpbmRJbnRlbnRCcmlkZ2VFcnJvclJlc3BvbnNlKGpzb24pO1xuLy8gICBjb25zdCBmaW5kSW50ZW50QnJpZGdlUmVxdWVzdCA9IENvbnZlcnQudG9GaW5kSW50ZW50QnJpZGdlUmVxdWVzdChqc29uKTtcbi8vICAgY29uc3QgZmluZEludGVudEJyaWRnZVJlc3BvbnNlID0gQ29udmVydC50b0ZpbmRJbnRlbnRCcmlkZ2VSZXNwb25zZShqc29uKTtcbi8vICAgY29uc3QgZmluZEludGVudHNCeUNvbnRleHRBZ2VudEVycm9yUmVzcG9uc2UgPSBDb252ZXJ0LnRvRmluZEludGVudHNCeUNvbnRleHRBZ2VudEVycm9yUmVzcG9uc2UoanNvbik7XG4vLyAgIGNvbnN0IGZpbmRJbnRlbnRzQnlDb250ZXh0QWdlbnRSZXF1ZXN0ID0gQ29udmVydC50b0ZpbmRJbnRlbnRzQnlDb250ZXh0QWdlbnRSZXF1ZXN0KGpzb24pO1xuLy8gICBjb25zdCBmaW5kSW50ZW50c0J5Q29udGV4dEFnZW50UmVzcG9uc2UgPSBDb252ZXJ0LnRvRmluZEludGVudHNCeUNvbnRleHRBZ2VudFJlc3BvbnNlKGpzb24pO1xuLy8gICBjb25zdCBmaW5kSW50ZW50c0J5Q29udGV4dEJyaWRnZUVycm9yUmVzcG9uc2UgPSBDb252ZXJ0LnRvRmluZEludGVudHNCeUNvbnRleHRCcmlkZ2VFcnJvclJlc3BvbnNlKGpzb24pO1xuLy8gICBjb25zdCBmaW5kSW50ZW50c0J5Q29udGV4dEJyaWRnZVJlcXVlc3QgPSBDb252ZXJ0LnRvRmluZEludGVudHNCeUNvbnRleHRCcmlkZ2VSZXF1ZXN0KGpzb24pO1xuLy8gICBjb25zdCBmaW5kSW50ZW50c0J5Q29udGV4dEJyaWRnZVJlc3BvbnNlID0gQ29udmVydC50b0ZpbmRJbnRlbnRzQnlDb250ZXh0QnJpZGdlUmVzcG9uc2UoanNvbik7XG4vLyAgIGNvbnN0IGdldEFwcE1ldGFkYXRhQWdlbnRFcnJvclJlc3BvbnNlID0gQ29udmVydC50b0dldEFwcE1ldGFkYXRhQWdlbnRFcnJvclJlc3BvbnNlKGpzb24pO1xuLy8gICBjb25zdCBnZXRBcHBNZXRhZGF0YUFnZW50UmVxdWVzdCA9IENvbnZlcnQudG9HZXRBcHBNZXRhZGF0YUFnZW50UmVxdWVzdChqc29uKTtcbi8vICAgY29uc3QgZ2V0QXBwTWV0YWRhdGFBZ2VudFJlc3BvbnNlID0gQ29udmVydC50b0dldEFwcE1ldGFkYXRhQWdlbnRSZXNwb25zZShqc29uKTtcbi8vICAgY29uc3QgZ2V0QXBwTWV0YWRhdGFCcmlkZ2VFcnJvclJlc3BvbnNlID0gQ29udmVydC50b0dldEFwcE1ldGFkYXRhQnJpZGdlRXJyb3JSZXNwb25zZShqc29uKTtcbi8vICAgY29uc3QgZ2V0QXBwTWV0YWRhdGFCcmlkZ2VSZXF1ZXN0ID0gQ29udmVydC50b0dldEFwcE1ldGFkYXRhQnJpZGdlUmVxdWVzdChqc29uKTtcbi8vICAgY29uc3QgZ2V0QXBwTWV0YWRhdGFCcmlkZ2VSZXNwb25zZSA9IENvbnZlcnQudG9HZXRBcHBNZXRhZGF0YUJyaWRnZVJlc3BvbnNlKGpzb24pO1xuLy8gICBjb25zdCBvcGVuQWdlbnRFcnJvclJlc3BvbnNlID0gQ29udmVydC50b09wZW5BZ2VudEVycm9yUmVzcG9uc2UoanNvbik7XG4vLyAgIGNvbnN0IG9wZW5BZ2VudFJlcXVlc3QgPSBDb252ZXJ0LnRvT3BlbkFnZW50UmVxdWVzdChqc29uKTtcbi8vICAgY29uc3Qgb3BlbkFnZW50UmVzcG9uc2UgPSBDb252ZXJ0LnRvT3BlbkFnZW50UmVzcG9uc2UoanNvbik7XG4vLyAgIGNvbnN0IG9wZW5CcmlkZ2VFcnJvclJlc3BvbnNlID0gQ29udmVydC50b09wZW5CcmlkZ2VFcnJvclJlc3BvbnNlKGpzb24pO1xuLy8gICBjb25zdCBvcGVuQnJpZGdlUmVxdWVzdCA9IENvbnZlcnQudG9PcGVuQnJpZGdlUmVxdWVzdChqc29uKTtcbi8vICAgY29uc3Qgb3BlbkJyaWRnZVJlc3BvbnNlID0gQ29udmVydC50b09wZW5CcmlkZ2VSZXNwb25zZShqc29uKTtcbi8vICAgY29uc3QgcHJpdmF0ZUNoYW5uZWxCcm9hZGNhc3RBZ2VudFJlcXVlc3QgPSBDb252ZXJ0LnRvUHJpdmF0ZUNoYW5uZWxCcm9hZGNhc3RBZ2VudFJlcXVlc3QoanNvbik7XG4vLyAgIGNvbnN0IHByaXZhdGVDaGFubmVsQnJvYWRjYXN0QnJpZGdlUmVxdWVzdCA9IENvbnZlcnQudG9Qcml2YXRlQ2hhbm5lbEJyb2FkY2FzdEJyaWRnZVJlcXVlc3QoanNvbik7XG4vLyAgIGNvbnN0IHByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lckFkZGVkQWdlbnRSZXF1ZXN0ID0gQ29udmVydC50b1ByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lckFkZGVkQWdlbnRSZXF1ZXN0KGpzb24pO1xuLy8gICBjb25zdCBwcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJBZGRlZEJyaWRnZVJlcXVlc3QgPSBDb252ZXJ0LnRvUHJpdmF0ZUNoYW5uZWxFdmVudExpc3RlbmVyQWRkZWRCcmlkZ2VSZXF1ZXN0KGpzb24pO1xuLy8gICBjb25zdCBwcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJSZW1vdmVkQWdlbnRSZXF1ZXN0ID0gQ29udmVydC50b1ByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lclJlbW92ZWRBZ2VudFJlcXVlc3QoanNvbik7XG4vLyAgIGNvbnN0IHByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lclJlbW92ZWRCcmlkZ2VSZXF1ZXN0ID0gQ29udmVydC50b1ByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lclJlbW92ZWRCcmlkZ2VSZXF1ZXN0KGpzb24pO1xuLy8gICBjb25zdCBwcml2YXRlQ2hhbm5lbE9uQWRkQ29udGV4dExpc3RlbmVyQWdlbnRSZXF1ZXN0ID0gQ29udmVydC50b1ByaXZhdGVDaGFubmVsT25BZGRDb250ZXh0TGlzdGVuZXJBZ2VudFJlcXVlc3QoanNvbik7XG4vLyAgIGNvbnN0IHByaXZhdGVDaGFubmVsT25BZGRDb250ZXh0TGlzdGVuZXJCcmlkZ2VSZXF1ZXN0ID0gQ29udmVydC50b1ByaXZhdGVDaGFubmVsT25BZGRDb250ZXh0TGlzdGVuZXJCcmlkZ2VSZXF1ZXN0KGpzb24pO1xuLy8gICBjb25zdCBwcml2YXRlQ2hhbm5lbE9uRGlzY29ubmVjdEFnZW50UmVxdWVzdCA9IENvbnZlcnQudG9Qcml2YXRlQ2hhbm5lbE9uRGlzY29ubmVjdEFnZW50UmVxdWVzdChqc29uKTtcbi8vICAgY29uc3QgcHJpdmF0ZUNoYW5uZWxPbkRpc2Nvbm5lY3RCcmlkZ2VSZXF1ZXN0ID0gQ29udmVydC50b1ByaXZhdGVDaGFubmVsT25EaXNjb25uZWN0QnJpZGdlUmVxdWVzdChqc29uKTtcbi8vICAgY29uc3QgcHJpdmF0ZUNoYW5uZWxPblVuc3Vic2NyaWJlQWdlbnRSZXF1ZXN0ID0gQ29udmVydC50b1ByaXZhdGVDaGFubmVsT25VbnN1YnNjcmliZUFnZW50UmVxdWVzdChqc29uKTtcbi8vICAgY29uc3QgcHJpdmF0ZUNoYW5uZWxPblVuc3Vic2NyaWJlQnJpZGdlUmVxdWVzdCA9IENvbnZlcnQudG9Qcml2YXRlQ2hhbm5lbE9uVW5zdWJzY3JpYmVCcmlkZ2VSZXF1ZXN0KGpzb24pO1xuLy8gICBjb25zdCByYWlzZUludGVudEFnZW50RXJyb3JSZXNwb25zZSA9IENvbnZlcnQudG9SYWlzZUludGVudEFnZW50RXJyb3JSZXNwb25zZShqc29uKTtcbi8vICAgY29uc3QgcmFpc2VJbnRlbnRBZ2VudFJlcXVlc3QgPSBDb252ZXJ0LnRvUmFpc2VJbnRlbnRBZ2VudFJlcXVlc3QoanNvbik7XG4vLyAgIGNvbnN0IHJhaXNlSW50ZW50QWdlbnRSZXNwb25zZSA9IENvbnZlcnQudG9SYWlzZUludGVudEFnZW50UmVzcG9uc2UoanNvbik7XG4vLyAgIGNvbnN0IHJhaXNlSW50ZW50QnJpZGdlRXJyb3JSZXNwb25zZSA9IENvbnZlcnQudG9SYWlzZUludGVudEJyaWRnZUVycm9yUmVzcG9uc2UoanNvbik7XG4vLyAgIGNvbnN0IHJhaXNlSW50ZW50QnJpZGdlUmVxdWVzdCA9IENvbnZlcnQudG9SYWlzZUludGVudEJyaWRnZVJlcXVlc3QoanNvbik7XG4vLyAgIGNvbnN0IHJhaXNlSW50ZW50QnJpZGdlUmVzcG9uc2UgPSBDb252ZXJ0LnRvUmFpc2VJbnRlbnRCcmlkZ2VSZXNwb25zZShqc29uKTtcbi8vICAgY29uc3QgcmFpc2VJbnRlbnRSZXN1bHRBZ2VudEVycm9yUmVzcG9uc2UgPSBDb252ZXJ0LnRvUmFpc2VJbnRlbnRSZXN1bHRBZ2VudEVycm9yUmVzcG9uc2UoanNvbik7XG4vLyAgIGNvbnN0IHJhaXNlSW50ZW50UmVzdWx0QWdlbnRSZXNwb25zZSA9IENvbnZlcnQudG9SYWlzZUludGVudFJlc3VsdEFnZW50UmVzcG9uc2UoanNvbik7XG4vLyAgIGNvbnN0IHJhaXNlSW50ZW50UmVzdWx0QnJpZGdlRXJyb3JSZXNwb25zZSA9IENvbnZlcnQudG9SYWlzZUludGVudFJlc3VsdEJyaWRnZUVycm9yUmVzcG9uc2UoanNvbik7XG4vLyAgIGNvbnN0IHJhaXNlSW50ZW50UmVzdWx0QnJpZGdlUmVzcG9uc2UgPSBDb252ZXJ0LnRvUmFpc2VJbnRlbnRSZXN1bHRCcmlkZ2VSZXNwb25zZShqc29uKTtcbi8vICAgY29uc3QgY29udGV4dCA9IENvbnZlcnQudG9Db250ZXh0KGpzb24pO1xuLy9cbi8vIFRoZXNlIGZ1bmN0aW9ucyB3aWxsIHRocm93IGFuIGVycm9yIGlmIHRoZSBKU09OIGRvZXNuJ3Rcbi8vIG1hdGNoIHRoZSBleHBlY3RlZCBpbnRlcmZhY2UsIGV2ZW4gaWYgdGhlIEpTT04gaXMgdmFsaWQuXG4vLyBDb252ZXJ0cyBKU09OIHN0cmluZ3MgdG8vZnJvbSB5b3VyIHR5cGVzXG4vLyBhbmQgYXNzZXJ0cyB0aGUgcmVzdWx0cyBvZiBKU09OLnBhcnNlIGF0IHJ1bnRpbWVcbnZhciBDb252ZXJ0JDEgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29udmVydCgpIHtcbiAgICB9XG4gICAgQ29udmVydC50b0ZEQzNEZXNrdG9wQWdlbnRBUElTY2hlbWEgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIFwiYW55XCIpO1xuICAgIH07XG4gICAgQ29udmVydC5mREMzRGVza3RvcEFnZW50QVBJU2NoZW1hVG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgXCJhbnlcIiksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0FnZW50RXJyb3JSZXNwb25zZU1lc3NhZ2UgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIkFnZW50RXJyb3JSZXNwb25zZU1lc3NhZ2VcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5hZ2VudEVycm9yUmVzcG9uc2VNZXNzYWdlVG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiQWdlbnRFcnJvclJlc3BvbnNlTWVzc2FnZVwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0FnZW50UmVxdWVzdE1lc3NhZ2UgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIkFnZW50UmVxdWVzdE1lc3NhZ2VcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5hZ2VudFJlcXVlc3RNZXNzYWdlVG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiQWdlbnRSZXF1ZXN0TWVzc2FnZVwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0FnZW50UmVzcG9uc2VNZXNzYWdlID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJBZ2VudFJlc3BvbnNlTWVzc2FnZVwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmFnZW50UmVzcG9uc2VNZXNzYWdlVG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiQWdlbnRSZXNwb25zZU1lc3NhZ2VcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9CcmlkZ2VFcnJvclJlc3BvbnNlTWVzc2FnZSA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiQnJpZGdlRXJyb3JSZXNwb25zZU1lc3NhZ2VcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5icmlkZ2VFcnJvclJlc3BvbnNlTWVzc2FnZVRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIkJyaWRnZUVycm9yUmVzcG9uc2VNZXNzYWdlXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvQnJpZGdlUmVxdWVzdE1lc3NhZ2UgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIkJyaWRnZVJlcXVlc3RNZXNzYWdlXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQuYnJpZGdlUmVxdWVzdE1lc3NhZ2VUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJCcmlkZ2VSZXF1ZXN0TWVzc2FnZVwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0JyaWRnZVJlc3BvbnNlTWVzc2FnZSA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiQnJpZGdlUmVzcG9uc2VNZXNzYWdlXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQuYnJpZGdlUmVzcG9uc2VNZXNzYWdlVG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiQnJpZGdlUmVzcG9uc2VNZXNzYWdlXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvQnJvYWRjYXN0QWdlbnRSZXF1ZXN0ID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJCcm9hZGNhc3RBZ2VudFJlcXVlc3RcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5icm9hZGNhc3RBZ2VudFJlcXVlc3RUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJCcm9hZGNhc3RBZ2VudFJlcXVlc3RcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9Ccm9hZGNhc3RCcmlkZ2VSZXF1ZXN0ID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJCcm9hZGNhc3RCcmlkZ2VSZXF1ZXN0XCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQuYnJvYWRjYXN0QnJpZGdlUmVxdWVzdFRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIkJyb2FkY2FzdEJyaWRnZVJlcXVlc3RcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9CcmlkZ2luZ0NvbW1vbnMgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIG0kMShcImFueVwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmJyaWRnaW5nQ29tbW9uc1RvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIG0kMShcImFueVwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0Nvbm5lY3Rpb25TdGVwTWVzc2FnZSA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiQ29ubmVjdGlvblN0ZXBNZXNzYWdlXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQuY29ubmVjdGlvblN0ZXBNZXNzYWdlVG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiQ29ubmVjdGlvblN0ZXBNZXNzYWdlXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvQ29ubmVjdGlvblN0ZXAySGVsbG8gPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIkNvbm5lY3Rpb25TdGVwMkhlbGxvXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQuY29ubmVjdGlvblN0ZXAySGVsbG9Ub0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJDb25uZWN0aW9uU3RlcDJIZWxsb1wiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0Nvbm5lY3Rpb25TdGVwM0hhbmRzaGFrZSA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiQ29ubmVjdGlvblN0ZXAzSGFuZHNoYWtlXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQuY29ubmVjdGlvblN0ZXAzSGFuZHNoYWtlVG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiQ29ubmVjdGlvblN0ZXAzSGFuZHNoYWtlXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvQ29ubmVjdGlvblN0ZXA0QXV0aGVudGljYXRpb25GYWlsZWQgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIkNvbm5lY3Rpb25TdGVwNEF1dGhlbnRpY2F0aW9uRmFpbGVkXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQuY29ubmVjdGlvblN0ZXA0QXV0aGVudGljYXRpb25GYWlsZWRUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJDb25uZWN0aW9uU3RlcDRBdXRoZW50aWNhdGlvbkZhaWxlZFwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0Nvbm5lY3Rpb25TdGVwNkNvbm5lY3RlZEFnZW50c1VwZGF0ZSA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiQ29ubmVjdGlvblN0ZXA2Q29ubmVjdGVkQWdlbnRzVXBkYXRlXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQuY29ubmVjdGlvblN0ZXA2Q29ubmVjdGVkQWdlbnRzVXBkYXRlVG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiQ29ubmVjdGlvblN0ZXA2Q29ubmVjdGVkQWdlbnRzVXBkYXRlXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvRmluZEluc3RhbmNlc0FnZW50RXJyb3JSZXNwb25zZSA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiRmluZEluc3RhbmNlc0FnZW50RXJyb3JSZXNwb25zZVwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmZpbmRJbnN0YW5jZXNBZ2VudEVycm9yUmVzcG9uc2VUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJGaW5kSW5zdGFuY2VzQWdlbnRFcnJvclJlc3BvbnNlXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvRmluZEluc3RhbmNlc0FnZW50UmVxdWVzdCA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiRmluZEluc3RhbmNlc0FnZW50UmVxdWVzdFwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmZpbmRJbnN0YW5jZXNBZ2VudFJlcXVlc3RUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJGaW5kSW5zdGFuY2VzQWdlbnRSZXF1ZXN0XCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvRmluZEluc3RhbmNlc0FnZW50UmVzcG9uc2UgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIkZpbmRJbnN0YW5jZXNBZ2VudFJlc3BvbnNlXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQuZmluZEluc3RhbmNlc0FnZW50UmVzcG9uc2VUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJGaW5kSW5zdGFuY2VzQWdlbnRSZXNwb25zZVwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0ZpbmRJbnN0YW5jZXNCcmlkZ2VFcnJvclJlc3BvbnNlID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJGaW5kSW5zdGFuY2VzQnJpZGdlRXJyb3JSZXNwb25zZVwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmZpbmRJbnN0YW5jZXNCcmlkZ2VFcnJvclJlc3BvbnNlVG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiRmluZEluc3RhbmNlc0JyaWRnZUVycm9yUmVzcG9uc2VcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9GaW5kSW5zdGFuY2VzQnJpZGdlUmVxdWVzdCA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiRmluZEluc3RhbmNlc0JyaWRnZVJlcXVlc3RcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5maW5kSW5zdGFuY2VzQnJpZGdlUmVxdWVzdFRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIkZpbmRJbnN0YW5jZXNCcmlkZ2VSZXF1ZXN0XCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvRmluZEluc3RhbmNlc0JyaWRnZVJlc3BvbnNlID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJGaW5kSW5zdGFuY2VzQnJpZGdlUmVzcG9uc2VcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5maW5kSW5zdGFuY2VzQnJpZGdlUmVzcG9uc2VUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJGaW5kSW5zdGFuY2VzQnJpZGdlUmVzcG9uc2VcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9GaW5kSW50ZW50QWdlbnRFcnJvclJlc3BvbnNlID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJGaW5kSW50ZW50QWdlbnRFcnJvclJlc3BvbnNlXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQuZmluZEludGVudEFnZW50RXJyb3JSZXNwb25zZVRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIkZpbmRJbnRlbnRBZ2VudEVycm9yUmVzcG9uc2VcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9GaW5kSW50ZW50QWdlbnRSZXF1ZXN0ID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJGaW5kSW50ZW50QWdlbnRSZXF1ZXN0XCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQuZmluZEludGVudEFnZW50UmVxdWVzdFRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIkZpbmRJbnRlbnRBZ2VudFJlcXVlc3RcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9GaW5kSW50ZW50QWdlbnRSZXNwb25zZSA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiRmluZEludGVudEFnZW50UmVzcG9uc2VcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5maW5kSW50ZW50QWdlbnRSZXNwb25zZVRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIkZpbmRJbnRlbnRBZ2VudFJlc3BvbnNlXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvRmluZEludGVudEJyaWRnZUVycm9yUmVzcG9uc2UgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIkZpbmRJbnRlbnRCcmlkZ2VFcnJvclJlc3BvbnNlXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQuZmluZEludGVudEJyaWRnZUVycm9yUmVzcG9uc2VUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJGaW5kSW50ZW50QnJpZGdlRXJyb3JSZXNwb25zZVwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0ZpbmRJbnRlbnRCcmlkZ2VSZXF1ZXN0ID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJGaW5kSW50ZW50QnJpZGdlUmVxdWVzdFwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmZpbmRJbnRlbnRCcmlkZ2VSZXF1ZXN0VG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiRmluZEludGVudEJyaWRnZVJlcXVlc3RcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9GaW5kSW50ZW50QnJpZGdlUmVzcG9uc2UgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIkZpbmRJbnRlbnRCcmlkZ2VSZXNwb25zZVwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmZpbmRJbnRlbnRCcmlkZ2VSZXNwb25zZVRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIkZpbmRJbnRlbnRCcmlkZ2VSZXNwb25zZVwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0ZpbmRJbnRlbnRzQnlDb250ZXh0QWdlbnRFcnJvclJlc3BvbnNlID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJGaW5kSW50ZW50c0J5Q29udGV4dEFnZW50RXJyb3JSZXNwb25zZVwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmZpbmRJbnRlbnRzQnlDb250ZXh0QWdlbnRFcnJvclJlc3BvbnNlVG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiRmluZEludGVudHNCeUNvbnRleHRBZ2VudEVycm9yUmVzcG9uc2VcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9GaW5kSW50ZW50c0J5Q29udGV4dEFnZW50UmVxdWVzdCA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiRmluZEludGVudHNCeUNvbnRleHRBZ2VudFJlcXVlc3RcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5maW5kSW50ZW50c0J5Q29udGV4dEFnZW50UmVxdWVzdFRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIkZpbmRJbnRlbnRzQnlDb250ZXh0QWdlbnRSZXF1ZXN0XCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvRmluZEludGVudHNCeUNvbnRleHRBZ2VudFJlc3BvbnNlID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJGaW5kSW50ZW50c0J5Q29udGV4dEFnZW50UmVzcG9uc2VcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5maW5kSW50ZW50c0J5Q29udGV4dEFnZW50UmVzcG9uc2VUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJGaW5kSW50ZW50c0J5Q29udGV4dEFnZW50UmVzcG9uc2VcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9GaW5kSW50ZW50c0J5Q29udGV4dEJyaWRnZUVycm9yUmVzcG9uc2UgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIkZpbmRJbnRlbnRzQnlDb250ZXh0QnJpZGdlRXJyb3JSZXNwb25zZVwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmZpbmRJbnRlbnRzQnlDb250ZXh0QnJpZGdlRXJyb3JSZXNwb25zZVRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIkZpbmRJbnRlbnRzQnlDb250ZXh0QnJpZGdlRXJyb3JSZXNwb25zZVwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0ZpbmRJbnRlbnRzQnlDb250ZXh0QnJpZGdlUmVxdWVzdCA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiRmluZEludGVudHNCeUNvbnRleHRCcmlkZ2VSZXF1ZXN0XCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQuZmluZEludGVudHNCeUNvbnRleHRCcmlkZ2VSZXF1ZXN0VG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiRmluZEludGVudHNCeUNvbnRleHRCcmlkZ2VSZXF1ZXN0XCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvRmluZEludGVudHNCeUNvbnRleHRCcmlkZ2VSZXNwb25zZSA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiRmluZEludGVudHNCeUNvbnRleHRCcmlkZ2VSZXNwb25zZVwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmZpbmRJbnRlbnRzQnlDb250ZXh0QnJpZGdlUmVzcG9uc2VUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJGaW5kSW50ZW50c0J5Q29udGV4dEJyaWRnZVJlc3BvbnNlXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvR2V0QXBwTWV0YWRhdGFBZ2VudEVycm9yUmVzcG9uc2UgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIkdldEFwcE1ldGFkYXRhQWdlbnRFcnJvclJlc3BvbnNlXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQuZ2V0QXBwTWV0YWRhdGFBZ2VudEVycm9yUmVzcG9uc2VUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJHZXRBcHBNZXRhZGF0YUFnZW50RXJyb3JSZXNwb25zZVwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0dldEFwcE1ldGFkYXRhQWdlbnRSZXF1ZXN0ID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJHZXRBcHBNZXRhZGF0YUFnZW50UmVxdWVzdFwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmdldEFwcE1ldGFkYXRhQWdlbnRSZXF1ZXN0VG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiR2V0QXBwTWV0YWRhdGFBZ2VudFJlcXVlc3RcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9HZXRBcHBNZXRhZGF0YUFnZW50UmVzcG9uc2UgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIkdldEFwcE1ldGFkYXRhQWdlbnRSZXNwb25zZVwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmdldEFwcE1ldGFkYXRhQWdlbnRSZXNwb25zZVRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIkdldEFwcE1ldGFkYXRhQWdlbnRSZXNwb25zZVwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0dldEFwcE1ldGFkYXRhQnJpZGdlRXJyb3JSZXNwb25zZSA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiR2V0QXBwTWV0YWRhdGFCcmlkZ2VFcnJvclJlc3BvbnNlXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQuZ2V0QXBwTWV0YWRhdGFCcmlkZ2VFcnJvclJlc3BvbnNlVG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiR2V0QXBwTWV0YWRhdGFCcmlkZ2VFcnJvclJlc3BvbnNlXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvR2V0QXBwTWV0YWRhdGFCcmlkZ2VSZXF1ZXN0ID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJHZXRBcHBNZXRhZGF0YUJyaWRnZVJlcXVlc3RcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5nZXRBcHBNZXRhZGF0YUJyaWRnZVJlcXVlc3RUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJHZXRBcHBNZXRhZGF0YUJyaWRnZVJlcXVlc3RcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9HZXRBcHBNZXRhZGF0YUJyaWRnZVJlc3BvbnNlID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJHZXRBcHBNZXRhZGF0YUJyaWRnZVJlc3BvbnNlXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQuZ2V0QXBwTWV0YWRhdGFCcmlkZ2VSZXNwb25zZVRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIkdldEFwcE1ldGFkYXRhQnJpZGdlUmVzcG9uc2VcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9PcGVuQWdlbnRFcnJvclJlc3BvbnNlID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJPcGVuQWdlbnRFcnJvclJlc3BvbnNlXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQub3BlbkFnZW50RXJyb3JSZXNwb25zZVRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIk9wZW5BZ2VudEVycm9yUmVzcG9uc2VcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9PcGVuQWdlbnRSZXF1ZXN0ID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJPcGVuQWdlbnRSZXF1ZXN0XCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQub3BlbkFnZW50UmVxdWVzdFRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIk9wZW5BZ2VudFJlcXVlc3RcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9PcGVuQWdlbnRSZXNwb25zZSA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiT3BlbkFnZW50UmVzcG9uc2VcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5vcGVuQWdlbnRSZXNwb25zZVRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIk9wZW5BZ2VudFJlc3BvbnNlXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvT3BlbkJyaWRnZUVycm9yUmVzcG9uc2UgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIk9wZW5CcmlkZ2VFcnJvclJlc3BvbnNlXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQub3BlbkJyaWRnZUVycm9yUmVzcG9uc2VUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJPcGVuQnJpZGdlRXJyb3JSZXNwb25zZVwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b09wZW5CcmlkZ2VSZXF1ZXN0ID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJPcGVuQnJpZGdlUmVxdWVzdFwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0Lm9wZW5CcmlkZ2VSZXF1ZXN0VG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiT3BlbkJyaWRnZVJlcXVlc3RcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9PcGVuQnJpZGdlUmVzcG9uc2UgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIk9wZW5CcmlkZ2VSZXNwb25zZVwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0Lm9wZW5CcmlkZ2VSZXNwb25zZVRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIk9wZW5CcmlkZ2VSZXNwb25zZVwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b1ByaXZhdGVDaGFubmVsQnJvYWRjYXN0QWdlbnRSZXF1ZXN0ID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJQcml2YXRlQ2hhbm5lbEJyb2FkY2FzdEFnZW50UmVxdWVzdFwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LnByaXZhdGVDaGFubmVsQnJvYWRjYXN0QWdlbnRSZXF1ZXN0VG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiUHJpdmF0ZUNoYW5uZWxCcm9hZGNhc3RBZ2VudFJlcXVlc3RcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9Qcml2YXRlQ2hhbm5lbEJyb2FkY2FzdEJyaWRnZVJlcXVlc3QgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIlByaXZhdGVDaGFubmVsQnJvYWRjYXN0QnJpZGdlUmVxdWVzdFwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LnByaXZhdGVDaGFubmVsQnJvYWRjYXN0QnJpZGdlUmVxdWVzdFRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIlByaXZhdGVDaGFubmVsQnJvYWRjYXN0QnJpZGdlUmVxdWVzdFwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b1ByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lckFkZGVkQWdlbnRSZXF1ZXN0ID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJQcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJBZGRlZEFnZW50UmVxdWVzdFwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LnByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lckFkZGVkQWdlbnRSZXF1ZXN0VG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiUHJpdmF0ZUNoYW5uZWxFdmVudExpc3RlbmVyQWRkZWRBZ2VudFJlcXVlc3RcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9Qcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJBZGRlZEJyaWRnZVJlcXVlc3QgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIlByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lckFkZGVkQnJpZGdlUmVxdWVzdFwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LnByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lckFkZGVkQnJpZGdlUmVxdWVzdFRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIlByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lckFkZGVkQnJpZGdlUmVxdWVzdFwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b1ByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lclJlbW92ZWRBZ2VudFJlcXVlc3QgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIlByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lclJlbW92ZWRBZ2VudFJlcXVlc3RcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5wcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJSZW1vdmVkQWdlbnRSZXF1ZXN0VG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiUHJpdmF0ZUNoYW5uZWxFdmVudExpc3RlbmVyUmVtb3ZlZEFnZW50UmVxdWVzdFwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b1ByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lclJlbW92ZWRCcmlkZ2VSZXF1ZXN0ID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJQcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJSZW1vdmVkQnJpZGdlUmVxdWVzdFwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LnByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lclJlbW92ZWRCcmlkZ2VSZXF1ZXN0VG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiUHJpdmF0ZUNoYW5uZWxFdmVudExpc3RlbmVyUmVtb3ZlZEJyaWRnZVJlcXVlc3RcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9Qcml2YXRlQ2hhbm5lbE9uQWRkQ29udGV4dExpc3RlbmVyQWdlbnRSZXF1ZXN0ID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJQcml2YXRlQ2hhbm5lbE9uQWRkQ29udGV4dExpc3RlbmVyQWdlbnRSZXF1ZXN0XCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQucHJpdmF0ZUNoYW5uZWxPbkFkZENvbnRleHRMaXN0ZW5lckFnZW50UmVxdWVzdFRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIlByaXZhdGVDaGFubmVsT25BZGRDb250ZXh0TGlzdGVuZXJBZ2VudFJlcXVlc3RcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9Qcml2YXRlQ2hhbm5lbE9uQWRkQ29udGV4dExpc3RlbmVyQnJpZGdlUmVxdWVzdCA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiUHJpdmF0ZUNoYW5uZWxPbkFkZENvbnRleHRMaXN0ZW5lckJyaWRnZVJlcXVlc3RcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5wcml2YXRlQ2hhbm5lbE9uQWRkQ29udGV4dExpc3RlbmVyQnJpZGdlUmVxdWVzdFRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIlByaXZhdGVDaGFubmVsT25BZGRDb250ZXh0TGlzdGVuZXJCcmlkZ2VSZXF1ZXN0XCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvUHJpdmF0ZUNoYW5uZWxPbkRpc2Nvbm5lY3RBZ2VudFJlcXVlc3QgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIlByaXZhdGVDaGFubmVsT25EaXNjb25uZWN0QWdlbnRSZXF1ZXN0XCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQucHJpdmF0ZUNoYW5uZWxPbkRpc2Nvbm5lY3RBZ2VudFJlcXVlc3RUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJQcml2YXRlQ2hhbm5lbE9uRGlzY29ubmVjdEFnZW50UmVxdWVzdFwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b1ByaXZhdGVDaGFubmVsT25EaXNjb25uZWN0QnJpZGdlUmVxdWVzdCA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiUHJpdmF0ZUNoYW5uZWxPbkRpc2Nvbm5lY3RCcmlkZ2VSZXF1ZXN0XCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQucHJpdmF0ZUNoYW5uZWxPbkRpc2Nvbm5lY3RCcmlkZ2VSZXF1ZXN0VG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiUHJpdmF0ZUNoYW5uZWxPbkRpc2Nvbm5lY3RCcmlkZ2VSZXF1ZXN0XCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvUHJpdmF0ZUNoYW5uZWxPblVuc3Vic2NyaWJlQWdlbnRSZXF1ZXN0ID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJQcml2YXRlQ2hhbm5lbE9uVW5zdWJzY3JpYmVBZ2VudFJlcXVlc3RcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5wcml2YXRlQ2hhbm5lbE9uVW5zdWJzY3JpYmVBZ2VudFJlcXVlc3RUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJQcml2YXRlQ2hhbm5lbE9uVW5zdWJzY3JpYmVBZ2VudFJlcXVlc3RcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9Qcml2YXRlQ2hhbm5lbE9uVW5zdWJzY3JpYmVCcmlkZ2VSZXF1ZXN0ID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJQcml2YXRlQ2hhbm5lbE9uVW5zdWJzY3JpYmVCcmlkZ2VSZXF1ZXN0XCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQucHJpdmF0ZUNoYW5uZWxPblVuc3Vic2NyaWJlQnJpZGdlUmVxdWVzdFRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIlByaXZhdGVDaGFubmVsT25VbnN1YnNjcmliZUJyaWRnZVJlcXVlc3RcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9SYWlzZUludGVudEFnZW50RXJyb3JSZXNwb25zZSA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiUmFpc2VJbnRlbnRBZ2VudEVycm9yUmVzcG9uc2VcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5yYWlzZUludGVudEFnZW50RXJyb3JSZXNwb25zZVRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIlJhaXNlSW50ZW50QWdlbnRFcnJvclJlc3BvbnNlXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvUmFpc2VJbnRlbnRBZ2VudFJlcXVlc3QgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIlJhaXNlSW50ZW50QWdlbnRSZXF1ZXN0XCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQucmFpc2VJbnRlbnRBZ2VudFJlcXVlc3RUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJSYWlzZUludGVudEFnZW50UmVxdWVzdFwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b1JhaXNlSW50ZW50QWdlbnRSZXNwb25zZSA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiUmFpc2VJbnRlbnRBZ2VudFJlc3BvbnNlXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQucmFpc2VJbnRlbnRBZ2VudFJlc3BvbnNlVG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiUmFpc2VJbnRlbnRBZ2VudFJlc3BvbnNlXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvUmFpc2VJbnRlbnRCcmlkZ2VFcnJvclJlc3BvbnNlID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJSYWlzZUludGVudEJyaWRnZUVycm9yUmVzcG9uc2VcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5yYWlzZUludGVudEJyaWRnZUVycm9yUmVzcG9uc2VUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJSYWlzZUludGVudEJyaWRnZUVycm9yUmVzcG9uc2VcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9SYWlzZUludGVudEJyaWRnZVJlcXVlc3QgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIlJhaXNlSW50ZW50QnJpZGdlUmVxdWVzdFwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LnJhaXNlSW50ZW50QnJpZGdlUmVxdWVzdFRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIlJhaXNlSW50ZW50QnJpZGdlUmVxdWVzdFwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b1JhaXNlSW50ZW50QnJpZGdlUmVzcG9uc2UgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIlJhaXNlSW50ZW50QnJpZGdlUmVzcG9uc2VcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5yYWlzZUludGVudEJyaWRnZVJlc3BvbnNlVG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiUmFpc2VJbnRlbnRCcmlkZ2VSZXNwb25zZVwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b1JhaXNlSW50ZW50UmVzdWx0QWdlbnRFcnJvclJlc3BvbnNlID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJSYWlzZUludGVudFJlc3VsdEFnZW50RXJyb3JSZXNwb25zZVwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LnJhaXNlSW50ZW50UmVzdWx0QWdlbnRFcnJvclJlc3BvbnNlVG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiUmFpc2VJbnRlbnRSZXN1bHRBZ2VudEVycm9yUmVzcG9uc2VcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9SYWlzZUludGVudFJlc3VsdEFnZW50UmVzcG9uc2UgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIlJhaXNlSW50ZW50UmVzdWx0QWdlbnRSZXNwb25zZVwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LnJhaXNlSW50ZW50UmVzdWx0QWdlbnRSZXNwb25zZVRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIlJhaXNlSW50ZW50UmVzdWx0QWdlbnRSZXNwb25zZVwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b1JhaXNlSW50ZW50UmVzdWx0QnJpZGdlRXJyb3JSZXNwb25zZSA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiUmFpc2VJbnRlbnRSZXN1bHRCcmlkZ2VFcnJvclJlc3BvbnNlXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQucmFpc2VJbnRlbnRSZXN1bHRCcmlkZ2VFcnJvclJlc3BvbnNlVG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiUmFpc2VJbnRlbnRSZXN1bHRCcmlkZ2VFcnJvclJlc3BvbnNlXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvUmFpc2VJbnRlbnRSZXN1bHRCcmlkZ2VSZXNwb25zZSA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiUmFpc2VJbnRlbnRSZXN1bHRCcmlkZ2VSZXNwb25zZVwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LnJhaXNlSW50ZW50UmVzdWx0QnJpZGdlUmVzcG9uc2VUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJSYWlzZUludGVudFJlc3VsdEJyaWRnZVJlc3BvbnNlXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvQ29udGV4dCA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiQ29udGV4dFwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmNvbnRleHRUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJDb250ZXh0XCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICByZXR1cm4gQ29udmVydDtcbn0oKSk7XG5mdW5jdGlvbiBpbnZhbGlkVmFsdWUkMSh0eXAsIHZhbCwga2V5LCBwYXJlbnQpIHtcbiAgICBpZiAocGFyZW50ID09PSB2b2lkIDApIHsgcGFyZW50ID0gJyc7IH1cbiAgICB2YXIgcHJldHR5VHlwID0gcHJldHR5VHlwZU5hbWUkMSh0eXApO1xuICAgIHZhciBwYXJlbnRUZXh0ID0gcGFyZW50ID8gXCIgb24gXCIuY29uY2F0KHBhcmVudCkgOiAnJztcbiAgICB2YXIga2V5VGV4dCA9IGtleSA/IFwiIGZvciBrZXkgXFxcIlwiLmNvbmNhdChrZXksIFwiXFxcIlwiKSA6ICcnO1xuICAgIHRocm93IEVycm9yKFwiSW52YWxpZCB2YWx1ZVwiLmNvbmNhdChrZXlUZXh0KS5jb25jYXQocGFyZW50VGV4dCwgXCIuIEV4cGVjdGVkIFwiKS5jb25jYXQocHJldHR5VHlwLCBcIiBidXQgZ290IFwiKS5jb25jYXQoSlNPTi5zdHJpbmdpZnkodmFsKSkpO1xufVxuZnVuY3Rpb24gcHJldHR5VHlwZU5hbWUkMSh0eXApIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0eXApKSB7XG4gICAgICAgIGlmICh0eXAubGVuZ3RoID09PSAyICYmIHR5cFswXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJhbiBvcHRpb25hbCBcIi5jb25jYXQocHJldHR5VHlwZU5hbWUkMSh0eXBbMV0pKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBcIm9uZSBvZiBbXCIuY29uY2F0KHR5cC5tYXAoZnVuY3Rpb24gKGEpIHsgcmV0dXJuIHByZXR0eVR5cGVOYW1lJDEoYSk7IH0pLmpvaW4oXCIsIFwiKSwgXCJdXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiB0eXAgPT09IFwib2JqZWN0XCIgJiYgdHlwLmxpdGVyYWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdHlwLmxpdGVyYWw7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHR5cDtcbiAgICB9XG59XG5mdW5jdGlvbiBqc29uVG9KU1Byb3BzJDEodHlwKSB7XG4gICAgaWYgKHR5cC5qc29uVG9KUyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciBtYXBfMSA9IHt9O1xuICAgICAgICB0eXAucHJvcHMuZm9yRWFjaChmdW5jdGlvbiAocCkgeyByZXR1cm4gbWFwXzFbcC5qc29uXSA9IHsga2V5OiBwLmpzLCB0eXA6IHAudHlwIH07IH0pO1xuICAgICAgICB0eXAuanNvblRvSlMgPSBtYXBfMTtcbiAgICB9XG4gICAgcmV0dXJuIHR5cC5qc29uVG9KUztcbn1cbmZ1bmN0aW9uIGpzVG9KU09OUHJvcHMkMSh0eXApIHtcbiAgICBpZiAodHlwLmpzVG9KU09OID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIG1hcF8yID0ge307XG4gICAgICAgIHR5cC5wcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChwKSB7IHJldHVybiBtYXBfMltwLmpzXSA9IHsga2V5OiBwLmpzb24sIHR5cDogcC50eXAgfTsgfSk7XG4gICAgICAgIHR5cC5qc1RvSlNPTiA9IG1hcF8yO1xuICAgIH1cbiAgICByZXR1cm4gdHlwLmpzVG9KU09OO1xufVxuZnVuY3Rpb24gdHJhbnNmb3JtJDEodmFsLCB0eXAsIGdldFByb3BzLCBrZXksIHBhcmVudCkge1xuICAgIGlmIChrZXkgPT09IHZvaWQgMCkgeyBrZXkgPSAnJzsgfVxuICAgIGlmIChwYXJlbnQgPT09IHZvaWQgMCkgeyBwYXJlbnQgPSAnJzsgfVxuICAgIGZ1bmN0aW9uIHRyYW5zZm9ybVByaW1pdGl2ZSh0eXAsIHZhbCkge1xuICAgICAgICBpZiAodHlwZW9mIHR5cCA9PT0gdHlwZW9mIHZhbClcbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIHJldHVybiBpbnZhbGlkVmFsdWUkMSh0eXAsIHZhbCwga2V5LCBwYXJlbnQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB0cmFuc2Zvcm1Vbmlvbih0eXBzLCB2YWwpIHtcbiAgICAgICAgLy8gdmFsIG11c3QgdmFsaWRhdGUgYWdhaW5zdCBvbmUgdHlwIGluIHR5cHNcbiAgICAgICAgdmFyIGwgPSB0eXBzLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIHZhciB0eXBfMSA9IHR5cHNbaV07XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cmFuc2Zvcm0kMSh2YWwsIHR5cF8xLCBnZXRQcm9wcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoXykgeyB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGludmFsaWRWYWx1ZSQxKHR5cHMsIHZhbCwga2V5LCBwYXJlbnQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB0cmFuc2Zvcm1FbnVtKGNhc2VzLCB2YWwpIHtcbiAgICAgICAgaWYgKGNhc2VzLmluZGV4T2YodmFsKSAhPT0gLTEpXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICByZXR1cm4gaW52YWxpZFZhbHVlJDEoY2FzZXMubWFwKGZ1bmN0aW9uIChhKSB7IHJldHVybiBsJDEoYSk7IH0pLCB2YWwsIGtleSwgcGFyZW50KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdHJhbnNmb3JtQXJyYXkodHlwLCB2YWwpIHtcbiAgICAgICAgLy8gdmFsIG11c3QgYmUgYW4gYXJyYXkgd2l0aCBubyBpbnZhbGlkIGVsZW1lbnRzXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWwpKVxuICAgICAgICAgICAgcmV0dXJuIGludmFsaWRWYWx1ZSQxKGwkMShcImFycmF5XCIpLCB2YWwsIGtleSwgcGFyZW50KTtcbiAgICAgICAgcmV0dXJuIHZhbC5tYXAoZnVuY3Rpb24gKGVsKSB7IHJldHVybiB0cmFuc2Zvcm0kMShlbCwgdHlwLCBnZXRQcm9wcyk7IH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRlKHZhbCkge1xuICAgICAgICBpZiAodmFsID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZCA9IG5ldyBEYXRlKHZhbCk7XG4gICAgICAgIGlmIChpc05hTihkLnZhbHVlT2YoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnZhbGlkVmFsdWUkMShsJDEoXCJEYXRlXCIpLCB2YWwsIGtleSwgcGFyZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZDtcbiAgICB9XG4gICAgZnVuY3Rpb24gdHJhbnNmb3JtT2JqZWN0KHByb3BzLCBhZGRpdGlvbmFsLCB2YWwpIHtcbiAgICAgICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsICE9PSBcIm9iamVjdFwiIHx8IEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgICAgICAgICAgcmV0dXJuIGludmFsaWRWYWx1ZSQxKGwkMShyZWYgfHwgXCJvYmplY3RcIiksIHZhbCwga2V5LCBwYXJlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocHJvcHMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgdmFyIHByb3AgPSBwcm9wc1trZXldO1xuICAgICAgICAgICAgdmFyIHYgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodmFsLCBrZXkpID8gdmFsW2tleV0gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICByZXN1bHRbcHJvcC5rZXldID0gdHJhbnNmb3JtJDEodiwgcHJvcC50eXAsIGdldFByb3BzLCBrZXksIHJlZik7XG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh2YWwpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocHJvcHMsIGtleSkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHRyYW5zZm9ybSQxKHZhbFtrZXldLCBhZGRpdGlvbmFsLCBnZXRQcm9wcywga2V5LCByZWYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgaWYgKHR5cCA9PT0gXCJhbnlcIilcbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICBpZiAodHlwID09PSBudWxsKSB7XG4gICAgICAgIGlmICh2YWwgPT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICByZXR1cm4gaW52YWxpZFZhbHVlJDEodHlwLCB2YWwsIGtleSwgcGFyZW50KTtcbiAgICB9XG4gICAgaWYgKHR5cCA9PT0gZmFsc2UpXG4gICAgICAgIHJldHVybiBpbnZhbGlkVmFsdWUkMSh0eXAsIHZhbCwga2V5LCBwYXJlbnQpO1xuICAgIHZhciByZWYgPSB1bmRlZmluZWQ7XG4gICAgd2hpbGUgKHR5cGVvZiB0eXAgPT09IFwib2JqZWN0XCIgJiYgdHlwLnJlZiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlZiA9IHR5cC5yZWY7XG4gICAgICAgIHR5cCA9IHR5cGVNYXAkMVt0eXAucmVmXTtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodHlwKSlcbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybUVudW0odHlwLCB2YWwpO1xuICAgIGlmICh0eXBlb2YgdHlwID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHJldHVybiB0eXAuaGFzT3duUHJvcGVydHkoXCJ1bmlvbk1lbWJlcnNcIikgPyB0cmFuc2Zvcm1Vbmlvbih0eXAudW5pb25NZW1iZXJzLCB2YWwpXG4gICAgICAgICAgICA6IHR5cC5oYXNPd25Qcm9wZXJ0eShcImFycmF5SXRlbXNcIikgPyB0cmFuc2Zvcm1BcnJheSh0eXAuYXJyYXlJdGVtcywgdmFsKVxuICAgICAgICAgICAgICAgIDogdHlwLmhhc093blByb3BlcnR5KFwicHJvcHNcIikgPyB0cmFuc2Zvcm1PYmplY3QoZ2V0UHJvcHModHlwKSwgdHlwLmFkZGl0aW9uYWwsIHZhbClcbiAgICAgICAgICAgICAgICAgICAgOiBpbnZhbGlkVmFsdWUkMSh0eXAsIHZhbCwga2V5LCBwYXJlbnQpO1xuICAgIH1cbiAgICAvLyBOdW1iZXJzIGNhbiBiZSBwYXJzZWQgYnkgRGF0ZSBidXQgc2hvdWxkbid0IGJlLlxuICAgIGlmICh0eXAgPT09IERhdGUgJiYgdHlwZW9mIHZhbCAhPT0gXCJudW1iZXJcIilcbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybURhdGUodmFsKTtcbiAgICByZXR1cm4gdHJhbnNmb3JtUHJpbWl0aXZlKHR5cCwgdmFsKTtcbn1cbmZ1bmN0aW9uIGNhc3QkMSh2YWwsIHR5cCkge1xuICAgIHJldHVybiB0cmFuc2Zvcm0kMSh2YWwsIHR5cCwganNvblRvSlNQcm9wcyQxKTtcbn1cbmZ1bmN0aW9uIHVuY2FzdCQxKHZhbCwgdHlwKSB7XG4gICAgcmV0dXJuIHRyYW5zZm9ybSQxKHZhbCwgdHlwLCBqc1RvSlNPTlByb3BzJDEpO1xufVxuZnVuY3Rpb24gbCQxKHR5cCkge1xuICAgIHJldHVybiB7IGxpdGVyYWw6IHR5cCB9O1xufVxuZnVuY3Rpb24gYSQxKHR5cCkge1xuICAgIHJldHVybiB7IGFycmF5SXRlbXM6IHR5cCB9O1xufVxuZnVuY3Rpb24gdSQxKCkge1xuICAgIHZhciB0eXBzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdHlwc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICByZXR1cm4geyB1bmlvbk1lbWJlcnM6IHR5cHMgfTtcbn1cbmZ1bmN0aW9uIG8kMShwcm9wcywgYWRkaXRpb25hbCkge1xuICAgIHJldHVybiB7IHByb3BzOiBwcm9wcywgYWRkaXRpb25hbDogYWRkaXRpb25hbCB9O1xufVxuZnVuY3Rpb24gbSQxKGFkZGl0aW9uYWwpIHtcbiAgICByZXR1cm4geyBwcm9wczogW10sIGFkZGl0aW9uYWw6IGFkZGl0aW9uYWwgfTtcbn1cbmZ1bmN0aW9uIHIkMShuYW1lKSB7XG4gICAgcmV0dXJuIHsgcmVmOiBuYW1lIH07XG59XG52YXIgdHlwZU1hcCQxID0ge1xuICAgIFwiQWdlbnRFcnJvclJlc3BvbnNlTWVzc2FnZVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiQWdlbnRSZXNwb25zZU1ldGFkYXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiByJDEoXCJFcnJvclJlc3BvbnNlTWVzc2FnZVBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIlJlc3BvbnNlTWVzc2FnZVR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJBZ2VudFJlc3BvbnNlTWV0YWRhdGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwicmVzcG9uc2VVdWlkXCIsIGpzOiBcInJlc3BvbnNlVXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRXJyb3JSZXNwb25zZU1lc3NhZ2VQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJlcnJvclwiLCBqczogXCJlcnJvclwiLCB0eXA6IHIkMShcIlJlc3BvbnNlRXJyb3JEZXRhaWxcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIkFnZW50UmVxdWVzdE1lc3NhZ2VcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIkFnZW50UmVxdWVzdE1ldGFkYXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiBtJDEoXCJhbnlcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIlJlcXVlc3RNZXNzYWdlVHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkFnZW50UmVxdWVzdE1ldGFkYXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJkZXN0aW5hdGlvblwiLCBqczogXCJkZXN0aW5hdGlvblwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIHIkMShcIkJyaWRnZVBhcnRpY2lwYW50SWRlbnRpZmllclwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwic291cmNlXCIsIGpzOiBcInNvdXJjZVwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIHIkMShcIlNvdXJjZUlkZW50aWZpZXJcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkJyaWRnZVBhcnRpY2lwYW50SWRlbnRpZmllclwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZGVza3RvcEFnZW50XCIsIGpzOiBcImRlc2t0b3BBZ2VudFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcImFwcElkXCIsIGpzOiBcImFwcElkXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcImluc3RhbmNlSWRcIiwganM6IFwiaW5zdGFuY2VJZFwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJTb3VyY2VJZGVudGlmaWVyXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJhcHBJZFwiLCBqczogXCJhcHBJZFwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJkZXNrdG9wQWdlbnRcIiwganM6IFwiZGVza3RvcEFnZW50XCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcImluc3RhbmNlSWRcIiwganM6IFwiaW5zdGFuY2VJZFwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJBZ2VudFJlc3BvbnNlTWVzc2FnZVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiQWdlbnRSZXNwb25zZU1ldGFkYXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiBtJDEoXCJhbnlcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIlJlc3BvbnNlTWVzc2FnZVR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJCcmlkZ2VFcnJvclJlc3BvbnNlTWVzc2FnZVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiQnJpZGdlRXJyb3JSZXNwb25zZU1lc3NhZ2VNZXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiByJDEoXCJSZXNwb25zZUVycm9yTWVzc2FnZVBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IFwiXCIgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJCcmlkZ2VFcnJvclJlc3BvbnNlTWVzc2FnZU1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImVycm9yRGV0YWlsc1wiLCBqczogXCJlcnJvckRldGFpbHNcIiwgdHlwOiBhJDEociQxKFwiUmVzcG9uc2VFcnJvckRldGFpbFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcImVycm9yU291cmNlc1wiLCBqczogXCJlcnJvclNvdXJjZXNcIiwgdHlwOiBhJDEociQxKFwiRGVza3RvcEFnZW50SWRlbnRpZmllclwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwicmVzcG9uc2VVdWlkXCIsIGpzOiBcInJlc3BvbnNlVXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRGVza3RvcEFnZW50SWRlbnRpZmllclwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZGVza3RvcEFnZW50XCIsIGpzOiBcImRlc2t0b3BBZ2VudFwiLCB0eXA6IFwiXCIgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIlJlc3BvbnNlRXJyb3JNZXNzYWdlUGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZXJyb3JcIiwganM6IFwiZXJyb3JcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCByJDEoXCJSZXNwb25zZUVycm9yRGV0YWlsXCIpKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiQnJpZGdlUmVxdWVzdE1lc3NhZ2VcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIkJyaWRnZVJlcXVlc3RNZXRhZGF0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogbSQxKFwiYW55XCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiBcIlwiIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiQnJpZGdlUmVxdWVzdE1ldGFkYXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJkZXN0aW5hdGlvblwiLCBqczogXCJkZXN0aW5hdGlvblwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIHIkMShcIkJyaWRnZVBhcnRpY2lwYW50SWRlbnRpZmllclwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwic291cmNlXCIsIGpzOiBcInNvdXJjZVwiLCB0eXA6IHIkMShcIkJyaWRnZVBhcnRpY2lwYW50SWRlbnRpZmllclwiKSB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJCcmlkZ2VSZXNwb25zZU1lc3NhZ2VcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIkJyaWRnZVJlc3BvbnNlTWVzc2FnZU1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IG0kMShcImFueVwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogXCJcIiB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkJyaWRnZVJlc3BvbnNlTWVzc2FnZU1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImVycm9yRGV0YWlsc1wiLCBqczogXCJlcnJvckRldGFpbHNcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBhJDEociQxKFwiUmVzcG9uc2VFcnJvckRldGFpbFwiKSkpIH0sXG4gICAgICAgIHsganNvbjogXCJlcnJvclNvdXJjZXNcIiwganM6IFwiZXJyb3JTb3VyY2VzXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgYSQxKHIkMShcIkRlc2t0b3BBZ2VudElkZW50aWZpZXJcIikpKSB9LFxuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJyZXNwb25zZVV1aWRcIiwganM6IFwicmVzcG9uc2VVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwic291cmNlc1wiLCBqczogXCJzb3VyY2VzXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgYSQxKHIkMShcIkRlc2t0b3BBZ2VudElkZW50aWZpZXJcIikpKSB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJCcm9hZGNhc3RBZ2VudFJlcXVlc3RcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIkJyb2FkY2FzdEFnZW50UmVxdWVzdE1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIkJyb2FkY2FzdEFnZW50UmVxdWVzdFBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIkJyb2FkY2FzdEFnZW50UmVxdWVzdFR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJCcm9hZGNhc3RBZ2VudFJlcXVlc3RNZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInNvdXJjZVwiLCBqczogXCJzb3VyY2VcIiwgdHlwOiByJDEoXCJTb3VyY2VPYmplY3RcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiU291cmNlT2JqZWN0XCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJhcHBJZFwiLCBqczogXCJhcHBJZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcImRlc2t0b3BBZ2VudFwiLCBqczogXCJkZXNrdG9wQWdlbnRcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiaW5zdGFuY2VJZFwiLCBqczogXCJpbnN0YW5jZUlkXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIkJyb2FkY2FzdEFnZW50UmVxdWVzdFBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImNoYW5uZWxJZFwiLCBqczogXCJjaGFubmVsSWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJjb250ZXh0XCIsIGpzOiBcImNvbnRleHRcIiwgdHlwOiByJDEoXCJDb250ZXh0RWxlbWVudFwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkNvbnRleHRFbGVtZW50XCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJpZFwiLCBqczogXCJpZFwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIG0kMShcImFueVwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcIm5hbWVcIiwganM6IFwibmFtZVwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiBcIlwiIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJCcm9hZGNhc3RCcmlkZ2VSZXF1ZXN0XCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJCcm9hZGNhc3RCcmlkZ2VSZXF1ZXN0TWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiQnJvYWRjYXN0QnJpZGdlUmVxdWVzdFBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIkJyb2FkY2FzdEFnZW50UmVxdWVzdFR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJCcm9hZGNhc3RCcmlkZ2VSZXF1ZXN0TWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJzb3VyY2VcIiwganM6IFwic291cmNlXCIsIHR5cDogciQxKFwiTWV0YVNvdXJjZVwiKSB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJNZXRhU291cmNlXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJhcHBJZFwiLCBqczogXCJhcHBJZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcImRlc2t0b3BBZ2VudFwiLCBqczogXCJkZXNrdG9wQWdlbnRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJpbnN0YW5jZUlkXCIsIGpzOiBcImluc3RhbmNlSWRcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiQnJvYWRjYXN0QnJpZGdlUmVxdWVzdFBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImNoYW5uZWxJZFwiLCBqczogXCJjaGFubmVsSWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJjb250ZXh0XCIsIGpzOiBcImNvbnRleHRcIiwgdHlwOiByJDEoXCJDb250ZXh0RWxlbWVudFwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkNvbm5lY3Rpb25TdGVwTWVzc2FnZVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiQ29ubmVjdGlvblN0ZXBNZXRhZGF0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogbSQxKFwiYW55XCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJDb25uZWN0aW9uU3RlcE1lc3NhZ2VUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiQ29ubmVjdGlvblN0ZXBNZXRhZGF0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwicmVzcG9uc2VVdWlkXCIsIGpzOiBcInJlc3BvbnNlVXVpZFwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkNvbm5lY3Rpb25TdGVwMkhlbGxvXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJDb25uZWN0aW9uU3RlcDJIZWxsb01ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIkNvbm5lY3Rpb25TdGVwMkhlbGxvUGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiQ29ubmVjdGlvblN0ZXAySGVsbG9UeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiQ29ubmVjdGlvblN0ZXAySGVsbG9NZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkNvbm5lY3Rpb25TdGVwMkhlbGxvUGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiYXV0aFJlcXVpcmVkXCIsIGpzOiBcImF1dGhSZXF1aXJlZFwiLCB0eXA6IHRydWUgfSxcbiAgICAgICAgeyBqc29uOiBcImF1dGhUb2tlblwiLCBqczogXCJhdXRoVG9rZW5cIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiZGVza3RvcEFnZW50QnJpZGdlVmVyc2lvblwiLCBqczogXCJkZXNrdG9wQWdlbnRCcmlkZ2VWZXJzaW9uXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwic3VwcG9ydGVkRkRDM1ZlcnNpb25zXCIsIGpzOiBcInN1cHBvcnRlZEZEQzNWZXJzaW9uc1wiLCB0eXA6IGEkMShcIlwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkNvbm5lY3Rpb25TdGVwM0hhbmRzaGFrZVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiQ29ubmVjdGlvblN0ZXAzSGFuZHNoYWtlTWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiQ29ubmVjdGlvblN0ZXAzSGFuZHNoYWtlUGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiQ29ubmVjdGlvblN0ZXAzSGFuZHNoYWtlVHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkNvbm5lY3Rpb25TdGVwM0hhbmRzaGFrZU1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJDb25uZWN0aW9uU3RlcDNIYW5kc2hha2VQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJhdXRoVG9rZW5cIiwganM6IFwiYXV0aFRva2VuXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcImNoYW5uZWxzU3RhdGVcIiwganM6IFwiY2hhbm5lbHNTdGF0ZVwiLCB0eXA6IG0kMShhJDEociQxKFwiQ29udGV4dEVsZW1lbnRcIikpKSB9LFxuICAgICAgICB7IGpzb246IFwiaW1wbGVtZW50YXRpb25NZXRhZGF0YVwiLCBqczogXCJpbXBsZW1lbnRhdGlvbk1ldGFkYXRhXCIsIHR5cDogciQxKFwiQ29ubmVjdGluZ0FnZW50SW1wbGVtZW50YXRpb25NZXRhZGF0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicmVxdWVzdGVkTmFtZVwiLCBqczogXCJyZXF1ZXN0ZWROYW1lXCIsIHR5cDogXCJcIiB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkNvbm5lY3RpbmdBZ2VudEltcGxlbWVudGF0aW9uTWV0YWRhdGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImZkYzNWZXJzaW9uXCIsIGpzOiBcImZkYzNWZXJzaW9uXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwib3B0aW9uYWxGZWF0dXJlc1wiLCBqczogXCJvcHRpb25hbEZlYXR1cmVzXCIsIHR5cDogciQxKFwiT3B0aW9uYWxGZWF0dXJlc1wiKSB9LFxuICAgICAgICB7IGpzb246IFwicHJvdmlkZXJcIiwganM6IFwicHJvdmlkZXJcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJwcm92aWRlclZlcnNpb25cIiwganM6IFwicHJvdmlkZXJWZXJzaW9uXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJPcHRpb25hbEZlYXR1cmVzXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJEZXNrdG9wQWdlbnRCcmlkZ2luZ1wiLCBqczogXCJEZXNrdG9wQWdlbnRCcmlkZ2luZ1wiLCB0eXA6IHRydWUgfSxcbiAgICAgICAgeyBqc29uOiBcIk9yaWdpbmF0aW5nQXBwTWV0YWRhdGFcIiwganM6IFwiT3JpZ2luYXRpbmdBcHBNZXRhZGF0YVwiLCB0eXA6IHRydWUgfSxcbiAgICAgICAgeyBqc29uOiBcIlVzZXJDaGFubmVsTWVtYmVyc2hpcEFQSXNcIiwganM6IFwiVXNlckNoYW5uZWxNZW1iZXJzaGlwQVBJc1wiLCB0eXA6IHRydWUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJDb25uZWN0aW9uU3RlcDRBdXRoZW50aWNhdGlvbkZhaWxlZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiQ29ubmVjdGlvblN0ZXA0QXV0aGVudGljYXRpb25GYWlsZWRNZXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiByJDEoXCJDb25uZWN0aW9uU3RlcDRBdXRoZW50aWNhdGlvbkZhaWxlZFBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIkNvbm5lY3Rpb25TdGVwNEF1dGhlbnRpY2F0aW9uRmFpbGVkVHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkNvbm5lY3Rpb25TdGVwNEF1dGhlbnRpY2F0aW9uRmFpbGVkTWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJyZXNwb25zZVV1aWRcIiwganM6IFwicmVzcG9uc2VVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJDb25uZWN0aW9uU3RlcDRBdXRoZW50aWNhdGlvbkZhaWxlZFBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1lc3NhZ2VcIiwganM6IFwibWVzc2FnZVwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiQ29ubmVjdGlvblN0ZXA2Q29ubmVjdGVkQWdlbnRzVXBkYXRlXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJDb25uZWN0aW9uU3RlcDZDb25uZWN0ZWRBZ2VudHNVcGRhdGVNZXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiByJDEoXCJDb25uZWN0aW9uU3RlcDZDb25uZWN0ZWRBZ2VudHNVcGRhdGVQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJDb25uZWN0aW9uU3RlcDZDb25uZWN0ZWRBZ2VudHNVcGRhdGVUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiQ29ubmVjdGlvblN0ZXA2Q29ubmVjdGVkQWdlbnRzVXBkYXRlTWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJyZXNwb25zZVV1aWRcIiwganM6IFwicmVzcG9uc2VVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJDb25uZWN0aW9uU3RlcDZDb25uZWN0ZWRBZ2VudHNVcGRhdGVQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJhZGRBZ2VudFwiLCBqczogXCJhZGRBZ2VudFwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJhbGxBZ2VudHNcIiwganM6IFwiYWxsQWdlbnRzXCIsIHR5cDogYSQxKHIkMShcIkRlc2t0b3BBZ2VudEltcGxlbWVudGF0aW9uTWV0YWRhdGFcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJjaGFubmVsc1N0YXRlXCIsIGpzOiBcImNoYW5uZWxzU3RhdGVcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBtJDEoYSQxKHIkMShcIkNvbnRleHRFbGVtZW50XCIpKSkpIH0sXG4gICAgICAgIHsganNvbjogXCJyZW1vdmVBZ2VudFwiLCBqczogXCJyZW1vdmVBZ2VudFwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRGVza3RvcEFnZW50SW1wbGVtZW50YXRpb25NZXRhZGF0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZGVza3RvcEFnZW50XCIsIGpzOiBcImRlc2t0b3BBZ2VudFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcImZkYzNWZXJzaW9uXCIsIGpzOiBcImZkYzNWZXJzaW9uXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwib3B0aW9uYWxGZWF0dXJlc1wiLCBqczogXCJvcHRpb25hbEZlYXR1cmVzXCIsIHR5cDogciQxKFwiT3B0aW9uYWxGZWF0dXJlc1wiKSB9LFxuICAgICAgICB7IGpzb246IFwicHJvdmlkZXJcIiwganM6IFwicHJvdmlkZXJcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJwcm92aWRlclZlcnNpb25cIiwganM6IFwicHJvdmlkZXJWZXJzaW9uXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJGaW5kSW5zdGFuY2VzQWdlbnRFcnJvclJlc3BvbnNlXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJGaW5kSW5zdGFuY2VzQWdlbnRFcnJvclJlc3BvbnNlTWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiRmluZEluc3RhbmNlc0FnZW50RXJyb3JSZXNwb25zZVBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIkZpbmRJbnN0YW5jZXNBZ2VudEVycm9yUmVzcG9uc2VUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRmluZEluc3RhbmNlc0FnZW50RXJyb3JSZXNwb25zZU1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwicmVzcG9uc2VVdWlkXCIsIGpzOiBcInJlc3BvbnNlVXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRmluZEluc3RhbmNlc0FnZW50RXJyb3JSZXNwb25zZVBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImVycm9yXCIsIGpzOiBcImVycm9yXCIsIHR5cDogciQxKFwiRXJyb3JNZXNzYWdlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRmluZEluc3RhbmNlc0FnZW50UmVxdWVzdFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiRmluZEluc3RhbmNlc0FnZW50UmVxdWVzdE1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIkZpbmRJbnN0YW5jZXNBZ2VudFJlcXVlc3RQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJGaW5kSW5zdGFuY2VzQWdlbnRSZXF1ZXN0VHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnN0YW5jZXNBZ2VudFJlcXVlc3RNZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJkZXN0aW5hdGlvblwiLCBqczogXCJkZXN0aW5hdGlvblwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIHIkMShcIkRlc3RpbmF0aW9uT2JqZWN0XCIpKSB9LFxuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJzb3VyY2VcIiwganM6IFwic291cmNlXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgciQxKFwiU291cmNlSWRlbnRpZmllclwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRGVzdGluYXRpb25PYmplY3RcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImRlc2t0b3BBZ2VudFwiLCBqczogXCJkZXNrdG9wQWdlbnRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJhcHBJZFwiLCBqczogXCJhcHBJZFwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJpbnN0YW5jZUlkXCIsIGpzOiBcImluc3RhbmNlSWRcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiRmluZEluc3RhbmNlc0FnZW50UmVxdWVzdFBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImFwcFwiLCBqczogXCJhcHBcIiwgdHlwOiByJDEoXCJBcHBJZGVudGlmaWVyXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiQXBwSWRlbnRpZmllclwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiYXBwSWRcIiwganM6IFwiYXBwSWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJkZXNrdG9wQWdlbnRcIiwganM6IFwiZGVza3RvcEFnZW50XCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcImluc3RhbmNlSWRcIiwganM6IFwiaW5zdGFuY2VJZFwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJGaW5kSW5zdGFuY2VzQWdlbnRSZXNwb25zZVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiRmluZEluc3RhbmNlc0FnZW50UmVzcG9uc2VNZXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiByJDEoXCJGaW5kSW5zdGFuY2VzQWdlbnRSZXNwb25zZVBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIkZpbmRJbnN0YW5jZXNBZ2VudEVycm9yUmVzcG9uc2VUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRmluZEluc3RhbmNlc0FnZW50UmVzcG9uc2VNZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInJlc3BvbnNlVXVpZFwiLCBqczogXCJyZXNwb25zZVV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnN0YW5jZXNBZ2VudFJlc3BvbnNlUGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiYXBwSWRlbnRpZmllcnNcIiwganM6IFwiYXBwSWRlbnRpZmllcnNcIiwgdHlwOiBhJDEociQxKFwiQXBwTWV0YWRhdGFcIikpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiQXBwTWV0YWRhdGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImFwcElkXCIsIGpzOiBcImFwcElkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwiZGVzY3JpcHRpb25cIiwganM6IFwiZGVzY3JpcHRpb25cIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiZGVza3RvcEFnZW50XCIsIGpzOiBcImRlc2t0b3BBZ2VudFwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJpY29uc1wiLCBqczogXCJpY29uc1wiLCB0eXA6IHUkMSh1bmRlZmluZWQsIGEkMShyJDEoXCJJY29uXCIpKSkgfSxcbiAgICAgICAgeyBqc29uOiBcImluc3RhbmNlSWRcIiwganM6IFwiaW5zdGFuY2VJZFwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJpbnN0YW5jZU1ldGFkYXRhXCIsIGpzOiBcImluc3RhbmNlTWV0YWRhdGFcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBtJDEoXCJhbnlcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwicmVzdWx0VHlwZVwiLCBqczogXCJyZXN1bHRUeXBlXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgdSQxKG51bGwsIFwiXCIpKSB9LFxuICAgICAgICB7IGpzb246IFwic2NyZWVuc2hvdHNcIiwganM6IFwic2NyZWVuc2hvdHNcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBhJDEociQxKFwiSW1hZ2VcIikpKSB9LFxuICAgICAgICB7IGpzb246IFwidGl0bGVcIiwganM6IFwidGl0bGVcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwidG9vbHRpcFwiLCBqczogXCJ0b29sdGlwXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInZlcnNpb25cIiwganM6IFwidmVyc2lvblwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiSWNvblwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwic2l6ZVwiLCBqczogXCJzaXplXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInNyY1wiLCBqczogXCJzcmNcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkltYWdlXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJsYWJlbFwiLCBqczogXCJsYWJlbFwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJzaXplXCIsIGpzOiBcInNpemVcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwic3JjXCIsIGpzOiBcInNyY1wiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRmluZEluc3RhbmNlc0JyaWRnZUVycm9yUmVzcG9uc2VcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIkZpbmRJbnN0YW5jZXNCcmlkZ2VFcnJvclJlc3BvbnNlTWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiRmluZEluc3RhbmNlc0JyaWRnZUVycm9yUmVzcG9uc2VQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJGaW5kSW5zdGFuY2VzQWdlbnRFcnJvclJlc3BvbnNlVHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnN0YW5jZXNCcmlkZ2VFcnJvclJlc3BvbnNlTWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZXJyb3JEZXRhaWxzXCIsIGpzOiBcImVycm9yRGV0YWlsc1wiLCB0eXA6IGEkMShyJDEoXCJSZXNwb25zZUVycm9yRGV0YWlsXCIpKSB9LFxuICAgICAgICB7IGpzb246IFwiZXJyb3JTb3VyY2VzXCIsIGpzOiBcImVycm9yU291cmNlc1wiLCB0eXA6IGEkMShyJDEoXCJEZXNrdG9wQWdlbnRJZGVudGlmaWVyXCIpKSB9LFxuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJyZXNwb25zZVV1aWRcIiwganM6IFwicmVzcG9uc2VVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJGaW5kSW5zdGFuY2VzQnJpZGdlRXJyb3JSZXNwb25zZVBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImVycm9yXCIsIGpzOiBcImVycm9yXCIsIHR5cDogciQxKFwiRXJyb3JNZXNzYWdlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRmluZEluc3RhbmNlc0JyaWRnZVJlcXVlc3RcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIkZpbmRJbnN0YW5jZXNCcmlkZ2VSZXF1ZXN0TWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiRmluZEluc3RhbmNlc0JyaWRnZVJlcXVlc3RQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJGaW5kSW5zdGFuY2VzQWdlbnRSZXF1ZXN0VHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnN0YW5jZXNCcmlkZ2VSZXF1ZXN0TWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZGVzdGluYXRpb25cIiwganM6IFwiZGVzdGluYXRpb25cIiwgdHlwOiB1JDEodW5kZWZpbmVkLCByJDEoXCJEZXN0aW5hdGlvbk9iamVjdFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwic291cmNlXCIsIGpzOiBcInNvdXJjZVwiLCB0eXA6IHIkMShcIk1ldGFTb3VyY2VPYmplY3RcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiTWV0YVNvdXJjZU9iamVjdFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiYXBwSWRcIiwganM6IFwiYXBwSWRcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiZGVza3RvcEFnZW50XCIsIGpzOiBcImRlc2t0b3BBZ2VudFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcImluc3RhbmNlSWRcIiwganM6IFwiaW5zdGFuY2VJZFwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJGaW5kSW5zdGFuY2VzQnJpZGdlUmVxdWVzdFBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImFwcFwiLCBqczogXCJhcHBcIiwgdHlwOiByJDEoXCJBcHBJZGVudGlmaWVyXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRmluZEluc3RhbmNlc0JyaWRnZVJlc3BvbnNlXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJGaW5kSW5zdGFuY2VzQnJpZGdlUmVzcG9uc2VNZXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiByJDEoXCJGaW5kSW5zdGFuY2VzQnJpZGdlUmVzcG9uc2VQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJGaW5kSW5zdGFuY2VzQWdlbnRFcnJvclJlc3BvbnNlVHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnN0YW5jZXNCcmlkZ2VSZXNwb25zZU1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImVycm9yRGV0YWlsc1wiLCBqczogXCJlcnJvckRldGFpbHNcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBhJDEociQxKFwiUmVzcG9uc2VFcnJvckRldGFpbFwiKSkpIH0sXG4gICAgICAgIHsganNvbjogXCJlcnJvclNvdXJjZXNcIiwganM6IFwiZXJyb3JTb3VyY2VzXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgYSQxKHIkMShcIkRlc2t0b3BBZ2VudElkZW50aWZpZXJcIikpKSB9LFxuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJyZXNwb25zZVV1aWRcIiwganM6IFwicmVzcG9uc2VVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwic291cmNlc1wiLCBqczogXCJzb3VyY2VzXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgYSQxKHIkMShcIkRlc2t0b3BBZ2VudElkZW50aWZpZXJcIikpKSB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJGaW5kSW5zdGFuY2VzQnJpZGdlUmVzcG9uc2VQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJhcHBJZGVudGlmaWVyc1wiLCBqczogXCJhcHBJZGVudGlmaWVyc1wiLCB0eXA6IGEkMShyJDEoXCJBcHBNZXRhZGF0YVwiKSkgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJGaW5kSW50ZW50QWdlbnRFcnJvclJlc3BvbnNlXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJGaW5kSW50ZW50QWdlbnRFcnJvclJlc3BvbnNlTWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiRmluZEludGVudEFnZW50RXJyb3JSZXNwb25zZVBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIkZpbmRJbnRlbnRBZ2VudEVycm9yUmVzcG9uc2VUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRmluZEludGVudEFnZW50RXJyb3JSZXNwb25zZU1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwicmVzcG9uc2VVdWlkXCIsIGpzOiBcInJlc3BvbnNlVXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRmluZEludGVudEFnZW50RXJyb3JSZXNwb25zZVBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImVycm9yXCIsIGpzOiBcImVycm9yXCIsIHR5cDogciQxKFwiRXJyb3JNZXNzYWdlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRmluZEludGVudEFnZW50UmVxdWVzdFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiRmluZEludGVudEFnZW50UmVxdWVzdE1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIkZpbmRJbnRlbnRBZ2VudFJlcXVlc3RQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJGaW5kSW50ZW50QWdlbnRSZXF1ZXN0VHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnRlbnRBZ2VudFJlcXVlc3RNZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInNvdXJjZVwiLCBqczogXCJzb3VyY2VcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCByJDEoXCJTb3VyY2VJZGVudGlmaWVyXCIpKSB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICAgICAgeyBqc29uOiBcImRlc3RpbmF0aW9uXCIsIGpzOiBcImRlc3RpbmF0aW9uXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgciQxKFwiQnJpZGdlUGFydGljaXBhbnRJZGVudGlmaWVyXCIpKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnRlbnRBZ2VudFJlcXVlc3RQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJjb250ZXh0XCIsIGpzOiBcImNvbnRleHRcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCByJDEoXCJDb250ZXh0RWxlbWVudFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcImludGVudFwiLCBqczogXCJpbnRlbnRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJyZXN1bHRUeXBlXCIsIGpzOiBcInJlc3VsdFR5cGVcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnRlbnRBZ2VudFJlc3BvbnNlXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJGaW5kSW50ZW50QWdlbnRSZXNwb25zZU1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIkZpbmRJbnRlbnRBZ2VudFJlc3BvbnNlUGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiRmluZEludGVudEFnZW50RXJyb3JSZXNwb25zZVR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJGaW5kSW50ZW50QWdlbnRSZXNwb25zZU1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwicmVzcG9uc2VVdWlkXCIsIGpzOiBcInJlc3BvbnNlVXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRmluZEludGVudEFnZW50UmVzcG9uc2VQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJhcHBJbnRlbnRcIiwganM6IFwiYXBwSW50ZW50XCIsIHR5cDogciQxKFwiQXBwSW50ZW50XCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiQXBwSW50ZW50XCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJhcHBzXCIsIGpzOiBcImFwcHNcIiwgdHlwOiBhJDEociQxKFwiQXBwTWV0YWRhdGFcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJpbnRlbnRcIiwganM6IFwiaW50ZW50XCIsIHR5cDogciQxKFwiSW50ZW50TWV0YWRhdGFcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJJbnRlbnRNZXRhZGF0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZGlzcGxheU5hbWVcIiwganM6IFwiZGlzcGxheU5hbWVcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiBcIlwiIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRmluZEludGVudEJyaWRnZUVycm9yUmVzcG9uc2VcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIkZpbmRJbnRlbnRCcmlkZ2VFcnJvclJlc3BvbnNlTWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiRmluZEludGVudEJyaWRnZUVycm9yUmVzcG9uc2VQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJGaW5kSW50ZW50QWdlbnRFcnJvclJlc3BvbnNlVHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnRlbnRCcmlkZ2VFcnJvclJlc3BvbnNlTWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZXJyb3JEZXRhaWxzXCIsIGpzOiBcImVycm9yRGV0YWlsc1wiLCB0eXA6IGEkMShyJDEoXCJSZXNwb25zZUVycm9yRGV0YWlsXCIpKSB9LFxuICAgICAgICB7IGpzb246IFwiZXJyb3JTb3VyY2VzXCIsIGpzOiBcImVycm9yU291cmNlc1wiLCB0eXA6IGEkMShyJDEoXCJEZXNrdG9wQWdlbnRJZGVudGlmaWVyXCIpKSB9LFxuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJyZXNwb25zZVV1aWRcIiwganM6IFwicmVzcG9uc2VVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJGaW5kSW50ZW50QnJpZGdlRXJyb3JSZXNwb25zZVBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImVycm9yXCIsIGpzOiBcImVycm9yXCIsIHR5cDogciQxKFwiRXJyb3JNZXNzYWdlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRmluZEludGVudEJyaWRnZVJlcXVlc3RcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIkZpbmRJbnRlbnRCcmlkZ2VSZXF1ZXN0TWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiRmluZEludGVudEJyaWRnZVJlcXVlc3RQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJGaW5kSW50ZW50QWdlbnRSZXF1ZXN0VHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnRlbnRCcmlkZ2VSZXF1ZXN0TWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJzb3VyY2VcIiwganM6IFwic291cmNlXCIsIHR5cDogciQxKFwiQnJpZGdlUGFydGljaXBhbnRJZGVudGlmaWVyXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgICAgICB7IGpzb246IFwiZGVzdGluYXRpb25cIiwganM6IFwiZGVzdGluYXRpb25cIiwgdHlwOiB1JDEodW5kZWZpbmVkLCByJDEoXCJCcmlkZ2VQYXJ0aWNpcGFudElkZW50aWZpZXJcIikpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRmluZEludGVudEJyaWRnZVJlcXVlc3RQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJjb250ZXh0XCIsIGpzOiBcImNvbnRleHRcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCByJDEoXCJDb250ZXh0RWxlbWVudFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcImludGVudFwiLCBqczogXCJpbnRlbnRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJyZXN1bHRUeXBlXCIsIGpzOiBcInJlc3VsdFR5cGVcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnRlbnRCcmlkZ2VSZXNwb25zZVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiRmluZEludGVudEJyaWRnZVJlc3BvbnNlTWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiRmluZEludGVudEJyaWRnZVJlc3BvbnNlUGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiRmluZEludGVudEFnZW50RXJyb3JSZXNwb25zZVR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJGaW5kSW50ZW50QnJpZGdlUmVzcG9uc2VNZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJlcnJvckRldGFpbHNcIiwganM6IFwiZXJyb3JEZXRhaWxzXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgYSQxKHIkMShcIlJlc3BvbnNlRXJyb3JEZXRhaWxcIikpKSB9LFxuICAgICAgICB7IGpzb246IFwiZXJyb3JTb3VyY2VzXCIsIGpzOiBcImVycm9yU291cmNlc1wiLCB0eXA6IHUkMSh1bmRlZmluZWQsIGEkMShyJDEoXCJEZXNrdG9wQWdlbnRJZGVudGlmaWVyXCIpKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwicmVzcG9uc2VVdWlkXCIsIGpzOiBcInJlc3BvbnNlVXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInNvdXJjZXNcIiwganM6IFwic291cmNlc1wiLCB0eXA6IHUkMSh1bmRlZmluZWQsIGEkMShyJDEoXCJEZXNrdG9wQWdlbnRJZGVudGlmaWVyXCIpKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRmluZEludGVudEJyaWRnZVJlc3BvbnNlUGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiYXBwSW50ZW50XCIsIGpzOiBcImFwcEludGVudFwiLCB0eXA6IHIkMShcIkFwcEludGVudFwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnRlbnRzQnlDb250ZXh0QWdlbnRFcnJvclJlc3BvbnNlXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJGaW5kSW50ZW50c0J5Q29udGV4dEFnZW50RXJyb3JSZXNwb25zZU1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIkZpbmRJbnRlbnRzQnlDb250ZXh0QWdlbnRFcnJvclJlc3BvbnNlUGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiRmluZEludGVudHNCeUNvbnRleHRBZ2VudEVycm9yUmVzcG9uc2VUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRmluZEludGVudHNCeUNvbnRleHRBZ2VudEVycm9yUmVzcG9uc2VNZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInJlc3BvbnNlVXVpZFwiLCBqczogXCJyZXNwb25zZVV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnRlbnRzQnlDb250ZXh0QWdlbnRFcnJvclJlc3BvbnNlUGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZXJyb3JcIiwganM6IFwiZXJyb3JcIiwgdHlwOiByJDEoXCJFcnJvck1lc3NhZ2VcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJGaW5kSW50ZW50c0J5Q29udGV4dEFnZW50UmVxdWVzdFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiRmluZEludGVudHNCeUNvbnRleHRBZ2VudFJlcXVlc3RNZXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiByJDEoXCJGaW5kSW50ZW50c0J5Q29udGV4dEFnZW50UmVxdWVzdFBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIkZpbmRJbnRlbnRzQnlDb250ZXh0QWdlbnRSZXF1ZXN0VHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnRlbnRzQnlDb250ZXh0QWdlbnRSZXF1ZXN0TWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJzb3VyY2VcIiwganM6IFwic291cmNlXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgciQxKFwiU291cmNlT2JqZWN0XCIpKSB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICAgICAgeyBqc29uOiBcImRlc3RpbmF0aW9uXCIsIGpzOiBcImRlc3RpbmF0aW9uXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgciQxKFwiQnJpZGdlUGFydGljaXBhbnRJZGVudGlmaWVyXCIpKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnRlbnRzQnlDb250ZXh0QWdlbnRSZXF1ZXN0UGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiY29udGV4dFwiLCBqczogXCJjb250ZXh0XCIsIHR5cDogciQxKFwiQ29udGV4dEVsZW1lbnRcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJGaW5kSW50ZW50c0J5Q29udGV4dEFnZW50UmVzcG9uc2VcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIkZpbmRJbnRlbnRzQnlDb250ZXh0QWdlbnRSZXNwb25zZU1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIkZpbmRJbnRlbnRzQnlDb250ZXh0QWdlbnRSZXNwb25zZVBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIkZpbmRJbnRlbnRzQnlDb250ZXh0QWdlbnRFcnJvclJlc3BvbnNlVHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnRlbnRzQnlDb250ZXh0QWdlbnRSZXNwb25zZU1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwicmVzcG9uc2VVdWlkXCIsIGpzOiBcInJlc3BvbnNlVXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRmluZEludGVudHNCeUNvbnRleHRBZ2VudFJlc3BvbnNlUGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiYXBwSW50ZW50c1wiLCBqczogXCJhcHBJbnRlbnRzXCIsIHR5cDogYSQxKHIkMShcIkFwcEludGVudFwiKSkgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJGaW5kSW50ZW50c0J5Q29udGV4dEJyaWRnZUVycm9yUmVzcG9uc2VcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIkZpbmRJbnRlbnRzQnlDb250ZXh0QnJpZGdlRXJyb3JSZXNwb25zZU1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIkZpbmRJbnRlbnRzQnlDb250ZXh0QnJpZGdlRXJyb3JSZXNwb25zZVBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIkZpbmRJbnRlbnRzQnlDb250ZXh0QWdlbnRFcnJvclJlc3BvbnNlVHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnRlbnRzQnlDb250ZXh0QnJpZGdlRXJyb3JSZXNwb25zZU1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImVycm9yRGV0YWlsc1wiLCBqczogXCJlcnJvckRldGFpbHNcIiwgdHlwOiBhJDEociQxKFwiUmVzcG9uc2VFcnJvckRldGFpbFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcImVycm9yU291cmNlc1wiLCBqczogXCJlcnJvclNvdXJjZXNcIiwgdHlwOiBhJDEociQxKFwiRGVza3RvcEFnZW50SWRlbnRpZmllclwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwicmVzcG9uc2VVdWlkXCIsIGpzOiBcInJlc3BvbnNlVXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRmluZEludGVudHNCeUNvbnRleHRCcmlkZ2VFcnJvclJlc3BvbnNlUGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZXJyb3JcIiwganM6IFwiZXJyb3JcIiwgdHlwOiByJDEoXCJFcnJvck1lc3NhZ2VcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJGaW5kSW50ZW50c0J5Q29udGV4dEJyaWRnZVJlcXVlc3RcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIkZpbmRJbnRlbnRzQnlDb250ZXh0QnJpZGdlUmVxdWVzdE1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIkZpbmRJbnRlbnRzQnlDb250ZXh0QnJpZGdlUmVxdWVzdFBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIkZpbmRJbnRlbnRzQnlDb250ZXh0QWdlbnRSZXF1ZXN0VHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnRlbnRzQnlDb250ZXh0QnJpZGdlUmVxdWVzdE1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwic291cmNlXCIsIGpzOiBcInNvdXJjZVwiLCB0eXA6IHIkMShcIk1ldGFTb3VyY2VcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgICAgIHsganNvbjogXCJkZXN0aW5hdGlvblwiLCBqczogXCJkZXN0aW5hdGlvblwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIHIkMShcIkJyaWRnZVBhcnRpY2lwYW50SWRlbnRpZmllclwiKSkgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJGaW5kSW50ZW50c0J5Q29udGV4dEJyaWRnZVJlcXVlc3RQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJjb250ZXh0XCIsIGpzOiBcImNvbnRleHRcIiwgdHlwOiByJDEoXCJDb250ZXh0RWxlbWVudFwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnRlbnRzQnlDb250ZXh0QnJpZGdlUmVzcG9uc2VcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIkZpbmRJbnRlbnRzQnlDb250ZXh0QnJpZGdlUmVzcG9uc2VNZXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiByJDEoXCJGaW5kSW50ZW50c0J5Q29udGV4dEJyaWRnZVJlc3BvbnNlUGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiRmluZEludGVudHNCeUNvbnRleHRBZ2VudEVycm9yUmVzcG9uc2VUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRmluZEludGVudHNCeUNvbnRleHRCcmlkZ2VSZXNwb25zZU1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImVycm9yRGV0YWlsc1wiLCBqczogXCJlcnJvckRldGFpbHNcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBhJDEociQxKFwiUmVzcG9uc2VFcnJvckRldGFpbFwiKSkpIH0sXG4gICAgICAgIHsganNvbjogXCJlcnJvclNvdXJjZXNcIiwganM6IFwiZXJyb3JTb3VyY2VzXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgYSQxKHIkMShcIkRlc2t0b3BBZ2VudElkZW50aWZpZXJcIikpKSB9LFxuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJyZXNwb25zZVV1aWRcIiwganM6IFwicmVzcG9uc2VVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwic291cmNlc1wiLCBqczogXCJzb3VyY2VzXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgYSQxKHIkMShcIkRlc2t0b3BBZ2VudElkZW50aWZpZXJcIikpKSB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJGaW5kSW50ZW50c0J5Q29udGV4dEJyaWRnZVJlc3BvbnNlUGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiYXBwSW50ZW50c1wiLCBqczogXCJhcHBJbnRlbnRzXCIsIHR5cDogYSQxKHIkMShcIkFwcEludGVudFwiKSkgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJHZXRBcHBNZXRhZGF0YUFnZW50RXJyb3JSZXNwb25zZVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiR2V0QXBwTWV0YWRhdGFBZ2VudEVycm9yUmVzcG9uc2VNZXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiByJDEoXCJHZXRBcHBNZXRhZGF0YUFnZW50RXJyb3JSZXNwb25zZVBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIkdldEFwcE1ldGFkYXRhQWdlbnRFcnJvclJlc3BvbnNlVHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkdldEFwcE1ldGFkYXRhQWdlbnRFcnJvclJlc3BvbnNlTWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJyZXNwb25zZVV1aWRcIiwganM6IFwicmVzcG9uc2VVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJHZXRBcHBNZXRhZGF0YUFnZW50RXJyb3JSZXNwb25zZVBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImVycm9yXCIsIGpzOiBcImVycm9yXCIsIHR5cDogciQxKFwiRXJyb3JNZXNzYWdlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiR2V0QXBwTWV0YWRhdGFBZ2VudFJlcXVlc3RcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIkdldEFwcE1ldGFkYXRhQWdlbnRSZXF1ZXN0TWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiR2V0QXBwTWV0YWRhdGFBZ2VudFJlcXVlc3RQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJHZXRBcHBNZXRhZGF0YUFnZW50UmVxdWVzdFR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJHZXRBcHBNZXRhZGF0YUFnZW50UmVxdWVzdE1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImRlc3RpbmF0aW9uXCIsIGpzOiBcImRlc3RpbmF0aW9uXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgciQxKFwiRGVzdGluYXRpb25PYmplY3RcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInNvdXJjZVwiLCBqczogXCJzb3VyY2VcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCByJDEoXCJTb3VyY2VJZGVudGlmaWVyXCIpKSB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJHZXRBcHBNZXRhZGF0YUFnZW50UmVxdWVzdFBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImFwcFwiLCBqczogXCJhcHBcIiwgdHlwOiByJDEoXCJBcHBEZXN0aW5hdGlvbklkZW50aWZpZXJcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJBcHBEZXN0aW5hdGlvbklkZW50aWZpZXJcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImRlc2t0b3BBZ2VudFwiLCBqczogXCJkZXNrdG9wQWdlbnRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJhcHBJZFwiLCBqczogXCJhcHBJZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcImluc3RhbmNlSWRcIiwganM6IFwiaW5zdGFuY2VJZFwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJHZXRBcHBNZXRhZGF0YUFnZW50UmVzcG9uc2VcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIkdldEFwcE1ldGFkYXRhQWdlbnRSZXNwb25zZU1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIkdldEFwcE1ldGFkYXRhQWdlbnRSZXNwb25zZVBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIkdldEFwcE1ldGFkYXRhQWdlbnRFcnJvclJlc3BvbnNlVHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkdldEFwcE1ldGFkYXRhQWdlbnRSZXNwb25zZU1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwicmVzcG9uc2VVdWlkXCIsIGpzOiBcInJlc3BvbnNlVXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiR2V0QXBwTWV0YWRhdGFBZ2VudFJlc3BvbnNlUGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiYXBwTWV0YWRhdGFcIiwganM6IFwiYXBwTWV0YWRhdGFcIiwgdHlwOiByJDEoXCJBcHBNZXRhZGF0YVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkdldEFwcE1ldGFkYXRhQnJpZGdlRXJyb3JSZXNwb25zZVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiR2V0QXBwTWV0YWRhdGFCcmlkZ2VFcnJvclJlc3BvbnNlTWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiR2V0QXBwTWV0YWRhdGFCcmlkZ2VFcnJvclJlc3BvbnNlUGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiR2V0QXBwTWV0YWRhdGFBZ2VudEVycm9yUmVzcG9uc2VUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiR2V0QXBwTWV0YWRhdGFCcmlkZ2VFcnJvclJlc3BvbnNlTWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZXJyb3JEZXRhaWxzXCIsIGpzOiBcImVycm9yRGV0YWlsc1wiLCB0eXA6IGEkMShyJDEoXCJSZXNwb25zZUVycm9yRGV0YWlsXCIpKSB9LFxuICAgICAgICB7IGpzb246IFwiZXJyb3JTb3VyY2VzXCIsIGpzOiBcImVycm9yU291cmNlc1wiLCB0eXA6IGEkMShyJDEoXCJEZXNrdG9wQWdlbnRJZGVudGlmaWVyXCIpKSB9LFxuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJyZXNwb25zZVV1aWRcIiwganM6IFwicmVzcG9uc2VVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJHZXRBcHBNZXRhZGF0YUJyaWRnZUVycm9yUmVzcG9uc2VQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJlcnJvclwiLCBqczogXCJlcnJvclwiLCB0eXA6IHIkMShcIkVycm9yTWVzc2FnZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkdldEFwcE1ldGFkYXRhQnJpZGdlUmVxdWVzdFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiR2V0QXBwTWV0YWRhdGFCcmlkZ2VSZXF1ZXN0TWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiR2V0QXBwTWV0YWRhdGFCcmlkZ2VSZXF1ZXN0UGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiR2V0QXBwTWV0YWRhdGFBZ2VudFJlcXVlc3RUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiR2V0QXBwTWV0YWRhdGFCcmlkZ2VSZXF1ZXN0TWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZGVzdGluYXRpb25cIiwganM6IFwiZGVzdGluYXRpb25cIiwgdHlwOiB1JDEodW5kZWZpbmVkLCByJDEoXCJEZXN0aW5hdGlvbk9iamVjdFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwic291cmNlXCIsIGpzOiBcInNvdXJjZVwiLCB0eXA6IHIkMShcIk1ldGFTb3VyY2VPYmplY3RcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiR2V0QXBwTWV0YWRhdGFCcmlkZ2VSZXF1ZXN0UGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiYXBwXCIsIGpzOiBcImFwcFwiLCB0eXA6IHIkMShcIkFwcERlc3RpbmF0aW9uSWRlbnRpZmllclwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkdldEFwcE1ldGFkYXRhQnJpZGdlUmVzcG9uc2VcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIkdldEFwcE1ldGFkYXRhQnJpZGdlUmVzcG9uc2VNZXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiByJDEoXCJHZXRBcHBNZXRhZGF0YUJyaWRnZVJlc3BvbnNlUGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiR2V0QXBwTWV0YWRhdGFBZ2VudEVycm9yUmVzcG9uc2VUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiR2V0QXBwTWV0YWRhdGFCcmlkZ2VSZXNwb25zZU1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImVycm9yRGV0YWlsc1wiLCBqczogXCJlcnJvckRldGFpbHNcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBhJDEociQxKFwiUmVzcG9uc2VFcnJvckRldGFpbFwiKSkpIH0sXG4gICAgICAgIHsganNvbjogXCJlcnJvclNvdXJjZXNcIiwganM6IFwiZXJyb3JTb3VyY2VzXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgYSQxKHIkMShcIkRlc2t0b3BBZ2VudElkZW50aWZpZXJcIikpKSB9LFxuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJyZXNwb25zZVV1aWRcIiwganM6IFwicmVzcG9uc2VVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwic291cmNlc1wiLCBqczogXCJzb3VyY2VzXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgYSQxKHIkMShcIkRlc2t0b3BBZ2VudElkZW50aWZpZXJcIikpKSB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJHZXRBcHBNZXRhZGF0YUJyaWRnZVJlc3BvbnNlUGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiYXBwTWV0YWRhdGFcIiwganM6IFwiYXBwTWV0YWRhdGFcIiwgdHlwOiByJDEoXCJBcHBNZXRhZGF0YVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIk9wZW5BZ2VudEVycm9yUmVzcG9uc2VcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIk9wZW5BZ2VudEVycm9yUmVzcG9uc2VNZXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiByJDEoXCJPcGVuQWdlbnRFcnJvclJlc3BvbnNlUGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiT3BlbkFnZW50RXJyb3JSZXNwb25zZVR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJPcGVuQWdlbnRFcnJvclJlc3BvbnNlTWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJyZXNwb25zZVV1aWRcIiwganM6IFwicmVzcG9uc2VVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJPcGVuQWdlbnRFcnJvclJlc3BvbnNlUGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZXJyb3JcIiwganM6IFwiZXJyb3JcIiwgdHlwOiByJDEoXCJPcGVuRXJyb3JNZXNzYWdlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiT3BlbkFnZW50UmVxdWVzdFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiT3BlbkFnZW50UmVxdWVzdE1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIk9wZW5BZ2VudFJlcXVlc3RQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJPcGVuQWdlbnRSZXF1ZXN0VHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIk9wZW5BZ2VudFJlcXVlc3RNZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJkZXN0aW5hdGlvblwiLCBqczogXCJkZXN0aW5hdGlvblwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIHIkMShcIkRlc3RpbmF0aW9uT2JqZWN0XCIpKSB9LFxuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJzb3VyY2VcIiwganM6IFwic291cmNlXCIsIHR5cDogciQxKFwiU291cmNlT2JqZWN0XCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIk9wZW5BZ2VudFJlcXVlc3RQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJhcHBcIiwganM6IFwiYXBwXCIsIHR5cDogciQxKFwiQXBwVG9PcGVuXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJjb250ZXh0XCIsIGpzOiBcImNvbnRleHRcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCByJDEoXCJDb250ZXh0RWxlbWVudFwiKSkgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJBcHBUb09wZW5cIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImRlc2t0b3BBZ2VudFwiLCBqczogXCJkZXNrdG9wQWdlbnRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJhcHBJZFwiLCBqczogXCJhcHBJZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcImluc3RhbmNlSWRcIiwganM6IFwiaW5zdGFuY2VJZFwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJPcGVuQWdlbnRSZXNwb25zZVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiT3BlbkFnZW50UmVzcG9uc2VNZXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiByJDEoXCJPcGVuQWdlbnRSZXNwb25zZVBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIk9wZW5BZ2VudEVycm9yUmVzcG9uc2VUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiT3BlbkFnZW50UmVzcG9uc2VNZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInJlc3BvbnNlVXVpZFwiLCBqczogXCJyZXNwb25zZVV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIk9wZW5BZ2VudFJlc3BvbnNlUGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiYXBwSWRlbnRpZmllclwiLCBqczogXCJhcHBJZGVudGlmaWVyXCIsIHR5cDogciQxKFwiQXBwSWRlbnRpZmllclwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIk9wZW5CcmlkZ2VFcnJvclJlc3BvbnNlXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJPcGVuQnJpZGdlRXJyb3JSZXNwb25zZU1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIk9wZW5CcmlkZ2VFcnJvclJlc3BvbnNlUGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiT3BlbkFnZW50RXJyb3JSZXNwb25zZVR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJPcGVuQnJpZGdlRXJyb3JSZXNwb25zZU1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImVycm9yRGV0YWlsc1wiLCBqczogXCJlcnJvckRldGFpbHNcIiwgdHlwOiBhJDEociQxKFwiUmVzcG9uc2VFcnJvckRldGFpbFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcImVycm9yU291cmNlc1wiLCBqczogXCJlcnJvclNvdXJjZXNcIiwgdHlwOiBhJDEociQxKFwiRGVza3RvcEFnZW50SWRlbnRpZmllclwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwicmVzcG9uc2VVdWlkXCIsIGpzOiBcInJlc3BvbnNlVXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiT3BlbkJyaWRnZUVycm9yUmVzcG9uc2VQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJlcnJvclwiLCBqczogXCJlcnJvclwiLCB0eXA6IHIkMShcIk9wZW5FcnJvck1lc3NhZ2VcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJPcGVuQnJpZGdlUmVxdWVzdFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiT3BlbkJyaWRnZVJlcXVlc3RNZXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiByJDEoXCJPcGVuQnJpZGdlUmVxdWVzdFBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIk9wZW5BZ2VudFJlcXVlc3RUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiT3BlbkJyaWRnZVJlcXVlc3RNZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJkZXN0aW5hdGlvblwiLCBqczogXCJkZXN0aW5hdGlvblwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIHIkMShcIkRlc3RpbmF0aW9uT2JqZWN0XCIpKSB9LFxuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJzb3VyY2VcIiwganM6IFwic291cmNlXCIsIHR5cDogciQxKFwiTWV0YVNvdXJjZVwiKSB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJPcGVuQnJpZGdlUmVxdWVzdFBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImFwcFwiLCBqczogXCJhcHBcIiwgdHlwOiByJDEoXCJBcHBUb09wZW5cIikgfSxcbiAgICAgICAgeyBqc29uOiBcImNvbnRleHRcIiwganM6IFwiY29udGV4dFwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIHIkMShcIkNvbnRleHRFbGVtZW50XCIpKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIk9wZW5CcmlkZ2VSZXNwb25zZVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiT3BlbkJyaWRnZVJlc3BvbnNlTWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiT3BlbkJyaWRnZVJlc3BvbnNlUGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiT3BlbkFnZW50RXJyb3JSZXNwb25zZVR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJPcGVuQnJpZGdlUmVzcG9uc2VNZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJlcnJvckRldGFpbHNcIiwganM6IFwiZXJyb3JEZXRhaWxzXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgYSQxKHIkMShcIlJlc3BvbnNlRXJyb3JEZXRhaWxcIikpKSB9LFxuICAgICAgICB7IGpzb246IFwiZXJyb3JTb3VyY2VzXCIsIGpzOiBcImVycm9yU291cmNlc1wiLCB0eXA6IHUkMSh1bmRlZmluZWQsIGEkMShyJDEoXCJEZXNrdG9wQWdlbnRJZGVudGlmaWVyXCIpKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwicmVzcG9uc2VVdWlkXCIsIGpzOiBcInJlc3BvbnNlVXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInNvdXJjZXNcIiwganM6IFwic291cmNlc1wiLCB0eXA6IHUkMSh1bmRlZmluZWQsIGEkMShyJDEoXCJEZXNrdG9wQWdlbnRJZGVudGlmaWVyXCIpKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiT3BlbkJyaWRnZVJlc3BvbnNlUGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiYXBwSWRlbnRpZmllclwiLCBqczogXCJhcHBJZGVudGlmaWVyXCIsIHR5cDogciQxKFwiQXBwSWRlbnRpZmllclwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlByaXZhdGVDaGFubmVsQnJvYWRjYXN0QWdlbnRSZXF1ZXN0XCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJQcml2YXRlQ2hhbm5lbEJyb2FkY2FzdEFnZW50UmVxdWVzdE1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIlByaXZhdGVDaGFubmVsQnJvYWRjYXN0QWdlbnRSZXF1ZXN0UGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiUHJpdmF0ZUNoYW5uZWxCcm9hZGNhc3RBZ2VudFJlcXVlc3RUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUHJpdmF0ZUNoYW5uZWxCcm9hZGNhc3RBZ2VudFJlcXVlc3RNZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJkZXN0aW5hdGlvblwiLCBqczogXCJkZXN0aW5hdGlvblwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIHIkMShcIk1ldGFEZXN0aW5hdGlvblwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwic291cmNlXCIsIGpzOiBcInNvdXJjZVwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIHIkMShcIlNvdXJjZU9iamVjdFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiTWV0YURlc3RpbmF0aW9uXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJkZXNrdG9wQWdlbnRcIiwganM6IFwiZGVza3RvcEFnZW50XCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwiYXBwSWRcIiwganM6IFwiYXBwSWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJpbnN0YW5jZUlkXCIsIGpzOiBcImluc3RhbmNlSWRcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiUHJpdmF0ZUNoYW5uZWxCcm9hZGNhc3RBZ2VudFJlcXVlc3RQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJjaGFubmVsSWRcIiwganM6IFwiY2hhbm5lbElkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwiY29udGV4dFwiLCBqczogXCJjb250ZXh0XCIsIHR5cDogciQxKFwiQ29udGV4dEVsZW1lbnRcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJQcml2YXRlQ2hhbm5lbEJyb2FkY2FzdEJyaWRnZVJlcXVlc3RcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIlByaXZhdGVDaGFubmVsQnJvYWRjYXN0QnJpZGdlUmVxdWVzdE1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIlByaXZhdGVDaGFubmVsQnJvYWRjYXN0QnJpZGdlUmVxdWVzdFBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIlByaXZhdGVDaGFubmVsQnJvYWRjYXN0QWdlbnRSZXF1ZXN0VHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlByaXZhdGVDaGFubmVsQnJvYWRjYXN0QnJpZGdlUmVxdWVzdE1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImRlc3RpbmF0aW9uXCIsIGpzOiBcImRlc3RpbmF0aW9uXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgciQxKFwiTWV0YURlc3RpbmF0aW9uXCIpKSB9LFxuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJzb3VyY2VcIiwganM6IFwic291cmNlXCIsIHR5cDogciQxKFwiTWV0YVNvdXJjZVwiKSB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJQcml2YXRlQ2hhbm5lbEJyb2FkY2FzdEJyaWRnZVJlcXVlc3RQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJjaGFubmVsSWRcIiwganM6IFwiY2hhbm5lbElkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwiY29udGV4dFwiLCBqczogXCJjb250ZXh0XCIsIHR5cDogciQxKFwiQ29udGV4dEVsZW1lbnRcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJQcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJBZGRlZEFnZW50UmVxdWVzdFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiUHJpdmF0ZUNoYW5uZWxFdmVudExpc3RlbmVyQWRkZWRBZ2VudFJlcXVlc3RNZXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiByJDEoXCJQcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJBZGRlZEFnZW50UmVxdWVzdFBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIlByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lckFkZGVkQWdlbnRSZXF1ZXN0VHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lckFkZGVkQWdlbnRSZXF1ZXN0TWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZGVzdGluYXRpb25cIiwganM6IFwiZGVzdGluYXRpb25cIiwgdHlwOiB1JDEodW5kZWZpbmVkLCByJDEoXCJNZXRhRGVzdGluYXRpb25cIikpIH0sXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInNvdXJjZVwiLCBqczogXCJzb3VyY2VcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCByJDEoXCJTb3VyY2VPYmplY3RcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lckFkZGVkQWdlbnRSZXF1ZXN0UGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiY2hhbm5lbElkXCIsIGpzOiBcImNoYW5uZWxJZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcImxpc3RlbmVyVHlwZVwiLCBqczogXCJsaXN0ZW5lclR5cGVcIiwgdHlwOiByJDEoXCJQcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJUeXBlc1wiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lckFkZGVkQnJpZGdlUmVxdWVzdFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiUHJpdmF0ZUNoYW5uZWxFdmVudExpc3RlbmVyQWRkZWRCcmlkZ2VSZXF1ZXN0TWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiUHJpdmF0ZUNoYW5uZWxFdmVudExpc3RlbmVyQWRkZWRCcmlkZ2VSZXF1ZXN0UGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiUHJpdmF0ZUNoYW5uZWxFdmVudExpc3RlbmVyQWRkZWRBZ2VudFJlcXVlc3RUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUHJpdmF0ZUNoYW5uZWxFdmVudExpc3RlbmVyQWRkZWRCcmlkZ2VSZXF1ZXN0TWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZGVzdGluYXRpb25cIiwganM6IFwiZGVzdGluYXRpb25cIiwgdHlwOiB1JDEodW5kZWZpbmVkLCByJDEoXCJNZXRhRGVzdGluYXRpb25cIikpIH0sXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInNvdXJjZVwiLCBqczogXCJzb3VyY2VcIiwgdHlwOiByJDEoXCJNZXRhU291cmNlXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lckFkZGVkQnJpZGdlUmVxdWVzdFBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImNoYW5uZWxJZFwiLCBqczogXCJjaGFubmVsSWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJsaXN0ZW5lclR5cGVcIiwganM6IFwibGlzdGVuZXJUeXBlXCIsIHR5cDogciQxKFwiUHJpdmF0ZUNoYW5uZWxFdmVudExpc3RlbmVyVHlwZXNcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJQcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJSZW1vdmVkQWdlbnRSZXF1ZXN0XCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJQcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJSZW1vdmVkQWdlbnRSZXF1ZXN0TWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiUHJpdmF0ZUNoYW5uZWxFdmVudExpc3RlbmVyUmVtb3ZlZEFnZW50UmVxdWVzdFBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIlByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lclJlbW92ZWRBZ2VudFJlcXVlc3RUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUHJpdmF0ZUNoYW5uZWxFdmVudExpc3RlbmVyUmVtb3ZlZEFnZW50UmVxdWVzdE1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImRlc3RpbmF0aW9uXCIsIGpzOiBcImRlc3RpbmF0aW9uXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgciQxKFwiTWV0YURlc3RpbmF0aW9uXCIpKSB9LFxuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJzb3VyY2VcIiwganM6IFwic291cmNlXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgciQxKFwiU291cmNlT2JqZWN0XCIpKSB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJQcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJSZW1vdmVkQWdlbnRSZXF1ZXN0UGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiY2hhbm5lbElkXCIsIGpzOiBcImNoYW5uZWxJZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcImxpc3RlbmVyVHlwZVwiLCBqczogXCJsaXN0ZW5lclR5cGVcIiwgdHlwOiByJDEoXCJQcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJUeXBlc1wiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lclJlbW92ZWRCcmlkZ2VSZXF1ZXN0XCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJQcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJSZW1vdmVkQnJpZGdlUmVxdWVzdE1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIlByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lclJlbW92ZWRCcmlkZ2VSZXF1ZXN0UGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiUHJpdmF0ZUNoYW5uZWxFdmVudExpc3RlbmVyUmVtb3ZlZEFnZW50UmVxdWVzdFR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJQcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJSZW1vdmVkQnJpZGdlUmVxdWVzdE1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImRlc3RpbmF0aW9uXCIsIGpzOiBcImRlc3RpbmF0aW9uXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgciQxKFwiTWV0YURlc3RpbmF0aW9uXCIpKSB9LFxuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJzb3VyY2VcIiwganM6IFwic291cmNlXCIsIHR5cDogciQxKFwiTWV0YVNvdXJjZVwiKSB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJQcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJSZW1vdmVkQnJpZGdlUmVxdWVzdFBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImNoYW5uZWxJZFwiLCBqczogXCJjaGFubmVsSWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJsaXN0ZW5lclR5cGVcIiwganM6IFwibGlzdGVuZXJUeXBlXCIsIHR5cDogciQxKFwiUHJpdmF0ZUNoYW5uZWxFdmVudExpc3RlbmVyVHlwZXNcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJQcml2YXRlQ2hhbm5lbE9uQWRkQ29udGV4dExpc3RlbmVyQWdlbnRSZXF1ZXN0XCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJQcml2YXRlQ2hhbm5lbE9uQWRkQ29udGV4dExpc3RlbmVyQWdlbnRSZXF1ZXN0TWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiUHJpdmF0ZUNoYW5uZWxPbkFkZENvbnRleHRMaXN0ZW5lckFnZW50UmVxdWVzdFBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIlByaXZhdGVDaGFubmVsT25BZGRDb250ZXh0TGlzdGVuZXJBZ2VudFJlcXVlc3RUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUHJpdmF0ZUNoYW5uZWxPbkFkZENvbnRleHRMaXN0ZW5lckFnZW50UmVxdWVzdE1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImRlc3RpbmF0aW9uXCIsIGpzOiBcImRlc3RpbmF0aW9uXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgciQxKFwiTWV0YURlc3RpbmF0aW9uXCIpKSB9LFxuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJzb3VyY2VcIiwganM6IFwic291cmNlXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgciQxKFwiU291cmNlT2JqZWN0XCIpKSB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJQcml2YXRlQ2hhbm5lbE9uQWRkQ29udGV4dExpc3RlbmVyQWdlbnRSZXF1ZXN0UGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiY2hhbm5lbElkXCIsIGpzOiBcImNoYW5uZWxJZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcImNvbnRleHRUeXBlXCIsIGpzOiBcImNvbnRleHRUeXBlXCIsIHR5cDogdSQxKG51bGwsIFwiXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUHJpdmF0ZUNoYW5uZWxPbkFkZENvbnRleHRMaXN0ZW5lckJyaWRnZVJlcXVlc3RcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIlByaXZhdGVDaGFubmVsT25BZGRDb250ZXh0TGlzdGVuZXJCcmlkZ2VSZXF1ZXN0TWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiUHJpdmF0ZUNoYW5uZWxPbkFkZENvbnRleHRMaXN0ZW5lckJyaWRnZVJlcXVlc3RQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJQcml2YXRlQ2hhbm5lbE9uQWRkQ29udGV4dExpc3RlbmVyQWdlbnRSZXF1ZXN0VHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlByaXZhdGVDaGFubmVsT25BZGRDb250ZXh0TGlzdGVuZXJCcmlkZ2VSZXF1ZXN0TWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZGVzdGluYXRpb25cIiwganM6IFwiZGVzdGluYXRpb25cIiwgdHlwOiB1JDEodW5kZWZpbmVkLCByJDEoXCJNZXRhRGVzdGluYXRpb25cIikpIH0sXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInNvdXJjZVwiLCBqczogXCJzb3VyY2VcIiwgdHlwOiByJDEoXCJNZXRhU291cmNlXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlByaXZhdGVDaGFubmVsT25BZGRDb250ZXh0TGlzdGVuZXJCcmlkZ2VSZXF1ZXN0UGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiY2hhbm5lbElkXCIsIGpzOiBcImNoYW5uZWxJZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcImNvbnRleHRUeXBlXCIsIGpzOiBcImNvbnRleHRUeXBlXCIsIHR5cDogdSQxKG51bGwsIFwiXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUHJpdmF0ZUNoYW5uZWxPbkRpc2Nvbm5lY3RBZ2VudFJlcXVlc3RcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIlByaXZhdGVDaGFubmVsT25EaXNjb25uZWN0QWdlbnRSZXF1ZXN0TWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiUHJpdmF0ZUNoYW5uZWxPbkRpc2Nvbm5lY3RBZ2VudFJlcXVlc3RQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJQcml2YXRlQ2hhbm5lbE9uRGlzY29ubmVjdEFnZW50UmVxdWVzdFR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJQcml2YXRlQ2hhbm5lbE9uRGlzY29ubmVjdEFnZW50UmVxdWVzdE1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImRlc3RpbmF0aW9uXCIsIGpzOiBcImRlc3RpbmF0aW9uXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgciQxKFwiTWV0YURlc3RpbmF0aW9uXCIpKSB9LFxuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJzb3VyY2VcIiwganM6IFwic291cmNlXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgciQxKFwiU291cmNlT2JqZWN0XCIpKSB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJQcml2YXRlQ2hhbm5lbE9uRGlzY29ubmVjdEFnZW50UmVxdWVzdFBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImNoYW5uZWxJZFwiLCBqczogXCJjaGFubmVsSWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUHJpdmF0ZUNoYW5uZWxPbkRpc2Nvbm5lY3RCcmlkZ2VSZXF1ZXN0XCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJQcml2YXRlQ2hhbm5lbE9uRGlzY29ubmVjdEJyaWRnZVJlcXVlc3RNZXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiByJDEoXCJQcml2YXRlQ2hhbm5lbE9uRGlzY29ubmVjdEJyaWRnZVJlcXVlc3RQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJQcml2YXRlQ2hhbm5lbE9uRGlzY29ubmVjdEFnZW50UmVxdWVzdFR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJQcml2YXRlQ2hhbm5lbE9uRGlzY29ubmVjdEJyaWRnZVJlcXVlc3RNZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJkZXN0aW5hdGlvblwiLCBqczogXCJkZXN0aW5hdGlvblwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIHIkMShcIk1ldGFEZXN0aW5hdGlvblwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwic291cmNlXCIsIGpzOiBcInNvdXJjZVwiLCB0eXA6IHIkMShcIk1ldGFTb3VyY2VcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUHJpdmF0ZUNoYW5uZWxPbkRpc2Nvbm5lY3RCcmlkZ2VSZXF1ZXN0UGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiY2hhbm5lbElkXCIsIGpzOiBcImNoYW5uZWxJZFwiLCB0eXA6IFwiXCIgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJQcml2YXRlQ2hhbm5lbE9uVW5zdWJzY3JpYmVBZ2VudFJlcXVlc3RcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIlByaXZhdGVDaGFubmVsT25VbnN1YnNjcmliZUFnZW50UmVxdWVzdE1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIlByaXZhdGVDaGFubmVsT25VbnN1YnNjcmliZUFnZW50UmVxdWVzdFBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIlByaXZhdGVDaGFubmVsT25VbnN1YnNjcmliZUFnZW50UmVxdWVzdFR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJQcml2YXRlQ2hhbm5lbE9uVW5zdWJzY3JpYmVBZ2VudFJlcXVlc3RNZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJkZXN0aW5hdGlvblwiLCBqczogXCJkZXN0aW5hdGlvblwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIHIkMShcIk1ldGFEZXN0aW5hdGlvblwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwic291cmNlXCIsIGpzOiBcInNvdXJjZVwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIHIkMShcIlNvdXJjZU9iamVjdFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUHJpdmF0ZUNoYW5uZWxPblVuc3Vic2NyaWJlQWdlbnRSZXF1ZXN0UGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiY2hhbm5lbElkXCIsIGpzOiBcImNoYW5uZWxJZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcImNvbnRleHRUeXBlXCIsIGpzOiBcImNvbnRleHRUeXBlXCIsIHR5cDogdSQxKG51bGwsIFwiXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUHJpdmF0ZUNoYW5uZWxPblVuc3Vic2NyaWJlQnJpZGdlUmVxdWVzdFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiRVJlcXVlc3RNZXRhZGF0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiUHJpdmF0ZUNoYW5uZWxPblVuc3Vic2NyaWJlQnJpZGdlUmVxdWVzdFBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIlByaXZhdGVDaGFubmVsT25VbnN1YnNjcmliZUFnZW50UmVxdWVzdFR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJFUmVxdWVzdE1ldGFkYXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJkZXN0aW5hdGlvblwiLCBqczogXCJkZXN0aW5hdGlvblwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIHIkMShcIk1ldGFEZXN0aW5hdGlvblwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwic291cmNlXCIsIGpzOiBcInNvdXJjZVwiLCB0eXA6IHIkMShcIk1ldGFTb3VyY2VcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUHJpdmF0ZUNoYW5uZWxPblVuc3Vic2NyaWJlQnJpZGdlUmVxdWVzdFBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImNoYW5uZWxJZFwiLCBqczogXCJjaGFubmVsSWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJjb250ZXh0VHlwZVwiLCBqczogXCJjb250ZXh0VHlwZVwiLCB0eXA6IHUkMShudWxsLCBcIlwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlJhaXNlSW50ZW50QWdlbnRFcnJvclJlc3BvbnNlXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJSYWlzZUludGVudEFnZW50RXJyb3JSZXNwb25zZU1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIlJhaXNlSW50ZW50QWdlbnRFcnJvclJlc3BvbnNlUGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiUmFpc2VJbnRlbnRBZ2VudEVycm9yUmVzcG9uc2VUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUmFpc2VJbnRlbnRBZ2VudEVycm9yUmVzcG9uc2VNZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInJlc3BvbnNlVXVpZFwiLCBqczogXCJyZXNwb25zZVV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlJhaXNlSW50ZW50QWdlbnRFcnJvclJlc3BvbnNlUGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZXJyb3JcIiwganM6IFwiZXJyb3JcIiwgdHlwOiByJDEoXCJFcnJvck1lc3NhZ2VcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJSYWlzZUludGVudEFnZW50UmVxdWVzdFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiUmFpc2VJbnRlbnRBZ2VudFJlcXVlc3RNZXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiByJDEoXCJSYWlzZUludGVudEFnZW50UmVxdWVzdFBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIlJhaXNlSW50ZW50QWdlbnRSZXF1ZXN0VHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlJhaXNlSW50ZW50QWdlbnRSZXF1ZXN0TWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZGVzdGluYXRpb25cIiwganM6IFwiZGVzdGluYXRpb25cIiwgdHlwOiByJDEoXCJNZXRhRGVzdGluYXRpb25cIikgfSxcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwic291cmNlXCIsIGpzOiBcInNvdXJjZVwiLCB0eXA6IHIkMShcIlNvdXJjZU9iamVjdFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJSYWlzZUludGVudEFnZW50UmVxdWVzdFBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImFwcFwiLCBqczogXCJhcHBcIiwgdHlwOiByJDEoXCJBcHBEZXN0aW5hdGlvbklkZW50aWZpZXJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcImNvbnRleHRcIiwganM6IFwiY29udGV4dFwiLCB0eXA6IHIkMShcIkNvbnRleHRFbGVtZW50XCIpIH0sXG4gICAgICAgIHsganNvbjogXCJpbnRlbnRcIiwganM6IFwiaW50ZW50XCIsIHR5cDogXCJcIiB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlJhaXNlSW50ZW50QWdlbnRSZXNwb25zZVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiUmFpc2VJbnRlbnRBZ2VudFJlc3BvbnNlTWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiUmFpc2VJbnRlbnRBZ2VudFJlc3BvbnNlUGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiUmFpc2VJbnRlbnRBZ2VudEVycm9yUmVzcG9uc2VUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUmFpc2VJbnRlbnRBZ2VudFJlc3BvbnNlTWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJyZXNwb25zZVV1aWRcIiwganM6IFwicmVzcG9uc2VVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJSYWlzZUludGVudEFnZW50UmVzcG9uc2VQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJpbnRlbnRSZXNvbHV0aW9uXCIsIGpzOiBcImludGVudFJlc29sdXRpb25cIiwgdHlwOiByJDEoXCJJbnRlbnRSZXNvbHV0aW9uXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiSW50ZW50UmVzb2x1dGlvblwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiaW50ZW50XCIsIGpzOiBcImludGVudFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInNvdXJjZVwiLCBqczogXCJzb3VyY2VcIiwgdHlwOiByJDEoXCJBcHBJZGVudGlmaWVyXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ2ZXJzaW9uXCIsIGpzOiBcInZlcnNpb25cIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlJhaXNlSW50ZW50QnJpZGdlRXJyb3JSZXNwb25zZVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiUmFpc2VJbnRlbnRCcmlkZ2VFcnJvclJlc3BvbnNlTWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiUmFpc2VJbnRlbnRCcmlkZ2VFcnJvclJlc3BvbnNlUGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiUmFpc2VJbnRlbnRBZ2VudEVycm9yUmVzcG9uc2VUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUmFpc2VJbnRlbnRCcmlkZ2VFcnJvclJlc3BvbnNlTWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZXJyb3JEZXRhaWxzXCIsIGpzOiBcImVycm9yRGV0YWlsc1wiLCB0eXA6IGEkMShyJDEoXCJSZXNwb25zZUVycm9yRGV0YWlsXCIpKSB9LFxuICAgICAgICB7IGpzb246IFwiZXJyb3JTb3VyY2VzXCIsIGpzOiBcImVycm9yU291cmNlc1wiLCB0eXA6IGEkMShyJDEoXCJEZXNrdG9wQWdlbnRJZGVudGlmaWVyXCIpKSB9LFxuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJyZXNwb25zZVV1aWRcIiwganM6IFwicmVzcG9uc2VVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJSYWlzZUludGVudEJyaWRnZUVycm9yUmVzcG9uc2VQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJlcnJvclwiLCBqczogXCJlcnJvclwiLCB0eXA6IHIkMShcIkVycm9yTWVzc2FnZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlJhaXNlSW50ZW50QnJpZGdlUmVxdWVzdFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiUmFpc2VJbnRlbnRCcmlkZ2VSZXF1ZXN0TWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiUmFpc2VJbnRlbnRCcmlkZ2VSZXF1ZXN0UGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiUmFpc2VJbnRlbnRBZ2VudFJlcXVlc3RUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUmFpc2VJbnRlbnRCcmlkZ2VSZXF1ZXN0TWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZGVzdGluYXRpb25cIiwganM6IFwiZGVzdGluYXRpb25cIiwgdHlwOiByJDEoXCJNZXRhRGVzdGluYXRpb25cIikgfSxcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwic291cmNlXCIsIGpzOiBcInNvdXJjZVwiLCB0eXA6IHIkMShcIk1ldGFTb3VyY2VcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUmFpc2VJbnRlbnRCcmlkZ2VSZXF1ZXN0UGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiYXBwXCIsIGpzOiBcImFwcFwiLCB0eXA6IHIkMShcIkFwcERlc3RpbmF0aW9uSWRlbnRpZmllclwiKSB9LFxuICAgICAgICB7IGpzb246IFwiY29udGV4dFwiLCBqczogXCJjb250ZXh0XCIsIHR5cDogciQxKFwiQ29udGV4dEVsZW1lbnRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcImludGVudFwiLCBqczogXCJpbnRlbnRcIiwgdHlwOiBcIlwiIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUmFpc2VJbnRlbnRCcmlkZ2VSZXNwb25zZVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiUmFpc2VJbnRlbnRCcmlkZ2VSZXNwb25zZU1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIlJhaXNlSW50ZW50QnJpZGdlUmVzcG9uc2VQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJSYWlzZUludGVudEFnZW50RXJyb3JSZXNwb25zZVR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJSYWlzZUludGVudEJyaWRnZVJlc3BvbnNlTWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZXJyb3JEZXRhaWxzXCIsIGpzOiBcImVycm9yRGV0YWlsc1wiLCB0eXA6IHUkMSh1bmRlZmluZWQsIGEkMShyJDEoXCJSZXNwb25zZUVycm9yRGV0YWlsXCIpKSkgfSxcbiAgICAgICAgeyBqc29uOiBcImVycm9yU291cmNlc1wiLCBqczogXCJlcnJvclNvdXJjZXNcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBhJDEociQxKFwiRGVza3RvcEFnZW50SWRlbnRpZmllclwiKSkpIH0sXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInJlc3BvbnNlVXVpZFwiLCBqczogXCJyZXNwb25zZVV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJzb3VyY2VzXCIsIGpzOiBcInNvdXJjZXNcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBhJDEociQxKFwiRGVza3RvcEFnZW50SWRlbnRpZmllclwiKSkpIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlJhaXNlSW50ZW50QnJpZGdlUmVzcG9uc2VQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJpbnRlbnRSZXNvbHV0aW9uXCIsIGpzOiBcImludGVudFJlc29sdXRpb25cIiwgdHlwOiByJDEoXCJJbnRlbnRSZXNvbHV0aW9uXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUmFpc2VJbnRlbnRSZXN1bHRBZ2VudEVycm9yUmVzcG9uc2VcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIlJhaXNlSW50ZW50UmVzdWx0QWdlbnRFcnJvclJlc3BvbnNlTWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiUmFpc2VJbnRlbnRSZXN1bHRBZ2VudEVycm9yUmVzcG9uc2VQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJSYWlzZUludGVudFJlc3VsdEFnZW50RXJyb3JSZXNwb25zZVR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJSYWlzZUludGVudFJlc3VsdEFnZW50RXJyb3JSZXNwb25zZU1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwicmVzcG9uc2VVdWlkXCIsIGpzOiBcInJlc3BvbnNlVXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUmFpc2VJbnRlbnRSZXN1bHRBZ2VudEVycm9yUmVzcG9uc2VQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJlcnJvclwiLCBqczogXCJlcnJvclwiLCB0eXA6IHIkMShcIlJhaXNlSW50ZW50UmVzdWx0RXJyb3JNZXNzYWdlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUmFpc2VJbnRlbnRSZXN1bHRBZ2VudFJlc3BvbnNlXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJSYWlzZUludGVudFJlc3VsdEFnZW50UmVzcG9uc2VNZXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiByJDEoXCJSYWlzZUludGVudFJlc3VsdEFnZW50UmVzcG9uc2VQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJSYWlzZUludGVudFJlc3VsdEFnZW50RXJyb3JSZXNwb25zZVR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJSYWlzZUludGVudFJlc3VsdEFnZW50UmVzcG9uc2VNZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInJlc3BvbnNlVXVpZFwiLCBqczogXCJyZXNwb25zZVV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlJhaXNlSW50ZW50UmVzdWx0QWdlbnRSZXNwb25zZVBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImludGVudFJlc3VsdFwiLCBqczogXCJpbnRlbnRSZXN1bHRcIiwgdHlwOiByJDEoXCJJbnRlbnRSZXN1bHRcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJJbnRlbnRSZXN1bHRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImNvbnRleHRcIiwganM6IFwiY29udGV4dFwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIHIkMShcIkNvbnRleHRFbGVtZW50XCIpKSB9LFxuICAgICAgICB7IGpzb246IFwiY2hhbm5lbFwiLCBqczogXCJjaGFubmVsXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgciQxKFwiQ2hhbm5lbFwiKSkgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJDaGFubmVsXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJkaXNwbGF5TWV0YWRhdGFcIiwganM6IFwiZGlzcGxheU1ldGFkYXRhXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgciQxKFwiRGlzcGxheU1ldGFkYXRhXCIpKSB9LFxuICAgICAgICB7IGpzb246IFwiaWRcIiwganM6IFwiaWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRGlzcGxheU1ldGFkYXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJjb2xvclwiLCBqczogXCJjb2xvclwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJnbHlwaFwiLCBqczogXCJnbHlwaFwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlJhaXNlSW50ZW50UmVzdWx0QnJpZGdlRXJyb3JSZXNwb25zZVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiUmFpc2VJbnRlbnRSZXN1bHRCcmlkZ2VFcnJvclJlc3BvbnNlTWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiUmFpc2VJbnRlbnRSZXN1bHRCcmlkZ2VFcnJvclJlc3BvbnNlUGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiUmFpc2VJbnRlbnRSZXN1bHRBZ2VudEVycm9yUmVzcG9uc2VUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUmFpc2VJbnRlbnRSZXN1bHRCcmlkZ2VFcnJvclJlc3BvbnNlTWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZXJyb3JEZXRhaWxzXCIsIGpzOiBcImVycm9yRGV0YWlsc1wiLCB0eXA6IGEkMShyJDEoXCJSZXNwb25zZUVycm9yRGV0YWlsXCIpKSB9LFxuICAgICAgICB7IGpzb246IFwiZXJyb3JTb3VyY2VzXCIsIGpzOiBcImVycm9yU291cmNlc1wiLCB0eXA6IGEkMShyJDEoXCJEZXNrdG9wQWdlbnRJZGVudGlmaWVyXCIpKSB9LFxuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJyZXNwb25zZVV1aWRcIiwganM6IFwicmVzcG9uc2VVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJSYWlzZUludGVudFJlc3VsdEJyaWRnZUVycm9yUmVzcG9uc2VQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJlcnJvclwiLCBqczogXCJlcnJvclwiLCB0eXA6IHIkMShcIlJhaXNlSW50ZW50UmVzdWx0RXJyb3JNZXNzYWdlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUmFpc2VJbnRlbnRSZXN1bHRCcmlkZ2VSZXNwb25zZVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiUmFpc2VJbnRlbnRSZXN1bHRCcmlkZ2VSZXNwb25zZU1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIlJhaXNlSW50ZW50UmVzdWx0QnJpZGdlUmVzcG9uc2VQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJSYWlzZUludGVudFJlc3VsdEFnZW50RXJyb3JSZXNwb25zZVR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJSYWlzZUludGVudFJlc3VsdEJyaWRnZVJlc3BvbnNlTWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZXJyb3JEZXRhaWxzXCIsIGpzOiBcImVycm9yRGV0YWlsc1wiLCB0eXA6IHUkMSh1bmRlZmluZWQsIGEkMShyJDEoXCJSZXNwb25zZUVycm9yRGV0YWlsXCIpKSkgfSxcbiAgICAgICAgeyBqc29uOiBcImVycm9yU291cmNlc1wiLCBqczogXCJlcnJvclNvdXJjZXNcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBhJDEociQxKFwiRGVza3RvcEFnZW50SWRlbnRpZmllclwiKSkpIH0sXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInJlc3BvbnNlVXVpZFwiLCBqczogXCJyZXNwb25zZVV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJzb3VyY2VzXCIsIGpzOiBcInNvdXJjZXNcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBhJDEociQxKFwiRGVza3RvcEFnZW50SWRlbnRpZmllclwiKSkpIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlJhaXNlSW50ZW50UmVzdWx0QnJpZGdlUmVzcG9uc2VQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJpbnRlbnRSZXN1bHRcIiwganM6IFwiaW50ZW50UmVzdWx0XCIsIHR5cDogciQxKFwiSW50ZW50UmVzdWx0XCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiQ29udGV4dFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiaWRcIiwganM6IFwiaWRcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBtJDEoXCJhbnlcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogXCJcIiB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiUmVzcG9uc2VFcnJvckRldGFpbFwiOiBbXG4gICAgICAgIFwiQWNjZXNzRGVuaWVkXCIsXG4gICAgICAgIFwiQWdlbnREaXNjb25uZWN0ZWRcIixcbiAgICAgICAgXCJBcHBOb3RGb3VuZFwiLFxuICAgICAgICBcIkFwcFRpbWVvdXRcIixcbiAgICAgICAgXCJDcmVhdGlvbkZhaWxlZFwiLFxuICAgICAgICBcIkRlc2t0b3BBZ2VudE5vdEZvdW5kXCIsXG4gICAgICAgIFwiRXJyb3JPbkxhdW5jaFwiLFxuICAgICAgICBcIkludGVudERlbGl2ZXJ5RmFpbGVkXCIsXG4gICAgICAgIFwiSW50ZW50SGFuZGxlclJlamVjdGVkXCIsXG4gICAgICAgIFwiTWFsZm9ybWVkQ29udGV4dFwiLFxuICAgICAgICBcIk1hbGZvcm1lZE1lc3NhZ2VcIixcbiAgICAgICAgXCJOb0FwcHNGb3VuZFwiLFxuICAgICAgICBcIk5vQ2hhbm5lbEZvdW5kXCIsXG4gICAgICAgIFwiTm9SZXN1bHRSZXR1cm5lZFwiLFxuICAgICAgICBcIk5vdENvbm5lY3RlZFRvQnJpZGdlXCIsXG4gICAgICAgIFwiUmVzb2x2ZXJUaW1lb3V0XCIsXG4gICAgICAgIFwiUmVzb2x2ZXJVbmF2YWlsYWJsZVwiLFxuICAgICAgICBcIlJlc3BvbnNlVG9CcmlkZ2VUaW1lZE91dFwiLFxuICAgICAgICBcIlRhcmdldEFwcFVuYXZhaWxhYmxlXCIsXG4gICAgICAgIFwiVGFyZ2V0SW5zdGFuY2VVbmF2YWlsYWJsZVwiLFxuICAgICAgICBcIlVzZXJDYW5jZWxsZWRSZXNvbHV0aW9uXCIsXG4gICAgXSxcbiAgICBcIlJlc3BvbnNlTWVzc2FnZVR5cGVcIjogW1xuICAgICAgICBcImZpbmRJbnN0YW5jZXNSZXNwb25zZVwiLFxuICAgICAgICBcImZpbmRJbnRlbnRSZXNwb25zZVwiLFxuICAgICAgICBcImZpbmRJbnRlbnRzQnlDb250ZXh0UmVzcG9uc2VcIixcbiAgICAgICAgXCJnZXRBcHBNZXRhZGF0YVJlc3BvbnNlXCIsXG4gICAgICAgIFwib3BlblJlc3BvbnNlXCIsXG4gICAgICAgIFwicmFpc2VJbnRlbnRSZXNwb25zZVwiLFxuICAgICAgICBcInJhaXNlSW50ZW50UmVzdWx0UmVzcG9uc2VcIixcbiAgICBdLFxuICAgIFwiUmVxdWVzdE1lc3NhZ2VUeXBlXCI6IFtcbiAgICAgICAgXCJicm9hZGNhc3RSZXF1ZXN0XCIsXG4gICAgICAgIFwiZmluZEluc3RhbmNlc1JlcXVlc3RcIixcbiAgICAgICAgXCJmaW5kSW50ZW50UmVxdWVzdFwiLFxuICAgICAgICBcImZpbmRJbnRlbnRzQnlDb250ZXh0UmVxdWVzdFwiLFxuICAgICAgICBcImdldEFwcE1ldGFkYXRhUmVxdWVzdFwiLFxuICAgICAgICBcIm9wZW5SZXF1ZXN0XCIsXG4gICAgICAgIFwiUHJpdmF0ZUNoYW5uZWwuYnJvYWRjYXN0XCIsXG4gICAgICAgIFwiUHJpdmF0ZUNoYW5uZWwuZXZlbnRMaXN0ZW5lckFkZGVkXCIsXG4gICAgICAgIFwiUHJpdmF0ZUNoYW5uZWwuZXZlbnRMaXN0ZW5lclJlbW92ZWRcIixcbiAgICAgICAgXCJQcml2YXRlQ2hhbm5lbC5vbkFkZENvbnRleHRMaXN0ZW5lclwiLFxuICAgICAgICBcIlByaXZhdGVDaGFubmVsLm9uRGlzY29ubmVjdFwiLFxuICAgICAgICBcIlByaXZhdGVDaGFubmVsLm9uVW5zdWJzY3JpYmVcIixcbiAgICAgICAgXCJyYWlzZUludGVudFJlcXVlc3RcIixcbiAgICBdLFxuICAgIFwiQnJvYWRjYXN0QWdlbnRSZXF1ZXN0VHlwZVwiOiBbXG4gICAgICAgIFwiYnJvYWRjYXN0UmVxdWVzdFwiLFxuICAgIF0sXG4gICAgXCJDb25uZWN0aW9uU3RlcE1lc3NhZ2VUeXBlXCI6IFtcbiAgICAgICAgXCJhdXRoZW50aWNhdGlvbkZhaWxlZFwiLFxuICAgICAgICBcImNvbm5lY3RlZEFnZW50c1VwZGF0ZVwiLFxuICAgICAgICBcImhhbmRzaGFrZVwiLFxuICAgICAgICBcImhlbGxvXCIsXG4gICAgXSxcbiAgICBcIkNvbm5lY3Rpb25TdGVwMkhlbGxvVHlwZVwiOiBbXG4gICAgICAgIFwiaGVsbG9cIixcbiAgICBdLFxuICAgIFwiQ29ubmVjdGlvblN0ZXAzSGFuZHNoYWtlVHlwZVwiOiBbXG4gICAgICAgIFwiaGFuZHNoYWtlXCIsXG4gICAgXSxcbiAgICBcIkNvbm5lY3Rpb25TdGVwNEF1dGhlbnRpY2F0aW9uRmFpbGVkVHlwZVwiOiBbXG4gICAgICAgIFwiYXV0aGVudGljYXRpb25GYWlsZWRcIixcbiAgICBdLFxuICAgIFwiQ29ubmVjdGlvblN0ZXA2Q29ubmVjdGVkQWdlbnRzVXBkYXRlVHlwZVwiOiBbXG4gICAgICAgIFwiY29ubmVjdGVkQWdlbnRzVXBkYXRlXCIsXG4gICAgXSxcbiAgICBcIkVycm9yTWVzc2FnZVwiOiBbXG4gICAgICAgIFwiQWdlbnREaXNjb25uZWN0ZWRcIixcbiAgICAgICAgXCJEZXNrdG9wQWdlbnROb3RGb3VuZFwiLFxuICAgICAgICBcIkludGVudERlbGl2ZXJ5RmFpbGVkXCIsXG4gICAgICAgIFwiTWFsZm9ybWVkQ29udGV4dFwiLFxuICAgICAgICBcIk1hbGZvcm1lZE1lc3NhZ2VcIixcbiAgICAgICAgXCJOb0FwcHNGb3VuZFwiLFxuICAgICAgICBcIk5vdENvbm5lY3RlZFRvQnJpZGdlXCIsXG4gICAgICAgIFwiUmVzb2x2ZXJUaW1lb3V0XCIsXG4gICAgICAgIFwiUmVzb2x2ZXJVbmF2YWlsYWJsZVwiLFxuICAgICAgICBcIlJlc3BvbnNlVG9CcmlkZ2VUaW1lZE91dFwiLFxuICAgICAgICBcIlRhcmdldEFwcFVuYXZhaWxhYmxlXCIsXG4gICAgICAgIFwiVGFyZ2V0SW5zdGFuY2VVbmF2YWlsYWJsZVwiLFxuICAgICAgICBcIlVzZXJDYW5jZWxsZWRSZXNvbHV0aW9uXCIsXG4gICAgXSxcbiAgICBcIkZpbmRJbnN0YW5jZXNBZ2VudEVycm9yUmVzcG9uc2VUeXBlXCI6IFtcbiAgICAgICAgXCJmaW5kSW5zdGFuY2VzUmVzcG9uc2VcIixcbiAgICBdLFxuICAgIFwiRmluZEluc3RhbmNlc0FnZW50UmVxdWVzdFR5cGVcIjogW1xuICAgICAgICBcImZpbmRJbnN0YW5jZXNSZXF1ZXN0XCIsXG4gICAgXSxcbiAgICBcIkZpbmRJbnRlbnRBZ2VudEVycm9yUmVzcG9uc2VUeXBlXCI6IFtcbiAgICAgICAgXCJmaW5kSW50ZW50UmVzcG9uc2VcIixcbiAgICBdLFxuICAgIFwiRmluZEludGVudEFnZW50UmVxdWVzdFR5cGVcIjogW1xuICAgICAgICBcImZpbmRJbnRlbnRSZXF1ZXN0XCIsXG4gICAgXSxcbiAgICBcIkZpbmRJbnRlbnRzQnlDb250ZXh0QWdlbnRFcnJvclJlc3BvbnNlVHlwZVwiOiBbXG4gICAgICAgIFwiZmluZEludGVudHNCeUNvbnRleHRSZXNwb25zZVwiLFxuICAgIF0sXG4gICAgXCJGaW5kSW50ZW50c0J5Q29udGV4dEFnZW50UmVxdWVzdFR5cGVcIjogW1xuICAgICAgICBcImZpbmRJbnRlbnRzQnlDb250ZXh0UmVxdWVzdFwiLFxuICAgIF0sXG4gICAgXCJHZXRBcHBNZXRhZGF0YUFnZW50RXJyb3JSZXNwb25zZVR5cGVcIjogW1xuICAgICAgICBcImdldEFwcE1ldGFkYXRhUmVzcG9uc2VcIixcbiAgICBdLFxuICAgIFwiR2V0QXBwTWV0YWRhdGFBZ2VudFJlcXVlc3RUeXBlXCI6IFtcbiAgICAgICAgXCJnZXRBcHBNZXRhZGF0YVJlcXVlc3RcIixcbiAgICBdLFxuICAgIFwiT3BlbkVycm9yTWVzc2FnZVwiOiBbXG4gICAgICAgIFwiQWdlbnREaXNjb25uZWN0ZWRcIixcbiAgICAgICAgXCJBcHBOb3RGb3VuZFwiLFxuICAgICAgICBcIkFwcFRpbWVvdXRcIixcbiAgICAgICAgXCJEZXNrdG9wQWdlbnROb3RGb3VuZFwiLFxuICAgICAgICBcIkVycm9yT25MYXVuY2hcIixcbiAgICAgICAgXCJNYWxmb3JtZWRDb250ZXh0XCIsXG4gICAgICAgIFwiTWFsZm9ybWVkTWVzc2FnZVwiLFxuICAgICAgICBcIk5vdENvbm5lY3RlZFRvQnJpZGdlXCIsXG4gICAgICAgIFwiUmVzb2x2ZXJVbmF2YWlsYWJsZVwiLFxuICAgICAgICBcIlJlc3BvbnNlVG9CcmlkZ2VUaW1lZE91dFwiLFxuICAgIF0sXG4gICAgXCJPcGVuQWdlbnRFcnJvclJlc3BvbnNlVHlwZVwiOiBbXG4gICAgICAgIFwib3BlblJlc3BvbnNlXCIsXG4gICAgXSxcbiAgICBcIk9wZW5BZ2VudFJlcXVlc3RUeXBlXCI6IFtcbiAgICAgICAgXCJvcGVuUmVxdWVzdFwiLFxuICAgIF0sXG4gICAgXCJQcml2YXRlQ2hhbm5lbEJyb2FkY2FzdEFnZW50UmVxdWVzdFR5cGVcIjogW1xuICAgICAgICBcIlByaXZhdGVDaGFubmVsLmJyb2FkY2FzdFwiLFxuICAgIF0sXG4gICAgXCJQcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJUeXBlc1wiOiBbXG4gICAgICAgIFwib25BZGRDb250ZXh0TGlzdGVuZXJcIixcbiAgICAgICAgXCJvbkRpc2Nvbm5lY3RcIixcbiAgICAgICAgXCJvblVuc3Vic2NyaWJlXCIsXG4gICAgXSxcbiAgICBcIlByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lckFkZGVkQWdlbnRSZXF1ZXN0VHlwZVwiOiBbXG4gICAgICAgIFwiUHJpdmF0ZUNoYW5uZWwuZXZlbnRMaXN0ZW5lckFkZGVkXCIsXG4gICAgXSxcbiAgICBcIlByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lclJlbW92ZWRBZ2VudFJlcXVlc3RUeXBlXCI6IFtcbiAgICAgICAgXCJQcml2YXRlQ2hhbm5lbC5ldmVudExpc3RlbmVyUmVtb3ZlZFwiLFxuICAgIF0sXG4gICAgXCJQcml2YXRlQ2hhbm5lbE9uQWRkQ29udGV4dExpc3RlbmVyQWdlbnRSZXF1ZXN0VHlwZVwiOiBbXG4gICAgICAgIFwiUHJpdmF0ZUNoYW5uZWwub25BZGRDb250ZXh0TGlzdGVuZXJcIixcbiAgICBdLFxuICAgIFwiUHJpdmF0ZUNoYW5uZWxPbkRpc2Nvbm5lY3RBZ2VudFJlcXVlc3RUeXBlXCI6IFtcbiAgICAgICAgXCJQcml2YXRlQ2hhbm5lbC5vbkRpc2Nvbm5lY3RcIixcbiAgICBdLFxuICAgIFwiUHJpdmF0ZUNoYW5uZWxPblVuc3Vic2NyaWJlQWdlbnRSZXF1ZXN0VHlwZVwiOiBbXG4gICAgICAgIFwiUHJpdmF0ZUNoYW5uZWwub25VbnN1YnNjcmliZVwiLFxuICAgIF0sXG4gICAgXCJSYWlzZUludGVudEFnZW50RXJyb3JSZXNwb25zZVR5cGVcIjogW1xuICAgICAgICBcInJhaXNlSW50ZW50UmVzcG9uc2VcIixcbiAgICBdLFxuICAgIFwiUmFpc2VJbnRlbnRBZ2VudFJlcXVlc3RUeXBlXCI6IFtcbiAgICAgICAgXCJyYWlzZUludGVudFJlcXVlc3RcIixcbiAgICBdLFxuICAgIFwiUmFpc2VJbnRlbnRSZXN1bHRFcnJvck1lc3NhZ2VcIjogW1xuICAgICAgICBcIkFnZW50RGlzY29ubmVjdGVkXCIsXG4gICAgICAgIFwiSW50ZW50SGFuZGxlclJlamVjdGVkXCIsXG4gICAgICAgIFwiTWFsZm9ybWVkTWVzc2FnZVwiLFxuICAgICAgICBcIk5vUmVzdWx0UmV0dXJuZWRcIixcbiAgICAgICAgXCJOb3RDb25uZWN0ZWRUb0JyaWRnZVwiLFxuICAgICAgICBcIlJlc3BvbnNlVG9CcmlkZ2VUaW1lZE91dFwiLFxuICAgIF0sXG4gICAgXCJSYWlzZUludGVudFJlc3VsdEFnZW50RXJyb3JSZXNwb25zZVR5cGVcIjogW1xuICAgICAgICBcInJhaXNlSW50ZW50UmVzdWx0UmVzcG9uc2VcIixcbiAgICBdLFxuICAgIFwiVHlwZVwiOiBbXG4gICAgICAgIFwiYXBwXCIsXG4gICAgICAgIFwicHJpdmF0ZVwiLFxuICAgICAgICBcInVzZXJcIixcbiAgICBdXG59O1xuXG52YXIgQnJpZGdpbmdUeXBlcyA9IHtcbiAgICBfX3Byb3RvX186IG51bGwsXG4gICAgQ29udmVydDogQ29udmVydCQxXG59O1xuXG4vKipcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKiBDb3B5cmlnaHQgRklOT1MgRkRDMyBjb250cmlidXRvcnMgLSBzZWUgTk9USUNFIGZpbGVcbiAqL1xuLyoqIENvbnN0YW50cyByZXByZXNlbnRpbmcgdGhlIGVycm9ycyB0aGF0IGNhbiBiZSBlbmNvdW50ZXJlZCB3aGVuIGNhbGxpbmcgdGhlIGBvcGVuYCBtZXRob2Qgb24gdGhlIERlc2t0b3BBZ2VudCBvYmplY3QgKGBmZGMzYCkuICovXG52YXIgT3BlbkVycm9yO1xuKGZ1bmN0aW9uIChPcGVuRXJyb3IpIHtcbiAgICAvKiogUmV0dXJuZWQgaWYgdGhlIHNwZWNpZmllZCBhcHBsaWNhdGlvbiBpcyBub3QgZm91bmQuKi9cbiAgICBPcGVuRXJyb3JbXCJBcHBOb3RGb3VuZFwiXSA9IFwiQXBwTm90Rm91bmRcIjtcbiAgICAvKiogUmV0dXJuZWQgaWYgdGhlIHNwZWNpZmllZCBhcHBsaWNhdGlvbiBmYWlscyB0byBsYXVuY2ggY29ycmVjdGx5LiovXG4gICAgT3BlbkVycm9yW1wiRXJyb3JPbkxhdW5jaFwiXSA9IFwiRXJyb3JPbkxhdW5jaFwiO1xuICAgIC8qKiBSZXR1cm5lZCBpZiB0aGUgc3BlY2lmaWVkIGFwcGxpY2F0aW9uIGxhdW5jaGVzIGJ1dCBmYWlscyB0byBhZGQgYSBjb250ZXh0IGxpc3RlbmVyIGluIG9yZGVyIHRvIHJlY2VpdmUgdGhlIGNvbnRleHQgcGFzc2VkIHRvIHRoZSBgZmRjMy5vcGVuYCBjYWxsLiovXG4gICAgT3BlbkVycm9yW1wiQXBwVGltZW91dFwiXSA9IFwiQXBwVGltZW91dFwiO1xuICAgIC8qKiBSZXR1cm5lZCBpZiB0aGUgRkRDMyBkZXNrdG9wIGFnZW50IGltcGxlbWVudGF0aW9uIGlzIG5vdCBjdXJyZW50bHkgYWJsZSB0byBoYW5kbGUgdGhlIHJlcXVlc3QuKi9cbiAgICBPcGVuRXJyb3JbXCJSZXNvbHZlclVuYXZhaWxhYmxlXCJdID0gXCJSZXNvbHZlclVuYXZhaWxhYmxlXCI7XG4gICAgLyoqIFJldHVybmVkIGlmIGEgY2FsbCB0byB0aGUgYG9wZW5gIGZ1bmN0aW9uIGlzIG1hZGUgd2l0aCBhbiBpbnZhbGlkIGNvbnRleHQgYXJndW1lbnQuIENvbnRleHRzIHNob3VsZCBiZSBPYmplY3RzIHdpdGggYXQgbGVhc3QgYSBgdHlwZWAgZmllbGQgdGhhdCBoYXMgYSBgc3RyaW5nYCB2YWx1ZS4qL1xuICAgIE9wZW5FcnJvcltcIk1hbGZvcm1lZENvbnRleHRcIl0gPSBcIk1hbGZvcm1lZENvbnRleHRcIjtcbiAgICAvKiogQGV4cGVyaW1lbnRhbCBSZXR1cm5lZCBpZiB0aGUgc3BlY2lmaWVkIERlc2t0b3AgQWdlbnQgaXMgbm90IGZvdW5kLCB2aWEgYSBjb25uZWN0ZWQgRGVza3RvcCBBZ2VudCBCcmlkZ2UuKi9cbiAgICBPcGVuRXJyb3JbXCJEZXNrdG9wQWdlbnROb3RGb3VuZFwiXSA9IFwiRGVza3RvcEFnZW50Tm90Rm91bmRcIjtcbn0pKE9wZW5FcnJvciB8fCAoT3BlbkVycm9yID0ge30pKTtcbi8qKiBDb25zdGFudHMgcmVwcmVzZW50aW5nIHRoZSBlcnJvcnMgdGhhdCBjYW4gYmUgZW5jb3VudGVyZWQgd2hlbiBjYWxsaW5nIHRoZSBgZmluZEludGVudGAsIGBmaW5kSW50ZW50c0J5Q29udGV4dGAsIGByYWlzZUludGVudGAgb3IgYHJhaXNlSW50ZW50Rm9yQ29udGV4dGAgbWV0aG9kcyBvbiB0aGUgRGVza3RvcEFnZW50IChgZmRjM2ApLiAqL1xudmFyIFJlc29sdmVFcnJvcjtcbihmdW5jdGlvbiAoUmVzb2x2ZUVycm9yKSB7XG4gICAgLyoqIFNIT1VMRCBiZSByZXR1cm5lZCBpZiBubyBhcHBzIGFyZSBhdmFpbGFibGUgdGhhdCBjYW4gcmVzb2x2ZSB0aGUgaW50ZW50IGFuZCBjb250ZXh0IGNvbWJpbmF0aW9uLiovXG4gICAgUmVzb2x2ZUVycm9yW1wiTm9BcHBzRm91bmRcIl0gPSBcIk5vQXBwc0ZvdW5kXCI7XG4gICAgLyoqIFJldHVybmVkIGlmIHRoZSBGREMzIGRlc2t0b3AgYWdlbnQgaW1wbGVtZW50YXRpb24gaXMgbm90IGN1cnJlbnRseSBhYmxlIHRvIGhhbmRsZSB0aGUgcmVxdWVzdC4qL1xuICAgIFJlc29sdmVFcnJvcltcIlJlc29sdmVyVW5hdmFpbGFibGVcIl0gPSBcIlJlc29sdmVyVW5hdmFpbGFibGVcIjtcbiAgICAvKiogUmV0dXJuZWQgaWYgdGhlIHVzZXIgY2FuY2VsbGVkIHRoZSByZXNvbHV0aW9uIHJlcXVlc3QsIGZvciBleGFtcGxlIGJ5IGNsb3Npbmcgb3IgY2FuY2VsbGluZyBhIHJlc29sdmVyIFVJLiovXG4gICAgUmVzb2x2ZUVycm9yW1wiVXNlckNhbmNlbGxlZFwiXSA9IFwiVXNlckNhbmNlbGxlZFJlc29sdXRpb25cIjtcbiAgICAvKiogU0hPVUxEIGJlIHJldHVybmVkIGlmIGEgdGltZW91dCBjYW5jZWxzIGFuIGludGVudCByZXNvbHV0aW9uIHRoYXQgcmVxdWlyZWQgdXNlciBpbnRlcmFjdGlvbi4gUGxlYXNlIHVzZSBgUmVzb2x2ZXJVbmF2YWlsYWJsZWAgaW5zdGVhZCBmb3Igc2l0dWF0aW9ucyB3aGVyZSBhIHJlc29sdmVyIFVJIG9yIHNpbWlsYXIgZmFpbHMuKi9cbiAgICBSZXNvbHZlRXJyb3JbXCJSZXNvbHZlclRpbWVvdXRcIl0gPSBcIlJlc29sdmVyVGltZW91dFwiO1xuICAgIC8qKiBSZXR1cm5lZCBpZiBhIHNwZWNpZmllZCB0YXJnZXQgYXBwbGljYXRpb24gaXMgbm90IGF2YWlsYWJsZSBvciBhIG5ldyBpbnN0YW5jZSBvZiBpdCBjYW5ub3QgYmUgb3BlbmVkLiAqL1xuICAgIFJlc29sdmVFcnJvcltcIlRhcmdldEFwcFVuYXZhaWxhYmxlXCJdID0gXCJUYXJnZXRBcHBVbmF2YWlsYWJsZVwiO1xuICAgIC8qKiBSZXR1cm5lZCBpZiBhIHNwZWNpZmllZCB0YXJnZXQgYXBwbGljYXRpb24gaW5zdGFuY2UgaXMgbm90IGF2YWlsYWJsZSwgZm9yIGV4YW1wbGUgYmVjYXVzZSBpdCBoYXMgYmVlbiBjbG9zZWQuICovXG4gICAgUmVzb2x2ZUVycm9yW1wiVGFyZ2V0SW5zdGFuY2VVbmF2YWlsYWJsZVwiXSA9IFwiVGFyZ2V0SW5zdGFuY2VVbmF2YWlsYWJsZVwiO1xuICAgIC8qKiBSZXR1cm5lZCBpZiB0aGUgaW50ZW50IGFuZCBjb250ZXh0IGNvdWxkIG5vdCBiZSBkZWxpdmVyZWQgdG8gdGhlIHNlbGVjdGVkIGFwcGxpY2F0aW9uIG9yIGluc3RhbmNlLCBmb3IgZXhhbXBsZSBiZWNhdXNlIGl0IGhhcyBub3QgYWRkZWQgYW4gaW50ZW50IGhhbmRsZXIgd2l0aGluIGEgdGltZW91dC4qL1xuICAgIFJlc29sdmVFcnJvcltcIkludGVudERlbGl2ZXJ5RmFpbGVkXCJdID0gXCJJbnRlbnREZWxpdmVyeUZhaWxlZFwiO1xuICAgIC8qKiBSZXR1cm5lZCBpZiBhIGNhbGwgdG8gb25lIG9mIHRoZSBgcmFpc2VJbnRlbnRgIGZ1bmN0aW9ucyBpcyBtYWRlIHdpdGggYW4gaW52YWxpZCBjb250ZXh0IGFyZ3VtZW50LiBDb250ZXh0cyBzaG91bGQgYmUgT2JqZWN0cyB3aXRoIGF0IGxlYXN0IGEgYHR5cGVgIGZpZWxkIHRoYXQgaGFzIGEgYHN0cmluZ2AgdmFsdWUuKi9cbiAgICBSZXNvbHZlRXJyb3JbXCJNYWxmb3JtZWRDb250ZXh0XCJdID0gXCJNYWxmb3JtZWRDb250ZXh0XCI7XG4gICAgLyoqIEBleHBlcmltZW50YWwgUmV0dXJuZWQgaWYgdGhlIHNwZWNpZmllZCBEZXNrdG9wIEFnZW50IGlzIG5vdCBmb3VuZCwgdmlhIGEgY29ubmVjdGVkIERlc2t0b3AgQWdlbnQgQnJpZGdlLiovXG4gICAgUmVzb2x2ZUVycm9yW1wiRGVza3RvcEFnZW50Tm90Rm91bmRcIl0gPSBcIkRlc2t0b3BBZ2VudE5vdEZvdW5kXCI7XG59KShSZXNvbHZlRXJyb3IgfHwgKFJlc29sdmVFcnJvciA9IHt9KSk7XG52YXIgUmVzdWx0RXJyb3I7XG4oZnVuY3Rpb24gKFJlc3VsdEVycm9yKSB7XG4gICAgLyoqIFJldHVybmVkIGlmIHRoZSBpbnRlbnQgaGFuZGxlciBleGl0ZWQgd2l0aG91dCByZXR1cm5pbmcgYSB2YWxpZCByZXN1bHQgKGEgcHJvbWlzZSByZXNvbHZpbmcgdG8gYSBDb250ZXh0LCBDaGFubmVsIG9iamVjdCBvciB2b2lkKS4gKi9cbiAgICBSZXN1bHRFcnJvcltcIk5vUmVzdWx0UmV0dXJuZWRcIl0gPSBcIk5vUmVzdWx0UmV0dXJuZWRcIjtcbiAgICAvKiogUmV0dXJuZWQgaWYgdGhlIEludGVudCBoYW5kbGVyIGZ1bmN0aW9uIHByb2Nlc3NpbmcgdGhlIHJhaXNlZCBpbnRlbnQgdGhyb3dzIGFuIGVycm9yIG9yIHJlamVjdHMgdGhlIFByb21pc2UgaXQgcmV0dXJuZWQuICovXG4gICAgUmVzdWx0RXJyb3JbXCJJbnRlbnRIYW5kbGVyUmVqZWN0ZWRcIl0gPSBcIkludGVudEhhbmRsZXJSZWplY3RlZFwiO1xufSkoUmVzdWx0RXJyb3IgfHwgKFJlc3VsdEVycm9yID0ge30pKTtcbnZhciBDaGFubmVsRXJyb3I7XG4oZnVuY3Rpb24gKENoYW5uZWxFcnJvcikge1xuICAgIC8qKiBSZXR1cm5lZCBpZiB0aGUgc3BlY2lmaWVkIGNoYW5uZWwgaXMgbm90IGZvdW5kIHdoZW4gYXR0ZW1wdGluZyB0byBqb2luIGEgY2hhbm5lbCB2aWEgdGhlIGBqb2luVXNlckNoYW5uZWxgIGZ1bmN0aW9uICBvZiB0aGUgRGVza3RvcEFnZW50IChgZmRjM2ApLiovXG4gICAgQ2hhbm5lbEVycm9yW1wiTm9DaGFubmVsRm91bmRcIl0gPSBcIk5vQ2hhbm5lbEZvdW5kXCI7XG4gICAgLyoqIFNIT1VMRCBiZSByZXR1cm5lZCB3aGVuIGEgcmVxdWVzdCB0byBqb2luIGEgdXNlciBjaGFubmVsIG9yIHRvIGEgcmV0cmlldmUgYSBDaGFubmVsIG9iamVjdCB2aWEgdGhlIGBqb2luVXNlckNoYW5uZWxgIG9yIGBnZXRPckNyZWF0ZUNoYW5uZWxgIG1ldGhvZHMgb2YgdGhlIERlc2t0b3BBZ2VudCAoYGZkYzNgKSBvYmplY3QgaXMgZGVuaWVkLiAqL1xuICAgIENoYW5uZWxFcnJvcltcIkFjY2Vzc0RlbmllZFwiXSA9IFwiQWNjZXNzRGVuaWVkXCI7XG4gICAgLyoqIFNIT1VMRCBiZSByZXR1cm5lZCB3aGVuIGEgY2hhbm5lbCBjYW5ub3QgYmUgY3JlYXRlZCBvciByZXRyaWV2ZWQgdmlhIHRoZSBgZ2V0T3JDcmVhdGVDaGFubmVsYCBtZXRob2Qgb2YgdGhlIERlc2t0b3BBZ2VudCAoYGZkYzNgKS4qL1xuICAgIENoYW5uZWxFcnJvcltcIkNyZWF0aW9uRmFpbGVkXCJdID0gXCJDcmVhdGlvbkZhaWxlZFwiO1xuICAgIC8qKiBSZXR1cm5lZCBpZiBhIGNhbGwgdG8gdGhlIGBicm9hZGNhc3RgIGZ1bmN0aW9ucyBpcyBtYWRlIHdpdGggYW4gaW52YWxpZCBjb250ZXh0IGFyZ3VtZW50LiBDb250ZXh0cyBzaG91bGQgYmUgT2JqZWN0cyB3aXRoIGF0IGxlYXN0IGEgYHR5cGVgIGZpZWxkIHRoYXQgaGFzIGEgYHN0cmluZ2AgdmFsdWUuKi9cbiAgICBDaGFubmVsRXJyb3JbXCJNYWxmb3JtZWRDb250ZXh0XCJdID0gXCJNYWxmb3JtZWRDb250ZXh0XCI7XG59KShDaGFubmVsRXJyb3IgfHwgKENoYW5uZWxFcnJvciA9IHt9KSk7XG52YXIgQnJpZGdpbmdFcnJvcjtcbihmdW5jdGlvbiAoQnJpZGdpbmdFcnJvcikge1xuICAgIC8qKiBAZXhwZXJpbWVudGFsIFJldHVybmVkIGlmIGEgRGVza3RvcCBBZ2VudCBkaWQgbm90IHJldHVybiBhIHJlc3BvbnNlLCB2aWEgRGVza3RvcCBBZ2VudCBCcmlkZ2luZywgd2l0aGluIHRoZSBhbGxvdGVkIHRpbWVvdXQuICovXG4gICAgQnJpZGdpbmdFcnJvcltcIlJlc3BvbnNlVGltZWRPdXRcIl0gPSBcIlJlc3BvbnNlVG9CcmlkZ2VUaW1lZE91dFwiO1xuICAgIC8qKiBAZXhwZXJpbWVudGFsIFJldHVybmVkIGlmIGEgRGVza3RvcCBBZ2VudCB0aGF0IGhhcyBiZWVuIHRhcmdldGVkIGJ5IGEgcGFydGljdWxhciByZXF1ZXN0IGhhcyBiZWVuIGRpc2Nvbm5lY3RlZCBmcm9tIHRoZSBCcmlkZ2UgYmVmb3JlIGEgcmVzcG9uc2UgaGFzIGJlZW4gcmVjZWl2ZWQgZnJvbSBpdC4gKi9cbiAgICBCcmlkZ2luZ0Vycm9yW1wiQWdlbnREaXNjb25uZWN0ZWRcIl0gPSBcIkFnZW50RGlzY29ubmVjdGVkXCI7XG4gICAgLyoqIEBleHBlcmltZW50YWwgUmV0dXJuZWQgZm9yIEZEQzMgQVBJIGNhbGxzIHRoYXQgYXJlIHNwZWNpZmllZCB3aXRoIGFyZ3VtZW50cyBpbmRpY2F0aW5nIHRoYXQgYSByZW1vdGUgRGVza3RvcCBhZ2VudCBzaG91bGQgYmUgdGFyZ2V0ZWQgKGUuZy4gcmFpc2VJbnRlbnQgd2l0aCBhbiBhcHAgb24gYSByZW1vdGUgRGVza3RvcEFnZW50IHRhcmdldGVkKSwgd2hlbiB0aGUgbG9jYWwgRGVza3RvcCBBZ2VudCBpcyBub3QgY29ubmVjdGVkIHRvIGEgYnJpZGdlLiAqL1xuICAgIEJyaWRnaW5nRXJyb3JbXCJOb3RDb25uZWN0ZWRUb0JyaWRnZVwiXSA9IFwiTm90Q29ubmVjdGVkVG9CcmlkZ2VcIjtcbiAgICAvKiogQGV4cGVyaW1lbnRhbCBSZXR1cm5lZCBpZiBhIG1lc3NhZ2UgdG8gYSBCcmlkZ2UgZGV2aWF0ZXMgZnJvbSB0aGUgc2NoZW1hIGZvciB0aGF0IG1lc3NhZ2Ugc3VmZmljaWVudGx5IHRoYXQgaXQgY291bGQgbm90IGJlIHByb2Nlc3NlZC4gKi9cbiAgICBCcmlkZ2luZ0Vycm9yW1wiTWFsZm9ybWVkTWVzc2FnZVwiXSA9IFwiTWFsZm9ybWVkTWVzc2FnZVwiO1xufSkoQnJpZGdpbmdFcnJvciB8fCAoQnJpZGdpbmdFcnJvciA9IHt9KSk7XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSwgU3VwcHJlc3NlZEVycm9yLCBTeW1ib2wgKi9cclxuXHJcblxyXG5mdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG50eXBlb2YgU3VwcHJlc3NlZEVycm9yID09PSBcImZ1bmN0aW9uXCIgPyBTdXBwcmVzc2VkRXJyb3IgOiBmdW5jdGlvbiAoZXJyb3IsIHN1cHByZXNzZWQsIG1lc3NhZ2UpIHtcclxuICAgIHZhciBlID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgcmV0dXJuIGUubmFtZSA9IFwiU3VwcHJlc3NlZEVycm9yXCIsIGUuZXJyb3IgPSBlcnJvciwgZS5zdXBwcmVzc2VkID0gc3VwcHJlc3NlZCwgZTtcclxufTtcblxuLyoqXG4gKiBFbnN1cmVzIGF0IGNvbXBpbGUgdGltZSB0aGF0IHRoZSBnaXZlbiBzdHJpbmcgdHVwbGUgaXMgZXhoYXVzdGl2ZSBvbiBhIGdpdmVuIHVuaW9uIHR5cGUsIGkuZS4gY29udGFpbnMgQUxMIHBvc3NpYmxlIHZhbHVlcyBvZiB0aGUgZ2l2ZW4gVU5JT05fVFlQRS5cbiAqL1xudmFyIGV4aGF1c3RpdmVTdHJpbmdUdXBsZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdHVwbGUgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICB0dXBsZVtfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICByZXR1cm4gdHVwbGU7XG59OyB9O1xuXG52YXIgU1RBTkRBUkRfQ09OVEVYVF9UWVBFUyA9IGV4aGF1c3RpdmVTdHJpbmdUdXBsZSgpKCdmZGMzLmFjdGlvbicsICdmZGMzLmNoYXJ0JywgJ2ZkYzMuY2hhdC5pbml0U2V0dGluZ3MnLCAnZmRjMy5jaGF0Lm1lc3NhZ2UnLCAnZmRjMy5jaGF0LnJvb20nLCAnZmRjMy5jaGF0LnNlYXJjaENyaXRlcmlhJywgJ2ZkYzMuY29udGFjdCcsICdmZGMzLmNvbnRhY3RMaXN0JywgJ2ZkYzMuY291bnRyeScsICdmZGMzLmN1cnJlbmN5JywgJ2ZkYzMuZW1haWwnLCAnZmRjMy5pbnN0cnVtZW50JywgJ2ZkYzMuaW5zdHJ1bWVudExpc3QnLCAnZmRjMy5pbnRlcmFjdGlvbicsICdmZGMzLm1lc3NhZ2UnLCAnZmRjMy5vcmdhbml6YXRpb24nLCAnZmRjMy5wb3J0Zm9saW8nLCAnZmRjMy5wb3NpdGlvbicsICdmZGMzLm5vdGhpbmcnLCAnZmRjMy50aW1lUmFuZ2UnLCAnZmRjMy50cmFuc2FjdGlvblJlc3VsdCcsICdmZGMzLnZhbHVhdGlvbicpO1xuLy8gdXNlZCBpbnRlcm5hbGx5IHRvIGNoZWNrIGlmIGEgZ2l2ZW4gaW50ZW50L2NvbnRleHQgaXMgYSBzdGFuZGFyZCBvbmVcbnZhciBTdGFuZGFyZENvbnRleHRzU2V0ID0gbmV3IFNldChTVEFOREFSRF9DT05URVhUX1RZUEVTKTtcblxudmFyIFNUQU5EQVJEX0lOVEVOVFMgPSBleGhhdXN0aXZlU3RyaW5nVHVwbGUoKSgnQ3JlYXRlSW50ZXJhY3Rpb24nLCAnU2VuZENoYXRNZXNzYWdlJywgJ1N0YXJ0Q2FsbCcsICdTdGFydENoYXQnLCAnU3RhcnRFbWFpbCcsICdWaWV3QW5hbHlzaXMnLCAnVmlld0NoYXQnLCAnVmlld0NoYXJ0JywgJ1ZpZXdDb250YWN0JywgJ1ZpZXdIb2xkaW5ncycsICdWaWV3SW5zdHJ1bWVudCcsICdWaWV3SW50ZXJhY3Rpb25zJywgJ1ZpZXdNZXNzYWdlcycsICdWaWV3TmV3cycsICdWaWV3T3JkZXJzJywgJ1ZpZXdQcm9maWxlJywgJ1ZpZXdRdW90ZScsICdWaWV3UmVzZWFyY2gnKTtcbi8vIHVzZWQgaW50ZXJuYWxseSB0byBjaGVjayBpZiBhIGdpdmVuIGludGVudC9jb250ZXh0IGlzIGEgc3RhbmRhcmQgb25lXG52YXIgU3RhbmRhcmRJbnRlbnRzU2V0ID0gbmV3IFNldChTVEFOREFSRF9JTlRFTlRTKTtcblxudmFyIERFRkFVTFRfVElNRU9VVCA9IDUwMDA7XG52YXIgVW5hdmFpbGFibGVFcnJvciA9IG5ldyBFcnJvcignRkRDMyBEZXNrdG9wQWdlbnQgbm90IGF2YWlsYWJsZSBhdCBgd2luZG93LmZkYzNgLicpO1xudmFyIFRpbWVvdXRFcnJvciA9IG5ldyBFcnJvcignVGltZWQgb3V0IHdhaXRpbmcgZm9yIGBmZGMzUmVhZHlgIGV2ZW50LicpO1xudmFyIFVuZXhwZWN0ZWRFcnJvciA9IG5ldyBFcnJvcignYGZkYzNSZWFkeWAgZXZlbnQgZmlyZWQsIGJ1dCBgd2luZG93LmZkYzNgIG5vdCBzZXQgdG8gRGVza3RvcEFnZW50LicpO1xuZnVuY3Rpb24gcmVqZWN0SWZOb0dsb2JhbChmKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5mZGMzID8gZigpIDogUHJvbWlzZS5yZWplY3QoVW5hdmFpbGFibGVFcnJvcik7XG59XG4vKipcbiAqIFV0aWxpdHkgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHdpbGwgcmVzb2x2ZSBpbW1lYWRpYXRlbHlcbiAqIGlmIHRoZSBkZXNrdG9wIGFnZW50IEFQSSBpcyBmb3VuZCBhdCBgd2luZG93LmZkYzNgLiBJZiB0aGUgQVBJIGlzIGZvdW5kLFxuICogdGhlIHByb21pc2Ugd2lsbCByZXNvbHZlIHdoZW4gdGhlIGBmZGMzUmVhZHlgIGV2ZW50IGlzIHJlY2VpdmVkIG9yIGlmIGl0XG4gKiBpcyBmb3VuZCBhdCB0aGUgZW5kIG9mIHRoZSBzcGVjaWZpZWQgdGltZW91dC4gSWYgdGhlIEFQSSBpcyBub3QgZm91bmQsIGl0XG4gKiB3aWxsIHJlamVjdCB3aXRoIGFuIGVycm9yLlxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIGF3YWl0IGZkYzNSZWFkeSgpO1xuICogY29uc3QgaW50ZW50TGlzdGVuZXIgPSBhd2FpdCBhZGRJbnRlbnRMaXN0ZW5lcihcIlZpZXdDaGFydFwiLCBpbnRlbnRIYW5kbGVyRm4pO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHdhaXRGb3JNcyBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byB3YWl0IGZvciB0aGUgRkRDMyBBUEkgdG8gYmVcbiAqIHJlYWR5LiBEZWZhdWx0cyB0byA1IHNlY29uZHMuXG4gKi9cbnZhciBmZGMzUmVhZHkgPSBmdW5jdGlvbiAod2FpdEZvck1zKSB7XG4gICAgaWYgKHdhaXRGb3JNcyA9PT0gdm9pZCAwKSB7IHdhaXRGb3JNcyA9IERFRkFVTFRfVElNRU9VVDsgfVxuICAgIHJldHVybiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgZ2xvYmFsIGlzIGFscmVhZHkgYXZhaWxhYmxlIHJlc29sdmUgaW1tZWRpYXRlbHlcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5mZGMzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiBpdHMgbm90IGF2YWlsYWJsZSBzZXR1cCBhIHRpbWVvdXQgdG8gcmV0dXJuIGEgcmVqZWN0ZWQgcHJvbWlzZVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRpbWVvdXRfMSA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gKHdpbmRvdy5mZGMzID8gcmVzb2x2ZSgpIDogcmVqZWN0KFRpbWVvdXRFcnJvcikpOyB9LCB3YWl0Rm9yTXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGlzdGVuIGZvciB0aGUgZmRjM1JlYWR5IGV2ZW50XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZmRjM1JlYWR5JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0XzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5mZGMzID8gcmVzb2x2ZSgpIDogcmVqZWN0KFVuZXhwZWN0ZWRFcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7IG9uY2U6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcbmZ1bmN0aW9uIGlzU3RyaW5nKGFwcCkge1xuICAgIHJldHVybiAhIWFwcCAmJiB0eXBlb2YgYXBwID09PSAnc3RyaW5nJztcbn1cbmZ1bmN0aW9uIG9wZW4oYXBwLCBjb250ZXh0KSB7XG4gICAgaWYgKGlzU3RyaW5nKGFwcCkpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdElmTm9HbG9iYWwoZnVuY3Rpb24gKCkgeyByZXR1cm4gd2luZG93LmZkYzMub3BlbihhcHAsIGNvbnRleHQpOyB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHdpbmRvdy5mZGMzLm9wZW4oYXBwLCBjb250ZXh0KTsgfSk7XG4gICAgfVxufVxuZnVuY3Rpb24gZmluZEludGVudChpbnRlbnQsIGNvbnRleHQsIHJlc3VsdFR5cGUpIHtcbiAgICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7IHJldHVybiB3aW5kb3cuZmRjMy5maW5kSW50ZW50KGludGVudCwgY29udGV4dCwgcmVzdWx0VHlwZSk7IH0pO1xufVxuZnVuY3Rpb24gZmluZEludGVudHNCeUNvbnRleHQoY29udGV4dCwgcmVzdWx0VHlwZSkge1xuICAgIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHdpbmRvdy5mZGMzLmZpbmRJbnRlbnRzQnlDb250ZXh0KGNvbnRleHQsIHJlc3VsdFR5cGUpOyB9KTtcbn1cbmZ1bmN0aW9uIGJyb2FkY2FzdChjb250ZXh0KSB7XG4gICAgcmV0dXJuIHJlamVjdElmTm9HbG9iYWwoZnVuY3Rpb24gKCkgeyByZXR1cm4gd2luZG93LmZkYzMuYnJvYWRjYXN0KGNvbnRleHQpOyB9KTtcbn1cbmZ1bmN0aW9uIHJhaXNlSW50ZW50KGludGVudCwgY29udGV4dCwgYXBwKSB7XG4gICAgaWYgKGlzU3RyaW5nKGFwcCkpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdElmTm9HbG9iYWwoZnVuY3Rpb24gKCkgeyByZXR1cm4gd2luZG93LmZkYzMucmFpc2VJbnRlbnQoaW50ZW50LCBjb250ZXh0LCBhcHApOyB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHdpbmRvdy5mZGMzLnJhaXNlSW50ZW50KGludGVudCwgY29udGV4dCwgYXBwKTsgfSk7XG4gICAgfVxufVxuZnVuY3Rpb24gcmFpc2VJbnRlbnRGb3JDb250ZXh0KGNvbnRleHQsIGFwcCkge1xuICAgIGlmIChpc1N0cmluZyhhcHApKSB7XG4gICAgICAgIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHdpbmRvdy5mZGMzLnJhaXNlSW50ZW50Rm9yQ29udGV4dChjb250ZXh0LCBhcHApOyB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHdpbmRvdy5mZGMzLnJhaXNlSW50ZW50Rm9yQ29udGV4dChjb250ZXh0LCBhcHApOyB9KTtcbiAgICB9XG59XG5mdW5jdGlvbiBhZGRJbnRlbnRMaXN0ZW5lcihpbnRlbnQsIGhhbmRsZXIpIHtcbiAgICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7IHJldHVybiB3aW5kb3cuZmRjMy5hZGRJbnRlbnRMaXN0ZW5lcihpbnRlbnQsIGhhbmRsZXIpOyB9KTtcbn1cbmZ1bmN0aW9uIGFkZENvbnRleHRMaXN0ZW5lcihjb250ZXh0VHlwZU9ySGFuZGxlciwgaGFuZGxlcikge1xuICAgIC8vSGFuZGxlIChkZXByZWNhdGVkKSBmdW5jdGlvbiBzaWduYXR1cmUgdGhhdCBhbGxvd2VkIGNvbnRleHRUeXBlIGFyZ3VtZW50IHRvIGJlIG9taXR0ZWRcbiAgICBpZiAodHlwZW9mIGNvbnRleHRUeXBlT3JIYW5kbGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHdpbmRvdy5mZGMzLmFkZENvbnRleHRMaXN0ZW5lcihjb250ZXh0VHlwZU9ySGFuZGxlciwgaGFuZGxlcik7IH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdElmTm9HbG9iYWwoZnVuY3Rpb24gKCkgeyByZXR1cm4gd2luZG93LmZkYzMuYWRkQ29udGV4dExpc3RlbmVyKG51bGwsIGNvbnRleHRUeXBlT3JIYW5kbGVyKTsgfSk7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0VXNlckNoYW5uZWxzKCkge1xuICAgIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy9mYWxsYmFjayB0byBnZXRTeXN0ZW1DaGFubmVscyBmb3IgRkRDMyA8Mi4wIGltcGxlbWVudGF0aW9uc1xuICAgICAgICBpZiAod2luZG93LmZkYzMuZ2V0VXNlckNoYW5uZWxzKSB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LmZkYzMuZ2V0VXNlckNoYW5uZWxzKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LmZkYzMuZ2V0U3lzdGVtQ2hhbm5lbHMoKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZnVuY3Rpb24gZ2V0U3lzdGVtQ2hhbm5lbHMoKSB7XG4gICAgLy9mYWxsZm9yd2FyZCB0byBnZXRVc2VyQ2hhbm5lbHMgZm9yIEZEQzMgMi4wKyBpbXBsZW1lbnRhdGlvbnNcbiAgICByZXR1cm4gZ2V0VXNlckNoYW5uZWxzKCk7XG59XG5mdW5jdGlvbiBqb2luVXNlckNoYW5uZWwoY2hhbm5lbElkKSB7XG4gICAgcmV0dXJuIHJlamVjdElmTm9HbG9iYWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAvL2ZhbGxiYWNrIHRvIGpvaW5DaGFubmVsIGZvciBGREMzIDwyLjAgaW1wbGVtZW50YXRpb25zXG4gICAgICAgIGlmICh3aW5kb3cuZmRjMy5qb2luVXNlckNoYW5uZWwpIHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cuZmRjMy5qb2luVXNlckNoYW5uZWwoY2hhbm5lbElkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cuZmRjMy5qb2luQ2hhbm5lbChjaGFubmVsSWQpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBqb2luQ2hhbm5lbChjaGFubmVsSWQpIHtcbiAgICAvL2ZhbGxmb3J3YXJkIHRvIGpvaW5Vc2VyQ2hhbm5lbCBmb3IgRkRDMyAyLjArIGltcGxlbWVudGF0aW9uc1xuICAgIHJldHVybiBqb2luVXNlckNoYW5uZWwoY2hhbm5lbElkKTtcbn1cbmZ1bmN0aW9uIGdldE9yQ3JlYXRlQ2hhbm5lbChjaGFubmVsSWQpIHtcbiAgICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7IHJldHVybiB3aW5kb3cuZmRjMy5nZXRPckNyZWF0ZUNoYW5uZWwoY2hhbm5lbElkKTsgfSk7XG59XG5mdW5jdGlvbiBnZXRDdXJyZW50Q2hhbm5lbCgpIHtcbiAgICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7IHJldHVybiB3aW5kb3cuZmRjMy5nZXRDdXJyZW50Q2hhbm5lbCgpOyB9KTtcbn1cbmZ1bmN0aW9uIGxlYXZlQ3VycmVudENoYW5uZWwoKSB7XG4gICAgcmV0dXJuIHJlamVjdElmTm9HbG9iYWwoZnVuY3Rpb24gKCkgeyByZXR1cm4gd2luZG93LmZkYzMubGVhdmVDdXJyZW50Q2hhbm5lbCgpOyB9KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVByaXZhdGVDaGFubmVsKCkge1xuICAgIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHdpbmRvdy5mZGMzLmNyZWF0ZVByaXZhdGVDaGFubmVsKCk7IH0pO1xufVxuZnVuY3Rpb24gZ2V0SW5mbygpIHtcbiAgICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7IHJldHVybiB3aW5kb3cuZmRjMy5nZXRJbmZvKCk7IH0pO1xufVxuZnVuY3Rpb24gZ2V0QXBwTWV0YWRhdGEoYXBwKSB7XG4gICAgcmV0dXJuIHJlamVjdElmTm9HbG9iYWwoZnVuY3Rpb24gKCkgeyByZXR1cm4gd2luZG93LmZkYzMuZ2V0QXBwTWV0YWRhdGEoYXBwKTsgfSk7XG59XG5mdW5jdGlvbiBmaW5kSW5zdGFuY2VzKGFwcCkge1xuICAgIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHdpbmRvdy5mZGMzLmZpbmRJbnN0YW5jZXMoYXBwKTsgfSk7XG59XG4vKipcbiAqIENoZWNrIGlmIHRoZSBnaXZlbiBjb250ZXh0IGlzIGEgc3RhbmRhcmQgY29udGV4dCB0eXBlLlxuICogQHBhcmFtIGNvbnRleHRUeXBlXG4gKi9cbmZ1bmN0aW9uIGlzU3RhbmRhcmRDb250ZXh0VHlwZShjb250ZXh0VHlwZSkge1xuICAgIHJldHVybiBTdGFuZGFyZENvbnRleHRzU2V0Lmhhcyhjb250ZXh0VHlwZSk7XG59XG4vKipcbiAqIENoZWNrIGlmIHRoZSBnaXZlbiBpbnRlbnQgaXMgYSBzdGFuZGFyZCBpbnRlbnQuXG4gKiBAcGFyYW0gaW50ZW50XG4gKi9cbmZ1bmN0aW9uIGlzU3RhbmRhcmRJbnRlbnQoaW50ZW50KSB7XG4gICAgcmV0dXJuIFN0YW5kYXJkSW50ZW50c1NldC5oYXMoaW50ZW50KTtcbn1cbi8qKlxuICogQ29tcGFyZSBudW1lcmljIHNlbXZlciB2ZXJzaW9uIG51bWJlciBzdHJpbmdzIChpbiB0aGUgZm9ybSBgMS4yLjNgKS5cbiAqXG4gKiBSZXR1cm5zIGAtMWAgaWYgdGhlIGZpcnN0IGFyZ3VtZW50IGlzIGEgbG93ZXIgdmVyc2lvbiBudW1iZXIgdGhhbiB0aGUgc2Vjb25kLFxuICogYDFgIGlmIHRoZSBmaXJzdCBhcmd1bWVudCBpcyBncmVhdGVyIHRoYW4gdGhlIHNlY29uZCwgMCBpZiB0aGUgYXJndW1lbnRzIGFyZVxuICogZXF1YWwgYW5kIGBudWxsYCBpZiBhbiBlcnJvciBvY2N1cnJlZCBkdXJpbmcgdGhlIGNvbXBhcmlzb24uXG4gKlxuICogQHBhcmFtIGFcbiAqIEBwYXJhbSBiXG4gKi9cbnZhciBjb21wYXJlVmVyc2lvbk51bWJlcnMgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgIHRyeSB7XG4gICAgICAgIHZhciBhVmVyQXJyID0gYS5zcGxpdCgnLicpLm1hcChOdW1iZXIpO1xuICAgICAgICB2YXIgYlZlckFyciA9IGIuc3BsaXQoJy4nKS5tYXAoTnVtYmVyKTtcbiAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IE1hdGgubWF4KGFWZXJBcnIubGVuZ3RoLCBiVmVyQXJyLmxlbmd0aCk7IGluZGV4KyspIHtcbiAgICAgICAgICAgIC8qIElmIG9uZSB2ZXJzaW9uIG51bWJlciBoYXMgbW9yZSBkaWdpdHMgYW5kIHRoZSBvdGhlciBkb2VzIG5vdCwgYW5kIHRoZXkgYXJlIG90aGVyd2lzZSBlcXVhbCxcbiAgICAgICAgICAgICAgIGFzc3VtZSB0aGUgbG9uZ2VyIGlzIGdyZWF0ZXIuIEUuZy4gMS4xLjEgPiAxLjEgKi9cbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gYVZlckFyci5sZW5ndGggfHwgYVZlckFycltpbmRleF0gPCBiVmVyQXJyW2luZGV4XSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGluZGV4ID09PSBiVmVyQXJyLmxlbmd0aCB8fCBhVmVyQXJyW2luZGV4XSA+IGJWZXJBcnJbaW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBjb21wYXJlIHZlcnNpb24gc3RyaW5ncycsIGUpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59O1xuLyoqXG4gKiBDaGVjayBpZiB0aGUgRkRDMyB2ZXJzaW9uIGluIGFuIEltcGxlbWVudGF0aW9uTWV0YWRhdGEgb2JqZWN0IGlzIGdyZWF0ZXIgdGhhblxuICogb3IgZXF1YWwgdG8gdGhlIHN1cHBsaWVkIG51bWVyaWMgc2VtdmVyIHZlcnNpb24gbnVtYmVyIHN0cmluZyAoaW4gdGhlIGZvcm0gYDEuMi4zYCkuXG4gKlxuICogUmV0dXJucyBhIGJvb2xlYW4gb3IgbnVsbCBpZiBhbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBjb21wYXJpbmcgdGhlIHZlcnNpb24gbnVtYmVycy5cbiAqXG4gKiBAcGFyYW0gbWV0YWRhdGFcbiAqIEBwYXJhbSB2ZXJzaW9uXG4gKi9cbnZhciB2ZXJzaW9uSXNBdExlYXN0ID0gZnVuY3Rpb24gKG1ldGFkYXRhLCB2ZXJzaW9uKSB7XG4gICAgdmFyIGNvbXBhcmlzb24gPSBjb21wYXJlVmVyc2lvbk51bWJlcnMobWV0YWRhdGEuZmRjM1ZlcnNpb24sIHZlcnNpb24pO1xuICAgIHJldHVybiBjb21wYXJpc29uID09PSBudWxsID8gbnVsbCA6IGNvbXBhcmlzb24gPj0gMCA/IHRydWUgOiBmYWxzZTtcbn07XG5cbi8qKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqIENvcHlyaWdodCBGSU5PUyBGREMzIGNvbnRyaWJ1dG9ycyAtIHNlZSBOT1RJQ0UgZmlsZVxuICovXG4vKipcbiAqIEBkZXByZWNhdGVkIFVzZSB7QGxpbmsgU3RhbmRhcmRDb250ZXh0VHlwZX0gaW5zdGVhZFxuICovXG52YXIgQ29udGV4dFR5cGVzO1xuKGZ1bmN0aW9uIChDb250ZXh0VHlwZXMpIHtcbiAgICBDb250ZXh0VHlwZXNbXCJDaGFydFwiXSA9IFwiZmRjMy5jaGFydFwiO1xuICAgIENvbnRleHRUeXBlc1tcIkNoYXRJbml0U2V0dGluZ3NcIl0gPSBcImZkYzMuY2hhdC5pbml0U2V0dGluZ3NcIjtcbiAgICBDb250ZXh0VHlwZXNbXCJDaGF0Um9vbVwiXSA9IFwiZmRjMy5jaGF0LnJvb21cIjtcbiAgICBDb250ZXh0VHlwZXNbXCJDb250YWN0XCJdID0gXCJmZGMzLmNvbnRhY3RcIjtcbiAgICBDb250ZXh0VHlwZXNbXCJDb250YWN0TGlzdFwiXSA9IFwiZmRjMy5jb250YWN0TGlzdFwiO1xuICAgIENvbnRleHRUeXBlc1tcIkNvdW50cnlcIl0gPSBcImZkYzMuY291bnRyeVwiO1xuICAgIENvbnRleHRUeXBlc1tcIkN1cnJlbmN5XCJdID0gXCJmZGMzLmN1cnJlbmN5XCI7XG4gICAgQ29udGV4dFR5cGVzW1wiRW1haWxcIl0gPSBcImZkYzMuZW1haWxcIjtcbiAgICBDb250ZXh0VHlwZXNbXCJJbnN0cnVtZW50XCJdID0gXCJmZGMzLmluc3RydW1lbnRcIjtcbiAgICBDb250ZXh0VHlwZXNbXCJJbnN0cnVtZW50TGlzdFwiXSA9IFwiZmRjMy5pbnN0cnVtZW50TGlzdFwiO1xuICAgIENvbnRleHRUeXBlc1tcIkludGVyYWN0aW9uXCJdID0gXCJmZGMzLmludGVyYWN0aW9uXCI7XG4gICAgQ29udGV4dFR5cGVzW1wiTm90aGluZ1wiXSA9IFwiZmRjMy5ub3RoaW5nXCI7XG4gICAgQ29udGV4dFR5cGVzW1wiT3JnYW5pemF0aW9uXCJdID0gXCJmZGMzLm9yZ2FuaXphdGlvblwiO1xuICAgIENvbnRleHRUeXBlc1tcIlBvcnRmb2xpb1wiXSA9IFwiZmRjMy5wb3J0Zm9saW9cIjtcbiAgICBDb250ZXh0VHlwZXNbXCJQb3NpdGlvblwiXSA9IFwiZmRjMy5wb3NpdGlvblwiO1xuICAgIENvbnRleHRUeXBlc1tcIkNoYXRTZWFyY2hDcml0ZXJpYVwiXSA9IFwiZmRjMy5jaGF0LnNlYXJjaENyaXRlcmlhXCI7XG4gICAgQ29udGV4dFR5cGVzW1wiVGltZVJhbmdlXCJdID0gXCJmZGMzLnRpbWVSYW5nZVwiO1xuICAgIENvbnRleHRUeXBlc1tcIlRyYW5zYWN0aW9uUmVzdWx0XCJdID0gXCJmZGMzLnRyYW5zYWN0aW9uUmVzdWx0XCI7XG4gICAgQ29udGV4dFR5cGVzW1wiVmFsdWF0aW9uXCJdID0gXCJmZGMzLnZhbHVhdGlvblwiO1xufSkoQ29udGV4dFR5cGVzIHx8IChDb250ZXh0VHlwZXMgPSB7fSkpO1xuXG4vLyBUbyBwYXJzZSB0aGlzIGRhdGE6XG4vL1xuLy8gICBpbXBvcnQgeyBDb252ZXJ0LCBBY3Rpb24sIENoYXJ0LCBDaGF0SW5pdFNldHRpbmdzLCBDaGF0TWVzc2FnZSwgQ2hhdFJvb20sIENoYXRTZWFyY2hDcml0ZXJpYSwgQ29udGFjdCwgQ29udGFjdExpc3QsIENvbnRleHQsIENvdW50cnksIEN1cnJlbmN5LCBFbWFpbCwgSW5zdHJ1bWVudCwgSW5zdHJ1bWVudExpc3QsIEludGVyYWN0aW9uLCBNZXNzYWdlLCBOb3RoaW5nLCBPcmRlciwgT3JkZXJMaXN0LCBPcmdhbml6YXRpb24sIFBvcnRmb2xpbywgUG9zaXRpb24sIFByb2R1Y3QsIFRpbWVSYW5nZSwgVHJhZGUsIFRyYWRlTGlzdCwgVHJhbnNhY3Rpb25SZXN1bHQsIFZhbHVhdGlvbiB9IGZyb20gXCIuL2ZpbGVcIjtcbi8vXG4vLyAgIGNvbnN0IGFjdGlvbiA9IENvbnZlcnQudG9BY3Rpb24oanNvbik7XG4vLyAgIGNvbnN0IGNoYXJ0ID0gQ29udmVydC50b0NoYXJ0KGpzb24pO1xuLy8gICBjb25zdCBjaGF0SW5pdFNldHRpbmdzID0gQ29udmVydC50b0NoYXRJbml0U2V0dGluZ3MoanNvbik7XG4vLyAgIGNvbnN0IGNoYXRNZXNzYWdlID0gQ29udmVydC50b0NoYXRNZXNzYWdlKGpzb24pO1xuLy8gICBjb25zdCBjaGF0Um9vbSA9IENvbnZlcnQudG9DaGF0Um9vbShqc29uKTtcbi8vICAgY29uc3QgY2hhdFNlYXJjaENyaXRlcmlhID0gQ29udmVydC50b0NoYXRTZWFyY2hDcml0ZXJpYShqc29uKTtcbi8vICAgY29uc3QgY29udGFjdCA9IENvbnZlcnQudG9Db250YWN0KGpzb24pO1xuLy8gICBjb25zdCBjb250YWN0TGlzdCA9IENvbnZlcnQudG9Db250YWN0TGlzdChqc29uKTtcbi8vICAgY29uc3QgY29udGV4dCA9IENvbnZlcnQudG9Db250ZXh0KGpzb24pO1xuLy8gICBjb25zdCBjb3VudHJ5ID0gQ29udmVydC50b0NvdW50cnkoanNvbik7XG4vLyAgIGNvbnN0IGN1cnJlbmN5ID0gQ29udmVydC50b0N1cnJlbmN5KGpzb24pO1xuLy8gICBjb25zdCBlbWFpbCA9IENvbnZlcnQudG9FbWFpbChqc29uKTtcbi8vICAgY29uc3QgaW5zdHJ1bWVudCA9IENvbnZlcnQudG9JbnN0cnVtZW50KGpzb24pO1xuLy8gICBjb25zdCBpbnN0cnVtZW50TGlzdCA9IENvbnZlcnQudG9JbnN0cnVtZW50TGlzdChqc29uKTtcbi8vICAgY29uc3QgaW50ZXJhY3Rpb24gPSBDb252ZXJ0LnRvSW50ZXJhY3Rpb24oanNvbik7XG4vLyAgIGNvbnN0IG1lc3NhZ2UgPSBDb252ZXJ0LnRvTWVzc2FnZShqc29uKTtcbi8vICAgY29uc3Qgbm90aGluZyA9IENvbnZlcnQudG9Ob3RoaW5nKGpzb24pO1xuLy8gICBjb25zdCBvcmRlciA9IENvbnZlcnQudG9PcmRlcihqc29uKTtcbi8vICAgY29uc3Qgb3JkZXJMaXN0ID0gQ29udmVydC50b09yZGVyTGlzdChqc29uKTtcbi8vICAgY29uc3Qgb3JnYW5pemF0aW9uID0gQ29udmVydC50b09yZ2FuaXphdGlvbihqc29uKTtcbi8vICAgY29uc3QgcG9ydGZvbGlvID0gQ29udmVydC50b1BvcnRmb2xpbyhqc29uKTtcbi8vICAgY29uc3QgcG9zaXRpb24gPSBDb252ZXJ0LnRvUG9zaXRpb24oanNvbik7XG4vLyAgIGNvbnN0IHByb2R1Y3QgPSBDb252ZXJ0LnRvUHJvZHVjdChqc29uKTtcbi8vICAgY29uc3QgdGltZVJhbmdlID0gQ29udmVydC50b1RpbWVSYW5nZShqc29uKTtcbi8vICAgY29uc3QgdHJhZGUgPSBDb252ZXJ0LnRvVHJhZGUoanNvbik7XG4vLyAgIGNvbnN0IHRyYWRlTGlzdCA9IENvbnZlcnQudG9UcmFkZUxpc3QoanNvbik7XG4vLyAgIGNvbnN0IHRyYW5zYWN0aW9uUmVzdWx0ID0gQ29udmVydC50b1RyYW5zYWN0aW9uUmVzdWx0KGpzb24pO1xuLy8gICBjb25zdCB2YWx1YXRpb24gPSBDb252ZXJ0LnRvVmFsdWF0aW9uKGpzb24pO1xuLy9cbi8vIFRoZXNlIGZ1bmN0aW9ucyB3aWxsIHRocm93IGFuIGVycm9yIGlmIHRoZSBKU09OIGRvZXNuJ3Rcbi8vIG1hdGNoIHRoZSBleHBlY3RlZCBpbnRlcmZhY2UsIGV2ZW4gaWYgdGhlIEpTT04gaXMgdmFsaWQuXG4vKipcbiAqIEZyZWUgdGV4dCB0byBiZSB1c2VkIGZvciBhIGtleXdvcmQgc2VhcmNoXG4gKlxuICogYGludGVyYWN0aW9uVHlwZWAgU0hPVUxEIGJlIG9uZSBvZiBgJ0luc3RhbnQgTWVzc2FnZSdgLCBgJ0VtYWlsJ2AsIGAnQ2FsbCdgLCBvclxuICogYCdNZWV0aW5nJ2AgYWx0aG91Z2ggb3RoZXIgc3RyaW5nIHZhbHVlcyBhcmUgcGVybWl0dGVkLlxuICovXG4vLyBDb252ZXJ0cyBKU09OIHN0cmluZ3MgdG8vZnJvbSB5b3VyIHR5cGVzXG4vLyBhbmQgYXNzZXJ0cyB0aGUgcmVzdWx0cyBvZiBKU09OLnBhcnNlIGF0IHJ1bnRpbWVcbnZhciBDb252ZXJ0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnZlcnQoKSB7XG4gICAgfVxuICAgIENvbnZlcnQudG9BY3Rpb24gPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKFwiQWN0aW9uXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQuYWN0aW9uVG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QodmFsdWUsIHIoXCJBY3Rpb25cIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9DaGFydCA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoXCJDaGFydFwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmNoYXJ0VG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QodmFsdWUsIHIoXCJDaGFydFwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0NoYXRJbml0U2V0dGluZ3MgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKFwiQ2hhdEluaXRTZXR0aW5nc1wiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmNoYXRJbml0U2V0dGluZ3NUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcihcIkNoYXRJbml0U2V0dGluZ3NcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9DaGF0TWVzc2FnZSA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoXCJDaGF0TWVzc2FnZVwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmNoYXRNZXNzYWdlVG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QodmFsdWUsIHIoXCJDaGF0TWVzc2FnZVwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0NoYXRSb29tID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcihcIkNoYXRSb29tXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQuY2hhdFJvb21Ub0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcihcIkNoYXRSb29tXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvQ2hhdFNlYXJjaENyaXRlcmlhID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcihcIkNoYXRTZWFyY2hDcml0ZXJpYVwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmNoYXRTZWFyY2hDcml0ZXJpYVRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKFwiQ2hhdFNlYXJjaENyaXRlcmlhXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvQ29udGFjdCA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoXCJDb250YWN0XCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQuY29udGFjdFRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKFwiQ29udGFjdFwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0NvbnRhY3RMaXN0ID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcihcIkNvbnRhY3RMaXN0XCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQuY29udGFjdExpc3RUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcihcIkNvbnRhY3RMaXN0XCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvQ29udGV4dCA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoXCJDb250ZXh0XCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQuY29udGV4dFRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKFwiQ29udGV4dFwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0NvdW50cnkgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKFwiQ291bnRyeVwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmNvdW50cnlUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcihcIkNvdW50cnlcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9DdXJyZW5jeSA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoXCJDdXJyZW5jeVwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmN1cnJlbmN5VG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QodmFsdWUsIHIoXCJDdXJyZW5jeVwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0VtYWlsID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcihcIkVtYWlsXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQuZW1haWxUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcihcIkVtYWlsXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvSW5zdHJ1bWVudCA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoXCJJbnN0cnVtZW50XCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQuaW5zdHJ1bWVudFRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKFwiSW5zdHJ1bWVudFwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0luc3RydW1lbnRMaXN0ID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcihcIkluc3RydW1lbnRMaXN0XCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQuaW5zdHJ1bWVudExpc3RUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcihcIkluc3RydW1lbnRMaXN0XCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvSW50ZXJhY3Rpb24gPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKFwiSW50ZXJhY3Rpb25cIikpO1xuICAgIH07XG4gICAgQ29udmVydC5pbnRlcmFjdGlvblRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKFwiSW50ZXJhY3Rpb25cIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9NZXNzYWdlID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcihcIk1lc3NhZ2VcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5tZXNzYWdlVG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QodmFsdWUsIHIoXCJNZXNzYWdlXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvTm90aGluZyA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoXCJOb3RoaW5nXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQubm90aGluZ1RvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKFwiTm90aGluZ1wiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b09yZGVyID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcihcIk9yZGVyXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQub3JkZXJUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcihcIk9yZGVyXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvT3JkZXJMaXN0ID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcihcIk9yZGVyTGlzdFwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0Lm9yZGVyTGlzdFRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKFwiT3JkZXJMaXN0XCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvT3JnYW5pemF0aW9uID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcihcIk9yZ2FuaXphdGlvblwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0Lm9yZ2FuaXphdGlvblRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKFwiT3JnYW5pemF0aW9uXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvUG9ydGZvbGlvID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcihcIlBvcnRmb2xpb1wiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LnBvcnRmb2xpb1RvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKFwiUG9ydGZvbGlvXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvUG9zaXRpb24gPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKFwiUG9zaXRpb25cIikpO1xuICAgIH07XG4gICAgQ29udmVydC5wb3NpdGlvblRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKFwiUG9zaXRpb25cIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9Qcm9kdWN0ID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcihcIlByb2R1Y3RcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5wcm9kdWN0VG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QodmFsdWUsIHIoXCJQcm9kdWN0XCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvVGltZVJhbmdlID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcihcIlRpbWVSYW5nZVwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRpbWVSYW5nZVRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKFwiVGltZVJhbmdlXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvVHJhZGUgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKFwiVHJhZGVcIikpO1xuICAgIH07XG4gICAgQ29udmVydC50cmFkZVRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKFwiVHJhZGVcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9UcmFkZUxpc3QgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKFwiVHJhZGVMaXN0XCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQudHJhZGVMaXN0VG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QodmFsdWUsIHIoXCJUcmFkZUxpc3RcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9UcmFuc2FjdGlvblJlc3VsdCA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoXCJUcmFuc2FjdGlvblJlc3VsdFwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRyYW5zYWN0aW9uUmVzdWx0VG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QodmFsdWUsIHIoXCJUcmFuc2FjdGlvblJlc3VsdFwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b1ZhbHVhdGlvbiA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoXCJWYWx1YXRpb25cIikpO1xuICAgIH07XG4gICAgQ29udmVydC52YWx1YXRpb25Ub0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcihcIlZhbHVhdGlvblwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgcmV0dXJuIENvbnZlcnQ7XG59KCkpO1xuZnVuY3Rpb24gaW52YWxpZFZhbHVlKHR5cCwgdmFsLCBrZXksIHBhcmVudCkge1xuICAgIGlmIChwYXJlbnQgPT09IHZvaWQgMCkgeyBwYXJlbnQgPSAnJzsgfVxuICAgIHZhciBwcmV0dHlUeXAgPSBwcmV0dHlUeXBlTmFtZSh0eXApO1xuICAgIHZhciBwYXJlbnRUZXh0ID0gcGFyZW50ID8gXCIgb24gXCIuY29uY2F0KHBhcmVudCkgOiAnJztcbiAgICB2YXIga2V5VGV4dCA9IGtleSA/IFwiIGZvciBrZXkgXFxcIlwiLmNvbmNhdChrZXksIFwiXFxcIlwiKSA6ICcnO1xuICAgIHRocm93IEVycm9yKFwiSW52YWxpZCB2YWx1ZVwiLmNvbmNhdChrZXlUZXh0KS5jb25jYXQocGFyZW50VGV4dCwgXCIuIEV4cGVjdGVkIFwiKS5jb25jYXQocHJldHR5VHlwLCBcIiBidXQgZ290IFwiKS5jb25jYXQoSlNPTi5zdHJpbmdpZnkodmFsKSkpO1xufVxuZnVuY3Rpb24gcHJldHR5VHlwZU5hbWUodHlwKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodHlwKSkge1xuICAgICAgICBpZiAodHlwLmxlbmd0aCA9PT0gMiAmJiB0eXBbMF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiYW4gb3B0aW9uYWwgXCIuY29uY2F0KHByZXR0eVR5cGVOYW1lKHR5cFsxXSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFwib25lIG9mIFtcIi5jb25jYXQodHlwLm1hcChmdW5jdGlvbiAoYSkgeyByZXR1cm4gcHJldHR5VHlwZU5hbWUoYSk7IH0pLmpvaW4oXCIsIFwiKSwgXCJdXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiB0eXAgPT09IFwib2JqZWN0XCIgJiYgdHlwLmxpdGVyYWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdHlwLmxpdGVyYWw7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHR5cDtcbiAgICB9XG59XG5mdW5jdGlvbiBqc29uVG9KU1Byb3BzKHR5cCkge1xuICAgIGlmICh0eXAuanNvblRvSlMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgbWFwXzEgPSB7fTtcbiAgICAgICAgdHlwLnByb3BzLmZvckVhY2goZnVuY3Rpb24gKHApIHsgcmV0dXJuIG1hcF8xW3AuanNvbl0gPSB7IGtleTogcC5qcywgdHlwOiBwLnR5cCB9OyB9KTtcbiAgICAgICAgdHlwLmpzb25Ub0pTID0gbWFwXzE7XG4gICAgfVxuICAgIHJldHVybiB0eXAuanNvblRvSlM7XG59XG5mdW5jdGlvbiBqc1RvSlNPTlByb3BzKHR5cCkge1xuICAgIGlmICh0eXAuanNUb0pTT04gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgbWFwXzIgPSB7fTtcbiAgICAgICAgdHlwLnByb3BzLmZvckVhY2goZnVuY3Rpb24gKHApIHsgcmV0dXJuIG1hcF8yW3AuanNdID0geyBrZXk6IHAuanNvbiwgdHlwOiBwLnR5cCB9OyB9KTtcbiAgICAgICAgdHlwLmpzVG9KU09OID0gbWFwXzI7XG4gICAgfVxuICAgIHJldHVybiB0eXAuanNUb0pTT047XG59XG5mdW5jdGlvbiB0cmFuc2Zvcm0odmFsLCB0eXAsIGdldFByb3BzLCBrZXksIHBhcmVudCkge1xuICAgIGlmIChrZXkgPT09IHZvaWQgMCkgeyBrZXkgPSAnJzsgfVxuICAgIGlmIChwYXJlbnQgPT09IHZvaWQgMCkgeyBwYXJlbnQgPSAnJzsgfVxuICAgIGZ1bmN0aW9uIHRyYW5zZm9ybVByaW1pdGl2ZSh0eXAsIHZhbCkge1xuICAgICAgICBpZiAodHlwZW9mIHR5cCA9PT0gdHlwZW9mIHZhbClcbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIHJldHVybiBpbnZhbGlkVmFsdWUodHlwLCB2YWwsIGtleSwgcGFyZW50KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdHJhbnNmb3JtVW5pb24odHlwcywgdmFsKSB7XG4gICAgICAgIC8vIHZhbCBtdXN0IHZhbGlkYXRlIGFnYWluc3Qgb25lIHR5cCBpbiB0eXBzXG4gICAgICAgIHZhciBsID0gdHlwcy5sZW5ndGg7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdHlwXzEgPSB0eXBzW2ldO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJhbnNmb3JtKHZhbCwgdHlwXzEsIGdldFByb3BzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChfKSB7IH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW52YWxpZFZhbHVlKHR5cHMsIHZhbCwga2V5LCBwYXJlbnQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB0cmFuc2Zvcm1FbnVtKGNhc2VzLCB2YWwpIHtcbiAgICAgICAgaWYgKGNhc2VzLmluZGV4T2YodmFsKSAhPT0gLTEpXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICByZXR1cm4gaW52YWxpZFZhbHVlKGNhc2VzLm1hcChmdW5jdGlvbiAoYSkgeyByZXR1cm4gbChhKTsgfSksIHZhbCwga2V5LCBwYXJlbnQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB0cmFuc2Zvcm1BcnJheSh0eXAsIHZhbCkge1xuICAgICAgICAvLyB2YWwgbXVzdCBiZSBhbiBhcnJheSB3aXRoIG5vIGludmFsaWQgZWxlbWVudHNcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbCkpXG4gICAgICAgICAgICByZXR1cm4gaW52YWxpZFZhbHVlKGwoXCJhcnJheVwiKSwgdmFsLCBrZXksIHBhcmVudCk7XG4gICAgICAgIHJldHVybiB2YWwubWFwKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gdHJhbnNmb3JtKGVsLCB0eXAsIGdldFByb3BzKTsgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRyYW5zZm9ybURhdGUodmFsKSB7XG4gICAgICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkID0gbmV3IERhdGUodmFsKTtcbiAgICAgICAgaWYgKGlzTmFOKGQudmFsdWVPZigpKSkge1xuICAgICAgICAgICAgcmV0dXJuIGludmFsaWRWYWx1ZShsKFwiRGF0ZVwiKSwgdmFsLCBrZXksIHBhcmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRyYW5zZm9ybU9iamVjdChwcm9wcywgYWRkaXRpb25hbCwgdmFsKSB7XG4gICAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCAhPT0gXCJvYmplY3RcIiB8fCBBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnZhbGlkVmFsdWUobChyZWYgfHwgXCJvYmplY3RcIiksIHZhbCwga2V5LCBwYXJlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocHJvcHMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgdmFyIHByb3AgPSBwcm9wc1trZXldO1xuICAgICAgICAgICAgdmFyIHYgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodmFsLCBrZXkpID8gdmFsW2tleV0gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICByZXN1bHRbcHJvcC5rZXldID0gdHJhbnNmb3JtKHYsIHByb3AudHlwLCBnZXRQcm9wcywga2V5LCByZWYpO1xuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModmFsKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3BzLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB0cmFuc2Zvcm0odmFsW2tleV0sIGFkZGl0aW9uYWwsIGdldFByb3BzLCBrZXksIHJlZik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBpZiAodHlwID09PSBcImFueVwiKVxuICAgICAgICByZXR1cm4gdmFsO1xuICAgIGlmICh0eXAgPT09IG51bGwpIHtcbiAgICAgICAgaWYgKHZhbCA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIHJldHVybiBpbnZhbGlkVmFsdWUodHlwLCB2YWwsIGtleSwgcGFyZW50KTtcbiAgICB9XG4gICAgaWYgKHR5cCA9PT0gZmFsc2UpXG4gICAgICAgIHJldHVybiBpbnZhbGlkVmFsdWUodHlwLCB2YWwsIGtleSwgcGFyZW50KTtcbiAgICB2YXIgcmVmID0gdW5kZWZpbmVkO1xuICAgIHdoaWxlICh0eXBlb2YgdHlwID09PSBcIm9iamVjdFwiICYmIHR5cC5yZWYgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZWYgPSB0eXAucmVmO1xuICAgICAgICB0eXAgPSB0eXBlTWFwW3R5cC5yZWZdO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0eXApKVxuICAgICAgICByZXR1cm4gdHJhbnNmb3JtRW51bSh0eXAsIHZhbCk7XG4gICAgaWYgKHR5cGVvZiB0eXAgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgcmV0dXJuIHR5cC5oYXNPd25Qcm9wZXJ0eShcInVuaW9uTWVtYmVyc1wiKSA/IHRyYW5zZm9ybVVuaW9uKHR5cC51bmlvbk1lbWJlcnMsIHZhbClcbiAgICAgICAgICAgIDogdHlwLmhhc093blByb3BlcnR5KFwiYXJyYXlJdGVtc1wiKSA/IHRyYW5zZm9ybUFycmF5KHR5cC5hcnJheUl0ZW1zLCB2YWwpXG4gICAgICAgICAgICAgICAgOiB0eXAuaGFzT3duUHJvcGVydHkoXCJwcm9wc1wiKSA/IHRyYW5zZm9ybU9iamVjdChnZXRQcm9wcyh0eXApLCB0eXAuYWRkaXRpb25hbCwgdmFsKVxuICAgICAgICAgICAgICAgICAgICA6IGludmFsaWRWYWx1ZSh0eXAsIHZhbCwga2V5LCBwYXJlbnQpO1xuICAgIH1cbiAgICAvLyBOdW1iZXJzIGNhbiBiZSBwYXJzZWQgYnkgRGF0ZSBidXQgc2hvdWxkbid0IGJlLlxuICAgIGlmICh0eXAgPT09IERhdGUgJiYgdHlwZW9mIHZhbCAhPT0gXCJudW1iZXJcIilcbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybURhdGUodmFsKTtcbiAgICByZXR1cm4gdHJhbnNmb3JtUHJpbWl0aXZlKHR5cCwgdmFsKTtcbn1cbmZ1bmN0aW9uIGNhc3QodmFsLCB0eXApIHtcbiAgICByZXR1cm4gdHJhbnNmb3JtKHZhbCwgdHlwLCBqc29uVG9KU1Byb3BzKTtcbn1cbmZ1bmN0aW9uIHVuY2FzdCh2YWwsIHR5cCkge1xuICAgIHJldHVybiB0cmFuc2Zvcm0odmFsLCB0eXAsIGpzVG9KU09OUHJvcHMpO1xufVxuZnVuY3Rpb24gbCh0eXApIHtcbiAgICByZXR1cm4geyBsaXRlcmFsOiB0eXAgfTtcbn1cbmZ1bmN0aW9uIGEodHlwKSB7XG4gICAgcmV0dXJuIHsgYXJyYXlJdGVtczogdHlwIH07XG59XG5mdW5jdGlvbiB1KCkge1xuICAgIHZhciB0eXBzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdHlwc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICByZXR1cm4geyB1bmlvbk1lbWJlcnM6IHR5cHMgfTtcbn1cbmZ1bmN0aW9uIG8ocHJvcHMsIGFkZGl0aW9uYWwpIHtcbiAgICByZXR1cm4geyBwcm9wczogcHJvcHMsIGFkZGl0aW9uYWw6IGFkZGl0aW9uYWwgfTtcbn1cbmZ1bmN0aW9uIG0oYWRkaXRpb25hbCkge1xuICAgIHJldHVybiB7IHByb3BzOiBbXSwgYWRkaXRpb25hbDogYWRkaXRpb25hbCB9O1xufVxuZnVuY3Rpb24gcihuYW1lKSB7XG4gICAgcmV0dXJuIHsgcmVmOiBuYW1lIH07XG59XG52YXIgdHlwZU1hcCA9IHtcbiAgICBcIkFjdGlvblwiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcImFwcFwiLCBqczogXCJhcHBcIiwgdHlwOiB1KHVuZGVmaW5lZCwgcihcIkFjdGlvblRhcmdldEFwcFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcImNvbnRleHRcIiwganM6IFwiY29udGV4dFwiLCB0eXA6IHIoXCJDb250ZXh0RWxlbWVudFwiKSB9LFxuICAgICAgICB7IGpzb246IFwiaW50ZW50XCIsIGpzOiBcImludGVudFwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwidGl0bGVcIiwganM6IFwidGl0bGVcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByKFwiQWN0aW9uVHlwZVwiKSB9LFxuICAgICAgICB7IGpzb246IFwiaWRcIiwganM6IFwiaWRcIiwgdHlwOiB1KHVuZGVmaW5lZCwgbShcImFueVwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcIm5hbWVcIiwganM6IFwibmFtZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiQWN0aW9uVGFyZ2V0QXBwXCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiYXBwSWRcIiwganM6IFwiYXBwSWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJkZXNrdG9wQWdlbnRcIiwganM6IFwiZGVza3RvcEFnZW50XCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJpbnN0YW5jZUlkXCIsIGpzOiBcImluc3RhbmNlSWRcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIkNvbnRleHRFbGVtZW50XCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiaWRcIiwganM6IFwiaWRcIiwgdHlwOiB1KHVuZGVmaW5lZCwgbShcImFueVwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcIm5hbWVcIiwganM6IFwibmFtZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogXCJcIiB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiQ2hhcnRcIjogbyhbXG4gICAgICAgIHsganNvbjogXCJpbnN0cnVtZW50c1wiLCBqczogXCJpbnN0cnVtZW50c1wiLCB0eXA6IGEocihcIkluc3RydW1lbnRFbGVtZW50XCIpKSB9LFxuICAgICAgICB7IGpzb246IFwib3RoZXJDb25maWdcIiwganM6IFwib3RoZXJDb25maWdcIiwgdHlwOiB1KHVuZGVmaW5lZCwgYShyKFwiQ29udGV4dEVsZW1lbnRcIikpKSB9LFxuICAgICAgICB7IGpzb246IFwicmFuZ2VcIiwganM6IFwicmFuZ2VcIiwgdHlwOiB1KHVuZGVmaW5lZCwgcihcIlRpbWVSYW5nZU9iamVjdFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInN0eWxlXCIsIGpzOiBcInN0eWxlXCIsIHR5cDogdSh1bmRlZmluZWQsIHIoXCJDaGFydFN0eWxlXCIpKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogcihcIkNoYXJ0VHlwZVwiKSB9LFxuICAgICAgICB7IGpzb246IFwiaWRcIiwganM6IFwiaWRcIiwgdHlwOiB1KHVuZGVmaW5lZCwgbShcImFueVwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcIm5hbWVcIiwganM6IFwibmFtZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiSW5zdHJ1bWVudEVsZW1lbnRcIjogbyhbXG4gICAgICAgIHsganNvbjogXCJpZFwiLCBqczogXCJpZFwiLCB0eXA6IHIoXCJQdXJwbGVJbnN0cnVtZW50SWRlbnRpZmllcnNcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIm1hcmtldFwiLCBqczogXCJtYXJrZXRcIiwgdHlwOiB1KHVuZGVmaW5lZCwgcihcIk9yZ2FuaXphdGlvbk1hcmtldFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIoXCJQdXJwbGVJbnRlcmFjdGlvblR5cGVcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIm5hbWVcIiwganM6IFwibmFtZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiUHVycGxlSW5zdHJ1bWVudElkZW50aWZpZXJzXCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiQkJHXCIsIGpzOiBcIkJCR1wiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiQ1VTSVBcIiwganM6IFwiQ1VTSVBcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIkZEU19JRFwiLCBqczogXCJGRFNfSURcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIkZJR0lcIiwganM6IFwiRklHSVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiSVNJTlwiLCBqczogXCJJU0lOXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJQRVJNSURcIiwganM6IFwiUEVSTUlEXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJSSUNcIiwganM6IFwiUklDXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJTRURPTFwiLCBqczogXCJTRURPTFwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwidGlja2VyXCIsIGpzOiBcInRpY2tlclwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiT3JnYW5pemF0aW9uTWFya2V0XCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiQkJHXCIsIGpzOiBcIkJCR1wiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiQ09VTlRSWV9JU09BTFBIQTJcIiwganM6IFwiQ09VTlRSWV9JU09BTFBIQTJcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIk1JQ1wiLCBqczogXCJNSUNcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIm5hbWVcIiwganM6IFwibmFtZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiVGltZVJhbmdlT2JqZWN0XCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiZW5kVGltZVwiLCBqczogXCJlbmRUaW1lXCIsIHR5cDogdSh1bmRlZmluZWQsIERhdGUpIH0sXG4gICAgICAgIHsganNvbjogXCJzdGFydFRpbWVcIiwganM6IFwic3RhcnRUaW1lXCIsIHR5cDogdSh1bmRlZmluZWQsIERhdGUpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByKFwiVGltZVJhbmdlVHlwZVwiKSB9LFxuICAgICAgICB7IGpzb246IFwiaWRcIiwganM6IFwiaWRcIiwgdHlwOiB1KHVuZGVmaW5lZCwgbShcImFueVwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcIm5hbWVcIiwganM6IFwibmFtZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiQ2hhdEluaXRTZXR0aW5nc1wiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcImNoYXROYW1lXCIsIGpzOiBcImNoYXROYW1lXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJtZW1iZXJzXCIsIGpzOiBcIm1lbWJlcnNcIiwgdHlwOiB1KHVuZGVmaW5lZCwgcihcIkNvbnRhY3RMaXN0T2JqZWN0XCIpKSB9LFxuICAgICAgICB7IGpzb246IFwibWVzc2FnZVwiLCBqczogXCJtZXNzYWdlXCIsIHR5cDogdSh1bmRlZmluZWQsIHUocihcIk1lc3NhZ2VPYmplY3RcIiksIFwiXCIpKSB9LFxuICAgICAgICB7IGpzb246IFwib3B0aW9uc1wiLCBqczogXCJvcHRpb25zXCIsIHR5cDogdSh1bmRlZmluZWQsIHIoXCJDaGF0T3B0aW9uc1wiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIoXCJDaGF0SW5pdFNldHRpbmdzVHlwZVwiKSB9LFxuICAgICAgICB7IGpzb246IFwiaWRcIiwganM6IFwiaWRcIiwgdHlwOiB1KHVuZGVmaW5lZCwgbShcImFueVwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcIm5hbWVcIiwganM6IFwibmFtZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiQ29udGFjdExpc3RPYmplY3RcIjogbyhbXG4gICAgICAgIHsganNvbjogXCJjb250YWN0c1wiLCBqczogXCJjb250YWN0c1wiLCB0eXA6IGEocihcIkNvbnRhY3RFbGVtZW50XCIpKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogcihcIkNvbnRhY3RMaXN0VHlwZVwiKSB9LFxuICAgICAgICB7IGpzb246IFwiaWRcIiwganM6IFwiaWRcIiwgdHlwOiB1KHVuZGVmaW5lZCwgbShcImFueVwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcIm5hbWVcIiwganM6IFwibmFtZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiQ29udGFjdEVsZW1lbnRcIjogbyhbXG4gICAgICAgIHsganNvbjogXCJpZFwiLCBqczogXCJpZFwiLCB0eXA6IHIoXCJQdXJwbGVDb250YWN0SWRlbnRpZmllcnNcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIoXCJGbHVmZnlJbnRlcmFjdGlvblR5cGVcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIm5hbWVcIiwganM6IFwibmFtZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiUHVycGxlQ29udGFjdElkZW50aWZpZXJzXCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiZW1haWxcIiwganM6IFwiZW1haWxcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIkZEU19JRFwiLCBqczogXCJGRFNfSURcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIk1lc3NhZ2VPYmplY3RcIjogbyhbXG4gICAgICAgIHsganNvbjogXCJlbnRpdGllc1wiLCBqczogXCJlbnRpdGllc1wiLCB0eXA6IHUodW5kZWZpbmVkLCBtKHIoXCJQdXJwbGVBY3Rpb25cIikpKSB9LFxuICAgICAgICB7IGpzb246IFwidGV4dFwiLCBqczogXCJ0ZXh0XCIsIHR5cDogdSh1bmRlZmluZWQsIHIoXCJQdXJwbGVNZXNzYWdlVGV4dFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIoXCJNZXNzYWdlVHlwZVwiKSB9LFxuICAgICAgICB7IGpzb246IFwiaWRcIiwganM6IFwiaWRcIiwgdHlwOiB1KHVuZGVmaW5lZCwgbShcImFueVwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcIm5hbWVcIiwganM6IFwibmFtZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiUHVycGxlQWN0aW9uXCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiYXBwXCIsIGpzOiBcImFwcFwiLCB0eXA6IHUodW5kZWZpbmVkLCByKFwiQWN0aW9uVGFyZ2V0QXBwXCIpKSB9LFxuICAgICAgICB7IGpzb246IFwiY29udGV4dFwiLCBqczogXCJjb250ZXh0XCIsIHR5cDogdSh1bmRlZmluZWQsIHIoXCJDb250ZXh0RWxlbWVudFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcImludGVudFwiLCBqczogXCJpbnRlbnRcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInRpdGxlXCIsIGpzOiBcInRpdGxlXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByKFwiRW50aXR5VHlwZVwiKSB9LFxuICAgICAgICB7IGpzb246IFwiaWRcIiwganM6IFwiaWRcIiwgdHlwOiB1KHVuZGVmaW5lZCwgbShcImFueVwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcIm5hbWVcIiwganM6IFwibmFtZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiZGF0YVwiLCBqczogXCJkYXRhXCIsIHR5cDogdSh1bmRlZmluZWQsIHIoXCJQdXJwbGVEYXRhXCIpKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiUHVycGxlRGF0YVwiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcImRhdGFVcmlcIiwganM6IFwiZGF0YVVyaVwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcIm5hbWVcIiwganM6IFwibmFtZVwiLCB0eXA6IFwiXCIgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIlB1cnBsZU1lc3NhZ2VUZXh0XCI6IG8oW1xuICAgICAgICB7IGpzb246IFwidGV4dC9tYXJrZG93blwiLCBqczogXCJ0ZXh0L21hcmtkb3duXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0ZXh0L3BsYWluXCIsIGpzOiBcInRleHQvcGxhaW5cIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIkNoYXRPcHRpb25zXCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiYWxsb3dBZGRVc2VyXCIsIGpzOiBcImFsbG93QWRkVXNlclwiLCB0eXA6IHUodW5kZWZpbmVkLCB0cnVlKSB9LFxuICAgICAgICB7IGpzb246IFwiYWxsb3dIaXN0b3J5QnJvd3NpbmdcIiwganM6IFwiYWxsb3dIaXN0b3J5QnJvd3NpbmdcIiwgdHlwOiB1KHVuZGVmaW5lZCwgdHJ1ZSkgfSxcbiAgICAgICAgeyBqc29uOiBcImFsbG93TWVzc2FnZUNvcHlcIiwganM6IFwiYWxsb3dNZXNzYWdlQ29weVwiLCB0eXA6IHUodW5kZWZpbmVkLCB0cnVlKSB9LFxuICAgICAgICB7IGpzb246IFwiZ3JvdXBSZWNpcGllbnRzXCIsIGpzOiBcImdyb3VwUmVjaXBpZW50c1wiLCB0eXA6IHUodW5kZWZpbmVkLCB0cnVlKSB9LFxuICAgICAgICB7IGpzb246IFwiaXNQdWJsaWNcIiwganM6IFwiaXNQdWJsaWNcIiwgdHlwOiB1KHVuZGVmaW5lZCwgdHJ1ZSkgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIkNoYXRNZXNzYWdlXCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiY2hhdFJvb21cIiwganM6IFwiY2hhdFJvb21cIiwgdHlwOiByKFwiQ2hhdFJvb21PYmplY3RcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIm1lc3NhZ2VcIiwganM6IFwibWVzc2FnZVwiLCB0eXA6IHIoXCJNZXNzYWdlT2JqZWN0XCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByKFwiQ2hhdE1lc3NhZ2VUeXBlXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJpZFwiLCBqczogXCJpZFwiLCB0eXA6IHUodW5kZWZpbmVkLCBtKFwiYW55XCIpKSB9LFxuICAgICAgICB7IGpzb246IFwibmFtZVwiLCBqczogXCJuYW1lXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJDaGF0Um9vbU9iamVjdFwiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcImlkXCIsIGpzOiBcImlkXCIsIHR5cDogbShcImFueVwiKSB9LFxuICAgICAgICB7IGpzb246IFwibmFtZVwiLCBqczogXCJuYW1lXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwcm92aWRlck5hbWVcIiwganM6IFwicHJvdmlkZXJOYW1lXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogcihcIkNoYXRSb29tVHlwZVwiKSB9LFxuICAgICAgICB7IGpzb246IFwidXJsXCIsIGpzOiBcInVybFwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiQ2hhdFJvb21cIjogbyhbXG4gICAgICAgIHsganNvbjogXCJpZFwiLCBqczogXCJpZFwiLCB0eXA6IG0oXCJhbnlcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIm5hbWVcIiwganM6IFwibmFtZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwicHJvdmlkZXJOYW1lXCIsIGpzOiBcInByb3ZpZGVyTmFtZVwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIoXCJDaGF0Um9vbVR5cGVcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInVybFwiLCBqczogXCJ1cmxcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIkNoYXRTZWFyY2hDcml0ZXJpYVwiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcImNyaXRlcmlhXCIsIGpzOiBcImNyaXRlcmlhXCIsIHR5cDogYSh1KHIoXCJPcmdhbml6YXRpb25PYmplY3RcIiksIFwiXCIpKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogcihcIkNoYXRTZWFyY2hDcml0ZXJpYVR5cGVcIikgfSxcbiAgICAgICAgeyBqc29uOiBcImlkXCIsIGpzOiBcImlkXCIsIHR5cDogdSh1bmRlZmluZWQsIG0oXCJhbnlcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIk9yZ2FuaXphdGlvbk9iamVjdFwiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcImlkXCIsIGpzOiBcImlkXCIsIHR5cDogcihcIklkZW50aWZpZXJzXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJtYXJrZXRcIiwganM6IFwibWFya2V0XCIsIHR5cDogdSh1bmRlZmluZWQsIHIoXCJPcmdhbml6YXRpb25NYXJrZXRcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByKFwiVGVudGFjbGVkSW50ZXJhY3Rpb25UeXBlXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIklkZW50aWZpZXJzXCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiQkJHXCIsIGpzOiBcIkJCR1wiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiQ1VTSVBcIiwganM6IFwiQ1VTSVBcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIkZEU19JRFwiLCBqczogXCJGRFNfSURcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIkZJR0lcIiwganM6IFwiRklHSVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiSVNJTlwiLCBqczogXCJJU0lOXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJQRVJNSURcIiwganM6IFwiUEVSTUlEXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJSSUNcIiwganM6IFwiUklDXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJTRURPTFwiLCBqczogXCJTRURPTFwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwidGlja2VyXCIsIGpzOiBcInRpY2tlclwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiTEVJXCIsIGpzOiBcIkxFSVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiZW1haWxcIiwganM6IFwiZW1haWxcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIkNvbnRhY3RcIjogbyhbXG4gICAgICAgIHsganNvbjogXCJpZFwiLCBqczogXCJpZFwiLCB0eXA6IHIoXCJGbHVmZnlDb250YWN0SWRlbnRpZmllcnNcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIoXCJGbHVmZnlJbnRlcmFjdGlvblR5cGVcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIm5hbWVcIiwganM6IFwibmFtZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiRmx1ZmZ5Q29udGFjdElkZW50aWZpZXJzXCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiZW1haWxcIiwganM6IFwiZW1haWxcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIkZEU19JRFwiLCBqczogXCJGRFNfSURcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIkNvbnRhY3RMaXN0XCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiY29udGFjdHNcIiwganM6IFwiY29udGFjdHNcIiwgdHlwOiBhKHIoXCJDb250YWN0RWxlbWVudFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIoXCJDb250YWN0TGlzdFR5cGVcIikgfSxcbiAgICAgICAgeyBqc29uOiBcImlkXCIsIGpzOiBcImlkXCIsIHR5cDogdSh1bmRlZmluZWQsIG0oXCJhbnlcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIkNvbnRleHRcIjogbyhbXG4gICAgICAgIHsganNvbjogXCJpZFwiLCBqczogXCJpZFwiLCB0eXA6IHUodW5kZWZpbmVkLCBtKFwiYW55XCIpKSB9LFxuICAgICAgICB7IGpzb246IFwibmFtZVwiLCBqczogXCJuYW1lXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiBcIlwiIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJDb3VudHJ5XCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiaWRcIiwganM6IFwiaWRcIiwgdHlwOiByKFwiQ291bnRyeUlEXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByKFwiQ291bnRyeVR5cGVcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIm5hbWVcIiwganM6IFwibmFtZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiQ291bnRyeUlEXCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiQ09VTlRSWV9JU09BTFBIQTJcIiwganM6IFwiQ09VTlRSWV9JU09BTFBIQTJcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIkNPVU5UUllfSVNPQUxQSEEzXCIsIGpzOiBcIkNPVU5UUllfSVNPQUxQSEEzXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJJU09BTFBIQTJcIiwganM6IFwiSVNPQUxQSEEyXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJJU09BTFBIQTNcIiwganM6IFwiSVNPQUxQSEEzXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJDdXJyZW5jeVwiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcImlkXCIsIGpzOiBcImlkXCIsIHR5cDogcihcIkN1cnJlbmN5SURcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIm5hbWVcIiwganM6IFwibmFtZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogcihcIkN1cnJlbmN5VHlwZVwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiQ3VycmVuY3lJRFwiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcIkNVUlJFTkNZX0lTT0NPREVcIiwganM6IFwiQ1VSUkVOQ1lfSVNPQ09ERVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiRW1haWxcIjogbyhbXG4gICAgICAgIHsganNvbjogXCJyZWNpcGllbnRzXCIsIGpzOiBcInJlY2lwaWVudHNcIiwgdHlwOiByKFwiRW1haWxSZWNpcGllbnRzXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJzdWJqZWN0XCIsIGpzOiBcInN1YmplY3RcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInRleHRCb2R5XCIsIGpzOiBcInRleHRCb2R5XCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByKFwiRW1haWxUeXBlXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJpZFwiLCBqczogXCJpZFwiLCB0eXA6IHUodW5kZWZpbmVkLCBtKFwiYW55XCIpKSB9LFxuICAgICAgICB7IGpzb246IFwibmFtZVwiLCBqczogXCJuYW1lXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJFbWFpbFJlY2lwaWVudHNcIjogbyhbXG4gICAgICAgIHsganNvbjogXCJpZFwiLCBqczogXCJpZFwiLCB0eXA6IHUodW5kZWZpbmVkLCByKFwiRW1haWxSZWNpcGllbnRzSURcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByKFwiRW1haWxSZWNpcGllbnRzVHlwZVwiKSB9LFxuICAgICAgICB7IGpzb246IFwibmFtZVwiLCBqczogXCJuYW1lXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJjb250YWN0c1wiLCBqczogXCJjb250YWN0c1wiLCB0eXA6IHUodW5kZWZpbmVkLCBhKHIoXCJDb250YWN0RWxlbWVudFwiKSkpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJFbWFpbFJlY2lwaWVudHNJRFwiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcImVtYWlsXCIsIGpzOiBcImVtYWlsXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJGRFNfSURcIiwganM6IFwiRkRTX0lEXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJJbnN0cnVtZW50XCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiaWRcIiwganM6IFwiaWRcIiwgdHlwOiByKFwiRmx1ZmZ5SW5zdHJ1bWVudElkZW50aWZpZXJzXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJtYXJrZXRcIiwganM6IFwibWFya2V0XCIsIHR5cDogdSh1bmRlZmluZWQsIHIoXCJQdXJwbGVNYXJrZXRcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByKFwiUHVycGxlSW50ZXJhY3Rpb25UeXBlXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIkZsdWZmeUluc3RydW1lbnRJZGVudGlmaWVyc1wiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcIkJCR1wiLCBqczogXCJCQkdcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIkNVU0lQXCIsIGpzOiBcIkNVU0lQXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJGRFNfSURcIiwganM6IFwiRkRTX0lEXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJGSUdJXCIsIGpzOiBcIkZJR0lcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIklTSU5cIiwganM6IFwiSVNJTlwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiUEVSTUlEXCIsIGpzOiBcIlBFUk1JRFwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiUklDXCIsIGpzOiBcIlJJQ1wiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiU0VET0xcIiwganM6IFwiU0VET0xcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInRpY2tlclwiLCBqczogXCJ0aWNrZXJcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIlB1cnBsZU1hcmtldFwiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcIkJCR1wiLCBqczogXCJCQkdcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIkNPVU5UUllfSVNPQUxQSEEyXCIsIGpzOiBcIkNPVU5UUllfSVNPQUxQSEEyXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJNSUNcIiwganM6IFwiTUlDXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIkluc3RydW1lbnRMaXN0XCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiaW5zdHJ1bWVudHNcIiwganM6IFwiaW5zdHJ1bWVudHNcIiwgdHlwOiBhKHIoXCJJbnN0cnVtZW50RWxlbWVudFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIoXCJJbnN0cnVtZW50TGlzdFR5cGVcIikgfSxcbiAgICAgICAgeyBqc29uOiBcImlkXCIsIGpzOiBcImlkXCIsIHR5cDogdSh1bmRlZmluZWQsIG0oXCJhbnlcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIkludGVyYWN0aW9uXCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiZGVzY3JpcHRpb25cIiwganM6IFwiZGVzY3JpcHRpb25cIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJpZFwiLCBqczogXCJpZFwiLCB0eXA6IHUodW5kZWZpbmVkLCByKFwiSW50ZXJhY3Rpb25JRFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcImluaXRpYXRvclwiLCBqczogXCJpbml0aWF0b3JcIiwgdHlwOiB1KHVuZGVmaW5lZCwgcihcIkNvbnRhY3RFbGVtZW50XCIpKSB9LFxuICAgICAgICB7IGpzb246IFwiaW50ZXJhY3Rpb25UeXBlXCIsIGpzOiBcImludGVyYWN0aW9uVHlwZVwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcIm9yaWdpblwiLCBqczogXCJvcmlnaW5cIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBhcnRpY2lwYW50c1wiLCBqczogXCJwYXJ0aWNpcGFudHNcIiwgdHlwOiByKFwiQ29udGFjdExpc3RPYmplY3RcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVSYW5nZVwiLCBqczogXCJ0aW1lUmFuZ2VcIiwgdHlwOiByKFwiVGltZVJhbmdlT2JqZWN0XCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByKFwiSW50ZXJhY3Rpb25UeXBlXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIkludGVyYWN0aW9uSURcIjogbyhbXG4gICAgICAgIHsganNvbjogXCJTQUxFU0ZPUkNFXCIsIGpzOiBcIlNBTEVTRk9SQ0VcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIlNJTkdMRVRSQUNLXCIsIGpzOiBcIlNJTkdMRVRSQUNLXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJVUklcIiwganM6IFwiVVJJXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJNZXNzYWdlXCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiZW50aXRpZXNcIiwganM6IFwiZW50aXRpZXNcIiwgdHlwOiB1KHVuZGVmaW5lZCwgbShyKFwiRmx1ZmZ5QWN0aW9uXCIpKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInRleHRcIiwganM6IFwidGV4dFwiLCB0eXA6IHUodW5kZWZpbmVkLCByKFwiRmx1ZmZ5TWVzc2FnZVRleHRcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByKFwiTWVzc2FnZVR5cGVcIikgfSxcbiAgICAgICAgeyBqc29uOiBcImlkXCIsIGpzOiBcImlkXCIsIHR5cDogdSh1bmRlZmluZWQsIG0oXCJhbnlcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIkZsdWZmeUFjdGlvblwiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcImFwcFwiLCBqczogXCJhcHBcIiwgdHlwOiB1KHVuZGVmaW5lZCwgcihcIkFjdGlvblRhcmdldEFwcFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcImNvbnRleHRcIiwganM6IFwiY29udGV4dFwiLCB0eXA6IHUodW5kZWZpbmVkLCByKFwiQ29udGV4dEVsZW1lbnRcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJpbnRlbnRcIiwganM6IFwiaW50ZW50XCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0aXRsZVwiLCBqczogXCJ0aXRsZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogcihcIkVudGl0eVR5cGVcIikgfSxcbiAgICAgICAgeyBqc29uOiBcImlkXCIsIGpzOiBcImlkXCIsIHR5cDogdSh1bmRlZmluZWQsIG0oXCJhbnlcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcImRhdGFcIiwganM6IFwiZGF0YVwiLCB0eXA6IHUodW5kZWZpbmVkLCByKFwiRmx1ZmZ5RGF0YVwiKSkgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIkZsdWZmeURhdGFcIjogbyhbXG4gICAgICAgIHsganNvbjogXCJkYXRhVXJpXCIsIGpzOiBcImRhdGFVcmlcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiBcIlwiIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJGbHVmZnlNZXNzYWdlVGV4dFwiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcInRleHQvbWFya2Rvd25cIiwganM6IFwidGV4dC9tYXJrZG93blwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwidGV4dC9wbGFpblwiLCBqczogXCJ0ZXh0L3BsYWluXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJOb3RoaW5nXCI6IG8oW1xuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogcihcIk5vdGhpbmdUeXBlXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJpZFwiLCBqczogXCJpZFwiLCB0eXA6IHUodW5kZWZpbmVkLCBtKFwiYW55XCIpKSB9LFxuICAgICAgICB7IGpzb246IFwibmFtZVwiLCBqczogXCJuYW1lXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJPcmRlclwiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcImRldGFpbHNcIiwganM6IFwiZGV0YWlsc1wiLCB0eXA6IHUodW5kZWZpbmVkLCByKFwiUHVycGxlT3JkZXJEZXRhaWxzXCIpKSB9LFxuICAgICAgICB7IGpzb246IFwiaWRcIiwganM6IFwiaWRcIiwgdHlwOiBtKFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIoXCJPcmRlclR5cGVcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIlB1cnBsZU9yZGVyRGV0YWlsc1wiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcInByb2R1Y3RcIiwganM6IFwicHJvZHVjdFwiLCB0eXA6IHUodW5kZWZpbmVkLCByKFwiUHJvZHVjdE9iamVjdFwiKSkgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIlByb2R1Y3RPYmplY3RcIjogbyhbXG4gICAgICAgIHsganNvbjogXCJpZFwiLCBqczogXCJpZFwiLCB0eXA6IG0oXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcImluc3RydW1lbnRcIiwganM6IFwiaW5zdHJ1bWVudFwiLCB0eXA6IHUodW5kZWZpbmVkLCByKFwiSW5zdHJ1bWVudEVsZW1lbnRcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIoXCJQcm9kdWN0VHlwZVwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiT3JkZXJMaXN0XCI6IG8oW1xuICAgICAgICB7IGpzb246IFwib3JkZXJzXCIsIGpzOiBcIm9yZGVyc1wiLCB0eXA6IGEocihcIk9yZGVyRWxlbWVudFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIoXCJPcmRlckxpc3RUeXBlXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJpZFwiLCBqczogXCJpZFwiLCB0eXA6IHUodW5kZWZpbmVkLCBtKFwiYW55XCIpKSB9LFxuICAgICAgICB7IGpzb246IFwibmFtZVwiLCBqczogXCJuYW1lXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJPcmRlckVsZW1lbnRcIjogbyhbXG4gICAgICAgIHsganNvbjogXCJkZXRhaWxzXCIsIGpzOiBcImRldGFpbHNcIiwgdHlwOiB1KHVuZGVmaW5lZCwgcihcIkZsdWZmeU9yZGVyRGV0YWlsc1wiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcImlkXCIsIGpzOiBcImlkXCIsIHR5cDogbShcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwibmFtZVwiLCBqczogXCJuYW1lXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByKFwiT3JkZXJUeXBlXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJGbHVmZnlPcmRlckRldGFpbHNcIjogbyhbXG4gICAgICAgIHsganNvbjogXCJwcm9kdWN0XCIsIGpzOiBcInByb2R1Y3RcIiwgdHlwOiB1KHVuZGVmaW5lZCwgcihcIlByb2R1Y3RPYmplY3RcIikpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJPcmdhbml6YXRpb25cIjogbyhbXG4gICAgICAgIHsganNvbjogXCJpZFwiLCBqczogXCJpZFwiLCB0eXA6IHIoXCJPcmdhbml6YXRpb25JZGVudGlmaWVyc1wiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogcihcIlN0aWNreUludGVyYWN0aW9uVHlwZVwiKSB9LFxuICAgICAgICB7IGpzb246IFwibmFtZVwiLCBqczogXCJuYW1lXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJPcmdhbml6YXRpb25JZGVudGlmaWVyc1wiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcIkZEU19JRFwiLCBqczogXCJGRFNfSURcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIkxFSVwiLCBqczogXCJMRUlcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIlBFUk1JRFwiLCBqczogXCJQRVJNSURcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIlBvcnRmb2xpb1wiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcInBvc2l0aW9uc1wiLCBqczogXCJwb3NpdGlvbnNcIiwgdHlwOiBhKHIoXCJQb3NpdGlvbkVsZW1lbnRcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByKFwiUG9ydGZvbGlvVHlwZVwiKSB9LFxuICAgICAgICB7IGpzb246IFwiaWRcIiwganM6IFwiaWRcIiwgdHlwOiB1KHVuZGVmaW5lZCwgbShcImFueVwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcIm5hbWVcIiwganM6IFwibmFtZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiUG9zaXRpb25FbGVtZW50XCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiaG9sZGluZ1wiLCBqczogXCJob2xkaW5nXCIsIHR5cDogMy4xNCB9LFxuICAgICAgICB7IGpzb246IFwiaW5zdHJ1bWVudFwiLCBqczogXCJpbnN0cnVtZW50XCIsIHR5cDogcihcIkluc3RydW1lbnRFbGVtZW50XCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByKFwiUG9zaXRpb25UeXBlXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJpZFwiLCBqczogXCJpZFwiLCB0eXA6IHUodW5kZWZpbmVkLCBtKFwiYW55XCIpKSB9LFxuICAgICAgICB7IGpzb246IFwibmFtZVwiLCBqczogXCJuYW1lXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJQb3NpdGlvblwiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcImhvbGRpbmdcIiwganM6IFwiaG9sZGluZ1wiLCB0eXA6IDMuMTQgfSxcbiAgICAgICAgeyBqc29uOiBcImluc3RydW1lbnRcIiwganM6IFwiaW5zdHJ1bWVudFwiLCB0eXA6IHIoXCJJbnN0cnVtZW50RWxlbWVudFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogcihcIlBvc2l0aW9uVHlwZVwiKSB9LFxuICAgICAgICB7IGpzb246IFwiaWRcIiwganM6IFwiaWRcIiwgdHlwOiB1KHVuZGVmaW5lZCwgbShcImFueVwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcIm5hbWVcIiwganM6IFwibmFtZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiUHJvZHVjdFwiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcImlkXCIsIGpzOiBcImlkXCIsIHR5cDogbShcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiaW5zdHJ1bWVudFwiLCBqczogXCJpbnN0cnVtZW50XCIsIHR5cDogdSh1bmRlZmluZWQsIHIoXCJJbnN0cnVtZW50RWxlbWVudFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcIm5hbWVcIiwganM6IFwibmFtZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogcihcIlByb2R1Y3RUeXBlXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJUaW1lUmFuZ2VcIjogbyhbXG4gICAgICAgIHsganNvbjogXCJlbmRUaW1lXCIsIGpzOiBcImVuZFRpbWVcIiwgdHlwOiB1KHVuZGVmaW5lZCwgRGF0ZSkgfSxcbiAgICAgICAgeyBqc29uOiBcInN0YXJ0VGltZVwiLCBqczogXCJzdGFydFRpbWVcIiwgdHlwOiB1KHVuZGVmaW5lZCwgRGF0ZSkgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIoXCJUaW1lUmFuZ2VUeXBlXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJpZFwiLCBqczogXCJpZFwiLCB0eXA6IHUodW5kZWZpbmVkLCBtKFwiYW55XCIpKSB9LFxuICAgICAgICB7IGpzb246IFwibmFtZVwiLCBqczogXCJuYW1lXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJUcmFkZVwiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcImlkXCIsIGpzOiBcImlkXCIsIHR5cDogbShcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwibmFtZVwiLCBqczogXCJuYW1lXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwcm9kdWN0XCIsIGpzOiBcInByb2R1Y3RcIiwgdHlwOiByKFwiUHJvZHVjdE9iamVjdFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogcihcIlRyYWRlVHlwZVwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiVHJhZGVMaXN0XCI6IG8oW1xuICAgICAgICB7IGpzb246IFwidHJhZGVzXCIsIGpzOiBcInRyYWRlc1wiLCB0eXA6IGEocihcIlRyYWRlRWxlbWVudFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIoXCJUcmFkZUxpc3RUeXBlXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJpZFwiLCBqczogXCJpZFwiLCB0eXA6IHUodW5kZWZpbmVkLCBtKFwiYW55XCIpKSB9LFxuICAgICAgICB7IGpzb246IFwibmFtZVwiLCBqczogXCJuYW1lXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJUcmFkZUVsZW1lbnRcIjogbyhbXG4gICAgICAgIHsganNvbjogXCJpZFwiLCBqczogXCJpZFwiLCB0eXA6IG0oXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIm5hbWVcIiwganM6IFwibmFtZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwicHJvZHVjdFwiLCBqczogXCJwcm9kdWN0XCIsIHR5cDogcihcIlByb2R1Y3RPYmplY3RcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIoXCJUcmFkZVR5cGVcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIlRyYW5zYWN0aW9uUmVzdWx0XCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiY29udGV4dFwiLCBqczogXCJjb250ZXh0XCIsIHR5cDogdSh1bmRlZmluZWQsIHIoXCJDb250ZXh0RWxlbWVudFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcIm1lc3NhZ2VcIiwganM6IFwibWVzc2FnZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwic3RhdHVzXCIsIGpzOiBcInN0YXR1c1wiLCB0eXA6IHIoXCJUcmFuc2FjdGlvblN0YXR1c1wiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogcihcIlRyYW5zYWN0aW9uUmVzdWx0VHlwZVwiKSB9LFxuICAgICAgICB7IGpzb246IFwiaWRcIiwganM6IFwiaWRcIiwgdHlwOiB1KHVuZGVmaW5lZCwgbShcImFueVwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcIm5hbWVcIiwganM6IFwibmFtZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiVmFsdWF0aW9uXCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiQ1VSUkVOQ1lfSVNPQ09ERVwiLCBqczogXCJDVVJSRU5DWV9JU09DT0RFXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwiZXhwaXJ5VGltZVwiLCBqczogXCJleHBpcnlUaW1lXCIsIHR5cDogdSh1bmRlZmluZWQsIERhdGUpIH0sXG4gICAgICAgIHsganNvbjogXCJwcmljZVwiLCBqczogXCJwcmljZVwiLCB0eXA6IHUodW5kZWZpbmVkLCAzLjE0KSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogcihcIlZhbHVhdGlvblR5cGVcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInZhbHVhdGlvblRpbWVcIiwganM6IFwidmFsdWF0aW9uVGltZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBEYXRlKSB9LFxuICAgICAgICB7IGpzb246IFwidmFsdWVcIiwganM6IFwidmFsdWVcIiwgdHlwOiAzLjE0IH0sXG4gICAgICAgIHsganNvbjogXCJpZFwiLCBqczogXCJpZFwiLCB0eXA6IHUodW5kZWZpbmVkLCBtKFwiYW55XCIpKSB9LFxuICAgICAgICB7IGpzb246IFwibmFtZVwiLCBqczogXCJuYW1lXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJBY3Rpb25UeXBlXCI6IFtcbiAgICAgICAgXCJmZGMzLmFjdGlvblwiLFxuICAgIF0sXG4gICAgXCJQdXJwbGVJbnRlcmFjdGlvblR5cGVcIjogW1xuICAgICAgICBcImZkYzMuaW5zdHJ1bWVudFwiLFxuICAgIF0sXG4gICAgXCJUaW1lUmFuZ2VUeXBlXCI6IFtcbiAgICAgICAgXCJmZGMzLnRpbWVSYW5nZVwiLFxuICAgIF0sXG4gICAgXCJDaGFydFN0eWxlXCI6IFtcbiAgICAgICAgXCJiYXJcIixcbiAgICAgICAgXCJjYW5kbGVcIixcbiAgICAgICAgXCJjdXN0b21cIixcbiAgICAgICAgXCJoZWF0bWFwXCIsXG4gICAgICAgIFwiaGlzdG9ncmFtXCIsXG4gICAgICAgIFwibGluZVwiLFxuICAgICAgICBcIm1vdW50YWluXCIsXG4gICAgICAgIFwicGllXCIsXG4gICAgICAgIFwic2NhdHRlclwiLFxuICAgICAgICBcInN0YWNrZWQtYmFyXCIsXG4gICAgXSxcbiAgICBcIkNoYXJ0VHlwZVwiOiBbXG4gICAgICAgIFwiZmRjMy5jaGFydFwiLFxuICAgIF0sXG4gICAgXCJGbHVmZnlJbnRlcmFjdGlvblR5cGVcIjogW1xuICAgICAgICBcImZkYzMuY29udGFjdFwiLFxuICAgIF0sXG4gICAgXCJDb250YWN0TGlzdFR5cGVcIjogW1xuICAgICAgICBcImZkYzMuY29udGFjdExpc3RcIixcbiAgICBdLFxuICAgIFwiRW50aXR5VHlwZVwiOiBbXG4gICAgICAgIFwiZmRjMy5hY3Rpb25cIixcbiAgICAgICAgXCJmZGMzLmVudGl0eS5maWxlQXR0YWNobWVudFwiLFxuICAgIF0sXG4gICAgXCJNZXNzYWdlVHlwZVwiOiBbXG4gICAgICAgIFwiZmRjMy5tZXNzYWdlXCIsXG4gICAgXSxcbiAgICBcIkNoYXRJbml0U2V0dGluZ3NUeXBlXCI6IFtcbiAgICAgICAgXCJmZGMzLmNoYXQuaW5pdFNldHRpbmdzXCIsXG4gICAgXSxcbiAgICBcIkNoYXRSb29tVHlwZVwiOiBbXG4gICAgICAgIFwiZmRjMy5jaGF0LnJvb21cIixcbiAgICBdLFxuICAgIFwiQ2hhdE1lc3NhZ2VUeXBlXCI6IFtcbiAgICAgICAgXCJmZGMzLmNoYXQubWVzc2FnZVwiLFxuICAgIF0sXG4gICAgXCJUZW50YWNsZWRJbnRlcmFjdGlvblR5cGVcIjogW1xuICAgICAgICBcImZkYzMuY29udGFjdFwiLFxuICAgICAgICBcImZkYzMuaW5zdHJ1bWVudFwiLFxuICAgICAgICBcImZkYzMub3JnYW5pemF0aW9uXCIsXG4gICAgXSxcbiAgICBcIkNoYXRTZWFyY2hDcml0ZXJpYVR5cGVcIjogW1xuICAgICAgICBcImZkYzMuY2hhdC5zZWFyY2hDcml0ZXJpYVwiLFxuICAgIF0sXG4gICAgXCJDb3VudHJ5VHlwZVwiOiBbXG4gICAgICAgIFwiZmRjMy5jb3VudHJ5XCIsXG4gICAgXSxcbiAgICBcIkN1cnJlbmN5VHlwZVwiOiBbXG4gICAgICAgIFwiZmRjMy5jdXJyZW5jeVwiLFxuICAgIF0sXG4gICAgXCJFbWFpbFJlY2lwaWVudHNUeXBlXCI6IFtcbiAgICAgICAgXCJmZGMzLmNvbnRhY3RcIixcbiAgICAgICAgXCJmZGMzLmNvbnRhY3RMaXN0XCIsXG4gICAgXSxcbiAgICBcIkVtYWlsVHlwZVwiOiBbXG4gICAgICAgIFwiZmRjMy5lbWFpbFwiLFxuICAgIF0sXG4gICAgXCJJbnN0cnVtZW50TGlzdFR5cGVcIjogW1xuICAgICAgICBcImZkYzMuaW5zdHJ1bWVudExpc3RcIixcbiAgICBdLFxuICAgIFwiSW50ZXJhY3Rpb25UeXBlXCI6IFtcbiAgICAgICAgXCJmZGMzLmludGVyYWN0aW9uXCIsXG4gICAgXSxcbiAgICBcIk5vdGhpbmdUeXBlXCI6IFtcbiAgICAgICAgXCJmZGMzLm5vdGhpbmdcIixcbiAgICBdLFxuICAgIFwiUHJvZHVjdFR5cGVcIjogW1xuICAgICAgICBcImZkYzMucHJvZHVjdFwiLFxuICAgIF0sXG4gICAgXCJPcmRlclR5cGVcIjogW1xuICAgICAgICBcImZkYzMub3JkZXJcIixcbiAgICBdLFxuICAgIFwiT3JkZXJMaXN0VHlwZVwiOiBbXG4gICAgICAgIFwiZmRjMy5vcmRlckxpc3RcIixcbiAgICBdLFxuICAgIFwiU3RpY2t5SW50ZXJhY3Rpb25UeXBlXCI6IFtcbiAgICAgICAgXCJmZGMzLm9yZ2FuaXphdGlvblwiLFxuICAgIF0sXG4gICAgXCJQb3NpdGlvblR5cGVcIjogW1xuICAgICAgICBcImZkYzMucG9zaXRpb25cIixcbiAgICBdLFxuICAgIFwiUG9ydGZvbGlvVHlwZVwiOiBbXG4gICAgICAgIFwiZmRjMy5wb3J0Zm9saW9cIixcbiAgICBdLFxuICAgIFwiVHJhZGVUeXBlXCI6IFtcbiAgICAgICAgXCJmZGMzLnRyYWRlXCIsXG4gICAgXSxcbiAgICBcIlRyYWRlTGlzdFR5cGVcIjogW1xuICAgICAgICBcImZkYzMudHJhZGVMaXN0XCIsXG4gICAgXSxcbiAgICBcIlRyYW5zYWN0aW9uU3RhdHVzXCI6IFtcbiAgICAgICAgXCJDcmVhdGVkXCIsXG4gICAgICAgIFwiRGVsZXRlZFwiLFxuICAgICAgICBcIkZhaWxlZFwiLFxuICAgICAgICBcIlVwZGF0ZWRcIixcbiAgICBdLFxuICAgIFwiVHJhbnNhY3Rpb25SZXN1bHRUeXBlXCI6IFtcbiAgICAgICAgXCJmZGMzLnRyYW5zYWN0aW9uUmVzdWx0XCIsXG4gICAgXSxcbiAgICBcIlZhbHVhdGlvblR5cGVcIjogW1xuICAgICAgICBcImZkYzMudmFsdWF0aW9uXCIsXG4gICAgXVxufTtcblxuLyoqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICogQ29weXJpZ2h0IEZJTk9TIEZEQzMgY29udHJpYnV0b3JzIC0gc2VlIE5PVElDRSBmaWxlXG4gKi9cbi8qKlxuICogQGRlcHJlY2F0ZWQgVXNlIHtAbGluayBTdGFuZGFyZEludGVudH0gaW5zdGVhZFxuICovXG52YXIgSW50ZW50cztcbihmdW5jdGlvbiAoSW50ZW50cykge1xuICAgIEludGVudHNbXCJDcmVhdGVJbnRlcmFjdGlvblwiXSA9IFwiQ3JlYXRlSW50ZXJhY3Rpb25cIjtcbiAgICBJbnRlbnRzW1wiU2VuZENoYXRNZXNzYWdlXCJdID0gXCJTZW5kQ2hhdE1lc3NhZ2VcIjtcbiAgICBJbnRlbnRzW1wiU3RhcnRDYWxsXCJdID0gXCJTdGFydENhbGxcIjtcbiAgICBJbnRlbnRzW1wiU3RhcnRDaGF0XCJdID0gXCJTdGFydENoYXRcIjtcbiAgICBJbnRlbnRzW1wiU3RhcnRFbWFpbFwiXSA9IFwiU3RhcnRFbWFpbFwiO1xuICAgIEludGVudHNbXCJWaWV3QW5hbHlzaXNcIl0gPSBcIlZpZXdBbmFseXNpc1wiO1xuICAgIEludGVudHNbXCJWaWV3Q2hhdFwiXSA9IFwiVmlld0NoYXRcIjtcbiAgICBJbnRlbnRzW1wiVmlld0NoYXJ0XCJdID0gXCJWaWV3Q2hhcnRcIjtcbiAgICBJbnRlbnRzW1wiVmlld0NvbnRhY3RcIl0gPSBcIlZpZXdDb250YWN0XCI7XG4gICAgSW50ZW50c1tcIlZpZXdIb2xkaW5nc1wiXSA9IFwiVmlld0hvbGRpbmdzXCI7XG4gICAgSW50ZW50c1tcIlZpZXdJbnN0cnVtZW50XCJdID0gXCJWaWV3SW5zdHJ1bWVudFwiO1xuICAgIEludGVudHNbXCJWaWV3SW50ZXJhY3Rpb25zXCJdID0gXCJWaWV3SW50ZXJhY3Rpb25zXCI7XG4gICAgSW50ZW50c1tcIlZpZXdNZXNzYWdlc1wiXSA9IFwiVmlld01lc3NhZ2VzXCI7XG4gICAgSW50ZW50c1tcIlZpZXdOZXdzXCJdID0gXCJWaWV3TmV3c1wiO1xuICAgIEludGVudHNbXCJWaWV3T3JkZXJzXCJdID0gXCJWaWV3T3JkZXJzXCI7XG4gICAgSW50ZW50c1tcIlZpZXdQcm9maWxlXCJdID0gXCJWaWV3UHJvZmlsZVwiO1xuICAgIEludGVudHNbXCJWaWV3UXVvdGVcIl0gPSBcIlZpZXdRdW90ZVwiO1xuICAgIEludGVudHNbXCJWaWV3UmVzZWFyY2hcIl0gPSBcIlZpZXdSZXNlYXJjaFwiO1xufSkoSW50ZW50cyB8fCAoSW50ZW50cyA9IHt9KSk7XG5cbmV4cG9ydCB7IEJyaWRnaW5nRXJyb3IsIEJyaWRnaW5nVHlwZXMsIENoYW5uZWxFcnJvciwgQ29udGV4dFR5cGVzLCBDb252ZXJ0LCBJbnRlbnRzLCBPcGVuRXJyb3IsIFJlc29sdmVFcnJvciwgUmVzdWx0RXJyb3IsIGFkZENvbnRleHRMaXN0ZW5lciwgYWRkSW50ZW50TGlzdGVuZXIsIGJyb2FkY2FzdCwgY29tcGFyZVZlcnNpb25OdW1iZXJzLCBjcmVhdGVQcml2YXRlQ2hhbm5lbCwgZmRjM1JlYWR5LCBmaW5kSW5zdGFuY2VzLCBmaW5kSW50ZW50LCBmaW5kSW50ZW50c0J5Q29udGV4dCwgZ2V0QXBwTWV0YWRhdGEsIGdldEN1cnJlbnRDaGFubmVsLCBnZXRJbmZvLCBnZXRPckNyZWF0ZUNoYW5uZWwsIGdldFN5c3RlbUNoYW5uZWxzLCBnZXRVc2VyQ2hhbm5lbHMsIGlzU3RhbmRhcmRDb250ZXh0VHlwZSwgaXNTdGFuZGFyZEludGVudCwgam9pbkNoYW5uZWwsIGpvaW5Vc2VyQ2hhbm5lbCwgbGVhdmVDdXJyZW50Q2hhbm5lbCwgb3BlbiwgcmFpc2VJbnRlbnQsIHJhaXNlSW50ZW50Rm9yQ29udGV4dCwgdmVyc2lvbklzQXRMZWFzdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmRjMy5lc20uanMubWFwXG4iLCJ2YXIgZT17ZDoodCxuKT0+e2Zvcih2YXIgciBpbiBuKWUubyhuLHIpJiYhZS5vKHQscikmJk9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LHIse2VudW1lcmFibGU6ITAsZ2V0Om5bcl19KX0sbzooZSx0KT0+T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsdCl9LHQ9e307ZS5kKHQse0FkYXB0ZXJFcnJvcjooKT0+QWRhcHRlckVycm9yLEFwaUVycm9yOigpPT5BcGlFcnJvcixJbml0aWFsaXphdGlvbkVycm9yOigpPT5Jbml0aWFsaXphdGlvbkVycm9yLEludGVyb3BFcnJvcjooKT0+SW50ZXJvcEVycm9yLFRlcm1pbmFsQ29ubmVjdFJlcXVlc3RFcnJvcjooKT0+VGVybWluYWxDb25uZWN0UmVxdWVzdEVycm9yLFRlcm1pbmFsQ29ubmVjdGlvbkVycm9yOigpPT5UZXJtaW5hbENvbm5lY3Rpb25FcnJvcixjb25uZWN0OigpPT50ZSxkaXNhYmxlTG9nZ2luZzooKT0+SSxlbmFibGVMb2dnaW5nOigpPT5BLGdldFNlY3VyaXR5RnJvbUluc3RydW1lbnRDb250ZXh0OigpPT5ifSk7Y2xhc3MgQXBpRXJyb3IgZXh0ZW5kcyBFcnJvcntjb25zdHJ1Y3RvcihlPVwiQW4gdW5leHBlY3RlZCBlcnJvciBoYXMgb2NjdXJyZWRcIix0KXtzdXBlcihlKSx0aGlzLm5hbWU9dGhpcy5jb25zdHJ1Y3Rvci5uYW1lLHRoaXMuc3RhY2s9dGhpcy5zdGFjaz8ucmVwbGFjZSgvXihcXHcqRXJyb3IpLyxgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9YCksdCYmKHRoaXMuZGF0YT10KX19Y2xhc3MgQWRhcHRlckVycm9yIGV4dGVuZHMgQXBpRXJyb3J7Y29uc3RydWN0b3IoZT1cIkZhaWxlZCB0byBleGVjdXRlIGFkYXB0ZXIgZnVuY3Rpb25cIix0KXtzdXBlcihlLHQpfX1jbGFzcyBJbml0aWFsaXphdGlvbkVycm9yIGV4dGVuZHMgQXBpRXJyb3J7Y29uc3RydWN0b3IoZT1cIkZhaWxlZCB0byBpbml0aWFsaXplIGFkYXB0ZXJcIix0KXtzdXBlcihlLHQpfX1jbGFzcyBJbnRlcm9wRXJyb3IgZXh0ZW5kcyBBcGlFcnJvcntjb25zdHJ1Y3RvcihlPVwiRmFpbGVkIHRvIGV4ZWN1dGUgdGhlIGludGVyb3AgZnVuY3Rpb25cIix0KXtzdXBlcihlLHQpfX1jbGFzcyBQYXJhbWV0ZXJFcnJvciBleHRlbmRzIEFwaUVycm9ye2NvbnN0cnVjdG9yKGUpe3N1cGVyKGU9ZT8/XCJJbnZhbGlkIHBhcmFtZXRlciBkZXRlY3RlZFwiKX19Y2xhc3MgVGVybWluYWxDb25uZWN0aW9uRXJyb3IgZXh0ZW5kcyBBcGlFcnJvcntjb25zdHJ1Y3RvcihlPVwiRmFpbGVkIHRvIGNvbm5lY3QgdG8gdGhlIHRlcm1pbmFsXCIsdCl7c3VwZXIoZSx0KX19Y2xhc3MgVGVybWluYWxDb25uZWN0UmVxdWVzdEVycm9yIGV4dGVuZHMgQXBpRXJyb3J7Y29uc3RydWN0b3IoZT1cIlRlcm1pbmFsIENvbm5lY3QgcmVxdWVzdCBmYWlsZWRcIix0KXtzdXBlcihlLHQpfX1mdW5jdGlvbiBuKGUpe3JldHVybnthcnJheUl0ZW1zOmV9fWZ1bmN0aW9uIHIoKXtmb3IodmFyIGU9YXJndW1lbnRzLmxlbmd0aCx0PW5ldyBBcnJheShlKSxuPTA7bjxlO24rKyl0W25dPWFyZ3VtZW50c1tuXTtyZXR1cm57dW5pb25NZW1iZXJzOnR9fWZ1bmN0aW9uIG8oZSx0KXtyZXR1cm57cHJvcHM6ZSxhZGRpdGlvbmFsOnR9fWZ1bmN0aW9uIGEoZSl7cmV0dXJue3Byb3BzOltdLGFkZGl0aW9uYWw6ZX19ZnVuY3Rpb24gaShlKXtyZXR1cm57cmVmOmV9fXZhciBzLGMsdSxsLHA7RGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZTshZnVuY3Rpb24oZSl7ZS5BcHBOb3RGb3VuZD1cIkFwcE5vdEZvdW5kXCIsZS5FcnJvck9uTGF1bmNoPVwiRXJyb3JPbkxhdW5jaFwiLGUuQXBwVGltZW91dD1cIkFwcFRpbWVvdXRcIixlLlJlc29sdmVyVW5hdmFpbGFibGU9XCJSZXNvbHZlclVuYXZhaWxhYmxlXCIsZS5NYWxmb3JtZWRDb250ZXh0PVwiTWFsZm9ybWVkQ29udGV4dFwiLGUuRGVza3RvcEFnZW50Tm90Rm91bmQ9XCJEZXNrdG9wQWdlbnROb3RGb3VuZFwifShzfHwocz17fSkpLGZ1bmN0aW9uKGUpe2UuTm9BcHBzRm91bmQ9XCJOb0FwcHNGb3VuZFwiLGUuUmVzb2x2ZXJVbmF2YWlsYWJsZT1cIlJlc29sdmVyVW5hdmFpbGFibGVcIixlLlVzZXJDYW5jZWxsZWQ9XCJVc2VyQ2FuY2VsbGVkUmVzb2x1dGlvblwiLGUuUmVzb2x2ZXJUaW1lb3V0PVwiUmVzb2x2ZXJUaW1lb3V0XCIsZS5UYXJnZXRBcHBVbmF2YWlsYWJsZT1cIlRhcmdldEFwcFVuYXZhaWxhYmxlXCIsZS5UYXJnZXRJbnN0YW5jZVVuYXZhaWxhYmxlPVwiVGFyZ2V0SW5zdGFuY2VVbmF2YWlsYWJsZVwiLGUuSW50ZW50RGVsaXZlcnlGYWlsZWQ9XCJJbnRlbnREZWxpdmVyeUZhaWxlZFwiLGUuTWFsZm9ybWVkQ29udGV4dD1cIk1hbGZvcm1lZENvbnRleHRcIixlLkRlc2t0b3BBZ2VudE5vdEZvdW5kPVwiRGVza3RvcEFnZW50Tm90Rm91bmRcIn0oY3x8KGM9e30pKSxmdW5jdGlvbihlKXtlLk5vUmVzdWx0UmV0dXJuZWQ9XCJOb1Jlc3VsdFJldHVybmVkXCIsZS5JbnRlbnRIYW5kbGVyUmVqZWN0ZWQ9XCJJbnRlbnRIYW5kbGVyUmVqZWN0ZWRcIn0odXx8KHU9e30pKSxmdW5jdGlvbihlKXtlLk5vQ2hhbm5lbEZvdW5kPVwiTm9DaGFubmVsRm91bmRcIixlLkFjY2Vzc0RlbmllZD1cIkFjY2Vzc0RlbmllZFwiLGUuQ3JlYXRpb25GYWlsZWQ9XCJDcmVhdGlvbkZhaWxlZFwiLGUuTWFsZm9ybWVkQ29udGV4dD1cIk1hbGZvcm1lZENvbnRleHRcIn0obHx8KGw9e30pKSxmdW5jdGlvbihlKXtlLlJlc3BvbnNlVGltZWRPdXQ9XCJSZXNwb25zZVRvQnJpZGdlVGltZWRPdXRcIixlLkFnZW50RGlzY29ubmVjdGVkPVwiQWdlbnREaXNjb25uZWN0ZWRcIixlLk5vdENvbm5lY3RlZFRvQnJpZGdlPVwiTm90Q29ubmVjdGVkVG9CcmlkZ2VcIixlLk1hbGZvcm1lZE1lc3NhZ2U9XCJNYWxmb3JtZWRNZXNzYWdlXCJ9KHB8fChwPXt9KSk7dmFyIGQ7IWZ1bmN0aW9uKGUpe2UuQ2hhcnQ9XCJmZGMzLmNoYXJ0XCIsZS5DaGF0SW5pdFNldHRpbmdzPVwiZmRjMy5jaGF0LmluaXRTZXR0aW5nc1wiLGUuQ2hhdFJvb209XCJmZGMzLmNoYXQucm9vbVwiLGUuQ29udGFjdD1cImZkYzMuY29udGFjdFwiLGUuQ29udGFjdExpc3Q9XCJmZGMzLmNvbnRhY3RMaXN0XCIsZS5Db3VudHJ5PVwiZmRjMy5jb3VudHJ5XCIsZS5DdXJyZW5jeT1cImZkYzMuY3VycmVuY3lcIixlLkVtYWlsPVwiZmRjMy5lbWFpbFwiLGUuSW5zdHJ1bWVudD1cImZkYzMuaW5zdHJ1bWVudFwiLGUuSW5zdHJ1bWVudExpc3Q9XCJmZGMzLmluc3RydW1lbnRMaXN0XCIsZS5JbnRlcmFjdGlvbj1cImZkYzMuaW50ZXJhY3Rpb25cIixlLk5vdGhpbmc9XCJmZGMzLm5vdGhpbmdcIixlLk9yZ2FuaXphdGlvbj1cImZkYzMub3JnYW5pemF0aW9uXCIsZS5Qb3J0Zm9saW89XCJmZGMzLnBvcnRmb2xpb1wiLGUuUG9zaXRpb249XCJmZGMzLnBvc2l0aW9uXCIsZS5DaGF0U2VhcmNoQ3JpdGVyaWE9XCJmZGMzLmNoYXQuc2VhcmNoQ3JpdGVyaWFcIixlLlRpbWVSYW5nZT1cImZkYzMudGltZXJhbmdlXCIsZS5UcmFuc2FjdGlvblJlc3VsdD1cImZkYzMudHJhbnNhY3Rpb25SZXN1bHRcIixlLlZhbHVhdGlvbj1cImZkYzMudmFsdWF0aW9uXCJ9KGR8fChkPXt9KSk7ZnVuY3Rpb24gZyhlKXtyZXR1cm57YXJyYXlJdGVtczplfX1mdW5jdGlvbiBtKCl7Zm9yKHZhciBlPWFyZ3VtZW50cy5sZW5ndGgsdD1uZXcgQXJyYXkoZSksbj0wO248ZTtuKyspdFtuXT1hcmd1bWVudHNbbl07cmV0dXJue3VuaW9uTWVtYmVyczp0fX1mdW5jdGlvbiBmKGUsdCl7cmV0dXJue3Byb3BzOmUsYWRkaXRpb25hbDp0fX1mdW5jdGlvbiB3KGUpe3JldHVybntwcm9wczpbXSxhZGRpdGlvbmFsOmV9fWZ1bmN0aW9uIGgoZSl7cmV0dXJue3JlZjplfX12YXIgeTtEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZTshZnVuY3Rpb24oZSl7ZS5DcmVhdGVJbnRlcmFjdGlvbj1cIkNyZWF0ZUludGVyYWN0aW9uXCIsZS5TZW5kQ2hhdE1lc3NhZ2U9XCJTZW5kQ2hhdE1lc3NhZ2VcIixlLlN0YXJ0Q2FsbD1cIlN0YXJ0Q2FsbFwiLGUuU3RhcnRDaGF0PVwiU3RhcnRDaGF0XCIsZS5TdGFydEVtYWlsPVwiU3RhcnRFbWFpbFwiLGUuVmlld0FuYWx5c2lzPVwiVmlld0FuYWx5c2lzXCIsZS5WaWV3Q2hhdD1cIlZpZXdDaGF0XCIsZS5WaWV3Q2hhcnQ9XCJWaWV3Q2hhcnRcIixlLlZpZXdDb250YWN0PVwiVmlld0NvbnRhY3RcIixlLlZpZXdIb2xkaW5ncz1cIlZpZXdIb2xkaW5nc1wiLGUuVmlld0luc3RydW1lbnQ9XCJWaWV3SW5zdHJ1bWVudFwiLGUuVmlld0ludGVyYWN0aW9ucz1cIlZpZXdJbnRlcmFjdGlvbnNcIixlLlZpZXdNZXNzYWdlcz1cIlZpZXdNZXNzYWdlc1wiLGUuVmlld05ld3M9XCJWaWV3TmV3c1wiLGUuVmlld09yZGVycz1cIlZpZXdPcmRlcnNcIixlLlZpZXdQcm9maWxlPVwiVmlld1Byb2ZpbGVcIixlLlZpZXdRdW90ZT1cIlZpZXdRdW90ZVwiLGUuVmlld1Jlc2VhcmNoPVwiVmlld1Jlc2VhcmNoXCJ9KHl8fCh5PXt9KSk7Y29uc3QgQz1lPT57Y29uc3QgdD1EYXRlLnBhcnNlKGUpO2lmKCFOdW1iZXIuaXNOYU4odCkpcmV0dXJuIG5ldyBEYXRlKHQpfSxFPWU9PntsZXQgdD0vXFxzKyhbXFx3LV0rJCkvLmV4ZWMoZSk/LlsxXTtpZih0KXJldHVybiB0PXQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkrdC5zbGljZSgxKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoXCItbVwiLFwiLU1cIiksdH0sYj1lPT57aWYoZS50eXBlIT09ZC5JbnN0cnVtZW50KXJldHVybjtjb25zdHtpZDp0LG1hcmtldDpufT1lLHtCQkc6cixGSUdJOm8sdGlja2VyOmF9PXQ7aWYocnx8bylyZXR1cm4gcj8/bztpZighYSlyZXR1cm47cmV0dXJuYCR7YX0gJHtuPy5CQkc/bi5CQkc6XCJVU1wifSBFcXVpdHlgfTtsZXQgdj0hMTtjb25zdCBEPVwiW0BvcGVuZmluL2Jsb29tYmVyZ11cIixJPSgpPT57dj0hMX0sQT0oKT0+e3Y9ITAsTihcInYyLjAuMFwiKX0sUj0oZSx0KT0+e2lmKCF2KXJldHVybjtjb25zdCBuPXQ/YCR7RH0gJHt0fWA6RDtlIGluc3RhbmNlb2YgQXBpRXJyb3ImJmUuZGF0YT9jb25zb2xlLmVycm9yKG4sZSxlLmRhdGEpOmNvbnNvbGUuZXJyb3IobixlKX0sTj0oLi4uZSk9Pnt2JiZjb25zb2xlLmxvZyhELC4uLmUpfSx4PSguLi5lKT0+e3YmJmNvbnNvbGUud2FybihELC4uLmUpfTt2YXIgVCxTLE07XCJ1bmRlZmluZWRcIj09dHlwZW9mIGZpbiYmT2JqZWN0LmFzc2lnbih3aW5kb3cse2Zpbjp7fX0pLE9iamVjdC5hc3NpZ24oZmluLHtJbnRlZ3JhdGlvbnM6e0Jsb29tYmVyZzp7ZW5hYmxlTG9nZ2luZzpBLGRpc2FibGVMb2dnaW5nOkl9fX0pLGZ1bmN0aW9uKGUpe2UuQ2FuY2VsU3Vic2NyaXB0aW9uPVwiQ2FuY2VsU3Vic2NyaXB0aW9uXCIsZS5Db25uZWN0PVwiQ29ubmVjdFwiLGUuQ3JlYXRlU3Vic2NyaXB0aW9uPVwiQ3JlYXRlU3Vic2NyaXB0aW9uXCIsZS5EaXNjb25uZWN0PVwiRGlzY29ubmVjdFwiLGUuRXhlY3V0ZVJlcXVlc3Q9XCJFeGVjdXRlUmVxdWVzdFwiLGUuTG9nTWVzc2FnZT1cIkxvZ01lc3NhZ2VcIixlLlN1YnNjcmlwdGlvbkV2ZW50PVwiU3Vic2NyaXB0aW9uRXZlbnRcIn0oVHx8KFQ9e30pKSxmdW5jdGlvbihlKXtlW2UuRXJyb3I9MF09XCJFcnJvclwiLGVbZS5JbmZvPTFdPVwiSW5mb1wiLGVbZS5XYXJuPTJdPVwiV2FyblwifShTfHwoUz17fSkpLGZ1bmN0aW9uKGUpe2UuTG9jYWw9XCJMb2NhbFwiLGUuUmVtb3RlPVwiUmVtb3RlXCJ9KE18fChNPXt9KSk7Y29uc3QgVj1lPT5hc3luYygpPT57TihcIlJldHJpZXZpbmcgbGF1bmNocGFkIGdyb3Vwc1wiKTtjb25zdCB0PXtxdWVyeTpcInF1ZXJ5IHtcXG4gICAgICAgICAgZ3JvdXBzIHtcXG4gICAgICAgICAgICAuLi4gb24gR3JvdXBzIHtcXG4gICAgICAgICAgICAgIGl0ZW1zIHtcXG4gICAgICAgICAgICAgICAgaWRcXG4gICAgICAgICAgICAgICAgbmFtZVxcbiAgICAgICAgICAgICAgICB0eXBlXFxuICAgICAgICAgICAgICAgIHZhbHVlXFxuICAgICAgICAgICAgICB9XFxuICAgICAgICAgICAgfVxcbiAgICAgICAgICAgIC4uLiBvbiBFcnJvciB7XFxuICAgICAgICAgICAgICBlcnJvckNhdGVnb3J5XFxuICAgICAgICAgICAgICBlcnJvck1lc3NhZ2VcXG4gICAgICAgICAgICB9XFxuICAgICAgICAgIH1cXG4gICAgICAgIH1cIn07bGV0IG47dHJ5e249YXdhaXQgZShULkV4ZWN1dGVSZXF1ZXN0LHQpfWNhdGNoKGUpe2NvbnN0IHQ9bmV3IEFkYXB0ZXJFcnJvcih2b2lkIDAsZSk7dGhyb3cgUih0KSx0fWlmKCFuLnN1Y2Nlc3Mpe2NvbnN0IGU9bmV3IFRlcm1pbmFsQ29ubmVjdFJlcXVlc3RFcnJvcihuLmVycm9yPy5tZXNzYWdlLG4uZXJyb3IpO3Rocm93IFIoZSksZX1pZighbi5kYXRhKXtjb25zdCBlPW5ldyBUZXJtaW5hbENvbm5lY3RSZXF1ZXN0RXJyb3IoXCJVbmV4cGVjdGVkIGVtcHR5IHJlc3BvbnNlIGRhdGFcIixuKTt0aHJvdyBSKGUpLGV9Y29uc3R7Z3JvdXBzOnJ9PUpTT04ucGFyc2Uobi5kYXRhKTtpZihyLml0ZW1zKXJldHVybiByLml0ZW1zO2NvbnN0IG89bmV3IFRlcm1pbmFsQ29ubmVjdFJlcXVlc3RFcnJvcihyLmVycm9yTWVzc2FnZSxyKTt0aHJvdyBSKG8pLG99LCQ9ZT0+YXN5bmModCxuKT0+e2lmKG51bGw9PXR8fFwibnVtYmVyXCIhPXR5cGVvZiB0fHxOdW1iZXIuaXNOYU4odCkpdGhyb3cgbmV3IFBhcmFtZXRlckVycm9yKFwiR3JvdXAgSUQgbXVzdCBiZSBhIHZhbGlkIG51bWJlclwiKTtpZighbj8udHJpbSgpKXRocm93IG5ldyBQYXJhbWV0ZXJFcnJvcihcIkdyb3VwIHZhbHVlIG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nXCIpO04oXCJTZXR0aW5nIGdyb3VwIHZhbHVlXCIse2dyb3VwSWQ6dCxuZXdWYWx1ZTpufSk7Y29uc3Qgcj17cXVlcnk6YG11dGF0aW9uIHtcXG4gICAgICAgICAgc2V0R3JvdXBWYWx1ZShcXG4gICAgICAgICAgICBmaWx0ZXI6IHtpZDogWyR7dH1dfSxcXG4gICAgICAgICAgICB2YWx1ZTogXCIke259XCIpIHtcXG4gICAgICAgICAgICAuLi4gb24gR3JvdXBSZXN1bHRzIHtcXG4gICAgICAgICAgICAgIHJlc3VsdHMge1xcbiAgICAgICAgICAgICAgICByZXN1bHQge1xcbiAgICAgICAgICAgICAgICAgIHN1Y2NlZWRlZFxcbiAgICAgICAgICAgICAgICAgIGRldGFpbHNcXG4gICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgIH1cXG4gICAgICAgICAgICAuLi4gb24gRXJyb3Ige1xcbiAgICAgICAgICAgICAgZXJyb3JDYXRlZ29yeVxcbiAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlXFxuICAgICAgICAgICAgfVxcbiAgICAgICAgICB9XFxuICAgICAgICB9YH07bGV0IG87dHJ5e289YXdhaXQgZShULkV4ZWN1dGVSZXF1ZXN0LHIpfWNhdGNoKGUpe2NvbnN0IHQ9bmV3IEFkYXB0ZXJFcnJvcih2b2lkIDAsZSk7dGhyb3cgUih0KSx0fWlmKCFvLnN1Y2Nlc3Mpe2NvbnN0IGU9bmV3IFRlcm1pbmFsQ29ubmVjdFJlcXVlc3RFcnJvcihvLmVycm9yPy5tZXNzYWdlLG8uZXJyb3IpO3Rocm93IFIoZSksZX1pZighby5kYXRhKXtjb25zdCBlPW5ldyBUZXJtaW5hbENvbm5lY3RSZXF1ZXN0RXJyb3IoXCJVbmV4cGVjdGVkIGVtcHR5IHJlc3BvbnNlIGRhdGFcIixvKTt0aHJvdyBSKGUpLGV9Y29uc3R7c2V0R3JvdXBWYWx1ZTphfT1KU09OLnBhcnNlKG8uZGF0YSk7aWYoXCJlcnJvck1lc3NhZ2VcImluIGEpe2NvbnN0IGU9bmV3IFRlcm1pbmFsQ29ubmVjdFJlcXVlc3RFcnJvcihhLmVycm9yTWVzc2FnZSxhKTt0aHJvdyBSKGUpLGV9fSxxPW5ldyBNYXAsQj1hc3luYyhlLHQsbixyKT0+e2NvbnN0IG89YXdhaXQgTyhlKSh0KTtpZighbylyZXR1cm47Y29uc3QgYT1hd2FpdChlPT5hc3luYyh0PVtdKT0+e04oXCJDcmVhdGluZyBncm91cCBzdWJzY3JpcHRpb25cIix7Z3JvdXBJZEZpbHRlcjp0fSk7Y29uc3Qgbj17cXVlcnk6YHN1YnNjcmlwdGlvbiB7XFxuICAgICAgICBzdWJzY3JpYmVHcm91cEV2ZW50cyAoXFxuICAgICAgICAgIGZpbHRlcjp7XFxuICAgICAgICAgICAgZXZlbnQ6IFtcXG4gICAgICAgICAgICAgIFZBTFVFX0NIQU5HRURcXG4gICAgICAgICAgICBdXFxuICAgICAgICAgICAgJHt0Lmxlbmd0aD9gLGdyb3VwOiB7aWQ6ICR7SlNPTi5zdHJpbmdpZnkodCl9fWA6XCJcIn1cXG4gICAgICAgICAgfSl7XFxuICAgICAgICAgIHR5cGVcXG4gICAgICAgICAgZ3JvdXB7XFxuICAgICAgICAgICAgaWRcXG4gICAgICAgICAgICBuYW1lXFxuICAgICAgICAgICAgdmFsdWVcXG4gICAgICAgICAgfVxcbiAgICAgICAgfVxcbiAgICAgIH1gfTtsZXQgcjt0cnl7cj1hd2FpdCBlKFQuQ3JlYXRlU3Vic2NyaXB0aW9uLG4pfWNhdGNoKGUpe2NvbnN0IHQ9bmV3IEFkYXB0ZXJFcnJvcih2b2lkIDAsZSk7dGhyb3cgUih0KSx0fWlmKCFyLnN1Y2Nlc3Mpe2NvbnN0IGU9bmV3IFRlcm1pbmFsQ29ubmVjdFJlcXVlc3RFcnJvcihyLmVycm9yPy5tZXNzYWdlLHIuZXJyb3IpO3Rocm93IFIoZSksZX1pZighci5kYXRhKXtjb25zdCBlPW5ldyBUZXJtaW5hbENvbm5lY3RSZXF1ZXN0RXJyb3IoXCJVbmV4cGVjdGVkIGVtcHR5IHJlc3BvbnNlIGRhdGFcIixyKTt0aHJvdyBSKGUpLGV9Y29uc3R7c3Vic2NyaXB0aW9uSWQ6b309SlNPTi5wYXJzZShyLmRhdGEpO3JldHVybiBvfSkoZSkobyksaT17aWQ6YSxsaXN0ZW5lcjpVKG4sciksdW5zdWJzY3JpYmU6RihlLGEpfTtyZXR1cm4gcS5zZXQoYSxpKSxpfSxGPShlLHQpPT5hc3luYygpPT57TihcIlVuc3Vic2NyaWJpbmcgZ3JvdXAgZXZlbnRzXCIse3N1YnNjcmlwdGlvbklkOnR9KTt0cnl7YXdhaXQoZT0+YXN5bmMgdD0+e2NvbnN0IG49e3N1YnNjcmlwdGlvbklkOnR9O2xldCByO3RyeXtyPWF3YWl0IGUoVC5DYW5jZWxTdWJzY3JpcHRpb24sbil9Y2F0Y2goZSl7Y29uc3QgdD1uZXcgQWRhcHRlckVycm9yKHZvaWQgMCxlKTt0aHJvdyBSKHQpLHR9aWYoIXIuc3VjY2Vzcyl7Y29uc3QgZT1uZXcgVGVybWluYWxDb25uZWN0UmVxdWVzdEVycm9yKHIuZXJyb3I/Lm1lc3NhZ2Usci5lcnJvcik7dGhyb3cgUihlKSxlfX0pKGUpKHQpfWNhdGNoKGUpe1IoZSl9cS5kZWxldGUodCl9LFU9KGUsdCk9PmFzeW5jIG49Pnt0cnl7ZT8uKG4pLE4oXCJTZXR0aW5nIG5ldyBjb250ZXh0OiBcIixuKSxhd2FpdCBmaW4ubWUuaW50ZXJvcC5zZXRDb250ZXh0KG4pfWNhdGNoKGUpe2NvbnN0IG49bmV3IEludGVyb3BFcnJvcih2b2lkIDAsZSk7UihuKSx0Py4obil9fSxQPWFzeW5jKGUsdCk9PntOKFwiR3JvdXAgZXZlbnQgcmVjZWl2ZWRcIix7ZGF0YTp0LHN1YnNjcmlwdGlvbklkOmV9KTtjb25zdHtncm91cDpufT10LnN1YnNjcmliZUdyb3VwRXZlbnRzO2lmKCFuKXJldHVybiB2b2lkIHgoXCJSZWNlaXZlZCBncm91cCBldmVudCB3aXRoIG5vIGdyb3VwXCIse3N1YnNjcmlwdGlvbklkOmV9KTtpZighcS5oYXMoZSkpcmV0dXJuIHZvaWQgeChcIlJlY2VpdmVkIGdyb3VwIGV2ZW50IGZvciB1bmtub3duIHN1YnNjcmlwdGlvblwiLHtzdWJzY3JpcHRpb25JZDplfSk7Y29uc3Qgcj1xLmdldChlKSxvPShlPT57Y29uc3QgdD17dHlwZTpkLkluc3RydW1lbnQsaWQ6e0JCRzplfX07aWYoXCJFcXVpdHlcIj09PUUoZSkpe2NvbnN0W24scl09ZS5zcGxpdCgvXFxzKy8pO3QuaWQudGlja2VyPW4/LnRvVXBwZXJDYXNlKCksdC5tYXJrZXQ9e0JCRzpyPy50b1VwcGVyQ2FzZSgpfX1yZXR1cm4gdH0pKG4udmFsdWUpO28ub3BlbmZpbkJiZ0FwaT0hMCxyPy5saXN0ZW5lcihvKX0sTz1lPT5hc3luYyB0PT57aWYoIXQpcmV0dXJuO2lmKFwiKlwiPT09dClyZXR1cm5bXTtBcnJheS5pc0FycmF5KHQpfHwodD1bdF0pO2NvbnN0IG49YXdhaXQgVihlKSgpLHI9dC5tYXAoKGU9Pntjb25zdCB0PW4uZmluZCgodD0+dC5uYW1lPy50b1VwcGVyQ2FzZSgpPT09ZS50b1VwcGVyQ2FzZSgpKSk/LmlkO3JldHVybiB0fHx4KGBHcm91cCBub3QgZm91bmQ6ICR7ZX1gKSx0fSkpLmZpbHRlcihCb29sZWFuKTtyZXR1cm4gci5sZW5ndGg/cjp2b2lkIDB9LEc9XCJibG9vbWJlcmctYWRhcHRlclwiLEw9YGJsb29tYmVyZy1hZGFwdGVyLSR7dm9pZCAwIT09Y3J5cHRvLnJhbmRvbVVVSUQ/Y3J5cHRvLnJhbmRvbVVVSUQoKTpcIjEwMDAwMDAwLTEwMDAtNDAwMC04MDAwLTEwMDAwMDAwMDAwMFwiLnJlcGxhY2UoL1swMThdL2csKGU9Pntjb25zdCB0PWNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMSkpWzBdJjE1Pj5OdW1iZXIoZSkvNDtyZXR1cm4oTnVtYmVyKGUpXnQpLnRvU3RyaW5nKDE2KX0pKX1gO2xldCBrO2NvbnN0IHo9YXN5bmMoZT0hMSk9Pnt0cnl7aWYoIWF3YWl0KGFzeW5jIGU9Pihhd2FpdCBmaW4uSW50ZXJBcHBsaWNhdGlvbkJ1cy5DaGFubmVsLmdldEFsbENoYW5uZWxzKCkpLnNvbWUoKHQ9PnQuY2hhbm5lbE5hbWU9PT1lKSkpKEwpKXtjb25zdHtwb3J0OnQsc2VjdXJpdHlSZWFsbTpufT1hd2FpdCBmaW4uU3lzdGVtLmdldFJ1bnRpbWVJbmZvKCkse2xpY2Vuc2VLZXk6cn09YXdhaXQgZmluLkFwcGxpY2F0aW9uLmdldEN1cnJlbnRTeW5jKCkuZ2V0TWFuaWZlc3QoKSxvPWZpbi5tZS51dWlkO04oXCJJbml0aWFsaXppbmcgYWRhcHRlclwiLHtjaGFubmVsTmFtZTpMLGxpY2Vuc2VLZXk6cixwb3J0OnQsc2VjdXJpdHlSZWFsbTpuLHV1aWQ6byxhZGFwdGVyTG9nZ2luZ0VuYWJsZWQ6ZX0pLGF3YWl0KGFzeW5jKCk9Pntjb25zdCBlPWF3YWl0IGZpbi5BcHBsaWNhdGlvbi5nZXRDdXJyZW50U3luYygpLmdldE1hbmlmZXN0KCksdD1lLmFwcEFzc2V0cz8uZmluZCgoZT0+ZS5hbGlhcz09PUcpKTtpZih0KXJldHVybiB2b2lkIHgoXCJEZXRlY3RlZCBhZGFwdGVyIHBhY2thZ2UgaW4gYXBwIG1hbmlmZXN0IGFwcEFzc2V0c1wiLHQpO2lmKGF3YWl0IGooKSlyZXR1cm4gdm9pZCBOKFwiVXNpbmcgZXhpc3RpbmcgYWRhcHRlciBwYWNrYWdlXCIpO2NvbnN0IG49e2FsaWFzOkcsc3JjOlwiaHR0cHM6Ly9jZG4ub3BlbmZpbi5jby9yZWxlYXNlL2ludGVncmF0aW9ucy9ibG9vbWJlcmcvMi4wLjAvT3BlbkZpbi5CbG9vbWJlcmcuemlwXCIsdGFyZ2V0OlwiT3BlbkZpbi5CbG9vbWJlcmcuZXhlXCIsdmVyc2lvbjpcIjIuMC4wXCJ9O04oXCJEb3dubG9hZGluZyBhZGFwdGVyIHBhY2thZ2VcIixuKTt0cnl7YXdhaXQgZmluLlN5c3RlbS5kb3dubG9hZEFzc2V0KG4sKCgpPT57fSkpfWNhdGNoKGUpe3Rocm93IFIoXCJVbmFibGUgdG8gZG93bmxvYWQgYWRhcHRlciBwYWNrYWdlXCIpLGV9fSkoKSxmaW4uU3lzdGVtLmxhdW5jaEV4dGVybmFsUHJvY2Vzcyh7YWxpYXM6Ryxhcmd1bWVudHM6YFwiJHtvfVwiIFwiJHtyPz9cIlwifVwiIFwiJHt0fVwiIFwiJHtuPz9cIlwifVwiIFwiJHtMfVwiIFwiJHtlfVwiYCxsaWZldGltZTpcImFwcGxpY2F0aW9uXCJ9KX1jb25zdCBuPWZpbi5JbnRlckFwcGxpY2F0aW9uQnVzLkNoYW5uZWwuY29ubmVjdChMLHtwYXlsb2FkOnt2ZXJzaW9uOlwiMi4wLjBcIn19KSxyPW5ldyBQcm9taXNlKChlPT57c2V0VGltZW91dChlLDJlNCl9KSkudGhlbigoKCk9Pnt0aHJvdyBuZXcgQXBpRXJyb3IoXCJDb25uZWN0aW9uIHRvIGFkYXB0ZXIgdGltZWQgb3V0XCIpfSkpO3JldHVybiBrPWF3YWl0IFByb21pc2UucmFjZShbbixyXSksay5yZWdpc3RlcihULkxvZ01lc3NhZ2UsSCksay5yZWdpc3RlcihULlN1YnNjcmlwdGlvbkV2ZW50LEopLE4oXCJDb25uZWN0ZWQgdG8gYWRhcHRlclwiLHt1dWlkOmsucHJvdmlkZXJJZGVudGl0eS51dWlkfSkse2NoYW5uZWxOYW1lOkwsZGlzcGF0Y2g6KC4uLmUpPT5rLmRpc3BhdGNoKC4uLmUpLGluaXRUZXJtaW5hbDoodD1rLGFzeW5jIGU9Pntjb25zdCBuPXthcGlLZXk6ZX07bGV0IHI7dHJ5e3I9YXdhaXQgdC5kaXNwYXRjaChULkNvbm5lY3Qsbil9Y2F0Y2goZSl7Y29uc3QgdD1uZXcgQWRhcHRlckVycm9yKHZvaWQgMCxlKTt0aHJvdyBSKHQpLHR9aWYoIXIuc3VjY2Vzcyl7Y29uc3QgZT1uZXcgVGVybWluYWxDb25uZWN0aW9uRXJyb3Ioci5lcnJvcj8ubWVzc2FnZSxyLmVycm9yKTt0aHJvdyBSKGUpLGV9fSksdmVyc2lvbjpcIjIuMC4wXCJ9fWNhdGNoKGUpe2NvbnN0IHQ9ZSBpbnN0YW5jZW9mIEFwaUVycm9yP25ldyBJbml0aWFsaXphdGlvbkVycm9yKGUubWVzc2FnZSk6bmV3IEluaXRpYWxpemF0aW9uRXJyb3Iodm9pZCAwLGUpO3Rocm93IFIodCksdH12YXIgdH0sSD1lPT57Y29uc3R7bGV2ZWw6dCxtZXNzYWdlOm59PWUscj1cIlthZGFwdGVyXVwiO3N3aXRjaCh0KXtjYXNlIFMuRXJyb3I6UihuLHIpO2JyZWFrO2Nhc2UgUy5XYXJuOngocixuKTticmVhaztjYXNlIFMuSW5mbzpkZWZhdWx0Ok4ocixuKX19LEo9YXN5bmMgZT0+e2NvbnN0e2RhdGE6dCxlcnJvcjpuLHN1YnNjcmlwdGlvbklkOnJ9PWU7aWYoIXJ8fCF0KXtjb25zdCB0PW5ldyBUZXJtaW5hbENvbm5lY3RSZXF1ZXN0RXJyb3IoXCJJbnZhbGlkIHN1YnNjcmlwdGlvbiBldmVudFwiLGUpO3Rocm93IFIodCksdH1pZihuKXtjb25zdCBlPW5ldyBUZXJtaW5hbENvbm5lY3RSZXF1ZXN0RXJyb3Iodm9pZCAwLG4pO3Rocm93IFIoZSksZX1jb25zdCBvPUpTT04ucGFyc2UodCk7aWYoITA9PT1Cb29sZWFuKG8uc3Vic2NyaWJlR3JvdXBFdmVudHMpKWF3YWl0IFAocixvKTtlbHNlIHgoXCJSZWNlaXZlZCB1bmtub3duIHN1YnNjcmlwdGlvbiBldmVudFwiLHQpfSxqPWFzeW5jKCk9Pnt0cnl7cmV0dXJuXCIyLjAuMFwiPT09KGF3YWl0IGZpbi5TeXN0ZW0uZ2V0QXBwQXNzZXRJbmZvKHthbGlhczpHfSkpLnZlcnNpb259Y2F0Y2goZSl7cmV0dXJuITF9fSxRPWFzeW5jKGUsdCk9PntpZighZSlyZXR1cm4gdm9pZCB4KFwiTm8gYWN0aW9uIHNwZWNpZmllZCwgaWdub3JpbmdcIik7aWYoXCJncm91cFwiaW4gZSl7Y29uc3R7Z3JvdXA6bixzZWN1cml0eTpyfT1lO3JldHVybiB2b2lkIGF3YWl0KGU9PmFzeW5jKHQsbik9PntpZighbilyZXR1cm47TihgU2V0dGluZyAke1wiKlwiPT09dD9cImV2ZXJ5IGdyb3VwXCI6YGdyb3VwICR7dH1gfSBzZWN1cml0eSB0byAke259YCk7Y29uc3Qgcj1hd2FpdCBWKGUpKCk7aWYoXCIqXCI9PT10KWF3YWl0IFByb21pc2UuYWxsKHIubWFwKCh0PT50LmlkPyQoZSkodC5pZCxuKTpQcm9taXNlLnJlc29sdmUoKSkpKTtlbHNle2NvbnN0IG89ci5maW5kKChlPT5lLm5hbWU/LnRvVXBwZXJDYXNlKCk9PT10LnRvVXBwZXJDYXNlKCkpKT8uaWQ7bnVsbD09bz94KGBVbmFibGUgdG8gdXBkYXRlIGdyb3VwIHNlY3VyaXR5IGZvciAke3R9OiBncm91cCBub3QgZm91bmRgKTphd2FpdCAkKGUpKG8sbil9fSkodCkobixyKX1jb25zdHttbmVtb25pYzpuLHNlY3VyaXRpZXM6cix0YXJnZXQ6byx0YWlsOmF9PWUsW2ksc109cj8/W107YXdhaXQoZT0+YXN5bmModCxuLHIsbyxhKT0+e2lmKCF0Py50cmltKCkpdGhyb3cgbmV3IFBhcmFtZXRlckVycm9yKFwiTW5lbW9uaWMgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmdcIik7aWYobnVsbD09bnx8XCJzdHJpbmdcIj09dHlwZW9mIG4mJiFuPy50cmltKCkpdGhyb3cgbmV3IFBhcmFtZXRlckVycm9yKFwiVGFyZ2V0IG11c3QgYmUgYSBudW1iZXIgKDAtMykgb3Igbm9uLWVtcHR5IHN0cmluZ1wiKTtOKFwiUnVubmluZyB0ZXJtaW5hbCBmdW5jdGlvblwiLHttbmVtb25pYzp0LHRhcmdldDpuLHNlY3VyaXR5MTpyLHNlY3VyaXR5MjpvLHRhaWw6YX0pO2NvbnN0IGk9dC50cmltKCkudG9VcHBlckNhc2UoKTtsZXQgcyxjO1wibnVtYmVyXCI9PXR5cGVvZiBuPyhzPVwicnVuRnVuY3Rpb25JblBhbmVsXCIsYz1cInBhbmVsOiBcIisoMT09PW4/XCJPTkVcIjoyPT09bj9cIlRXT1wiOjM9PT1uP1wiVEhSRUVcIjpcIlpFUk9cIikpOihzPVwicnVuRnVuY3Rpb25JblRhYlwiLGM9YHRhYk5hbWU6IFwiJHtuLnRyaW0oKX1cImApO2NvbnN0IHU9e3F1ZXJ5OmBtdXRhdGlvbiB7XFxuICAgICAgICAke3N9KGlucHV0OiB7XFxuICAgICAgICAgIG1uZW1vbmljOiBcIiR7aX1cIixcXG4gICAgICAgICAgJHtjfSxcXG4gICAgICAgICAgJHtyP2BzZWN1cml0eTE6IFwiJHtyfVwiYDpcIlwifVxcbiAgICAgICAgICAke28/YHNlY3VyaXR5MjogXCIke299XCJgOlwiXCJ9XFxuICAgICAgICAgICR7YT9gdGFpbDogXCIke2F9XCJgOlwiXCJ9XFxuICAgICAgICB9KSB7XFxuICAgICAgICAgIC4uLiBvbiBSZXN1bHQge1xcbiAgICAgICAgICAgIHN1Y2NlZWRlZFxcbiAgICAgICAgICAgIGRldGFpbHNcXG4gICAgICAgICAgfVxcbiAgICAgICAgICAuLi4gb24gRXJyb3Ige1xcbiAgICAgICAgICAgIGVycm9yQ2F0ZWdvcnlcXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2VcXG4gICAgICAgICAgfVxcbiAgICAgICAgfVxcbiAgICAgIH1gfTtsZXQgbDt0cnl7bD1hd2FpdCBlKFQuRXhlY3V0ZVJlcXVlc3QsdSl9Y2F0Y2goZSl7Y29uc3QgdD1uZXcgQWRhcHRlckVycm9yKHZvaWQgMCxlKTt0aHJvdyBSKHQpLHR9aWYoIWwuc3VjY2Vzcyl7Y29uc3QgZT1uZXcgVGVybWluYWxDb25uZWN0UmVxdWVzdEVycm9yKGwuZXJyb3I/Lm1lc3NhZ2UsbC5lcnJvcik7dGhyb3cgUihlKSxlfWlmKGwuZGF0YSl7Y29uc3QgZT1KU09OLnBhcnNlKGwuZGF0YSk7bGV0IHQ7aWYoXCJydW5GdW5jdGlvbkluVGFiXCJpbiBlP3Q9ZS5ydW5GdW5jdGlvbkluVGFiLmVycm9yTWVzc2FnZTpcInJ1bkZ1bmN0aW9uSW5QYW5lbFwiaW4gZSYmKHQ9ZS5ydW5GdW5jdGlvbkluUGFuZWwuZXJyb3JNZXNzYWdlKSx0KXtjb25zdCBuPW5ldyBUZXJtaW5hbENvbm5lY3RSZXF1ZXN0RXJyb3IodCxlKTt0aHJvdyBSKG4pLG59fX0pKHQpKG4sbyxpLHMsYSl9LFc9KCk9PmU9Pntjb25zdCB0PWUse25hbWU6bixpZDpyfT10LG89cj8uQkJHPz9uO2lmKG8pcmV0dXJue21uZW1vbmljOlwiQklPXCIsdGFyZ2V0OjAsdGFpbDpvfTt4KFwiTm8gdmFsaWQgaWRlbnRpZmllciBwcm92aWRlZCBpbiBjb250ZXh0LCBpZ25vcmluZ1wiKX0sWT1lPT50PT57Y29uc3Qgbj1iKHQpO2lmKG4pcmV0dXJue21uZW1vbmljOmUsc2VjdXJpdGllczpbbl0sdGFyZ2V0OjB9O3goXCJObyBzZWN1cml0eSBwcm92aWRlZCBpbiBjb250ZXh0LCBpZ25vcmluZ1wiKX0sSz1hc3luYyhlLHQsbixyKT0+e2NvbnN0IG89KCgpPT57Y29uc3QgZT1bXSx0PVtdO3JldHVybiBlLnB1c2goW2QuSW5zdHJ1bWVudCxZKFwiREVTXCIpXSksZS5wdXNoKFtkLkNvbnRhY3QsVygpXSksZS5wdXNoKFtkLk9yZ2FuaXphdGlvbixfKCldKSx0LnB1c2goW3kuU3RhcnRDaGF0LFtbZC5Ob3RoaW5nLFooXCJJQlwiKV0sW2QuQ29udGFjdCxlPT57Y29uc3R7aWQ6dCxuYW1lOm59PWU7cmV0dXJue21uZW1vbmljOlwiSUJcIix0YXJnZXQ6MCx0YWlsOnQuZW1haWw/P259fV1dXSksdC5wdXNoKFt5LlZpZXdBbmFseXNpcyxbW2QuTm90aGluZyxaKFwiQU5SXCIpXSxbZC5JbnN0cnVtZW50LGU9Pntjb25zdCB0PWIoZSk7aWYoIXQpcmV0dXJuIHZvaWQgeChcIk5vIHNlY3VyaXR5IHByb3ZpZGVkIGluIGNvbnRleHQsIGlnbm9yaW5nXCIpO2xldCBuO3N3aXRjaChFKHQpKXtjYXNlXCJFcXVpdHlcIjpjYXNlXCJJbmRleFwiOm49XCJGQVwiO2JyZWFrO2Nhc2VcIkNvcnBcIjpjYXNlXCJHb3Z0XCI6Y2FzZVwiTXRnZVwiOmNhc2VcIk11bmlcIjpjYXNlXCJQZmRcIjpuPVwiWUFTXCI7YnJlYWs7ZGVmYXVsdDpuPVwiQU5SXCJ9cmV0dXJue21uZW1vbmljOm4sc2VjdXJpdGllczpbdF0sdGFyZ2V0OjB9fV1dXSksdC5wdXNoKFt5LlZpZXdDaGFydCxbW2QuTm90aGluZyxaKFwiR0lQXCIpXSxbZC5JbnN0cnVtZW50LFkoXCJHSVBcIildLFtkLkNoYXJ0LGU9Pntjb25zdHtpbnRlcnZhbDp0LGluc3RydW1lbnRzOm4scmFuZ2U6cixzdHlsZTpvfT1lLGE9e21uZW1vbmljOlwiR0lQXCIsdGFyZ2V0OjB9O2xldCBpPSEwO2NvbnN0IHM9YihuPy5bMF0/P2UpO3MmJihhLnNlY3VyaXRpZXM9W3NdKTtjb25zdHtlbmRUaW1lOmMsc3RhcnRUaW1lOnV9PXI/P3t9O2lmKHUpe2NvbnN0IGU9Qyh1LnRvU3RyaW5nKCkpO2lmKGUmJihhLnRhaWw9YCR7ZS5nZXRNb250aCgpKzF9LyR7ZS5nZXREYXRlKCl9LyR7ZS5nZXRGdWxsWWVhcigpfWAsaT0hMSxjKSl7Y29uc3QgZT1DKGMudG9TdHJpbmcoKSk7ZSYmKGEudGFpbCs9YCAke2UuZ2V0TW9udGgoKSsxfS8ke2UuZ2V0RGF0ZSgpfS8ke2UuZ2V0RnVsbFllYXIoKX1gKX19c3dpdGNoKG8/LnRvTG93ZXJDYXNlKCkpe2Nhc2VcImJhclwiOmEubW5lbW9uaWM9aT9cIklHUE9cIjpcIkdQT1wiO2JyZWFrO2Nhc2VcImNhbmRsZVwiOmEubW5lbW9uaWM9aT9cIklHUENcIjpcIkdQQ1wiO2JyZWFrO2RlZmF1bHQ6YS5tbmVtb25pYz1pP1wiR0lQXCI6XCJHUFwifWlmKCFpJiZ0KXN3aXRjaCh0LnRvTG93ZXJDYXNlKCkpe2Nhc2VcImRhaWx5XCI6YS50YWlsKz1cIiBEXCI7YnJlYWs7Y2FzZVwid2Vla2x5XCI6YS50YWlsKz1cIiBXXCI7YnJlYWs7Y2FzZVwibW9udGhseVwiOmEudGFpbCs9XCJNXCI7YnJlYWs7Y2FzZVwicXVhcnRlcmx5XCI6YS50YWlsKz1cIiBRXCI7YnJlYWs7Y2FzZVwieWVhcmx5XCI6YS50YWlsKz1cIiBZXCJ9cmV0dXJuIGF9XV1dKSx0LnB1c2goW3kuVmlld0NoYXQsW1tkLk5vdGhpbmcsWihcIklCXCIpXSxbZC5Db250YWN0LGU9Pntjb25zdHtpZDp0LG5hbWU6bn09ZTtyZXR1cm57bW5lbW9uaWM6XCJJQlwiLHRhcmdldDowLHRhaWw6dC5lbWFpbD8/bn19XV1dKSx0LnB1c2goW3kuVmlld0NvbnRhY3QsW1tkLk5vdGhpbmcsWihcIkJJT1wiKV0sW2QuQ29udGFjdCxXKCldXV0pLHQucHVzaChbeS5WaWV3SW5zdHJ1bWVudCxbW2QuTm90aGluZyxaKFwiREVTXCIpXSxbZC5JbnN0cnVtZW50LFkoXCJERVNcIildXV0pLHQucHVzaChbeS5WaWV3TmV3cyxbW2QuTm90aGluZyxaKFwiQ05cIildLFtkLkluc3RydW1lbnQsWShcIkNOXCIpXV1dKSx0LnB1c2goW3kuVmlld1Byb2ZpbGUsW1tkLk5vdGhpbmcsWihcIkRFU1wiKV0sW2QuQ29udGFjdCxXKCldLFtkLk9yZ2FuaXphdGlvbixfKCldXV0pLHQucHVzaChbeS5WaWV3UXVvdGUsW1tkLk5vdGhpbmcsWihcIkFMTFFcIildLFtkLkluc3RydW1lbnQsWShcIkFMTFFcIildXV0pLHQucHVzaChbeS5WaWV3UmVzZWFyY2gsW1tkLk5vdGhpbmcsWihcIkJSQ1wiKV0sW2QuSW5zdHJ1bWVudCxZKFwiQlJDXCIpXV1dKSx7Y29udGV4dHM6ZSxpbnRlbnRzOnR9fSkoKSxhPShlPT57Y29uc3QgdD0oW2VdKT0+ISEoZT8/XCJcIikudHJpbSgpO3JldHVybntjb250ZXh0czpbLi4uZT8uY29udGV4dHM/P1tdXS5maWx0ZXIodCksaW50ZW50czpbLi4uZT8uaW50ZW50cz8/W11dLmZpbHRlcigoKFtlLG5dKT0+e2NvbnN0IHI9Wy4uLm4/P1tdXS5maWx0ZXIodCk7cmV0dXJuISEoZT8/XCJcIikudHJpbSgpJiZyLmxlbmd0aD4wfSkpfX0pKHQpLGk9bmV3IE1hcChvLmNvbnRleHRzKTthLmNvbnRleHRzPy5mb3JFYWNoKCgoW2VdKT0+e2kuaGFzKGUpJiZpLmRlbGV0ZShlKX0pKSxvLmNvbnRleHRzPUFycmF5LmZyb20oaSk7Y29uc3Qgcz1uZXcgTWFwKG8uaW50ZW50cyk7YS5pbnRlbnRzPy5mb3JFYWNoKCgoW2VdKT0+e3MuaGFzKGUpJiZzLmRlbGV0ZShlKX0pKSxvLmludGVudHM9QXJyYXkuZnJvbShzKTtjb25zdCBjPVsuLi5vLmNvbnRleHRzLC4uLmEuY29udGV4dHM/P1tdXSx1PVsuLi5vLmludGVudHMsLi4uYS5pbnRlbnRzPz9bXV0sbD1bXTtsZXQgcDtjLmxlbmd0aCYmbC5wdXNoKGZpbi5tZS5pbnRlcm9wLmFkZENvbnRleHRIYW5kbGVyKCgoZSx0LG4scik9PmFzeW5jIG89PntvPyEwIT09by5vcGVuZmluQmJnQXBpJiYoTihcIkNvbnRleHQgcmVjZWl2ZWRcIixvKSxvLnR5cGUhPT1kLk5vdGhpbmc/YXdhaXQgWChlLG8sdCxuLHIpOk4oXCJOdWxsIGNvbnRleHQgcmVjZWl2ZWQsIGlnbm9yaW5nXCIpKTpOKFwiTm8gY29udGV4dCBpbmZvIHByb3ZpZGVkLCBpZ25vcmluZ1wiKX0pKGUsYyxuLHIpKSksdS5sZW5ndGgmJnUuZm9yRWFjaCgoKFt0LG9dKT0+e2wucHVzaChmaW4ubWUuaW50ZXJvcC5yZWdpc3RlckludGVudEhhbmRsZXIoKChlLHQsbixyKT0+YXN5bmMgbz0+e04oXCJJbnRlbnQgcmVjZWl2ZWRcIixvKSx0P2F3YWl0IFgoZSxvLmNvbnRleHQsdCxuLHIpOngoYE5vIGFjdGlvbnMgaGF2ZSBiZWVuIHByb3ZpZGVkIGZvciBpbnRlbnQgJHtvLm5hbWV9LCBpZ25vcmluZ2ApfSkoZSxvLG4sciksdCkpfSkpO3RyeXtwPWF3YWl0IFByb21pc2UuYWxsKGwpfWNhdGNoKGUpe2NvbnN0IHQ9bmV3IEludGVyb3BFcnJvcihcIkZhaWxlZCB0byByZWdpc3RlciBpbnRlcm9wIGhhbmRsZXJzXCIsZSk7dGhyb3cgUih0KSx0fXJldHVybiBwfSxaPWU9PnQ9Pih7bW5lbW9uaWM6ZSx0YXJnZXQ6MH0pLF89KCk9PmU9Pntjb25zdHtuYW1lOnR9PWU7aWYodClyZXR1cm57bW5lbW9uaWM6XCJTRUFSXCIsdGFyZ2V0OjAsdGFpbDp0fTt4KFwiTm8gdmFsaWQgaWRlbnRpZmllciBwcm92aWRlZCBpbiBjb250ZXh0LCBpZ25vcmluZ1wiKX0sWD1hc3luYyhlLHQsbixyLG8pPT57cj8uKHQpLE4oXCJQcm9jZXNzaW5nIGNvbnRleHRcIix0KSxuLnNvbWUoKChbZV0pPT5lPT09dC50eXBlKSk/YXdhaXQgUHJvbWlzZS5hbGwobi5maWx0ZXIoKChbZV0pPT5lPT09dC50eXBlKSkubWFwKChhc3luYyhbLG5dKT0+e2xldCByO3RyeXtyPWF3YWl0IG4odCl9Y2F0Y2goZSl7Y29uc3QgdD1uZXcgQXBpRXJyb3IoXCJVbmV4cGVjdGVkIGVycm9yIGluIGNvbnRleHQgYWN0aW9uIGhhbmRsZXJcIixlKTtyZXR1cm4gUih0KSx2b2lkIG8/Lih0KX10cnl7YXdhaXQgUShyLGUpfWNhdGNoKGUpe2NvbnN0IHQ9ZSBpbnN0YW5jZW9mIEFwaUVycm9yP2U6bmV3IEFwaUVycm9yKHZvaWQgMCxlKTtSKHQpLG8/Lih0KX19KSkpOngoYE5vIGFjdGlvbiBoYXMgYmVlbiBkZWZpbmVkIGZvciBjb250ZXh0IHR5cGUgJHt0LnR5cGV9LCBpZ25vcmluZ2ApfTt2YXIgZWU7IWZ1bmN0aW9uKGUpe2UuQmxvb21iZXJnPVwiQkxPT01CRVJHXCJ9KGVlfHwoZWU9e30pKTtjb25zdCB0ZT1hc3luYyhlLHQpPT57TihcIkNyZWF0aW5nIGNvbm5lY3Rpb25cIix7Y29uZmlnOnR9KSxyZShlZS5CbG9vbWJlcmcpO2NvbnN0IG49YXdhaXQgeih2KTthd2FpdCBuLmluaXRUZXJtaW5hbChlKTtjb25zdHthY3Rpb25zOnIsaW50ZXJvcERpc2FibGVkOm8sb25Db250ZXh0Q2hhbmdlZDphLG9uRXJyb3I6aX09dD8/e30scz12b2lkIDA9PT10Py5ncm91cHM/XCIqXCI6dC5ncm91cHMsYz1bXTtpZighMCE9PW8pe2MucHVzaCguLi5hd2FpdCBLKG4uZGlzcGF0Y2gscixhLGkpKTtjb25zdCBlPWF3YWl0IEIobi5kaXNwYXRjaCxzLGEsaSk7ZSYmYy5wdXNoKGUpfXJldHVybntkaXNjb25uZWN0Om5lKG4uZGlzcGF0Y2gsYyksZXhlY3V0ZUFwaVJlcXVlc3Q6KHU9bi5kaXNwYXRjaCxhc3luYyhlLHQpPT57TihcIkV4ZWN1dGluZyBBUEkgcmVxdWVzdFwiLHtxdWVyeTplfSk7Y29uc3Qgbj17cXVlcnk6ZX07bGV0IHI7dCYmKG4uc2VydmljZT10KTt0cnl7cj1hd2FpdCB1KFQuRXhlY3V0ZVJlcXVlc3Qsbil9Y2F0Y2goZSl7Y29uc3QgdD1uZXcgQWRhcHRlckVycm9yKHZvaWQgMCxlKTt0aHJvdyBSKHQpLHR9aWYoIXIuc3VjY2Vzcyl7Y29uc3QgZT1uZXcgVGVybWluYWxDb25uZWN0UmVxdWVzdEVycm9yKHIuZXJyb3I/Lm1lc3NhZ2Usci5lcnJvcik7dGhyb3cgUihlKSxlfWlmKCFyLmRhdGEpe2NvbnN0IGU9bmV3IFRlcm1pbmFsQ29ubmVjdFJlcXVlc3RFcnJvcihcIlVuZXhwZWN0ZWQgZW1wdHkgcmVzcG9uc2UgZGF0YVwiLHIpO3Rocm93IFIoZSksZX1jb25zdCBvPUpTT04ucGFyc2Uoci5kYXRhKTtpZihcImVycm9yTWVzc2FnZVwiaW4gbyl7Y29uc3QgZT1uZXcgVGVybWluYWxDb25uZWN0UmVxdWVzdEVycm9yKG8uZXJyb3JNZXNzYWdlLG8pO3Rocm93IFIoZSksZX1yZXR1cm4gb30pfTt2YXIgdX0sbmU9KGUsdD1bXSk9PmFzeW5jKCk9PntOKFwiRGlzY29ubmVjdGluZ1wiKTt0cnl7YXdhaXQgUHJvbWlzZS5hbGwodC5tYXAoKGFzeW5jIGU9Pnthd2FpdCBlLnVuc3Vic2NyaWJlKCl9KSkpLGF3YWl0KGU9PmFzeW5jKCk9PntsZXQgdDt0cnl7dD1hd2FpdCBlKFQuRGlzY29ubmVjdCxudWxsKX1jYXRjaChlKXtjb25zdCB0PW5ldyBBZGFwdGVyRXJyb3Iodm9pZCAwLGUpO3Rocm93IFIodCksdH1pZighdC5zdWNjZXNzKXtjb25zdCBlPW5ldyBUZXJtaW5hbENvbm5lY3Rpb25FcnJvcihcIkZhaWxlZCB0byBkaXNjb25uZWN0IHRlcm1pbmFsXCIsdC5lcnJvcik7dGhyb3cgUihlKSxlfX0pKGUpKCl9Y2F0Y2goZSl7Y29uc3QgdD1uZXcgQXBpRXJyb3IoXCJEaXNjb25uZWN0aW9uIGZhaWxlZFwiLGUpO3Rocm93IFIodCksdH19LHJlPWFzeW5jIGU9Pnt0cnl7YXdhaXQgZmluLlN5c3RlbS5yZWdpc3RlclVzYWdlKHt0eXBlOlwiaW50ZWdyYXRpb24tZmVhdHVyZVwiLGRhdGE6e2FwaVZlcnNpb246XCIyLjAuMFwiLGNvbXBvbmVudE5hbWU6ZX19KX1jYXRjaCh0KXt4KGBVbmFibGUgdG8gcmVnaXN0ZXIgdXNhZ2UgZm9yIGZlYXR1cmUgJHtlfTogJHt0Py5tZXNzYWdlfWApfX07dmFyIG9lPXQuQWRhcHRlckVycm9yLGFlPXQuQXBpRXJyb3IsaWU9dC5Jbml0aWFsaXphdGlvbkVycm9yLHNlPXQuSW50ZXJvcEVycm9yLGNlPXQuVGVybWluYWxDb25uZWN0UmVxdWVzdEVycm9yLHVlPXQuVGVybWluYWxDb25uZWN0aW9uRXJyb3IsbGU9dC5jb25uZWN0LHBlPXQuZGlzYWJsZUxvZ2dpbmcsZGU9dC5lbmFibGVMb2dnaW5nLGdlPXQuZ2V0U2VjdXJpdHlGcm9tSW5zdHJ1bWVudENvbnRleHQ7ZXhwb3J0e29lIGFzIEFkYXB0ZXJFcnJvcixhZSBhcyBBcGlFcnJvcixpZSBhcyBJbml0aWFsaXphdGlvbkVycm9yLHNlIGFzIEludGVyb3BFcnJvcixjZSBhcyBUZXJtaW5hbENvbm5lY3RSZXF1ZXN0RXJyb3IsdWUgYXMgVGVybWluYWxDb25uZWN0aW9uRXJyb3IsbGUgYXMgY29ubmVjdCxwZSBhcyBkaXNhYmxlTG9nZ2luZyxkZSBhcyBlbmFibGVMb2dnaW5nLGdlIGFzIGdldFNlY3VyaXR5RnJvbUluc3RydW1lbnRDb250ZXh0fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIGZkYzMgZnJvbSBcIkBmaW5vcy9mZGMzXCI7XG5pbXBvcnQge1xuXHRjb25uZWN0LFxuXHRnZXRTZWN1cml0eUZyb21JbnN0cnVtZW50Q29udGV4dCxcblx0dHlwZSBCbG9vbWJlcmdHcm91cFVwZGF0ZSxcblx0ZW5hYmxlTG9nZ2luZyxcblx0dHlwZSBCbG9vbWJlcmdDb25uZWN0aW9uQ29uZmlnLFxuXHR0eXBlIEJsb29tYmVyZ0Nvbm5lY3Rpb25cbn0gZnJvbSBcIkBvcGVuZmluL2Jsb29tYmVyZ1wiO1xuaW1wb3J0IHR5cGUgT3BlbkZpbiBmcm9tIFwiQG9wZW5maW4vY29yZVwiO1xuXG5sZXQgYmJnQ29ubmVjdGlvbjogQmxvb21iZXJnQ29ubmVjdGlvbiB8IHVuZGVmaW5lZDtcblxubGV0IHNlbGVjdGVkSW50ZW50VHlwZTogc3RyaW5nID0gXCJcIjtcbmxldCBzZWxlY3RlZEludGVudFZhbHVlOiBzdHJpbmcgPSBcIlwiO1xubGV0IGZkYzNEZW5vbWluYXRpb246IHN0cmluZyA9IFwiXCI7XG5sZXQgYmJnTW5lbW9uaWM6IHN0cmluZyA9IFwiXCI7XG5cbmxldCBidG5Db25uZWN0OiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgYnRuRGlzY29ubmVjdDogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xubGV0IGJ0bkNsZWFyTG9nczogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xubGV0IGJ0blF1ZXJ5OiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgaW50ZW50VHlwZUVsZW1lbnQ6IEhUTUxTZWxlY3RFbGVtZW50IHwgbnVsbDtcbmxldCBpbnRlbnRWYWx1ZUVsZW1lbnQ6IEhUTUxTZWxlY3RFbGVtZW50IHwgbnVsbDtcbmxldCBsb2dPdXRwdXQ6IEhUTUxQcmVFbGVtZW50IHwgbnVsbDtcblxuY29uc3QgQVBJX0tFWSA9IFwiXCI7XG5cbmNvbnN0IGNvbmZpZzogQmxvb21iZXJnQ29ubmVjdGlvbkNvbmZpZyA9IHtcblx0b25Db250ZXh0Q2hhbmdlZDogKGNvbnRleHQpID0+IHtcblx0XHRsb2dJbmZvcm1hdGlvbihgUmVjZWl2ZWQgY29udGV4dDogJHtKU09OLnN0cmluZ2lmeShjb250ZXh0KX1gKTtcblx0fSxcblx0b25FcnJvcjogKGVycm9yKSA9PiBsb2dJbmZvcm1hdGlvbihlcnJvci5tZXNzYWdlKSxcblx0Z3JvdXBzOiBbXCJHcm91cC1BXCJdLFxuXHRpbnRlcm9wRGlzYWJsZWQ6IGZhbHNlLFxuXHRhY3Rpb25zOiB7XG5cdFx0Y29udGV4dHM6IFtcblx0XHRcdFtcblx0XHRcdFx0ZmRjMy5Db250ZXh0VHlwZXMuSW5zdHJ1bWVudCxcblx0XHRcdFx0KGNvbnRleHQpOiBCbG9vbWJlcmdHcm91cFVwZGF0ZSB8IHVuZGVmaW5lZCA9PiB7XG5cdFx0XHRcdFx0Ly8gVXNlIHRoZSBnZXRTZWN1cml0eUZyb21JbnN0cnVtZW50Q29udGV4dCB1dGlsaXR5IGZ1bmN0aW9uIHRvIGV4dHJhY3QgdGhlIHNlY3VyaXR5IHN0cmluZyBmcm9tIHRoZSBjb250ZXh0XG5cdFx0XHRcdFx0Y29uc3Qgc2VjdXJpdHkgPSBnZXRTZWN1cml0eUZyb21JbnN0cnVtZW50Q29udGV4dChjb250ZXh0KTtcblx0XHRcdFx0XHRpZiAoIXNlY3VyaXR5KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGBSZWNlaXZlZCBJbnN0cnVtZW50IENvbnRleHQ6ICR7c2VjdXJpdHl9YCk7XG5cblx0XHRcdFx0XHQvLyBSZXR1cm4gYSBCbG9vbWJlcmdHcm91cFVwZGF0ZSBvYmplY3QgdGhhdCB1cGRhdGVzIExhdW5jaHBhZCBncm91cCBBIHdpdGggdGhlIHNlY3VyaXR5XG5cdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdGdyb3VwOiBcIkdyb3VwLUFcIixcblx0XHRcdFx0XHRcdHNlY3VyaXR5XG5cdFx0XHRcdFx0fSBhcyBCbG9vbWJlcmdHcm91cFVwZGF0ZTtcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdF1cblx0fVxufTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGFzeW5jICgpID0+IHtcblx0Ly8gRW5hYmxlIGxvZ2dpbmcgaW4gdGhlIEJCRyBwYWNrYWdlXG5cdGVuYWJsZUxvZ2dpbmcoKTtcblxuXHQvLyBJbml0aWFsaXplIHRoZSBET00gZWxlbWVudHMuXG5cdGluaXRpYWxpemVET00oKTtcbn0pO1xuXG4vKipcbiAqIEluaXRpYWxpemUgdGhlIERPTS5cbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZURPTSgpOiB2b2lkIHtcblx0YnRuQ29ubmVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0bkNvbm5lY3RcIik7XG5cdGJ0bkRpc2Nvbm5lY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5EaXNjb25uZWN0XCIpO1xuXHRidG5DbGVhckxvZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5DbGVhclwiKTtcblx0YnRuUXVlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5RdWVyeVwiKTtcblx0aW50ZW50VHlwZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxTZWxlY3RFbGVtZW50PihcIiNpbnRlbnRUeXBlXCIpO1xuXHRpbnRlbnRWYWx1ZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxTZWxlY3RFbGVtZW50PihcIiNpbnRlbnRWYWx1ZVwiKTtcblx0bG9nT3V0cHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MUHJlRWxlbWVudD4oXCIjbG9nT3V0cHV0XCIpO1xuXG5cdGlmIChidG5Db25uZWN0KSB7XG5cdFx0YnRuQ29ubmVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0aWYgKGJ0bkNvbm5lY3QpIHtcblx0XHRcdFx0YnRuQ29ubmVjdC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHR9XG5cdFx0XHRhd2FpdCBjb25uZWN0VG9CQkdUZXJtaW5hbCgpO1xuXHRcdFx0dXBkYXRlU3RhdGUoKTtcblx0XHR9KTtcblx0fVxuXHRpZiAoYnRuRGlzY29ubmVjdCkge1xuXHRcdGJ0bkRpc2Nvbm5lY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdGlmIChidG5EaXNjb25uZWN0KSB7XG5cdFx0XHRcdGJ0bkRpc2Nvbm5lY3QuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0YXdhaXQgZGlzY29ubmVjdEZyb21CQkdUZXJtaW5hbCgpO1xuXHRcdFx0dXBkYXRlU3RhdGUoKTtcblx0XHR9KTtcblx0fVxuXHRpZiAoYnRuQ2xlYXJMb2dzKSB7XG5cdFx0YnRuQ2xlYXJMb2dzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGVhckxvZ3MpO1xuXHR9XG5cdGlmIChidG5RdWVyeSkge1xuXHRcdGJ0blF1ZXJ5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmaXJlSW50ZW50Rm9yQkJHKTtcblx0fVxuXG5cdGlmIChpbnRlbnRUeXBlRWxlbWVudCkge1xuXHRcdGludGVudFR5cGVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGV2ZW50KSA9PiB7XG5cdFx0XHRpZiAoaW50ZW50VHlwZUVsZW1lbnQ/LnZhbHVlKSB7XG5cdFx0XHRcdGlmIChidG5RdWVyeSkge1xuXHRcdFx0XHRcdGJ0blF1ZXJ5LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRzd2l0Y2ggKGludGVudFR5cGVFbGVtZW50Py52YWx1ZSkge1xuXHRcdFx0XHRcdGNhc2UgXCJWaWV3Q2hhcnRcIjpcblx0XHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKFxuXHRcdFx0XHRcdFx0XHRcIkludGVudCB0byBiZSBmaXJlZCBpcyBWaWV3Q2hhcnQuIENvbnRlbnQgVHlwZSBpcyBmZGMzLmluc3RydW1lbnQuIEJsb29tYmVyZyBUZXJtaW5hbCBNbmVtb25pYzogR1BcIlxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdHNlbGVjdGVkSW50ZW50VHlwZSA9IFwiVmlld0NoYXJ0XCI7XG5cdFx0XHRcdFx0XHRmZGMzRGVub21pbmF0aW9uID0gXCJmZGMzLmluc3RydW1lbnRcIjtcblx0XHRcdFx0XHRcdGJiZ01uZW1vbmljID0gXCJHUFwiO1xuXHRcdFx0XHRcdFx0cG9wdWxhdGVTZWxlY3QoaW50ZW50VmFsdWVFbGVtZW50LCBbXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogXCJPUkNMXCIsXG5cdFx0XHRcdFx0XHRcdFx0bGFiZWw6IFwiT3JhY2xlIENvcnBcIlxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IFwiTVNGVFwiLFxuXHRcdFx0XHRcdFx0XHRcdGxhYmVsOiBcIk1pY3Jvc29mdFwiXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogXCJJQk1cIixcblx0XHRcdFx0XHRcdFx0XHRsYWJlbDogXCJJQk1cIlxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRdKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgXCJWaWV3Q29udGFjdFwiOlxuXHRcdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oXG5cdFx0XHRcdFx0XHRcdFwiSW50ZW50IHRvIGJlIGZpcmVkIGlzIFZpZXdDb250YWN0LiBDb250ZW50IFR5cGUgaXMgZmRjMy5jb250YWN0LiBCbG9vbWJlcmcgVGVybWluYWwgTW5lbW9uaWM6IEJJT1wiXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0c2VsZWN0ZWRJbnRlbnRUeXBlID0gXCJWaWV3Q29udGFjdFwiO1xuXHRcdFx0XHRcdFx0ZmRjM0Rlbm9taW5hdGlvbiA9IFwiZmRjMy5jb250YWN0XCI7XG5cdFx0XHRcdFx0XHRiYmdNbmVtb25pYyA9IFwiQklPXCI7XG5cdFx0XHRcdFx0XHRwb3B1bGF0ZVNlbGVjdChpbnRlbnRWYWx1ZUVsZW1lbnQsIFtcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBcIldpbGxpYW0gSGVucnkgR2F0ZXNcIixcblx0XHRcdFx0XHRcdFx0XHRsYWJlbDogXCJXaWxsaWFtIEhlbnJ5IEdhdGVzXCJcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBcIkxhcnJ5IEVsbGlzb25cIixcblx0XHRcdFx0XHRcdFx0XHRsYWJlbDogXCJMYXJyeSBFbGxpc29uXCJcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBcIlJvYmVydCBJZ2VyXCIsXG5cdFx0XHRcdFx0XHRcdFx0bGFiZWw6IFwiUm9iZXJ0IElnZXJcIlxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRdKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgXCJWaWV3SW5zdHJ1bWVudFwiOlxuXHRcdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oXG5cdFx0XHRcdFx0XHRcdFwiSW50ZW50IHRvIGJlIGZpcmVkIGlzIFZpZXdJbnN0cnVtZW50LiBDb250ZW50IFR5cGUgaXMgZmRjMy5pbnN0cnVtZW50LiBCbG9vbWJlcmcgVGVybWluYWwgTW5lbW9uaWM6IERFU1wiXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0c2VsZWN0ZWRJbnRlbnRUeXBlID0gXCJWaWV3SW5zdHJ1bWVudFwiO1xuXHRcdFx0XHRcdFx0ZmRjM0Rlbm9taW5hdGlvbiA9IFwiZmRjMy5pbnN0cnVtZW50XCI7XG5cdFx0XHRcdFx0XHRiYmdNbmVtb25pYyA9IFwiREVTXCI7XG5cdFx0XHRcdFx0XHRwb3B1bGF0ZVNlbGVjdChpbnRlbnRWYWx1ZUVsZW1lbnQsIFtcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBcIk9SQ0xcIixcblx0XHRcdFx0XHRcdFx0XHRsYWJlbDogXCJPcmFjbGUgQ29ycFwiXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogXCJNU0ZUXCIsXG5cdFx0XHRcdFx0XHRcdFx0bGFiZWw6IFwiTWljcm9zb2Z0XCJcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBcIklCTVwiLFxuXHRcdFx0XHRcdFx0XHRcdGxhYmVsOiBcIklCTVwiXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcIlZpZXdRdW90ZVwiOlxuXHRcdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oXG5cdFx0XHRcdFx0XHRcdFwiSW50ZW50IHRvIGJlIGZpcmVkIGlzIFZpZXdRdW90ZS4gQ29udGVudCBUeXBlIGlzIGZkYzMuaW5zdHJ1bWVudC4gQmxvb21iZXJnIFRlcm1pbmFsIE1uZW1vbmljOiBRXCJcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRzZWxlY3RlZEludGVudFR5cGUgPSBcIlZpZXdRdW90ZVwiO1xuXHRcdFx0XHRcdFx0ZmRjM0Rlbm9taW5hdGlvbiA9IFwiZmRjMy5pbnN0cnVtZW50XCI7XG5cdFx0XHRcdFx0XHRiYmdNbmVtb25pYyA9IFwiUVwiO1xuXHRcdFx0XHRcdFx0cG9wdWxhdGVTZWxlY3QoaW50ZW50VmFsdWVFbGVtZW50LCBbXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogXCJPUkNMXCIsXG5cdFx0XHRcdFx0XHRcdFx0bGFiZWw6IFwiT3JhY2xlIENvcnBcIlxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IFwiTVNGVFwiLFxuXHRcdFx0XHRcdFx0XHRcdGxhYmVsOiBcIk1pY3Jvc29mdFwiXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogXCJJQk1cIixcblx0XHRcdFx0XHRcdFx0XHRsYWJlbDogXCJJQk1cIlxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRdKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHVwZGF0ZVN0YXRlKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRpZiAoaW50ZW50VmFsdWVFbGVtZW50KSB7XG5cdFx0aW50ZW50VmFsdWVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xuXHRcdFx0aWYgKGludGVudFZhbHVlRWxlbWVudCkge1xuXHRcdFx0XHRzZWxlY3RlZEludGVudFZhbHVlID0gaW50ZW50VmFsdWVFbGVtZW50LnZhbHVlO1xuXHRcdFx0XHRpZiAoc2VsZWN0ZWRJbnRlbnRWYWx1ZS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oXG5cdFx0XHRcdFx0XHRgYWN0aW9uOiAke3NlbGVjdGVkSW50ZW50VHlwZX0sIHR5cGU6ICR7ZmRjM0Rlbm9taW5hdGlvbn0sIGJiZyBtbmVtb25pYzogJHtiYmdNbmVtb25pY30sIHNlYXJjaCB2YWx1ZTogJHtzZWxlY3RlZEludGVudFZhbHVlfWBcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHVwZGF0ZVN0YXRlKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHR1cGRhdGVTdGF0ZSgpO1xufVxuXG4vKipcbiAqIENvbm5lY3QgdG8gQmxvb21iZXJnIFRlcm1pbmFsLlxuICovXG5hc3luYyBmdW5jdGlvbiBjb25uZWN0VG9CQkdUZXJtaW5hbCgpOiBQcm9taXNlPHZvaWQ+IHtcblx0dHJ5IHtcblx0XHRsb2dJbmZvcm1hdGlvbihcIkNoZWNraW5nIEJsb29tYmVyZyBUZXJtaW5hbCBTdGF0dXNcIik7XG5cblx0XHRiYmdDb25uZWN0aW9uID0gYXdhaXQgY29ubmVjdChBUElfS0VZLCBjb25maWcpO1xuXHRcdGxvZ0luZm9ybWF0aW9uKFwiQ29ubmVjdGlvbiBzdWNjZXNzZnVsXCIpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGJiZ0Nvbm5lY3Rpb24gPSB1bmRlZmluZWQ7XG5cdFx0Y29uc29sZS5sb2coZXJyb3IpO1xuXHRcdGxvZ0luZm9ybWF0aW9uKGVycm9yVG9TdHJpbmcoZXJyb3IpKTtcblx0fVxufVxuXG4vKipcbiAqIERpc2Nvbm5lY3QgZnJvbSBCbG9vbWJlcmcgVGVybWluYWwuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGRpc2Nvbm5lY3RGcm9tQkJHVGVybWluYWwoKTogUHJvbWlzZTx2b2lkPiB7XG5cdGlmIChiYmdDb25uZWN0aW9uKSB7XG5cdFx0dHJ5IHtcblx0XHRcdGxvZ0luZm9ybWF0aW9uKFwiRGlzY29ubmVjdGluZyBmcm9tIEJsb29tYmVyZyBUZXJtaW5hbFwiKTtcblx0XHRcdGF3YWl0IGJiZ0Nvbm5lY3Rpb24uZGlzY29ubmVjdCgpO1xuXHRcdH0gZmluYWxseSB7XG5cdFx0XHRiYmdDb25uZWN0aW9uID0gdW5kZWZpbmVkO1xuXHRcdFx0bG9nSW5mb3JtYXRpb24oXCJEaXNjb25uZWN0ZWQgZnJvbSBCbG9vbWJlcmcgVGVybWluYWxcIik7XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogRmlyZSBhbiBpbnRlbnQuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGZpcmVJbnRlbnRGb3JCQkcoKTogUHJvbWlzZTx2b2lkPiB7XG5cdGlmIChiYmdDb25uZWN0aW9uKSB7XG5cdFx0dHJ5IHtcblx0XHRcdGxvZ0luZm9ybWF0aW9uKFxuXHRcdFx0XHRgYWN0aW9uOiAke3NlbGVjdGVkSW50ZW50VHlwZX0sIHR5cGU6ICR7ZmRjM0Rlbm9taW5hdGlvbn0sIGJiZyBtbmVtb25pYzogJHtiYmdNbmVtb25pY30sIHNlYXJjaCB2YWx1ZTogJHtzZWxlY3RlZEludGVudFZhbHVlfWBcblx0XHRcdCk7XG5cblx0XHRcdGxldCBpbnRlbnQ6IE9wZW5GaW4uSW50ZW50O1xuXG5cdFx0XHRzd2l0Y2ggKHNlbGVjdGVkSW50ZW50VHlwZSkge1xuXHRcdFx0XHRjYXNlIFwiVmlld0NvbnRhY3RcIjpcblx0XHRcdFx0XHRpbnRlbnQgPSB7XG5cdFx0XHRcdFx0XHRuYW1lOiBzZWxlY3RlZEludGVudFR5cGUsXG5cdFx0XHRcdFx0XHRjb250ZXh0OiB7XG5cdFx0XHRcdFx0XHRcdHR5cGU6IGZkYzNEZW5vbWluYXRpb24sXG5cdFx0XHRcdFx0XHRcdG5hbWU6IHNlbGVjdGVkSW50ZW50VmFsdWUsXG5cdFx0XHRcdFx0XHRcdGlkOiB7fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0aW50ZW50ID0ge1xuXHRcdFx0XHRcdFx0bmFtZTogc2VsZWN0ZWRJbnRlbnRUeXBlLFxuXHRcdFx0XHRcdFx0Y29udGV4dDoge1xuXHRcdFx0XHRcdFx0XHR0eXBlOiBmZGMzRGVub21pbmF0aW9uLFxuXHRcdFx0XHRcdFx0XHRpZDoge1xuXHRcdFx0XHRcdFx0XHRcdHRpY2tlcjogc2VsZWN0ZWRJbnRlbnRWYWx1ZVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0YXdhaXQgZmluLm1lLmludGVyb3AuZmlyZUludGVudChpbnRlbnQpO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRsb2dJbmZvcm1hdGlvbihgRXJyb3Igd2hpbGUgdHJ5aW5nIHRvIHJhaXNlIGludGVudDogJHtlcnJvclRvU3RyaW5nKGVycm9yKX1gKTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0bG9nSW5mb3JtYXRpb24oXCJOb3QgY29ubmVjdGVkIHRvIHRoZSBCbG9vbWJlcmcgVGVybWluYWwuIFBsZWFzZSBjaGVjayB5b3VyIHN0YXR1cyBvciBsb2cgaW4gYWdhaW4uXCIpO1xuXHR9XG59XG5cbi8qKlxuICogVXBkYXRlIHRoZSBzdGF0ZSBvZiB0aGUgRE9NLlxuICovXG5mdW5jdGlvbiB1cGRhdGVTdGF0ZSgpOiB2b2lkIHtcblx0Y29uc3QgaXNDb25uZWN0ZWQgPSBiYmdDb25uZWN0aW9uICE9PSB1bmRlZmluZWQ7XG5cdGlmIChidG5Db25uZWN0KSB7XG5cdFx0YnRuQ29ubmVjdC5kaXNhYmxlZCA9IGlzQ29ubmVjdGVkO1xuXHR9XG5cdGlmIChidG5EaXNjb25uZWN0KSB7XG5cdFx0YnRuRGlzY29ubmVjdC5kaXNhYmxlZCA9ICFpc0Nvbm5lY3RlZDtcblx0fVxuXHRpZiAoaW50ZW50VHlwZUVsZW1lbnQpIHtcblx0XHRpbnRlbnRUeXBlRWxlbWVudC5kaXNhYmxlZCA9ICFpc0Nvbm5lY3RlZDtcblx0fVxuXHRpZiAoaW50ZW50VmFsdWVFbGVtZW50KSB7XG5cdFx0aW50ZW50VmFsdWVFbGVtZW50LmRpc2FibGVkID0gIWlzQ29ubmVjdGVkIHx8IHNlbGVjdGVkSW50ZW50VHlwZS5sZW5ndGggPT09IDA7XG5cdH1cblx0aWYgKGJ0blF1ZXJ5KSB7XG5cdFx0YnRuUXVlcnkuZGlzYWJsZWQgPSAhaXNDb25uZWN0ZWQgfHwgc2VsZWN0ZWRJbnRlbnRWYWx1ZS5sZW5ndGggPT09IDA7XG5cdH1cbn1cblxuLyoqXG4gKiBMb2cgaW5mb3JtYXRpb24gdG8gdGhlIG91dHB1dCBlbGVtZW50LlxuICogQHBhcmFtIGluZm8gVGhlIGluZm9ybWF0aW9uIHRvIGxvZy5cbiAqL1xuZnVuY3Rpb24gbG9nSW5mb3JtYXRpb24oaW5mbzogc3RyaW5nKTogdm9pZCB7XG5cdGlmIChsb2dPdXRwdXQpIHtcblx0XHRsb2dPdXRwdXQudGV4dENvbnRlbnQgPSBgJHtsb2dPdXRwdXQudGV4dENvbnRlbnR9JHtpbmZvfVxcblxcbmA7XG5cdFx0bG9nT3V0cHV0LnNjcm9sbFRvcCA9IGxvZ091dHB1dC5zY3JvbGxIZWlnaHQ7XG5cdH1cbn1cblxuLyoqXG4gKiBDb252ZXJ0IGFuZCBlcnJvciB0byBhIHN0cmluZy5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyBUaGUgZXJyb3IgYXMgYSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGVycm9yVG9TdHJpbmcoZXJyOiB1bmtub3duKTogc3RyaW5nIHtcblx0aWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0cmV0dXJuIGVyci5tZXNzYWdlO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBlcnIgPT09IFwic3RyaW5nXCIpIHtcblx0XHRyZXR1cm4gZXJyO1xuXHR9XG5cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KGVycik7XG59XG5cbi8qKlxuICogQ2xlYXIgdGhlIGxvZ3MuXG4gKi9cbmZ1bmN0aW9uIGNsZWFyTG9ncygpOiB2b2lkIHtcblx0aWYgKGxvZ091dHB1dCkge1xuXHRcdGxvZ091dHB1dC50ZXh0Q29udGVudCA9IFwiXCI7XG5cdFx0bG9nT3V0cHV0LnNjcm9sbFRvcCA9IDA7XG5cdH1cbn1cblxuLyoqXG4gKiBQb3B1bGF0ZSBhIHNlbGVjdCBjb250cm9sIHdpdGggYSBsaXN0IG9mIGl0ZW1zLlxuICogQHBhcmFtIHNlbGVjdCBUaGUgc2VsZWN0IGVsZW1lbnQgdG8gcG9wdWxhdGUuXG4gKiBAcGFyYW0gdmFsdWVzIFRoZSB2YWx1ZXMgdG8gcG9wdWxhdGUgdGhlIGVsZW1lbnQgd2l0aC5cbiAqL1xuZnVuY3Rpb24gcG9wdWxhdGVTZWxlY3Qoc2VsZWN0OiBIVE1MU2VsZWN0RWxlbWVudCB8IG51bGwsIHZhbHVlczogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nIH1bXSk6IHZvaWQge1xuXHRpZiAoc2VsZWN0KSB7XG5cdFx0c2VsZWN0LmlubmVySFRNTCA9IFwiXCI7XG5cdFx0Y29uc3Qgb3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcblx0XHRvcHQudmFsdWUgPSBcIlwiO1xuXHRcdG9wdC50ZXh0ID0gXCJQbGVhc2Ugc2VsZWN0IHZhbHVlXCI7XG5cdFx0b3B0LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRvcHQuc2VsZWN0ZWQgPSB0cnVlO1xuXHRcdHNlbGVjdC5hcHBlbmQob3B0KTtcblxuXHRcdGZvciAoY29uc3QgdmFsIG9mIHZhbHVlcykge1xuXHRcdFx0Y29uc3Qgb3B0VmFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcblx0XHRcdG9wdFZhbC52YWx1ZSA9IHZhbC52YWx1ZTtcblx0XHRcdG9wdFZhbC50ZXh0ID0gdmFsLmxhYmVsO1xuXHRcdFx0c2VsZWN0LmFwcGVuZChvcHRWYWwpO1xuXHRcdH1cblx0fVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9