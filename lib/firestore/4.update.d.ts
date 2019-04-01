import { ReadLayer } from "./3.read";
/**
 * this class for implementing update layer in CRUD procedure
 */
export declare class UpdateLayer extends ReadLayer {
    /**
     * use this function to force update.
     * this field is not guarded with attribute filter.
     * @param data data to be updated
     */
    update(data: any): Promise<boolean>;
    /**
     * update data by id.
     * @param id id of the document
     * @param data data to be updated
     * @return Promise<boolean>
     */
    static updateData(id: string, data: any): Promise<boolean>;
}
