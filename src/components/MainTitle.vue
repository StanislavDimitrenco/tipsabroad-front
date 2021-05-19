<template>
  <h1 class="main-title">{{ postTitle }}</h1>
</template>

<script>
export default {
  name: "MainTitle",
  props: ['postTitle']
}
</script>

<style >
  .main-title {
    font-size: 27px;
    color: #545454;
    text-align: center;
    font-weight: 500;
    padding-top: 22px;
    padding-bottom: 20px;
  }
</style>