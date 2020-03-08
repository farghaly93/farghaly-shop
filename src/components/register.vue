<template>
    <app-modal>
        <h3 class="login" slot="header">Register</h3>
       <app-userform slot="body"/>
    </app-modal>
</template>
<script>
    import modalVue from './modal.vue';
    import loading from './loading.vue';
    import Userform from './userform.vue';
    export default {
        components: {
            appModal: modalVue,
            appLoading: loading,
            appUserform: Userform
        },
       
    }
</script>







