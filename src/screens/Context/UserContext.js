import React, {useEffect, useState, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserMainContext = createContext();
const UserContext = ({children}) => {
  const [userId, setUserId] = useState(null);
  const [userFname, setUserFname] = useState(null);
  const [userLname, setUserLname] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userPhone, setUserPhone] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [username, setUsername] = useState(null);

  const [userMessages, setUserMessages] = useState([]);
  const [userMessagesToBeSent, setUserMessagesToBeSent] = useState([]);

  const [playingVideo, setPlayingVideo] = useState(null);

  const [gotUserId, setGotUserId] = useState(false);
  const [gotUserFname, setGotUserFname] = useState(false);
  const [gotUserLname, setGotUserLname] = useState(false);
  const [gotUserEmail, setGotUserEmail] = useState(false);
  const [gotUserPhone, setGotUserPhone] = useState(false);
  const [gotUserImage, setGotUserImage] = useState(false);
  const [gotUsername, setGotUsername] = useState(false);

  useEffect(() => {
    let sub = true;
    if (sub) {
      AsyncStorage.getItem('user_id').then(value => {
        if (value != null) {
          setUserId(value);
        }
        setGotUserId(true);
      });

      AsyncStorage.getItem('user_fname').then(value => {
        if (value != null) {
          setUserFname(value);
        }
        setGotUserFname(true);
      });

      AsyncStorage.getItem('user_lname').then(value => {
        if (value != null) {
          setUserLname(value);
        }
        setGotUserLname(true);
      });

      AsyncStorage.getItem('user_email').then(value => {
        if (value != null) {
          setUserEmail(value);
        }
        setGotUserEmail(true);
      });

      AsyncStorage.getItem('user_phone').then(value => {
        if (value != null) {
          setUserPhone(value);
        }
        setGotUserPhone(true);
      });

      AsyncStorage.getItem('user_image').then(value => {
        if (value != null) {
          setUserImage(value);
        }
        setGotUserImage(true);
      });

      AsyncStorage.getItem('username').then(value => {
        if (value != null) {
          setUsername(value);
        }
        setGotUsername(true);
      });
    }
    return () => (sub = false);
  }, []);

  return (
    <UserMainContext.Provider
      value={{
        userId,
        setUserId,
        userFname,
        setUserFname,
        userLname,
        setUserLname,
        userEmail,
        setUserEmail,
        userPhone,
        setUserPhone,
        username,
        setUsername,
        userImage,
        setUserImage,
        gotUserId,
        gotUserFname,
        gotUserLname,
        gotUserEmail,
        gotUserPhone,
        gotUsername,
        gotUserImage,
        playingVideo,
        setPlayingVideo,
        userMessages,
        setUserMessages,
        userMessagesToBeSent,
        setUserMessagesToBeSent,
      }}>
      {children}
    </UserMainContext.Provider>
  );
};

export default UserContext;
