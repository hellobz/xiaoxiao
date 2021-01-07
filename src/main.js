import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//导入axios
import axios from "axios";

//全局引入
import Scroller from "@/components/Scroller"
//做成全局组件
Vue.component("Scroller",Scroller)

//加载动画
import Loading from "@/components/Loading"
//做成全局组件
Vue.component("Loading",Loading)

Vue.prototype.$http = axios;

//setWH是过滤器名字
Vue.filter("setWH", (url, arg) => {
  return url.replace(/w\.h/, arg);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
