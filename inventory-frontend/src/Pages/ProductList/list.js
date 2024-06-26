import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { filterData } from "../redux/action";

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const filteredProducts = useSelector((state) => state.filteredData); // Access the filtered products data

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        if (error.response && error.response.status === 419) {
          navigate("/adminlogin");
        }
      }
    };

    fetchData();
  }, []);

  const handleDelete = (id) => {
    const authToken = localStorage.getItem("authToken");
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://127.0.0.1:8000/api/products/${id}`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          })
          .then((response) => {
            setProducts(products.filter((product) => product.id !== id));
            console.log("Item deleted successfully");
            Swal.fire("Deleted!", "Your item has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting item:", error);
            Swal.fire(
              "Error!",
              "An error occurred while deleting the item.",
              "error"
            );
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your item is safe :)", "info");
      }
    });
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    dispatch(filterData(searchTerm));
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Product product list</h4>
            <h6>View/Search product product</h6>
          </div>
          <div className="page-btn">
            <Link to="/add/product" className="btn btn-added">
              <img src="assets/img/icons/plus.svg" className="me-1" alt="img" />
              Add product
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="table-top row">
              <div className="wordset ">
                <ul>
                  <li>
                    <a
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="pdf"
                    >
                      <img src="assets/img/icons/pdf.svg" alt="img" />
                    </a>
                  </li>
                  <li>
                    <a
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="excel"
                    >
                      <img src="assets/img/icons/excel.svg" alt="img" />
                    </a>
                  </li>
                  <li>
                    <a
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="print"
                    >
                      <img src="assets/img/icons/printer.svg" alt="img" />
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-12 col-sm-6 col-12 ms-auto ">
                <div className="form-group">
                  <a className="btn btn-filters ms-auto me-4">
                    {" "}
                    <img
                      src="assets/img/icons/search-whites.svg"
                      alt="img"
                      style={{ width: "20%" }}
                    />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={handleSearch}
                      placeholder="Search product"
                    />
                  </a>
                </div>
              </div>
            </div>


            <div className="card" id="filter_inputs">
              <div className="card-body pb-0">
                <div className="row">
                  <div className="col-lg-2 col-sm-6 col-12">
                    <div className="form-group">
                      <select className="select">
                        <option>Choose Category</option>
                        <option>Computers</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-2 col-sm-6 col-12">
                    <div className="form-group">
                      <select className="select">
                        <option>Choose Sub Category</option>
                        <option>Fruits</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-2 col-sm-6 col-12">
                    <div className="form-group">
                      <select className="select">
                        <option>Choose Sub Brand</option>
                        <option>Iphone</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-1 col-sm-6 col-12 ms-auto">
                    <div className="form-group">
                      <a className="btn btn-filters ms-auto">
                        <img
                          src="assets/img/icons/search-whites.svg"
                          alt="img"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table datanew">
                <thead>
                  <tr>
                    <th>
                      <label className="checkboxs">
                        <input type="checkbox" id="select-all" />
                        <span className="checkmarks"></span>
                      </label>
                    </th>
                    <th>#</th>
                    <th>Product name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Category Name</th>
                    <th>Current Qty</th>
                    <th>Status</th>
                    <th>Alarm</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {searchTerm
                    ? filteredProducts.map((product) => (
                        <tr>
                          <td>
                            <label class="checkboxs">
                              <input type="checkbox" />
                              <span class="checkmarks"></span>
                            </label>
                          </td>
                          <td>
                            <a href="javascript:void(0);">
                              <img
                                src={`http://127.0.0.1:8000/img/${product.image1}`}
                                alt="product"
                                style={{
                                  maxWidth: "130px",
                                  maxHeight: "130px",
                                }}
                              />
                            </a>
                          </td>
                          <td>
                            <a href="javascript:void(0);">{product.name}</a>
                          </td>

                          <td>{product.description}</td>
                          <td>{product.price} JD</td>
                          <td>{product.category_name}</td>
                          <td>{product.current_qty}</td>
                          <td>
                            {product.status === 1 ? "Active" : "Inactive"}
                          </td>

                          <td>
                            {" "}
                            <Link to={`/stock`}>
                              {" "}
                              <span
                                className={`badges ${
                                  product.current_qty <= product.min_qty
                                    ? "bg-danger"
                                    : "bg-green"
                                }`}
                              >
                                {product.current_qty <= product.min_qty
                                  ? "Low Stock"
                                  : "In Stock"}
                              </span>
                            </Link>
                          </td>
                          <td>
                            <Link
                              to={`/product/show/${product.id}`}
                              class="me-3"
                            >
                              <img src="assets/img/icons/eye.svg" alt="img" />
                            </Link>
                            <Link
                              to={`/product/edit/${product.id}`}
                              class="me-3"
                            >
                              <img src="assets/img/icons/edit.svg" alt="img" />
                            </Link>

                            <a
                              className="me-3 confirm-text"
                              href="javascript:void(0);"
                              onClick={() => handleDelete(product.id)}
                            >
                              <img
                                src="assets/img/icons/delete.svg"
                                alt="img"
                              />
                            </a>
                          </td>
                        </tr>
                      ))
                    : products.map((product) => (
                        <tr>
                          <td>
                            <label class="checkboxs">
                              <input type="checkbox" />
                              <span class="checkmarks"></span>
                            </label>
                          </td>
                          <td>
                            <a href="javascript:void(0);">
                              <img
                                src={`http://127.0.0.1:8000/img/${product.image1}`}
                                alt="product"
                                style={{
                                  maxWidth: "130px",
                                  maxHeight: "130px",
                                }}
                              />
                            </a>
                          </td>
                          <td>
                            <a href="javascript:void(0);">{product.name}</a>
                          </td>

                          <td>{product.description}</td>
                          <td>{product.price} JD</td>
                          <td>{product.category_name}</td>
                          <td>{product.current_qty}</td>
                          <td>
                            {product.status === 1 ? "Active" : "Inactive"}
                          </td>

                          <td>
                            {" "}
                            <Link to={`/stock`}>
                              {" "}
                              <span
                                className={`badges ${
                                  product.current_qty <= product.min_qty
                                    ? "bg-danger"
                                    : "bg-green"
                                }`}
                              >
                                {product.current_qty <= product.min_qty
                                  ? "Low Stock"
                                  : "In Stock"}
                              </span>
                            </Link>
                          </td>
                          <td>
                            <Link
                              to={`/product/show/${product.id}`}
                              class="me-3"
                            >
                              <img src="assets/img/icons/eye.svg" alt="img" />
                            </Link>
                            <Link
                              to={`/product/edit/${product.id}`}
                              class="me-3"
                            >
                              <img src="assets/img/icons/edit.svg" alt="img" />
                            </Link>

                            <a
                              className="me-3 confirm-text"
                              href="javascript:void(0);"
                              onClick={() => handleDelete(product.id)}
                            >
                              <img
                                src="assets/img/icons/delete.svg"
                                alt="img"
                              />
                            </a>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
