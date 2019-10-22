import { Base } from "./1.base";
import { now } from '../type'
import { DocumentReference, WriteResult, DocumentSnapshot } from "@google-cloud/firestore";
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
    async save () : Promise<boolean> {
        // sumarized the input
        let temp: any = {};
        for (const key of this.keys) {
            temp[key] = this[key];
        }
        
        // check if the docref is set.
        if (this.docRef) {
            //@ts-ignore
            if (!(await this.constructor.updating(temp))) {
                throw new Error("updating permission denied.");
            }
            // then update the data
            if(this.timestamp) {
                temp.updated_at = now;
            }
            return this.docRef.update(temp).then(d => {
                // @ts-ignore
                this.constructor.updated(this.id, temp);
                return Promise.resolve(true);
            });
            
        } else {
            //@ts-ignore
            if (!(await this.constructor.creating(temp))) {
                throw new Error("creating permission denied.");
            }
            if(this.timestamp) {
                temp.updated_at = temp.created_at = now;
            }
            //create the data
            if (this.id && typeof this.id === 'string') {
                // if the id is set then use the id and update
                // @ts-ignore
                return this.constructor.collection().doc(this.id).set(temp).then(async (d: WriteResult) => {
                    // @ts-ignore
                    this.docRef = this.constructor.collection().doc(this.id);
                    let data = this.docRef ? await this.docRef.get().then(t => t.data()) : {}
                    this.fill(data);
                    //@ts-ignore
                    this.constructor.created(this.id, data);
                    return Promise.resolve(true);
                });
            } else {
                // autogenerate id
                //@ts-ignore
                return this.constructor.collection().add(temp).then(async (d : FirebaseFirestore.DocumentReference) => {
                    this.docRef = d;
                    this.id = d.id;
                    let data = await d.get().then(t => t.data());
                    this.fill(data);
                    //@ts-ignore
                    this.constructor.created(this.id, data);
                    return Promise.resolve(true);
                });
            }
        }
    }
    /**
     * create data from nothing
     * @param data object or Array<object>
     */
    static async create(data: object | Array<object>) : Promise<any> {
        //clean the data
        let temp :any;
        let attribute = (new this()).attribute;
        
        if(data instanceof Array) {
            // if an array create a task list
            let task = [];
            for (const datum of data) {
                temp = {};
                for (const key of Object.keys(attribute)) {
                    // @ts-ignore
                    temp[key] = datum[key] || attribute[key];
                }
                if (!(await this.creating(temp))) {
                    throw new Error("creating permission denied.");
                }
                task.push(this.collection().add(temp).then(async d => {
                    let res = new this();
                    res.id = d.id
                    res.docRef = d;
                    let data = await d.get().then(d => d.data());
                    res.fill(data);
                    this.created(d.id, data);
                    return res;
                }));
            }
            return Promise.all(task).then(d => d).catch(() => [])
        } else {
            temp = {};
            for (const key of Object.keys(attribute)) {
                // @ts-ignore
                temp[key] = data[key] || attribute[key];
            }
            if (!(await this.creating(temp))) {
                throw new Error("creating permission denied.");
            }
            return this.collection().add(temp).then(async d => {
                let res = new this();
                res.id = d.id
                res.docRef = d;
                let data = await d.get().then(d => d.data());
                res.fill(data);
                this.created(d.id, data);
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

    /**
     * set by documentsnapshot object
     * @param data DocumentSnapshot
     */
    async set(data: DocumentSnapshot | DocumentReference) {
        if (data instanceof DocumentSnapshot) {
            this.docRef = data.ref;
            this.id = data.id;
            this.fill(data.data());
        } else if(data instanceof DocumentReference) {
            this.docRef = data;
            this.id = data.id;
            this.fill(await data.get().then(d => d.data()));
        }
    }

    /**
     * event before create to execute. override this method to implement.
     */
    protected static async creating(data: any) : Promise<boolean>{
        return true;
    }

    /**
     * event after create to execute. override this method to implement.
     */
    protected static async created(id:string, data: any) : Promise<boolean>{
        return true;
    }

    /**
     * event before update to execute. override this method to implement.
     */
    protected static async updating(data: any) : Promise<boolean>{
        return true;
    }

    /**
     * event after update to execute. override this method to implement.
     */
    protected static async updated(id:string, data: any) : Promise<boolean>{
        return true;
    }
    
}

