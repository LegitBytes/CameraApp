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

/***/ "./database/migrations/20210516060320-integrator.js":
/*!**********************************************************!*\
  !*** ./database/migrations/20210516060320-integrator.js ***!
  \**********************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = {\n  up: async (queryInterface, Sequelize) => {\n    await queryInterface.createTable(\"integrator\", {\n      integratorId: {\n        type: Sequelize.UUID,\n        allowNull: false,\n        primaryKey: true,\n        defaultValue: Sequelize.UUIDV4,\n      },\n      name: {\n        type: Sequelize.STRING,\n      },\n\n      email: {\n        type: Sequelize.STRING,\n        validate: {\n          isEmail: true,\n        },\n      },\n      phone: {\n        type: Sequelize.INTEGER,\n        validate: {\n          len: [10, 10],\n        },\n      },\n      isDisabled: {\n        type: Sequelize.BOOLEAN,\n        default: false,\n      },\n      createdAt: {\n        type: Sequelize.DATE,\n        allowNull: false,\n      },\n      updatedAt: {\n        type: Sequelize.DATE,\n        allowNull: false,\n      },\n    });\n  },\n\n  down: async (queryInterface, Sequelize) => {\n    await queryInterface.dropTable(\"integrator\");\n  },\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9kYXRhYmFzZS9taWdyYXRpb25zLzIwMjEwNTE2MDYwMzIwLWludGVncmF0b3IuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90cy1zZXF1ZWxpemUtZXhwLy4vZGF0YWJhc2UvbWlncmF0aW9ucy8yMDIxMDUxNjA2MDMyMC1pbnRlZ3JhdG9yLmpzP2QyYTciXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB1cDogYXN5bmMgKHF1ZXJ5SW50ZXJmYWNlLCBTZXF1ZWxpemUpID0+IHtcbiAgICBhd2FpdCBxdWVyeUludGVyZmFjZS5jcmVhdGVUYWJsZShcImludGVncmF0b3JcIiwge1xuICAgICAgaW50ZWdyYXRvcklkOiB7XG4gICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5VVUlELFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgICBwcmltYXJ5S2V5OiB0cnVlLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IFNlcXVlbGl6ZS5VVUlEVjQsXG4gICAgICB9LFxuICAgICAgbmFtZToge1xuICAgICAgICB0eXBlOiBTZXF1ZWxpemUuU1RSSU5HLFxuICAgICAgfSxcblxuICAgICAgZW1haWw6IHtcbiAgICAgICAgdHlwZTogU2VxdWVsaXplLlNUUklORyxcbiAgICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgICBpc0VtYWlsOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHBob25lOiB7XG4gICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5JTlRFR0VSLFxuICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgIGxlbjogWzEwLCAxMF0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgaXNEaXNhYmxlZDoge1xuICAgICAgICB0eXBlOiBTZXF1ZWxpemUuQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgY3JlYXRlZEF0OiB7XG4gICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5EQVRFLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHVwZGF0ZWRBdDoge1xuICAgICAgICB0eXBlOiBTZXF1ZWxpemUuREFURSxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0sXG5cbiAgZG93bjogYXN5bmMgKHF1ZXJ5SW50ZXJmYWNlLCBTZXF1ZWxpemUpID0+IHtcbiAgICBhd2FpdCBxdWVyeUludGVyZmFjZS5kcm9wVGFibGUoXCJpbnRlZ3JhdG9yXCIpO1xuICB9LFxufTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./database/migrations/20210516060320-integrator.js\n");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./database/migrations/20210516060320-integrator.js");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;