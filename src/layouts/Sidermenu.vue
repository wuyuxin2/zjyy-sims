<template>
  <div>
    <div style="width: 256px">
      <a-menu
        :selectedKeys="selectedKeys"
        :openKeys.sync="openKeys"
        mode="inline"
        theme="dark"
      >
        <template v-for="item in menuData">
          <a-menu-item
            @click="() => $router.push({ path: item.path })"
            v-if="!item.children"
            :key="item.path"
          >
            <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
            <span>{{ item.meta.title }}</span>
          </a-menu-item>
          <sub-menu v-else :menu-info="item" :key="item.path" />
        </template>
      </a-menu>
    </div>
  </div>
</template>
<script>
import SubMenu from "./SubMenu";
export default {
  components: {
    "sub-menu": SubMenu
  },
  watch: {
    "$route.path": function(val) {
      this.selectedKeys = this.selectedKeysMap[val];
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val];
    }
  },
  data() {
    this.selectedKeysMap = {};
    this.openKeysMap = {};
    const menuData = this.getMenuData(this.$router.options.routes);
    return {
      collapsed: false,
      menuData,
      selectedKeys: this.selectedKeysMap[this.$route.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path]
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    getMenuData(routes, parentKeys = [], selectedKey) {
      const menuData = [];
      routes.forEach(item => {
        // name存在且不隐藏的时候
        if (item.name && !item.hideInMenu) {
          this.openKeysMap[item.path] = parentKeys;
          this.selectedKeysMap[item.path] = [selectedKey || item.path];
          const newItem = { ...item };
          delete newItem.children;
          // 如果有children
          if (item.children && !item.hideChildrenInMenu) {
            console.log(item.children);
            newItem.children = this.getMenuData(item.children, [
              ...parentKeys,
              item.path
            ]);
          }
          menuData.push(newItem);
        } else if (
          !item.hideInMenu &&
          !item.hideChildrenInMenu &&
          item.children
        ) {
          menuData.push(
            ...this.getMenuData(
              item.children,
              selectedKey ? parentKeys : [...parentKeys, item.path],
              selectedKey || item.path
            )
          );
        }
      });
      return menuData;
    }
  }
};
</script>
<style scoped>
div {
  color: white;
}
</style>
