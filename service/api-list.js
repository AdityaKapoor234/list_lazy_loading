import axios from "axios";
import { API_LIST_URL } from "../utils/constant";

export class ApiList {
    static getApiList(id, page, limit) {
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        return axios.get(`${API_LIST_URL}`
            .replace("{{id}}", id)
            .replace("{{page}}", page)
            .replace("{{limit}}", limit),
            httpOptions)
    }
}
export default ApiList;