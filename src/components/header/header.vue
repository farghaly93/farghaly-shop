<template>
  <header class="header" id="header">
    <div class="logo">
      <router-link to="/">E-shop</router-link>
    </div>
    <nav>
      <ul>
        <li v-if="!token" style="color:#fff;cursor:pointer;" @click="openModal">Register</li>
        <li v-if="role==='1'">
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li style="color:#555;font-weight:bold;cursor:pointer">
          <router-link to="/wishlist">{{userEmail}}</router-link>
        </li>
        <li @click="logout" style="color: #fff;font-weight:bold;cursor:pointer" v-if="token">
         Log out
        </li>
      </ul>
    </nav>
    <app-register v-if="showModal" />
    <app-message v-if="message">
      <h3 slot="message">{{message}}</h3>
    </app-message>
  </header>
</template>

<script>
import registerVue from '../register.vue'
import messageVue from '../message.vue';
export default {
  updated() {
    console.log('message' , this.token);
  },
 data() {
   return {
    
   }
 },
 computed: {
   showModal() {
     return this.$store.getters.showModal;
   },
   message() {
     return this.$store.getters.message;
   },
   userEmail() {
     return this.$store.getters.userEmail?this.$store.getters.userEmail.split('@')[0].split('').slice(0,13).join(''): '';
   },
   token() {
     return this.$store.getters.token;
   },
   role() {
     return this.$store.getters.role;
   } 
 },
 components: {
   appRegister: registerVue,
   appMessage: messageVue
 },
 methods: {
   openModal() {
     this.$store.dispatch('openModal');
   },
   logout() {
     this.$store.dispatch('logout');
   }
 }
}
</script>

<style scoped>
  #header {
    background-image: -webkit-linear-gradient(rgb(157, 16, 170), rgb(183, 99, 204), rgb(226, 128, 235));
    height: 56px;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    background-color: #521751;
    padding: 0 20px;
  }

  .logo {
    font-weight: bold;
    color: white;
  }

  .logo a {
    text-decoration: none;
    color: white;
  }

  nav {
    height: 100%;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100%;
    display: flex;
    flex-flow: row;
    align-items: center;
  }

  li {
    margin: 0 16px;
  }

  li a {
    text-decoration: none;
    color: white;
  }

  li a:hover,
  li a:active,
  li a.router-link-active {
    color: #fa923f;
  }

  @media screen and (max-width: 1000) {
    #header li{
    }
  }
</style>