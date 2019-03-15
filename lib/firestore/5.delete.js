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
var _4_update_1 = require("./4.update");
/**
 * this class for implementing delete layer in CRUD procedure
 *
 */
var DeleteLayer = /** @class */ (function (_super) {
    __extends(DeleteLayer, _super);
    function DeleteLayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * delete the current document
     */
    DeleteLayer.prototype.delete = function () {
        var self = this;
        return this.docRef ? this.docRef.delete().then(function () {
            self.docRef = null;
            return true;
        }).catch(function (d) { return false; }) : null;
    };
    /**
     * check if the document is exists in database
     */
    DeleteLayer.prototype.isExists = function () {
        return this.docRef ? true : false;
    };
    return DeleteLayer;
}(_4_update_1.UpdateLayer));
exports.DeleteLayer = DeleteLayer;
