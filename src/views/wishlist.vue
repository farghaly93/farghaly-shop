<template>
<div class="container">
  <div class="nav">
    <div class="row btns">
      <button @click="show='cart'" :class="show==='cart'?'active':''" class="col-md-4">Your cart</button>
      <button @click="show='userdata'" :class="show==='userdata'?'active':''" class="col-md-4">Your data</button>
      <button @click="show='purchases'" :class="show==='purchases'?'active':''" class="col-md-4">Your purchases</button>
    </div>
  </div>
   <div v-show="show==='cart'" class="card shopping-cart">
            <div class="card-header bg-dark text-light">
                <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                Shipping cart
                <a @click="back" class="btn btn-outline-info btn-sm pull-right">Continiu shopping</a>
                <div class="clearfix"></div>
            </div>
            <div class="card-body">
                    <!-- PRODUCT -->
                    <div :key="item.name" v-for="item in wishlist" class="row">
                        <div class="col-12 col-sm-12 col-md-2 text-center">
                                <router-link :to="'/details/'+item._id"> <img class="img-responsive" :src="item.image" alt="prewiew" width="120" height="80"></router-link>
                        </div>
                        <div class="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
                            <h4 class="product-name"><strong>{{item.name}}</strong></h4>
                            <h4>
                                <small>in {{item.category}}</small>
                            </h4>
                        </div>
                        <div class="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
                            <div class="col-3 col-sm-3 col-md-4 text-md-right" style="padding-top: 5px">
                                <h6><strong>{{item.price}} <span class="text-muted">x</span></strong></h6>
                            </div>
                            <div class="col-4 col-sm-4 col-md-2">
                                <div class="quantity">
                                    <input v-if="isConfirmed===0" @input="(event)=>updatecart(event, item._id, item.price, item.quantity)" type="number" step="1" max="99" min="1" :value="item.quantity" title="Qty" class="qty" size="4">
                                </div>
                            </div>
                            <div class="col-4 col-sm-4 col-md-4">
                              <strong>{{item.price*item.quantity}}EP</strong>
                            </div>
                            <div class="col-2 col-sm-2 col-md-2 text-right">
                                <button v-if="isConfirmed===0" @click="()=>remove(item._id)" type="button" class="btn btn-outline-danger btn-xs">
                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <!-- END PRODUCT -->
                    <hr>
                    <!-- END PRODUCT -->
                <div class="pull-right">
                </div>
            </div>
            <div class="card-footer">
                <div class="coupon col-md-5 col-sm-5 no-padding-left pull-left">
                    <div class="row">
                        <div class="col-6">
                            <input type="text" class="form-control" placeholder="cupone code">
                        </div>
                        <div class="col-6">
                            <input type="submit" class="btn btn-default" value="Use cupone">
                        </div>
                    </div>
                </div>
                <div class="pull-right" style="margin: 10px">
                    <a style="color:#fff" v-if="isConfirmed===0" @click="checkout" class="btn btn-success pull-right">{{!isChecked?'Checkout': 'Cancel'}} </a>
                    <div class="pull-right" style="margin: 5px">
                        Total price: <b>{{total}}EP</b>
                    </div>
                </div>
                <div v-if="isConfirmed===1" @click="print" class="pull-right" style="margin: 10px">
                    <a style="color:#fff" v-if="isConfirmed===0" @click="checkout" class="btn btn-success pull-right">print </a>
                    <div class="pull-right" style="margin: 5px">
                        Total price: <b>{{total}}EP</b>
                    </div>
                </div>
                 
            </div>
            <div class="check">
              <div :class="isConfirmed?'checked':''" class="step"><i class="fa fa-check"/><strong>Confirmed</strong></div>
              <div class="points">......</div>
              <div :class="isShiped?'checked':''" class="step"><i class="fa fa-check"/><strong>Shiped</strong></div>
              <div class="points">......</div>
              <div :class="isDelievered?'checked':''" class="step"><i class="fa fa-check"/><strong>Delievered</strong></div>
            </div>
        </div>
      <app-userform way="update" v-show="show==='userdata'"/>
      <app-purchases v-show="show==='purchases'"/>
    </div>
</template>

<script>
import axios from 'axios';
import loading from '../components/loading.vue';
import Userform from '../components/userform.vue';
import purchases from '../components/purchases.vue';
export default {
   created() {
     this.$store.dispatch('getwishlist');
   },
  data() {
    return {
     show: 'cart',
    }
  },
  computed: {
     wishlist() {
      return this.$store.getters.wishlistItems;
     },
     wishloading() {
      return this.$store.getters.wishloading;
     },
     total() {
       let total = 0;
       this.wishlist.forEach(w=> {
         total += w.price*w.quantity;
       });
      //  console.log('totalll', total)
       return total;
     },
     isChecked() {
      return this.$store.getters.checked
     },
     isConfirmed() {
      return this.$store.getters.confirmed
     },
     isShiped() {
      return this.$store.getters.shiped
     },
     isDelievered() {
      return this.$store.getters.delievered
     }
  },
  watch: {
    wishlist(val) {
      //alert(val);
    }
  },
  methods: {
    remove(id) {
      this.$store.dispatch('addtowishlist', {itemId: id, price: 0});
    },
    updatecart(event, itemId, price, qnt) {
      setTimeout(() => {
        axios.post('/updatecart', {
        userId: this.$store.getters.userId,
        itemId,
        quantity: event.target.value,
        total: (this.total+(event.target.value-qnt)*(price))+10
      }).then(res => {
        if(res.data.done) {
          this.$store.dispatch('getwishlist');
        }
      });
      }, 1000);
    },
    back() {
      this.$router.back();
    },
    checkout() {
      axios.put('/checkcart', {userId:  this.$store.getters.userId}).then(res=>{
        if(res.data.done) {
          this.$store.dispatch('getwishlist');
        }
      });
    },
    print() {
      this.$htmlToPaper('table');
    }
  },
  components: {
    appLoading: loading,
    appUserform: Userform,
    appPurchases: purchases,
  }
}
</script>

<style scoped lang="scss">
   @import '../scss/table.scss';
</style>