<template>
        <div class="container">
  <div class="nav">
    <div class="row btns">
      <button @click="show='all'" :class="show==='all'?'active':''" class="col-md-4">All items</button>
      <button @click="show='users'" :class="show==='deactivated'?'active':''" class="col-md-4">Deactivated</button>
      <button @click="show='admins'" :class="show==='activated'?'active':''" class="col-md-4">Activated</button>
    </div>
  </div>
   <div class="card shopping-cart">
            <div class="card-header bg-dark text-light row">
                <div class="col-md-9">
                    <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                    Items
                    <app-loading v-if="loading"/>
                </div>
                <!-- <a @click="back" class="btn btn-outline-info btn-sm pull-right">Continiu shopping</a> -->
                <div class="col-md-3 clearfix">
                    <input @input="search" class="form-control" type="text" placeholder="Search for item"/>
                </div>
            </div>
            <div class="card-body">
                    <!-- PRODUCT -->
                    <div :key="item.name" v-for="item in filteredItems" class="table row">
                        <div class="col-12 col-sm-12 col-md-2 text-center">
                            <img :src="item.image" height="50px" width="50px"/>
                        </div>
                        <div class="col-12 col-sm-12 col-md-2 text-center">
                            <p>{{item.name}}</p>
                            <p>
                                <strong>in {{item.category}}</strong>
                            </p>
                        </div>
                        <div class="col-12 text-sm-center col-sm-12 text-md-left col-md-1">
                            <p class="product-name"><strong>{{item.char1}}</strong></p>
                        </div>
                        <div class="col-12 text-sm-center col-sm-12 text-md-left col-md-1">
                            <p class="product-name"><strong>{{item.char2}}</strong></p>
                        </div>
                        <div class="col-12 text-sm-center col-sm-12 text-md-left col-md-1">
                            <p class="product-name"><strong>{{item.char3}}</strong></p>
                        </div>
                        <div class="col-12 text-sm-center col-sm-12 text-md-left col-md-1">
                            <p class="product-name"><strong>{{item.char4}}</strong></p>
                        </div>
                        <div class="col-12 text-sm-center col-sm-12 text-md-left col-md-1">
                            <p class="product-name"><strong>{{item.char5}}</strong></p>
                        </div>
                        <div class="col-12 col-sm-12 text-sm-center col-md-3 text-md-right row">
                            <div class="col-2 col-sm-2 col-md-12 text-right">
                                <button @click="()=>remove(item._id)" type="button" class="btn btn-outline-danger btn-xs">
                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                </button>
                                <button @click="()=>edit(item._id)" type="button" class="btn btn-outline-danger btn-xs">
                                    <i class="fa fa-edit" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <!-- END PRODUCT -->
                    <hr>
                    <!-- END PRODUCT -->
                <div class="pull-right">
                </div>
            </div>
            <div class="card-footer">
                <span @click="prev">&#8592;</span>
                <!-- <h4>{{limit*(skip+1)}} of {{count}}</h4> -->
                <span @click="next">&#8594;</span>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import loading from '../../components/loading.vue'
export default {
    mounted() {
        this.fetchItems();
    },
    data() {
        return {
            items: [],
            filteredItems: [],
            show: 'all',
            limit: 5,
            skip: 0,
            count: 0,
            loading: false
        }
    },
    methods: {
        remove(id) {
            axios.get('/deleteItem/'+id).then(res => {
                this.filteredItems = res.data.items;
            });
        },
        search(event) {
           this.filteredItems = this.items.filter(item => 
               item.name.includes(event.target.value) ||
               item.char1.includes(event.target.value) ||
               item.char2?.includes(event.target.value) ||
               item.char3?.includes(event.target.value) ||
               item.char4?.includes(event.target.value) ||
               item.char5?.includes(event.target.value) ||
               item.category.includes(event.target.value)
               );
        },
        fetchItems() {
            this.loading = true;
            axios.get('/getItems/'+this.skip+'/'+this.limit).then(res => {
                this.loading = false;
            this.items = res.data.items;
            this.filteredItems = res.data.items;
            this.count = res.data.count;
        })
        },
        next() {
            this.skip += 5;
            if(this.skip >= this.count) {
                this.skip = this.count;
                return;
            }
            this.fetchItems();
        },
        prev() {
            this.skip -= 5;
            if(this.skip < 0) {
                this.skip = 0;
                return;
            }
            this.fetchItems();
        },
        edit(id) {
            this.$router.push('/dashboard/edititem/'+id);
        }
    },
    watch: {
        },
        components: {
            appLoading: loading
        }
}
</script>

<style lang="scss" scoped>
    @import '../../scss/table.scss';
    .table {
        width: 100%;
    }
    span {
        color: #555;
        font-size: 60px;
        font-weight: bolder;
        margin: 20%;
        cursor: pointer;
    }
</style>