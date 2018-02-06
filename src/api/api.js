import axios from 'axios'
import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:3000');

const APIURL = "http://localhost:3001/api/"
/******* Login Api Call ******/
export function LoginApi(email,pwd){
  
  return new Promise((resolve, reject) => {
    axios.post(APIURL+'login',{
      "email": email,
      "password": pwd
    })
    .then(function (response) {
      resolve(response.data);
    })
    .catch(function (response) {
      reject(response);
    });
  })
}

/******* Create News Api Call ******/
export function CreateNewsApi(title,content){
  
  return new Promise((resolve, reject) => {
    axios.post(APIURL+'news',{
      "title": title,
      "content": content,
      "token":sessionStorage.getItem("token")
    })
    .then(function (response) {
      resolve(response.data);
    })
    .catch(function (response) {
      reject(response);
    });
  })
}


/******* My News Api Call ******/
export function MyNewsApi(id){
  
  return new Promise((resolve, reject) => {
    axios.post(APIURL+'mynews',{
      "token":sessionStorage.getItem("token")
    })
    .then(function (response) {
      resolve(response.data);
    })
    .catch(function (response) {
      reject(response);
    });
  })
}

/******* All News Api Call ******/
export function AllNewsApi(id){
  
  return new Promise((resolve, reject) => {
    axios.get(APIURL+'news/')
    .then(function (response) {
      resolve(response.data);
    })
    .catch(function (response) {
      reject(response);
    });
  })
}

