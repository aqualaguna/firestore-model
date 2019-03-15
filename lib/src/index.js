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
Object.defineProperty(exports, "__esModule", { value: true });
var _6_faker_1 = require("./firestore/6.faker");
var FirestoreModel = /** @class */ (function (_super) {
    __extends(FirestoreModel, _super);
    function FirestoreModel() {
        return _super.call(this) || this;
    }
    return FirestoreModel;
}(_6_faker_1.FakerLayer));
exports.FirestoreModel = FirestoreModel;
