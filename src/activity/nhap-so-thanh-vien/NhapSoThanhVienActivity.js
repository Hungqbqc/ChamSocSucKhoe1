import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import {
  COLOR_DEEPSKY_BLUE,
  COLOR_BLUE,
  COLOR_WHITE,
  IP_SERVER,
  URLThongTinThanhVien,
} from '../../asset/MyColor';
import NumericInput from 'react-native-numeric-input';
export default class NhapSoThanhVienActivity extends Component {
  URLLayThongTinThanhVien = IP_SERVER + URLThongTinThanhVien;

  constructor(props) {
    super(props);
    this.state = {
      soThanhVien: 0,
    };

    this.state = {
      email: this.props.navigation.getParam('email'),
    };
  }
  static navigationOptions = {
    header: null,
  };

  // Lưu lại số người
  async numericInputOnchange(value) {
    await this.setStateAsync({soThanhVien: value < 0 ? 0 : value});
  }

  // Nhấn nút Next thì chuyển sang màn hình k
  onPress = () => {
    fetch(this.URLLayThongTinThanhVien, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        loai: '3',
        email: this.state.email,
        soNguoi: this.state.soThanhVien,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson === 1) {
          this.props.navigation.navigate('ManHinhChinhActivity', {
            soThanhVien: this.state.soThanhVien,
            email: this.state.email,
          });
        } else {
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.lableTitle}>My Family</Text>
        <Text style={styles.textContent}>
          Please input the number of members in your family
        </Text>
        <Text style={styles.textSelectNumber}>Number of members</Text>
        <NumericInput
          style={styles.numberUpDown}
          type="up-down"
          value={this.state.soThanhVien}
          onChange={value => this.numericInputOnchange(value)}
          totalWidth={100}
          totalHeight={40}
          initValue={this.state.soThanhVien}
        />
        <TouchableOpacity onPress={this.onPress} style={styles.loginButton}>
          <Text style={styles.loginButtonTitle}>NEXT</Text>
        </TouchableOpacity>
      </View>
    );
  }

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lableTitle: {
    color: COLOR_DEEPSKY_BLUE,
    fontSize: 30,
    textAlign: 'center',
    marginTop: -200,
  },
  textContent: {
    color: COLOR_DEEPSKY_BLUE,
    textAlign: 'center',
    fontSize: 20,
    margin: 20,
  },
  textSelectNumber: {
    // color: COLOR_DEEPSKY_BLUE,
    textAlign: 'center',
    fontSize: 18,
    margin: 15,
  },
  numberUpDown: {
    textAlign: 'center',
    fontSize: 18,
    margin: 150,
  },
  buttonNext: {
    flex: 2,
    width: '100%',
    height: 50,
    backgroundColor: 'red',
  },
  loginButtonTitle: {
    fontSize: 18,
    color: COLOR_WHITE,
  },
  loginButton: {
    width: 300,
    height: 45,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_BLUE,
    marginTop: 30,
  },
});
