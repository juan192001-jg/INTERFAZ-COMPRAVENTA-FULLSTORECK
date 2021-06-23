<template>

     <v-data-table
    :headers="headers"
    :items="ingresos"
    sort-by="calories"
    class="elevation-1"
    :search="search"
    dark
    
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Ingresos</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
          dark
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              NUEVO INGRESO        </v-btn>
          </template>
          <v-card>
            <v-card-title >
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.nombre"
                      label=""
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.descripcion"
                      label=""
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <v-text-field
                      v-model="editedItem.descripcion"
                      label=""
                  ></v-text-field>
                  </v-col>
                   <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <v-text-field
                      v-model="editedItem.descripcion"
                      label=""
                  ></v-text-field>
                  </v-col>
                    <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <v-text-field
                      v-model="editedItem.descripcion"
                      label=""
                  ></v-text-field>
                  </v-col> 
                
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancelar      
                
                </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        
      </v-toolbar>
    </template>
    <template v-slot:[`item.opciones`]="{ item }">
      
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil</v-icon>
      <!-- <v-icon small @click="deleteItem(item)"> mdi-swap-horizontal-circle </v-icon> -->
       <template v-if="item.estado">
            <v-icon small @click="activarDesactivarMostrar(2, item)">
             mdi-block-helper
            </v-icon>
          </template>
          <template v-else>
            <v-icon small @click="activarDesactivarMostrar(1, item)">
              mdi-check
            </v-icon>
          </template>
          
    </template>
      <template v-slot:[`item.estado`]="{ item }">
          <div v-if="item.estado">
            <span class="white--text">Activo</span>
          </div>
          <div v-else>
            <span class="red--text">Inactivo</span>
          </div>
        </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import axios from 'axios'
    export default {
        data() {
      
            return {
      search:"",
      dialog: false,
      dialogDelete: false,
      ingresos:[],
      // numeroComprobante,
      // persona,
      // serieComprobante,
      // serieComprobante,
      // usuario,
      // detalles,
  
                
        headers: [
       
        { text: 'Usuario', value: 'usuario.rol' },
        { text: 'Persona', value: 'persona.tipoPersona' },
        { text: 'Tipo Comprobante', value: 'tipoComprobante' },
        { text: 'Serie Comprobante ', value: 'serieComprobante' },
        { text: 'Numero Comprobante ', value: 'numeroComprobante' },  
        { text: 'Fecha', value: 'createtAt' },
        
        { text: 'Estado', value: 'estado' },
     {text:'Opciones',value:'opciones',sortable:false},
      
      ], 
      editedItem: {
        nombre: '',
        descripcion: '',
        estado: 0,
        
      },
            }

        }, 
        created() {
            this.listarIngresos()
        },
        methods: {
              listarIngresos() {
                  let header = {headers :{"token": this.$store.state.token}};
                  axios.get("ingreso",header)
                  .then((response)=>{
                      console.log(response.data.compras)
                      this.ingresos=response.data.compras
                  })
                  .catch((error)=>{
                      console.log(error.response)
                  });

          
              },
              activarDesactivarMostrar(accion,item) {
                let id=item._id

                if (accion==2) {
                  let me=this
                  let header = {headers :{"token": this.$store.state.token}};
                  axios.put(`ingreso/desactivar/${id}`,{estado:0},header) 
                  .then(function() {
                    me.listarIngresos();
                  }) 
                  .catch(function (error){
                    console.log(error)
                  })
                }else if (accion==1) {
                  let me=this
                  let header = {headers :{"token": this.$store.state.token}};
                  axios.put(`ingreso/activar/${id}`,{estado:1},header) 
                  .then(function() {
                    me.listarIngresos();
                  }) 
                  .catch(function (error){
                    console.log(error)
                  })
                }

              },
              computed: {
        formTitle() {
          return this.editedIndex === -1 ? "Nuevo registro" : "Editar registro";},
    },
              watch: {
            dialog (val) {
            val || this.close()
            },
            dialogDelete (val) {
            val || this.closeDelete()
            },
            },
        close() {
        this.dialog = false
        this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        })
  },
  save(){
    let me = this
  let header={headers:{"token":this.$store.state.token}}  
        axios
          .post("categoria", {
            nombre: this.nombre,
            descripcion: this.descripcion,
          },header)
          .then(function () {
           me.limpiar();
            me.close();
            me.listarCategorias();
          })
          .catch(function (error) {
            console.log(error);
          });

    
     },
      limpiar() {
      this._id = "";
      this.nombre = "";
      this.descripcion = "";
      this.valida = 0;
      this.validaMensaje = [];
      this.editedIndex = -1;
    },

        },
    };
</script>
<style>
  .template{
background:green;
  }
</style>