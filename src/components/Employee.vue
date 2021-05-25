<template>
  <div class="">
    <div class="big-person-block">
      <div class="img-person-block">
        <v-img
            tile
            :src=" baseImgUrl(person.image)"
            alt=""
            aspect-ratio="1"
            class="rounded-lg"
        />
        <h4 class="person-name-inset">{{ person.name }}</h4>
      </div>
    </div>
    <div class="row count-tips-block">
      <div class="col-6 count-tips pb-0"
           v-for="tip in jsonTips.tips"
           :key="tip.id"
      >
        <div class="form-check">
          <div class="radio">
            <input class="custom-radio" type="radio" :id="`${tip.size}`" name="color" :value="tip.size">
            <label :for="`${tip.size}`"
                   @click="radioHandler(false, person, tip.size)">${{ tip.size }}</label>
          </div>

        </div>
      </div>
      <div class="col-6 count-tips pb-0">
        <div class="form-check">
          <div class="radio">
            <input class="custom-radio" type="radio" id="you-sum" name="color" value="0">
            <label for="you-sum" @click="radioHandler(true, person, 0)">Your sum</label>

          </div>

        </div>
      </div>
      <div class="col-12">
        <div class="custom-sum" v-if="customSum">
          <the-mask mask="####"
                    v-model.trim="tipSize"
                    class="form-control mt-4rm-control"
                    placeholder="Custom tip's sum ($)"
                    id="custom-sum"
                    name="customPrice"
                    type="text"
          />
        </div>
      </div>
    </div>


    <v-btn
        class="mt-3 btn-green"
        block
        elevation="2"
        large
        x-large
        :disabled="disabled || loading"
        @click="handleClick"
        :loading="loading"
    >
      Next
    </v-btn>
  </div>


</template>

<script>
const axios = require('axios')

export default {
  name: "Employee",
  props: {
    person: {}
  },
  data: () => ({
    jsonTips: [],
    radioGroup: 1,
    checkbox: true,
    customSum: false,
    personName: "",
    personImage: "",
    personId: 0,
    tipSize: 0,
    session: {},
    loading: false,
    success: false,
  }),
  computed: {
    disabled: {
      get() {
        return this.tipSize < 1 || !this.checkbox
      }


    }
  },
  methods: {
    getTipSize() {
      return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV === "production") {
          axios.get('https://storage.tipsabroad.com/static/json/tip_size.json')
              .then(({data}) => {
                resolve(data)
              })
              .catch(function (error) {
                console.log(error)
                reject(error)
              })
        } else {
          resolve(require('../assets/tip_size.json'))
        }
      })
    },

    useEffect() {
      const query = new URLSearchParams(window.location.search)
      if (query.get("success")) {
        this.success = true
      }
    },
    baseImgUrl(img) {
      if (process.env.NODE_ENV === "production") {
        return "https://storage.tipsabroad.com/static/img/" + img
      } else {
        return require("@/assets/img/" + img)
      }
    },
    radioHandler(trueFalse, person, tipSize) {
      this.personId = person.id
      this.personName = person.name
      this.personImage = person.image
      this.tipSize = tipSize
      return this.customSum = trueFalse
    },
    async handleClick() {
      this.loading = true
      const stripe = await this.$stripe
      this.$axios.post('/create-checkout-session', {
        user: this.personId,
        name: this.personName,
        image: this.personImage,
        company_id: this.person.companyId,
        tip: this.tipSize * 100,

      }).then(({data}) => {
        const result = stripe.redirectToCheckout({
          sessionId: data.id,
        })
        if (result.error) {
          console.log('dont have server response')
        }
      }).catch(function (error) {
        alert('dont have server response')
        console.log(error);
      }).finally(() => this.loading = false);
    }


  },
  mounted() {
    this.getTipSize().then(data => {
      this.jsonTips = data
    })
  }
}
</script>

<style>

.img-person-block {
  width: 300px;
  max-width: 200px;
  margin-left: auto;
  margin-right: auto;
}

.person-name-inset {
  font-size: 18px;
  padding-top: 10px;
  color: #545454;
  text-align: center;
  font-weight: 400;
}

.big-person-block {
  padding-bottom: 50px;
}

h4.person-name {
  font-size: 14px;
  padding-top: 10px;
  color: #545454;
  text-align: center;
  font-weight: 400;
}

.count-tips-block {
  padding-bottom: 30px;
}

.email-block {
  padding-bottom: 3px;
}

.email-block label {
  font-size: 14px;
  color: #545454;
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
  font-size: 16px;
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
  height: 45px;
}

.form-check {
  display: block;
  min-height: 1.5rem;
  margin-bottom: 0.125rem;
  cursor: pointer;
}


.custom-radio {
  position: absolute;
  z-index: 1;
  opacity: 0;
  width: 40px;
  height: 40px;
}

.custom-radio + label {
  display: inline-flex;
  align-items: center;
  user-select: none;
  display: inline-flex;
  align-items: center;
  user-select: none;
  width: 100%;
  height: 40px;
  border: 1px solid #e3e8f0;
  border-radius: 10px;
  color: #545454;
  padding-left: 50px;
  font-size: 14px;
  position: relative;
  z-index: 3;
}

.custom-radio + label::before {
  content: "";
  display: inline-block;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #d7dbe5;
  background-image: url(../assets/img/gray-circle.svg);
  background-color: #fff;
  border-radius: 50%;
  margin-right: 50px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
  position: absolute;
  left: 12px;
  top: 12px;

}

.custom-radio:not(:disabled):not(:checked) + label:hover::before {
  border-color: #d7dbe5;
}

.custom-radio:not(:disabled):active + label::before {
  background-color: #d7dbe5;
  border-color: #4cb32b;
}

.custom-radio:focus + label::before {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.custom-radio:focus:not(:checked) + label::before {
  border-color: #4cb32b;
}

.custom-radio:checked + label::before {
  border-color: #4cb32b;
  background-color: #fff;
  background-image: url(../assets/img/green-circle.svg);
}

.custom-radio:disabled + label::before {
  background-color: #e9ecef;
}


.radio {
  position: relative;
}

.radio::before {
  content: "";
  display: block;
  position: absolute;
  background: #f0f2f7;
  height: 100%;
  top: 0px;
  left: 0px;
  border-radius: 10px 0px 0px 10px;
  border-right: 1px solid #e3e8f0;
  width: 40px;
  z-index: 0;
}

</style>