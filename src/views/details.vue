<template>

    <div class="containerr">
        <h2 class="header">Product details</h2>
        <div class="card row">
            <div @mouseover="zoom=true" @mouseleave="zoom=false" class="col-xs-12 col-md-6 image">
                <img :src="detailsObj.image"/>
            </div>
            <div class="col-xs-12 col-md-6 specs">
                <h2 class="name">{{detailsObj.name}}</h2>
                <div><h4>{{charss.char1}}: </h4><p>{{detailsObj.char1}}</p></div>
                <div><h4>{{charss.char2}}: </h4><p>{{detailsObj.char2}}</p></div>
                <div><h4>{{charss.char3}}: </h4><p> {{detailsObj.char3}}</p></div>
                <div><h4>{{charss.char4}}: </h4><p> {{detailsObj.char5}}</p></div>
                <div><h4>{{charss.char5}}: </h4><p> {{detailsObj.char5}}</p></div>
                <hr>
                <div class="footer row">
                    <div style="display:flex;flex-direction:column;justify-items:center" class="col-md-6 col-xs-12">
                        <app-rating :rating="detailsObj.rating" />
                        <h2 class="price">{{detailsObj.price}} EP</h2>
                        <h3>{{detailsObj.category}}</h3>
                    </div>
                    <div class="col-md-6 col-xs-12">
                        <button @click="addtowishlist" class="btnn">{{wishlist.includes(id)?'Added':'Add to wish list'}}</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="line"></div>
        
        <div class="bottom row">
            <div class="col-md-6 col-xs-12 details">
                <h4>Details</h4>
                <p>{{detailsObj.description}}</p>
                <hr>
            </div>
            <div class="col-md-6 col-xs-12 rates">
                <h3>rate this product</h3>
                <div class="putRate">
                    <app-rate :rateItem = "rateItem"/>
                    <div class="review">
                        <div class="md-form mb-4 pink-textarea active-pink-textarea">
                            <input type="text" v-model="username" placeholder="username" required/>
                            <textarea v-model="comment" id="form18" class="md-textarea form-control" rows="3" required></textarea>
                            <label for="form18">Leave a review if you want to</label>
                        </div>
                        <button :disabled="!username || !comment || !rated" @click="publishreview" class="btn btn-primary">Publish</button>
                    </div>
                </div>
                <hr>
                <div class=" detailed">
                    <h4 style="margin-bottom:32px;">details</h4>
                    <div><app-rating :rating="5" /> <strong>({{detailsObj.star5}})</strong></div>
                    <div><app-rating :rating="4" /> <strong>({{detailsObj.star4}})</strong></div>
                    <div><app-rating :rating="3" /> <strong>({{detailsObj.star3}})</strong></div>
                    <div><app-rating :rating="2" /> <strong>({{detailsObj.star2}})</strong></div>
                    <div><app-rating :rating="1" /> <strong>({{detailsObj.star1}})</strong></div>
                </div>
            </div>
        </div>
        <div class="line"></div>
        <div style="margin:40px;" class="related">
            <app-slider :category="detailsObj.category" />
        </div>
        <div class="line"></div>
        <div style="margin:40px;" class="comments">
            <h3>Comments</h3>
            <app-comment v-for="comment in comments" :key="comment.date" :comment="comment"/>
            <div @click="seemore" class="page">
                <h5>See more</h5>
            </div>
        </div>
    </div>

</template>

<script>
    import axios from 'axios';
    import ratingVue from '../components/rating.vue';
    import rateVue from '../components/rate.vue';
    import sliderVue from '../components/slider.vue';
