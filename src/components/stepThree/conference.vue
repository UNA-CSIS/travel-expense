<template>
  <nav>
    <v-row no-gutters>
      <v-textarea
        name="conferenceReason"
        v-model="reasons"
        label="Reason(s)"
        hint="Please provide specific reason for this trip (e.g. presenting a paper, member of 
          the organizing committee, keynote speaker, session chair, attendance for staff development 
          etc.) If you are presenting a paper, please provide details"
        :rules="reasonRules"
        auto-grow
        outlined
        required
      ></v-textarea>
    </v-row>
    <v-row no-gutters>
      <v-text-field
        name="conferenceTitle"
        v-model="title"
        label="Title"
        hint="Please provide title of Conference/Seminar"
        :rules="titleRules"
        required
      ></v-text-field>
    </v-row>
    <v-row no-gutters>
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        return-value.sync="dates"
        transition="scale-transition"
        offset-y
        min-width="300px"
        required
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            name="conferenceDates"
            v-model="dateRangeText"
            :rules="dateRules"
            label="Conference/Seminar Date(s)"
            prepend-icon="mdi-calendar"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="dates" no-title scrollable range>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(date)">Ok</v-btn>
        </v-date-picker>
      </v-menu>
    </v-row>
    <v-row no-gutters>
      <v-text-field name="conferenceWebsite" v-model="site" label="Conference/Seminar Web Site" hint="If applicable"></v-text-field>
    </v-row>
    <v-row no-gutters>
      <v-textarea
        name="conferenceOther"
        v-model="other"
        label="Other"
        hint="If none of the above applies (e.g. no paper submitted/or no planned presentation),
        please provide the expected benefits of attending from a personal and Reasearch Institute
        /School perspective"
        auto-grow
        outlined
      ></v-textarea>
    </v-row>
  </nav>
</template>
<script>
export default {
  data: () => ({
    reasons: "",
    title: "",
    dates: ["", ""],
    site: "",
    menu: false,
    other: "",
    reasonRules: [v => !!v || "A reason for attendance is required"],
    titleRules: [v => !!v || "The title of the seminar/conference is required"],
    dateRules: [v => !!v || "At least one conference date is required"]
  }),
  computed: {
    dateRangeText() {
      if (this.dates[0] != "" && this.dates[0] == this.dates[1])
        return this.dates[0];
      else if (this.dates[0] != "") return this.dates.join(" - ");
      else return "";
    }
  }
};
</script>
