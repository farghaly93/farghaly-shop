<template>
<div class="containerr">
    <div class="row  text-center">
      <div class="side">
        <h3>Side bar</h3>
        <ul>
          <li @click="show='cart'">cart</li>
          <li @click="show='userdata'">User data</li>
          <li @click="show='purchases'">Your purchases</li>
        </ul>
      </div>
        <div class="col-sm-12 col-md-6">
            <div v-show="show==='cart'" class="cart">
              <h3 style="margin:30px;">Wish list and Checkout</h3>
              <table class="table table-hover">
                  <thead>
                      <tr>
                          <th>Product</th>
                          <th>Quantity</th>
                          <th class="text-center">Price</th>
                          <th class="text-center">Total</th>
                          <th> </th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr class="tab" :key="item.name" v-for="item in wishlist">
                          <td class="col-sm-8 col-md-6">
                          <div class="media">
                              <router-link :to="'/details/'+item._id" class="thumbnail pull-left" > <img width="100px" height="100px" class="media-object" :src="item.image"> </router-link>
                              <div class="media-body">
                                  <h4 class="media-heading"><a href="#">{{item.name}}</a></h4>
                                  <h5 class="media-heading"> in <a href="#">{{item.category}}</a></h5>
                                  <span>Status: </span><span class="text-success"><strong>In Stock</strong></span>
                              </div>
                          </div></td>
                          <td class="col-sm-1 col-md-1" style="text-align: center">
                          <input @input="(event)=>updatecart(event, item._id, item.price)" type="number" class="form-control" id="exampleInputEmail1" min="1" :value="item.quantity">
                          </td>
                          <td class="col-sm-1 col-md-1 text-center"><strong>{{item.price}}</strong></td>
                          <td class="col-sm-1 col-md-1 text-center"><strong>{{item.price*item.quantity}}</strong></td>
                          <td class="col-sm-1 col-md-1">
                          <button @click="()=>remove(item._id)" type="button" class="btn btn-danger">
                              <span class="glyphicon glyphicon-remove"></span> Remove
                          </button></td>
                      </tr>
                      <tr class="tab">
                          <td>   </td>
                          <td>   </td>
                          <td>   </td>
                          <td><h5>Subtotal</h5></td>
                          <td class="text-right"><h5><strong>{{total}} EP</strong></h5></td>
                      </tr>
                      <tr class="tab">
                          <td>   </td>
                          <td>   </td>
                          <td>   </td>
                          <td><h5>Estimated shipping</h5></td>
                          <td class="text-right"><h5><strong>10 EP</strong></h5></td>
                      </tr>
                      <tr class="tab">
                          <td>   </td>
                          <td>   </td>
                          <td>   </td>
                          <td><h3>Total</h3></td>
                          <td class="text-right"><h3><strong>{{total+10}}EP</strong></h3></td>
                      </tr>
                      <tr class="tab">
                          <td>   </td>
                          <td>   </td>
                          <td>   </td>
                          <td>
                          <button @click="back" type="button" class="btn btn-primary">
                              <span class="glyphicon glyphicon-shopping-cart"></span> Continue Shopping
                          </button></td>
                          <td>
                          <button @click="checkout" type="button" class="btn btn-success">
                              {{!isChecked?'Checkout': 'Cancel'}} <span class="glyphicon glyphicon-play"></span>
                          </button></td>
                      </tr>
                  </tbody>
              </table>
            </div>
            <app-userform v-if="show==='userdata'"/>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import loading from '../components/loading.vue';
import Userform from '../components/userform.vue';
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
       return total;
     },
     isChecked() {
      return  this.$store.getters.checked
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
    updatecart(event, itemId, price) {
      setTimeout(() => {
        axios.post('/updatecart', {
        userId: this.$store.getters.userId,
        itemId,
        quantity: event.target.value,
        total: (this.total+event.target.value*price)+10
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
    }
  },
  components: {
    appLoading: loading,
    appUserform: Userform
  }
}
</script>

<style scoped lang="scss">
  .side {
    ul {
      padding: 2px 10px;
      width: 100%;
      li {
        cursor: pointer;
        list-style: none;
        margin: 15px;
        background-color: rgb(189, 157, 157);
        color: #fff;
        padding: 5px 15px;
      }
      li:hover {
       background-color:rgb(184, 120, 120) ;
      }
    }
  }
 
</style>