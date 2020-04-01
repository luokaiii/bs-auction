import FHome from "./pages/frontend/home";
import FList from "./pages/frontend/list";
import FDetails from "./pages/frontend/details";
import FMe from "./pages/frontend/me";
import FLogin from "./pages/frontend/me/login";
import FRegistry from "./pages/frontend/me/registry";
import FReset from "./pages/frontend/me/reset";
import FHelp from "./pages/frontend/help";

import BAuction from "./pages/backend/auction";
import BAuctionDetails from "./pages/backend/auction/details";
import BAuctionEdit from "./pages/backend/auction/edit";
import BOrderList from "./pages/backend/order";
import BUserList from "./pages/backend/user";
import BUserCreate from "./pages/backend/user/create";

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
    path: "/f/me",
    component: FMe
  },
  {
    path: "/f/help/:page",
    component: FHelp
  },
  {
    path: "/f/details/:id",
    component: FDetails
  },
  {
    path: "/f/login",
    component: FLogin
  },
  {
    path: "/f/registry",
    component: FRegistry
  },
  {
    path: "/f/reset",
    component: FReset
  }
];

// 后台页面
export const backRoutes = [
  {
    path: "/b/auction/list/:status",
    component: BAuction
  },
  {
    path: "/b/auction/details/:id",
    component: BAuctionDetails
  },
  {
    path: "/b/auction/edit/:id/:type",
    component: BAuctionEdit
  },
  {
    path: "/b/user/list/:role",
    component: BUserList
  },
  {
    path: "/b/user/create",
    component: BUserCreate
  },
  {
    path: "/b/order/list/:status",
    component: BOrderList
  }
];
