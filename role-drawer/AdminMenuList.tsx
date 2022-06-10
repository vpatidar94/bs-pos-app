export const AdminMenuList = {
    getAdminMenuList,
}

function getAdminMenuList () {
    const AdminMenuList = [{
        id: 1, sectionTitle: 'Dashboard','icon':'th'
    }, {
        id: 2, sectionTitle: 'User','icon':'users'
    }, {
        id: 3, sectionTitle: 'Router/Counter','icon':'walking'
    }, {
        id: 4, sectionTitle: 'Customer','icon':'users'
    }, 
    // {
    //     id: 5, sectionTitle: 'Customer2'
    // }, {
    //     id: 6, sectionTitle: 'Customer2'
    // }, {
    //     id: 7, sectionTitle: 'Customer2'
    // }, {
    //     id: 8, sectionTitle: 'Customer2'
    // }, {
    //     id: 9, sectionTitle: 'Customer2'
    // }, {
    //     id: 10, sectionTitle: 'Customer2'
    // }, {
    //     id: 11, sectionTitle: 'Customer2'
    // }, {
    //     id: 12, sectionTitle: 'Customer2'
    // }, {
    //     id: 13, sectionTitle: 'Customer2'
    // }, {
    //     id: 14, sectionTitle: 'Customer2'
    // }
]
    return AdminMenuList
  }
