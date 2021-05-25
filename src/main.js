import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import  { loadStripe } from "@stripe/stripe-js";
import VueTheMask from 'vue-the-mask'

Vue.use(VueTheMask)

const stripePromise = process.env.NODE_ENV === "production"
        ? loadStripe("pk_live_51Io3DxAZp7bpKPrU36pNKyzKHz43Q2yagNA26L1oB2FBf4gTUB5IWye9qGBJIUlB6oluYazA7eE0ZqRIPVU4seFP00WJvkR75Y")
        : loadStripe("pk_test_51Is6kaCYCvUjLcqpw0H4G4MwhrunK1haBTZEiFhmIp6sghSPDOf9OjUzBfC6T98Jqy66C1OpZWKCGi5an3amhp1l0090AYxwO2")


const instance = require('axios').default

const axios = instance.create({
  baseURL: `${
      process.env.NODE_ENV === "production"
          ? "https://184.168.125.147:3000"
          : "http://localhost:3000"
  }`,
});

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.prototype.$stripe = stripePromise

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
