import { url } from '../config/url'
import AuthService from "./authService";

export default class userService extends AuthService {
  constructor() {
    super();
  }


  // addUser(staffVo) {
  //   return axios.post(`${url.ADD_STAFF}`, staffVo, super.setTokenToRequest())
  //     .then(res => {
  //       return res.data;
  //     }).catch(err => {
  //       console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
  //     })
  // }

  // getStaffList(ownerId) {
  //   return axios.get(`${url.LIST_STAFF + ownerId}`, super.setTokenToRequest())
  //     .then(res => {
  //       return res.data;
  //     }).catch(err => {
  //       console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
  //     })
  // }

  async updateUserInfo(userEmpDepartmentDto) {
    console.log("updateUserInfoupdateUserInfo", userEmpDepartmentDto);

    var requestOptions = {
      method: 'POST',
      headers: await super.setTokenToRequest(),
      body: JSON.stringify(userEmpDepartmentDto),
      redirect: 'follow'
    };

    return fetch(`${url.USER_UPDATE}`, requestOptions)
      .then(response => response.json())
      .then(result => { return result })
      .catch(error => { console.log('error', error); return err; });
  }

  async getUserList() {

    var requestOptions = {
      method: 'GET',
      headers: await super.setTokenToRequest(),
      redirect: 'follow'
    };

    return fetch(`${url.USER_LIST}`, requestOptions)
      .then(response => response.json())
      .then(result => { return result })
      .catch(error => console.log('error', error));
  }
  // updateStaffWeeklyScheduleInfo(staffVo) {
  //   return axios.post(`${url.STAFF_WEEKLY_UPDATE + staffVo.id}`, staffVo, super.setTokenToRequest())
  //     .then(res => {
  //       return res.data;
  //     }).catch(err => {
  //       console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
  //     })
  // }
  // deleteStaff(staffVo) {
  //   return axios.post(`${url.STAFF_DELETE + staffVo.id}`, staffVo, super.setTokenToRequest())
  //     .then(res => {
  //       return res.data;
  //     }).catch(err => {
  //       console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
  //     })
  // }

  // staffSetPassword(staffVo) {
  //   return axios.post(`${url.STAFF_SET_PASSWORD}`, staffVo)
  //     .then(res => {
  //       return res.data;
  //     }).catch(err => {
  //       console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
  //     })
  // }

  // getLoginStaffDetails(id) {
  //   return axios.get(url.GET_STAFF_LOGIN_DETAILS + id, super.setTokenToRequest())
  //     .then(res => {
  //       return (res.data);
  //     }).catch(err => {
  //       console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
  //     });

  // }

  // getStaffDetails(id) {
  //   return axios.get(url.GET_STAFF_INFO_BY_ID + id, super.setTokenToRequest())
  //     .then(res => {
  //       return (res.data);
  //     }).catch(err => {
  //       console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
  //     });

  // }

  // updateLoginStaffInfo(dataVo) {
  //   return axios.post(`${url.UPDATE_STAFF_LOGIN}`, dataVo, super.setTokenToRequest())
  //     .then(res => {
  //       return res.data;
  //     }).catch(err => {
  //       console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
  //     })
  // }


  // getOneDayAppointment(appointmentVo) {
  //   return axios.post(`${url.STAFF_ONEDAY_APPOINTMENT}`, appointmentVo, super.setTokenToRequest())
  //     .then(res => {
  //       return res.data;
  //     }).catch(err => {
  //       console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
  //     })
  // }

  // staffProfileUpload(staffVo){
  //   return axios.post(`${url.STAFF_IMAGE_UPLOAD}`, staffVo, super.setTokenToRequest())
  //     .then(res => {
  //       return res.data;
  //     }).catch(err => {
  //       console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
  //     })
  // }
  // getStaffListSA() {
  //   return axios.get(`${url.LIST_STAFF_SA}`, super.setTokenToRequest())
  //     .then(res => {
  //       return res.data;
  //     }).catch(err => {
  //       console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
  //     })
  // }


}
