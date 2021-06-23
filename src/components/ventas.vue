<template>

     <v-data-table
    :headers="headers"
    :items="Ventas"
    sort-by="calories"
    class="elevation-1"
    :search="search"
    dark
    
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Ventas <br><v-btn
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
          max-width="2000px"
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
              NUEVA VENTA         </v-btn>
          </template>
          <v-card>
            <v-card-title >
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

           
              <v-container>

                <v-row>
                   <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                     <v-select
                      v-model="editedItem.usuario"
                      :items="usuarios"
                      label="Usuarios"
                    >
                    </v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="10"
                    md="4"
                  >
                  <v-select
                      v-model="editedItem.tipoComprobante"
                      :items="comprovante"
                      label="Tipo de Comprobante"
                    >
                    </v-select>
                  </v-col>
                  
                    <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <v-text-field
                      v-model="editedItem.serieComprobante"
                      label="Serie Comprobante"
                  ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <v-text-field
                      v-model="editedItem.numeroComprobante"
                      label="Numero comprobante"
                  ></v-text-field>
                  </v-col>
                     <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  
                  <v-text-field
                      v-model="editedItem.impuesto"
                      label="Impuesto"
                  ></v-text-field>
                  </v-col>
                     <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <v-text-field
                      v-model="editedItem.total"
                      label="Total"
                  ></v-text-field>
                  </v-col>
                   <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                     <v-select
                      v-model="editedItem.persona"
                      :items="cliente"
                      label="Cliente"
                    >
                    </v-select>
                  </v-col>
                    <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
               
   <template>
  <div class="text-center">
    <v-dialog
    dark
      v-model="dialog1"
      width="1500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
         Articulos
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 dark lighten-2">
          Selecione sus Articulos
        </v-card-title>

      <template>
  <v-data-table
    v-model="selected"
    :headers="headers1"
    :items="articulos"
    :single-select="singleSelect"
    item-key="_id"
    show-select
    class="elevation-1"
  >
    <template v-slot:top>
      <v-switch
        v-model="singleSelect"
        label="Selecionar un solo Articulo"
        class="pa-3"
      ></v-switch>
    </template>
  </v-data-table>
</template>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            
            @click="dialog1 = false"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
                  </v-col> 
                
                </v-row>
  
<template>
<v-title class="text-h5 dark lighten-2">
         Detalles de la venta
        </v-title>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      >
      </v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers3"
      :items="selected"
      :search="search"
    ></v-data-table>
  </v-card>
