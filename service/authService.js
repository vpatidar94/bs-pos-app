import axios from 'axios';
import { url } from '../config/url'
import decode from 'jwt-decode';


export default class AuthService {
   constructor() {
   }

//    registerInfo(userInfoVo) {
//       return axios.post(`${url.ADD_USERS}`, userInfoVo)  
//          .then(res => {
//             return res.data;
//          }).catch(err => {
//             console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
//          })
//    }

   loginInfo(userInfoDto) {
         console.log("userInfoDto",userInfoDto);
      return axios.post(`${url.USER_LOGIN}`, userInfoDto)
         .then(res => {
            return res.data;
         }).catch(err => {
            console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
         })
   }
//    logoutInfo(userInfoVo) {
//       return axios.post(`${url.USER_LOGOUT}`, userInfoVo)
//          .then(res => {
//             return res;
//          }).catch(err => {
//             console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
//          })
//    }
//    sendLinkByEmail(email) {

//       return axios.get(`${url.SEND_RESET_LINK + email}`)
//          .then(res => {
//             return res.data;
//          }).catch(err => {
//             console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
//          })

//    }

//    changePasswordByEmailLink(userInfoVo){
//       return axios.post(`${url.CHANGE_PASSWORD}`,userInfoVo)
//       .then(res => {
//        return res.data;
//       }).catch(err =>{
//        console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err); 
//       })
//    }


//    userSendLinkByEmail(email) {

//       return axios.get(`${url.USER_SEND_RESET_LINK + email}`)
//          .then(res => {
//             return res.data;
//          }).catch(err => {
//             console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
//          })

//    }

//    userChangePasswordByEmailLink(userInfoVo){
//       return axios.post(`${url.USER_CHANGE_PASSWORD}`,userInfoVo)
//       .then(res => {
//        return res.data;
//       }).catch(err =>{
//        console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err); 
//       })
//    }


//    getProfile() {
//       const res = decode(localStorage.getItem('token'));

//       return res
//    }

   getToken() {
      // Retrieves the user token from localStorage
      let token = '';
      if (localStorage.getItem('token')) {
         token = JSON.parse(localStorage.getItem('token'));
      }
      return token
   }

   setTokenToRequest() {
      if (this.getToken()) {
         return axios.defaults.headers['Authorization'] = 'Bearer ' + this.getToken();

      } else {
         return axios.defaults.headers['Authorization'] = null;
      }
   }


}
