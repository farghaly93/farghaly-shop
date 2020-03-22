<template>
<div class="container">
    <form @submit.prevent="addAd" class="text-center border border-light p-5">

        <p class="h4 mb-4">Add an advertisment</p>

        <!-- Email -->
        <input v-model="text1" type="text" id="defaultLoginFormEmail" class="form-control mb-4" placeholder="Text1">

        <!-- Password -->
        <input v-model="text2" type="text" id="defaultLoginFormPassword" class="form-control mb-4" placeholder="Text2">
        <label>Add description</label>
        <textarea class="form-control mb-4" v-model="description"></textarea>
        <div class="d-flex justify-content-around">
        </div>

        <!-- Sign in button -->
        <button class="btn btn-info btn-block my-4" type="submit">Add ad</button>

    </form>
</div>
<!-- Default form login -->
</template>

<script>
import axios from 'axios'
export default {
    created() {
        const params = {...this.$route.params};
        if(Object.keys(params).length > 0) {
            this.mode = 'update';
            this.id = params.id;
            axios.get('/getAdData/'+params.id).then(res => {
                console.log(res.data)
                this.text1 = res.data.adData.text1;
                this.text2 = res.data.adData.text2;
                this.description = res.data.adData.description;
            })
        }
    },
    data() {
        return {
            text1: '',
            text2: '',
            description: '',
            id: ''
        }
    },
    methods: {
        addAd() {
            if(this.mode === 'update') {
              axios.post('/updateAd/'+this.id, {text1: this.text1, text2: this.text2, description: this.description}).then(res => {
                this.$store.dispatch('writemessage', res.data.message);
                })  
                return;
            }
            axios.post('/addAd', {text1: this.text1, text2: this.text2, description: this.description}).then(res => {
                this.$store.dispatch('writemessage', res.data.message);
            })
        }
    }
}
</script>

<style lang="scss">
    
</style>