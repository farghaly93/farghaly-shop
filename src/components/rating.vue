<template>
    <div class="stars">
        <span :key="i" v-for="i in [1,2,3,4,5]" class="fa fa-star" :class="{checked: i <= rating}"></span>
    </div>
</template>

<script>
export default {
    props: ['rating']
}
</script>

<style scoped>
    .checked {
        color: orange;
    }
    .stars {
        text-align: center;
        margin-bottom: 9px;
    }
    
    .stars .fa {
        font-size: 23px;
        width: 30px;
    }
</style>