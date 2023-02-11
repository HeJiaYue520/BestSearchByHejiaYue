import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import * as types from "@/redux/mutation-types";
import { TextField, Stack, Button, Box, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Search } from "@/api/interface";
import { localSet } from "@/utils/util";
// import { getSearchList } from "@/api/modules/search";
import { connect } from "react-redux";
import { getSearchListActionThunk } from "@/redux/modules/search/action";
import Curve from "./curve";

import "./index.less";

const searchDetails = (props: any) => {
	const { dispatch, searchData } = props;
	const navigate = useNavigate();
	const params = useParams();
	let str = params.id?.replace(/\+/g, " ");
	// 定义初始参数
	let initReqSearchParams: Search.ReqSearch = {
		login_token: "INTERVIEW_SIMPLY2021",
		search_phrase: `${str}`
	};

	const [value, setValue] = useState(initReqSearchParams?.search_phrase);
	const [initParams, setInitParams] = useState(initReqSearchParams);
	useEffect(() => {
		getSearchData(initParams);
	}, []);

	const changeVaule = (e: any) => {
		setValue(e.target.value);
		setInitParams({
			...initParams,
			search_phrase: e.target.value
		});
	};

	// 搜索接口调用
	const getSearchData = async (searchParams: Search.ResSearchData) => {
		// try {
		// 	const { data } = await getSearchList(searchParams);
		// 	if (data?.product_trends?.lenth != 0) {
		// 		dispatch({
		// 			type: types.SET_SEARCH_DATA,
		// 			searchData: data?.product_trends
		// 		});
		// 		// let str = value.replace(/[\s]/g, "+");
		// 		// navigate(`/search/${str}`);
		// 	}
		// } catch (error) {
		// 	console.log(error);
		// }

		// 使用 redux-thunk
		try {
			dispatch(getSearchListActionThunk(searchParams));
		} catch (error) {
			console.log(error);
		}
	};

	// 搜索方法
	const toSearchDetails = () => {
		getSearchData(initParams);
	};

	// 搜索按钮点击事件
	const onSearch = () => {
		value !== "" && toSearchDetails();
	};

	// 获取焦点事件
	const onFocus = (e: any) => {
		localSet("value", e.target.value);
		navigate(`/`);
	};

	return (
		<div className="search-details-body">
			<div className="top-navigation">
				<div className="top-Logo">
					<span>Beat</span>
					<i>Search</i>
				</div>

				<div className="search-box">
					<Stack direction="row" spacing={2}>
						<TextField onFocus={e => onFocus(e)} value={value} sx={{ width: "95%" }} onChange={e => changeVaule(e)} />
						<Button variant="outlined" startIcon={<SearchIcon />} onClick={() => onSearch()}></Button>
					</Stack>
				</div>
			</div>

			<div className="details-box">
				<div className="details-title">Related product trends</div>
				<Box sx={{ flexGrow: 1 }} className="details-item-body">
					<Grid
						container
						direction="row"
						justifyContent="flex-start"
						alignItems="center"
						spacing={{ xs: 0, md: 0 }}
						columns={{ xs: 4, sm: 8, md: 12 }}
					>
						{searchData?.map((item: any, index: number) => {
							return (
								<Grid item xs={4} sm={4} md={3} key={index}>
									<div className="details-items">
										<Curve data={item?.search_msv} titleData={item?.name} className="content-box" />
									</div>
								</Grid>
							);
						})}
					</Grid>
				</Box>
			</div>
		</div>
	);
};
const mapStateToProps = (state: any) => state.search;
export default connect(mapStateToProps)(searchDetails);
