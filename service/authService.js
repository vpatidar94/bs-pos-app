import axios from 'axios';
import { url } from '../config/url'
import { localDataSet } from '../config/localDataSet';
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
            console.log("userInfoDto", userInfoDto);
            return axios.post(`${url.USER_LOGIN}`, userInfoDto)
                  .then(res => {
                        return res.data;
                  }).catch(err => {
                        console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
                        // return err;
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

      async getToken() {
            // Retrieves the user token from localStorage
            return await localDataSet.getLocal('token')
      }

      async setTokenToRequest() {
            let token = await this.getToken();
        
            if (token) {
                  return axios.defaults.headers['Authorization'] = 'Bearer ' + token;

            } else {
                  return axios.defaults.headers['Authorization'] = null;
            }
      }


}
