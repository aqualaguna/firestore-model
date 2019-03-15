# firestore-model
ORM for firestore. very simple class for easing your workflow.

for start this library still lacking many feature such as :
* there is no support for subcollection.
* there is no query as yet.

bellow is example how to use the model class.
```
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
```

the constructor of the class have to be set if not there will be unexpected behavior.
## Instalation
1. install from npm
```
npm install firestore-class
```
2. clone this github
```
git clone https://github.com/aqualaguna/firestore-model.git
```

## Example
0. Authentication
```
import { Authentication } from "firestore-class/lib/authentication";
import credential = require('./credential.json');
// or
const credential = require('./credential.json');
//this is the same thing.
Authentication.authenticate(credential)
```
1. Create a document
```
let user = new UserDetail();
let t = new UserDetail();
t.name = 'test';
t.email = "test@example.com";
t.password = "hahaha";
t.description = "desc";
await t.save(); // return promise<boolean>

// love using object ? 
let temp = new UserDetail();
temp.fill({
  name: 'second',
  email: 'test@mail.com',
  description: 'okay',
  password: 'secret'
})
await temp.save(); // promise boolean

// dont want using the class ? 
let obj = temp.toObject();
console.log(obj)

Output :
{
  name: 'second',
  email: 'test@mail.com',
  description: 'okay',
  password: 'secret'
}
```

2. Update document

```
user.name = "changed";
await user.save() // promise boolean

// or second method

await user.update({
  name: "hello world"
}) // promise boolean
```
3. deleting a document

```
await user.delete(); // promise Boolean
```

4. fast create dummy data

this feature you must implement factory method in class you created.
```
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
```

I'm using faker libary from https://github.com/marak/Faker.js/ . for more faker method look at the documentation.
and to use this class:

```
// param default to 1 if not specified
await Factory.createDummyData(3).then(data => {
// what to do to the data
// data is type of Array<Factory>
});
```

5. static method and variable

```
// get collection name {class}.getCollectionName()
UserDetail.getCollectionName()
export enum CollectionCaseType {
    /**
     * ConstantCase = 'USER_DETAIL'
     */

    ConstantCase ='constant',
    /**
     * SnakeCase = 'user_detail'
     */
    SnakeCase = 'snake',
    /**
     * CamelCase = 'userDetail'
     */
    CamelCase = 'camel',
    /**
     * HeaderCase = 'Header-Case'
     */
    HeaderCase = 'header',
    /**
     * ParamCase = 'user-detail'
     */
    ParamCase = 'param',
    /**
     * CamelCase = 'ParamCase'
     */
    PascalCase = 'pascal'
}

// collection naming style can be changed
Factory.collectionStyle = CollectionCaseType.PascalCase;
// or set it in class

class Example extends FirestoreModel {
  static collectionStyle = CollectionCaseType.PascalCase;
  timestamp = false; // set to false if don't want auto timestamp
}
```
