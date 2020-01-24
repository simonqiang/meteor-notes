import {Accounts} from "meteor/accounts-base";
import SimpleSchema from "simpl-schema";
import {Meteor} from "meteor/meteor";

console.log('I am here validate new user');

Accounts.validateNewUser((user) => {
  console.log('this is the user' + user);
  const email = user.emails[0].address;

  new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    }
  }).validate({email});

  return true;
});
