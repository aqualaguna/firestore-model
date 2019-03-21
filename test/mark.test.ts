import { FirestoreModel } from "../src";
import credential = require('../credential.json');
import { Authentication } from "../src/authentication";
class UserDetail extends FirestoreModel {
    protected mark = ['deleted'];
    attribute = {
        name: '',
        email: '',
        password: '',
        description: '',
        deleted: false
    };
    constructor() {
        super();
        console.log(this.mark)
        this.init();
    }
}
// connect to firebase
beforeAll((done) => {
    Authentication.authenticate(credential);
    done();
})

describe('marking class', () => {
    test('marking delete', async () => {
        let t = new UserDetail();
        t.name = 'test';
        t.email = "test@example.com";
        t.password = "hahaha";
        t.description = "desc";
        await t.save();
        await t.markDeleted();
        expect(t.deleted).toBeTruthy();
    });
    
})