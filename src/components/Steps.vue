<template>
  <div>
    <div v-if="step === 0">
      <Companies v-on:next="setNext"/>
    </div>
    <div v-if="step === 1">
      <div @click="setPrev" class="go-back">
        <img src="@/assets/img/back.svg" alt="back to the future">
      </div>
      <MainTitle post-title="Send tips - step 2"/>
      <Employee :person="tip.alignment"/>
    </div>
  </div>

</template>

<script>
import Companies from "@/components/Companies";
import Employee from "@/components/Employee";

export default {
  name: 'Steps',
  data: () => ({
    step: 0,
    tip: {
      alignment: {}
    }
  }),
  methods: {
    setNext(data) {
      this.tip = {...this.tip, ...data}
      this.step = this.step + 1
    },
    setPrev() {
      this.step = this.step - 1

    }
  },
  components: {
    Employee,
    Companies,
  },
}
</script>
<style>
.go-back {
  position: absolute;
  left: 39px;
  top: 42px;
}

.container .btn-green.v-size--x-large {
  background-color: #4cb32b;
  box-shadow: none!important;
  color: #fff;
}
</style>
