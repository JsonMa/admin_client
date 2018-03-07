<template>
  <div class="huayan">
    <header-component/>
    <div class="main">
      <slot name="content"/>
    </div>
    <footer-component/>
  </div>
</template>

<script>
import HeaderComponent from './Header';
import footerComponent from './Footer';

export default {
  components: {
    HeaderComponent,
    footerComponent,
  },
  data() {
    return {};
  },
};
</script>

<style lang="less">
.huayan {
  height: 100%;
  .main {
    padding-top: 40px;
    width: 100%;
    margin: 0 auto;
    min-height: calc(~'100% - 250px');
    background-color: #f5f5f6;
  }
}
</style>
