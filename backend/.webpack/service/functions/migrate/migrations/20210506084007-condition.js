/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./database/migrations/20210506084007-condition.js":
/*!*********************************************************!*\
  !*** ./database/migrations/20210506084007-condition.js ***!
  \*********************************************************/
/***/ ((module) => {

eval("\r\n\r\nmodule.exports = {\r\n  up: async (queryInterface, Sequelize) => {\r\n    await queryInterface.createTable(\r\n        {tableName: 'condition', schema: 'sensorum'},\r\n        {\r\n          condition_id: {\r\n            type: Sequelize.INTEGER,\r\n            primaryKey: true,\r\n            allowNull: false,\r\n            autoIncrement: true,\r\n          },\r\n          condition_name: {\r\n            type: Sequelize.TEXT,\r\n            allowNull: false,\r\n          },\r\n        });\r\n  },\r\n\r\n  down: async (queryInterface, Sequelize) => {\r\n    await queryInterface.dropTable(\r\n        {tableName: 'condition', schema: 'sensorum'},\r\n    );\r\n  },\r\n};\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9kYXRhYmFzZS9taWdyYXRpb25zLzIwMjEwNTA2MDg0MDA3LWNvbmRpdGlvbi5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL3RzLXNlcXVlbGl6ZS1leHAvLi9kYXRhYmFzZS9taWdyYXRpb25zLzIwMjEwNTA2MDg0MDA3LWNvbmRpdGlvbi5qcz80OThkIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIHVwOiBhc3luYyAocXVlcnlJbnRlcmZhY2UsIFNlcXVlbGl6ZSkgPT4ge1xyXG4gICAgYXdhaXQgcXVlcnlJbnRlcmZhY2UuY3JlYXRlVGFibGUoXHJcbiAgICAgICAge3RhYmxlTmFtZTogJ2NvbmRpdGlvbicsIHNjaGVtYTogJ3NlbnNvcnVtJ30sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgY29uZGl0aW9uX2lkOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5JTlRFR0VSLFxyXG4gICAgICAgICAgICBwcmltYXJ5S2V5OiB0cnVlLFxyXG4gICAgICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxyXG4gICAgICAgICAgICBhdXRvSW5jcmVtZW50OiB0cnVlLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGNvbmRpdGlvbl9uYW1lOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5URVhULFxyXG4gICAgICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICB9LFxyXG5cclxuICBkb3duOiBhc3luYyAocXVlcnlJbnRlcmZhY2UsIFNlcXVlbGl6ZSkgPT4ge1xyXG4gICAgYXdhaXQgcXVlcnlJbnRlcmZhY2UuZHJvcFRhYmxlKFxyXG4gICAgICAgIHt0YWJsZU5hbWU6ICdjb25kaXRpb24nLCBzY2hlbWE6ICdzZW5zb3J1bSd9LFxyXG4gICAgKTtcclxuICB9LFxyXG59O1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./database/migrations/20210506084007-condition.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./database/migrations/20210506084007-condition.js");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;