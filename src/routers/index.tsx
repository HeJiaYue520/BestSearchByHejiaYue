import { Navigate, useRoutes } from "react-router-dom";
import { RouteObject } from "@/routers/interface";
import Login from "@/views/login/index";
import BestSearch from "@/views/bestSearch/index";
import SearchDetails from "@/views/bestSearch/Components/searchDetails";

// * 导入所有router
const metaRouters = import.meta.globEager("./modules/*.tsx");

// * 处理路由
export const routerArray: RouteObject[] = [];
Object.keys(metaRouters).forEach(item => {
	Object.keys(metaRouters[item]).forEach((key: any) => {
		routerArray.push(...metaRouters[item][key]);
	});
});

export const rootRouter: RouteObject[] = [
	{
		path: "/",
		// element: <Navigate to="/login" />
		element: <BestSearch />
	},
	{
		path: "/login",
		element: <Login />,
		meta: {
			requiresAuth: false,
			title: "登录页",
			key: "login"
		}
	},
	{
		path: "/search/:id",
		element: <SearchDetails />,
		meta: {
			requiresAuth: false,
			title: "搜索详情页",
			key: "search"
		}
	},

	// ...routerArray,
	{
		path: "*",
		// element: <Navigate to="/404" />
		element: <Navigate to="/" />
	}
];

const Router = () => {
	const routes = useRoutes(rootRouter);
	return routes;
};

export default Router;
