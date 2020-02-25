<template>
  <v-form method="post" action="http://localhost:8888/api/user" ref="form" v-model="valid" lazy-validation>
    <v-stepper class="mt-12">
      <v-stepper-header>
        <v-stepper-step step="1" editable :complete="e6 >1">General Information</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" editable :complete="e6 >2">Estimated Costs</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3" editable :complete="e6 >3">Activity Information</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content :step="1">
          <stepOne />
          <v-btn color="primary" @click="e6 = 2">Next</v-btn>
        </v-stepper-content>
        <v-stepper-content :step="2">
          <stepTwo />
          <v-btn color="primary" @click="e6 = 3">Next</v-btn>
        </v-stepper-content>
        <v-stepper-content :step="3">
          <v-btn type="submit" color="primary" @click="e6 = 4">Submit</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-form>
</template>

<script>
import stepOne from "@/components/stepOne";
import stepTwo from "@/components/stepTwo";

export default {
  components: {
    stepOne,
    stepTwo
  },
  data: () => ({
    e6: 1
  }),
  computed: {
    bDis(e6) {
      if (e6 == 1) return true;
      else return false;
    }
  }
};


</script>