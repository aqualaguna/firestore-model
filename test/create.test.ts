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
// connect to firebase
beforeAll((done) => {
    Authentication.authenticate(credential);
    done();
})

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
        expect(t.id).toBeDefined();
        expect(t.createdAt).toBeUndefined();
        expect(t.updatedAt).toBeUndefined();
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
        expect(t.createdAt).toBeUndefined();
        expect(t.updatedAt).toBeUndefined();
        await t.delete();
    });
    it('save method with timestamp', async () => {
        let t = new Temp();
        t.name = 'test';
        t.description = "desc";
        expect(await t.save()).toBeTruthy();
        expect(t.id).toBeDefined();
        expect(t.createdAt).toBeDefined();
        expect(t.updatedAt).toBeDefined();
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
