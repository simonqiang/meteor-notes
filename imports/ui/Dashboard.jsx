import React from 'react';
import {Accounts} from "meteor/accounts-base";
import {Meteor} from 'meteor/meteor';
import PrivateHeader from "./PrivateHeader";


export default () => {
  return (
    <div>
      <PrivateHeader title="Dashboard"/>
      <div className="page-content">
        Dashboard Page Content.
      </div>
    </div>
  )
};
