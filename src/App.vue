<template>
  <div>
    <h1>{{ title }}</h1>
    <svg-icon iconClass="404"></svg-icon>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      title: "webpack构建vue项目",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/css/index.scss";
</style>
