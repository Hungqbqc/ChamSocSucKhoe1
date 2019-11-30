import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import {
  COLOR_DEEPSKY_BLUE,
  IP_SERVER,
  URLThucDon,
  DATE_FORMAT,
  DATE_FORMAT_COMPARE,
} from '../../asset/MyColor';
import {DanhSachBuaAnComponent} from '../../components/quan-ly-thuc-don/DanhSachBuaAnComponent';
import {ScrollView} from 'react-native';
import * as Progress from 'react-native-progress';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

export class QuanLyThucDonActivity extends Component {
  menuList = [{id: '1'}, {id: '2'}, {id: '3'}, {id: '4'}];

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      navigation: this.props.navigation,
      progress: 0.1,
      ngayChon: moment().format('DD/MM/YYYY'),
      btnSelected: moment().format('DD'),
      dayOfWeek: this.taoLich(moment().format('DD/MM/YYYY')),
      Obj: {
        Email: '',
        NgayTao: '',
        TongNangLuong: '0',
        DanhSachMon: [
          {LoaiBua: '1', Mon: []},
          {LoaiBua: '2', Mon: []},
          {LoaiBua: '3', Mon: []},
          {LoaiBua: '4', Mon: []},
        ],
      },
      totalCalo: 0,
    };
  }

  // async componentWillMount() {
  // await this.layDuLieu(moment().format('DD/MM/YYYY'));
  // }
  dem = 0;

  async componentDidMount() {
    await this.layDuLieu(moment().format('DD/MM/YYYY'));
    this.focusListener = this.state.navigation.addListener('didFocus', () => {
      this.dem += 1;
      this.layDuLieu(this.state.ngayChon);
    });
  }

  async onPress(item) {
    // Gán ngày đã chọn trong tuần
    await this.setStateAsync({
      btnSelected: moment(item, 'DD/MM/YYYY').format('DD'),
      ngayChon: item,
    });
    await this.layDuLieu(item);
  }
  async layDuLieu(ngayChon) {
    fetch(IP_SERVER + URLThucDon, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        loai: 2,
        email: this.state.email,
        ngayAn: moment(ngayChon, 'DD/MM/YYYY').format(DATE_FORMAT_COMPARE),
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        // Láy dữ liệu thành công
        if (responseJson !== 0) {
          this.setState({
            Obj: responseJson,
          });
          this.tinhCaloCacDaChon();
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  // Tính toán lượng calo mà người dùng đã chọn
  async tinhCaloCacDaChon() {
    let totalCalo = 0;
    if (this.state.Obj !== null) {
      this.state.Obj.DanhSachMon.forEach((element: any) => {
        element.Mon.map(w => {
          totalCalo += w.SoLuong * w.Calo;
        });
      });
      await this.setStateAsync({
        totalCalo: totalCalo,
        progress:
          this.state.Obj.TongNangLuong !== null
            ? totalCalo / this.state.Obj.TongNangLuong > 1
              ? 1
              : totalCalo / this.state.Obj.TongNangLuong
            : 0,
      });
    }
  }

  // Chọn ngày ở lịch
  async chonNgay(date) {
    await this.setStateAsync({
      ngayChon: moment(date, 'DD/MM/YYYY').format('DD/MM/YYYY'), // lưu lại ngày đã chọn
      btnSelected: moment(date, 'DD/MM/YYYY').format('DD'), // lưu lại ngày chọn để sáng nút
      dayOfWeek: this.taoLich(date), // tạo mảng các nút ngày trong tuần
    });
    await this.layDuLieu(date);
  }

  // Tạo ra các button ngày trong tuần
  taoLich(date) {
    // Lấy ngày đầu tuần của ngày đã chọn
    let start = moment(date, 'DD/MM/YYYY').startOf('isoWeek');
    // Lấy ngày cuối tuần của ngày đã chọn
    let end = moment(date, 'DD/MM/YYYY').endOf('isoWeek');
    // Tạo mảng các ngày trong tuần đã chọn
    let dayOfWeek = [];
    for (let index = start; index <= end; index.add(1, 'day')) {
      dayOfWeek.push(index.format('DD/MM/YYYY'));
    }
    return dayOfWeek;
  }

  tinhSoTuan(): Number {
    return (
      moment(this.state.ngayChon, 'DD/MM/YYYY').weeks() -
      moment(this.state.Obj.NgayTao, 'DD/MM/YYYY').weeks() +
      1
    );
  }

  render() {
    const items = this.state.dayOfWeek.map(item => {
      return (
        <TouchableOpacity
          key={item}
          style={[
            this.state.btnSelected === moment(item, 'DD/MM/YYYY').format('DD')
              ? styles.btnSelected
              : styles.btnNotSelected,
            {
              alignItems: 'center',
              width: 30,
              height: 30,
              borderRadius: 100,
              borderWidth: 2,
            },
          ]}
          onPress={() => this.onPress(item)}>
          <Text
            style={[
              this.state.btnSelected === moment(item, 'DD/MM/YYYY').format('DD')
                ? styles.btnSelected
                : styles.btnNotSelected,
              {marginTop: 3},
              {backgroundColor: 'transparent'},
            ]}>
            {moment(item, 'DD/MM/YYYY').format('DD')}
          </Text>
        </TouchableOpacity>
      );
    });

    return (
      <View style={styles.container}>
        <View style={styles.calendar}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 7}}>
              <Progress.Bar
                progress={this.state.progress}
                width={300}
                height={25}
              />
            </View>
            <View style={{flex: 1}}>
              <DatePicker
                minDate={this.state.Obj.NgayTao}
                mode="date"
                format="DD/MM/YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                style={{width: 25, height: 25}}
                customStyles={{
                  dateIcon: {
                    width: 25,
                    height: 30,
                    marginTop: -15,
                    marginLeft: 15,
                  },
                  dateInput: {
                    marginTop: -20,
                    height: 0,
                    width: 0,
                  },
                }}
                onDateChange={date => {
                  this.chonNgay(date);
                }}
              />
            </View>
          </View>
          <View style={{flex: 1, alignItems: 'center', marginTop: 5}}>
            <Text>
              Tuần {this.tinhSoTuan()}-{' '}
              {moment(this.state.ngayChon, 'DD/MM/YYYY').format('DD/MM/YYYY')}{' '}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginBottom: 10,
            }}>
            {items}
          </View>
        </View>
        <View style={styles.calo}>
          <View style={styles.caloTop}>
            <Text style={styles.caloTopText}>
              {this.state.Obj === null || this.state.Obj.TongNangLuong === null
                ? 0
                : this.state.Obj.TongNangLuong}
            </Text>
            <Text style={styles.caloTopText}> - </Text>
            <Text style={styles.caloTopText}>
              {this.state.Obj === null ? 0 : this.state.totalCalo}
            </Text>
            <Text style={styles.caloTopText}> = </Text>
            <Text style={styles.caloTopText}>
              {this.state.Obj === null
                ? 0
                : this.state.Obj.TongNangLuong - this.state.totalCalo}
            </Text>
          </View>
          <View style={styles.caloMid}>
            <Text>Mục tiêu</Text>
            <Text> </Text>
            <Text>Thức ăn</Text>
            <Text> </Text>
            <Text>Còn lại</Text>
          </View>
          <View style={styles.caloBottom}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('BaoCaoActivity', {
                  ngayChon: moment(this.state.ngayChon, 'DD/MM/YYYY').format(
                    DATE_FORMAT,
                  ),
                  email: this.state.email,
                });
              }}
              style={styles.loginButton}>
              <Text style={styles.lableTitle}>CHI TIẾT</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.menuFood}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.menuList.map(item => item)}
            renderItem={({item, index}) => {
              return (
                <DanhSachBuaAnComponent
                  key={item.id}
                  buaAnId={item.id}
                  ngayAn={this.state.ngayChon}
                  email={this.state.email}
                  navigation={this.state.navigation}
                  caloTarget={this.state.Obj.TongNangLuong}
                  listFood={this.state.Obj.DanhSachMon.find(
                    (w: any) => w.LoaiBua === item.id,
                  )}
                  parentFlatList={this}
                />
              );
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
    padding: 5,
  },
  calendar: {flex: 2, borderBottomWidth: 2, marginBottom: 5},
  calo: {
    flex: 3,
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 3,
  },
  caloTop: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
  },
  caloTopText: {
    marginTop: 10,
    fontSize: 25,
  },
  caloMid: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  caloBottom: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -5,
  },
  menuFood: {flex: 10},
  lableTitle: {
    color: COLOR_DEEPSKY_BLUE,
    fontSize: 30,
  },
  borderAll: {
    borderWidth: 2,
    borderColor: 'black',
  },
  btnSelected: {
    backgroundColor: 'blue',
    color: 'white',
  },
  btnNotSelected: {},
});
