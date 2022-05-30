const domain = 'https://bs-pos.herokuapp.com/api/core/v1';
// const domain = ''

exports.url = {
  USER_LOGIN: `${domain}/user/authenticate`,


  //USER 
  USER_UPDATE: `${domain}/user/emp-add-update`,
  USER_LIST: `${domain}/user/emp-list`,

  //ROUTE
  ROUTE_LIST: `${domain}/route-counter/list/`,
  ROUTE_UPDATE: `${domain}/route-counter/add-update`,
}
