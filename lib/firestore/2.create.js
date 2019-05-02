"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", { value: true });
var _1_base_1 = require("./1.base");
var type_1 = require("../type");
var firestore_1 = require("@google-cloud/firestore");
/**
 * this class for implementing creating layer in CRUD procedure
 * there is several method to create a document. first is assigning one by one and then save.
 * the other method is using create method or make method.
 */
var CreateLayer = /** @class */ (function (_super) {
    __extends(CreateLayer, _super);
    function CreateLayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * save a model to firestore. if reference exists update it if not create it.
     */
    CreateLayer.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var temp, _i, _a, key;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        temp = {};
                        for (_i = 0, _a = this.keys; _i < _a.length; _i++) {
                            key = _a[_i];
                            temp[key] = this[key];
                        }
                        if (!this.docRef) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.constructor.updating(temp)];
                    case 1:
                        //@ts-ignore
                        if (!(_b.sent())) {
                            throw new Error("updating permission denied.");
                        }
                        // then update the data
                        if (this.timestamp) {
                            temp.updated_at = type_1.now;
                        }
                        return [2 /*return*/, this.docRef.update(temp).then(function (d) {
                                // @ts-ignore
                                _this.constructor.updated(_this.id, temp);
                                return Promise.resolve(true);
                            })];
                    case 2: return [4 /*yield*/, this.constructor.creating(temp)];
                    case 3:
                        //@ts-ignore
                        if (!(_b.sent())) {
                            throw new Error("creating permission denied.");
                        }
                        if (this.timestamp) {
                            temp.updated_at = temp.created_at = type_1.now;
                        }
                        //create the data
                        if (this.id && typeof this.id === 'string') {
                            // if the id is set then use the id and update
                            // @ts-ignore
                            return [2 /*return*/, this.constructor.collection().doc(this.id).set(temp).then(function (d) { return __awaiter(_this, void 0, void 0, function () {
                                    var data, _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                // @ts-ignore
                                                this.docRef = this.constructor.collection().doc(this.id);
                                                if (!this.docRef) return [3 /*break*/, 2];
                                                return [4 /*yield*/, this.docRef.get().then(function (t) { return t.data(); })];
                                            case 1:
                                                _a = _b.sent();
                                                return [3 /*break*/, 3];
                                            case 2:
                                                _a = {};
                                                _b.label = 3;
                                            case 3:
                                                data = _a;
                                                this.fill(data);
                                                //@ts-ignore
                                                this.constructor.created(this.id, data);
                                                return [2 /*return*/, Promise.resolve(true)];
                                        }
                                    });
                                }); })];
                        }
                        else {
                            // autogenerate id
                            //@ts-ignore
                            return [2 /*return*/, this.constructor.collection().add(temp).then(function (d) { return __awaiter(_this, void 0, void 0, function () {
                                    var data;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                this.docRef = d;
                                                this.id = d.id;
                                                return [4 /*yield*/, d.get().then(function (t) { return t.data(); })];
                                            case 1:
                                                data = _a.sent();
                                                this.fill(data);
                                                //@ts-ignore
                                                this.constructor.created(this.id, data);
                                                return [2 /*return*/, Promise.resolve(true)];
                                        }
                                    });
                                }); })];
                        }
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * create data from nothing
     * @param data object or Array<object>
     */
    CreateLayer.create = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var temp, attribute, task, _i, data_1, datum, _a, _b, key, _c, _d, key;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        attribute = (new this()).attribute;
                        if (!(data instanceof Array)) return [3 /*break*/, 5];
                        task = [];
                        _i = 0, data_1 = data;
                        _e.label = 1;
                    case 1:
                        if (!(_i < data_1.length)) return [3 /*break*/, 4];
                        datum = data_1[_i];
                        temp = {};
                        for (_a = 0, _b = Object.keys(attribute); _a < _b.length; _a++) {
                            key = _b[_a];
                            // @ts-ignore
                            temp[key] = datum[key] || attribute[key];
                        }
                        return [4 /*yield*/, this.creating(temp)];
                    case 2:
                        if (!(_e.sent())) {
                            throw new Error("creating permission denied.");
                        }
                        task.push(this.collection().add(temp).then(function (d) { return __awaiter(_this, void 0, void 0, function () {
                            var res, data;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        res = new this();
                                        res.id = d.id;
                                        res.docRef = d;
                                        return [4 /*yield*/, d.get().then(function (d) { return d.data(); })];
                                    case 1:
                                        data = _a.sent();
                                        res.fill(data);
                                        this.created(d.id, data);
                                        return [2 /*return*/, res];
                                }
                            });
                        }); }));
                        _e.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, Promise.all(task).then(function (d) { return d; }).catch(function () { return []; })];
                    case 5:
                        temp = {};
                        for (_c = 0, _d = Object.keys(attribute); _c < _d.length; _c++) {
                            key = _d[_c];
                            // @ts-ignore
                            temp[key] = data[key] || attribute[key];
                        }
                        return [4 /*yield*/, this.creating(temp)];
                    case 6:
                        if (!(_e.sent())) {
                            throw new Error("creating permission denied.");
                        }
                        return [2 /*return*/, this.collection().add(temp).then(function (d) { return __awaiter(_this, void 0, void 0, function () {
                                var res, data;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            res = new this();
                                            res.id = d.id;
                                            res.docRef = d;
                                            return [4 /*yield*/, d.get().then(function (d) { return d.data(); })];
                                        case 1:
                                            data = _a.sent();
                                            res.fill(data);
                                            this.created(d.id, data);
                                            return [2 /*return*/, res];
                                    }
                                });
                            }); })];
                }
            });
        });
    };
    /**
     * set value for created instance model
     * @param data object to set value
     */
    CreateLayer.prototype.fill = function (data) {
        var _this = this;
        Object.keys(data).forEach(function (key) {
            _this[key] = data[key];
        });
    };
    /**
     * set by documentsnapshot object
     * @param data DocumentSnapshot
     */
    CreateLayer.prototype.set = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(data instanceof firestore_1.DocumentSnapshot)) return [3 /*break*/, 1];
                        this.id = data.id;
                        this.fill(data.data());
                        return [3 /*break*/, 3];
                    case 1:
                        if (!(data instanceof firestore_1.DocumentReference)) return [3 /*break*/, 3];
                        this.docRef = data;
                        this.id = data.id;
                        _a = this.fill;
                        return [4 /*yield*/, data.get().then(function (d) { return d.data(); })];
                    case 2:
                        _a.apply(this, [_b.sent()]);
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * event before create to execute. override this method to implement.
     */
    CreateLayer.creating = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, true];
            });
        });
    };
    /**
     * event after create to execute. override this method to implement.
     */
    CreateLayer.created = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, true];
            });
        });
    };
    /**
     * event before update to execute. override this method to implement.
     */
    CreateLayer.updating = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, true];
            });
        });
    };
    /**
     * event after update to execute. override this method to implement.
     */
    CreateLayer.updated = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, true];
            });
        });
    };
    return CreateLayer;
}(_1_base_1.Base));
exports.CreateLayer = CreateLayer;
