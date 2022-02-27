import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import BrandCreateComponent from "../../../component/catalog/brand/brand-create";
import Router from "next/router";
import Cookie from "js-cookie";
import BrandsApi from "../../../services/brands";

export async function getServerSideProps(context) {
  const { id } = context.query;
  return {
    props: {
      id: id || null,
    },
  };
}

export default function BrandViewDetails({ id }) {
  const mode = "view";

  const [brand, setBrand] = useState([]);

  const brandsDetail = (id) => {
    BrandsApi.getBrandsDetails(id)
      .then((response) => {
        setBrand(response.data.data.brand);
      })
      .catch((error) => {
        toast.error(
          error?.response &&
            error?.response?.data &&
            error?.response?.data?.message
            ? error.response.data.message
            : "Unable to process your request, please try after sometime"
        );
      });
  };

  const Delete = (id) => {
    let data={}
    BrandsApi.BrandsDelete(id,data)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          setBrand(response.data.data.brand);
          Router.push("/brand");
          toast.success(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(
          error?.response &&
            error?.response?.data &&
            error?.response?.data?.message
            ? error.response.data.message
            : "Unable to process your request, please try after sometime"
        );
      });
  };

  useEffect(() => {
    const token = Cookie.get("access_token_admin");
    if (token === undefined) {
      Router.push("/");
    }
    brandsDetail(id);
  }, [id]);
  return (
    <div>
      <Head>
        <title>{APP_NAME} - Brand</title>
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
              <div className="page-name">Brand Details - {brand?.name}</div>
            </div>
            <div className="col-md-7 btn-save">
              <div
                className="Cancel-btn custom-btn"
                onClick={() => {
                  Delete(id);
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
              <BrandCreateComponent brand={brand} mode={mode} />
            </div>
          </div>
        </DashboardLayoutComponent>
      </main>
    </div>
  );
}
