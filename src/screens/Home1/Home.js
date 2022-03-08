import React, {useContext, useState, useRef, useEffect} from 'react';
import {
  Image,
  View,
  Text,
  StatusBar,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
  RefreshControl,
  Dimensions,
} from 'react-native';
import WimitiColors from '../../WimitiColors';
import Setup from './Setup';
import Posts from './Posts';
import UserPosts from './UserPosts/UserPosts';
import Header from './Header/Header';
import {UserMainContext} from '../Context/UserContext';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import DraggablePanel from 'react-native-draggable-panel';
import ViewComments from './UserPosts/ViewComments/ViewComments';
import {backendUserImagesUrl} from '../../Config';
import {messagesTable} from '../../helpers/tableCreations';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const Home = ({navigation}) => {
  const context = useContext(UserMainContext);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshStatus, setRefreshStatus] = useState(false);
  const [commentsPostId, setCommentsPostId] = useState(null);

  const commentsPanelRef = useRef();

  useEffect(() => {
    messagesTable();
  }, []);

  const showCommentsPanel = () => {
    commentsPanelRef.current.show();
  };
  const hideCommentsPanel = () => {
    commentsPanelRef.current.hide();
  };

  const onRefresh = () => {
    setRefreshStatus(true);
    setRefreshing(false);
    setTimeout(() => {
      setRefreshStatus(false);
    }, 300);
  };

  return (
    <>
      <StatusBar backgroundColor={WimitiColors.white} barStyle="dark-content" />
      <View style={{backgroundColor: WimitiColors.white, flex: 1}}>
        <SafeAreaView>
          <Header navigation={navigation} />
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <Setup />
            <View style={{margin: 10, marginTop: 15}}>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('CreatePost')}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <View>
                    {context.userImage != null &&
                    context.userImage.trim() != '' ? (
                      <Image
                        source={{uri: backendUserImagesUrl + context.userImage}}
                        style={{height: 30, width: 30, borderRadius: 50}}
                      />
                    ) : (
                      <View
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 100,
                          backgroundColor: WimitiColors.black,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Icon
                          name="user"
                          size={20}
                          color={WimitiColors.white}
                        />
                      </View>
                    )}
                  </View>
                  <View
                    style={{
                      borderColor: WimitiColors.black,
                      borderWidth: 1,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 50,
                      width: '90%',
                    }}>
                    <Text>What's on your mind?</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
            {/* <Posts /> */}
            <UserPosts
              navigation={navigation}
              refreshing={refreshStatus}
              showCommentsPanel={showCommentsPanel}
              setCommentsPostId={setCommentsPostId}
            />
          </ScrollView>

          {/* comments panel */}
          <DraggablePanel
            ref={commentsPanelRef}
            initialHeight={height}
            expandable={true}
            // onDismiss={() => console.log('Dismissed')}
          >
            <ViewComments
              hideCommentsPanel={hideCommentsPanel}
              commentsPostId={commentsPostId}
            />
          </DraggablePanel>
        </SafeAreaView>
      </View>
    </>
  );
};

export default Home;
