<template>

  <v-app class="wrap">
    <v-main>
      <v-container class="px-7">
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
<style>


* {
  box-sizing: border-box;
}
body {
  font-family: "Google Sans", Arial, Helvetica, sans-serif;
  font-weight: 400;
  background: #fff;
}

.container {
  margin-right: auto;
  margin-left: auto;
  padding-right: 45px;
  padding-left: 45px;
  max-width: 750px!important;
  position: relative;
}

@font-face {
  font-family: 'Google Sans';
  src: url('/assets/fonts/GoogleSans-Medium.eot');
  src: url('/assets/fonts/GoogleSans-Medium.ttf') format('truetype'),
  url('/assets/fonts/GoogleSans-Medium.woff') format('woff');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Google Sans';
  src: url('/assets/fonts/GoogleSans-Bold.eot');
  src: url('/assets/fonts/GoogleSans-Bold.ttf') format('truetype'),
  url('/assets/fonts/GoogleSans-Bold.woff') format('woff');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Google Sans';
  src: url('/assets/fonts/GoogleSans-Regular.eot');
  src: url('/assets/fonts/GoogleSans-Regular.ttf') format('truetype'),
  url('/assets/fonts/GoogleSans-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

</style>
