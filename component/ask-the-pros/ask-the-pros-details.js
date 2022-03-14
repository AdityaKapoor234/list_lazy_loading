import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";
import AskTheProsApi from "../../services/ask-the-pros";
import Photo from "../common-component/photo";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export default class AsktheprosDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 1,
      askThePros: props?.askThePros,
      mode: props?.mode,
      expert:[],
      expertise:this.selectTypes(this.props.expert, this.props?.expertise),
      img_icon: "file-input",
      input: {
        name: "",
        email: "",
        avatar_url: null,
        is_active: false,
        experience: "",
        expertises: [],
      },
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.askThePros !== nextProps.askThePros ||
      prevState.mode !== nextProps.mode ||
      prevState.expertise !== nextProps?.expertise||
      prevState.expert !== nextProps?.expert
    ) {
      return {
        askThePros: nextProps?.askThePros,
        mode: nextProps?.mode,
        expertise: nextProps?.expertise,
        expert:nextProps?.expert,
        input: {
          name: nextProps?.askThePros?.name,
          email: nextProps?.askThePros?.email,
          avatar_url: nextProps?.askThePros?.avatar_url,
          is_active: nextProps?.askThePros?.is_active,
          experience: nextProps?.askThePros?.experience,
          expertises: nextProps?.expert,
        },
      };
    }
    return null;
  }
  handleChange = (event) => {
    let input = this.state.input;
    input[event.target.name] = event.target.value;
    this.setState({ input });
    this.props?.handle(input);
  };
  handleCheck = (event) => {
    let input = this.state.input;
    input[event.target.name] = event.target.checked;
    this.setState({ input });
    this.props?.handle(input);
  };
  handlePhotoUrl = (name, url) => {
    let input = this.state.input;
    input[name] = url;
    this.setState({ input });
    this.props?.handle(input);
  };
  selectTypes = (list, expertise) => {
    let model = list?.map(p=>p?.id)
    let tempcategoryList = expertise;
    for (let i in tempcategoryList) {
      if (model !== undefined) {
        if (model?.length > 1) {
          if (model.indexOf(tempcategoryList[i].id) >= 0)
            tempcategoryList[i].selected = true;
          else {
            tempcategoryList[i].selected = false;
          }
        } else {
          if (model?.indexOf(tempcategoryList[i].id) >= 0)
            tempcategoryList[i].selected = true;
          else {
            tempcategoryList[i].selected = false;
          }
        }
      }
      else{
        tempcategoryList[i].selected = false;
      }
    }
    return tempcategoryList;
  };

 
  componentDidUpdate(prevProps) {
    if (this.props.expert !== prevProps?.expert) {
      this.setState({
        expertise : this.selectTypes(this.props.expert, this.props?.expertise)
      })
    }
  }
  componentDidMount() {
    
  }
  render() {
    return (
      <div data-component="edit-customer">
        <div className="row">
          <div className="col-md-12">
            <div className="tab">
              <div
                className={
                  this.state.tab === 1 ? `sub-tab active-tab` : "sub-tab"
                }
                onClick={() => {
                  this.setState({ tab: 1 });
                }}
              >
                Pro info
              </div>
            </div>
          </div>
        </div>
        {this.state.tab === 1 && (
          <>
            {this.state.mode === "edit" && (
              <div className="row sticky-scroll scroll">
                <div className="col">
                  <div className="row mt-4">
                    <div className="col-md-4">
                      <div className="login-form ">
                        <label>Name<span className="mandatory-star">*</span></label>
                        <input
                          type="text"
                          name="name"
                          value={this.state.input.name}
                          onChange={this.handleChange.bind(this)}
                        />
                      </div>
                      <div className="login-form ">
                        <label>Email<span className="mandatory-star">*</span></label>
                        <input
                          type="text"
                          name="email"
                          value={this.state.input.email}
                          onChange={this.handleChange.bind(this)}
                        />
                      </div>
                      <div className="mt-4">
                        <Photo
                          mode={this.state.mode}
                          label={"Avatar"}
                          accept=".jpg,.jpeg,.png"
                          name="avatar_url"
                          img={this.state.input.avatar_url}
                          setUrl={this.handlePhotoUrl.bind(this)}
                          value={this.state.img_icon}
                          urlName="avatar"
                        />
                      </div>
                      <div className="login-form mt-3">
                        <label>Experience<span className="mandatory-star">*</span></label>
                        <input
                          type="text"
                          name="experience"
                          value={this.state.input.experience}
                          onChange={this.handleChange.bind(this)}
                        />
                      </div>
                      <div className="signup-check">
                        <Checkbox
                          size="small"
                          style={{ color: "#012169" }}
                          checked={this.state.input.is_active?this.state.input.is_active:false}
                          name="is_active"
                          onChange={this.handleCheck.bind(this)}
                        />
                        <label>Active</label>
                      </div>
                    </div>
                    {/* <div className="col-md-12">
                      <label className="expertise">Expertises<span className="mandatory-star">*</span></label>
                      <div className="signup-check">
                        <div className="d-flex flex-wrap">
                          {this.state.expertise?.map((value) => {
                            return (
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      style={{ color: "#012169" }}
                                      size="small"
                                      className="check"
                                      value={value.id}
                                      onChange={this.handleChange.bind(this)}
                                      checked={value?.selected?value?.selected:false}
                                      name={value?.name}
                                    />
                                  }
                                  label={
                                    <span style={{ fontSize: "0.875rem" }}>
                                      {value?.name}
                                    </span>
                                  }
                                />
                              </FormGroup>
                            );
                          })}
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            )}
            {this.state.mode === "view" && (
              <div className="row sticky-scroll scroll">
                <div className="col">
                  <div className="row mt-4">
                    <div className="col-md-4">
                      <div className="login-form ">
                        <label>Name<span className="mandatory-star">*</span></label>
                        <input
                          type="text"
                          value={this.state.input?.name}
                          readOnly={true}
                        />
                      </div>
                      <div className="login-form ">
                        <label>Email<span className="mandatory-star">*</span></label>
                        <input
                          type="text"
                          value={this.state.input?.email}
                          readOnly={true}
                        />
                      </div>
                      <div className="mt-4">
                        <Photo
                          mode={this.state.mode}
                          label={"Avatar"}
                          accept=".jpg,.jpeg,.png"
                          img={this.state.input.avatar_url}
                        />
                      </div>
                      <div className="login-form ">
                        <label>Experience<span className="mandatory-star">*</span></label>
                        <input
                          type="text"
                          value={this.state.input?.experience}
                          readOnly={true}
                        />
                      </div>
                      <div className="signup-check">
                        <Checkbox
                          size="small"
                          style={{ color: "#012169" }}
                          checked={this.state.input.is_active?this.state.input.is_active:false}
                        />
                        <label>Active</label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <label className="expertise">Expertises<span className="mandatory-star">*</span></label>
                      <div className="signup-check">
                        <div className="d-flex flex-wrap">
                          {this.state.expertise?.map((value) => {
                            return (
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      style={{ color: "#012169" }}
                                      size="small"
                                      className="check"
                                      // value={value.id}
                                      // onChange={this.handleChange.bind(this)}
                                      checked={value?.selected?value?.selected:false}
                                      name={value?.name}
                                    />
                                  }
                                  label={
                                    <span style={{ fontSize: "0.875rem" }}>
                                      {value?.name}
                                    </span>
                                  }
                                />
                              </FormGroup>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
}