import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, getUser } from "../redux/actions/userActions";
import { message, Table, Input, Button, Dropdown, Modal } from "antd";
import moment from "moment";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

function User() {
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState({ page: 1, perPage: 10 });
    const [sort, setSort] = useState(null);

    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.user);
    const { loading } = useSelector((state) => state.loading);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
    }, [page, sort]);

    useEffect(() => {
        if (keyword) {
            const delayDebounceFn = setTimeout(() => {
                fetchUser();
            }, 500);
            return () => clearTimeout(delayDebounceFn);
        }
    }, [keyword]);

    const fetchUser = () => {
        dispatch(
            getUser(
                { keyword, ...page, ...sort },
                ({ success, message: theMessage }) => {
                    console.log(success, theMessage, "message");
                    if (!success) {
                        message.error(theMessage);
                    }
                }
            )
        );
    };

    const handleSearchByKeyword = (e) => {
        if (e.target.value === "") {
            dispatch(
                getUser(
                    { ...page, ...sort },
                    ({ success, message: theMessage }) => {
                        console.log(success, theMessage, "message");
                        if (!success) {
                            message.error(theMessage);
                        }
                    }
                )
            );
        }
        setKeyword(e.target.value);
    };

    const handleDelete = (id) => {
        dispatch(
            deleteUser(id, ({ message: theMessage, success }) => {
                if (!success) {
                    message.error(theMessage);
                } else {
                    message.success(theMessage);
                    fetchUser();
                }
            })
        );
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            sorter: true,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            sorter: true,
        },
        {
            title: "User Type",
            dataIndex: "type",
            key: "type",
            sorter: true,
        },
        {
            title: "Created At",
            dataIndex: "created_at",
            key: "created_at",
            sorter: true,
            render: (data) => moment(data).format("MMM Do, YYYY"),
        },
        {
            title: "Updated At",
            dataIndex: "updated_at",
            key: "updated_at",
            sorter: true,
            render: (data) => moment(data).format("MMM Do, YYYY"),
        },
        {
            title: "",
            key: "id",
            dataIndex: "id",
            align: "center",
            fixed: "right",
            width: 50,
            render: (id) => (
                <Dropdown
                    menu={{
                        items,
                        onClick: ({ key }) => {
                            if (key === "0") {
                                navigate(`/user/${id}`);
                            } else {
                                Modal.confirm({
                                    title: "Are you sure?",
                                    content:
                                        "Deleted data cannot be restored, are you sure?",
                                    onOk: () => handleDelete(id),
                                    okButtonProps: { loading, danger: true },
                                    okText: "Delete",
                                });
                            }
                        },
                    }}
                    trigger={["click"]}
                >
                    <div className="flex items-center justify-center cursor-pointer">
                        <svg
                            className="w-4 h-4 text-slate-800"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="-9 -2 24 24"
                            width="28"
                            fill="currentColor"
                        >
                            <path d="M3 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 14a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path>
                        </svg>
                    </div>
                </Dropdown>
            ),
        },
    ];

    const items = [
        {
            label: "Edit",
            key: "0",
        },
        {
            label: "Delete",
            key: "1",
        },
    ];

    const handleChangeTable = (pagination, filters, sorter) => {
        setPage({
            page: pagination.current,
            perPage: pagination.pageSize,
        });

        if (sorter.field) {
            setSort({
                orderBy: sorter.field,
                orderDirection: sorter.order === "ascend" ? "asc" : "desc",
            });
        }
    };

    const go = (path) => {
        navigate(path);
    };

    return (
        <Layout>
            <Helmet>
                <title>User - Kazokku</title>
            </Helmet>
            <div className="p-4 flex flex-col flex-1">
                <h1 className="text-xl font-bold text-slate-800 mb-4">Users</h1>
                <div className="bg-white flex flex-col flex-1 w-full h-full px-4 py-2 rounded-md drop-shadow-sm">
                    <div className="flex flex-col my-6 gap-4 items-start">
                        <Input
                            onChange={handleSearchByKeyword}
                            size="large"
                            placeholder="Search..."
                            className="flex items-center"
                            prefix={
                                <svg
                                    className="w-5 h-5 text-slate-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="-2.5 -2.5 24 24"
                                    width="28"
                                    fill="currentColor"
                                >
                                    <path d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12zm6.32-1.094l3.58 3.58a1 1 0 1 1-1.415 1.413l-3.58-3.58a8 8 0 1 1 1.414-1.414z"></path>
                                </svg>
                            }
                        />
                        <Button
                            onClick={() => go("/user/create")}
                            className="flex items-center"
                            type="primary"
                            icon={
                                <svg
                                    className="text-white w-4 h-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="-4.5 -4.5 24 24"
                                    width="28"
                                    fill="currentColor"
                                >
                                    <path d="M8.9 6.9v-5a1 1 0 1 0-2 0v5h-5a1 1 0 1 0 0 2h5v5a1 1 0 1 0 2 0v-5h5a1 1 0 1 0 0-2h-5z"></path>
                                </svg>
                            }
                        >
                            Add new User
                        </Button>
                    </div>
                    <Table
                        bordered
                        size="small"
                        columns={columns}
                        pagination={{
                            total: users?.total,
                            showSizeChanger: true,
                        }}
                        dataSource={users?.data}
                        rowKey="id"
                        onChange={handleChangeTable}
                        loading={loading}
                    />
                </div>
            </div>
        </Layout>
    );
}

export default User;
