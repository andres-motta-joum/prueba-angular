const functions = require('firebase-functions');
const admin = require('firebase-admin');

const createMessage = require('./create-messages/create-message');
const myPots = require('./find-messages/my-pots');
const allPots = require('./find-messages/all-pots')
admin.initializeApp();

exports.createMessage = createMessage.createMessage;
exports.findMyPots = myPots.findMyPots;
exports.findAllPots = myPots.findAllPots;
