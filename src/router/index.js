import Vue from 'vue'
import VueRouter from 'vue-router'
import Categories from '../views/categories.vue'
import wishlist from '../views/wishlist.vue'
import Items from '../views/items.vue'
import Details from '../views/details.vue'
import dashboard from '../views/dashboard.vue'
import addCategory from '../views/admin/addCategory.vue'
import chatRoom from '../views/admin/chatRoom.vue'
import carts from '../views/admin/carts.vue'
import users from '../views/admin/users.vue'
import ads from '../views/admin/ads.vue'
import items from '../views/admin/items.vue'
import addItem from '../views/admin/addItem.vue'
import addAd from '../views/admin/addAd.vue'
import adminCategories from '../views/admin/categories.vue'
import store from '../store/index'
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Categories },
  { path: '/dashboard', component: dashboard, beforeEnter: (to, from, next) => {
    if(localStorage.getItem('role') == 1) {
      next();
    } else {
      next('/');
      store.state.showModal = true;
    }
  } },
  { path: '/dashboard/addcat', component: addCategory, beforeEnter: (to, from, next) => {
    if(localStorage.getItem('role') == 1) {
      next();
    } else {
      next('/');
      store.state.showModal = true;
    }
  } },
  { path: '/dashboard/editcat/:_id/:category/:char1/:char2/:char3/:char4/:char5', component: addCategory, beforeEnter: (to, from, next) => {
    if(localStorage.getItem('role') == 1) {
      next();
    } else {
      next('/');
      store.state.showModal = true;
    }
  } },
  { path: '/dashboard/categories', component: adminCategories, beforeEnter: (to, from, next) => {
    if(localStorage.getItem('role') == 1) {
      next();
    } else {
      next('/');
      store.state.showModal = true;
    }
  } },
  { path: '/dashboard/carts', component: carts, beforeEnter: (to, from, next) => {
    if(localStorage.getItem('role') == 1) {
      next();
    } else {
      next('/');
      store.state.showModal = true;
    }
  } },
  { path: '/dashboard/chatroom', component: chatRoom, beforeEnter: (to, from, next) => {
    if(localStorage.getItem('role') == 1) {
      next();
    } else {
      next('/');
      store.state.showModal = true;
    }
  } },
  { path: '/dashboard/users', component: users, beforeEnter: (to, from, next) => {
    if(localStorage.getItem('role') == 1) {
      next();
    } else {
      next('/');
      store.state.showModal = true;
    }
  } },
  { path: '/dashboard/ads', component: ads, beforeEnter: (to, from, next) => {
    if(localStorage.getItem('role') == 1) {
      next();
    } else {
      next('/');
      store.state.showModal = true;
    }
  } },
  { path: '/dashboard/addad', component: addAd, beforeEnter: (to, from, next) => {
    if(localStorage.getItem('role') == 1) {
      next();
    } else {
      next('/');
      store.state.showModal = true;
    }
  } },
  { path: '/dashboard/editad/:id', component: addAd, beforeEnter: (to, from, next) => {
    if(localStorage.getItem('role') == 1) {
      next();
    } else {
      next('/');
      store.state.showModal = true;
    }
  } },
  { path: '/dashboard/items', component: items, beforeEnter: (to, from, next) => {
    if(localStorage.getItem('role') == 1) {
      next();
    } else {
      next('/');
      store.state.showModal = true;
    }
  } },
  { path: '/dashboard/additem', component: addItem, beforeEnter: (to, from, next) => {
    if(localStorage.getItem('role') == 1) {
      next();
    } else {
      next('/');
      store.state.showModal = true;
    }
  } },
  { path: '/dashboard/edititem/:id', component: addItem, beforeEnter: (to, from, next) => {
    if(localStorage.getItem('role') == 1) {
      next();
    } else {
      next('/');
      store.state.showModal = true;
    }
  } },










  { path: '/wishlist', component: wishlist , beforeEnter: (to, from, next) => {
    if(localStorage.getItem('token')) {
      next();
    } else {
      next('/');
      store.state.showModal = true;
    }
  } },
  { path: '/items/:cat', component: Items },
  { path: '/details/:id', component: Details },
  // {
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
