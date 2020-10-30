(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/home/classgoods"],{

/***/ 0:
/*!***************************************************************!*\
  !*** C:/Users/Administrator/Desktop/MC/applets/ceshi/main.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createApp) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;__webpack_require__(/*! uni-pages */ 4);__webpack_require__(/*! @dcloudio/uni-stat */ 5);
var _uma = _interopRequireDefault(__webpack_require__(/*! ./uma */ 9));

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _App = _interopRequireDefault(__webpack_require__(/*! ./App */ 11));





var _md5Min = _interopRequireDefault(__webpack_require__(/*! ./common/plugin/build/md5.min.js */ 17));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} // Vue.prototype.$store = store
_vue.default.config.productionTip = false; //import pageHead from './components/page-head.vue'
var hxNavbar = function hxNavbar() {__webpack_require__.e(/*! require.ensure | components/hx-navbar/hx-navbar */ "components/hx-navbar/hx-navbar").then((function () {return resolve(__webpack_require__(/*! ./components/hx-navbar/hx-navbar */ 722));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};_vue.default.component('hx-navbar', hxNavbar);
_vue.default.config.productionTip = false;

_vue.default.use(_uma.default);


//Vue.component('page-head',pageHead)

_App.default.mpType = 'app';

var app = new _vue.default(_objectSpread({},
_App.default));


var getSignStr = function getSignStr(obj) {
  var pdata_param = {
    appid: 'PSSHOP' };

  for (var i in obj) {
    //console.info(i, obj[i]);
    pdata_param[i] = encodeURI(obj[i]);
  }
  //console.info(pdata_param);
  var objKeys = Object.keys(pdata_param);
  objKeys = objKeys.sort(); //����д����Ҫ�Ĺ���
  //console.info(objKeys);
  var param_str = '';
  for (var z = 0; z < objKeys.length; z++) {
    if (z > 0) {
      param_str += '&';
    }
    param_str += objKeys[z] + "=" + pdata_param[objKeys[z]];
  }
  param_str += 'POWIEU8823A0AS879SA27'; //key
  //console.info('�Ͳ��ִ�', param_str);
  var sign_str = (0, _md5Min.default)(param_str).toUpperCase();
  pdata_param.sign = sign_str;
  //console.info(param_str, sign_str, pdata_param);
  return pdata_param;
};

var websiteUrl = "https://div.buy315.com.cn/";var _default =
{
  websiteUrl: websiteUrl,
  getSignStr: getSignStr };exports.default = _default;

createApp(app).$mount();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createApp"]))

/***/ }),

/***/ 11:
/*!***************************************************************!*\
  !*** C:/Users/Administrator/Desktop/MC/applets/ceshi/App.vue ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ 12);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&lang=css& */ 14);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 16);
var render, staticRenderFns, recyclableRender, components
var renderjs





/* normalize component */

var component = Object(_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null,
  false,
  components,
  renderjs
)

component.options.__file = "App.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 12:
/*!****************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/MC/applets/ceshi/App.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=script&lang=js& */ 13);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 13:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/MC/applets/ceshi/App.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _main = _interopRequireDefault(__webpack_require__(/*! ./main.js */ 0));
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
{
  onLaunch: function onLaunch() {
    uni.login({
      provider: 'weixin',
      success: function success(loginRes) {
        console.log(loginRes.authResult);
      } });

    console.log('App Launch');
    uni.getSystemInfo({
      success: function success(e) {










        _vue.default.prototype.StatusBar = e.statusBarHeight;
        var custom = wx.getMenuButtonBoundingClientRect();
        _vue.default.prototype.Custom = custom;
        _vue.default.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;






      } });

    //  uni.getSystemInfo({
    // 	success: function(e) {
    //








    //
    // 		Vue.prototype.StatusBar = e.statusBarHeight;
    // 		let custom = wx.getMenuButtonBoundingClientRect();
    // 		Vue.prototype.Custom = custom;
    // 		Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
    // 		Vue.prototype.CustomTop = e.statusBarHeight + CustomBar
    //

    //



    // 	}
    // })
    //console.log('App Launch')













    //查询配置信息货币的单位，符号，以及其他配置信息//并且写入缓存
    var apparr = {};

    var apppdata = _main.default.getSignStr(apparr);
    uni.request({
      url: _main.default.websiteUrl + '/api_v2/mall_base/base_set',
      method: 'POST',
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded' },

      data: apppdata,
      success: function success(appres) {
        if (appres.data.status == 'y') {
          //console.log(appres);
          //写入缓存
          uni.setStorage({
            key: 'deployinfo',
            data: appres.data.data,
            success: function success() {
            } });

        }
      } });

    //读取安装的插件
    uni.request({
      url: _main.default.websiteUrl + '/api_v2/apps/index',
      method: 'POST',
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded' },

      data: apppdata,
      success: function success(appsres) {
        //console.log(appsres);return;
        if (appsres.data.status == 'y') {
          //写入缓存
          uni.setStorage({
            key: 'appsinfo',
            data: appsres.data.data.apps,
            success: function success() {
            } });

        }
      } });


  },
  onShow: function onShow() {
    console.log('App Show');
  },
  onHide: function onHide() {
    console.log('App Hide');
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 14:
/*!************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/MC/applets/ceshi/App.vue?vue&type=style&index=0&lang=css& ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=style&index=0&lang=css& */ 15);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 15:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/MC/applets/ceshi/App.vue?vue&type=style&index=0&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 53:
/*!****************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/MC/applets/ceshi/main.js?{"page":"pages%2Fhome%2Fclassgoods"} ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);__webpack_require__(/*! @dcloudio/uni-stat */ 5);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _classgoods = _interopRequireDefault(__webpack_require__(/*! ./pages/home/classgoods.vue */ 54));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_classgoods.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 54:
/*!*********************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/MC/applets/ceshi/pages/home/classgoods.vue ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _classgoods_vue_vue_type_template_id_33b3f5a5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classgoods.vue?vue&type=template&id=33b3f5a5& */ 55);
/* harmony import */ var _classgoods_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classgoods.vue?vue&type=script&lang=js& */ 57);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _classgoods_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _classgoods_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _classgoods_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classgoods.vue?vue&type=style&index=0&lang=css& */ 59);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 16);

