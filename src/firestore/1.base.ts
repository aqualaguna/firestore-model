import { Authentication } from "../authentication";
import * as admin from 'firebase-admin';
import * as changeCase from 'change-case';
/// <reference path="change-case/change-case.d.ts" />
/**
 * enumeration for style of name collection
 * eg. classname = UserDetail
 */
export enum CollectionCaseType {
    /**
     * ConstantCase = 'USER_DETAIL'
     */

    ConstantCase ='constant',
    /**
     * SnakeCase = 'user_detail'
     */
    SnakeCase = 'snake',
    /**
     * CamelCase = 'userDetail'
     */
    CamelCase = 'camel',
    /**
     * HeaderCase = 'Header-Case'
     */
    HeaderCase = 'header',
    /**
     * ParamCase = 'user-detail'
     */
    ParamCase = 'param',
    /**
     * CamelCase = 'ParamCase'
     */
    PascalCase = 'pascal'
}
export var now = admin.firestore.FieldValue.serverTimestamp();
export class Base {
    protected timestamp : boolean = true;
    protected docRef: admin.firestore.DocumentReference | null = null;
    /**
     * set a default collection naming convention
     */
    protected static collectionStyle : CollectionCaseType = CollectionCaseType.SnakeCase;
    protected attribute: any;
    /**
     * in case there is new instance with no parameter default attribute is used.
     */
    protected defaultAttribute :any;
    /**
     * keys of existed in attribute the value is Object.keys(attribute)
     */
    protected keys!: string[];
    [key: string]: any;
    
    /**
     * initialize the model to be used. for some reason this cant be placed in base constructor
     */
    init() {
        this.defaultAttribute = this.attribute;
        this.keys = Object.keys(this.attribute);
        Object.keys(this.attribute).forEach(key => {
            this[key] = this.attribute[key];
        });
    }

    /**
     * get firestore db only used for internal class can't called by outside
     */
    protected static firestore() : admin.firestore.Firestore {
        return Authentication.firestore;
    }

    /**
     * get collection by class name
     */
    static getCollectionName(type: CollectionCaseType = this.collectionStyle): string {
        
        return changeCase[type](this.name);
    }
    /**
     * get collection reference
     */
    static collection() : admin.firestore.CollectionReference {
        return this.firestore().collection(this.getCollectionName())
    }

    /**
     * convert this instance to simple object
     */
    toObject() : object {
        let temp : any = {};
        for (const key of this.keys) {
            temp[key] = this[key];
        }
        return temp as object;
    }

}
