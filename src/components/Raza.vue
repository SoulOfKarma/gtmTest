<template>
    <div>
      <!-- Boton Agregar Raza Nueva -->
      <n-button class="button-item" type="primary" @click="isAgregarRaza()">Agregar Raza</n-button>
      <div>
        <n-data-table
        :columns="columns"
        :data="listaRazaMascota"
        :pagination="pagination"
        :bordered="false"
        />
      </div>
      <!-- Menu Agregar Raza Nueva -->
      <n-modal :z-index="1" v-model:show="cerrarAgregarRaza" :style="{background: 'white'}">    
        <n-card
        style="width: 800px"
        title="Agregar Raza"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
        >
        <label>Nombre Raza</label>
          <n-input-group>          
            <n-input maxlength="30" placeholder="Ej. Nombre = Terrier,Bulldog" v-model:value="descripcionRaza" />
          </n-input-group>
          <template #footer>
            <n-button type="primary" @click="guardarRaza()" style="width: 420px">Guardar</n-button>
          </template>        
        </n-card>  
      </n-modal>
      <!-- Menu Modificar Raza -->
      <n-modal :z-index="1" v-model:show="cerrarModificarRaza" :style="{background: 'white'}">    
        <n-card
        style="width: 800px"
        title="Modificar Raza"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
        >
        <label>Nombre Raza</label>
          <n-input-group>          
            <n-input maxlength="30" placeholder="Ej. Nombre = Terrier,Bulldog" v-model:value="descripcionRaza" />
          </n-input-group>
          <template #footer>
            <n-button type="primary" @click="modificarDatosRaza()" style="width: 420px">Guardar</n-button>
          </template>        
        </n-card>  
      </n-modal>
    </div>
  </template>
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import { h } from "vue";
  import { NButton } from "naive-ui";
  const host = import.meta.env.VITE_API
  export default {
    data() {
      return {
        cerrarAgregarRaza: false,
        cerrarModificarRaza: false,
        listaRazaMascota:[],
        idRaza: "",
        descripcionRaza:"",
        pagination: {
          pageSize: 10
        },
        columns: [
          {
            title: "ID",
            key: "value",
            minWidth: 100,
            maxWidth: 150
          },
          {
            title: "Raza",
            key: "label",
            minWidth: 150,
            maxWidth: 200
          },       
          {
            title: "Opciones",
            key: "actions",
            render: this.renderColumnaBoton,
            minWidth: 100,
            maxWidth: 150
          }
        ]
      }
    },
    methods: {
      async guardarRaza(){

        if(this.descripcionRaza.length < 3){
          Swal.fire({
            title: 'Error!',
            text: 'Descripcion muy Corta debe ser mayor a 2 por ejemplo: Pug, Intentelo nuevamente',
            icon: 'error',
            confirmButtonText: 'Ok',
            didOpen: () => {
             Swal.getPopup().style.zIndex = '2';
            }
          })
          return
        }

        const raza = {
          descripcionraza: this.descripcionRaza
        }
  
        axios
          .post(host+"guardarRaza",raza)
          .then((response) => {
            let isTrue = response.data
            if(isTrue){
              Swal.fire({
                title: 'Guardado',
                text: 'Raza Guardada Correctamente',
                icon: 'success',
                confirmButtonText: 'Ok',
                didOpen: () => {
                    Swal.getPopup().style.zIndex = '2';
                }
              })
              this.listarRazaMascota()
            }
          })
          .catch((error) => {
            Swal.fire({
                title: 'Error!',
                text: 'No se pudo Guardar la Raza, Intentelo nuevamente',
                icon: 'error',
                confirmButtonText: 'Ok',
                didOpen: () => {
                    Swal.getPopup().style.zIndex = '2';
                }
              })
            console.log(error)
          })
        
      },
      async modificarDatosRaza(){

        if(this.descripcionRaza.length < 3){
          Swal.fire({
            title: 'Error!',
            text: 'Descripcion muy Corta debe ser mayor a 2 por ejemplo: Pug, Intentelo nuevamente',
            icon: 'error',
            confirmButtonText: 'Ok',
            didOpen: () => {
             Swal.getPopup().style.zIndex = '2';
            }
            })
          return
        }

        const raza = {
          id: this.idRaza,
          descripcionraza: this.descripcionRaza,
        }
  
        axios
          .put(host+"modificarRaza",raza)
          .then((response) => {
            let isTrue = response.data
            if(isTrue){
              Swal.fire({
                title: 'Guardado',
                text: 'Raza Modificada Correctamente',
                icon: 'success',
                confirmButtonText: 'Ok',
                didOpen: () => {
                    Swal.getPopup().style.zIndex = '2';
                }
              })
              this.listarRazaMascota()
            }
          })
          .catch((error) => {
            Swal.fire({
                title: 'Error!',
                text: 'No se pudo Modificar la Raza, Intentelo nuevamente',
                icon: 'error',
                confirmButtonText: 'Ok',
                didOpen: () => {
                    Swal.getPopup().style.zIndex = '2';
                }
              })
            console.log(error)
          })
        
      },
      async listarRazaMascota(){
        axios.get(host+"listaRazaMascota").then((response) => {
          this.listaRazaMascota = response.data         
        })
    },
      renderColumnaBoton(mascota) {
        return [
          h(
            NButton,
            {
              strong: true,
              tertiary: true,
              size: "small",
              onClick: () => this.isModificarRaza(mascota),
            },
            { default: () => "Modificar" }
          )
        ];
      },
      isModificarRaza(mascota) {
        this.idRaza = mascota.value
        this.descripcionRaza = mascota.label
        this.cerrarModificarRaza = true
      },
      isAgregarRaza(){
        this.cerrarAgregarRaza = true
        this.descripcionRaza = ""   
      }
    },
    created(){
      setTimeout(() => {
        this.listarRazaMascota()
    }, 2000);
      
    }
  }
  </script>
  <style scoped>
  .n-card {
    max-width: 500px;
  }
  .modal-container {
    display: flex;
    height: 300px;
    border: 1px solid black;
    max-width: 1000px;
  }
  
  .button-item{
    justify-content: center;  
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
  }
  
  </style>