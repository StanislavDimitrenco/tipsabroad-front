<template>
  <div>
    <div class="wrapper">
      <div class="container">
        <a :href="`/?company_id=${companyId}`" class="go-back">
          <img src="@/assets/img/back.svg" alt="back to the future">
        </a>
        <h1 class="main-title">Send tips</h1>
        <div class="big-person-block">
          <div class="img-person-block">
            <v-img
                v-if="userImage"
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
  name: 'Canceled',

  data: () => ({
    userName: "",
    userImage: null,
    tipSize: "",
    companyId: "",
    jsonData: {}

  }),
  methods: {
    getCompanies() {
      this.jsonData = require('../assets/staff.json')
    },
    getPerson(id, companyId) {
      let arr = this.jsonData.companies
      console.log(companyId)

      arr.forEach((company) => {
        if (company.id === companyId) {
          arr = company.department
        }
      })

      let name
      let image
      arr.forEach((department) => {
        console.log(department)

        department.employees.forEach((employees) => {
          console.log(employees.id)
          if (employees.id === id) {
            name = employees.name
            image = employees.image
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
    this.companyId = query.get("company_id")
    this.getPerson(Number(query.get("user")), Number(this.companyId))
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