import axios from 'axios';

  const state = {
    categories: [],
    filteredItems: [],
    chars: {},
    category: '',
    filters: {},
    itemsNum: 0,
    pageData: {
      currentPage: 0,
      itemsPerPage: 2
    },
    order: '',
    itemsLoading: false,
    showModal: false,
    wishlist: [],
    wishlistItems: [],
    wishloading: false,
    ads: [],
    checked: false
  };



  const mutations = {
    fetchCats(state, categories) {
      state.categories = categories;
    },
    fetchFilters(state, filters) {
      state.chars = filters;
      delete state.chars['_id'];
    },
    filterItems(state, data) {
      state.filteredItems = data.filtered;
      state.itemsNum = data.count;
    },
    changePage(state, pageData) {
      state.pageData = pageData;
    },
    orderItemsby(state, order) {
      state.order = order;
    },
    search(state, results) {
      state.filteredItems = results;
    },
    closeModal(state) {
      state.showModal = false;
    },
    openModal(state) {
      state.showModal = true;
    },
    getwishlist(state, data) {
      state.wishlist = data.wishlist;
      state.checked = data.checked;
    },
    getmostvisited(state, data) {
      state.mostvisited = data.mostvisited;
    },
    getwishlistItems(state, items) {
      state.wishlistItems = items;
    },
    getads(state, data) {
      state.ads = data.ads;
    }
  };



  const actions = {
    loadCats({commit}) {
      axios.get('/fetchCats').then(res => {
        const categories = res.data.cats;
        commit('fetchCats', categories);
      });
    },
    loadFilters({commit}, cat) {
      axios.get('/fetchChars/'+cat).then(res => {
        const filtersChars = res.data.chars;
        commit('fetchFilters', filtersChars, cat);
      });
    },


    filterItems({state, commit}, data) {
      if(data.mode && (data.mode==='orderBy' || data.mode==='pageChange')) {
        state.pageData.currentPage = 0;
      }
      if(data.category) state.category = data.category;
      if(data.filters && data.filters.length > 0) {
        state.filters[data.char] = data.filters
      } else {
           delete state.filters[data.char];
    }
    state.itemsLoading = true;
    axios.post('/filterItems', {
        filters: state.filters,
        category: state.category,
        pageData: state.pageData,
        order: state.order?state.order: 'newest'
      }).then(res => {
          state.itemsLoading = false;
          const filtered = [...res.data.filtered];
                console.log(filtered);
          const count = res.data.count;
          commit('filterItems', {filtered, count});
      });
    },

    pageChange({dispatch, commit}, pageData) {
      commit('changePage', pageData.pageData);
      dispatch('filterItems', {category: pageData.category});
    },
    orderBy({dispatch, commit}, order) {
      commit('orderItemsby', order);
      dispatch('filterItems', {mode: 'orderBy'});
    },
    search({dispatch, commit}, searchQuery) {
      setTimeout(() => {
        state.itemsLoading = true;
        if(!searchQuery) {
          state.itemsLoading = false;
          dispatch('filterItems', {});
          return;
        }
        axios.get('search/'+searchQuery).then(res => {
          state.itemsLoading = false;
          const results = res.data.results;
          commit('search', results);
        });
      }, 500);
    },
    closeModal({commit}) {
      commit('closeModal');
    },

    openModal({commit}) {
      commit('openModal');
    },

    addtowishlist({rootState, commit, dispatch}, data) {
      if(!rootState.usersStore.token) {
        state.showModal = true;
        return;
      }
      axios.post('/addtowishlist', {itemId: data.itemId, price: data.price, userId: rootState.usersStore.userId}).then(res => {
        if(res.data.event) {
          rootState.usersStore.message = res.data.event + " successfully";
          dispatch('getwishlist');
        }
      })
    },

    getwishlist({rootState, commit, dispatch}) {
      state.wishloading = true;
      axios.post('/getwishlist', {userId: rootState.usersStore.userId}).then(res => {
        if(res.data.wishlist) {
          console.log('wishlist', res.data.wishlist);
          commit('getwishlist', {wishlist: res.data.wishlist, checked: res.data.checked});
          dispatch('getwishlistItems');
          state.wishloading = false;
        }
      })
    },
    
    getwishlistItems({rootState, commit}) {
      const items = [];
      state.wishloading = true;
      state.wishlist.forEach(item => {
        axios.get('/getitem/'+item.itemId).then(res => {
          const itemOBJ = res.data.item;
          itemOBJ['quantity'] = item.quantity;
          itemOBJ['checked'] = item.checked;
          items.push(itemOBJ);
        });
      }),
      state.wishloading = false;
      console.log('items', items);
      commit('getwishlistItems', items);
    },

    writemessage({rootState, commit}, message) {
      rootState.usersStore.message = message;
    },

    getmostvisited({commit}, cat) {
      axios.get('/getmostvisited/'+cat).then(res => {
        commit('getmostvisited', {mostvisited: res.data.mostvisited});
      })
    },

    getads({commit}) {
      axios.get('/getads').then(res => {
        console.log( res.data.ads);

        commit('getads', {ads: res.data.ads});
      })
    } 
  };



  const getters = {
    cats(state) {
      return state.categories;
    },
    filteredItems(state) {
      return state.filteredItems;
    },
    chars(state) {
      delete state.chars['category'];
      return state.chars;
    },
    category(state) {
      return state.category;
    },
    allItemsNum(state) {
      return state.itemsNum;
    },
    currentPage(state) {
      return state.pageData.currentPage;
    },
    itemsPerPage(state) {
      return state.pageData.itemsPerPage;
    },
    itemsToFilters(state) {
      return state.itemsToFilters;
    },
    itemsLoading(state) {
      return state.itemsLoading;
    },
    showModal(state) {
      return state.showModal;
    },
    wishlist(state) {
      return state.wishlist;
    },
    mostvisited(state) {
      return state.mostvisited;
    },
    wishlistItems(state) {
      return state.wishlistItems;
    },
    wishloading() {
      return state.wishloading;
    },
    ads() {
      return state.ads;
    },
    checked() {
      return state.checked;
    },
  }



  export default {
    state,
    mutations,
    actions,
    getters
  }
