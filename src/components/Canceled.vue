<template>
  <div>
    <div class="wrapper">
      <div class="container">
        <a href="/" class="go-back">
          <img src="@/assets/img/back.svg" alt="back to the future">
        </a>
        <h1 class="main-title">Send tips</h1>
        <div class="big-person-block">
          <div class="img-person-block">
            <v-img
                tile
                :src="require(`@/assets/img/${userImage}`)"
                alt=""
                aspect-ratio="1"
                class="rounded-lg"
            />
            <h4 class="person-name-inset">{{ userName }}</h4>
          </div>
        </div>
        <div class="canceled-block">
          <p>${{ tipSize }} tips has been not sent!</p>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  name: 'Success.vue',

  data: () => ({
    userName: "",
    userImage: "",
    tipSize: "",
    jsonData: {}

  }),
  methods: {
    getCompanies() {
      this.jsonData = require('../assets/staff.json')
    },
    getPerson(id) {
      let arr = this.jsonData.companies
      let name
      let image
      arr.forEach( (company) => {
        company.employees.forEach((employee) => {
          if(employee.id == id) {
            name = employee.name
            image = employee.image
          }
        })
      })
      this.userName = name
      this.userImage = image
    }
  },
  mounted: function () {
    const query = new URLSearchParams(window.location.search)
    this.getCompanies(this.jsonData.companies)
    this.getPerson(Number(query.get("id")))
    this.tipSize = query.get("tip") / 100
  }
};
</script>
<style>
.canceled-block {
  background: #ffdada;
  border-radius: 10px;
  text-align: center;
  padding-top: 90px;
  padding-bottom: 90px;
}

.canceled-block p {

}
</style>