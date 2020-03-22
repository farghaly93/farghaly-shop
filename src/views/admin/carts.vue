<template>
    <div class="container">
        <div class="row">
            <div class="people-list col-md-3">
                <div class="search">
                    <input @input="search" type="text" placeholder="search" />
                    <i class="fa fa-search"></i>
                </div>
                <ul class="list">
                    <li @click="() => currentCartAndUser(cart)" :key="i" v-for="(cart, i) in filteredcarts" class="clearfix">
                        <img height="50px" width="50px" src="https://previews.123rf.com/images/val2014/val20141603/val2014160300006/54302308-shopping-cart-icon.jpg" alt="avatar" />
                        <div class="about">
                            <div class="name">{{cart.user.fullname}}</div>
                            <div class="status">
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        
            <div class="chatt col-md-9">
                <div class="chat-header clearfix">
                    <img height="50px" width="50px" src="https://previews.123rf.com/images/val2014/val20141603/val2014160300006/54302308-shopping-cart-icon.jpg" alt="avatar" />
                    
                    <div class="chat-about">
                    <div class="chat-with">Cart of {{currentUser.fullname}}</div>
                    <div class="chat-num-messages">already {{currentCart.items?currentCart.items.length: 0}} items</div>
                    </div>
                    <i class="fa fa-star"></i>
                </div>
                <div v-if="currentCart.items">
                    <div class="userdata">
                        <h3 style="color:#36559c;margin:35px;">User data</h3>
                        <div class="data row"><h4 class="col-md-4"><strong>Full name: </strong></h4><h4 class="col-md-8"> {{currentUser.fullname}}</h4></div>
                        <div class="data row"><h4 class="col-md-4"><strong>Email: </strong></h4><h4 class="col-md-8"> {{currentUser.email}}</h4></div>
                        <div class="data row"><h4 class="col-md-4"><strong>Phone: </strong></h4><h4 class="col-md-8"> {{currentUser.phone}}</h4></div>
                        <div class="data row"><h4 class="col-md-4"><strong>Address: </strong></h4><h4 class="col-md-8"> {{currentUser.address}}</h4></div>
                    </div>
                    <div class="userdata">
                        <h3 style="color:#36559c;margin:35px;">Order data</h3>
                        <div class="data row"><h4 class="col-md-4"><strong>Date of order: </strong></h4><h4 class="col-md-8"> {{currentCart.date.split('GMT')[0]}}</h4></div>
                        <div class="data row"><h4 class="col-md-4"><strong>Total cost: </strong></h4><h4 class="col-md-8"> {{currentCart.totalPrice}} EP</h4></div>
                    </div>
                    <div class="items">
                        <h3 style="color:#36559c;margin:35px;">Order Items</h3>
                        <div class="item row" :key="i" v-for="(item, i) in currentCart.items">
                            <img style="cursor:pointer" @click="() => gotoItem(item.itemId)" class="col-md-3" src="https://www.freeiconspng.com/uploads/shipping-icon-1.png" width="50px" height="70px"/>
                            <h4 class="col-md-3">{{item.name}}</h4>
                            <h4 class="col-md-3">{{item.price}} EP</h4>
                            <h4 class="col-md-3">{{item.quantity}}</h4>
                        </div>
                    </div>
                    <div class="funkyradio row">
                        <div class="funkyradio-success col-md-3">
                            <input @change="()=>changeStage(currentCart._id, 'confirmed')" type="checkbox" name="checkbox" id="checkbox1" :checked="currentCart.confirmed"/>
                            <label for="checkbox1">Confirm</label>
                        </div>
                        <div class="funkyradio-success col-md-3">
                            <input @change="()=>changeStage(currentCart._id, 'shiped')" type="checkbox" name="checkbox" id="checkbox2" :checked="currentCart.shiped"/>
                            <label for="checkbox2">Shiped</label>
                        </div>
                        <div class="funkyradio-success col-md-3">
                            <input @change="()=>changeStage(currentCart._id, 'delievered')" type="checkbox" name="checkbox" id="checkbox3" :checked="currentCart.delievered"/>
                            <label for="checkbox3">Delievered</label>
                        </div>
                        <div class="funkyradio-success col-md-3">
                            <input @change="()=>changeStage(currentCart._id, 'done')" type="checkbox" name="checkbox" id="checkbox4" :checked="currentCart.done"/>
                            <label for="checkbox4">Done</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div> <!-- end container -->
</template>\

<script>
import axios from 'axios';

export default {
    created() {
        this.getCarts();
    },
    methods: {
        getCarts() {
            axios.get('/getUsersCarts').then(res => {
                this.carts = res.data.users;
                this.filteredcarts = res.data.users;
            });
        },
        search(event) {
            this.filteredcarts = [...this.carts].filter(cart => cart.user.fullname.includes(event.target.value));
        },
        currentCartAndUser(cart) {
            this.currentCart = cart.cart;
            this.currentUser = cart.user;
            console.log(this.currentCart, this.currentUser);
        },
        gotoItem(itemId) {
            this.$router.push('/details/'+itemId);
        },
        changeStage(id, stage) {
            console.log(id, stage);
            axios.get('/cartStage/'+id+'/'+stage).then(res => {
                this.carts = res.data.users;
                const cartData = [...this.carts].find(cart => {return cart.cart._id === this.currentCart._id});;
                console.log(this.carts);
                this.currentCart = cartData.cart;
                this.currentUser = cartData.user;
                this.$store.dispatch('writemessage', res.data.message);
                if(stage === 'done') {
                    this.currentCart = this.carts[0].cart;
                    this.currentUser = this.carts[0].user;
                }
            });
        }
    },
    data() {
        return {
            carts: [],
            filteredcarts: [],
            currentCart: {},
            currentCartCount: 0,
            currentUser: {}
        }
    },
    watch: {
        carts(val) {
            if(val.length === 0) {
                //this.currentCart = {};
                //this.currentUser = {};
            }
        }
    }    
}
</script>

<style scoped lang="scss">
    @import '../../scss/table.scss';
    @import '../../scss/room.scss';
    @import '../../scss/checkLabel.scss';

    .userdata {
        width: 100%;
        float: left;
        .data {
            h4, h4 {
                text-align: left;
            }
        }
    }
   



</style>