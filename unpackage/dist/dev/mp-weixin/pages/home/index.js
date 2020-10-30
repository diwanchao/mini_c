(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/home/index"],[
/* 0 */
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
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
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
/* 12 */
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
/* 13 */
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
/* 14 */
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
/* 15 */
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/MC/applets/ceshi/App.vue?vue&type=style&index=0&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/*!***********************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/MC/applets/ceshi/main.js?{"page":"pages%2Fhome%2Findex"} ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);__webpack_require__(/*! @dcloudio/uni-stat */ 5);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _index = _interopRequireDefault(__webpack_require__(/*! ./pages/home/index.vue */ 22));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_index.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),
/* 22 */
/*!****************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/MC/applets/ceshi/pages/home/index.vue ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_71e217db___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=71e217db& */ 23);
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ 25);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.vue?vue&type=style&index=0&lang=css& */ 27);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 16);

var renderjs





/* normalize component */

var component = Object(_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_71e217db___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_71e217db___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _index_vue_vue_type_template_id_71e217db___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/home/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 23 */
/*!***********************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/MC/applets/ceshi/pages/home/index.vue?vue&type=template&id=71e217db& ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_71e217db___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=template&id=71e217db& */ 24);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_71e217db___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_71e217db___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_71e217db___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_71e217db___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 24 */
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/MC/applets/ceshi/pages/home/index.vue?vue&type=template&id=71e217db& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components = {
  hxNavbar: function() {
    return __webpack_require__.e(/*! import() | components/hx-navbar/hx-navbar */ "components/hx-navbar/hx-navbar").then(__webpack_require__.bind(null, /*! @/components/hx-navbar/hx-navbar.nvue */ 722))
  }
}
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var l0 = _vm.thingsList.slice(0, 4)
  var g0 = Math.floor(
    (_vm.buyList.current_number / _vm.buyList.data[3].number) * 10000
  )
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        l0: l0,
        g0: g0
      }
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 25 */
/*!*****************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/MC/applets/ceshi/pages/home/index.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=script&lang=js& */ 26);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 26 */
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/MC/applets/ceshi/pages/home/index.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;












































































































































































































