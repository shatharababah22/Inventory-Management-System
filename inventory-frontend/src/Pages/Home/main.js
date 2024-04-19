import React from 'react';
import Statistics from './statistic';

const Main = () => {
  return (
    <div className="page-wrapper">
      <div className="content">
        <Statistics />
        <div className="row">
          <div className="col-lg-7 col-sm-12 col-12 d-flex">
            <div className="card flex-fill">
              <div className="card-header pb-0 d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Purchase & Sales</h5>
                <div className="graph-sets">
                  <ul>
                    <li>
                      <span>Sales</span>
                    </li>
                    <li>
                      <span>Purchase</span>
                    </li>
                  </ul>
                  <div className="dropdown">
                    <button className="btn btn-white btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                      2022 <img src="assets/img/icons/dropdown.svg" alt="img" className="ms-2" />
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <li>
                        <a href="javascript:void(0);" className="dropdown-item">2022</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);" className="dropdown-item">2021</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);" className="dropdown-item">2020</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div id="sales_charts"></div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-sm-12 col-12 d-flex">
            <div className="card flex-fill">
              <div className="card-header pb-0 d-flex justify-content-between align-items-center">
                <h4 className="card-title mb-0">Recently Added Products</h4>
                <div className="dropdown">
                  <a href="javascript:void(0);" data-bs-toggle="dropdown" aria-expanded="false" className="dropset">
                    <i className="fa fa-ellipsis-v"></i>
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li>
                      <a href="productlist.html" className="dropdown-item">Product List</a>
                    </li>
                    <li>
                      <a href="addproduct.html" className="dropdown-item">Product Add</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive dataview">
                  <table className="table datatable">
                    <thead>
                      <tr>
                        <th>Sno</th>
                        <th>Products</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td className="productimgname">
                          <a href="productlist.html" className="product-img">
                            <img src="assets/img/product/product22.jpg" alt="product" />
                          </a>
                          <a href="productlist.html">Apple Earpods</a>
                        </td>
                        <td>$891.2</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td className="productimgname">
                          <a href="productlist.html" className="product-img">
                            <img src="assets/img/product/product23.jpg" alt="product" />
                          </a>
                          <a href="productlist.html">iPhone 11</a>
                        </td>
                        <td>$668.51</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td className="productimgname">
                          <a href="productlist.html" className="product-img">
                            <img src="assets/img/product/product24.jpg" alt="product" />
                          </a>
                          <a href="productlist.html">Samsung</a>
                        </td>
                        <td>$522.29</td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td className="productimgname">
                          <a href="productlist.html" className="product-img">
                            <img src="assets/img/product/product6.jpg" alt="product" />
                          </a>
                          <a href="productlist.html">Macbook Pro</a>
                        </td>
                        <td>$291.01</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-0">
          <div className="card-body">
            <h4 className="card-title">Expired Products</h4>
            <div className="table-responsive dataview">
              <table className="table datatable">
                <thead>
                  <tr>
                    <th>SNo</th>
                    <th>Product Code</th>
                    <th>Product Name</th>
                    <th>Brand Name</th>
                    <th>Category Name</th>
                    <th>Expiry Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td><a href="javascript:void(0);">IT0001</a></td>
                    <td className="productimgname">
                      <a className="product-img" href="productlist.html">
                        <img src="assets/img/product/product2.jpg" alt="product" />
                      </a>
                      <a href="productlist.html">Orange</a>
                    </td>
                    <td>N/D</td>
                    <td>Fruits</td>
                    <td>12-12-2022</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td><a href="javascript:void(0);">IT0002</a></td>
                    <td className="productimgname">
                      <a className="product-img" href="productlist.html">
                        <img src="assets/img/product/product3.jpg" alt="product" />
                      </a>
                      <a href="productlist.html">Pineapple</a>
                    </td>
                    <td>N/D</td>
                    <td>Fruits</td>
                    <td>25-11-2022</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td><a href="javascript:void(0);">IT0003</a></td>
                    <td className="productimgname">
                      <a className="product-img" href="productlist.html">
                        <img src="assets/img/product/product4.jpg" alt="product" />
                      </a>
                      <a href="productlist.html">Strawberry</a>
                    </td>
                    <td>N/D</td>
                    <td>Fruits</td>
                    <td>19-11-2022</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td><a href="javascript:void(0);">IT0004</a></td>
                    <td className="productimgname">
                      <a className="product-img" href="productlist.html">
                        <img src="assets/img/product/product5.jpg" alt="product" />
                      </a>
                      <a href="productlist.html">Avocado</a>
                    </td>
                    <td>N/D</td>
                    <td>Fruits</td>
                    <td>20-11-2022</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;