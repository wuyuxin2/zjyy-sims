<template functional>
  <a-sub-menu :key="props.menuInfo.path">
    <span slot="title">
      <a-icon :type="props.menuInfo.meta.icon" /><span>{{
        props.menuInfo.meta.title
      }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item :key="item.path">
        <a-icon :type="props.menuInfo.meta.icon" />
        <span>{{ props.menuInfo.meta.title }}</span>
      </a-menu-item>
      <sub-menu :key="item.path" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>
<script>
export default {
  props: ["menuInfo"]
};
</script>
<style scoped></style>
