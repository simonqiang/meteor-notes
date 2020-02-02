import expect from 'expect';

import {validateNewUser} from "./users";
import {Meteor} from "meteor/meteor";

if(Meteor.isServer) {
  describe('users-1', function () {

    it('should allow valid email address', function () {
      const testUser = {
        emails: [
          {
            address: 'simonqiang@gmail.com',
          }
        ]
      };
      const res = validateNewUser(testUser);
      expect(res).toBe(true);
    });

  });
}
