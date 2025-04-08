import type { RouteRecordRaw } from "vue-router"
import { routerConfig } from "@/router/config"
import { registerNavigationGuard } from "@/router/guard"
import { createRouter } from "vue-router"
import { flatMultiLevelRoutes } from "./helper"

const Layouts = () => import("@/layouts/index.vue")

/**
 * @name 常驻路由
 * @description 除了 redirect/403/404/login 等隐藏页面，其他页面建议设置唯一的 Name 属性
 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layouts,
    meta: {
      hidden: true
    },
    children: [
      {
        path: ":path(.*)",
        component: () => import("@/pages/redirect/index.vue")
      }
    ]
  },
  {
    path: "/403",
    component: () => import("@/pages/error/403.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/404",
    component: () => import("@/pages/error/404.vue"),
    meta: {
      hidden: true
    },
    alias: "/:pathMatch(.*)*"
  },
  {
    path: "/login",
    component: () => import("@/pages/login/index.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/",
    component: Layouts,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/pages/dashboard/index.vue"),
        name: "Dashboard",
        meta: {
          title: "首页",
          svgIcon: "dashboard",
          affix: true
        }
      }
    ]
  },
  {
    path: "/order",
    component: Layouts,
    redirect: "/order",
    name: "Order",
    meta: {
      title: "订单",
      svgIcon: "order"
    },
    children: [
      {
        path: "order-list",
        component: () => import("@/pages/order/index.vue"),
        name: "OrderList",
        meta: {
          title: "订单",
          svgIcon: "order"
        }
      }
    ]
  },
  {
    path: "/supplier",
    component: Layouts,
    redirect: "/supplier",
    name: "Supplier",
    meta: {
      title: "供应商",
      svgIcon: "supplier"
    },
    children: [
      {
        path: "supplier-list",
        component: () => import("@/pages/supplier/index.vue"),
        name: "SupplierList",
        meta: {
          title: "供应商",
          svgIcon: "supplier"
        }
      }
    ]
  },
  {
    path: "/customer",
    component: Layouts,
    redirect: "/customer",
    name: "Customer",
    meta: {
      title: "客户",
      svgIcon: "supplier"
    },
    children: [
      {
        path: "customer-list",
        component: () => import("@/pages/customer/index.vue"),
        name: "CustomerList",
        meta: {
          title: "客户",
          svgIcon: "supplier"
        }
      }
    ]
  },
  {
    path: "/item",
    component: Layouts,
    redirect: "/item",
    name: "Item",
    meta: {
      title: "物品",
      svgIcon: "item"
    },
    children: [
      {
        path: "item-list",
        component: () => import("@/pages/item/index.vue"),
        name: "ItemList",
        meta: {
          title: "物品",
          svgIcon: "item"
        }
      }
    ]
  },
  {
    path: "/technical-change",
    component: Layouts,
    redirect: "/technical-change",
    name: "TechnicalChange",
    meta: {
      title: "技术变更",
      svgIcon: "technical_change"
    },
    children: [
      {
        path: "item-list",
        component: () => import("@/pages/technical_change/index.vue"),
        name: "TechnicalList",
        meta: {
          title: "技术变更",
          svgIcon: "technical_change"
        }
      }
    ]
  },
  {
    path: "/inspection-code",
    component: Layouts,
    redirect: "/inspection-code",
    name: "Purchase",
    meta: {
      title: "检验代码",
      svgIcon: "inspection_code"
    },
    children: [
      {
        path: "inspection-code-list",
        component: () => import("@/pages/inspection_code/index.vue"),
        name: "TechnicInspectionCodealList",
        meta: {
          title: "检验代码",
          svgIcon: "inspection_code"
        }
      }
    ]
  },
  {
    path: "/financial",
    component: Layouts,
    redirect: "/financial",
    name: "Financial",
    meta: {
      title: "财务管理",
      svgIcon: "financial"
    },
    children: [
      {
        path: "financial",
        component: () => import("@/pages/financial/index.vue"),
        name: "FinancialManagement",
        meta: {
          title: "财务管理",
          svgIcon: "financial"
        }
      }
    ]
  },
  {
    path: "/store-house",
    component: Layouts,
    redirect: "/store-house",
    name: "StoreHouse",
    meta: {
      title: "仓库管理",
      svgIcon: "store_house"
    },
    children: [
      {
        path: "store-house",
        component: () => import("@/pages/store_house/index.vue"),
        name: "StoreHouseManagement",
        meta: {
          title: "仓库管理",
          svgIcon: "store_house"
        }
      }
    ]
  },
  {
    path: "/purchase",
    component: Layouts,
    redirect: "/purchase",
    name: "Purchase",
    meta: {
      title: "采购",
      svgIcon: "purchase"
    },
    children: [
      {
        path: "purchase",
        component: () => import("@/pages/purchase/index.vue"),
        name: "PurchaseManagement",
        meta: {
          title: "采购",
          svgIcon: "purchase"
        }
      }
    ]
  },
  {
    path: "/user-log",
    component: Layouts,
    redirect: "/user-log",
    name: "UserLog",
    meta: {
      title: "用户日志",
      svgIcon: "user_log"
    },
    children: [
      {
        path: "user-log-list",
        component: () => import("@/pages/user_log/index.vue"),
        name: "UserLogList",
        meta: {
          title: "用户日志",
          svgIcon: "user_log"
        }
      }
    ]
  },
  {
    path: "/user",
    component: Layouts,
    redirect: "/user",
    name: "User",
    meta: {
      title: "用户",
      svgIcon: "user_log",
      hidden: true
    },
    children: [
      {
        path: "change-self-info",
        component: () => import("@/pages/change_self_info/index.vue"),
        name: "ChangeSelfInfo",
        meta: {
          title: "修改信息",
          svgIcon: "user_log",
          hidden: true
        }
      }
    ]
  }
]

/**
 * @name 动态路由
 * @description 用来放置有权限 (Roles 属性) 的路由
 * @description 必须带有唯一的 Name 属性
 */
export const dynamicRoutes: RouteRecordRaw[] = [
  {
    path: "/permission",
    component: Layouts,
    redirect: "/permission/page-level",
    name: "Permission",
    meta: {
      title: "权限演示",
      elIcon: "Lock",
      // 可以在根路由中设置角色
      roles: ["admin", "editor"],
      alwaysShow: true
    },
    children: [
    ]
  }
]

/** 路由实例 */
export const router = createRouter({
  history: routerConfig.history,
  routes: routerConfig.thirdLevelRouteCache ? flatMultiLevelRoutes(constantRoutes) : constantRoutes
})

/** 重置路由 */
export function resetRouter() {
  try {
    // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch {
    // 强制刷新浏览器也行，只是交互体验不是很好
    location.reload()
  }
}

// 注册路由导航守卫
registerNavigationGuard(router)
