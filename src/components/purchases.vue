<template>
    <div class="container">
        <div class="table">
            <div class="section">
                <div class="header">Order ID</div>
                <div class="content">
                    <div :key="index" v-for="(p, index) in purchases" class="order">
                        <p>{{p.id}}</p>
                    </div>
                </div>
            </div>
            <div class="section">
                <div class="header">Orders</div>
                <div class="content">
                    <div :key="index" v-for="(p, index) in purchases" class="order orders">
                        <p :key="item._id" v-for="item in p.items">{{item.name}} ({{item.price}} EP) ({{item.quantity}})</p>
                    </div>
                </div>
            </div>
            <div class="section">
                <div class="header">Total price</div>
                <div class="content">
                    <div :key="index" v-for="(p, index) in purchases" class="order">
                        <p>{{p.total}} EP</p>
                    </div>
                </div>
            </div>
            <div class="section">
                <div class="header">Date of delievry</div>
                <div class="content">
                    <div :key="index" v-for="(p, index) in purchases" class="order">
                        <p>{{getDateee(p.date)}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    created() {
        axios.get('/getpurchases/'+this.$store.getters.userId).then(res => {
            this.purchases = res.data.purchases;
            console.log(new Date());
        });
    },
    data() {
        return {
            purchases: []
        }
    },
    methods: {
        getDateee(date) {
           return date.split('GMT')[0];
        }
    } 
}
</script>

<style lang="scss">
    .table {
        display: flex;
        flex-direction: row;
        justify-items: center;
        margin: 14px;
        .section {
            width: 250px;
            .header {
                background-color: rgba(103, 133, 134, 0.671);
                color: #fff;
                width: 250px;
                margin-bottom: 12px;
            }
            .content {
                .order {
                    background-color: #ccc;
                    margin: 10px;
                    padding: 10px;
                    height: 100px;
                    padding-top: 20%;
                }
                .order.orders {
                    overflow-y: scroll;
                }
            }
        }
    }
</style>