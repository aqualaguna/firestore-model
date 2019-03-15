import { CreateLayer } from "./2.create";
import * as admin from 'firebase-admin';

/**
 * this class for implementing reading layer in CRUD procedure
 */

export class ReadLayer extends CreateLayer {
    /**
     * find document by id
     * @param ids Array of string / string. identification
     */
    static async find(ids: Array<string> | string) {
        let res :any = null;
        if(ids instanceof Array) {
            res = [];
            let listdocref: admin.firestore.DocumentReference[] = [];
            ids.forEach(id => listdocref.push(this.collection().doc(id)));
            this.firestore().getAll(...listdocref).then(docs => {
                docs.forEach(doc => {
                    if (doc.exists) {
                        let t = new this();
                        t.id = doc.id;
                        t.docRef = doc.ref;
                        t.fill(doc.data());
                        res.push(t);
                    }
                })
            })
            return res;
        } else {
            this.collection().doc(ids).get().then((d) => {
                if (d.exists) {
                    let t = new this();
                    t.id = d.id;
                    t.docRef = d.ref;
                    t.fill(d.data());
                    res = t;
                }
            })
        }
        return res;
    }

    /**
     * get all data from collections
     */
    static async all() {
        return this.collection().get().then((snapshot: admin.firestore.QuerySnapshot) => {
            let res :any = [];
            snapshot.forEach((doc : admin.firestore.QueryDocumentSnapshot) => {
                // @ts-ignore
                let t = new this();
                t.docRef = this.collection().doc(doc.id);
                t.id = doc.id;
                // t.docRef = doc.parent.doc(doc.id);
                t.fill(doc.data());
                res.push(t);
            })
            return res;
        })
    }
}