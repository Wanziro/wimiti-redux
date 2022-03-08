import React from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import WimitiColors from '../../../../WimitiColors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
function Step3({setCurrentStep, postContents, setPostContents, handlePost2}) {
  return (
    <View>
      <View
        style={{
          height: 50,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: 10,
        }}>
        <TouchableWithoutFeedback onPress={() => setCurrentStep(2)}>
          <View style={{paddingRight: 10}}>
            <Icon name="arrow-back" size={30} color={WimitiColors.black} />
          </View>
        </TouchableWithoutFeedback>
        <Text style={{color: WimitiColors.black}}>3/3</Text>
        <TouchableWithoutFeedback onPress={() => handlePost2()}>
          <View>
            <Text style={{color: WimitiColors.blue, fontSize: 18}}>Post</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={{padding: 10}}>
        <Text style={{color: WimitiColors.black}}>
          Video caption (optional)
        </Text>
        <View style={{marginTop: 10}}>
          <TextInput
            placeholder="Write your caption"
            style={{
              maxHeight: height / 2,
            }}
            multiline={true}
            value={postContents}
            onChangeText={text => setPostContents(text)}
          />
        </View>
      </View>
    </View>
  );
}

export default Step3;
