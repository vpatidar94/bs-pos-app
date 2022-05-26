import decode from 'jwt-decode'
import AsyncStorage from '@react-native-async-storage/async-storage';
export const localDataSet = {
  setLocal,
  getLocal,
  removeLocal,
  getLanguage,
  setLanguage,
  getTokenValue
}

function setLocal (name, data) {
  AsyncStorage.setItem(name, JSON.stringify(data))
}

function setLanguage () {
  AsyncStorage.setItem('language', JSON.stringify('en-us'))
}

function getLanguage () {
  return JSON.parse(AsyncStorage.getItem('language'))
}

async function getLocal (name) {
 // const token = JSON.parse(AsyncStorage.getItem(name))
  const token = await AsyncStorage.getItem(name);
  return token != null ? JSON.parse(token) : null;
 // return !!token && !isTokenExpired(token)
}

function getTokenValue(token){
  return decode(token);
}

function isTokenExpired (token) {
  try {
    const decoded = decode(token)
    if (decoded.exp < Date.now() / 1000) {
      // Checking if token is expired. N
      return true
    } else return false
  } catch (err) {
    return false
  }
}

function removeLocal (name) {
  AsyncStorage.removeItem(name)
}

