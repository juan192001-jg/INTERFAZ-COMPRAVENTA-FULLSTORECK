<template>
<v-app app dark >

<!-- <v-app-bar app dark color="blue" >


<v-toolbar-title>FullStoreck Welcome</v-toolbar-title>
<v-spacer></v-spacer>

</v-app-bar> -->

<br>
<br>
<v-main dark >
  <v-card width="500" class="mx-auto mt-5">
    <v-card-title>Login</v-card-title>
    <v-card-text v>
      <v-text-field required :rules="nameRules" v-model="email" label="Username" prepend-icon="mdi-account-circle" />
      <v-text-field
      required
      :rules="password"
      v-model="pass"
      label="Password" 
      :type="showpasword ?'text' : 'password'" 
      prepend-icon="mdi-lock" 
      :append-icon="showpasword ? 'mdi-eye' : 'mdi-eye-off'" 
      @click:append="showpasword =!showpasword"/>
    </v-card-text>
    <v-divider></v-divider>
      <v-flex class="red--text" v-if="errorM">
                        {{errorM}}
      </v-flex>
    <v-divider></v-divider>
    <v-card-actions>
     
      <v-btn dark @click="ingresar()" >Iniciar</v-btn>
    </v-card-actions>
  </v-card>
</v-main>
<template>
  <v-footer
   
  >
    <v-card
      class="flex"
      flat
      tile
      
    >
      <v-card-title  class="teal" >
        <strong  color="blue" class="subheading">Empresa dedicada a la venta de todo tipo de articulos!</strong>

        <v-spacer></v-spacer>

        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          blue
          icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-title >
      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} —<strong>FullStoreck</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
</v-app>
</template>

<script>
import axios from "axios";
export default {
  name: 'App',

  components: {

  },


  data() {
    
    return{
      nameRules:[
        v=> !!v || 'Usuario es requerido',
      ],
      password:[
        v=> !!v || 'La contraseña es rerequerida',
      ],
      pass:'',
      email:'',
      errorM:null,
       icons: [
       'mdi-thumb-up',
        'mdi-thumb-down',
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
        
      ],
       showpasword:false
    }
  },
  methods: {
    ingresar() {
      axios.post("usuario/login",{email:this.email,password:this.pass})
      .then(response=>{
        this.$store.dispatch("setToken",response.data.token);
        this.$store.dispatch("Nombre",response.data.usuario.email);
        this.$store.dispatch("usuario",response.data.usuario.nombre);
        this.$store.dispatch("rol",response.data.usuario.rol);
        this.$router.push("/home")
        // return console.log(response),console.log(response.data.usuario)
      }).catch((error)=>{
         console.log(error)
     
        if (error.response.status==400) {
        this.errorM='El Username y / o Password son incorectas corigelas por favor'
  
        }else if (error.response.status==200) {
        this.errorM='El Username y / o Password son incorectas corigelas por favor'
          
        }else{
          this.errorM='usted no puedo ingresar al sistema por problemas en el servidor '
        }

       
      })
    },
   
  },
  
};
</script>
<style>
  .app{
    text-align: center;
  margin-left:auto;

  }
</style>
