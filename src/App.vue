<template>
   <html>
    <body>
      <div id="app">
        <app-header />
        <div class="">
          <transition name="slide" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
        <div class="chat"><app-chat style="float:right"/></div>
        <app-footer/>
      </div>
    </body>
  </html>
</template>

<script>
  import Header from './components/header/header.vue'
  import Footer from './components/footer.vue'
  import ChatVue from './components/chat.vue'
  export default {
    created() {
      this.$store.dispatch('autoSignin');
    },
    name: 'app',
    components: {
      'app-header': Header,
      'app-footer': Footer,
      appChat: ChatVue
    }
  }
</script>

<style>
  body, html {
    padding: 5px;
    text-align: center;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  .chat {
    position: fixed;
    right: 0;
    bottom: 41px;
  }
  .slide-leave-active {
        transition: opacity .2s ease;
        opacity: 0;
        animation: slide-out .2s ease-out forwards;
    }

    .slide-leave {
        opacity: 1;
        transform: translateX(0);
    }

    .slide-enter-active {
        animation: slide-in .2s ease-out forwards;
    }

    @keyframes slide-out {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-30px);
        }
    }

    @keyframes slide-in {
        0% {
            transform: translateY(-30px);
        }
        100% {
            transform: translateY(0);
        }
    }
</style>