<template>
    <div class="container">
        <h3 class="center">Ads</h3>
        <div class="row">
            <div class="col-md-3">
                <div class="card" :key="i" v-for="(ad, i) in ads">
                    <h3 @click="() => editAd(ad)">{{ad.text1}}</h3>
                    <h3>{{ad.text2}}</h3>
                    <h3 @click="()=>deleteAd(ad._id)" style="cursor:pointer">Delete<i class="fa fa-times"></i></h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    created() {
        axios.get('/getAds').then(res => {
            this.ads = res.data.ads;
        })
    },
    data() {
        return {
            ads: []
        }
    },
    methods: {
        editAd(ad) {
            this.$router.push({path: '/dashboard/editad/'+ad._id});
        },
        deleteAd(id) {
            axios.get('/deleteAd/'+id).then(res => {
                this.ads = res.data.ads
            });
        }
    }
}
</script>

<style scoped lang="scss">
    .card {
        padding: 0px;
        margin: 5px;
        height: 200px;
        border-radius: 20px;
        background-image: linear-gradient(#ccc, #ccc, #fff);
    }
</style>