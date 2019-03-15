/// <reference types="faker" />
import { DeleteLayer } from './5.delete';
export declare class FakerLayer extends DeleteLayer {
    /**
     * faker object from https://github.com/marak/Faker.js/
     */
    static faker: Faker.FakerStatic;
    /**
     * Override this function to make factory data
     * use faker object to create dummy data.
     * @returns object
     */
    factory(): object | undefined;
    /**
     * create dummy data from factory template
     * @param count number of data generated
     * @param saveFlag default to true. if false does not save to database
     */
    static createDummyData(count?: number, saveFlag?: boolean): Promise<any>;
}
