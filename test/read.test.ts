import { FirestoreModel } from "../src";
import credential = require('../credential.json');
import { Authentication } from "../src/authentication";
jest.setTimeout(30000);
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

    it('should have return 1 data', async () => {
        let t = await UserDetail.all();
        let id = t[0].id;
        let temp = await UserDetail.find(id);
        expect(temp instanceof UserDetail).toBeTruthy();
        expect(temp.id == id).toBeTruthy();
    })
    
});