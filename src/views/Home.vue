<template>
  <v-form ref="form" v-model="valid" lazy-validation>
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
          <v-row no-gutters>
            <v-col cols="6"></v-col>
            <v-col cols="5">
              <v-btn color="primary" :disabled="!stepOneComplete" @click="e6 = 2">Next</v-btn>
            </v-col>
          </v-row>
        </v-stepper-content>
        <v-stepper-content :step="2">
          <stepTwo />
          <v-row no-gutters>
            <v-col cols="5"></v-col>
            <v-col cols="1">
              <v-btn color="primary" @click="e6 = 1">Back</v-btn>
            </v-col>
            <v-col cols="5">
              <v-btn color="primary" :disabled="stepTwoComplete" @click="e6 = 3">Next</v-btn>
            </v-col>
          </v-row>
        </v-stepper-content>
        <v-stepper-content :step="3">
          <stepThree />
          <v-row no-gutters>
            <v-col cols="5"></v-col>
            <v-col cols="1">
              <v-btn color="primary" @click="e6 = 2">Back</v-btn>
            </v-col>
            <v-col cols="5">
              <v-btn color="primary" :disabled!=stepThreeComplete @click="e6 = 4">Submit</v-btn>
            </v-col>
          </v-row>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-form>
</template>

<script>
import stepOne from "@/components/stepOne";
import stepTwo from "@/components/stepTwo";
import stepThree from "@/components/stepThree";

export default {
  components: {
    stepOne,
    stepTwo,
    stepThree
  },
  data: () => ({
    e6: 1,
    stepOneComplete: stepOne.complete,
    stepTwoComplete: stepTwo.complete,
    stepThreeComplete: stepThree.complete
  }),
  computed: {
    bDis(e6) {
      if (e6 == 1) return true;
      else return false;
    }
  }
};
</script>