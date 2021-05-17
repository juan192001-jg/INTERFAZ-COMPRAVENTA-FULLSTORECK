<template>
<v-app>
   <Menu/>
  <v-mai>
<router-view /> 
  </v-mai>
 
</v-app>



</template>
<script>
import Menu from './components/Menu.vue'
export default {

  name: 'App',
components:{
Menu
},
  data: () => ({
 
    //
  }),
};
</script>
