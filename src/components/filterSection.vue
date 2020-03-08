<template>
    <div>
        <label :key="ci._id" v-for="ci in charItems" class="form-check">
            <input @change="updateFilter" v-model="filters" class="form-check-input" type="checkbox" :value="ci">
            <span class="form-check-label">
                {{ci._id}} ({{ci.count}})
            </span>
        </label> <!-- form-check.// -->
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        mounted() {
            //this.$store.dispatch('fetchFilterChars', {cat: this.cat, char: this.char});
            axios.post('/getChars', {cat: this.cat, char: this.char}).then(res => {
                this.charItems = res.data.chars;
            });
        },
        props: ['char', 'cat'],
        data() {
            return {
                charItems: [],
                filters: []
                }
            },
        computed: {
            category() {
                return this.$store.getters.category;
            }
        },
        methods: {
            updateFilter() {
               this.$store.dispatch('filterItems', {filters: this.filters, char: this.char, category: this.cat});
            }
        }
    }
</script>

<style scoped>
    .form-check-labell {
        left: 0;
    }
</style>