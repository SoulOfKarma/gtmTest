<template>
    <div>
      <!-- Boton Agregar Familia Nueva -->
      <n-button class="button-item" type="primary" @click="isAgregarFamilia()">Agregar Familia</n-button>
      <div>
        <n-data-table
        :columns="columns"
        :data="listaFamiliaMascota"
        :pagination="pagination"
        :bordered="false"
        />
      </div>
      <!-- Menu Agregar Familia Nueva -->
      <n-modal :z-index="1" v-model:show="cerrarAgregarFamilia" :style="{background: 'white'}">    
        <n-card
        style="width: 800px"
        title="Agregar Familia"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
        >
        <label>Nombre Familia</label>
          <n-input-group>          
            <n-input maxlength="30" placeholder="Ej. Nombre = Perro, Gato" v-model:value="descripcionFamilia" />
          </n-input-group>
          <template #footer>
            <n-button type="primary" @click="guardarFamilia()" style="width: 420px">Guardar</n-button>
          </template>        
        </n-card>  
      </n-modal>
      <!-- Menu Modificar Familia -->
      <n-modal :z-index="1" v-model:show="cerrarModificarFamilia" :style="{background: 'white'}">    
        <n-card
        style="width: 800px"
        title="Modificar Familia"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
        >
        <label>Nombre Familia</label>
          <n-input-group>          
            <n-input maxlength="30" placeholder="Ej. Nombre = Perro, Gato" v-model:value="descripcionFamilia" />
          </n-input-group>
          <template #footer>
            <n-button type="primary" @click="modificarDatosFamilia()" style="width: 420px">Guardar</n-button>
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
        cerrarAgregarFamilia: false,
        cerrarModificarFamilia: false,
        listaFamiliaMascota:[],
        idFamilia: "",
        descripcionFamilia:"",
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
            title: "Familia",
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
      async guardarFamilia(){

        if(this.descripcionFamilia.length < 3){
          Swal.fire({
            title: 'Error!',
            text: 'Descripcion muy Corta debe ser mayor a 2 por ejemplo: Pez, Intentelo nuevamente',
            icon: 'error',
            confirmButtonText: 'Ok',
            didOpen: () => {
              Swal.getPopup().style.zIndex = '2';
            }
            })
          return
        }
        
        const familia = {
          descripcionfamilia: this.descripcionFamilia
        }
  
        axios
          .post(host+"guardarFamilia",familia)
          .then((response) => {
            let isTrue = response.data
            if(isTrue){
              Swal.fire({
                title: 'Guardado',
                text: 'Familia Guardada Correctamente',
                icon: 'success',
                confirmButtonText: 'Ok',
                didOpen: () => {
                  Swal.getPopup().style.zIndex = '2';
                }
              })
              this.listarFamiliaMascota()
            }
          })
          .catch((error) => {
            Swal.fire({
                title: 'Error!',
                text: 'No se pudo Guardar la Familia, Intentelo nuevamente',
                icon: 'error',
                confirmButtonText: 'Ok',
                didOpen: () => {
                  Swal.getPopup().style.zIndex = '2';
                }
              })
            console.log(error)
          })
        
      },
      async modificarDatosFamilia(){

        if(this.descripcionFamilia.length < 3){
          Swal.fire({
            title: 'Error!',
            text: 'Descripcion muy Corta debe ser mayor a 2 por ejemplo: Pez, Intentelo nuevamente',
            icon: 'error',
            confirmButtonText: 'Ok',
            didOpen: () => {
             Swal.getPopup().style.zIndex = '2';
            }
            })
          return
        }

        const familia = {
          id: this.idFamilia,
          descripcionfamilia: this.descripcionFamilia,
        }
  
        axios
          .put(host+"modificarFamilia",familia)
          .then((response) => {
            let isTrue = response.data
            if(isTrue){
              Swal.fire({
                title: 'Guardado',
                text: 'Familia Modificada Correctamente',
                icon: 'success',
                confirmButtonText: 'Ok',
                didOpen: () => {
                  Swal.getPopup().style.zIndex = '2';
                }
              })
              this.listarFamiliaMascota()
            }
          })
          .catch((error) => {
            Swal.fire({
                title: 'Error!',
                text: 'No se pudo Modificar la Familia, Intentelo nuevamente',
                icon: 'error',
                confirmButtonText: 'Ok',
                didOpen: () => {
                  Swal.getPopup().style.zIndex = '2';
                }
              })
            console.log(error)
          })
        
      },
      async listarFamiliaMascota(){
        axios.get(host+"listaFamiliaMascota").then((response) => {     
          this.listaFamiliaMascota = response.data
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
              onClick: () => this.isModificarFamilia(mascota),
            },
            { default: () => "Modificar" }
          )
        ];
      },
      isModificarFamilia(mascota) {
        this.idFamilia = mascota.value
        this.descripcionFamilia = mascota.label
        this.cerrarModificarFamilia = true
      },
      isAgregarFamilia(){
        this.cerrarAgregarFamilia = true
        this.descripcionFamilia = ""   
      }
    },
    created(){
      setTimeout(() => {
        this.listarFamiliaMascota()
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