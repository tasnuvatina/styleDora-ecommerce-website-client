import React from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddProduct from "../AddProduct/AddProduct";
import ManageProduct from "../ManageProduct/ManageProduct";
import "./Admin.css";

import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenSquare,
  faPlusSquare,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import EditProduct from "../EditProduct/EditProduct";

const Admin = () => {
  let { task } = useParams();
  console.log(task);
  return (
    <div className="admin-main row mx-0 mt-3">
      <div className="admin-nav-main col-lg-3 col-md-3 col-sm-12 col-12 text-center admin-side-nav">
        <NavLink
          to="/admin/manage-product"
          className="my-3 text-white side-nav-items"
          activeClassName="side-nav-items-active"
        >
          <span>
            <FontAwesomeIcon icon={faTasks} />
          </span>
          <span> Manage Products</span>
        </NavLink>
        <NavLink
          to="/admin/add-product"
          className="my-3 text-white side-nav-items"
          activeClassName="side-nav-items-active"
        >
          <span>
            <FontAwesomeIcon icon={faPlusSquare} />
          </span>
          <span> Add Products</span>
        </NavLink>
        <NavLink
          to="/admin/edit-product"
          className="my-3 text-white side-nav-items"
          activeClassName="side-nav-items-active"
        >
          <span>
            <FontAwesomeIcon icon={faPenSquare} />
          </span>
          <span> Edit Products</span>
        </NavLink>
      </div>
      <div className="container col-lg-9 col-md-9 col-12">
        <div>
          {task === "manage-product" && <ManageProduct></ManageProduct>}
        </div>
        <div>{task === "add-product" && <AddProduct></AddProduct>}</div>
        <div>{task === "edit-product" && <EditProduct></EditProduct>}</div>
      </div>
    </div>
  );
};

export default Admin;
