<template>
  <nav>
    <v-row no-gutters justify="center">
      <v-col cols="3" style="min-width: 100px" class="flex-grow-1 flex-shrink 0">
        <v-select
          name="activityInformation"
          v-model="choice"
          :items="items"
          label="Activity Information"
          :rules="actChoiceRules"
          required
        ></v-select>
      </v-col>
    </v-row>
    <v-row no-gutters justify="center">
      <v-col cols="8" style="min-width: 100px" class="flex-grow-1 flex-shrink 0">
        <div v-if="choice == 'Attendance at Conference or Seminar'">
          <conference />
        </div>
        <div v-else-if="choice == 'Business Meeting'">
          <meeting />
        </div>
        <div v-else-if="choice == 'Marketing/Recruitment Event'">
          <event />
        </div>
        <div v-else-if="choice == 'Other Activity'">
          <other />
        </div>
      </v-col>
    </v-row>
  </nav>
</template>

<script>
import conference from "@/components/stepThree/conference";
import meeting from "@/components/stepThree/meeting";
import event from "@/components/stepThree/event";
import other from "@/components/stepThree/other";

export default {
  components: {
    conference,
    meeting,
    event,
    other
  },
  data: () => ({
    choice: "",
    items: [
      "Attendance at Conference or Seminar",
      "Business Meeting",
      "Marketing/Recruitment Event",
      "Other Activity"
    ],
    actChoiceRules: [v => !!v || "Required"],
  }),
  computed: {
  }
};
</script>
