<template>
    <div class="container">
        <h3 class="center">Categories</h3>
        <div class="row">
            <div class="col-md-3">
                <div class="card" :key="i" v-for="(cat, i) in cats">
                    <h3 @click="() => editCat(cat)">{{cat.category}}</h3>
                    <h3 @click="()=>deleteCat(cat._id)" style="cursor:pointer">Delete<i class="fa fa-times"></i></h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    created() {
        axios.get('/getCats').then(res => {
            this.cats = res.data.cats;
        })
    },
    data() {
        return {
            cats: []
        }
    },
    methods: {
        editCat(cat) {
            this.$router.push({path: '/dashboard/editcat/'+cat._id+'/'+cat.category+'/'+cat.char1+'/'+cat.char2+'/'+cat.char3+'/'+cat.char4+'/'+cat.char5});
        },
        deleteCat(id) {
            axios.get('/deleteCat/'+id).then(res => {
                this.cats = res.data.cats
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