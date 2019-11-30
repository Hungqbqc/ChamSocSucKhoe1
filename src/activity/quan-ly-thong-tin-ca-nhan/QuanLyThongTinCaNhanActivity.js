import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {COLOR_BLUE} from '../../asset/MyColor';
import {CheckBox, ListItem} from 'react-native-elements';
import {Button} from 'react-native-elements';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {ThemThanhVienModal} from '../../components/quan-ly-thong-tin-ca-nhan/ThemThanhVienModal';
export class QuanLyThongTinCaNhanActivity extends React.Component {
  // profileInfo: ProfileInfo = new ProfileInfo();
  Obj = {
    info: {
      imageUri:
        'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F1133957%2Fpexels-photo-1133957.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26dpr%3D1%26w%3D500&imgrefurl=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fbeautiful%2F&docid=B51x0PBR9KNzvM&tbnid=Ta_cSMMIFERHqM%3A&vet=10ahUKEwi49tH9ks7lAhXVKqYKHfRhCxkQMwhOKAAwAA..i&w=500&h=334&bih=758&biw=1440&q=image%20beautiful&ved=0ahUKEwi49tH9ks7lAhXVKqYKHfRhCxkQMwhOKAAwAA&iact=mrc&uact=8',
      name: 'Nguyễn Thị Ngọc Ánh',
      email: 'Anh@gmail.com',
    },
    myFamily: [
      {id: 1, name: 'Bố', checked: true},
      {id: 2, name: 'Mẹ', checked: true},
      {id: 3, name: 'Anh trai', checked: false},
      {id: 5, name: 'Em gái', checked: true},
    ],
  };

  getSoThanhVien() {
    for (let index = 0; index < this.Obj.myFamily.length; index++) {}
    return (
      <View style={styles.MainContainer}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.Obj.myFamily}
          renderItem={({item}) => (
            <CheckBox
              containerStyle={styles.checkBoxMember}
              title={item.name}
              checked={this.state.checked}
            />
          )}
          ItemSeparatorComponent={this.renderSeparator}
          style={{backgroundColor: 'transparent'}}
        />
      </View>
    );
  }
  modalVisible = false;
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      visible: false,
      modalVisible: false,
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3,
    };
    this.getSoThanhVien();
    this.addMember = this.addMember.bind(this);
  }

  addMember = () => {
    this.refs.addMember.showAddMemberModal();
  };

  login() {
    Alert.alert(
      'Thoát khỏi ứng dụng? ',
      'Bạn sẽ không nhận được thông báo sau khi đăng xuất!',
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Cancel Pressed'),
          style: 'login',
        },
        {
          text: 'Đăng xuất',
          onPress: () => {
            this.props.navigation.navigate('DangNhapActivity');
          },
        },
      ],
      {cancelable: false},
    );
  }

  changePassword = () => {
    Alert.alert(
      'Thoát khỏi ứng dụng? ',
      'Bạn sẽ không nhận được thông báo sau khi đăng xuất!',
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Cancel Pressed'),
          style: 'login',
        },
        {text: 'Đăng xuất', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  };

  xoaThanhVien() {
    Alert.alert(
      'Bạn có chắc chắn không? ',
      'Thành viên em trai sẽ bị xóa!',
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Cancel Pressed'),
          style: 'login',
        },
        {
          text: 'Xác nhận',
          onPress: () => {
            this.props.navigation.navigate('DangNhapActivity');
          },
        },
      ],
      {cancelable: false},
    );
  }

  checkItem = item => {
    const {checked} = this.state;

    if (!checked.includes(item)) {
      this.setState({checked: [...checked, item]});
    } else {
      this.setState({checked: checked.filter(a => a !== item)});
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {/*Button to open Basic Modal which is modal1 in this example*/}
        <Text style={styles.title}>My Profile</Text>
        <View style={styles.info}>
          <View style={styles.infoLeft}>
            <Image
              style={styles.avatarLogin}
              source={{
                uri:
                  'https://2img.net/h/i148.photobucket.com/albums/s1/KingofSarus/Dress-upLuffy2.jpg',
              }}
            />
          </View>
          <View style={styles.infoRight}>
            <Text>Họ tên</Text>
            <Text style={{marginLeft: 20}}>{this.Obj.info.name}</Text>
            <Text>Email</Text>
            <Text style={{marginLeft: 20}}>{this.Obj.info.email}</Text>
          </View>
        </View>
        <View style={styles.family}>
          <Text style={{fontWeight: 'bold', marginBottom: 15}}>
            Thành viên trong gia đình
          </Text>
          <View style={{flex: 9}}>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={this.Obj.myFamily}
              renderItem={({item}) => (
                <CheckBox
                  containerStyle={styles.checkBoxMember}
                  title={item.name}
                  checked={this.state.checked}
                  onPress={() => this.setState({checked: !this.state.checked})}
                />
              )}
              ItemSeparatorComponent={this.renderSeparator}
              style={{backgroundColor: 'transparent'}}
            />
          </View>
          <View style={styles.button}>
            <View style={{flex: 1, marginRight: 15}}>
              <Button
                icon={<IconAntDesign name="delete" size={20} color="white" />}
                title="Xóa"
                onPress={() => {
                  this.xoaThanhVien();
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <Button
                icon={
                  <IconFontAwesome name="user-plus" size={20} color="white" />
                }
                title="Thêm"
                onPress={() => {
                  this.addMember();
                }}
              />
            </View>
          </View>
          <ThemThanhVienModal ref={'addMember'} parentFlatList={this} />
        </View>
        <View style={styles.login}>
          <Button
            buttonStyle={{justifyContent: 'flex-start'}}
            icon={<IconEntypo name="log-out" size={20} color="white" />}
            title="Đăng xuất"
            titleStyle={{marginLeft: 10}}
            onPress={this.login}
          />
          <Button
            buttonStyle={{justifyContent: 'flex-start'}}
            icon={<IconAntDesign name="lock" size={20} color="white" />}
            title="Thay đổi mật khẩu"
            titleStyle={{marginLeft: 10}}
            onPress={() => {
              this.changePassword();
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    color: COLOR_BLUE,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    margin: 10,
    marginBottom: 25,
  },
  info: {
    flex: 2,
    width: '100%',
    flexDirection: 'row',
    padding: 15,
  },
  infoLeft: {
    flex: 2,
  },
  infoRight: {
    flex: 4,
    marginLeft: 10,
    marginRight: 10,
  },
  family: {
    flex: 6,
    width: '100%',
    padding: 25,
    maxHeight: '100%',
  },
  login: {
    flex: 2,
    width: '100%',
    justifyContent: 'space-around',
  },
  avatarLogin: {
    width: 100,
    height: 100,
    // margin: 10,
    borderRadius: 100,
  },
  checkBoxMember: {
    borderWidth: 0,
    margin: -2,
    backgroundColor: 'transparent',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    textAlign: 'right',
  },
});
