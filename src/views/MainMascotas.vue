<template>
  <div>
    <n-menu mode="horizontal" :options="menuFrontal" />
    <n-space vertical>
      <n-layout has-sider>
        <n-layout-sider
          bordered
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
        >
          <n-menu
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
            @update:value="menuSeleccionado"
          />
        </n-layout-sider>
        <n-layout>
          <n-grid :cols="6" >
            <n-grid-item >
              
            </n-grid-item>
            <n-grid-item :span="4" >
              <div class="grid-items">
                <Persona v-show="isPersona" :key="keyPersona"/>
                <Mascota v-show="isMascota" :key="keyMascota"/>
                <Familia v-show="isFamilia" :key="keyFamilia"/>
                <Raza v-show="isRaza" :key="keyRaza"/>
              </div>
            </n-grid-item>
            <n-grid-item >
              <div></div>
            </n-grid-item>
          </n-grid>
        </n-layout>
      </n-layout>
  </n-space>
  </div>
</template>
<script>
import { defineComponent, h, ref } from "vue";
export default defineComponent({
  data() {
    return {
      menuOptions: [
        {
          label: "Mascotas",
          key: 1
        },
        {
          label: "Dueño",
          key: 2
        },
        {
          label: "Familia",
          key: 3
        },
        {
          label: "Raza",
          key: 4
        }
      ],
      menuFrontal:[
        {
          label:"Grupo Tus Maquinas Prueba Tecnica",
          key:"gtm"
        }
      ],
      isPersona:false,
      isMascota:true,
      isFamilia:false,
      isRaza:false,
      keyPersona:0,
      keyMascota:0,
      keyFamilia:0,
      keyRaza:0,
    };
  },
  methods:{
    isActivarMascota(){
      this.isMascota = true;
      this.isPersona = false;
      this.isFamilia = false;
      this.isRaza = false;
      this.keyMascota += 1;
    },
    isActivarPersona(){
      this.isMascota = false;
      this.isPersona = true;
      this.isFamilia = false;
      this.isRaza = false;
      this.keyPersona += 1;
    },
    isActivarFamilia(){
      this.isMascota = false;
      this.isPersona = false;
      this.isFamilia = true;
      this.isRaza = false;
      this.keyFamilia += 1;
    },
    isActivarRaza(){
      this.isMascota = false;
      this.isPersona = false;
      this.isFamilia = false;
      this.isRaza = true;
      this.keyRaza += 1;
    },
    menuSeleccionado(value){
      if(value == 1){
        this.isActivarMascota()
      }else if(value == 2){
        this.isActivarPersona()
      }else if(value == 3){
        this.isActivarFamilia()
      }else if(value == 4){
        this.isActivarRaza()
      }
    }
  }
});
</script>
<style scoped>
.grid-items {
  justify-content: center;  
  align-items: center;
  width: 100%;
  padding-top: 3%;
}
</style>