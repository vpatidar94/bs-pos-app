import { url } from '../config/url'
import AuthService from "./authService";

export default class routeService extends AuthService {
  constructor() {
    super();
  }

  async getRouteList(routType) {

    var requestOptions = {
      method: 'GET',
      headers: await super.setTokenToRequest(),
      redirect: 'follow'
    };

    return fetch(`${url.ROUTE_LIST + "?type=" + routType}`, requestOptions)
      .then(response => response.json())
      .then(result => {return result} )
      .catch(error => console.log('error', error));

  }
}
