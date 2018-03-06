<template>
  <div class="footer">
    <div class="copy-right"/>
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
<style scoped lang='less'>
.footer {
  width: 100%;
  height: 140px;
  background-color: #2d2d2d;
  .copy-right {
    width: 1000px;
    height: 100%;
    margin: 0 auto;
  }
}
</style>
