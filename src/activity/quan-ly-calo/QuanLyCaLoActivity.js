import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ProfileActivity,
} from 'react-native';
import {TabView, SceneMap, TabViewAnimated} from 'react-native-tab-view';
import {CaloComponent} from '../../components/quan-ly-calo/CaloComponent';
import {IP_SERVER, URLThongTinThanhVien} from '../../asset/MyColor';
export class QuanLyCaLoActivity extends React.Component {
  URLLayThongTinThanhVien = IP_SERVER + URLThongTinThanhVien;

  static navigationOptions = {
    header: null,
  };
  routes = [];
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [],
      demo: 1,
    };
  }

  renderScene = ({route}) => {
    return <CaloComponent key={route.key} data={route} />;
  };

  async componentDidMount() {
    await this.LayDuLieu();
  }
  URLLayThongTinThanhVien;
  async LayDuLieu() {
    return fetch(this.URLLayThongTinThanhVien, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        loai: '2',
        email: this.props.email,
        soNguoi: this.state.soThanhVien,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        for (let index = 0; index < responseJson.length; index++) {
          const element = responseJson[index];
          let title = '';
          if (element.chucDanh === 'Tôi') {
            title = 'Tôi';
          } else {
            title = 'Member ' + (index + 1).toString();
          }
          this.routes.push({
            key: element.id,
            title: title,
            info: element,
          });
        }
        this.setStateAsync({
          routes: this.routes,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  _handleIndexChange = index => this.setState({index});
  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this.renderScene}
        onIndexChange={this._handleIndexChange}
        initialLayout={{width: Dimensions.get('window').width}}
        style={styles.container}
      />
    );
  }

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }
}

const styles = StyleSheet.create({});
