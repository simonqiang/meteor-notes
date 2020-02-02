import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import PrivateHeader from './PrivateHeader';

if (Meteor.isClient) {
  describe('PrivateHeader', function () {
    beforeEach(function () {
      configure({adapter: new Adapter()});
    });

    it('should set button text to logout', function () {

      const wrapper = mount( <PrivateHeader title="Test title"/> );
      const buttonText = wrapper.find('button').text();

      expect(buttonText).toBe('Logout');
    });

    it('should use title prop as h1 text', function () {
      const title = 'Test title here';
      const wrapper = mount( <PrivateHeader title={title}/> );
      const actualTitle = wrapper.find('h1').text();
      expect(actualTitle).toBe(title);
    });
  });
}
