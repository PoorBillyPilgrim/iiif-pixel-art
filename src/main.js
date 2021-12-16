import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(VueRouter)
Vue.use(Buefy)

Vue.config.productionTip = false

// Global Variables
Vue.prototype.$aic_website = 'https://www.artic.edu/artworks/'
Vue.prototype.$api_url = 'https://api.artic.edu/api/v1/'
Vue.prototype.$iiif_url = 'https://www.artic.edu/iiif/2/'
Vue.prototype.$image_full_size = '/full/1686,/0/default.jpg'
Vue.prototype.$image_thumbnail = '/full/400,/0/default.jpg'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About}
]

const router = new VueRouter({ routes })

new Vue({
  render: h => h(App), // details on how to register routes within App: https://stackoverflow.com/questions/47431867/vue-router-how-to-persist-navbar
  router
}).$mount('#app')
