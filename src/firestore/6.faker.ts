import * as faker from 'faker';
import { DeleteLayer } from './5.delete';

export class FakerLayer extends DeleteLayer {
    /**
     * faker object from https://github.com/marak/Faker.js/
     */
    static faker: Faker.FakerStatic = faker;
    /**
     * Override this function to make factory data 
     * use faker object to create dummy data.
     * @returns object
     */
    factory () : object | undefined {
        return undefined;
    }
    
    /**
     * create dummy data from factory template
     * @param count number of data generated
     * @param saveFlag default to true. if false does not save to database
     */
    static createDummyData(count : number = 1, saveFlag : boolean = true) : Promise<any>{
        let self = new this();
        //@ts-ignore
        let data = self.factory();
        if (!data) {
            throw new Error("factory must be defined to use this function.");
        } else {
            // check if factory has same structure
            let keys = new Set(Object.keys(self.attribute));
            if(Object.keys(data).some(x => !keys.has(x))) {
                throw new Error("factory object created does not match with attribute specified.");
            }
            let res: any = [];
            let process = [];
            for(let i = 0; i < count; i++) {
                let temp = new this();
                temp.fill(self.factory());
                if(saveFlag) {
                    process.push(temp.save());
                }
                res.push(temp);
            }
            // wait for all save completed if there any.
            return Promise.all(process).then(() => res);
            // return the result.
        }
    }
}