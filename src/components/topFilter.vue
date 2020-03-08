<template>
<div class="containerr">
	<div class="row">
        <div class="filter">
            <div class="panel panel-default">
                <div class="panel-body">
                    <div class="filterRow form-inline" role="form">
                        <div class="form-group">
                            <label class="filter-col" style="margin-right:0;" for="pref-perpage">Rows per page:</label>
                            <select v-model="numOfItems" @change="() => setItemsPerPage(this.numOfItems)" id="pref-perpage" class="form-control">
                                <option value="6">6</option>
                                <option selected="selected" value="9">9</option>
                                <option value="12">12</option>
                                <option value="16">16</option>
                                <option value="20">20</option>
                            </select>                                
                        </div> <!-- form group [rows] -->
                        <div class="form-group">
                            <label class="filter-col" style="margin-right:0;" for="pref-search">Search:</label>
                            <input placeholder="Search here" v-model="searchQuery" @input="search" type="text" class="form-control input-sm" id="pref-search">
                        </div><!-- form group [search] -->
                        <div class="form-group">
                            <label class="filter-col" style="margin-right:0;" for="pref-orderby">Order by:</label>
                            <select v-model="order" @change="orderHandler" id="pref-orderby" class="form-control">
                                <option selected value="newest">Newest</option>
                                <option value="best">Best rating</option>
                            </select>                                
                        </div> <!-- form group [order by] --> 
                    </div>
                </div>
            </div>
        </div> 
	</div>
</div>
</template>

<script>
//import debounce from 'debounce';

export default {
    created() {
       //this.search = setTimeout(this.search, 1000);
    },
    props: ['setItemsPerPage'],
    data() {
        return {
            numOfItems: 9,
            order: 'newest',
            searchQuery: ''
        }
    },
    methods: {
        orderHandler() {
            this.$store.dispatch('orderBy', this.order);
        },
        search(event) {
            this.$store.dispatch('search', this.searchQuery);
        }
    }
}
</script>

<style scope>
    .containerr{
        margin-top:30px;
        display: flex;
        justify-content: center
    }
    .filter {
        width: 100%;
    }
    .filter-col{
    /* padding-left:10px;
    padding-right:10px; */
    }
    .filterRow {
        display: flex;
        flex-direction: row;
        justify-content: left;
        align-items: center;
    }
    .filterRow label{
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        color:rgb(134, 128, 133)
    }
    .filterRow input {
        border-bottom-color: #ccc;
        border-bottom-width: 2px;
    }
</style>