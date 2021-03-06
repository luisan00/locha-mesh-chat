import ImagePicker from "react-native-image-crop-picker";
import AsyncStorage from "@react-native-community/async-storage";
import RNFS from "react-native-fs";
import { ActionTypes } from "../constants";
import { createFolder } from "../../utils/utils";
import { writteUser, getUserData } from "../../database/realmDatabase";

export const getPhotosFromUser = (id, callback) => async dispatch => {
  const directory = await createFolder();
  ImagePicker.openPicker({
    cropping: true,
    width: 500,
    height: 500
  }).then(async images => {
    const name = await getName(images);
    const newPath = `file:///${directory}/${name}`;
    RNFS.moveFile(images.path, newPath).then(async res => {
      await deletePhotoFromPhone();
      writteUser({ uid: id, picture: newPath }).then(async res => {
        callback();
        dispatch({
          type: ActionTypes.GET_PHOTO_USER,
          payload: res.picture
        });
      });
    });
  });
};

const getName = data => {
  const result = data.path.split("/");
  return result[7];
};

const deletePhotoFromPhone = async () => {
  getUserData("user").then(async res => {
    const parse = JSON.parse(JSON.stringify(res));
    if (parse.picture) {
      await RNFS.exists(parse.picture).then(async res => {
        if (res) {
          await RNFS.unlink(parse.picture);
        }
      });
    }
  });
};

export const openCamera = (id, callback) => async dispatch => {
  const directory = await createFolder();
  ImagePicker.openCamera({
    width: 500,
    height: 500,
    cropping: true
  }).then(async images => {
    const name = await getName(images);
    const newPath = `file:///${directory}/${name}`;
    RNFS.moveFile(images.path, newPath).then(async () => {
      await deletePhotoFromPhone();
      writteUser({
        uid: id,
        picture: newPath
      }).then(async res => {
        callback();
        dispatch({
          type: ActionTypes.GET_PHOTO_USER,
          payload: res.picture
        });
      });
    });
  });
};

export const editName = (obj, callback) => async dispatch => {
  console.log();
  writteUser({ ...obj, id: obj.uid }).then(res => {
    callback();
    dispatch({
      type: ActionTypes.EDIT_NAME,
      payload: res.name
    });
  });
  // console.log("action", name);
  // await AsyncStorage.mergeItem("user", JSON.stringify({ name: name })).then(
  //   () => {
  //   }
  // );
};
