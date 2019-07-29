import Main from "@/views/welcome/Main.vue";
export default [
    {
        path: '/Home',
        name: 'Home',
        component: Main,
        meta: {
            title: "Home",//标题以及父项的唯一标识
            icon: "el-icon-house",//图标
            intercept: true,//是否需要拦截
            role: [1]//角色
        },
        children: [
            {
                path: '/Home',
                name: 'Home',
                redirect: { name: "Home" },
                meta: {
                    title: "Home",
                    icon: "el-icon-house",
                    intercept: true,
                    role: [1]
                }
            }
        ]
    },
    {
        path: '/Test',
        name: 'Test',
        component: Main,
        meta: {
            title: "Test",
            icon: "el-icon-house",
            intercept: true,
            role: [1]
        },
        children: [
            {
                path: '/Test',
                name: 'Test',
                component: () => import('@/views/business/Test.vue'),
                meta: {
                    title: "Test",
                    icon: "el-icon-house",
                    intercept: true,
                    role: [1]
                }
            }
        ]
    },

]