import { FirestoreModel } from "../src";
import credential = require('../credential.json');
import { Authentication } from "../src/authentication";
import { DocumentSnapshot, DocumentReference } from "@google-cloud/firestore";
class UserDetail extends FirestoreModel {
    attribute = {
        name: '',
        email: '',
        password: '',
        description: ''
    };
    timestamp = false;

    constructor() {
        super();
        this.init();
    }
}
class Temp extends FirestoreModel {
    attribute = {
        name: '',
        description: ''
    };
    constructor() {
        super();
        this.init();
    }
}

jest.setTimeout(30000);
// connect to firebase
beforeAll((done) => {
    Authentication.authenticate(credential);
    done();
})
let id : string;
describe('Create data', () => {
    it('fill should set the value', () => {
        let t = new UserDetail();
        t.fill({
            name: 'test',
            email: 'test@example.com',
            password: 3,
            description: 'desc'
        })
        expect(t.name).toBe('test');
        expect(t.email).toBe('test@example.com');
        expect(t.password).toBe(3);
        expect(t.description).toBe('desc');
    });

    it('save method', async () => {
        let t = new UserDetail();
        t.name = 'test';
        t.email = "test@example.com";
        t.password = "hahaha";
        t.description = "desc";
        expect(await t.save()).toBeTruthy();
        id = t.id;
        expect(t.id).toBeDefined();
        expect(t.created_at).toBeUndefined();
        expect(t.updated_at).toBeUndefined();
    });

    it('should able set by document snapshot', async () => {
        expect(id).toBeDefined();
        let temp: DocumentSnapshot = await UserDetail.collection().doc(id).get().then(d => d);
        let t = new UserDetail();
        let data = temp.data() || {};
        t.set(temp);
        expect(t.id).toBe(temp.id);
        expect(t.name).toBe(data.name);
        expect(t.description).toBe(data.description);
    });

    it('should able set by document reference', async () => {
        expect(id).toBeDefined();
        let temp: DocumentReference = UserDetail.collection().doc(id);
        let t = new UserDetail();
        t.set(temp);
        expect(t.id).toBe(temp.id);
    });


    it('save method with predefined id', async () => {
        let t = new UserDetail();
        t.id = 'hello'
        t.name = 'test';
        t.email = "test@example.com";
        t.password = "hahaha";
        t.description = "desc";
        expect(await t.save()).toBeTruthy();
        expect(t.id).toBe('hello');
        expect(t.created_at).toBeUndefined();
        expect(t.updated_at).toBeUndefined();
        await t.delete();
    });

    it('save method with timestamp', async () => {
        let t = new Temp();
        t.name = 'test';
        t.description = "desc";
        expect(await t.save()).toBeTruthy();
        expect(t.id).toBeDefined();
        expect(t.created_at).toBeDefined();
        expect(t.updated_at).toBeDefined();
    });

    it('create method', async () => {
        let t = await UserDetail.create({
            name: 'test',
            email: 'test@example.com',
            password: 3,
            description: 'desc'
        }) as UserDetail;
        expect(t.id).toBeDefined();
        expect(t.name).toBe('test');
        expect(t.email).toBe('test@example.com');
        expect(t.password).toBe(3);
        expect(t.description).toBe('desc');
    });

    it('create method (Array)', async () => {
        let t = await UserDetail.create([
            {
                name: 'create Array',
                email: 'test@example.com',
                password: 3,
                description: 'desc'
            },
            {
                name: 'hello',
                email: 'hello@example.com',
                password: "hello",
                description: 'desc'
            }
        ]);
        expect(Array.isArray(t)).toBeTruthy();
        expect(t.length).toBe(2);
        expect(t[0].id).toBeDefined();
        expect(t[0].name).toBe('create Array');
    })
})

afterAll(async () => {
    await Promise.all([
        UserDetail.deleteAll()
    ])
})
