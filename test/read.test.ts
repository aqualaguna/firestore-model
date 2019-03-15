import { FirestoreModel } from "../src";
import credential = require('../credential.json');
import { Authentication } from "../src/authentication";
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

describe('Read data', () => {
    it('get all data', async () => {
        let t = await UserDetail.all();
        expect(Array.isArray(t)).toBeTruthy();
        expect(t.length).toBeGreaterThan(0);
        expect(t[0].docRef).toBeDefined();
        expect(t[0].id).toBeDefined();
    });
    
});