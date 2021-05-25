<template>
  <div>
    <div class="wrapper">
      <div class="container">
        <a :href="`/?company_id=${companyId}`" class="go-back">
          <img src="@/assets/img/back.svg" alt="back to the future">
        </a>
        <h1 class="main-title">{{companyName}}</h1>
        <div class="big-person-block">
          <div class="img-person-block">
            <v-img
                tile
                :src="baseImgUrl(userImage)"
                alt=""
                aspect-ratio="1"
                class="rounded-lg"
            />
            <h4 class="person-name-inset">{{ userName }}</h4>
          </div>
        </div>
        <div class="completed-block">
          <img src="@/assets/img/Checked.svg" alt="">
          <p>${{ tipSize }} tips has been sent!</p>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
const axios = require('axios')

export default {
  name: 'Success',

  data: () => ({
    userName: "",
    userImage: "",
    tipSize: "",
    companyId: "",
    companyName: "",
    jsonData: {}

  }),
  methods: {
    getCompanies() {
      return new Promise((resolve, reject )=> {
        if (process.env.NODE_ENV === "production") {
          axios.get('https://storage.tipsabroad.com/static/json/staff.json')
              .then(({data}) => {
                resolve(data)
              })
              .catch(function (error) {
                console.log(error)
                reject(error)
              })
        } else {
          resolve(require('../assets/staff.json'))
        }
      })
    },
    baseImgUrl(img) {
      if (process.env.NODE_ENV === "production") {
        return "https://storage.tipsabroad.com/static/img/" + img
      } else {
        return require("@/assets/img/" + img)
      }
    },
    getPerson(id, companyId) {
      let arr = this.jsonData.companies
      console.log(companyId)

      arr.forEach((company) => {
        if (company.id === companyId) {
          this.companyName = company.name
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
    this.getCompanies().then(data => {
      this.jsonData = data
      this.getCompanies(this.jsonData.companies)
      this.companyId = query.get("company_id")
      this.getPerson(Number(query.get("user")), Number(this.companyId))
      this.tipSize = query.get("tip") / 100})
  }
};
</script>
<style>
.completed-block {
  background-color: #edffe7;
  border: #4cb32b;
  border-radius: 10px;
  text-align: center;
  padding-top: 40px;
  padding-bottom: 40px;
  margin-bottom: 140px;
}

.completed-block p {
  font-size: 14px;
  font-weight: 700;
  color: #4cb32b;
  padding-top: 20px;
}

</style>