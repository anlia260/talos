import axios from "axios";

const mateToken = document.getElementsByTagName("meta")["csrf-token"]
    ? document.getElementsByTagName("meta")["csrf-token"].content
    : "";
const httpConf = {
    headers: {
        "XSRF-TOKEN": mateToken ? mateToken : ""
    }
};

const instance = axios.create(httpConf);

const post = (url, params, succese) => {
    return new Promise(function(resolve, reject) {
        instance
            .post(url, params)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};
//
const get = (url, params, succese) => {
    return new Promise(function(resolve, reject) {
        instance
            .get(url, params)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

let Ajax = {
    post: post,
    get: get
};

export default Ajax;
