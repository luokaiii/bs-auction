import FHome from "./pages/frontend/home";
import FList from "./pages/frontend/list";
import FDetails from "./pages/frontend/details";
import FMe from "./pages/frontend/me";
import FLogin from "./pages/frontend/me/login";
import FRegistry from "./pages/frontend/me/registry";
import FReset from "./pages/frontend/me/reset";
import FHelp from "./pages/frontend/help";

import BHome from "./pages/backend/home";
import BAuction from "./pages/backend/auction";
import BAuctionCreate from "./pages/backend/auction/create";
import BOrderList from "./pages/backend/order";
import BAdminList from "./pages/backend/admin";
import BUser from "./pages/backend/user";

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
    path: "/b/home",
    component: BHome
  },
  {
    path: "/b/auction/list/:type",
    component: BAuction
  },
  {
    path: "/b/auction/edit/:id",
    component: BAuctionCreate
  },
  {
    path: "/b/user/list/:role",
    component: BUser
  },
  {
    path: "/b/order/list/:type",
    component: BOrderList
  },
  {
    path: "/b/system/admin",
    component: BAdminList
  }
];
