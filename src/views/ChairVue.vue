  <template>
  <v-container>
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
        search: '',
        selected: [],
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
        console.log(typeof response.data);
        this.submittedForms = response.data;
      }
      ).catch(function(error) {
        console.log(error);
      });
      
      
    }
  };


  </script>