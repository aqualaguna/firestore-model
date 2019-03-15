import { Base } from "./1.base";
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
}
