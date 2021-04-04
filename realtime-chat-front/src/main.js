import Vue from "vue";
import App from "./App.vue";
import VueSocketIOExt from "vue-socket.io-extended";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", { autoConnect: false });
socket.auth = {
  username: "ChriisX",
  sessionID: "9da4fe09-d0c0-467c-a2e1-e465a4510eaa",
};
socket.connect();

Vue.config.productionTip = false;
Vue.use(VueSocketIOExt, socket);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
