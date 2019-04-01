import * as admin from 'firebase-admin';

export var now = admin.firestore.FieldValue.serverTimestamp();
export var TimeStamp = admin.firestore.Timestamp;
export var DocumentReference = admin.firestore.DocumentReference;