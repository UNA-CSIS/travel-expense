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
    <v-simple-table>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Information</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, key) in details" :key="item.name">
                      <td>{{key}}</td>
                      <td>{{item}}</td>
                    </tr>
                    <tr>
                     <td><v-btn v-on:click="showTable = !showTable" justify="center" align="center" color="primary">Go back to table</v-btn></td>
        <td><v-btn v-on:click="confirmReport" color="primary">Confirm Payment for Travel</v-btn> </td>
        <td><v-btn v-on:click="denyReport" color="primary">Deny Trip Payment</v-btn></td></tr>
                  </tbody>
            </v-simple-table>
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
        {text: 'Date', value: 'date'},
        {text: 'Confirmed', value: 'confirmed'}
        ],
        submittedForms: []
    }),
    mounted() {
      this.loadForms();
    },
    beforeCreate: function() {
      if(!this.$session.exists()) {
        this.$router.push('/login');
    }
    //If not an admin, send back to login page
      if(!this.$session.get('admin')) {
        this.$router.push('/login');
      }
    },
    methods: {
        loadForms() {
          axios.get("http://localhost:8888/api/form").then((response) => {
          this.submittedForms = response.data;
          }
          ).catch(function(error) {
          console.log(error);
          });
        },
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
                delete this.details._id;
            });
        },
        confirmReport() {
          axios({
              method: 'put',
              url: "http://localhost:8888/api/form",
              data: {
                name: this.details.name,
                department: this.details.department,
                destination: this.details.destination,
                travelDates: this.details.travelDates,
                reason: this.details.reason
              }
          }).then(() => {
            alert("Travel Report has been confirmed");
            this.loadForms();
            this.showTable = true;
          });
        },
        denyReport() {
          axios({
              method: 'delete',
              url: "http://localhost:8888/api/form",
              data: {
                name: this.details.name,
                department: this.details.department,
                destination: this.details.destination,
                travelDates: this.details.travelDates,
                reason: this.details.reason
              }
          }).then(() => {
            alert("Travel Report has been declined");
            this.loadForms();
            this.showTable = true;
          });
        }
    }
  };


  </script>