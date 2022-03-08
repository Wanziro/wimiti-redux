import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

import {createThumbnail} from 'react-native-create-thumbnail';

const VideoModal = ({
  selectedVideo,
  videoMainThumbnail,
  setShowVideoUploadModal,
  selectedVideoThumbnail,
  setselectedVideoThumbnail,
  postContents,
  setPostContents,
  handlePost2,
}) => {
  const [playedVideo, setPlayedVideo] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoadingOtherThumbnails, setIsLoadingOtherThumbnails] =
    useState(true);
  const [otherThumbnails, setOtherThumbnails] = useState([]);

  useEffect(() => {
    getOtherThumbnails();
  }, []);

  const getOtherThumbnails = async () => {
    setIsLoadingOtherThumbnails(true);
    for (let i = 2; i <= 11; i++) {
      try {
        let newThumbs = otherThumbnails;
        const thumbnail = await createThumbnail({
          url: selectedVideo.uri,
          timeStamp: 10000 * i,
        });
        newThumbs.push(thumbnail);
        setOtherThumbnails(newThumbs);
      } catch (error) {
        console.log(error);
      }
    }
    setIsLoadingOtherThumbnails(false);
  };

  return (
    <View style={{flex: 1}}>
      {currentStep === 1 && (
        <Step1
          selectedVideo={selectedVideo}
          videoMainThumbnail={videoMainThumbnail}
          playedVideo={playedVideo}
          setPlayedVideo={setPlayedVideo}
          setCurrentStep={setCurrentStep}
          setShowVideoUploadModal={setShowVideoUploadModal}
        />
      )}
      {currentStep === 2 && (
        <Step2
          selectedVideo={selectedVideo}
          videoMainThumbnail={videoMainThumbnail}
          setPlayedVideo={setPlayedVideo}
          setCurrentStep={setCurrentStep}
          otherThumbnails={otherThumbnails}
          getOtherThumbnails={getOtherThumbnails}
          setOtherThumbnails={setOtherThumbnails}
          selectedVideoThumbnail={selectedVideoThumbnail}
          setselectedVideoThumbnail={setselectedVideoThumbnail}
        />
      )}
      {currentStep == 3 && (
        <Step3
          setCurrentStep={setCurrentStep}
          postContents={postContents}
          setPostContents={setPostContents}
          handlePost2={handlePost2}
        />
      )}
    </View>
  );
};

export default VideoModal;
