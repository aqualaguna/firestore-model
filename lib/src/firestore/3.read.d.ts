import { CreateLayer } from "./2.create";
/**
 * this class for implementing reading layer in CRUD procedure
 */
export declare class ReadLayer extends CreateLayer {
    /**
     * find document by id
     * @param ids Array of string / string. identification
     */
    static find(ids: Array<string> | string): Promise<any>;
    /**
     * get all data from collections
     */
    static all(): Promise<any>;
}
