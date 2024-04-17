import React from "react";
import BlankLayout from "../components/BlankLayout";
import { Helmet } from "react-helmet";
import { Input, Button, Modal, App } from "antd";
import Logo from "../aseets/logo.png";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/actions/authActions";
import { Navigate } from "react-router-dom";

function Login() {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.loading);
    const { user } = useSelector((state) => state.auth);

    const {
        handleSubmit,
        formState: { errors },
        control,
        setError,
    } = useForm();

    const onSubmit = (data) => {
        dispatch(
            login(data, ({ success, message, errors }) => {
                if (!success) {
                    Modal.error({ title: "Error!", content: message });
                    if (errors) {
                        const errorValidate = Object.keys(errors);
                        errorValidate.map((err) => {
                            setError(err, { message: errors[err][0] });
                        });
                    }
                }
            })
        );
    };

    return user ? (
        <Navigate to="/dashboard" />
    ) : (
        <App>
            <BlankLayout>
                <Helmet>
                    <title>Login - Kazokku</title>
                </Helmet>
                <div className="flex mb-8 gap-2 items-center">
                    <img src={Logo} alt="" className="w-6 h-6 object-contain" />
                    <p className="text-slate-800 font-semibold text-xl">
                        Kazokku
                    </p>
                </div>
                <form
                    className="px-10 py-8 rounded-lg drop-shadow-sm bg-white w-[500px]"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <h1 className="text-slate-800 font-bold text-lg">
                        Login to your account
                    </h1>
                    <p className="text-slate-600 text-sm">
                        Log in with the account you registered with
                    </p>
                    <div className="flex flex-col gap-4 mt-8">
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
                                        placeholder="eg: johndoe@mail.com"
                                        prefix={
                                            <svg
                                                className="w-4 h-4 text-slate-600"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="-5 -2 24 24"
                                                width="28"
                                                fill="currentColor"
                                            >
                                                <path d="M3.534 10.07a1 1 0 1 1 .733 1.86A3.579 3.579 0 0 0 2 15.26V17a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1.647a3.658 3.658 0 0 0-2.356-3.419 1 1 0 1 1 .712-1.868A5.658 5.658 0 0 1 14 15.353V17a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3v-1.74a5.579 5.579 0 0 1 3.534-5.19zM7 0a4 4 0 0 1 4 4v2a4 4 0 1 1-8 0V4a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v2a2 2 0 1 0 4 0V4a2 2 0 0 0-2-2z"></path>
                                            </svg>
                                        }
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
                                Password
                            </label>
                            <Controller
                                control={control}
                                name="password"
                                rules={{
                                    required: "The password field is required.",
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
                                        prefix={
                                            <svg
                                                className="w-4 h-4 text-slate-600"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="-5 -2 24 24"
                                                width="28"
                                                fill="currentColor"
                                            >
                                                <path d="M2 12v6h10v-6H2zm10-2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2V5a5 5 0 1 1 10 0v5zm-2 0V5a3 3 0 1 0-6 0v5h6zm-3 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"></path>
                                            </svg>
                                        }
                                    />
                                )}
                            />
                            {errors?.password && (
                                <span className="text-xs text-red-500 -mt-1">
                                    {errors?.password?.message}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col justify-end items-end mt-8">
                            <Button
                                onClick={handleSubmit(onSubmit)}
                                loading={loading}
                                type="primary"
                                className="flex items-center"
                                icon={
                                    <svg
                                        className="w-4 h-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="-5 -3 24 24"
                                        width="28"
                                        fill="currentColor"
                                    >
                                        <path d="M6.641 9.828H1a1 1 0 1 1 0-2h5.641l-1.12-1.12a1 1 0 0 1 1.413-1.415L9.763 8.12a.997.997 0 0 1 0 1.415l-2.829 2.828A1 1 0 0 1 5.52 10.95l1.121-1.122zM13 0a1 1 0 0 1 1 1v16a1 1 0 0 1-2 0V1a1 1 0 0 1 1-1z"></path>
                                    </svg>
                                }
                            >
                                Login
                            </Button>
                        </div>
                    </div>
                </form>
            </BlankLayout>
        </App>
    );
}

export default Login;
