<template>
  <div>
    <!-- Boton Agregar Mascota Nueva -->
    <n-button class="button-item" type="primary" @click="isAgregarMascota()">Agregar Mascota</n-button>
    <div>
      <n-data-table
      :columns="columns"
      :data="listaMascotas"
      :pagination="pagination"
      :bordered="false"
      />
    </div>
    <!-- Menu Agregar Mascota Nueva -->
    <n-modal :z-index="1" v-model:show="cerrarAgregarMascota" :style="{background: 'white'}">    
      <n-card
      style="width: 800px"
      title="Agregar Mascota"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
      >
      <label>Seleccione Run Dueño</label>
        <n-input-group>          
          <n-space vertical style="width: 100%">
            <n-select v-model:value="runPersona" :options="listaPersonas" filterable/>
          </n-space>
        </n-input-group>
        <label>Nombre Mascota</label>
        <n-input-group>          
          <n-input maxlength="30" placeholder="Ej. Nombre = Fido" v-model:value="nombreMascota" />
        </n-input-group>
        <label>Seleccione Familia Mascota</label>
        <n-input-group>
          <n-space vertical style="width: 100%">
            <n-select v-model:value="idFamilia" :options="listaFamiliaMascota" filterable/>
          </n-space>
        </n-input-group>
        <label>Seleccione Raza Mascota</label>
        <n-input-group>
          <n-space vertical style="width: 100%">
            <n-select v-model:value="idRaza" :options="listaRazaMascota" filterable/>
          </n-space>
        </n-input-group>
        <template #footer>
          <n-button type="primary" @click="guardarMascota()" style="width: 420px">Guardar</n-button>
        </template>        
      </n-card>  
    </n-modal>
    <!-- Menu Modificar Mascota -->
    <n-modal :z-index="1" v-model:show="cerrarModificarMascota" :style="{background: 'white'}">    
      <n-card
      style="width: 800px"
      title="Modificar Mascota"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
      >
      <label>Seleccione Run Dueño</label>
        <n-input-group>          
          <n-space vertical style="width: 100%">
            <n-select v-model:value="runPersona" :options="listaPersonas" filterable/>
          </n-space>
        </n-input-group>
        <label>Nombre Mascota</label>
        <n-input-group>          
          <n-input maxlength="30" placeholder="Ej. Nombre = Fido" v-model:value="nombreMascota" />
        </n-input-group>
        <label>Seleccione Familia Mascota</label>
        <n-input-group>
          <n-space vertical style="width: 100%">
            <n-select v-model:value="idFamilia" :options="listaFamiliaMascota" filterable @update:value="cambioidFamilia(idFamilia)"/>
          </n-space>
        </n-input-group>
        <label>Seleccione Raza Mascota</label>
        <n-input-group>
          <n-space vertical style="width: 100%">
            <n-select v-model:value="idRaza" :options="listaRazaMascota" filterable @update:value="cambioidRaza(idRaza)"/>
          </n-space>
        </n-input-group>
        <template #footer>
          <n-button type="primary" @click="modificarDatosMascota()" style="width: 420px">Guardar</n-button>
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
      cerrarAgregarMascota: false,
      cerrarModificarMascota: false,
      listaPersonas: [],
      listaMascotas: [],
      listaFamiliaMascota:[],
      listaRazaMascota:[],
      runPersona: "",
      nombreMascota: "",
      idRaza: "",
      idFamilia: "",
      valueRaza: "",
      valueFamilia: "",
      idMascota:"",
      pagination:false,
      columns: [
        {
          title: "Rut Dueño",
          key: "runpersona"
        },
        {
          title: "Nombre y Apellido Dueño",
          key:"nombre"
        },
        {
          title: "Nombre Mascota",
          key: "nombremascota"
        },
        {
          title: "Familia",
          key: "descripcionfamilia"
        },
        {
          title: "Raza",
          key: "descripcionraza"
        },        
        {
          title: "Opciones",
          key: "actions",
          render: this.renderColumnaBoton,
        }
      ]
    }
  },
  methods: {
    async guardarMascota(){

      if(this.runPersona.length < 10||this.nombreMascota.length < 3||this.idFamilia == ""||this.idFamilia == null||this.idRaza == ""||this.idRaza == null){
        Swal.fire({
            title: 'Error!',
            text: 'Verifique que los campos o selecciones no esten vacios o sin datos, debe escribir por ejemplo: Pia, Intentelo nuevamente',
            icon: 'error',
            confirmButtonText: 'Ok',
            didOpen: () => {
             Swal.getPopup().style.zIndex = '2';
            }
          })
          return
      }

      const mascota = {
        runpersona: this.runPersona,
        nombremascota: this.nombreMascota,
        idfamilia: this.idFamilia,
        idraza: this.idRaza
      }

      axios
        .post(host+"guardarMascota",mascota)
        .then((response) => {
          let isTrue = response.data
          if(isTrue){
            Swal.fire({
              title: 'Guardado',
              text: 'Mascota Guardada Correctamente',
              icon: 'success',
              confirmButtonText: 'Ok',
              didOpen: () => {
              Swal.getPopup().style.zIndex = '2';
              }
            })
            this.listarMascotas()
          }
        })
        .catch((error) => {
          Swal.fire({
              title: 'Error!',
              text: 'No se pudo Guardar la Mascota, Intentelo nuevamente',
              icon: 'error',
              confirmButtonText: 'Ok',
              didOpen: () => {
              Swal.getPopup().style.zIndex = '2';
              }
            })
          console.log(error)
        })
      
    },
    async modificarDatosMascota(){

      if(this.runPersona.length < 10||this.nombreMascota.length < 3||this.idFamilia == ""||this.idFamilia == null||this.idRaza == ""||this.idRaza == null){
        Swal.fire({
            title: 'Error!',
            text: 'Verifique que los campos o selecciones no esten vacios o sin datos, debe escribir por ejemplo: Pia, Intentelo nuevamente',
            icon: 'error',
            confirmButtonText: 'Ok',
            didOpen: () => {
             Swal.getPopup().style.zIndex = '2';
            }
          })
          return
      }

      const mascota = {
        id: this.idMascota,
        runpersona: this.runPersona,
        nombremascota: this.nombreMascota,
        idfamilia: this.valueFamilia,
        idraza: this.valueRaza
      }

      axios
        .put(host+"modificarMascota",mascota)
        .then((response) => {
          let isTrue = response.data
          if(isTrue){
            Swal.fire({
              title: 'Guardado',
              text: 'Mascota Modificada Correctamente',
              icon: 'success',
              confirmButtonText: 'Ok',
              didOpen: () => {
              Swal.getPopup().style.zIndex = '2';
              }
            })
            this.listarMascotas()
          }
        })
        .catch((error) => {
          Swal.fire({
              title: 'Error!',
              text: 'No se pudo Modificar la Mascota, Intentelo nuevamente',
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
      axios.get(host+"listaPersonasSelect").then((response) => {
        this.listaPersonas = response.data      
      })
    },
    async listarMascotas(){
      axios.get(host+"listaMascotas").then((response) => {
        this.listaMascotas = response.data 
      })
    },
    async listarFamiliaMascota(){
      axios.get(host+"listaFamiliaMascota").then((response) => {
        this.listaFamiliaMascota = response.data       
      })
    },
    async listarRazaMascota(){
      axios.get(host+"listaRazaMascota").then((response) => {
        this.listaRazaMascota = response.data     
      })
    },
    cambioidFamilia(idFamilia){
      this.valueFamilia = idFamilia
    },
    cambioidRaza(idRaza){
      this.valueRaza = idRaza
    },
    renderColumnaBoton(mascota) {
      return [
        h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: "small",
            onClick: () => this.isModificarMascota(mascota),
          },
          { default: () => "Modificar" }
        )
      ];
    },
    isModificarMascota(mascota) {
      this.runPersona = mascota.runpersona
      this.nombreMascota = mascota.nombremascota
      this.valueFamilia = mascota.idfamilia
      this.valueRaza = mascota.idraza
      this.idFamilia = mascota.descripcionfamilia
      this.idRaza = mascota.descripcionraza
      this.idMascota = mascota.id
      this.cerrarModificarMascota = true
    },
    isAgregarMascota(){
      this.cerrarAgregarMascota = true
      this.runPersona = ""
      this.nombreMascota = ""
      this.idFamilia = ""
      this.idRaza = ""   
    }
  },
  created(){
    setTimeout(() => {
      this.listarPersonas()
    }, 1000);
    setTimeout(() => {
      this.listarFamiliaMascota()
    }, 1000);
    setTimeout(() => {
      this.listarRazaMascota()
    }, 1000);
    setTimeout(() => {
      this.listarMascotas()
    }, 1000);
    
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