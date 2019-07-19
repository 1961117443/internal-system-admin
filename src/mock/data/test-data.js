import Mock from 'mockjs'
export default {
    "menu": [
        {
            id: Mock.mock('@guid'),
            name: "系统设置",
            url: Mock.mock('@url'),
            httpMethod: "get",
            createTime: "2020-01-01",
            children: [
                {
                    id: Mock.mock('@guid'),
                    name: "角色管理",
                    url: Mock.mock('@url'),
                    httpMethod: "get",
                    createTime: "2020-01-01",
                    children: [
                        {
                            id: Mock.mock('@guid'),
                            name: "新增",
                            url: Mock.mock('@url'),
                            httpMethod: "get",
                            createTime: "2020-01-01",
                        },
                        {
                            id: Mock.mock('@guid'),
                            name: "修改",
                            url: Mock.mock('@url'),
                            httpMethod: "get",
                            createTime: "2020-01-01",
                        },
                        {
                            id: Mock.mock('@guid'),
                            name: "删除",
                            url: Mock.mock('@url'),
                            httpMethod: "get",
                            createTime: "2020-01-01",
                        }
                    ]
                },
                {
                    id: Mock.mock('@guid'),
                    name: "用户管理",
                    url: Mock.mock('@url'),
                    httpMethod: "get",
                    createTime: "2020-01-01",
                },
                {
                    id: Mock.mock('@guid'),
                    name: "菜单管理",
                    url: Mock.mock('@url'),
                    httpMethod: "get",
                    createTime: "2020-01-01",
                },
                {
                    id: Mock.mock('@guid'),
                    name: "权限管理",
                    url: Mock.mock('@url'),
                    httpMethod: "get",
                    createTime: "2020-01-01",
                }
            ]
        },
        {
            id: Mock.mock('@guid'),
            name: "需求管理",
            url: Mock.mock('@url'),
            httpMethod: "get",
            createTime: "2020-01-01",
            children: [
                {
                    id: Mock.mock('@guid'),
                    name: "需求录入",
                    url: Mock.mock('@url'),
                    httpMethod: "get",
                    createTime: "2020-01-01",
                },
                {
                    id: Mock.mock('@guid'),
                    name: "需求审核",
                    url: Mock.mock('@url'),
                    httpMethod: "get",
                    createTime: "2020-01-01",
                },
                {
                    id: Mock.mock('@guid'),
                    name: "需求安排",
                    url: Mock.mock('@url'),
                    httpMethod: "get",
                    createTime: "2020-01-01",
                },
                {
                    id: Mock.mock('@guid'),
                    name: "需求完成登记",
                    url: Mock.mock('@url'),
                    httpMethod: "get",
                    createTime: "2020-01-01",
                }
            ]
        },
        {
            id: Mock.mock('@guid'),
            name: "计划管理",
            url: Mock.mock('@url'),
            httpMethod: "get",
            createTime: "2020-01-01",
            children: [{
                id: Mock.mock('@guid'),
                name: "更新计划",
                url: Mock.mock('@url'),
                httpMethod: "get",
                createTime: "2020-01-01",
            }]
        },
        {
            id: Mock.mock('@guid'),
            name: "人事管理",
            url: Mock.mock('@url'),
            httpMethod: "get",
            createTime: "2020-01-01",
            children: [
                {
                    id: Mock.mock('@guid'),
                    name: "考勤登记",
                    url: Mock.mock('@url'),
                    httpMethod: "get",
                    createTime: "2020-01-01",
                },
                {
                    id: Mock.mock('@guid'),
                    name: "请假登记",
                    url: Mock.mock('@url'),
                    httpMethod: "get",
                    createTime: "2020-01-01",
                }
            ]
        },
        {
            id: Mock.mock('@guid'),
            name: "日志管理",
            url: Mock.mock('@url'),
            httpMethod: "get",
            createTime: "2020-01-01",
            children: [
                {
                    id: Mock.mock('@guid'),
                    name: "操作日志",
                    url: Mock.mock('@url'),
                    httpMethod: "get",
                    createTime: "2020-01-01",
                },
                {
                    id: Mock.mock('@guid'),
                    name: "系统日志",
                    url: Mock.mock('@url'),
                    httpMethod: "get",
                    createTime: "2020-01-01",
                }]
        }
    ],
    "roleAuth": [
        {
            "title": "权限管理",
            "expand": true,
            "selected": true,
            "children": [
                {
                    "title": "角色管理",
                    "children": [
                        {
                            "title": "新增"
                        },
                        {
                            "title": "修改"
                        },
                        {
                            "id": 1,
                            "title": "删除"
                        },
                        {
                            "title": "分配权限"
                        }
                    ]
                },
                {
                    "title": "用户管理",
                    "children": [
                        {
                            "title": "leaf 1-2-1",
                            "checked": true
                        },
                        {
                            "title": "leaf 1-2-1"
                        }
                    ]
                },
                {
                    "title": "菜单管理",
                    "children": [
                        {
                            "title": "leaf 1-2-1",
                            "checked": true
                        },
                        {
                            "title": "leaf 1-2-1"
                        }
                    ]
                }
            ]
        }
    ]
}