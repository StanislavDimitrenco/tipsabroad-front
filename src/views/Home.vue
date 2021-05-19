<template>
  <div>
    <Steps v-if="stage === 1"/>
    <Success v-if="stage === 2"/>
    <Canceled v-if="stage === 3"/>
  </div>


</template>

<script>
import Steps from "@/components/Steps";
import Success from "@/components/Success";
import Canceled from "@/components/Canceled";

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
      }
      if (query.get("canceled")) {
        this.stage = 3
      }
  },
  components: {
    Steps,
    Success,
    Canceled
  },
}
</script>
<style>

</style>
