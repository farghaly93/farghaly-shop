<template>
       
    <div class="containerr">
       	<header class="header_area">
    <div class="main_menu">
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container">
          <a class="navbar-brand logo_h" href=""><img src="" alt="">Farghaly-shop</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <div class="collapse navbar-collapse offset" id="navbarSupportedContent">
            <ul class="nav navbar-nav menu_nav ml-auto mr-auto">
              <li class="nav-item active"><a class="nav-link" href="index.html">Home</a></li>
              <li class="nav-item submenu dropdown">
                <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                  aria-expanded="false">Shop</a>
                <ul class="dropdown-menu">
                  <li class="nav-item"><a class="nav-link" href="category.html">Shop Category</a></li>
                  <li class="nav-item"><a class="nav-link" href="single-product.html">Product Details</a></li>
                  <li class="nav-item"><a class="nav-link" href="checkout.html">Product Checkout</a></li>
                  <li class="nav-item"><a class="nav-link" href="confirmation.html">Confirmation</a></li>
                  <li class="nav-item"><a class="nav-link" href="cart.html">Shopping Cart</a></li>
                </ul>
							</li>
              <li class="nav-item submenu dropdown">
                <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                  aria-expanded="false">Blog</a>
                <ul class="dropdown-menu">
                  <li class="nav-item"><a class="nav-link" href="blog.html">Blog</a></li>
                  <li class="nav-item"><a class="nav-link" href="single-blog.html">Blog Details</a></li>
                </ul>
							</li>
							<li class="nav-item submenu dropdown">
                <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                  aria-expanded="false">Pages</a>
                <ul class="dropdown-menu">
                  <li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>
                  <li class="nav-item"><a class="nav-link" href="register.html">Register</a></li>
                  <li class="nav-item"><a class="nav-link" href="tracking-order.html">Tracking</a></li>
                </ul>
              </li>
              <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
            </ul>

            <ul class="nav-shop">
              <li class="nav-item"><button><i class="ti-search"></i></button></li>
              <li class="nav-item"><button><i class="ti-shopping-cart"></i><span class="nav-shop__circle">3</span></button> </li>
              <li class="nav-item"><a class="button button-header" href="#">Buy Now</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>
	<!--================ End Header Menu Area =================-->

  <main class="site-main">
    
    <!--================ Hero banner start =================-->
    <section class="hero">
      <div class="container">
        <div class="row no-gutters align-items-center pt-60px">
          <div class="col-5 d-none d-sm-block">
            <div class="hero-banner__img">
              <img class="img-fluid" src="assets/img/home/hero-banner.png" alt="">
            </div>
          </div>
          <div class="col-sm-7 col-lg-6 offset-lg-1 pl-4 pl-md-5 pl-lg-0">
            <div class="hero-banner__content">
              <h4>Farghaly E-shop</h4>
              <h1>Browse Our Premium Product</h1>
              <p>Us which over of signs divide dominion deep fill bring they're meat beho upon own earth without morning over third. Their male dry. They are great appear whose land fly grass.</p>
              <!-- <a class="button button-hero" href="#">Browse Now</a> -->
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--================ Hero banner start =================-->

    <!--================ Hero Carousel start =================-->
    <section class="section-margin mt-0">
      <div class="row owl-theme hero-carousel">
        <div v-for="cat in categories" :key="cat.name" style="position:relative;margin:0 auto;" class="col-md-6 hero-carousel__slide">
          <img width="100%" height="100%" :src="cat.image" alt="" class="img-fluid">
          <a @click="()=>gotoitems(cat.name)" href="" style="position:absolute;left:0" class="hero-carousel__slideOverlay">
            <h3>{{cat.name}}</h3>
            <p>Go to category Page</p>
          </a>
        </div>
      </div>
    </section>
    <!--================ Hero Carousel end =================-->

    <!-- ================ trending product section start ================= -->  
    <section class="section-margin calc-60px">
      <div class="container">
        <div class="section-intro pb-60px">
          <p>Popular Item in the market</p>
          <h2>Trending <span class="section-intro__style">Product</span></h2>
        </div>
        <div class="row">
          <div v-for="item in mostvisited" :key="item.name" class="item col-md-4">
            <div class="card text-center card-product">
              <div class="card-product__img">
                <img width="100%" height="100%" class="card-img" :src="item.image" alt="">
                <ul class="card-product__imgOverlay">
                  <li @click="()=>gotoItem(item._id)"><button><i class="ti-search"></i></button></li>
                  <li><button><i class="ti-shopping-cart"></i></button></li>
                  <li><button><i class="ti-heart"></i></button></li>
                </ul>
              </div>
              <div class="card-body">
                <p>{{item.category}}</p>
                <h4 class="card-product__title"><a href="single-product.html">{{item.name}}</a></h4>
                <p class="card-product__price">{{item.price}}EP</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ================ trending product section end ================= -->  


    <!-- ================ offer section start ================= --> 
    <app-ad :adData="adData[0]"/>
    <!-- ================ offer section end ================= --> 

    <!-- ================ Best Selling item  carousel ================= --> 
    <section class="section-margin calc-60px">
      <div class="container">
        <div class="section-intro pb-60px">
          <p>Popular Item in the market</p>
          <h2>Best <span class="section-intro__style">Rated</span></h2>
        </div>
        <div class="row">
          <div v-for="item in bestrated" :key="item.name" class="item col-md-4">
            <div class="card text-center card-product">
              <div class="card-product__img">
                <img width="100%" height="100%" class="card-img" :src="item.image" alt="">
                <ul class="card-product__imgOverlay">
                  <li @click="()=>gotoItem(item._id)"><button><i class="ti-search"></i></button></li>
                  <li><button><i class="ti-shopping-cart"></i></button></li>
                  <li><button><i class="ti-heart"></i></button></li>
                </ul>
              </div>
              <div class="card-body">
                <p>{{item.category}}</p>
                <h4 class="card-product__title"><a href="single-product.html">{{item.name}}</a></h4>
                <p class="card-product__price">{{item.price}}EP</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ================ Blog section end ================= -->  

    <!-- ================ Subscribe section start ================= --> 
    <section class="subscribe-position">
      <div class="container">
        <div class="subscribe text-center">
          <h3 class="subscribe__title">Contact us</h3>
          <h3>01028038146</h3>
          <h3>Assiut - Al-Ebrahemia street</h3>
          
        </div>
      </div>
    </section>
    <!-- ================ Subscribe section end ================= --> 

    

  </main>


  
	<!--================ End footer Area  =================-->
    </div>

</template>

<script>
import Category from '../components/Category.vue';
import axios from 'axios';
import adVue from '../components/ad.vue';
export default {
    created() {
        this.$store.dispatch('loadCats');
        this.$store.dispatch('getads');
        axios.get('/getmostvisited/'+'all').then(res => {
            this.mostvisited = res.data.mostvisited;
            });
        axios.get('/getbestrated/'+'all').then(res => {
            this.bestrated = res.data.bestrated;
            });
    },
    data() {
        return {
          mostvisited: [],
          bestrated: [],
        }
    },
    computed: {
        categories() {
            return this.$store.getters.cats;
            },
        adData() {
          console.log(this.$store.getters.ads);
          return this.$store.getters.ads;
        }
    },
    components: {
        appCategory: Category ,
        appAd: adVue
    }, 
    methods: {
        gotoitems(cat) {
            this.$router.push({path: '/items/'+cat});
        },
        gotoItem(id) {
          this.$router.push({path: '/details/'+id});
        }
    }    
}
</script>

<style scoped>
  .card-product__img {
    width: 100%;
    height: 300px;
    overflow: hidden;
  }
  .item {
    /* margin: 1%; */
  }
  .hero-banner {
    z-index: .9;
  }
</style>