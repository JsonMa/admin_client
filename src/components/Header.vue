<template>
  <div class="header">
    <div class="nav"/>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.header {
  width: 100%;
  height: 70px;
  background-color: #409eff;
  .nav {
    width: 1000px;
    height: 100%;
    margin: 0 auto;
  }
}
</style>
