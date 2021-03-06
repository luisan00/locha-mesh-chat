import React, { Component } from "react";
import Modal from "react-native-modal";
import { images } from "../../utils/constans";
import { View, Text, TouchableOpacity, PermissionsAndroid } from "react-native";
import { Thumbnail } from "native-base";

export default class EditPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getPhotosFromGallery = () => {
    this.props.getPhotosFromUser(this.props.config.uid,() => {
      this.props.close();
    });
  };

  GetphotoFromCamera = () => {
    this.props.openCamera(this.props.config.uid, () => {
      this.props.close("openModalPhoto");
    });
  };

  render() {
    const { open, close } = this.props;
    return (
      <View>
        <Modal
          style={{
            justifyContent: "flex-end",
            margin: 0
          }}
          isVisible={open}
          onBackdropPress={() => close("openModalPhoto")}
          swipeDirection={["up", "left", "right", "down"]}
        >
          <View
            style={{
              backgroundColor: "#fff",
              width: "100%",
              height: "25%",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-evenly"
            }}
          >
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => {
                this.getPhotosFromGallery();
              }}
            >
              <Thumbnail source={images.file.url} />
              <Text>Galeria</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => {
                this.GetphotoFromCamera();
              }}
            >
              <Thumbnail source={images.camera.url} />
              <Text>Camara</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}