var _main = _interopRequireDefault(__webpack_require__(/*! ../../main.js */ 0));var _methods;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var sundehengCustom = function sundehengCustom() {__webpack_require__.e(/*! require.ensure | components/sundeheng-custom/sundeheng-custom */ "components/sundeheng-custom/sundeheng-custom").then((function () {return resolve(__webpack_require__(/*! @/components/sundeheng-custom/sundeheng-custom.vue */ 729));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var uniPopup = function uniPopup() {Promise.all(/*! require.ensure | components/uni-popup/uni-popup */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/uni-popup/uni-popup")]).then((function () {return resolve(__webpack_require__(/*! @/components/uni-popup/uni-popup.vue */ 736));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var uniNoticeBar = function uniNoticeBar() {__webpack_require__.e(/*! require.ensure | components/uni-notice-bar/uni-notice-bar */ "components/uni-notice-bar/uni-notice-bar").then((function () {return resolve(__webpack_require__(/*! @/components/uni-notice-bar/uni-notice-bar.vue */ 745));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var _default =





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
        path: '/pages/home/index?member_openid=' + mv.openid + "&stores_id=" + xv.store.stores_id };

    } catch (e) {
      // error
    }

  },

  components: {
    uniPopup: uniPopup,
    uniNoticeBar: uniNoticeBar,
    sundehengCustom: sundehengCustom },

  data: function data() {var _ref;
    return _ref = {
      xShow: false,
      textData: {
        name: '',
        desc: '' },

      markers: '',
      index: 1,
      login: false,
      shopclass: [],
      deployinfo: {
        monetary_symbol: '￥' },
      //配置信息货币单位，符号，以及其他的一些配置参数
      indicatorDots: true,
      autoplay: true,
      interval: 8000,
      duration: 1000 }, _defineProperty(_ref, "login",

    false), _defineProperty(_ref, "memberinfo",
    []), _defineProperty(_ref, "shoppingCarts",
    []), _defineProperty(_ref, "xshopInfo",
    []), _defineProperty(_ref, "indexInfo",
    []), _defineProperty(_ref, "shoppingCartNumP",
    0), _defineProperty(_ref, "oneMenu",
    []), _defineProperty(_ref, "stores_name",
    ''), _defineProperty(_ref, "homeGoods",
    []), _defineProperty(_ref, "address",
    true), _defineProperty(_ref, "animationData",
    {}), _defineProperty(_ref, "amintiond_list",
    []), _defineProperty(_ref, "wheight",
    500), _defineProperty(_ref, "jdxx",
    []), _defineProperty(_ref, "maddress",
    ''), _defineProperty(_ref, "bannerLen",
    0), _defineProperty(_ref, "iconsLen",
    0), _defineProperty(_ref, "lng",
    ''), _defineProperty(_ref, "lat",
    ''), _defineProperty(_ref, "tjr_member_openid",
    ''), _defineProperty(_ref, "tjr_xshopInfo",
    []), _defineProperty(_ref, "tjr_stores_id",
    0), _defineProperty(_ref, "hhhj",
    ''), _defineProperty(_ref, "goodsTitle",
    ''), _defineProperty(_ref, "tg_str",

    ''), _defineProperty(_ref, "announce_seat",
    1), _defineProperty(_ref, "content",

    ''), _defineProperty(_ref, "type",
    ''), _defineProperty(_ref, "inverted",
    false), _defineProperty(_ref, "scrollTop",
    0), _defineProperty(_ref, "old",
    {
      scrollTop: 0 }), _defineProperty(_ref, "spec_id",

    0), _defineProperty(_ref, "spec",
    ''), _defineProperty(_ref, "goodsinfo",
    []), _defineProperty(_ref, "goodsinfos",
    []), _defineProperty(_ref, "buyList",
    ''), _defineProperty(_ref, "choice",
    []), _defineProperty(_ref, "choice_tag",
    []), _defineProperty(_ref, "choice_unit",
    []), _defineProperty(_ref, "simulatedDATA",
    { //模拟后台返回的数据 多规格
      "difference": [],
      "specifications": [] }), _defineProperty(_ref, "selectArr",

    []), _defineProperty(_ref, "shopItemInfo",
    {}), _defineProperty(_ref, "subIndex",
    []), _defineProperty(_ref, "xpopup",
    1), _defineProperty(_ref, "xSt_key",
    2), _defineProperty(_ref, "tzStatus",
    2), _defineProperty(_ref, "tcStatus",
    1), _defineProperty(_ref, "tcGgList",
    []), _defineProperty(_ref, "orderStatus",
    1), _defineProperty(_ref, "order_info",
    []), _defineProperty(_ref, "config",
    {
      title: '首页',
      color: '#ffffff',
      backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
      statusBarFontColor: '#fff',
      fontSize: '16px',
      back: false,
      leftButton: [{
        key: 'btn1',
        icon: '&#xe651;',
        position: 'left',
        txt: '',
        fontSize: '14px' }] }), _defineProperty(_ref, "tabIndex",


    1), _defineProperty(_ref, "height",
    ''), _defineProperty(_ref, "limit",
    30), _defineProperty(_ref, "newList",
    []), _defineProperty(_ref, "newCouponList",
    []), _defineProperty(_ref, "iconList",
    [{
      id: 0,
      img: 'https://div.buy315.com.cn/xcx_imgs/xihongshi.png',
      title: '蔬菜' },

    {
      id: 1,
      img: 'https://div.buy315.com.cn/xcx_imgs/xihongshi.png',
      title: '水果' },

    {
      id: 2,
      img: 'https://div.buy315.com.cn/xcx_imgs/xihongshi.png',
      title: '肉禽' },

    {
      id: 3,
      img: 'https://div.buy315.com.cn/xcx_imgs/xihongshi.png',
      title: '水产' },

    {
      id: 4,
      img: 'https://div.buy315.com.cn/xcx_imgs/xihongshi.png',
      title: '蛋类' },

    {
      id: 5,
      img: 'https://div.buy315.com.cn/xcx_imgs/xihongshi.png',
      title: '米面粮油' },

    {
      id: 6,
      img: 'https://div.buy315.com.cn/xcx_imgs/xihongshi.png',
      title: '休闲酒饮' },

    {
      id: 7,
      img: 'https://div.buy315.com.cn/xcx_imgs/xihongshi.png',
      title: '调料干货' },

    {
      id: 8,
      img: 'https://div.buy315.com.cn/xcx_imgs/xihongshi.png',
      title: '厨房用品' },

    {
      id: 9,
      img: 'https://div.buy315.com.cn/xcx_imgs/xihongshi.png',
      title: '品牌专场' }]), _defineProperty(_ref, "thingsList",

    []), _defineProperty(_ref, "effectiveList",
    [{
      id: 0,
      title: '西瓜',
      img: 'https://div.buy315.com.cn/xcx_imgs/kele.jpg',
      price: '￥25.00',
      prices: '30.00' },

    {
      id: 0,
      title: '黄瓜',
      img: 'https://div.buy315.com.cn/xcx_imgs/kele.jpg',
      price: '￥25.00',
      prices: '30.00' }]), _defineProperty(_ref, "eveningList",

    [{
      id: 0,
      title: '购划算',
      img: 'https://div.buy315.com.cn/xcx_imgs/xianshi.png',
      time: '13:25:20>' },


    {
      id: 0,
      title: '晚间菜场',
      img: 'https://div.buy315.com.cn/xcx_imgs/wanjian.png',
      time: '18:00-20:00>' }]), _defineProperty(_ref, "listScrollShop",


    []), _defineProperty(_ref, "shopList",
    []), _defineProperty(_ref, "spikeList",
    []), _defineProperty(_ref, "wanjian",


    'block'), _defineProperty(_ref, "miaosha",
    'block'), _defineProperty(_ref, "newcomer",
    ''), _defineProperty(_ref, "evenimglist",
    ''), _ref;

  },
  onTabItemTap: function onTabItemTap() {
    //console.log('点击了tab触发');
    try {//从本地缓存中同步获取指定 key 对应的内容。
      var value = uni.getStorageSync('memberinfo');
      var valuex = uni.getStorageSync('shoppingCarts');
      var values = uni.getStorageSync('xshopInfo');
      var sfQhStores = uni.getStorageSync('sfQhStores');
      if (sfQhStores == 2) {
        if (value) {
          this.memberinfo = value;
          this.login = true;
        }
        if (valuex) {
          this.shoppingCarts = valuex;
        }
        if (values) {
          this.xshopInfo = values;
        }
        uni.setStorageSync('sfQhStores', 1); //用来判断换了店铺是否重新加载数据，默认1，不加载，2时重新加载。对应会用到分类页判断是否重新加载数据-
        this.sumShoppingCartNum();
      }

    } catch (e) {
      // error
    }
  },
  onPullDownRefresh: function onPullDownRefresh() {
    try {//从本地缓存中同步获取指定 key 对应的内容。
      var value = uni.getStorageSync('memberinfo');
      var valuex = uni.getStorageSync('shoppingCarts');
      var values = uni.getStorageSync('xshopInfo');
      if (values) {
        this.xshopInfo = values;
      }
      if (value) {
        this.memberinfo = value;
        this.login = true;
      }
      if (valuex) {
        this.shoppingCarts = valuex;
      }
    } catch (e) {
      // error
    }
    this.getHome();
    this.getexlosIve();
    uni.stopPullDownRefresh();
    // this.getEvening();
    this.getnewList();
    this.getnewCoupon();
    this.clickTab(0);
    this.getbuyList();
    console.log('@@@@@@@@@@@@@@@@@@');
    this.getTimespike();
    // setTimeout(function(){
    // 	this.pd_mshewanjian();
    // },1000)
    this.getClass();
  },
  onReady: function onReady(e) {
    var xthis = this;
    uni.getNetworkType({
      success: function success(res) {
        if (res.networkType !== 'none') {
          xthis.getBanben();
        }
      } });

    if (xthis.xSt_key == 1) {
      var dsqId = setInterval(function () {
        uni.getNetworkType({
          success: function success(res) {
            if (res.networkType !== 'none') {
              xthis.getShop();
              clearInterval(dsqId);
            }
          } });

      }, 1000);
    } else {
      xthis.getShop();
    }
  },
  onShow: function onShow(e) {var _this = this;
    this.wanjian = 'block',
    this.miaosha = 'block';

    wx.login({
      success: function success(res) {
        //console.log(res.code);
        _this.xcode = res.code;
      } });


    var xthis = this;
    if (xthis.xSt_key == 1) {
      var dsqId = setInterval(function () {
        uni.getNetworkType({
          success: function success(res) {
            if (res.networkType !== 'none') {
              xthis.xshow(xthis);
              clearInterval(dsqId);
            }
          } });

      }, 1000);
    } else {
      xthis.xshow(xthis);
    }
  },
  onLoad: function onLoad(data) {
    this.clickTab(0);
    this.getnewList();
    this.getnewShopList();
    this.getnewCoupon();
    this.getexlosIve();
    // this.getEvening();
    this.getbuyList();
    this.getTimespike();
    // setTimeout(function(){
    // 	this.pd_mshewanjian();
    // },1000)
    console.log('s*****************rd');
    uni.getLocation({
      type: 'wgs84',
      success: function success(res) {
        console.log('当前位置的经度：' + res.longitude);
        console.log('当前位置的纬度：' + res.latitude);
        console.log('s*****************rd');
      } });

    console.log('******************', '查询页面');
    ///wx.login({success: res => {console.log(res.code);},});
    uni.showLoading({
      title: '加载中' });

    var xthis = this;
    try {//从本地缓存中同步获取指定 key 对应的内容.
      var xSt = uni.getStorageSync('startup');
      if (xSt) {
        xthis.xSt_key = xSt.key;
      }
      if (xthis.xSt_key == 1) {
        var dsqId = setInterval(function () {
          uni.getNetworkType({
            success: function success(res) {
              if (res.networkType !== 'none') {
                xthis.xlode(xthis, data);
                uni.setStorage({
                  key: 'startup',
                  data: [],
                  success: function success() {} });

                clearInterval(dsqId);
              }
            } });

        }, 1000);
      } else {
        xthis.xlode(xthis, data);
      }
    } catch (e) {
      // error
    }
  },
  created: function created() {
    this.initializeData();
    this.checkItem(-1);
    this.clickTab(0);
  },
  methods: (_methods = {
    gotodetails: function gotodetails(item) {
      console.log('fhesuortgieoa');
      console.log(item.barcode_id);
      uni.navigateTo({
        url: "../goods_details/goods_details?barcode_id=" + item.barcode_id });

    },
    // 拼团
    gotocoupon: function gotocoupon() {
      if (this.memberinfo.length == 0) {
        uni.navigateTo({
          url: "/pages/login/login" });

        return;
      }
      uni.navigateTo({
        url: '/pages/home/group' });

    },
    // 爆品
    gotoexplosive: function gotoexplosive() {
      if (this.memberinfo.length == 0) {
        uni.navigateTo({
          url: "/pages/login/login" });

        return;
      }
      uni.navigateTo({
        url: '/pages/home/explosive' });

    },
    // 搜索
    gotoseachshop: function gotoseachshop() {
      if (this.memberinfo.length == 0) {
        uni.navigateTo({
          url: "/pages/login/login" });

        return;
      }
      uni.navigateTo({
        url: '/pages/serch/goods_list' });

    },
    // 晚间
    gotomarket: function gotomarket() {
      if (this.memberinfo.length == 0) {
        uni.navigateTo({
          url: "/pages/login/login" });

        return;
      }
      uni.navigateTo({
        url: '/pages/home/market' });

    },
    // 新人专享
    gotonewlist: function gotonewlist() {
      if (this.memberinfo.length == 0) {
        uni.navigateTo({
          url: "/pages/login/login" });

        return;
      }
      uni.navigateTo({
        url: "/pages/home/newlist" });

    },
    //限时抢购
    gotolimited: function gotolimited() {
      if (this.memberinfo.length == 0) {
        uni.navigateTo({
          url: "/pages/login/login" });

        return;
      }
      uni.navigateTo({
        url: "/pages/home/limited" });

    },
    // 地址
    address_list: function address_list() {
      if (this.memberinfo.length == 0) {
        uni.navigateTo({
          url: "/pages/login/login" });

        return;
      }
      uni.navigateTo({
        url: "/pagesb/center/xxmd" });

    },
    // 会员详情
    gotovipdetails: function gotovipdetails() {
      if (this.memberinfo.length == 0) {
        uni.navigateTo({
          url: "/pages/login/login" });

        return;
      }
      uni.navigateTo({
        url: "../center/vipsdetail" });

    },

    // 新人专享商品
    getnewShopList: function getnewShopList() {var _this2 = this;
      var arr = {};
      var pdata = _main.default.getSignStr(arr);
      uni.request({
        url: _main.default.websiteUrl + '/api_v2/stores/getnewpeoplegoodslist',
        method: 'POST',
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded' },

        data: pdata,
        success: function success(res) {
          console.log(res.data, '新人商品');
          _this2.newList = res.data.data;
        },
        fail: function fail() {},
        complete: function complete() {} });

    },
    // 新人优惠券
    getnewCoupon: function getnewCoupon() {var _this3 = this;
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
        // error
      }
      var arr = {
        member_openid: this.memberinfo.openid };

      var pdata = _main.default.getSignStr(arr);
      uni.request({
        url: _main.default.websiteUrl + '/api_v2/stores/getnewmembercouponlist',
        method: 'POST',
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded' },

        data: pdata,
        success: function success(res) {
          console.log(res.data, '新人优惠券');
          _this3.newCouponList = res.data.data;
        },
        fail: function fail() {},
        complete: function complete() {} });

    },
    // 首页爆品
    getexlosIve: function getexlosIve() {var _this4 = this;
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
        // error
      }
      var arr = {
        stores_id: this.xshopInfo.store.stores_id,
        member_openid: this.memberinfo.openid };

      var pdata = _main.default.getSignStr(arr);
      uni.request({
        url: _main.default.websiteUrl + '/api_v2/stores/gethotmoneygoodslist',
        method: 'POST',
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded' },

        data: pdata,
        success: function success(res) {
          console.log(res.data, '首页爆品');
          _this4.thingsListlen = res.data.data.length;
          console.log(_this4.thingsListlen);
          _this4.thingsList = res.data.data;

        } });

    },
    // 限时秒杀
    getTimespike: function getTimespike() {var _this5 = this;
      var that = this;
      console.log('dhweurerhweihreiowh');
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
        // error
      }
      var arr = {
        stores_id: this.xshopInfo.store.stores_id,
        member_openid: this.memberinfo.openid };

      var pdata = _main.default.getSignStr(arr);
      uni.request({
        url: _main.default.websiteUrl + '/app_seckill/aapi_seckill/get_goods_list',
        method: 'POST',
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded' },

        data: pdata,
        success: function success(res) {
          console.log(res.data, '限时秒杀');
          _this5.spikeList = res.data.data;
          // setTimeout(function(){
          // 	that.pd_mshewanjian();
          // },1000)
          uni.request({
            url: _main.default.websiteUrl + '/api_v2/stores/geteveningmarketgoodslist',
            method: 'POST',
            dataType: 'json',
            header: {
              'content-type': 'application/x-www-form-urlencoded' },

            data: pdata,
            success: function success(res) {
              console.log(res.data, '晚间菜场');
              _this5.evenimglist = res.data.data;



              if (res.data.data.length != 0) {
                _this5.eveningList = res.data.data.data;
              }
              setTimeout(function () {
                that.pd_mshewanjian();
              }, 100);
            } });


        } });


    },
    pd_mshewanjian: function pd_mshewanjian() {
      console.log(this.eveningList, '开始执行晚间菜场this.eveningList');
      console.log(this.spikeList, '开始执行限时秒杀this.spikeList');
      if (this.eveningList.length == 0) {
        console.log('晚间菜场this.eveningList为空');
        this.wanjian = 'none';
      } else if (this.spikeList.length == 0) {
        console.log('限时秒杀this.spikeList为空');
        this.miaosha = 'none';
      }
      if (this.eveningList.length > 0 && this.spikeList.length > 0) {
        this.eveningList = this.eveningList.slice(0, 2);
        var spikelenght = this.spikeList;
        this.spikeList = spikelenght.slice(0, 2);
        // this.spikeList = this.miaosha
        console.log(this.eveningList, '晚间菜场截断成功');
        console.log(this.spikeList, '限时秒杀截断成功');
      }
      if (this.eveningList.length == 0 && this.spikeList.length > 4) {
        console.log(this.spikeList, '限时秒杀4个成功');
        this.spikeList = this.spikeList.slice(0, 4);
      } else if (this.eveningList.length > 4 && this.spikeList.length == 0) {
        console.log(this.eveningList, '晚间菜场4个成功');
        this.eveningList = this.eveningList.slice(0, 4);
      }
    },
    // 晚间菜场
    getEvening: function getEvening() {
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
        // error
      }
      var arr = {
        stores_id: this.xshopInfo.store.stores_id,
        member_openid: this.memberinfo.openid };

      var pdata = _main.default.getSignStr(arr);

    },
    // 新人判断
    getnewList: function getnewList() {var _this6 = this;
      var arr = {
        mobile: this.memberinfo.mobile };

      var pdata = _main.default.getSignStr(arr);
      uni.request({
        url: _main.default.websiteUrl + '/api_v2/member/check_member_is_new_people',
        method: 'POST',
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded' },

        data: pdata,
        success: function success(res) {
          console.log(res.data, '还是不是一个新人');
          _this6.newcomer = res.data.data;
        },
        fail: function fail() {},
        complete: function complete() {} });

    },
    // 拼团
    getbuyList: function getbuyList() {var _this7 = this;
      var arr = {
        is_one: 1 };

      var pdata = _main.default.getSignStr(arr);
      uni.request({
        url: _main.default.websiteUrl + '/api_v2/stores/getgroupbuyinggoodslist',
        method: 'POST',
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded' },

        data: pdata,
        success: function success(res) {
          console.log(res.data.data, '拼团成功');
          _this7.buyList = res.data.data;

          // this.newcomer = res.data.data
        },
        fail: function fail() {},
        complete: function complete() {} });

    },
    clickTab: function clickTab(index) {
      this.tabIndex = index;
      console.log('data', index);
      uni.showLoading({
        title: '正在加载中' });

      this.shopList = [];
      this.page = 0;
      this.limit = 10;
      this.shopclass = [];
      this.towMenu = [];
      this.getClass(index, '!!!!!!!!');
    },
    // 获取分类
    getClass: function getClass(index) {var _this8 = this;
      console.log(index, '看看这个data有没有');
      this.isClass = false;
      //获取信息
      var arr = {
        stores_id: this.xshopInfo.store.stores_id };

      var pdata = _main.default.getSignStr(arr);
      uni.request({
        url: _main.default.websiteUrl + '/api_v2/mall_shop_v2/categorys',
        method: 'POST',
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded' },

        data: pdata,
        success: function success(res) {
          //console.log(res.data.data);
          if (res.data.data.length > 0) {
            if (index) {
              //console.log(1);
              for (var i in res.data.data) {
                if (res.data.data[i].category_id == index) {
                  //console.log(res.data.data[i].category_id);
                  //console.log(res.data.data[i].childs);
                  //获取一级
                  _this8.shopclass = res.data.data;
                  _this8.categoryId = res.data.data[i].category_id;
                  _this8.towMenu = res.data.data[i].childs;
                  _this8.categoryId = res.data.data[i].category_id;
                  _this8.tCategoryId = index;
                  //获取商品信息									
                  _this8.getGoods(index);
                }
              }
            } else {
              //console.log(res.data.data[0].category_id);
              //获取一级
              _this8.shopclass = res.data.data;
              _this8.categoryId = res.data.data[0].category_id;
              //获取二级
              _this8.towMenu = res.data.data[0].childs;
              _this8.tCategoryId = res.data.data[0].category_id;
              //获取商品信息
              _this8.getGoods(res.data.data[0].category_id);
              //console.log(res.data.data[0].childs[0].category_id);
            }
          } else {
            _this8.shopList = [];
          }

        },
        fail: function fail() {},
        complete: function complete() {} });

      // }
    },
    getGoods: function getGoods(index) {var _this9 = this;var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'add';
      this.sData = index;
      //console.log(this.memberinfo.openid);
      //获取信息
      var arr = {
        stores_id: this.xshopInfo.store.stores_id,
        category_id: index,
        content: '',
        member_openid: this.memberinfo.openid,
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
          console.log(res.data, '这里图片哪里去了 啊啊啊啊啊啊');
          _this9.xShow = true;
          uni.hideLoading();
          //console.log(res.data);
          _this9.tCategoryId = index;
          var max_page = res.data.total / _this9.limit;
          if (max_page <= _this9.page) {
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
            _this9.shopList = [];
          }
          datax.forEach(function (item) {
            _this9.shopList.push(item);
          });
          _this9.page = _this9.page + 1;
        },
        fail: function fail() {},
        complete: function complete() {} });

    },
    goOrderDinfo: function goOrderDinfo(data) {
      uni.navigateTo({
        url: "/pagesb/center/order_details?order_id=" + data.order_id + "&order_code=" + data.order_code });

    },
    //关闭弹窗
    gbTc: function gbTc() {
      this.tcStatus = 1;
      uni.showTabBar();
    },
    SJwat: function SJwat() {//APP小版本升级
      uni.showLoading({
        title: '正在安装,请稍后...' });

      uni.downloadFile({
        url: _main.default.websiteUrl + '/download/zxsc/sc.wgt',
        success: function success(downloadResult) {
          //console.log(downloadResult);
          if (downloadResult.statusCode === 200) {
            plus.runtime.install(downloadResult.tempFilePath, {
              force: false },
            function () {
              //console.log('install success...');
              uni.hideLoading();
              plus.runtime.restart();
            }, function (e) {
              //console.error('install fail...');
              uni.hideLoading();
              uni.showToast({
                title: '安装失败',
                icon: 'none' });

            });
          }
        } });

    },
    //检查服务器上app的版本，然后跳转到对应的地方进行升级
    getBanben: function getBanben() {























































    },
    xshow: function xshow(xthis) {
      try {//从本地缓存中同步获取指定 key 对应的内容。
        var value = uni.getStorageSync('memberinfo');
        var values = uni.getStorageSync('xshopInfo');
        var valuex = uni.getStorageSync('shoppingCarts');
        var de = uni.getStorageSync('deployinfo');
        if (de) {
          xthis.deployinfo = de;
          //console.log(JSON.stringify(de));
        }
        //console.log(values.store.stores_id);
        if (value) {
          xthis.memberinfo = value;
          xthis.login = true;
        }
        if (valuex) {
          xthis.shoppingCarts = valuex;
        }
        if (values) {
          xthis.xshopInfo = values;
          if (values.address.address == undefined) {
            xthis.maddress = values.current;
          } else {
            xthis.maddress = values.address.xq_name + values.address.mbh;
          }

          xthis.stores_name = values.store.stores_name;

          xthis.$refs.hxnb.conf.leftButton[0].txt = values.store.stores_name;
          console.log(xthis.$refs.hxnb.conf.leftButton[0].txt, '取回来菜场的名字');
          uni.setNavigationBarTitle({
            title: values.store.stores_name });

        }
        //获取默认门店是否存在
        var arr = {
          //stores_id:values.store.stores_id,
          xtype: 2 };

        var pdata = _main.default.getSignStr(arr);
        uni.request({
          url: _main.default.websiteUrl + '/api_v2/stores/index',
          method: 'POST',
          dataType: 'json',
          header: {
            'content-type': 'application/x-www-form-urlencoded' },

          data: pdata,
          success: function success(res) {
            //console.log(res);
            if (res.data.total == 0) {
              xthis.getShop();
            } else {
              xthis.getHome();
              xthis.clickTab(0);
              xthis.getnewList();
              xthis.getnewShopList();
              xthis.getbuyList();
              xthis.getnewCoupon();
              // xthis.getEvening();
              xthis.getTimespike();
              // setTimeout(function(){
              // 	xthis.pd_mshewanjian();
              // },1000)
              // xthis.getexlosIve();
            }
            //console.log(res.data);						
            if (xthis.memberinfo.length != 0) {
              xthis.getMer(); //检查会员是否存在
            }
            xthis.getOrderInfo();
            //xthis.getHome();
          },
          fail: function fail() {},
          complete: function complete() {} });

      } catch (e) {
        // error
      }
    },
    xlode: function xlode(xthis, data) {//lode














































      if (data.scene != undefined) {
        var xscene = decodeURIComponent(data.scene);
        var xx = xscene.split('&');
        if (xx[0] != undefined) {
          var x_mid = xx[0].split('=');
          var x_mid_s = x_mid[1];
        }
        if (xx[1] != undefined) {
          var x_stores_id = xx[1].split('=');
          var x_stores_id_s = x_stores_id[1];
        }
      }
      if (data.member_openid != undefined) {
        xthis.tjr_member_openid = data.member_openid;
        //console.log(1);
        //将推荐人id写入缓存
        uni.setStorage({
          key: 'tjr_member_openid',
          data: data.member_openid,
          success: function success() {} });

      }
      if (data.mid != undefined || data.scene != undefined) {
        var mid = 0;
        if (data.mid != undefined) {
          mid = data.mid;
        }
        if (data.scene != undefined) {
          mid = x_mid_s;
        }
        //将会员id转换成member_openid
        var arr = {
          member_openid: mid };

        var pdata = _main.default.getSignStr(arr);
        uni.request({
          url: _main.default.websiteUrl + '/api_v2/member/member_info',
          method: 'POST',
          dataType: 'json',
          header: {
            'content-type': 'application/x-www-form-urlencoded' },

          data: pdata,
          success: function success(res) {
            if (res.data.status == 'y') {
              var member_openid = res.data.data.member_openid;
            } else {
              var member_openid = '';
            }
            xthis.tjr_member_openid = member_openid;
            //将推荐人id写入缓存
            uni.setStorage({
              key: 'tjr_member_openid',
              data: member_openid,
              success: function success() {} });

          } });


      }
      if (data.stores_id != undefined || data.scene != undefined && xx[1] != undefined) {
        var stores_id = 0;
        if (data.stores_id != undefined) {
          stores_id = data.stores_id;
        }
        if (data.scene != undefined && xx[1] != undefined) {
          stores_id = x_stores_id_s;
        }
        xthis.tjr_stores_id = stores_id;
        //获取上级推荐人的店铺信息
        xthis.getTjrShop(stores_id);
      }
    },
    //查询配置信息//并且写入缓存
    getGg: function getGg() {var _this10 = this;
      //获取公告信息
      var xarr = {};
      var xpdata = _main.default.getSignStr(xarr);
      uni.request({
        url: _main.default.websiteUrl + '/api_v2/mall_base/base_set',
        method: 'POST',
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded' },

        data: xpdata,
        success: function success(xres) {
          if (xres.data.status == 'y') {
            //console.log(xres.data.data);
            _this10.announce_seat = xres.data.data.announce_seat;
            //获取公告信息
            var arr = {
              stores_id: _this10.xshopInfo.store.stores_id };

            var pdata = _main.default.getSignStr(arr);
            uni.request({
              url: _main.default.websiteUrl + '/api_v2/mall_base/announce',
              method: 'POST',
              dataType: 'json',
              header: {
                'content-type': 'application/x-www-form-urlencoded' },

              data: pdata,
              success: function success(res) {
                //console.log(res.data);
                var tg_str = '';
                for (var i in res.data.data) {
                  tg_str += res.data.data[i].name + " ";
                }
                _this10.tg_str = tg_str;
                _this10.xShow = true;
                uni.hideLoading();
              } });

          }
        } });


    },
    //获取订单信息
    getOrderInfo: function getOrderInfo() {var _this11 = this;

      var xarr = {
        status_dx: '2,3',
        member_openid: this.memberinfo.openid,
        limit: 10,
        offset: 0 };

      var xpdata = _main.default.getSignStr(xarr);
      uni.request({
        url: _main.default.websiteUrl + '/api_v2/mall_order/order_query',
        method: 'POST',
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded' },

        data: xpdata,
        success: function success(xres) {
          //console.log(xres.data);
          if (_this11.memberinfo.length != 0 && xres.data.data.order_info.length > 0) {
            _this11.orderStatus = 2;
          } else {
            _this11.orderStatus = 1;
          }
          if (xres.data.status == 'y') {
            _this11.order_info = xres.data.data.order_info;
          }
        } });


    },
    goTgList: function goTgList() {
      uni.navigateTo({
        url: "/pagesb/center/tg" });

    },
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
    initializeData: function initializeData() {var _this12 = this;
      //计算有多小种可选路径
      var result = this.simulatedDATA.difference.reduce(
      function (arrs, items) {
        return arrs.concat(
        items.attribute6.split(',').reduce(
        function (arr, item) {
          return arr.concat(
          arr.map(function (item2) {
            //利用对象属性的唯一性实现二维数组去重
            if (!_this12.shopItemInfo.hasOwnProperty([].concat(_toConsumableArray(item2), [item]))) {
              _this12.shopItemInfo[[].concat(_toConsumableArray(item2), [item])] = items;
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
    togglePopup: function togglePopup(type, open, data) {var _this13 = this;
      switch (type) {
        case 'bottom':
          this.content = '底部弹出 popup';
          this.xpopup = 1;
          this.getGoodsDetailsInfo(data);
          break;}

      this.type = type;
      this.$nextTick(function () {
        _this13.$refs['show' + open].open();
      });
    },
    cancel: function cancel(type) {
      this.$refs['show' + type].close();
    },
    change: function change(e) {
      //console.log(e);
      //console.log('是否打开:' + e.show)
    },
    //根据商品id查找当前商品基本信息
    getGoodsDetailsInfo: function getGoodsDetailsInfo(data) {var _this14 = this;
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
          _this14.goodsinfo = res.data.data.goods[0];
          //console.log(this.sale_num);
          _this14.choice = res.data.data;
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
          _this14.choice_tag = choice_tag;
          for (var _i in _this14.choice_tag) {//默认把备注标签加上一个t_name字段
            _this14.choice_tag[_i].goods_tag.t_name = "";
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
          _this14.simulatedDATA = {
            difference: s_choice_spec,
            specifications: x_choice_spec };

          _this14.initializeData(); //
          _this14.checkItem(-1); //
          //**/
          //读出默认单位
          for (var u in res.data.data.choice_unit) {
            if (res.data.data.choice_unit[u].unit == res.data.data.goods[0].unit) {
              res.data.data.choice_unit[u].site = 2;
            }
          }
          _this14.choice_unit = res.data.data.choice_unit;
          _this14.goodsinfos = res.data.data.goods;
          _this14.spec_id = res.data.data.goods[0].spec_id;
          _this14.spec = res.data.data.goods[0].spec;
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
    goToMs: function goToMs() {var _this15 = this; //立即购买
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
            stores_id: _this15.xshopInfo.store.stores_id,
            barcode_id: _this15.goodsinfo.barcode_id,
            num: 1,
            remark: bjRemark,
            sgt_ids: sgt_ids };

          //console.log(this.xshopInfo.store.stores_id,this.hd.barcode_id);
          var parr = {
            member_openid: _this15.memberinfo.openid,
            stores_id: _this15.xshopInfo.store.stores_id,
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
                _this15.xpopup = 2;
                uni.navigateTo({
                  url: "../goods_details/order_sure?order_code=" + xres.data.data.order_code + "&goods_l=" + JSON.stringify(
                  goods_l) });

              } else {
                uni.showToast({
                  icon: 'none',
                  title: xres.data.info });

                return;
              }
            } });

        } });


    },

    //跳转到另外的小程序
    tz: function tz() {
      wx.navigateToMiniProgram({
        appId: 'wxba05b8fc5f43289c',
        path: 'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Fdashboard%2Findex%3Fkdt_id%3D41594443',
        extraData: {
          foo: 'bar' },

        envVersion: 'release',
        success: function success(res) {
          // 打开成功
        } });

    },

    //检查会员是否存在
    getMer: function getMer() {
      var arr = {
        member_openid: this.memberinfo.openid };

      var pdata = _main.default.getSignStr(arr);
      uni.request({
        url: _main.default.websiteUrl + '/api_v2/member/member_info',
        method: 'POST',
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded' },

        data: pdata,
        success: function success(res) {
          //console.log(res.data);
          if (res.data.status == 'n' || res.data.data.status != 1) {
            try {
              var value = uni.getStorageSync('memberinfo');
              //写入缓存
              uni.setStorage({
                key: 'memberinfo',
                data: [],
                success: function success() {} });

              var xvalue = uni.getStorageSync('memberinfo');
            } catch (e) {
              // error
            }
          }
        },
        fail: function fail() {},
        complete: function complete() {} });

    },
    //购物车动画效果
    shopCart: function shopCart(barcode_id, type, v) {var _this16 = this;
      //console.log(v);
      var glist = [];
      glist[0] = {
        barcode_id: barcode_id,
        type: type };

      this.amintiond_list = glist;
      uni.getSystemInfo({
        success: function success(res) {
          _this16.wheight = res.windowHeight + 60;
        } });

      //console.log(this.wheight);
      var animation = uni.createAnimation({
        duration: 400,
        transformOrigin: "50% 50%",
        timingFunction: "linear",
        delay: 0 });

      animation.translate(0, 0).step({
        duration: 10 });

      this.animationData = animation.export();
      var view = uni.createSelectorQuery().select("#" + v);
      view.boundingClientRect(function (data) {
        animation.translate(-20, -20).step({
          duration: 50 }).
        translate(-40, -10).step({
          duration: 50 }).
        translate(-data.left + 240, _this16.wheight - data.bottom).step({
          duration: 150 });

        _this16.animationData = animation.export();
      }).exec();
      setTimeout(function () {
        this.amintiond_list = [];
      }.bind(this), 400);

    },
    //扫码
    sm: function sm() {
      uni.scanCode({
        success: function success(res) {
          //console.log('条码类型：' + res.scanType);
          //console.log('条码内容：' + res.result);
          //this.jrShoppingCart(1,goods_info);
          uni.navigateTo({
            url: "../serch/sm_goods_list?goods_code=" + res.result });

          return;
        } });

    },
    //搜索
    serchList: function serchList() {
      if (this.memberinfo.length == 0) {
        uni.navigateTo({
          url: "/pages/login/login" });

        return;
      }
      uni.navigateTo({
        url: "../serch/index" });

    } }, _defineProperty(_methods, "address_list", function address_list()

  {
    if (this.memberinfo.length == 0) {
      uni.navigateTo({
        url: "/pages/login/login" });

      return;
    }
    uni.navigateTo({
      url: "/pagesb/center/xxmd" });

  }), _defineProperty(_methods, "getShop", function getShop()

  {var _this17 = this;var s_lat = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;var s_lng = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var xxx = this;
    //获取用户当前经纬度
    uni.getLocation({
      type: 'wgs84',
      success: function success(res) {
        //console.log('当前位置的经度：' + res.longitude);
        //console.log('当前位置的纬度：' + res.latitude);
        xxx.lng = s_lng == false ? res.longitude : s_lng;
        xxx.lat = s_lat == false ? res.latitude : s_lat;
        //获取信息
        var arr = {
          lng: xxx.lng,
          lat: xxx.lat,
          member_openid: xxx.memberinfo.openid };

        var pdata = _main.default.getSignStr(arr);
        uni.request({
          url: _main.default.websiteUrl + '/api_v2/mall_base/get_store_address',
          method: 'POST',
          dataType: 'json',
          header: {
            'content-type': 'application/x-www-form-urlencoded' },

          data: pdata,
          success: function success(res) {
            //console.log(res.data.data);
            //console.log(sort(res.data));

            xxx.xshopInfo = res.data.data;
            //console.log(this.xshopInfo.store.stores_id);
            //写入缓存
            uni.setStorage({
              key: 'xshopInfo',
              data: res.data.data,
              success: function success() {} });

            uni.setStorage({
              key: 'shoppingCarts',
              data: [],
              success: function success() {} });

            if (res.data.data.address.length == 0) {
              xxx.maddress = res.data.data.current;
            } else {
              xxx.maddress = res.data.data.address.xq_name + res.data.data.address.mbh;
            }
            xxx.stores_name = res.data.data.store.stores_name;
            uni.setNavigationBarTitle({
              title: res.data.data.store.stores_name });

            //获取弹窗广告列表
            var tarr = {
              stores_id: res.data.data.store.stores_id };

            var tpdata = _main.default.getSignStr(tarr);
            uni.request({
              url: _main.default.websiteUrl + '/api_v2/mall_base/popup',
              method: 'POST',
              dataType: 'json',
              header: {
                'content-type': 'application/x-www-form-urlencoded' },

              data: tpdata,
              success: function success(tres) {
                if (tres.data.status == 'y') {
                  if (tres.data.data.length > 0) {
                    uni.hideTabBar();
                    _this17.tcGgList = tres.data.data;
                    _this17.tcStatus = 2;
                  }
                }
              },
              fail: function fail() {},
              complete: function complete() {} });

            xxx.getHome();
            xxx.clickTab(0);
            xxx.getnewList();
            xxx.getnewShopList();
            xxx.getnewCoupon();
            xxx.getbuyList();
            // xxx.getEvening();
            xxx.getTimespike();
            // setTimeout(function(){
            // 	xxx.pd_mshewanjian();
            // },1000)
            xxx.getexlosIve();
          } });

      },
      fail: function fail(res) {
        //console.log('当前位置的经度：' + res.longitude);
        //console.log('当前位置的纬度：' + res.latitude);
        xxx.lng = '';
        xxx.lat = '';
        //获取信息
        var arr = {
          lng: xxx.lng,
          lat: xxx.lat,
          member_openid: xxx.memberinfo.openid };

        var pdata = _main.default.getSignStr(arr);
        uni.request({
          url: _main.default.websiteUrl + '/api_v2/mall_base/get_store_address',
          method: 'POST',
          dataType: 'json',
          header: {
            'content-type': 'application/x-www-form-urlencoded' },

          data: pdata,
          success: function success(res) {
            //console.log(res.data.data);
            //console.log(sort(res.data));

            xxx.xshopInfo = res.data.data;
            //console.log(this.xshopInfo.store.stores_id);
            //写入缓存
            uni.setStorage({
              key: 'xshopInfo',
              data: res.data.data,
              success: function success() {} });

            uni.setStorage({
              key: 'shoppingCarts',
              data: [],
              success: function success() {} });

            if (res.data.data.address.length == 0) {
              xxx.maddress = res.data.data.current;
            } else {
              xxx.maddress = res.data.data.address.xq_name + res.data.data.address.mbh;
            }
            xxx.stores_name = res.data.data.store.stores_name;
            uni.setNavigationBarTitle({
              title: res.data.data.store.stores_name });

            //获取弹窗广告列表
            var tarr = {
              stores_id: res.data.data.store.stores_id };

            var tpdata = _main.default.getSignStr(tarr);
            uni.request({
              url: _main.default.websiteUrl + '/api_v2/mall_base/popup',
              method: 'POST',
              dataType: 'json',
              header: {
                'content-type': 'application/x-www-form-urlencoded' },

              data: tpdata,
              success: function success(tres) {
                if (tres.data.status == 'y') {
                  if (tres.data.data.length > 0) {
                    uni.hideTabBar();
                    _this17.tcGgList = tres.data.data;
                    _this17.tcStatus = 2;
                  }
                }
              },
              fail: function fail() {},
              complete: function complete() {} });

            xxx.getHome();
            xxx.getexlosIve();
            xxx.clickTab(0);
            xxx.getnewList();
            xxx.getnewShopList();
            xxx.getbuyList();
            xxx.getnewCoupon();
            // xxx.getEvening();
            xxx.getTimespike();
            // setTimeout(function(){
            // 	xxx.pd_mshewanjian();
            // },1000)
          } });

      } });

  }), _defineProperty(_methods, "sumShoppingCartNum", function sumShoppingCartNum()

  {
    //合计购物车数量
    var snum = 0;
    for (var i in this.shoppingCarts) {
      if (this.shoppingCarts[i].stores_id == this.xshopInfo.store.stores_id) {
        snum += parseFloat(this.shoppingCarts[i].num);
      }
    }
    this.shoppingCartNum = snum;
    uni.setTabBarBadge({
      index: 2,
      text: '' + snum + '' });

  }), _defineProperty(_methods, "memberfkm", function memberfkm()
  {
    if (this.memberinfo.length == 0) {
      uni.showToast({
        title: '请先登录',
        icon: 'none' });

      // uni.navigateTo({
      // 	url: "/pages/login/login"
      // })
      return;
    }
    uni.navigateTo({
      url: "/pagesb/center/member_fkm" });

  }), _defineProperty(_methods, "getHome", function getHome()
  {var _this18 = this; //首页基本配置
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
          //console.log(appres.data.data);
          _this18.deployinfo = appres.data.data;
          //console.log(this.memberinfo);
          var xstoresId = _this18.xshopInfo.length != 0 ? _this18.xshopInfo.store.stores_id : '';
          var xopenid = _this18.memberinfo.length != 0 ? _this18.memberinfo.openid : '';
          if (xstoresId > 0) {
            //获取信息
            var arr = {
              stores_id: xstoresId,
              member_openid: xopenid };

            var pdata = _main.default.getSignStr(arr);
            uni.request({
              url: _main.default.websiteUrl + '/api_v2/mall_shop_v2/index',
              method: 'POST',
              dataType: 'json',
              header: {
                'content-type': 'application/x-www-form-urlencoded' },

              data: pdata,
              success: function success(res) {

                _this18.bannerLen = res.data.data.banner.length;
                _this18.iconsLen = res.data.data.icons.length;
                _this18.homeGoods = res.data.data;
                // this.spikeList = res.data.data.groups[0].goods
                // console.log('限时秒杀',this.spikeList)
                if (_this18.homeGoods)
                _this18.getGg();
                console.log(_this18.homeGoods.groups);
                _this18.sumShoppingCartNum();
              } });

          }
        }
      } });


  }), _defineProperty(_methods, "jrShoppingCart", function jrShoppingCart(
  num_s, goods_info, type, v) {
    //num_s参数   0和1，0为减，1为加
    //goods_info参数  一维数组				
    //console.log(goods_info);
    //console.log(goods_info);
    //if(num_s==1){
    //console.log(123);
    //return;
    //}
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
    //如果重复，查询下重复的商品在购车的数量
    var snum = 0;
    for (var ix in this.shoppingCarts) {
      if (this.shoppingCarts[ix].barcode_id == goods_info.barcode_id) {
        snum = this.shoppingCarts[ix].num;
      }
    }
    //只留下不重复的
    var glistx = [];
    var mxx = 0;
    for (var i in this.shoppingCarts) {
      if (this.shoppingCarts[i].barcode_id != goods_info.barcode_id && this.shoppingCarts[i].stores_id == this.xshopInfo.
      store.stores_id && this.shoppingCarts[i].status == 1) {
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
    //console.log(glistx);
    var glist = [];
    var mx = 0;
    //console.log(snum);
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


    this.shoppingCarts = glistx.concat(glist);
    //console.log(this.shoppingCarts);
    //console.log(this.shoppingCarts);
    //写入缓存
    uni.setStorage({
      key: 'shoppingCarts',
      data: this.shoppingCarts,
      success: function success() {} });

    //console.log(this.shoppingCarts);
    this.sumShoppingCartNum();
    if (type != "dgg") {
      //调取动画效果
      this.shopCart(goods_info.barcode_id, type, v);
    }
    //console.log(this.shoppingCarts);
  }), _defineProperty(_methods, "goDetails", function goDetails(
  s_itme, group_id, gtype) {
    //console.log(s_itme);
    if (gtype == 1) {
      uni.navigateTo({
        url: "../goods_details/ms_goods_details?barcode_id=" + s_itme.barcode_id + "&s_id=" + s_itme.s_id });

    } else {
      uni.navigateTo({
        url: "../goods_details/goods_details?barcode_id=" + s_itme.barcode_id });

    }

  }), _defineProperty(_methods, "goZt", function goZt(

  type, jump_id, title, group_id, gtype) {
    //1商品详情
    //2分组
    //3自定义
    //4次卡
    //5分类
    //group_id==1000秒杀分组
    //console.log(type,jump_id,title,group_id,gtype);return;
    this.tcStatus = 1;
    uni.showTabBar();
    if (gtype == 1) {
      uni.navigateTo({
        url: "../home/ms" });

    } else {
      if (type == 1) {
        //跳转到商品详情
        uni.navigateTo({
          url: "../goods_details/goods_details?barcode_id=" + jump_id });

      } else if (type == 2) {
        uni.navigateTo({
          url: "../home/zt?group_id=" + jump_id + "&title=" + title });

      } else if (type == 4) {
        uni.navigateTo({
          url: "../home/ck_list?title=" + title });

      } else if (type == 5) {
        uni.navigateTo({
          url: "../home/classgoods?category_id=" + jump_id + "&title=" + title });

      } else if (type == 6) {
        uni.navigateTo({
          url: "../home/ms" });

      } else if (type == 7) {
        uni.navigateTo({
          url: "../home/xjj_list" });

      } else if (type == 8) {
        uni.navigateTo({
          url: "/pagesb/center/xxmd" });

      } else {
        uni.navigateTo({
          url: "../home/zdy?custom_id=" + jump_id + "&title=" + title });

      }
    }
  }), _defineProperty(_methods, "getTjrShop", function getTjrShop(

  storesId) {var _this19 = this;
    //获取信息
    var arr = {};
    var pdata = _main.default.getSignStr(arr);
    uni.request({
      url: _main.default.websiteUrl + '/api_v2/shop/index',
      method: 'POST',
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded' },

      data: pdata,
      success: function success(res) {
        //console.log(res.data.data);
        for (var i in res.data.data) {
          if (res.data.data[i].stores_id == storesId) {
            try {//从本地缓存中同步获取指定 key 对应的内容。
              var xvs = uni.getStorageSync('xshopInfo');
              //写入缓存
              var xxx = {
                address: xvs.address,
                current: xvs.current,
                store: res.data.data[i] };

            } catch (e) {

            } // error
            //this.hhhj = res.data.data[i];
            try {
              uni.setStorage({
                key: 'xshopInfo',
                data: xxx,
                success: function success() {} });

            } catch (e) {
              // error
            }
            try {//从本地缓存中同步获取指定 key 对应的内容。
              var value = uni.getStorageSync('memberinfo');
              var values = uni.getStorageSync('xshopInfo');
              var valuex = uni.getStorageSync('shoppingCarts');
              //console.log(values);
              if (values) {
                _this19.xshopInfo = values;
                if (values.address.address == undefined) {
                  _this19.maddress = values.current;
                } else {
                  _this19.maddress = values.address.xq_name + values.address.mbh;
                }
                //console.log(values.store.stores_name);
                _this19.stores_name = values.store.stores_name;
                uni.setNavigationBarTitle({
                  title: values.store.stores_name });

              }
              if (value) {
                _this19.memberinfo = value;
                _this19.login = true;
              }
              if (valuex) {
                _this19.shoppingCarts = valuex;
              }
            } catch (e) {
              // error
            }
            _this19.getHome();
            _this19.getexlosIve();
            _this19.clickTab(0);
            _this19.getnewList();
            _this19.getnewShopList();
            _this19.getbuyList();
            _this19.getnewCoupon();
            // this.getEvening();
            _this19.getTimespike();
            // setTimeout(function(){
            // 	this.pd_mshewanjian();
            // },1000)
          }
        }
      },
      fail: function fail() {},
      complete: function complete() {} });


  }), _methods) };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 27 */
/*!*************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/MC/applets/ceshi/pages/home/index.vue?vue&type=style&index=0&lang=css& ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=style&index=0&lang=css& */ 28);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 28 */
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/MC/applets/ceshi/pages/home/index.vue?vue&type=style&index=0&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })
],[[21,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/index.js.map