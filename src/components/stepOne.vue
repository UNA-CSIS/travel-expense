<template>
  <nav>
    <v-row no-gutters justify="center">
      <v-col cols="8" style="min-width: 100px" class="flex-grow-1 flex-shrink 0">
        <v-row no-gutters>
          <v-text-field name="name" v-model="name" :rules="nameRules" label="Name" required></v-text-field>
        </v-row>
        <v-row no-gutters>
          <v-text-field name="dept" v-model="dept" :rules="deptRules" label="Department" required></v-text-field>
        </v-row>
        <v-row no-gutters>
          <v-text-field name="dest" v-model="dest" :rules="destRules" label="Destination" required></v-text-field>
        </v-row>
        <v-row no-gutters>
          <v-menu
            name="dates"
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
                name="travelDates"
                v-model="finalDate"
                :rules="travelRules"
                label="Travel Dates"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker 
            v-model="dates" 
            no-title 
            scrollable 
            range 
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="dateRangeText">Ok</v-btn>
            </v-date-picker>
          </v-menu>
        </v-row>
        <v-row no gutters>
          <v-textarea
            name="reason"
            v-model="reason"
            :rules="reasonRules"
            label="Reason"
            auto-grow
            outlined
          ></v-textarea>
        </v-row>
        <v-row no gutters>
          <v-textarea
            name="plan"
            v-model="itinerary"
            :rules="itineraryRules"
            label="Proposed Travel Itinerary"
            hint="Exact flight times and hotel"
            auto-grow
            outlined
            required
          ></v-textarea>
        </v-row>
      </v-col>
    </v-row>
  </nav>
</template>

<script>
export default {
  data: () => ({
    finalDate: "",
    valid: false,
    name: "",
    nameRules: [v => !!v || "Name is required"],
    dept: "",
    deptRules: [v => !!v || "Department is required"],
    dest: "",
    destRules: [v => !!v || "Destination is required"],
    dates: ["", ""],
    travelRules: [v => !!v || "At least one travel date is required"],
    menu: false,
    reason: "",
    reasonRules: [v => !!v || "Reason is required"],
    itinerary: "",
    itineraryRules: [v => !!v || "Itinerary is required"],
  }),
  computed: {
    
    complete() {
      if (this.name == "" ||
        this.dept == "" ||
        this.dest == "" ||
        this.dates[0] == "" ||
        this.reason == "" ||
        this.itinerary == ""
        )
          return false;
        else return true;
    }
  },
  methods: {
    dateRangeText() {
      this.menu = false;
      if (this.dates[0] != "" && (this.dates[1] == "" || this.dates[1] == null)) {
        this.dates[0] = this.formatDate(this.dates[0]);
        this.finalDate = this.dates[0]
        return this.dates[0];
      }
      else if(this.dates[0] != "" && this.dates[1] != "") {
        this.dates[0] = this.formatDate(this.dates[0]);
        this.dates[1] = this.formatDate(this.dates[1]);
        this.finalDate = this.dates.join(' - ');
      } 
      else return "";
    },
    formatDate(date) {
      if(!date) return null
      if (date.includes("/")) return date
      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    }
  }
};
</script>
