import { FakerLayer } from "./firestore/6.faker";
export declare class FirestoreModel extends FakerLayer {
    constructor();
    /**
     * initialize the model to be used. for some reason this cant be placed in base constructor
     */
    init(): void;
}
