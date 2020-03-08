<template>
    <div class="card row">
        <div class="user col-md-2">
            <div class="image">
                <img src="https://image.shutterstock.com/image-vector/man-shirt-tie-businessman-avatar-260nw-548848999.jpg" width="100%" height="100%"/>
            </div>
            <h5>{{comment.username}}</h5>
        </div>
        <div class="col-md-10">
            <div class=commentData>
                <div class="date"><p>{{(comment.date)}}</p></div>
                <div class="rate" >
                    <app-rating :rating="comment.rate" />
                </div>
                <div class="comment"><p>{{comment.comment}}</p></div>
            </div>
        </div>
    </div>
</template>

<script>
import ratingVue from './rating.vue';
export default {
    created() {
        console.log(this.comment);
    },
    props: ['comment'],
    components: {
        appRating: ratingVue
    }
}
</script>

<style scoped>
    .card {
        border-top-left-radius: 70px;
        border-bottom-left-radius: 70px;
        margin: 20px;
    }
    .user {
        border-right: 2px solid #ccc;
        padding: 20px;
    }
    .user h5 {
        float: left;
    }
    .commentData {
        float: left;
        padding: 9px 10px;
    }
    .comment {
        color: #555;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .image {
        width: 60px;
        height: 60px;
        border-radius: 40px;
        overflow: hidden;
        border: 0;
    }
</style>