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

/***/ "./database/migrations/20210506094830-participant-review.js":
/*!******************************************************************!*\
  !*** ./database/migrations/20210506094830-participant-review.js ***!
  \******************************************************************/
/***/ ((module) => {

eval("\r\n\r\nmodule.exports = {\r\n  up: async (queryInterface, Sequelize) => {\r\n    await queryInterface.createTable(\r\n        {tableName: 'participant_review', schema: 'sensorum'},\r\n        {\r\n          participant_review_id: {\r\n            type: Sequelize.INTEGER,\r\n            allowNull: false,\r\n            primaryKey: true,\r\n            autoIncrement: true,\r\n          },\r\n          participant_id: {\r\n            type: Sequelize.INTEGER,\r\n            references: {\r\n              model: 'participant',\r\n              key: 'participant_id',\r\n            },\r\n            onDelete: 'set null',\r\n            onUpdate: 'cascade',\r\n          },\r\n          reviewer_id: {\r\n            type: Sequelize.INTEGER,\r\n            references: {\r\n              model: 'reviewer',\r\n              key: 'reviewer_id',\r\n            },\r\n            onDelete: 'set null',\r\n            onUpdate: 'cascade',\r\n          },\r\n          reviewer_result: {\r\n            // eslint-disable-next-line new-cap\r\n            type: Sequelize.ENUM('no_action', 'escalate', 'other'),\r\n            allowNull: false,\r\n          },\r\n          review_rationale_payload: {\r\n            type: Sequelize.JSON,\r\n          },\r\n          review_note: {\r\n            type: Sequelize.TEXT,\r\n          },\r\n          created_at: {\r\n            type: Sequelize.DATE,\r\n            allowNull: false,\r\n          },\r\n          updated_at: {\r\n            type: Sequelize.DATE,\r\n            allowNull: false,\r\n          },\r\n        });\r\n  },\r\n\r\n  down: async (queryInterface, Sequelize) => {\r\n    await queryInterface.dropTable(\r\n        {tableName: 'participant_review', schema: 'sensorum'},\r\n    );\r\n  },\r\n};\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9kYXRhYmFzZS9taWdyYXRpb25zLzIwMjEwNTA2MDk0ODMwLXBhcnRpY2lwYW50LXJldmlldy5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL3RzLXNlcXVlbGl6ZS1leHAvLi9kYXRhYmFzZS9taWdyYXRpb25zLzIwMjEwNTA2MDk0ODMwLXBhcnRpY2lwYW50LXJldmlldy5qcz81NzgwIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIHVwOiBhc3luYyAocXVlcnlJbnRlcmZhY2UsIFNlcXVlbGl6ZSkgPT4ge1xyXG4gICAgYXdhaXQgcXVlcnlJbnRlcmZhY2UuY3JlYXRlVGFibGUoXHJcbiAgICAgICAge3RhYmxlTmFtZTogJ3BhcnRpY2lwYW50X3JldmlldycsIHNjaGVtYTogJ3NlbnNvcnVtJ30sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcGFydGljaXBhbnRfcmV2aWV3X2lkOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5JTlRFR0VSLFxyXG4gICAgICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxyXG4gICAgICAgICAgICBwcmltYXJ5S2V5OiB0cnVlLFxyXG4gICAgICAgICAgICBhdXRvSW5jcmVtZW50OiB0cnVlLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHBhcnRpY2lwYW50X2lkOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5JTlRFR0VSLFxyXG4gICAgICAgICAgICByZWZlcmVuY2VzOiB7XHJcbiAgICAgICAgICAgICAgbW9kZWw6ICdwYXJ0aWNpcGFudCcsXHJcbiAgICAgICAgICAgICAga2V5OiAncGFydGljaXBhbnRfaWQnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbkRlbGV0ZTogJ3NldCBudWxsJyxcclxuICAgICAgICAgICAgb25VcGRhdGU6ICdjYXNjYWRlJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICByZXZpZXdlcl9pZDoge1xyXG4gICAgICAgICAgICB0eXBlOiBTZXF1ZWxpemUuSU5URUdFUixcclxuICAgICAgICAgICAgcmVmZXJlbmNlczoge1xyXG4gICAgICAgICAgICAgIG1vZGVsOiAncmV2aWV3ZXInLFxyXG4gICAgICAgICAgICAgIGtleTogJ3Jldmlld2VyX2lkJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25EZWxldGU6ICdzZXQgbnVsbCcsXHJcbiAgICAgICAgICAgIG9uVXBkYXRlOiAnY2FzY2FkZScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcmV2aWV3ZXJfcmVzdWx0OiB7XHJcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuZXctY2FwXHJcbiAgICAgICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5FTlVNKCdub19hY3Rpb24nLCAnZXNjYWxhdGUnLCAnb3RoZXInKSxcclxuICAgICAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICByZXZpZXdfcmF0aW9uYWxlX3BheWxvYWQ6IHtcclxuICAgICAgICAgICAgdHlwZTogU2VxdWVsaXplLkpTT04sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcmV2aWV3X25vdGU6IHtcclxuICAgICAgICAgICAgdHlwZTogU2VxdWVsaXplLlRFWFQsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgY3JlYXRlZF9hdDoge1xyXG4gICAgICAgICAgICB0eXBlOiBTZXF1ZWxpemUuREFURSxcclxuICAgICAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB1cGRhdGVkX2F0OiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5EQVRFLFxyXG4gICAgICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICB9LFxyXG5cclxuICBkb3duOiBhc3luYyAocXVlcnlJbnRlcmZhY2UsIFNlcXVlbGl6ZSkgPT4ge1xyXG4gICAgYXdhaXQgcXVlcnlJbnRlcmZhY2UuZHJvcFRhYmxlKFxyXG4gICAgICAgIHt0YWJsZU5hbWU6ICdwYXJ0aWNpcGFudF9yZXZpZXcnLCBzY2hlbWE6ICdzZW5zb3J1bSd9LFxyXG4gICAgKTtcclxuICB9LFxyXG59O1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./database/migrations/20210506094830-participant-review.js\n");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./database/migrations/20210506094830-participant-review.js");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;