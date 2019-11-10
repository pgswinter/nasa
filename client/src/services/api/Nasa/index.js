import {
    commonApi
} from '../../constant';

export default class {
    constructor(initApi) {
        this.initApi = initApi;
    }
    getJson = (path) => this.initApi.get(path);
    search = (params) => {
        return this.initApi.get(`${commonApi.search}${params.q}${params.media_type !== '' ? `&media_type=${params.media_type}` : ''}&page=${params.page}`);
    }
}