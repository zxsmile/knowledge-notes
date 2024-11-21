<template>
  <div>
    <h2>学校名称：{{schoolName}}</h2>
    <h2>学校地址：{{address}}</h2>
    <button @click="showName">点我打印组件中的this</button>
  </div>
</template>

<script>
 const school = Vue.extend({
    data(){
        return {
            schoolName:'尚硅谷',
            address:'北京昌平',
        }      
    },
    methods:{
        showName() {
          console.log(this)
        }
    }
})
</script>

<style>

</style>