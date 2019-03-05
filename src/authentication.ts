import * as admin from 'firebase-admin';
var fbadmin = admin;

export default fbadmin;

export class Authentication {
    /**
     * static variable using singleton pattern this variable hold the connection to firestore
     */
    static firestore: admin.firestore.Firestore;

    /**
     * set credential to login to firestore
     * @param credential path or string json file.
     */
    static authenticate(credential: any) {
        if(!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(credential)
            })
        }
        Authentication.firestore = admin.firestore();
    }
}