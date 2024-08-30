var i={d:(t,e)=>{for(var n in e)i.o(e,n)&&!i.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},o:(i,t)=>Object.prototype.hasOwnProperty.call(i,t)},t={};function e(i){return null==i}i.d(t,{k:()=>n});const n={lifecycle:new class{async initialize(i,t,e){this._definition=i,this._logger=t(`ExampleNotificationService(${this._definition?.id}):`),this._helpers=e,this._lifeCycleSubscriptions={},this._logger.info("Initializing")}async closedown(){this._logger?.info("Closedown"),await this.stopNotificationService()}async get(){const i={};return i["after-bootstrap"]=async(i,t)=>{await this.startNotificationService()},i}async startNotificationService(){const i=this._definition?.data?.exampleServerUrl;if(this._logger?.info(`Starting notification service and connecting to ${i??"https://examplenotificationserver"} (Not Really...this is an example.)`),this._helpers?.subscribeLifecycleEvent&&(this._lifeCycleSubscriptions||(this._lifeCycleSubscriptions={}),this._notificationSubscriptions||(this._notificationSubscriptions={}),this._helpers?.getNotificationClient&&(this._notificationClient=await this._helpers.getNotificationClient()),this._notificationClient)){if(await this.setupNotificationEventListeners(),!1!==this._definition?.data?.notifyOn?.appsChanged){const i=this._helpers?.subscribeLifecycleEvent("apps-changed",(async()=>{const i={title:"Apps Changed Notification",body:`The list of apps on this platform has changed.This was generated by the example notification service (moduleId: ${this._definition?.id}).`,toast:"transient",category:"default",template:"markdown"};await(this._notificationClient?.create(i))}));this._lifeCycleSubscriptions[i]="apps-changed"}if(!1!==this._definition?.data?.notifyOn?.favoriteChanged){const i=this._helpers?.subscribeLifecycleEvent("favorite-changed",(async()=>{const i={title:"Favorite Changed Notification",body:`You have changed a favorite on this platform.This was generated by the example notification service (moduleId: ${this._definition?.id}).`,toast:"transient",category:"default",template:"markdown"};await(this._notificationClient?.create(i))}));this._lifeCycleSubscriptions[i]="favorite-changed"}if(!1!==this._definition?.data?.notifyOn?.pageChanged){const i=this._helpers?.subscribeLifecycleEvent("page-changed",(async()=>{const i={title:"Page Changed Notification",body:`You have changed the page on this platform.This was generated by the example notification service (moduleId: ${this._definition?.id}).`,toast:"transient",category:"default",template:"markdown"};await(this._notificationClient?.create(i))}));this._lifeCycleSubscriptions[i]="page-changed"}if(!1!==this._definition?.data?.notifyOn?.themeChanged){const i=this._helpers?.subscribeLifecycleEvent("theme-changed",(async()=>{const i={title:"Theme Changed",body:`You have changed the theme for this platform. This was generated by the example notification service (moduleId: ${this._definition?.id}).`,toast:"transient",category:"default",template:"markdown",form:[{type:"boolean",key:"intended theme change",label:"Did you intend to change the theme?",widget:{type:"Toggle"}}],buttons:[{title:"Acknowledged",type:"button",cta:!0,submit:!0}]};await(this._notificationClient?.create(i))}));this._lifeCycleSubscriptions[i]="theme-changed"}if(!1!==this._definition?.data?.notifyOn?.workspaceChanged){const i=this._helpers?.subscribeLifecycleEvent("workspace-changed",(async()=>{const i={title:"Workspace Changed",body:`You have changed your workspace. This was generated by the example notification service (moduleId: ${this._definition?.id}).`,toast:"transient",category:"default",template:"markdown",buttons:[{title:"Acknowledged",type:"button",cta:!0,onClick:{task:"acknowledge-task",customData:{message:"This is the response data"}}},{title:"Cancel",type:"button"}]};await(this._notificationClient?.create(i))}));this._lifeCycleSubscriptions[i]="workspace-changed"}}}async stopNotificationService(){if(this._logger?.info("Stopping notification service (Not Really...this is an example.)"),this._helpers?.unsubscribeLifecycleEvent&&this._lifeCycleSubscriptions)for(const[i,t]of Object.entries(this._lifeCycleSubscriptions))this._helpers.unsubscribeLifecycleEvent(i,t);await this.removeNotificationEventListeners()}async setupNotificationEventListeners(){if(!e(this._notificationClient)&&!e(this._notificationSubscriptions)){const i=i=>{this._logger?.info("Event for notification action received.",i)};await this._notificationClient.addEventListener("notification-action",i),this._notificationSubscriptions["notification-action"]=i;const t=i=>{this._logger?.info("Event for notification closed received.",i)};await this._notificationClient.addEventListener("notification-closed",t),this._notificationSubscriptions["notification-closed"]=t;const e=i=>{this._logger?.info("Event for notification created received.",i)};await this._notificationClient.addEventListener("notification-created",e),this._notificationSubscriptions["notification-created"]=e;const n=i=>{this._logger?.info("Event for notification form submitted received.",i)};await this._notificationClient.addEventListener("notification-form-submitted",n),this._notificationSubscriptions["notification-form-submitted"]=n;const o=i=>{this._logger?.info("Event for notification reminder created received.",i)};await this._notificationClient.addEventListener("notification-reminder-created",o),this._notificationSubscriptions["notification-reminder-created"]=o;const a=i=>{this._logger?.info("Event for notification reminder removed received.",i)};await this._notificationClient.addEventListener("notification-reminder-removed",a),this._notificationSubscriptions["notification-reminder-removed"]=a;const s=i=>{this._logger?.info("Event for notification toast dismissed received.",i)};await this._notificationClient.addEventListener("notification-toast-dismissed",s),this._notificationSubscriptions["notification-toast-dismissed"]=s;const c=i=>{this._logger?.info("Event for notification count changed received.",i)};await this._notificationClient.addEventListener("notifications-count-changed",c),this._notificationSubscriptions["notifications-count-changed"]=c}}async removeNotificationEventListeners(){if(!e(this._notificationClient)&&!e(this._notificationSubscriptions))for(const[i,t]of Object.entries(this._notificationSubscriptions))await this._notificationClient.removeEventListener(i,t)}}};var o=t.k;export{o as entryPoints};
//# sourceMappingURL=example-notification-service.bundle.js.map