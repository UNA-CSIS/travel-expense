<template>
  <v-app>
    <v-content>
      <navbar />
      <router-view></router-view>
    </v-content>
    <travelFooter />
  </v-app>
</template>

<script>
import travelFooter from '@/components/travelFooter'
import navbar from '@/components/navbar'

export default {
  name: 'App',

  components: {
    travelFooter,
    navbar
  },

  data: () => ({
    //
  }),
};
</script>
