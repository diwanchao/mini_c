// #ifdef MP-WEIXIN
import uma from './uma';
// #endif
import Vue from 'vue'
import App from './App'
 
// Vue.prototype.$store = store
Vue.config.productionTip = false

//import pageHead from './components/page-head.vue'
import hexMD5 from './common/plugin/build/md5.min.js'
import hxNavbar from "./components/hx-navbar/hx-navbar"
Vue.component('hx-navbar',hxNavbar)
Vue.config.productionTip = false
// #ifdef MP-WEIXIN
Vue.use(uma);
// #endif

//Vue.component('page-head',pageHead)

App.mpType = 'app'

const app = new Vue({
    ...App
})

var getSignStr = function (obj) {
  var pdata_param = {
    appid: 'PSSHOP',
  };
  for (var i in obj) {
    //console.info(i, obj[i]);
    pdata_param[i] = encodeURI((obj[i]));
  }
  //console.info(pdata_param);
  var objKeys = Object.keys(pdata_param);
  objKeys = objKeys.sort();//这里写所需要的规则
  //console.info(objKeys);
  var param_str = '';
  for (var z = 0; z < objKeys.length; z++) {
    if (z > 0) {
      param_str += '&';
    }
    param_str += objKeys[z] + "=" + ((pdata_param[objKeys[z]]));
  }
  param_str += 'POWIEU8823A0AS879SA27';//key
  //console.info('客参字串', param_str);
  var sign_str = hexMD5(param_str).toUpperCase();
  pdata_param.sign = sign_str;
  //console.info(param_str, sign_str, pdata_param);
  return pdata_param;
}

var websiteUrl = "https://div.buy315.com.cn/";
export default {
    websiteUrl,
	getSignStr,
}
app.$mount()