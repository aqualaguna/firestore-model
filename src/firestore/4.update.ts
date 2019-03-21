import { ReadLayer } from "./3.read";
import { now } from "./1.base";

/**
 * this class for implementing update layer in CRUD procedure
 */

export class UpdateLayer extends ReadLayer {
    /**
     * use this function to force update.
     * this field is not guarded with attribute filter.
     * @param data data to be updated
     */
    public update(data : any) : Promise<boolean> | null {
        let self = this;
        if (this.timestamp) {
            data.updated_at = now
        }
        return this.docRef ? this.docRef.update(data).then(() => {
            Object.keys(data).forEach(key => {
                self[key] = data[key];
            });
            return true;
        }) : null;
    }
}