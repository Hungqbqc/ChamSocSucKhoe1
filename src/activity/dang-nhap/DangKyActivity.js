import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {IP_SERVER, DATE_FORMAT_COMPARE} from '../../asset/MyColor';
import moment from 'moment';
import {
  COLOR_PINK,
  COLOR_DEEPSKY_BLUE,
  COLOR_PINK_MEDIUM,
} from '../../asset/MyColor';
export default class DangKyActivity extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    email: '',
    password: '',
    name: '',
    confirmPass: '',
    errorMessage: null,
  };
  URLDangKy = IP_SERVER + 'DangKy.php';
  handleSignUp = () => {
    const {email, password, name} = this.state;
    if (email.trim() != '' && password.trim() != '') {
      fetch(this.URLDangKy, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
          ngayTao: moment().format('DDMMYYYY'),
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson === 1) {
            // Lấy thông tin thành viên để chuyển trang
            Alert.alert('Đăng ký thành công!');
            this.props.navigation.navigate('DangNhapActivity');
          } else {
            Alert.alert('Đăng ký thất bại!');
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 25, marginBottom: 30}}>Đăng ký</Text>
        {this.state.errorMessage && (
          <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
        )}
        <View style={styles.hoTen}>
          <Text>Họ tên</Text>
          <TextInput
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={name => this.setState({name})}
            value={this.state.name}
          />
        </View>
        <View style={styles.hoTen}>
          <Text>Email</Text>
          <TextInput
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={email => this.setState({email})}
            value={this.state.email}
          />
        </View>
        <View style={styles.hoTen}>
          <Text>Mật khẩu</Text>
          <TextInput
            secureTextEntry
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={password => this.setState({password})}
            value={this.state.password}
          />
        </View>
        <View style={styles.hoTen}>
          <Text>Xác nhận mật khẩu</Text>
          <TextInput
            secureTextEntry
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={confirmPass => this.setState({confirmPass})}
            value={this.state.confirmPass}
          />
        </View>

        <TouchableOpacity
          onPress={this.handleSignUp}
          style={styles.signInButton}>
          <Text style={{fontSize: 20}}>Đăng ký</Text>
        </TouchableOpacity>
        <Text>
          {' '}
          Đã có tài khoản?{' '}
          <Text
            onPress={() => this.props.navigation.navigate('DangNhapActivity')}
            style={{color: '#e93766', fontSize: 18}}>
            {' '}
            Đăng nhập{' '}
          </Text>
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
  },
  hoTen: {
    // flex: 1,
    marginBottom: 10,
  },
  signInButton: {
    fontSize: 30,
    width: 150,
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_DEEPSKY_BLUE,
  },
});
