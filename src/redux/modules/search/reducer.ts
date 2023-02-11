import { AnyAction } from "redux";
import { SearchState } from "@/redux/interface";
import produce from "immer";
import * as types from "@/redux/mutation-types";

const searchState: SearchState = {
	searchData: []
};

// search reducer
const search = (state: SearchState = searchState, action: AnyAction) =>
	produce(state, draftState => {
		switch (action.type) {
			case types.SET_SEARCH_DATA:
				draftState.searchData = action.searchData;
				break;
			default:
				return draftState;
		}
	});

export default search;
