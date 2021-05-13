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

/***/ "./database/migrations/20210506102228-gateway.js":
/*!*******************************************************!*\
  !*** ./database/migrations/20210506102228-gateway.js ***!
  \*******************************************************/
/***/ ((module) => {

eval("/* eslint-disable new-cap */\r\n\r\n\r\nmodule.exports = {\r\n  up: async (queryInterface, Sequelize) => {\r\n    await queryInterface.createTable(\r\n        {tableName: 'gateway', schema: 'sensorum'},\r\n        {\r\n          gateway_id: {\r\n            type: Sequelize.INTEGER,\r\n            allowNull: false,\r\n            primaryKey: true,\r\n            autoIncrement: true,\r\n          },\r\n          mac_address: {\r\n            type: Sequelize.STRING(17),\r\n            allowNull: false,\r\n          },\r\n          aws_thing_name: {\r\n            type: Sequelize.STRING,\r\n            allowNull: false,\r\n          },\r\n          created_at: {\r\n            type: Sequelize.DATE,\r\n            allowNull: false,\r\n          },\r\n          updated_at: {\r\n            type: Sequelize.DATE,\r\n            allowNull: false,\r\n          },\r\n          participant_id: {\r\n            type: Sequelize.INTEGER,\r\n            allowNull: false,\r\n            references: {\r\n              model: 'participant',\r\n              key: 'participant_id',\r\n            },\r\n            onUpdate: 'cascade',\r\n            onDelete: 'set null',\r\n          },\r\n        });\r\n  },\r\n\r\n  down: async (queryInterface, Sequelize) => {\r\n    await queryInterface.dropTable({tableName: 'gateway', schema: 'sensorum'});\r\n  },\r\n};\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9kYXRhYmFzZS9taWdyYXRpb25zLzIwMjEwNTA2MTAyMjI4LWdhdGV3YXkuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90cy1zZXF1ZWxpemUtZXhwLy4vZGF0YWJhc2UvbWlncmF0aW9ucy8yMDIxMDUwNjEwMjIyOC1nYXRld2F5LmpzP2JhYjQiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbmV3LWNhcCAqL1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICB1cDogYXN5bmMgKHF1ZXJ5SW50ZXJmYWNlLCBTZXF1ZWxpemUpID0+IHtcclxuICAgIGF3YWl0IHF1ZXJ5SW50ZXJmYWNlLmNyZWF0ZVRhYmxlKFxyXG4gICAgICAgIHt0YWJsZU5hbWU6ICdnYXRld2F5Jywgc2NoZW1hOiAnc2Vuc29ydW0nfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBnYXRld2F5X2lkOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5JTlRFR0VSLFxyXG4gICAgICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxyXG4gICAgICAgICAgICBwcmltYXJ5S2V5OiB0cnVlLFxyXG4gICAgICAgICAgICBhdXRvSW5jcmVtZW50OiB0cnVlLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIG1hY19hZGRyZXNzOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5TVFJJTkcoMTcpLFxyXG4gICAgICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGF3c190aGluZ19uYW1lOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5TVFJJTkcsXHJcbiAgICAgICAgICAgIGFsbG93TnVsbDogZmFsc2UsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgY3JlYXRlZF9hdDoge1xyXG4gICAgICAgICAgICB0eXBlOiBTZXF1ZWxpemUuREFURSxcclxuICAgICAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB1cGRhdGVkX2F0OiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5EQVRFLFxyXG4gICAgICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHBhcnRpY2lwYW50X2lkOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5JTlRFR0VSLFxyXG4gICAgICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxyXG4gICAgICAgICAgICByZWZlcmVuY2VzOiB7XHJcbiAgICAgICAgICAgICAgbW9kZWw6ICdwYXJ0aWNpcGFudCcsXHJcbiAgICAgICAgICAgICAga2V5OiAncGFydGljaXBhbnRfaWQnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvblVwZGF0ZTogJ2Nhc2NhZGUnLFxyXG4gICAgICAgICAgICBvbkRlbGV0ZTogJ3NldCBudWxsJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgfSxcclxuXHJcbiAgZG93bjogYXN5bmMgKHF1ZXJ5SW50ZXJmYWNlLCBTZXF1ZWxpemUpID0+IHtcclxuICAgIGF3YWl0IHF1ZXJ5SW50ZXJmYWNlLmRyb3BUYWJsZSh7dGFibGVOYW1lOiAnZ2F0ZXdheScsIHNjaGVtYTogJ3NlbnNvcnVtJ30pO1xyXG4gIH0sXHJcbn07XHJcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./database/migrations/20210506102228-gateway.js\n");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./database/migrations/20210506102228-gateway.js");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;