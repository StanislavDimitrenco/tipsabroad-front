<template>
  <div>
    <div v-if="step === 0">

      <MainTitle post-title="Send tips" />
      <Companies v-on:next="setNext"/>
    </div>
    <div v-if="step === 1">
      <div @click="setPrev" class="go-back">
        <img src="@/assets/img/back.svg" alt="back to the future">
      </div>
      <MainTitle post-title="Send tips - step 2"/>
      <Employee />
    </div>
  </div>

</template>

<script>
import Companies from "@/components/Companies";
import MainTitle from "@/components/MainTitle";
import Employee from "@/components/Employee";

export default {
  name: 'Home',
  data: () => ({
    step: 0,
    tip: {
      alignment: {},
      sum: 123
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
    MainTitle,
    Companies,
  },
}
</script>
<style>
.go-back {
  position: absolute;
  left: 45px;
  top: 47px;
}

.container .btn-green.v-size--x-large {
  background-color: #4cb32b;
  box-shadow: none!important;
  color: #fff;
}
</style>
