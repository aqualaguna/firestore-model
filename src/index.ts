import { FakerLayer } from "./firestore/6.faker";
import * as changeCase from 'change-case';
import { now } from './type'

export class FirestoreModel extends FakerLayer {
    constructor() {
        super();
    }
    /**
     * initialize the model to be used. for some reason this cant be placed in base constructor
     */
    init() {
        this.defaultAttribute = this.attribute;
        this.keys = Object.keys(this.attribute);
        Object.keys(this.attribute).forEach(key => {
            this[key] = this.attribute[key];
        });
        for (const key of this.mark) {
            this[changeCase.camelCase(`mark ${key}`)] = () => {
                let data: any = {};
                data[key] = this.markValue;
                return this.update(data);
            }
            this[changeCase.camelCase(`unmark ${key}`)] = () => {
                let data: any = {};
                data[key] = this.unmarkValue;
                return this.update(data);
            }
        }
    }
}
