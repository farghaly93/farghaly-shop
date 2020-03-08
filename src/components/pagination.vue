<template>
    <ul class="pagination">
    <li @click="prev" class="page-item" :class="{disabled: pageData.prevDisabled}"><a class="page-link">Previous</a></li>
    <li class="page-item"><a class="page-link" href="#">{{(currentPage)+1}}</a></li>
    <li @click="next" class="page-item" :class="{disabled: pageData.nextDisabled}"><a class="page-link">Next</a></li>
    <li class="page-item"><a class="page-link">OF {{numOfPages}}</a></li>
    </ul>
</template>

<script>
export default {
    props: ['pageData', 'currentPage', 'next', 'prev', 'numOfPages'],
    data() {
        return {
        }
    }
}
</script>

<style scoped>
    .pagination {
        margin-top: 30px;
        margin-bottom: 20px;
    }
    a {
        cursor: pointer;
    }
</style>