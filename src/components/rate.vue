<template>
    <div class="rate">
        <input @click="rateItem"  type="radio" id="star5" name="rate" value="star5" />
        <label for="star5" title="text">5 stars</label>
        <input @click="rateItem"  type="radio" id="star4" name="rate" value="star4" />
        <label for="star4" title="text">4 stars</label>
        <input @click="rateItem"  type="radio" id="star3" name="rate" value="star3" />
        <label for="star3" title="text">3 stars</label>
        <input @click="rateItem"  type="radio" id="star2" name="rate" value="star2" />
        <label for="star2" title="text">2 stars</label>
        <input @click="rateItem"  type="radio" id="star1" name="rate" value="star1" />
        <label for="star1" title="text">1 star</label>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['itemId', 'rateItem'],
    data() {
        return {
            rate: ''
        }
    },
}
</script>

<style scoped>
    *{
    margin: 0;
    padding: 0;
}
.rate {
    float: left;
    height: 86px;
    padding: 0 10px;
}
.rate:not(:checked) > input {
    position:absolute;
    top:-9999px;
}
.rate:not(:checked) > label {
    float:right;
    width:1em;
    overflow:hidden;
    white-space:nowrap;
    cursor:pointer;
    font-size:30px;
    color:#ccc;
}
.rate:not(:checked) > label:before {
    content: '★ ';
}
.rate > input:checked ~ label {
    color: #ffc700;    
}
.rate:not(:checked) > label:hover,
.rate:not(:checked) > label:hover ~ label {
    color: #deb217;  
}
.rate > input:checked + label:hover,
.rate > input:checked + label:hover ~ label,
.rate > input:checked ~ label:hover,
.rate > input:checked ~ label:hover ~ label,
.rate > label:hover ~ input:checked ~ label {
    color: #c59b08;
}

/* Modified from: https://github.com/mukulkant/Star-rating-using-pure-css */
</style>