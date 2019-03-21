import { UpdateLayer } from "./4.update";

/**
 * this class for implementing delete layer in CRUD procedure
 * 
 */

export class DeleteLayer extends UpdateLayer {
    /**
     * delete the current document
     */
    public delete() : Promise<boolean> | null{
        const self = this;
        return this.docRef ? this.docRef.delete().then(() => {
            self.docRef = null;
            return true;
        }).catch(d => false) : null;
    }
    /**
     * check if the document is exists in database
     */

    public isExists() : boolean{
        return this.docRef ? true : false;
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
            batch.commit()
        })
    }
}