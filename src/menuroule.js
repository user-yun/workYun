import Main from "@/views/welcome/Main.vue";
export default [
    {
        path: '/home',
        name: 'home',
        component: Main,
        meta: {
            icon: "el-icon-house",//图标
            intercept: true,//是否需要拦截
            role: [1]//角色
        },
        children: [
            {
                path: '/home',
                name: 'home',
                redirect: { name: "home" },
                meta: {
                    icon: "el-icon-house",
                    intercept: true,
                    role: [1]
                }
            }
        ]
    },
    {
        path: '/test',
        name: 'test',
        component: Main,
        meta: {
            icon: "el-icon-sugar",
            intercept: true,
            role: [1]
        },
        children: [
            {
                path: '/test',
                name: 'test',
                component: () => import('@/views/business/Test.vue'),
                meta: {
                    icon: "el-icon-sugar",
                    intercept: true,
                    role: [1]
                }
            }
        ]
    },
    {
        path: '/system',
        name: 'system',
        component: Main,
        meta: {
            icon: "el-icon-s-platform",
            intercept: true,
            role: [1]
        },
        children: [
            {
                path: '/device',
                name: 'device',
                component: () => import('@/views/business/system/module/MModule'),
                meta: {
                    icon: "el-icon-odometer",
                    intercept: true,
                    role: [1]
                }
            },
            {
                path: '/business',
                name: 'business',
                component: () => import('@/views/business/system/business/MBusiness'),
                meta: {
                    icon: "el-icon-tickets",
                    intercept: true,
                    role: [1]
                }
            },
            {
                path: '/config',
                name: 'config',
                component: () => import('@/views/business/system/config/MConfig'),
                meta: {
                    icon: "el-icon-s-help",
                    intercept: true,
                    role: [1]
                }
            },
            {
                path: '/organization',
                name: 'organization',
                component: () => import('@/views/business/system/orghistory/MOrgHistory'),
                meta: {
                    icon: "el-icon-s-check",
                    intercept: true,
                    role: [1]
                }
            },
            {
                path: '/bill',
                name: 'bill',
                component: () => import('@/views/business/system/bill/MBill'),
                meta: {
                    icon: "el-icon-s-order",
                    intercept: true,
                    role: [1]
                }
            },
            {
                path: '/enterpriseSummary',
                name: 'enterpriseSummary',
                component: () => import('@/views/business/system/orgsummary/MOrgSummary'),
                meta: {
                    icon: "el-icon-s-order",
                    intercept: true,
                    role: [1]
                }
            },
            {
                path: '/regionalSummary',
                name: 'regionalSummary',
                component: () => import('@/views/business/system/zonesummary/MZoneSummary'),
                meta: {
                    icon: "el-icon-s-order",
                    intercept: true,
                    role: [1]
                }
            }
        ]
    }
]