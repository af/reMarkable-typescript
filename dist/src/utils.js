"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDeviceId = void 0;
var os_1 = __importDefault(require("os"));
var uuid_1 = require("uuid"); // Namespace UUID
var hex_lite_1 = require("hex-lite");
var getmac_1 = __importDefault(require("getmac"));
// Generate a deviceId that remains constant for this user on this machine
var generateDeviceId = function () {
    var _a;
    var fingerprint = os_1.default.platform() + os_1.default.arch() + os_1.default.hostname() + os_1.default.cpus()[0].model;
    var namespace = (_a = new Array(10).fill(0)).concat.apply(_a, hex_lite_1.toUint8Array(getmac_1.default().replace(/:/g, '')));
    return uuid_1.v5(fingerprint, namespace);
};
exports.generateDeviceId = generateDeviceId;
//# sourceMappingURL=utils.js.map