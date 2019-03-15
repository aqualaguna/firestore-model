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
var _3_read_1 = require("./3.read");
/**
 * this class for implementing update layer in CRUD procedure
 */
var UpdateLayer = /** @class */ (function (_super) {
    __extends(UpdateLayer, _super);
    function UpdateLayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UpdateLayer.prototype.update = function (data) {
        var self = this;
        return this.docRef ? this.docRef.update(data).then(function () {
            Object.keys(data).forEach(function (key) {
                self[key] = data[key];
            });
            return true;
        }) : null;
    };
    return UpdateLayer;
}(_3_read_1.ReadLayer));
exports.UpdateLayer = UpdateLayer;
