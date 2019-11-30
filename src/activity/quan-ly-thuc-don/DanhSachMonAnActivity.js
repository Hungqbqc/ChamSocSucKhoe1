import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {IP_SERVER} from '../../asset/MyColor';
export default class DanhSachMonAnActivity extends Component {
  static navigationOptions = {
    title: 'Món chay',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  URLLayMonAn = IP_SERVER + 'MonAn.php?loai=2&&idDanhMuc=';
  flatListDanhMucMonAn = [];

  constructor(props) {
    super(props);
    this.state = {
      idDanhMuc: this.props.navigation.getParam('idDanhMuc'),
      email: this.props.navigation.getParam('email'),
      buaAnId: this.props.navigation.getParam('buaAnId'),
      ngayAn: this.props.navigation.getParam('ngayAn'),
      selected: false,
    };
  }

  themMonAnThanhCong = data => {
    alert('come back status: ' + data);
  };

  componentDidMount() {
    this.layMonAn();
  }

  layMonAn() {
    return fetch(this.URLLayMonAn + this.state.idDanhMuc)
      .then(response => response.json())
      .then(json => {
        if (json !== 0) {
          this.flatListDanhMucMonAn = json;
          this.setState({
            flatListDanhMucMonAn: json,
          });
        }
      });
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.state.flatListDanhMucMonAn}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity onPress={() => this.chonMonAn(item)}>
                <FlatListFoodItem key={item.Id} item={item} />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }

  chonMonAn(monAn) {
    this.props.navigation.navigate('ChiTietMonAnActivity', {
      themMonAnThanhCong: this.themMonAnThanhCong,
      monAn: monAn,
      email: this.state.email,
      buaAnId: this.state.buaAnId,
      ngayAn: this.state.ngayAn,
    });
  }
}

class FlatListFoodItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <View key={this.props.item.Id} style={styles.container}>
          <View style={styles.left}>
            <Image
              style={styles.avatarLogin}
              source={{
                uri: this.props.item.AnhMonAn,
              }}
            />
          </View>
          <View style={styles.right}>
            <View style={styles.rightTop}>
              <Text style={{fontSize: 18}}>{this.props.item.TenMonAn}</Text>
              <Text style={{fontSize: 20, color: 'red'}}>
                {' '}
                {this.props.item.Calo}
              </Text>
            </View>
            <View style={styles.rightBottom}>
              <Text>{this.props.item.DonViTinh}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            height: 2,
            backgroundColor: 'black',
          }}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
  },
  avatarLogin: {
    width: 80,
    height: 80,
    marginBottom: 3,
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 3,
    paddingLeft: 5,
  },
  rightTop: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  rightBottom: {flex: 1},
  flatListItem: {
    color: 'black',
    padding: 10,
    fontSize: 16,
  },
});
