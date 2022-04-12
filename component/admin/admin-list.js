import React, { Component } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Router from "next/router";

export default class AdminList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			admin: props?.admin,
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (
			prevState.admin !== nextProps.admin
		) {
			return {
				admin: nextProps?.admin
			};
		}
		return null;
	}

	convertDateStringToDate = (dateStr) => {
		let months = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		];

		let date = new Date(dateStr);
		let str =
			date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
		return str;
	};

	render() {
		return (
			<div data-component="CustomerComponent">
				<div className="row">
					<div className="col-md-12">
						<div className="tableRow">
							<div className="col-2 pe-1">Name</div>
							<div className="col-3 px-2 text-center">Email</div>
							<div className="col px-2 text-center">Mobile No.</div>
							<div className="col px-2 text-center">Reg. Date</div>
							<div className="col-1 text-center">Active</div>
							<div className="col-1 text-end">Action</div>
						</div>
					</div>
				</div>
				{
					// this.state.customer && this.state.customer.length === 0 ? <div className="not-found">No Data Found</div> :
					this.state.admin?.map((p, index) => {
						return (
							<div className="row" key={index}>
								<div className="col-md-12">
									<div className="tableCell">
										<div className="tableBody pe-1 col-2 elip-text" title={p?.name}>{p?.name}</div>
										<div className="tableBody px-2 col-3 justify-content-center elip-text" title={p?.email}>
											{p?.email}
										</div>
										<div className="col px-2 text-center elip-text" title={p?.phone_number}>{p?.phone_number}</div>
										<div className="col px-2 text-center elip-text" title={this.convertDateStringToDate(p?.created_at)}>{this.convertDateStringToDate(p?.created_at)}</div>
										<div className="col-1 text-center">
											{p?.is_active === true ? (
												<CheckCircleOutlineOutlinedIcon className="check-icon" />
											) : (
												<CancelOutlinedIcon className="cancel-icon" />
											)}
										</div>
										<div className="col-1 text-end" >
											{/* <RemoveRedEyeIcon
												className="view-icon"
												onClick={() => {
													Router.push(`/admin/${p?.id}/view`);
												}}
											/> */}
											<EditOutlinedIcon
												className="edit-icon"
												onClick={() => {
													Router.push(`/admin/${p?.id}/edit`);
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