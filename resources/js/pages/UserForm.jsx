import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { Helmet } from "react-helmet";
import { useForm, Controller } from "react-hook-form";
import { Input, Select, Button, Modal, message } from "antd";
import { addUser, editUser, getUserById } from "../redux/actions/userActions";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function UserForm() {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.loading);
    const navigate = useNavigate();
    const { id } = useParams();
    const {
        handleSubmit,
        formState: { errors },
        control,
        setError,
        reset,
        getValues,
    } = useForm();

    useEffect(() => {
        if (id) {
            dispatch(
                getUserById(id, ({ success, message: theMessage, data }) => {
                    if (!success) {
                        message.error(theMessage);
                    } else {
                        reset(data);
                    }
                })
            );
        }
    }, [id]);

    const onSubmit = (data) => {
        if (!id) {
            dispatch(
                addUser(data, ({ success, message, errors }) => {
                    if (!success) {
                        Modal.error({ title: "Error!", content: message });
                        if (errors) {
                            const errorValidate = Object.keys(errors);
                            errorValidate.map((err) => {
                                setError(err, { message: errors[err][0] });
                            });
                        }
                    } else {
                        navigate("/user");
                    }
                })
            );
        } else {
            dispatch(
                editUser(data, id, ({ success, message, errors }) => {
                    if (!success) {
                        Modal.error({ title: "Error!", content: message });
                        if (errors) {
                            const errorValidate = Object.keys(errors);
                            errorValidate.map((err) => {
                                setError(err, { message: errors[err][0] });
                            });
                        }
                    } else {
                        navigate("/user");
                    }
                })
            );
        }
    };

    console.log(id, "id");

    return (
        <Layout>
            <Helmet>
                <title>{id ? "Edit User" : "Add new User"} - Kazokku</title>
            </Helmet>
            <div className="p-4 flex flex-col flex-1">
                <h1 className="text-xl font-bold text-slate-800 mb-4">
                    {id ? "Edit User" : "Add new User"}
                </h1>
                <div className="bg-white flex flex-col flex-1 w-full h-full px-4 py-2 rounded-md drop-shadow-sm">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2 col-span-2">
                            <div className="flex flex-col gap-2">
                                <label className="text-slate-800 font-medium text-sm">
                                    Name
                                </label>
                                <Controller
                                    control={control}
                                    name="name"
                                    rules={{
                                        required: "The name field is required.",
                                    }}
                                    render={({
                                        field: { onChange, onBlur, value, ref },
                                    }) => (
                                        <Input
                                            status={errors?.name ? "error" : ""}
                                            ref={ref}
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            placeholder="eg: John Doe"
                                        />
                                    )}
                                />
                                {errors?.name && (
                                    <span className="text-xs text-red-500 -mt-1">
                                        {errors?.name?.message}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-slate-800 font-medium text-sm">
                                Email
                            </label>
                            <Controller
                                control={control}
                                name="email"
                                rules={{
                                    required: "The email field is required.",
                                }}
                                render={({
                                    field: { onChange, onBlur, value, ref },
                                }) => (
                                    <Input
                                        status={errors?.email ? "error" : ""}
                                        ref={ref}
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        placeholder="eg: john@mail.com"
                                    />
                                )}
                            />
                            {errors?.email && (
                                <span className="text-xs text-red-500 -mt-1">
                                    {errors?.email?.message}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-slate-800 font-medium text-sm">
                                User Type
                            </label>
                            <Controller
                                control={control}
                                name="type"
                                rules={{
                                    required: "The type field is required.",
                                }}
                                render={({
                                    field: { onChange, onBlur, value, ref },
                                }) => (
                                    <Select
                                        status={errors?.type ? "error" : ""}
                                        ref={ref}
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        placeholder="Select User Type"
                                        options={[
                                            {
                                                label: "Admin",
                                                value: "admin",
                                            },
                                            {
                                                label: "User",
                                                value: "user",
                                            },
                                        ]}
                                    />
                                )}
                            />
                            {errors?.type && (
                                <span className="text-xs text-red-500 -mt-1">
                                    {errors?.type?.message}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-slate-800 font-medium text-sm">
                                Password
                            </label>
                            <Controller
                                control={control}
                                name="password"
                                rules={{
                                    required: id
                                        ? false
                                        : "The password field is required.",
                                }}
                                render={({
                                    field: { onChange, onBlur, value, ref },
                                }) => (
                                    <Input.Password
                                        status={errors?.password ? "error" : ""}
                                        ref={ref}
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        placeholder="••••••••"
                                    />
                                )}
                            />
                            {errors?.password && (
                                <span className="text-xs text-red-500 -mt-1">
                                    {errors?.password?.message}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-slate-800 font-medium text-sm">
                                Re-type Password
                            </label>
                            <Controller
                                control={control}
                                name="password_confirmation"
                                rules={{
                                    required:
                                        id && !getValues("password")
                                            ? false
                                            : "The password_confirmation field is required.",
                                }}
                                render={({
                                    field: { onChange, onBlur, value, ref },
                                }) => (
                                    <Input.Password
                                        status={
                                            errors?.password_confirmation
                                                ? "error"
                                                : ""
                                        }
                                        ref={ref}
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        placeholder="••••••••"
                                    />
                                )}
                            />
                            {errors?.password_confirmation && (
                                <span className="text-xs text-red-500 -mt-1">
                                    {errors?.password_confirmation?.message}
                                </span>
                            )}
                        </div>
                        <div className="flex mt-4 col-span-2">
                            <Button
                                loading={loading}
                                onClick={handleSubmit(onSubmit)}
                                type="primary"
                                className="flex items-center"
                                icon={
                                    <svg
                                        className="w-4 h-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="-3 -3 24 24"
                                        width="28"
                                        fill="currentColor"
                                    >
                                        <path d="M2 0h11.22a2 2 0 0 1 1.345.52l2.78 2.527A2 2 0 0 1 18 4.527V16a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 2v14h14V4.527L13.22 2H2zm4 8h6a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2zm0 2v4h6v-4H6zm7-9a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0V4a1 1 0 0 1 1-1zM5 3h5a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 3h3V5H6v1z"></path>
                                    </svg>
                                }
                            >
                                {id ? "Save Changes" : "Save"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default UserForm;
