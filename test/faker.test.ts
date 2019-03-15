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
class Factory extends FirestoreModel {
    attribute = {
        name: '',
        description: ''
    };
    factory() {
        return {
            name: Factory.faker.company.companyName(),
            description: Factory.faker.random.words(),
        };
    }
    constructor() {
        super();
        this.init();
    }
}

// connect to firebase
beforeAll((done) => {
    Authentication.authenticate(credential);
    done();
});

describe('faker test suite', () => {
    test('create dummy data should fail when factory not defined', () => {
        expect(() => UserDetail.createDummyData()).toThrowError('factory must be defined to use this function.');
    });
    test('create dummy success', async () => {
        await Factory.createDummyData().then(data => {
            expect(Array.isArray(data)).toBeTruthy();
            expect(data[0].name.length).toBeGreaterThan(0);
            expect(data.length).toBe(1);
        });
        await Factory.createDummyData(3).then(data => {
            expect(Array.isArray(data)).toBeTruthy();
            expect(data[0].name.length).toBeGreaterThan(0);
            expect(data.length).toBe(3);
            expect(data[0].id).toBeDefined();
        });
    });
    
})
