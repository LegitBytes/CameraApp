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

/***/ "./database/migrations/20210506095952-device.js":
/*!******************************************************!*\
  !*** ./database/migrations/20210506095952-device.js ***!
  \******************************************************/
/***/ ((module) => {

eval("/* eslint-disable new-cap */\r\n/* eslint-disable max-len */\r\n\r\n\r\nmodule.exports = {\r\n  up: async (queryInterface, Sequelize) => {\r\n    await queryInterface.createTable(\r\n        {tableName: 'device', schema: 'sensorum'},\r\n        {\r\n          device_id: {\r\n            type: Sequelize.INTEGER,\r\n            allowNull: false,\r\n            primaryKey: true,\r\n            autoIncrement: true,\r\n          },\r\n          participant_id: {\r\n            type: Sequelize.INTEGER,\r\n            references: {\r\n              model: 'participant',\r\n              key: 'participant_id',\r\n            },\r\n            onDelete: 'set null',\r\n            onUpdate: 'cascade',\r\n          },\r\n          metric_type: {\r\n            type: Sequelize.ENUM( 'one', 'two'),\r\n            allowNull: false,\r\n          },\r\n          mac_address: {\r\n            type: Sequelize.STRING(17),\r\n            allowNull: false,\r\n          },\r\n          firmware_id: Sequelize.STRING,\r\n          device_type: {\r\n            type: Sequelize.ENUM('cough_sensor', 'bed_sensor', 'door_sensor', 'chair_sensor', 'toliet_flush_sensor', 'fridge_sensor', 'proximitiy_sensor'),\r\n            allowNull: false,\r\n          },\r\n          created_at: {\r\n            type: Sequelize.DATE,\r\n            allowNull: false,\r\n          },\r\n          updated_at: {\r\n            type: Sequelize.DATE,\r\n            allowNull: false,\r\n          },\r\n        });\r\n    await queryInterface.addIndex({tableName: 'device', schema: 'sensorum'}, {\r\n      fields: ['mac_address'],\r\n      name: 'device_mac_address',\r\n    });\r\n    await queryInterface.addIndex({tableName: 'device', schema: 'sensorum'}, {\r\n      name: 'device_participant_id',\r\n      fields: ['participant_id'],\r\n    });\r\n  },\r\n\r\n  down: async (queryInterface, Sequelize) => {\r\n    await queryInterface.dropTable({tableName: 'device', schema: 'sensorum'});\r\n  },\r\n};\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9kYXRhYmFzZS9taWdyYXRpb25zLzIwMjEwNTA2MDk1OTUyLWRldmljZS5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL3RzLXNlcXVlbGl6ZS1leHAvLi9kYXRhYmFzZS9taWdyYXRpb25zLzIwMjEwNTA2MDk1OTUyLWRldmljZS5qcz9iZmUxIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5ldy1jYXAgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICB1cDogYXN5bmMgKHF1ZXJ5SW50ZXJmYWNlLCBTZXF1ZWxpemUpID0+IHtcclxuICAgIGF3YWl0IHF1ZXJ5SW50ZXJmYWNlLmNyZWF0ZVRhYmxlKFxyXG4gICAgICAgIHt0YWJsZU5hbWU6ICdkZXZpY2UnLCBzY2hlbWE6ICdzZW5zb3J1bSd9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGRldmljZV9pZDoge1xyXG4gICAgICAgICAgICB0eXBlOiBTZXF1ZWxpemUuSU5URUdFUixcclxuICAgICAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcclxuICAgICAgICAgICAgcHJpbWFyeUtleTogdHJ1ZSxcclxuICAgICAgICAgICAgYXV0b0luY3JlbWVudDogdHJ1ZSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBwYXJ0aWNpcGFudF9pZDoge1xyXG4gICAgICAgICAgICB0eXBlOiBTZXF1ZWxpemUuSU5URUdFUixcclxuICAgICAgICAgICAgcmVmZXJlbmNlczoge1xyXG4gICAgICAgICAgICAgIG1vZGVsOiAncGFydGljaXBhbnQnLFxyXG4gICAgICAgICAgICAgIGtleTogJ3BhcnRpY2lwYW50X2lkJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25EZWxldGU6ICdzZXQgbnVsbCcsXHJcbiAgICAgICAgICAgIG9uVXBkYXRlOiAnY2FzY2FkZScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgbWV0cmljX3R5cGU6IHtcclxuICAgICAgICAgICAgdHlwZTogU2VxdWVsaXplLkVOVU0oICdvbmUnLCAndHdvJyksXHJcbiAgICAgICAgICAgIGFsbG93TnVsbDogZmFsc2UsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgbWFjX2FkZHJlc3M6IHtcclxuICAgICAgICAgICAgdHlwZTogU2VxdWVsaXplLlNUUklORygxNyksXHJcbiAgICAgICAgICAgIGFsbG93TnVsbDogZmFsc2UsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZmlybXdhcmVfaWQ6IFNlcXVlbGl6ZS5TVFJJTkcsXHJcbiAgICAgICAgICBkZXZpY2VfdHlwZToge1xyXG4gICAgICAgICAgICB0eXBlOiBTZXF1ZWxpemUuRU5VTSgnY291Z2hfc2Vuc29yJywgJ2JlZF9zZW5zb3InLCAnZG9vcl9zZW5zb3InLCAnY2hhaXJfc2Vuc29yJywgJ3RvbGlldF9mbHVzaF9zZW5zb3InLCAnZnJpZGdlX3NlbnNvcicsICdwcm94aW1pdGl5X3NlbnNvcicpLFxyXG4gICAgICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGNyZWF0ZWRfYXQ6IHtcclxuICAgICAgICAgICAgdHlwZTogU2VxdWVsaXplLkRBVEUsXHJcbiAgICAgICAgICAgIGFsbG93TnVsbDogZmFsc2UsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgdXBkYXRlZF9hdDoge1xyXG4gICAgICAgICAgICB0eXBlOiBTZXF1ZWxpemUuREFURSxcclxuICAgICAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICBhd2FpdCBxdWVyeUludGVyZmFjZS5hZGRJbmRleCh7dGFibGVOYW1lOiAnZGV2aWNlJywgc2NoZW1hOiAnc2Vuc29ydW0nfSwge1xyXG4gICAgICBmaWVsZHM6IFsnbWFjX2FkZHJlc3MnXSxcclxuICAgICAgbmFtZTogJ2RldmljZV9tYWNfYWRkcmVzcycsXHJcbiAgICB9KTtcclxuICAgIGF3YWl0IHF1ZXJ5SW50ZXJmYWNlLmFkZEluZGV4KHt0YWJsZU5hbWU6ICdkZXZpY2UnLCBzY2hlbWE6ICdzZW5zb3J1bSd9LCB7XHJcbiAgICAgIG5hbWU6ICdkZXZpY2VfcGFydGljaXBhbnRfaWQnLFxyXG4gICAgICBmaWVsZHM6IFsncGFydGljaXBhbnRfaWQnXSxcclxuICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIGRvd246IGFzeW5jIChxdWVyeUludGVyZmFjZSwgU2VxdWVsaXplKSA9PiB7XHJcbiAgICBhd2FpdCBxdWVyeUludGVyZmFjZS5kcm9wVGFibGUoe3RhYmxlTmFtZTogJ2RldmljZScsIHNjaGVtYTogJ3NlbnNvcnVtJ30pO1xyXG4gIH0sXHJcbn07XHJcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./database/migrations/20210506095952-device.js\n");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./database/migrations/20210506095952-device.js");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;