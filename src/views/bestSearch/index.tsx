import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Stack, Button, Snackbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { localGet, localRemove } from "@/utils/util";

import "./index.less";

const bestSearch = () => {
	const navigate = useNavigate();
	const InitValue = localGet("value");
	const [value, setValue] = useState("");
	const [open, setOpen] = useState(false);
	useEffect(() => {
		window.addEventListener("keydown", onKeyDown); // 添加全局事件
		return () => {
			window.removeEventListener("keydown", onKeyDown); // 销毁
		};
	}, [value]);

	useEffect(() => {
		if (InitValue && InitValue !== "") {
			setValue(InitValue);
			localRemove("value");
		}
	}, [InitValue]);

	const changeVaule = (e: any) => {
		setValue(e.target.value);
	};

	// 跳转搜索详情页方法
	const toSearchDetails = () => {
		let str = value.replace(/[\s]/g, "+");
		navigate(`/search/${str}`);
	};

	// 键盘事件
	const onKeyDown = (e: any) => {
		e.keyCode === 13 && (value !== "" ? toSearchDetails() : setOpen(true));
	};

	// 搜索按钮点击事件
	const onSearch = () => {
		value !== "" ? toSearchDetails() : setOpen(true);
	};

	return (
		<div className="best-search-body">
			<div className="top-navigation">
				<div className="top-Logo">
					<span>Beat</span>
					<i>Search</i>
				</div>
			</div>

			<p>Search Trends</p>

			<div className="search-box">
				<Stack direction="row" spacing={2}>
					<TextField autoFocus={true} value={value} sx={{ width: "95%" }} onChange={e => changeVaule(e)} />
					<Button variant="outlined" startIcon={<SearchIcon />} onClick={() => onSearch()}></Button>
				</Stack>
			</div>

			<Snackbar
				open={open}
				onClose={() => {
					setOpen(false);
				}}
				// TransitionComponent={state.Transition}
				message="搜索条件不能为空"
				// key={state.Transition.name}
			/>
		</div>
	);
};

export default bestSearch;
