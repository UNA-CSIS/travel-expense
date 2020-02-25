<template>
  <nav>
    <v-row no-gutters>
      <v-textarea
        v-model="meetings"
        label="Meeting(s)"
        :rules="meetingRules"
        auto-grow
        outlined
        required
      ></v-textarea>
    </v-row>
    <v-row no-gutters>
      <v-textarea
        v-model="attendees"
        label="Attendee(s) names & organisations"
        :rules="attendeeRules"
        auto-grow
        outlined
        required
      ></v-textarea>
    </v-row>
    <v-row no-gutters>
      <v-menu
        ref="dateMenu"
        v-model="dateMenu"
        :close-on-content-click="false"
        return-value.sync="dates"
        transition="scale-transition"
        offset-y
        min-width="300px"
        required
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="dateRangeText"
            :rules="dateRules"
            label="Date of meeting(s)"
            prepend-icon="mdi-calendar"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="dates" no-title scrollable range>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="dateMenu = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.dateMenu.save(date)">Ok</v-btn>
        </v-date-picker>
      </v-menu>
    </v-row>
    <v-row no-gutters>
      <v-menu
        ref="timeMenu"
        v-model="timeMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="time"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field v-model="time" label="Time of meeting(s)" prepend-icon="mdi-clock-outline" readonly v-on="on"></v-text-field>
        </template>
        <v-time-picker
          v-if="timeMenu"
          v-model="time"
          full-width
          @click:minute="$refs.timeMenu.save(time)"
        ></v-time-picker>
      </v-menu>
    </v-row>
    <v-row no-gutters>
      <v-text-field
        v-model="role"
        label="Role in meeting(s)"
        :rules="roleRules"
        hint="Chair, member, participant, etc."
        required
      ></v-text-field>
    </v-row>
    <v-row no-gutters>
      <v-text-field v-model="purpose" label="Purpose in meeting(s)" :rules="purposeRules" required></v-text-field>
    </v-row>
  </nav>
</template>
<script>
export default {
  data: () => ({
    meetings: "",
    attendees: "",
    dates: ["", ""],
    role: "",
    purpose: "",
    dateMenu: false,
    timeMenu: false,
    time: null,
    meetingRules: [v => !!v || "A reason for attendance is required"],
    attendeeRules: [
      v => !!v || "The title of the seminar/conference is required"
    ],
    dateRules: [v => !!v || "At least one conference date is required"],
    timeRules: [v => !!v || "At least one meeting time is required"],
    roleRules: [v => !!v || "Your role is required"],
    purposeRules: [v => !!v || "Your purpose in the meeting is required"]
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
