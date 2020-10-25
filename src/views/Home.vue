<template>
  <div class="home">
    <!-- 系统header, 包括导航 -->
    <div class="header-wrapper">
      <app-header></app-header>
    </div>

    <!-- 左侧panel -->

    <div class="left-panel panel">
      <app-nav></app-nav>
    </div>

    <!-- content -->
    <div class="map-wrapper">
      fsfs
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/views/appHeader/AppHeader'
import AppNav from '@/views/appNav/AppNav'

export default {
  name: 'Home',
  components: {
    AppHeader,
    AppNav
  },
  computed: {

  },
  watch: {

  },
  methods: {
    onClose () {
      this.visible = !this.visible
      console.log(this.$refs)
      this.showRight = !this.showRight
      if (this.$refs.rightPanel) {
        this.$refs.rightPanel.visible = !this.$refs.rightPanel.visible
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .home {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;

    .header-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 68px;
      z-index: 100;
    }

    .content-wrapper {
      position: absolute;
      top: 68px;
      width: 100%;
      height: calc(100vh - 68px);

    }

    .panel {
      position: absolute;
    }

    .left-panel {
      width: 346px;
      height: calc(100vh - 68px);
      left: 0;
      top: 68px;
    }

    .right-panel {
      right: 0px;
      top: 68px;
      z-index: 65;
      // width: 28%;
      // height:100%
    }

    .mid-panel {
      top: 88px;
      left: 356px;
      z-index: 65;
    }

    .map-plugins-wrapper {
      position: absolute;
      top: 78px;
      right: 10px;
      z-index: 100;
    }

    .map-wrapper {
      position: absolute;
      top: 68px;
      left: 346px;
      width: calc(100vw - 346px);
      height: calc(100vh - 68px);
      z-index: 60;
      // transition: left 0.15s ease-out;
    }
  }
</style>
