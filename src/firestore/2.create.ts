import { Base, now } from "./1.base";
/**
 * interface for create Layer.
 * caution some of static method must be implemented!
 * static method: create
 */
export interface CreateLayerInterface{
    save() : Promise<boolean>;
}
/**
 * this class for implementing creating layer in CRUD procedure
 * there is several method to create a document. first is assigning one by one and then save.
 * the other method is using create method or make method.
 */

export class CreateLayer extends Base implements CreateLayerInterface{
    /**
     * save a model to firestore. if reference exists update it if not create it.
     */
    save () : Promise<boolean> {
        // sumarized the input
        let temp: any = {};
        for (const key of this.keys) {
            temp[key] = this[key];
        }
        // check if the docref is set.
        if (this.docRef) {
            // then update the data
            if(this.timestamp) {
                temp.updatedAt = now;
            }
            return this.docRef.set(temp).then(d => Promise.resolve(true));
        } else {
            if(this.timestamp) {
                temp.updatedAt = temp.createdAt = now;
            }
            //create the data
            if (this.id && typeof this.id === 'string') {
                // if the id is set then use the id and update
                // @ts-ignore
                return this.constructor.collection().doc(this.id).set(temp).then(async (d: FirebaseFirestore.DocumentReference) => {
                    // @ts-ignore
                    this.docRef = this.constructor.collection().doc(this.id);
                    this.fill(await d.get().then(t => t.data()));
                    return Promise.resolve(true);
                });
            } else {
                // autogenerate id
                //@ts-ignore
                return this.constructor.collection().add(temp).then(async (d : FirebaseFirestore.DocumentReference) => {
                    this.docRef = d;
                    this.id = d.id;
                    this.fill(await d.get().then(t => t.data()));
                    return Promise.resolve(true);
                });
            }
        }
    }
    /**
     * create data from nothing
     * @param data object or Array<object>
     */
    static create(data: object | Array<object>) : Promise<any> {
        //clean the data
        let temp :any;
        let attribute = (new this()).attribute;
        // @ts-ignore
        
        
        if(data instanceof Array) {
            return Promise.all(data.map(item => {
                temp = {};
                for (const key of Object.keys(attribute)) {
                    // @ts-ignore
                    temp[key] = item[key] || attribute[key];
                }
                // @ts-ignore
                if(this.timestamp) {
                    temp.updatedAt = temp.createdAt = now;
                }
                return this.collection().add(temp).then(async d => {
                    let res = new this();          
                    res.id = d.id;
                    res.docRef = d;
                    res.fill(await d.get().then(d => d.data()))
                    return res;
                });
            }));
        } else {
            temp = {};
            for (const key of Object.keys(attribute)) {
                // @ts-ignore
                temp[key] = data[key] || attribute[key];
            }
            return this.collection().add(temp).then(async d => {
                let res = new this();
                res.id = d.id
                res.docRef = d;
                res.fill(await d.get().then(d => d.data()))
                return res;
            });
        }
    }
    /**
     * set value for created instance model
     * @param data object to set value
     */
    fill(data: any) : void {
        Object.keys(data).forEach(key => {
            this[key] = data[key];
        });
    }
    
}

