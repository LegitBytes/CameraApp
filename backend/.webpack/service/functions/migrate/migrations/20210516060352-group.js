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

eval("\n\nmodule.exports = {\n  up: async (queryInterface, Sequelize) => {\n    await queryInterface.createTable(\"groups\", {\n      groupId: {\n        type: Sequelize.UUID,\n        allowNull: false,\n        primaryKey: true,\n      },\n      groupName: {\n        type: Sequelize.STRING,\n        allowNull: false,\n      },\n      isDisabled: {\n        type: Sequelize.BOOLEAN,\n        defaultValue: false,\n      },\n      integratorId: {\n        type: Sequelize.UUID,\n        references: {\n          model: \"integrator\",\n          key: \"integratorId\",\n        },\n      },\n      createdAt: {\n        type: Sequelize.DATE,\n        allowNull: false,\n      },\n      updatedAt: {\n        type: Sequelize.DATE,\n        allowNull: false,\n      },\n    });\n  },\n\n  down: async (queryInterface, Sequelize) => {\n    await queryInterface.dropTable(\"groups\");\n  },\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9kYXRhYmFzZS9taWdyYXRpb25zLzIwMjEwNTE2MDYwMzUyLWdyb3VwLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdHMtc2VxdWVsaXplLWV4cC8uL2RhdGFiYXNlL21pZ3JhdGlvbnMvMjAyMTA1MTYwNjAzNTItZ3JvdXAuanM/ODcyOSJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHVwOiBhc3luYyAocXVlcnlJbnRlcmZhY2UsIFNlcXVlbGl6ZSkgPT4ge1xuICAgIGF3YWl0IHF1ZXJ5SW50ZXJmYWNlLmNyZWF0ZVRhYmxlKFwiZ3JvdXBzXCIsIHtcbiAgICAgIGdyb3VwSWQ6IHtcbiAgICAgICAgdHlwZTogU2VxdWVsaXplLlVVSUQsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICAgIHByaW1hcnlLZXk6IHRydWUsXG4gICAgICB9LFxuICAgICAgZ3JvdXBOYW1lOiB7XG4gICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5TVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgaXNEaXNhYmxlZDoge1xuICAgICAgICB0eXBlOiBTZXF1ZWxpemUuQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBpbnRlZ3JhdG9ySWQ6IHtcbiAgICAgICAgdHlwZTogU2VxdWVsaXplLlVVSUQsXG4gICAgICAgIHJlZmVyZW5jZXM6IHtcbiAgICAgICAgICBtb2RlbDogXCJpbnRlZ3JhdG9yXCIsXG4gICAgICAgICAga2V5OiBcImludGVncmF0b3JJZFwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGNyZWF0ZWRBdDoge1xuICAgICAgICB0eXBlOiBTZXF1ZWxpemUuREFURSxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICB1cGRhdGVkQXQ6IHtcbiAgICAgICAgdHlwZTogU2VxdWVsaXplLkRBVEUsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgIH0pO1xuICB9LFxuXG4gIGRvd246IGFzeW5jIChxdWVyeUludGVyZmFjZSwgU2VxdWVsaXplKSA9PiB7XG4gICAgYXdhaXQgcXVlcnlJbnRlcmZhY2UuZHJvcFRhYmxlKFwiZ3JvdXBzXCIpO1xuICB9LFxufTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./database/migrations/20210516060352-group.js\n");

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