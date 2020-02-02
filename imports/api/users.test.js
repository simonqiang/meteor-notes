import expect from 'expect';

import {validateNewUser} from "./users";
import {Meteor} from "meteor/meteor";

if(Meteor.isServer) {
  describe('users', function () {

    it('should allow invalid email address', function () {
      const testUser = {
        emails: [
          {
            address: 'simonqiang@',
          }
        ]
      };

      expect(() => {
        validateNewUser(testUser)
      }).toThrow(Error)
    });

  });
}
