<template>
  <div>
    <div v-if="loading" class="d-flex justify-center">
      <v-progress-circular
          color="primary"
          indeterminate
      />
    </div>
    <div v-else-if="companyId">
      <MainTitle :post-title="companyName"/>
      <v-row justify="center" class="ml-0 mr-0 mt-2" v-if="company">

        <v-item-group>
          <v-expansion-panels accordion v-model="accordion" class="accordion">
            <v-expansion-panel
                class="accordion-container"
                v-for="(dep,key) in company"
                :key="key"
            >
              <v-expansion-panel-header class="accordion-title">{{ dep.name }}</v-expansion-panel-header>
              <v-expansion-panel-content class="px-0">
                <v-container class="px-0 py-0">
                  <v-row no-gutters>
                    <v-col
                        v-for="employee in dep.employees"
                        :key="employee.id"
                        cols="4"
                    >
                      <v-item v-slot="{ active, toggle }">
                        <v-card
                            class="pa-2"
                            flat
                            @click="toggle"
                        >
                          <div class="person-block">
                            <div
                                v-if="active"
                                class="check-icon"
                            >
                            </div>
                            <v-img
                                tile
                                :src="baseImgUrl(employee.image)"
                                alt=""
                                aspect-ratio="1"
                                class="rounded-lg"
                                @click="addData(employee.id, employee.name, employee.image)"
                            />
                            <h4 class="person-name text-center py-2">
                              {{ employee.name }}
                            </h4>
                          </div>
                        </v-card>
                      </v-item>
                    </v-col>
                  </v-row>
                </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-btn
              class="mt-3 btn-green"
              block
              elevation="2"
              x-large
              :disabled="disabled"
              @click="next"
          >
            Next
          </v-btn>
        </v-item-group>
      </v-row>
      <div v-if="!company">
        wrong company id
      </div>
    </div>
    <div v-else>dont have company id</div>
  </div>
</template>

<script>
const axios = require('axios')


import MainTitle from "@/components/MainTitle";

export default {

  name: "Companies",
  data: () => ({
    person: [
      'start'
    ],
    employee: {
      id: "",
      name: "",
      image: "",
    },
    loading: true,
    companyId: null,
    companyName: "",
    departmentId: null,
    jsonData: [],
    company: null,
    accordion: null
  }),
  computed: {
    disabled: {
      cache: false,
      get: function () {
        return this.employee.id === "";
      }
    }

  },
  methods: {
    next() {
      this.$emit('next', {
        alignment: {
          id: this.employee.id,
          name: this.employee.name,
          image: this.employee.image,
          companyId: this.companyId,
          companyName: this.companyName
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
    getCompanies() {
      let arr = this.jsonData.companies

      arr.forEach((company) => {
        if (company.id === this.companyId) {
          this.companyName = company.name
          this.company = company.department
        }
      })
    },
    addData(id, name, image) {
      this.employee.id = id
      this.employee.name = name
      this.employee.image = image
    },
    getJSON() {
      return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV !== "production") {
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
    getCompanyId() {
      const query = new URLSearchParams(window.location.search)
      const comId = query.get("company_id")
      const depId = query.get("department_id")
      if (comId !== "") {
        this.companyId = Number(comId)
        this.departmentId = Number(depId)
      }

    },
    getDepartment() {
      console.log(this.company.findIndex(({id}) => id === this.departmentId))
      const departmentIdx = this.company.findIndex(({id}) => id === this.departmentId)
      if (departmentIdx !== -1) {
        this.accordion = departmentIdx
      }
    }
  },
  components: {
    MainTitle
  },
  mounted: function () {
    this.getJSON().then(data => {
      this.jsonData = data
      this.loading = false
      this.getCompanyId()
      this.getCompanies()
      if (this.company) {
        this.getDepartment()
      }
    })
  },

}
</script>

<style lang="scss">
.accordion-container:not(:first-child)::after {
  border: none;
}

.accordion-container::before {
  box-shadow: none;
}

.v-item--active .accordion-title {
  color: #4cb32b;
  border: 1px solid #4cb32b;
  background-color: #edffe7;
}

.accordion-title {
  height: 32px;
  min-height: 45px !important;
  font-size: 14px;
  border-radius: 10px;
  color: #acb3c3;
  border: 1px solid #d7dbe5;
  background-color: #fff;

  background-position: right 20px center;
  margin-bottom: 10px;


}

.theme--light.v-expansion-panels .v-expansion-panel:not(:first-child)::after {
  display: none;
}

.person-block {
  position: relative;
}

.check-icon {
  content: "";
  display: block;
  position: absolute;
  top: 7px;
  right: 7px;
  background: url(../assets/img/tip-icon.svg);
  width: 16px;
  height: 16px;
  z-index: 10;
  background-size: cover;
}


.v-item-group {
  width: 100%;
}

.v-expansion-panel::before {
  box-shadow: inherit;
}

.accordion .v-expansion-panel::before {
  box-shadow: none !important;
}

.accordion button {
  border-radius: 10px;
}

</style>