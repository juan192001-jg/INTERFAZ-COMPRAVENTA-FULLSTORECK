<template>
     <v-data-table
    :headers="headers"
    :items="articulos"
    sort-by="calories"
    class="elevation-1"
    :search="search"
    dark
    
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>
          
          Articulos  <br><v-btn
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
              NUEVA ARTICULO
            </v-btn>
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
                  >
                  <v-text-field
                      v-model="editedItem.codigo"
                      label="codigo"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <v-text-field
                      v-model="editedItem.precioventa"
                      label="Precio venta "
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <v-select
                      v-model="editedItem.categoria"
                      :items="categorias"
                      label="Categoría"
                    >
                    </v-select>
                  </v-col>
                  
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <v-text-field
                      v-model="editedItem.stock"
                      label="Cantidad en Stock"
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
              bd:0,
              id:'',
      dialog: false,
      dialogDelete: false,
      articulos:[],
        nombre: '',
        codigo:'',
        descripcion:'',
        precioventa:'',    
        stock:'', 
        categoria: "",
        search:'',
        categorias: [],
        


                
        headers: [
           { text: 'Codigo',
         value: 'codigo'
        },
        {
          text: 'Nombre',
          align: 'start',
          sortable: false,
          value: 'nombre',
        },
         { text: 'Descripcion',
         value: 'descripcion'
        }, 
        { text: 'Precio',
         value: 'precioventa'
        },
        { text: 'Categoria',
         value: 'categoria.nombre'
        },
          { text: 'Stock',
         value: 'stock' 
         },
        { text: 'Estado',
         value: 'estado' 
         },
        {text:'Opciones',value:'opciones',sortable:false}

      
      
      ], 
      editedItem: {
        
        categoria: "",
        nombre: '',
        codigo:'',
        descripcion:'',
        precioventa:'',    
        stock:'', 
       
        
      },
            }

        }, 
        created() {
            this.listarArticulos()
            this.selectCategoria()
        },
        methods: {
          selectCategoria() {
      let me = this;
      let categoriaArray = [];
      let header = {headers :{"token": this.$store.state.token}};
                  axios.get("categoria",header)
                  .then((response)=>{
                      categoriaArray = response.data.categoria;
                      categoriaArray.map(function (x) {
                     me.categorias.push({ text:x.nombre , value:x._id });
                     
                     });
                     return console.log(response.me.categorias)
                  })
                  .catch((error)=>{
                      console.log(error.response)
                  });
                  
    },
    crearPDF() {
      var columns = [
       { title:'Codigo',
        dataKey: 'codigo'
        },
        {
          title:'Nombre',
          
         dataKey: 'nombre',
        },
         { title:'Descripcion',
        dataKey: 'descripcion'
        }, 
        { title:'Precio',
        dataKey: 'precioventa'
        },
        { title:'Categoria',
        dataKey: 'categoria'
        },
          { title:'Stock',
        dataKey: 'stock' 
         },
        { title:'Estado',
        dataKey: 'estado' 
         },
      ];
      var rows = [];

      this.articulos.map(function (x) {
        rows.push({
          codigo:x.codigo,
          nombre: x.nombre,
          descripcion: x.descripcion,
          precioventa:x.precioventa,
          categoria:x.categoria.nombre,
          stock:x.stock,
          estado: x.estado,
        });
      });
      var doc = new jsPDF("p","pt");
      doc.autoTable(columns, rows, {
        margin: { top: 60 },
        addPageContent: function () {
          doc.text("Lista de Articulos", 40, 30);
        },
      });

      doc.save("Articulos.pdf");
    },
              listarArticulos() {
                  let header = {headers :{"token": this.$store.state.token}};
                  axios.get("articulo",header)
                  .then((response)=>{
                      console.log(response.data.articulos)
                      this.articulos=response.data.articulos
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
                  axios.put(`articulo/desactivar/${id}`,{estado:0},header) 
                  .then(function() {
                    me.listarArticulos();
                  }) 
                  .catch(function (error){
                    console.log(error)
                  })
                }else if (accion==1) {
                  let me=this
                  let header = {headers :{"token": this.$store.state.token}};
                  axios.put(`articulo/activar/${id}`,{estado:1},header) 
                  .then(function() {
                    me.listarArticulos();
                  }) 
                  .catch(function (error){
                    console.log(error)
                  })
                }

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
        this.limpiar()
        this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        })
  },
  save(){
    if (this.bd==0) {
      let me=this
     let header = {headers :{"token": this.$store.state.token}};
                  axios.post("articulo",{
                    nombre:this.editedItem.nombre ,
                    codigo:this.editedItem.codigo,
                    descripcion:this.editedItem.descripcion,
                    precioventa:this.editedItem.precioventa,    
                    stock:this.editedItem.stock, 
                    categoria:this.editedItem.categoria,

                   
                    
                  },header)
                  
                  .then(function () {
                      me.listarArticulos();
                      me.limpiar();
                      me.close();
                  })
                  .catch((error)=>{
                      console.log(error.response)
                  }); 
    }else{
      let me=this
     let header = {headers :{"token": this.$store.state.token}};
                  axios.put(`articulo/${this.id}`,{
                    nombre:this.editedItem.nombre ,
                    codigo:this.editedItem.codigo,
                    descripcion:this.editedItem.descripcion,
                    precioventa:this.editedItem.precioventa,    
                    stock:this.editedItem.stock, 
                    categoria:this.editedItem.categoria
                  },header)
                  
                  .then(function () {
                      me.listarArticulos();
                      me.limpiar();
                      me.close();
                  })
                  .catch((error)=>{
                      console.log(error.response)
                  }); 

    }

   

  },
  editItem(item) {
    this.bd=1
   this.id=item._id 
   this.editedItem.categoria=item.categoria._id,
   this.editedItem.nombre=item.nombre,
   this.editedItem.codigo=item.codigo,
   this.editedItem.descripcion=item.descripcion,
   this.editedItem.precioventa=item.precioventa,    
   this.editedItem.stock=item.stock
  this.dialog=true

  },
  limpiar(){
     this.categoria= "",
     this.nombre= '',
     this.codigo='',
     this.descripcion='',
     this.precioventa='',    
     this.stock=''
     this.dialog=false
  
  }
 


        },
    };
</script>
<style>
  .template{
background:green;
  }
</style>