</template>
              </v-container>
           

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
                @click="save()"
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
      
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-format-list-bulleted-square</v-icon>
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
            singleSelect: false,
            selected: [],
            usuarios:[],
            search:"",
            dialog1: false,
            dialog: false,
            dialogDelete: false,
            Ventas:[],
            comprovante:['FACTURA','NOTA DEVITO','NOTA CREDITO'],
            cliente:[],
            articulos:[],
          usuario:'',
        persona: '',
        tipoComprobante:'',
        serieComprobante:'',
        numeroComprobante:'',
        detalle:[],
        impuesto:'',
        total:'',
           
            headers1: [
            {
            text: 'id',
            align: 'start',
            sortable: false,
            value: '_id',
          },  
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

      
      
      ], headers3: [
        {
          text: '_id',
         
            value: '_id',
          },
        {
          text: 'Articulo',
          align: 'start',
          sortable: false,
          value: 'articulo',
        },
       
        { text: 'Precio',
         value: 'precio'
        },

           { text: 'Descuento',
         value: 'descuento'
        }, {
          text:'Cantidad',
         value:'cantidad'

        },
        {
          text:'Sub Total',
          // llenar
          value:'total'

        },
     
     
      ], 
                
        headers: [
        {
          text: 'Usuario',
          align: 'start',
          sortable: false,
          value: 'usuario.rol',
        },
        { text: 'Persona', value: 'persona.tipoPersona' },
        { text: 'Tipo de Comprobante ', value: 'tipoComprobante' },
        { text: 'Serie de Comprobante ', value: 'serieComprobante' },
        { text: 'Numero de Comprobante ', value: 'numeroComprobante' },
        { text: 'Total', value: 'total' },
        { text: 'Impuesto', value: 'impuesto' },
        { text: 'Estado', value: 'estado' },
        {text:'Opciones',value:'opciones',sortable:false}
      
      ], 
      editedItem: {
        usuario:'',
        persona: '',
        tipoComprobante:'',
        serieComprobante:'',
        numeroComprobante:'',
        impuesto:'',
        total:'',
        selected:[],
        detalle:[]
      
    
       
        
      },
            }

        }, 
        created() {
          this.selcionarArticulo();
            this.listarVentas();
            this.selecionarCliente();
            this. selecinarUsuarios();
        },
        methods: {
          crearPDF() {
      var columns = [
        { title: 'Usuario', dataKey: 'usuario' },
        { title: 'Persona', dataKey: 'persona' },
        { title: 'Tipo de Comprobante ', dataKey: 'tipoComprobante' },
        { title: 'Serie de Comprobante ', dataKey: 'serieComprobante' },
        { title: 'Numero de Comprobante ', dataKey: 'numeroComprobante' },
        { title: 'Total', dataKey: 'total' },
        { title: 'Impuesto', dataKey: 'impuesto' },
        { title: 'articulo', dataKey: 'detalles' },
        { title: 'Estado', dataKey: 'estado' },
       
      ];
      var rows = [];

      this.Ventas.map(function (x) {
        rows.push({
        
        usuario:x.usuario.rol,
        persona: x.persona.tipoPersona,
        tipoComprobante:x.tipoComprobante,
        serieComprobante:x.serieComprobante,
        numeroComprobante:x.numeroComprobante,
        impuesto:x.impuesto,
        total:x.total,
        estado: x.estado,
        detalles:x.detalles.articulo

        });
      });
      var doc = new jsPDF("p","pt");
      doc.autoTable(columns, rows, {
        margin: { top: 60 },
        addPageContent: function () {
          doc.text("Lista de Ventas", 40, 30);
        },
      });

      doc.save("Ventas.pdf");
    },
          selecinarUsuarios() {
            let arrayUsuarios=[]
            let me =this 
                  let header = {headers :{"token": this.$store.state.token}};
                  axios.get("usuario",header)
                  .then((response)=>{
                      
                      arrayUsuarios=response.data.usuarios
                       arrayUsuarios.map(function (x) {
                     me.usuarios.push({ text:x.nombre , value:x._id });
                     });


                  })
                  .catch((error)=>{
                      console.log(error.response)
                  });

          
              },
           selecionarCliente() {
             let me = this
             let clienteArray = [];
                  let header = {headers :{"token": this.$store.state.token}};
                  axios.get("persona/listCliente/?value=CLIENTE",header)
                  .then((response)=>{
                    clienteArray = response.data.persona;
                      clienteArray.map(function (x) {
                     me.cliente.push({ text:x.nombre , value:x._id });
                     
                     });
                       
                  })
                  .catch((error)=>{
                      console.log(error.response)
                  });

          
              },selcionarArticulo(){
                let me =this
               
                  let header = {headers :{"token": this.$store.state.token}};
                  axios.get("articulo",header)
                  .then((response)=>{
                    me.articulos=response.data.articulos
                     
                   
                  })
                  .catch((error)=>{
                      console.log(error.response)
                  });
              },
              listarVentas() {
                  let header = {headers :{"token": this.$store.state.token}};
                  axios.get("Venta",header)
                  .then((response)=>{
                      console.log(response.data.ventas.usuario)
                      this.Ventas=response.data.ventas
                      this.detalle=response.data.ventas.detalles
                      this.detalle.map(function(x){
                        this.selected.push({nombre:x.articulo,precioventa:x.precio})
                      })
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
                  axios.put(`venta/desactivar/${id}`,{estado:0},header) 
                  .then(function() {
                    me.listarVentas();
                  }) 
                  .catch(function (error){
                    console.log(error)
                  })
                }else if (accion==1) {
                  let me=this
                  let header = {headers :{"token": this.$store.state.token}};
                  axios.put(`venta/activar/${id}`,{estado:1},header) 
                  .then(function() {
                    me.listarVentas();
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
    if (this.bd==0) {
         let me = this
    let arrayventas=this.selected
    arrayventas.map(function (x) {
                     me.detalles.push({ _id:x._id ,articulo:x.nombre,precio:x.precioventa });
                     });
        console.log(this.detalles) 
                   

  let header={headers:{"token":this.$store.state.token}}  
        axios
          .post("venta", {
        usuario:this.usuario,
        persona:this.persona,
        tipoComprobante:this.tipoComprobante,
        serieComprobante:this.serieComprobante,
        numeroComprobante:this.numeroComprobante,
        // detalles:this.detalles,
        impuesto:this.impuesto,
        total:this.total

          },header)
          console.log(this.usuario) 
          .then(function () {
           me.limpiar();
            me.close();
            me.listarVentas();
          })
          .catch(function (error) {
            console.log(error.msg);
          }); 
    }else{
 this.editedItem()
    }


    
     },
     editItem(item){
       this.bd=1
        this.editedItem.usuario=item.usuario._id,
        this.editedItem.persona=item.persona._id,
        this.editedItem.tipoComprobante=item.tipoComprobante,
        this.editedItem.serieComprobante=item.serieComprobante,
        this.editedItem.numeroComprobante=item.numeroComprobante,
        this.editedItem.impuesto=item.impuesto,
        this.editedItem.total=item.total
        this.editedItem.detalle=item.detalle
   
this.dialog=true

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