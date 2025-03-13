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
    onContextChanged: ((context) => {
        logInformation(`Received context: ${JSON.stringify(context)}`);
    }),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmJndGVzdC5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQSxjQUFjLDJnRUFBMmdFO0FBQ3poRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDREQUE0RCw2QkFBNkI7QUFDekY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDhCQUE4QjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLG9DQUFvQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLGtDQUFrQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsb0NBQW9DO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxzQ0FBc0M7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGNBQWMsNkJBQTZCLDBCQUEwQixjQUFjLHFCQUFxQjtBQUN4RyxpQkFBaUIsb0RBQW9ELHFFQUFxRSxjQUFjO0FBQ3hKLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDLG1DQUFtQyxTQUFTO0FBQzVDLG1DQUFtQyxXQUFXLFVBQVU7QUFDeEQsMENBQTBDLGNBQWM7QUFDeEQ7QUFDQSw4R0FBOEcsT0FBTztBQUNySCxpRkFBaUYsaUJBQWlCO0FBQ2xHLHlEQUF5RCxnQkFBZ0IsUUFBUTtBQUNqRiwrQ0FBK0MsZ0JBQWdCLGdCQUFnQjtBQUMvRTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0EsVUFBVSxZQUFZLGFBQWEsU0FBUyxVQUFVO0FBQ3RELG9DQUFvQyxTQUFTO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBLHFCQUFxQix1QkFBdUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFpRSwwREFBMEQ7QUFDM0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsSUFBSSxZQUFZO0FBQ3pDO0FBQ0EsaUJBQWlCO0FBQ2pCLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLHdDQUF3QztBQUN0RjtBQUNBO0FBQ0EsOENBQThDLHdDQUF3QztBQUN0RjtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsNkRBQTZEO0FBQ3ZHO0FBQ0E7QUFDQSwwQ0FBMEMsK0RBQStEO0FBQ3pHO0FBQ0E7QUFDQSwwQ0FBMEMsd0NBQXdDO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBLDhDQUE4Qyx1REFBdUQ7QUFDckc7QUFDQTtBQUNBLDhDQUE4Qyx1REFBdUQ7QUFDckc7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMseURBQXlEO0FBQ3ZHO0FBQ0E7QUFDQSw4Q0FBOEMseURBQXlEO0FBQ3ZHO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyx3REFBd0Q7QUFDbEc7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsdUVBQXVFO0FBQ3JIO0FBQ0E7QUFDQSw4Q0FBOEMsb0VBQW9FO0FBQ2xIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsbURBQW1EO0FBQzdGO0FBQ0E7QUFDQSwwQ0FBMEMseUNBQXlDO0FBQ25GO0FBQ0E7QUFDQSwwQ0FBMEMsMkNBQTJDO0FBQ3JGO0FBQ0E7QUFDQSwwQ0FBMEMsNENBQTRDO0FBQ3RGO0FBQ0E7QUFDQSwwQ0FBMEMsK0JBQStCO0FBQ3pFO0FBQ0E7QUFDQSwwQ0FBMEMseUNBQXlDO0FBQ25GO0FBQ0E7QUFDQSwwQ0FBMEMsd0NBQXdDO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsa0RBQWtEO0FBQzlFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwyQkFBMkI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLG9DQUFvQzs7QUFFckM7QUFDQTtBQUNBLGNBQWMsbVVBQW1VO0FBQ2pWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7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QUNqQyxHQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNwQixHQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRW5CLEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7WUFDMUIsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoRCxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFDekIsTUFBTSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQ3hCLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkIsQ0FBQztJQUNGLENBQUM7QUFDRixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaW50ZWdyYXRlLXdpdGgtYmxvb21iZXJnLWJhc2ljLy4uLy4uL25vZGVfbW9kdWxlcy9AZmlub3MvZmRjMy9kaXN0L2ZkYzMuZXNtLmpzIiwid2VicGFjazovL2ludGVncmF0ZS13aXRoLWJsb29tYmVyZy1iYXNpYy8uLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5maW4vYmxvb21iZXJnL29wZW5maW4uYmxvb21iZXJnLm1qcyIsIndlYnBhY2s6Ly9pbnRlZ3JhdGUtd2l0aC1ibG9vbWJlcmctYmFzaWMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vaW50ZWdyYXRlLXdpdGgtYmxvb21iZXJnLWJhc2ljL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9pbnRlZ3JhdGUtd2l0aC1ibG9vbWJlcmctYmFzaWMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9pbnRlZ3JhdGUtd2l0aC1ibG9vbWJlcmctYmFzaWMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9pbnRlZ3JhdGUtd2l0aC1ibG9vbWJlcmctYmFzaWMvLi9jbGllbnQvc3JjL2JiZ3Rlc3QudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVG8gcGFyc2UgdGhpcyBkYXRhOlxuLy9cbi8vICAgaW1wb3J0IHsgQ29udmVydCwgQWdlbnRFcnJvclJlc3BvbnNlTWVzc2FnZSwgQWdlbnRSZXF1ZXN0TWVzc2FnZSwgQWdlbnRSZXNwb25zZU1lc3NhZ2UsIEJyaWRnZUVycm9yUmVzcG9uc2VNZXNzYWdlLCBCcmlkZ2VSZXF1ZXN0TWVzc2FnZSwgQnJpZGdlUmVzcG9uc2VNZXNzYWdlLCBCcm9hZGNhc3RBZ2VudFJlcXVlc3QsIEJyb2FkY2FzdEJyaWRnZVJlcXVlc3QsIENvbm5lY3Rpb25TdGVwTWVzc2FnZSwgQ29ubmVjdGlvblN0ZXAySGVsbG8sIENvbm5lY3Rpb25TdGVwM0hhbmRzaGFrZSwgQ29ubmVjdGlvblN0ZXA0QXV0aGVudGljYXRpb25GYWlsZWQsIENvbm5lY3Rpb25TdGVwNkNvbm5lY3RlZEFnZW50c1VwZGF0ZSwgRmluZEluc3RhbmNlc0FnZW50RXJyb3JSZXNwb25zZSwgRmluZEluc3RhbmNlc0FnZW50UmVxdWVzdCwgRmluZEluc3RhbmNlc0FnZW50UmVzcG9uc2UsIEZpbmRJbnN0YW5jZXNCcmlkZ2VFcnJvclJlc3BvbnNlLCBGaW5kSW5zdGFuY2VzQnJpZGdlUmVxdWVzdCwgRmluZEluc3RhbmNlc0JyaWRnZVJlc3BvbnNlLCBGaW5kSW50ZW50QWdlbnRFcnJvclJlc3BvbnNlLCBGaW5kSW50ZW50QWdlbnRSZXF1ZXN0LCBGaW5kSW50ZW50QWdlbnRSZXNwb25zZSwgRmluZEludGVudEJyaWRnZUVycm9yUmVzcG9uc2UsIEZpbmRJbnRlbnRCcmlkZ2VSZXF1ZXN0LCBGaW5kSW50ZW50QnJpZGdlUmVzcG9uc2UsIEZpbmRJbnRlbnRzQnlDb250ZXh0QWdlbnRFcnJvclJlc3BvbnNlLCBGaW5kSW50ZW50c0J5Q29udGV4dEFnZW50UmVxdWVzdCwgRmluZEludGVudHNCeUNvbnRleHRBZ2VudFJlc3BvbnNlLCBGaW5kSW50ZW50c0J5Q29udGV4dEJyaWRnZUVycm9yUmVzcG9uc2UsIEZpbmRJbnRlbnRzQnlDb250ZXh0QnJpZGdlUmVxdWVzdCwgRmluZEludGVudHNCeUNvbnRleHRCcmlkZ2VSZXNwb25zZSwgR2V0QXBwTWV0YWRhdGFBZ2VudEVycm9yUmVzcG9uc2UsIEdldEFwcE1ldGFkYXRhQWdlbnRSZXF1ZXN0LCBHZXRBcHBNZXRhZGF0YUFnZW50UmVzcG9uc2UsIEdldEFwcE1ldGFkYXRhQnJpZGdlRXJyb3JSZXNwb25zZSwgR2V0QXBwTWV0YWRhdGFCcmlkZ2VSZXF1ZXN0LCBHZXRBcHBNZXRhZGF0YUJyaWRnZVJlc3BvbnNlLCBPcGVuQWdlbnRFcnJvclJlc3BvbnNlLCBPcGVuQWdlbnRSZXF1ZXN0LCBPcGVuQWdlbnRSZXNwb25zZSwgT3BlbkJyaWRnZUVycm9yUmVzcG9uc2UsIE9wZW5CcmlkZ2VSZXF1ZXN0LCBPcGVuQnJpZGdlUmVzcG9uc2UsIFByaXZhdGVDaGFubmVsQnJvYWRjYXN0QWdlbnRSZXF1ZXN0LCBQcml2YXRlQ2hhbm5lbEJyb2FkY2FzdEJyaWRnZVJlcXVlc3QsIFByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lckFkZGVkQWdlbnRSZXF1ZXN0LCBQcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJBZGRlZEJyaWRnZVJlcXVlc3QsIFByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lclJlbW92ZWRBZ2VudFJlcXVlc3QsIFByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lclJlbW92ZWRCcmlkZ2VSZXF1ZXN0LCBQcml2YXRlQ2hhbm5lbE9uQWRkQ29udGV4dExpc3RlbmVyQWdlbnRSZXF1ZXN0LCBQcml2YXRlQ2hhbm5lbE9uQWRkQ29udGV4dExpc3RlbmVyQnJpZGdlUmVxdWVzdCwgUHJpdmF0ZUNoYW5uZWxPbkRpc2Nvbm5lY3RBZ2VudFJlcXVlc3QsIFByaXZhdGVDaGFubmVsT25EaXNjb25uZWN0QnJpZGdlUmVxdWVzdCwgUHJpdmF0ZUNoYW5uZWxPblVuc3Vic2NyaWJlQWdlbnRSZXF1ZXN0LCBQcml2YXRlQ2hhbm5lbE9uVW5zdWJzY3JpYmVCcmlkZ2VSZXF1ZXN0LCBSYWlzZUludGVudEFnZW50RXJyb3JSZXNwb25zZSwgUmFpc2VJbnRlbnRBZ2VudFJlcXVlc3QsIFJhaXNlSW50ZW50QWdlbnRSZXNwb25zZSwgUmFpc2VJbnRlbnRCcmlkZ2VFcnJvclJlc3BvbnNlLCBSYWlzZUludGVudEJyaWRnZVJlcXVlc3QsIFJhaXNlSW50ZW50QnJpZGdlUmVzcG9uc2UsIFJhaXNlSW50ZW50UmVzdWx0QWdlbnRFcnJvclJlc3BvbnNlLCBSYWlzZUludGVudFJlc3VsdEFnZW50UmVzcG9uc2UsIFJhaXNlSW50ZW50UmVzdWx0QnJpZGdlRXJyb3JSZXNwb25zZSwgUmFpc2VJbnRlbnRSZXN1bHRCcmlkZ2VSZXNwb25zZSwgQ29udGV4dCB9IGZyb20gXCIuL2ZpbGVcIjtcbi8vXG4vLyAgIGNvbnN0IGZEQzNEZXNrdG9wQWdlbnRBUElTY2hlbWEgPSBDb252ZXJ0LnRvRkRDM0Rlc2t0b3BBZ2VudEFQSVNjaGVtYShqc29uKTtcbi8vICAgY29uc3QgYWdlbnRFcnJvclJlc3BvbnNlTWVzc2FnZSA9IENvbnZlcnQudG9BZ2VudEVycm9yUmVzcG9uc2VNZXNzYWdlKGpzb24pO1xuLy8gICBjb25zdCBhZ2VudFJlcXVlc3RNZXNzYWdlID0gQ29udmVydC50b0FnZW50UmVxdWVzdE1lc3NhZ2UoanNvbik7XG4vLyAgIGNvbnN0IGFnZW50UmVzcG9uc2VNZXNzYWdlID0gQ29udmVydC50b0FnZW50UmVzcG9uc2VNZXNzYWdlKGpzb24pO1xuLy8gICBjb25zdCBicmlkZ2VFcnJvclJlc3BvbnNlTWVzc2FnZSA9IENvbnZlcnQudG9CcmlkZ2VFcnJvclJlc3BvbnNlTWVzc2FnZShqc29uKTtcbi8vICAgY29uc3QgYnJpZGdlUmVxdWVzdE1lc3NhZ2UgPSBDb252ZXJ0LnRvQnJpZGdlUmVxdWVzdE1lc3NhZ2UoanNvbik7XG4vLyAgIGNvbnN0IGJyaWRnZVJlc3BvbnNlTWVzc2FnZSA9IENvbnZlcnQudG9CcmlkZ2VSZXNwb25zZU1lc3NhZ2UoanNvbik7XG4vLyAgIGNvbnN0IGJyb2FkY2FzdEFnZW50UmVxdWVzdCA9IENvbnZlcnQudG9Ccm9hZGNhc3RBZ2VudFJlcXVlc3QoanNvbik7XG4vLyAgIGNvbnN0IGJyb2FkY2FzdEJyaWRnZVJlcXVlc3QgPSBDb252ZXJ0LnRvQnJvYWRjYXN0QnJpZGdlUmVxdWVzdChqc29uKTtcbi8vICAgY29uc3QgYnJpZGdpbmdDb21tb25zID0gQ29udmVydC50b0JyaWRnaW5nQ29tbW9ucyhqc29uKTtcbi8vICAgY29uc3QgY29ubmVjdGlvblN0ZXBNZXNzYWdlID0gQ29udmVydC50b0Nvbm5lY3Rpb25TdGVwTWVzc2FnZShqc29uKTtcbi8vICAgY29uc3QgY29ubmVjdGlvblN0ZXAySGVsbG8gPSBDb252ZXJ0LnRvQ29ubmVjdGlvblN0ZXAySGVsbG8oanNvbik7XG4vLyAgIGNvbnN0IGNvbm5lY3Rpb25TdGVwM0hhbmRzaGFrZSA9IENvbnZlcnQudG9Db25uZWN0aW9uU3RlcDNIYW5kc2hha2UoanNvbik7XG4vLyAgIGNvbnN0IGNvbm5lY3Rpb25TdGVwNEF1dGhlbnRpY2F0aW9uRmFpbGVkID0gQ29udmVydC50b0Nvbm5lY3Rpb25TdGVwNEF1dGhlbnRpY2F0aW9uRmFpbGVkKGpzb24pO1xuLy8gICBjb25zdCBjb25uZWN0aW9uU3RlcDZDb25uZWN0ZWRBZ2VudHNVcGRhdGUgPSBDb252ZXJ0LnRvQ29ubmVjdGlvblN0ZXA2Q29ubmVjdGVkQWdlbnRzVXBkYXRlKGpzb24pO1xuLy8gICBjb25zdCBmaW5kSW5zdGFuY2VzQWdlbnRFcnJvclJlc3BvbnNlID0gQ29udmVydC50b0ZpbmRJbnN0YW5jZXNBZ2VudEVycm9yUmVzcG9uc2UoanNvbik7XG4vLyAgIGNvbnN0IGZpbmRJbnN0YW5jZXNBZ2VudFJlcXVlc3QgPSBDb252ZXJ0LnRvRmluZEluc3RhbmNlc0FnZW50UmVxdWVzdChqc29uKTtcbi8vICAgY29uc3QgZmluZEluc3RhbmNlc0FnZW50UmVzcG9uc2UgPSBDb252ZXJ0LnRvRmluZEluc3RhbmNlc0FnZW50UmVzcG9uc2UoanNvbik7XG4vLyAgIGNvbnN0IGZpbmRJbnN0YW5jZXNCcmlkZ2VFcnJvclJlc3BvbnNlID0gQ29udmVydC50b0ZpbmRJbnN0YW5jZXNCcmlkZ2VFcnJvclJlc3BvbnNlKGpzb24pO1xuLy8gICBjb25zdCBmaW5kSW5zdGFuY2VzQnJpZGdlUmVxdWVzdCA9IENvbnZlcnQudG9GaW5kSW5zdGFuY2VzQnJpZGdlUmVxdWVzdChqc29uKTtcbi8vICAgY29uc3QgZmluZEluc3RhbmNlc0JyaWRnZVJlc3BvbnNlID0gQ29udmVydC50b0ZpbmRJbnN0YW5jZXNCcmlkZ2VSZXNwb25zZShqc29uKTtcbi8vICAgY29uc3QgZmluZEludGVudEFnZW50RXJyb3JSZXNwb25zZSA9IENvbnZlcnQudG9GaW5kSW50ZW50QWdlbnRFcnJvclJlc3BvbnNlKGpzb24pO1xuLy8gICBjb25zdCBmaW5kSW50ZW50QWdlbnRSZXF1ZXN0ID0gQ29udmVydC50b0ZpbmRJbnRlbnRBZ2VudFJlcXVlc3QoanNvbik7XG4vLyAgIGNvbnN0IGZpbmRJbnRlbnRBZ2VudFJlc3BvbnNlID0gQ29udmVydC50b0ZpbmRJbnRlbnRBZ2VudFJlc3BvbnNlKGpzb24pO1xuLy8gICBjb25zdCBmaW5kSW50ZW50QnJpZGdlRXJyb3JSZXNwb25zZSA9IENvbnZlcnQudG9GaW5kSW50ZW50QnJpZGdlRXJyb3JSZXNwb25zZShqc29uKTtcbi8vICAgY29uc3QgZmluZEludGVudEJyaWRnZVJlcXVlc3QgPSBDb252ZXJ0LnRvRmluZEludGVudEJyaWRnZVJlcXVlc3QoanNvbik7XG4vLyAgIGNvbnN0IGZpbmRJbnRlbnRCcmlkZ2VSZXNwb25zZSA9IENvbnZlcnQudG9GaW5kSW50ZW50QnJpZGdlUmVzcG9uc2UoanNvbik7XG4vLyAgIGNvbnN0IGZpbmRJbnRlbnRzQnlDb250ZXh0QWdlbnRFcnJvclJlc3BvbnNlID0gQ29udmVydC50b0ZpbmRJbnRlbnRzQnlDb250ZXh0QWdlbnRFcnJvclJlc3BvbnNlKGpzb24pO1xuLy8gICBjb25zdCBmaW5kSW50ZW50c0J5Q29udGV4dEFnZW50UmVxdWVzdCA9IENvbnZlcnQudG9GaW5kSW50ZW50c0J5Q29udGV4dEFnZW50UmVxdWVzdChqc29uKTtcbi8vICAgY29uc3QgZmluZEludGVudHNCeUNvbnRleHRBZ2VudFJlc3BvbnNlID0gQ29udmVydC50b0ZpbmRJbnRlbnRzQnlDb250ZXh0QWdlbnRSZXNwb25zZShqc29uKTtcbi8vICAgY29uc3QgZmluZEludGVudHNCeUNvbnRleHRCcmlkZ2VFcnJvclJlc3BvbnNlID0gQ29udmVydC50b0ZpbmRJbnRlbnRzQnlDb250ZXh0QnJpZGdlRXJyb3JSZXNwb25zZShqc29uKTtcbi8vICAgY29uc3QgZmluZEludGVudHNCeUNvbnRleHRCcmlkZ2VSZXF1ZXN0ID0gQ29udmVydC50b0ZpbmRJbnRlbnRzQnlDb250ZXh0QnJpZGdlUmVxdWVzdChqc29uKTtcbi8vICAgY29uc3QgZmluZEludGVudHNCeUNvbnRleHRCcmlkZ2VSZXNwb25zZSA9IENvbnZlcnQudG9GaW5kSW50ZW50c0J5Q29udGV4dEJyaWRnZVJlc3BvbnNlKGpzb24pO1xuLy8gICBjb25zdCBnZXRBcHBNZXRhZGF0YUFnZW50RXJyb3JSZXNwb25zZSA9IENvbnZlcnQudG9HZXRBcHBNZXRhZGF0YUFnZW50RXJyb3JSZXNwb25zZShqc29uKTtcbi8vICAgY29uc3QgZ2V0QXBwTWV0YWRhdGFBZ2VudFJlcXVlc3QgPSBDb252ZXJ0LnRvR2V0QXBwTWV0YWRhdGFBZ2VudFJlcXVlc3QoanNvbik7XG4vLyAgIGNvbnN0IGdldEFwcE1ldGFkYXRhQWdlbnRSZXNwb25zZSA9IENvbnZlcnQudG9HZXRBcHBNZXRhZGF0YUFnZW50UmVzcG9uc2UoanNvbik7XG4vLyAgIGNvbnN0IGdldEFwcE1ldGFkYXRhQnJpZGdlRXJyb3JSZXNwb25zZSA9IENvbnZlcnQudG9HZXRBcHBNZXRhZGF0YUJyaWRnZUVycm9yUmVzcG9uc2UoanNvbik7XG4vLyAgIGNvbnN0IGdldEFwcE1ldGFkYXRhQnJpZGdlUmVxdWVzdCA9IENvbnZlcnQudG9HZXRBcHBNZXRhZGF0YUJyaWRnZVJlcXVlc3QoanNvbik7XG4vLyAgIGNvbnN0IGdldEFwcE1ldGFkYXRhQnJpZGdlUmVzcG9uc2UgPSBDb252ZXJ0LnRvR2V0QXBwTWV0YWRhdGFCcmlkZ2VSZXNwb25zZShqc29uKTtcbi8vICAgY29uc3Qgb3BlbkFnZW50RXJyb3JSZXNwb25zZSA9IENvbnZlcnQudG9PcGVuQWdlbnRFcnJvclJlc3BvbnNlKGpzb24pO1xuLy8gICBjb25zdCBvcGVuQWdlbnRSZXF1ZXN0ID0gQ29udmVydC50b09wZW5BZ2VudFJlcXVlc3QoanNvbik7XG4vLyAgIGNvbnN0IG9wZW5BZ2VudFJlc3BvbnNlID0gQ29udmVydC50b09wZW5BZ2VudFJlc3BvbnNlKGpzb24pO1xuLy8gICBjb25zdCBvcGVuQnJpZGdlRXJyb3JSZXNwb25zZSA9IENvbnZlcnQudG9PcGVuQnJpZGdlRXJyb3JSZXNwb25zZShqc29uKTtcbi8vICAgY29uc3Qgb3BlbkJyaWRnZVJlcXVlc3QgPSBDb252ZXJ0LnRvT3BlbkJyaWRnZVJlcXVlc3QoanNvbik7XG4vLyAgIGNvbnN0IG9wZW5CcmlkZ2VSZXNwb25zZSA9IENvbnZlcnQudG9PcGVuQnJpZGdlUmVzcG9uc2UoanNvbik7XG4vLyAgIGNvbnN0IHByaXZhdGVDaGFubmVsQnJvYWRjYXN0QWdlbnRSZXF1ZXN0ID0gQ29udmVydC50b1ByaXZhdGVDaGFubmVsQnJvYWRjYXN0QWdlbnRSZXF1ZXN0KGpzb24pO1xuLy8gICBjb25zdCBwcml2YXRlQ2hhbm5lbEJyb2FkY2FzdEJyaWRnZVJlcXVlc3QgPSBDb252ZXJ0LnRvUHJpdmF0ZUNoYW5uZWxCcm9hZGNhc3RCcmlkZ2VSZXF1ZXN0KGpzb24pO1xuLy8gICBjb25zdCBwcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJBZGRlZEFnZW50UmVxdWVzdCA9IENvbnZlcnQudG9Qcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJBZGRlZEFnZW50UmVxdWVzdChqc29uKTtcbi8vICAgY29uc3QgcHJpdmF0ZUNoYW5uZWxFdmVudExpc3RlbmVyQWRkZWRCcmlkZ2VSZXF1ZXN0ID0gQ29udmVydC50b1ByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lckFkZGVkQnJpZGdlUmVxdWVzdChqc29uKTtcbi8vICAgY29uc3QgcHJpdmF0ZUNoYW5uZWxFdmVudExpc3RlbmVyUmVtb3ZlZEFnZW50UmVxdWVzdCA9IENvbnZlcnQudG9Qcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJSZW1vdmVkQWdlbnRSZXF1ZXN0KGpzb24pO1xuLy8gICBjb25zdCBwcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJSZW1vdmVkQnJpZGdlUmVxdWVzdCA9IENvbnZlcnQudG9Qcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJSZW1vdmVkQnJpZGdlUmVxdWVzdChqc29uKTtcbi8vICAgY29uc3QgcHJpdmF0ZUNoYW5uZWxPbkFkZENvbnRleHRMaXN0ZW5lckFnZW50UmVxdWVzdCA9IENvbnZlcnQudG9Qcml2YXRlQ2hhbm5lbE9uQWRkQ29udGV4dExpc3RlbmVyQWdlbnRSZXF1ZXN0KGpzb24pO1xuLy8gICBjb25zdCBwcml2YXRlQ2hhbm5lbE9uQWRkQ29udGV4dExpc3RlbmVyQnJpZGdlUmVxdWVzdCA9IENvbnZlcnQudG9Qcml2YXRlQ2hhbm5lbE9uQWRkQ29udGV4dExpc3RlbmVyQnJpZGdlUmVxdWVzdChqc29uKTtcbi8vICAgY29uc3QgcHJpdmF0ZUNoYW5uZWxPbkRpc2Nvbm5lY3RBZ2VudFJlcXVlc3QgPSBDb252ZXJ0LnRvUHJpdmF0ZUNoYW5uZWxPbkRpc2Nvbm5lY3RBZ2VudFJlcXVlc3QoanNvbik7XG4vLyAgIGNvbnN0IHByaXZhdGVDaGFubmVsT25EaXNjb25uZWN0QnJpZGdlUmVxdWVzdCA9IENvbnZlcnQudG9Qcml2YXRlQ2hhbm5lbE9uRGlzY29ubmVjdEJyaWRnZVJlcXVlc3QoanNvbik7XG4vLyAgIGNvbnN0IHByaXZhdGVDaGFubmVsT25VbnN1YnNjcmliZUFnZW50UmVxdWVzdCA9IENvbnZlcnQudG9Qcml2YXRlQ2hhbm5lbE9uVW5zdWJzY3JpYmVBZ2VudFJlcXVlc3QoanNvbik7XG4vLyAgIGNvbnN0IHByaXZhdGVDaGFubmVsT25VbnN1YnNjcmliZUJyaWRnZVJlcXVlc3QgPSBDb252ZXJ0LnRvUHJpdmF0ZUNoYW5uZWxPblVuc3Vic2NyaWJlQnJpZGdlUmVxdWVzdChqc29uKTtcbi8vICAgY29uc3QgcmFpc2VJbnRlbnRBZ2VudEVycm9yUmVzcG9uc2UgPSBDb252ZXJ0LnRvUmFpc2VJbnRlbnRBZ2VudEVycm9yUmVzcG9uc2UoanNvbik7XG4vLyAgIGNvbnN0IHJhaXNlSW50ZW50QWdlbnRSZXF1ZXN0ID0gQ29udmVydC50b1JhaXNlSW50ZW50QWdlbnRSZXF1ZXN0KGpzb24pO1xuLy8gICBjb25zdCByYWlzZUludGVudEFnZW50UmVzcG9uc2UgPSBDb252ZXJ0LnRvUmFpc2VJbnRlbnRBZ2VudFJlc3BvbnNlKGpzb24pO1xuLy8gICBjb25zdCByYWlzZUludGVudEJyaWRnZUVycm9yUmVzcG9uc2UgPSBDb252ZXJ0LnRvUmFpc2VJbnRlbnRCcmlkZ2VFcnJvclJlc3BvbnNlKGpzb24pO1xuLy8gICBjb25zdCByYWlzZUludGVudEJyaWRnZVJlcXVlc3QgPSBDb252ZXJ0LnRvUmFpc2VJbnRlbnRCcmlkZ2VSZXF1ZXN0KGpzb24pO1xuLy8gICBjb25zdCByYWlzZUludGVudEJyaWRnZVJlc3BvbnNlID0gQ29udmVydC50b1JhaXNlSW50ZW50QnJpZGdlUmVzcG9uc2UoanNvbik7XG4vLyAgIGNvbnN0IHJhaXNlSW50ZW50UmVzdWx0QWdlbnRFcnJvclJlc3BvbnNlID0gQ29udmVydC50b1JhaXNlSW50ZW50UmVzdWx0QWdlbnRFcnJvclJlc3BvbnNlKGpzb24pO1xuLy8gICBjb25zdCByYWlzZUludGVudFJlc3VsdEFnZW50UmVzcG9uc2UgPSBDb252ZXJ0LnRvUmFpc2VJbnRlbnRSZXN1bHRBZ2VudFJlc3BvbnNlKGpzb24pO1xuLy8gICBjb25zdCByYWlzZUludGVudFJlc3VsdEJyaWRnZUVycm9yUmVzcG9uc2UgPSBDb252ZXJ0LnRvUmFpc2VJbnRlbnRSZXN1bHRCcmlkZ2VFcnJvclJlc3BvbnNlKGpzb24pO1xuLy8gICBjb25zdCByYWlzZUludGVudFJlc3VsdEJyaWRnZVJlc3BvbnNlID0gQ29udmVydC50b1JhaXNlSW50ZW50UmVzdWx0QnJpZGdlUmVzcG9uc2UoanNvbik7XG4vLyAgIGNvbnN0IGNvbnRleHQgPSBDb252ZXJ0LnRvQ29udGV4dChqc29uKTtcbi8vXG4vLyBUaGVzZSBmdW5jdGlvbnMgd2lsbCB0aHJvdyBhbiBlcnJvciBpZiB0aGUgSlNPTiBkb2Vzbid0XG4vLyBtYXRjaCB0aGUgZXhwZWN0ZWQgaW50ZXJmYWNlLCBldmVuIGlmIHRoZSBKU09OIGlzIHZhbGlkLlxuLy8gQ29udmVydHMgSlNPTiBzdHJpbmdzIHRvL2Zyb20geW91ciB0eXBlc1xuLy8gYW5kIGFzc2VydHMgdGhlIHJlc3VsdHMgb2YgSlNPTi5wYXJzZSBhdCBydW50aW1lXG52YXIgQ29udmVydCQxID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnZlcnQoKSB7XG4gICAgfVxuICAgIENvbnZlcnQudG9GREMzRGVza3RvcEFnZW50QVBJU2NoZW1hID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCBcImFueVwiKTtcbiAgICB9O1xuICAgIENvbnZlcnQuZkRDM0Rlc2t0b3BBZ2VudEFQSVNjaGVtYVRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIFwiYW55XCIpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9BZ2VudEVycm9yUmVzcG9uc2VNZXNzYWdlID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJBZ2VudEVycm9yUmVzcG9uc2VNZXNzYWdlXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQuYWdlbnRFcnJvclJlc3BvbnNlTWVzc2FnZVRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIkFnZW50RXJyb3JSZXNwb25zZU1lc3NhZ2VcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9BZ2VudFJlcXVlc3RNZXNzYWdlID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJBZ2VudFJlcXVlc3RNZXNzYWdlXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQuYWdlbnRSZXF1ZXN0TWVzc2FnZVRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIkFnZW50UmVxdWVzdE1lc3NhZ2VcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9BZ2VudFJlc3BvbnNlTWVzc2FnZSA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiQWdlbnRSZXNwb25zZU1lc3NhZ2VcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5hZ2VudFJlc3BvbnNlTWVzc2FnZVRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIkFnZW50UmVzcG9uc2VNZXNzYWdlXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvQnJpZGdlRXJyb3JSZXNwb25zZU1lc3NhZ2UgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIkJyaWRnZUVycm9yUmVzcG9uc2VNZXNzYWdlXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQuYnJpZGdlRXJyb3JSZXNwb25zZU1lc3NhZ2VUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJCcmlkZ2VFcnJvclJlc3BvbnNlTWVzc2FnZVwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0JyaWRnZVJlcXVlc3RNZXNzYWdlID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJCcmlkZ2VSZXF1ZXN0TWVzc2FnZVwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmJyaWRnZVJlcXVlc3RNZXNzYWdlVG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiQnJpZGdlUmVxdWVzdE1lc3NhZ2VcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9CcmlkZ2VSZXNwb25zZU1lc3NhZ2UgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIkJyaWRnZVJlc3BvbnNlTWVzc2FnZVwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmJyaWRnZVJlc3BvbnNlTWVzc2FnZVRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIkJyaWRnZVJlc3BvbnNlTWVzc2FnZVwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0Jyb2FkY2FzdEFnZW50UmVxdWVzdCA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiQnJvYWRjYXN0QWdlbnRSZXF1ZXN0XCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQuYnJvYWRjYXN0QWdlbnRSZXF1ZXN0VG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiQnJvYWRjYXN0QWdlbnRSZXF1ZXN0XCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvQnJvYWRjYXN0QnJpZGdlUmVxdWVzdCA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiQnJvYWRjYXN0QnJpZGdlUmVxdWVzdFwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmJyb2FkY2FzdEJyaWRnZVJlcXVlc3RUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJCcm9hZGNhc3RCcmlkZ2VSZXF1ZXN0XCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvQnJpZGdpbmdDb21tb25zID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCBtJDEoXCJhbnlcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5icmlkZ2luZ0NvbW1vbnNUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCBtJDEoXCJhbnlcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9Db25uZWN0aW9uU3RlcE1lc3NhZ2UgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIkNvbm5lY3Rpb25TdGVwTWVzc2FnZVwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmNvbm5lY3Rpb25TdGVwTWVzc2FnZVRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIkNvbm5lY3Rpb25TdGVwTWVzc2FnZVwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0Nvbm5lY3Rpb25TdGVwMkhlbGxvID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJDb25uZWN0aW9uU3RlcDJIZWxsb1wiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmNvbm5lY3Rpb25TdGVwMkhlbGxvVG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiQ29ubmVjdGlvblN0ZXAySGVsbG9cIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9Db25uZWN0aW9uU3RlcDNIYW5kc2hha2UgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIkNvbm5lY3Rpb25TdGVwM0hhbmRzaGFrZVwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmNvbm5lY3Rpb25TdGVwM0hhbmRzaGFrZVRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIkNvbm5lY3Rpb25TdGVwM0hhbmRzaGFrZVwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0Nvbm5lY3Rpb25TdGVwNEF1dGhlbnRpY2F0aW9uRmFpbGVkID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJDb25uZWN0aW9uU3RlcDRBdXRoZW50aWNhdGlvbkZhaWxlZFwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmNvbm5lY3Rpb25TdGVwNEF1dGhlbnRpY2F0aW9uRmFpbGVkVG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiQ29ubmVjdGlvblN0ZXA0QXV0aGVudGljYXRpb25GYWlsZWRcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9Db25uZWN0aW9uU3RlcDZDb25uZWN0ZWRBZ2VudHNVcGRhdGUgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIkNvbm5lY3Rpb25TdGVwNkNvbm5lY3RlZEFnZW50c1VwZGF0ZVwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmNvbm5lY3Rpb25TdGVwNkNvbm5lY3RlZEFnZW50c1VwZGF0ZVRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIkNvbm5lY3Rpb25TdGVwNkNvbm5lY3RlZEFnZW50c1VwZGF0ZVwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0ZpbmRJbnN0YW5jZXNBZ2VudEVycm9yUmVzcG9uc2UgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIkZpbmRJbnN0YW5jZXNBZ2VudEVycm9yUmVzcG9uc2VcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5maW5kSW5zdGFuY2VzQWdlbnRFcnJvclJlc3BvbnNlVG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiRmluZEluc3RhbmNlc0FnZW50RXJyb3JSZXNwb25zZVwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0ZpbmRJbnN0YW5jZXNBZ2VudFJlcXVlc3QgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIkZpbmRJbnN0YW5jZXNBZ2VudFJlcXVlc3RcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5maW5kSW5zdGFuY2VzQWdlbnRSZXF1ZXN0VG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiRmluZEluc3RhbmNlc0FnZW50UmVxdWVzdFwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0ZpbmRJbnN0YW5jZXNBZ2VudFJlc3BvbnNlID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJGaW5kSW5zdGFuY2VzQWdlbnRSZXNwb25zZVwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmZpbmRJbnN0YW5jZXNBZ2VudFJlc3BvbnNlVG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiRmluZEluc3RhbmNlc0FnZW50UmVzcG9uc2VcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9GaW5kSW5zdGFuY2VzQnJpZGdlRXJyb3JSZXNwb25zZSA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiRmluZEluc3RhbmNlc0JyaWRnZUVycm9yUmVzcG9uc2VcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5maW5kSW5zdGFuY2VzQnJpZGdlRXJyb3JSZXNwb25zZVRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIkZpbmRJbnN0YW5jZXNCcmlkZ2VFcnJvclJlc3BvbnNlXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvRmluZEluc3RhbmNlc0JyaWRnZVJlcXVlc3QgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIkZpbmRJbnN0YW5jZXNCcmlkZ2VSZXF1ZXN0XCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQuZmluZEluc3RhbmNlc0JyaWRnZVJlcXVlc3RUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJGaW5kSW5zdGFuY2VzQnJpZGdlUmVxdWVzdFwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0ZpbmRJbnN0YW5jZXNCcmlkZ2VSZXNwb25zZSA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiRmluZEluc3RhbmNlc0JyaWRnZVJlc3BvbnNlXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQuZmluZEluc3RhbmNlc0JyaWRnZVJlc3BvbnNlVG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiRmluZEluc3RhbmNlc0JyaWRnZVJlc3BvbnNlXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvRmluZEludGVudEFnZW50RXJyb3JSZXNwb25zZSA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiRmluZEludGVudEFnZW50RXJyb3JSZXNwb25zZVwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmZpbmRJbnRlbnRBZ2VudEVycm9yUmVzcG9uc2VUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJGaW5kSW50ZW50QWdlbnRFcnJvclJlc3BvbnNlXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvRmluZEludGVudEFnZW50UmVxdWVzdCA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiRmluZEludGVudEFnZW50UmVxdWVzdFwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmZpbmRJbnRlbnRBZ2VudFJlcXVlc3RUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJGaW5kSW50ZW50QWdlbnRSZXF1ZXN0XCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvRmluZEludGVudEFnZW50UmVzcG9uc2UgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIkZpbmRJbnRlbnRBZ2VudFJlc3BvbnNlXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQuZmluZEludGVudEFnZW50UmVzcG9uc2VUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJGaW5kSW50ZW50QWdlbnRSZXNwb25zZVwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0ZpbmRJbnRlbnRCcmlkZ2VFcnJvclJlc3BvbnNlID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJGaW5kSW50ZW50QnJpZGdlRXJyb3JSZXNwb25zZVwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmZpbmRJbnRlbnRCcmlkZ2VFcnJvclJlc3BvbnNlVG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiRmluZEludGVudEJyaWRnZUVycm9yUmVzcG9uc2VcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9GaW5kSW50ZW50QnJpZGdlUmVxdWVzdCA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiRmluZEludGVudEJyaWRnZVJlcXVlc3RcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5maW5kSW50ZW50QnJpZGdlUmVxdWVzdFRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIkZpbmRJbnRlbnRCcmlkZ2VSZXF1ZXN0XCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvRmluZEludGVudEJyaWRnZVJlc3BvbnNlID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJGaW5kSW50ZW50QnJpZGdlUmVzcG9uc2VcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5maW5kSW50ZW50QnJpZGdlUmVzcG9uc2VUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJGaW5kSW50ZW50QnJpZGdlUmVzcG9uc2VcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9GaW5kSW50ZW50c0J5Q29udGV4dEFnZW50RXJyb3JSZXNwb25zZSA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiRmluZEludGVudHNCeUNvbnRleHRBZ2VudEVycm9yUmVzcG9uc2VcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5maW5kSW50ZW50c0J5Q29udGV4dEFnZW50RXJyb3JSZXNwb25zZVRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIkZpbmRJbnRlbnRzQnlDb250ZXh0QWdlbnRFcnJvclJlc3BvbnNlXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvRmluZEludGVudHNCeUNvbnRleHRBZ2VudFJlcXVlc3QgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIkZpbmRJbnRlbnRzQnlDb250ZXh0QWdlbnRSZXF1ZXN0XCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQuZmluZEludGVudHNCeUNvbnRleHRBZ2VudFJlcXVlc3RUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJGaW5kSW50ZW50c0J5Q29udGV4dEFnZW50UmVxdWVzdFwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0ZpbmRJbnRlbnRzQnlDb250ZXh0QWdlbnRSZXNwb25zZSA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiRmluZEludGVudHNCeUNvbnRleHRBZ2VudFJlc3BvbnNlXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQuZmluZEludGVudHNCeUNvbnRleHRBZ2VudFJlc3BvbnNlVG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiRmluZEludGVudHNCeUNvbnRleHRBZ2VudFJlc3BvbnNlXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvRmluZEludGVudHNCeUNvbnRleHRCcmlkZ2VFcnJvclJlc3BvbnNlID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJGaW5kSW50ZW50c0J5Q29udGV4dEJyaWRnZUVycm9yUmVzcG9uc2VcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5maW5kSW50ZW50c0J5Q29udGV4dEJyaWRnZUVycm9yUmVzcG9uc2VUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJGaW5kSW50ZW50c0J5Q29udGV4dEJyaWRnZUVycm9yUmVzcG9uc2VcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9GaW5kSW50ZW50c0J5Q29udGV4dEJyaWRnZVJlcXVlc3QgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIkZpbmRJbnRlbnRzQnlDb250ZXh0QnJpZGdlUmVxdWVzdFwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmZpbmRJbnRlbnRzQnlDb250ZXh0QnJpZGdlUmVxdWVzdFRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIkZpbmRJbnRlbnRzQnlDb250ZXh0QnJpZGdlUmVxdWVzdFwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0ZpbmRJbnRlbnRzQnlDb250ZXh0QnJpZGdlUmVzcG9uc2UgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIkZpbmRJbnRlbnRzQnlDb250ZXh0QnJpZGdlUmVzcG9uc2VcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5maW5kSW50ZW50c0J5Q29udGV4dEJyaWRnZVJlc3BvbnNlVG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiRmluZEludGVudHNCeUNvbnRleHRCcmlkZ2VSZXNwb25zZVwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0dldEFwcE1ldGFkYXRhQWdlbnRFcnJvclJlc3BvbnNlID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJHZXRBcHBNZXRhZGF0YUFnZW50RXJyb3JSZXNwb25zZVwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmdldEFwcE1ldGFkYXRhQWdlbnRFcnJvclJlc3BvbnNlVG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiR2V0QXBwTWV0YWRhdGFBZ2VudEVycm9yUmVzcG9uc2VcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9HZXRBcHBNZXRhZGF0YUFnZW50UmVxdWVzdCA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiR2V0QXBwTWV0YWRhdGFBZ2VudFJlcXVlc3RcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5nZXRBcHBNZXRhZGF0YUFnZW50UmVxdWVzdFRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIkdldEFwcE1ldGFkYXRhQWdlbnRSZXF1ZXN0XCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvR2V0QXBwTWV0YWRhdGFBZ2VudFJlc3BvbnNlID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJHZXRBcHBNZXRhZGF0YUFnZW50UmVzcG9uc2VcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5nZXRBcHBNZXRhZGF0YUFnZW50UmVzcG9uc2VUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJHZXRBcHBNZXRhZGF0YUFnZW50UmVzcG9uc2VcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9HZXRBcHBNZXRhZGF0YUJyaWRnZUVycm9yUmVzcG9uc2UgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIkdldEFwcE1ldGFkYXRhQnJpZGdlRXJyb3JSZXNwb25zZVwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmdldEFwcE1ldGFkYXRhQnJpZGdlRXJyb3JSZXNwb25zZVRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIkdldEFwcE1ldGFkYXRhQnJpZGdlRXJyb3JSZXNwb25zZVwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0dldEFwcE1ldGFkYXRhQnJpZGdlUmVxdWVzdCA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiR2V0QXBwTWV0YWRhdGFCcmlkZ2VSZXF1ZXN0XCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQuZ2V0QXBwTWV0YWRhdGFCcmlkZ2VSZXF1ZXN0VG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiR2V0QXBwTWV0YWRhdGFCcmlkZ2VSZXF1ZXN0XCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvR2V0QXBwTWV0YWRhdGFCcmlkZ2VSZXNwb25zZSA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiR2V0QXBwTWV0YWRhdGFCcmlkZ2VSZXNwb25zZVwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmdldEFwcE1ldGFkYXRhQnJpZGdlUmVzcG9uc2VUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJHZXRBcHBNZXRhZGF0YUJyaWRnZVJlc3BvbnNlXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvT3BlbkFnZW50RXJyb3JSZXNwb25zZSA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiT3BlbkFnZW50RXJyb3JSZXNwb25zZVwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0Lm9wZW5BZ2VudEVycm9yUmVzcG9uc2VUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJPcGVuQWdlbnRFcnJvclJlc3BvbnNlXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvT3BlbkFnZW50UmVxdWVzdCA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiT3BlbkFnZW50UmVxdWVzdFwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0Lm9wZW5BZ2VudFJlcXVlc3RUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJPcGVuQWdlbnRSZXF1ZXN0XCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvT3BlbkFnZW50UmVzcG9uc2UgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIk9wZW5BZ2VudFJlc3BvbnNlXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQub3BlbkFnZW50UmVzcG9uc2VUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJPcGVuQWdlbnRSZXNwb25zZVwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b09wZW5CcmlkZ2VFcnJvclJlc3BvbnNlID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJPcGVuQnJpZGdlRXJyb3JSZXNwb25zZVwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0Lm9wZW5CcmlkZ2VFcnJvclJlc3BvbnNlVG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiT3BlbkJyaWRnZUVycm9yUmVzcG9uc2VcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9PcGVuQnJpZGdlUmVxdWVzdCA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiT3BlbkJyaWRnZVJlcXVlc3RcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5vcGVuQnJpZGdlUmVxdWVzdFRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIk9wZW5CcmlkZ2VSZXF1ZXN0XCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvT3BlbkJyaWRnZVJlc3BvbnNlID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJPcGVuQnJpZGdlUmVzcG9uc2VcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5vcGVuQnJpZGdlUmVzcG9uc2VUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJPcGVuQnJpZGdlUmVzcG9uc2VcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9Qcml2YXRlQ2hhbm5lbEJyb2FkY2FzdEFnZW50UmVxdWVzdCA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiUHJpdmF0ZUNoYW5uZWxCcm9hZGNhc3RBZ2VudFJlcXVlc3RcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5wcml2YXRlQ2hhbm5lbEJyb2FkY2FzdEFnZW50UmVxdWVzdFRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIlByaXZhdGVDaGFubmVsQnJvYWRjYXN0QWdlbnRSZXF1ZXN0XCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvUHJpdmF0ZUNoYW5uZWxCcm9hZGNhc3RCcmlkZ2VSZXF1ZXN0ID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJQcml2YXRlQ2hhbm5lbEJyb2FkY2FzdEJyaWRnZVJlcXVlc3RcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5wcml2YXRlQ2hhbm5lbEJyb2FkY2FzdEJyaWRnZVJlcXVlc3RUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJQcml2YXRlQ2hhbm5lbEJyb2FkY2FzdEJyaWRnZVJlcXVlc3RcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9Qcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJBZGRlZEFnZW50UmVxdWVzdCA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiUHJpdmF0ZUNoYW5uZWxFdmVudExpc3RlbmVyQWRkZWRBZ2VudFJlcXVlc3RcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5wcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJBZGRlZEFnZW50UmVxdWVzdFRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIlByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lckFkZGVkQWdlbnRSZXF1ZXN0XCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvUHJpdmF0ZUNoYW5uZWxFdmVudExpc3RlbmVyQWRkZWRCcmlkZ2VSZXF1ZXN0ID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJQcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJBZGRlZEJyaWRnZVJlcXVlc3RcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5wcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJBZGRlZEJyaWRnZVJlcXVlc3RUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJQcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJBZGRlZEJyaWRnZVJlcXVlc3RcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9Qcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJSZW1vdmVkQWdlbnRSZXF1ZXN0ID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJQcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJSZW1vdmVkQWdlbnRSZXF1ZXN0XCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQucHJpdmF0ZUNoYW5uZWxFdmVudExpc3RlbmVyUmVtb3ZlZEFnZW50UmVxdWVzdFRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIlByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lclJlbW92ZWRBZ2VudFJlcXVlc3RcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9Qcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJSZW1vdmVkQnJpZGdlUmVxdWVzdCA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiUHJpdmF0ZUNoYW5uZWxFdmVudExpc3RlbmVyUmVtb3ZlZEJyaWRnZVJlcXVlc3RcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5wcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJSZW1vdmVkQnJpZGdlUmVxdWVzdFRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIlByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lclJlbW92ZWRCcmlkZ2VSZXF1ZXN0XCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvUHJpdmF0ZUNoYW5uZWxPbkFkZENvbnRleHRMaXN0ZW5lckFnZW50UmVxdWVzdCA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiUHJpdmF0ZUNoYW5uZWxPbkFkZENvbnRleHRMaXN0ZW5lckFnZW50UmVxdWVzdFwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LnByaXZhdGVDaGFubmVsT25BZGRDb250ZXh0TGlzdGVuZXJBZ2VudFJlcXVlc3RUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJQcml2YXRlQ2hhbm5lbE9uQWRkQ29udGV4dExpc3RlbmVyQWdlbnRSZXF1ZXN0XCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvUHJpdmF0ZUNoYW5uZWxPbkFkZENvbnRleHRMaXN0ZW5lckJyaWRnZVJlcXVlc3QgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIlByaXZhdGVDaGFubmVsT25BZGRDb250ZXh0TGlzdGVuZXJCcmlkZ2VSZXF1ZXN0XCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQucHJpdmF0ZUNoYW5uZWxPbkFkZENvbnRleHRMaXN0ZW5lckJyaWRnZVJlcXVlc3RUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJQcml2YXRlQ2hhbm5lbE9uQWRkQ29udGV4dExpc3RlbmVyQnJpZGdlUmVxdWVzdFwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b1ByaXZhdGVDaGFubmVsT25EaXNjb25uZWN0QWdlbnRSZXF1ZXN0ID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJQcml2YXRlQ2hhbm5lbE9uRGlzY29ubmVjdEFnZW50UmVxdWVzdFwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LnByaXZhdGVDaGFubmVsT25EaXNjb25uZWN0QWdlbnRSZXF1ZXN0VG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiUHJpdmF0ZUNoYW5uZWxPbkRpc2Nvbm5lY3RBZ2VudFJlcXVlc3RcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9Qcml2YXRlQ2hhbm5lbE9uRGlzY29ubmVjdEJyaWRnZVJlcXVlc3QgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIlByaXZhdGVDaGFubmVsT25EaXNjb25uZWN0QnJpZGdlUmVxdWVzdFwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LnByaXZhdGVDaGFubmVsT25EaXNjb25uZWN0QnJpZGdlUmVxdWVzdFRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIlByaXZhdGVDaGFubmVsT25EaXNjb25uZWN0QnJpZGdlUmVxdWVzdFwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b1ByaXZhdGVDaGFubmVsT25VbnN1YnNjcmliZUFnZW50UmVxdWVzdCA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiUHJpdmF0ZUNoYW5uZWxPblVuc3Vic2NyaWJlQWdlbnRSZXF1ZXN0XCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQucHJpdmF0ZUNoYW5uZWxPblVuc3Vic2NyaWJlQWdlbnRSZXF1ZXN0VG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiUHJpdmF0ZUNoYW5uZWxPblVuc3Vic2NyaWJlQWdlbnRSZXF1ZXN0XCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvUHJpdmF0ZUNoYW5uZWxPblVuc3Vic2NyaWJlQnJpZGdlUmVxdWVzdCA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiUHJpdmF0ZUNoYW5uZWxPblVuc3Vic2NyaWJlQnJpZGdlUmVxdWVzdFwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LnByaXZhdGVDaGFubmVsT25VbnN1YnNjcmliZUJyaWRnZVJlcXVlc3RUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJQcml2YXRlQ2hhbm5lbE9uVW5zdWJzY3JpYmVCcmlkZ2VSZXF1ZXN0XCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvUmFpc2VJbnRlbnRBZ2VudEVycm9yUmVzcG9uc2UgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIlJhaXNlSW50ZW50QWdlbnRFcnJvclJlc3BvbnNlXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQucmFpc2VJbnRlbnRBZ2VudEVycm9yUmVzcG9uc2VUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJSYWlzZUludGVudEFnZW50RXJyb3JSZXNwb25zZVwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b1JhaXNlSW50ZW50QWdlbnRSZXF1ZXN0ID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJSYWlzZUludGVudEFnZW50UmVxdWVzdFwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LnJhaXNlSW50ZW50QWdlbnRSZXF1ZXN0VG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiUmFpc2VJbnRlbnRBZ2VudFJlcXVlc3RcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9SYWlzZUludGVudEFnZW50UmVzcG9uc2UgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIlJhaXNlSW50ZW50QWdlbnRSZXNwb25zZVwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LnJhaXNlSW50ZW50QWdlbnRSZXNwb25zZVRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIlJhaXNlSW50ZW50QWdlbnRSZXNwb25zZVwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b1JhaXNlSW50ZW50QnJpZGdlRXJyb3JSZXNwb25zZSA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiUmFpc2VJbnRlbnRCcmlkZ2VFcnJvclJlc3BvbnNlXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQucmFpc2VJbnRlbnRCcmlkZ2VFcnJvclJlc3BvbnNlVG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiUmFpc2VJbnRlbnRCcmlkZ2VFcnJvclJlc3BvbnNlXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvUmFpc2VJbnRlbnRCcmlkZ2VSZXF1ZXN0ID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJSYWlzZUludGVudEJyaWRnZVJlcXVlc3RcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5yYWlzZUludGVudEJyaWRnZVJlcXVlc3RUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJSYWlzZUludGVudEJyaWRnZVJlcXVlc3RcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9SYWlzZUludGVudEJyaWRnZVJlc3BvbnNlID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJSYWlzZUludGVudEJyaWRnZVJlc3BvbnNlXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQucmFpc2VJbnRlbnRCcmlkZ2VSZXNwb25zZVRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIlJhaXNlSW50ZW50QnJpZGdlUmVzcG9uc2VcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9SYWlzZUludGVudFJlc3VsdEFnZW50RXJyb3JSZXNwb25zZSA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0JDEoSlNPTi5wYXJzZShqc29uKSwgciQxKFwiUmFpc2VJbnRlbnRSZXN1bHRBZ2VudEVycm9yUmVzcG9uc2VcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5yYWlzZUludGVudFJlc3VsdEFnZW50RXJyb3JSZXNwb25zZVRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIlJhaXNlSW50ZW50UmVzdWx0QWdlbnRFcnJvclJlc3BvbnNlXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvUmFpc2VJbnRlbnRSZXN1bHRBZ2VudFJlc3BvbnNlID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QkMShKU09OLnBhcnNlKGpzb24pLCByJDEoXCJSYWlzZUludGVudFJlc3VsdEFnZW50UmVzcG9uc2VcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5yYWlzZUludGVudFJlc3VsdEFnZW50UmVzcG9uc2VUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCQxKHZhbHVlLCByJDEoXCJSYWlzZUludGVudFJlc3VsdEFnZW50UmVzcG9uc2VcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9SYWlzZUludGVudFJlc3VsdEJyaWRnZUVycm9yUmVzcG9uc2UgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIlJhaXNlSW50ZW50UmVzdWx0QnJpZGdlRXJyb3JSZXNwb25zZVwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LnJhaXNlSW50ZW50UmVzdWx0QnJpZGdlRXJyb3JSZXNwb25zZVRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0JDEodmFsdWUsIHIkMShcIlJhaXNlSW50ZW50UmVzdWx0QnJpZGdlRXJyb3JSZXNwb25zZVwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b1JhaXNlSW50ZW50UmVzdWx0QnJpZGdlUmVzcG9uc2UgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIlJhaXNlSW50ZW50UmVzdWx0QnJpZGdlUmVzcG9uc2VcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5yYWlzZUludGVudFJlc3VsdEJyaWRnZVJlc3BvbnNlVG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiUmFpc2VJbnRlbnRSZXN1bHRCcmlkZ2VSZXNwb25zZVwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0NvbnRleHQgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdCQxKEpTT04ucGFyc2UoanNvbiksIHIkMShcIkNvbnRleHRcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5jb250ZXh0VG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QkMSh2YWx1ZSwgciQxKFwiQ29udGV4dFwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgcmV0dXJuIENvbnZlcnQ7XG59KCkpO1xuZnVuY3Rpb24gaW52YWxpZFZhbHVlJDEodHlwLCB2YWwsIGtleSwgcGFyZW50KSB7XG4gICAgaWYgKHBhcmVudCA9PT0gdm9pZCAwKSB7IHBhcmVudCA9ICcnOyB9XG4gICAgdmFyIHByZXR0eVR5cCA9IHByZXR0eVR5cGVOYW1lJDEodHlwKTtcbiAgICB2YXIgcGFyZW50VGV4dCA9IHBhcmVudCA/IFwiIG9uIFwiLmNvbmNhdChwYXJlbnQpIDogJyc7XG4gICAgdmFyIGtleVRleHQgPSBrZXkgPyBcIiBmb3Iga2V5IFxcXCJcIi5jb25jYXQoa2V5LCBcIlxcXCJcIikgOiAnJztcbiAgICB0aHJvdyBFcnJvcihcIkludmFsaWQgdmFsdWVcIi5jb25jYXQoa2V5VGV4dCkuY29uY2F0KHBhcmVudFRleHQsIFwiLiBFeHBlY3RlZCBcIikuY29uY2F0KHByZXR0eVR5cCwgXCIgYnV0IGdvdCBcIikuY29uY2F0KEpTT04uc3RyaW5naWZ5KHZhbCkpKTtcbn1cbmZ1bmN0aW9uIHByZXR0eVR5cGVOYW1lJDEodHlwKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodHlwKSkge1xuICAgICAgICBpZiAodHlwLmxlbmd0aCA9PT0gMiAmJiB0eXBbMF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiYW4gb3B0aW9uYWwgXCIuY29uY2F0KHByZXR0eVR5cGVOYW1lJDEodHlwWzFdKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gXCJvbmUgb2YgW1wiLmNvbmNhdCh0eXAubWFwKGZ1bmN0aW9uIChhKSB7IHJldHVybiBwcmV0dHlUeXBlTmFtZSQxKGEpOyB9KS5qb2luKFwiLCBcIiksIFwiXVwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgdHlwID09PSBcIm9iamVjdFwiICYmIHR5cC5saXRlcmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHR5cC5saXRlcmFsO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0eXA7XG4gICAgfVxufVxuZnVuY3Rpb24ganNvblRvSlNQcm9wcyQxKHR5cCkge1xuICAgIGlmICh0eXAuanNvblRvSlMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgbWFwXzEgPSB7fTtcbiAgICAgICAgdHlwLnByb3BzLmZvckVhY2goZnVuY3Rpb24gKHApIHsgcmV0dXJuIG1hcF8xW3AuanNvbl0gPSB7IGtleTogcC5qcywgdHlwOiBwLnR5cCB9OyB9KTtcbiAgICAgICAgdHlwLmpzb25Ub0pTID0gbWFwXzE7XG4gICAgfVxuICAgIHJldHVybiB0eXAuanNvblRvSlM7XG59XG5mdW5jdGlvbiBqc1RvSlNPTlByb3BzJDEodHlwKSB7XG4gICAgaWYgKHR5cC5qc1RvSlNPTiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciBtYXBfMiA9IHt9O1xuICAgICAgICB0eXAucHJvcHMuZm9yRWFjaChmdW5jdGlvbiAocCkgeyByZXR1cm4gbWFwXzJbcC5qc10gPSB7IGtleTogcC5qc29uLCB0eXA6IHAudHlwIH07IH0pO1xuICAgICAgICB0eXAuanNUb0pTT04gPSBtYXBfMjtcbiAgICB9XG4gICAgcmV0dXJuIHR5cC5qc1RvSlNPTjtcbn1cbmZ1bmN0aW9uIHRyYW5zZm9ybSQxKHZhbCwgdHlwLCBnZXRQcm9wcywga2V5LCBwYXJlbnQpIHtcbiAgICBpZiAoa2V5ID09PSB2b2lkIDApIHsga2V5ID0gJyc7IH1cbiAgICBpZiAocGFyZW50ID09PSB2b2lkIDApIHsgcGFyZW50ID0gJyc7IH1cbiAgICBmdW5jdGlvbiB0cmFuc2Zvcm1QcmltaXRpdmUodHlwLCB2YWwpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0eXAgPT09IHR5cGVvZiB2YWwpXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICByZXR1cm4gaW52YWxpZFZhbHVlJDEodHlwLCB2YWwsIGtleSwgcGFyZW50KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdHJhbnNmb3JtVW5pb24odHlwcywgdmFsKSB7XG4gICAgICAgIC8vIHZhbCBtdXN0IHZhbGlkYXRlIGFnYWluc3Qgb25lIHR5cCBpbiB0eXBzXG4gICAgICAgIHZhciBsID0gdHlwcy5sZW5ndGg7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdHlwXzEgPSB0eXBzW2ldO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJhbnNmb3JtJDEodmFsLCB0eXBfMSwgZ2V0UHJvcHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKF8pIHsgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbnZhbGlkVmFsdWUkMSh0eXBzLCB2YWwsIGtleSwgcGFyZW50KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdHJhbnNmb3JtRW51bShjYXNlcywgdmFsKSB7XG4gICAgICAgIGlmIChjYXNlcy5pbmRleE9mKHZhbCkgIT09IC0xKVxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgcmV0dXJuIGludmFsaWRWYWx1ZSQxKGNhc2VzLm1hcChmdW5jdGlvbiAoYSkgeyByZXR1cm4gbCQxKGEpOyB9KSwgdmFsLCBrZXksIHBhcmVudCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRyYW5zZm9ybUFycmF5KHR5cCwgdmFsKSB7XG4gICAgICAgIC8vIHZhbCBtdXN0IGJlIGFuIGFycmF5IHdpdGggbm8gaW52YWxpZCBlbGVtZW50c1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsKSlcbiAgICAgICAgICAgIHJldHVybiBpbnZhbGlkVmFsdWUkMShsJDEoXCJhcnJheVwiKSwgdmFsLCBrZXksIHBhcmVudCk7XG4gICAgICAgIHJldHVybiB2YWwubWFwKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gdHJhbnNmb3JtJDEoZWwsIHR5cCwgZ2V0UHJvcHMpOyB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdHJhbnNmb3JtRGF0ZSh2YWwpIHtcbiAgICAgICAgaWYgKHZhbCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGQgPSBuZXcgRGF0ZSh2YWwpO1xuICAgICAgICBpZiAoaXNOYU4oZC52YWx1ZU9mKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gaW52YWxpZFZhbHVlJDEobCQxKFwiRGF0ZVwiKSwgdmFsLCBrZXksIHBhcmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRyYW5zZm9ybU9iamVjdChwcm9wcywgYWRkaXRpb25hbCwgdmFsKSB7XG4gICAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCAhPT0gXCJvYmplY3RcIiB8fCBBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnZhbGlkVmFsdWUkMShsJDEocmVmIHx8IFwib2JqZWN0XCIpLCB2YWwsIGtleSwgcGFyZW50KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHByb3BzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIHZhciBwcm9wID0gcHJvcHNba2V5XTtcbiAgICAgICAgICAgIHZhciB2ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbCwga2V5KSA/IHZhbFtrZXldIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgcmVzdWx0W3Byb3Aua2V5XSA9IHRyYW5zZm9ybSQxKHYsIHByb3AudHlwLCBnZXRQcm9wcywga2V5LCByZWYpO1xuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModmFsKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3BzLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB0cmFuc2Zvcm0kMSh2YWxba2V5XSwgYWRkaXRpb25hbCwgZ2V0UHJvcHMsIGtleSwgcmVmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGlmICh0eXAgPT09IFwiYW55XCIpXG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgaWYgKHR5cCA9PT0gbnVsbCkge1xuICAgICAgICBpZiAodmFsID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgcmV0dXJuIGludmFsaWRWYWx1ZSQxKHR5cCwgdmFsLCBrZXksIHBhcmVudCk7XG4gICAgfVxuICAgIGlmICh0eXAgPT09IGZhbHNlKVxuICAgICAgICByZXR1cm4gaW52YWxpZFZhbHVlJDEodHlwLCB2YWwsIGtleSwgcGFyZW50KTtcbiAgICB2YXIgcmVmID0gdW5kZWZpbmVkO1xuICAgIHdoaWxlICh0eXBlb2YgdHlwID09PSBcIm9iamVjdFwiICYmIHR5cC5yZWYgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZWYgPSB0eXAucmVmO1xuICAgICAgICB0eXAgPSB0eXBlTWFwJDFbdHlwLnJlZl07XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KHR5cCkpXG4gICAgICAgIHJldHVybiB0cmFuc2Zvcm1FbnVtKHR5cCwgdmFsKTtcbiAgICBpZiAodHlwZW9mIHR5cCA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICByZXR1cm4gdHlwLmhhc093blByb3BlcnR5KFwidW5pb25NZW1iZXJzXCIpID8gdHJhbnNmb3JtVW5pb24odHlwLnVuaW9uTWVtYmVycywgdmFsKVxuICAgICAgICAgICAgOiB0eXAuaGFzT3duUHJvcGVydHkoXCJhcnJheUl0ZW1zXCIpID8gdHJhbnNmb3JtQXJyYXkodHlwLmFycmF5SXRlbXMsIHZhbClcbiAgICAgICAgICAgICAgICA6IHR5cC5oYXNPd25Qcm9wZXJ0eShcInByb3BzXCIpID8gdHJhbnNmb3JtT2JqZWN0KGdldFByb3BzKHR5cCksIHR5cC5hZGRpdGlvbmFsLCB2YWwpXG4gICAgICAgICAgICAgICAgICAgIDogaW52YWxpZFZhbHVlJDEodHlwLCB2YWwsIGtleSwgcGFyZW50KTtcbiAgICB9XG4gICAgLy8gTnVtYmVycyBjYW4gYmUgcGFyc2VkIGJ5IERhdGUgYnV0IHNob3VsZG4ndCBiZS5cbiAgICBpZiAodHlwID09PSBEYXRlICYmIHR5cGVvZiB2YWwgIT09IFwibnVtYmVyXCIpXG4gICAgICAgIHJldHVybiB0cmFuc2Zvcm1EYXRlKHZhbCk7XG4gICAgcmV0dXJuIHRyYW5zZm9ybVByaW1pdGl2ZSh0eXAsIHZhbCk7XG59XG5mdW5jdGlvbiBjYXN0JDEodmFsLCB0eXApIHtcbiAgICByZXR1cm4gdHJhbnNmb3JtJDEodmFsLCB0eXAsIGpzb25Ub0pTUHJvcHMkMSk7XG59XG5mdW5jdGlvbiB1bmNhc3QkMSh2YWwsIHR5cCkge1xuICAgIHJldHVybiB0cmFuc2Zvcm0kMSh2YWwsIHR5cCwganNUb0pTT05Qcm9wcyQxKTtcbn1cbmZ1bmN0aW9uIGwkMSh0eXApIHtcbiAgICByZXR1cm4geyBsaXRlcmFsOiB0eXAgfTtcbn1cbmZ1bmN0aW9uIGEkMSh0eXApIHtcbiAgICByZXR1cm4geyBhcnJheUl0ZW1zOiB0eXAgfTtcbn1cbmZ1bmN0aW9uIHUkMSgpIHtcbiAgICB2YXIgdHlwcyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHR5cHNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgcmV0dXJuIHsgdW5pb25NZW1iZXJzOiB0eXBzIH07XG59XG5mdW5jdGlvbiBvJDEocHJvcHMsIGFkZGl0aW9uYWwpIHtcbiAgICByZXR1cm4geyBwcm9wczogcHJvcHMsIGFkZGl0aW9uYWw6IGFkZGl0aW9uYWwgfTtcbn1cbmZ1bmN0aW9uIG0kMShhZGRpdGlvbmFsKSB7XG4gICAgcmV0dXJuIHsgcHJvcHM6IFtdLCBhZGRpdGlvbmFsOiBhZGRpdGlvbmFsIH07XG59XG5mdW5jdGlvbiByJDEobmFtZSkge1xuICAgIHJldHVybiB7IHJlZjogbmFtZSB9O1xufVxudmFyIHR5cGVNYXAkMSA9IHtcbiAgICBcIkFnZW50RXJyb3JSZXNwb25zZU1lc3NhZ2VcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIkFnZW50UmVzcG9uc2VNZXRhZGF0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiRXJyb3JSZXNwb25zZU1lc3NhZ2VQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJSZXNwb25zZU1lc3NhZ2VUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiQWdlbnRSZXNwb25zZU1ldGFkYXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInJlc3BvbnNlVXVpZFwiLCBqczogXCJyZXNwb25zZVV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkVycm9yUmVzcG9uc2VNZXNzYWdlUGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZXJyb3JcIiwganM6IFwiZXJyb3JcIiwgdHlwOiByJDEoXCJSZXNwb25zZUVycm9yRGV0YWlsXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJBZ2VudFJlcXVlc3RNZXNzYWdlXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJBZ2VudFJlcXVlc3RNZXRhZGF0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogbSQxKFwiYW55XCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJSZXF1ZXN0TWVzc2FnZVR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJBZ2VudFJlcXVlc3RNZXRhZGF0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZGVzdGluYXRpb25cIiwganM6IFwiZGVzdGluYXRpb25cIiwgdHlwOiB1JDEodW5kZWZpbmVkLCByJDEoXCJCcmlkZ2VQYXJ0aWNpcGFudElkZW50aWZpZXJcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInNvdXJjZVwiLCBqczogXCJzb3VyY2VcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCByJDEoXCJTb3VyY2VJZGVudGlmaWVyXCIpKSB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJCcmlkZ2VQYXJ0aWNpcGFudElkZW50aWZpZXJcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImRlc2t0b3BBZ2VudFwiLCBqczogXCJkZXNrdG9wQWdlbnRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJhcHBJZFwiLCBqczogXCJhcHBJZFwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJpbnN0YW5jZUlkXCIsIGpzOiBcImluc3RhbmNlSWRcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiU291cmNlSWRlbnRpZmllclwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiYXBwSWRcIiwganM6IFwiYXBwSWRcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiZGVza3RvcEFnZW50XCIsIGpzOiBcImRlc2t0b3BBZ2VudFwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJpbnN0YW5jZUlkXCIsIGpzOiBcImluc3RhbmNlSWRcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiQWdlbnRSZXNwb25zZU1lc3NhZ2VcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIkFnZW50UmVzcG9uc2VNZXRhZGF0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogbSQxKFwiYW55XCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJSZXNwb25zZU1lc3NhZ2VUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiQnJpZGdlRXJyb3JSZXNwb25zZU1lc3NhZ2VcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIkJyaWRnZUVycm9yUmVzcG9uc2VNZXNzYWdlTWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiUmVzcG9uc2VFcnJvck1lc3NhZ2VQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiBcIlwiIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiQnJpZGdlRXJyb3JSZXNwb25zZU1lc3NhZ2VNZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJlcnJvckRldGFpbHNcIiwganM6IFwiZXJyb3JEZXRhaWxzXCIsIHR5cDogYSQxKHIkMShcIlJlc3BvbnNlRXJyb3JEZXRhaWxcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJlcnJvclNvdXJjZXNcIiwganM6IFwiZXJyb3JTb3VyY2VzXCIsIHR5cDogYSQxKHIkMShcIkRlc2t0b3BBZ2VudElkZW50aWZpZXJcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInJlc3BvbnNlVXVpZFwiLCBqczogXCJyZXNwb25zZVV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkRlc2t0b3BBZ2VudElkZW50aWZpZXJcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImRlc2t0b3BBZ2VudFwiLCBqczogXCJkZXNrdG9wQWdlbnRcIiwgdHlwOiBcIlwiIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJSZXNwb25zZUVycm9yTWVzc2FnZVBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImVycm9yXCIsIGpzOiBcImVycm9yXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgciQxKFwiUmVzcG9uc2VFcnJvckRldGFpbFwiKSkgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIkJyaWRnZVJlcXVlc3RNZXNzYWdlXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJCcmlkZ2VSZXF1ZXN0TWV0YWRhdGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IG0kMShcImFueVwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogXCJcIiB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkJyaWRnZVJlcXVlc3RNZXRhZGF0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZGVzdGluYXRpb25cIiwganM6IFwiZGVzdGluYXRpb25cIiwgdHlwOiB1JDEodW5kZWZpbmVkLCByJDEoXCJCcmlkZ2VQYXJ0aWNpcGFudElkZW50aWZpZXJcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInNvdXJjZVwiLCBqczogXCJzb3VyY2VcIiwgdHlwOiByJDEoXCJCcmlkZ2VQYXJ0aWNpcGFudElkZW50aWZpZXJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiQnJpZGdlUmVzcG9uc2VNZXNzYWdlXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJCcmlkZ2VSZXNwb25zZU1lc3NhZ2VNZXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiBtJDEoXCJhbnlcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IFwiXCIgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJCcmlkZ2VSZXNwb25zZU1lc3NhZ2VNZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJlcnJvckRldGFpbHNcIiwganM6IFwiZXJyb3JEZXRhaWxzXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgYSQxKHIkMShcIlJlc3BvbnNlRXJyb3JEZXRhaWxcIikpKSB9LFxuICAgICAgICB7IGpzb246IFwiZXJyb3JTb3VyY2VzXCIsIGpzOiBcImVycm9yU291cmNlc1wiLCB0eXA6IHUkMSh1bmRlZmluZWQsIGEkMShyJDEoXCJEZXNrdG9wQWdlbnRJZGVudGlmaWVyXCIpKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwicmVzcG9uc2VVdWlkXCIsIGpzOiBcInJlc3BvbnNlVXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInNvdXJjZXNcIiwganM6IFwic291cmNlc1wiLCB0eXA6IHUkMSh1bmRlZmluZWQsIGEkMShyJDEoXCJEZXNrdG9wQWdlbnRJZGVudGlmaWVyXCIpKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiQnJvYWRjYXN0QWdlbnRSZXF1ZXN0XCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJCcm9hZGNhc3RBZ2VudFJlcXVlc3RNZXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiByJDEoXCJCcm9hZGNhc3RBZ2VudFJlcXVlc3RQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJCcm9hZGNhc3RBZ2VudFJlcXVlc3RUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiQnJvYWRjYXN0QWdlbnRSZXF1ZXN0TWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJzb3VyY2VcIiwganM6IFwic291cmNlXCIsIHR5cDogciQxKFwiU291cmNlT2JqZWN0XCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlNvdXJjZU9iamVjdFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiYXBwSWRcIiwganM6IFwiYXBwSWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJkZXNrdG9wQWdlbnRcIiwganM6IFwiZGVza3RvcEFnZW50XCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcImluc3RhbmNlSWRcIiwganM6IFwiaW5zdGFuY2VJZFwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJCcm9hZGNhc3RBZ2VudFJlcXVlc3RQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJjaGFubmVsSWRcIiwganM6IFwiY2hhbm5lbElkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwiY29udGV4dFwiLCBqczogXCJjb250ZXh0XCIsIHR5cDogciQxKFwiQ29udGV4dEVsZW1lbnRcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJDb250ZXh0RWxlbWVudFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiaWRcIiwganM6IFwiaWRcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBtJDEoXCJhbnlcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogXCJcIiB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiQnJvYWRjYXN0QnJpZGdlUmVxdWVzdFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiQnJvYWRjYXN0QnJpZGdlUmVxdWVzdE1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIkJyb2FkY2FzdEJyaWRnZVJlcXVlc3RQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJCcm9hZGNhc3RBZ2VudFJlcXVlc3RUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiQnJvYWRjYXN0QnJpZGdlUmVxdWVzdE1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwic291cmNlXCIsIGpzOiBcInNvdXJjZVwiLCB0eXA6IHIkMShcIk1ldGFTb3VyY2VcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiTWV0YVNvdXJjZVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiYXBwSWRcIiwganM6IFwiYXBwSWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJkZXNrdG9wQWdlbnRcIiwganM6IFwiZGVza3RvcEFnZW50XCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwiaW5zdGFuY2VJZFwiLCBqczogXCJpbnN0YW5jZUlkXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIkJyb2FkY2FzdEJyaWRnZVJlcXVlc3RQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJjaGFubmVsSWRcIiwganM6IFwiY2hhbm5lbElkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwiY29udGV4dFwiLCBqczogXCJjb250ZXh0XCIsIHR5cDogciQxKFwiQ29udGV4dEVsZW1lbnRcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJDb25uZWN0aW9uU3RlcE1lc3NhZ2VcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIkNvbm5lY3Rpb25TdGVwTWV0YWRhdGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IG0kMShcImFueVwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiQ29ubmVjdGlvblN0ZXBNZXNzYWdlVHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkNvbm5lY3Rpb25TdGVwTWV0YWRhdGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInJlc3BvbnNlVXVpZFwiLCBqczogXCJyZXNwb25zZVV1aWRcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJDb25uZWN0aW9uU3RlcDJIZWxsb1wiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiQ29ubmVjdGlvblN0ZXAySGVsbG9NZXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiByJDEoXCJDb25uZWN0aW9uU3RlcDJIZWxsb1BheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIkNvbm5lY3Rpb25TdGVwMkhlbGxvVHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkNvbm5lY3Rpb25TdGVwMkhlbGxvTWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJDb25uZWN0aW9uU3RlcDJIZWxsb1BheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImF1dGhSZXF1aXJlZFwiLCBqczogXCJhdXRoUmVxdWlyZWRcIiwgdHlwOiB0cnVlIH0sXG4gICAgICAgIHsganNvbjogXCJhdXRoVG9rZW5cIiwganM6IFwiYXV0aFRva2VuXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcImRlc2t0b3BBZ2VudEJyaWRnZVZlcnNpb25cIiwganM6IFwiZGVza3RvcEFnZW50QnJpZGdlVmVyc2lvblwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInN1cHBvcnRlZEZEQzNWZXJzaW9uc1wiLCBqczogXCJzdXBwb3J0ZWRGREMzVmVyc2lvbnNcIiwgdHlwOiBhJDEoXCJcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJDb25uZWN0aW9uU3RlcDNIYW5kc2hha2VcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIkNvbm5lY3Rpb25TdGVwM0hhbmRzaGFrZU1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIkNvbm5lY3Rpb25TdGVwM0hhbmRzaGFrZVBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIkNvbm5lY3Rpb25TdGVwM0hhbmRzaGFrZVR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJDb25uZWN0aW9uU3RlcDNIYW5kc2hha2VNZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiQ29ubmVjdGlvblN0ZXAzSGFuZHNoYWtlUGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiYXV0aFRva2VuXCIsIGpzOiBcImF1dGhUb2tlblwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJjaGFubmVsc1N0YXRlXCIsIGpzOiBcImNoYW5uZWxzU3RhdGVcIiwgdHlwOiBtJDEoYSQxKHIkMShcIkNvbnRleHRFbGVtZW50XCIpKSkgfSxcbiAgICAgICAgeyBqc29uOiBcImltcGxlbWVudGF0aW9uTWV0YWRhdGFcIiwganM6IFwiaW1wbGVtZW50YXRpb25NZXRhZGF0YVwiLCB0eXA6IHIkMShcIkNvbm5lY3RpbmdBZ2VudEltcGxlbWVudGF0aW9uTWV0YWRhdGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RlZE5hbWVcIiwganM6IFwicmVxdWVzdGVkTmFtZVwiLCB0eXA6IFwiXCIgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJDb25uZWN0aW5nQWdlbnRJbXBsZW1lbnRhdGlvbk1ldGFkYXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJmZGMzVmVyc2lvblwiLCBqczogXCJmZGMzVmVyc2lvblwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcIm9wdGlvbmFsRmVhdHVyZXNcIiwganM6IFwib3B0aW9uYWxGZWF0dXJlc1wiLCB0eXA6IHIkMShcIk9wdGlvbmFsRmVhdHVyZXNcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInByb3ZpZGVyXCIsIGpzOiBcInByb3ZpZGVyXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwicHJvdmlkZXJWZXJzaW9uXCIsIGpzOiBcInByb3ZpZGVyVmVyc2lvblwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiT3B0aW9uYWxGZWF0dXJlc1wiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiRGVza3RvcEFnZW50QnJpZGdpbmdcIiwganM6IFwiRGVza3RvcEFnZW50QnJpZGdpbmdcIiwgdHlwOiB0cnVlIH0sXG4gICAgICAgIHsganNvbjogXCJPcmlnaW5hdGluZ0FwcE1ldGFkYXRhXCIsIGpzOiBcIk9yaWdpbmF0aW5nQXBwTWV0YWRhdGFcIiwgdHlwOiB0cnVlIH0sXG4gICAgICAgIHsganNvbjogXCJVc2VyQ2hhbm5lbE1lbWJlcnNoaXBBUElzXCIsIGpzOiBcIlVzZXJDaGFubmVsTWVtYmVyc2hpcEFQSXNcIiwgdHlwOiB0cnVlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiQ29ubmVjdGlvblN0ZXA0QXV0aGVudGljYXRpb25GYWlsZWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIkNvbm5lY3Rpb25TdGVwNEF1dGhlbnRpY2F0aW9uRmFpbGVkTWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiQ29ubmVjdGlvblN0ZXA0QXV0aGVudGljYXRpb25GYWlsZWRQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJDb25uZWN0aW9uU3RlcDRBdXRoZW50aWNhdGlvbkZhaWxlZFR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJDb25uZWN0aW9uU3RlcDRBdXRoZW50aWNhdGlvbkZhaWxlZE1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwicmVzcG9uc2VVdWlkXCIsIGpzOiBcInJlc3BvbnNlVXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiQ29ubmVjdGlvblN0ZXA0QXV0aGVudGljYXRpb25GYWlsZWRQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXNzYWdlXCIsIGpzOiBcIm1lc3NhZ2VcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkNvbm5lY3Rpb25TdGVwNkNvbm5lY3RlZEFnZW50c1VwZGF0ZVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiQ29ubmVjdGlvblN0ZXA2Q29ubmVjdGVkQWdlbnRzVXBkYXRlTWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiQ29ubmVjdGlvblN0ZXA2Q29ubmVjdGVkQWdlbnRzVXBkYXRlUGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiQ29ubmVjdGlvblN0ZXA2Q29ubmVjdGVkQWdlbnRzVXBkYXRlVHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkNvbm5lY3Rpb25TdGVwNkNvbm5lY3RlZEFnZW50c1VwZGF0ZU1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwicmVzcG9uc2VVdWlkXCIsIGpzOiBcInJlc3BvbnNlVXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiQ29ubmVjdGlvblN0ZXA2Q29ubmVjdGVkQWdlbnRzVXBkYXRlUGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiYWRkQWdlbnRcIiwganM6IFwiYWRkQWdlbnRcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiYWxsQWdlbnRzXCIsIGpzOiBcImFsbEFnZW50c1wiLCB0eXA6IGEkMShyJDEoXCJEZXNrdG9wQWdlbnRJbXBsZW1lbnRhdGlvbk1ldGFkYXRhXCIpKSB9LFxuICAgICAgICB7IGpzb246IFwiY2hhbm5lbHNTdGF0ZVwiLCBqczogXCJjaGFubmVsc1N0YXRlXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgbSQxKGEkMShyJDEoXCJDb250ZXh0RWxlbWVudFwiKSkpKSB9LFxuICAgICAgICB7IGpzb246IFwicmVtb3ZlQWdlbnRcIiwganM6IFwicmVtb3ZlQWdlbnRcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkRlc2t0b3BBZ2VudEltcGxlbWVudGF0aW9uTWV0YWRhdGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImRlc2t0b3BBZ2VudFwiLCBqczogXCJkZXNrdG9wQWdlbnRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJmZGMzVmVyc2lvblwiLCBqczogXCJmZGMzVmVyc2lvblwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcIm9wdGlvbmFsRmVhdHVyZXNcIiwganM6IFwib3B0aW9uYWxGZWF0dXJlc1wiLCB0eXA6IHIkMShcIk9wdGlvbmFsRmVhdHVyZXNcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInByb3ZpZGVyXCIsIGpzOiBcInByb3ZpZGVyXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwicHJvdmlkZXJWZXJzaW9uXCIsIGpzOiBcInByb3ZpZGVyVmVyc2lvblwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRmluZEluc3RhbmNlc0FnZW50RXJyb3JSZXNwb25zZVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiRmluZEluc3RhbmNlc0FnZW50RXJyb3JSZXNwb25zZU1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIkZpbmRJbnN0YW5jZXNBZ2VudEVycm9yUmVzcG9uc2VQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJGaW5kSW5zdGFuY2VzQWdlbnRFcnJvclJlc3BvbnNlVHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnN0YW5jZXNBZ2VudEVycm9yUmVzcG9uc2VNZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInJlc3BvbnNlVXVpZFwiLCBqczogXCJyZXNwb25zZVV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnN0YW5jZXNBZ2VudEVycm9yUmVzcG9uc2VQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJlcnJvclwiLCBqczogXCJlcnJvclwiLCB0eXA6IHIkMShcIkVycm9yTWVzc2FnZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnN0YW5jZXNBZ2VudFJlcXVlc3RcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIkZpbmRJbnN0YW5jZXNBZ2VudFJlcXVlc3RNZXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiByJDEoXCJGaW5kSW5zdGFuY2VzQWdlbnRSZXF1ZXN0UGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiRmluZEluc3RhbmNlc0FnZW50UmVxdWVzdFR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJGaW5kSW5zdGFuY2VzQWdlbnRSZXF1ZXN0TWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZGVzdGluYXRpb25cIiwganM6IFwiZGVzdGluYXRpb25cIiwgdHlwOiB1JDEodW5kZWZpbmVkLCByJDEoXCJEZXN0aW5hdGlvbk9iamVjdFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwic291cmNlXCIsIGpzOiBcInNvdXJjZVwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIHIkMShcIlNvdXJjZUlkZW50aWZpZXJcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkRlc3RpbmF0aW9uT2JqZWN0XCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJkZXNrdG9wQWdlbnRcIiwganM6IFwiZGVza3RvcEFnZW50XCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwiYXBwSWRcIiwganM6IFwiYXBwSWRcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiaW5zdGFuY2VJZFwiLCBqczogXCJpbnN0YW5jZUlkXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIkZpbmRJbnN0YW5jZXNBZ2VudFJlcXVlc3RQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJhcHBcIiwganM6IFwiYXBwXCIsIHR5cDogciQxKFwiQXBwSWRlbnRpZmllclwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkFwcElkZW50aWZpZXJcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImFwcElkXCIsIGpzOiBcImFwcElkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwiZGVza3RvcEFnZW50XCIsIGpzOiBcImRlc2t0b3BBZ2VudFwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJpbnN0YW5jZUlkXCIsIGpzOiBcImluc3RhbmNlSWRcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiRmluZEluc3RhbmNlc0FnZW50UmVzcG9uc2VcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIkZpbmRJbnN0YW5jZXNBZ2VudFJlc3BvbnNlTWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiRmluZEluc3RhbmNlc0FnZW50UmVzcG9uc2VQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJGaW5kSW5zdGFuY2VzQWdlbnRFcnJvclJlc3BvbnNlVHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnN0YW5jZXNBZ2VudFJlc3BvbnNlTWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJyZXNwb25zZVV1aWRcIiwganM6IFwicmVzcG9uc2VVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJGaW5kSW5zdGFuY2VzQWdlbnRSZXNwb25zZVBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImFwcElkZW50aWZpZXJzXCIsIGpzOiBcImFwcElkZW50aWZpZXJzXCIsIHR5cDogYSQxKHIkMShcIkFwcE1ldGFkYXRhXCIpKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkFwcE1ldGFkYXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJhcHBJZFwiLCBqczogXCJhcHBJZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcImRlc2NyaXB0aW9uXCIsIGpzOiBcImRlc2NyaXB0aW9uXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcImRlc2t0b3BBZ2VudFwiLCBqczogXCJkZXNrdG9wQWdlbnRcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiaWNvbnNcIiwganM6IFwiaWNvbnNcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBhJDEociQxKFwiSWNvblwiKSkpIH0sXG4gICAgICAgIHsganNvbjogXCJpbnN0YW5jZUlkXCIsIGpzOiBcImluc3RhbmNlSWRcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiaW5zdGFuY2VNZXRhZGF0YVwiLCBqczogXCJpbnN0YW5jZU1ldGFkYXRhXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgbSQxKFwiYW55XCIpKSB9LFxuICAgICAgICB7IGpzb246IFwibmFtZVwiLCBqczogXCJuYW1lXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInJlc3VsdFR5cGVcIiwganM6IFwicmVzdWx0VHlwZVwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIHUkMShudWxsLCBcIlwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInNjcmVlbnNob3RzXCIsIGpzOiBcInNjcmVlbnNob3RzXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgYSQxKHIkMShcIkltYWdlXCIpKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInRpdGxlXCIsIGpzOiBcInRpdGxlXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInRvb2x0aXBcIiwganM6IFwidG9vbHRpcFwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ2ZXJzaW9uXCIsIGpzOiBcInZlcnNpb25cIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkljb25cIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcInNpemVcIiwganM6IFwic2l6ZVwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJzcmNcIiwganM6IFwic3JjXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJJbWFnZVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibGFiZWxcIiwganM6IFwibGFiZWxcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwic2l6ZVwiLCBqczogXCJzaXplXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInNyY1wiLCBqczogXCJzcmNcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnN0YW5jZXNCcmlkZ2VFcnJvclJlc3BvbnNlXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJGaW5kSW5zdGFuY2VzQnJpZGdlRXJyb3JSZXNwb25zZU1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIkZpbmRJbnN0YW5jZXNCcmlkZ2VFcnJvclJlc3BvbnNlUGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiRmluZEluc3RhbmNlc0FnZW50RXJyb3JSZXNwb25zZVR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJGaW5kSW5zdGFuY2VzQnJpZGdlRXJyb3JSZXNwb25zZU1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImVycm9yRGV0YWlsc1wiLCBqczogXCJlcnJvckRldGFpbHNcIiwgdHlwOiBhJDEociQxKFwiUmVzcG9uc2VFcnJvckRldGFpbFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcImVycm9yU291cmNlc1wiLCBqczogXCJlcnJvclNvdXJjZXNcIiwgdHlwOiBhJDEociQxKFwiRGVza3RvcEFnZW50SWRlbnRpZmllclwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwicmVzcG9uc2VVdWlkXCIsIGpzOiBcInJlc3BvbnNlVXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRmluZEluc3RhbmNlc0JyaWRnZUVycm9yUmVzcG9uc2VQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJlcnJvclwiLCBqczogXCJlcnJvclwiLCB0eXA6IHIkMShcIkVycm9yTWVzc2FnZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnN0YW5jZXNCcmlkZ2VSZXF1ZXN0XCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJGaW5kSW5zdGFuY2VzQnJpZGdlUmVxdWVzdE1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIkZpbmRJbnN0YW5jZXNCcmlkZ2VSZXF1ZXN0UGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiRmluZEluc3RhbmNlc0FnZW50UmVxdWVzdFR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJGaW5kSW5zdGFuY2VzQnJpZGdlUmVxdWVzdE1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImRlc3RpbmF0aW9uXCIsIGpzOiBcImRlc3RpbmF0aW9uXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgciQxKFwiRGVzdGluYXRpb25PYmplY3RcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInNvdXJjZVwiLCBqczogXCJzb3VyY2VcIiwgdHlwOiByJDEoXCJNZXRhU291cmNlT2JqZWN0XCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIk1ldGFTb3VyY2VPYmplY3RcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImFwcElkXCIsIGpzOiBcImFwcElkXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcImRlc2t0b3BBZ2VudFwiLCBqczogXCJkZXNrdG9wQWdlbnRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJpbnN0YW5jZUlkXCIsIGpzOiBcImluc3RhbmNlSWRcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiRmluZEluc3RhbmNlc0JyaWRnZVJlcXVlc3RQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJhcHBcIiwganM6IFwiYXBwXCIsIHR5cDogciQxKFwiQXBwSWRlbnRpZmllclwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnN0YW5jZXNCcmlkZ2VSZXNwb25zZVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiRmluZEluc3RhbmNlc0JyaWRnZVJlc3BvbnNlTWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiRmluZEluc3RhbmNlc0JyaWRnZVJlc3BvbnNlUGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiRmluZEluc3RhbmNlc0FnZW50RXJyb3JSZXNwb25zZVR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJGaW5kSW5zdGFuY2VzQnJpZGdlUmVzcG9uc2VNZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJlcnJvckRldGFpbHNcIiwganM6IFwiZXJyb3JEZXRhaWxzXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgYSQxKHIkMShcIlJlc3BvbnNlRXJyb3JEZXRhaWxcIikpKSB9LFxuICAgICAgICB7IGpzb246IFwiZXJyb3JTb3VyY2VzXCIsIGpzOiBcImVycm9yU291cmNlc1wiLCB0eXA6IHUkMSh1bmRlZmluZWQsIGEkMShyJDEoXCJEZXNrdG9wQWdlbnRJZGVudGlmaWVyXCIpKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwicmVzcG9uc2VVdWlkXCIsIGpzOiBcInJlc3BvbnNlVXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInNvdXJjZXNcIiwganM6IFwic291cmNlc1wiLCB0eXA6IHUkMSh1bmRlZmluZWQsIGEkMShyJDEoXCJEZXNrdG9wQWdlbnRJZGVudGlmaWVyXCIpKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRmluZEluc3RhbmNlc0JyaWRnZVJlc3BvbnNlUGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiYXBwSWRlbnRpZmllcnNcIiwganM6IFwiYXBwSWRlbnRpZmllcnNcIiwgdHlwOiBhJDEociQxKFwiQXBwTWV0YWRhdGFcIikpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRmluZEludGVudEFnZW50RXJyb3JSZXNwb25zZVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiRmluZEludGVudEFnZW50RXJyb3JSZXNwb25zZU1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIkZpbmRJbnRlbnRBZ2VudEVycm9yUmVzcG9uc2VQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJGaW5kSW50ZW50QWdlbnRFcnJvclJlc3BvbnNlVHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnRlbnRBZ2VudEVycm9yUmVzcG9uc2VNZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInJlc3BvbnNlVXVpZFwiLCBqczogXCJyZXNwb25zZVV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnRlbnRBZ2VudEVycm9yUmVzcG9uc2VQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJlcnJvclwiLCBqczogXCJlcnJvclwiLCB0eXA6IHIkMShcIkVycm9yTWVzc2FnZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnRlbnRBZ2VudFJlcXVlc3RcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIkZpbmRJbnRlbnRBZ2VudFJlcXVlc3RNZXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiByJDEoXCJGaW5kSW50ZW50QWdlbnRSZXF1ZXN0UGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiRmluZEludGVudEFnZW50UmVxdWVzdFR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJGaW5kSW50ZW50QWdlbnRSZXF1ZXN0TWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJzb3VyY2VcIiwganM6IFwic291cmNlXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgciQxKFwiU291cmNlSWRlbnRpZmllclwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgICAgIHsganNvbjogXCJkZXN0aW5hdGlvblwiLCBqczogXCJkZXN0aW5hdGlvblwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIHIkMShcIkJyaWRnZVBhcnRpY2lwYW50SWRlbnRpZmllclwiKSkgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJGaW5kSW50ZW50QWdlbnRSZXF1ZXN0UGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiY29udGV4dFwiLCBqczogXCJjb250ZXh0XCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgciQxKFwiQ29udGV4dEVsZW1lbnRcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJpbnRlbnRcIiwganM6IFwiaW50ZW50XCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwicmVzdWx0VHlwZVwiLCBqczogXCJyZXN1bHRUeXBlXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJGaW5kSW50ZW50QWdlbnRSZXNwb25zZVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiRmluZEludGVudEFnZW50UmVzcG9uc2VNZXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiByJDEoXCJGaW5kSW50ZW50QWdlbnRSZXNwb25zZVBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIkZpbmRJbnRlbnRBZ2VudEVycm9yUmVzcG9uc2VUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRmluZEludGVudEFnZW50UmVzcG9uc2VNZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInJlc3BvbnNlVXVpZFwiLCBqczogXCJyZXNwb25zZVV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnRlbnRBZ2VudFJlc3BvbnNlUGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiYXBwSW50ZW50XCIsIGpzOiBcImFwcEludGVudFwiLCB0eXA6IHIkMShcIkFwcEludGVudFwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkFwcEludGVudFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiYXBwc1wiLCBqczogXCJhcHBzXCIsIHR5cDogYSQxKHIkMShcIkFwcE1ldGFkYXRhXCIpKSB9LFxuICAgICAgICB7IGpzb246IFwiaW50ZW50XCIsIGpzOiBcImludGVudFwiLCB0eXA6IHIkMShcIkludGVudE1ldGFkYXRhXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiSW50ZW50TWV0YWRhdGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImRpc3BsYXlOYW1lXCIsIGpzOiBcImRpc3BsYXlOYW1lXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwibmFtZVwiLCBqczogXCJuYW1lXCIsIHR5cDogXCJcIiB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnRlbnRCcmlkZ2VFcnJvclJlc3BvbnNlXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJGaW5kSW50ZW50QnJpZGdlRXJyb3JSZXNwb25zZU1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIkZpbmRJbnRlbnRCcmlkZ2VFcnJvclJlc3BvbnNlUGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiRmluZEludGVudEFnZW50RXJyb3JSZXNwb25zZVR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJGaW5kSW50ZW50QnJpZGdlRXJyb3JSZXNwb25zZU1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImVycm9yRGV0YWlsc1wiLCBqczogXCJlcnJvckRldGFpbHNcIiwgdHlwOiBhJDEociQxKFwiUmVzcG9uc2VFcnJvckRldGFpbFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcImVycm9yU291cmNlc1wiLCBqczogXCJlcnJvclNvdXJjZXNcIiwgdHlwOiBhJDEociQxKFwiRGVza3RvcEFnZW50SWRlbnRpZmllclwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwicmVzcG9uc2VVdWlkXCIsIGpzOiBcInJlc3BvbnNlVXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRmluZEludGVudEJyaWRnZUVycm9yUmVzcG9uc2VQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJlcnJvclwiLCBqczogXCJlcnJvclwiLCB0eXA6IHIkMShcIkVycm9yTWVzc2FnZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnRlbnRCcmlkZ2VSZXF1ZXN0XCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJGaW5kSW50ZW50QnJpZGdlUmVxdWVzdE1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIkZpbmRJbnRlbnRCcmlkZ2VSZXF1ZXN0UGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiRmluZEludGVudEFnZW50UmVxdWVzdFR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJGaW5kSW50ZW50QnJpZGdlUmVxdWVzdE1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwic291cmNlXCIsIGpzOiBcInNvdXJjZVwiLCB0eXA6IHIkMShcIkJyaWRnZVBhcnRpY2lwYW50SWRlbnRpZmllclwiKSB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICAgICAgeyBqc29uOiBcImRlc3RpbmF0aW9uXCIsIGpzOiBcImRlc3RpbmF0aW9uXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgciQxKFwiQnJpZGdlUGFydGljaXBhbnRJZGVudGlmaWVyXCIpKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnRlbnRCcmlkZ2VSZXF1ZXN0UGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiY29udGV4dFwiLCBqczogXCJjb250ZXh0XCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgciQxKFwiQ29udGV4dEVsZW1lbnRcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJpbnRlbnRcIiwganM6IFwiaW50ZW50XCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwicmVzdWx0VHlwZVwiLCBqczogXCJyZXN1bHRUeXBlXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJGaW5kSW50ZW50QnJpZGdlUmVzcG9uc2VcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIkZpbmRJbnRlbnRCcmlkZ2VSZXNwb25zZU1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIkZpbmRJbnRlbnRCcmlkZ2VSZXNwb25zZVBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIkZpbmRJbnRlbnRBZ2VudEVycm9yUmVzcG9uc2VUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRmluZEludGVudEJyaWRnZVJlc3BvbnNlTWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZXJyb3JEZXRhaWxzXCIsIGpzOiBcImVycm9yRGV0YWlsc1wiLCB0eXA6IHUkMSh1bmRlZmluZWQsIGEkMShyJDEoXCJSZXNwb25zZUVycm9yRGV0YWlsXCIpKSkgfSxcbiAgICAgICAgeyBqc29uOiBcImVycm9yU291cmNlc1wiLCBqczogXCJlcnJvclNvdXJjZXNcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBhJDEociQxKFwiRGVza3RvcEFnZW50SWRlbnRpZmllclwiKSkpIH0sXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInJlc3BvbnNlVXVpZFwiLCBqczogXCJyZXNwb25zZVV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJzb3VyY2VzXCIsIGpzOiBcInNvdXJjZXNcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBhJDEociQxKFwiRGVza3RvcEFnZW50SWRlbnRpZmllclwiKSkpIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnRlbnRCcmlkZ2VSZXNwb25zZVBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImFwcEludGVudFwiLCBqczogXCJhcHBJbnRlbnRcIiwgdHlwOiByJDEoXCJBcHBJbnRlbnRcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJGaW5kSW50ZW50c0J5Q29udGV4dEFnZW50RXJyb3JSZXNwb25zZVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiRmluZEludGVudHNCeUNvbnRleHRBZ2VudEVycm9yUmVzcG9uc2VNZXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiByJDEoXCJGaW5kSW50ZW50c0J5Q29udGV4dEFnZW50RXJyb3JSZXNwb25zZVBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIkZpbmRJbnRlbnRzQnlDb250ZXh0QWdlbnRFcnJvclJlc3BvbnNlVHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnRlbnRzQnlDb250ZXh0QWdlbnRFcnJvclJlc3BvbnNlTWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJyZXNwb25zZVV1aWRcIiwganM6IFwicmVzcG9uc2VVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJGaW5kSW50ZW50c0J5Q29udGV4dEFnZW50RXJyb3JSZXNwb25zZVBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImVycm9yXCIsIGpzOiBcImVycm9yXCIsIHR5cDogciQxKFwiRXJyb3JNZXNzYWdlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRmluZEludGVudHNCeUNvbnRleHRBZ2VudFJlcXVlc3RcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIkZpbmRJbnRlbnRzQnlDb250ZXh0QWdlbnRSZXF1ZXN0TWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiRmluZEludGVudHNCeUNvbnRleHRBZ2VudFJlcXVlc3RQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJGaW5kSW50ZW50c0J5Q29udGV4dEFnZW50UmVxdWVzdFR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJGaW5kSW50ZW50c0J5Q29udGV4dEFnZW50UmVxdWVzdE1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwic291cmNlXCIsIGpzOiBcInNvdXJjZVwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIHIkMShcIlNvdXJjZU9iamVjdFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgICAgIHsganNvbjogXCJkZXN0aW5hdGlvblwiLCBqczogXCJkZXN0aW5hdGlvblwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIHIkMShcIkJyaWRnZVBhcnRpY2lwYW50SWRlbnRpZmllclwiKSkgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJGaW5kSW50ZW50c0J5Q29udGV4dEFnZW50UmVxdWVzdFBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImNvbnRleHRcIiwganM6IFwiY29udGV4dFwiLCB0eXA6IHIkMShcIkNvbnRleHRFbGVtZW50XCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRmluZEludGVudHNCeUNvbnRleHRBZ2VudFJlc3BvbnNlXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJGaW5kSW50ZW50c0J5Q29udGV4dEFnZW50UmVzcG9uc2VNZXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiByJDEoXCJGaW5kSW50ZW50c0J5Q29udGV4dEFnZW50UmVzcG9uc2VQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJGaW5kSW50ZW50c0J5Q29udGV4dEFnZW50RXJyb3JSZXNwb25zZVR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJGaW5kSW50ZW50c0J5Q29udGV4dEFnZW50UmVzcG9uc2VNZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInJlc3BvbnNlVXVpZFwiLCBqczogXCJyZXNwb25zZVV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnRlbnRzQnlDb250ZXh0QWdlbnRSZXNwb25zZVBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImFwcEludGVudHNcIiwganM6IFwiYXBwSW50ZW50c1wiLCB0eXA6IGEkMShyJDEoXCJBcHBJbnRlbnRcIikpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRmluZEludGVudHNCeUNvbnRleHRCcmlkZ2VFcnJvclJlc3BvbnNlXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJGaW5kSW50ZW50c0J5Q29udGV4dEJyaWRnZUVycm9yUmVzcG9uc2VNZXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiByJDEoXCJGaW5kSW50ZW50c0J5Q29udGV4dEJyaWRnZUVycm9yUmVzcG9uc2VQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJGaW5kSW50ZW50c0J5Q29udGV4dEFnZW50RXJyb3JSZXNwb25zZVR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJGaW5kSW50ZW50c0J5Q29udGV4dEJyaWRnZUVycm9yUmVzcG9uc2VNZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJlcnJvckRldGFpbHNcIiwganM6IFwiZXJyb3JEZXRhaWxzXCIsIHR5cDogYSQxKHIkMShcIlJlc3BvbnNlRXJyb3JEZXRhaWxcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJlcnJvclNvdXJjZXNcIiwganM6IFwiZXJyb3JTb3VyY2VzXCIsIHR5cDogYSQxKHIkMShcIkRlc2t0b3BBZ2VudElkZW50aWZpZXJcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInJlc3BvbnNlVXVpZFwiLCBqczogXCJyZXNwb25zZVV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnRlbnRzQnlDb250ZXh0QnJpZGdlRXJyb3JSZXNwb25zZVBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImVycm9yXCIsIGpzOiBcImVycm9yXCIsIHR5cDogciQxKFwiRXJyb3JNZXNzYWdlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRmluZEludGVudHNCeUNvbnRleHRCcmlkZ2VSZXF1ZXN0XCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJGaW5kSW50ZW50c0J5Q29udGV4dEJyaWRnZVJlcXVlc3RNZXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiByJDEoXCJGaW5kSW50ZW50c0J5Q29udGV4dEJyaWRnZVJlcXVlc3RQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJGaW5kSW50ZW50c0J5Q29udGV4dEFnZW50UmVxdWVzdFR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJGaW5kSW50ZW50c0J5Q29udGV4dEJyaWRnZVJlcXVlc3RNZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInNvdXJjZVwiLCBqczogXCJzb3VyY2VcIiwgdHlwOiByJDEoXCJNZXRhU291cmNlXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgICAgICB7IGpzb246IFwiZGVzdGluYXRpb25cIiwganM6IFwiZGVzdGluYXRpb25cIiwgdHlwOiB1JDEodW5kZWZpbmVkLCByJDEoXCJCcmlkZ2VQYXJ0aWNpcGFudElkZW50aWZpZXJcIikpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRmluZEludGVudHNCeUNvbnRleHRCcmlkZ2VSZXF1ZXN0UGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiY29udGV4dFwiLCBqczogXCJjb250ZXh0XCIsIHR5cDogciQxKFwiQ29udGV4dEVsZW1lbnRcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJGaW5kSW50ZW50c0J5Q29udGV4dEJyaWRnZVJlc3BvbnNlXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJGaW5kSW50ZW50c0J5Q29udGV4dEJyaWRnZVJlc3BvbnNlTWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiRmluZEludGVudHNCeUNvbnRleHRCcmlkZ2VSZXNwb25zZVBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIkZpbmRJbnRlbnRzQnlDb250ZXh0QWdlbnRFcnJvclJlc3BvbnNlVHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkZpbmRJbnRlbnRzQnlDb250ZXh0QnJpZGdlUmVzcG9uc2VNZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJlcnJvckRldGFpbHNcIiwganM6IFwiZXJyb3JEZXRhaWxzXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgYSQxKHIkMShcIlJlc3BvbnNlRXJyb3JEZXRhaWxcIikpKSB9LFxuICAgICAgICB7IGpzb246IFwiZXJyb3JTb3VyY2VzXCIsIGpzOiBcImVycm9yU291cmNlc1wiLCB0eXA6IHUkMSh1bmRlZmluZWQsIGEkMShyJDEoXCJEZXNrdG9wQWdlbnRJZGVudGlmaWVyXCIpKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwicmVzcG9uc2VVdWlkXCIsIGpzOiBcInJlc3BvbnNlVXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInNvdXJjZXNcIiwganM6IFwic291cmNlc1wiLCB0eXA6IHUkMSh1bmRlZmluZWQsIGEkMShyJDEoXCJEZXNrdG9wQWdlbnRJZGVudGlmaWVyXCIpKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRmluZEludGVudHNCeUNvbnRleHRCcmlkZ2VSZXNwb25zZVBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImFwcEludGVudHNcIiwganM6IFwiYXBwSW50ZW50c1wiLCB0eXA6IGEkMShyJDEoXCJBcHBJbnRlbnRcIikpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiR2V0QXBwTWV0YWRhdGFBZ2VudEVycm9yUmVzcG9uc2VcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIkdldEFwcE1ldGFkYXRhQWdlbnRFcnJvclJlc3BvbnNlTWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiR2V0QXBwTWV0YWRhdGFBZ2VudEVycm9yUmVzcG9uc2VQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJHZXRBcHBNZXRhZGF0YUFnZW50RXJyb3JSZXNwb25zZVR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJHZXRBcHBNZXRhZGF0YUFnZW50RXJyb3JSZXNwb25zZU1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwicmVzcG9uc2VVdWlkXCIsIGpzOiBcInJlc3BvbnNlVXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiR2V0QXBwTWV0YWRhdGFBZ2VudEVycm9yUmVzcG9uc2VQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJlcnJvclwiLCBqczogXCJlcnJvclwiLCB0eXA6IHIkMShcIkVycm9yTWVzc2FnZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkdldEFwcE1ldGFkYXRhQWdlbnRSZXF1ZXN0XCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJHZXRBcHBNZXRhZGF0YUFnZW50UmVxdWVzdE1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIkdldEFwcE1ldGFkYXRhQWdlbnRSZXF1ZXN0UGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiR2V0QXBwTWV0YWRhdGFBZ2VudFJlcXVlc3RUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiR2V0QXBwTWV0YWRhdGFBZ2VudFJlcXVlc3RNZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJkZXN0aW5hdGlvblwiLCBqczogXCJkZXN0aW5hdGlvblwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIHIkMShcIkRlc3RpbmF0aW9uT2JqZWN0XCIpKSB9LFxuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJzb3VyY2VcIiwganM6IFwic291cmNlXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgciQxKFwiU291cmNlSWRlbnRpZmllclwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiR2V0QXBwTWV0YWRhdGFBZ2VudFJlcXVlc3RQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJhcHBcIiwganM6IFwiYXBwXCIsIHR5cDogciQxKFwiQXBwRGVzdGluYXRpb25JZGVudGlmaWVyXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiQXBwRGVzdGluYXRpb25JZGVudGlmaWVyXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJkZXNrdG9wQWdlbnRcIiwganM6IFwiZGVza3RvcEFnZW50XCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwiYXBwSWRcIiwganM6IFwiYXBwSWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJpbnN0YW5jZUlkXCIsIGpzOiBcImluc3RhbmNlSWRcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiR2V0QXBwTWV0YWRhdGFBZ2VudFJlc3BvbnNlXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJHZXRBcHBNZXRhZGF0YUFnZW50UmVzcG9uc2VNZXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiByJDEoXCJHZXRBcHBNZXRhZGF0YUFnZW50UmVzcG9uc2VQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJHZXRBcHBNZXRhZGF0YUFnZW50RXJyb3JSZXNwb25zZVR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJHZXRBcHBNZXRhZGF0YUFnZW50UmVzcG9uc2VNZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInJlc3BvbnNlVXVpZFwiLCBqczogXCJyZXNwb25zZVV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkdldEFwcE1ldGFkYXRhQWdlbnRSZXNwb25zZVBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImFwcE1ldGFkYXRhXCIsIGpzOiBcImFwcE1ldGFkYXRhXCIsIHR5cDogciQxKFwiQXBwTWV0YWRhdGFcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJHZXRBcHBNZXRhZGF0YUJyaWRnZUVycm9yUmVzcG9uc2VcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIkdldEFwcE1ldGFkYXRhQnJpZGdlRXJyb3JSZXNwb25zZU1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIkdldEFwcE1ldGFkYXRhQnJpZGdlRXJyb3JSZXNwb25zZVBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIkdldEFwcE1ldGFkYXRhQWdlbnRFcnJvclJlc3BvbnNlVHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkdldEFwcE1ldGFkYXRhQnJpZGdlRXJyb3JSZXNwb25zZU1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImVycm9yRGV0YWlsc1wiLCBqczogXCJlcnJvckRldGFpbHNcIiwgdHlwOiBhJDEociQxKFwiUmVzcG9uc2VFcnJvckRldGFpbFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcImVycm9yU291cmNlc1wiLCBqczogXCJlcnJvclNvdXJjZXNcIiwgdHlwOiBhJDEociQxKFwiRGVza3RvcEFnZW50SWRlbnRpZmllclwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwicmVzcG9uc2VVdWlkXCIsIGpzOiBcInJlc3BvbnNlVXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiR2V0QXBwTWV0YWRhdGFCcmlkZ2VFcnJvclJlc3BvbnNlUGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZXJyb3JcIiwganM6IFwiZXJyb3JcIiwgdHlwOiByJDEoXCJFcnJvck1lc3NhZ2VcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJHZXRBcHBNZXRhZGF0YUJyaWRnZVJlcXVlc3RcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIkdldEFwcE1ldGFkYXRhQnJpZGdlUmVxdWVzdE1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIkdldEFwcE1ldGFkYXRhQnJpZGdlUmVxdWVzdFBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIkdldEFwcE1ldGFkYXRhQWdlbnRSZXF1ZXN0VHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkdldEFwcE1ldGFkYXRhQnJpZGdlUmVxdWVzdE1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImRlc3RpbmF0aW9uXCIsIGpzOiBcImRlc3RpbmF0aW9uXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgciQxKFwiRGVzdGluYXRpb25PYmplY3RcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInNvdXJjZVwiLCBqczogXCJzb3VyY2VcIiwgdHlwOiByJDEoXCJNZXRhU291cmNlT2JqZWN0XCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkdldEFwcE1ldGFkYXRhQnJpZGdlUmVxdWVzdFBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImFwcFwiLCBqczogXCJhcHBcIiwgdHlwOiByJDEoXCJBcHBEZXN0aW5hdGlvbklkZW50aWZpZXJcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJHZXRBcHBNZXRhZGF0YUJyaWRnZVJlc3BvbnNlXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJHZXRBcHBNZXRhZGF0YUJyaWRnZVJlc3BvbnNlTWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiR2V0QXBwTWV0YWRhdGFCcmlkZ2VSZXNwb25zZVBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIkdldEFwcE1ldGFkYXRhQWdlbnRFcnJvclJlc3BvbnNlVHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkdldEFwcE1ldGFkYXRhQnJpZGdlUmVzcG9uc2VNZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJlcnJvckRldGFpbHNcIiwganM6IFwiZXJyb3JEZXRhaWxzXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgYSQxKHIkMShcIlJlc3BvbnNlRXJyb3JEZXRhaWxcIikpKSB9LFxuICAgICAgICB7IGpzb246IFwiZXJyb3JTb3VyY2VzXCIsIGpzOiBcImVycm9yU291cmNlc1wiLCB0eXA6IHUkMSh1bmRlZmluZWQsIGEkMShyJDEoXCJEZXNrdG9wQWdlbnRJZGVudGlmaWVyXCIpKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwicmVzcG9uc2VVdWlkXCIsIGpzOiBcInJlc3BvbnNlVXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInNvdXJjZXNcIiwganM6IFwic291cmNlc1wiLCB0eXA6IHUkMSh1bmRlZmluZWQsIGEkMShyJDEoXCJEZXNrdG9wQWdlbnRJZGVudGlmaWVyXCIpKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiR2V0QXBwTWV0YWRhdGFCcmlkZ2VSZXNwb25zZVBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImFwcE1ldGFkYXRhXCIsIGpzOiBcImFwcE1ldGFkYXRhXCIsIHR5cDogciQxKFwiQXBwTWV0YWRhdGFcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJPcGVuQWdlbnRFcnJvclJlc3BvbnNlXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJPcGVuQWdlbnRFcnJvclJlc3BvbnNlTWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiT3BlbkFnZW50RXJyb3JSZXNwb25zZVBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIk9wZW5BZ2VudEVycm9yUmVzcG9uc2VUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiT3BlbkFnZW50RXJyb3JSZXNwb25zZU1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwicmVzcG9uc2VVdWlkXCIsIGpzOiBcInJlc3BvbnNlVXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiT3BlbkFnZW50RXJyb3JSZXNwb25zZVBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImVycm9yXCIsIGpzOiBcImVycm9yXCIsIHR5cDogciQxKFwiT3BlbkVycm9yTWVzc2FnZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIk9wZW5BZ2VudFJlcXVlc3RcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIk9wZW5BZ2VudFJlcXVlc3RNZXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiByJDEoXCJPcGVuQWdlbnRSZXF1ZXN0UGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiT3BlbkFnZW50UmVxdWVzdFR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJPcGVuQWdlbnRSZXF1ZXN0TWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZGVzdGluYXRpb25cIiwganM6IFwiZGVzdGluYXRpb25cIiwgdHlwOiB1JDEodW5kZWZpbmVkLCByJDEoXCJEZXN0aW5hdGlvbk9iamVjdFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwic291cmNlXCIsIGpzOiBcInNvdXJjZVwiLCB0eXA6IHIkMShcIlNvdXJjZU9iamVjdFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJPcGVuQWdlbnRSZXF1ZXN0UGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiYXBwXCIsIGpzOiBcImFwcFwiLCB0eXA6IHIkMShcIkFwcFRvT3BlblwiKSB9LFxuICAgICAgICB7IGpzb246IFwiY29udGV4dFwiLCBqczogXCJjb250ZXh0XCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgciQxKFwiQ29udGV4dEVsZW1lbnRcIikpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiQXBwVG9PcGVuXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJkZXNrdG9wQWdlbnRcIiwganM6IFwiZGVza3RvcEFnZW50XCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwiYXBwSWRcIiwganM6IFwiYXBwSWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJpbnN0YW5jZUlkXCIsIGpzOiBcImluc3RhbmNlSWRcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiT3BlbkFnZW50UmVzcG9uc2VcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIk9wZW5BZ2VudFJlc3BvbnNlTWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiT3BlbkFnZW50UmVzcG9uc2VQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJPcGVuQWdlbnRFcnJvclJlc3BvbnNlVHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIk9wZW5BZ2VudFJlc3BvbnNlTWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJyZXNwb25zZVV1aWRcIiwganM6IFwicmVzcG9uc2VVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJPcGVuQWdlbnRSZXNwb25zZVBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImFwcElkZW50aWZpZXJcIiwganM6IFwiYXBwSWRlbnRpZmllclwiLCB0eXA6IHIkMShcIkFwcElkZW50aWZpZXJcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJPcGVuQnJpZGdlRXJyb3JSZXNwb25zZVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiT3BlbkJyaWRnZUVycm9yUmVzcG9uc2VNZXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiByJDEoXCJPcGVuQnJpZGdlRXJyb3JSZXNwb25zZVBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIk9wZW5BZ2VudEVycm9yUmVzcG9uc2VUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiT3BlbkJyaWRnZUVycm9yUmVzcG9uc2VNZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJlcnJvckRldGFpbHNcIiwganM6IFwiZXJyb3JEZXRhaWxzXCIsIHR5cDogYSQxKHIkMShcIlJlc3BvbnNlRXJyb3JEZXRhaWxcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJlcnJvclNvdXJjZXNcIiwganM6IFwiZXJyb3JTb3VyY2VzXCIsIHR5cDogYSQxKHIkMShcIkRlc2t0b3BBZ2VudElkZW50aWZpZXJcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInJlc3BvbnNlVXVpZFwiLCBqczogXCJyZXNwb25zZVV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIk9wZW5CcmlkZ2VFcnJvclJlc3BvbnNlUGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZXJyb3JcIiwganM6IFwiZXJyb3JcIiwgdHlwOiByJDEoXCJPcGVuRXJyb3JNZXNzYWdlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiT3BlbkJyaWRnZVJlcXVlc3RcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIk9wZW5CcmlkZ2VSZXF1ZXN0TWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiT3BlbkJyaWRnZVJlcXVlc3RQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJPcGVuQWdlbnRSZXF1ZXN0VHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIk9wZW5CcmlkZ2VSZXF1ZXN0TWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZGVzdGluYXRpb25cIiwganM6IFwiZGVzdGluYXRpb25cIiwgdHlwOiB1JDEodW5kZWZpbmVkLCByJDEoXCJEZXN0aW5hdGlvbk9iamVjdFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwic291cmNlXCIsIGpzOiBcInNvdXJjZVwiLCB0eXA6IHIkMShcIk1ldGFTb3VyY2VcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiT3BlbkJyaWRnZVJlcXVlc3RQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJhcHBcIiwganM6IFwiYXBwXCIsIHR5cDogciQxKFwiQXBwVG9PcGVuXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJjb250ZXh0XCIsIGpzOiBcImNvbnRleHRcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCByJDEoXCJDb250ZXh0RWxlbWVudFwiKSkgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJPcGVuQnJpZGdlUmVzcG9uc2VcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIk9wZW5CcmlkZ2VSZXNwb25zZU1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIk9wZW5CcmlkZ2VSZXNwb25zZVBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIk9wZW5BZ2VudEVycm9yUmVzcG9uc2VUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiT3BlbkJyaWRnZVJlc3BvbnNlTWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZXJyb3JEZXRhaWxzXCIsIGpzOiBcImVycm9yRGV0YWlsc1wiLCB0eXA6IHUkMSh1bmRlZmluZWQsIGEkMShyJDEoXCJSZXNwb25zZUVycm9yRGV0YWlsXCIpKSkgfSxcbiAgICAgICAgeyBqc29uOiBcImVycm9yU291cmNlc1wiLCBqczogXCJlcnJvclNvdXJjZXNcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBhJDEociQxKFwiRGVza3RvcEFnZW50SWRlbnRpZmllclwiKSkpIH0sXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInJlc3BvbnNlVXVpZFwiLCBqczogXCJyZXNwb25zZVV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJzb3VyY2VzXCIsIGpzOiBcInNvdXJjZXNcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBhJDEociQxKFwiRGVza3RvcEFnZW50SWRlbnRpZmllclwiKSkpIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIk9wZW5CcmlkZ2VSZXNwb25zZVBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImFwcElkZW50aWZpZXJcIiwganM6IFwiYXBwSWRlbnRpZmllclwiLCB0eXA6IHIkMShcIkFwcElkZW50aWZpZXJcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJQcml2YXRlQ2hhbm5lbEJyb2FkY2FzdEFnZW50UmVxdWVzdFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiUHJpdmF0ZUNoYW5uZWxCcm9hZGNhc3RBZ2VudFJlcXVlc3RNZXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiByJDEoXCJQcml2YXRlQ2hhbm5lbEJyb2FkY2FzdEFnZW50UmVxdWVzdFBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIlByaXZhdGVDaGFubmVsQnJvYWRjYXN0QWdlbnRSZXF1ZXN0VHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlByaXZhdGVDaGFubmVsQnJvYWRjYXN0QWdlbnRSZXF1ZXN0TWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZGVzdGluYXRpb25cIiwganM6IFwiZGVzdGluYXRpb25cIiwgdHlwOiB1JDEodW5kZWZpbmVkLCByJDEoXCJNZXRhRGVzdGluYXRpb25cIikpIH0sXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInNvdXJjZVwiLCBqczogXCJzb3VyY2VcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCByJDEoXCJTb3VyY2VPYmplY3RcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIk1ldGFEZXN0aW5hdGlvblwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZGVza3RvcEFnZW50XCIsIGpzOiBcImRlc2t0b3BBZ2VudFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcImFwcElkXCIsIGpzOiBcImFwcElkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwiaW5zdGFuY2VJZFwiLCBqczogXCJpbnN0YW5jZUlkXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIlByaXZhdGVDaGFubmVsQnJvYWRjYXN0QWdlbnRSZXF1ZXN0UGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiY2hhbm5lbElkXCIsIGpzOiBcImNoYW5uZWxJZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcImNvbnRleHRcIiwganM6IFwiY29udGV4dFwiLCB0eXA6IHIkMShcIkNvbnRleHRFbGVtZW50XCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUHJpdmF0ZUNoYW5uZWxCcm9hZGNhc3RCcmlkZ2VSZXF1ZXN0XCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJQcml2YXRlQ2hhbm5lbEJyb2FkY2FzdEJyaWRnZVJlcXVlc3RNZXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiByJDEoXCJQcml2YXRlQ2hhbm5lbEJyb2FkY2FzdEJyaWRnZVJlcXVlc3RQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJQcml2YXRlQ2hhbm5lbEJyb2FkY2FzdEFnZW50UmVxdWVzdFR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJQcml2YXRlQ2hhbm5lbEJyb2FkY2FzdEJyaWRnZVJlcXVlc3RNZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJkZXN0aW5hdGlvblwiLCBqczogXCJkZXN0aW5hdGlvblwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIHIkMShcIk1ldGFEZXN0aW5hdGlvblwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwic291cmNlXCIsIGpzOiBcInNvdXJjZVwiLCB0eXA6IHIkMShcIk1ldGFTb3VyY2VcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUHJpdmF0ZUNoYW5uZWxCcm9hZGNhc3RCcmlkZ2VSZXF1ZXN0UGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiY2hhbm5lbElkXCIsIGpzOiBcImNoYW5uZWxJZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcImNvbnRleHRcIiwganM6IFwiY29udGV4dFwiLCB0eXA6IHIkMShcIkNvbnRleHRFbGVtZW50XCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUHJpdmF0ZUNoYW5uZWxFdmVudExpc3RlbmVyQWRkZWRBZ2VudFJlcXVlc3RcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIlByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lckFkZGVkQWdlbnRSZXF1ZXN0TWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiUHJpdmF0ZUNoYW5uZWxFdmVudExpc3RlbmVyQWRkZWRBZ2VudFJlcXVlc3RQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJQcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJBZGRlZEFnZW50UmVxdWVzdFR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJQcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJBZGRlZEFnZW50UmVxdWVzdE1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImRlc3RpbmF0aW9uXCIsIGpzOiBcImRlc3RpbmF0aW9uXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgciQxKFwiTWV0YURlc3RpbmF0aW9uXCIpKSB9LFxuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJzb3VyY2VcIiwganM6IFwic291cmNlXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgciQxKFwiU291cmNlT2JqZWN0XCIpKSB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJQcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJBZGRlZEFnZW50UmVxdWVzdFBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImNoYW5uZWxJZFwiLCBqczogXCJjaGFubmVsSWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJsaXN0ZW5lclR5cGVcIiwganM6IFwibGlzdGVuZXJUeXBlXCIsIHR5cDogciQxKFwiUHJpdmF0ZUNoYW5uZWxFdmVudExpc3RlbmVyVHlwZXNcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJQcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJBZGRlZEJyaWRnZVJlcXVlc3RcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIlByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lckFkZGVkQnJpZGdlUmVxdWVzdE1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIlByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lckFkZGVkQnJpZGdlUmVxdWVzdFBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIlByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lckFkZGVkQWdlbnRSZXF1ZXN0VHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lckFkZGVkQnJpZGdlUmVxdWVzdE1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImRlc3RpbmF0aW9uXCIsIGpzOiBcImRlc3RpbmF0aW9uXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgciQxKFwiTWV0YURlc3RpbmF0aW9uXCIpKSB9LFxuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJzb3VyY2VcIiwganM6IFwic291cmNlXCIsIHR5cDogciQxKFwiTWV0YVNvdXJjZVwiKSB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJQcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJBZGRlZEJyaWRnZVJlcXVlc3RQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJjaGFubmVsSWRcIiwganM6IFwiY2hhbm5lbElkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwibGlzdGVuZXJUeXBlXCIsIGpzOiBcImxpc3RlbmVyVHlwZVwiLCB0eXA6IHIkMShcIlByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lclR5cGVzXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUHJpdmF0ZUNoYW5uZWxFdmVudExpc3RlbmVyUmVtb3ZlZEFnZW50UmVxdWVzdFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiUHJpdmF0ZUNoYW5uZWxFdmVudExpc3RlbmVyUmVtb3ZlZEFnZW50UmVxdWVzdE1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIlByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lclJlbW92ZWRBZ2VudFJlcXVlc3RQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJQcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJSZW1vdmVkQWdlbnRSZXF1ZXN0VHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lclJlbW92ZWRBZ2VudFJlcXVlc3RNZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJkZXN0aW5hdGlvblwiLCBqczogXCJkZXN0aW5hdGlvblwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIHIkMShcIk1ldGFEZXN0aW5hdGlvblwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwic291cmNlXCIsIGpzOiBcInNvdXJjZVwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIHIkMShcIlNvdXJjZU9iamVjdFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUHJpdmF0ZUNoYW5uZWxFdmVudExpc3RlbmVyUmVtb3ZlZEFnZW50UmVxdWVzdFBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImNoYW5uZWxJZFwiLCBqczogXCJjaGFubmVsSWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJsaXN0ZW5lclR5cGVcIiwganM6IFwibGlzdGVuZXJUeXBlXCIsIHR5cDogciQxKFwiUHJpdmF0ZUNoYW5uZWxFdmVudExpc3RlbmVyVHlwZXNcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJQcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJSZW1vdmVkQnJpZGdlUmVxdWVzdFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiUHJpdmF0ZUNoYW5uZWxFdmVudExpc3RlbmVyUmVtb3ZlZEJyaWRnZVJlcXVlc3RNZXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiByJDEoXCJQcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJSZW1vdmVkQnJpZGdlUmVxdWVzdFBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIlByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lclJlbW92ZWRBZ2VudFJlcXVlc3RUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUHJpdmF0ZUNoYW5uZWxFdmVudExpc3RlbmVyUmVtb3ZlZEJyaWRnZVJlcXVlc3RNZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJkZXN0aW5hdGlvblwiLCBqczogXCJkZXN0aW5hdGlvblwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIHIkMShcIk1ldGFEZXN0aW5hdGlvblwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwic291cmNlXCIsIGpzOiBcInNvdXJjZVwiLCB0eXA6IHIkMShcIk1ldGFTb3VyY2VcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUHJpdmF0ZUNoYW5uZWxFdmVudExpc3RlbmVyUmVtb3ZlZEJyaWRnZVJlcXVlc3RQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJjaGFubmVsSWRcIiwganM6IFwiY2hhbm5lbElkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwibGlzdGVuZXJUeXBlXCIsIGpzOiBcImxpc3RlbmVyVHlwZVwiLCB0eXA6IHIkMShcIlByaXZhdGVDaGFubmVsRXZlbnRMaXN0ZW5lclR5cGVzXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUHJpdmF0ZUNoYW5uZWxPbkFkZENvbnRleHRMaXN0ZW5lckFnZW50UmVxdWVzdFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiUHJpdmF0ZUNoYW5uZWxPbkFkZENvbnRleHRMaXN0ZW5lckFnZW50UmVxdWVzdE1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIlByaXZhdGVDaGFubmVsT25BZGRDb250ZXh0TGlzdGVuZXJBZ2VudFJlcXVlc3RQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJQcml2YXRlQ2hhbm5lbE9uQWRkQ29udGV4dExpc3RlbmVyQWdlbnRSZXF1ZXN0VHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlByaXZhdGVDaGFubmVsT25BZGRDb250ZXh0TGlzdGVuZXJBZ2VudFJlcXVlc3RNZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJkZXN0aW5hdGlvblwiLCBqczogXCJkZXN0aW5hdGlvblwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIHIkMShcIk1ldGFEZXN0aW5hdGlvblwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwic291cmNlXCIsIGpzOiBcInNvdXJjZVwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIHIkMShcIlNvdXJjZU9iamVjdFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUHJpdmF0ZUNoYW5uZWxPbkFkZENvbnRleHRMaXN0ZW5lckFnZW50UmVxdWVzdFBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImNoYW5uZWxJZFwiLCBqczogXCJjaGFubmVsSWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJjb250ZXh0VHlwZVwiLCBqczogXCJjb250ZXh0VHlwZVwiLCB0eXA6IHUkMShudWxsLCBcIlwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlByaXZhdGVDaGFubmVsT25BZGRDb250ZXh0TGlzdGVuZXJCcmlkZ2VSZXF1ZXN0XCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJQcml2YXRlQ2hhbm5lbE9uQWRkQ29udGV4dExpc3RlbmVyQnJpZGdlUmVxdWVzdE1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIlByaXZhdGVDaGFubmVsT25BZGRDb250ZXh0TGlzdGVuZXJCcmlkZ2VSZXF1ZXN0UGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiUHJpdmF0ZUNoYW5uZWxPbkFkZENvbnRleHRMaXN0ZW5lckFnZW50UmVxdWVzdFR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJQcml2YXRlQ2hhbm5lbE9uQWRkQ29udGV4dExpc3RlbmVyQnJpZGdlUmVxdWVzdE1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImRlc3RpbmF0aW9uXCIsIGpzOiBcImRlc3RpbmF0aW9uXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgciQxKFwiTWV0YURlc3RpbmF0aW9uXCIpKSB9LFxuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJzb3VyY2VcIiwganM6IFwic291cmNlXCIsIHR5cDogciQxKFwiTWV0YVNvdXJjZVwiKSB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJQcml2YXRlQ2hhbm5lbE9uQWRkQ29udGV4dExpc3RlbmVyQnJpZGdlUmVxdWVzdFBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImNoYW5uZWxJZFwiLCBqczogXCJjaGFubmVsSWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJjb250ZXh0VHlwZVwiLCBqczogXCJjb250ZXh0VHlwZVwiLCB0eXA6IHUkMShudWxsLCBcIlwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlByaXZhdGVDaGFubmVsT25EaXNjb25uZWN0QWdlbnRSZXF1ZXN0XCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJQcml2YXRlQ2hhbm5lbE9uRGlzY29ubmVjdEFnZW50UmVxdWVzdE1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIlByaXZhdGVDaGFubmVsT25EaXNjb25uZWN0QWdlbnRSZXF1ZXN0UGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiUHJpdmF0ZUNoYW5uZWxPbkRpc2Nvbm5lY3RBZ2VudFJlcXVlc3RUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUHJpdmF0ZUNoYW5uZWxPbkRpc2Nvbm5lY3RBZ2VudFJlcXVlc3RNZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJkZXN0aW5hdGlvblwiLCBqczogXCJkZXN0aW5hdGlvblwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIHIkMShcIk1ldGFEZXN0aW5hdGlvblwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwic291cmNlXCIsIGpzOiBcInNvdXJjZVwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIHIkMShcIlNvdXJjZU9iamVjdFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUHJpdmF0ZUNoYW5uZWxPbkRpc2Nvbm5lY3RBZ2VudFJlcXVlc3RQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJjaGFubmVsSWRcIiwganM6IFwiY2hhbm5lbElkXCIsIHR5cDogXCJcIiB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlByaXZhdGVDaGFubmVsT25EaXNjb25uZWN0QnJpZGdlUmVxdWVzdFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiUHJpdmF0ZUNoYW5uZWxPbkRpc2Nvbm5lY3RCcmlkZ2VSZXF1ZXN0TWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiUHJpdmF0ZUNoYW5uZWxPbkRpc2Nvbm5lY3RCcmlkZ2VSZXF1ZXN0UGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiUHJpdmF0ZUNoYW5uZWxPbkRpc2Nvbm5lY3RBZ2VudFJlcXVlc3RUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUHJpdmF0ZUNoYW5uZWxPbkRpc2Nvbm5lY3RCcmlkZ2VSZXF1ZXN0TWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZGVzdGluYXRpb25cIiwganM6IFwiZGVzdGluYXRpb25cIiwgdHlwOiB1JDEodW5kZWZpbmVkLCByJDEoXCJNZXRhRGVzdGluYXRpb25cIikpIH0sXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInNvdXJjZVwiLCBqczogXCJzb3VyY2VcIiwgdHlwOiByJDEoXCJNZXRhU291cmNlXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlByaXZhdGVDaGFubmVsT25EaXNjb25uZWN0QnJpZGdlUmVxdWVzdFBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImNoYW5uZWxJZFwiLCBqczogXCJjaGFubmVsSWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUHJpdmF0ZUNoYW5uZWxPblVuc3Vic2NyaWJlQWdlbnRSZXF1ZXN0XCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJQcml2YXRlQ2hhbm5lbE9uVW5zdWJzY3JpYmVBZ2VudFJlcXVlc3RNZXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiByJDEoXCJQcml2YXRlQ2hhbm5lbE9uVW5zdWJzY3JpYmVBZ2VudFJlcXVlc3RQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJQcml2YXRlQ2hhbm5lbE9uVW5zdWJzY3JpYmVBZ2VudFJlcXVlc3RUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUHJpdmF0ZUNoYW5uZWxPblVuc3Vic2NyaWJlQWdlbnRSZXF1ZXN0TWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZGVzdGluYXRpb25cIiwganM6IFwiZGVzdGluYXRpb25cIiwgdHlwOiB1JDEodW5kZWZpbmVkLCByJDEoXCJNZXRhRGVzdGluYXRpb25cIikpIH0sXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInNvdXJjZVwiLCBqczogXCJzb3VyY2VcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCByJDEoXCJTb3VyY2VPYmplY3RcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlByaXZhdGVDaGFubmVsT25VbnN1YnNjcmliZUFnZW50UmVxdWVzdFBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImNoYW5uZWxJZFwiLCBqczogXCJjaGFubmVsSWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJjb250ZXh0VHlwZVwiLCBqczogXCJjb250ZXh0VHlwZVwiLCB0eXA6IHUkMShudWxsLCBcIlwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlByaXZhdGVDaGFubmVsT25VbnN1YnNjcmliZUJyaWRnZVJlcXVlc3RcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIkVSZXF1ZXN0TWV0YWRhdGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIlByaXZhdGVDaGFubmVsT25VbnN1YnNjcmliZUJyaWRnZVJlcXVlc3RQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJQcml2YXRlQ2hhbm5lbE9uVW5zdWJzY3JpYmVBZ2VudFJlcXVlc3RUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiRVJlcXVlc3RNZXRhZGF0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZGVzdGluYXRpb25cIiwganM6IFwiZGVzdGluYXRpb25cIiwgdHlwOiB1JDEodW5kZWZpbmVkLCByJDEoXCJNZXRhRGVzdGluYXRpb25cIikpIH0sXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInNvdXJjZVwiLCBqczogXCJzb3VyY2VcIiwgdHlwOiByJDEoXCJNZXRhU291cmNlXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlByaXZhdGVDaGFubmVsT25VbnN1YnNjcmliZUJyaWRnZVJlcXVlc3RQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJjaGFubmVsSWRcIiwganM6IFwiY2hhbm5lbElkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwiY29udGV4dFR5cGVcIiwganM6IFwiY29udGV4dFR5cGVcIiwgdHlwOiB1JDEobnVsbCwgXCJcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJSYWlzZUludGVudEFnZW50RXJyb3JSZXNwb25zZVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiUmFpc2VJbnRlbnRBZ2VudEVycm9yUmVzcG9uc2VNZXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiByJDEoXCJSYWlzZUludGVudEFnZW50RXJyb3JSZXNwb25zZVBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIlJhaXNlSW50ZW50QWdlbnRFcnJvclJlc3BvbnNlVHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlJhaXNlSW50ZW50QWdlbnRFcnJvclJlc3BvbnNlTWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJyZXNwb25zZVV1aWRcIiwganM6IFwicmVzcG9uc2VVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJSYWlzZUludGVudEFnZW50RXJyb3JSZXNwb25zZVBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImVycm9yXCIsIGpzOiBcImVycm9yXCIsIHR5cDogciQxKFwiRXJyb3JNZXNzYWdlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUmFpc2VJbnRlbnRBZ2VudFJlcXVlc3RcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIlJhaXNlSW50ZW50QWdlbnRSZXF1ZXN0TWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiUmFpc2VJbnRlbnRBZ2VudFJlcXVlc3RQYXlsb2FkXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByJDEoXCJSYWlzZUludGVudEFnZW50UmVxdWVzdFR5cGVcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJSYWlzZUludGVudEFnZW50UmVxdWVzdE1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImRlc3RpbmF0aW9uXCIsIGpzOiBcImRlc3RpbmF0aW9uXCIsIHR5cDogciQxKFwiTWV0YURlc3RpbmF0aW9uXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInNvdXJjZVwiLCBqczogXCJzb3VyY2VcIiwgdHlwOiByJDEoXCJTb3VyY2VPYmplY3RcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUmFpc2VJbnRlbnRBZ2VudFJlcXVlc3RQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJhcHBcIiwganM6IFwiYXBwXCIsIHR5cDogciQxKFwiQXBwRGVzdGluYXRpb25JZGVudGlmaWVyXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJjb250ZXh0XCIsIGpzOiBcImNvbnRleHRcIiwgdHlwOiByJDEoXCJDb250ZXh0RWxlbWVudFwiKSB9LFxuICAgICAgICB7IGpzb246IFwiaW50ZW50XCIsIGpzOiBcImludGVudFwiLCB0eXA6IFwiXCIgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJSYWlzZUludGVudEFnZW50UmVzcG9uc2VcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIlJhaXNlSW50ZW50QWdlbnRSZXNwb25zZU1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIlJhaXNlSW50ZW50QWdlbnRSZXNwb25zZVBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIlJhaXNlSW50ZW50QWdlbnRFcnJvclJlc3BvbnNlVHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlJhaXNlSW50ZW50QWdlbnRSZXNwb25zZU1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwicmVzcG9uc2VVdWlkXCIsIGpzOiBcInJlc3BvbnNlVXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUmFpc2VJbnRlbnRBZ2VudFJlc3BvbnNlUGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiaW50ZW50UmVzb2x1dGlvblwiLCBqczogXCJpbnRlbnRSZXNvbHV0aW9uXCIsIHR5cDogciQxKFwiSW50ZW50UmVzb2x1dGlvblwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkludGVudFJlc29sdXRpb25cIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImludGVudFwiLCBqczogXCJpbnRlbnRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJzb3VyY2VcIiwganM6IFwic291cmNlXCIsIHR5cDogciQxKFwiQXBwSWRlbnRpZmllclwiKSB9LFxuICAgICAgICB7IGpzb246IFwidmVyc2lvblwiLCBqczogXCJ2ZXJzaW9uXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJSYWlzZUludGVudEJyaWRnZUVycm9yUmVzcG9uc2VcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIlJhaXNlSW50ZW50QnJpZGdlRXJyb3JSZXNwb25zZU1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIlJhaXNlSW50ZW50QnJpZGdlRXJyb3JSZXNwb25zZVBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIlJhaXNlSW50ZW50QWdlbnRFcnJvclJlc3BvbnNlVHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlJhaXNlSW50ZW50QnJpZGdlRXJyb3JSZXNwb25zZU1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImVycm9yRGV0YWlsc1wiLCBqczogXCJlcnJvckRldGFpbHNcIiwgdHlwOiBhJDEociQxKFwiUmVzcG9uc2VFcnJvckRldGFpbFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcImVycm9yU291cmNlc1wiLCBqczogXCJlcnJvclNvdXJjZXNcIiwgdHlwOiBhJDEociQxKFwiRGVza3RvcEFnZW50SWRlbnRpZmllclwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwicmVzcG9uc2VVdWlkXCIsIGpzOiBcInJlc3BvbnNlVXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUmFpc2VJbnRlbnRCcmlkZ2VFcnJvclJlc3BvbnNlUGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZXJyb3JcIiwganM6IFwiZXJyb3JcIiwgdHlwOiByJDEoXCJFcnJvck1lc3NhZ2VcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJSYWlzZUludGVudEJyaWRnZVJlcXVlc3RcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIlJhaXNlSW50ZW50QnJpZGdlUmVxdWVzdE1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIlJhaXNlSW50ZW50QnJpZGdlUmVxdWVzdFBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIlJhaXNlSW50ZW50QWdlbnRSZXF1ZXN0VHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlJhaXNlSW50ZW50QnJpZGdlUmVxdWVzdE1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImRlc3RpbmF0aW9uXCIsIGpzOiBcImRlc3RpbmF0aW9uXCIsIHR5cDogciQxKFwiTWV0YURlc3RpbmF0aW9uXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInNvdXJjZVwiLCBqczogXCJzb3VyY2VcIiwgdHlwOiByJDEoXCJNZXRhU291cmNlXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlJhaXNlSW50ZW50QnJpZGdlUmVxdWVzdFBheWxvYWRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImFwcFwiLCBqczogXCJhcHBcIiwgdHlwOiByJDEoXCJBcHBEZXN0aW5hdGlvbklkZW50aWZpZXJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcImNvbnRleHRcIiwganM6IFwiY29udGV4dFwiLCB0eXA6IHIkMShcIkNvbnRleHRFbGVtZW50XCIpIH0sXG4gICAgICAgIHsganNvbjogXCJpbnRlbnRcIiwganM6IFwiaW50ZW50XCIsIHR5cDogXCJcIiB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlJhaXNlSW50ZW50QnJpZGdlUmVzcG9uc2VcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIlJhaXNlSW50ZW50QnJpZGdlUmVzcG9uc2VNZXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiByJDEoXCJSYWlzZUludGVudEJyaWRnZVJlc3BvbnNlUGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiUmFpc2VJbnRlbnRBZ2VudEVycm9yUmVzcG9uc2VUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUmFpc2VJbnRlbnRCcmlkZ2VSZXNwb25zZU1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImVycm9yRGV0YWlsc1wiLCBqczogXCJlcnJvckRldGFpbHNcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBhJDEociQxKFwiUmVzcG9uc2VFcnJvckRldGFpbFwiKSkpIH0sXG4gICAgICAgIHsganNvbjogXCJlcnJvclNvdXJjZXNcIiwganM6IFwiZXJyb3JTb3VyY2VzXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgYSQxKHIkMShcIkRlc2t0b3BBZ2VudElkZW50aWZpZXJcIikpKSB9LFxuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJyZXNwb25zZVV1aWRcIiwganM6IFwicmVzcG9uc2VVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwic291cmNlc1wiLCBqczogXCJzb3VyY2VzXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgYSQxKHIkMShcIkRlc2t0b3BBZ2VudElkZW50aWZpZXJcIikpKSB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJSYWlzZUludGVudEJyaWRnZVJlc3BvbnNlUGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiaW50ZW50UmVzb2x1dGlvblwiLCBqczogXCJpbnRlbnRSZXNvbHV0aW9uXCIsIHR5cDogciQxKFwiSW50ZW50UmVzb2x1dGlvblwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlJhaXNlSW50ZW50UmVzdWx0QWdlbnRFcnJvclJlc3BvbnNlXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJtZXRhXCIsIGpzOiBcIm1ldGFcIiwgdHlwOiByJDEoXCJSYWlzZUludGVudFJlc3VsdEFnZW50RXJyb3JSZXNwb25zZU1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIlJhaXNlSW50ZW50UmVzdWx0QWdlbnRFcnJvclJlc3BvbnNlUGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiUmFpc2VJbnRlbnRSZXN1bHRBZ2VudEVycm9yUmVzcG9uc2VUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUmFpc2VJbnRlbnRSZXN1bHRBZ2VudEVycm9yUmVzcG9uc2VNZXRhXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJyZXF1ZXN0VXVpZFwiLCBqczogXCJyZXF1ZXN0VXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInJlc3BvbnNlVXVpZFwiLCBqczogXCJyZXNwb25zZVV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lc3RhbXBcIiwganM6IFwidGltZXN0YW1wXCIsIHR5cDogRGF0ZSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlJhaXNlSW50ZW50UmVzdWx0QWdlbnRFcnJvclJlc3BvbnNlUGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZXJyb3JcIiwganM6IFwiZXJyb3JcIiwgdHlwOiByJDEoXCJSYWlzZUludGVudFJlc3VsdEVycm9yTWVzc2FnZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlJhaXNlSW50ZW50UmVzdWx0QWdlbnRSZXNwb25zZVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwibWV0YVwiLCBqczogXCJtZXRhXCIsIHR5cDogciQxKFwiUmFpc2VJbnRlbnRSZXN1bHRBZ2VudFJlc3BvbnNlTWV0YVwiKSB9LFxuICAgICAgICB7IGpzb246IFwicGF5bG9hZFwiLCBqczogXCJwYXlsb2FkXCIsIHR5cDogciQxKFwiUmFpc2VJbnRlbnRSZXN1bHRBZ2VudFJlc3BvbnNlUGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiUmFpc2VJbnRlbnRSZXN1bHRBZ2VudEVycm9yUmVzcG9uc2VUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUmFpc2VJbnRlbnRSZXN1bHRBZ2VudFJlc3BvbnNlTWV0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJyZXNwb25zZVV1aWRcIiwganM6IFwicmVzcG9uc2VVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJSYWlzZUludGVudFJlc3VsdEFnZW50UmVzcG9uc2VQYXlsb2FkXCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJpbnRlbnRSZXN1bHRcIiwganM6IFwiaW50ZW50UmVzdWx0XCIsIHR5cDogciQxKFwiSW50ZW50UmVzdWx0XCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiSW50ZW50UmVzdWx0XCI6IG8kMShbXG4gICAgICAgIHsganNvbjogXCJjb250ZXh0XCIsIGpzOiBcImNvbnRleHRcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCByJDEoXCJDb250ZXh0RWxlbWVudFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcImNoYW5uZWxcIiwganM6IFwiY2hhbm5lbFwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIHIkMShcIkNoYW5uZWxcIikpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiQ2hhbm5lbFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZGlzcGxheU1ldGFkYXRhXCIsIGpzOiBcImRpc3BsYXlNZXRhZGF0YVwiLCB0eXA6IHUkMSh1bmRlZmluZWQsIHIkMShcIkRpc3BsYXlNZXRhZGF0YVwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcImlkXCIsIGpzOiBcImlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiVHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkRpc3BsYXlNZXRhZGF0YVwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiY29sb3JcIiwganM6IFwiY29sb3JcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiZ2x5cGhcIiwganM6IFwiZ2x5cGhcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwibmFtZVwiLCBqczogXCJuYW1lXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJSYWlzZUludGVudFJlc3VsdEJyaWRnZUVycm9yUmVzcG9uc2VcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIlJhaXNlSW50ZW50UmVzdWx0QnJpZGdlRXJyb3JSZXNwb25zZU1ldGFcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInBheWxvYWRcIiwganM6IFwicGF5bG9hZFwiLCB0eXA6IHIkMShcIlJhaXNlSW50ZW50UmVzdWx0QnJpZGdlRXJyb3JSZXNwb25zZVBheWxvYWRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIkMShcIlJhaXNlSW50ZW50UmVzdWx0QWdlbnRFcnJvclJlc3BvbnNlVHlwZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlJhaXNlSW50ZW50UmVzdWx0QnJpZGdlRXJyb3JSZXNwb25zZU1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImVycm9yRGV0YWlsc1wiLCBqczogXCJlcnJvckRldGFpbHNcIiwgdHlwOiBhJDEociQxKFwiUmVzcG9uc2VFcnJvckRldGFpbFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcImVycm9yU291cmNlc1wiLCBqczogXCJlcnJvclNvdXJjZXNcIiwgdHlwOiBhJDEociQxKFwiRGVza3RvcEFnZW50SWRlbnRpZmllclwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInJlcXVlc3RVdWlkXCIsIGpzOiBcInJlcXVlc3RVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwicmVzcG9uc2VVdWlkXCIsIGpzOiBcInJlc3BvbnNlVXVpZFwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInRpbWVzdGFtcFwiLCBqczogXCJ0aW1lc3RhbXBcIiwgdHlwOiBEYXRlIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUmFpc2VJbnRlbnRSZXN1bHRCcmlkZ2VFcnJvclJlc3BvbnNlUGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiZXJyb3JcIiwganM6IFwiZXJyb3JcIiwgdHlwOiByJDEoXCJSYWlzZUludGVudFJlc3VsdEVycm9yTWVzc2FnZVwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIlJhaXNlSW50ZW50UmVzdWx0QnJpZGdlUmVzcG9uc2VcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcIm1ldGFcIiwganM6IFwibWV0YVwiLCB0eXA6IHIkMShcIlJhaXNlSW50ZW50UmVzdWx0QnJpZGdlUmVzcG9uc2VNZXRhXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXlsb2FkXCIsIGpzOiBcInBheWxvYWRcIiwgdHlwOiByJDEoXCJSYWlzZUludGVudFJlc3VsdEJyaWRnZVJlc3BvbnNlUGF5bG9hZFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogciQxKFwiUmFpc2VJbnRlbnRSZXN1bHRBZ2VudEVycm9yUmVzcG9uc2VUeXBlXCIpIH0sXG4gICAgXSwgZmFsc2UpLFxuICAgIFwiUmFpc2VJbnRlbnRSZXN1bHRCcmlkZ2VSZXNwb25zZU1ldGFcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImVycm9yRGV0YWlsc1wiLCBqczogXCJlcnJvckRldGFpbHNcIiwgdHlwOiB1JDEodW5kZWZpbmVkLCBhJDEociQxKFwiUmVzcG9uc2VFcnJvckRldGFpbFwiKSkpIH0sXG4gICAgICAgIHsganNvbjogXCJlcnJvclNvdXJjZXNcIiwganM6IFwiZXJyb3JTb3VyY2VzXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgYSQxKHIkMShcIkRlc2t0b3BBZ2VudElkZW50aWZpZXJcIikpKSB9LFxuICAgICAgICB7IGpzb246IFwicmVxdWVzdFV1aWRcIiwganM6IFwicmVxdWVzdFV1aWRcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJyZXNwb25zZVV1aWRcIiwganM6IFwicmVzcG9uc2VVdWlkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwic291cmNlc1wiLCBqczogXCJzb3VyY2VzXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgYSQxKHIkMShcIkRlc2t0b3BBZ2VudElkZW50aWZpZXJcIikpKSB9LFxuICAgICAgICB7IGpzb246IFwidGltZXN0YW1wXCIsIGpzOiBcInRpbWVzdGFtcFwiLCB0eXA6IERhdGUgfSxcbiAgICBdLCBmYWxzZSksXG4gICAgXCJSYWlzZUludGVudFJlc3VsdEJyaWRnZVJlc3BvbnNlUGF5bG9hZFwiOiBvJDEoW1xuICAgICAgICB7IGpzb246IFwiaW50ZW50UmVzdWx0XCIsIGpzOiBcImludGVudFJlc3VsdFwiLCB0eXA6IHIkMShcIkludGVudFJlc3VsdFwiKSB9LFxuICAgIF0sIGZhbHNlKSxcbiAgICBcIkNvbnRleHRcIjogbyQxKFtcbiAgICAgICAgeyBqc29uOiBcImlkXCIsIGpzOiBcImlkXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgbSQxKFwiYW55XCIpKSB9LFxuICAgICAgICB7IGpzb246IFwibmFtZVwiLCBqczogXCJuYW1lXCIsIHR5cDogdSQxKHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IFwiXCIgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIlJlc3BvbnNlRXJyb3JEZXRhaWxcIjogW1xuICAgICAgICBcIkFjY2Vzc0RlbmllZFwiLFxuICAgICAgICBcIkFnZW50RGlzY29ubmVjdGVkXCIsXG4gICAgICAgIFwiQXBwTm90Rm91bmRcIixcbiAgICAgICAgXCJBcHBUaW1lb3V0XCIsXG4gICAgICAgIFwiQ3JlYXRpb25GYWlsZWRcIixcbiAgICAgICAgXCJEZXNrdG9wQWdlbnROb3RGb3VuZFwiLFxuICAgICAgICBcIkVycm9yT25MYXVuY2hcIixcbiAgICAgICAgXCJJbnRlbnREZWxpdmVyeUZhaWxlZFwiLFxuICAgICAgICBcIkludGVudEhhbmRsZXJSZWplY3RlZFwiLFxuICAgICAgICBcIk1hbGZvcm1lZENvbnRleHRcIixcbiAgICAgICAgXCJNYWxmb3JtZWRNZXNzYWdlXCIsXG4gICAgICAgIFwiTm9BcHBzRm91bmRcIixcbiAgICAgICAgXCJOb0NoYW5uZWxGb3VuZFwiLFxuICAgICAgICBcIk5vUmVzdWx0UmV0dXJuZWRcIixcbiAgICAgICAgXCJOb3RDb25uZWN0ZWRUb0JyaWRnZVwiLFxuICAgICAgICBcIlJlc29sdmVyVGltZW91dFwiLFxuICAgICAgICBcIlJlc29sdmVyVW5hdmFpbGFibGVcIixcbiAgICAgICAgXCJSZXNwb25zZVRvQnJpZGdlVGltZWRPdXRcIixcbiAgICAgICAgXCJUYXJnZXRBcHBVbmF2YWlsYWJsZVwiLFxuICAgICAgICBcIlRhcmdldEluc3RhbmNlVW5hdmFpbGFibGVcIixcbiAgICAgICAgXCJVc2VyQ2FuY2VsbGVkUmVzb2x1dGlvblwiLFxuICAgIF0sXG4gICAgXCJSZXNwb25zZU1lc3NhZ2VUeXBlXCI6IFtcbiAgICAgICAgXCJmaW5kSW5zdGFuY2VzUmVzcG9uc2VcIixcbiAgICAgICAgXCJmaW5kSW50ZW50UmVzcG9uc2VcIixcbiAgICAgICAgXCJmaW5kSW50ZW50c0J5Q29udGV4dFJlc3BvbnNlXCIsXG4gICAgICAgIFwiZ2V0QXBwTWV0YWRhdGFSZXNwb25zZVwiLFxuICAgICAgICBcIm9wZW5SZXNwb25zZVwiLFxuICAgICAgICBcInJhaXNlSW50ZW50UmVzcG9uc2VcIixcbiAgICAgICAgXCJyYWlzZUludGVudFJlc3VsdFJlc3BvbnNlXCIsXG4gICAgXSxcbiAgICBcIlJlcXVlc3RNZXNzYWdlVHlwZVwiOiBbXG4gICAgICAgIFwiYnJvYWRjYXN0UmVxdWVzdFwiLFxuICAgICAgICBcImZpbmRJbnN0YW5jZXNSZXF1ZXN0XCIsXG4gICAgICAgIFwiZmluZEludGVudFJlcXVlc3RcIixcbiAgICAgICAgXCJmaW5kSW50ZW50c0J5Q29udGV4dFJlcXVlc3RcIixcbiAgICAgICAgXCJnZXRBcHBNZXRhZGF0YVJlcXVlc3RcIixcbiAgICAgICAgXCJvcGVuUmVxdWVzdFwiLFxuICAgICAgICBcIlByaXZhdGVDaGFubmVsLmJyb2FkY2FzdFwiLFxuICAgICAgICBcIlByaXZhdGVDaGFubmVsLmV2ZW50TGlzdGVuZXJBZGRlZFwiLFxuICAgICAgICBcIlByaXZhdGVDaGFubmVsLmV2ZW50TGlzdGVuZXJSZW1vdmVkXCIsXG4gICAgICAgIFwiUHJpdmF0ZUNoYW5uZWwub25BZGRDb250ZXh0TGlzdGVuZXJcIixcbiAgICAgICAgXCJQcml2YXRlQ2hhbm5lbC5vbkRpc2Nvbm5lY3RcIixcbiAgICAgICAgXCJQcml2YXRlQ2hhbm5lbC5vblVuc3Vic2NyaWJlXCIsXG4gICAgICAgIFwicmFpc2VJbnRlbnRSZXF1ZXN0XCIsXG4gICAgXSxcbiAgICBcIkJyb2FkY2FzdEFnZW50UmVxdWVzdFR5cGVcIjogW1xuICAgICAgICBcImJyb2FkY2FzdFJlcXVlc3RcIixcbiAgICBdLFxuICAgIFwiQ29ubmVjdGlvblN0ZXBNZXNzYWdlVHlwZVwiOiBbXG4gICAgICAgIFwiYXV0aGVudGljYXRpb25GYWlsZWRcIixcbiAgICAgICAgXCJjb25uZWN0ZWRBZ2VudHNVcGRhdGVcIixcbiAgICAgICAgXCJoYW5kc2hha2VcIixcbiAgICAgICAgXCJoZWxsb1wiLFxuICAgIF0sXG4gICAgXCJDb25uZWN0aW9uU3RlcDJIZWxsb1R5cGVcIjogW1xuICAgICAgICBcImhlbGxvXCIsXG4gICAgXSxcbiAgICBcIkNvbm5lY3Rpb25TdGVwM0hhbmRzaGFrZVR5cGVcIjogW1xuICAgICAgICBcImhhbmRzaGFrZVwiLFxuICAgIF0sXG4gICAgXCJDb25uZWN0aW9uU3RlcDRBdXRoZW50aWNhdGlvbkZhaWxlZFR5cGVcIjogW1xuICAgICAgICBcImF1dGhlbnRpY2F0aW9uRmFpbGVkXCIsXG4gICAgXSxcbiAgICBcIkNvbm5lY3Rpb25TdGVwNkNvbm5lY3RlZEFnZW50c1VwZGF0ZVR5cGVcIjogW1xuICAgICAgICBcImNvbm5lY3RlZEFnZW50c1VwZGF0ZVwiLFxuICAgIF0sXG4gICAgXCJFcnJvck1lc3NhZ2VcIjogW1xuICAgICAgICBcIkFnZW50RGlzY29ubmVjdGVkXCIsXG4gICAgICAgIFwiRGVza3RvcEFnZW50Tm90Rm91bmRcIixcbiAgICAgICAgXCJJbnRlbnREZWxpdmVyeUZhaWxlZFwiLFxuICAgICAgICBcIk1hbGZvcm1lZENvbnRleHRcIixcbiAgICAgICAgXCJNYWxmb3JtZWRNZXNzYWdlXCIsXG4gICAgICAgIFwiTm9BcHBzRm91bmRcIixcbiAgICAgICAgXCJOb3RDb25uZWN0ZWRUb0JyaWRnZVwiLFxuICAgICAgICBcIlJlc29sdmVyVGltZW91dFwiLFxuICAgICAgICBcIlJlc29sdmVyVW5hdmFpbGFibGVcIixcbiAgICAgICAgXCJSZXNwb25zZVRvQnJpZGdlVGltZWRPdXRcIixcbiAgICAgICAgXCJUYXJnZXRBcHBVbmF2YWlsYWJsZVwiLFxuICAgICAgICBcIlRhcmdldEluc3RhbmNlVW5hdmFpbGFibGVcIixcbiAgICAgICAgXCJVc2VyQ2FuY2VsbGVkUmVzb2x1dGlvblwiLFxuICAgIF0sXG4gICAgXCJGaW5kSW5zdGFuY2VzQWdlbnRFcnJvclJlc3BvbnNlVHlwZVwiOiBbXG4gICAgICAgIFwiZmluZEluc3RhbmNlc1Jlc3BvbnNlXCIsXG4gICAgXSxcbiAgICBcIkZpbmRJbnN0YW5jZXNBZ2VudFJlcXVlc3RUeXBlXCI6IFtcbiAgICAgICAgXCJmaW5kSW5zdGFuY2VzUmVxdWVzdFwiLFxuICAgIF0sXG4gICAgXCJGaW5kSW50ZW50QWdlbnRFcnJvclJlc3BvbnNlVHlwZVwiOiBbXG4gICAgICAgIFwiZmluZEludGVudFJlc3BvbnNlXCIsXG4gICAgXSxcbiAgICBcIkZpbmRJbnRlbnRBZ2VudFJlcXVlc3RUeXBlXCI6IFtcbiAgICAgICAgXCJmaW5kSW50ZW50UmVxdWVzdFwiLFxuICAgIF0sXG4gICAgXCJGaW5kSW50ZW50c0J5Q29udGV4dEFnZW50RXJyb3JSZXNwb25zZVR5cGVcIjogW1xuICAgICAgICBcImZpbmRJbnRlbnRzQnlDb250ZXh0UmVzcG9uc2VcIixcbiAgICBdLFxuICAgIFwiRmluZEludGVudHNCeUNvbnRleHRBZ2VudFJlcXVlc3RUeXBlXCI6IFtcbiAgICAgICAgXCJmaW5kSW50ZW50c0J5Q29udGV4dFJlcXVlc3RcIixcbiAgICBdLFxuICAgIFwiR2V0QXBwTWV0YWRhdGFBZ2VudEVycm9yUmVzcG9uc2VUeXBlXCI6IFtcbiAgICAgICAgXCJnZXRBcHBNZXRhZGF0YVJlc3BvbnNlXCIsXG4gICAgXSxcbiAgICBcIkdldEFwcE1ldGFkYXRhQWdlbnRSZXF1ZXN0VHlwZVwiOiBbXG4gICAgICAgIFwiZ2V0QXBwTWV0YWRhdGFSZXF1ZXN0XCIsXG4gICAgXSxcbiAgICBcIk9wZW5FcnJvck1lc3NhZ2VcIjogW1xuICAgICAgICBcIkFnZW50RGlzY29ubmVjdGVkXCIsXG4gICAgICAgIFwiQXBwTm90Rm91bmRcIixcbiAgICAgICAgXCJBcHBUaW1lb3V0XCIsXG4gICAgICAgIFwiRGVza3RvcEFnZW50Tm90Rm91bmRcIixcbiAgICAgICAgXCJFcnJvck9uTGF1bmNoXCIsXG4gICAgICAgIFwiTWFsZm9ybWVkQ29udGV4dFwiLFxuICAgICAgICBcIk1hbGZvcm1lZE1lc3NhZ2VcIixcbiAgICAgICAgXCJOb3RDb25uZWN0ZWRUb0JyaWRnZVwiLFxuICAgICAgICBcIlJlc29sdmVyVW5hdmFpbGFibGVcIixcbiAgICAgICAgXCJSZXNwb25zZVRvQnJpZGdlVGltZWRPdXRcIixcbiAgICBdLFxuICAgIFwiT3BlbkFnZW50RXJyb3JSZXNwb25zZVR5cGVcIjogW1xuICAgICAgICBcIm9wZW5SZXNwb25zZVwiLFxuICAgIF0sXG4gICAgXCJPcGVuQWdlbnRSZXF1ZXN0VHlwZVwiOiBbXG4gICAgICAgIFwib3BlblJlcXVlc3RcIixcbiAgICBdLFxuICAgIFwiUHJpdmF0ZUNoYW5uZWxCcm9hZGNhc3RBZ2VudFJlcXVlc3RUeXBlXCI6IFtcbiAgICAgICAgXCJQcml2YXRlQ2hhbm5lbC5icm9hZGNhc3RcIixcbiAgICBdLFxuICAgIFwiUHJpdmF0ZUNoYW5uZWxFdmVudExpc3RlbmVyVHlwZXNcIjogW1xuICAgICAgICBcIm9uQWRkQ29udGV4dExpc3RlbmVyXCIsXG4gICAgICAgIFwib25EaXNjb25uZWN0XCIsXG4gICAgICAgIFwib25VbnN1YnNjcmliZVwiLFxuICAgIF0sXG4gICAgXCJQcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJBZGRlZEFnZW50UmVxdWVzdFR5cGVcIjogW1xuICAgICAgICBcIlByaXZhdGVDaGFubmVsLmV2ZW50TGlzdGVuZXJBZGRlZFwiLFxuICAgIF0sXG4gICAgXCJQcml2YXRlQ2hhbm5lbEV2ZW50TGlzdGVuZXJSZW1vdmVkQWdlbnRSZXF1ZXN0VHlwZVwiOiBbXG4gICAgICAgIFwiUHJpdmF0ZUNoYW5uZWwuZXZlbnRMaXN0ZW5lclJlbW92ZWRcIixcbiAgICBdLFxuICAgIFwiUHJpdmF0ZUNoYW5uZWxPbkFkZENvbnRleHRMaXN0ZW5lckFnZW50UmVxdWVzdFR5cGVcIjogW1xuICAgICAgICBcIlByaXZhdGVDaGFubmVsLm9uQWRkQ29udGV4dExpc3RlbmVyXCIsXG4gICAgXSxcbiAgICBcIlByaXZhdGVDaGFubmVsT25EaXNjb25uZWN0QWdlbnRSZXF1ZXN0VHlwZVwiOiBbXG4gICAgICAgIFwiUHJpdmF0ZUNoYW5uZWwub25EaXNjb25uZWN0XCIsXG4gICAgXSxcbiAgICBcIlByaXZhdGVDaGFubmVsT25VbnN1YnNjcmliZUFnZW50UmVxdWVzdFR5cGVcIjogW1xuICAgICAgICBcIlByaXZhdGVDaGFubmVsLm9uVW5zdWJzY3JpYmVcIixcbiAgICBdLFxuICAgIFwiUmFpc2VJbnRlbnRBZ2VudEVycm9yUmVzcG9uc2VUeXBlXCI6IFtcbiAgICAgICAgXCJyYWlzZUludGVudFJlc3BvbnNlXCIsXG4gICAgXSxcbiAgICBcIlJhaXNlSW50ZW50QWdlbnRSZXF1ZXN0VHlwZVwiOiBbXG4gICAgICAgIFwicmFpc2VJbnRlbnRSZXF1ZXN0XCIsXG4gICAgXSxcbiAgICBcIlJhaXNlSW50ZW50UmVzdWx0RXJyb3JNZXNzYWdlXCI6IFtcbiAgICAgICAgXCJBZ2VudERpc2Nvbm5lY3RlZFwiLFxuICAgICAgICBcIkludGVudEhhbmRsZXJSZWplY3RlZFwiLFxuICAgICAgICBcIk1hbGZvcm1lZE1lc3NhZ2VcIixcbiAgICAgICAgXCJOb1Jlc3VsdFJldHVybmVkXCIsXG4gICAgICAgIFwiTm90Q29ubmVjdGVkVG9CcmlkZ2VcIixcbiAgICAgICAgXCJSZXNwb25zZVRvQnJpZGdlVGltZWRPdXRcIixcbiAgICBdLFxuICAgIFwiUmFpc2VJbnRlbnRSZXN1bHRBZ2VudEVycm9yUmVzcG9uc2VUeXBlXCI6IFtcbiAgICAgICAgXCJyYWlzZUludGVudFJlc3VsdFJlc3BvbnNlXCIsXG4gICAgXSxcbiAgICBcIlR5cGVcIjogW1xuICAgICAgICBcImFwcFwiLFxuICAgICAgICBcInByaXZhdGVcIixcbiAgICAgICAgXCJ1c2VyXCIsXG4gICAgXVxufTtcblxudmFyIEJyaWRnaW5nVHlwZXMgPSB7XG4gICAgX19wcm90b19fOiBudWxsLFxuICAgIENvbnZlcnQ6IENvbnZlcnQkMVxufTtcblxuLyoqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICogQ29weXJpZ2h0IEZJTk9TIEZEQzMgY29udHJpYnV0b3JzIC0gc2VlIE5PVElDRSBmaWxlXG4gKi9cbi8qKiBDb25zdGFudHMgcmVwcmVzZW50aW5nIHRoZSBlcnJvcnMgdGhhdCBjYW4gYmUgZW5jb3VudGVyZWQgd2hlbiBjYWxsaW5nIHRoZSBgb3BlbmAgbWV0aG9kIG9uIHRoZSBEZXNrdG9wQWdlbnQgb2JqZWN0IChgZmRjM2ApLiAqL1xudmFyIE9wZW5FcnJvcjtcbihmdW5jdGlvbiAoT3BlbkVycm9yKSB7XG4gICAgLyoqIFJldHVybmVkIGlmIHRoZSBzcGVjaWZpZWQgYXBwbGljYXRpb24gaXMgbm90IGZvdW5kLiovXG4gICAgT3BlbkVycm9yW1wiQXBwTm90Rm91bmRcIl0gPSBcIkFwcE5vdEZvdW5kXCI7XG4gICAgLyoqIFJldHVybmVkIGlmIHRoZSBzcGVjaWZpZWQgYXBwbGljYXRpb24gZmFpbHMgdG8gbGF1bmNoIGNvcnJlY3RseS4qL1xuICAgIE9wZW5FcnJvcltcIkVycm9yT25MYXVuY2hcIl0gPSBcIkVycm9yT25MYXVuY2hcIjtcbiAgICAvKiogUmV0dXJuZWQgaWYgdGhlIHNwZWNpZmllZCBhcHBsaWNhdGlvbiBsYXVuY2hlcyBidXQgZmFpbHMgdG8gYWRkIGEgY29udGV4dCBsaXN0ZW5lciBpbiBvcmRlciB0byByZWNlaXZlIHRoZSBjb250ZXh0IHBhc3NlZCB0byB0aGUgYGZkYzMub3BlbmAgY2FsbC4qL1xuICAgIE9wZW5FcnJvcltcIkFwcFRpbWVvdXRcIl0gPSBcIkFwcFRpbWVvdXRcIjtcbiAgICAvKiogUmV0dXJuZWQgaWYgdGhlIEZEQzMgZGVza3RvcCBhZ2VudCBpbXBsZW1lbnRhdGlvbiBpcyBub3QgY3VycmVudGx5IGFibGUgdG8gaGFuZGxlIHRoZSByZXF1ZXN0LiovXG4gICAgT3BlbkVycm9yW1wiUmVzb2x2ZXJVbmF2YWlsYWJsZVwiXSA9IFwiUmVzb2x2ZXJVbmF2YWlsYWJsZVwiO1xuICAgIC8qKiBSZXR1cm5lZCBpZiBhIGNhbGwgdG8gdGhlIGBvcGVuYCBmdW5jdGlvbiBpcyBtYWRlIHdpdGggYW4gaW52YWxpZCBjb250ZXh0IGFyZ3VtZW50LiBDb250ZXh0cyBzaG91bGQgYmUgT2JqZWN0cyB3aXRoIGF0IGxlYXN0IGEgYHR5cGVgIGZpZWxkIHRoYXQgaGFzIGEgYHN0cmluZ2AgdmFsdWUuKi9cbiAgICBPcGVuRXJyb3JbXCJNYWxmb3JtZWRDb250ZXh0XCJdID0gXCJNYWxmb3JtZWRDb250ZXh0XCI7XG4gICAgLyoqIEBleHBlcmltZW50YWwgUmV0dXJuZWQgaWYgdGhlIHNwZWNpZmllZCBEZXNrdG9wIEFnZW50IGlzIG5vdCBmb3VuZCwgdmlhIGEgY29ubmVjdGVkIERlc2t0b3AgQWdlbnQgQnJpZGdlLiovXG4gICAgT3BlbkVycm9yW1wiRGVza3RvcEFnZW50Tm90Rm91bmRcIl0gPSBcIkRlc2t0b3BBZ2VudE5vdEZvdW5kXCI7XG59KShPcGVuRXJyb3IgfHwgKE9wZW5FcnJvciA9IHt9KSk7XG4vKiogQ29uc3RhbnRzIHJlcHJlc2VudGluZyB0aGUgZXJyb3JzIHRoYXQgY2FuIGJlIGVuY291bnRlcmVkIHdoZW4gY2FsbGluZyB0aGUgYGZpbmRJbnRlbnRgLCBgZmluZEludGVudHNCeUNvbnRleHRgLCBgcmFpc2VJbnRlbnRgIG9yIGByYWlzZUludGVudEZvckNvbnRleHRgIG1ldGhvZHMgb24gdGhlIERlc2t0b3BBZ2VudCAoYGZkYzNgKS4gKi9cbnZhciBSZXNvbHZlRXJyb3I7XG4oZnVuY3Rpb24gKFJlc29sdmVFcnJvcikge1xuICAgIC8qKiBTSE9VTEQgYmUgcmV0dXJuZWQgaWYgbm8gYXBwcyBhcmUgYXZhaWxhYmxlIHRoYXQgY2FuIHJlc29sdmUgdGhlIGludGVudCBhbmQgY29udGV4dCBjb21iaW5hdGlvbi4qL1xuICAgIFJlc29sdmVFcnJvcltcIk5vQXBwc0ZvdW5kXCJdID0gXCJOb0FwcHNGb3VuZFwiO1xuICAgIC8qKiBSZXR1cm5lZCBpZiB0aGUgRkRDMyBkZXNrdG9wIGFnZW50IGltcGxlbWVudGF0aW9uIGlzIG5vdCBjdXJyZW50bHkgYWJsZSB0byBoYW5kbGUgdGhlIHJlcXVlc3QuKi9cbiAgICBSZXNvbHZlRXJyb3JbXCJSZXNvbHZlclVuYXZhaWxhYmxlXCJdID0gXCJSZXNvbHZlclVuYXZhaWxhYmxlXCI7XG4gICAgLyoqIFJldHVybmVkIGlmIHRoZSB1c2VyIGNhbmNlbGxlZCB0aGUgcmVzb2x1dGlvbiByZXF1ZXN0LCBmb3IgZXhhbXBsZSBieSBjbG9zaW5nIG9yIGNhbmNlbGxpbmcgYSByZXNvbHZlciBVSS4qL1xuICAgIFJlc29sdmVFcnJvcltcIlVzZXJDYW5jZWxsZWRcIl0gPSBcIlVzZXJDYW5jZWxsZWRSZXNvbHV0aW9uXCI7XG4gICAgLyoqIFNIT1VMRCBiZSByZXR1cm5lZCBpZiBhIHRpbWVvdXQgY2FuY2VscyBhbiBpbnRlbnQgcmVzb2x1dGlvbiB0aGF0IHJlcXVpcmVkIHVzZXIgaW50ZXJhY3Rpb24uIFBsZWFzZSB1c2UgYFJlc29sdmVyVW5hdmFpbGFibGVgIGluc3RlYWQgZm9yIHNpdHVhdGlvbnMgd2hlcmUgYSByZXNvbHZlciBVSSBvciBzaW1pbGFyIGZhaWxzLiovXG4gICAgUmVzb2x2ZUVycm9yW1wiUmVzb2x2ZXJUaW1lb3V0XCJdID0gXCJSZXNvbHZlclRpbWVvdXRcIjtcbiAgICAvKiogUmV0dXJuZWQgaWYgYSBzcGVjaWZpZWQgdGFyZ2V0IGFwcGxpY2F0aW9uIGlzIG5vdCBhdmFpbGFibGUgb3IgYSBuZXcgaW5zdGFuY2Ugb2YgaXQgY2Fubm90IGJlIG9wZW5lZC4gKi9cbiAgICBSZXNvbHZlRXJyb3JbXCJUYXJnZXRBcHBVbmF2YWlsYWJsZVwiXSA9IFwiVGFyZ2V0QXBwVW5hdmFpbGFibGVcIjtcbiAgICAvKiogUmV0dXJuZWQgaWYgYSBzcGVjaWZpZWQgdGFyZ2V0IGFwcGxpY2F0aW9uIGluc3RhbmNlIGlzIG5vdCBhdmFpbGFibGUsIGZvciBleGFtcGxlIGJlY2F1c2UgaXQgaGFzIGJlZW4gY2xvc2VkLiAqL1xuICAgIFJlc29sdmVFcnJvcltcIlRhcmdldEluc3RhbmNlVW5hdmFpbGFibGVcIl0gPSBcIlRhcmdldEluc3RhbmNlVW5hdmFpbGFibGVcIjtcbiAgICAvKiogUmV0dXJuZWQgaWYgdGhlIGludGVudCBhbmQgY29udGV4dCBjb3VsZCBub3QgYmUgZGVsaXZlcmVkIHRvIHRoZSBzZWxlY3RlZCBhcHBsaWNhdGlvbiBvciBpbnN0YW5jZSwgZm9yIGV4YW1wbGUgYmVjYXVzZSBpdCBoYXMgbm90IGFkZGVkIGFuIGludGVudCBoYW5kbGVyIHdpdGhpbiBhIHRpbWVvdXQuKi9cbiAgICBSZXNvbHZlRXJyb3JbXCJJbnRlbnREZWxpdmVyeUZhaWxlZFwiXSA9IFwiSW50ZW50RGVsaXZlcnlGYWlsZWRcIjtcbiAgICAvKiogUmV0dXJuZWQgaWYgYSBjYWxsIHRvIG9uZSBvZiB0aGUgYHJhaXNlSW50ZW50YCBmdW5jdGlvbnMgaXMgbWFkZSB3aXRoIGFuIGludmFsaWQgY29udGV4dCBhcmd1bWVudC4gQ29udGV4dHMgc2hvdWxkIGJlIE9iamVjdHMgd2l0aCBhdCBsZWFzdCBhIGB0eXBlYCBmaWVsZCB0aGF0IGhhcyBhIGBzdHJpbmdgIHZhbHVlLiovXG4gICAgUmVzb2x2ZUVycm9yW1wiTWFsZm9ybWVkQ29udGV4dFwiXSA9IFwiTWFsZm9ybWVkQ29udGV4dFwiO1xuICAgIC8qKiBAZXhwZXJpbWVudGFsIFJldHVybmVkIGlmIHRoZSBzcGVjaWZpZWQgRGVza3RvcCBBZ2VudCBpcyBub3QgZm91bmQsIHZpYSBhIGNvbm5lY3RlZCBEZXNrdG9wIEFnZW50IEJyaWRnZS4qL1xuICAgIFJlc29sdmVFcnJvcltcIkRlc2t0b3BBZ2VudE5vdEZvdW5kXCJdID0gXCJEZXNrdG9wQWdlbnROb3RGb3VuZFwiO1xufSkoUmVzb2x2ZUVycm9yIHx8IChSZXNvbHZlRXJyb3IgPSB7fSkpO1xudmFyIFJlc3VsdEVycm9yO1xuKGZ1bmN0aW9uIChSZXN1bHRFcnJvcikge1xuICAgIC8qKiBSZXR1cm5lZCBpZiB0aGUgaW50ZW50IGhhbmRsZXIgZXhpdGVkIHdpdGhvdXQgcmV0dXJuaW5nIGEgdmFsaWQgcmVzdWx0IChhIHByb21pc2UgcmVzb2x2aW5nIHRvIGEgQ29udGV4dCwgQ2hhbm5lbCBvYmplY3Qgb3Igdm9pZCkuICovXG4gICAgUmVzdWx0RXJyb3JbXCJOb1Jlc3VsdFJldHVybmVkXCJdID0gXCJOb1Jlc3VsdFJldHVybmVkXCI7XG4gICAgLyoqIFJldHVybmVkIGlmIHRoZSBJbnRlbnQgaGFuZGxlciBmdW5jdGlvbiBwcm9jZXNzaW5nIHRoZSByYWlzZWQgaW50ZW50IHRocm93cyBhbiBlcnJvciBvciByZWplY3RzIHRoZSBQcm9taXNlIGl0IHJldHVybmVkLiAqL1xuICAgIFJlc3VsdEVycm9yW1wiSW50ZW50SGFuZGxlclJlamVjdGVkXCJdID0gXCJJbnRlbnRIYW5kbGVyUmVqZWN0ZWRcIjtcbn0pKFJlc3VsdEVycm9yIHx8IChSZXN1bHRFcnJvciA9IHt9KSk7XG52YXIgQ2hhbm5lbEVycm9yO1xuKGZ1bmN0aW9uIChDaGFubmVsRXJyb3IpIHtcbiAgICAvKiogUmV0dXJuZWQgaWYgdGhlIHNwZWNpZmllZCBjaGFubmVsIGlzIG5vdCBmb3VuZCB3aGVuIGF0dGVtcHRpbmcgdG8gam9pbiBhIGNoYW5uZWwgdmlhIHRoZSBgam9pblVzZXJDaGFubmVsYCBmdW5jdGlvbiAgb2YgdGhlIERlc2t0b3BBZ2VudCAoYGZkYzNgKS4qL1xuICAgIENoYW5uZWxFcnJvcltcIk5vQ2hhbm5lbEZvdW5kXCJdID0gXCJOb0NoYW5uZWxGb3VuZFwiO1xuICAgIC8qKiBTSE9VTEQgYmUgcmV0dXJuZWQgd2hlbiBhIHJlcXVlc3QgdG8gam9pbiBhIHVzZXIgY2hhbm5lbCBvciB0byBhIHJldHJpZXZlIGEgQ2hhbm5lbCBvYmplY3QgdmlhIHRoZSBgam9pblVzZXJDaGFubmVsYCBvciBgZ2V0T3JDcmVhdGVDaGFubmVsYCBtZXRob2RzIG9mIHRoZSBEZXNrdG9wQWdlbnQgKGBmZGMzYCkgb2JqZWN0IGlzIGRlbmllZC4gKi9cbiAgICBDaGFubmVsRXJyb3JbXCJBY2Nlc3NEZW5pZWRcIl0gPSBcIkFjY2Vzc0RlbmllZFwiO1xuICAgIC8qKiBTSE9VTEQgYmUgcmV0dXJuZWQgd2hlbiBhIGNoYW5uZWwgY2Fubm90IGJlIGNyZWF0ZWQgb3IgcmV0cmlldmVkIHZpYSB0aGUgYGdldE9yQ3JlYXRlQ2hhbm5lbGAgbWV0aG9kIG9mIHRoZSBEZXNrdG9wQWdlbnQgKGBmZGMzYCkuKi9cbiAgICBDaGFubmVsRXJyb3JbXCJDcmVhdGlvbkZhaWxlZFwiXSA9IFwiQ3JlYXRpb25GYWlsZWRcIjtcbiAgICAvKiogUmV0dXJuZWQgaWYgYSBjYWxsIHRvIHRoZSBgYnJvYWRjYXN0YCBmdW5jdGlvbnMgaXMgbWFkZSB3aXRoIGFuIGludmFsaWQgY29udGV4dCBhcmd1bWVudC4gQ29udGV4dHMgc2hvdWxkIGJlIE9iamVjdHMgd2l0aCBhdCBsZWFzdCBhIGB0eXBlYCBmaWVsZCB0aGF0IGhhcyBhIGBzdHJpbmdgIHZhbHVlLiovXG4gICAgQ2hhbm5lbEVycm9yW1wiTWFsZm9ybWVkQ29udGV4dFwiXSA9IFwiTWFsZm9ybWVkQ29udGV4dFwiO1xufSkoQ2hhbm5lbEVycm9yIHx8IChDaGFubmVsRXJyb3IgPSB7fSkpO1xudmFyIEJyaWRnaW5nRXJyb3I7XG4oZnVuY3Rpb24gKEJyaWRnaW5nRXJyb3IpIHtcbiAgICAvKiogQGV4cGVyaW1lbnRhbCBSZXR1cm5lZCBpZiBhIERlc2t0b3AgQWdlbnQgZGlkIG5vdCByZXR1cm4gYSByZXNwb25zZSwgdmlhIERlc2t0b3AgQWdlbnQgQnJpZGdpbmcsIHdpdGhpbiB0aGUgYWxsb3RlZCB0aW1lb3V0LiAqL1xuICAgIEJyaWRnaW5nRXJyb3JbXCJSZXNwb25zZVRpbWVkT3V0XCJdID0gXCJSZXNwb25zZVRvQnJpZGdlVGltZWRPdXRcIjtcbiAgICAvKiogQGV4cGVyaW1lbnRhbCBSZXR1cm5lZCBpZiBhIERlc2t0b3AgQWdlbnQgdGhhdCBoYXMgYmVlbiB0YXJnZXRlZCBieSBhIHBhcnRpY3VsYXIgcmVxdWVzdCBoYXMgYmVlbiBkaXNjb25uZWN0ZWQgZnJvbSB0aGUgQnJpZGdlIGJlZm9yZSBhIHJlc3BvbnNlIGhhcyBiZWVuIHJlY2VpdmVkIGZyb20gaXQuICovXG4gICAgQnJpZGdpbmdFcnJvcltcIkFnZW50RGlzY29ubmVjdGVkXCJdID0gXCJBZ2VudERpc2Nvbm5lY3RlZFwiO1xuICAgIC8qKiBAZXhwZXJpbWVudGFsIFJldHVybmVkIGZvciBGREMzIEFQSSBjYWxscyB0aGF0IGFyZSBzcGVjaWZpZWQgd2l0aCBhcmd1bWVudHMgaW5kaWNhdGluZyB0aGF0IGEgcmVtb3RlIERlc2t0b3AgYWdlbnQgc2hvdWxkIGJlIHRhcmdldGVkIChlLmcuIHJhaXNlSW50ZW50IHdpdGggYW4gYXBwIG9uIGEgcmVtb3RlIERlc2t0b3BBZ2VudCB0YXJnZXRlZCksIHdoZW4gdGhlIGxvY2FsIERlc2t0b3AgQWdlbnQgaXMgbm90IGNvbm5lY3RlZCB0byBhIGJyaWRnZS4gKi9cbiAgICBCcmlkZ2luZ0Vycm9yW1wiTm90Q29ubmVjdGVkVG9CcmlkZ2VcIl0gPSBcIk5vdENvbm5lY3RlZFRvQnJpZGdlXCI7XG4gICAgLyoqIEBleHBlcmltZW50YWwgUmV0dXJuZWQgaWYgYSBtZXNzYWdlIHRvIGEgQnJpZGdlIGRldmlhdGVzIGZyb20gdGhlIHNjaGVtYSBmb3IgdGhhdCBtZXNzYWdlIHN1ZmZpY2llbnRseSB0aGF0IGl0IGNvdWxkIG5vdCBiZSBwcm9jZXNzZWQuICovXG4gICAgQnJpZGdpbmdFcnJvcltcIk1hbGZvcm1lZE1lc3NhZ2VcIl0gPSBcIk1hbGZvcm1lZE1lc3NhZ2VcIjtcbn0pKEJyaWRnaW5nRXJyb3IgfHwgKEJyaWRnaW5nRXJyb3IgPSB7fSkpO1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UsIFN1cHByZXNzZWRFcnJvciwgU3ltYm9sICovXHJcblxyXG5cclxuZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxudHlwZW9mIFN1cHByZXNzZWRFcnJvciA9PT0gXCJmdW5jdGlvblwiID8gU3VwcHJlc3NlZEVycm9yIDogZnVuY3Rpb24gKGVycm9yLCBzdXBwcmVzc2VkLCBtZXNzYWdlKSB7XHJcbiAgICB2YXIgZSA9IG5ldyBFcnJvcihtZXNzYWdlKTtcclxuICAgIHJldHVybiBlLm5hbWUgPSBcIlN1cHByZXNzZWRFcnJvclwiLCBlLmVycm9yID0gZXJyb3IsIGUuc3VwcHJlc3NlZCA9IHN1cHByZXNzZWQsIGU7XHJcbn07XG5cbi8qKlxuICogRW5zdXJlcyBhdCBjb21waWxlIHRpbWUgdGhhdCB0aGUgZ2l2ZW4gc3RyaW5nIHR1cGxlIGlzIGV4aGF1c3RpdmUgb24gYSBnaXZlbiB1bmlvbiB0eXBlLCBpLmUuIGNvbnRhaW5zIEFMTCBwb3NzaWJsZSB2YWx1ZXMgb2YgdGhlIGdpdmVuIFVOSU9OX1RZUEUuXG4gKi9cbnZhciBleGhhdXN0aXZlU3RyaW5nVHVwbGUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHR1cGxlID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdHVwbGVbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgcmV0dXJuIHR1cGxlO1xufTsgfTtcblxudmFyIFNUQU5EQVJEX0NPTlRFWFRfVFlQRVMgPSBleGhhdXN0aXZlU3RyaW5nVHVwbGUoKSgnZmRjMy5hY3Rpb24nLCAnZmRjMy5jaGFydCcsICdmZGMzLmNoYXQuaW5pdFNldHRpbmdzJywgJ2ZkYzMuY2hhdC5tZXNzYWdlJywgJ2ZkYzMuY2hhdC5yb29tJywgJ2ZkYzMuY2hhdC5zZWFyY2hDcml0ZXJpYScsICdmZGMzLmNvbnRhY3QnLCAnZmRjMy5jb250YWN0TGlzdCcsICdmZGMzLmNvdW50cnknLCAnZmRjMy5jdXJyZW5jeScsICdmZGMzLmVtYWlsJywgJ2ZkYzMuaW5zdHJ1bWVudCcsICdmZGMzLmluc3RydW1lbnRMaXN0JywgJ2ZkYzMuaW50ZXJhY3Rpb24nLCAnZmRjMy5tZXNzYWdlJywgJ2ZkYzMub3JnYW5pemF0aW9uJywgJ2ZkYzMucG9ydGZvbGlvJywgJ2ZkYzMucG9zaXRpb24nLCAnZmRjMy5ub3RoaW5nJywgJ2ZkYzMudGltZVJhbmdlJywgJ2ZkYzMudHJhbnNhY3Rpb25SZXN1bHQnLCAnZmRjMy52YWx1YXRpb24nKTtcbi8vIHVzZWQgaW50ZXJuYWxseSB0byBjaGVjayBpZiBhIGdpdmVuIGludGVudC9jb250ZXh0IGlzIGEgc3RhbmRhcmQgb25lXG52YXIgU3RhbmRhcmRDb250ZXh0c1NldCA9IG5ldyBTZXQoU1RBTkRBUkRfQ09OVEVYVF9UWVBFUyk7XG5cbnZhciBTVEFOREFSRF9JTlRFTlRTID0gZXhoYXVzdGl2ZVN0cmluZ1R1cGxlKCkoJ0NyZWF0ZUludGVyYWN0aW9uJywgJ1NlbmRDaGF0TWVzc2FnZScsICdTdGFydENhbGwnLCAnU3RhcnRDaGF0JywgJ1N0YXJ0RW1haWwnLCAnVmlld0FuYWx5c2lzJywgJ1ZpZXdDaGF0JywgJ1ZpZXdDaGFydCcsICdWaWV3Q29udGFjdCcsICdWaWV3SG9sZGluZ3MnLCAnVmlld0luc3RydW1lbnQnLCAnVmlld0ludGVyYWN0aW9ucycsICdWaWV3TWVzc2FnZXMnLCAnVmlld05ld3MnLCAnVmlld09yZGVycycsICdWaWV3UHJvZmlsZScsICdWaWV3UXVvdGUnLCAnVmlld1Jlc2VhcmNoJyk7XG4vLyB1c2VkIGludGVybmFsbHkgdG8gY2hlY2sgaWYgYSBnaXZlbiBpbnRlbnQvY29udGV4dCBpcyBhIHN0YW5kYXJkIG9uZVxudmFyIFN0YW5kYXJkSW50ZW50c1NldCA9IG5ldyBTZXQoU1RBTkRBUkRfSU5URU5UUyk7XG5cbnZhciBERUZBVUxUX1RJTUVPVVQgPSA1MDAwO1xudmFyIFVuYXZhaWxhYmxlRXJyb3IgPSBuZXcgRXJyb3IoJ0ZEQzMgRGVza3RvcEFnZW50IG5vdCBhdmFpbGFibGUgYXQgYHdpbmRvdy5mZGMzYC4nKTtcbnZhciBUaW1lb3V0RXJyb3IgPSBuZXcgRXJyb3IoJ1RpbWVkIG91dCB3YWl0aW5nIGZvciBgZmRjM1JlYWR5YCBldmVudC4nKTtcbnZhciBVbmV4cGVjdGVkRXJyb3IgPSBuZXcgRXJyb3IoJ2BmZGMzUmVhZHlgIGV2ZW50IGZpcmVkLCBidXQgYHdpbmRvdy5mZGMzYCBub3Qgc2V0IHRvIERlc2t0b3BBZ2VudC4nKTtcbmZ1bmN0aW9uIHJlamVjdElmTm9HbG9iYWwoZikge1xuICAgIHJldHVybiB3aW5kb3cuZmRjMyA/IGYoKSA6IFByb21pc2UucmVqZWN0KFVuYXZhaWxhYmxlRXJyb3IpO1xufVxuLyoqXG4gKiBVdGlsaXR5IGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIHByb21pc2UgdGhhdCB3aWxsIHJlc29sdmUgaW1tZWFkaWF0ZWx5XG4gKiBpZiB0aGUgZGVza3RvcCBhZ2VudCBBUEkgaXMgZm91bmQgYXQgYHdpbmRvdy5mZGMzYC4gSWYgdGhlIEFQSSBpcyBmb3VuZCxcbiAqIHRoZSBwcm9taXNlIHdpbGwgcmVzb2x2ZSB3aGVuIHRoZSBgZmRjM1JlYWR5YCBldmVudCBpcyByZWNlaXZlZCBvciBpZiBpdFxuICogaXMgZm91bmQgYXQgdGhlIGVuZCBvZiB0aGUgc3BlY2lmaWVkIHRpbWVvdXQuIElmIHRoZSBBUEkgaXMgbm90IGZvdW5kLCBpdFxuICogd2lsbCByZWplY3Qgd2l0aCBhbiBlcnJvci5cbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBhd2FpdCBmZGMzUmVhZHkoKTtcbiAqIGNvbnN0IGludGVudExpc3RlbmVyID0gYXdhaXQgYWRkSW50ZW50TGlzdGVuZXIoXCJWaWV3Q2hhcnRcIiwgaW50ZW50SGFuZGxlckZuKTtcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB3YWl0Rm9yTXMgVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gd2FpdCBmb3IgdGhlIEZEQzMgQVBJIHRvIGJlXG4gKiByZWFkeS4gRGVmYXVsdHMgdG8gNSBzZWNvbmRzLlxuICovXG52YXIgZmRjM1JlYWR5ID0gZnVuY3Rpb24gKHdhaXRGb3JNcykge1xuICAgIGlmICh3YWl0Rm9yTXMgPT09IHZvaWQgMCkgeyB3YWl0Rm9yTXMgPSBERUZBVUxUX1RJTUVPVVQ7IH1cbiAgICByZXR1cm4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIGdsb2JhbCBpcyBhbHJlYWR5IGF2YWlsYWJsZSByZXNvbHZlIGltbWVkaWF0ZWx5XG4gICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuZmRjMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgaXRzIG5vdCBhdmFpbGFibGUgc2V0dXAgYSB0aW1lb3V0IHRvIHJldHVybiBhIHJlamVjdGVkIHByb21pc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aW1lb3V0XzEgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgcmV0dXJuICh3aW5kb3cuZmRjMyA/IHJlc29sdmUoKSA6IHJlamVjdChUaW1lb3V0RXJyb3IpKTsgfSwgd2FpdEZvck1zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxpc3RlbiBmb3IgdGhlIGZkYzNSZWFkeSBldmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2ZkYzNSZWFkeScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dF8xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuZmRjMyA/IHJlc29sdmUoKSA6IHJlamVjdChVbmV4cGVjdGVkRXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgeyBvbmNlOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSldO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5mdW5jdGlvbiBpc1N0cmluZyhhcHApIHtcbiAgICByZXR1cm4gISFhcHAgJiYgdHlwZW9mIGFwcCA9PT0gJ3N0cmluZyc7XG59XG5mdW5jdGlvbiBvcGVuKGFwcCwgY29udGV4dCkge1xuICAgIGlmIChpc1N0cmluZyhhcHApKSB7XG4gICAgICAgIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHdpbmRvdy5mZGMzLm9wZW4oYXBwLCBjb250ZXh0KTsgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7IHJldHVybiB3aW5kb3cuZmRjMy5vcGVuKGFwcCwgY29udGV4dCk7IH0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGZpbmRJbnRlbnQoaW50ZW50LCBjb250ZXh0LCByZXN1bHRUeXBlKSB7XG4gICAgcmV0dXJuIHJlamVjdElmTm9HbG9iYWwoZnVuY3Rpb24gKCkgeyByZXR1cm4gd2luZG93LmZkYzMuZmluZEludGVudChpbnRlbnQsIGNvbnRleHQsIHJlc3VsdFR5cGUpOyB9KTtcbn1cbmZ1bmN0aW9uIGZpbmRJbnRlbnRzQnlDb250ZXh0KGNvbnRleHQsIHJlc3VsdFR5cGUpIHtcbiAgICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7IHJldHVybiB3aW5kb3cuZmRjMy5maW5kSW50ZW50c0J5Q29udGV4dChjb250ZXh0LCByZXN1bHRUeXBlKTsgfSk7XG59XG5mdW5jdGlvbiBicm9hZGNhc3QoY29udGV4dCkge1xuICAgIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHdpbmRvdy5mZGMzLmJyb2FkY2FzdChjb250ZXh0KTsgfSk7XG59XG5mdW5jdGlvbiByYWlzZUludGVudChpbnRlbnQsIGNvbnRleHQsIGFwcCkge1xuICAgIGlmIChpc1N0cmluZyhhcHApKSB7XG4gICAgICAgIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHdpbmRvdy5mZGMzLnJhaXNlSW50ZW50KGludGVudCwgY29udGV4dCwgYXBwKTsgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7IHJldHVybiB3aW5kb3cuZmRjMy5yYWlzZUludGVudChpbnRlbnQsIGNvbnRleHQsIGFwcCk7IH0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJhaXNlSW50ZW50Rm9yQ29udGV4dChjb250ZXh0LCBhcHApIHtcbiAgICBpZiAoaXNTdHJpbmcoYXBwKSkge1xuICAgICAgICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7IHJldHVybiB3aW5kb3cuZmRjMy5yYWlzZUludGVudEZvckNvbnRleHQoY29udGV4dCwgYXBwKTsgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7IHJldHVybiB3aW5kb3cuZmRjMy5yYWlzZUludGVudEZvckNvbnRleHQoY29udGV4dCwgYXBwKTsgfSk7XG4gICAgfVxufVxuZnVuY3Rpb24gYWRkSW50ZW50TGlzdGVuZXIoaW50ZW50LCBoYW5kbGVyKSB7XG4gICAgcmV0dXJuIHJlamVjdElmTm9HbG9iYWwoZnVuY3Rpb24gKCkgeyByZXR1cm4gd2luZG93LmZkYzMuYWRkSW50ZW50TGlzdGVuZXIoaW50ZW50LCBoYW5kbGVyKTsgfSk7XG59XG5mdW5jdGlvbiBhZGRDb250ZXh0TGlzdGVuZXIoY29udGV4dFR5cGVPckhhbmRsZXIsIGhhbmRsZXIpIHtcbiAgICAvL0hhbmRsZSAoZGVwcmVjYXRlZCkgZnVuY3Rpb24gc2lnbmF0dXJlIHRoYXQgYWxsb3dlZCBjb250ZXh0VHlwZSBhcmd1bWVudCB0byBiZSBvbWl0dGVkXG4gICAgaWYgKHR5cGVvZiBjb250ZXh0VHlwZU9ySGFuZGxlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7IHJldHVybiB3aW5kb3cuZmRjMy5hZGRDb250ZXh0TGlzdGVuZXIoY29udGV4dFR5cGVPckhhbmRsZXIsIGhhbmRsZXIpOyB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHdpbmRvdy5mZGMzLmFkZENvbnRleHRMaXN0ZW5lcihudWxsLCBjb250ZXh0VHlwZU9ySGFuZGxlcik7IH0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldFVzZXJDaGFubmVscygpIHtcbiAgICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vZmFsbGJhY2sgdG8gZ2V0U3lzdGVtQ2hhbm5lbHMgZm9yIEZEQzMgPDIuMCBpbXBsZW1lbnRhdGlvbnNcbiAgICAgICAgaWYgKHdpbmRvdy5mZGMzLmdldFVzZXJDaGFubmVscykge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5mZGMzLmdldFVzZXJDaGFubmVscygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5mZGMzLmdldFN5c3RlbUNoYW5uZWxzKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGdldFN5c3RlbUNoYW5uZWxzKCkge1xuICAgIC8vZmFsbGZvcndhcmQgdG8gZ2V0VXNlckNoYW5uZWxzIGZvciBGREMzIDIuMCsgaW1wbGVtZW50YXRpb25zXG4gICAgcmV0dXJuIGdldFVzZXJDaGFubmVscygpO1xufVxuZnVuY3Rpb24gam9pblVzZXJDaGFubmVsKGNoYW5uZWxJZCkge1xuICAgIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy9mYWxsYmFjayB0byBqb2luQ2hhbm5lbCBmb3IgRkRDMyA8Mi4wIGltcGxlbWVudGF0aW9uc1xuICAgICAgICBpZiAod2luZG93LmZkYzMuam9pblVzZXJDaGFubmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LmZkYzMuam9pblVzZXJDaGFubmVsKGNoYW5uZWxJZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LmZkYzMuam9pbkNoYW5uZWwoY2hhbm5lbElkKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZnVuY3Rpb24gam9pbkNoYW5uZWwoY2hhbm5lbElkKSB7XG4gICAgLy9mYWxsZm9yd2FyZCB0byBqb2luVXNlckNoYW5uZWwgZm9yIEZEQzMgMi4wKyBpbXBsZW1lbnRhdGlvbnNcbiAgICByZXR1cm4gam9pblVzZXJDaGFubmVsKGNoYW5uZWxJZCk7XG59XG5mdW5jdGlvbiBnZXRPckNyZWF0ZUNoYW5uZWwoY2hhbm5lbElkKSB7XG4gICAgcmV0dXJuIHJlamVjdElmTm9HbG9iYWwoZnVuY3Rpb24gKCkgeyByZXR1cm4gd2luZG93LmZkYzMuZ2V0T3JDcmVhdGVDaGFubmVsKGNoYW5uZWxJZCk7IH0pO1xufVxuZnVuY3Rpb24gZ2V0Q3VycmVudENoYW5uZWwoKSB7XG4gICAgcmV0dXJuIHJlamVjdElmTm9HbG9iYWwoZnVuY3Rpb24gKCkgeyByZXR1cm4gd2luZG93LmZkYzMuZ2V0Q3VycmVudENoYW5uZWwoKTsgfSk7XG59XG5mdW5jdGlvbiBsZWF2ZUN1cnJlbnRDaGFubmVsKCkge1xuICAgIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHdpbmRvdy5mZGMzLmxlYXZlQ3VycmVudENoYW5uZWwoKTsgfSk7XG59XG5mdW5jdGlvbiBjcmVhdGVQcml2YXRlQ2hhbm5lbCgpIHtcbiAgICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7IHJldHVybiB3aW5kb3cuZmRjMy5jcmVhdGVQcml2YXRlQ2hhbm5lbCgpOyB9KTtcbn1cbmZ1bmN0aW9uIGdldEluZm8oKSB7XG4gICAgcmV0dXJuIHJlamVjdElmTm9HbG9iYWwoZnVuY3Rpb24gKCkgeyByZXR1cm4gd2luZG93LmZkYzMuZ2V0SW5mbygpOyB9KTtcbn1cbmZ1bmN0aW9uIGdldEFwcE1ldGFkYXRhKGFwcCkge1xuICAgIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHdpbmRvdy5mZGMzLmdldEFwcE1ldGFkYXRhKGFwcCk7IH0pO1xufVxuZnVuY3Rpb24gZmluZEluc3RhbmNlcyhhcHApIHtcbiAgICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7IHJldHVybiB3aW5kb3cuZmRjMy5maW5kSW5zdGFuY2VzKGFwcCk7IH0pO1xufVxuLyoqXG4gKiBDaGVjayBpZiB0aGUgZ2l2ZW4gY29udGV4dCBpcyBhIHN0YW5kYXJkIGNvbnRleHQgdHlwZS5cbiAqIEBwYXJhbSBjb250ZXh0VHlwZVxuICovXG5mdW5jdGlvbiBpc1N0YW5kYXJkQ29udGV4dFR5cGUoY29udGV4dFR5cGUpIHtcbiAgICByZXR1cm4gU3RhbmRhcmRDb250ZXh0c1NldC5oYXMoY29udGV4dFR5cGUpO1xufVxuLyoqXG4gKiBDaGVjayBpZiB0aGUgZ2l2ZW4gaW50ZW50IGlzIGEgc3RhbmRhcmQgaW50ZW50LlxuICogQHBhcmFtIGludGVudFxuICovXG5mdW5jdGlvbiBpc1N0YW5kYXJkSW50ZW50KGludGVudCkge1xuICAgIHJldHVybiBTdGFuZGFyZEludGVudHNTZXQuaGFzKGludGVudCk7XG59XG4vKipcbiAqIENvbXBhcmUgbnVtZXJpYyBzZW12ZXIgdmVyc2lvbiBudW1iZXIgc3RyaW5ncyAoaW4gdGhlIGZvcm0gYDEuMi4zYCkuXG4gKlxuICogUmV0dXJucyBgLTFgIGlmIHRoZSBmaXJzdCBhcmd1bWVudCBpcyBhIGxvd2VyIHZlcnNpb24gbnVtYmVyIHRoYW4gdGhlIHNlY29uZCxcbiAqIGAxYCBpZiB0aGUgZmlyc3QgYXJndW1lbnQgaXMgZ3JlYXRlciB0aGFuIHRoZSBzZWNvbmQsIDAgaWYgdGhlIGFyZ3VtZW50cyBhcmVcbiAqIGVxdWFsIGFuZCBgbnVsbGAgaWYgYW4gZXJyb3Igb2NjdXJyZWQgZHVyaW5nIHRoZSBjb21wYXJpc29uLlxuICpcbiAqIEBwYXJhbSBhXG4gKiBAcGFyYW0gYlxuICovXG52YXIgY29tcGFyZVZlcnNpb25OdW1iZXJzID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICB0cnkge1xuICAgICAgICB2YXIgYVZlckFyciA9IGEuc3BsaXQoJy4nKS5tYXAoTnVtYmVyKTtcbiAgICAgICAgdmFyIGJWZXJBcnIgPSBiLnNwbGl0KCcuJykubWFwKE51bWJlcik7XG4gICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBNYXRoLm1heChhVmVyQXJyLmxlbmd0aCwgYlZlckFyci5sZW5ndGgpOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAvKiBJZiBvbmUgdmVyc2lvbiBudW1iZXIgaGFzIG1vcmUgZGlnaXRzIGFuZCB0aGUgb3RoZXIgZG9lcyBub3QsIGFuZCB0aGV5IGFyZSBvdGhlcndpc2UgZXF1YWwsXG4gICAgICAgICAgICAgICBhc3N1bWUgdGhlIGxvbmdlciBpcyBncmVhdGVyLiBFLmcuIDEuMS4xID4gMS4xICovXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IGFWZXJBcnIubGVuZ3RoIHx8IGFWZXJBcnJbaW5kZXhdIDwgYlZlckFycltpbmRleF0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpbmRleCA9PT0gYlZlckFyci5sZW5ndGggfHwgYVZlckFycltpbmRleF0gPiBiVmVyQXJyW2luZGV4XSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gY29tcGFyZSB2ZXJzaW9uIHN0cmluZ3MnLCBlKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufTtcbi8qKlxuICogQ2hlY2sgaWYgdGhlIEZEQzMgdmVyc2lvbiBpbiBhbiBJbXBsZW1lbnRhdGlvbk1ldGFkYXRhIG9iamVjdCBpcyBncmVhdGVyIHRoYW5cbiAqIG9yIGVxdWFsIHRvIHRoZSBzdXBwbGllZCBudW1lcmljIHNlbXZlciB2ZXJzaW9uIG51bWJlciBzdHJpbmcgKGluIHRoZSBmb3JtIGAxLjIuM2ApLlxuICpcbiAqIFJldHVybnMgYSBib29sZWFuIG9yIG51bGwgaWYgYW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgY29tcGFyaW5nIHRoZSB2ZXJzaW9uIG51bWJlcnMuXG4gKlxuICogQHBhcmFtIG1ldGFkYXRhXG4gKiBAcGFyYW0gdmVyc2lvblxuICovXG52YXIgdmVyc2lvbklzQXRMZWFzdCA9IGZ1bmN0aW9uIChtZXRhZGF0YSwgdmVyc2lvbikge1xuICAgIHZhciBjb21wYXJpc29uID0gY29tcGFyZVZlcnNpb25OdW1iZXJzKG1ldGFkYXRhLmZkYzNWZXJzaW9uLCB2ZXJzaW9uKTtcbiAgICByZXR1cm4gY29tcGFyaXNvbiA9PT0gbnVsbCA/IG51bGwgOiBjb21wYXJpc29uID49IDAgPyB0cnVlIDogZmFsc2U7XG59O1xuXG4vKipcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKiBDb3B5cmlnaHQgRklOT1MgRkRDMyBjb250cmlidXRvcnMgLSBzZWUgTk9USUNFIGZpbGVcbiAqL1xuLyoqXG4gKiBAZGVwcmVjYXRlZCBVc2Uge0BsaW5rIFN0YW5kYXJkQ29udGV4dFR5cGV9IGluc3RlYWRcbiAqL1xudmFyIENvbnRleHRUeXBlcztcbihmdW5jdGlvbiAoQ29udGV4dFR5cGVzKSB7XG4gICAgQ29udGV4dFR5cGVzW1wiQ2hhcnRcIl0gPSBcImZkYzMuY2hhcnRcIjtcbiAgICBDb250ZXh0VHlwZXNbXCJDaGF0SW5pdFNldHRpbmdzXCJdID0gXCJmZGMzLmNoYXQuaW5pdFNldHRpbmdzXCI7XG4gICAgQ29udGV4dFR5cGVzW1wiQ2hhdFJvb21cIl0gPSBcImZkYzMuY2hhdC5yb29tXCI7XG4gICAgQ29udGV4dFR5cGVzW1wiQ29udGFjdFwiXSA9IFwiZmRjMy5jb250YWN0XCI7XG4gICAgQ29udGV4dFR5cGVzW1wiQ29udGFjdExpc3RcIl0gPSBcImZkYzMuY29udGFjdExpc3RcIjtcbiAgICBDb250ZXh0VHlwZXNbXCJDb3VudHJ5XCJdID0gXCJmZGMzLmNvdW50cnlcIjtcbiAgICBDb250ZXh0VHlwZXNbXCJDdXJyZW5jeVwiXSA9IFwiZmRjMy5jdXJyZW5jeVwiO1xuICAgIENvbnRleHRUeXBlc1tcIkVtYWlsXCJdID0gXCJmZGMzLmVtYWlsXCI7XG4gICAgQ29udGV4dFR5cGVzW1wiSW5zdHJ1bWVudFwiXSA9IFwiZmRjMy5pbnN0cnVtZW50XCI7XG4gICAgQ29udGV4dFR5cGVzW1wiSW5zdHJ1bWVudExpc3RcIl0gPSBcImZkYzMuaW5zdHJ1bWVudExpc3RcIjtcbiAgICBDb250ZXh0VHlwZXNbXCJJbnRlcmFjdGlvblwiXSA9IFwiZmRjMy5pbnRlcmFjdGlvblwiO1xuICAgIENvbnRleHRUeXBlc1tcIk5vdGhpbmdcIl0gPSBcImZkYzMubm90aGluZ1wiO1xuICAgIENvbnRleHRUeXBlc1tcIk9yZ2FuaXphdGlvblwiXSA9IFwiZmRjMy5vcmdhbml6YXRpb25cIjtcbiAgICBDb250ZXh0VHlwZXNbXCJQb3J0Zm9saW9cIl0gPSBcImZkYzMucG9ydGZvbGlvXCI7XG4gICAgQ29udGV4dFR5cGVzW1wiUG9zaXRpb25cIl0gPSBcImZkYzMucG9zaXRpb25cIjtcbiAgICBDb250ZXh0VHlwZXNbXCJDaGF0U2VhcmNoQ3JpdGVyaWFcIl0gPSBcImZkYzMuY2hhdC5zZWFyY2hDcml0ZXJpYVwiO1xuICAgIENvbnRleHRUeXBlc1tcIlRpbWVSYW5nZVwiXSA9IFwiZmRjMy50aW1lUmFuZ2VcIjtcbiAgICBDb250ZXh0VHlwZXNbXCJUcmFuc2FjdGlvblJlc3VsdFwiXSA9IFwiZmRjMy50cmFuc2FjdGlvblJlc3VsdFwiO1xuICAgIENvbnRleHRUeXBlc1tcIlZhbHVhdGlvblwiXSA9IFwiZmRjMy52YWx1YXRpb25cIjtcbn0pKENvbnRleHRUeXBlcyB8fCAoQ29udGV4dFR5cGVzID0ge30pKTtcblxuLy8gVG8gcGFyc2UgdGhpcyBkYXRhOlxuLy9cbi8vICAgaW1wb3J0IHsgQ29udmVydCwgQWN0aW9uLCBDaGFydCwgQ2hhdEluaXRTZXR0aW5ncywgQ2hhdE1lc3NhZ2UsIENoYXRSb29tLCBDaGF0U2VhcmNoQ3JpdGVyaWEsIENvbnRhY3QsIENvbnRhY3RMaXN0LCBDb250ZXh0LCBDb3VudHJ5LCBDdXJyZW5jeSwgRW1haWwsIEluc3RydW1lbnQsIEluc3RydW1lbnRMaXN0LCBJbnRlcmFjdGlvbiwgTWVzc2FnZSwgTm90aGluZywgT3JkZXIsIE9yZGVyTGlzdCwgT3JnYW5pemF0aW9uLCBQb3J0Zm9saW8sIFBvc2l0aW9uLCBQcm9kdWN0LCBUaW1lUmFuZ2UsIFRyYWRlLCBUcmFkZUxpc3QsIFRyYW5zYWN0aW9uUmVzdWx0LCBWYWx1YXRpb24gfSBmcm9tIFwiLi9maWxlXCI7XG4vL1xuLy8gICBjb25zdCBhY3Rpb24gPSBDb252ZXJ0LnRvQWN0aW9uKGpzb24pO1xuLy8gICBjb25zdCBjaGFydCA9IENvbnZlcnQudG9DaGFydChqc29uKTtcbi8vICAgY29uc3QgY2hhdEluaXRTZXR0aW5ncyA9IENvbnZlcnQudG9DaGF0SW5pdFNldHRpbmdzKGpzb24pO1xuLy8gICBjb25zdCBjaGF0TWVzc2FnZSA9IENvbnZlcnQudG9DaGF0TWVzc2FnZShqc29uKTtcbi8vICAgY29uc3QgY2hhdFJvb20gPSBDb252ZXJ0LnRvQ2hhdFJvb20oanNvbik7XG4vLyAgIGNvbnN0IGNoYXRTZWFyY2hDcml0ZXJpYSA9IENvbnZlcnQudG9DaGF0U2VhcmNoQ3JpdGVyaWEoanNvbik7XG4vLyAgIGNvbnN0IGNvbnRhY3QgPSBDb252ZXJ0LnRvQ29udGFjdChqc29uKTtcbi8vICAgY29uc3QgY29udGFjdExpc3QgPSBDb252ZXJ0LnRvQ29udGFjdExpc3QoanNvbik7XG4vLyAgIGNvbnN0IGNvbnRleHQgPSBDb252ZXJ0LnRvQ29udGV4dChqc29uKTtcbi8vICAgY29uc3QgY291bnRyeSA9IENvbnZlcnQudG9Db3VudHJ5KGpzb24pO1xuLy8gICBjb25zdCBjdXJyZW5jeSA9IENvbnZlcnQudG9DdXJyZW5jeShqc29uKTtcbi8vICAgY29uc3QgZW1haWwgPSBDb252ZXJ0LnRvRW1haWwoanNvbik7XG4vLyAgIGNvbnN0IGluc3RydW1lbnQgPSBDb252ZXJ0LnRvSW5zdHJ1bWVudChqc29uKTtcbi8vICAgY29uc3QgaW5zdHJ1bWVudExpc3QgPSBDb252ZXJ0LnRvSW5zdHJ1bWVudExpc3QoanNvbik7XG4vLyAgIGNvbnN0IGludGVyYWN0aW9uID0gQ29udmVydC50b0ludGVyYWN0aW9uKGpzb24pO1xuLy8gICBjb25zdCBtZXNzYWdlID0gQ29udmVydC50b01lc3NhZ2UoanNvbik7XG4vLyAgIGNvbnN0IG5vdGhpbmcgPSBDb252ZXJ0LnRvTm90aGluZyhqc29uKTtcbi8vICAgY29uc3Qgb3JkZXIgPSBDb252ZXJ0LnRvT3JkZXIoanNvbik7XG4vLyAgIGNvbnN0IG9yZGVyTGlzdCA9IENvbnZlcnQudG9PcmRlckxpc3QoanNvbik7XG4vLyAgIGNvbnN0IG9yZ2FuaXphdGlvbiA9IENvbnZlcnQudG9Pcmdhbml6YXRpb24oanNvbik7XG4vLyAgIGNvbnN0IHBvcnRmb2xpbyA9IENvbnZlcnQudG9Qb3J0Zm9saW8oanNvbik7XG4vLyAgIGNvbnN0IHBvc2l0aW9uID0gQ29udmVydC50b1Bvc2l0aW9uKGpzb24pO1xuLy8gICBjb25zdCBwcm9kdWN0ID0gQ29udmVydC50b1Byb2R1Y3QoanNvbik7XG4vLyAgIGNvbnN0IHRpbWVSYW5nZSA9IENvbnZlcnQudG9UaW1lUmFuZ2UoanNvbik7XG4vLyAgIGNvbnN0IHRyYWRlID0gQ29udmVydC50b1RyYWRlKGpzb24pO1xuLy8gICBjb25zdCB0cmFkZUxpc3QgPSBDb252ZXJ0LnRvVHJhZGVMaXN0KGpzb24pO1xuLy8gICBjb25zdCB0cmFuc2FjdGlvblJlc3VsdCA9IENvbnZlcnQudG9UcmFuc2FjdGlvblJlc3VsdChqc29uKTtcbi8vICAgY29uc3QgdmFsdWF0aW9uID0gQ29udmVydC50b1ZhbHVhdGlvbihqc29uKTtcbi8vXG4vLyBUaGVzZSBmdW5jdGlvbnMgd2lsbCB0aHJvdyBhbiBlcnJvciBpZiB0aGUgSlNPTiBkb2Vzbid0XG4vLyBtYXRjaCB0aGUgZXhwZWN0ZWQgaW50ZXJmYWNlLCBldmVuIGlmIHRoZSBKU09OIGlzIHZhbGlkLlxuLyoqXG4gKiBGcmVlIHRleHQgdG8gYmUgdXNlZCBmb3IgYSBrZXl3b3JkIHNlYXJjaFxuICpcbiAqIGBpbnRlcmFjdGlvblR5cGVgIFNIT1VMRCBiZSBvbmUgb2YgYCdJbnN0YW50IE1lc3NhZ2UnYCwgYCdFbWFpbCdgLCBgJ0NhbGwnYCwgb3JcbiAqIGAnTWVldGluZydgIGFsdGhvdWdoIG90aGVyIHN0cmluZyB2YWx1ZXMgYXJlIHBlcm1pdHRlZC5cbiAqL1xuLy8gQ29udmVydHMgSlNPTiBzdHJpbmdzIHRvL2Zyb20geW91ciB0eXBlc1xuLy8gYW5kIGFzc2VydHMgdGhlIHJlc3VsdHMgb2YgSlNPTi5wYXJzZSBhdCBydW50aW1lXG52YXIgQ29udmVydCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb252ZXJ0KCkge1xuICAgIH1cbiAgICBDb252ZXJ0LnRvQWN0aW9uID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcihcIkFjdGlvblwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmFjdGlvblRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKFwiQWN0aW9uXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvQ2hhcnQgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKFwiQ2hhcnRcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5jaGFydFRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKFwiQ2hhcnRcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9DaGF0SW5pdFNldHRpbmdzID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcihcIkNoYXRJbml0U2V0dGluZ3NcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5jaGF0SW5pdFNldHRpbmdzVG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QodmFsdWUsIHIoXCJDaGF0SW5pdFNldHRpbmdzXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvQ2hhdE1lc3NhZ2UgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKFwiQ2hhdE1lc3NhZ2VcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5jaGF0TWVzc2FnZVRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKFwiQ2hhdE1lc3NhZ2VcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9DaGF0Um9vbSA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoXCJDaGF0Um9vbVwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmNoYXRSb29tVG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QodmFsdWUsIHIoXCJDaGF0Um9vbVwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0NoYXRTZWFyY2hDcml0ZXJpYSA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoXCJDaGF0U2VhcmNoQ3JpdGVyaWFcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5jaGF0U2VhcmNoQ3JpdGVyaWFUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcihcIkNoYXRTZWFyY2hDcml0ZXJpYVwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0NvbnRhY3QgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKFwiQ29udGFjdFwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmNvbnRhY3RUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcihcIkNvbnRhY3RcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9Db250YWN0TGlzdCA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoXCJDb250YWN0TGlzdFwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmNvbnRhY3RMaXN0VG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QodmFsdWUsIHIoXCJDb250YWN0TGlzdFwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0NvbnRleHQgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKFwiQ29udGV4dFwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmNvbnRleHRUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcihcIkNvbnRleHRcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9Db3VudHJ5ID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcihcIkNvdW50cnlcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5jb3VudHJ5VG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QodmFsdWUsIHIoXCJDb3VudHJ5XCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvQ3VycmVuY3kgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKFwiQ3VycmVuY3lcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5jdXJyZW5jeVRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKFwiQ3VycmVuY3lcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9FbWFpbCA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoXCJFbWFpbFwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LmVtYWlsVG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QodmFsdWUsIHIoXCJFbWFpbFwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0luc3RydW1lbnQgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKFwiSW5zdHJ1bWVudFwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0Lmluc3RydW1lbnRUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcihcIkluc3RydW1lbnRcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9JbnN0cnVtZW50TGlzdCA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoXCJJbnN0cnVtZW50TGlzdFwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0Lmluc3RydW1lbnRMaXN0VG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QodmFsdWUsIHIoXCJJbnN0cnVtZW50TGlzdFwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b0ludGVyYWN0aW9uID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcihcIkludGVyYWN0aW9uXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQuaW50ZXJhY3Rpb25Ub0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcihcIkludGVyYWN0aW9uXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvTWVzc2FnZSA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoXCJNZXNzYWdlXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQubWVzc2FnZVRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKFwiTWVzc2FnZVwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b05vdGhpbmcgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKFwiTm90aGluZ1wiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0Lm5vdGhpbmdUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcihcIk5vdGhpbmdcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9PcmRlciA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoXCJPcmRlclwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0Lm9yZGVyVG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QodmFsdWUsIHIoXCJPcmRlclwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b09yZGVyTGlzdCA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoXCJPcmRlckxpc3RcIikpO1xuICAgIH07XG4gICAgQ29udmVydC5vcmRlckxpc3RUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcihcIk9yZGVyTGlzdFwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b09yZ2FuaXphdGlvbiA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoXCJPcmdhbml6YXRpb25cIikpO1xuICAgIH07XG4gICAgQ29udmVydC5vcmdhbml6YXRpb25Ub0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcihcIk9yZ2FuaXphdGlvblwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b1BvcnRmb2xpbyA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoXCJQb3J0Zm9saW9cIikpO1xuICAgIH07XG4gICAgQ29udmVydC5wb3J0Zm9saW9Ub0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcihcIlBvcnRmb2xpb1wiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b1Bvc2l0aW9uID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcihcIlBvc2l0aW9uXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQucG9zaXRpb25Ub0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcihcIlBvc2l0aW9uXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvUHJvZHVjdCA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoXCJQcm9kdWN0XCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQucHJvZHVjdFRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKFwiUHJvZHVjdFwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b1RpbWVSYW5nZSA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoXCJUaW1lUmFuZ2VcIikpO1xuICAgIH07XG4gICAgQ29udmVydC50aW1lUmFuZ2VUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcihcIlRpbWVSYW5nZVwiKSksIG51bGwsIDIpO1xuICAgIH07XG4gICAgQ29udmVydC50b1RyYWRlID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcihcIlRyYWRlXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQudHJhZGVUb0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcihcIlRyYWRlXCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvVHJhZGVMaXN0ID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcihcIlRyYWRlTGlzdFwiKSk7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRyYWRlTGlzdFRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKFwiVHJhZGVMaXN0XCIpKSwgbnVsbCwgMik7XG4gICAgfTtcbiAgICBDb252ZXJ0LnRvVHJhbnNhY3Rpb25SZXN1bHQgPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKFwiVHJhbnNhY3Rpb25SZXN1bHRcIikpO1xuICAgIH07XG4gICAgQ29udmVydC50cmFuc2FjdGlvblJlc3VsdFRvSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKFwiVHJhbnNhY3Rpb25SZXN1bHRcIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIENvbnZlcnQudG9WYWx1YXRpb24gPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKFwiVmFsdWF0aW9uXCIpKTtcbiAgICB9O1xuICAgIENvbnZlcnQudmFsdWF0aW9uVG9Kc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QodmFsdWUsIHIoXCJWYWx1YXRpb25cIikpLCBudWxsLCAyKTtcbiAgICB9O1xuICAgIHJldHVybiBDb252ZXJ0O1xufSgpKTtcbmZ1bmN0aW9uIGludmFsaWRWYWx1ZSh0eXAsIHZhbCwga2V5LCBwYXJlbnQpIHtcbiAgICBpZiAocGFyZW50ID09PSB2b2lkIDApIHsgcGFyZW50ID0gJyc7IH1cbiAgICB2YXIgcHJldHR5VHlwID0gcHJldHR5VHlwZU5hbWUodHlwKTtcbiAgICB2YXIgcGFyZW50VGV4dCA9IHBhcmVudCA/IFwiIG9uIFwiLmNvbmNhdChwYXJlbnQpIDogJyc7XG4gICAgdmFyIGtleVRleHQgPSBrZXkgPyBcIiBmb3Iga2V5IFxcXCJcIi5jb25jYXQoa2V5LCBcIlxcXCJcIikgOiAnJztcbiAgICB0aHJvdyBFcnJvcihcIkludmFsaWQgdmFsdWVcIi5jb25jYXQoa2V5VGV4dCkuY29uY2F0KHBhcmVudFRleHQsIFwiLiBFeHBlY3RlZCBcIikuY29uY2F0KHByZXR0eVR5cCwgXCIgYnV0IGdvdCBcIikuY29uY2F0KEpTT04uc3RyaW5naWZ5KHZhbCkpKTtcbn1cbmZ1bmN0aW9uIHByZXR0eVR5cGVOYW1lKHR5cCkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHR5cCkpIHtcbiAgICAgICAgaWYgKHR5cC5sZW5ndGggPT09IDIgJiYgdHlwWzBdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBcImFuIG9wdGlvbmFsIFwiLmNvbmNhdChwcmV0dHlUeXBlTmFtZSh0eXBbMV0pKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBcIm9uZSBvZiBbXCIuY29uY2F0KHR5cC5tYXAoZnVuY3Rpb24gKGEpIHsgcmV0dXJuIHByZXR0eVR5cGVOYW1lKGEpOyB9KS5qb2luKFwiLCBcIiksIFwiXVwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgdHlwID09PSBcIm9iamVjdFwiICYmIHR5cC5saXRlcmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHR5cC5saXRlcmFsO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0eXA7XG4gICAgfVxufVxuZnVuY3Rpb24ganNvblRvSlNQcm9wcyh0eXApIHtcbiAgICBpZiAodHlwLmpzb25Ub0pTID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIG1hcF8xID0ge307XG4gICAgICAgIHR5cC5wcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChwKSB7IHJldHVybiBtYXBfMVtwLmpzb25dID0geyBrZXk6IHAuanMsIHR5cDogcC50eXAgfTsgfSk7XG4gICAgICAgIHR5cC5qc29uVG9KUyA9IG1hcF8xO1xuICAgIH1cbiAgICByZXR1cm4gdHlwLmpzb25Ub0pTO1xufVxuZnVuY3Rpb24ganNUb0pTT05Qcm9wcyh0eXApIHtcbiAgICBpZiAodHlwLmpzVG9KU09OID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIG1hcF8yID0ge307XG4gICAgICAgIHR5cC5wcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChwKSB7IHJldHVybiBtYXBfMltwLmpzXSA9IHsga2V5OiBwLmpzb24sIHR5cDogcC50eXAgfTsgfSk7XG4gICAgICAgIHR5cC5qc1RvSlNPTiA9IG1hcF8yO1xuICAgIH1cbiAgICByZXR1cm4gdHlwLmpzVG9KU09OO1xufVxuZnVuY3Rpb24gdHJhbnNmb3JtKHZhbCwgdHlwLCBnZXRQcm9wcywga2V5LCBwYXJlbnQpIHtcbiAgICBpZiAoa2V5ID09PSB2b2lkIDApIHsga2V5ID0gJyc7IH1cbiAgICBpZiAocGFyZW50ID09PSB2b2lkIDApIHsgcGFyZW50ID0gJyc7IH1cbiAgICBmdW5jdGlvbiB0cmFuc2Zvcm1QcmltaXRpdmUodHlwLCB2YWwpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0eXAgPT09IHR5cGVvZiB2YWwpXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICByZXR1cm4gaW52YWxpZFZhbHVlKHR5cCwgdmFsLCBrZXksIHBhcmVudCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRyYW5zZm9ybVVuaW9uKHR5cHMsIHZhbCkge1xuICAgICAgICAvLyB2YWwgbXVzdCB2YWxpZGF0ZSBhZ2FpbnN0IG9uZSB0eXAgaW4gdHlwc1xuICAgICAgICB2YXIgbCA9IHR5cHMubGVuZ3RoO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgdmFyIHR5cF8xID0gdHlwc1tpXTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyYW5zZm9ybSh2YWwsIHR5cF8xLCBnZXRQcm9wcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoXykgeyB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGludmFsaWRWYWx1ZSh0eXBzLCB2YWwsIGtleSwgcGFyZW50KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdHJhbnNmb3JtRW51bShjYXNlcywgdmFsKSB7XG4gICAgICAgIGlmIChjYXNlcy5pbmRleE9mKHZhbCkgIT09IC0xKVxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgcmV0dXJuIGludmFsaWRWYWx1ZShjYXNlcy5tYXAoZnVuY3Rpb24gKGEpIHsgcmV0dXJuIGwoYSk7IH0pLCB2YWwsIGtleSwgcGFyZW50KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdHJhbnNmb3JtQXJyYXkodHlwLCB2YWwpIHtcbiAgICAgICAgLy8gdmFsIG11c3QgYmUgYW4gYXJyYXkgd2l0aCBubyBpbnZhbGlkIGVsZW1lbnRzXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWwpKVxuICAgICAgICAgICAgcmV0dXJuIGludmFsaWRWYWx1ZShsKFwiYXJyYXlcIiksIHZhbCwga2V5LCBwYXJlbnQpO1xuICAgICAgICByZXR1cm4gdmFsLm1hcChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIHRyYW5zZm9ybShlbCwgdHlwLCBnZXRQcm9wcyk7IH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRlKHZhbCkge1xuICAgICAgICBpZiAodmFsID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZCA9IG5ldyBEYXRlKHZhbCk7XG4gICAgICAgIGlmIChpc05hTihkLnZhbHVlT2YoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnZhbGlkVmFsdWUobChcIkRhdGVcIiksIHZhbCwga2V5LCBwYXJlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkO1xuICAgIH1cbiAgICBmdW5jdGlvbiB0cmFuc2Zvcm1PYmplY3QocHJvcHMsIGFkZGl0aW9uYWwsIHZhbCkge1xuICAgICAgICBpZiAodmFsID09PSBudWxsIHx8IHR5cGVvZiB2YWwgIT09IFwib2JqZWN0XCIgfHwgQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgICAgICByZXR1cm4gaW52YWxpZFZhbHVlKGwocmVmIHx8IFwib2JqZWN0XCIpLCB2YWwsIGtleSwgcGFyZW50KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHByb3BzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIHZhciBwcm9wID0gcHJvcHNba2V5XTtcbiAgICAgICAgICAgIHZhciB2ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbCwga2V5KSA/IHZhbFtrZXldIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgcmVzdWx0W3Byb3Aua2V5XSA9IHRyYW5zZm9ybSh2LCBwcm9wLnR5cCwgZ2V0UHJvcHMsIGtleSwgcmVmKTtcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHZhbCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChwcm9wcywga2V5KSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gdHJhbnNmb3JtKHZhbFtrZXldLCBhZGRpdGlvbmFsLCBnZXRQcm9wcywga2V5LCByZWYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgaWYgKHR5cCA9PT0gXCJhbnlcIilcbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICBpZiAodHlwID09PSBudWxsKSB7XG4gICAgICAgIGlmICh2YWwgPT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICByZXR1cm4gaW52YWxpZFZhbHVlKHR5cCwgdmFsLCBrZXksIHBhcmVudCk7XG4gICAgfVxuICAgIGlmICh0eXAgPT09IGZhbHNlKVxuICAgICAgICByZXR1cm4gaW52YWxpZFZhbHVlKHR5cCwgdmFsLCBrZXksIHBhcmVudCk7XG4gICAgdmFyIHJlZiA9IHVuZGVmaW5lZDtcbiAgICB3aGlsZSAodHlwZW9mIHR5cCA9PT0gXCJvYmplY3RcIiAmJiB0eXAucmVmICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVmID0gdHlwLnJlZjtcbiAgICAgICAgdHlwID0gdHlwZU1hcFt0eXAucmVmXTtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodHlwKSlcbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybUVudW0odHlwLCB2YWwpO1xuICAgIGlmICh0eXBlb2YgdHlwID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHJldHVybiB0eXAuaGFzT3duUHJvcGVydHkoXCJ1bmlvbk1lbWJlcnNcIikgPyB0cmFuc2Zvcm1Vbmlvbih0eXAudW5pb25NZW1iZXJzLCB2YWwpXG4gICAgICAgICAgICA6IHR5cC5oYXNPd25Qcm9wZXJ0eShcImFycmF5SXRlbXNcIikgPyB0cmFuc2Zvcm1BcnJheSh0eXAuYXJyYXlJdGVtcywgdmFsKVxuICAgICAgICAgICAgICAgIDogdHlwLmhhc093blByb3BlcnR5KFwicHJvcHNcIikgPyB0cmFuc2Zvcm1PYmplY3QoZ2V0UHJvcHModHlwKSwgdHlwLmFkZGl0aW9uYWwsIHZhbClcbiAgICAgICAgICAgICAgICAgICAgOiBpbnZhbGlkVmFsdWUodHlwLCB2YWwsIGtleSwgcGFyZW50KTtcbiAgICB9XG4gICAgLy8gTnVtYmVycyBjYW4gYmUgcGFyc2VkIGJ5IERhdGUgYnV0IHNob3VsZG4ndCBiZS5cbiAgICBpZiAodHlwID09PSBEYXRlICYmIHR5cGVvZiB2YWwgIT09IFwibnVtYmVyXCIpXG4gICAgICAgIHJldHVybiB0cmFuc2Zvcm1EYXRlKHZhbCk7XG4gICAgcmV0dXJuIHRyYW5zZm9ybVByaW1pdGl2ZSh0eXAsIHZhbCk7XG59XG5mdW5jdGlvbiBjYXN0KHZhbCwgdHlwKSB7XG4gICAgcmV0dXJuIHRyYW5zZm9ybSh2YWwsIHR5cCwganNvblRvSlNQcm9wcyk7XG59XG5mdW5jdGlvbiB1bmNhc3QodmFsLCB0eXApIHtcbiAgICByZXR1cm4gdHJhbnNmb3JtKHZhbCwgdHlwLCBqc1RvSlNPTlByb3BzKTtcbn1cbmZ1bmN0aW9uIGwodHlwKSB7XG4gICAgcmV0dXJuIHsgbGl0ZXJhbDogdHlwIH07XG59XG5mdW5jdGlvbiBhKHR5cCkge1xuICAgIHJldHVybiB7IGFycmF5SXRlbXM6IHR5cCB9O1xufVxuZnVuY3Rpb24gdSgpIHtcbiAgICB2YXIgdHlwcyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHR5cHNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgcmV0dXJuIHsgdW5pb25NZW1iZXJzOiB0eXBzIH07XG59XG5mdW5jdGlvbiBvKHByb3BzLCBhZGRpdGlvbmFsKSB7XG4gICAgcmV0dXJuIHsgcHJvcHM6IHByb3BzLCBhZGRpdGlvbmFsOiBhZGRpdGlvbmFsIH07XG59XG5mdW5jdGlvbiBtKGFkZGl0aW9uYWwpIHtcbiAgICByZXR1cm4geyBwcm9wczogW10sIGFkZGl0aW9uYWw6IGFkZGl0aW9uYWwgfTtcbn1cbmZ1bmN0aW9uIHIobmFtZSkge1xuICAgIHJldHVybiB7IHJlZjogbmFtZSB9O1xufVxudmFyIHR5cGVNYXAgPSB7XG4gICAgXCJBY3Rpb25cIjogbyhbXG4gICAgICAgIHsganNvbjogXCJhcHBcIiwganM6IFwiYXBwXCIsIHR5cDogdSh1bmRlZmluZWQsIHIoXCJBY3Rpb25UYXJnZXRBcHBcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJjb250ZXh0XCIsIGpzOiBcImNvbnRleHRcIiwgdHlwOiByKFwiQ29udGV4dEVsZW1lbnRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcImludGVudFwiLCBqczogXCJpbnRlbnRcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInRpdGxlXCIsIGpzOiBcInRpdGxlXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogcihcIkFjdGlvblR5cGVcIikgfSxcbiAgICAgICAgeyBqc29uOiBcImlkXCIsIGpzOiBcImlkXCIsIHR5cDogdSh1bmRlZmluZWQsIG0oXCJhbnlcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIkFjdGlvblRhcmdldEFwcFwiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcImFwcElkXCIsIGpzOiBcImFwcElkXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwiZGVza3RvcEFnZW50XCIsIGpzOiBcImRlc2t0b3BBZ2VudFwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiaW5zdGFuY2VJZFwiLCBqczogXCJpbnN0YW5jZUlkXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJDb250ZXh0RWxlbWVudFwiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcImlkXCIsIGpzOiBcImlkXCIsIHR5cDogdSh1bmRlZmluZWQsIG0oXCJhbnlcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IFwiXCIgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIkNoYXJ0XCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiaW5zdHJ1bWVudHNcIiwganM6IFwiaW5zdHJ1bWVudHNcIiwgdHlwOiBhKHIoXCJJbnN0cnVtZW50RWxlbWVudFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcIm90aGVyQ29uZmlnXCIsIGpzOiBcIm90aGVyQ29uZmlnXCIsIHR5cDogdSh1bmRlZmluZWQsIGEocihcIkNvbnRleHRFbGVtZW50XCIpKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInJhbmdlXCIsIGpzOiBcInJhbmdlXCIsIHR5cDogdSh1bmRlZmluZWQsIHIoXCJUaW1lUmFuZ2VPYmplY3RcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJzdHlsZVwiLCBqczogXCJzdHlsZVwiLCB0eXA6IHUodW5kZWZpbmVkLCByKFwiQ2hhcnRTdHlsZVwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIoXCJDaGFydFR5cGVcIikgfSxcbiAgICAgICAgeyBqc29uOiBcImlkXCIsIGpzOiBcImlkXCIsIHR5cDogdSh1bmRlZmluZWQsIG0oXCJhbnlcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIkluc3RydW1lbnRFbGVtZW50XCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiaWRcIiwganM6IFwiaWRcIiwgdHlwOiByKFwiUHVycGxlSW5zdHJ1bWVudElkZW50aWZpZXJzXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJtYXJrZXRcIiwganM6IFwibWFya2V0XCIsIHR5cDogdSh1bmRlZmluZWQsIHIoXCJPcmdhbml6YXRpb25NYXJrZXRcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByKFwiUHVycGxlSW50ZXJhY3Rpb25UeXBlXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIlB1cnBsZUluc3RydW1lbnRJZGVudGlmaWVyc1wiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcIkJCR1wiLCBqczogXCJCQkdcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIkNVU0lQXCIsIGpzOiBcIkNVU0lQXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJGRFNfSURcIiwganM6IFwiRkRTX0lEXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJGSUdJXCIsIGpzOiBcIkZJR0lcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIklTSU5cIiwganM6IFwiSVNJTlwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiUEVSTUlEXCIsIGpzOiBcIlBFUk1JRFwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiUklDXCIsIGpzOiBcIlJJQ1wiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiU0VET0xcIiwganM6IFwiU0VET0xcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInRpY2tlclwiLCBqczogXCJ0aWNrZXJcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIk9yZ2FuaXphdGlvbk1hcmtldFwiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcIkJCR1wiLCBqczogXCJCQkdcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIkNPVU5UUllfSVNPQUxQSEEyXCIsIGpzOiBcIkNPVU5UUllfSVNPQUxQSEEyXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJNSUNcIiwganM6IFwiTUlDXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIlRpbWVSYW5nZU9iamVjdFwiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcImVuZFRpbWVcIiwganM6IFwiZW5kVGltZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBEYXRlKSB9LFxuICAgICAgICB7IGpzb246IFwic3RhcnRUaW1lXCIsIGpzOiBcInN0YXJ0VGltZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBEYXRlKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogcihcIlRpbWVSYW5nZVR5cGVcIikgfSxcbiAgICAgICAgeyBqc29uOiBcImlkXCIsIGpzOiBcImlkXCIsIHR5cDogdSh1bmRlZmluZWQsIG0oXCJhbnlcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIkNoYXRJbml0U2V0dGluZ3NcIjogbyhbXG4gICAgICAgIHsganNvbjogXCJjaGF0TmFtZVwiLCBqczogXCJjaGF0TmFtZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwibWVtYmVyc1wiLCBqczogXCJtZW1iZXJzXCIsIHR5cDogdSh1bmRlZmluZWQsIHIoXCJDb250YWN0TGlzdE9iamVjdFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcIm1lc3NhZ2VcIiwganM6IFwibWVzc2FnZVwiLCB0eXA6IHUodW5kZWZpbmVkLCB1KHIoXCJNZXNzYWdlT2JqZWN0XCIpLCBcIlwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcIm9wdGlvbnNcIiwganM6IFwib3B0aW9uc1wiLCB0eXA6IHUodW5kZWZpbmVkLCByKFwiQ2hhdE9wdGlvbnNcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByKFwiQ2hhdEluaXRTZXR0aW5nc1R5cGVcIikgfSxcbiAgICAgICAgeyBqc29uOiBcImlkXCIsIGpzOiBcImlkXCIsIHR5cDogdSh1bmRlZmluZWQsIG0oXCJhbnlcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIkNvbnRhY3RMaXN0T2JqZWN0XCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiY29udGFjdHNcIiwganM6IFwiY29udGFjdHNcIiwgdHlwOiBhKHIoXCJDb250YWN0RWxlbWVudFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIoXCJDb250YWN0TGlzdFR5cGVcIikgfSxcbiAgICAgICAgeyBqc29uOiBcImlkXCIsIGpzOiBcImlkXCIsIHR5cDogdSh1bmRlZmluZWQsIG0oXCJhbnlcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIkNvbnRhY3RFbGVtZW50XCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiaWRcIiwganM6IFwiaWRcIiwgdHlwOiByKFwiUHVycGxlQ29udGFjdElkZW50aWZpZXJzXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByKFwiRmx1ZmZ5SW50ZXJhY3Rpb25UeXBlXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIlB1cnBsZUNvbnRhY3RJZGVudGlmaWVyc1wiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcImVtYWlsXCIsIGpzOiBcImVtYWlsXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJGRFNfSURcIiwganM6IFwiRkRTX0lEXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJNZXNzYWdlT2JqZWN0XCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiZW50aXRpZXNcIiwganM6IFwiZW50aXRpZXNcIiwgdHlwOiB1KHVuZGVmaW5lZCwgbShyKFwiUHVycGxlQWN0aW9uXCIpKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInRleHRcIiwganM6IFwidGV4dFwiLCB0eXA6IHUodW5kZWZpbmVkLCByKFwiUHVycGxlTWVzc2FnZVRleHRcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByKFwiTWVzc2FnZVR5cGVcIikgfSxcbiAgICAgICAgeyBqc29uOiBcImlkXCIsIGpzOiBcImlkXCIsIHR5cDogdSh1bmRlZmluZWQsIG0oXCJhbnlcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIlB1cnBsZUFjdGlvblwiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcImFwcFwiLCBqczogXCJhcHBcIiwgdHlwOiB1KHVuZGVmaW5lZCwgcihcIkFjdGlvblRhcmdldEFwcFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcImNvbnRleHRcIiwganM6IFwiY29udGV4dFwiLCB0eXA6IHUodW5kZWZpbmVkLCByKFwiQ29udGV4dEVsZW1lbnRcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJpbnRlbnRcIiwganM6IFwiaW50ZW50XCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0aXRsZVwiLCBqczogXCJ0aXRsZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogcihcIkVudGl0eVR5cGVcIikgfSxcbiAgICAgICAgeyBqc29uOiBcImlkXCIsIGpzOiBcImlkXCIsIHR5cDogdSh1bmRlZmluZWQsIG0oXCJhbnlcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcImRhdGFcIiwganM6IFwiZGF0YVwiLCB0eXA6IHUodW5kZWZpbmVkLCByKFwiUHVycGxlRGF0YVwiKSkgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIlB1cnBsZURhdGFcIjogbyhbXG4gICAgICAgIHsganNvbjogXCJkYXRhVXJpXCIsIGpzOiBcImRhdGFVcmlcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiBcIlwiIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJQdXJwbGVNZXNzYWdlVGV4dFwiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcInRleHQvbWFya2Rvd25cIiwganM6IFwidGV4dC9tYXJrZG93blwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwidGV4dC9wbGFpblwiLCBqczogXCJ0ZXh0L3BsYWluXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJDaGF0T3B0aW9uc1wiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcImFsbG93QWRkVXNlclwiLCBqczogXCJhbGxvd0FkZFVzZXJcIiwgdHlwOiB1KHVuZGVmaW5lZCwgdHJ1ZSkgfSxcbiAgICAgICAgeyBqc29uOiBcImFsbG93SGlzdG9yeUJyb3dzaW5nXCIsIGpzOiBcImFsbG93SGlzdG9yeUJyb3dzaW5nXCIsIHR5cDogdSh1bmRlZmluZWQsIHRydWUpIH0sXG4gICAgICAgIHsganNvbjogXCJhbGxvd01lc3NhZ2VDb3B5XCIsIGpzOiBcImFsbG93TWVzc2FnZUNvcHlcIiwgdHlwOiB1KHVuZGVmaW5lZCwgdHJ1ZSkgfSxcbiAgICAgICAgeyBqc29uOiBcImdyb3VwUmVjaXBpZW50c1wiLCBqczogXCJncm91cFJlY2lwaWVudHNcIiwgdHlwOiB1KHVuZGVmaW5lZCwgdHJ1ZSkgfSxcbiAgICAgICAgeyBqc29uOiBcImlzUHVibGljXCIsIGpzOiBcImlzUHVibGljXCIsIHR5cDogdSh1bmRlZmluZWQsIHRydWUpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJDaGF0TWVzc2FnZVwiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcImNoYXRSb29tXCIsIGpzOiBcImNoYXRSb29tXCIsIHR5cDogcihcIkNoYXRSb29tT2JqZWN0XCIpIH0sXG4gICAgICAgIHsganNvbjogXCJtZXNzYWdlXCIsIGpzOiBcIm1lc3NhZ2VcIiwgdHlwOiByKFwiTWVzc2FnZU9iamVjdFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogcihcIkNoYXRNZXNzYWdlVHlwZVwiKSB9LFxuICAgICAgICB7IGpzb246IFwiaWRcIiwganM6IFwiaWRcIiwgdHlwOiB1KHVuZGVmaW5lZCwgbShcImFueVwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcIm5hbWVcIiwganM6IFwibmFtZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiQ2hhdFJvb21PYmplY3RcIjogbyhbXG4gICAgICAgIHsganNvbjogXCJpZFwiLCBqczogXCJpZFwiLCB0eXA6IG0oXCJhbnlcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIm5hbWVcIiwganM6IFwibmFtZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwicHJvdmlkZXJOYW1lXCIsIGpzOiBcInByb3ZpZGVyTmFtZVwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIoXCJDaGF0Um9vbVR5cGVcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInVybFwiLCBqczogXCJ1cmxcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIkNoYXRSb29tXCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiaWRcIiwganM6IFwiaWRcIiwgdHlwOiBtKFwiYW55XCIpIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInByb3ZpZGVyTmFtZVwiLCBqczogXCJwcm92aWRlck5hbWVcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByKFwiQ2hhdFJvb21UeXBlXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ1cmxcIiwganM6IFwidXJsXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJDaGF0U2VhcmNoQ3JpdGVyaWFcIjogbyhbXG4gICAgICAgIHsganNvbjogXCJjcml0ZXJpYVwiLCBqczogXCJjcml0ZXJpYVwiLCB0eXA6IGEodShyKFwiT3JnYW5pemF0aW9uT2JqZWN0XCIpLCBcIlwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIoXCJDaGF0U2VhcmNoQ3JpdGVyaWFUeXBlXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJpZFwiLCBqczogXCJpZFwiLCB0eXA6IHUodW5kZWZpbmVkLCBtKFwiYW55XCIpKSB9LFxuICAgICAgICB7IGpzb246IFwibmFtZVwiLCBqczogXCJuYW1lXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJPcmdhbml6YXRpb25PYmplY3RcIjogbyhbXG4gICAgICAgIHsganNvbjogXCJpZFwiLCBqczogXCJpZFwiLCB0eXA6IHIoXCJJZGVudGlmaWVyc1wiKSB9LFxuICAgICAgICB7IGpzb246IFwibWFya2V0XCIsIGpzOiBcIm1hcmtldFwiLCB0eXA6IHUodW5kZWZpbmVkLCByKFwiT3JnYW5pemF0aW9uTWFya2V0XCIpKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogcihcIlRlbnRhY2xlZEludGVyYWN0aW9uVHlwZVwiKSB9LFxuICAgICAgICB7IGpzb246IFwibmFtZVwiLCBqczogXCJuYW1lXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJJZGVudGlmaWVyc1wiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcIkJCR1wiLCBqczogXCJCQkdcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIkNVU0lQXCIsIGpzOiBcIkNVU0lQXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJGRFNfSURcIiwganM6IFwiRkRTX0lEXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJGSUdJXCIsIGpzOiBcIkZJR0lcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIklTSU5cIiwganM6IFwiSVNJTlwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiUEVSTUlEXCIsIGpzOiBcIlBFUk1JRFwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiUklDXCIsIGpzOiBcIlJJQ1wiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiU0VET0xcIiwganM6IFwiU0VET0xcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInRpY2tlclwiLCBqczogXCJ0aWNrZXJcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIkxFSVwiLCBqczogXCJMRUlcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcImVtYWlsXCIsIGpzOiBcImVtYWlsXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJDb250YWN0XCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiaWRcIiwganM6IFwiaWRcIiwgdHlwOiByKFwiRmx1ZmZ5Q29udGFjdElkZW50aWZpZXJzXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByKFwiRmx1ZmZ5SW50ZXJhY3Rpb25UeXBlXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIkZsdWZmeUNvbnRhY3RJZGVudGlmaWVyc1wiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcImVtYWlsXCIsIGpzOiBcImVtYWlsXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJGRFNfSURcIiwganM6IFwiRkRTX0lEXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJDb250YWN0TGlzdFwiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcImNvbnRhY3RzXCIsIGpzOiBcImNvbnRhY3RzXCIsIHR5cDogYShyKFwiQ29udGFjdEVsZW1lbnRcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByKFwiQ29udGFjdExpc3RUeXBlXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJpZFwiLCBqczogXCJpZFwiLCB0eXA6IHUodW5kZWZpbmVkLCBtKFwiYW55XCIpKSB9LFxuICAgICAgICB7IGpzb246IFwibmFtZVwiLCBqczogXCJuYW1lXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJDb250ZXh0XCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiaWRcIiwganM6IFwiaWRcIiwgdHlwOiB1KHVuZGVmaW5lZCwgbShcImFueVwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcIm5hbWVcIiwganM6IFwibmFtZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogXCJcIiB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiQ291bnRyeVwiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcImlkXCIsIGpzOiBcImlkXCIsIHR5cDogcihcIkNvdW50cnlJRFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogcihcIkNvdW50cnlUeXBlXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIkNvdW50cnlJRFwiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcIkNPVU5UUllfSVNPQUxQSEEyXCIsIGpzOiBcIkNPVU5UUllfSVNPQUxQSEEyXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJDT1VOVFJZX0lTT0FMUEhBM1wiLCBqczogXCJDT1VOVFJZX0lTT0FMUEhBM1wiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiSVNPQUxQSEEyXCIsIGpzOiBcIklTT0FMUEhBMlwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiSVNPQUxQSEEzXCIsIGpzOiBcIklTT0FMUEhBM1wiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiQ3VycmVuY3lcIjogbyhbXG4gICAgICAgIHsganNvbjogXCJpZFwiLCBqczogXCJpZFwiLCB0eXA6IHIoXCJDdXJyZW5jeUlEXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIoXCJDdXJyZW5jeVR5cGVcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIkN1cnJlbmN5SURcIjogbyhbXG4gICAgICAgIHsganNvbjogXCJDVVJSRU5DWV9JU09DT0RFXCIsIGpzOiBcIkNVUlJFTkNZX0lTT0NPREVcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIkVtYWlsXCI6IG8oW1xuICAgICAgICB7IGpzb246IFwicmVjaXBpZW50c1wiLCBqczogXCJyZWNpcGllbnRzXCIsIHR5cDogcihcIkVtYWlsUmVjaXBpZW50c1wiKSB9LFxuICAgICAgICB7IGpzb246IFwic3ViamVjdFwiLCBqczogXCJzdWJqZWN0XCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0ZXh0Qm9keVwiLCBqczogXCJ0ZXh0Qm9keVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogcihcIkVtYWlsVHlwZVwiKSB9LFxuICAgICAgICB7IGpzb246IFwiaWRcIiwganM6IFwiaWRcIiwgdHlwOiB1KHVuZGVmaW5lZCwgbShcImFueVwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcIm5hbWVcIiwganM6IFwibmFtZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiRW1haWxSZWNpcGllbnRzXCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiaWRcIiwganM6IFwiaWRcIiwgdHlwOiB1KHVuZGVmaW5lZCwgcihcIkVtYWlsUmVjaXBpZW50c0lEXCIpKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogcihcIkVtYWlsUmVjaXBpZW50c1R5cGVcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIm5hbWVcIiwganM6IFwibmFtZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiY29udGFjdHNcIiwganM6IFwiY29udGFjdHNcIiwgdHlwOiB1KHVuZGVmaW5lZCwgYShyKFwiQ29udGFjdEVsZW1lbnRcIikpKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiRW1haWxSZWNpcGllbnRzSURcIjogbyhbXG4gICAgICAgIHsganNvbjogXCJlbWFpbFwiLCBqczogXCJlbWFpbFwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiRkRTX0lEXCIsIGpzOiBcIkZEU19JRFwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiSW5zdHJ1bWVudFwiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcImlkXCIsIGpzOiBcImlkXCIsIHR5cDogcihcIkZsdWZmeUluc3RydW1lbnRJZGVudGlmaWVyc1wiKSB9LFxuICAgICAgICB7IGpzb246IFwibWFya2V0XCIsIGpzOiBcIm1hcmtldFwiLCB0eXA6IHUodW5kZWZpbmVkLCByKFwiUHVycGxlTWFya2V0XCIpKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogcihcIlB1cnBsZUludGVyYWN0aW9uVHlwZVwiKSB9LFxuICAgICAgICB7IGpzb246IFwibmFtZVwiLCBqczogXCJuYW1lXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJGbHVmZnlJbnN0cnVtZW50SWRlbnRpZmllcnNcIjogbyhbXG4gICAgICAgIHsganNvbjogXCJCQkdcIiwganM6IFwiQkJHXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJDVVNJUFwiLCBqczogXCJDVVNJUFwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiRkRTX0lEXCIsIGpzOiBcIkZEU19JRFwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiRklHSVwiLCBqczogXCJGSUdJXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJJU0lOXCIsIGpzOiBcIklTSU5cIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIlBFUk1JRFwiLCBqczogXCJQRVJNSURcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIlJJQ1wiLCBqczogXCJSSUNcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIlNFRE9MXCIsIGpzOiBcIlNFRE9MXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0aWNrZXJcIiwganM6IFwidGlja2VyXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJQdXJwbGVNYXJrZXRcIjogbyhbXG4gICAgICAgIHsganNvbjogXCJCQkdcIiwganM6IFwiQkJHXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJDT1VOVFJZX0lTT0FMUEhBMlwiLCBqczogXCJDT1VOVFJZX0lTT0FMUEhBMlwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiTUlDXCIsIGpzOiBcIk1JQ1wiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwibmFtZVwiLCBqczogXCJuYW1lXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJJbnN0cnVtZW50TGlzdFwiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcImluc3RydW1lbnRzXCIsIGpzOiBcImluc3RydW1lbnRzXCIsIHR5cDogYShyKFwiSW5zdHJ1bWVudEVsZW1lbnRcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByKFwiSW5zdHJ1bWVudExpc3RUeXBlXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJpZFwiLCBqczogXCJpZFwiLCB0eXA6IHUodW5kZWZpbmVkLCBtKFwiYW55XCIpKSB9LFxuICAgICAgICB7IGpzb246IFwibmFtZVwiLCBqczogXCJuYW1lXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJJbnRlcmFjdGlvblwiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcImRlc2NyaXB0aW9uXCIsIGpzOiBcImRlc2NyaXB0aW9uXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwiaWRcIiwganM6IFwiaWRcIiwgdHlwOiB1KHVuZGVmaW5lZCwgcihcIkludGVyYWN0aW9uSURcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJpbml0aWF0b3JcIiwganM6IFwiaW5pdGlhdG9yXCIsIHR5cDogdSh1bmRlZmluZWQsIHIoXCJDb250YWN0RWxlbWVudFwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcImludGVyYWN0aW9uVHlwZVwiLCBqczogXCJpbnRlcmFjdGlvblR5cGVcIiwgdHlwOiBcIlwiIH0sXG4gICAgICAgIHsganNvbjogXCJvcmlnaW5cIiwganM6IFwib3JpZ2luXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJwYXJ0aWNpcGFudHNcIiwganM6IFwicGFydGljaXBhbnRzXCIsIHR5cDogcihcIkNvbnRhY3RMaXN0T2JqZWN0XCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0aW1lUmFuZ2VcIiwganM6IFwidGltZVJhbmdlXCIsIHR5cDogcihcIlRpbWVSYW5nZU9iamVjdFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogcihcIkludGVyYWN0aW9uVHlwZVwiKSB9LFxuICAgICAgICB7IGpzb246IFwibmFtZVwiLCBqczogXCJuYW1lXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJJbnRlcmFjdGlvbklEXCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiU0FMRVNGT1JDRVwiLCBqczogXCJTQUxFU0ZPUkNFXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJTSU5HTEVUUkFDS1wiLCBqczogXCJTSU5HTEVUUkFDS1wiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwiVVJJXCIsIGpzOiBcIlVSSVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiTWVzc2FnZVwiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcImVudGl0aWVzXCIsIGpzOiBcImVudGl0aWVzXCIsIHR5cDogdSh1bmRlZmluZWQsIG0ocihcIkZsdWZmeUFjdGlvblwiKSkpIH0sXG4gICAgICAgIHsganNvbjogXCJ0ZXh0XCIsIGpzOiBcInRleHRcIiwgdHlwOiB1KHVuZGVmaW5lZCwgcihcIkZsdWZmeU1lc3NhZ2VUZXh0XCIpKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogcihcIk1lc3NhZ2VUeXBlXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJpZFwiLCBqczogXCJpZFwiLCB0eXA6IHUodW5kZWZpbmVkLCBtKFwiYW55XCIpKSB9LFxuICAgICAgICB7IGpzb246IFwibmFtZVwiLCBqczogXCJuYW1lXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJGbHVmZnlBY3Rpb25cIjogbyhbXG4gICAgICAgIHsganNvbjogXCJhcHBcIiwganM6IFwiYXBwXCIsIHR5cDogdSh1bmRlZmluZWQsIHIoXCJBY3Rpb25UYXJnZXRBcHBcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJjb250ZXh0XCIsIGpzOiBcImNvbnRleHRcIiwgdHlwOiB1KHVuZGVmaW5lZCwgcihcIkNvbnRleHRFbGVtZW50XCIpKSB9LFxuICAgICAgICB7IGpzb246IFwiaW50ZW50XCIsIGpzOiBcImludGVudFwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwidGl0bGVcIiwganM6IFwidGl0bGVcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIoXCJFbnRpdHlUeXBlXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJpZFwiLCBqczogXCJpZFwiLCB0eXA6IHUodW5kZWZpbmVkLCBtKFwiYW55XCIpKSB9LFxuICAgICAgICB7IGpzb246IFwibmFtZVwiLCBqczogXCJuYW1lXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJkYXRhXCIsIGpzOiBcImRhdGFcIiwgdHlwOiB1KHVuZGVmaW5lZCwgcihcIkZsdWZmeURhdGFcIikpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJGbHVmZnlEYXRhXCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiZGF0YVVyaVwiLCBqczogXCJkYXRhVXJpXCIsIHR5cDogXCJcIiB9LFxuICAgICAgICB7IGpzb246IFwibmFtZVwiLCBqczogXCJuYW1lXCIsIHR5cDogXCJcIiB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiRmx1ZmZ5TWVzc2FnZVRleHRcIjogbyhbXG4gICAgICAgIHsganNvbjogXCJ0ZXh0L21hcmtkb3duXCIsIGpzOiBcInRleHQvbWFya2Rvd25cIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInRleHQvcGxhaW5cIiwganM6IFwidGV4dC9wbGFpblwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiTm90aGluZ1wiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIoXCJOb3RoaW5nVHlwZVwiKSB9LFxuICAgICAgICB7IGpzb246IFwiaWRcIiwganM6IFwiaWRcIiwgdHlwOiB1KHVuZGVmaW5lZCwgbShcImFueVwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcIm5hbWVcIiwganM6IFwibmFtZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiT3JkZXJcIjogbyhbXG4gICAgICAgIHsganNvbjogXCJkZXRhaWxzXCIsIGpzOiBcImRldGFpbHNcIiwgdHlwOiB1KHVuZGVmaW5lZCwgcihcIlB1cnBsZU9yZGVyRGV0YWlsc1wiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcImlkXCIsIGpzOiBcImlkXCIsIHR5cDogbShcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwibmFtZVwiLCBqczogXCJuYW1lXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByKFwiT3JkZXJUeXBlXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJQdXJwbGVPcmRlckRldGFpbHNcIjogbyhbXG4gICAgICAgIHsganNvbjogXCJwcm9kdWN0XCIsIGpzOiBcInByb2R1Y3RcIiwgdHlwOiB1KHVuZGVmaW5lZCwgcihcIlByb2R1Y3RPYmplY3RcIikpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJQcm9kdWN0T2JqZWN0XCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiaWRcIiwganM6IFwiaWRcIiwgdHlwOiBtKFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJpbnN0cnVtZW50XCIsIGpzOiBcImluc3RydW1lbnRcIiwgdHlwOiB1KHVuZGVmaW5lZCwgcihcIkluc3RydW1lbnRFbGVtZW50XCIpKSB9LFxuICAgICAgICB7IGpzb246IFwibmFtZVwiLCBqczogXCJuYW1lXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByKFwiUHJvZHVjdFR5cGVcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIk9yZGVyTGlzdFwiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcIm9yZGVyc1wiLCBqczogXCJvcmRlcnNcIiwgdHlwOiBhKHIoXCJPcmRlckVsZW1lbnRcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByKFwiT3JkZXJMaXN0VHlwZVwiKSB9LFxuICAgICAgICB7IGpzb246IFwiaWRcIiwganM6IFwiaWRcIiwgdHlwOiB1KHVuZGVmaW5lZCwgbShcImFueVwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcIm5hbWVcIiwganM6IFwibmFtZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiT3JkZXJFbGVtZW50XCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiZGV0YWlsc1wiLCBqczogXCJkZXRhaWxzXCIsIHR5cDogdSh1bmRlZmluZWQsIHIoXCJGbHVmZnlPcmRlckRldGFpbHNcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJpZFwiLCBqczogXCJpZFwiLCB0eXA6IG0oXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIm5hbWVcIiwganM6IFwibmFtZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogcihcIk9yZGVyVHlwZVwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiRmx1ZmZ5T3JkZXJEZXRhaWxzXCI6IG8oW1xuICAgICAgICB7IGpzb246IFwicHJvZHVjdFwiLCBqczogXCJwcm9kdWN0XCIsIHR5cDogdSh1bmRlZmluZWQsIHIoXCJQcm9kdWN0T2JqZWN0XCIpKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiT3JnYW5pemF0aW9uXCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiaWRcIiwganM6IFwiaWRcIiwgdHlwOiByKFwiT3JnYW5pemF0aW9uSWRlbnRpZmllcnNcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIoXCJTdGlja3lJbnRlcmFjdGlvblR5cGVcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIm5hbWVcIiwganM6IFwibmFtZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiT3JnYW5pemF0aW9uSWRlbnRpZmllcnNcIjogbyhbXG4gICAgICAgIHsganNvbjogXCJGRFNfSURcIiwganM6IFwiRkRTX0lEXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJMRUlcIiwganM6IFwiTEVJXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJQRVJNSURcIiwganM6IFwiUEVSTUlEXCIsIHR5cDogdSh1bmRlZmluZWQsIFwiXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJQb3J0Zm9saW9cIjogbyhbXG4gICAgICAgIHsganNvbjogXCJwb3NpdGlvbnNcIiwganM6IFwicG9zaXRpb25zXCIsIHR5cDogYShyKFwiUG9zaXRpb25FbGVtZW50XCIpKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogcihcIlBvcnRmb2xpb1R5cGVcIikgfSxcbiAgICAgICAgeyBqc29uOiBcImlkXCIsIGpzOiBcImlkXCIsIHR5cDogdSh1bmRlZmluZWQsIG0oXCJhbnlcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIlBvc2l0aW9uRWxlbWVudFwiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcImhvbGRpbmdcIiwganM6IFwiaG9sZGluZ1wiLCB0eXA6IDMuMTQgfSxcbiAgICAgICAgeyBqc29uOiBcImluc3RydW1lbnRcIiwganM6IFwiaW5zdHJ1bWVudFwiLCB0eXA6IHIoXCJJbnN0cnVtZW50RWxlbWVudFwiKSB9LFxuICAgICAgICB7IGpzb246IFwidHlwZVwiLCBqczogXCJ0eXBlXCIsIHR5cDogcihcIlBvc2l0aW9uVHlwZVwiKSB9LFxuICAgICAgICB7IGpzb246IFwiaWRcIiwganM6IFwiaWRcIiwgdHlwOiB1KHVuZGVmaW5lZCwgbShcImFueVwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcIm5hbWVcIiwganM6IFwibmFtZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiUG9zaXRpb25cIjogbyhbXG4gICAgICAgIHsganNvbjogXCJob2xkaW5nXCIsIGpzOiBcImhvbGRpbmdcIiwgdHlwOiAzLjE0IH0sXG4gICAgICAgIHsganNvbjogXCJpbnN0cnVtZW50XCIsIGpzOiBcImluc3RydW1lbnRcIiwgdHlwOiByKFwiSW5zdHJ1bWVudEVsZW1lbnRcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIoXCJQb3NpdGlvblR5cGVcIikgfSxcbiAgICAgICAgeyBqc29uOiBcImlkXCIsIGpzOiBcImlkXCIsIHR5cDogdSh1bmRlZmluZWQsIG0oXCJhbnlcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIlByb2R1Y3RcIjogbyhbXG4gICAgICAgIHsganNvbjogXCJpZFwiLCBqczogXCJpZFwiLCB0eXA6IG0oXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcImluc3RydW1lbnRcIiwganM6IFwiaW5zdHJ1bWVudFwiLCB0eXA6IHUodW5kZWZpbmVkLCByKFwiSW5zdHJ1bWVudEVsZW1lbnRcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIoXCJQcm9kdWN0VHlwZVwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiVGltZVJhbmdlXCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiZW5kVGltZVwiLCBqczogXCJlbmRUaW1lXCIsIHR5cDogdSh1bmRlZmluZWQsIERhdGUpIH0sXG4gICAgICAgIHsganNvbjogXCJzdGFydFRpbWVcIiwganM6IFwic3RhcnRUaW1lXCIsIHR5cDogdSh1bmRlZmluZWQsIERhdGUpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByKFwiVGltZVJhbmdlVHlwZVwiKSB9LFxuICAgICAgICB7IGpzb246IFwiaWRcIiwganM6IFwiaWRcIiwgdHlwOiB1KHVuZGVmaW5lZCwgbShcImFueVwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcIm5hbWVcIiwganM6IFwibmFtZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiVHJhZGVcIjogbyhbXG4gICAgICAgIHsganNvbjogXCJpZFwiLCBqczogXCJpZFwiLCB0eXA6IG0oXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcIm5hbWVcIiwganM6IFwibmFtZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgICAgICB7IGpzb246IFwicHJvZHVjdFwiLCBqczogXCJwcm9kdWN0XCIsIHR5cDogcihcIlByb2R1Y3RPYmplY3RcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIoXCJUcmFkZVR5cGVcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIlRyYWRlTGlzdFwiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcInRyYWRlc1wiLCBqczogXCJ0cmFkZXNcIiwgdHlwOiBhKHIoXCJUcmFkZUVsZW1lbnRcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByKFwiVHJhZGVMaXN0VHlwZVwiKSB9LFxuICAgICAgICB7IGpzb246IFwiaWRcIiwganM6IFwiaWRcIiwgdHlwOiB1KHVuZGVmaW5lZCwgbShcImFueVwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcIm5hbWVcIiwganM6IFwibmFtZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiVHJhZGVFbGVtZW50XCI6IG8oW1xuICAgICAgICB7IGpzb246IFwiaWRcIiwganM6IFwiaWRcIiwgdHlwOiBtKFwiXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInByb2R1Y3RcIiwganM6IFwicHJvZHVjdFwiLCB0eXA6IHIoXCJQcm9kdWN0T2JqZWN0XCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ0eXBlXCIsIGpzOiBcInR5cGVcIiwgdHlwOiByKFwiVHJhZGVUeXBlXCIpIH0sXG4gICAgXSwgXCJhbnlcIiksXG4gICAgXCJUcmFuc2FjdGlvblJlc3VsdFwiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcImNvbnRleHRcIiwganM6IFwiY29udGV4dFwiLCB0eXA6IHUodW5kZWZpbmVkLCByKFwiQ29udGV4dEVsZW1lbnRcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJtZXNzYWdlXCIsIGpzOiBcIm1lc3NhZ2VcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInN0YXR1c1wiLCBqczogXCJzdGF0dXNcIiwgdHlwOiByKFwiVHJhbnNhY3Rpb25TdGF0dXNcIikgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIoXCJUcmFuc2FjdGlvblJlc3VsdFR5cGVcIikgfSxcbiAgICAgICAgeyBqc29uOiBcImlkXCIsIGpzOiBcImlkXCIsIHR5cDogdSh1bmRlZmluZWQsIG0oXCJhbnlcIikpIH0sXG4gICAgICAgIHsganNvbjogXCJuYW1lXCIsIGpzOiBcIm5hbWVcIiwgdHlwOiB1KHVuZGVmaW5lZCwgXCJcIikgfSxcbiAgICBdLCBcImFueVwiKSxcbiAgICBcIlZhbHVhdGlvblwiOiBvKFtcbiAgICAgICAgeyBqc29uOiBcIkNVUlJFTkNZX0lTT0NPREVcIiwganM6IFwiQ1VSUkVOQ1lfSVNPQ09ERVwiLCB0eXA6IFwiXCIgfSxcbiAgICAgICAgeyBqc29uOiBcImV4cGlyeVRpbWVcIiwganM6IFwiZXhwaXJ5VGltZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBEYXRlKSB9LFxuICAgICAgICB7IGpzb246IFwicHJpY2VcIiwganM6IFwicHJpY2VcIiwgdHlwOiB1KHVuZGVmaW5lZCwgMy4xNCkgfSxcbiAgICAgICAgeyBqc29uOiBcInR5cGVcIiwganM6IFwidHlwZVwiLCB0eXA6IHIoXCJWYWx1YXRpb25UeXBlXCIpIH0sXG4gICAgICAgIHsganNvbjogXCJ2YWx1YXRpb25UaW1lXCIsIGpzOiBcInZhbHVhdGlvblRpbWVcIiwgdHlwOiB1KHVuZGVmaW5lZCwgRGF0ZSkgfSxcbiAgICAgICAgeyBqc29uOiBcInZhbHVlXCIsIGpzOiBcInZhbHVlXCIsIHR5cDogMy4xNCB9LFxuICAgICAgICB7IGpzb246IFwiaWRcIiwganM6IFwiaWRcIiwgdHlwOiB1KHVuZGVmaW5lZCwgbShcImFueVwiKSkgfSxcbiAgICAgICAgeyBqc29uOiBcIm5hbWVcIiwganM6IFwibmFtZVwiLCB0eXA6IHUodW5kZWZpbmVkLCBcIlwiKSB9LFxuICAgIF0sIFwiYW55XCIpLFxuICAgIFwiQWN0aW9uVHlwZVwiOiBbXG4gICAgICAgIFwiZmRjMy5hY3Rpb25cIixcbiAgICBdLFxuICAgIFwiUHVycGxlSW50ZXJhY3Rpb25UeXBlXCI6IFtcbiAgICAgICAgXCJmZGMzLmluc3RydW1lbnRcIixcbiAgICBdLFxuICAgIFwiVGltZVJhbmdlVHlwZVwiOiBbXG4gICAgICAgIFwiZmRjMy50aW1lUmFuZ2VcIixcbiAgICBdLFxuICAgIFwiQ2hhcnRTdHlsZVwiOiBbXG4gICAgICAgIFwiYmFyXCIsXG4gICAgICAgIFwiY2FuZGxlXCIsXG4gICAgICAgIFwiY3VzdG9tXCIsXG4gICAgICAgIFwiaGVhdG1hcFwiLFxuICAgICAgICBcImhpc3RvZ3JhbVwiLFxuICAgICAgICBcImxpbmVcIixcbiAgICAgICAgXCJtb3VudGFpblwiLFxuICAgICAgICBcInBpZVwiLFxuICAgICAgICBcInNjYXR0ZXJcIixcbiAgICAgICAgXCJzdGFja2VkLWJhclwiLFxuICAgIF0sXG4gICAgXCJDaGFydFR5cGVcIjogW1xuICAgICAgICBcImZkYzMuY2hhcnRcIixcbiAgICBdLFxuICAgIFwiRmx1ZmZ5SW50ZXJhY3Rpb25UeXBlXCI6IFtcbiAgICAgICAgXCJmZGMzLmNvbnRhY3RcIixcbiAgICBdLFxuICAgIFwiQ29udGFjdExpc3RUeXBlXCI6IFtcbiAgICAgICAgXCJmZGMzLmNvbnRhY3RMaXN0XCIsXG4gICAgXSxcbiAgICBcIkVudGl0eVR5cGVcIjogW1xuICAgICAgICBcImZkYzMuYWN0aW9uXCIsXG4gICAgICAgIFwiZmRjMy5lbnRpdHkuZmlsZUF0dGFjaG1lbnRcIixcbiAgICBdLFxuICAgIFwiTWVzc2FnZVR5cGVcIjogW1xuICAgICAgICBcImZkYzMubWVzc2FnZVwiLFxuICAgIF0sXG4gICAgXCJDaGF0SW5pdFNldHRpbmdzVHlwZVwiOiBbXG4gICAgICAgIFwiZmRjMy5jaGF0LmluaXRTZXR0aW5nc1wiLFxuICAgIF0sXG4gICAgXCJDaGF0Um9vbVR5cGVcIjogW1xuICAgICAgICBcImZkYzMuY2hhdC5yb29tXCIsXG4gICAgXSxcbiAgICBcIkNoYXRNZXNzYWdlVHlwZVwiOiBbXG4gICAgICAgIFwiZmRjMy5jaGF0Lm1lc3NhZ2VcIixcbiAgICBdLFxuICAgIFwiVGVudGFjbGVkSW50ZXJhY3Rpb25UeXBlXCI6IFtcbiAgICAgICAgXCJmZGMzLmNvbnRhY3RcIixcbiAgICAgICAgXCJmZGMzLmluc3RydW1lbnRcIixcbiAgICAgICAgXCJmZGMzLm9yZ2FuaXphdGlvblwiLFxuICAgIF0sXG4gICAgXCJDaGF0U2VhcmNoQ3JpdGVyaWFUeXBlXCI6IFtcbiAgICAgICAgXCJmZGMzLmNoYXQuc2VhcmNoQ3JpdGVyaWFcIixcbiAgICBdLFxuICAgIFwiQ291bnRyeVR5cGVcIjogW1xuICAgICAgICBcImZkYzMuY291bnRyeVwiLFxuICAgIF0sXG4gICAgXCJDdXJyZW5jeVR5cGVcIjogW1xuICAgICAgICBcImZkYzMuY3VycmVuY3lcIixcbiAgICBdLFxuICAgIFwiRW1haWxSZWNpcGllbnRzVHlwZVwiOiBbXG4gICAgICAgIFwiZmRjMy5jb250YWN0XCIsXG4gICAgICAgIFwiZmRjMy5jb250YWN0TGlzdFwiLFxuICAgIF0sXG4gICAgXCJFbWFpbFR5cGVcIjogW1xuICAgICAgICBcImZkYzMuZW1haWxcIixcbiAgICBdLFxuICAgIFwiSW5zdHJ1bWVudExpc3RUeXBlXCI6IFtcbiAgICAgICAgXCJmZGMzLmluc3RydW1lbnRMaXN0XCIsXG4gICAgXSxcbiAgICBcIkludGVyYWN0aW9uVHlwZVwiOiBbXG4gICAgICAgIFwiZmRjMy5pbnRlcmFjdGlvblwiLFxuICAgIF0sXG4gICAgXCJOb3RoaW5nVHlwZVwiOiBbXG4gICAgICAgIFwiZmRjMy5ub3RoaW5nXCIsXG4gICAgXSxcbiAgICBcIlByb2R1Y3RUeXBlXCI6IFtcbiAgICAgICAgXCJmZGMzLnByb2R1Y3RcIixcbiAgICBdLFxuICAgIFwiT3JkZXJUeXBlXCI6IFtcbiAgICAgICAgXCJmZGMzLm9yZGVyXCIsXG4gICAgXSxcbiAgICBcIk9yZGVyTGlzdFR5cGVcIjogW1xuICAgICAgICBcImZkYzMub3JkZXJMaXN0XCIsXG4gICAgXSxcbiAgICBcIlN0aWNreUludGVyYWN0aW9uVHlwZVwiOiBbXG4gICAgICAgIFwiZmRjMy5vcmdhbml6YXRpb25cIixcbiAgICBdLFxuICAgIFwiUG9zaXRpb25UeXBlXCI6IFtcbiAgICAgICAgXCJmZGMzLnBvc2l0aW9uXCIsXG4gICAgXSxcbiAgICBcIlBvcnRmb2xpb1R5cGVcIjogW1xuICAgICAgICBcImZkYzMucG9ydGZvbGlvXCIsXG4gICAgXSxcbiAgICBcIlRyYWRlVHlwZVwiOiBbXG4gICAgICAgIFwiZmRjMy50cmFkZVwiLFxuICAgIF0sXG4gICAgXCJUcmFkZUxpc3RUeXBlXCI6IFtcbiAgICAgICAgXCJmZGMzLnRyYWRlTGlzdFwiLFxuICAgIF0sXG4gICAgXCJUcmFuc2FjdGlvblN0YXR1c1wiOiBbXG4gICAgICAgIFwiQ3JlYXRlZFwiLFxuICAgICAgICBcIkRlbGV0ZWRcIixcbiAgICAgICAgXCJGYWlsZWRcIixcbiAgICAgICAgXCJVcGRhdGVkXCIsXG4gICAgXSxcbiAgICBcIlRyYW5zYWN0aW9uUmVzdWx0VHlwZVwiOiBbXG4gICAgICAgIFwiZmRjMy50cmFuc2FjdGlvblJlc3VsdFwiLFxuICAgIF0sXG4gICAgXCJWYWx1YXRpb25UeXBlXCI6IFtcbiAgICAgICAgXCJmZGMzLnZhbHVhdGlvblwiLFxuICAgIF1cbn07XG5cbi8qKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqIENvcHlyaWdodCBGSU5PUyBGREMzIGNvbnRyaWJ1dG9ycyAtIHNlZSBOT1RJQ0UgZmlsZVxuICovXG4vKipcbiAqIEBkZXByZWNhdGVkIFVzZSB7QGxpbmsgU3RhbmRhcmRJbnRlbnR9IGluc3RlYWRcbiAqL1xudmFyIEludGVudHM7XG4oZnVuY3Rpb24gKEludGVudHMpIHtcbiAgICBJbnRlbnRzW1wiQ3JlYXRlSW50ZXJhY3Rpb25cIl0gPSBcIkNyZWF0ZUludGVyYWN0aW9uXCI7XG4gICAgSW50ZW50c1tcIlNlbmRDaGF0TWVzc2FnZVwiXSA9IFwiU2VuZENoYXRNZXNzYWdlXCI7XG4gICAgSW50ZW50c1tcIlN0YXJ0Q2FsbFwiXSA9IFwiU3RhcnRDYWxsXCI7XG4gICAgSW50ZW50c1tcIlN0YXJ0Q2hhdFwiXSA9IFwiU3RhcnRDaGF0XCI7XG4gICAgSW50ZW50c1tcIlN0YXJ0RW1haWxcIl0gPSBcIlN0YXJ0RW1haWxcIjtcbiAgICBJbnRlbnRzW1wiVmlld0FuYWx5c2lzXCJdID0gXCJWaWV3QW5hbHlzaXNcIjtcbiAgICBJbnRlbnRzW1wiVmlld0NoYXRcIl0gPSBcIlZpZXdDaGF0XCI7XG4gICAgSW50ZW50c1tcIlZpZXdDaGFydFwiXSA9IFwiVmlld0NoYXJ0XCI7XG4gICAgSW50ZW50c1tcIlZpZXdDb250YWN0XCJdID0gXCJWaWV3Q29udGFjdFwiO1xuICAgIEludGVudHNbXCJWaWV3SG9sZGluZ3NcIl0gPSBcIlZpZXdIb2xkaW5nc1wiO1xuICAgIEludGVudHNbXCJWaWV3SW5zdHJ1bWVudFwiXSA9IFwiVmlld0luc3RydW1lbnRcIjtcbiAgICBJbnRlbnRzW1wiVmlld0ludGVyYWN0aW9uc1wiXSA9IFwiVmlld0ludGVyYWN0aW9uc1wiO1xuICAgIEludGVudHNbXCJWaWV3TWVzc2FnZXNcIl0gPSBcIlZpZXdNZXNzYWdlc1wiO1xuICAgIEludGVudHNbXCJWaWV3TmV3c1wiXSA9IFwiVmlld05ld3NcIjtcbiAgICBJbnRlbnRzW1wiVmlld09yZGVyc1wiXSA9IFwiVmlld09yZGVyc1wiO1xuICAgIEludGVudHNbXCJWaWV3UHJvZmlsZVwiXSA9IFwiVmlld1Byb2ZpbGVcIjtcbiAgICBJbnRlbnRzW1wiVmlld1F1b3RlXCJdID0gXCJWaWV3UXVvdGVcIjtcbiAgICBJbnRlbnRzW1wiVmlld1Jlc2VhcmNoXCJdID0gXCJWaWV3UmVzZWFyY2hcIjtcbn0pKEludGVudHMgfHwgKEludGVudHMgPSB7fSkpO1xuXG5leHBvcnQgeyBCcmlkZ2luZ0Vycm9yLCBCcmlkZ2luZ1R5cGVzLCBDaGFubmVsRXJyb3IsIENvbnRleHRUeXBlcywgQ29udmVydCwgSW50ZW50cywgT3BlbkVycm9yLCBSZXNvbHZlRXJyb3IsIFJlc3VsdEVycm9yLCBhZGRDb250ZXh0TGlzdGVuZXIsIGFkZEludGVudExpc3RlbmVyLCBicm9hZGNhc3QsIGNvbXBhcmVWZXJzaW9uTnVtYmVycywgY3JlYXRlUHJpdmF0ZUNoYW5uZWwsIGZkYzNSZWFkeSwgZmluZEluc3RhbmNlcywgZmluZEludGVudCwgZmluZEludGVudHNCeUNvbnRleHQsIGdldEFwcE1ldGFkYXRhLCBnZXRDdXJyZW50Q2hhbm5lbCwgZ2V0SW5mbywgZ2V0T3JDcmVhdGVDaGFubmVsLCBnZXRTeXN0ZW1DaGFubmVscywgZ2V0VXNlckNoYW5uZWxzLCBpc1N0YW5kYXJkQ29udGV4dFR5cGUsIGlzU3RhbmRhcmRJbnRlbnQsIGpvaW5DaGFubmVsLCBqb2luVXNlckNoYW5uZWwsIGxlYXZlQ3VycmVudENoYW5uZWwsIG9wZW4sIHJhaXNlSW50ZW50LCByYWlzZUludGVudEZvckNvbnRleHQsIHZlcnNpb25Jc0F0TGVhc3QgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZkYzMuZXNtLmpzLm1hcFxuIiwidmFyIGU9e2Q6KHQsbik9Pntmb3IodmFyIHIgaW4gbillLm8obixyKSYmIWUubyh0LHIpJiZPYmplY3QuZGVmaW5lUHJvcGVydHkodCxyLHtlbnVtZXJhYmxlOiEwLGdldDpuW3JdfSl9LG86KGUsdCk9Pk9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLHQpfSx0PXt9O2UuZCh0LHtBZGFwdGVyRXJyb3I6KCk9PkFkYXB0ZXJFcnJvcixBcGlFcnJvcjooKT0+QXBpRXJyb3IsSW5pdGlhbGl6YXRpb25FcnJvcjooKT0+SW5pdGlhbGl6YXRpb25FcnJvcixJbnRlcm9wRXJyb3I6KCk9PkludGVyb3BFcnJvcixUZXJtaW5hbENvbm5lY3RSZXF1ZXN0RXJyb3I6KCk9PlRlcm1pbmFsQ29ubmVjdFJlcXVlc3RFcnJvcixUZXJtaW5hbENvbm5lY3Rpb25FcnJvcjooKT0+VGVybWluYWxDb25uZWN0aW9uRXJyb3IsY29ubmVjdDooKT0+dGUsZGlzYWJsZUxvZ2dpbmc6KCk9PkksZW5hYmxlTG9nZ2luZzooKT0+QSxnZXRTZWN1cml0eUZyb21JbnN0cnVtZW50Q29udGV4dDooKT0+Yn0pO2NsYXNzIEFwaUVycm9yIGV4dGVuZHMgRXJyb3J7Y29uc3RydWN0b3IoZT1cIkFuIHVuZXhwZWN0ZWQgZXJyb3IgaGFzIG9jY3VycmVkXCIsdCl7c3VwZXIoZSksdGhpcy5uYW1lPXRoaXMuY29uc3RydWN0b3IubmFtZSx0aGlzLnN0YWNrPXRoaXMuc3RhY2s/LnJlcGxhY2UoL14oXFx3KkVycm9yKS8sYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfWApLHQmJih0aGlzLmRhdGE9dCl9fWNsYXNzIEFkYXB0ZXJFcnJvciBleHRlbmRzIEFwaUVycm9ye2NvbnN0cnVjdG9yKGU9XCJGYWlsZWQgdG8gZXhlY3V0ZSBhZGFwdGVyIGZ1bmN0aW9uXCIsdCl7c3VwZXIoZSx0KX19Y2xhc3MgSW5pdGlhbGl6YXRpb25FcnJvciBleHRlbmRzIEFwaUVycm9ye2NvbnN0cnVjdG9yKGU9XCJGYWlsZWQgdG8gaW5pdGlhbGl6ZSBhZGFwdGVyXCIsdCl7c3VwZXIoZSx0KX19Y2xhc3MgSW50ZXJvcEVycm9yIGV4dGVuZHMgQXBpRXJyb3J7Y29uc3RydWN0b3IoZT1cIkZhaWxlZCB0byBleGVjdXRlIHRoZSBpbnRlcm9wIGZ1bmN0aW9uXCIsdCl7c3VwZXIoZSx0KX19Y2xhc3MgUGFyYW1ldGVyRXJyb3IgZXh0ZW5kcyBBcGlFcnJvcntjb25zdHJ1Y3RvcihlKXtzdXBlcihlPWU/P1wiSW52YWxpZCBwYXJhbWV0ZXIgZGV0ZWN0ZWRcIil9fWNsYXNzIFRlcm1pbmFsQ29ubmVjdGlvbkVycm9yIGV4dGVuZHMgQXBpRXJyb3J7Y29uc3RydWN0b3IoZT1cIkZhaWxlZCB0byBjb25uZWN0IHRvIHRoZSB0ZXJtaW5hbFwiLHQpe3N1cGVyKGUsdCl9fWNsYXNzIFRlcm1pbmFsQ29ubmVjdFJlcXVlc3RFcnJvciBleHRlbmRzIEFwaUVycm9ye2NvbnN0cnVjdG9yKGU9XCJUZXJtaW5hbCBDb25uZWN0IHJlcXVlc3QgZmFpbGVkXCIsdCl7c3VwZXIoZSx0KX19ZnVuY3Rpb24gbihlKXtyZXR1cm57YXJyYXlJdGVtczplfX1mdW5jdGlvbiByKCl7Zm9yKHZhciBlPWFyZ3VtZW50cy5sZW5ndGgsdD1uZXcgQXJyYXkoZSksbj0wO248ZTtuKyspdFtuXT1hcmd1bWVudHNbbl07cmV0dXJue3VuaW9uTWVtYmVyczp0fX1mdW5jdGlvbiBvKGUsdCl7cmV0dXJue3Byb3BzOmUsYWRkaXRpb25hbDp0fX1mdW5jdGlvbiBhKGUpe3JldHVybntwcm9wczpbXSxhZGRpdGlvbmFsOmV9fWZ1bmN0aW9uIGkoZSl7cmV0dXJue3JlZjplfX12YXIgcyxjLHUsbCxwO0RhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGU7IWZ1bmN0aW9uKGUpe2UuQXBwTm90Rm91bmQ9XCJBcHBOb3RGb3VuZFwiLGUuRXJyb3JPbkxhdW5jaD1cIkVycm9yT25MYXVuY2hcIixlLkFwcFRpbWVvdXQ9XCJBcHBUaW1lb3V0XCIsZS5SZXNvbHZlclVuYXZhaWxhYmxlPVwiUmVzb2x2ZXJVbmF2YWlsYWJsZVwiLGUuTWFsZm9ybWVkQ29udGV4dD1cIk1hbGZvcm1lZENvbnRleHRcIixlLkRlc2t0b3BBZ2VudE5vdEZvdW5kPVwiRGVza3RvcEFnZW50Tm90Rm91bmRcIn0oc3x8KHM9e30pKSxmdW5jdGlvbihlKXtlLk5vQXBwc0ZvdW5kPVwiTm9BcHBzRm91bmRcIixlLlJlc29sdmVyVW5hdmFpbGFibGU9XCJSZXNvbHZlclVuYXZhaWxhYmxlXCIsZS5Vc2VyQ2FuY2VsbGVkPVwiVXNlckNhbmNlbGxlZFJlc29sdXRpb25cIixlLlJlc29sdmVyVGltZW91dD1cIlJlc29sdmVyVGltZW91dFwiLGUuVGFyZ2V0QXBwVW5hdmFpbGFibGU9XCJUYXJnZXRBcHBVbmF2YWlsYWJsZVwiLGUuVGFyZ2V0SW5zdGFuY2VVbmF2YWlsYWJsZT1cIlRhcmdldEluc3RhbmNlVW5hdmFpbGFibGVcIixlLkludGVudERlbGl2ZXJ5RmFpbGVkPVwiSW50ZW50RGVsaXZlcnlGYWlsZWRcIixlLk1hbGZvcm1lZENvbnRleHQ9XCJNYWxmb3JtZWRDb250ZXh0XCIsZS5EZXNrdG9wQWdlbnROb3RGb3VuZD1cIkRlc2t0b3BBZ2VudE5vdEZvdW5kXCJ9KGN8fChjPXt9KSksZnVuY3Rpb24oZSl7ZS5Ob1Jlc3VsdFJldHVybmVkPVwiTm9SZXN1bHRSZXR1cm5lZFwiLGUuSW50ZW50SGFuZGxlclJlamVjdGVkPVwiSW50ZW50SGFuZGxlclJlamVjdGVkXCJ9KHV8fCh1PXt9KSksZnVuY3Rpb24oZSl7ZS5Ob0NoYW5uZWxGb3VuZD1cIk5vQ2hhbm5lbEZvdW5kXCIsZS5BY2Nlc3NEZW5pZWQ9XCJBY2Nlc3NEZW5pZWRcIixlLkNyZWF0aW9uRmFpbGVkPVwiQ3JlYXRpb25GYWlsZWRcIixlLk1hbGZvcm1lZENvbnRleHQ9XCJNYWxmb3JtZWRDb250ZXh0XCJ9KGx8fChsPXt9KSksZnVuY3Rpb24oZSl7ZS5SZXNwb25zZVRpbWVkT3V0PVwiUmVzcG9uc2VUb0JyaWRnZVRpbWVkT3V0XCIsZS5BZ2VudERpc2Nvbm5lY3RlZD1cIkFnZW50RGlzY29ubmVjdGVkXCIsZS5Ob3RDb25uZWN0ZWRUb0JyaWRnZT1cIk5vdENvbm5lY3RlZFRvQnJpZGdlXCIsZS5NYWxmb3JtZWRNZXNzYWdlPVwiTWFsZm9ybWVkTWVzc2FnZVwifShwfHwocD17fSkpO3ZhciBkOyFmdW5jdGlvbihlKXtlLkNoYXJ0PVwiZmRjMy5jaGFydFwiLGUuQ2hhdEluaXRTZXR0aW5ncz1cImZkYzMuY2hhdC5pbml0U2V0dGluZ3NcIixlLkNoYXRSb29tPVwiZmRjMy5jaGF0LnJvb21cIixlLkNvbnRhY3Q9XCJmZGMzLmNvbnRhY3RcIixlLkNvbnRhY3RMaXN0PVwiZmRjMy5jb250YWN0TGlzdFwiLGUuQ291bnRyeT1cImZkYzMuY291bnRyeVwiLGUuQ3VycmVuY3k9XCJmZGMzLmN1cnJlbmN5XCIsZS5FbWFpbD1cImZkYzMuZW1haWxcIixlLkluc3RydW1lbnQ9XCJmZGMzLmluc3RydW1lbnRcIixlLkluc3RydW1lbnRMaXN0PVwiZmRjMy5pbnN0cnVtZW50TGlzdFwiLGUuSW50ZXJhY3Rpb249XCJmZGMzLmludGVyYWN0aW9uXCIsZS5Ob3RoaW5nPVwiZmRjMy5ub3RoaW5nXCIsZS5Pcmdhbml6YXRpb249XCJmZGMzLm9yZ2FuaXphdGlvblwiLGUuUG9ydGZvbGlvPVwiZmRjMy5wb3J0Zm9saW9cIixlLlBvc2l0aW9uPVwiZmRjMy5wb3NpdGlvblwiLGUuQ2hhdFNlYXJjaENyaXRlcmlhPVwiZmRjMy5jaGF0LnNlYXJjaENyaXRlcmlhXCIsZS5UaW1lUmFuZ2U9XCJmZGMzLnRpbWVyYW5nZVwiLGUuVHJhbnNhY3Rpb25SZXN1bHQ9XCJmZGMzLnRyYW5zYWN0aW9uUmVzdWx0XCIsZS5WYWx1YXRpb249XCJmZGMzLnZhbHVhdGlvblwifShkfHwoZD17fSkpO2Z1bmN0aW9uIGcoZSl7cmV0dXJue2FycmF5SXRlbXM6ZX19ZnVuY3Rpb24gbSgpe2Zvcih2YXIgZT1hcmd1bWVudHMubGVuZ3RoLHQ9bmV3IEFycmF5KGUpLG49MDtuPGU7bisrKXRbbl09YXJndW1lbnRzW25dO3JldHVybnt1bmlvbk1lbWJlcnM6dH19ZnVuY3Rpb24gZihlLHQpe3JldHVybntwcm9wczplLGFkZGl0aW9uYWw6dH19ZnVuY3Rpb24gdyhlKXtyZXR1cm57cHJvcHM6W10sYWRkaXRpb25hbDplfX1mdW5jdGlvbiBoKGUpe3JldHVybntyZWY6ZX19dmFyIHk7RGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGU7IWZ1bmN0aW9uKGUpe2UuQ3JlYXRlSW50ZXJhY3Rpb249XCJDcmVhdGVJbnRlcmFjdGlvblwiLGUuU2VuZENoYXRNZXNzYWdlPVwiU2VuZENoYXRNZXNzYWdlXCIsZS5TdGFydENhbGw9XCJTdGFydENhbGxcIixlLlN0YXJ0Q2hhdD1cIlN0YXJ0Q2hhdFwiLGUuU3RhcnRFbWFpbD1cIlN0YXJ0RW1haWxcIixlLlZpZXdBbmFseXNpcz1cIlZpZXdBbmFseXNpc1wiLGUuVmlld0NoYXQ9XCJWaWV3Q2hhdFwiLGUuVmlld0NoYXJ0PVwiVmlld0NoYXJ0XCIsZS5WaWV3Q29udGFjdD1cIlZpZXdDb250YWN0XCIsZS5WaWV3SG9sZGluZ3M9XCJWaWV3SG9sZGluZ3NcIixlLlZpZXdJbnN0cnVtZW50PVwiVmlld0luc3RydW1lbnRcIixlLlZpZXdJbnRlcmFjdGlvbnM9XCJWaWV3SW50ZXJhY3Rpb25zXCIsZS5WaWV3TWVzc2FnZXM9XCJWaWV3TWVzc2FnZXNcIixlLlZpZXdOZXdzPVwiVmlld05ld3NcIixlLlZpZXdPcmRlcnM9XCJWaWV3T3JkZXJzXCIsZS5WaWV3UHJvZmlsZT1cIlZpZXdQcm9maWxlXCIsZS5WaWV3UXVvdGU9XCJWaWV3UXVvdGVcIixlLlZpZXdSZXNlYXJjaD1cIlZpZXdSZXNlYXJjaFwifSh5fHwoeT17fSkpO2NvbnN0IEM9ZT0+e2NvbnN0IHQ9RGF0ZS5wYXJzZShlKTtpZighTnVtYmVyLmlzTmFOKHQpKXJldHVybiBuZXcgRGF0ZSh0KX0sRT1lPT57bGV0IHQ9L1xccysoW1xcdy1dKyQpLy5leGVjKGUpPy5bMV07aWYodClyZXR1cm4gdD10LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpK3Quc2xpY2UoMSkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKFwiLW1cIixcIi1NXCIpLHR9LGI9ZT0+e2lmKGUudHlwZSE9PWQuSW5zdHJ1bWVudClyZXR1cm47Y29uc3R7aWQ6dCxtYXJrZXQ6bn09ZSx7QkJHOnIsRklHSTpvLHRpY2tlcjphfT10O2lmKHJ8fG8pcmV0dXJuIHI/P287aWYoIWEpcmV0dXJuO3JldHVybmAke2F9ICR7bj8uQkJHP24uQkJHOlwiVVNcIn0gRXF1aXR5YH07bGV0IHY9ITE7Y29uc3QgRD1cIltAb3BlbmZpbi9ibG9vbWJlcmddXCIsST0oKT0+e3Y9ITF9LEE9KCk9Pnt2PSEwLE4oXCJ2Mi4wLjBcIil9LFI9KGUsdCk9PntpZighdilyZXR1cm47Y29uc3Qgbj10P2Ake0R9ICR7dH1gOkQ7ZSBpbnN0YW5jZW9mIEFwaUVycm9yJiZlLmRhdGE/Y29uc29sZS5lcnJvcihuLGUsZS5kYXRhKTpjb25zb2xlLmVycm9yKG4sZSl9LE49KC4uLmUpPT57diYmY29uc29sZS5sb2coRCwuLi5lKX0seD0oLi4uZSk9Pnt2JiZjb25zb2xlLndhcm4oRCwuLi5lKX07dmFyIFQsUyxNO1widW5kZWZpbmVkXCI9PXR5cGVvZiBmaW4mJk9iamVjdC5hc3NpZ24od2luZG93LHtmaW46e319KSxPYmplY3QuYXNzaWduKGZpbix7SW50ZWdyYXRpb25zOntCbG9vbWJlcmc6e2VuYWJsZUxvZ2dpbmc6QSxkaXNhYmxlTG9nZ2luZzpJfX19KSxmdW5jdGlvbihlKXtlLkNhbmNlbFN1YnNjcmlwdGlvbj1cIkNhbmNlbFN1YnNjcmlwdGlvblwiLGUuQ29ubmVjdD1cIkNvbm5lY3RcIixlLkNyZWF0ZVN1YnNjcmlwdGlvbj1cIkNyZWF0ZVN1YnNjcmlwdGlvblwiLGUuRGlzY29ubmVjdD1cIkRpc2Nvbm5lY3RcIixlLkV4ZWN1dGVSZXF1ZXN0PVwiRXhlY3V0ZVJlcXVlc3RcIixlLkxvZ01lc3NhZ2U9XCJMb2dNZXNzYWdlXCIsZS5TdWJzY3JpcHRpb25FdmVudD1cIlN1YnNjcmlwdGlvbkV2ZW50XCJ9KFR8fChUPXt9KSksZnVuY3Rpb24oZSl7ZVtlLkVycm9yPTBdPVwiRXJyb3JcIixlW2UuSW5mbz0xXT1cIkluZm9cIixlW2UuV2Fybj0yXT1cIldhcm5cIn0oU3x8KFM9e30pKSxmdW5jdGlvbihlKXtlLkxvY2FsPVwiTG9jYWxcIixlLlJlbW90ZT1cIlJlbW90ZVwifShNfHwoTT17fSkpO2NvbnN0IFY9ZT0+YXN5bmMoKT0+e04oXCJSZXRyaWV2aW5nIGxhdW5jaHBhZCBncm91cHNcIik7Y29uc3QgdD17cXVlcnk6XCJxdWVyeSB7XFxuICAgICAgICAgIGdyb3VwcyB7XFxuICAgICAgICAgICAgLi4uIG9uIEdyb3VwcyB7XFxuICAgICAgICAgICAgICBpdGVtcyB7XFxuICAgICAgICAgICAgICAgIGlkXFxuICAgICAgICAgICAgICAgIG5hbWVcXG4gICAgICAgICAgICAgICAgdHlwZVxcbiAgICAgICAgICAgICAgICB2YWx1ZVxcbiAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgIH1cXG4gICAgICAgICAgICAuLi4gb24gRXJyb3Ige1xcbiAgICAgICAgICAgICAgZXJyb3JDYXRlZ29yeVxcbiAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlXFxuICAgICAgICAgICAgfVxcbiAgICAgICAgICB9XFxuICAgICAgICB9XCJ9O2xldCBuO3RyeXtuPWF3YWl0IGUoVC5FeGVjdXRlUmVxdWVzdCx0KX1jYXRjaChlKXtjb25zdCB0PW5ldyBBZGFwdGVyRXJyb3Iodm9pZCAwLGUpO3Rocm93IFIodCksdH1pZighbi5zdWNjZXNzKXtjb25zdCBlPW5ldyBUZXJtaW5hbENvbm5lY3RSZXF1ZXN0RXJyb3Iobi5lcnJvcj8ubWVzc2FnZSxuLmVycm9yKTt0aHJvdyBSKGUpLGV9aWYoIW4uZGF0YSl7Y29uc3QgZT1uZXcgVGVybWluYWxDb25uZWN0UmVxdWVzdEVycm9yKFwiVW5leHBlY3RlZCBlbXB0eSByZXNwb25zZSBkYXRhXCIsbik7dGhyb3cgUihlKSxlfWNvbnN0e2dyb3VwczpyfT1KU09OLnBhcnNlKG4uZGF0YSk7aWYoci5pdGVtcylyZXR1cm4gci5pdGVtcztjb25zdCBvPW5ldyBUZXJtaW5hbENvbm5lY3RSZXF1ZXN0RXJyb3Ioci5lcnJvck1lc3NhZ2Uscik7dGhyb3cgUihvKSxvfSwkPWU9PmFzeW5jKHQsbik9PntpZihudWxsPT10fHxcIm51bWJlclwiIT10eXBlb2YgdHx8TnVtYmVyLmlzTmFOKHQpKXRocm93IG5ldyBQYXJhbWV0ZXJFcnJvcihcIkdyb3VwIElEIG11c3QgYmUgYSB2YWxpZCBudW1iZXJcIik7aWYoIW4/LnRyaW0oKSl0aHJvdyBuZXcgUGFyYW1ldGVyRXJyb3IoXCJHcm91cCB2YWx1ZSBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZ1wiKTtOKFwiU2V0dGluZyBncm91cCB2YWx1ZVwiLHtncm91cElkOnQsbmV3VmFsdWU6bn0pO2NvbnN0IHI9e3F1ZXJ5OmBtdXRhdGlvbiB7XFxuICAgICAgICAgIHNldEdyb3VwVmFsdWUoXFxuICAgICAgICAgICAgZmlsdGVyOiB7aWQ6IFske3R9XX0sXFxuICAgICAgICAgICAgdmFsdWU6IFwiJHtufVwiKSB7XFxuICAgICAgICAgICAgLi4uIG9uIEdyb3VwUmVzdWx0cyB7XFxuICAgICAgICAgICAgICByZXN1bHRzIHtcXG4gICAgICAgICAgICAgICAgcmVzdWx0IHtcXG4gICAgICAgICAgICAgICAgICBzdWNjZWVkZWRcXG4gICAgICAgICAgICAgICAgICBkZXRhaWxzXFxuICAgICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICB9XFxuICAgICAgICAgICAgLi4uIG9uIEVycm9yIHtcXG4gICAgICAgICAgICAgIGVycm9yQ2F0ZWdvcnlcXG4gICAgICAgICAgICAgIGVycm9yTWVzc2FnZVxcbiAgICAgICAgICAgIH1cXG4gICAgICAgICAgfVxcbiAgICAgICAgfWB9O2xldCBvO3RyeXtvPWF3YWl0IGUoVC5FeGVjdXRlUmVxdWVzdCxyKX1jYXRjaChlKXtjb25zdCB0PW5ldyBBZGFwdGVyRXJyb3Iodm9pZCAwLGUpO3Rocm93IFIodCksdH1pZighby5zdWNjZXNzKXtjb25zdCBlPW5ldyBUZXJtaW5hbENvbm5lY3RSZXF1ZXN0RXJyb3Ioby5lcnJvcj8ubWVzc2FnZSxvLmVycm9yKTt0aHJvdyBSKGUpLGV9aWYoIW8uZGF0YSl7Y29uc3QgZT1uZXcgVGVybWluYWxDb25uZWN0UmVxdWVzdEVycm9yKFwiVW5leHBlY3RlZCBlbXB0eSByZXNwb25zZSBkYXRhXCIsbyk7dGhyb3cgUihlKSxlfWNvbnN0e3NldEdyb3VwVmFsdWU6YX09SlNPTi5wYXJzZShvLmRhdGEpO2lmKFwiZXJyb3JNZXNzYWdlXCJpbiBhKXtjb25zdCBlPW5ldyBUZXJtaW5hbENvbm5lY3RSZXF1ZXN0RXJyb3IoYS5lcnJvck1lc3NhZ2UsYSk7dGhyb3cgUihlKSxlfX0scT1uZXcgTWFwLEI9YXN5bmMoZSx0LG4scik9Pntjb25zdCBvPWF3YWl0IE8oZSkodCk7aWYoIW8pcmV0dXJuO2NvbnN0IGE9YXdhaXQoZT0+YXN5bmModD1bXSk9PntOKFwiQ3JlYXRpbmcgZ3JvdXAgc3Vic2NyaXB0aW9uXCIse2dyb3VwSWRGaWx0ZXI6dH0pO2NvbnN0IG49e3F1ZXJ5OmBzdWJzY3JpcHRpb24ge1xcbiAgICAgICAgc3Vic2NyaWJlR3JvdXBFdmVudHMgKFxcbiAgICAgICAgICBmaWx0ZXI6e1xcbiAgICAgICAgICAgIGV2ZW50OiBbXFxuICAgICAgICAgICAgICBWQUxVRV9DSEFOR0VEXFxuICAgICAgICAgICAgXVxcbiAgICAgICAgICAgICR7dC5sZW5ndGg/YCxncm91cDoge2lkOiAke0pTT04uc3RyaW5naWZ5KHQpfX1gOlwiXCJ9XFxuICAgICAgICAgIH0pe1xcbiAgICAgICAgICB0eXBlXFxuICAgICAgICAgIGdyb3Vwe1xcbiAgICAgICAgICAgIGlkXFxuICAgICAgICAgICAgbmFtZVxcbiAgICAgICAgICAgIHZhbHVlXFxuICAgICAgICAgIH1cXG4gICAgICAgIH1cXG4gICAgICB9YH07bGV0IHI7dHJ5e3I9YXdhaXQgZShULkNyZWF0ZVN1YnNjcmlwdGlvbixuKX1jYXRjaChlKXtjb25zdCB0PW5ldyBBZGFwdGVyRXJyb3Iodm9pZCAwLGUpO3Rocm93IFIodCksdH1pZighci5zdWNjZXNzKXtjb25zdCBlPW5ldyBUZXJtaW5hbENvbm5lY3RSZXF1ZXN0RXJyb3Ioci5lcnJvcj8ubWVzc2FnZSxyLmVycm9yKTt0aHJvdyBSKGUpLGV9aWYoIXIuZGF0YSl7Y29uc3QgZT1uZXcgVGVybWluYWxDb25uZWN0UmVxdWVzdEVycm9yKFwiVW5leHBlY3RlZCBlbXB0eSByZXNwb25zZSBkYXRhXCIscik7dGhyb3cgUihlKSxlfWNvbnN0e3N1YnNjcmlwdGlvbklkOm99PUpTT04ucGFyc2Uoci5kYXRhKTtyZXR1cm4gb30pKGUpKG8pLGk9e2lkOmEsbGlzdGVuZXI6VShuLHIpLHVuc3Vic2NyaWJlOkYoZSxhKX07cmV0dXJuIHEuc2V0KGEsaSksaX0sRj0oZSx0KT0+YXN5bmMoKT0+e04oXCJVbnN1YnNjcmliaW5nIGdyb3VwIGV2ZW50c1wiLHtzdWJzY3JpcHRpb25JZDp0fSk7dHJ5e2F3YWl0KGU9PmFzeW5jIHQ9Pntjb25zdCBuPXtzdWJzY3JpcHRpb25JZDp0fTtsZXQgcjt0cnl7cj1hd2FpdCBlKFQuQ2FuY2VsU3Vic2NyaXB0aW9uLG4pfWNhdGNoKGUpe2NvbnN0IHQ9bmV3IEFkYXB0ZXJFcnJvcih2b2lkIDAsZSk7dGhyb3cgUih0KSx0fWlmKCFyLnN1Y2Nlc3Mpe2NvbnN0IGU9bmV3IFRlcm1pbmFsQ29ubmVjdFJlcXVlc3RFcnJvcihyLmVycm9yPy5tZXNzYWdlLHIuZXJyb3IpO3Rocm93IFIoZSksZX19KShlKSh0KX1jYXRjaChlKXtSKGUpfXEuZGVsZXRlKHQpfSxVPShlLHQpPT5hc3luYyBuPT57dHJ5e2U/LihuKSxOKFwiU2V0dGluZyBuZXcgY29udGV4dDogXCIsbiksYXdhaXQgZmluLm1lLmludGVyb3Auc2V0Q29udGV4dChuKX1jYXRjaChlKXtjb25zdCBuPW5ldyBJbnRlcm9wRXJyb3Iodm9pZCAwLGUpO1IobiksdD8uKG4pfX0sUD1hc3luYyhlLHQpPT57TihcIkdyb3VwIGV2ZW50IHJlY2VpdmVkXCIse2RhdGE6dCxzdWJzY3JpcHRpb25JZDplfSk7Y29uc3R7Z3JvdXA6bn09dC5zdWJzY3JpYmVHcm91cEV2ZW50cztpZighbilyZXR1cm4gdm9pZCB4KFwiUmVjZWl2ZWQgZ3JvdXAgZXZlbnQgd2l0aCBubyBncm91cFwiLHtzdWJzY3JpcHRpb25JZDplfSk7aWYoIXEuaGFzKGUpKXJldHVybiB2b2lkIHgoXCJSZWNlaXZlZCBncm91cCBldmVudCBmb3IgdW5rbm93biBzdWJzY3JpcHRpb25cIix7c3Vic2NyaXB0aW9uSWQ6ZX0pO2NvbnN0IHI9cS5nZXQoZSksbz0oZT0+e2NvbnN0IHQ9e3R5cGU6ZC5JbnN0cnVtZW50LGlkOntCQkc6ZX19O2lmKFwiRXF1aXR5XCI9PT1FKGUpKXtjb25zdFtuLHJdPWUuc3BsaXQoL1xccysvKTt0LmlkLnRpY2tlcj1uPy50b1VwcGVyQ2FzZSgpLHQubWFya2V0PXtCQkc6cj8udG9VcHBlckNhc2UoKX19cmV0dXJuIHR9KShuLnZhbHVlKTtvLm9wZW5maW5CYmdBcGk9ITAscj8ubGlzdGVuZXIobyl9LE89ZT0+YXN5bmMgdD0+e2lmKCF0KXJldHVybjtpZihcIipcIj09PXQpcmV0dXJuW107QXJyYXkuaXNBcnJheSh0KXx8KHQ9W3RdKTtjb25zdCBuPWF3YWl0IFYoZSkoKSxyPXQubWFwKChlPT57Y29uc3QgdD1uLmZpbmQoKHQ9PnQubmFtZT8udG9VcHBlckNhc2UoKT09PWUudG9VcHBlckNhc2UoKSkpPy5pZDtyZXR1cm4gdHx8eChgR3JvdXAgbm90IGZvdW5kOiAke2V9YCksdH0pKS5maWx0ZXIoQm9vbGVhbik7cmV0dXJuIHIubGVuZ3RoP3I6dm9pZCAwfSxHPVwiYmxvb21iZXJnLWFkYXB0ZXJcIixMPWBibG9vbWJlcmctYWRhcHRlci0ke3ZvaWQgMCE9PWNyeXB0by5yYW5kb21VVUlEP2NyeXB0by5yYW5kb21VVUlEKCk6XCIxMDAwMDAwMC0xMDAwLTQwMDAtODAwMC0xMDAwMDAwMDAwMDBcIi5yZXBsYWNlKC9bMDE4XS9nLChlPT57Y29uc3QgdD1jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSYxNT4+TnVtYmVyKGUpLzQ7cmV0dXJuKE51bWJlcihlKV50KS50b1N0cmluZygxNil9KSl9YDtsZXQgaztjb25zdCB6PWFzeW5jKGU9ITEpPT57dHJ5e2lmKCFhd2FpdChhc3luYyBlPT4oYXdhaXQgZmluLkludGVyQXBwbGljYXRpb25CdXMuQ2hhbm5lbC5nZXRBbGxDaGFubmVscygpKS5zb21lKCh0PT50LmNoYW5uZWxOYW1lPT09ZSkpKShMKSl7Y29uc3R7cG9ydDp0LHNlY3VyaXR5UmVhbG06bn09YXdhaXQgZmluLlN5c3RlbS5nZXRSdW50aW1lSW5mbygpLHtsaWNlbnNlS2V5OnJ9PWF3YWl0IGZpbi5BcHBsaWNhdGlvbi5nZXRDdXJyZW50U3luYygpLmdldE1hbmlmZXN0KCksbz1maW4ubWUudXVpZDtOKFwiSW5pdGlhbGl6aW5nIGFkYXB0ZXJcIix7Y2hhbm5lbE5hbWU6TCxsaWNlbnNlS2V5OnIscG9ydDp0LHNlY3VyaXR5UmVhbG06bix1dWlkOm8sYWRhcHRlckxvZ2dpbmdFbmFibGVkOmV9KSxhd2FpdChhc3luYygpPT57Y29uc3QgZT1hd2FpdCBmaW4uQXBwbGljYXRpb24uZ2V0Q3VycmVudFN5bmMoKS5nZXRNYW5pZmVzdCgpLHQ9ZS5hcHBBc3NldHM/LmZpbmQoKGU9PmUuYWxpYXM9PT1HKSk7aWYodClyZXR1cm4gdm9pZCB4KFwiRGV0ZWN0ZWQgYWRhcHRlciBwYWNrYWdlIGluIGFwcCBtYW5pZmVzdCBhcHBBc3NldHNcIix0KTtpZihhd2FpdCBqKCkpcmV0dXJuIHZvaWQgTihcIlVzaW5nIGV4aXN0aW5nIGFkYXB0ZXIgcGFja2FnZVwiKTtjb25zdCBuPXthbGlhczpHLHNyYzpcImh0dHBzOi8vY2RuLm9wZW5maW4uY28vcmVsZWFzZS9pbnRlZ3JhdGlvbnMvYmxvb21iZXJnLzIuMC4wL09wZW5GaW4uQmxvb21iZXJnLnppcFwiLHRhcmdldDpcIk9wZW5GaW4uQmxvb21iZXJnLmV4ZVwiLHZlcnNpb246XCIyLjAuMFwifTtOKFwiRG93bmxvYWRpbmcgYWRhcHRlciBwYWNrYWdlXCIsbik7dHJ5e2F3YWl0IGZpbi5TeXN0ZW0uZG93bmxvYWRBc3NldChuLCgoKT0+e30pKX1jYXRjaChlKXt0aHJvdyBSKFwiVW5hYmxlIHRvIGRvd25sb2FkIGFkYXB0ZXIgcGFja2FnZVwiKSxlfX0pKCksZmluLlN5c3RlbS5sYXVuY2hFeHRlcm5hbFByb2Nlc3Moe2FsaWFzOkcsYXJndW1lbnRzOmBcIiR7b31cIiBcIiR7cj8/XCJcIn1cIiBcIiR7dH1cIiBcIiR7bj8/XCJcIn1cIiBcIiR7TH1cIiBcIiR7ZX1cImAsbGlmZXRpbWU6XCJhcHBsaWNhdGlvblwifSl9Y29uc3Qgbj1maW4uSW50ZXJBcHBsaWNhdGlvbkJ1cy5DaGFubmVsLmNvbm5lY3QoTCx7cGF5bG9hZDp7dmVyc2lvbjpcIjIuMC4wXCJ9fSkscj1uZXcgUHJvbWlzZSgoZT0+e3NldFRpbWVvdXQoZSwyZTQpfSkpLnRoZW4oKCgpPT57dGhyb3cgbmV3IEFwaUVycm9yKFwiQ29ubmVjdGlvbiB0byBhZGFwdGVyIHRpbWVkIG91dFwiKX0pKTtyZXR1cm4gaz1hd2FpdCBQcm9taXNlLnJhY2UoW24scl0pLGsucmVnaXN0ZXIoVC5Mb2dNZXNzYWdlLEgpLGsucmVnaXN0ZXIoVC5TdWJzY3JpcHRpb25FdmVudCxKKSxOKFwiQ29ubmVjdGVkIHRvIGFkYXB0ZXJcIix7dXVpZDprLnByb3ZpZGVySWRlbnRpdHkudXVpZH0pLHtjaGFubmVsTmFtZTpMLGRpc3BhdGNoOiguLi5lKT0+ay5kaXNwYXRjaCguLi5lKSxpbml0VGVybWluYWw6KHQ9ayxhc3luYyBlPT57Y29uc3Qgbj17YXBpS2V5OmV9O2xldCByO3RyeXtyPWF3YWl0IHQuZGlzcGF0Y2goVC5Db25uZWN0LG4pfWNhdGNoKGUpe2NvbnN0IHQ9bmV3IEFkYXB0ZXJFcnJvcih2b2lkIDAsZSk7dGhyb3cgUih0KSx0fWlmKCFyLnN1Y2Nlc3Mpe2NvbnN0IGU9bmV3IFRlcm1pbmFsQ29ubmVjdGlvbkVycm9yKHIuZXJyb3I/Lm1lc3NhZ2Usci5lcnJvcik7dGhyb3cgUihlKSxlfX0pLHZlcnNpb246XCIyLjAuMFwifX1jYXRjaChlKXtjb25zdCB0PWUgaW5zdGFuY2VvZiBBcGlFcnJvcj9uZXcgSW5pdGlhbGl6YXRpb25FcnJvcihlLm1lc3NhZ2UpOm5ldyBJbml0aWFsaXphdGlvbkVycm9yKHZvaWQgMCxlKTt0aHJvdyBSKHQpLHR9dmFyIHR9LEg9ZT0+e2NvbnN0e2xldmVsOnQsbWVzc2FnZTpufT1lLHI9XCJbYWRhcHRlcl1cIjtzd2l0Y2godCl7Y2FzZSBTLkVycm9yOlIobixyKTticmVhaztjYXNlIFMuV2Fybjp4KHIsbik7YnJlYWs7Y2FzZSBTLkluZm86ZGVmYXVsdDpOKHIsbil9fSxKPWFzeW5jIGU9Pntjb25zdHtkYXRhOnQsZXJyb3I6bixzdWJzY3JpcHRpb25JZDpyfT1lO2lmKCFyfHwhdCl7Y29uc3QgdD1uZXcgVGVybWluYWxDb25uZWN0UmVxdWVzdEVycm9yKFwiSW52YWxpZCBzdWJzY3JpcHRpb24gZXZlbnRcIixlKTt0aHJvdyBSKHQpLHR9aWYobil7Y29uc3QgZT1uZXcgVGVybWluYWxDb25uZWN0UmVxdWVzdEVycm9yKHZvaWQgMCxuKTt0aHJvdyBSKGUpLGV9Y29uc3Qgbz1KU09OLnBhcnNlKHQpO2lmKCEwPT09Qm9vbGVhbihvLnN1YnNjcmliZUdyb3VwRXZlbnRzKSlhd2FpdCBQKHIsbyk7ZWxzZSB4KFwiUmVjZWl2ZWQgdW5rbm93biBzdWJzY3JpcHRpb24gZXZlbnRcIix0KX0saj1hc3luYygpPT57dHJ5e3JldHVyblwiMi4wLjBcIj09PShhd2FpdCBmaW4uU3lzdGVtLmdldEFwcEFzc2V0SW5mbyh7YWxpYXM6R30pKS52ZXJzaW9ufWNhdGNoKGUpe3JldHVybiExfX0sUT1hc3luYyhlLHQpPT57aWYoIWUpcmV0dXJuIHZvaWQgeChcIk5vIGFjdGlvbiBzcGVjaWZpZWQsIGlnbm9yaW5nXCIpO2lmKFwiZ3JvdXBcImluIGUpe2NvbnN0e2dyb3VwOm4sc2VjdXJpdHk6cn09ZTtyZXR1cm4gdm9pZCBhd2FpdChlPT5hc3luYyh0LG4pPT57aWYoIW4pcmV0dXJuO04oYFNldHRpbmcgJHtcIipcIj09PXQ/XCJldmVyeSBncm91cFwiOmBncm91cCAke3R9YH0gc2VjdXJpdHkgdG8gJHtufWApO2NvbnN0IHI9YXdhaXQgVihlKSgpO2lmKFwiKlwiPT09dClhd2FpdCBQcm9taXNlLmFsbChyLm1hcCgodD0+dC5pZD8kKGUpKHQuaWQsbik6UHJvbWlzZS5yZXNvbHZlKCkpKSk7ZWxzZXtjb25zdCBvPXIuZmluZCgoZT0+ZS5uYW1lPy50b1VwcGVyQ2FzZSgpPT09dC50b1VwcGVyQ2FzZSgpKSk/LmlkO251bGw9PW8/eChgVW5hYmxlIHRvIHVwZGF0ZSBncm91cCBzZWN1cml0eSBmb3IgJHt0fTogZ3JvdXAgbm90IGZvdW5kYCk6YXdhaXQgJChlKShvLG4pfX0pKHQpKG4scil9Y29uc3R7bW5lbW9uaWM6bixzZWN1cml0aWVzOnIsdGFyZ2V0Om8sdGFpbDphfT1lLFtpLHNdPXI/P1tdO2F3YWl0KGU9PmFzeW5jKHQsbixyLG8sYSk9PntpZighdD8udHJpbSgpKXRocm93IG5ldyBQYXJhbWV0ZXJFcnJvcihcIk1uZW1vbmljIG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nXCIpO2lmKG51bGw9PW58fFwic3RyaW5nXCI9PXR5cGVvZiBuJiYhbj8udHJpbSgpKXRocm93IG5ldyBQYXJhbWV0ZXJFcnJvcihcIlRhcmdldCBtdXN0IGJlIGEgbnVtYmVyICgwLTMpIG9yIG5vbi1lbXB0eSBzdHJpbmdcIik7TihcIlJ1bm5pbmcgdGVybWluYWwgZnVuY3Rpb25cIix7bW5lbW9uaWM6dCx0YXJnZXQ6bixzZWN1cml0eTE6cixzZWN1cml0eTI6byx0YWlsOmF9KTtjb25zdCBpPXQudHJpbSgpLnRvVXBwZXJDYXNlKCk7bGV0IHMsYztcIm51bWJlclwiPT10eXBlb2Ygbj8ocz1cInJ1bkZ1bmN0aW9uSW5QYW5lbFwiLGM9XCJwYW5lbDogXCIrKDE9PT1uP1wiT05FXCI6Mj09PW4/XCJUV09cIjozPT09bj9cIlRIUkVFXCI6XCJaRVJPXCIpKToocz1cInJ1bkZ1bmN0aW9uSW5UYWJcIixjPWB0YWJOYW1lOiBcIiR7bi50cmltKCl9XCJgKTtjb25zdCB1PXtxdWVyeTpgbXV0YXRpb24ge1xcbiAgICAgICAgJHtzfShpbnB1dDoge1xcbiAgICAgICAgICBtbmVtb25pYzogXCIke2l9XCIsXFxuICAgICAgICAgICR7Y30sXFxuICAgICAgICAgICR7cj9gc2VjdXJpdHkxOiBcIiR7cn1cImA6XCJcIn1cXG4gICAgICAgICAgJHtvP2BzZWN1cml0eTI6IFwiJHtvfVwiYDpcIlwifVxcbiAgICAgICAgICAke2E/YHRhaWw6IFwiJHthfVwiYDpcIlwifVxcbiAgICAgICAgfSkge1xcbiAgICAgICAgICAuLi4gb24gUmVzdWx0IHtcXG4gICAgICAgICAgICBzdWNjZWVkZWRcXG4gICAgICAgICAgICBkZXRhaWxzXFxuICAgICAgICAgIH1cXG4gICAgICAgICAgLi4uIG9uIEVycm9yIHtcXG4gICAgICAgICAgICBlcnJvckNhdGVnb3J5XFxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlXFxuICAgICAgICAgIH1cXG4gICAgICAgIH1cXG4gICAgICB9YH07bGV0IGw7dHJ5e2w9YXdhaXQgZShULkV4ZWN1dGVSZXF1ZXN0LHUpfWNhdGNoKGUpe2NvbnN0IHQ9bmV3IEFkYXB0ZXJFcnJvcih2b2lkIDAsZSk7dGhyb3cgUih0KSx0fWlmKCFsLnN1Y2Nlc3Mpe2NvbnN0IGU9bmV3IFRlcm1pbmFsQ29ubmVjdFJlcXVlc3RFcnJvcihsLmVycm9yPy5tZXNzYWdlLGwuZXJyb3IpO3Rocm93IFIoZSksZX1pZihsLmRhdGEpe2NvbnN0IGU9SlNPTi5wYXJzZShsLmRhdGEpO2xldCB0O2lmKFwicnVuRnVuY3Rpb25JblRhYlwiaW4gZT90PWUucnVuRnVuY3Rpb25JblRhYi5lcnJvck1lc3NhZ2U6XCJydW5GdW5jdGlvbkluUGFuZWxcImluIGUmJih0PWUucnVuRnVuY3Rpb25JblBhbmVsLmVycm9yTWVzc2FnZSksdCl7Y29uc3Qgbj1uZXcgVGVybWluYWxDb25uZWN0UmVxdWVzdEVycm9yKHQsZSk7dGhyb3cgUihuKSxufX19KSh0KShuLG8saSxzLGEpfSxXPSgpPT5lPT57Y29uc3QgdD1lLHtuYW1lOm4saWQ6cn09dCxvPXI/LkJCRz8/bjtpZihvKXJldHVybnttbmVtb25pYzpcIkJJT1wiLHRhcmdldDowLHRhaWw6b307eChcIk5vIHZhbGlkIGlkZW50aWZpZXIgcHJvdmlkZWQgaW4gY29udGV4dCwgaWdub3JpbmdcIil9LFk9ZT0+dD0+e2NvbnN0IG49Yih0KTtpZihuKXJldHVybnttbmVtb25pYzplLHNlY3VyaXRpZXM6W25dLHRhcmdldDowfTt4KFwiTm8gc2VjdXJpdHkgcHJvdmlkZWQgaW4gY29udGV4dCwgaWdub3JpbmdcIil9LEs9YXN5bmMoZSx0LG4scik9Pntjb25zdCBvPSgoKT0+e2NvbnN0IGU9W10sdD1bXTtyZXR1cm4gZS5wdXNoKFtkLkluc3RydW1lbnQsWShcIkRFU1wiKV0pLGUucHVzaChbZC5Db250YWN0LFcoKV0pLGUucHVzaChbZC5Pcmdhbml6YXRpb24sXygpXSksdC5wdXNoKFt5LlN0YXJ0Q2hhdCxbW2QuTm90aGluZyxaKFwiSUJcIildLFtkLkNvbnRhY3QsZT0+e2NvbnN0e2lkOnQsbmFtZTpufT1lO3JldHVybnttbmVtb25pYzpcIklCXCIsdGFyZ2V0OjAsdGFpbDp0LmVtYWlsPz9ufX1dXV0pLHQucHVzaChbeS5WaWV3QW5hbHlzaXMsW1tkLk5vdGhpbmcsWihcIkFOUlwiKV0sW2QuSW5zdHJ1bWVudCxlPT57Y29uc3QgdD1iKGUpO2lmKCF0KXJldHVybiB2b2lkIHgoXCJObyBzZWN1cml0eSBwcm92aWRlZCBpbiBjb250ZXh0LCBpZ25vcmluZ1wiKTtsZXQgbjtzd2l0Y2goRSh0KSl7Y2FzZVwiRXF1aXR5XCI6Y2FzZVwiSW5kZXhcIjpuPVwiRkFcIjticmVhaztjYXNlXCJDb3JwXCI6Y2FzZVwiR292dFwiOmNhc2VcIk10Z2VcIjpjYXNlXCJNdW5pXCI6Y2FzZVwiUGZkXCI6bj1cIllBU1wiO2JyZWFrO2RlZmF1bHQ6bj1cIkFOUlwifXJldHVybnttbmVtb25pYzpuLHNlY3VyaXRpZXM6W3RdLHRhcmdldDowfX1dXV0pLHQucHVzaChbeS5WaWV3Q2hhcnQsW1tkLk5vdGhpbmcsWihcIkdJUFwiKV0sW2QuSW5zdHJ1bWVudCxZKFwiR0lQXCIpXSxbZC5DaGFydCxlPT57Y29uc3R7aW50ZXJ2YWw6dCxpbnN0cnVtZW50czpuLHJhbmdlOnIsc3R5bGU6b309ZSxhPXttbmVtb25pYzpcIkdJUFwiLHRhcmdldDowfTtsZXQgaT0hMDtjb25zdCBzPWIobj8uWzBdPz9lKTtzJiYoYS5zZWN1cml0aWVzPVtzXSk7Y29uc3R7ZW5kVGltZTpjLHN0YXJ0VGltZTp1fT1yPz97fTtpZih1KXtjb25zdCBlPUModS50b1N0cmluZygpKTtpZihlJiYoYS50YWlsPWAke2UuZ2V0TW9udGgoKSsxfS8ke2UuZ2V0RGF0ZSgpfS8ke2UuZ2V0RnVsbFllYXIoKX1gLGk9ITEsYykpe2NvbnN0IGU9QyhjLnRvU3RyaW5nKCkpO2UmJihhLnRhaWwrPWAgJHtlLmdldE1vbnRoKCkrMX0vJHtlLmdldERhdGUoKX0vJHtlLmdldEZ1bGxZZWFyKCl9YCl9fXN3aXRjaChvPy50b0xvd2VyQ2FzZSgpKXtjYXNlXCJiYXJcIjphLm1uZW1vbmljPWk/XCJJR1BPXCI6XCJHUE9cIjticmVhaztjYXNlXCJjYW5kbGVcIjphLm1uZW1vbmljPWk/XCJJR1BDXCI6XCJHUENcIjticmVhaztkZWZhdWx0OmEubW5lbW9uaWM9aT9cIkdJUFwiOlwiR1BcIn1pZighaSYmdClzd2l0Y2godC50b0xvd2VyQ2FzZSgpKXtjYXNlXCJkYWlseVwiOmEudGFpbCs9XCIgRFwiO2JyZWFrO2Nhc2VcIndlZWtseVwiOmEudGFpbCs9XCIgV1wiO2JyZWFrO2Nhc2VcIm1vbnRobHlcIjphLnRhaWwrPVwiTVwiO2JyZWFrO2Nhc2VcInF1YXJ0ZXJseVwiOmEudGFpbCs9XCIgUVwiO2JyZWFrO2Nhc2VcInllYXJseVwiOmEudGFpbCs9XCIgWVwifXJldHVybiBhfV1dXSksdC5wdXNoKFt5LlZpZXdDaGF0LFtbZC5Ob3RoaW5nLFooXCJJQlwiKV0sW2QuQ29udGFjdCxlPT57Y29uc3R7aWQ6dCxuYW1lOm59PWU7cmV0dXJue21uZW1vbmljOlwiSUJcIix0YXJnZXQ6MCx0YWlsOnQuZW1haWw/P259fV1dXSksdC5wdXNoKFt5LlZpZXdDb250YWN0LFtbZC5Ob3RoaW5nLFooXCJCSU9cIildLFtkLkNvbnRhY3QsVygpXV1dKSx0LnB1c2goW3kuVmlld0luc3RydW1lbnQsW1tkLk5vdGhpbmcsWihcIkRFU1wiKV0sW2QuSW5zdHJ1bWVudCxZKFwiREVTXCIpXV1dKSx0LnB1c2goW3kuVmlld05ld3MsW1tkLk5vdGhpbmcsWihcIkNOXCIpXSxbZC5JbnN0cnVtZW50LFkoXCJDTlwiKV1dXSksdC5wdXNoKFt5LlZpZXdQcm9maWxlLFtbZC5Ob3RoaW5nLFooXCJERVNcIildLFtkLkNvbnRhY3QsVygpXSxbZC5Pcmdhbml6YXRpb24sXygpXV1dKSx0LnB1c2goW3kuVmlld1F1b3RlLFtbZC5Ob3RoaW5nLFooXCJBTExRXCIpXSxbZC5JbnN0cnVtZW50LFkoXCJBTExRXCIpXV1dKSx0LnB1c2goW3kuVmlld1Jlc2VhcmNoLFtbZC5Ob3RoaW5nLFooXCJCUkNcIildLFtkLkluc3RydW1lbnQsWShcIkJSQ1wiKV1dXSkse2NvbnRleHRzOmUsaW50ZW50czp0fX0pKCksYT0oZT0+e2NvbnN0IHQ9KFtlXSk9PiEhKGU/P1wiXCIpLnRyaW0oKTtyZXR1cm57Y29udGV4dHM6Wy4uLmU/LmNvbnRleHRzPz9bXV0uZmlsdGVyKHQpLGludGVudHM6Wy4uLmU/LmludGVudHM/P1tdXS5maWx0ZXIoKChbZSxuXSk9Pntjb25zdCByPVsuLi5uPz9bXV0uZmlsdGVyKHQpO3JldHVybiEhKGU/P1wiXCIpLnRyaW0oKSYmci5sZW5ndGg+MH0pKX19KSh0KSxpPW5ldyBNYXAoby5jb250ZXh0cyk7YS5jb250ZXh0cz8uZm9yRWFjaCgoKFtlXSk9PntpLmhhcyhlKSYmaS5kZWxldGUoZSl9KSksby5jb250ZXh0cz1BcnJheS5mcm9tKGkpO2NvbnN0IHM9bmV3IE1hcChvLmludGVudHMpO2EuaW50ZW50cz8uZm9yRWFjaCgoKFtlXSk9PntzLmhhcyhlKSYmcy5kZWxldGUoZSl9KSksby5pbnRlbnRzPUFycmF5LmZyb20ocyk7Y29uc3QgYz1bLi4uby5jb250ZXh0cywuLi5hLmNvbnRleHRzPz9bXV0sdT1bLi4uby5pbnRlbnRzLC4uLmEuaW50ZW50cz8/W11dLGw9W107bGV0IHA7Yy5sZW5ndGgmJmwucHVzaChmaW4ubWUuaW50ZXJvcC5hZGRDb250ZXh0SGFuZGxlcigoKGUsdCxuLHIpPT5hc3luYyBvPT57bz8hMCE9PW8ub3BlbmZpbkJiZ0FwaSYmKE4oXCJDb250ZXh0IHJlY2VpdmVkXCIsbyksby50eXBlIT09ZC5Ob3RoaW5nP2F3YWl0IFgoZSxvLHQsbixyKTpOKFwiTnVsbCBjb250ZXh0IHJlY2VpdmVkLCBpZ25vcmluZ1wiKSk6TihcIk5vIGNvbnRleHQgaW5mbyBwcm92aWRlZCwgaWdub3JpbmdcIil9KShlLGMsbixyKSkpLHUubGVuZ3RoJiZ1LmZvckVhY2goKChbdCxvXSk9PntsLnB1c2goZmluLm1lLmludGVyb3AucmVnaXN0ZXJJbnRlbnRIYW5kbGVyKCgoZSx0LG4scik9PmFzeW5jIG89PntOKFwiSW50ZW50IHJlY2VpdmVkXCIsbyksdD9hd2FpdCBYKGUsby5jb250ZXh0LHQsbixyKTp4KGBObyBhY3Rpb25zIGhhdmUgYmVlbiBwcm92aWRlZCBmb3IgaW50ZW50ICR7by5uYW1lfSwgaWdub3JpbmdgKX0pKGUsbyxuLHIpLHQpKX0pKTt0cnl7cD1hd2FpdCBQcm9taXNlLmFsbChsKX1jYXRjaChlKXtjb25zdCB0PW5ldyBJbnRlcm9wRXJyb3IoXCJGYWlsZWQgdG8gcmVnaXN0ZXIgaW50ZXJvcCBoYW5kbGVyc1wiLGUpO3Rocm93IFIodCksdH1yZXR1cm4gcH0sWj1lPT50PT4oe21uZW1vbmljOmUsdGFyZ2V0OjB9KSxfPSgpPT5lPT57Y29uc3R7bmFtZTp0fT1lO2lmKHQpcmV0dXJue21uZW1vbmljOlwiU0VBUlwiLHRhcmdldDowLHRhaWw6dH07eChcIk5vIHZhbGlkIGlkZW50aWZpZXIgcHJvdmlkZWQgaW4gY29udGV4dCwgaWdub3JpbmdcIil9LFg9YXN5bmMoZSx0LG4scixvKT0+e3I/Lih0KSxOKFwiUHJvY2Vzc2luZyBjb250ZXh0XCIsdCksbi5zb21lKCgoW2VdKT0+ZT09PXQudHlwZSkpP2F3YWl0IFByb21pc2UuYWxsKG4uZmlsdGVyKCgoW2VdKT0+ZT09PXQudHlwZSkpLm1hcCgoYXN5bmMoWyxuXSk9PntsZXQgcjt0cnl7cj1hd2FpdCBuKHQpfWNhdGNoKGUpe2NvbnN0IHQ9bmV3IEFwaUVycm9yKFwiVW5leHBlY3RlZCBlcnJvciBpbiBjb250ZXh0IGFjdGlvbiBoYW5kbGVyXCIsZSk7cmV0dXJuIFIodCksdm9pZCBvPy4odCl9dHJ5e2F3YWl0IFEocixlKX1jYXRjaChlKXtjb25zdCB0PWUgaW5zdGFuY2VvZiBBcGlFcnJvcj9lOm5ldyBBcGlFcnJvcih2b2lkIDAsZSk7Uih0KSxvPy4odCl9fSkpKTp4KGBObyBhY3Rpb24gaGFzIGJlZW4gZGVmaW5lZCBmb3IgY29udGV4dCB0eXBlICR7dC50eXBlfSwgaWdub3JpbmdgKX07dmFyIGVlOyFmdW5jdGlvbihlKXtlLkJsb29tYmVyZz1cIkJMT09NQkVSR1wifShlZXx8KGVlPXt9KSk7Y29uc3QgdGU9YXN5bmMoZSx0KT0+e04oXCJDcmVhdGluZyBjb25uZWN0aW9uXCIse2NvbmZpZzp0fSkscmUoZWUuQmxvb21iZXJnKTtjb25zdCBuPWF3YWl0IHoodik7YXdhaXQgbi5pbml0VGVybWluYWwoZSk7Y29uc3R7YWN0aW9uczpyLGludGVyb3BEaXNhYmxlZDpvLG9uQ29udGV4dENoYW5nZWQ6YSxvbkVycm9yOml9PXQ/P3t9LHM9dm9pZCAwPT09dD8uZ3JvdXBzP1wiKlwiOnQuZ3JvdXBzLGM9W107aWYoITAhPT1vKXtjLnB1c2goLi4uYXdhaXQgSyhuLmRpc3BhdGNoLHIsYSxpKSk7Y29uc3QgZT1hd2FpdCBCKG4uZGlzcGF0Y2gscyxhLGkpO2UmJmMucHVzaChlKX1yZXR1cm57ZGlzY29ubmVjdDpuZShuLmRpc3BhdGNoLGMpLGV4ZWN1dGVBcGlSZXF1ZXN0Oih1PW4uZGlzcGF0Y2gsYXN5bmMoZSx0KT0+e04oXCJFeGVjdXRpbmcgQVBJIHJlcXVlc3RcIix7cXVlcnk6ZX0pO2NvbnN0IG49e3F1ZXJ5OmV9O2xldCByO3QmJihuLnNlcnZpY2U9dCk7dHJ5e3I9YXdhaXQgdShULkV4ZWN1dGVSZXF1ZXN0LG4pfWNhdGNoKGUpe2NvbnN0IHQ9bmV3IEFkYXB0ZXJFcnJvcih2b2lkIDAsZSk7dGhyb3cgUih0KSx0fWlmKCFyLnN1Y2Nlc3Mpe2NvbnN0IGU9bmV3IFRlcm1pbmFsQ29ubmVjdFJlcXVlc3RFcnJvcihyLmVycm9yPy5tZXNzYWdlLHIuZXJyb3IpO3Rocm93IFIoZSksZX1pZighci5kYXRhKXtjb25zdCBlPW5ldyBUZXJtaW5hbENvbm5lY3RSZXF1ZXN0RXJyb3IoXCJVbmV4cGVjdGVkIGVtcHR5IHJlc3BvbnNlIGRhdGFcIixyKTt0aHJvdyBSKGUpLGV9Y29uc3Qgbz1KU09OLnBhcnNlKHIuZGF0YSk7aWYoXCJlcnJvck1lc3NhZ2VcImluIG8pe2NvbnN0IGU9bmV3IFRlcm1pbmFsQ29ubmVjdFJlcXVlc3RFcnJvcihvLmVycm9yTWVzc2FnZSxvKTt0aHJvdyBSKGUpLGV9cmV0dXJuIG99KX07dmFyIHV9LG5lPShlLHQ9W10pPT5hc3luYygpPT57TihcIkRpc2Nvbm5lY3RpbmdcIik7dHJ5e2F3YWl0IFByb21pc2UuYWxsKHQubWFwKChhc3luYyBlPT57YXdhaXQgZS51bnN1YnNjcmliZSgpfSkpKSxhd2FpdChlPT5hc3luYygpPT57bGV0IHQ7dHJ5e3Q9YXdhaXQgZShULkRpc2Nvbm5lY3QsbnVsbCl9Y2F0Y2goZSl7Y29uc3QgdD1uZXcgQWRhcHRlckVycm9yKHZvaWQgMCxlKTt0aHJvdyBSKHQpLHR9aWYoIXQuc3VjY2Vzcyl7Y29uc3QgZT1uZXcgVGVybWluYWxDb25uZWN0aW9uRXJyb3IoXCJGYWlsZWQgdG8gZGlzY29ubmVjdCB0ZXJtaW5hbFwiLHQuZXJyb3IpO3Rocm93IFIoZSksZX19KShlKSgpfWNhdGNoKGUpe2NvbnN0IHQ9bmV3IEFwaUVycm9yKFwiRGlzY29ubmVjdGlvbiBmYWlsZWRcIixlKTt0aHJvdyBSKHQpLHR9fSxyZT1hc3luYyBlPT57dHJ5e2F3YWl0IGZpbi5TeXN0ZW0ucmVnaXN0ZXJVc2FnZSh7dHlwZTpcImludGVncmF0aW9uLWZlYXR1cmVcIixkYXRhOnthcGlWZXJzaW9uOlwiMi4wLjBcIixjb21wb25lbnROYW1lOmV9fSl9Y2F0Y2godCl7eChgVW5hYmxlIHRvIHJlZ2lzdGVyIHVzYWdlIGZvciBmZWF0dXJlICR7ZX06ICR7dD8ubWVzc2FnZX1gKX19O3ZhciBvZT10LkFkYXB0ZXJFcnJvcixhZT10LkFwaUVycm9yLGllPXQuSW5pdGlhbGl6YXRpb25FcnJvcixzZT10LkludGVyb3BFcnJvcixjZT10LlRlcm1pbmFsQ29ubmVjdFJlcXVlc3RFcnJvcix1ZT10LlRlcm1pbmFsQ29ubmVjdGlvbkVycm9yLGxlPXQuY29ubmVjdCxwZT10LmRpc2FibGVMb2dnaW5nLGRlPXQuZW5hYmxlTG9nZ2luZyxnZT10LmdldFNlY3VyaXR5RnJvbUluc3RydW1lbnRDb250ZXh0O2V4cG9ydHtvZSBhcyBBZGFwdGVyRXJyb3IsYWUgYXMgQXBpRXJyb3IsaWUgYXMgSW5pdGlhbGl6YXRpb25FcnJvcixzZSBhcyBJbnRlcm9wRXJyb3IsY2UgYXMgVGVybWluYWxDb25uZWN0UmVxdWVzdEVycm9yLHVlIGFzIFRlcm1pbmFsQ29ubmVjdGlvbkVycm9yLGxlIGFzIGNvbm5lY3QscGUgYXMgZGlzYWJsZUxvZ2dpbmcsZGUgYXMgZW5hYmxlTG9nZ2luZyxnZSBhcyBnZXRTZWN1cml0eUZyb21JbnN0cnVtZW50Q29udGV4dH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgKiBhcyBmZGMzIGZyb20gXCJAZmlub3MvZmRjM1wiO1xuaW1wb3J0IHtcblx0Y29ubmVjdCxcblx0Z2V0U2VjdXJpdHlGcm9tSW5zdHJ1bWVudENvbnRleHQsXG5cdHR5cGUgQmxvb21iZXJnR3JvdXBVcGRhdGUsXG5cdGVuYWJsZUxvZ2dpbmcsXG5cdHR5cGUgQmxvb21iZXJnQ29ubmVjdGlvbkNvbmZpZyxcblx0dHlwZSBCbG9vbWJlcmdDb25uZWN0aW9uXG59IGZyb20gXCJAb3BlbmZpbi9ibG9vbWJlcmdcIjtcbmltcG9ydCB0eXBlIE9wZW5GaW4gZnJvbSBcIkBvcGVuZmluL2NvcmVcIjtcblxubGV0IGJiZ0Nvbm5lY3Rpb246IEJsb29tYmVyZ0Nvbm5lY3Rpb24gfCB1bmRlZmluZWQ7XG5cbmxldCBzZWxlY3RlZEludGVudFR5cGU6IHN0cmluZyA9IFwiXCI7XG5sZXQgc2VsZWN0ZWRJbnRlbnRWYWx1ZTogc3RyaW5nID0gXCJcIjtcbmxldCBmZGMzRGVub21pbmF0aW9uOiBzdHJpbmcgPSBcIlwiO1xubGV0IGJiZ01uZW1vbmljOiBzdHJpbmcgPSBcIlwiO1xuXG5sZXQgYnRuQ29ubmVjdDogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xubGV0IGJ0bkRpc2Nvbm5lY3Q6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbmxldCBidG5DbGVhckxvZ3M6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbmxldCBidG5RdWVyeTogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xubGV0IGludGVudFR5cGVFbGVtZW50OiBIVE1MU2VsZWN0RWxlbWVudCB8IG51bGw7XG5sZXQgaW50ZW50VmFsdWVFbGVtZW50OiBIVE1MU2VsZWN0RWxlbWVudCB8IG51bGw7XG5sZXQgbG9nT3V0cHV0OiBIVE1MUHJlRWxlbWVudCB8IG51bGw7XG5cbmNvbnN0IEFQSV9LRVkgPSBcIlwiO1xuXG5jb25zdCBjb25maWc6IEJsb29tYmVyZ0Nvbm5lY3Rpb25Db25maWcgPSB7XG5cdG9uQ29udGV4dENoYW5nZWQ6ICgoY29udGV4dCkgPT4ge1xuXHRcdGxvZ0luZm9ybWF0aW9uKGBSZWNlaXZlZCBjb250ZXh0OiAke0pTT04uc3RyaW5naWZ5KGNvbnRleHQpfWApO1xuXHR9KSxcblx0b25FcnJvcjogKGVycm9yKSA9PiBsb2dJbmZvcm1hdGlvbihlcnJvci5tZXNzYWdlKSxcblx0Z3JvdXBzOiBbXCJHcm91cC1BXCJdLFxuXHRpbnRlcm9wRGlzYWJsZWQ6IGZhbHNlLFxuXHRhY3Rpb25zOiB7XG4gICAgICAgIGNvbnRleHRzOiBbXG4gICAgICAgICAgW1xuICAgICAgICAgICAgZmRjMy5Db250ZXh0VHlwZXMuSW5zdHJ1bWVudCxcbiAgICAgICAgICAgIChjb250ZXh0KSA9PiB7XG4gICAgICAgICAgICAgIC8vIFVzZSB0aGUgZ2V0U2VjdXJpdHlGcm9tSW5zdHJ1bWVudENvbnRleHQgdXRpbGl0eSBmdW5jdGlvbiB0byBleHRyYWN0IHRoZSBzZWN1cml0eSBzdHJpbmcgZnJvbSB0aGUgY29udGV4dFxuICAgICAgICAgICAgICBjb25zdCBzZWN1cml0eSA9IGdldFNlY3VyaXR5RnJvbUluc3RydW1lbnRDb250ZXh0KGNvbnRleHQpO1xuICAgICAgICAgICAgICBpZiAoIXNlY3VyaXR5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cdFx0XHRsb2dJbmZvcm1hdGlvbihgUmVjZWl2ZWQgSW5zdHJ1bWVudCBDb250ZXh0OiAke3NlY3VyaXR5fWApO1xuXG5cbiAgICAgICAgICAgICAgLy8gUmV0dXJuIGEgQmxvb21iZXJnR3JvdXBVcGRhdGUgb2JqZWN0IHRoYXQgdXBkYXRlcyBMYXVuY2hwYWQgZ3JvdXAgQSB3aXRoIHRoZSBzZWN1cml0eVxuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGdyb3VwOiBcIkdyb3VwLUFcIixcbiAgICAgICAgICAgICAgICBzZWN1cml0eVxuICAgICAgICAgICAgICB9IGFzIEJsb29tYmVyZ0dyb3VwVXBkYXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgXVxuICAgICAgfVxuICB9O1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgYXN5bmMgKCkgPT4ge1xuXHQvLyBFbmFibGUgbG9nZ2luZyBpbiB0aGUgQkJHIHBhY2thZ2Vcblx0ZW5hYmxlTG9nZ2luZygpO1xuXG5cdC8vIEluaXRpYWxpemUgdGhlIERPTSBlbGVtZW50cy5cblx0aW5pdGlhbGl6ZURPTSgpO1xufSk7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSB0aGUgRE9NLlxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplRE9NKCk6IHZvaWQge1xuXHRidG5Db25uZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjYnRuQ29ubmVjdFwiKTtcblx0YnRuRGlzY29ubmVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0bkRpc2Nvbm5lY3RcIik7XG5cdGJ0bkNsZWFyTG9ncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0bkNsZWFyXCIpO1xuXHRidG5RdWVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0blF1ZXJ5XCIpO1xuXHRpbnRlbnRUeXBlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFNlbGVjdEVsZW1lbnQ+KFwiI2ludGVudFR5cGVcIik7XG5cdGludGVudFZhbHVlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFNlbGVjdEVsZW1lbnQ+KFwiI2ludGVudFZhbHVlXCIpO1xuXHRsb2dPdXRwdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxQcmVFbGVtZW50PihcIiNsb2dPdXRwdXRcIik7XG5cblx0aWYgKGJ0bkNvbm5lY3QpIHtcblx0XHRidG5Db25uZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRpZiAoYnRuQ29ubmVjdCkge1xuXHRcdFx0XHRidG5Db25uZWN0LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGF3YWl0IGNvbm5lY3RUb0JCR1Rlcm1pbmFsKCk7XG5cdFx0XHR1cGRhdGVTdGF0ZSgpO1xuXHRcdH0pO1xuXHR9XG5cdGlmIChidG5EaXNjb25uZWN0KSB7XG5cdFx0YnRuRGlzY29ubmVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0aWYgKGJ0bkRpc2Nvbm5lY3QpIHtcblx0XHRcdFx0YnRuRGlzY29ubmVjdC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHR9XG5cdFx0XHRhd2FpdCBkaXNjb25uZWN0RnJvbUJCR1Rlcm1pbmFsKCk7XG5cdFx0XHR1cGRhdGVTdGF0ZSgpO1xuXHRcdH0pO1xuXHR9XG5cdGlmIChidG5DbGVhckxvZ3MpIHtcblx0XHRidG5DbGVhckxvZ3MuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsZWFyTG9ncyk7XG5cdH1cblx0aWYgKGJ0blF1ZXJ5KSB7XG5cdFx0YnRuUXVlcnkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZpcmVJbnRlbnRGb3JCQkcpO1xuXHR9XG5cblx0aWYgKGludGVudFR5cGVFbGVtZW50KSB7XG5cdFx0aW50ZW50VHlwZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZXZlbnQpID0+IHtcblx0XHRcdGlmIChpbnRlbnRUeXBlRWxlbWVudD8udmFsdWUpIHtcblx0XHRcdFx0aWYgKGJ0blF1ZXJ5KSB7XG5cdFx0XHRcdFx0YnRuUXVlcnkuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHN3aXRjaCAoaW50ZW50VHlwZUVsZW1lbnQ/LnZhbHVlKSB7XG5cdFx0XHRcdFx0Y2FzZSBcIlZpZXdDaGFydFwiOlxuXHRcdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oXG5cdFx0XHRcdFx0XHRcdFwiSW50ZW50IHRvIGJlIGZpcmVkIGlzIFZpZXdDaGFydC4gQ29udGVudCBUeXBlIGlzIGZkYzMuaW5zdHJ1bWVudC4gQmxvb21iZXJnIFRlcm1pbmFsIE1uZW1vbmljOiBHUFwiXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0c2VsZWN0ZWRJbnRlbnRUeXBlID0gXCJWaWV3Q2hhcnRcIjtcblx0XHRcdFx0XHRcdGZkYzNEZW5vbWluYXRpb24gPSBcImZkYzMuaW5zdHJ1bWVudFwiO1xuXHRcdFx0XHRcdFx0YmJnTW5lbW9uaWMgPSBcIkdQXCI7XG5cdFx0XHRcdFx0XHRwb3B1bGF0ZVNlbGVjdChpbnRlbnRWYWx1ZUVsZW1lbnQsIFtcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBcIk9SQ0xcIixcblx0XHRcdFx0XHRcdFx0XHRsYWJlbDogXCJPcmFjbGUgQ29ycFwiXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogXCJNU0ZUXCIsXG5cdFx0XHRcdFx0XHRcdFx0bGFiZWw6IFwiTWljcm9zb2Z0XCJcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBcIklCTVwiLFxuXHRcdFx0XHRcdFx0XHRcdGxhYmVsOiBcIklCTVwiXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcIlZpZXdDb250YWN0XCI6XG5cdFx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihcblx0XHRcdFx0XHRcdFx0XCJJbnRlbnQgdG8gYmUgZmlyZWQgaXMgVmlld0NvbnRhY3QuIENvbnRlbnQgVHlwZSBpcyBmZGMzLmNvbnRhY3QuIEJsb29tYmVyZyBUZXJtaW5hbCBNbmVtb25pYzogQklPXCJcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRzZWxlY3RlZEludGVudFR5cGUgPSBcIlZpZXdDb250YWN0XCI7XG5cdFx0XHRcdFx0XHRmZGMzRGVub21pbmF0aW9uID0gXCJmZGMzLmNvbnRhY3RcIjtcblx0XHRcdFx0XHRcdGJiZ01uZW1vbmljID0gXCJCSU9cIjtcblx0XHRcdFx0XHRcdHBvcHVsYXRlU2VsZWN0KGludGVudFZhbHVlRWxlbWVudCwgW1xuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IFwiV2lsbGlhbSBIZW5yeSBHYXRlc1wiLFxuXHRcdFx0XHRcdFx0XHRcdGxhYmVsOiBcIldpbGxpYW0gSGVucnkgR2F0ZXNcIlxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IFwiTGFycnkgRWxsaXNvblwiLFxuXHRcdFx0XHRcdFx0XHRcdGxhYmVsOiBcIkxhcnJ5IEVsbGlzb25cIlxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IFwiUm9iZXJ0IElnZXJcIixcblx0XHRcdFx0XHRcdFx0XHRsYWJlbDogXCJSb2JlcnQgSWdlclwiXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcIlZpZXdJbnN0cnVtZW50XCI6XG5cdFx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihcblx0XHRcdFx0XHRcdFx0XCJJbnRlbnQgdG8gYmUgZmlyZWQgaXMgVmlld0luc3RydW1lbnQuIENvbnRlbnQgVHlwZSBpcyBmZGMzLmluc3RydW1lbnQuIEJsb29tYmVyZyBUZXJtaW5hbCBNbmVtb25pYzogREVTXCJcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRzZWxlY3RlZEludGVudFR5cGUgPSBcIlZpZXdJbnN0cnVtZW50XCI7XG5cdFx0XHRcdFx0XHRmZGMzRGVub21pbmF0aW9uID0gXCJmZGMzLmluc3RydW1lbnRcIjtcblx0XHRcdFx0XHRcdGJiZ01uZW1vbmljID0gXCJERVNcIjtcblx0XHRcdFx0XHRcdHBvcHVsYXRlU2VsZWN0KGludGVudFZhbHVlRWxlbWVudCwgW1xuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IFwiT1JDTFwiLFxuXHRcdFx0XHRcdFx0XHRcdGxhYmVsOiBcIk9yYWNsZSBDb3JwXCJcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBcIk1TRlRcIixcblx0XHRcdFx0XHRcdFx0XHRsYWJlbDogXCJNaWNyb3NvZnRcIlxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IFwiSUJNXCIsXG5cdFx0XHRcdFx0XHRcdFx0bGFiZWw6IFwiSUJNXCJcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XSk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIFwiVmlld1F1b3RlXCI6XG5cdFx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihcblx0XHRcdFx0XHRcdFx0XCJJbnRlbnQgdG8gYmUgZmlyZWQgaXMgVmlld1F1b3RlLiBDb250ZW50IFR5cGUgaXMgZmRjMy5pbnN0cnVtZW50LiBCbG9vbWJlcmcgVGVybWluYWwgTW5lbW9uaWM6IFFcIlxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdHNlbGVjdGVkSW50ZW50VHlwZSA9IFwiVmlld1F1b3RlXCI7XG5cdFx0XHRcdFx0XHRmZGMzRGVub21pbmF0aW9uID0gXCJmZGMzLmluc3RydW1lbnRcIjtcblx0XHRcdFx0XHRcdGJiZ01uZW1vbmljID0gXCJRXCI7XG5cdFx0XHRcdFx0XHRwb3B1bGF0ZVNlbGVjdChpbnRlbnRWYWx1ZUVsZW1lbnQsIFtcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBcIk9SQ0xcIixcblx0XHRcdFx0XHRcdFx0XHRsYWJlbDogXCJPcmFjbGUgQ29ycFwiXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogXCJNU0ZUXCIsXG5cdFx0XHRcdFx0XHRcdFx0bGFiZWw6IFwiTWljcm9zb2Z0XCJcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBcIklCTVwiLFxuXHRcdFx0XHRcdFx0XHRcdGxhYmVsOiBcIklCTVwiXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0dXBkYXRlU3RhdGUoKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGlmIChpbnRlbnRWYWx1ZUVsZW1lbnQpIHtcblx0XHRpbnRlbnRWYWx1ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XG5cdFx0XHRpZiAoaW50ZW50VmFsdWVFbGVtZW50KSB7XG5cdFx0XHRcdHNlbGVjdGVkSW50ZW50VmFsdWUgPSBpbnRlbnRWYWx1ZUVsZW1lbnQudmFsdWU7XG5cdFx0XHRcdGlmIChzZWxlY3RlZEludGVudFZhbHVlLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihcblx0XHRcdFx0XHRcdGBhY3Rpb246ICR7c2VsZWN0ZWRJbnRlbnRUeXBlfSwgdHlwZTogJHtmZGMzRGVub21pbmF0aW9ufSwgYmJnIG1uZW1vbmljOiAke2JiZ01uZW1vbmljfSwgc2VhcmNoIHZhbHVlOiAke3NlbGVjdGVkSW50ZW50VmFsdWV9YFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dXBkYXRlU3RhdGUoKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHVwZGF0ZVN0YXRlKCk7XG59XG5cbi8qKlxuICogQ29ubmVjdCB0byBCbG9vbWJlcmcgVGVybWluYWwuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGNvbm5lY3RUb0JCR1Rlcm1pbmFsKCk6IFByb21pc2U8dm9pZD4ge1xuXHR0cnkge1xuXHRcdGxvZ0luZm9ybWF0aW9uKFwiQ2hlY2tpbmcgQmxvb21iZXJnIFRlcm1pbmFsIFN0YXR1c1wiKTtcblxuXHRcdGJiZ0Nvbm5lY3Rpb24gPSBhd2FpdCBjb25uZWN0KEFQSV9LRVksIGNvbmZpZyk7XG5cdFx0bG9nSW5mb3JtYXRpb24oXCJDb25uZWN0aW9uIHN1Y2Nlc3NmdWxcIik7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0YmJnQ29ubmVjdGlvbiA9IHVuZGVmaW5lZDtcblx0XHRjb25zb2xlLmxvZyhlcnJvcik7XG5cdFx0bG9nSW5mb3JtYXRpb24oZXJyb3JUb1N0cmluZyhlcnJvcikpO1xuXHR9XG59XG5cbi8qKlxuICogRGlzY29ubmVjdCBmcm9tIEJsb29tYmVyZyBUZXJtaW5hbC5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gZGlzY29ubmVjdEZyb21CQkdUZXJtaW5hbCgpOiBQcm9taXNlPHZvaWQ+IHtcblx0aWYgKGJiZ0Nvbm5lY3Rpb24pIHtcblx0XHR0cnkge1xuXHRcdFx0bG9nSW5mb3JtYXRpb24oXCJEaXNjb25uZWN0aW5nIGZyb20gQmxvb21iZXJnIFRlcm1pbmFsXCIpO1xuXHRcdFx0YXdhaXQgYmJnQ29ubmVjdGlvbi5kaXNjb25uZWN0KCk7XG5cdFx0fSBmaW5hbGx5IHtcblx0XHRcdGJiZ0Nvbm5lY3Rpb24gPSB1bmRlZmluZWQ7XG5cdFx0XHRsb2dJbmZvcm1hdGlvbihcIkRpc2Nvbm5lY3RlZCBmcm9tIEJsb29tYmVyZyBUZXJtaW5hbFwiKTtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBGaXJlIGFuIGludGVudC5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gZmlyZUludGVudEZvckJCRygpOiBQcm9taXNlPHZvaWQ+IHtcblx0aWYgKGJiZ0Nvbm5lY3Rpb24pIHtcblx0XHR0cnkge1xuXHRcdFx0bG9nSW5mb3JtYXRpb24oXG5cdFx0XHRcdGBhY3Rpb246ICR7c2VsZWN0ZWRJbnRlbnRUeXBlfSwgdHlwZTogJHtmZGMzRGVub21pbmF0aW9ufSwgYmJnIG1uZW1vbmljOiAke2JiZ01uZW1vbmljfSwgc2VhcmNoIHZhbHVlOiAke3NlbGVjdGVkSW50ZW50VmFsdWV9YFxuXHRcdFx0KTtcblxuXHRcdFx0bGV0IGludGVudDogT3BlbkZpbi5JbnRlbnQ7XG5cblx0XHRcdHN3aXRjaCAoc2VsZWN0ZWRJbnRlbnRUeXBlKSB7XG5cdFx0XHRcdGNhc2UgXCJWaWV3Q29udGFjdFwiOlxuXHRcdFx0XHRcdGludGVudCA9IHtcblx0XHRcdFx0XHRcdG5hbWU6IHNlbGVjdGVkSW50ZW50VHlwZSxcblx0XHRcdFx0XHRcdGNvbnRleHQ6IHtcblx0XHRcdFx0XHRcdFx0dHlwZTogZmRjM0Rlbm9taW5hdGlvbixcblx0XHRcdFx0XHRcdFx0bmFtZTogc2VsZWN0ZWRJbnRlbnRWYWx1ZSxcblx0XHRcdFx0XHRcdFx0aWQ6IHt9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRpbnRlbnQgPSB7XG5cdFx0XHRcdFx0XHRuYW1lOiBzZWxlY3RlZEludGVudFR5cGUsXG5cdFx0XHRcdFx0XHRjb250ZXh0OiB7XG5cdFx0XHRcdFx0XHRcdHR5cGU6IGZkYzNEZW5vbWluYXRpb24sXG5cdFx0XHRcdFx0XHRcdGlkOiB7XG5cdFx0XHRcdFx0XHRcdFx0dGlja2VyOiBzZWxlY3RlZEludGVudFZhbHVlXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHRhd2FpdCBmaW4ubWUuaW50ZXJvcC5maXJlSW50ZW50KGludGVudCk7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGxvZ0luZm9ybWF0aW9uKGBFcnJvciB3aGlsZSB0cnlpbmcgdG8gcmFpc2UgaW50ZW50OiAke2Vycm9yVG9TdHJpbmcoZXJyb3IpfWApO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRsb2dJbmZvcm1hdGlvbihcIk5vdCBjb25uZWN0ZWQgdG8gdGhlIEJsb29tYmVyZyBUZXJtaW5hbC4gUGxlYXNlIGNoZWNrIHlvdXIgc3RhdHVzIG9yIGxvZyBpbiBhZ2Fpbi5cIik7XG5cdH1cbn1cblxuLyoqXG4gKiBVcGRhdGUgdGhlIHN0YXRlIG9mIHRoZSBET00uXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVN0YXRlKCk6IHZvaWQge1xuXHRjb25zdCBpc0Nvbm5lY3RlZCA9IGJiZ0Nvbm5lY3Rpb24gIT09IHVuZGVmaW5lZDtcblx0aWYgKGJ0bkNvbm5lY3QpIHtcblx0XHRidG5Db25uZWN0LmRpc2FibGVkID0gaXNDb25uZWN0ZWQ7XG5cdH1cblx0aWYgKGJ0bkRpc2Nvbm5lY3QpIHtcblx0XHRidG5EaXNjb25uZWN0LmRpc2FibGVkID0gIWlzQ29ubmVjdGVkO1xuXHR9XG5cdGlmIChpbnRlbnRUeXBlRWxlbWVudCkge1xuXHRcdGludGVudFR5cGVFbGVtZW50LmRpc2FibGVkID0gIWlzQ29ubmVjdGVkO1xuXHR9XG5cdGlmIChpbnRlbnRWYWx1ZUVsZW1lbnQpIHtcblx0XHRpbnRlbnRWYWx1ZUVsZW1lbnQuZGlzYWJsZWQgPSAhaXNDb25uZWN0ZWQgfHwgc2VsZWN0ZWRJbnRlbnRUeXBlLmxlbmd0aCA9PT0gMDtcblx0fVxuXHRpZiAoYnRuUXVlcnkpIHtcblx0XHRidG5RdWVyeS5kaXNhYmxlZCA9ICFpc0Nvbm5lY3RlZCB8fCBzZWxlY3RlZEludGVudFZhbHVlLmxlbmd0aCA9PT0gMDtcblx0fVxufVxuXG4vKipcbiAqIExvZyBpbmZvcm1hdGlvbiB0byB0aGUgb3V0cHV0IGVsZW1lbnQuXG4gKiBAcGFyYW0gaW5mbyBUaGUgaW5mb3JtYXRpb24gdG8gbG9nLlxuICovXG5mdW5jdGlvbiBsb2dJbmZvcm1hdGlvbihpbmZvOiBzdHJpbmcpOiB2b2lkIHtcblx0aWYgKGxvZ091dHB1dCkge1xuXHRcdGxvZ091dHB1dC50ZXh0Q29udGVudCA9IGAke2xvZ091dHB1dC50ZXh0Q29udGVudH0ke2luZm99XFxuXFxuYDtcblx0XHRsb2dPdXRwdXQuc2Nyb2xsVG9wID0gbG9nT3V0cHV0LnNjcm9sbEhlaWdodDtcblx0fVxufVxuXG4vKipcbiAqIENvbnZlcnQgYW5kIGVycm9yIHRvIGEgc3RyaW5nLlxuICogQHBhcmFtIGVyciBUaGUgZXJyb3IgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIFRoZSBlcnJvciBhcyBhIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gZXJyb3JUb1N0cmluZyhlcnI6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGVyciA9PT0gXCJzdHJpbmdcIikge1xuXHRcdHJldHVybiBlcnI7XG5cdH1cblxuXHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZXJyKTtcbn1cblxuLyoqXG4gKiBDbGVhciB0aGUgbG9ncy5cbiAqL1xuZnVuY3Rpb24gY2xlYXJMb2dzKCk6IHZvaWQge1xuXHRpZiAobG9nT3V0cHV0KSB7XG5cdFx0bG9nT3V0cHV0LnRleHRDb250ZW50ID0gXCJcIjtcblx0XHRsb2dPdXRwdXQuc2Nyb2xsVG9wID0gMDtcblx0fVxufVxuXG4vKipcbiAqIFBvcHVsYXRlIGEgc2VsZWN0IGNvbnRyb2wgd2l0aCBhIGxpc3Qgb2YgaXRlbXMuXG4gKiBAcGFyYW0gc2VsZWN0IFRoZSBzZWxlY3QgZWxlbWVudCB0byBwb3B1bGF0ZS5cbiAqIEBwYXJhbSB2YWx1ZXMgVGhlIHZhbHVlcyB0byBwb3B1bGF0ZSB0aGUgZWxlbWVudCB3aXRoLlxuICovXG5mdW5jdGlvbiBwb3B1bGF0ZVNlbGVjdChzZWxlY3Q6IEhUTUxTZWxlY3RFbGVtZW50IHwgbnVsbCwgdmFsdWVzOiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfVtdKTogdm9pZCB7XG5cdGlmIChzZWxlY3QpIHtcblx0XHRzZWxlY3QuaW5uZXJIVE1MID0gXCJcIjtcblx0XHRjb25zdCBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuXHRcdG9wdC52YWx1ZSA9IFwiXCI7XG5cdFx0b3B0LnRleHQgPSBcIlBsZWFzZSBzZWxlY3QgdmFsdWVcIjtcblx0XHRvcHQuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdG9wdC5zZWxlY3RlZCA9IHRydWU7XG5cdFx0c2VsZWN0LmFwcGVuZChvcHQpO1xuXG5cdFx0Zm9yIChjb25zdCB2YWwgb2YgdmFsdWVzKSB7XG5cdFx0XHRjb25zdCBvcHRWYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuXHRcdFx0b3B0VmFsLnZhbHVlID0gdmFsLnZhbHVlO1xuXHRcdFx0b3B0VmFsLnRleHQgPSB2YWwubGFiZWw7XG5cdFx0XHRzZWxlY3QuYXBwZW5kKG9wdFZhbCk7XG5cdFx0fVxuXHR9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=