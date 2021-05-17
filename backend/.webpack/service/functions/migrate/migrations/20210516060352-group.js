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

/***/ "./database/migrations/20210516060352-group.js":
/*!*****************************************************!*\
  !*** ./database/migrations/20210516060352-group.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\r\n\r\nmodule.exports = {\r\n  up: async (queryInterface, Sequelize) => {\r\n    await queryInterface.createTable(\"groups\", {\r\n      groupId: {\r\n        type: Sequelize.UUID,\r\n        allowNull: false,\r\n        primaryKey: true,\r\n      },\r\n      groupName: {\r\n        type: Sequelize.STRING,\r\n        allowNull: false,\r\n      },\r\n      isDisabled: {\r\n        type: Sequelize.BOOLEAN,\r\n        defaultValue: false,\r\n      },\r\n      integratorId: {\r\n        type: Sequelize.UUID,\r\n        references: {\r\n          model: \"integrator\",\r\n          key: \"integratorId\",\r\n        },\r\n      },\r\n      createdAt: {\r\n        type: Sequelize.DATE,\r\n        allowNull: false,\r\n      },\r\n      updatedAt: {\r\n        type: Sequelize.DATE,\r\n        allowNull: false,\r\n      },\r\n    });\r\n  },\r\n\r\n  down: async (queryInterface, Sequelize) => {\r\n    await queryInterface.dropTable(\"groups\");\r\n  },\r\n};\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9kYXRhYmFzZS9taWdyYXRpb25zLzIwMjEwNTE2MDYwMzUyLWdyb3VwLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdHMtc2VxdWVsaXplLWV4cC8uL2RhdGFiYXNlL21pZ3JhdGlvbnMvMjAyMTA1MTYwNjAzNTItZ3JvdXAuanM/ODcyOSJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIHVwOiBhc3luYyAocXVlcnlJbnRlcmZhY2UsIFNlcXVlbGl6ZSkgPT4ge1xyXG4gICAgYXdhaXQgcXVlcnlJbnRlcmZhY2UuY3JlYXRlVGFibGUoXCJncm91cHNcIiwge1xyXG4gICAgICBncm91cElkOiB7XHJcbiAgICAgICAgdHlwZTogU2VxdWVsaXplLlVVSUQsXHJcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcclxuICAgICAgICBwcmltYXJ5S2V5OiB0cnVlLFxyXG4gICAgICB9LFxyXG4gICAgICBncm91cE5hbWU6IHtcclxuICAgICAgICB0eXBlOiBTZXF1ZWxpemUuU1RSSU5HLFxyXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXHJcbiAgICAgIH0sXHJcbiAgICAgIGlzRGlzYWJsZWQ6IHtcclxuICAgICAgICB0eXBlOiBTZXF1ZWxpemUuQk9PTEVBTixcclxuICAgICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxyXG4gICAgICB9LFxyXG4gICAgICBpbnRlZ3JhdG9ySWQ6IHtcclxuICAgICAgICB0eXBlOiBTZXF1ZWxpemUuVVVJRCxcclxuICAgICAgICByZWZlcmVuY2VzOiB7XHJcbiAgICAgICAgICBtb2RlbDogXCJpbnRlZ3JhdG9yXCIsXHJcbiAgICAgICAgICBrZXk6IFwiaW50ZWdyYXRvcklkXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAgY3JlYXRlZEF0OiB7XHJcbiAgICAgICAgdHlwZTogU2VxdWVsaXplLkRBVEUsXHJcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcclxuICAgICAgfSxcclxuICAgICAgdXBkYXRlZEF0OiB7XHJcbiAgICAgICAgdHlwZTogU2VxdWVsaXplLkRBVEUsXHJcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIGRvd246IGFzeW5jIChxdWVyeUludGVyZmFjZSwgU2VxdWVsaXplKSA9PiB7XHJcbiAgICBhd2FpdCBxdWVyeUludGVyZmFjZS5kcm9wVGFibGUoXCJncm91cHNcIik7XHJcbiAgfSxcclxufTtcclxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./database/migrations/20210516060352-group.js\n");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./database/migrations/20210516060352-group.js");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;