<template>
  <div class="">
    <div class="big-person-block">
      <div class="img-person-block">
        <v-img
            tile
            :src="require(`@/assets/img/big-avatar.png`)"
            alt=""
            aspect-ratio="1"
            class="rounded-lg"
        />
        <h4 class="person-name">Gray Mendoza</h4>
      </div>
    </div>
    <v-radio-group v-model="radioGroup">
      <v-row class="count-tips-block">
        <v-col
            cols="6"
            v-for="tip in jsonTips.tips"
            :key="tip.id"
        >
          <v-radio
              class="pl-4"
              :label="`${tip.size}`"
              :value="tip.size"
          ></v-radio>

        </v-col>
        <v-col cols="6">
          <v-radio
              class="pl-4"
              label="Your sum"
              value="sum"
          ></v-radio>

        </v-col>
      </v-row>
    </v-radio-group>
    <div class="email-block">
      <label for="email">Your e-mail (optional)</label>
      <input type="text" class="form-control" placeholder="example@mail.ru" id="email" name="email">
      <div class="form-check">
        <v-checkbox
            v-model="checkbox"
            label="I agree with term and conditions"
        ></v-checkbox>
      </div>
    </div>
    <v-btn
        class="mt-3 btn-green"
        block
        elevation="2"
        large
        x-large
        @click="next"
        defoult
    >
      Next
    </v-btn>
  </div>


</template>

<script>
export default {
  name: "Employee",
  data: () => ({
    jsonTips: [],
    radioGroup: 1,
  }),
  methods: {
    getTipSize: function () {
      this.jsonTips = require('../assets/tip_size.json')
    }
  },
  mounted() {
    this.getTipSize()
  }
}
</script>

<style scoped>

.img-person-block {
  width: 300px;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
}

.big-person-block {
  padding-bottom: 70px;
}

h4.person-name {
  font-size: 14px;
  padding-top: 10px;
  color: #545454;
  text-align: center;
}

.count-tips-block {
  padding-bottom: 90px;
}

.email-block {
  padding-bottom: 140px;
}

.email-block label {
  font-size: 14px;
  color: #545454;
  padding-bottom: 10px;
  display: block;
}

.form-control {
  margin-left: -1px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  position: relative;
  flex: 1 1 auto;
  min-width: 0;
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 10px;
  border-color: #d7dbe5;
  height: 60px;
}

.form-check {
  display: block;
  min-height: 1.5rem;
  margin-bottom: 0.125rem;
  padding-top: 10px;
}

</style>