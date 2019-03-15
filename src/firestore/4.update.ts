import { ReadLayer } from "./3.read";

/**
 * this class for implementing update layer in CRUD procedure
 */

export class UpdateLayer extends ReadLayer {
    public update(data : any) : Promise<boolean> | null {
        let self = this;
        return this.docRef ? this.docRef.update(data).then(() => {
            Object.keys(data).forEach(key => {
                self[key] = data[key];
            });
            return true;
        }) : null;
    }
}