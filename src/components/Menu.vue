<template>
 <div>
  
<v-app>
 <v-app-bar  dark  >
<v-toolbar-title>FullStoreck Welcome</v-toolbar-title>
<v-spacer></v-spacer>
<v-btn :to="{ name:'Login'}">
  <v-btn-icon>
     <v-icon>mdi-exit-to-app</v-icon>
  </v-btn-icon>
  Salir
</v-btn>
</v-app-bar>

 
      <v-navigation-drawer
        permanent
        expand-on-hover
        navigation dark 
      >
        <v-list>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item color="blue" link>
            <v-list-item-content>
              <v-list-item-title class="title">
               JUAN GABRIEL 
              </v-list-item-title>
              <v-list-item-subtitle>ADMIN@gmail.com</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider>

        </v-divider>

        <v-list
          nav
          dense
        >
        <v-list-item :to="{ name:'Home'}">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item>
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
 
     
    
  </v-app>
    
</div>
</template>

<script>
  export default {
    //
  }
</script>
  
