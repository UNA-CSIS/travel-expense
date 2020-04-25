<template>
  <!--
    This is for the about page. Everything before the "GENERAL INFORMATION" page will always be shown
  -->
  <div>
    <v-layout justify-center align-center>
      <v-card width="50%">
        <v-card-title class="justify-center">Success</v-card-title>
        <v-container>
          <v-row class="justify-center">Your form has been successfuly submitted!</v-row>
          <br />
          <v-row class="justify-center">
            <v-btn color="primary" href="/">Another Form</v-btn>
          </v-row>
          <br />
        </v-container>
      </v-card>
    </v-layout>
  </div>
</template>

<script>
export default {
  data: () => ({
    //Determines if the "GENERAL INFORMATION" v-card and all v-containers past this shows
    generalText: false,
    //Determines if the "TRAVEL STATUS" v-carcontainer shows
    travelStatus: false,
    //Determines if the "CLAIM FOR TRAVEL EXPENSES" v-container shows
    travelClaim: false,
    //Determines if the "DOCUMENTATION OF COSTS/APPROVAL of TRAVEL REIMBURSEMENT" v-container shows
    documentation: false,
    //Determines if the "OTHER INFORMATION" v-container shows
    other: false
  })
};
</script>