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

/***/ "./database/migrations/20210506103733-cough-file.js":
/*!**********************************************************!*\
  !*** ./database/migrations/20210506103733-cough-file.js ***!
  \**********************************************************/
/***/ ((module) => {

eval("\r\n\r\nmodule.exports = {\r\n  up: async (queryInterface, Sequelize) => {\r\n    await queryInterface.createTable(\r\n        {tableName: 'cough_file', schema: 'sensorum'},\r\n        {\r\n          cough_file_id: {\r\n            type: Sequelize.UUID,\r\n            allowNull: false,\r\n            primaryKey: true,\r\n          },\r\n          sensor_event_uid: {\r\n            type: Sequelize.UUID,\r\n            allowNull: false,\r\n            references: {\r\n              model: 'sensor_event',\r\n              key: 'sensor_event_uid',\r\n            },\r\n            onDelete: 'cascade',\r\n            onUpdate: 'cascade',\r\n          },\r\n          file_location: {\r\n            type: Sequelize.TEXT,\r\n            allowNull: false,\r\n          },\r\n          created_at: {\r\n            type: Sequelize.DATE,\r\n            allowNull: false,\r\n          },\r\n          updated_at: {\r\n            type: Sequelize.DATE,\r\n            allowNull: false,\r\n          },\r\n\r\n        });\r\n  },\r\n\r\n  down: async (queryInterface, Sequelize) => {\r\n    await queryInterface.dropTable(\r\n        {tableName: 'cough_file', schema: 'sensorum'},\r\n    );\r\n  },\r\n};\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9kYXRhYmFzZS9taWdyYXRpb25zLzIwMjEwNTA2MTAzNzMzLWNvdWdoLWZpbGUuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90cy1zZXF1ZWxpemUtZXhwLy4vZGF0YWJhc2UvbWlncmF0aW9ucy8yMDIxMDUwNjEwMzczMy1jb3VnaC1maWxlLmpzPzZhNjEiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgdXA6IGFzeW5jIChxdWVyeUludGVyZmFjZSwgU2VxdWVsaXplKSA9PiB7XHJcbiAgICBhd2FpdCBxdWVyeUludGVyZmFjZS5jcmVhdGVUYWJsZShcclxuICAgICAgICB7dGFibGVOYW1lOiAnY291Z2hfZmlsZScsIHNjaGVtYTogJ3NlbnNvcnVtJ30sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgY291Z2hfZmlsZV9pZDoge1xyXG4gICAgICAgICAgICB0eXBlOiBTZXF1ZWxpemUuVVVJRCxcclxuICAgICAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcclxuICAgICAgICAgICAgcHJpbWFyeUtleTogdHJ1ZSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBzZW5zb3JfZXZlbnRfdWlkOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5VVUlELFxyXG4gICAgICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxyXG4gICAgICAgICAgICByZWZlcmVuY2VzOiB7XHJcbiAgICAgICAgICAgICAgbW9kZWw6ICdzZW5zb3JfZXZlbnQnLFxyXG4gICAgICAgICAgICAgIGtleTogJ3NlbnNvcl9ldmVudF91aWQnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbkRlbGV0ZTogJ2Nhc2NhZGUnLFxyXG4gICAgICAgICAgICBvblVwZGF0ZTogJ2Nhc2NhZGUnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGZpbGVfbG9jYXRpb246IHtcclxuICAgICAgICAgICAgdHlwZTogU2VxdWVsaXplLlRFWFQsXHJcbiAgICAgICAgICAgIGFsbG93TnVsbDogZmFsc2UsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgY3JlYXRlZF9hdDoge1xyXG4gICAgICAgICAgICB0eXBlOiBTZXF1ZWxpemUuREFURSxcclxuICAgICAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB1cGRhdGVkX2F0OiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5EQVRFLFxyXG4gICAgICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxyXG4gICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgfSxcclxuXHJcbiAgZG93bjogYXN5bmMgKHF1ZXJ5SW50ZXJmYWNlLCBTZXF1ZWxpemUpID0+IHtcclxuICAgIGF3YWl0IHF1ZXJ5SW50ZXJmYWNlLmRyb3BUYWJsZShcclxuICAgICAgICB7dGFibGVOYW1lOiAnY291Z2hfZmlsZScsIHNjaGVtYTogJ3NlbnNvcnVtJ30sXHJcbiAgICApO1xyXG4gIH0sXHJcbn07XHJcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./database/migrations/20210506103733-cough-file.js\n");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./database/migrations/20210506103733-cough-file.js");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;