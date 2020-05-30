const routes = [
    {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
            {
                name: 'login',
                path: '/user/login',
                component: './user/login',
            },
        ],
    },
    {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
            {
                path: '/',
                component: '../layouts/BasicLayout',
                authority: ['admin', 'user'],
                routes: [
                    {
                        path: '/',
                        redirect: '/welcome',
                    },
                    {
                        path: '/welcome',
                        name: 'welcome',
                        icon: 'smile',
                        component: './Welcome',
                    },
                    {
                        path: '/admin',
                        name: 'admin',
                        icon: 'crown',
                        component: './Admin',
                        authority: ['admin'],
                        routes: [
                            {
                                path: '/admin/sub-page',
                                name: 'sub-page',
                                icon: 'smile',
                                component: './Welcome',
                                authority: ['admin'],
                            },
                        ],
                    },
                    {
                        name: 'list.commonName-list',
                        icon: 'table',
                        path: '/commonName/list',
                        component: './CommonName',
                    },
                    {
                        name: 'list.commonName-edit',
                        icon: 'crown',
                        path: '/commonName/edit/:code',
                        component: './CommonName/edit',
                        hideInMenu: true
                    },
                ],
            },
            {
                component: './404',
            },
        ],
    },
    {
        component: './404',
    },
]

export default routes;