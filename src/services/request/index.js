import { axios } from "axios";
class YcRequest {
    constructor(config) {
        this.instance = axios.create(config)
    }
}