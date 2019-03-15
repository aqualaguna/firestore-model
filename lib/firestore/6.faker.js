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
var faker = __importStar(require("faker"));
var _5_delete_1 = require("./5.delete");
var FakerLayer = /** @class */ (function (_super) {
    __extends(FakerLayer, _super);
    function FakerLayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Override this function to make factory data
     * use faker object to create dummy data.
     * @returns object
     */
    FakerLayer.prototype.factory = function () {
        return undefined;
    };
    /**
     * create dummy data from factory template
     * @param count number of data generated
     * @param saveFlag default to true. if false does not save to database
     */
    FakerLayer.createDummyData = function (count, saveFlag) {
        if (count === void 0) { count = 1; }
        if (saveFlag === void 0) { saveFlag = true; }
        var self = new this();
        //@ts-ignore
        var data = self.factory();
        if (!data) {
            throw new Error("factory must be defined to use this function.");
        }
        else {
            // check if factory has same structure
            var keys_1 = new Set(Object.keys(self.attribute));
            if (Object.keys(data).some(function (x) { return !keys_1.has(x); })) {
                throw new Error("factory object created does not match with attribute specified.");
            }
            var res_1 = [];
            var process_1 = [];
            for (var i = 0; i < count; i++) {
                var temp = new this();
                temp.fill(self.factory());
                if (saveFlag) {
                    process_1.push(temp.save());
                }
                res_1.push(temp);
            }
            // wait for all save completed if there any.
            return Promise.all(process_1).then(function () { return res_1; });
            // return the result.
        }
    };
    /**
     * faker object from https://github.com/marak/Faker.js/
     */
    FakerLayer.faker = faker;
    return FakerLayer;
}(_5_delete_1.DeleteLayer));
exports.FakerLayer = FakerLayer;
