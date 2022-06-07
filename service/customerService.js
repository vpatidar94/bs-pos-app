import { url } from '../config/url'
import AuthService from "./authService";

export default class customerService extends AuthService {
    constructor() {
        super();
    }

    async updateCustomerInfo(userCustTypeDto) {

        var requestOptions = {
            method: 'POST',
            headers: await super.setTokenToRequest(),
            body: JSON.stringify(userCustTypeDto),
            redirect: 'follow'
        };

        return fetch(`${url.CUSTOMER_UPDATE}`, requestOptions)
            .then(response => response.json())
            .then(result => { return result })
            .catch(error => { console.log('error', error); return err; });
    }

    async getCustomerList() {

        var requestOptions = {
            method: 'GET',
            headers: await super.setTokenToRequest(),
            redirect: 'follow'
        };

        return fetch(`${url.CUSTOMER_LIST}`, requestOptions)
            .then(response => response.json())
            .then(result => { return result })
            .catch(error => console.log('error', error));
    }


}
