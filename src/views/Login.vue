<template>
  <v-container v-if="!signUpForm">
    <v-layout justify-center align-center>
      <v-card width="40%">
        <v-card-title class="justify-center">Login</v-card-title>
        <!--
          This portion is for the login form
          -->
        <v-form>
          <v-row no-gutters>
            <v-spacer></v-spacer>
            <v-label>{{message}}</v-label>
            <v-spacer></v-spacer>
          </v-row>
          <v-row no-gutters>
            <v-spacer></v-spacer>
            <v-text-field
              :username="username"
              justify="center"
              align="center"
              name="username"
              v-model="username"
              label="Username"
              required
            ></v-text-field>
            <v-spacer></v-spacer>
          </v-row>
          <v-row no-gutters>
            <v-spacer></v-spacer>
            <v-text-field
              :password="password"
              justify="center"
              align="center"
              name="password"
              type="password"
              v-model="password"
              label="Password"
              required
            ></v-text-field>
            <v-spacer></v-spacer>
          </v-row>
          <v-row>
            <v-spacer></v-spacer>
            <v-btn v-on:click="login" justify="center" align="center" color="primary">Submit</v-btn>
            <v-spacer></v-spacer>
            <v-btn
              v-on:click="signUpForm = !signUpForm"
              justify="center"
              align="center"
              color="primary"
            >Sign up</v-btn>
            <v-spacer></v-spacer>
          </v-row>
        </v-form>
        <br>
      </v-card>
    </v-layout>
  </v-container>
  <!--
    This portion is for the user sign up form
    -->
  <v-container v-else>
    <v-layout justify-center align-center column>
      <v-card width="40%">
        <v-card-title class="justify-center">Sign Up For a New Account</v-card-title>
        <v-form>
          <v-row no-gutters>
            <v-spacer></v-spacer>
            <v-label>{{message}}</v-label>
            <v-spacer></v-spacer>
          </v-row>
          <v-row no-gutters>
            <v-spacer></v-spacer>
            <v-text-field
              :username="username"
              justify="center"
              align="center"
              name="username"
              v-model="username"
              label="Username"
              required
            ></v-text-field>
            <v-spacer></v-spacer>
          </v-row>
          <v-row no-gutters>
            <v-spacer></v-spacer>
            <v-text-field
              :password="password"
              justify="center"
              align="center"
              name="password"
              type="password"
              v-model="password"
              label="Password"
              required
            ></v-text-field>
            <v-spacer></v-spacer>
          </v-row>
          <v-row no-gutters>
            <v-spacer></v-spacer>
            <v-text-field
              :email="email"
              justify="center"
              align="center"
              name="email"
              type="email"
              v-model="email"
              label="Email"
              required
            ></v-text-field>
            <v-spacer></v-spacer>
          </v-row>
          <v-row>
            <v-spacer></v-spacer>
            <v-btn v-on:click="signUp" justify="center" align="center" color="primary">Submit</v-btn>
            <v-spacer></v-spacer>
          </v-row>
        </v-form>
        <br>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  data: () => ({
    //Ensures all text fields on this page start as blanks
    username: "",
    password: "",
    email: "",
    message: "",
    //Determines if the sign up form is shown
    signUpForm: false
  }),
  methods: {
    login() {
      axios({
        method: "post",
        url: "http://localhost:8888/api/login",

        data: {
          username: this.username,
          password: this.password
        }
      }).then(response => {
        if (response.data.message == "Success") {
          if (this.$session.exists()) this.$session.destroy();
          this.$session.start();
          this.$session.set("username", this.username);
          this.$router.push("/");
        } else if (response.data.message == "Success, admin") {
          this.$session.start();
          this.$session.set("username", this.username);
          this.$session.set("admin", true);
          this.$router.push("/chairView");
        } else this.message = response.data.message;
      });
    },
    signUp() {
      axios({
        method: "post",
        url: "http://localhost:8888/api/createAcc",

        data: {
          username: this.username,
          password: this.password,
          email: this.email
        }
      }).then(response => {
        if (response.data.message == "Success") {
          this.$session.start();
          this.$session.set("username", this.username);
          this.$router.push("/");
        } else this.message = response.data.message;
      });
    }
  }
};
</script>