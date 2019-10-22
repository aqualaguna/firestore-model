import { ReadLayer } from "./3.read";
import { now } from '../type'

/**
 * this class for implementing update layer in CRUD procedure
 */

export class UpdateLayer extends ReadLayer {
    /**
     * use this function to force update.
     * this field is not guarded with attribute filter.
     * @param data data to be updated
     */
    public async update(data : any) : Promise<boolean> {
        let self = this;
        if (this.timestamp) {
            data.updated_at = now
        }
        // @ts-ignore
        if(!(await this.constructor.updating(data))) {
            throw new Error("updating permission denied.");
        }
        return this.docRef ? this.docRef.update(data).then(() => {
            Object.keys(data).forEach(key => {
                self[key] = data[key];
            });
            this.updated(this.id, data);
            return true;
        }) : false;
    }
    /**
     * update data by id.
     * @param id id of the document
     * @param data data to be updated
     * @return Promise<boolean>
     */
    static async updateData(id: string, data:any) : Promise<boolean> {

        if(!(await this.updating(data))) {
            throw new Error("updating permission denied.");
        }
        return this.collection().doc(id).update(data).then(d => {
            this.updated(id, data);
            return true;
        }).catch(() => false);
    }
}