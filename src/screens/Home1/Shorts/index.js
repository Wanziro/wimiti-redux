import React, {useState, useEffect} from 'react';
import {View, Text, StatusBar, Dimensions, Pressable} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import WimitiColors from '../../../WimitiColors';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {fetchShorts, setCurrentViewingIndex} from '../../../actions/shorts';
import Carousel from 'pinar';
import VideoItem from './VideoItem';
import ShortPlaceholder from './Placeholders/ShortPlaceholder';
const {width, height} = Dimensions.get('window');

function Shorts({navigation}) {
  const dispatch = useDispatch();
  const {shorts, currentViewingIndex, isLoadingShorts, error} = useSelector(
    state => state.shorts,
  );

  useEffect(() => {
    dispatch(fetchShorts());
  }, []);

  const handleFileSelect = async () => {
    try {
      const result = await launchCamera({
        selectionLimit: 1,
        mediaType: 'video',
        durationLimit: 60,
      });
      navigation.navigate('ShortPreview', {videoFile: result.assets[0]});
    } catch (error) {
      console.log('Error occured while selecting chatt file. ' + error.message);
    }
  };
  return (
    <>
      <StatusBar
        backgroundColor={WimitiColors.black}
        barStyle="light-content"
      />
      <View
        style={{
          flex: 1,
          backgroundColor: WimitiColors.black,
          position: 'relative',
        }}>
        {isLoadingShorts && shorts.length === 0 ? (
          <ShortPlaceholder />
        ) : (
          <Carousel
            autoplay={false}
            showsControls={false}
            index={currentViewingIndex}
            horizontal={false}
            showsDots={false}
            onIndexChanged={({index, total}) => {
              dispatch(setCurrentViewingIndex(index));
            }}>
            {shorts.map((short, index) => (
              <VideoItem key={index} videoObj={short} />
            ))}
          </Carousel>
        )}
        <View
          style={{
            position: 'absolute',
            top: 0,
            width,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            marginTop: 10,
          }}>
          <Text style={{color: WimitiColors.white, fontSize: 20}}>Talents</Text>
          <Pressable onPress={() => handleFileSelect()}>
            <View>
              <Icon name="camera" size={30} color={WimitiColors.white} />
            </View>
          </Pressable>
        </View>
      </View>
    </>
  );
}

export default Shorts;
