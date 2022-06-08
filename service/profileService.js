import { url } from '../config/url'
import AuthService from "./authService";

export default class profileService extends AuthService {
  constructor() {
    super();
  }

  async updatePassword(userPasswordDto) {
    console.log("updateUserInfoupdateUserInfo", userPasswordDto);

    var requestOptions = {
      method: 'POST',
      headers: await super.setTokenToRequest(),
      body: JSON.stringify(userPasswordDto),
      redirect: 'follow'
    };

    return fetch(`${url.USER_UPDATE_PASSWORD}`, requestOptions)
      .then(response => response.json())
      .then(result => { return result })
      .catch(error => { console.log('error', error); return err; });
  }
}
