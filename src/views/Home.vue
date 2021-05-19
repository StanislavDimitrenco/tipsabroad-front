<template>
  <div>
    <Steps v-if="stage === 1"/>

    <div v-if="stage === 2">
      Оплата успешная
    </div>
  </div>


</template>

<script>
import Steps from "@/components/Steps";

export default {
  name: 'Home',
  data: () => ({
    stage: 1
  }),
  methods: {


  },
  mounted: function () {
      const query = new URLSearchParams(window.location.search)
      if (query.get("success")) {
        this.stage = 2
        console.log(this.stage)
      }
  },
  components: {
    Steps,
  },
}
</script>
<style>

</style>
