<template>

     <v-data-table
    :headers="headers"
    :items="Usuarios"
    sort-by="calories"
    class="elevation-1"
    :search="search"
    dark
    
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Usuarios <br><v-btn
        color="primary"
        @click="crearPDF()"
      >
        <v-icon>mdi-file-pdf-box</v-icon>
        PDF
      </v-btn></v-toolbar-title>
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
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                   <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-select
                      v-model="editedItem.rol"
                      :items="roles"
                      label="Rol"
                    >
                    </v-select>
                  </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.password"
                      label="Contraceña"
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
       <template v-if="item.esatdo">
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
      <template v-slot:[`item.esatdo`]="{ item }">
          <div v-if="item.esatdo===1">
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
      Usuarios:[],
      roles:[{value:'VENDEDOR_ROL'},{value:'ADMIN_ROL'},{value:'ALMACENISTA_ROL'}],
      nombre:'',
      email:'',
      rol:'',
      password:'',
      editedIndex:-1,
      
                
        headers: [
        {
          text: 'Nombre',
          align: 'start',
          sortable: false,
          value: 'nombre',
        },
      
        { text: 'Email', value: 'email' },
        { text: 'Rol', value: 'rol' },
        { text: 'Estado', value: 'esatdo' },
        {text:'Opciones',value:'opciones',sortable:false}
      
      ], 
      editedItem: {
        nombre: '',
        estado: 0,
        email:'',
        rol:'',
        password:'',
      
      },
            }

        }, 
        created() {
            this.listarUsuarios()
        },
        methods: {
              listarUsuarios() {
                  let header = {headers :{"token": this.$store.state.token}};
                  axios.get("usuario",header)
                  .then((response)=>{
                      console.log(response.data.usuarios)
                      this.Usuarios=response.data.usuarios
                  })
                  .catch((error)=>{
                      console.log(error.response)
                  });

          
              },crearPDF() {
      var columns = [
        { title: 'Email', dataKey: 'email' },
        { title: 'Rol', dataKey: 'rol' },
        { title:'Estado',
        dataKey: 'estado' 
         },
      ];
      var rows = [];

      this.Usuarios.map(function (x) {
        rows.push({
        nombre: x.nombre,
        email:x.email,
        rol:x.rol,
        estado: x.esatdo,
        });
      });
      var doc = new jsPDF("p","pt");
      doc.autoTable(columns, rows, {
        margin: { top: 60 },
        addPageContent: function () {
          doc.text("Lista de Usuarios", 40, 30);
        },
      });

      doc.save("Usuarios.pdf");
    },
              activarDesactivarMostrar(accion,item) {
                let id=item._id

                if (accion==2) {
                  let me=this
                  let header = {headers :{"token": this.$store.state.token}};
                  axios.put(`usuario/desactivar/${id}`,{esatdo:0},header) 
                  .then(function() {
                    me.listarUsuarios();
                  }) 
                  .catch(function (error){
                    console.log(error)
                  })
                }else if (accion==1) {
                  let me=this
                  let header = {headers :{"token": this.$store.state.token}};
                  axios.put(`usuario/activar/${id}`,{esatdo:1},header) 
                  .then(function() {
                    me.listarUsuarios();
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
          .post("usuario", {
           nombre:this.editedItem.nombre,
          email:this.editedItem.email,
          rol:this.editedItem.rol,
          password:this.editedItem.password,
          },header)
          .then(function () {
          me.listarUsuarios();
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
          .put(`usuario/${this.id}`, {
           nombre:this.editedItem.nombre,
          email:this.editedItem.email,
          rol:this.editedItem.rol,
          password:this.editedItem.password,
          },header)
          .then(function () {
          me.listarUsuarios();
          me.close();
          me.limpiar();  
           
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
this.editedItem.email=item.email
this.editedItem.password=''
this.editedItem.rol=item.rol
this.editedIndex = -1;
this.dialog=true
    },
      limpiar() {
      this.bd=""; 
      this.id=""
      this._id = "";
      this.nombre = "";
      this.password= "";
      this.rol="",
      this.email="",
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