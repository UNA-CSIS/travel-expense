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
        <v-container v-if="othValue > 0">
          <v-row no-gutters>
            <v-col cols="2">
              <v-checkbox v-model="optOne" :label="`Car hire`"></v-checkbox>
            </v-col>
            <v-col cols="3">
              <v-checkbox v-model="optTwo" :label="`Mileage cost`"></v-checkbox>
            </v-col>
            <v-col cols="2">
              <v-checkbox v-model="optThree" :label="`Taxis`"></v-checkbox>
            </v-col>
            <v-col cols="3">
              <v-checkbox v-model="optFour" :label="`Car parking`"></v-checkbox>
            </v-col>
            <v-col cols="2">
              <v-checkbox v-model="optFive" :label="`Other`"></v-checkbox>
            </v-col>
          </v-row>
          <v-row v-if="optFive" no-gutters>
            <v-textarea
              label="Details for other fees"
              auto-grow
              required
              :rules="detailsRules"
              outlined
            ></v-textarea>
          </v-row>
        </v-container>
        <v-row no-gutters>
          <v-text-field
            v-model="subValue"
            type="number"
            label="Subsistence"
            hint="No dollar signs or commas"
            prepend-icon="mdi-currency-usd"
            :rules="subRules"
            min="0"
            step="0.01"
            max="999999.99"
          ></v-text-field>
        </v-row>
        <v-divider></v-divider>
        <br />
        <v-row no-gutters>
          <v-text-field
            v-model="totalValue"
            disabled
            label="Total Requested Fees"
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
    optOne: false,
    optTwo: false,
    optThree: false,
    optFour: false,
    optFive: false,
    optionsShown: false,
    feeRules: [
      v => !!v || "Fees are required",
      v => !(v < 0) || "Fees can not be less than 0",
      v => !(v > 999999.99) || "Fees can not be greater than 999999.99"
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
    ],
    detailsRules: [v => !!v || "Details are required"]
  }),
  computed: {
    totalValue() {
      var total = 0;
      var feeFloat = parseFloat(this.feeValue);
      var travelFloat = parseFloat(this.travelValue);
      var accFloat = parseFloat(this.accValue);
      var othFloat = parseFloat(this.othValue);
      var subFloat = parseFloat(this.subValue);
      if (!isNaN(feeFloat)) total += feeFloat;
      if (!isNaN(travelFloat)) total += travelFloat;
      if (!isNaN(accFloat)) total = total + accFloat;
      if (!isNaN(othFloat)) total = total + othFloat;
      if (!isNaN(subFloat)) total = total - subFloat;

      if (!isNaN(total) && total >= 0) return total;
      else if (!isNaN(total) && total < 0)
        return "Entered amount for subsistence is too great";
      else return "";
    }
  },
};
</script>