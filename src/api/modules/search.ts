import { Search } from "@/api/interface/index";
import { PORT3 } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 搜索模块
 */

// * 获取搜索列表
export const getSearchList = (params: Search.ResSearchData) => {
	return http.post(PORT3 + `/keyword_search`, params);
};
