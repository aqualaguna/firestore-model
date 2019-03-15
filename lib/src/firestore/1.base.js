"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var authentication_1 = require("../authentication");
var admin = __importStar(require("firebase-admin"));
var changeCase = __importStar(require("change-case"));
/// <reference path="change-case/change-case.d.ts" />
/**
 * enumeration for style of name collection
 * eg. classname = UserDetail
 */
var CollectionCaseType;
(function (CollectionCaseType) {
    /**
     * ConstantCase = 'USER_DETAIL'
     */
    CollectionCaseType["ConstantCase"] = "constant";
    /**
     * SnakeCase = 'user_detail'
     */
    CollectionCaseType["SnakeCase"] = "snake";
    /**
     * CamelCase = 'userDetail'
     */
    CollectionCaseType["CamelCase"] = "camel";
    /**
     * HeaderCase = 'Header-Case'
     */
    CollectionCaseType["HeaderCase"] = "header";
    /**
     * ParamCase = 'user-detail'
     */
    CollectionCaseType["ParamCase"] = "param";
    /**
     * CamelCase = 'ParamCase'
     */
    CollectionCaseType["PascalCase"] = "pascal";
})(CollectionCaseType = exports.CollectionCaseType || (exports.CollectionCaseType = {}));
exports.now = admin.firestore.FieldValue.serverTimestamp();
var Base = /** @class */ (function () {
    function Base() {
        this.timestamp = true;
        this.docRef = null;
    }
    /**
     * initialize the model to be used. for some reason this cant be placed in base constructor
     */
    Base.prototype.init = function () {
        var _this = this;
        this.defaultAttribute = this.attribute;
        this.keys = Object.keys(this.attribute);
        Object.keys(this.attribute).forEach(function (key) {
            _this[key] = _this.attribute[key];
        });
    };
    /**
     * get firestore db only used for internal class can't called by outside
     */
    Base.firestore = function () {
        return authentication_1.Authentication.firestore;
    };
    /**
     * get collection by class name
     */
    Base.getCollectionName = function (type) {
        if (type === void 0) { type = this.collectionStyle; }
        return changeCase[type](this.name);
    };
    /**
     * get collection reference
     */
    Base.collection = function () {
        return this.firestore().collection(this.getCollectionName());
    };
    /**
     * convert this instance to simple object
     */
    Base.prototype.toObject = function () {
        var temp = {};
        for (var _i = 0, _a = this.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            temp[key] = this[key];
        }
        return temp;
    };
    /**
     * set a default collection naming convention
     */
    Base.collectionStyle = CollectionCaseType.SnakeCase;
    return Base;
}());
exports.Base = Base;
