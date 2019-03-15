import * as admin from 'firebase-admin';
declare var fbadmin: typeof admin;
export default fbadmin;
export declare class Authentication {
    /**
     * static variable using singleton pattern this variable hold the connection to firestore
     */
    static firestore: admin.firestore.Firestore;
    /**
     * set credential to login to firestore
     * @param credential path or string json file.
     */
    static authenticate(credential: any): void;
}
