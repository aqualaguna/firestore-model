import { FirestoreModel } from "../src";
import credential = require('../credential.json');
import { Authentication } from "../src/authentication";

class Log extends FirestoreModel {
    attribute = {
        text: '',
    }
    constructor() {
        super();
        this.init();
    }
}

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
    protected static async creating(data : any){
        // change to make sure creating method is fired
        data.description = "creating event is fired";
        return true;
    }
    protected static async created(id : string, data : any) {
        // change to make sure creating method is fired
        let t = new Log();
        t.text = `user detail with ${id} created.`;
        return t.save();
    }

    protected static async updating(data : any){
        // change to make sure creating method is fired
        data.description = "updating event is fired";
        return true;
    }
    protected static async updated(id : string, data : any) {
        // change to make sure creating method is fired
        let t = new Log();
        t.text = `user detail with ${id} updated.`;
        return t.save();
    }


    protected static async deleting(id : any){
        // change to make sure creating method is fired
        let t = new Log();
        t.text = `user detail with ${id} deleting.`;
        return t.save();
    }
    protected static async deleted(id : string) {
        // change to make sure creating method is fired
        let t = new Log();
        t.text = `user detail with ${id} deleted.`;
        return t.save();
    }
}
jest.setTimeout(30000);
// connect to firebase
beforeAll((done) => {
    Authentication.authenticate(credential);
    done();
})
let id:string;

describe('Event Feature', () => {
    it('should fire event creating and created', async (done) => {
        let t = new UserDetail();
        t.fill({
            name: 'test',
            email: 'test@example.com',
            password: 'test',
            description: 'desc'
        });
        expect(await t.save()).toBeTruthy();
        id = t.id;
        expect(t.description).toBe("creating event is fired");
        setTimeout(async () => {
            // check if created event is fired
            let temp = await Log.all();
            expect(temp.length).toBe(1);
            done();
        }, 1000);
    });

    it('should fire event updating and updated', async (done) => {
        expect(id).toBeDefined();
        let temp : UserDetail = await UserDetail.find(id);
        temp.description = 'changed';
        expect(await temp.save()).toBeTruthy();
        await temp.refresh();
        expect(temp.description).toBe("updating event is fired");
        setTimeout(async () => {
            // check if created event is fired
            let t = await Log.all();
            expect(t.length).toBe(2);
            done();
        }, 1000);
    });

    it('should fire event deleting and deleted', async (done) => {
        expect(id).toBeDefined();
        let temp : UserDetail = await UserDetail.find(id);
        expect(await temp.delete()).toBeTruthy();
        setTimeout(async () => {
            // check if created event is fired
            let t = await Log.all();
            expect(t.length).toBe(4);
            done();
        }, 1000);
    });
})

afterAll(async () => {
    await Promise.all([
        UserDetail.deleteAll(),
        Log.deleteAll()
    ])
})
