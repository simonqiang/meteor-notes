import expect from 'expect';

import {validateNewUser} from "./users";

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
