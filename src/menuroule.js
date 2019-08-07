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
            },
        ]
    },
    {
        path: '/test',
        name: 'test',
        component: Main,
        meta: {
            icon: "el-icon-house",
            intercept: true,
            role: [1]
        },
        children: [
            {
                path: '/test',
                name: 'test',
                component: () => import('@/views/business/Test.vue'),
                meta: {
                    icon: "el-icon-house",
                    intercept: true,
                    role: [1]
                }
            }
        ]
    },

]