"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var admin = __importStar(require("firebase-admin"));
var fbadmin = admin;
exports.default = fbadmin;
var Authentication = /** @class */ (function () {
    function Authentication() {
    }
    /**
     * set credential to login to firestore
     * @param credential path or string json file.
     */
    Authentication.authenticate = function (credential) {
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(credential)
            });
        }
        Authentication.firestore = admin.firestore();
    };
    return Authentication;
}());
exports.Authentication = Authentication;
