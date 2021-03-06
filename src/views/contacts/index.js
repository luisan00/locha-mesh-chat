import React, { Component } from "react";
import { chats, images } from "../../utils/constans";
import Header from "../../components/Header";
import AddContact from "./AddContact";
import FloatButton from "../../components/FloatButton";
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Right,
  Text
} from "native-base";

import { Image, StyleSheet } from "react-native";
import { saveContact, getContacts } from "../../store/contacts";
import { connect } from "react-redux";

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false
    };
  }
  static navigationOptions = {
    header: null
  };

  openModal = () => {
    this.setState({ openModal: true });
  };

  closeModal = () => {
    this.setState({ openModal: false });
  };

  onSuccess = e => {
    console.log("aca", e);
  };

  render() {
    console.log(this.props.contacts);
    return (
      <Container>
        <Header {...this.props} modal={this.state.openModal} />
        {this.state.openModal && (
          <AddContact {...this.state} {...this.props} close={this.closeModal} />
        )}

        <Content>
          {this.props.contacts.map((contact, key) => {
            return (
              <List key={key}>
                <ListItem
                  button
                  style={{ height: 80 }}
                  onPress={
                    () => alert("Aun no disponible!")
                    // this.props.navigation.push("chat", {
                    //   ...contact
                    // })
                  }
                >
                  <Left style={styles.textContainer}>
                    <Text style={{ width: "100%", paddingBottom: 5 }}>
                      {contact.name}
                    </Text>
                    <Text note>{contact.uid}</Text>
                  </Left>
                  <Right>
                    {contact.picture && (
                      <Image
                        style={styles.imageStyles}
                        source={{
                          uri: contact.picture,
                          cache: "force-cache"
                        }}
                      />
                    )}
                    {!contact.picture && (
                      <Image
                        style={styles.imageStyles}
                        source={images.noPhoto.url}
                      />
                    )}
                  </Right>
                </ListItem>
              </List>
            );
          })}
        </Content>
        <FloatButton add={this.openModal} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  contacts: Object.values(state.contacts.contacts),
  userData: state.config
});

export default connect(
  mapStateToProps,
  { saveContact, getContacts }
)(Contacts);

const styles = StyleSheet.create({
  imageStyles: {
    width: 60,
    height: 60,
    borderRadius: 100
  },
  textContainer: {
    flexWrap: "wrap"
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777"
  },
  textBold: {
    fontWeight: "500",
    color: "#000"
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)"
  },
  buttonTouchable: {
    padding: 16
  }
});
