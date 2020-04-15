<template>
<v-container v-if="!signUpForm">
     <v-layout justify-center align-center column>
<v-form method="post" action="http://localhost:8888/api/login"> 
    <v-row no-gutters>
          <v-text-field justify="center" align="center" name="username" v-model="username" label="Username" required></v-text-field>
        </v-row>
        <v-row no-gutters>
          <v-text-field justify="center" align="center" name="password" type="password" v-model="password" label="Password" required></v-text-field>
        </v-row>
        <v-row>
            <v-btn justify="center" align="center" type="submit" color="primary">Submit</v-btn>
            <v-spacer></v-spacer>
            <v-btn v-on:click="signUpForm = !signUpForm" justify="center" align="center" color="primary">Sign up</v-btn>
        </v-row>
  </v-form> 
         </v-layout>
  
</v-container> 
<v-container v-else>
    <v-layout justify-center align-center column>
<v-form method="post" action="http://localhost:8888/api/createAcc"> 
    <v-row no-gutters>
        <h1>Sign up for a New Account</h1>
    </v-row>
    <v-row no-gutters>
          <v-text-field justify="center" align="center" name="username" v-model="username" label="Username" required></v-text-field>
        </v-row>
        <v-row no-gutters>
          <v-text-field justify="center" align="center" name="password" type="password" v-model="password" label="Password" required></v-text-field>
        </v-row>
        <v-row>
            <v-btn justify="center" align="center" type="submit" color="primary">Submit</v-btn>
        </v-row>
  </v-form> 
         </v-layout>
</v-container>
</template>

<script>

export default {
  components: {
      
  },
  data: () => ({
      username: "",
      password: "",
      signUpForm: false
  }) 
};


</script>