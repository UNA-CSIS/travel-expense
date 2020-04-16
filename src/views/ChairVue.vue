  <template>
  <v-container v-if="showTable">
    <v-card>
      <v-card-title>Submitted Forms<v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      </v-card-title>
      <v-layout justify-center align-center column>
        <v-data-table v-model="selected" 
                      :headers="headers" 
                      :items="submittedForms"
                      :single-select=true
                      :search="search"
                      item-key = "name" 
                      show-select>
        </v-data-table>
        <v-btn v-on:click="getDetails" justify="center" align="center" color="primary">Get Details</v-btn>
          </v-layout>
    </v-card>
  </v-container>
  <v-container v-else>
    <v-card>
      <v-card-title>From Details For: {{details.name}}<v-spacer></v-spacer>
      </v-card-title>
      <v-layout justify-center align-center column>
        <v-row><v-label>Name: {{details.name}}</v-label></v-row>
        <v-row><v-label>Department: {{details.department}}</v-label></v-row>
        <v-row><v-label>Destination: {{details.destination}}</v-label></v-row>
        <v-row><v-label>Travel Date(s): {{details.travelDates}}</v-label></v-row>
        <v-row><v-label>Reason for Travel: {{details.reason}}</v-label></v-row>
        <v-row><v-label>Itinerary: {{details.plan}}</v-label></v-row>
        <v-row><v-label>Fees: {{details.fees}}</v-label></v-row>
        <v-row><v-label>Expenses: {{details.expenses}}</v-label></v-row>
        <v-row><v-label>Accomodations: {{details.accomodation}}</v-label></v-row>
        <v-row><v-label>Other Expenses: {{details.otherExpenses}}</v-label></v-row>
        <v-row><v-label>Activity Information: {{details.activityInformation}}</v-label></v-row>

        <v-container justify-center align-center v-if="details.activityInformation = 'Attendance at Conference or Seminar'">
          <v-layout justify-center align-center column>
        <v-row v-if="details.activityInformation = 'Attendance at Conference or Seminar'">
          <v-label>Purpose at Conference/Seminar: {{details.conferenceReason}}</v-label></v-row>
        <v-row v-if="details.activityInformation = 'Attendance at Conference or Seminar'">
          <v-label>Title at Confernce/Seminar: {{details.conferenceTitle}}</v-label></v-row>
        <v-row v-if="details.activityInformation = 'Attendance at Conference or Seminar'">
          <v-label>Dates of the Conference/Seminar: {{details.conferencDates}}</v-label></v-row>
        <v-row v-if="details.activityInformation = 'Attendance at Conference or Seminar'">
          <v-label>Conference/Seminar Website: {{details.conferenceWebsite}}</v-label></v-row>
        <v-row v-if="details.activityInformation = 'Attendance at Conference or Seminar'">
          <v-label>Other Information: {{details.other}}</v-label></v-row>
          </v-layout>
        </v-container>

        <v-container justify-center align-center v-else-if="details.activityInformation = 'Business Meeting'">
          <v-layout justify-center align-center column>
        <v-row>
            <v-label>Meetings: {{details.meetings}}</v-label></v-row>
        <v-row>
            <v-label>Attendees: {{details.attendees}}</v-label></v-row>
        <v-row>
            <v-label>Meeting Dates: {{details.meetingDates}}</v-label></v-row> 
        <v-row>
            <v-label>Time of Meeting: {{details.meetingTime}}</v-label></v-row>
        <v-row>
            <v-label>Role at Meeting {{details.role}}</v-label></v-row>  
        <v-row>
            <v-label>Purpose of Meeting: {{details.purpose}}</v-label></v-row>
          </v-layout>
        </v-container>
        <v-container justify-center align-center v-else-if="details.activityInformation = 'Marketing/Recruitment Event'">
        <v-layout justify-center align-center column>
        <v-row>
            <v-label>Reason for Trip: {{details.otherReason}}</v-label></v-row>      
        <v-row>
            <v-label>Itinerary Details: {{details.itinerary}}</v-label></v-row>
        </v-layout>
        </v-container>
        <v-btn v-on:click="showTable = !showTable" justify="center" align="center" color="primary">Go back to table</v-btn>
        <v-btn v-on:click="confirmReport" color="primary">Confirm Payment for Travel</v-btn>
        <v-btn v-on:click="denyReport" color="primary">Deny Trip Payment</v-btn>
          </v-layout>
    </v-card>
  </v-container>
          </template>
  <script>
  import axios from 'axios';
  export default {
    components: {
        
    },
    data: () => ({
        showTable: true,
        search: '',
        selected: [],
        details: [],
        headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: 'false',
          value: 'name'
        },
        {text: 'Location', value: 'location'},
        {text: 'Date', value: 'date'}
        ],
        submittedForms: []
    }),
    mounted() {
      axios.get("http://localhost:8888/api/form").then((response) => {
        this.submittedForms = response.data;
      }
      ).catch(function(error) {
        console.log(error);
      });
      
      
    },
    methods: {
        getDetails() {
            this.showTable = false;
            axios({
              method: 'post',
              url: "http://localhost:8888/api/formDetail",
              
              data: {
                name: this.selected[0].name,
                destination : this.selected[0].location,
                travelDates: this.selected[0].date
              }
            }).then((response) => {
                this.details = response.data;
            });
        },
        confirmReport() {
           // axios
        },
        denyReport() {

        }
    }
  };


  </script>