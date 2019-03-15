import { FirestoreModel } from "../src";
import credential = require('../credential.json');
import { Authentication } from "../src/authentication";
import { CollectionCaseType } from "../src/firestore/1.base";
class UserDetail extends FirestoreModel {
    attribute = {
        name: '',
        email: '',
        password: '',
        description: ''
    };
    constructor() {
        super();
        this.init();
    }
}
// connect to firebase
beforeAll((done) => {
    Authentication.authenticate(credential);
    done();
})

describe('DeleteLayer class test', () => {
    test('delete existing data', async () => {
        let t = new UserDetail();
        t.name = 'test';
        t.email = "test@example.com";
        t.password = "hahaha";
        t.description = "desc";
        await t.save();
        expect(await t.delete()).toBeTruthy();
        expect(t.isExists()).toBeFalsy();
    });
    
})