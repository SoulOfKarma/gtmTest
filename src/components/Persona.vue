<template>
  <div>
    <!-- Boton Agregar Dueño Nuevo -->
    <n-button class="button-item" type="primary" @click="isAgregarPersona()">Agregar Dueño</n-button>
    <div>
      <n-data-table
      :columns="columns"
      :data="listaPersonas"
      :pagination="pagination"
      :bordered="false"
      />
    </div>
    <!-- Menu Agregar Dueño Nuevo -->
    <n-modal :z-index="1" v-model:show="cerrarAgregarPersona" :style="{background: 'white'}">    
      <n-card
      style="width: 800px"
      title="Agregar Dueño"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
      >
        <label>Run</label>
        <n-space vertical>      
          <n-input v-on:blur="formatear_run" maxlength="13" placeholder="Ej. Run = 18499714-2" v-model:value="run" />
          <span style="font-size: 10px; color: red; margin-left: 10px;" v-if="val_run">Rut incorrecto</span>
        </n-space>
        <label>Nombre</label>
        <n-input-group>          
          <n-input maxlength="30" placeholder="Ej. Nombre = Ricardo" v-model:value="nombre" />
        </n-input-group>
        <label>Apellido</label>
        <n-input-group>
          <n-input maxlength="30" placeholder="Ej. Apellido = Soto" v-model:value="apellido" />
        </n-input-group>
        <label>Telefono</label>
        <n-input-group>
          <n-input maxlength="30" placeholder="Ej. Telefono = 995875633" v-model:value="telefono" />
        </n-input-group>
        <label>Correo</label>
        <n-input-group>
          <n-input maxlength="60" placeholder="Ej. Correo = gomez.soto.ricardo@gmail.com" v-model:value="correo" />
        </n-input-group>
        <template #footer>
          <n-button type="primary" @click="guardarPersona()" style="width: 420px">Guardar</n-button>
        </template>        
      </n-card>  
    </n-modal>
    <!-- Menu Modificar Dueño Existente -->
    <n-modal :z-index="1" v-model:show="cerrarModificarPersona" :style="{background: 'white'}">    
      <n-card
      style="width: 800px"
      title="Modificar Dueño"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
      >
      <label>Run</label>
        <n-input-group>          
          <n-input maxlength="13" disabled placeholder="Ej. Run = 18499714-2" v-model:value="run" />
        </n-input-group>
        <label>Nombre</label>
        <n-input-group>          
          <n-input maxlength="30" placeholder="Ej. Nombre = Ricardo" v-model:value="nombre" />
        </n-input-group>
        <label>Apellido</label>
        <n-input-group>
          <n-input maxlength="30" placeholder="Ej. Apellido = Soto" v-model:value="apellido" />
        </n-input-group>
        <label>Telefono</label>
        <n-input-group>
          <n-input maxlength="30" placeholder="Ej. Telefono = 995875633" v-model:value="telefono" />
        </n-input-group>
        <label>Correo</label>
        <n-input-group>
          <n-input maxlength="60" placeholder="Ej. Correo = gomez.soto.ricardo@gmail.com" v-model:value="correo" />
        </n-input-group>
        <template #footer>
          <n-button type="primary" @click="modificarDatosPersona()" style="width: 420px">Guardar</n-button>
        </template>
      </n-card>  
    </n-modal>
    <!-- Menu Desactivar Dueño Existente -->
    <n-modal v-model:show="cerrarDesactivarPersona" :style="{background: 'white'}">    
      <n-card
      style="width: 800px"
      title="Desactivar/Activar Dueño"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
      >
        <template #footer>
          <n-button class="button-item-activar" type="primary" @click="activarDatosPersona()" >Activar</n-button>
          <n-button class="button-item-desactivar" type="primary" @click="desactivarDatosPersona()" >Desactivar</n-button>
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
import { validate, clean, format } from "rut.js";
const host = import.meta.env.VITE_API
export default {
  data() {
    return {
      cerrarAgregarPersona: false,
      cerrarModificarPersona: false,
      cerrarDesactivarPersona: false,
      listaPersonas: [],
      run: "",
      nombre: "",
      apellido: "",
      telefono: "",
      correo: "",
      estado: 1,
      val_run: false,
      pagination: {
        pageSize: 10
      },
      columns: [
        {
          title: "Rut Dueño",
          key: "run"
        },
        {
          title: "Nombre",
          key: "nombre"
        },
        {
          title: "Apellido",
          key: "apellido"
        },
        {
          title: "Telefono",
          key: "telefono"
        },
        {
          title: "Correo",
          key: "correo"
        },
        {
          title: "Opciones",
          key: "actions",
          render: this.renderColumnaBoton,
        }
      ]
    }
  },
  methods:{
    async guardarPersona(){

      if(this.run.length < 10||this.nombre.length < 3||this.apellido.length < 3||this.correo < 5||this.telefono < 8){
        Swal.fire({
            title: 'Error!',
            text: 'Verifique que los campos no sean menor a 3 por ejemplo: Pia, Intentelo nuevamente',
            icon: 'error',
            confirmButtonText: 'Ok',
            didOpen: () => {
             Swal.getPopup().style.zIndex = '2';
            }
          })
          return
      }

      if(!validate(this.run)){
        Swal.fire({
            title: 'Error!',
            text: 'Verifique el Rut ingresado por ejemplo: 18499714-2, Intentelo nuevamente',
            icon: 'error',
            confirmButtonText: 'Ok',
            didOpen: () => {
             Swal.getPopup().style.zIndex = '2';
            }
          })
          return
      }

      let isRun = true

      this.listaPersonas.forEach((persona) => {
        if (persona.run == this.run) {
          isRun = false
        }
      });

      if(isRun == false){
        Swal.fire({
            title: 'Error!',
            text: 'El Rut ingresado ya existe, debe ingresar otro, por ejemplo: 18499714-2, Intentelo nuevamente',
            icon: 'error',
            confirmButtonText: 'Ok',
            didOpen: () => {
             Swal.getPopup().style.zIndex = '2';
            }
          })
          return
      }

      const persona = {
        run: this.run,
        nombre: this.nombre,
        apellido: this.apellido,
        telefono: this.telefono,
        correo: this.correo,
        estadopersona: 1
      } 
      axios
        .post(host+"guardarPersona",persona)
        .then((response) => {
          let isTrue = response.data
          if(isTrue){
            Swal.fire({
              title: 'Guardado',
              text: 'Dueño Guardado Correctamente',
              icon: 'success',
              confirmButtonText: 'Ok',
              didOpen: () => {
              Swal.getPopup().style.zIndex = '2';
              }
            })
          }
          this.listarPersonas()
        })
        .catch((error) => {
          Swal.fire({
              title: 'Error!',
              text: 'No se pudo Guardar al Dueño, Intentelo nuevamente',
              icon: 'error',
              confirmButtonText: 'Ok',
              didOpen: () => {
              Swal.getPopup().style.zIndex = '2';
              }
            })
          console.log(error)
        })
    },
    async listarPersonas(){
      axios.get(host+"listaPersonas").then((response) => {
        this.listaPersonas = response.data      
      })
    },
    async modificarDatosPersona(){

      if(this.run.length < 10||this.nombre.length < 3||this.apellido.length < 3||this.correo < 5||this.telefono < 8){
        Swal.fire({
            title: 'Error!',
            text: 'Verifique que los campos no sean menor a 3 por ejemplo: Pia, Intentelo nuevamente',
            icon: 'error',
            confirmButtonText: 'Ok',
            didOpen: () => {
             Swal.getPopup().style.zIndex = '2';
            }
          })
          return
      }

      const persona = {
        run: this.run,
        nombre: this.nombre,
        apellido: this.apellido,
        telefono: this.telefono,
        correo: this.correo,
        estadopersona: 1
      } 
      axios
        .put(host+"modificarPersona",persona)
        .then((response) => {
          let isTrue = response.data
          if(isTrue){
            Swal.fire({
              title: 'Guardado',
              text: 'Dueño Modificado Correctamente',
              icon: 'success',
              confirmButtonText: 'Ok',
              didOpen: () => {
              Swal.getPopup().style.zIndex = '2';
              }
            })
          }
          this.listarPersonas()
        })
        .catch((error) => {
          Swal.fire({
              title: 'Error!',
              text: 'No se pudo Modificar al Dueño, Intente nuevamente',
              icon: 'error',
              confirmButtonText: 'Ok',
              didOpen: () => {
              Swal.getPopup().style.zIndex = '2';
              }
            })
          console.log(error)
        })
    },
    async desactivarDatosPersona(){
      const persona = {
        run: this.run,
        nombre: this.nombre,
        apellido: this.apellido,
        telefono: this.telefono,
        correo: this.correo,
        estadoPersona: 2
      } 
      axios
        .put(host+"activarDesactivarPersona",persona)
        .then((response) => {
          let isTrue = response.data
          if(isTrue){
            Swal.fire({
              title: 'Guardado',
              text: 'Dueño Desactivado Correctamente',
              icon: 'success',
              confirmButtonText: 'Ok',
              didOpen: () => {
              Swal.getPopup().style.zIndex = '2';
              }
            })
            this.listarPersonas()
          }
        })
        .catch((error) => {
          Swal.fire({
              title: 'Error!',
              text: 'No se pudo Desactivar al Dueño, Intente nuevamente',
              icon: 'error',
              confirmButtonText: 'Ok',
              didOpen: () => {
              Swal.getPopup().style.zIndex = '2';
              }
            })
          console.log(error)
        })
    },
    async activarDatosPersona(){
      const persona = {
        run: this.run,
        nombre: this.nombre,
        apellido: this.apellido,
        telefono: this.telefono,
        correo: this.correo,
        estadoPersona: 1
      } 
      axios
        .put(host+"activarDesactivarPersona",persona)
        .then((response) => {
          let isTrue = response.data
          if(isTrue){
            Swal.fire({
              title: 'Guardado',
              text: 'Dueño Activado Correctamente',
              icon: 'success',
              confirmButtonText: 'Ok',
              didOpen: () => {
              Swal.getPopup().style.zIndex = '2';
              }
            })
            this.listarPersonas()
          }
        })
        .catch((error) => {
          Swal.fire({
              title: 'Error!',
              text: 'No se pudo Activar al Dueño, Intente nuevamente',
              icon: 'error',
              confirmButtonText: 'Ok',
              didOpen: () => {
              Swal.getPopup().style.zIndex = '2';
              }
            })
          console.log(error)
        })
    },
    renderColumnaBoton(persona) {
      return [
        h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: "small",
            onClick: () => this.isModificarPersona(persona),
            style: {
            marginRight: "8px",
          },
          },
          { default: () => "Modificar" }
        ),
        h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: "small",
            onClick: () => this.isActivarDesactivarPersona(persona),
          },
          { default: () => "Activar/Desactivar" }
        ),
      ];
    },
    isModificarPersona(persona) {
      this.run = persona.run
      this.nombre = persona.nombre
      this.apellido = persona.apellido
      this.telefono = persona.telefono
      this.correo = persona.correo
      this.cerrarModificarPersona = true
    },
    isActivarDesactivarPersona(persona) {
      this.run = persona.run
      this.nombre = persona.nombre
      this.apellido = persona.apellido
      this.telefono = persona.telefono
      this.correo = persona.correo
      this.cerrarDesactivarPersona = true
    },
    isAgregarPersona(){
      this.cerrarAgregarPersona = true
      this.run = ""
      this.nombre = ""
      this.apellido = ""
      this.telefono = ""
      this.correo = ""     
    },
    formatear_run() {
      this.run = format(this.run);
      this.val_run = !validate(this.run);
    },
  },
  created(){
    setTimeout(() => {
       this.listarPersonas()
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

.button-item-activar{
  width: 49%;
  margin-right: 5px;
  align-items: center;
}

.button-item-desactivar{
  width: 49%;
  align-items: center;
}
</style>