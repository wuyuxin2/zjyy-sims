<template>
  <div>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider collapsible v-model="collapsed" width="256px">
        <div class="logo">
          <span class="logo-text">
            ZJYY
          </span>
        </div>
        <SiderMenu></SiderMenu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <Header />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer></Footer>
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import Header from "./Header";
import Footer from "./Footer";
import SiderMenu from "./Sidermenu";
export default {
  data() {
    return {
      collapsed: false
    };
  },
  components: {
    Header,
    Footer,
    SiderMenu
  }
};
</script>
<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
div {
  color: black;
}
.logo {
  text-align: center;
}
.logo-text {
  font-size: 2em;
  line-height: 32px;
  color: lightgray;
}
</style>
