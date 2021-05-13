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

/***/ "./database/migrations/20210506080533-participant.js":
/*!***********************************************************!*\
  !*** ./database/migrations/20210506080533-participant.js ***!
  \***********************************************************/
/***/ ((module) => {

eval("\r\n\r\nmodule.exports = {\r\n  up: async (queryInterface, Sequelize) => {\r\n    /**\r\n     * Add altering commands here.\r\n     *\r\n     * Example:\r\n     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });\r\n     */\r\n    await queryInterface.createTable(\r\n        {tableName: 'participant', schema: 'sensorum'},\r\n        {\r\n          participant_id: {\r\n            type: Sequelize.INTEGER,\r\n            primaryKey: true,\r\n            autoIncrement: true,\r\n          },\r\n          mrn: {\r\n            // eslint-disable-next-line new-cap\r\n            type: Sequelize.STRING(100),\r\n            allowNull: false,\r\n          },\r\n          first_name: {\r\n            type: Sequelize.TEXT,\r\n            allowNull: false,\r\n          },\r\n          middle_name: {\r\n            type: Sequelize.TEXT,\r\n            allowNull: true,\r\n            defaultValue: null,\r\n          },\r\n          last_name: {\r\n            type: Sequelize.TEXT,\r\n            allowNull: false,\r\n          },\r\n          date_of_birth: {\r\n            type: Sequelize.DATE,\r\n            allowNull: false,\r\n          },\r\n          created_at: {\r\n            type: Sequelize.DATE,\r\n            allowNull: false,\r\n          },\r\n          updated_at: {\r\n            type: Sequelize.DATE,\r\n            allowNull: false,\r\n          },\r\n        });\r\n  },\r\n\r\n  down: async (queryInterface, Sequelize) => {\r\n    /**\r\n     * Add reverting commands here.\r\n     *\r\n     * Example:\r\n     */\r\n    await queryInterface.dropTable(\r\n        {tableName: 'participant', schema: 'sensorum'},\r\n    );\r\n  },\r\n};\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9kYXRhYmFzZS9taWdyYXRpb25zLzIwMjEwNTA2MDgwNTMzLXBhcnRpY2lwYW50LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdHMtc2VxdWVsaXplLWV4cC8uL2RhdGFiYXNlL21pZ3JhdGlvbnMvMjAyMTA1MDYwODA1MzMtcGFydGljaXBhbnQuanM/MjY4OCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICB1cDogYXN5bmMgKHF1ZXJ5SW50ZXJmYWNlLCBTZXF1ZWxpemUpID0+IHtcclxuICAgIC8qKlxyXG4gICAgICogQWRkIGFsdGVyaW5nIGNvbW1hbmRzIGhlcmUuXHJcbiAgICAgKlxyXG4gICAgICogRXhhbXBsZTpcclxuICAgICAqIGF3YWl0IHF1ZXJ5SW50ZXJmYWNlLmNyZWF0ZVRhYmxlKCd1c2VycycsIHsgaWQ6IFNlcXVlbGl6ZS5JTlRFR0VSIH0pO1xyXG4gICAgICovXHJcbiAgICBhd2FpdCBxdWVyeUludGVyZmFjZS5jcmVhdGVUYWJsZShcclxuICAgICAgICB7dGFibGVOYW1lOiAncGFydGljaXBhbnQnLCBzY2hlbWE6ICdzZW5zb3J1bSd9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHBhcnRpY2lwYW50X2lkOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5JTlRFR0VSLFxyXG4gICAgICAgICAgICBwcmltYXJ5S2V5OiB0cnVlLFxyXG4gICAgICAgICAgICBhdXRvSW5jcmVtZW50OiB0cnVlLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIG1ybjoge1xyXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbmV3LWNhcFxyXG4gICAgICAgICAgICB0eXBlOiBTZXF1ZWxpemUuU1RSSU5HKDEwMCksXHJcbiAgICAgICAgICAgIGFsbG93TnVsbDogZmFsc2UsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZmlyc3RfbmFtZToge1xyXG4gICAgICAgICAgICB0eXBlOiBTZXF1ZWxpemUuVEVYVCxcclxuICAgICAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBtaWRkbGVfbmFtZToge1xyXG4gICAgICAgICAgICB0eXBlOiBTZXF1ZWxpemUuVEVYVCxcclxuICAgICAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxyXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IG51bGwsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgbGFzdF9uYW1lOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5URVhULFxyXG4gICAgICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGRhdGVfb2ZfYmlydGg6IHtcclxuICAgICAgICAgICAgdHlwZTogU2VxdWVsaXplLkRBVEUsXHJcbiAgICAgICAgICAgIGFsbG93TnVsbDogZmFsc2UsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgY3JlYXRlZF9hdDoge1xyXG4gICAgICAgICAgICB0eXBlOiBTZXF1ZWxpemUuREFURSxcclxuICAgICAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB1cGRhdGVkX2F0OiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5EQVRFLFxyXG4gICAgICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICB9LFxyXG5cclxuICBkb3duOiBhc3luYyAocXVlcnlJbnRlcmZhY2UsIFNlcXVlbGl6ZSkgPT4ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgcmV2ZXJ0aW5nIGNvbW1hbmRzIGhlcmUuXHJcbiAgICAgKlxyXG4gICAgICogRXhhbXBsZTpcclxuICAgICAqL1xyXG4gICAgYXdhaXQgcXVlcnlJbnRlcmZhY2UuZHJvcFRhYmxlKFxyXG4gICAgICAgIHt0YWJsZU5hbWU6ICdwYXJ0aWNpcGFudCcsIHNjaGVtYTogJ3NlbnNvcnVtJ30sXHJcbiAgICApO1xyXG4gIH0sXHJcbn07XHJcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./database/migrations/20210506080533-participant.js\n");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./database/migrations/20210506080533-participant.js");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;