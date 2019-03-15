import { UpdateLayer } from "./4.update";
/**
 * this class for implementing delete layer in CRUD procedure
 *
 */
export declare class DeleteLayer extends UpdateLayer {
    /**
     * delete the current document
     */
    delete(): Promise<boolean> | null;
    /**
     * check if the document is exists in database
     */
    isExists(): boolean;
}
