<template>
    <div class="items row">
        <div class="col-md-3">
            <h3 style="color:#3f6a94;font-weight:bold;" class="text-center">Filters</h3>
            <app-filters :charsObject="chars" :cat="$route.params.cat"></app-filters>
        </div>
        <div class=" mainn col-md-9"> 
            <h3 class="titlee text-center">ITEMS</h3>
            <app-topFilter :setItemsPerPage="itemPerPageHandler"></app-topFilter><br>
            <app-loading v-if="itemsLoading"/>
            <div class="row">
                <div :key="item.name" v-for="item in filteredItems" class="col-sm-6 col-md-4">
                    <app-item :wishlist="wishlist" :itemDetails="item" ></app-item>
                </div>
            </div>
            <app-pagination :numOfPages="Math.ceil(allItemsNum/itemsPerPage)" :currentPage="currentPage" :pageData="pageData" :next="nextPage" :prev="prevPage"></app-pagination>
        </div>
    </div>
</template>

<script>

//     for (var i = 0; i < 3; i++) {

// setTimeout(function() {

// console.log(i);

// },1000);

// }

// بترجعلي 3 ثلاث مرات

// for (var i = 0; i < 3; i++) {

// setTimeout(function() {

// console.log(i);

// },1000);

// }

// }

    import Item from '../components/Item.vue';
    import Filters from '../components/Filters.vue';
    import topFilter from '../components/topFilter.vue';
    import pagination from '../components/pagination.vue';
    import loading from '../components/loading.vue';
    export default {
        updated() {
            console.log(this.wishlist);
        },
        mounted() {
            this.$store.dispatch('loadFilters', this.$route.params.cat);
            this.$store.dispatch('getwishlist');
            this.$store.dispatch('filterItems', {category: this.$route.params.cat});
        },
        data() {
            return {
                pageData: {
                    nextDisabled: false,
                    prevDisabled: false
                }
            }
        },
        computed: {
            filteredItems() {
                return this.$store.getters.filteredItems;
            },
            chars() {
                return this.$store.getters.chars;
            },
            allItemsNum() {
                return this.$store.getters.allItemsNum;
            },
            itemsPerPage() {
                return this.$store.getters.itemsPerPage;
            },
            currentPage() {
                return this.$store.getters.currentPage;
            },
            itemsLoading() {
                return this.$store.getters.itemsLoading;
            },
            wishlist() {
                return this.$store.getters.wishlist;
            }
        },
        methods: {
            nextPage() {
                if(this.currentPage < Math.ceil(this.allItemsNum/this.itemsPerPage)-1) {
                    const currentPage = this.currentPage+1;
                    console.log(this.currentPage);
                    this.pageData.nextDisabled = false;
                    this.$store.dispatch('pageChange', {
                        pageData: {currentPage: currentPage, itemsPerPage: this.itemsPerPage},
                        category: this.$route.params.cat
                        });
                } 
            },
            prevPage() {
                if(this.currentPage > 0) {
                    const currentPage = this.currentPage - 1;
                    this.pageData.prevDisabled = false;
                    this.$store.dispatch('pageChange', {
                        pageData: {currentPage: currentPage, itemsPerPage: this.itemsPerPage},
                        category: this.$route.params.cat
                        });
                    if(this.currentPage === 1) {
                        this.pageData.prevDisabled = true;
                    }
                }
            },
            itemPerPageHandler(num) {
                this.$store.dispatch('pageChange', {
                        pageData: {currentPage: 0, itemsPerPage: num},
                        category: this.$route.params.cat
                        });
            }
        },
        components: {
            appItem: Item,
            appFilters: Filters,
            appTopFilter: topFilter,
            appPagination: pagination,
            appLoading: loading
        }
    }
</script>

<style scoped>
    .mainn {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
    }
    .items {
        margin-top: 30px;
        display: flex;
        flex-direction: row;
    }
    .titlee {
        margin: 20px;
        color: purple;
        font-weight: bold;
    }
</style>