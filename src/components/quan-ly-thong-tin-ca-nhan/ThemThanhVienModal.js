import React, {Component} from 'react';
import {Text, Button, View, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modalbox';

export class ThemThanhVienModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3,
    };
  }

  showAddMemberModal = () => {
    this.refs.modal1.open();
  };

  onClose() {
    //called on modal closed
    console.log('Modal just closed');
  }

  onOpen() {
    //called on modal opened
    console.log('Modal just opened');
  }

  onClosingState(state) {
    //called on modal close/open of the swipe to close change
    console.log('Open/Close of the SwipeToClose just changed');
  }

  render() {
    return (
      <Modal
        style={[styles.modal, styles.modal1]}
        position={'center'}
        ref={'modal1'}
        isDisabled={this.state.isDisabled}>
        <Text style={styles.text}>Modal centered</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.setState({isDisabled: !this.state.isDisabled})}>
          <Text style={styles.buttonText}>
            Disable ({this.state.isDisabled ? 'true' : 'false'})
          </Text>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 50,
    flex: 1,
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  modal1: {
    height: 230,
    width: 400,
  },
});
