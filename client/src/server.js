import axios from "axios"

class server {
    constructor() {
        this.baseurl = process.env.REACT_APP_BACKEND_SERVER;
    }

    get(uri, cb) {
        axios.get(this.baseurl + uri, {
            withCredentials: true
        })
        .then(res => {cb(null, res)})
        .catch(err => {cb(err, null)})
    }

    post(uri, body, cb) {
        return axios({
            method: "POST",
            url: this.baseurl + uri,
            data: body,
            withCredentials: true
        })
        .then(res => cb(null, res))
        .catch(err => {cb(err, null)})
    }

    // handleError(err, cb) {
    //     if (err.response && err.response.status === 401) {
    //         history.push("/login")
    //     };
    //
    //     console.log(err)
    //
    //     // return cb(err, null)
    //
    // }


}

const instance = new server();
Object.freeze(instance);

export default instance
