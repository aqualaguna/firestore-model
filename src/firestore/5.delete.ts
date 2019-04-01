import { UpdateLayer } from "./4.update";

/**
 * this class for implementing delete layer in CRUD procedure
 * 
 */

export class DeleteLayer extends UpdateLayer {
    /**
     * delete the current document
     */
    public async delete() : Promise<boolean>{
        const self = this;
        // @ts-ignore
        if(!(await this.constructor.deleting(this.id))) {
            throw new Error("deleting permission denied.");
        }
        return this.docRef ? this.docRef.delete().then(() => {
            self.docRef = null;
            // @ts-ignore
            this.constructor.deleted(this.id)
            return true;
        }).catch(d => false) : false;
    }
    

    /**
     * check if the document is exists in database
     * @param id documentID
     */
    public static async isExists(id: string) : Promise<boolean> {
        // check the id
        return this.collection().doc(id).get().then(d => d.exists).catch(() => false);
    }
    
    /**
     * delete all document in collection
     */
    static deleteAll() : Promise<any> {
        let batch = this.firestore().batch();
        return this.collection().listDocuments().then(val => {
            val.map((val) => {
                batch.delete(val)
            })
            return batch.commit()
        })
    }

     /**
     * event before delete to execute. override this method to implement.
     */
    protected static async deleting(id: string) : Promise<boolean>{
        return true;
    }

    /**
     * event after delete to execute. override this method to implement.
     */
    protected static async deleted(id:string) : Promise<boolean>{
        return true;
    }
}