import * as types from "@/redux/mutation-types";
// import { getSearchList } from "@/api/modules/search";
// import { Dispatch } from "react";

// * setSearchList
export const setSearchList = (searchList: any[]) => ({
	type: types.SET_SEARCH_DATA,
	searchList
});

// ? 下面方法仅为测试使用，不参与任何功能开发
// interface MenuProps {
// 	type: string;
// 	menuList: Menu.MenuOptions[];
// }
// * redux-thunk
// export const getMenuListActionThunk = () => {
// 	return async (dispatch: Dispatch<MenuProps>) => {
// 		const res = await getSearchList();
// 		dispatch({
// 			type: types.SET_MENU_LIST,
// 			menuList: (res.data as Menu.MenuOptions[]) ?? []
// 		});
// 	};
// };

// // * redux-promise《async/await》
// export const getMenuListAction = async (): Promise<MenuProps> => {
// 	const res = await getSearchList();
// 	return {
// 		type: types.SET_MENU_LIST,
// 		menuList: res.data ? res.data : []
// 	};
// };

// // * redux-promise《.then/.catch》
// export const getMenuListActionPromise = (): Promise<MenuProps> => {
// 	return getSearchList().then(res => {
// 		return {
// 			type: types.SET_MENU_LIST,
// 			menuList: res.data ? res.data : []
// 		};
// 	});
// };
