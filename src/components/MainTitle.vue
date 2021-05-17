<template>
  <h1 class="main-title">{{ postTitle }}</h1>
</template>

<script>
export default {
  name: "MainTitle",
  props: ['postTitle']
}
</script>

<style scoped>
  .main-title {
    font-size: 20px;
    color: #545454;
    text-align: center;
    font-weight: 700;
    padding-top: 50px;
    padding-bottom: 40px;
  }
</style>