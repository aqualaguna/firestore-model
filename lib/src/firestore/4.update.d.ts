import { ReadLayer } from "./3.read";
/**
 * this class for implementing update layer in CRUD procedure
 */
export declare class UpdateLayer extends ReadLayer {
    update(data: any): Promise<boolean> | null;
}
