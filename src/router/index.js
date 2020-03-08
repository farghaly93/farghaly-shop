import Vue from 'vue'
import VueRouter from 'vue-router'
import Categories from '../views/categories.vue'
import wishlist from '../views/wishlist.vue'
import Items from '../views/items.vue'
import Details from '../views/details.vue'
import dashboard from '../views/dashboard.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Categories },
  { path: '/dashboard', component: dashboard, beforeEnter: (to, from, next) => {
    if(store.state.usersStore.role === '1') {
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
  //   path: '/about',
  //   name: 'About',
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
