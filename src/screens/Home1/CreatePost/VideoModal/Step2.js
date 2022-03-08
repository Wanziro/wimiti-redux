import React from 'react';
import {
  Text,
  Image,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import WimitiColors from '../../../../WimitiColors';

const width = Dimensions.get('window').width;

function Step2({
  setCurrentStep,
  videoMainThumbnail,
  otherThumbnails,
  getOtherThumbnails,
  setOtherThumbnails,

  selectedVideoThumbnail,
  setselectedVideoThumbnail,
}) {
  return (
    <View style={{flex: 1, position: 'relative'}}>
      <View
        style={{
          height: 50,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: 10,
        }}>
        <TouchableWithoutFeedback onPress={() => setCurrentStep(1)}>
          <View style={{paddingRight: 10}}>
            <Icon name="arrow-back" size={30} color={WimitiColors.black} />
          </View>
        </TouchableWithoutFeedback>
        <Text style={{color: WimitiColors.black}}>2/3</Text>
        <TouchableWithoutFeedback onPress={() => setCurrentStep(3)}>
          <View>
            <Text style={{color: WimitiColors.blue, fontSize: 18}}>Next</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View
        style={{padding: 10, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{marginBottom: 10}}>Selected thumbnail</Text>
        <View>
          {selectedVideoThumbnail != null ? (
            <Image
              source={{uri: selectedVideoThumbnail.path}}
              style={{width: width / 2, height: 300, borderRadius: 10}}
            />
          ) : (
            <Image
              source={{uri: videoMainThumbnail.path}}
              style={{width: width / 2, height: 300, borderRadius: 10}}
            />
          )}
        </View>
      </View>
      <View
        style={{position: 'absolute', bottom: 0, width, paddingHorizontal: 10}}>
        <Text
          style={{
            color: WimitiColors.black,
            textAlign: 'center',
            marginBottom: 10,
          }}>
          Choose another thumbnail
        </Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            {videoMainThumbnail != null && (
              <TouchableWithoutFeedback
                onPress={() => setselectedVideoThumbnail(videoMainThumbnail)}>
                <View style={{marginRight: 5}}>
                  <Image
                    source={{uri: videoMainThumbnail.path}}
                    style={
                      selectedVideoThumbnail != null
                        ? videoMainThumbnail.path == selectedVideoThumbnail.path
                          ? styles.selected
                          : styles.notSelected
                        : styles.selected
                    }
                  />
                </View>
              </TouchableWithoutFeedback>
            )}
            {otherThumbnails.length > 0 &&
              otherThumbnails.map((thumbnail, index) => (
                <View key={index} style={{marginRight: 5}}>
                  <TouchableWithoutFeedback
                    onPress={() => setselectedVideoThumbnail(thumbnail)}>
                    <Image
                      source={{uri: thumbnail.path}}
                      style={
                        selectedVideoThumbnail != null
                          ? thumbnail.path == selectedVideoThumbnail.path
                            ? styles.selected
                            : styles.notSelected
                          : styles.notSelected
                      }
                    />
                  </TouchableWithoutFeedback>
                </View>
              ))}
            <TouchableOpacity
              onPress={() => {
                setOtherThumbnails([]);
                getOtherThumbnails();
              }}>
              <View
                style={{
                  height: 100,
                  width: 60,
                  borderRadius: 10,
                  backgroundColor: WimitiColors.blue,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  name="refresh-circle-outline"
                  color={WimitiColors.white}
                  size={30}
                />
                <Text style={{color: WimitiColors.white}}>Refresh</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  selected: {
    borderWidth: 5,
    borderColor: WimitiColors.blue,
    height: 100,
    width: 60,
    borderRadius: 10,
  },
  notSelected: {
    height: 100,
    width: 60,
    borderRadius: 10,
  },
});

export default Step2;
