(()=>{"use strict";const t=function(){const t={};function e(e){return void 0!==t[e]||(console.log(`PubSub says: "${e}" hasn't been published yet!`),!1)}function i(e,i){void 0===t[e]&&(t[e]=[]),t[e].push(i)}return{subscribe:i,subscribeAll:function(t){for(let e in t)i(e,t[e])},unsubscribe:function(i,n){if(!e(i)||!function(e,i){return!(t[e].indexOf(i)<0&&(console.log("PubSub says: no such handler found"),1))}(i,n))return;const o=t[i].indexOf(n);t[i].splice(o,1)},publish:function(i,n){e(i)&&t[i].forEach((t=>t(n)))},debug:function(){console.table(t)}}}(),e=function(t,e){const i=document.createElement("span");if(i.classList.add("material-icons"),i.innerText=t,void 0===e)return i;for(let t in e)i.addEventListener(t,e[t]);return i},i=function(t,e){e.forEach((e=>{t.appendChild(e)}))},n=function(t,e){const i=document.createElement(t);if(void 0===e)return i;for(let t in e)i.setAttribute(t,e[t]);return i};function o(o,s){const c=n("form",{method:"dialog"}),d=n("div",{id:"taskButtons"}),r=e("done",{click:function(){u.checkValidity()&&l.checkValidity()&&t.publish("editTask",{project:o,taskId:s.id,name:u.value,date:l.value})}}),a=e("close",{click:function(){t.publish("editTask",{project:o,taskId:s.id,name:s.name,date:s.date})}}),u=n("input",{type:"text",required:"",name:"name",value:s.name}),l=n("input",{type:"date",required:"",name:"date",value:s.date});return i(d,[r,a]),i(c,[u,l,d]),c}const s=function(s){const c=n("div",{id:"mainTasks"}),d=document.createElement("h3"),r=n("div",{id:"tasksContainer"}),a=e("add",{click:function(){t.publish("addTask",s)}});return d.innerText="Tasks",s.tasks.forEach((c=>{r.appendChild(function(s,c){const d=n("div",{class:"task",id:c.id}),r=n("div",{class:"taskContent"});let a;if(c.isDone){d.classList.add("taskCompleted");a=e("close",{click:()=>{t.publish("incompleteTask",{projId:s.id,taskId:c.id})}})}else{d.classList.remove("taskCompleted");a=e("done",{click:()=>{t.publish("completeTask",{projId:s.id,taskId:c.id})}})}const u=e("delete",{click:function(){t.publish("deleteTask",{project:s,id:c.id})}}),l=n("p",{class:"taskTitle"});l.innerText=c.name;const p=n("p",{class:"taskDate"});return p.innerText=c.date,r.addEventListener("click",(()=>{t.publish("requestTaskEdit",{taskId:c.id,form:o(s,c)})})),i(r,[l,p]),i(d,[a,r,u]),d}(s,c))})),r.appendChild(a),i(c,[d,r]),c},c=function(o){const s=n("div",{id:"mainDescription"}),c=document.createElement("h3");c.innerText="Description";const d=document.createElement("p");return""===o.description?d.innerText="Write your description here!":d.innerText=o.description,d.addEventListener("click",(()=>{t.publish("requestDescriptionEdit",function(o){const s=n("form",{method:"dialog"}),c=n("textarea",{placeholder:"Write your description here!"});c.innerText=o.description;const d=e("done",{click:function(){t.publish("editProject",{projId:o.id,title:o.title,description:c.value,priority:o.value})}}),r=e("close",{click:function(){t.publish("editProject",{projId:o.id,title:o.title,description:o.description,priority:o.value})}}),a=n("div",{id:"descButtons"});return i(a,[d,r]),i(s,[c,a]),s}(o))})),i(s,[c,d]),s},d=function(o){const s=n("div",{id:"mainHeader"}),c=n("h2"),d=n("div",{id:"mainButtons"}),r=e("edit",{click:function(){t.publish("requestTitleEdit",function(e){const o=n("form",{method:"dialog"}),s=n("input",{type:"text",required:"",name:"title",value:e.title}),c=n("span",{class:"material-icons"}),d=n("span",{class:"material-icons"}),r=n("div",{id:"mainButtons"});return c.innerText="done",d.innerText="close",c.addEventListener("click",(()=>{s.checkValidity()&&t.publish("editProject",{projId:e.id,title:s.value,description:e.value,priority:e.value})})),d.addEventListener("click",(()=>{t.publish("editProject",{projId:e.id,title:e.title,description:e.description,priority:e.value})})),i(r,[c,d]),i(o,[s,r]),o}(o))}}),a=e("delete",{click:function(){t.publish("deleteProject",o.id)}});return c.innerText=o.title,a.innerText="delete",r.innerText="edit",i(d,[a,r]),i(s,[c,d]),s},r=(function(){const o=document.querySelector("nav"),r=document.querySelector("#navProjectsContainer"),a=document.querySelector("main"),u=document.querySelector("header > button"),l=document.querySelector("#addProject"),p=document.querySelector("nav > form"),h={data:null,set(t){this.data=t},get(){return this.data}};function f(t){t&&(a.innerHTML="",i(a,[d(t),c(t),s(t)]))}u.addEventListener("click",(()=>{o.classList.toggle("navBarActive")})),l.addEventListener("click",(()=>{p.classList.add("formActive")}));const m=document.querySelector("nav > form > input"),k=document.querySelector("#projFormButtons > .confirm"),v=document.querySelector("#projFormButtons > .cancel");k.addEventListener("mousedown",(()=>{t.publish("addProject",m.value),p.reset(),p.classList.remove("formActive")})),v.addEventListener("click",(()=>{p.classList.remove("formActive")})),t.subscribeAll({todoDataChanged:function(o){!function(o){r.innerHTML="",o.forEach((o=>{const s=function(o,s){const c=n("div",{id:o.id,class:"projectNav"}),d=n("p",{class:"projectNavTitle"}),r=e("delete",{click:function(){t.publish("deleteProject",o.id)}});return s&&s.id===o.id&&c.classList.add("projectNavActive"),c.addEventListener("click",(function(){!function(){const t=document.querySelector(".projectNavActive");null!==t&&t.classList.remove("projectNavActive")}(),c.classList.add("projectNavActive"),t.publish("currentProjectChanged",o)})),d.innerText=o.title,i(c,[d,r]),c}(o,h.get());r.appendChild(s)}))}(o),f(h.get())},currentProjectChanged:function(t){h.set(t),f(t),o.classList.toggle("navBarActive")},requestDescriptionEdit:function(t){const e=document.querySelector("#mainDescription");e.querySelector("p").remove(),e.appendChild(t)},requestTitleEdit:function(t){const e=document.querySelector("#mainHeader");e.innerHTML="",e.appendChild(t)},requestTaskEdit:function(t){const e=document.querySelector(`#${t.taskId}`);e.innerHTML="",e.appendChild(t.form)}})}(),(t,e)=>{const i={name:t,date:e,isDone:!1,id:`taskID${Math.floor(999999*Math.random())}`},n={done(){this.isDone=!0},notDone(){this.isDone=!1},edit(t,e){this.name=t,this.date=e}};return Object.assign(Object.create(n),i)}),a=(t,e,i)=>{const n={title:t,description:e,priority:i,id:`projID${Math.floor(999999*Math.random())}`,tasks:[]},o={pushTask(t){this.tasks.push(t)},deleteTask(t){const e=this.tasks.indexOf(t);this.tasks.splice(e,1)},edit(t,e,i){this.title=t,this.description=e,this.priority=i}};return Object.assign(Object.create(o),n)};(function(){const e=[];function i(t){for(let i=0;i<e.length;i++)if(e[i].id===t)return i}function n(t,e){for(let i=0;i<t.tasks.length;i++)if(t.tasks[i].id===e)return i}t.subscribeAll({addProject:function(i){const n=a(i,"","");e.push(n),t.publish("todoDataChanged",e)},deleteProject:function(n){const o=i(n);e.splice(o,1),t.publish("todoDataChanged",e)},deleteTask:function(o){const s=n(o.project,o.id),c=i(o.project.id);e[c].tasks.splice(s,1),t.publish("todoDataChanged",e)},completeTask:function(o){const s=i(o.projId),c=n(e[s],o.taskId);e[s].tasks[c].done(),t.publish("todoDataChanged",e)},incompleteTask:function(o){const s=i(o.projId),c=n(e[s],o.taskId);e[s].tasks[c].notDone(),t.publish("todoDataChanged",e)},editProject:function(n){const o=i(n.projId);e[o].edit(n.title,n.description,n.priority),t.publish("todoDataChanged",e)},editTask:function(o){const s=i(o.project.id),c=n(o.project,o.taskId);e[s].tasks[c].edit(o.name,o.date),t.publish("todoDataChanged",e)},addTask:function(n){const o=i(n.id);e[o].pushTask(r("Default name","00/00/00")),t.publish("todoDataChanged",e)},init:function(i){i.forEach((t=>{const i=a(t.title,t.description,t.priority);t.tasks.forEach((t=>{const e=r(t.name,t.date);t.isDone&&e.done(),i.pushTask(e)})),e.push(i)})),t.publish("todoDataChanged",e)}})})(),t.subscribe("todoDataChanged",(function(t){localStorage.setItem("Heb.doAppProjects",JSON.stringify(t))})),t.publish("init",JSON.parse(localStorage.getItem("Heb.doAppProjects")))})();