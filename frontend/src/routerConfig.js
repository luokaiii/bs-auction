import FHome from "./pages/frontend/home";
import FList from "./pages/frontend/list";
import FDetails from "./pages/frontend/details";

// 前台页面
export const frontRoutes = [
  {
    path: "/f/home",
    component: FHome
  },
  {
    path: "/f/list",
    component: FList
  },
  {
    path: "/f/details/:id",
    component: FDetails
  }
];

// 后台页面
export const backRoutes = [];
