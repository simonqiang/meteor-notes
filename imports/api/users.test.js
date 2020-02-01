import expect from 'expect';

import {validateNewUser} from "./users";

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
