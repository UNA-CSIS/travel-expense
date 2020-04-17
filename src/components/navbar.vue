<template>
  <nav>
    <v-card class="overflow-hidden">
      <v-app-bar flat color="deep-purple accent-10" dense dark hide-on-scroll>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>
          <span>UNA Business Trip Request</span>
        </v-toolbar-title>
      </v-app-bar>
    </v-card>
    <v-navigation-drawer v-model="drawer" app class="purple">
      <v-btn color="yellow" light href="/login">
        <span>Login</span>
      </v-btn>
      <br />
      <v-btn color="yellow" light href="/about">
        <span>About</span>
      </v-btn>
      <br />
      <v-btn color="yellow" light v-on:click="formPage">
        <span>Forms</span>
      </v-btn>
      <br />
      <v-btn color="yellow" light v-on:click="chairPage">
        <span>Chair View</span>
      </v-btn>
      <br />
      <v-btn color="yellow" light v-on:click="logout">
        <span>Log Out</span>
      </v-btn>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data: () => ({
    //
    drawer: false
  }),
  methods: {
    logout() {
        this.$session.destroy();
        this.$router.push('/login');
    },

    formPage() {
      if(this.$session.exists()) {
        this.$router.push('/');
      }
      else {
        alert("Invalid permission");
      }
    },

    chairPage() {
      if(this.$session.exists()) {
        if(this.$session.get('admin'))
            this.$router.push('/chairView');
        else 
            alert("Invalid permission");
      }
      else 
        alert("Invalid permission");
      
    }
  }
};
</script>