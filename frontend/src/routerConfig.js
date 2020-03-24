import FHome from "./pages/frontend/home";
import FList from "./pages/frontend/list";
import FDetails from "./pages/frontend/details";

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
    path: "/f/details/:id",
    component: FDetails
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
