<!--
  This file is the main form mounting the form steps
-->
<template>
  <v-form method="post" action="http://192.168.0.36:8888/api/user">
    <v-stepper v-model="e1" class="mt-12">
      <v-stepper-header>
        <v-stepper-step step="1" editable :complete="e1 > 1"
          >General Information</v-stepper-step
        >
        <v-divider></v-divider>
        <v-stepper-step step="2" editable :complete="e1 > 2"
          >Estimated Costs</v-stepper-step
        >
        <v-divider></v-divider>
        <v-stepper-step step="3" editable :complete="e1 > 3"
          >Activity Information</v-stepper-step
        >
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content :step="1">
          <v-row no-gutters>
            <v-text-field
              name="username"
              type="hidden"
              :value="this.username"
            ></v-text-field>
          </v-row>
          <stepOne />

          <v-row no-gutters>
            <v-col cols="6"></v-col>
            <v-col cols="5">
              <v-btn
                color="primary"
                :disabled="!stepOneComplete"
                @click="
                  e1 = 2;
                  stepTwoEditable = true;
                "
                >Next</v-btn
              >
            </v-col>
          </v-row>
        </v-stepper-content>
        <v-stepper-content :step="2">
          <stepTwo />
          <v-row no-gutters>
            <v-col cols="5"></v-col>
            <v-col cols="1">
              <v-btn color="primary" @click="e1 = 1">Back</v-btn>
            </v-col>
            <v-col cols="5">
              <v-btn
                color="primary"
                :disabled="!stepTwoComplete"
                @click="
                  e1 = 3;
                  stepThreeEditable = true;
                "
                >Next</v-btn
              >
            </v-col>
          </v-row>
        </v-stepper-content>
        <v-stepper-content :step="3">
          <stepThree />
          <v-row no-gutters>
            <v-col cols="5"></v-col>
            <v-col cols="1">
              <v-btn color="primary" @click="e1 = 2">Back</v-btn>
            </v-col>
            <v-col cols="5">
              <v-btn
                type="submit"
                color="primary"
                :disabled="!stepThreeComplete"
                @click="e1 = 4"
                href="Home"
                >Submit</v-btn
              >
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
    stepThree,
  },
  beforeCreate: function() {
    if (!this.$session.exists()) {
      this.$router.push("/login");
    }
    this.username = this.$session.get("username");
  },
  mounted: function() {
    this.username = this.$session.get("username");
  },
  data: () => ({
    e1: 1,
    stepOneComplete: true,
    stepTwoComplete: true,
    stepThreeComplete: true,
    stepTwoEditable: false,
    stepThreeEditable: false,
    username: "",
  }),
  computed: {
    bDis(e1) {
      if (e1 == 1) return true;
      else return false;
    },
  },
};
</script>
