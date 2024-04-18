import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueDatePicker from "@vuepic/vue-datepicker";
// import buton from './components/buton.vue';


const app = createApp(App)
app.component("VueDatePicker", VueDatePicker)

app.use(router).mount("#app");


