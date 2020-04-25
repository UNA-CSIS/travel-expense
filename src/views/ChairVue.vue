<!--
  This file is used to show the department chair  view
-->
<template>
  <v-container v-if="showTable">
    <v-card>
      <v-card-title
        >Submitted Forms<v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-layout justify-center align-center column>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="indexedItems"
          :single-select="true"
          :search="search"
          item-key="selectedPosition"
          show-select
        >
        </v-data-table>
        <v-btn
          v-if="selected.length != 0"
          v-on:click="getDetails"
          justify="center"
          align="center"
          color="primary"
          >Get Details</v-btn
        >
      </v-layout>
      <br />
    </v-card>
  </v-container>
  <v-container v-else>
    <v-card>
      <v-card-title
        >From Details For: {{ details.name }}<v-spacer></v-spacer>
      </v-card-title>
      <v-simple-table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Information</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in details" :key="key">
            <td>{{ key }}</td>
            <td>{{ item }}</td>
          </tr>
        </tbody>
      </v-simple-table>

      <v-row
        ><v-spacer></v-spacer
        ><v-btn v-on:click="showTable = !showTable" color="primary"
          >Go back to table</v-btn
        >
        <v-spacer></v-spacer
        ><v-btn v-on:click="confirmReport" color="primary"
          >Confirm Payment for Travel</v-btn
        ><v-spacer></v-spacer>
        <v-btn v-on:click="denyReport" color="primary">Deny Trip Payment</v-btn
        ><v-spacer></v-spacer
      ></v-row>
      <br />
    </v-card>
  </v-container>
</template>
<script>
const NETPATH = "http://192.168.0.36"

import axios from "axios";
export default {
  computed: {
    indexedItems() {
      return this.submittedForms.map((item, index) => ({
        selectedPosition: index,
        ...item,
      }));
    },
  },
  data: () => ({
    showTable: true,
    search: "",
    selected: [],
    details: [],
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: "false",
        value: "name",
      },
      { text: "Location", value: "location" },
      { text: "Date", value: "date" },
      { text: "Confirmed", value: "confirmed" },
    ],
    submittedForms: [],
  }),
  mounted() {
    this.loadForms();
  },
  beforeCreate: function() {
    if (!this.$session.exists()) {
      this.$router.push("/login");
    }
    //If not an admin, send back to login page
    if (!this.$session.get("admin")) {
      this.$router.push("/login");
    }
  },
  methods: {
    //Retrieves forms from the database
    loadForms() {
      axios
        .get(NETPATH + ":8888/api/form")
        .then((response) => {
          this.submittedForms = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //Gives a summary of the information
    getDetails() {
      this.showTable = false;
      axios({
        method: "post",
        url: NETPATH + ":8888/api/formDetail",

        data: {
          name: this.selected[0].name,
          destination: this.selected[0].location,
          travelDates: this.selected[0].date,
          id: this.submittedForms[this.selected[0].selectedPosition]._id,
        },
      }).then((response) => {
        this.details = response.data;
        delete this.details._id;
      });
    },
    //Allows the department chair to confirm report
    confirmReport() {
      axios({
        method: "put",
        url: NETPATH + ":8888/api/form",
        data: {
          name: this.details.name,
          department: this.details.department,
          destination: this.details.destination,
          travelDates: this.details.travelDates,
          reason: this.details.reason,
          username: this.details.username,
        },
      }).then(() => {
        alert("Travel Report has been confirmed");
        this.loadForms();
        this.showTable = true;
      });
    },
    //Allows the department chair to deny the form
    denyReport() {
      var reasonForDenial = prompt("Enter a reason for the denial");
      if (reasonForDenial == null || reasonForDenial == "") {
        alert("Request not denied");
      } else {
        axios({
          method: "delete",
          url: NETPATH + ":8888/api/form",
          data: {
            name: this.details.name,
            department: this.details.department,
            destination: this.details.destination,
            travelDates: this.details.travelDates,
            reason: this.details.reason,
            username: this.details.username,
            reasonForDenial: reasonForDenial,
          },
        }).then(() => {
          alert("Travel Report has been declined");
          this.loadForms();
          this.showTable = true;
        });
      }
    },
  },
};
</script>
