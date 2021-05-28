<template >
 <div>

  <v-toolbar dark>
<v-toolbar-title>FullStoreck Welcome</v-toolbar-title>
<v-spacer></v-spacer>
<v-btn @click="salir()" >
  <v-btn-icon>
     <v-icon>mdi-exit-to-app</v-icon>
  </v-btn-icon>
  Salir
</v-btn>
</v-toolbar>
<v-app>
 <v-divider>

</v-divider>
  
<router-view /> 
<template>
      <v-navigation-drawer
        app
        permanent
        expand-on-hover
        navigation dark 
       
       >
      
        <v-list>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img src="https://i.pinimg.com/originals/f0/dd/ec/f0ddec76cda8ee2756e663924856f81e.png"></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item color="blue" link>
            <v-list-item-content>
              <v-list-item-title class="title">
                {{this.$store.state.email}}
              </v-list-item-title>
              <v-list-item-subtitle> {{this.$store.state.nombre}}</v-list-item-subtitle>
              <v-list-item-subtitle> {{this.$store.state.rol}}</v-list-item-subtitle>

            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider>

        </v-divider>

        <v-list
          nav
          dense
        ><v-list-item :to="{ name:'Home'}">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item>
        <template v-if="this.$store.state.rol==='ADMIN_ROL' || this.$store.state.rol==='ALMACENISTA_ROL' ">

        <v-list-group>
          <v-list-item slot="activator">
            <v-list-item-icon>
              <v-icon>mdi-store</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Almacén</v-list-item-title>
          </v-list-item>
              <v-list-item :to="{ name:'categorias'}" >
            <v-list-item-icon>
              <v-icon>mdi-clipboard-list</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Categoria</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name:'articulos'}">
            <v-list-item-icon>
              <v-icon>mdi-view-list-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Articulos</v-list-item-title>
          </v-list-item>
        </v-list-group>
        </template>
        <template  v-if="this.$store.state.rol==='ADMIN_ROL' || this.$store.state.rol==='ALMACENISTA_ROL'">
        <v-list-group>
           <v-list-item  slot="activator" >
            <v-list-item-icon>
              <v-icon>mdi-shopping</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Compras</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name:'ingresos'}">
            <v-list-item-icon>
              <v-icon>mdi-store</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Ingresos</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name:'proveedores'}">
            <v-list-item-icon>
              <v-icon>mdi-account-group</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Proveedores</v-list-item-title>
          </v-list-item>
        </v-list-group>
        </template>
        <template v-if="this.$store.state.rol==='ADMIN_ROL' || this.$store.state.rol==='VENDEDOR_ROL'">
        <v-list-group>
           <v-list-item  slot="activator" >
            <v-list-item-icon>
              <v-icon>mdi-card-text</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Ventas</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name:'ventas'}">
            <v-list-item-icon>
              <v-icon>mdi-cart-arrow-up</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Ventas</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name:'cliente'}">
            <v-list-item-icon>
              <v-icon>mdi-clipboard-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Clientes</v-list-item-title>
          </v-list-item>
        </v-list-group>
        </template>
        <template  v-if="this.$store.state.rol==='ADMIN_ROL'">
         <v-list-group>
           <v-list-item  slot="activator" >
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Accesos</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name:'usuarios'}">
            <v-list-item-icon>
              <v-icon>mdi-account-group</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Usuarios</v-list-item-title>
          </v-list-item>
        </v-list-group>
        </template>
        <v-list-group>
           <v-list-item  slot="activator" >
            <v-list-item-icon>
              <v-icon>mdi-feature-search</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Consultas</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name:'consultacompras'}">
            <v-list-item-icon>
              <v-icon>mdi-feature-search</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Consultas Compras</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name:'consultaventas'}">
            <v-list-item-icon>
              <v-icon>mdi-feature-search</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Consultas Ventas</v-list-item-title>
          </v-list-item>
        </v-list-group>

        </v-list>
      
   </v-navigation-drawer>   
 
    </template>
  </v-app>  
    
 
</div>

</template>

<script>

  export default {
    data() {
     
      return {
        usurio:this.$store.state.email,       
        estado:'',
      Nombre:this.$store.state.nombre
      }
    },
     created() {
            this.crearnombre()
        },
    methods: {
      crearnombre(){
this.Nombre=this.$store.state.nombre
this.usurio=this.$store.state.email
      },
 salir(){
       this.$store.dispatch("setToken",'');    
       this.$store.dispatch("Nombre",'');
       this.$store.dispatch("usuario",'');
       this.$store.dispatch("rol",'');
       this.$router.push("/login")

    },
  

    }
   
    //
  }
</script>
  
