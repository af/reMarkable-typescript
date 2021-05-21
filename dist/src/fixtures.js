"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateItemResponse = void 0;
var types_1 = require("./types");
var uuid_1 = require("uuid"); // Namespace UUID
exports.generateItemResponse = function (partial) { return (__assign(__assign({}, partial), { ID: uuid_1.v4(), Version: 1, Message: 'message', Success: true, BlobURLGet: 'https://google.com', BlobURLGetExpires: '1595257974', ModifiedClient: 'client', Type: types_1.ItemType.DocumentType, VissibleName: 'name', CurrentPage: 1, Bookmarked: false, Parent: '' })); };
//# sourceMappingURL=fixtures.js.map