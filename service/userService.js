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

    var myHeaders = new Headers();
    myHeaders.append("Authorization", await super.setTokenToRequest());
    myHeaders.append("Content-Type", "application/json");


    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(userEmpDepartmentDto),
      redirect: 'follow'
    };

    return fetch(`${url.USER_UPDATE}`, requestOptions)
      .then(response => response.json())
      .then(result => { return result })
      .catch(error => {console.log('error', error); return err;});

    // var raw = JSON.stringify({"emp":{"email":"v123489@gmail.com","nameF":"Vinay","nameL":"Patidar","cell":"6260687100","emp":[{"role":"POS_EMP","orgId":"BS","brId":"BS","active":true}]},"dept":{"type":"COUNTER","name":"Counter A"}});
    // var requestOptions = {
    //   method: 'POST',
    //   headers: await super.setTokenToRequest(),
    //   body: JSON.stringify(updateUserInfoupdateUserInfo),
    //   redirect: 'follow'
    // };

    // // console.log("requestOptions",requestOptions)
    // return fetch(`${url.USER_UPDATE}`, requestOptions)
    //   .then(response => response.json())
    //   .then(res => {
    //     return res;
    //   })
    //   .catch(err => {
    //     console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
    //     return err;
    //   });
    // return axios.post(`${url.USER_UPDATE}`, userVo, await super.setTokenToRequest())
    //   .then(res => {
    //     console.log('res.data',res.data);
    //     return res.data;
    //   }).catch(err => {
    //     console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
    //   })
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
