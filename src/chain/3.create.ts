import { FakerLayer } from "./2.faker";

/**
 * this class for implementing creating layer in CRUD procedure
 * there is several method to create a document. first is assigning one by one and then save.
 * the other method is using create method or make method.
 */

export class CreateLayer extends FakerLayer {
    /**
     * save a model to firestore. if reference exists update it if not create it.
     */
    save () : Promise<Boolean> {
        // sumarized the input
        let temp: any = {};
        for (const key of this.keys) {
            temp[key] = this[key];
        }
        // check if the docref is set.
        if (this.docRef) {
            // then update the data
            return this.docRef.set(temp).then(d => Promise.resolve(true));
        } else {
            //create the data
            if (this.id && typeof this.id === 'string') {
                // if the id is set then use the id
                return this.collection().doc(this.id).set(temp).then(() => {
                    this.docRef = this.collection().doc(this.id);
                    return Promise.resolve(true);
                });
            } else {
                // autogenerate id
                return this.collection().add(temp).then((d : FirebaseFirestore.DocumentReference) => {
                    this.docRef = d;
                    return Promise.resolve(true);
                });
            }
        }
    }

    static create(data: any) : Promise<string> {
        //clean the data
        let temp :any = {}
        // @ts-ignore
        for (const key of Object.keys(this.attribute)) {
            // @ts-ignore
            temp[key] = data[key] || this.attribute[key];
        }
        return this.collection().add(temp).then(d => d.id);
    }
    
}