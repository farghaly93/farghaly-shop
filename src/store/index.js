import Vue from 'vue';
import Vuex from 'vuex';
import itemsStore from './itemsStore';
import usersStore from './/usersStore';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        itemsStore,
        usersStore
    }
});