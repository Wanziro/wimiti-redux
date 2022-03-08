import React from 'react';
import {useSelector} from 'react-redux';

import Client from './Client';
import User from './User';

function index() {
  const {username} = useSelector(state => state.currentUser);
  return <>{username != '' && username != null ? <User /> : <Client />}</>;
}

export default index;
