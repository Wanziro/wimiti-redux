import {backendUrl} from '../Config';
const uploadChattFile = (file, username) => {
  return new Promise((resolve, reject) => {
    var url = backendUrl + '/uploadChattFile';
    var photo = {
      uri: file.uri,
      type: file.type,
      name: 'fileTobeUploaded.' + file.type.split('/')[1],
    };

    var formData = new FormData();
    formData.append('file', photo);
    formData.append('username', username);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.onprogress = function () {
      console.log('LOADING', xhr.status);
    };

    xhr.onload = function () {
      console.log(xhr.response);
      const response = JSON.parse(xhr.response);
      if (response.type == 'success') {
        const {fileName} = response;
        resolve({status: response.type, uploadeFileName: fileName});
      } else {
        reject(response.type);
      }
    };
    xhr.send(formData);
  });
};

module.exports = {
  uploadChattFile,
};
