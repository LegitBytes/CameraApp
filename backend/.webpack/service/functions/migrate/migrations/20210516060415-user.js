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

/***/ "./database/migrations/20210516060415-user.js":
/*!****************************************************!*\
  !*** ./database/migrations/20210516060415-user.js ***!
  \****************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = {\n  up: async (queryInterface, Sequelize) => {\n    await queryInterface.createTable(\"user\", {\n      userId: {\n        type: Sequelize.UUID,\n        allowNull: false,\n        primaryKey: true,\n      },\n      userEmail: {\n        type: Sequelize.STRING,\n        validate: {\n          isEmail: true,\n          notEmpty: true,\n        },\n      },\n      groupId: {\n        type: Sequelize.UUID,\n        allowNull: false,\n        references: {\n          model: \"groups\",\n          key: \"groupId\",\n        },\n      },\n      integratorId: {\n        type: Sequelize.UUID,\n        allowNull: false,\n        references: {\n          model: \"integrator\",\n          key: \"integratorId\",\n        },\n      },\n      isDisabled: {\n        type: Sequelize.BOOLEAN,\n        default: false,\n      },\n      createdAt: {\n        type: Sequelize.DATE,\n        allowNull: false,\n      },\n      updatedAt: {\n        type: Sequelize.DATE,\n        allowNull: false,\n      },\n    });\n  },\n\n  down: async (queryInterface, Sequelize) => {\n    await queryInterface.dropTable(\"user\");\n  },\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9kYXRhYmFzZS9taWdyYXRpb25zLzIwMjEwNTE2MDYwNDE1LXVzZXIuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90cy1zZXF1ZWxpemUtZXhwLy4vZGF0YWJhc2UvbWlncmF0aW9ucy8yMDIxMDUxNjA2MDQxNS11c2VyLmpzPzFiNDQiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB1cDogYXN5bmMgKHF1ZXJ5SW50ZXJmYWNlLCBTZXF1ZWxpemUpID0+IHtcbiAgICBhd2FpdCBxdWVyeUludGVyZmFjZS5jcmVhdGVUYWJsZShcInVzZXJcIiwge1xuICAgICAgdXNlcklkOiB7XG4gICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5VVUlELFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgICBwcmltYXJ5S2V5OiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHVzZXJFbWFpbDoge1xuICAgICAgICB0eXBlOiBTZXF1ZWxpemUuU1RSSU5HLFxuICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgIGlzRW1haWw6IHRydWUsXG4gICAgICAgICAgbm90RW1wdHk6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgZ3JvdXBJZDoge1xuICAgICAgICB0eXBlOiBTZXF1ZWxpemUuVVVJRCxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgICAgcmVmZXJlbmNlczoge1xuICAgICAgICAgIG1vZGVsOiBcImdyb3Vwc1wiLFxuICAgICAgICAgIGtleTogXCJncm91cElkXCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgaW50ZWdyYXRvcklkOiB7XG4gICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5VVUlELFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgICByZWZlcmVuY2VzOiB7XG4gICAgICAgICAgbW9kZWw6IFwiaW50ZWdyYXRvclwiLFxuICAgICAgICAgIGtleTogXCJpbnRlZ3JhdG9ySWRcIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBpc0Rpc2FibGVkOiB7XG4gICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5CT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBjcmVhdGVkQXQ6IHtcbiAgICAgICAgdHlwZTogU2VxdWVsaXplLkRBVEUsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgdXBkYXRlZEF0OiB7XG4gICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5EQVRFLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfSxcblxuICBkb3duOiBhc3luYyAocXVlcnlJbnRlcmZhY2UsIFNlcXVlbGl6ZSkgPT4ge1xuICAgIGF3YWl0IHF1ZXJ5SW50ZXJmYWNlLmRyb3BUYWJsZShcInVzZXJcIik7XG4gIH0sXG59O1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./database/migrations/20210516060415-user.js\n");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./database/migrations/20210516060415-user.js");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;