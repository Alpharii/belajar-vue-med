import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from '@/i18n'

// use prime vue
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Sidebar from 'primevue/sidebar'
import Avatar from 'primevue/avatar'

import './assets/css/index.css'
import 'primevue/resources/themes/lara-light-green/theme.css'

const i18nInstance = i18n.setupI18n('en')
const app = createApp(App)

app.use(i18nInstance)
app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.use(ToastService)

// use required component from primevue
app.component('InputText', InputText)
app.component('PrimeButton', Button)
app.component('Sidebar', Sidebar)
app.component('Avatar', Avatar)

app.mount('#app')
