<template>
<v-container v-if="!signUpForm">
     <v-layout justify-center align-center column>
<v-form> 
    <v-row no-gutters><v-label>{{message}}</v-label></v-row>
    <v-row no-gutters>

          <v-text-field :username="username" justify="center" align="center" name="username" v-model="username" label="Username" required></v-text-field>
        </v-row>
        <v-row no-gutters>
          <v-text-field :password="password" justify="center" align="center" name="password" type="password" v-model="password" label="Password" required></v-text-field>
        </v-row>
        <v-row>
            <v-btn v-on:click="login" justify="center" align="center" color="primary">Submit</v-btn>
            <v-spacer></v-spacer>
            <v-btn v-on:click="signUpForm = !signUpForm" justify="center" align="center" color="primary">Sign up</v-btn>
        </v-row>
  </v-form> 
         </v-layout>
  
</v-container> 
<v-container v-else>
    <v-layout justify-center align-center column>
<v-form> 
    <v-row no-gutters>
        <h1>Sign up for a New Account</h1>
    </v-row>
    <v-row no-gutters><v-label>{{message}}</v-label></v-row>
    <v-row no-gutters>
          <v-text-field :username = "username" justify="center" align="center" name="username" v-model="username" label="Username" required></v-text-field>
        </v-row>
        <v-row no-gutters>
          <v-text-field :password="password" justify="center" align="center" name="password" type="password" v-model="password" label="Password" required></v-text-field>
        </v-row>
        <v-row no-gutters>
          <v-text-field :email="email" justify="center" align="center" name="email" type="email" v-model="email" label="Email" required></v-text-field>
        </v-row>
        <v-row>
            <v-btn v-on:click="signUp" justify="center" align="center" color="primary">Submit</v-btn>
        </v-row>
  </v-form> 
         </v-layout>
</v-container>
</template>

<script>
import axios from 'axios';
export default {
  
  components: {
      
  },
  data: () => ({
      username: "",
      password: "",
      email: "",
      message: "",
      signUpForm: false
  }),
  mounted() {
    console.log(this.signUpForm);
  },
  methods: {
    login()  {
        axios({
              method: 'post',
              url: "http://localhost:8888/api/login",
              
              data: {
                username: this.username,
                password : this.password
              }
            }).then((response) => {
                if(response.data.message == "Success") {
                  window.location.href = "http://localhost:8080/";
                }
                else
                  this.message = response.data.message;
            });
    },
    signUp() {
      axios({
              method: 'post',
              url: "http://localhost:8888/api/createAcc",
              
              data: {
                username: this.username,
                password : this.password,
                email: this.email
              }
            }).then((response) => {
                if(response.data.message == "Success") {
                  window.location.href = "http://localhost:8080/";
                }
                else
                  this.message = response.data.message;
            });
    }
  } 
};


</script>