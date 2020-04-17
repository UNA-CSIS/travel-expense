<template>
  <nav>
    <v-card class="overflow-hidden">
      <v-app-bar flat color="deep-purple accent-10" dense dark hide-on-scroll>
        <v-app-bar-nav-icon @click="open"></v-app-bar-nav-icon>
        <v-toolbar-title>
          <span>UNA Business Trip Request</span>
        </v-toolbar-title>
      </v-app-bar>
    </v-card>
    <v-navigation-drawer v-model="drawer" app class="purple">
      <v-container>
      <v-btn width="100%" color="yellow" light href="/login">
        <span>Login</span>
      </v-btn>
      <br />
      </v-container>
      <v-container>
      <v-btn width="100%" color="yellow" light href="/about">
        <span>About</span>
      </v-btn>
      <br />
      </v-container>
      <v-container v-if="this.loggedIn">
      <v-btn width="100%" color="yellow" light v-on:click="formPage">
        <span>Forms</span>
      </v-btn>
      <br />
      </v-container>
  
      <v-container v-if="this.admin">
        
      <v-btn width="100%" color="yellow" light v-on:click="chairPage">
        <span>Chair View</span>
      </v-btn>
      <br />
      </v-container>
      <v-container>
      <v-btn width="100%" color="yellow" light v-on:click="logout">
        <span>Log Out</span>
      </v-btn>
      </v-container>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data: () => ({
    loggedIn: false,
    admin: false,
    drawer: false
  }),

  mounted: function() {
    this.getPermissions();
  },
  
  methods: {
    open() {
      this.getPermissions();
      this.drawer=!this.drawer;
    },
    getPermissions() {
      console.log("Called");
      if(this.$session.exists()) {
        this.loggedIn = true;
        if(this.$session.get('admin'))
          this.admin = true;
      }
    },
    logout() {
        this.admin = false;
        this.loggedIn = false;
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