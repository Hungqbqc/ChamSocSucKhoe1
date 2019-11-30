import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {IP_SERVER} from '../../asset/MyColor';
class FlatListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        key={this.props.item.Id}
        style={{
          flex: 1,
          flexDirection: 'column',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          <Image
            source={{uri: this.props.item.anhDanhMuc}}
            style={{width: 100, height: 100, margin: 5}}
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              height: 100,
              justifyContent: 'center',
            }}>
            <Text style={styles.flatListItem}>
              {this.props.item.tenDanhMucMonAn}
            </Text>
          </View>
        </View>
        <View
          style={{
            height: 2,
            backgroundColor: 'black',
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  flatListItem: {
    color: 'black',
    padding: 10,
    fontSize: 16,
  },
});

export default class DanhSachDanhMucMonAnActivity extends Component {
  flatListDanhMucMonAn = [];
  URLLayDanhMucMonAn = IP_SERVER + 'MonAn.php?loai=1';

  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.title}`,
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  });

  componentDidMount() {
    this.layDanhMucMonAn();
  }

  layDanhMucMonAn() {
    return fetch(this.URLLayDanhMucMonAn)
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

  constructor(props) {
    super(props);
    this.state = {
      flatListDanhMucMonAn: [],
      email: this.props.navigation.getParam('email'),
      buaAnId: this.props.navigation.getParam('buaAnId'),
      ngayAn: this.props.navigation.getParam('ngayAn'),
    };
  }

  chonDanhMuc(idDanhMuc) {
    this.props.navigation.navigate('DanhSachMonAnActivity', {
      idDanhMuc: idDanhMuc,
      email: this.state.email,
      buaAnId: this.state.buaAnId,
      ngayAn: this.state.ngayAn,
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
              <TouchableOpacity onPress={() => this.chonDanhMuc(item.id)}>
                <FlatListItem key={item.Id} item={item} />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}
