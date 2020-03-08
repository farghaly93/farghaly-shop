<template>
    <transition name="slide">
        <div class="card" >
            <router-link :key="itemDetails._id" :to="'/details/'+itemDetails._id"><div @click="gotoDetails" class="imageBox"><img class="image card-img-top" :src="itemDetails.image" alt="Card image cap"></div></router-link>
            <div class="card-body">
                <div style="margin-bottom: 20px;" class="title">
                    <h3 style="color: #33334c">{{itemDetails.name}}</h3>
                    <h3 style="color: #de4646">{{itemDetails.price}} EP</h3>
                </div>
                
                <div v-if="mode!=='most'" class="desc">
                    <p class="card-text">{{itemDetails.descreption.split(' ').slice(1, 50).join(' ')}}</p>
                </div>
                <p v-if="mode!=='most'" style="color: #444;font-weight:bold">See more...</p>
                <app-rating class="stars" :rating="itemDetails.rating"/>
                <div v-if="mode!=='most'" class="buttons">
                    <a style="color:#fff" @click="gotoDetails" class="btn btn-primary">Details</a>
                    <a style="color:#fff" @click="addtowishlist" class="btn wishlist">{{wishlist.map(w => w.itemId).includes(itemDetails._id)?'Added': 'Add to wishlist'}}</a>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import rating from './rating.vue';
    export default {
        updated() {
        },
        props: ['itemDetails', 'wishlist', 'mode'],
        methods: {
            gotoDetails() {
                this.$router.push({path: '/details/'+this.itemDetails._id});
            },
            addtowishlist() {
                this.$store.dispatch('addtowishlist', {itemId: this.itemDetails._id, price: this.itemDetails.price});
            }
        },
        components: {
            appRating: rating
        },
        watch: {
            wishlist: () => {
                const list = [...this.wishlist].map(w => w.itemId);
                console.log(list);
                if(list.includes(itemDetails._id)) {
                   this.isAddedToWishlist = true;
                } else {
                    this.isAddedToWishlist = false;
                }
            }
        },
        data() {
            return {
                isAddedToWishlist: false
            }
        }
    }
</script>

<style scoped lang="css">
    .card {
        margin: 18px;
        cursor: pointer;
    }
    .card h3 {
        color: #555;
    }
    .imageBox {
        overflow: hidden;
        position: relative;
        box-shadow: 3px 3px 8px 8px #ccc;
        height: 280px;
        width: 100%;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
    }
    .image {
        height: 100%;
        width: 100%;
        position:absolute;
        left:0;
        -webkit-transition: opacity .5s ease-in-out;
        -moz-transition: opacity .5s ease-in-out;
        -o-transition: opacity .5s ease-in-out;
        transition: opacity .5s ease-in-out;
    }
    .image:hover {
        opacity: .7;
    }
    .wishlist {
        background-color: rgb(199, 76, 133);
        color: #fff;
    }
    .wishlist:hover {
        background-color: rgb(117, 15, 100);
        color: #fff;
    }
    .desc {
        height: 100px;
        overflow: hidden;
    }
    .desc p {
        color: rgb(110, 105, 110);
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif
    }
    .title {
        display: flex;
        padding: 2px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-image: linear-gradient(rgb(190, 190, 190), rgb(243, 241, 241), rgb(253, 253, 253));
    }
    .buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-content: center;
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