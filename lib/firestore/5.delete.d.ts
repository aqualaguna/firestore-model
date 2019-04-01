import { UpdateLayer } from "./4.update";
/**
 * this class for implementing delete layer in CRUD procedure
 *
 */
export declare class DeleteLayer extends UpdateLayer {
    /**
     * delete the current document
     */
    delete(): Promise<boolean>;
    /**
     * check if the document is exists in database
     * @param id documentID
     */
    static isExists(id: string): Promise<boolean>;
    /**
     * delete all document in collection
     */
    static deleteAll(): Promise<any>;
    /**
    * event before delete to execute. override this method to implement.
    */
    protected static deleting(id: string): Promise<boolean>;
    /**
     * event after delete to execute. override this method to implement.
     */
    protected static deleted(id: string): Promise<boolean>;
}