import commentVue from '../components/comment.vue';
    export default {
        created() {
            const id = this.$route.params.id;
            this.id = id;
            axios.get('/addvisit/'+id).then(res => {
                axios.get('/getitem/'+id).then(res => {
                    this.detailsObj = res.data.item;
                    this.$store.dispatch('loadFilters', res.data.item.category);
                    this.$store.dispatch('getwishlist');
                 });
                this.getcomments();
            });
        },
        data() {
            return {
                detailsObj: {},
                zoom: false,
                id: '',
                comments: [],
                rated: false,
                comment: '',
                rate: 0,
                username: '',
                limit: 3,
            }
        },
        components: {
            appRating: ratingVue,
            appRate: rateVue,
            appSlider: sliderVue,
            appComment: commentVue
        },
        computed: {
            charss() {
                return this.$store.getters.chars;
            },
            wishlist() {
                return this.$store.getters.wishlist;
            },
            // mostvisited() {
            //     return this.$store.getters.mostvisited;
            // }
        },
        methods: {
            getcomments() {
                axios.get('/getcomments/'+this.id+'/'+this.limit).then(res => {
                    this.comments = res.data.comments;
                 });
            },
            addtowishlist() {
                this.$store.dispatch('addtowishlist', {itemId: this.id, name: this.itemDetails.name, price: this.detailsObj.price});
                this.$store.dispatch('getwishlist');
            },
            
            rateItem(event) {
                this.rated = true;
                this.rate = +event.target.value.split('star')[1];
                axios.post('/rateitem', {itemId: this.id, star: event.target.value}).then(res=>{
                    this.$store.dispatch('writemessage', res.data.message);
                    axios.get('/getitem/'+this.id).then(res => {
                        this.detailsObj = res.data.item;
                        });
                    });
                 },
            publishreview() {
                axios.post('/addcomment', {itemId: this.id, username: this.username, comment: this.comment, rate: this.rate, date: new Date()}).then(res => {
                    this.$store.dispatch('writemessage', res.data.message);
                    this.getcomments();
                 });
            },
            seemore() {
                this.limit += 3;
                this.getcomments(); 
            }
        },
        watch: {
            items: (value) => {
                   // this.itemsToShow = value;
                }
            }
    }
</script>

<style scoped lang="css" >

    .containerr {
        margin: 15px;
        display: flex;
        flex-direction: column;
        justify-items: center;
        align-items: stretch;
        padding: 10px;
    }
    .header {
        text-align: center;
        color:rgb(27, 26, 27);
        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
        margin-bottom: 30px;
    }
    .card {
        display: flex;
        flex-direction: row;
        align-items: space-between;
        padding: 15px;
        background-image: linear-gradient(rgb(255, 255, 255), rgb(247, 242, 246), rgb(255, 255, 255));
    }
    .image {
        width: 100%;
        height: 460px;
        padding: 5px;
        border-radius: 30px;
        overflow: hidden;
    }
    .image img {
        left: 0;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        box-shadow: #ccc 1px 2px 1px 2px;
        transform-origin: 50% 50%;
        transition: transform 1s, filter .5s ease-out;
    }
    .image img:hover {
        transform: scale(4);
        
    }
    .specs {
        flex: 1;
        padding: 16px;
        height: 100%;
        width: 100%;
        border-right-color: #ccc;
        border-right-width: 2px;
        border-top-color: #ccc;
        border-top-width: 2px; 
        border-bottom-color: #ccc;
        border-bottom-width: 2px; 
        border-radius: 20px;
    }
    .specs .name{
        margin-bottom: 20px;
        color:rgb(80, 78, 80);
        text-decoration: underline;
        font-weight: bolder;
    }
    .specs .price{
        margin-top: 20px;
        color:rgb(187, 18, 40);
        font-weight: bolder;
    }
    .specs div {
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-items: space-between;
        align-items: center;
        /*background-image: linear-gradient(rgb(250, 246, 252), rgb(247, 242, 246), rgb(255, 255, 255));;*/
    }
    .specs h3 {
        color: rgb(72, 83, 83);
        font-family: 'Courier New', Courier, monospace;
        font-weight: bold;
    }
    .specs div h4 {
        flex: 1;
        color: rgb(76, 71, 77);
        font-family:monospace;
        font-weight: bolder;
        font-size: 22px;
    }
    .specs div p {
        flex: 2;
        color: rgb(44, 41, 44);
        font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        font-size: 18px;
    }
    .details {
        margin-top: 20px;
    }
    .details h4 {
        color:rgb(27, 26, 27);
        text-decoration: underline;
        margin-bottom: 20px;
        font-weight: bold;
    }
    .details p {
        font-size: 22px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    .hr {
        width: 10px;
    }
    .rates {
        display: flex;
        flex-direction: column;
        text-align: center;
        align-items: center;
        margin-top: 25px;
    }
    .rates .detailed div {
        display: flex;
        flex-direction: row;
        text-align: center;

    }
    .rates .detailed div strong {
        margin-left: 30px;

    }
    .line {
        height: 2px;
        width: 100%;
        opacity: .5;
        background-color: rgb(89, 102, 129);
        text-align: center;
        box-shadow: #ccc 0px 1px 0px 1px;
    }
    .btnn {
        padding: 14px 40px;
        background-image: linear-gradient(rgb(59, 13, 41), rgb(121, 74, 119), rgb(90, 70, 95));
        border-radius: 10px;
        color: #fff;
        font-weight: bolder;
        border-bottom-width: 0;
        text-align: center;
    }
    .btnn:hover {
        padding: 18px 42px;
        background-color: rgb(199, 21, 119);
    }
    .page {
        margin-top: 25px;
        cursor: pointer;
    }
</style>