var renderjs





/* normalize component */

var component = Object(_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _classgoods_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _classgoods_vue_vue_type_template_id_33b3f5a5___WEBPACK_IMPORTED_MODULE_0__["render"],
  _classgoods_vue_vue_type_template_id_33b3f5a5___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _classgoods_vue_vue_type_template_id_33b3f5a5___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/home/classgoods.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 55:
/*!****************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/MC/applets/ceshi/pages/home/classgoods.vue?vue&type=template&id=33b3f5a5& ***!
  \****************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_classgoods_vue_vue_type_template_id_33b3f5a5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./classgoods.vue?vue&type=template&id=33b3f5a5& */ 56);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_classgoods_vue_vue_type_template_id_33b3f5a5___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_classgoods_vue_vue_type_template_id_33b3f5a5___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_classgoods_vue_vue_type_template_id_33b3f5a5___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_classgoods_vue_vue_type_template_id_33b3f5a5___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 56:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/MC/applets/ceshi/pages/home/classgoods.vue?vue&type=template&id=33b3f5a5& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components = {
  uniPopup: function() {
    return Promise.all(/*! import() | components/uni-popup/uni-popup */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/uni-popup/uni-popup")]).then(__webpack_require__.bind(null, /*! @/components/uni-popup/uni-popup.vue */ 736))
  }
}
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 57:
/*!**********************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/MC/applets/ceshi/pages/home/classgoods.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_classgoods_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./classgoods.vue?vue&type=script&lang=js& */ 58);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_classgoods_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_classgoods_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_classgoods_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_classgoods_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_classgoods_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 58:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/MC/applets/ceshi/pages/home/classgoods.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;









































































































































