import axios from 'axios';
import router from '../router';

  const state = {
    message: '',
    token: '',
    authLoading: false,
    userEmail: null,
    expDate: 0,
    role: '0',
    userId: ''
  };



  const mutations = {
    signin(state, status) {
      if(status === 200) {
          console.log('signed in successfully');
          state.message = 'signed in successfully';
      }
    },
    signup(state, status) {
        if(status === 200) {
            console.log('signed up successfully');
            state.message = 'signed up successfully';
            state.itemsStore.showModal = false;
        }
      },
      holdToken(state, token) {
        state.token = token;
      }
  };



  const actions = {
    signin({dispatch, commit, rootState}, body) {
      state.authLoading = true;
      axios.post('/signin', body).then(res => {
        state.authLoading = false;
        if(res.data.done) {
            state.message = 'signed in successfully';
            rootState.itemsStore.showModal = false;
            state.token = res.data.token;
            state.userEmail = res.data.email;
            state.role = res.data.role;
            state.userId = res.data.userId;
            localStorage.setItem('token', res.data.token);
            const expDate = new Date(new Date().getTime()+6000000);
            localStorage.setItem('expDate', expDate);
            localStorage.setItem('userEmail', res.data.email);
            localStorage.setItem('role', res.data.role);
            localStorage.setItem('userId', res.data.userId);
            state.expDate = expDate;
            dispatch('autoSignin');
            dispatch('getwishlist');
        } else {
            state.message = res.data.message;
        }
      })
    },

    signup({commit, rootState, dispatch}, body) {
        state.authLoading = true;
        axios.post('/signup', body).then( res => {
            state.authLoading = false;
            if(res.data.done) {
                state.message = 'signed up successfully';
                rootState.itemsStore.showModal = false;
                state.token = res.data.token;
                state.userEmail = res.data.email;
                state.role = res.data.role;
                state.userId = res.data.userId;
                localStorage.setItem('token', res.data.token);
                const expDate = new Date(new Date().getTime()+6000000);
                localStorage.setItem('expDate', expDate);
                localStorage.setItem('userEmail', res.data.email);
                localStorage.setItem('role', res.data.role);
                localStorage.setItem('userId', res.data.userId);
                state.expDate = expDate;
                dispatch('autoSignin');
            }else {
                state.message = res.data.message;
            }
        })
    },
    closeMessage({commit}) {
        state.message = null;
    },
    autoSignin({dispatch, commit}) {
        const remainig = new Date(localStorage.getItem('expDate')).getTime() - new Date().getTime();
        console.log('auto Sigin', new Date(localStorage.getItem('expDate')).getTime()- new Date().getTime());

        if(remainig > 0) {
            commit('holdToken',  localStorage.getItem('token'));
            state.userEmail = localStorage.getItem('userEmail');
            state.role = localStorage.getItem('role');
            state.userId = localStorage.getItem('userId');
            localStorage.setItem('expDate', new Date(new Date().getTime()+remainig));
            setTimeout(()=>{
                dispatch('logout');
            }, remainig);
       } else {
        commit('holdToken',  null);
            state.expDate = 0;
            state.userEmail = null;
            localStorage.removeItem('token');
            localStorage.removeItem('expDate');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userId');
            state.role = null;
            localStorage.removeItem('role');
       }
    },
    logout({commit, rootState}) {
        state.token = null;
        state.expDate = 0;
        state.userEmail = null;
        localStorage.removeItem('token');
        localStorage.removeItem('expDate');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        state.role = null;
        rootState.itemsStore.showModal = true;
        router.back();
    }
  };



  const getters = {
    message(state) {
      return state.message;
    },
    authLoading(state) {
        return state.authLoading;
      },
    userEmail(state) {
        return state.userEmail;
    },
    token(state) {
        return state.token;
    },
    role(state) {
        return state.role;
    },
    userId(state) {
        return state.userId;
    },
   }



  export default {
    state,
    mutations,
    actions,
    getters
  }
