import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import {
  View,
  Text,
  StyleSheet,
  processColor,
  TouchableOpacity,
} from 'react-native';
import {BarChart} from 'react-native-charts-wrapper';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import {
  IP_SERVER,
  URLThucDon,
  DATE_FORMAT,
  DATE_FORMAT_COMPARE,
} from '../../asset/MyColor';
export class BaoCaoTuanActivity extends Component {
  temp: 10;
  constructor(props) {
    super(props);
    this.state = {
      dauTuan: '',
      cuoiTuan: '',
      khoangThoiGianHienThi: [],
      khoangThoiGianTimKiem: [],
      ngayChon: this.props.ngayChon,
      email: this.props.email,
      Obj: null,
      duLieu: [],
      data: {
        dataSets: [
          {
            values: [{y: 0}, {y: 0}, {y: 0}, {y: 0}, {y: 0}, {y: 0}, {y: 0}],
            label: '',
            config: {
              color: processColor('teal'),
            },
          },
        ],
        config: {
          barWidth: 0.7,
        },
      },
      xAxis: {
        valueFormatter: [],
      },
    };
  }

  async componentDidMount() {
    await this.tinhNgay(this.state.ngayChon);
    await this.layDuLieu(0);
  }

  async tinhNgay(ngayChon) {
    // Lấy ngày đầu tuần của ngày đã chọn
    let start = moment(ngayChon, DATE_FORMAT)
      .startOf('isoWeek')
      .format(DATE_FORMAT);
    // Lấy ngày cuối tuần của ngày đã chọn
    let end = moment(ngayChon, DATE_FORMAT)
      .endOf('isoWeek')
      .format(DATE_FORMAT);

    let khoangThoiGianHienThi = [];
    let khoangThoiGianTimKiem = [];
    for (
      let index = moment(start, DATE_FORMAT);
      index <= moment(end, DATE_FORMAT);
      index.add(1, 'day')
    ) {
      khoangThoiGianHienThi.push(index.format('DD/MM'));
      khoangThoiGianTimKiem.push(index.format(DATE_FORMAT_COMPARE));
    }

    await this.setStateAsync({
      dauTuan: start,
      cuoiTuan: end,
      khoangThoiGianHienThi: khoangThoiGianHienThi,
      khoangThoiGianTimKiem: khoangThoiGianTimKiem,
    });

    await this.setStateAsync({
      xAxis: {
        valueFormatter: this.state.khoangThoiGianHienThi,
        granularityEnabled: true,
        granularity: 1,
      },
    });
  }

  async layDuLieu(ngay: Number) {
    let date;
    if (
      Number(
        moment(this.state.dauTuan, DATE_FORMAT)
          .add(ngay, 'days')
          .format(DATE_FORMAT_COMPARE),
      ) <= Number(moment().format(DATE_FORMAT_COMPARE))
    ) {
      date = moment(this.state.dauTuan, DATE_FORMAT)
        .add(ngay, 'days')
        .format(DATE_FORMAT_COMPARE);
      await this.tinhNgay(date);
      fetch(IP_SERVER + URLThucDon, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          loai: 3,
          email: this.state.email,
          khoangThoiGian: this.state.khoangThoiGianTimKiem,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          // Láy dữ liệu thành công
          this.setStateAsync({
            Obj: responseJson,
          });
          this.tinhToanTyLeDinhDuong();
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  async tinhToanTyLeDinhDuong() {
    if (this.state.Obj !== undefined) {
      let data = {
        dataSets: [
          {
            values: this.state.Obj.map(w => Number(w.Calo)),
            label: '',
            config: {
              color: processColor('teal'),
            },
          },
        ],
        config: {
          barWidth: 0.7,
        },
      };
      await this.setStateAsync({
        data: data,
      });
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.thoiGian}>
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={{marginLeft: 100}}
              onPress={() => {
                this.layDuLieu(-7);
              }}>
              <IconAntDesign
                style={{color: 'black'}}
                name="caretleft"
                size={20}
                color="white"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>
              <Text style={{fontSize: 18}}>
                {' '}
                {this.state.dauTuan.substring(5)} -{' '}
                {this.state.cuoiTuan.substring(5)}{' '}
              </Text>
            </Text>
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={{marginRight: 50}}
              onPress={() => {
                this.layDuLieu(7);
              }}>
              <IconAntDesign
                style={{color: 'black'}}
                name="caretright"
                size={20}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bieuDo}>
          <BarChart
            style={styles.chart}
            data={this.state.data}
            xAxis={this.state.xAxis}
            animation={{durationX: 2000}}
            gridBackgroundColor={processColor('#000000')}
            visibleRange={{x: {min: 7, max: 7}}}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chart: {
    flex: 1,
  },
  thoiGian: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    // justifyContent: 'center',
  },
  tiLeDinhDuong: {
    flex: 5,
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 3,
    margin: 5,
    padding: 5,
  },
  bieuDo: {
    flex: 9,
  },
  thanhPhanDinhDuong: {
    height: 31,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  thanhPhanDinhDuongHienTai: {
    width: 70,
    height: 31,
    borderRadius: 20,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  chuDinhDuong: {
    color: 'white',
    fontSize: 20,
  },
});
