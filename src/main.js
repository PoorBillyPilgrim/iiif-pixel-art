import Vue from 'vue'
import App from './App.vue'
// add Buefy and Bulma
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

Vue.config.productionTip = false

// Global Variables
Vue.prototype.$aic_website = "https://www.artic.edu/artworks/"
Vue.prototype.$api_url = "https://api.artic.edu/api/v1/"
Vue.prototype.$iiif_url = "https://www.artic.edu/iiif/2/"
Vue.prototype.$image_full_size = "/full/843,/0/default.jpg"
Vue.prototype.$image_thumbnail = "/full/400,/0/default.jpg"

new Vue({
  render: h => h(App),
}).$mount('#app')
