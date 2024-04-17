import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { Table, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getCurrency } from "../redux/actions/currencyActions";
import moment from "moment";
import { Helmet } from "react-helmet";

function Dashboard() {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.loading);
    const { currency, list } = useSelector((state) => state.currency);

    useEffect(() => {
        fetchCurrency();
    }, []);

    const fetchCurrency = () => {
        dispatch(
            getCurrency(({ success, message: theMessage }) => {
                if (!success) {
                    message.error(theMessage);
                }
            })
        );
    };

    const columns = [
        {
            title: "Currency",
            dataIndex: "currency",
            key: "currency",
        },
        {
            title: "Exchange Rate",
            dataIndex: "convertion",
            key: "convertion",
        },
    ];

    const data = Object.keys(currency?.rates).map((item) => {
        return {
            currency: item,
            convertion: currency?.rates?.[item],
        };
    });

    const lists = Object.keys(list?.symbols).map((item) => {
        return {
            label: item,
            value: item,
        };
    });

    return (
        <Layout>
            <Helmet>
                <title>Dashboard - Kazokku</title>
            </Helmet>
            <div className="p-4 flex flex-col flex-1">
                <h1 className="text-xl font-bold text-slate-800 mb-4">
                    Exchange Rates
                </h1>
                <div className="grid grid-cols-2 gap-8 items-center mb-4">
                    <div className="bg-white rounded-md drop-shadow-sm p-4">
                        <p className="text-slate-600 uppercase text-xs mb-2">
                            Base
                        </p>
                        <p className="text-slate-800 font-bold">
                            {currency?.base}
                        </p>
                    </div>
                    <div className="bg-white rounded-md drop-shadow-sm p-4">
                        <p className="text-slate-600 uppercase text-xs mb-2">
                            Date
                        </p>
                        <p className="text-slate-800 font-bold">
                            {moment
                                .unix(currency?.timestamp)
                                .format("MMM Do, YYYY")}
                        </p>
                    </div>
                </div>
                <div className="bg-white flex flex-col flex-1 w-full h-full px-4 py-2 rounded-md drop-shadow-sm">
                    <div className="flex flex-col my-4">
                        <Table
                            columns={columns}
                            dataSource={data}
                            bordered
                            size="small"
                            loading={loading}
                            rowKey="currency"
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;
