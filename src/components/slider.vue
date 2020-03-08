<template>
    <section class="pt-5 circle-1">
        <div class="ourworks-box container pb-5 pt-5">
            <h1 class="our-works-head">The most visited related products of </h1>
        </div>

	    <div class="container pb-5 position-relative">
            <div @mouseover="show = false" @mouseleave="show = true" id="demo" class="carousel slide position-relative" data-ride="carousel">

                <!-- Indicators -->
                <ul class="carousel-indicators">
                        <li data-target="#demo" data-slide-to="1" class="active"></li>
                </ul>
                    <div class="row">
                        <div :key="item.name" v-for="item in itemsToShow" class="col-md-4 col-xs-6">
                            <app-item :mode="'most'" :itemDetails="item"/>
                        </div>
                    </div>
                    
                <!-- Left and right controls -->
        
                <a @click="prev" class="carousel-control-prev" style="opacity: 1; left: -10%;cursor:pointer">
                    <i class="fa fa-arrow-left" style="color:#ccc; font-size:60px;"></i>
                </a>
                <a @click="next" class="carousel-control-next" style="opacity: 1; right: -10%;cursor:pointer">
                    <i class="fa fa-arrow-right" style="color:#ccc; font-size:60px;"></i>
                </a>  

            </div>
		</div>
	</section>
</template>
<script>
import ItemVue from './Item.vue'
import axios from 'axios';
export default {
    props: ['category'],
    data() {
        return {
            mostvisited: [],
            itemsToShow: [],
            show: true,
            role: 0,
            itemsPerSlider: 3
        }
    },
    components: {
        appItem: ItemVue
    },
    methods: {
        loadItems() {
         
        },
        next() {
            this.itemsToShow = [];
            const limit = this.role + this.itemsPerSlider;
            console.log(this.role, limit);
            this.itemsToShow = [...this.mostvisited].slice(this.role, limit);
            this.role = this.role + this.itemsPerSlider;
            if(this.role>this.mostvisited.length-this.itemsPerSlider) {
                this.role = 0;
                return;
            }
        },
        prev() {
            this.itemsToShow = [];
            const limit = this.role + this.itemsPerSlider;
            
            console.log(this.role, limit);
            this.itemsToShow = [...this.mostvisited].reverse().slice(this.role, limit);
            this.role = this.role + this.itemsPerSlider;
            if(this.role>this.mostvisited.length-1) {
                this.role = 0;
                return;
            }
        }
    },
    watch: {
        category(val) {
            axios.get('/getmostvisited/'+val).then(res => {
            this.mostvisited = res.data.mostvisited;
            });
            setInterval(()=>{
                if(this.show) {
                    this.itemsToShow = [];
                    const limit = this.role + this.itemsPerSlider;
                    this.itemsToShow = [...this.mostvisited].slice(this.role, limit);
                    this.role = this.role + this.itemsPerSlider;
                    if(this.role>this.mostvisited.length-1) {
                        this.role = 0;
                    }
                }
            }, 4000);
        }
    }
}
</script>
<style scoped>
    .ourworks-box{
	width: 60%;
	justify-content: center;
	text-align: center;
}

.our-works-head{
	font-size: 30px;
	font-weight: 400;
	color: black;
}
.introduce{
	height: 250px;
	background-color:white;
	box-shadow: 0 3px 10px #5969f642;
	border-bottom: 4px solid #5969f6;
	color: black;
}

.introduce:hover{
	box-shadow: 0 3px 15px #5969f666;
	border-bottom: 4px solid #B122e5;
	color: black;
	text-decoration: none;
}
.flex-column-1{
	height: 70%;
	width: 100%;

}
.flex-column-2{
	height: 30%;
	width: 100%;
	align-items:center;
}
.text-gray{
	color: gray;
}
.pic{
    height: 70px;
    width: 70px;
    margin-left: 20px;
    border-radius: 50%;
    transition: all .2s ease-in-out;
}

.introduce:hover .pic{
	transform: scale(1.1);
}
.carousel-indicators .active{
	background-color: #46eeaa;
}
.carousel-indicators li{
	background-color: #c8e5ff;
}
.carousel-indicators{
	bottom: -50px;
}
.p1{
	background-image: url("http://lorempixel.com/150/150/nature");
	background-position: center;
	background-repeat: no-repeat;
	background-size: contain;
}
.p2{
	background-image: url("http://lorempixel.com/150/150/people");
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;

}
.p3{
	background-image: url("http://lorempixel.com/150/150/cats");
	background-position: center;
	background-repeat: no-repeat;
	background-size: contain;
}


</style>