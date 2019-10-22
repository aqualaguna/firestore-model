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
Object.defineProperty(exports, "__esModule", { value: true });
var _3_read_1 = require("./3.read");
var type_1 = require("../type");
/**
 * this class for implementing update layer in CRUD procedure
 */
var UpdateLayer = /** @class */ (function (_super) {
    __extends(UpdateLayer, _super);
    function UpdateLayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * use this function to force update.
     * this field is not guarded with attribute filter.
     * @param data data to be updated
     */
    UpdateLayer.prototype.update = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        if (this.timestamp) {
                            data.updated_at = type_1.now;
                        }
                        return [4 /*yield*/, this.constructor.updating(data)];
                    case 1:
                        // @ts-ignore
                        if (!(_a.sent())) {
                            throw new Error("updating permission denied.");
                        }
                        return [2 /*return*/, this.docRef ? this.docRef.update(data).then(function () {
                                Object.keys(data).forEach(function (key) {
                                    self[key] = data[key];
                                });
                                // @ts-ignore
                                _this.constructor.updated(_this.id, data);
                                return true;
                            }) : false];
                }
            });
        });
    };
    /**
     * update data by id.
     * @param id id of the document
     * @param data data to be updated
     * @return Promise<boolean>
     */
    UpdateLayer.updateData = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.updating(data)];
                    case 1:
                        if (!(_a.sent())) {
                            throw new Error("updating permission denied.");
                        }
                        return [2 /*return*/, this.collection().doc(id).update(data).then(function (d) {
                                _this.updated(id, data);
                                return true;
                            }).catch(function () { return false; })];
                }
            });
        });
    };
    return UpdateLayer;
}(_3_read_1.ReadLayer));
exports.UpdateLayer = UpdateLayer;
