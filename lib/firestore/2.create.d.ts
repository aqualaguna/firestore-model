import { Base } from "./1.base";
import { DocumentReference, DocumentSnapshot } from "@google-cloud/firestore";
/**
 * interface for create Layer.
 * caution some of static method must be implemented!
 * static method: create
 */
export interface CreateLayerInterface {
    save(): Promise<boolean>;
}
/**
 * this class for implementing creating layer in CRUD procedure
 * there is several method to create a document. first is assigning one by one and then save.
 * the other method is using create method or make method.
 */
export declare class CreateLayer extends Base implements CreateLayerInterface {
    /**
     * save a model to firestore. if reference exists update it if not create it.
     */
    save(): Promise<boolean>;
    /**
     * create data from nothing
     * @param data object or Array<object>
     */
    static create(data: object | Array<object>): Promise<any>;
    /**
     * set value for created instance model
     * @param data object to set value
     */
    fill(data: any): void;
    /**
     * set by documentsnapshot object
     * @param data DocumentSnapshot
     */
    set(data: DocumentSnapshot | DocumentReference): Promise<void>;
    /**
     * event before create to execute. override this method to implement.
     */
    protected static creating(data: any): Promise<boolean>;
    /**
     * event after create to execute. override this method to implement.
     */
    protected static created(id: string, data: any): Promise<boolean>;
    /**
     * event before update to execute. override this method to implement.
     */
    protected static updating(data: any): Promise<boolean>;
    /**
     * event after update to execute. override this method to implement.
     */
    protected static updated(id: string, data: any): Promise<boolean>;
}
