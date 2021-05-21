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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var got_1 = __importDefault(require("got"));
var query_string_1 = __importDefault(require("query-string"));
var uuid_1 = require("uuid"); // Namespace UUID
var jszip_1 = __importDefault(require("jszip"));
var package_json_1 = require("../package.json");
var types_1 = require("./types");
var utils_1 = require("./utils");
var gotConfiguration = {
    responseType: 'json',
    headers: {
        'User-Agent': "remarkable-typescript/" + package_json_1.version,
    },
};
var defaultPDFContent = {
    extraMetadata: {},
    fileType: 'pdf',
    lastOpenedPage: 0,
    lineHeight: -1,
    margins: 180,
    pageCount: 0,
    textScale: 1,
    transform: {},
};
var defaultEPUBContent = {
    extraMetadata: {},
    fileType: 'epub',
    lastOpenedPage: 0,
    lineHeight: -1,
    margins: 100,
    pageCount: 0,
    textScale: 1,
    transform: {},
};
var defaultPDFmetadata = {
    deleted: false,
    lastModified: new Date().toISOString(),
    ModifiedClient: new Date().toISOString(),
    metadatamodified: false,
    modified: false,
    parent: '',
    pinned: false,
    synced: true,
    type: types_1.ItemType.DocumentType,
    version: 1,
    VissibleName: 'New Document',
};
var Remarkable = /** @class */ (function () {
    function Remarkable(_a) {
        var deviceToken = (_a === void 0 ? {} : _a).deviceToken;
        this.gotClient = got_1.default.extend(gotConfiguration);
        if (deviceToken) {
            this.deviceToken = deviceToken;
        }
        this.zip = new jszip_1.default();
    }
    Remarkable.prototype.setToken = function (token) {
        this.gotClient = got_1.default.extend(__assign(__assign({}, gotConfiguration), { headers: __assign(__assign({}, gotConfiguration.headers), { Authorization: "Bearer " + token }) }));
        this.token = token;
        return token;
    };
    Remarkable.prototype.refreshToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.deviceToken)
                            throw new Error('You must register your reMarkable first');
                        return [4 /*yield*/, got_1.default.post('https://webapp-production-dot-remarkable-production.appspot.com/token/json/2/user/new', {
                                headers: {
                                    Authorization: "Bearer " + this.deviceToken,
                                    'User-Agent': "remarkable-typescript/" + package_json_1.version,
                                },
                            })];
                    case 1:
                        body = (_a.sent()).body;
                        this.setToken(body);
                        return [2 /*return*/, body];
                }
            });
        });
    };
    Remarkable.prototype.getStorageUrl = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.environment, environment = _c === void 0 ? 'production' : _c, _d = _b.group, group = _d === void 0 ? 'auth0|5a68dc51cb30df3877a1d7c4' : _d, _e = _b.apiVer, apiVer = _e === void 0 ? 2 : _e;
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (this.storageUrl)
                            return [2 /*return*/, this.storageUrl];
                        if (!this.token)
                            throw Error('You need to call refreshToken() first');
                        return [4 /*yield*/, this.gotClient.get("https://service-manager-production-dot-remarkable-production.appspot.com/service/json/1/document-storage?environment=" + environment + "&group=" + group + "&apiVer=" + apiVer)];
                    case 1:
                        body = (_f.sent()).body;
                        this.storageUrl = "https://" + body.Host;
                        return [2 /*return*/, this.storageUrl];
                }
            });
        });
    };
    Remarkable.prototype.getNotificationsUrl = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.environment, environment = _c === void 0 ? 'production' : _c, _d = _b.group, group = _d === void 0 ? 'auth0|5a68dc51cb30df3877a1d7c4' : _d, _e = _b.apiVer, apiVer = _e === void 0 ? 1 : _e;
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (this.notificationUrl)
                            return [2 /*return*/, this.notificationUrl];
                        if (!this.token)
                            throw Error('You need to call refreshToken() first');
                        return [4 /*yield*/, this.gotClient.get("https://service-manager-production-dot-remarkable-production.appspot.com/service/json/1/notifications?environment=" + environment + "&group=" + group + "&apiVer=" + apiVer)];
                    case 1:
                        body = (_f.sent()).body;
                        this.notificationUrl = "wss://" + body.Host;
                        return [2 /*return*/, this.notificationUrl];
                }
            });
        });
    };
    Remarkable.prototype.register = function (_a) {
        var code = _a.code, _b = _a.deviceDesc, deviceDesc = _b === void 0 ? 'desktop-windows' : _b, _c = _a.deviceId, deviceId = _c === void 0 ? utils_1.generateDeviceId() : _c;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_d) {
                if (!code) {
                    throw new Error('Must provide a code from https://my.remarkable.com/connect/desktop');
                }
                // Make request
                return [2 /*return*/, got_1.default
                        .post('https://webapp-production-dot-remarkable-production.appspot.com/token/json/2/device/new', {
                        json: { code: code, deviceDesc: deviceDesc, deviceId: deviceId },
                    })
                        .then(function (_a) {
                        var body = _a.body;
                        return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        this.deviceToken = body;
                                        return [4 /*yield*/, this.refreshToken()];
                                    case 1:
                                        _b.sent();
                                        return [2 /*return*/, body];
                                }
                            });
                        });
                    })];
            });
        });
    };
    Remarkable.prototype.listItems = function (_a) {
        var _b = _a === void 0 ? {} : _a, doc = _b.doc, _c = _b.withBlob, withBlob = _c === void 0 ? true : _c;
        return __awaiter(this, void 0, void 0, function () {
            var query, stringifiedQuery, url, body;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!this.token)
                            throw Error('You need to call refreshToken() first');
                        query = {
                            doc: doc,
                            withBlob: withBlob,
                        };
                        stringifiedQuery = query_string_1.default.stringify(query);
                        return [4 /*yield*/, this.getStorageUrl()];
                    case 1:
                        url = (_d.sent()) + "/document-storage/json/2/docs?" + stringifiedQuery;
                        return [4 /*yield*/, this.gotClient.get(url)];
                    case 2:
                        body = (_d.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    Remarkable.prototype.getItemWithId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.listItems({ doc: id })];
                    case 1: return [2 /*return*/, (_a.sent())[0]];
                }
            });
        });
    };
    Remarkable.prototype.getAllItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.listItems()];
            });
        });
    };
    Remarkable.prototype.deleteItem = function (id, version) {
        return __awaiter(this, void 0, void 0, function () {
            var url, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getStorageUrl()];
                    case 1:
                        url = (_a.sent()) + "/document-storage/json/2/delete";
                        return [4 /*yield*/, this.gotClient.put(url, {
                                json: [
                                    {
                                        ID: id,
                                        Version: version,
                                    },
                                ],
                            })];
                    case 2:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body[0].Success];
                }
            });
        });
    };
    Remarkable.prototype.downloadZip = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var BlobURLGet, readStream;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.token)
                            throw Error('You need to call refreshToken() first');
                        return [4 /*yield*/, this.getItemWithId(id)];
                    case 1:
                        BlobURLGet = (_a.sent()).BlobURLGet;
                        if (!BlobURLGet) {
                            throw new Error("Couldn't find BlobURLGet in response");
                        }
                        readStream = got_1.default.stream(BlobURLGet);
                        return [2 /*return*/, new Promise(function (resolve) {
                                var chunks = [];
                                readStream.on('data', function (chunk) {
                                    chunks.push(chunk);
                                });
                                // Send the buffer or you can put it into a var
                                readStream.on('end', function () { return __awaiter(_this, void 0, void 0, function () {
                                    var zipBuffer;
                                    return __generator(this, function (_a) {
                                        zipBuffer = Buffer.concat(chunks);
                                        resolve(zipBuffer);
                                        return [2 /*return*/];
                                    });
                                }); });
                            })];
                }
            });
        });
    };
    Remarkable.prototype.uploadZip = function (name, ID, zipFile, parent) {
        return __awaiter(this, void 0, void 0, function () {
            var url, body, statusCode, docMetaData, bodyUpdateStatus, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.token)
                            throw Error('You need to call refreshToken() first');
                        return [4 /*yield*/, this.getStorageUrl()];
                    case 1:
                        url = (_c.sent()) + "/document-storage/json/2/upload/request";
                        return [4 /*yield*/, this.gotClient.put(url, {
                                json: [
                                    {
                                        ID: ID,
                                        Type: types_1.ItemType.DocumentType,
                                        Version: 1,
                                    },
                                ],
                            })];
                    case 2:
                        body = (_c.sent()).body;
                        if (!body[0].Success || !body[0].BlobURLPut) {
                            console.warn('upload zip response: ', body[0]);
                            throw new Error('Error during the creation of the upload request');
                        }
                        return [4 /*yield*/, got_1.default.put(body[0].BlobURLPut, {
                                body: zipFile,
                                headers: __assign(__assign({}, gotConfiguration.headers), { 'Content-Type': '', Authorization: "Bearer " + this.token }),
                            })];
                    case 3:
                        statusCode = (_c.sent()).statusCode;
                        if (statusCode !== 200) {
                            throw new Error('Error during the upload of the document');
                        }
                        docMetaData = __assign({}, defaultPDFmetadata);
                        //If we would like the document to be in a folder the parent property of docuMetaData must be set
                        if (parent) {
                            docMetaData.parent = parent;
                        }
                        _b = (_a = this.gotClient).put;
                        return [4 /*yield*/, this.getStorageUrl()];
                    case 4: return [4 /*yield*/, _b.apply(_a, [(_c.sent()) + "/document-storage/json/2/upload/update-status",
                            {
                                json: [
                                    __assign(__assign({}, docMetaData), { ID: ID, VissibleName: name, lastModified: new Date().toISOString(), ModifiedClient: new Date().toISOString() }),
                                ],
                            }])];
                    case 5:
                        bodyUpdateStatus = (_c.sent()).body;
                        if (!bodyUpdateStatus[0].Success) {
                            throw new Error('Error during the update status of the metadata');
                        }
                        return [2 /*return*/, bodyUpdateStatus[0].ID];
                }
            });
        });
    };
    Remarkable.prototype.uploadPDF = function (name, file) {
        return __awaiter(this, void 0, void 0, function () {
            var ID, zipContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.token)
                            throw Error('You need to call refreshToken() first');
                        ID = uuid_1.v4();
                        // We create the zip file to get uploaded
                        this.zip.file(ID + ".content", JSON.stringify(defaultPDFContent));
                        this.zip.file(ID + ".pagedata", []);
                        this.zip.file(ID + ".pdf", file);
                        return [4 /*yield*/, this.zip.generateAsync({ type: 'nodebuffer' })];
                    case 1:
                        zipContent = _a.sent();
                        return [4 /*yield*/, this.uploadZip(name, ID, zipContent)];
                    case 2:
                        _a.sent();
                        this.zip = new jszip_1.default();
                        return [2 /*return*/, ID];
                }
            });
        });
    };
    /**
     *
     * @param name the display name for the document
     * @param id uuid string that identifies the document
     * @param file the file data we would like to upload
     * @param parentId (optional) if the document should belong to a folder the uuid of the folder must be specified
     */
    Remarkable.prototype.uploadEPUB = function (name, id, file, parentId) {
        return __awaiter(this, void 0, void 0, function () {
            var zipContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.token)
                            throw Error('You need to call refreshToken() first');
                        // We create the zip file to get uploaded
                        this.zip.file(id + ".content", JSON.stringify(defaultEPUBContent));
                        this.zip.file(id + ".pagedata", []);
                        this.zip.file(id + ".epub", file);
                        return [4 /*yield*/, this.zip.generateAsync({ type: 'nodebuffer' })];
                    case 1:
                        zipContent = _a.sent();
                        return [4 /*yield*/, this.uploadZip(name, id, zipContent, parentId)];
                    case 2:
                        _a.sent();
                        this.zip = new jszip_1.default();
                        return [2 /*return*/, id];
                }
            });
        });
    };
    Remarkable.prototype.createDirectory = function (name, ID, parent) {
        return __awaiter(this, void 0, void 0, function () {
            var zipContent, url, body, statusCode, folderMetadata, bodyUpdateStatus, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        // to create a directory we just make a file with no content
                        this.zip.file(ID + ".content", '{}');
                        return [4 /*yield*/, this.zip.generateAsync({ type: 'nodebuffer' })];
                    case 1:
                        zipContent = _c.sent();
                        if (!this.token)
                            throw Error('You need to call refreshToken() first');
                        return [4 /*yield*/, this.getStorageUrl()];
                    case 2:
                        url = (_c.sent()) + "/document-storage/json/2/upload/request";
                        return [4 /*yield*/, this.gotClient.put(url, {
                                json: [
                                    {
                                        ID: ID,
                                        Type: types_1.ItemType.CollectionType,
                                        Version: 1,
                                    },
                                ],
                            })];
                    case 3:
                        body = (_c.sent()).body;
                        if (!body[0].Success || !body[0].BlobURLPut) {
                            console.warn('Create directory response: ', body[0]);
                            throw new Error('Error during the creation of the upload request');
                        }
                        return [4 /*yield*/, got_1.default.put(body[0].BlobURLPut, {
                                body: zipContent,
                                headers: __assign(__assign({}, gotConfiguration.headers), { 'Content-Type': '', Authorization: "Bearer " + this.token }),
                            })];
                    case 4:
                        statusCode = (_c.sent()).statusCode;
                        if (statusCode !== 200) {
                            throw new Error('Error during the upload of the document');
                        }
                        folderMetadata = __assign({}, defaultPDFmetadata);
                        folderMetadata.type = types_1.ItemType.CollectionType;
                        folderMetadata.VissibleName = name;
                        if (parent) {
                            folderMetadata.parent = parent;
                        }
                        _b = (_a = this.gotClient).put;
                        return [4 /*yield*/, this.getStorageUrl()];
                    case 5: return [4 /*yield*/, _b.apply(_a, [(_c.sent()) + "/document-storage/json/2/upload/update-status",
                            {
                                json: [
                                    __assign(__assign({}, folderMetadata), { ID: ID, VissibleName: name, lastModified: new Date().toISOString(), ModifiedClient: new Date().toISOString() }),
                                ],
                            }])];
                    case 6:
                        bodyUpdateStatus = (_c.sent()).body;
                        if (!bodyUpdateStatus[0].Success) {
                            throw new Error('Error during the update status of the metadata');
                        }
                        return [2 /*return*/, bodyUpdateStatus[0].ID];
                }
            });
        });
    };
    return Remarkable;
}());
exports.default = Remarkable;
//# sourceMappingURL=remarkable.js.map