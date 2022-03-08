import React, {useState} from 'react';
import {SafeAreaView, TextInput, View, Text, ScrollView} from 'react-native';
import WimitiColors from '../../WimitiColors';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import works from './Works';

function UpdateWork() {
  const [results, setResults] = useState([]);
  const [keyWord, setKeyWord] = useState('');

  const handleSearch = () => {
    if (keyWord != '') {
      let res = [];
      for (let i = 0; i < works.length; i++) {
        const work = works[i].toLowerCase();
        if (work.includes(keyWord.toLowerCase())) {
          res.push(works[i]);
        }
      }
      setResults(res);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: WimitiColors.white,
        padding: 15,
      }}>
      <SafeAreaView>
        <View style={{position: 'relative', paddingTop: 20}}>
          <TextInput
            style={{
              borderColor: WimitiColors.black,
              borderWidth: 1,
              paddingVertical: 10,
              paddingLeft: 15,
              paddingRight: 40,
              borderRadius: 19,
              height: 40,
            }}
            placeholder="Search for job"
            value={keyWord}
            onChangeText={text => {
              setKeyWord(text);
              handleSearch();
            }}
          />
          <View
            style={{
              position: 'absolute',
              top: 20,
              right: 0,
              padding: 5,
              height: 40,
            }}>
            <Icon name="search1" color={WimitiColors.black} size={30} />
          </View>
        </View>
        <View>
          {results.length > 0 && (
            <>
              <Text>Found {results.length} matching jobs. Select your job</Text>
              <ScrollView>
                {results.map((work, index) => (
                  <View key={index} style={{marginVertical: 10}}>
                    <Text>{work}</Text>
                  </View>
                ))}
              </ScrollView>
            </>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

export default UpdateWork;
