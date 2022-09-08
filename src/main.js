import Vue from 'vue';
import App from './App.vue';
import Main from "./components/Main";
import NewsPage from "./components/NewsPage";
import Popular from "./components/Popular";
import ByTag from "./components/ByTag";
import Find from "./components/Find";
import Login from "./components/Login";
import Admin from "./components/Admin";
import VueRouter from 'vue-router'

Vue.config.productionTip = false;

Vue.use(VueRouter);
const isAuthenticated = () => {
  if (localStorage.getItem("token")) return true;
  else false;
};

const routes = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/news/:id",
    component: NewsPage,
  },
  {
    path: "/popular",
    component: Popular,
  },
  {
    path: "/byTag/:id",
    component: ByTag,
  },
  {
    path: "/find/:search",
    component: Find,
  },
  {
    path: "/login",
    component: Login,
    beforeEnter(to, from, next) {
      if (isAuthenticated()) {
        next("/admin");
      } else {
        next();
      }
    },
  },
  {
    path: "/admin",
    component: Admin,
    beforeEnter(to, from, next) {
      if (isAuthenticated()) {
        next();
      } else {
        next("/login");
      }
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");