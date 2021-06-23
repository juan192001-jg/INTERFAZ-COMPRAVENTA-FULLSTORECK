<template>

     <v-data-table
    :headers="headers"
    :items="categorias"
    sort-by="calories"
    class="elevation-1"
    :search="search"
    dark
    
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Categorias  <br><v-btn
        color="primary"
        @click="crearPDF()"
      >
        <v-icon>mdi-file-pdf-box</v-icon>
        PDF
      </v-btn> </v-toolbar-title>
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
              NUEVA CATEGORIA          </v-btn>
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
                      label="Nombre"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.descripcion"
                      label="Descripcion"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                    v-show="valida"
                  ><div
                  class="red--text"
                  v-for="v in validaMensaje"
                  :key="v"
                  v-text="v"
                  >
                    

                  </div>
                  
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
          <div v-if="item.estado===1">
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
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import axios from 'axios'
    export default {
        data() {
      
            return {
              valida:0,
              validaMensaje:[],
              bd:0,
              id:'',
      search:"",
      dialog: false,
      dialogDelete: false,
      categorias:[],
      nombre:'',
      descripcion:'',
                
        headers: [
        {
          text: 'Nombre',
          align: 'start',
          sortable: false,
          value: 'nombre',
        },
        { text: 'Descripcion', value: 'descripcion' },
        { text: 'Estado', value: 'estado' },
        {text:'Opciones',value:'opciones',sortable:false}
      
      ], 
      editedItem: {
        nombre: '',
        descripcion: '',
        estado: 0,
        
      },
            }

        }, 
        created() {
            this.listarCategorias()
        },
        methods: {
              listarCategorias() {
                  let header = {headers :{"token": this.$store.state.token}};
                  axios.get("categoria",header)
                  .then((response)=>{
                      console.log(response.data.categoria)
                      this.categorias=response.data.categoria
                  })
                  .catch((error)=>{
                      console.log(error.response)
                  });

          
              },  crearPDF() {
      var columns = [
      
        {
          title:'Nombre',
          
         dataKey: 'nombre',
        }, 
        { title:'Descripcion',
        dataKey: 'descripcion'
        },
        { title:'Estado',
        dataKey: 'estado' 
         },
      ];
      var rows = [];

      this.categorias.map(function (x) {
        rows.push({
          nombre: x.nombre,
          descripcion: x.descripcion,
          estado: x.estado,
        });
      });
      var doc = new jsPDF("p","pt");
      doc.autoTable(columns, rows, {
        margin: { top: 60 },
        addPageContent: function () {
          doc.text("Lista de Categorias", 40, 30);
        },
      });

      doc.save("Categorias.pdf");
    },
              validar(){
                this.valida=0
                this.validaMensaje=[]
                if (this.nombre.length >1 || this.nombre.length <50) {
                  this.validaMensaje.push('El nombre de la categoria debe tener entre 1-50 carateres')
                }
                 if (this.descripcion.length >1 || this.descripcion.length <225) {
                  this.validaMensaje.push('La descripciono debe tener entre 1  y 225 caracteres')
                  
                } if (this.validaMensaje.length) {
                  this.valida=1
                  
                }
                return this.valida
              },
              activarDesactivarMostrar(accion,item) {
                let id=item._id

                if (accion==2) {
                  let me=this
                  let header = {headers :{"token": this.$store.state.token}};
                  axios.put(`categoria/desactivar/${id}`,{estado:0},header) 
                  .then(function() {
                    me.listarCategorias();
                  }) 
                  .catch(function (error){
                    console.log(error)
                  })
                }else if (accion==1) {
                  let me=this
                  let header = {headers :{"token": this.$store.state.token}};
                  axios.put(`categoria/activar/${id}`,{estado:1},header) 
                  .then(function() {
                    me.listarCategorias();
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
          this.limpiar();  
        this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        })
  },
  save(){
   
    if (this.bd==0) {
      console.log('guardando',this.bd,this.id)
       let me = this
  let header={headers:{"token":this.$store.state.token}}  
        axios
          .post("categoria", {
            nombre: this.editedItem.nombre,
            descripcion: this.editedItem.descripcion,
          },header)
          .then(function () {
          me.listarCategorias();
          me.limpiar();  
          me.close();
           
          })
          .catch(function (error) {
            console.log(error);
          });
    }else{
      let me = this
      console.log('editando',this.bd,this.id)

       let header={headers:{"token":this.$store.state.token}}  
        axios
          .put(`categoria/${this.id}`, {
            nombre: this.editedItem.nombre,
            descripcion: this.editedItem.descripcion,
          },header)
          .then(function () {
         me.listarCategorias();
          me.limpiar();  
          me.close();
          })
          .catch(function (error) {
            console.log(error);
          });

    }
   

    
     },
    editItem(item) {
this.bd=1,
this.id=item._id,
this.editedItem.nombre=item.nombre,
this.editedItem.descripcion=item.descripcion
this.dialog=true
    },
      limpiar() {
      this.bd=""; 
      this.id=""
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