import * as React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
// import FoodCategory from './src/components/diary/FoodCategory';
import DangNhapActivity from './src/activity/dang-nhap/DangNhapActivity';
import BaoCaoActivity from './src/activity/bao-cao/BaoCaoActivity';
import DangKyActivity from './src/activity/dang-nhap/DangKyActivity';
import NhapSoThanhVienActivity from './src/activity/nhap-so-thanh-vien/NhapSoThanhVienActivity';
import ManHinhChinhActivity from './src/activity/man-hinh-chinh/ManHinhChinhActivity';
import DanhSachDanhMucMonAnActivity from './src/activity/quan-ly-thuc-don/DanhSachDanhMucMonAnActivity';
import DanhSachMonAnActivity from './src/activity/quan-ly-thuc-don/DanhSachMonAnActivity';
import ChiTietMonAnActivity from './src/activity/quan-ly-thuc-don/ChiTietMonAnActivity';
const RootStack = createStackNavigator(
  {
    DangNhapActivity: DangNhapActivity,
    DangKyActivity: DangKyActivity,
    NhapSoThanhVienActivity: NhapSoThanhVienActivity,
    ManHinhChinhActivity: ManHinhChinhActivity,
    DanhSachDanhMucMonAnActivity: DanhSachDanhMucMonAnActivity,
    BaoCaoActivity: BaoCaoActivity,
    DanhSachMonAnActivity: DanhSachMonAnActivity,
    ChiTietMonAnActivity: ChiTietMonAnActivity,
  },
  {
    initialRouteName: 'DangNhapActivity',
  },
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
