import { url } from '../config/url'
import AsyncStorage from '@react-native-async-storage/async-storage';
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

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify(userInfoDto);

            var requestOptions = {
                  method: 'POST',
                  headers: myHeaders,
                  body: raw,
                  redirect: 'follow'
            };

            return fetch(`${url.USER_LOGIN}`, requestOptions)
                  .then(response => response.json())
                  .then(res => {
                        console.log("resres", res);
                        return res;
                  })
                  .catch(err => {
                        console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
                        return err;
                  });

            // var myHeaders = new Headers();
            // myHeaders.append("Content-Type", "application/json");

            // //  var raw = JSON.stringify({ "email": "vpatidar94@gmail.com", "password": "6260687100" });

            // var requestOptions = {
            //       method: 'POST',
            //       headers: myHeaders,
            //       body: JSON.stringify(userInfoDto),
            //       redirect: 'follow'
            // };

            // return fetch(`${url.USER_LOGIN}}`, requestOptions)
            //       .then(response => response.json())
            //       .then(res => {
            //             console.log("resres", res);
            //             return res;
            //       })
            //       .catch(err => {
            //             console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
            //             return err;
            //       });

            // return fetch.then(response => response.json())
            //       .then(res => {
            //             console.log("resres", res);
            //             return res;
            //       })
            //       .catch(err => {
            //             console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
            //             return err;
            //       });
            // return axios.post(`${url.USER_LOGIN}`, userInfoDto)
            //       .then(res => {
            //             return res.data;
            //       }).catch(err => {
            //             console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
            //             return err;
            //       })
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


      async getToken() {
            // Retrieves the user token from localStorage
            const token = await AsyncStorage.getItem('token');
            // console.log("tokentokentokentoken", token)
            return token != null ? JSON.parse(token) : null;
      }

      async setTokenToRequest() {
            const token = await this.getToken();

            let myHeaders = new Headers();
            myHeaders.append("Authorization", 'Bearer ' + token);
            myHeaders.append("Content-Type", "application/json");

            return myHeaders;
            // if (token) {
            //       return axios.defaults.headers['Authorization'] = 'Bearer ' + token;

            // } else {
            //       return axios.defaults.headers['Authorization'] = null;
            // }
      }

      async getProfile() {

            const token = await this.getToken();
            const res = decode(token);
            return res
      }

      async getRole() {

            const role = await this.getProfile();
            return role.crols[0];
      }


}
