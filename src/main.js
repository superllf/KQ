import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant,{Lazyload} from 'vant';
import 'vant/lib/index.css';
import 'Base/css/base.less'
import 'Base/css/vant.less'
import 'Base/css/icon/iconfont.css'
// import vConsole from 'vconsole'
// let vConsole= new vConsole();

Vue.use(Vant);
Vue.use(Lazyload);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
