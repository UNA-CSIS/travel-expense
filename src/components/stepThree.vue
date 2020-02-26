<template>
  <nav>
    <v-row no-gutters justify="center">
      <v-col cols="3" style="min-width: 100px" class="flex-grow-1 flex-shrink-0">
        <v-select
          v-model="choice"
          :items="items"
          label="Activity Information"
          :rules="actChoiceRules"
          required
        ></v-select>
      </v-col>
    </v-row>
    <v-row no-gutters justify="center">
      <v-col cols="8" style="min-width: 100px" class="flex-grow-1 flex-shrink-0">
        <div v-if="choice == 'Attendance at Conference or Seminar'">
          <conference />
        </div>
        <div v-else-if="choice == 'Business Meeting'">
          <meeting />
        </div>
        <div v-else-if="choice == 'Marketing/Recruitment Event'">
          <eventother />
        </div>
        <div v-else-if="choice == 'Other Activity'">
          <eventother />
        </div>
        <div v-if="choice != ''">
          <br />
          <v-divider></v-divider>
          <br />
          <v-row no-gutters>
            <v-col cols="6" style="min-width: 100px">
              <v-text-field
                v-model="signature"
                label="Traveler's Signature"
                :rules="signatureRules"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="1" style="min-width: 100px"></v-col>
            <v-col cols="3" style="min-width: 100px">
              <v-text-field v-model="date" label="Date" required disabled></v-text-field>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </nav>
</template>

<script>
import conference from "@/components/stepThree/conference";
import meeting from "@/components/stepThree/meeting";
import eventother from "@/components/stepThree/eventother";

export default {
  components: {
    conference,
    meeting,
    eventother
  },
  data: () => ({
    choice: "",
    signature: "",
    date: new Date().toDateString(),
    items: [
      "Attendance at Conference or Seminar",
      "Business Meeting",
      "Marketing/Recruitment Event",
      "Other Activity"
    ],
    actChoiceRules: [v => !!v || "Required"],
    signatureRules: [v => !!v || "Travler's signature is required"]
  }),
  computed: {

  },
  methods: {
      complete() {
      if (this.choice != "" && this.signature != "") {
        return true;
      } else
        return false;
    }
  }
};
</script>
