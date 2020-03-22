<template>
          <div class="container">
              <div v-if="mode==='signup' || way==='update'" class="input" :class="{invalid: $v.fullname.$error}">
              <div class="insert">
                <label><i class="fa fa-check-square" aria-hidden="true"></i> <strong>Full name</strong></label>
                <input @blur="$v.fullname.$touch()" v-model="fullname" class="form-control" type="text" placeholder="Full name"/>
              </div>
              <div class="error">
                <p v-if="!$v.fullname.required">Put your full name</p>
              </div>
            </div>
            <div v-if="mode==='signup' || way==='update'" class="input" :class="{invalid: $v.phone.$error}">
              <div class="insert">
                <label><i class="fa fa-check-square" aria-hidden="true"></i> <strong>Phone</strong></label>
                <input @blur="$v.phone.$touch()" v-model="phone" class="form-control" type="text" placeholder="phone"/>
              </div>
              <div class="error">
                <p v-if="!$v.phone.required">Put phone number</p>
              </div>
            </div>
            <div v-if="mode==='signup' || way==='update'" class="input" :class="{invalid: $v.address.$error}">
              <div class="insert">
                <label><i class="fa fa-check-square" aria-hidden="true"></i> <strong>Address</strong></label>
                <input @blur="$v.address.$touch()" v-model="address" class="form-control" type="text" placeholder="Address"/>
              </div>
              <div class="error">
                <p v-if="!$v.address.required">Put Address</p>
              </div>
            </div>
            <div class="input" :class="{invalid: $v.email.$error}">
              <div class="insert">
                <label><i class="fa fa-envelope" aria-hidden="true"></i><strong> Email</strong></label>
                <input @blur="$v.email.$touch()"  v-model="email" class="form-control" type="email" placeholder="E-mail"/>
              </div>
              <div class="error">
                <p v-if="!$v.email.required">Email is empty</p>
                <p v-if="!$v.email.email">Email is not valid</p>
              </div>
            </div>
            <div class="input" :class="{invalid: $v.password.$error}">
              <div class="insert">
                <label><i class="fa fa-key" aria-hidden="true"></i> <strong>Password</strong></label>
                <input @blur="$v.password.$touch()" v-model="password" class="form-control" type="password" placeholder="Password"/>
              </div>
              <div class="error">
                <p v-if="!$v.password.required">password is empty</p>
                <p v-if="!$v.password.minLen">password should be at least {{$v.password.$params.minLen.min}} characters...</p>
              </div>
            </div>
            <div v-if="mode==='signup' || way==='update'" class="input" :class="{invalid: $v.confirm.$error}">
              <div class="insert">
                <label><i class="fa fa-check-square" aria-hidden="true"></i> <strong>confirm password</strong></label>
                <input @blur="$v.confirm.$touch()" v-model="confirm" class="form-control" type="password" placeholder="Password"/>
              </div>
              <div class="error">
                <p v-if="!$v.confirm.sameAs&&$v.confirm.required">password dismatch...</p>
              </div>
            </div>
            
             <app-loading v-if="authLoading"/>
             <div class="buttons">
                <button :disabled="$v.email.$invalid&&$v.password.$invalid&&($v.confirm.$invalid&&mode==='signup')" @click.prevent="() => {way==='update'?update():mode==='signin'?signin():signup()}" class="button btn btn-primary">Submit</button>
                <button v-if="way==='register'" @click="switchMode" class="button btn btn-danger">{{mode==='signin'?'Sign up':'Login'}}</button>
            </div>
          </div>
</template>

<script>
import axios from 'axios';
    import {email, required, minLength, sameAs, requiredUnless} from 'vuelidate/lib/validators';
    import loading from './loading'
export default {
   props: ['way'],
   created() {
     if(this.way === 'update') {
       axios.post('/getuserdata', {_id: this.userId}).then(res => {
         this.email = res.data.userdata.email;
         this.fullname = res.data.userdata.fullname;
         this.phone = res.data.userdata.phone;
         this.address = res.data.userdata.address;
       });
     }
   },
   components: {
     appLoading: loading
   },
   data() {
            return {
            email: '',
            password: '',
            confirm: '',
            fullname: '',
            phone: '',
            address: '',
            mode: 'signin',
            }
        },
        validations: {
            email: {
                required,
                email
            },
            password: {
                required,
                minLen:  minLength(6)
            },
            confirm: {
               // required: requiredUnless(() => this.mode === 'signup'), 
                sameAs: sameAs(vm => vm.password)
            },
            fullname: {
                required,
            },
            phone: {
                required,
            },
            address: {
                required,
            }
        },
        methods: {
            signin() {
                 this.$store.dispatch('signin', {email: this.email, password: this.password})
            },
            switchMode() {
                this.mode === 'signin'?this.mode = 'signup': this.mode = 'signin';
            },
            signup() {
                 this.$store.dispatch('signup', {email: this.email, password: this.password, fullname: this.fullname, phone: this.phone, address: this.address})
            },
            update() {
              axios.post('/updateuserdata', {userId: this.userId, data: {email: this.email, password: this.password, fullname: this.fullname, phone: this.phone, address: this.address} }).then(res => {
                if(res.data.updated) {
                  this.$store.dispatch('writemessage', 'user data updated successfully');
                } 
              });
            }
        },
        computed: {
            authLoading() {
                return this.$store.getters.authLoading;
            },
            userId() {
              return this.$store.getters.userId;
            }
        }
}
</script>

<style scoped>
    .container {
        box-shadow: #ccc 1px 1px 1px 1px;
        display: flex;
        flex-direction: column;
        justify-items: center;
        width: 80%;
        border: .7px solid #ccc;
        padding: 20px;
        border-radius: 8px;
        background-image: linear-gradient(rgb(229, 229, 245), rgb(231, 231, 248), rgb(241, 245, 248))
    }
    .input {
        margin: 12px;
        display: flex;
        flex-direction: column;
        justify-items:center;
        align-items: left;
    }
    .input .insert {
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-items: left;
        align-items: center
    }
    .input .insert label {
        flex: 1;
        color: rgb(75, 35, 72);
        font-weight: bold;
        box-decoration-break: clone;
    }
    .input .insert input {
        flex: 4;
        background-color: rgb(229, 229, 245);
        height: 50px;
        color: rgb(105, 104, 104);
        border-bottom-color: #888;
        border-bottom-width: 3px;
        font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }
    .input .error {
        text-align: center;
    }
     .input .error p {
        color:rgb(199, 92, 92);
        font-weight: bolder;
    }
    .container .buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    button {
        flex: 1;
        margin: 14px;
    }
    .input.invalid label{
        color: rgb(199, 92, 92);
    }
    .input.invalid input {
        background-color: rgb(236, 198, 198);
        font-size: 14px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-weight: bold;
    }
    @media screen and (max-width: 1000px){
        .container {
            width: 100%;
        }
        .input .insert label strong {
            color: transparent;
        }
        .input .insert label i {
            font-size: 20px;
        }
    }
</style>
