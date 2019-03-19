import * as admin from 'firebase-admin';
/**
 * enumeration for style of name collection
 * eg. classname = UserDetail
 */
export declare enum CollectionCaseType {
    /**
     * ConstantCase = 'USER_DETAIL'
     */
    ConstantCase = "constant",
    /**
     * SnakeCase = 'user_detail'
     */
    SnakeCase = "snake",
    /**
     * CamelCase = 'userDetail'
     */
    CamelCase = "camel",
    /**
     * HeaderCase = 'Header-Case'
     */
    HeaderCase = "header",
    /**
     * ParamCase = 'user-detail'
     */
    ParamCase = "param",
    /**
     * CamelCase = 'ParamCase'
     */
    PascalCase = "pascal"
}
export declare var now: FirebaseFirestore.FieldValue;
export declare class Base {
    protected timestamp: boolean;
    protected docRef: admin.firestore.DocumentReference | null;
    /**
     * set a default collection naming convention
     */
    protected static collectionStyle: CollectionCaseType;
    protected attribute: any;
    /**
     * in case there is new instance with no parameter default attribute is used.
     */
    protected defaultAttribute: any;
    /**
     * keys of existed in attribute the value is Object.keys(attribute)
     */
    protected keys: string[];
    [key: string]: any;
    /**
     * initialize the model to be used. for some reason this cant be placed in base constructor
     */
    init(): void;
    /**
     * get firestore db only used for internal class can't called by outside
     */
    protected static firestore(): admin.firestore.Firestore;
    /**
     * get collection by class name
     */
    static getCollectionName(type?: CollectionCaseType): string;
    /**
     * get collection reference
     */
    static collection(): admin.firestore.CollectionReference;
    /**
     * get document reference for current object
     */
    getDocument(): admin.firestore.DocumentReference | null;
    /**
     * convert this instance to simple object
     */
    toObject(): object;
}
