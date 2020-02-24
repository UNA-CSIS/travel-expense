<template>
  <nav>
    <v-row no-gutters justify="center">
      <v-col cols="8" style="min-width: 100px" class="flex-grow-1 flex-shrink 0">
        <v-row no-gutters>
          <v-text-field
            v-model="feeValue"
            required
            type="number"
            label="Fees"
            hint="No dollar signs or commas"
            prepend-icon="mdi-currency-usd"
            :rules="feeRules"
            min="0"
            step="0.01"
            max="999999.99"
          ></v-text-field>
        </v-row>
        <v-row no-gutters>
          <v-text-field
            v-model="travelValue"
            required
            type="number"
            label="Travel Expenses"
            hint="No dollar signs or commas"
            prepend-icon="mdi-currency-usd"
            :rules="travelRules"
            min="0"
            step="0.01"
            max="999999.99"
          ></v-text-field>
        </v-row>
        <v-row no-gutters>
          <v-text-field
            v-model="accValue"
            required
            type="number"
            label="Accomodation Expenses"
            hint="No dollar signs or commas"
            prepend-icon="mdi-currency-usd"
            :rules="accRules"
            min="0"
            step="0.01"
            max="999999.99"
          ></v-text-field>
        </v-row>
        <v-row no-gutters>
          <v-text-field
            v-model="othValue"
            type="number"
            label="Other fees"
            hint="No dollar signs or commas"
            prepend-icon="mdi-currency-usd"
            :rules="othRules"
            min="0"
            step="0.01"
            max="999999.99"
          ></v-text-field>
        </v-row>
        <v-row no-gutters>
          <v-text-field
            v-model="totalValue"
            readonly
            type="number"
            label="TOTAL"
            prepend-icon="mdi-currency-usd"
          ></v-text-field>
        </v-row>
      </v-col>
    </v-row>
  </nav>
</template>

<script>
export default {
  data: () => ({
    feeValue: "",
    travelValue: "",
    accValue: "",
    othValue: "",
    subValue: "",
    feeRules: [
      v => !!v || "Fees are required",
      v => !(v < 0) || "Fees can not be less than 0",
      v => !(v > 999999.99) || "Fees can not be greater than 999999.99", 
    ],
    travelRules: [
      v => !!v || "Travel expenses are required",
      v => !(v < 0) || "Travel expenses can not be less than 0",
      v =>
        !(v > 999999.99) || "Travel expenses can not be greater than 999999.99"
    ],
    accRules: [
      v => !!v || "Accomodation expenses are required",
      v => !(v < 0) || "Accomodation expenses can not be less than 0",
      v =>
        !(v > 999999.99) ||
        "Accomodation expenses can not be greater than 999999.99"
    ],
    othRules: [
      v => !(v < 0) || "Other fees can not be less than 0",
      v => !(v > 999999.99) || "Other fees can not be greater than 999999.99"
    ],
    subRules: [
      v => !(v < 0) || "Subsistence can not be less than 0",
      v => !(v > 999999.99) || "Subsistance can not be greater than 999999.99"
    ]
  }),
  computed: {
    totalValue() {  return (parseFloat(this.feeValue) + parseFloat(this.travelValue) 
        + parseFloat(this.accValue) + parseFloat(this.othValue) 
        + parseFloat(this.subValue)).toString();
         }
    },
  methods: {},
}
</script>
