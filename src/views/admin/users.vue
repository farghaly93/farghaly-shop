<template>
    <div class="container">
  <div class="nav">
    <div class="row btns">
      <button @click="show='all'" :class="show==='all'?'active':''" class="col-md-4">All users</button>
      <button @click="show='users'" :class="show==='users'?'active':''" class="col-md-4">Users</button>
      <button @click="show='admins'" :class="show==='admins'?'active':''" class="col-md-4">Admins</button>
    </div>
  </div>
   <div class="card shopping-cart">
            <div class="card-header bg-dark text-light row">
                <div class="col-md-9">
                    <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                    Users
                </div>
                <!-- <a @click="back" class="btn btn-outline-info btn-sm pull-right">Continiu shopping</a> -->
                <div class="col-md-3 clearfix">
                    <input @input="search" class="form-control" type="text" placeholder="Search for user"/>
                </div>
            </div>
            <div class="card-body">
                    <!-- PRODUCT -->
                    <div :key="user.fullname" v-for="user in filteredUsers" class="row">
                        <div class="col-12 col-sm-12 col-md-2 text-center">
                            <p>{{user.fullname}}</p>
                            <h4>
                                <strong>{{user.role===1?'admin':'user'}}</strong>
                            </h4>
                        </div>
                        <div class="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
                            <h4 class="product-name"><strong>{{user.email}}</strong></h4>
                        </div>
                        <div class="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
                            <div class="col-3 col-sm-3 col-md-4 text-md-right" style="padding-top: 5px">
                                <h6><strong>{{user.phone}} <span class="text-muted"></span></strong></h6>
                            </div>
                            <div class="col-4 col-sm-4 col-md-6">
                              <strong>{{user.address}}EP</strong>
                            </div>
                            <div class="col-2 col-sm-2 col-md-2 text-right">
                                <button @click="()=>remove(user._id)" type="button" class="btn btn-outline-danger btn-xs">
                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                </button>
                                <button @click="()=>toggleRole(user._id)" type="button" class="btn btn-outline-danger btn-xs">
                                    <i class="fa fa-user" aria-hidden="true"></i>
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
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    mounted() {
        axios.get('/getUsers').then(res => {
            this.users = res.data.users;
            this.filteredUsers = res.data.users;
        })
    },
    data() {
        return {
            users: [],
            filteredUsers: [],
            show: 'all'
        }
    },
    methods: {
        remove(id) {
            axios.get('/deleteUser/'+id).then(res => {
                this.filteredUsers = res.data.users;
            });
        },
        toggleRole(id) {
            axios.get('/toggleUserRole/'+id).then(res => {
                this.users = res.data.users;
                this.filterRoles(this.show);

            });
        },
        search(event) {
           this.filteredUsers = this.users.filter(user => 
               user.fullname.includes(event.target.value) ||
               user.phone.includes(event.target.value) ||
               user.address.includes(event.target.value) ||
               user.email.includes(event.target.value) 
               );
        },
        filterRoles(val) {
            const role = val==='admins'?1:val==='users'?0:2;
            if(role===2) {
                this.filteredUsers = this.users;
                return;
            }
            this.filteredUsers = this.users.filter(user => user.role === role);
        }
    },
    watch: {
        show(val) {
            this.filterRoles(val);
            }
        }
}
</script>

<style lang="scss" scoped>
    @import '../../scss/table.scss';
</style>