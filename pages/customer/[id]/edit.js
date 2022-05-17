import Head from "next/head";
import Image from "next/image";
import React, { Component, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import CustomerComponent from "../../../component/customer/customer-list";
import Pagination from "@mui/material/Pagination";
import CustomerDetails from "../../../component/customer/customer-details";
import Router from "next/router";
import Cookie from "js-cookie";
import CustomerApi from "../../../services/customer";

export async function getServerSideProps(context) {
  const { id } = context.query;
  return {
    props: {
      id: id || null,
    },
  };
}

export default class CustomerEditDetails extends Component {
  // export default function CustomerEditDetails({ id }) {
  constructor(props) {
    super(props);
    this.state = {
      id: props?.id,
      mode: "edit",
      customer: [],
      active: false,
      is_all: false,
      wishList: [],
      userType: [],
      wishListTotalProduct: "",
      totalWishListPage: "",
      shoppingCart: [],
      shoppingCartTotal: "",
      customerDetails: {
        user_type: "",
        name: "",
        email: "",
        phone_number: "",
        is_active: true,
      },
    };
  }





  ValidateEmail = (mail) => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      mail
    );
  };

  validateData = () => {
    this.setState({ is_all: false });
    if (
      this.state.customerDetails.name === "" ||
      this.state.customerDetails.name === null ||
      this.state.customerDetails.name.replace(/\s/g, "").length <= 0
    ) {
      toast.error("Please enter the name");
      this.state.is_all = true;
    }
    if (this.state.customerDetails?.email === "" ||
      this.state.customerDetails?.email === null ||
      this.state.customerDetails?.email.replace(/\s/g, "").length <= 0 ||
      !this.ValidateEmail(this.state.customerDetails?.email)
    ) {
      toast.error("Please enter email address");
      this.state.is_all = true;
    }
    if (this.state.customerDetails?.phone_number === "" ||
      // customerDetails?.phone_number !== undefined ||
      !this.state.customerDetails?.phone_number.match(/^[6-9]{1}[0-9]{9}$/) ||
      this.state.customerDetails?.phone_number.replace(/\s/g, "").length <= 0

    ) {
      toast.error("Please enter phone number");
      this.state.is_all = true;
    }
    if (
      this.state.customerDetails?.user_type === "" ||
      this.state.customerDetails?.user_type === null ||
      this.state.customerDetails?.user_type.replace(/\s/g, "").length <= 0
    ) {
      toast.error("Please enter the user type");
      this.state.is_all = true;
    }

    if (this.state.is_all === true) {
      return false;
    }
    else {
      return true;
    }

  };

  activeHandle = (value) => {
    this.setState({ active: value });
    this.setState({ customerDetails: value });
  }
  stateHandle = (value) => {
    this.setState({ customerDetails: value });
  };

  saveDetails = (id) => {
    if (this.validateData()) {
      let data = this.state.customerDetails

      CustomerApi
        .CustomerDetails(id, this.state.customerDetails)
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
            toast.success(response.data.message)
            Router.push(`/customer`);
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
    }
  }

  customerDetail = (id) => {
    CustomerApi
      .getCustomerDetails(id)
      .then((response) => {
        this.setState({ customer: response.data.data.user });
        let input = {
          phone_number: response.data.data.user.phone_number,
          name: response.data.data.user.name,
          email: response.data.data.user.email,
          user_type: response.data.data.user.user_type,
          is_active: response.data.data.user.is_active,
        }
        this.setState({ customerDetails: input });
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
  }

  wishListDetail = (id, page) => {
    CustomerApi.WishList(id, page)
      .then((response) => {
        this.setState({ wishList: response.data.data.list })
        this.setState({ wishListTotalProduct: response.data.data.total })
        this.setState({ totalWishListPage: Math.ceil(response.data.data.total / response.data.data.page_size) })
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
  }

  shoppingCartDetail =(id)=>{
    CustomerApi.ShoppingCartList(id)
    .then((response) => {
      this.setState({shoppingCart: response.data.data.orders});
      this.setState({shoppingCartTotal: response.data.data.cart_price});
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
  }


  customerTypeDropdownDetail = () => {
    CustomerApi.getCustomerTypeDropdownDetails()
      .then((response) => {
        this.setState({ userType: response.data.data.list })
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
  }

  wishListPage = (value) => {
    this.wishListDetail(this.state.id, value);
  }

  componentDidMount() {
    const token = Cookie.get("access_token_admin");
    if (token === undefined) {
      Router.push("/");
    }
    this.customerDetail(this.state.id);
    this.wishListDetail(this.state.id, "1");
    this.customerTypeDropdownDetail();
    this.shoppingCartDetail(this.state.id);
  }
  render() {
    return (
      <div>
        <Head>
          <title>{APP_NAME} - Customer</title>
          <meta name="description" content="Trusted Brands. Better Health." />
          <link rel="icon" href="/fitcart.ico" />
        </Head>

        <main>
          <DashboardLayoutComponent>
            <div className="row border-box">
              <div className="col-md-5">
                <div className="hamburger">
                  <span>customer / customer / </span>Edit customer{" "}
                </div>
                <div className="page-name">Customer - {this.state.customer?.name}</div>
              </div>
              <div className="col-md-7 btn-save">
                <div
                  className="custom-btn "
                  onClick={() => {
                    this.saveDetails(this.state.id)
                  }}
                >
                  <span>Save </span>
                </div>
                <div
                  className="Cancel-btn custom-btn"
                  onClick={() => {
                    Router.push(`/customer`);
                  }}
                >
                  <span>Cancel </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-m-12">
                <CustomerDetails
                  handle={this.stateHandle.bind(this)}
                  customer={this.state.customer} id={this.state.id} mode={this.state.mode} active={this.activeHandle.bind(this)} userType={this.state.userType} wishList={this.state.wishList} totalWishListPage={this.state.totalWishListPage} wishListTotalProduct={this.state.wishListTotalProduct} wishListPage={this.wishListPage.bind(this)} shoppingCart={this.state.shoppingCart} shoppingCartTotal={this.state.shoppingCartTotal} />
              </div>
            </div>
          </DashboardLayoutComponent>
        </main>
      </div>
    );
  }
}
