import { Base } from "./1.base";
import * as faker from 'faker';

export class FakerLayer extends Base {
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
}