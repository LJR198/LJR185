<template>
  <div>
     <el-button type="info" @click="logquit">退出</el-button>
  </div>
</template>

<script>
export default {
    name:"Home",
    data () {
        return {
            
        }
    },
    methods:{
        logquit(){
            window.sessionStorage.clear()
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped>

</style>