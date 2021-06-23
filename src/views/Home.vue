<template>
<div>
   
  <v-card
    class="mx-auto text-center"
    color="dark"
    dark
    max-width="1900"
  >
   <svg dark viewBox="0 0 250 30" xmlns="http://www.w3.org/2000/svg">
 

  <text x="20" y="15" class="small">Welcome</text>
  
  <text x="65" y="25" class="Rrrrr">FullStarck!</text>
</svg>
    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .12)">
        <v-sparkline
          :value="value"
          color="white"
          height="150"
          padding="14"
          stroke-linecap="round"
          smooth
        >
          <template v-slot:label="item">
            ${{ item.value }}
          </template>
        </v-sparkline>
      </v-sheet>
    </v-card-text>

    <v-card-text>
      <div class="text-h4 font-weight-thin">
       ventas 
      </div>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions class="justify-center">
      <v-btn
        block
        text
      >
     Genear reporte
      </v-btn>
    </v-card-actions>
  </v-card>
  <br>
  <br>
  </div>
  
</template>
<script>
import axios from 'axios'
  export default {
    data() {
     return{value: [1000,1500,1700,2000,1400],} 
    },
     created() {
          
            this.listarVentas();
          
        },
    methods: {

listarVentas() {
  let arrayventas=[]
                  let header = {headers :{"token": this.$store.state.token}};
                  axios.get("Venta",header)
                  .then((response)=>{
                      
                     arrayventas=response.data.ventas
                     arrayventas.map(function (x){
                       this.value.push({text:x.total})
                     })

                  })
                  .catch((error)=>{
                      console.log(error.response)
                  });

          
              },
    }
  }
</script>
 <style>
    .small { font: italic 10px sans-serif; fill:white }
   
    .Rrrrr { font: italic 15px serif; fill: red; }
  </style>