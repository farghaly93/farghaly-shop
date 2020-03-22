<template>
    <div class="container">
        <div class="dropdown">
            <button @click="menu = !menu" class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Dropdown Example
            <span class="caret"></span></button>
            <ul v-if="menu" class="menu">
                <li @click="()=>getChars(cat.category)" :key="cat.category" v-for="cat in cats"><a href="#">{{cat.category}}</a></li>
            </ul>
        </div>
        <form @submit.prevent="addItem" class="text-center border border-light p-5">

            <p class="h4 mb-4">Add an advertisment</p>

            <!-- Email -->
            <input v-model="name" type="text" class="form-control mb-4" placeholder="Name">
            <div :key="char" v-for="(char, i) in charsTags">
                <label>{{char}}</label>
                <input v-model="chars[i]" type="text" class="form-control mb-4" :placeholder="char">
            </div>
            <!-- Password -->
            <label>Add description</label>
            <textarea class="form-control mb-4" v-model="description" ></textarea>
            <input style="display:none" ref="image" type="file" @change="imagePrev"/>
            <div class="d-flex justify-content-around">
                <img width="100px" height="100px" class="img" v-if="url" :src="url"/>
                <button @click="()=>$refs.image.click()" class="btn btn-primary">Upload image</button>
            </div>
            <div v-if="progress" class="progess-bar" :style="{'width': progress}">
                {{progress}}
            </div>
            <!-- Sign in button -->
            <button class="btn btn-info btn-block my-4" type="submit">Add item</button>

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
            axios.get('/getItemData/'+this.id).then(res => {
            console.log(res.data);
            const itemData = res.data.itemData;
            this.itemData = itemData;
            this.getChars(this.itemData.category);
            this.name = itemData.name;
            this.description = itemData.description;
            this.url = itemData.image;
            this.file = itemData.image;
            Object.keys(itemData).forEach(d => {
                if(d.includes('char')) {
                    this.chars.push(itemData[d]);
                }
            })
        })
            return;
        }
        axios.get('/fetchCats').then(res => {
            console.log(res.data);
            this.cats = res.data.cats;
        })
    },
    data() {
        return {
            cats: [],
            name: '',
            description: '',
            mode: 'add',
            id: '',
            menu: false,
            category: '',
            chars: [],
            charsTags: [],
            url: null,
            file: '',
            progress: 0,
            itemData: {}
        }
    },
    methods: {
        getChars(cat) {
            this.category = cat;
            axios.get('/fetchChars/'+cat).then(res => {
                const charsTags = res.data.chars;
                delete charsTags['category'];
                delete charsTags['_id'];
                this.charsTags = Object.keys(charsTags).map(key => charsTags[key]);
            })
        },
        imagePrev(event) {
            const file = event.target.files[0];
            const fileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            console.log(file.type, file.size);
           if(!fileTypes.includes(file.type)) {
               this.$store.dispatch('writemessage', 'the file not type not allowed');
               return;
           }
           if(file.size > 400000) {
               this.$store.dispatch('writemessage', 'the file size is larger than allowed');
               return;
           }
           this.url = URL.createObjectURL(file);
           this.file = file;
           this.progress = 0;
        },
        addItem() {
             if(this.mode === 'update') {
            //   axios.post('/updateAd/'+this.id, {text1: this.text1, text2: this.text2, description: this.description}).then(res => {
            //     this.$store.dispatch('writemessage', res.data.message);
            //     })  
            //     return;
            // }
            // axios.post('/addAd', {text1: this.text1, text2: this.text2, description: this.description}).then(res => {
            //     this.$store.dispatch('writemessage', res.data.message);
            // })
             }
            const formData = new FormData();
            formData.append('name', this.name);
            formData.append('category', this.category);
            formData.append('description', this.description);
            this.chars.forEach((char, i) => {
                formData.append('char'+(i+1),char);
            });
            formData.append('file', this.file);
            const process = this.mode === 'update'?'/updateItem/'+this.id:'/uploadItem'
            axios.post(process, formData, {
                onUploadProgress: ProgressEvent => {
                    let progress =
                    Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
                    +"%";
                    this.progress = progress;
                }
            }).then(res => {
                this.$store.dispatch('writemessage', res.data.message);
            })
        }
    }
}
</script>

<style lang="scss">
    .progess-bar {
        background-color: green;
    }
</style>