<template>
    <div @click="gotoItems" class="card">
        <div class="card-body">
            <h5 class="card-title">{{categoryDetails.name}}</h5>
            <a href="" @click="gotoItems" class="btn btn-primary">Go somewhere</a>
        </div>
                <div class="image"><img class="card-img-top" :src="categoryDetails.image" alt="Card image cap"></div>
    </div>
</template>

<script>
export default {
    props: ['categoryDetails'],
    computed: {
        cardStyle() {
            return (
                'backgroundColor:'+this.categoryDetails.color+';'
            )
        }
    },
    methods: {
        gotoItems() {
            this.$router.push('/items/'+this.categoryDetails.name);
        }
    }
}
</script>

<style scoped>
    .card {
        box-shadow: #ccc 1px 2px 1px 2px;
        cursor: pointer;
        position: relative;
        margin: 0 auto;
        width: 100%;
        height: 300px;
        color: #fff;
        border-radius: 35px;
        border-width: 0;
        overflow: hidden;
        text-align: center;
        transition: transform 1s ease-in-out;
        background-image: linear-gradient(rgb(53, 75, 148), rgb(126, 140, 150), rgb(178, 217, 248));
    }
    .card:hover {
        /* margin-left: 50px; */
    }
    .card .image {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .card .image img {
        width: 100%;
        height: 100%;
        opacity: .4;
        transition: opacity 1s ease-in-out;
        transition: transform 1s, filter .5s ease-in-out;
    }
    .card .image img:hover {
        opacity: .8;
        transform: scale(3);
    }
    .card-body {
        z-index: 1;
        position: absolute;
        margin-left: 42%;
        margin-top: 5%;
    }
    .card-body h5 {
        font-size: 50px;
        -webkit-text-stroke: 2px #333;
    }
</style>