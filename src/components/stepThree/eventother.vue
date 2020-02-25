<template>
  <nav>
    <v-row no-gutters>
      <v-textarea
        v-model="reason"
        label="Reason(s)"
        hint="Please provide specific reason for this trip"
        :rules="reasonRules"
        auto-grow
        outlined
        required
      ></v-textarea>
    </v-row>
    <v-row>
      <v-file-input accept=".doc, .docx, .pdf" label="Itinerary details"></v-file-input>
    </v-row>
  </nav>
</template>
<script>
export default {
  data: () => ({
    reason: "",
    reasonRules: [v => !!v || "A reason for attendance is required"]
  })
};
</script>