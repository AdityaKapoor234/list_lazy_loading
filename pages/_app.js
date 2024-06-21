import "bootstrap/dist/css/bootstrap.min.css"
import '../styles/globals.scss';
import '../styles/dashboard-styles.scss';
import "../styles/auth-styles.scss";
import '../styles/component-styles.scss';
import 'react-toastify/dist/ReactToastify.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import React from "react";
import Head from 'next/head'
import { ToastContainer, toast } from 'react-toastify';

function MyApp({ Component, pageProps }) {
  return <React.Fragment>
      <Head>
        {/* <title>{APP_NAME}</title> */}
        <meta name="description" content="Trusted Brands. Better Health." />
        <link rel="icon" href="fitcart.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      </Head>
      <ToastContainer />
      <Component {...pageProps} />
  </React.Fragment>
}

export default MyApp
