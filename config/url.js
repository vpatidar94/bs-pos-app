const domain = 'https://bs-pos.herokuapp.com/api/core/v1';
// const domain = ''

exports.url = {
  USER_LOGIN: `${domain}/user/authenticate`,


  //USER 
  USER_UPDATE: `${domain}/user/emp-add-update`,
  USER_LIST: `${domain}/user/emp-list`,

  //CUSTOMER
  CUSTOMER_UPDATE: `${domain}/user/cust-add-update`,
  CUSTOMER_LIST: `${domain}/user/cust-list`,

  //ROUTE
  ROUTE_LIST: `${domain}/route-counter/list/`,
  ROUTE_UPDATE: `${domain}/route-counter/add-update`,
}
