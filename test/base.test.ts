import { FirestoreModel } from "../src";
import credential = require('../credential.json');
import { Authentication } from "../src/authentication";
import { CollectionCaseType } from "../src/firestore/1.base";
import { DocumentReference } from "../src/type";
import { CollectionReference } from "@google-cloud/firestore";
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

describe('Base Class Test', () => {
    test('basic get class name', () => {
        expect(UserDetail.getCollectionName()).toBe('user_detail');
        expect(UserDetail.getCollectionName(CollectionCaseType.ConstantCase)).toBe('USER_DETAIL');
        expect(UserDetail.getCollectionName(CollectionCaseType.CamelCase)).toBe('userDetail');
        expect(UserDetail.getCollectionName(CollectionCaseType.HeaderCase)).toBe('User-Detail');
        expect(UserDetail.getCollectionName(CollectionCaseType.ParamCase)).toBe('user-detail');
        expect(UserDetail.getCollectionName(CollectionCaseType.PascalCase)).toBe('UserDetail');
    });

    test('test convert model to ordinary object', () => {
        let t = new UserDetail();
        t.name = 'test';
        t.email = 'test2';
        t.password = 'test3';
        t.description = 'test4';
        const temp = t.toObject();
        expect(temp).toEqual(expect.objectContaining({
            name: 'test',
            email: 'test2',
            password: 'test3',
            description: 'test4',
        }));
    });

    it('should parse path to document or collection', async () => {
        let temp = '1/like/321';
        let t = UserDetail.pathParse(temp);
        expect(t).toBeInstanceOf(DocumentReference);
        expect(t.path).toBe(`user_detail/${temp}`);
        temp = '1/like';
        t = UserDetail.pathParse(temp);
        expect(t).toBeInstanceOf(CollectionReference);
        expect(t.path).toBe(`user_detail/${temp}`);
    })
})