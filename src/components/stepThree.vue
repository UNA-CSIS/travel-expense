<template>
  <nav>
    <v-row no-gutters justify="center">
      <v-col cols="3" style="min-width: 100px" class="flex-grow-1 flex-shrink 0">
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
      <v-col cols="8" style="min-width: 100px" class="flex-grow-1 flex-shrink 0">
          <v-row v-if="choice == 'Attendance at Conference or Seminar'">
              1
          </v-row>
          <v-row v-else-if="choice == 'Business Meeting'">
              2
          </v-row>
          <v-row v-else-if="choice == 'Marketing/Recruitment Event'">
              3
          </v-row>
          <v-row v-else-if="choice == 'Other Activity'">
              4
          </v-row>
      </v-col>
    </v-row>
  </nav>
</template>

<script>
export default {
  data: () => ({
    choice: "",
    items: [
      "Attendance at Conference or Seminar",
      "Business Meeting",
      "Marketing/Recruitment Event",
      "Other Activity"
    ],
    actChoiceRules: [v => !!v || "Required"]
  }),
  computed: {}
};
</script>
