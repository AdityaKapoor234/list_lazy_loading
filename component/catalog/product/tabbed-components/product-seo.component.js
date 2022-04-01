import React, { Component } from "react";
import ProductTabEditorHeader from "./sub-components/product-tab-editor-header.component";
import SeoApi from "../../../../services/seo";
import { toast } from "react-toastify";
import Router from "next/router";

export default class ProductSEOComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:props?.id,
            seo:{},
            errors:{},
            mode:props?.mode
        };
    }
    handleChange = (event) => {
        let input = this.state.seo;
        input[event.target.name] = event.target.value
        this.setState({
            seo:input
        })
    };

    validation(){
        let input = this.state.seo;
        let errors = {};
        let isValid = true;
            if (!input["url_key"] || input["url_key"].replace(/\s/g, "").length <=0) {
                isValid = false;
                errors["url_key"] = "Please enter url key";
            }
<<<<<<< HEAD
            if (!input["meta_keywords"] || input["meta_keywords"].replace(/\s/g, "").length <=0) {
                isValid = false;
                errors["meta_keywords"] = "Please enter meta keywords";
            }
            if (!input["meta_title"] || input["meta_title"].replace(/\s/g, "").length <=0) {
                isValid = false;
                errors["meta_title"] = "Please enter meta title";
            }
            if (!input["meta_description"] || input["meta_description"].replace(/\s/g, "").length <=0) {
=======
            if(input["url_key"].replace(/\s/g, "").length <=0){
                isValid = false;
                errors["url_key"] = "Please enter url key";
            }
            if (!input["meta_keywords"]) {
                isValid = false;
                errors["meta_keywords"] = "Please enter meta keywords";
            }
            if(input["meta_keywords"].replace(/\s/g, "").length <=0){
                isValid = false;
                errors["meta_keywords"] = "Please enter meta keywords";
            }
            if (!input["meta_title"]) {
                isValid = false;
                errors["meta_title"] = "Please enter meta title";
            }
            if(input["meta_title"].replace(/\s/g, "").length <=0){
                isValid = false;
                errors["meta_title"] = "Please enter meta title";
            }
            if (!input["meta_description"]) {
>>>>>>> a9f42aa08ae87d671c84b444b488807b6dacfce2
                isValid = false;
                errors["meta_description"] = "Please enter meta description";
            }
            if(input["meta_description"].replace(/\s/g, "").length <=0){
                isValid = false;
                errors["meta_description"] = "Please enter meta description";
            }
        this.setState({
            errors: errors
        });

        return isValid;
    }

    EditSeo = (id)=>{
        let data ={
            "meta_description": this.state.seo?.meta_description,
            "meta_keywords": this.state.seo?.meta_keywords,
            "meta_title": this.state.seo?.meta_title,
            "url_key": this.state.seo?.url_key
        }
        SeoApi.AddSeo(id,data)
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
                let list =  response.data.data
                this.setState({seo: list});
                toast.success("Update successfully")
                Router.push("/product")
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

    onSave=()=> {
        if(this.validation()){
            this.EditSeo(this.state.id)
        }
    }

    // onSaveAndContinue=()=> {
    //     if(this.validation()){
    //         this.EditSeo(this.state.id)
    //     }
    // }

    getSeoDetails=(id)=>{
        SeoApi.getSeo(id)
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
              let list =  response.data.data
              this.setState({seo: list});
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

    componentDidMount(){
        this.getSeoDetails(this.state.id)
    }

    render() {
        return (

            <div data-component="product-seo-edit" className='product-tabbed-editor'>
                <ProductTabEditorHeader onSave={this.onSave} mode={this.state.mode} showSaveContinueButton={false}>
                    Search Engine Optimisation
                </ProductTabEditorHeader>
                <div className="row ">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="fc-form-group">
                                    <label>URL Key<span className="mandatory-star">*</span></label>
                                    <input
                                        type="text"
                                        name="url_key"
                                        readOnly={this.state.mode === "view"?true:false}
                                        value={this.state.seo?.url_key}
                                        onChange={this.handleChange.bind(this)}
                                    />
                                    <small className="form-text text-danger" >{this.state.errors["url_key"]}</small>
                                </div>
                                <div className="fc-form-group">
                                    <label>Meta Title<span className="mandatory-star">*</span></label>
                                    <br/>
                                    <textarea
                                        name="meta_title"
                                        value={this.state.seo?.meta_title}
                                        cols="100"
                                        readOnly={this.state.mode === "view"?true:false}
                                        rows="5"
                                        onChange={this.handleChange.bind(this)}
                                    />
                                    <small className="form-text text-danger" >{this.state.errors["meta_title"]}</small>
                                </div>
                                <div className="fc-form-group">
                                    <label>Meta Keywords<span className="mandatory-star">*</span></label>
                                    <br/>
                                    <textarea
                                        name="meta_keywords"
                                        value={this.state.seo?.meta_keywords}
                                        cols="100"
                                        readOnly={this.state.mode === "view"?true:false}
                                        rows="5"
                                        onChange={this.handleChange.bind(this)}
                                    />
                                    <small className="form-text text-danger" >{this.state.errors["meta_keywords"]}</small>
                                </div>
                                <div className="fc-form-group">
                                    <label>Meta Description<span className="mandatory-star">*</span></label>
                                    <br/>
                                    <textarea
                                        name="meta_description"
                                        value={this.state.seo?.meta_description}
                                        cols="100"
                                        readOnly={this.state.mode === "view"?true:false}
                                        rows="5"
                                        onChange={this.handleChange.bind(this)}
                                    />
                                    <small className="form-text text-danger" >{this.state.errors["meta_description"]}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
