import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import AskTheProsCreateComponent from "../../../component/ask-the-pros/ask-the-pros-details";
import AskTheProsApi from "../../../services/ask-the-pros";
import Router from "next/router";
import Cookie from "js-cookie";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export async function getServerSideProps(context) {
  const { id } = context.query;
  return {
    props: {
      id: id || null,
    },
  };
}

export default class AskTheProsEditDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props?.id,
      mode: "edit",
      asktheProps: {},
      expertise: [],
      open: false,
      askTheProsDetails: {
        name: "",
        email: "",
        avatar_url: null,
        is_active: false,
        experience: "",
        expertises: [1],
      },
    };
  }
  ValidateEmail = (mail) => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      mail
    );
  };

  validateData = () => {
    if (
      this.state.askTheProsDetails?.name === "" ||
      this.state.askTheProsDetails?.name === null
    ) {
      toast.error("Please enter the name");
      return false;
    }
    if (this.state.askTheProsDetails?.email === ""||
    this.state.askTheProsDetails?.email === null) {
      toast.error("Please enter email address");
      return false;
    }
    if (!this.ValidateEmail(this.state.askTheProsDetails?.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (
      this.state.askTheProsDetails?.avatar_url === "" ||
      this.state.askTheProsDetails?.avatar_url === null
    ) {
      toast.error("Please upload avatar");
      return false;
    }
    if (
      this.state.askTheProsDetails?.experience === "" ||
      this.state.askTheProsDetails?.experience === null
    ) {
      toast.error("Please enter experience");
      return false;
    }
    
    return true;
  };
  OnSave = () => {
    if (this.validateData()) {
      let data = {
        name:this.state.askTheProsDetails?.name,
        email:this.state.askTheProsDetails?.email,
        avatar_url: this.state.askTheProsDetails?.avatar_url,
        is_active: this.state.askTheProsDetails?.is_active,
        experience:this.state.askTheProsDetails?.experience,
        expertises:[1,3],
      };
      AskTheProsApi.AskTheProsEdit(this.props.id, data)
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
            this.setState({ asktheProps: response.data.data });
            toast.success(response.data.message);
            Router.push(`/ask-the-pros`);
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
  };
  stateHandle = (value) => {
    this.setState({ askTheProsDetails: value });
  };
  getAskTheProsDetails = (id) => {
    AskTheProsApi.getAskTheProsDetails(id)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          let details = {
            name:response.data.data.expert?.name,
            email:response.data.data.expert?.email,
            avatar_url: response.data.data.expert?.avatar_url,
            is_active: response.data.data.expert?.is_active,
            experience:response.data.data.expert?.experience,
            expertises:response.data.data.expert?.expertises,
          };
          this.setState({
            askTheProsDetails: details,
            asktheProps: response.data.data.expert,
          });
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
  Delete = (id) => {
    let data = {};
    AskTheProsApi.AskTheProsDelete(id, data)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          this.setState({ asktheProps: response.data.data.expert });
          Router.push("/ask-the-pros");
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
  getExpertiseList = () => {
    AskTheProsApi.getExpertise()
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          this.setState({ expertise: response.data.data });
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

  componentDidMount() {
    const token = Cookie.get("access_token_admin");
    if (token === undefined) {
      Router.push("/");
    }
    this.getExpertiseList();
    this. getAskTheProsDetails(this.props.id);
    this.setState({ id: this.props?.id });
  }
  render() {
    return (
      <div>
        <Head>
          <title>{APP_NAME} - Ask The Pros</title>
          <meta name="description" content="Trusted Brands. Better Health." />
          <link rel="icon" href="/fitcart.ico" />
        </Head>

        <main>
          <DashboardLayoutComponent>
            <div className="row border-box">
              <div className="col-md-5">
                <div className="hamburger">
                <span>Ask The Pros / Ask The Pros /  </span>Edit Ask The Pros 
                </div>
                <div className="page-name">
                Edit Ask The Pros  - {this.state.asktheProps?.name}
                </div>
              </div>
              <div className="col-md-7 btn-save">
                <div
                  className="custom-btn "
                  onClick={() => {
                    this.OnSave();
                  }}
                >
                  <span>Save </span>
                </div>
                <div
                  className="Cancel-btn custom-btn"
                  onClick={() => {
                    this.setState({ open: true });
                  }}
                >
                  <span>Delete </span>
                </div>
                <div
                  className="Cancel-btn custom-btn"
                  onClick={() => {
                    Router.push(`/ask-the-pros`);
                  }}
                >
                  <span>Cancel </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-m-12">
              <AskTheProsCreateComponent
                  askThePros={this.state.asktheProps}
                  mode={this.state.mode}
                  expertise={this.state.expertise}
                  handle={this.stateHandle.bind(this)}
                />
              </div>
            </div>
          </DashboardLayoutComponent>
          <Dialog
            open={this.state.open}
            onClose={() => this.setState({ open: false })}
            maxWidth="sm"
            fullWidth
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle style={{ color: "#012169" }}>
              Confirm the action
            </DialogTitle>
            <Box position="absolute" top={0} right={0}>
              <IconButton onClick={() => this.setState({ open: false })}>
                <CloseIcon />
              </IconButton>
            </Box>
            <DialogContent>
              <Typography style={{ color: "#7e8f99" }}>
                Are you sure you want to delete this pro?
              </Typography>
            </DialogContent>
            <DialogActions style={{ marginBottom: "0.5rem" }}>
              <Button
                onClick={() => {
                  this.setState({ open: false });
                }}
                style={{
                  color: "#012169",
                  background: "white",
                  borderRadius: "0px",
                }}
                color="primary"
                variant="contained"
              >
                Cancel
              </Button>
              <Button
                onClick={() => this.Delete(this.state.id)}
                style={{ background: "#f54a00", borderRadius: "0px" }}
                color="secondary"
                variant="contained"
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </main>
      </div>
    );
  }
}