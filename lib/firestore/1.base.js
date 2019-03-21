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
     * Pascal = 'ParamCase'
     */
    CollectionCaseType["PascalCase"] = "pascal";
})(CollectionCaseType = exports.CollectionCaseType || (exports.CollectionCaseType = {}));
exports.now = admin.firestore.FieldValue.serverTimestamp();
exports.deleteField = admin.firestore.FieldValue.delete();
var Base = /** @class */ (function () {
    function Base() {
        this.timestamp = true;
        this.mark = [];
        this.markValue = exports.now;
        this.unmarkValue = null;
        this.docRef = null;
    }
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
     * get document reference for current object
     */
    Base.prototype.getDocument = function () {
        return this.docRef;
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
