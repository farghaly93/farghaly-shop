<template>
    <div class="container">
        <form @submit.prevent="addcat">
            <input v-model="name" type="text" placeholder="Category name"/>
            <div class="nochars">
                <label>Choose number of features of the items in this categories</label>
                <input v-model="num" type="number" max="5" min="1"/>
            </div>
            <input :key="i" v-for="(ch, i) in mode==='add'?arr:chars" v-model="chars[i]" type="text" :placeholder="'characterestic'+(i+1)"/>
            <button>Add</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    created() {
        const params = {...this.$route.params};
        if(Object.keys(params).length > 0) {
            this.mode = 'update';
            const cat = params.category;
            this.name = cat;
            this.id = params._id;
            delete params['category'];
            delete params['_id'];
            let chars = Object.keys(params).map(char => {
                if(params[char] !=='undefined') {
                    return params[char]
                }else {return null}
            });
            const chars2 = [];
            for(let ch of chars) {
                if(ch) {
                    chars2.push(ch);
                }
            }
            this.chars = chars2;
            this.num = chars2.length;
        }
    },
    data() {
        return {
            num: 1,
            name: '',
            id: '',
            chars: [],
            mode: 'add'
        }
    },
    computed: {
        arr() {
            const arr = [];
            for(let i=0; i<this.num; i++) {
                arr.push(i);
            }
            return arr;
        }
    },
    watch: {
        num(val) {
            const chars = [...this.chars];
            this.chars = [];
            for(let i=0; i<val; i++) {
                this.chars.push(chars[i]);
            }
        }
    },
    methods: {
        addcat() {
            const catData = {category: this.name};
            if(this.id !== '') {catData['_id'] = this.id}
            const chars = [...this.chars];
            chars.map((ch, i) => {
                catData['char'+ (i+1)] = ch;
            });
            axios.post('/addcat', {catData, mode: this.mode}).then(res => {
                this.$store.dispatch('writemessage', res.data.message);
            })
        }
    }
}
</script>

<style lang="scss">
    
</style>