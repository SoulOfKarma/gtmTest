import { createApp } from 'vue'
import router from './router'
import MainMascotas from './views/MainMascotas.vue'
import Persona from '@/components/Persona.vue'
import Mascota from '@/components/Mascota.vue'
import Raza from '@/components/Raza.vue'
import Familia from '@/components/Familia.vue'
import naive from 'naive-ui'

const app = createApp(MainMascotas)

app.use(router)
app.use(naive)
app.component('Persona', Persona)
app.component('Mascota', Mascota)
app.component('Raza', Raza)
app.component('Familia', Familia)

//app.mount('#app')
app.mount('#app')