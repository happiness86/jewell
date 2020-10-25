<template>
  <div class="nav-wrapper">
    <Menu style="height:100%">
      <Submenu :name="sub1.value" v-for="sub1 in meuns" :key="sub1.value">
        <template slot="title" v-if="sub1.icon">
          <Icon :type="sub1.icon" />
          {{sub1.title}}
        </template>
        <template slot="title" v-else>
          <MenuItem :name="sub1.value">{{sub1.title}}</MenuItem>
        </template>
        <template v-if="sub1.children">
          <MenuItem :name="sub2.value" :to="sub2.path" v-for="sub2 in sub1.children" :key="sub2.value">{{sub2.title}}</MenuItem>
        </template>
      </Submenu>
      <!-- <Submenu name="1">
          <MenuItem name="1-2">评论管理</MenuItem>
          <MenuItem name="1-3">举报管理</MenuItem>
      </Submenu>
      <Submenu name="2">
          <template slot="title">
              <Icon type="ios-people" />
              用户管理
          </template>
          <MenuItem name="2-1">新增用户</MenuItem>
          <MenuItem name="2-2">活跃用户</MenuItem>
      </Submenu>
      <Submenu name="3">
          <template slot="title">
              <Icon type="ios-stats" />
              统计分析
          </template>
          <MenuGroup title="使用">
              <MenuItem name="3-1">新增和启动</MenuItem>
              <MenuItem name="3-2">活跃分析</MenuItem>
              <MenuItem name="3-3">时段分析</MenuItem>
          </MenuGroup>
          <MenuGroup title="留存">
              <MenuItem name="3-4">用户留存</MenuItem>
              <MenuItem name="3-5">流失用户</MenuItem>
          </MenuGroup>
      </Submenu> -->
    </Menu>
  </div>
</template>

<script>
import { navConfig } from './config'
export default {
  name: 'AppNav',
  data () {
    return {
      meuns: navConfig
    }
  }
}
</script>

<style lang="less" scoped>
.nav-wrapper {
  height: 100%;
}
</style>
