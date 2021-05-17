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

eval("\r\n\r\nmodule.exports = {\r\n  up: async (queryInterface, Sequelize) => {\r\n    await queryInterface.createTable(\"user\", {\r\n      userId: {\r\n        type: Sequelize.UUID,\r\n        allowNull: false,\r\n        primaryKey: true,\r\n      },\r\n      userEmail: {\r\n        type: Sequelize.STRING,\r\n        validate: {\r\n          isEmail: true,\r\n          notEmpty: true,\r\n        },\r\n      },\r\n      groupId: {\r\n        type: Sequelize.UUID,\r\n        allowNull: false,\r\n        references: {\r\n          model: \"groups\",\r\n          key: \"groupId\",\r\n        },\r\n      },\r\n      integratorId: {\r\n        type: Sequelize.UUID,\r\n        allowNull: false,\r\n        references: {\r\n          model: \"integrator\",\r\n          key: \"integratorId\",\r\n        },\r\n      },\r\n      isDisabled: {\r\n        type: Sequelize.BOOLEAN,\r\n        default: false,\r\n      },\r\n      createdAt: {\r\n        type: Sequelize.DATE,\r\n        allowNull: false,\r\n      },\r\n      updatedAt: {\r\n        type: Sequelize.DATE,\r\n        allowNull: false,\r\n      },\r\n    });\r\n  },\r\n\r\n  down: async (queryInterface, Sequelize) => {\r\n    await queryInterface.dropTable(\"user\");\r\n  },\r\n};\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9kYXRhYmFzZS9taWdyYXRpb25zLzIwMjEwNTE2MDYwNDE1LXVzZXIuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90cy1zZXF1ZWxpemUtZXhwLy4vZGF0YWJhc2UvbWlncmF0aW9ucy8yMDIxMDUxNjA2MDQxNS11c2VyLmpzPzFiNDQiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICB1cDogYXN5bmMgKHF1ZXJ5SW50ZXJmYWNlLCBTZXF1ZWxpemUpID0+IHtcclxuICAgIGF3YWl0IHF1ZXJ5SW50ZXJmYWNlLmNyZWF0ZVRhYmxlKFwidXNlclwiLCB7XHJcbiAgICAgIHVzZXJJZDoge1xyXG4gICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5VVUlELFxyXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXHJcbiAgICAgICAgcHJpbWFyeUtleTogdHJ1ZSxcclxuICAgICAgfSxcclxuICAgICAgdXNlckVtYWlsOiB7XHJcbiAgICAgICAgdHlwZTogU2VxdWVsaXplLlNUUklORyxcclxuICAgICAgICB2YWxpZGF0ZToge1xyXG4gICAgICAgICAgaXNFbWFpbDogdHJ1ZSxcclxuICAgICAgICAgIG5vdEVtcHR5OiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIGdyb3VwSWQ6IHtcclxuICAgICAgICB0eXBlOiBTZXF1ZWxpemUuVVVJRCxcclxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxyXG4gICAgICAgIHJlZmVyZW5jZXM6IHtcclxuICAgICAgICAgIG1vZGVsOiBcImdyb3Vwc1wiLFxyXG4gICAgICAgICAga2V5OiBcImdyb3VwSWRcIixcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICBpbnRlZ3JhdG9ySWQ6IHtcclxuICAgICAgICB0eXBlOiBTZXF1ZWxpemUuVVVJRCxcclxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxyXG4gICAgICAgIHJlZmVyZW5jZXM6IHtcclxuICAgICAgICAgIG1vZGVsOiBcImludGVncmF0b3JcIixcclxuICAgICAgICAgIGtleTogXCJpbnRlZ3JhdG9ySWRcIixcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICBpc0Rpc2FibGVkOiB7XHJcbiAgICAgICAgdHlwZTogU2VxdWVsaXplLkJPT0xFQU4sXHJcbiAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIH0sXHJcbiAgICAgIGNyZWF0ZWRBdDoge1xyXG4gICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5EQVRFLFxyXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXHJcbiAgICAgIH0sXHJcbiAgICAgIHVwZGF0ZWRBdDoge1xyXG4gICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5EQVRFLFxyXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9LFxyXG5cclxuICBkb3duOiBhc3luYyAocXVlcnlJbnRlcmZhY2UsIFNlcXVlbGl6ZSkgPT4ge1xyXG4gICAgYXdhaXQgcXVlcnlJbnRlcmZhY2UuZHJvcFRhYmxlKFwidXNlclwiKTtcclxuICB9LFxyXG59O1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./database/migrations/20210516060415-user.js\n");

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