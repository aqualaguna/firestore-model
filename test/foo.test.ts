import { FirestoreModel } from "../src";
import credential = require('../credential.json');
import { CollectionCaseType } from "../src/chain/1.base";
import { Authentication } from "../src/authentication";
class UserDetail extends FirestoreModel {
    static attribute = {
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
Authentication.authenticate(credential);
test('basic get class name', () => {
  expect(UserDetail.getCollectionName()).toBe('user_detail');
  expect(UserDetail.getCollectionName(CollectionCaseType.ConstantCase)).toBe('USER_DETAIL');
  expect(UserDetail.getCollectionName(CollectionCaseType.CamelCase)).toBe('userDetail');
  expect(UserDetail.getCollectionName(CollectionCaseType.HeaderCase)).toBe('User-Detail');
  expect(UserDetail.getCollectionName(CollectionCaseType.ParamCase)).toBe('user-detail');
  expect(UserDetail.getCollectionName(CollectionCaseType.PascalCase)).toBe('UserDetail');
});

test('Create simple data', async () => {
    let id = await UserDetail.create({
        name: 'ricardo',
        email: 'test@mail.com'
    });
    console.log(id);
    expect(typeof id === "string").toBeTruthy();
})
