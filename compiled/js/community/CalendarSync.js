"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk"] = self["webpackChunk"] || []).push([["community/CalendarSync"],{

/***/ "../erp/apps/CalendarSync/Components/FormCalendarSyncSource.tsx"
/*!**********************************************************************!*\
  !*** ../erp/apps/CalendarSync/Components/FormCalendarSyncSource.tsx ***!
  \**********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ FormCalendarSyncSource)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"../react-ui/node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _hubleto_react_ui_components_cc_Form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @hubleto/react-ui/components/cc/Form */ \"../react-ui/components/cc/Form.tsx\");\n/* harmony import */ var _hubleto_react_ui_components_cc_FormInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @hubleto/react-ui/components/cc/FormInput */ \"../react-ui/components/cc/FormInput.tsx\");\n/* harmony import */ var _hubleto_react_ui_components_cc_Inputs_Lookup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @hubleto/react-ui/components/cc/Inputs/Lookup */ \"../react-ui/components/cc/Inputs/Lookup.tsx\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"../react-ui/node_modules/react/jsx-dev-runtime.js\");\n\n\n\n\n\nclass FormCalendarSyncSource extends _hubleto_react_ui_components_cc_Form__WEBPACK_IMPORTED_MODULE_1__[\"default\"] {\n  static defaultProps = {\n    ..._hubleto_react_ui_components_cc_Form__WEBPACK_IMPORTED_MODULE_1__[\"default\"].defaultProps,\n    model: 'Hubleto/App/Community/Customers/Models/CustomerActivity'\n  };\n  props;\n  state;\n  translationContext = 'Hubleto\\\\App\\\\Community\\\\CalendarSync\\\\Loader';\n  translationContextInner = 'Components\\\\FormSource';\n  renderContent() {\n    return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {\n      children: [this.inputWrapper('name'), this.inputWrapper('type'), this.inputWrapper('link'), this.state.record.type == 'google' ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(\"div\", {\n        className: \"alert-info mt-1\",\n        children: [this.translate('Enter the Calendar ID from the settings of your calendar in Google Calendar (look at the bottom of the page).'), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(\"br\", {}, void 0, false), \" \", this.translate('It should be in the form of'), \" \", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(\"span\", {\n          children: ['<', \"Google Calendar identifier\", '>', \"@group.calendar.google.com\"]\n        }, void 0, true), \".\", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(\"br\", {}, void 0, false), \" \", this.translate('The calendar must also be set to public or the API Key specified in the config file must have access to it.')]\n      }, void 0, true) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {}, void 0, false), this.state.record.type == 'ics' ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(\"div\", {\n        className: \"alert-info mt-1\",\n        children: this.translate('Enter the URL that points to an ICS file.')\n      }, void 0, false) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {}, void 0, false), this.inputWrapper('active'), this.state.record.type == 'google' ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(\"div\", {\n        className: \"alert-warning mt-1\",\n        children: this.translate('When using Google calendar, make sure you define an API key in ConfigEnv.php: $config[\\'google-api-key\\'] = ...')\n      }, void 0, false) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {}, void 0, false)]\n    }, void 0, true);\n  }\n}\n\n//# sourceURL=webpack:///../erp/apps/CalendarSync/Components/FormCalendarSyncSource.tsx?\n}");

/***/ },

/***/ "../erp/apps/CalendarSync/Components/TableCalendarSyncSources.tsx"
/*!************************************************************************!*\
  !*** ../erp/apps/CalendarSync/Components/TableCalendarSyncSources.tsx ***!
  \************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ TableCalendarSyncSources)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"../react-ui/node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _hubleto_react_ui_components_cc_Table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @hubleto/react-ui/components/cc/Table */ \"../react-ui/components/cc/Table.tsx\");\n/* harmony import */ var _FormCalendarSyncSource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FormCalendarSyncSource */ \"../erp/apps/CalendarSync/Components/FormCalendarSyncSource.tsx\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"../react-ui/node_modules/react/jsx-dev-runtime.js\");\n\n\n\n\nclass TableCalendarSyncSources extends _hubleto_react_ui_components_cc_Table__WEBPACK_IMPORTED_MODULE_1__[\"default\"] {\n  static defaultProps = {\n    ..._hubleto_react_ui_components_cc_Table__WEBPACK_IMPORTED_MODULE_1__[\"default\"].defaultProps,\n    formUseModalSimple: true,\n    model: 'Hubleto/App/Community/CalendarSync/Models/Source'\n  };\n  props = null;\n  state = null;\n  translationContext = 'Hubleto\\\\App\\\\Community\\\\CalendarSync\\\\Loader';\n  translationContextInner = 'Components\\\\TableSources';\n  constructor(props) {\n    super(props);\n    this.props = props;\n    this.state = this.getStateFromProps(props);\n  }\n  renderForm() {\n    let formDescription = this.getFormProps();\n    return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_FormCalendarSyncSource__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n      ...formDescription\n    }, void 0, false);\n  }\n}\n\n//# sourceURL=webpack:///../erp/apps/CalendarSync/Components/TableCalendarSyncSources.tsx?\n}");

/***/ },

/***/ "../erp/apps/CalendarSync/Loader.tsx"
/*!*******************************************!*\
  !*** ../erp/apps/CalendarSync/Loader.tsx ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Components_TableCalendarSyncSources__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Components/TableCalendarSyncSources */ \"../erp/apps/CalendarSync/Components/TableCalendarSyncSources.tsx\");\n\nglobalThis.hubleto.registerReactComponent('TableCalendarSyncSources', _Components_TableCalendarSyncSources__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n//# sourceURL=webpack:///../erp/apps/CalendarSync/Loader.tsx?\n}");

/***/ }

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["react-ui","modules","main"], () => (__webpack_exec__("../erp/apps/CalendarSync/Loader.tsx")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);