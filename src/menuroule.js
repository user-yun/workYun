
export default [
    {
        path: '/Home',
        name: 'Home',
        component: () => import('@/views/welcome/HelloWorld.vue'),
        meta: {
            title: "getInto",//标题以及父项的唯一标识
            icon: "el-icon-house",//图标
            intercept: true,//是否需要拦截
            role: [1]//角色
        }
        // children: [
        //     {
        //         path: '/Test',
        //         name: 'Test',
        //         component: () => import('@/views/welcome/Main.vue'),
        //         meta: {
        //             title: "Test",
        //             icon: "Test",
        //             role: [1]
        //         }
        //     },
        // ]
    },
    {
        path: '/Park',
        name: 'Park',
        component: () => import('@/views/welcome/Main.vue'),
        meta: {
            title: "parkManage",
            icon: "el-icon-house",
            intercept: true,
            role: [1]
        }
    },

]