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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _6_faker_1 = require("./firestore/6.faker");
var changeCase = __importStar(require("change-case"));
var FirestoreModel = /** @class */ (function (_super) {
    __extends(FirestoreModel, _super);
    function FirestoreModel() {
        return _super.call(this) || this;
    }
    /**
     * initialize the model to be used. for some reason this cant be placed in base constructor
     */
    FirestoreModel.prototype.init = function () {
        var _this = this;
        this.defaultAttribute = this.attribute;
        this.keys = Object.keys(this.attribute);
        Object.keys(this.attribute).forEach(function (key) {
            _this[key] = _this.attribute[key];
        });
        var _loop_1 = function (key) {
            this_1[changeCase.camelCase("mark " + key)] = function () {
                var data = {};
                data[key] = _this.markValue;
                return _this.update(data);
            };
            this_1[changeCase.camelCase("unmark " + key)] = function () {
                var data = {};
                data[key] = _this.unmarkValue;
                return _this.update(data);
            };
        };
        var this_1 = this;
        for (var _i = 0, _a = this.mark; _i < _a.length; _i++) {
            var key = _a[_i];
            _loop_1(key);
        }
    };
    return FirestoreModel;
}(_6_faker_1.FakerLayer));
exports.FirestoreModel = FirestoreModel;