var _main = _interopRequireDefault(__webpack_require__(/*! ../../main.js */ 0));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}var _default =
{

  onShareAppMessage: function onShareAppMessage(res) {//分享
    try {//从本地缓存中同步获取指定 key 对应的内容。
      var mv = uni.getStorageSync('memberinfo');
      var xv = uni.getStorageSync('xshopInfo');
      if (res.from === 'button') {// 来自页面内分享按钮
        console.log(res.target);
      }
      return {
        title: xv.store.stores_name,
        path: '/pages/home/classgoods?member_openid=' + mv.openid + "&stores_id=" + xv.store.stores_id + "&category_id=" + this.sData.category_id + "&title=" + this.sData.title };

    } catch (e) {
      // error
    }

  },

  data: function data() {
    return {
      deployinfo: {}, //配置信息货币单位，符号，以及其他的一些配置参数
      goodsList: [],
      login: false,
      memberinfo: [],
      sData: [],
      lim: 0,
      lim_info: '',

      renderImage: false,
      limit: 30,
      page: 0,
      xshopInfo: [],
      shoppingCarts: [],

      //弹窗
      content: '',
      type: '',
      inverted: false,
      //规格滚动
      scrollTop: 0,
      old: {
        scrollTop: 0 },

      spec_id: 0,
      spec: '',
      goodsinfo: [],
      goodsinfos: [],
      choice: [],
      choice_tag: [],
      choice_unit: [],
      simulatedDATA: { //模拟后台返回的数据 多规格
        "difference": [],
        "specifications": [] },

      selectArr: [], //存放被选中的值
      shopItemInfo: {}, //存放要和选中的值进行匹配的数据
      subIndex: [], //是否选中 因为不确定是多规格还是但规格，所以这里定义数组来判断
      xpopup: 1 };

  },
  onLoad: function onLoad(data) {
    try {//从本地缓存中同步获取指定 key 对应的内容。
      var value = uni.getStorageSync('memberinfo');
      var valuex = uni.getStorageSync('shoppingCarts');
      var values = uni.getStorageSync('xshopInfo');
      this.deployinfo = uni.getStorageSync('deployinfo');
      if (values) {
        this.xshopInfo = values;
      }
      if (value) {
        this.memberinfo = value;
        this.login = true;
        //console.log(value);
      }
      if (valuex) {
        this.shoppingCarts = valuex;
      }
    } catch (e) {
      // error
    }
    uni.setNavigationBarTitle({
      title: data.title });

    //console.log(data);
    if (data.member_openid != undefined) {
      //将推荐人id写入缓存
      uni.setStorage({
        key: 'tjr_member_openid',
        data: data.member_openid,
        success: function success() {
        } });

    }
    this.goodsList = [];
    this.sData = data;
    this.page = 0;
    this.loadData('add', this.sData);
    //console.log(this.goodsList);
  },
  onPullDownRefresh: function onPullDownRefresh() {
    this.page = 0;
    this.goodsList = [];
    this.loadData('refresh', this.sData);
    setTimeout(function () {
      uni.stopPullDownRefresh();
    }, 2000);
  },
  onReachBottom: function onReachBottom() {
    this.loadData('add', this.sData);
  },
  methods: {
    chooseItem: function chooseItem(item, n, event, index) {
      if (this.selectArr[n] != item) {
        this.$set(this.selectArr, n, item);
        this.$set(this.subIndex, n, index);

        //对比下面2个数组来切换商品信息
        var selectArrx = [];
        var str_xzSpec = "";
        var k1 = 0;
        for (var y1 in this.selectArr) {
          if (this.selectArr[y1] != "") {
            selectArrx[k1] = this.selectArr[y1];
            str_xzSpec += this.selectArr[y1] + ",";
            k1++;
          }
        }
        if (selectArrx.length == this.choice.choice_spec.length) {
          var goodsAttr = [];
          for (var y2 in this.goodsinfos) {
            var str_sp = "";
            for (var y3 in this.goodsinfos[y2].specs) {
              str_sp += this.goodsinfos[y2].specs[y3].spec_attr_val_name + ",";
            }
            if (str_sp == str_xzSpec) {
              goodsAttr = this.goodsinfos[y2];
            }
          }
          this.goodsinfo = goodsAttr;
          //读出对应的商品备注
          var choice_tag = [];
          var k = 0;
          for (var i in this.choice.choice_tag) {
            if (this.choice.choice_tag[i].barcode_id == this.goodsinfo.barcode_id) {
              choice_tag[k] = {
                goods_tag: this.choice.choice_tag[i].goods_tag };

              k++;
            }
          }
          this.choice_tag = choice_tag;
        }
      } else {
        this.$set(this.selectArr, n, '');
        this.$set(this.subIndex, n, -1); //去掉选中颜色
      }
      this.checkItem(n);
    },
    checkItem: function checkItem(clickIndex) {
      var option = this.simulatedDATA.specifications;
      for (var i = 0, len = option.length; i < len; i++) {
        if (i == clickIndex) {
          continue;
        }
        var len2 = option[i].list.length;
        for (var j = 0; j < len2; j++) {
          if (this.subIndex[i] != -1 && j == this.subIndex[i]) {
            continue;
          }
          var choosed_copy = _toConsumableArray(this.selectArr);
          this.$set(choosed_copy, i, this.simulatedDATA.specifications[i].list[j].name);
          var choosed_copy2 = choosed_copy.filter(function (item) {return item !== '' && typeof item !== 'undefined';});
          if (this.shopItemInfo.hasOwnProperty(choosed_copy2)) {
            this.$set(this.simulatedDATA.specifications[i].list[j], 'isShow', true);
          } else {
            this.$set(this.simulatedDATA.specifications[i].list[j], 'isShow', false);
          }
        }
      }
    },
    initializeData: function initializeData() {var _this = this;
      //计算有多小种可选路径
      var result = this.simulatedDATA.difference.reduce(
      function (arrs, items) {
        return arrs.concat(
        items.attribute6.split(',').reduce(
        function (arr, item) {
          return arr.concat(
          arr.map(function (item2) {
            //利用对象属性的唯一性实现二维数组去重
            if (!_this.shopItemInfo.hasOwnProperty([].concat(_toConsumableArray(item2), [item]))) {
              _this.shopItemInfo[[].concat(_toConsumableArray(item2), [item])] = items;
            }
            return [].concat(_toConsumableArray(item2), [item]);
          }));

        },
        [
        []]));



      },
      [
      []]);


    },
    //选择单位或备注
    ggxz: function ggxz(type, data, xdata) {
      if (type == 1) {
        //切换单位
        var choice_unit = [];
        for (var u in this.choice_unit) {
          this.choice_unit[u].site = 1;
          if (this.choice_unit[u].unit_id == data) {
            this.choice_unit[u].site = 2;
          }
          choice_unit[u] = {
            unit: this.choice_unit[u].unit,
            unit_id: this.choice_unit[u].unit_id,
            site: this.choice_unit[u].site };

        }
        this.choice_unit = choice_unit;
        //切换单位的时候切换商品数据
        for (var g in this.goodsinfos) {
          if (this.goodsinfos[g].unit_id == data) {
            this.goodsinfo = this.goodsinfos[g];
          }
        }
      }
      if (type == 3) {//备注信息的选中效果
        var oneTag = [];
        for (var _u in this.choice_tag) {
          //console.log(this.choice_tag[u].goods_tag.name);
          var threeTag = [];
          for (var u3 in this.choice_tag[_u].goods_tag.tag) {
            if (this.choice_tag[_u].goods_tag.name == xdata) {
              this.choice_tag[_u].goods_tag.tag[u3].site = 1;
            }
            if (this.choice_tag[_u].goods_tag.name == xdata && this.choice_tag[_u].goods_tag.tag[u3].tag_name == data) {
              this.choice_tag[_u].goods_tag.tag[u3].site = 2;
            }
            threeTag[u3] = {
              tag_id: this.choice_tag[_u].goods_tag.tag[u3].tag_id,
              tag_name: this.choice_tag[_u].goods_tag.tag[u3].tag_name,
              site: this.choice_tag[_u].goods_tag.tag[u3].site };

          }

          if (this.choice_tag[_u].goods_tag.name == xdata) {
            this.choice_tag[_u].goods_tag.site = 1;
          }
          if (this.choice_tag[_u].goods_tag.name == xdata && data == "自定义") {
            this.choice_tag[_u].goods_tag.site = 2;
          }
          oneTag[_u] = {
            goods_tag: {
              name: this.choice_tag[_u].goods_tag.name,
              tag: threeTag,
              site: this.choice_tag[_u].goods_tag.site,
              t_name: this.choice_tag[_u].goods_tag.t_name,
              is_must: this.choice_tag[_u].goods_tag.is_must,
              sgt_id: this.choice_tag[_u].goods_tag.sgt_id } };


        }
        this.choice_tag = oneTag;
      }
    },
    //滚动窗口
    upper: function upper(e) {
      //console.log(e)
    },
    lower: function lower(e) {
      //console.log(e)
    },
    scroll: function scroll(e) {
      //console.log(e)
      this.old.scrollTop = e.detail.scrollTop;
    },
    goTop: function goTop(e) {
      this.scrollTop = this.old.scrollTop;
      this.$nextTick(function () {
        this.scrollTop = 0;
      });
      //uni.showToast({
      //icon:"none",
      //title:"纵向滚动 scrollTop 值已被修改为 0"
      //})
    },
    //弹出下拉弹窗
    togglePopup: function togglePopup(type, open, data) {var _this2 = this;
      switch (type) {
        case 'bottom':
          this.content = '底部弹出 popup';
          this.xpopup = 1;
          this.getGoodsDetailsInfo(data);
          break;}

      this.type = type;
      this.$nextTick(function () {
        _this2.$refs['show' + open].open();
      });
    },
    cancel: function cancel(type) {
      this.$refs['show' + type].close();
    },
    change: function change(e) {
      //console.log('是否打开:' + e.show)
    },
    //根据商品id查找当前商品基本信息
    getGoodsDetailsInfo: function getGoodsDetailsInfo(data) {var _this3 = this;
      this.spec_id = 0;
      this.spec = '';
      this.goodsinfo = [];
      this.goodsinfos = [];
      this.choice = [];
      this.choice_tag = [];
      this.simulatedDATA = { //模拟后台返回的数据 多规格
        "difference": [],
        "specifications": [] };

      this.selectArr = []; //存放被选中的值
      this.shopItemInfo = {}; //存放要和选中的值进行匹配的数据
      this.subIndex = []; //是否选中 因为不确定是多规格还是但规格，所以这里定义数组来判断
      try {//从本地缓存中同步获取指定 key 对应的内容。
        var value = uni.getStorageSync('memberinfo');
        var valuex = uni.getStorageSync('shoppingCarts');
        var values = uni.getStorageSync('xshopInfo');
        //console.log(value);
        if (values) {
          this.xshopInfo = values;
          this.stores_name = values.store.stores_name;
        }
        if (value) {
          this.memberinfo = value;
          this.login = true;
        }
        if (valuex) {
          this.shoppingCarts = valuex;
        }
      } catch (e) {

      } // error
      //console.log(this.shoppingCarts);
      this.barcode_id = data.barcode_id;
      //获取信息
      var arr = {
        stores_id: this.xshopInfo.store.stores_id,
        barcode_id: data.barcode_id,
        member_openid: this.memberinfo.openid };

      var pdata = _main.default.getSignStr(arr);
      uni.request({
        url: _main.default.websiteUrl + '/api_v2/mall_shop_v2/goods_details',
        method: 'POST',
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded' },

        data: pdata,
        success: function success(res) {
          //console.log(res.data);
          _this3.goodsinfo = res.data.data.goods[0];
          //console.log(this.sale_num);
          _this3.choice = res.data.data;
          //读出默认备注组
          var choice_tag = [];
          var k = 0;
          for (var i in res.data.data.choice_tag) {
            if (res.data.data.choice_tag[i].barcode_id == res.data.data.goods[0].barcode_id) {
              //this.choice_tag = res.data.data.choice_tag[i].goods_tag;											
              choice_tag[k] = {
                goods_tag: res.data.data.choice_tag[i].goods_tag };

              k++;
            }
          }
          _this3.choice_tag = choice_tag;
          for (var _i in _this3.choice_tag) {//默认把备注标签加上一个t_name字段
            _this3.choice_tag[_i].goods_tag.t_name = "";
          }
          //console.log(this.choice_tag);
          //读出默认规格
          var x_choice_spec = [];
          var str_spec = ''; //得到一级规格的名称
          for (var s in res.data.data.choice_spec) {
            var x_list = [];
            for (var s2 in res.data.data.choice_spec[s].val) {
              x_list[s2] = {
                name: res.data.data.choice_spec[s].val[s2].name
                //spec_attr_val_id:res.data.data.choice_spec[s].val[s2].spec_attr_val_id,
              };
            }
            str_spec += res.data.data.choice_spec[s].name + ",";
            x_choice_spec[s] = {
              name: res.data.data.choice_spec[s].name,
              list: x_list };

          }
          //this.simulatedDATA.specifications = x_choice_spec;
          //得到都有哪些规格
          var s_choice_spec = [];
          for (var sL in res.data.data.goods) {
            var x_str_spec = ''; //得到二级规格的名称
            for (var sL2 in res.data.data.goods[sL].specs) {
              x_str_spec += res.data.data.goods[sL].specs[sL2].spec_attr_val_name + ",";
            }
            s_choice_spec[sL] = {
              attribute2: str_spec.substring(0, str_spec.length - 1),
              attribute6: x_str_spec.substring(0, x_str_spec.length - 1),
              uid: sL };

          }
          ///**x_choice_spec
          _this3.simulatedDATA = {
            difference: s_choice_spec,
            specifications: x_choice_spec };

          _this3.initializeData(); //
          _this3.checkItem(-1); //
          //**/
          //读出默认单位
          for (var u in res.data.data.choice_unit) {
            if (res.data.data.choice_unit[u].unit == res.data.data.goods[0].unit) {
              res.data.data.choice_unit[u].site = 2;
            }

          }
          _this3.choice_unit = res.data.data.choice_unit;
          _this3.goodsinfos = res.data.data.goods;
          _this3.spec_id = res.data.data.goods[0].spec_id;
          _this3.spec = res.data.data.goods[0].spec;
        } });

    },
    addToCart: function addToCart() {
      //加入购物前先检查有没有选择规格
      if (this.choice.choice_spec.length > 0) {
        var selectArrx = [];
        var k1 = 0;
        for (var y1 in this.selectArr) {
          if (this.selectArr[y1] != "") {
            selectArrx[k1] = this.selectArr[y1];
            k1++;
          }
        }
        if (selectArrx.length < this.choice.choice_spec.length) {
          uni.showToast({
            title: '请选择规格',
            duration: 2000,
            icon: "none" });

          return;
        }
      }

      //组织要提交的备注信息
      var bjRemark = "";
      var tag_name = "";
      var bzInt = "";
      var sgt_ids = "";
      var allbzxzInt = "";
      for (var b in this.choice_tag) {
        if (this.choice_tag[b].goods_tag.is_must == 1) {
          tag_name += this.choice_tag[b].goods_tag.name + ",";
          allbzxzInt += this.choice_tag[b].goods_tag.sgt_id + ",";
        }
        var str_bz = "";
        var sgt_ids_b = "";
        var bzInt_b = "";
        for (var b1 in this.choice_tag[b].goods_tag.tag) {
          if (this.choice_tag[b].goods_tag.tag[b1].site == 2 && this.choice_tag[b].goods_tag.tag[b1].tag_id > 0) {
            str_bz = this.choice_tag[b].goods_tag.name + ":【" + this.choice_tag[b].goods_tag.tag[b1].tag_name + "】";
            sgt_ids_b = this.choice_tag[b].goods_tag.sgt_id;
            if (this.choice_tag[b].goods_tag.is_must == 1) {
              bzInt_b = this.choice_tag[b].goods_tag.sgt_id;
            }
          }
          if (this.choice_tag[b].goods_tag.tag[b1].site == 2 && this.choice_tag[b].goods_tag.tag[b1].tag_id == 0) {
            str_bz = this.choice_tag[b].goods_tag.name + ":【" + this.choice_tag[b].goods_tag.t_name + "】";
            sgt_ids_b = this.choice_tag[b].goods_tag.sgt_id;
            if (this.choice_tag[b].goods_tag.is_must == 1) {
              bzInt_b = this.choice_tag[b].goods_tag.sgt_id;
            }
          }
        }
        if (str_bz != '') {
          bjRemark += str_bz + ",";
          sgt_ids += sgt_ids_b + ",";
          if (this.choice_tag[b].goods_tag.is_must == 1) {
            bzInt += bzInt_b + ",";
          }
        }
      }
      //检查备注信息是不是必须选择，如果是要先选择备注信息
      if (allbzxzInt != bzInt) {
        uni.showToast({
          title: "请选择：" + tag_name,
          duration: 2000,
          icon: "none" });

        return;
      }
      uni.showToast({
        title: '加入成功',
        duration: 2000 });

      //console.log(this.goodsinfo);
      var xxx = {
        stores_id: this.xshopInfo.store.stores_id,
        barcode_id: this.goodsinfo.barcode_id,
        category_id: this.goodsinfo.category_id,
        goods_id: this.goodsinfo.goods_id,
        goods_title: this.goodsinfo.goods_title,
        img: this.goodsinfo.imgs[0],
        original_price: this.goodsinfo.original_price,
        price: this.goodsinfo.price,
        promotion: this.goodsinfo.promotion,
        unit: this.goodsinfo.unit,
        astrict_num: this.goodsinfo.astrict_num,
        spec: this.spec,
        site: 2,
        remark: bjRemark,
        sgt_ids: sgt_ids };

      //console.log(xxx);
      //console.log(this.goodsinfo);return;
      this.jrShoppingCart(1, xxx, 'dgg');
    },
    goToMs: function goToMs() {var _this4 = this; //立即购买
      //检查是否登录，没有登录的跳转到登录界面
      //console.log(this.login);
      uni.showToast({
        title: '正在加载...',
        icon: 'none',
        duration: 2000 });

      try {//从本地缓存中同步获取指定 key 对应的内容。
        var value = uni.getStorageSync('memberinfo');
        if (value.length == 0) {
          this.login = false;
        } else {
          this.login = true;
        }
      } catch (e) {
        // error
      }
      if (this.memberinfo.length == 0) {
        uni.navigateTo({
          url: "/pages/login/login" });

        return;
      }
      //加入购物前先检查有没有选择规格
      if (this.choice.choice_spec.length > 0) {
        var selectArrx = [];
        var k1 = 0;
        for (var y1 in this.selectArr) {
          if (this.selectArr[y1] != "") {
            selectArrx[k1] = this.selectArr[y1];
            k1++;
          }
        }
        if (selectArrx.length < this.choice.choice_spec.length) {
          uni.showToast({
            title: '请选择规格',
            duration: 2000,
            icon: "none" });

          return;
        }
      }
      //组织要提交的备注信息
      var bjRemark = "";
      var tag_name = "";
      var bzInt = "";
      var sgt_ids = "";
      var allbzxzInt = "";
      for (var b in this.choice_tag) {
        if (this.choice_tag[b].goods_tag.is_must == 1) {
          tag_name += this.choice_tag[b].goods_tag.name + ",";
          allbzxzInt += this.choice_tag[b].goods_tag.sgt_id + ",";
        }
        var str_bz = "";
        var sgt_ids_b = "";
        var bzInt_b = "";
        for (var b1 in this.choice_tag[b].goods_tag.tag) {
          if (this.choice_tag[b].goods_tag.tag[b1].site == 2 && this.choice_tag[b].goods_tag.tag[b1].tag_id > 0) {
            str_bz = this.choice_tag[b].goods_tag.name + ":【" + this.choice_tag[b].goods_tag.tag[b1].tag_name + "】";
            sgt_ids_b = this.choice_tag[b].goods_tag.sgt_id;
            if (this.choice_tag[b].goods_tag.is_must == 1) {
              bzInt_b = this.choice_tag[b].goods_tag.sgt_id;
            }
          }
          if (this.choice_tag[b].goods_tag.tag[b1].site == 2 && this.choice_tag[b].goods_tag.tag[b1].tag_id == 0) {
            str_bz = this.choice_tag[b].goods_tag.name + ":【" + this.choice_tag[b].goods_tag.t_name + "】";
            sgt_ids_b = this.choice_tag[b].goods_tag.sgt_id;
            if (this.choice_tag[b].goods_tag.is_must == 1) {
              bzInt_b = this.choice_tag[b].goods_tag.sgt_id;
            }
          }
        }
        if (str_bz != '') {
          bjRemark += str_bz + ",";
          sgt_ids += sgt_ids_b + ",";
          if (this.choice_tag[b].goods_tag.is_must == 1) {
            bzInt += bzInt_b + ",";
          }
        }
      }
      //检查备注信息是不是必须选择，如果是要先选择备注信息
      if (allbzxzInt != bzInt) {
        uni.showToast({
          title: "请选择：" + tag_name,
          duration: 2000,
          icon: "none" });

        return;
      }
      //this.hd.is_kill = 1;
      //查询一下有没有默认收货地址
      var aarr = {
        openid: this.memberinfo.openid,
        is_default: 1 };

      var apdata = _main.default.getSignStr(aarr);
      uni.request({
        url: _main.default.websiteUrl + '/api_v2/member_addres_act/index',
        method: 'POST',
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded' },

        data: apdata,
        success: function success(ares) {
          //console.log(ares.data);
          if (ares.data.data.length == 0) {
            uni.showToast({
              icon: 'none',
              title: '请先设置收货地址' });

            //this.hd.is_kill = 2;
            uni.navigateTo({
              url: "../goods_details/address_list" });

            return;
          }

          //抢购成功去生成订单
          var goods_l = [];
          goods_l[0] = {
            stores_id: _this4.xshopInfo.store.stores_id,
            barcode_id: _this4.goodsinfo.barcode_id,
            num: 1,
            remark: bjRemark,
            sgt_ids: sgt_ids };

          //console.log(this.xshopInfo.store.stores_id,this.hd.barcode_id);
          var parr = {
            member_openid: _this4.memberinfo.openid,
            stores_id: _this4.xshopInfo.store.stores_id,
            goods: JSON.stringify(goods_l) };

          //console.log(arr);return;
          var xpdata = _main.default.getSignStr(parr);
          uni.request({
            url: _main.default.websiteUrl + '/api_v2/mall_order/pre_order',
            method: 'POST',
            dataType: 'json',
            header: {
              'content-type': 'application/x-www-form-urlencoded' },

            data: xpdata,
            success: function success(xres) {
              //console.log(res.data);return;
              if (xres.data.status == 'y') {
                _this4.xpopup = 2;
                uni.navigateTo({
                  url: "../goods_details/order_sure?order_code=" + xres.data.data.order_code + "&goods_l=" + JSON.stringify(goods_l) });

              } else {
                uni.showToast({
                  icon: 'none',
                  title: xres.data.info });

                return;
              }
            } });

        } });


    },
    goDetails: function goDetails(item) {
      uni.navigateTo({
        url: "../goods_details/goods_details?barcode_id=" + item.barcode_id });

    },
    goGwc: function goGwc() {
      uni.switchTab({ //reLaunch 这是直接进入，没有滑动效果。switchTab有滑动效果
        url: "../shoppingcart/shoppingcart" });

    },
    //扫码
    sm: function sm() {
      uni.scanCode({
        success: function success(res) {
          //console.log('条码类型：' + res.scanType);
          //console.log('条码内容：' + res.result);
          uni.navigateTo({
            url: "../serch/goods_list?goods_code=" + res.result });

          return;
        } });

    },
    loadData: function loadData() {var _this5 = this;var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'add';var data = arguments.length > 1 ? arguments[1] : undefined;
      var arr = {
        stores_id: this.xshopInfo.store.stores_id,
        member_openid: this.memberinfo.openid,
        category_id: data.category_id,
        limit: this.limit,
        offset: this.page * this.limit };

      var pdata = _main.default.getSignStr(arr);
      uni.request({
        url: _main.default.websiteUrl + '/api_v2/mall_shop_v2/goods_query',
        method: 'POST',
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded' },

        data: pdata,
        success: function success(res) {
          //console.log(res.data);
          if (res.data.data.goods.length == 0) {
            _this5.lim_info = '没有商品';
          }
          _this5.lim = res.data.total;
          var max_page = res.data.total / _this5.limit;
          if (max_page <= _this5.page) {
            uni.showToast({
              icon: 'none',
              title: '已到底' });

            return;
          }
          if (res.data.status == 'y') {
            var datax = res.data.data.goods;
          } else {
            var datax = [];
            uni.showToast({
              icon: 'none',
              title: '已到底' });

          }
          if (action === 'refresh') {
            _this5.goodsList = [];
          }
          datax.forEach(function (item) {
            _this5.goodsList.push(item);
          });
          _this5.page = _this5.page + 1;
          //}else{
          //this.lim_info = '没有商品';
          //}
        } });

    },
    jrShoppingCart: function jrShoppingCart(num_s, goods_info) {
      //num_s参数   0和1，0为减，1为加
      //goods_info参数  一维数组
      //console.log(num_s);
      //console.log(goods_info);
      //console.log(this.shoppingCarts);return;
      if (num_s == 1) {
        //console.log(xj);
        //限购数量和购物车数量对比
        for (var ixs in this.shoppingCarts) {
          if (this.shoppingCarts[ixs].barcode_id == goods_info.barcode_id) {
            if (goods_info.astrict_num !== '' && parseFloat(this.shoppingCarts[ixs].num) + 1 > goods_info.astrict_num) {
              uni.showToast({
                icon: 'none',
                title: '商品【' + this.shoppingCarts[ixs].goods_title + '】限购' + goods_info.astrict_num + goods_info.unit });

              return;
            }
          }
        }
      }
      //如果重复，查询下重复的商品在购车的数量
      var snum = 0;
      for (var ix in this.shoppingCarts) {
        if (this.shoppingCarts[ix].barcode_id == goods_info.barcode_id) {
          snum = parseFloat(this.shoppingCarts[ix].num);
        }
      }
      //只留下不重复的
      var glistx = [];
      var mxx = 0;
      for (var i in this.shoppingCarts) {
        if (this.shoppingCarts[i].barcode_id != goods_info.barcode_id && this.shoppingCarts[i].stores_id == this.xshopInfo.store.stores_id && this.shoppingCarts[i].status == 1) {
          glistx[mxx] = {
            stores_id: this.xshopInfo.store.stores_id,
            barcode_id: this.shoppingCarts[i].barcode_id,
            category_id: this.shoppingCarts[i].category_id,
            goods_id: this.shoppingCarts[i].goods_id,
            goods_title: this.shoppingCarts[i].goods_title,
            img: this.shoppingCarts[i].img,
            original_price: this.shoppingCarts[i].original_price,
            price: this.shoppingCarts[i].price,
            promotion: this.shoppingCarts[i].promotion,
            num: this.shoppingCarts[i].num,
            unit: this.shoppingCarts[i].unit,
            spec: this.shoppingCarts[i].spec,
            site: this.shoppingCarts[i].site,
            status: this.shoppingCarts[i].status,
            remark: this.shoppingCarts[i].remark,
            sgt_ids: this.shoppingCarts[i].sgt_ids };

          mxx++;
        }
      }
      //this.shoppingCarts = glistx;
      //console.log(this.shoppingCarts);
      var glist = [];
      var mx = 0;
      //console.log(snum);
      if (num_s != 1 && snum < 2) {
        console.log(snum + '---'); //删除缓存
      } else {
        glist[mx] = {
          stores_id: this.xshopInfo.store.stores_id,
          barcode_id: goods_info.barcode_id,
          category_id: goods_info.category_id,
          goods_id: goods_info.goods_id,
          goods_title: goods_info.goods_title,
          img: goods_info.img,
          original_price: goods_info.original_price,
          price: goods_info.price,
          promotion: goods_info.promotion,
          num: num_s == 1 ? snum + 1 : snum - 1,
          unit: goods_info.unit,
          spec: goods_info.spec,
          site: 2,
          status: 1,
          remark: goods_info.remark,
          sgt_ids: goods_info.sgt_ids };

      }

      this.shoppingCarts = glistx.concat(glist);
      //console.log(this.shoppingCarts);
      //写入缓存
      uni.setStorage({
        key: 'shoppingCarts',
        data: this.shoppingCarts,
        success: function success() {
        } });

      //console.log(this.shoppingCarts);
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 59:
/*!******************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/MC/applets/ceshi/pages/home/classgoods.vue?vue&type=style&index=0&lang=css& ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_classgoods_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./classgoods.vue?vue&type=style&index=0&lang=css& */ 60);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_classgoods_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_classgoods_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_classgoods_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_classgoods_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_classgoods_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 60:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/MC/applets/ceshi/pages/home/classgoods.vue?vue&type=style&index=0&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[53,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/classgoods.js.map