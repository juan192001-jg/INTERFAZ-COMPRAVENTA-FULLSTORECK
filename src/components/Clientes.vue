<template>

     <v-data-table
    :headers="headers"
    :items="Proveedores"
    sort-by="calories"
    class="elevation-1"
    :search="search"
    dark
    
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>CLIENTES<br><v-btn
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
              NUEVO CLIENTE       </v-btn>
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
                      v-model="editedItem.tipoPersona"
                      label="Tipo de Persona"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.tipoDucumento"
                      label="Tipo de Documento"
                    ></v-text-field>
                  </v-col><v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                   
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col><v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.dirrecion"
                      label="Dirrecion"
                    ></v-text-field>
                  </v-col><v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.telefono"
                      label="Telefono"
                    ></v-text-field>
                  </v-col><v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.numeroDocumento"
                      label="Numero de Documento"
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
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import axios from 'axios'
    export default {
        data() {
      
            return {
      bd:0,
      id:'',
      search:"",
      dialog: false,
      dialogDelete: false,
      Proveedores:[],
     dirrecion:'',
      email:'',
      nombre:'',
      numeroDocumento:'',
      telefono:'',
      tipoDucumento:'',
      tipoPersona:'',
                
        headers: [
        {
          text: 'Nombre',
          align: 'start',
          sortable: false,
          value: 'nombre',
        },
        { text: 'Tipo de Persona', value: 'tipoPersona' },
        { text: 'Tipo de Documento ', value: 'tipoDucumento' },
        { text: 'Numero de Documento', value: 'numeroDocumento' },
        { text: 'Dirreccionn', value: 'dirrecion' },
        { text: 'Telefono', value: 'telefono' },
        { text: 'Correo', value: 'email' },
        { text: 'Estado', value: 'estado' },
        {text:'Opciones',value:'opciones',sortable:false}
      
      ], 
       editedItem: {
      dirrecion:'',
      email:'',
      nombre:'',
      numeroDocumento:'',
      telefono:'',
      tipoDucumento:'',
      tipoPersona:'',
        
      },
            }

        }, 
        created() {
            this.listarProveedores()
        },  
         computed: {
        formTitle() {
          return this.editedIndex === -1 ? "Nuevo registro" : "Editar registro";},
    },
        methods: {
              listarProveedores() {
                  let header = {headers :{"token": this.$store.state.token}};
                  axios.get("persona/listCliente/?value=CLIENTE",header)
                  .then((response)=>{
                      console.log(response.data.persona)
                      this.Proveedores=response.data.persona
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
                  axios.put(`persona/desactivar/${id}`,{estado:0},header) 
                  .then(function() {
                    me.listarProveedores();
                  }) 
                  .catch(function (error){
                    console.log(error)
                  })
                }else if (accion==1) {
                  let me=this
                  let header = {headers :{"token": this.$store.state.token}};
                  axios.put(`persona/activar/${id}`,{estado:1},header) 
                  .then(function() {
                    me.listarProveedores();
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
        this.limpiar();
        this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        })
  },
   crearPDF() {
      var columns = [

       { title: 'Tipo de Persona', dataKey: 'tipoPersona' },
         { title: 'Dirreccionn', dataKey: 'dirrecion' },
        { title: 'Tipo de Documento ', dataKey: 'tipoDucumento' },
        { title: 'Numero de Documento', dataKey: 'numeroDocumento' },
        { title: 'Telefono', dataKey: 'telefono' },
        { title: 'Correo', dataKey: 'email' },
        { title: 'Estado', dataKey: 'estado' },
        
      ];
      var rows = [];

      this.Proveedores.map(function (x) {
        rows.push({
      dirrecion:x.dirrecion,
      email:x.email,
      nombre:x.nombre,
      numeroDocumento:x.numeroDocumento,
      telefono:x.telefono,
      tipoDucumento:x.tipoDucumento,
      tipoPersona:x.tipoPersona,
      estado:x.estado
        });
      });
      var doc = new jsPDF("p","pt");
      doc.autoTable(columns, rows, {
        margin: { top: 60 },
        addPageContent: function () {
          doc.text("Lista de Clientes", 40, 30);
        },
      });

      doc.save("Clientes.pdf");
    },
  save(){
    if (this.bd==0) {
      console.log('Guardando')
      let me = this
  let header={headers:{"token":this.$store.state.token}}  
        axios
          .post("persona", {
                    dirrecion:this.editedItem.dirrecion,
                    email:this.editedItem.email,
                    nombre:this.editedItem.nombre,
                    numeroDocumento:this.editedItem.numeroDocumento,
                    telefono:this.editedItem.telefono,
                    tipoDucumento:this.editedItem.tipoDucumento,
                    tipoPersona:this.editedItem.tipoPersona,
          },header)
          .then(function () {
            me.listarProveedores();
           me.limpiar();
            me.close();
            
          })
          .catch(function (error) {
            console.log(error);
          }); 
    }else {
      console.log('editando',this.id)
   let me = this
  let header={headers:{"token":this.$store.state.token}}  
        axios
          .put(`persona/${this.id}`, {
                    dirrecion:this.editedItem.dirrecion,
                    email:this.editedItem.email,
                    nombre:this.editedItem.nombre,
                    numeroDocumento:this.editedItem.numeroDocumento,
                    telefono:this.editedItem.telefono,
                    tipoDucumento:this.editedItem.tipoDucumento,
                    tipoPersona:this.editedItem.tipoPersona,
          },header)
          .then(function () {
          me.listarProveedores();
          me.limpiar();
          me.close();
           
          })
          .catch(function (error) {
            console.log(error);
          }); 

    }
   

    
     },editItem(item){
          this.bd=1
          this.id=item._id
          this.editedItem.email=item.email
          this.editedItem.nombre=item.nombre
          this.editedItem.numeroDocumento=item.numeroDocumento
          this.editedItem.telefono=item.telefono
          this.editedItem.tipoDucumento=item.tipoDucumento
          this.editedItem.tipoPersona=item.tipoPersona
          this.editedItem.dirrecion=item.dirrecion
          this.dialog=true

        },
    limpiar() {
      this._id = "";
      this.bd=0,
      this.nombre = "";
      this.email = "";
      this.numeroDocumento = "";
      this.telefono = "";
      this.tipoPersona = "";
      this.tipoDucumento = "";
      this.dirrecion = "";
      this.valida = 0;
      this.validaMensaje = [];
      this.editedIndex = -1;}
        },
    };
</script>
<style>
  .template{
background:green;
  }
</style>