<template>
  <!--
    This is a way to show that the user has successfully completed the form and submitted it
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
  })
};
</script>