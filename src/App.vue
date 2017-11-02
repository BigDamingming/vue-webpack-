<template>
    <div class="home">
        <h1>vue-学习</h1>
        <addDemo1></addDemo1>
    </div>
</template>
<script>
    import addDemo1 from './components/demo1.vue'
    export default{
        data(){
            return {}
        },
        components : {
            addDemo1   //组件中组件引入方式
        },
        methods : {},
        computerd : {}
    }
</script>
<style lang="css">

</style>