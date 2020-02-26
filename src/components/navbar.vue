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
    <v-navigation-drawer v-model="drawer" app class="deep-purple accent-10">
      <v-btn color="yellow" light href="/login">
        <span></span>
      </v-btn>
      <br />
      <v-btn color="yellow" light href="/about">
        <span>About</span>
      </v-btn>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data: () => ({
    //
    drawer: false
  })
};
</script>