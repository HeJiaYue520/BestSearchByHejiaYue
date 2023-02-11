import * as types from "@/redux/mutation-types";
import { Search } from "@/api/interface";
import { getSearchList } from "@/api/modules/search";
// import { Dispatch } from "react";

// * setSearchList
// export const setSearchList = (searchList: any[]) => ({
// 	type: types.SET_SEARCH_DATA,
// 	searchList
// });

// ? 下面方法仅为测试使用，不参与任何功能开发
// * redux-thunk
export const getSearchListActionThunk = (params: Search.ResSearchData) => {
	return async dispatch => {
		try {
			const res = await getSearchList(params);
			dispatch({
				type: types.SET_MENU_LIST,
				searchList: res.data ?? []
			});
		} catch (error) {
			console.log(error);
		}
	};
};
