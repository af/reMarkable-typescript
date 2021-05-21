"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var chai_1 = __importStar(require("chai"));
var chai_as_promised_1 = __importDefault(require("chai-as-promised"));
var got_1 = __importDefault(require("got"));
var mocha_1 = require("mocha");
var sinon_1 = __importDefault(require("sinon"));
var sinon_stub_promise_1 = __importDefault(require("sinon-stub-promise"));
var fixtures_1 = require("./fixtures");
var remarkable_1 = __importDefault(require("./remarkable"));
chai_1.default.use(chai_as_promised_1.default);
sinon_stub_promise_1.default(sinon_1.default);
var localSandbox;
beforeEach(function () {
    localSandbox = sinon_1.default.createSandbox();
});
afterEach(function () {
    localSandbox.restore();
});
mocha_1.describe('Client initialization', function () {
    mocha_1.it('should not set the deviceToken if not provided', function () {
        var client = new remarkable_1.default();
        chai_1.expect(client.deviceToken).to.be.undefined;
    });
    mocha_1.it('should set the deviceToken if provided', function () {
        var client = new remarkable_1.default({ deviceToken: 'test' });
        chai_1.expect(client.deviceToken).to.be.equal('test');
    });
});
mocha_1.describe('Register a device', function () {
    mocha_1.it('should register a device ', function () { return __awaiter(void 0, void 0, void 0, function () {
        var client, deviceToken, accessToken;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    localSandbox.stub(got_1.default, 'post').resolves(Promise.resolve({
                        body: 'token',
                    }));
                    client = new remarkable_1.default();
                    return [4 /*yield*/, client.register({
                            code: 'code',
                        })];
                case 1:
                    deviceToken = _a.sent();
                    accessToken = client.token;
                    chai_1.expect(deviceToken).to.be.equal('token');
                    chai_1.expect(accessToken).to.be.equal('token');
                    return [2 /*return*/];
            }
        });
    }); });
});
mocha_1.describe('Refresh token', function () {
    mocha_1.it('should throw an error if the device token is not set', function () { return __awaiter(void 0, void 0, void 0, function () {
        var client;
        return __generator(this, function (_a) {
            client = new remarkable_1.default();
            chai_1.expect(client.refreshToken()).to.be.rejectedWith(Error);
            return [2 /*return*/];
        });
    }); });
    mocha_1.it('should set the token after fetching it', function () { return __awaiter(void 0, void 0, void 0, function () {
        var client, accessToken;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    localSandbox.stub(got_1.default, 'post').resolves(Promise.resolve({
                        body: 'token',
                    }));
                    client = new remarkable_1.default({ deviceToken: 'test' });
                    return [4 /*yield*/, client.refreshToken()];
                case 1:
                    accessToken = _a.sent();
                    chai_1.expect(accessToken).to.be.equal('token');
                    chai_1.expect(client.token).to.be.equal('token');
                    return [2 /*return*/];
            }
        });
    }); });
});
mocha_1.describe('Get items', function () {
    mocha_1.it('should throw an error if the access token is not set', function () { return __awaiter(void 0, void 0, void 0, function () {
        var client;
        return __generator(this, function (_a) {
            client = new remarkable_1.default({ deviceToken: 'device-token' });
            chai_1.expect(client.getAllItems()).to.be.rejectedWith(Error);
            chai_1.expect(client.getItemWithId('dsf')).to.be.rejectedWith(Error);
            return [2 /*return*/];
        });
    }); });
    mocha_1.it('should fetch all items', function () { return __awaiter(void 0, void 0, void 0, function () {
        var client, itemsToBeFetched, _a, _b, results;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    localSandbox.stub(got_1.default, 'post').resolves(Promise.resolve({
                        body: 'token',
                    }));
                    client = new remarkable_1.default({ deviceToken: 'test' });
                    return [4 /*yield*/, client.refreshToken()];
                case 1:
                    _c.sent();
                    itemsToBeFetched = [fixtures_1.generateItemResponse(), fixtures_1.generateItemResponse()];
                    localSandbox.stub(client.gotClient, 'get').resolves(Promise.resolve({ body: itemsToBeFetched }));
                    _b = (_a = localSandbox.stub(client, 'getStorageUrl')).resolves;
                    return [4 /*yield*/, Promise.resolve('http://localhost')];
                case 2:
                    _b.apply(_a, [_c.sent()]);
                    return [4 /*yield*/, client.getAllItems()];
                case 3:
                    results = _c.sent();
                    chai_1.expect(results).to.be.equal(itemsToBeFetched);
                    return [2 /*return*/];
            }
        });
    }); });
});
mocha_1.describe('Upload Zip', function () {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            mocha_1.it('passes the correct parameters to remarkable API', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var client, mockFileId, mockFolderId, putStub, _a, _b, testEpub, argsToRmAPI, unwrappedArgs;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                // SETUP
                                localSandbox.stub(got_1.default, 'post').resolves(Promise.resolve({
                                    body: 'token',
                                }));
                                client = new remarkable_1.default({
                                    deviceToken: 'stubToken',
                                });
                                return [4 /*yield*/, client.refreshToken()];
                            case 1:
                                _c.sent();
                                mockFileId = 'b8710f71-c86e-5037-8ef2-bac047709355';
                                mockFolderId = '71e70cd9-8d72-5c8b-addc-0d18c74364bc';
                                putStub = localSandbox
                                    .stub(client.gotClient, 'put')
                                    .resolves(Promise.resolve({ body: [{ Success: true, BlobURLPut: 'someURL' }] }))
                                    .onSecondCall()
                                    .resolves(Promise.resolve({ body: [{ Success: true, ID: mockFileId }] }));
                                _b = (_a = localSandbox.stub(client, 'getStorageUrl')).resolves;
                                return [4 /*yield*/, Promise.resolve('http://localhost')];
                            case 2:
                                _b.apply(_a, [_c.sent()]);
                                localSandbox.stub(got_1.default, 'put').resolves(Promise.resolve({
                                    statusCode: 200,
                                    body: mockFileId,
                                }));
                                testEpub = Buffer.from('oogabooga');
                                // ACT
                                return [4 /*yield*/, client.uploadZip('testID', mockFileId, testEpub, mockFolderId)];
                            case 3:
                                // ACT
                                _c.sent();
                                argsToRmAPI = putStub.getCall(1).args[1];
                                unwrappedArgs = argsToRmAPI.json[0];
                                chai_1.expect(unwrappedArgs.parent).to.be.equal(mockFolderId);
                                chai_1.expect(unwrappedArgs.ID).to.be.equal(mockFileId);
                                chai_1.expect(unwrappedArgs.VissibleName).to.be.equal('testID');
                                return [2 /*return*/];
                        }
                    });
                });
            });
            return [2 /*return*/];
        });
    });
});
//# sourceMappingURL=remarkable.test.js.map