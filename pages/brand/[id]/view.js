import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import BrandCreateComponent from "../../../component/catalog/brand/brand-create";
import Router from "next/router";
import Cookie from "js-cookie";

const brand={
    name:"JYM Supplement Science",
    display:"0",
    id:"1"
};


export default function CategoryViewDetails() {

    const mode = "view";

    useEffect(() => {
        const token = Cookie.get("access_token");
        if (token === undefined) {
            Router.push("/");
        }
    }, []);
    return (
        <div>
            <Head>
                <title>{APP_NAME} - Category</title>
                <meta name="description" content="Trusted Brands. Better Health." />
                <link rel="icon" href="/fitcart.ico" />
            </Head>

            <main>
                <DashboardLayoutComponent>
                    <div className="row border-box">
                        <div className="col-md-5">
                            <div className="hamburger">
                                <span>Catalog / Brand/ </span>View Brand
                            </div>
                            <div className="page-name">Brand Details - JYM Supplements</div>
                        </div>
                        <div className="col-md-7 btn-save">
                            <div
                                className="Cancel-btn custom-btn"
                                onClick={() => {
                                    Router.push(`/brand`);
                                }}
                            >
                                <span>Delete </span>
                            </div>
                            <div
                                className="Cancel-btn custom-btn"
                                onClick={() => {
                                    Router.push(`/brand`);
                                }}
                            >
                                <span>Cancel </span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-m-12">
                            <BrandCreateComponent customer={brand} mode={mode} />
                        </div>
                    </div>
                </DashboardLayoutComponent>
            </main>
        </div>
    );
}
