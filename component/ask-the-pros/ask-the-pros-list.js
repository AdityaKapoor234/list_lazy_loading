import React, { Component } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Router from "next/router";

export default class AsktheprosList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      askThePros: props?.askThePros,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.askThePros !== nextProps.askThePros) {
      return {
        askThePros: nextProps?.askThePros,
      };
    }
    return null;
  }

  render() {
    return (
      <div data-component="CustomerComponent">
        <div className="row">
          <div className="col-md-12">
            <div className="tableRow">
              <div className="col-2">Name</div>
              <div className="col-3 text-center">Email</div>
              <div className="col text-center">experience</div>
              <div className="col text-center">Active</div>
              <div className="col-1 text-center">view</div>
              <div className="col-1 text-end">Edit</div>
            </div>
          </div>
        </div>
        {this.state.askThePros?.map((p, index) => {
          return (
            <div className="row" key={index}>
              <div className="col-md-12">
                <div className="tableCell">
                  <div className="tableBody col-2">{p?.name}</div>
                  <div className="tableBody col-3 justify-content-center">
                    {p?.email}
                  </div>
                  <div className="col text-center">{p?.experience}</div>
                  <div className="col text-center">
                    {p?.is_active === true ? (
                      <CheckCircleOutlineOutlinedIcon className="check-icon" />
                    ) : (
                      <CancelOutlinedIcon className="cancel-icon" />
                    )}
                  </div>
                  <div className="col-1 text-center">
                    <RemoveRedEyeIcon
                      className="view-icon"
                      onClick={() => {
                        Router.push(`/ask-the-pros/${p?.id}/view`);
                      }}
                    />
                  </div>
                  <div className="col-1 text-end">
                    <EditOutlinedIcon
                      className="edit-icon"
                      onClick={() => {
                        Router.push(`/ask-the-pros/${p?.id}/edit`);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
