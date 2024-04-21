import React, { useState } from "react";

const AddOrder = () => {
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Add Order</h4>
            <h6>Create new order</h6>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <div className="row">
                <div className="col-lg-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Product</label>
                    <select
                      name="product_id"
                      className="form-control"
                      value={productID}
                      onChange={(e) => setProductID(e.target.value)}
                      required
                    >
                      <option value="">Select product</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-lg-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Custumer</label>
                    <select
                      name="product_id"
                      className="form-control"
                      value={CustumerID}
                      onChange={(e) => setCustumerID(e.target.value)}
                      required
                    >
                      <option value="">Select Custumer</option>
                      {buyers.map((buyer) => (
                        <option key={buyer.id} value={buyer.id}>
                          {buyer.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-lg-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Payment method</label>
                    <select
                      name="buyer_id"
                      className="form-control"
                      value={PaymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      required
                    >
                      <option value="">Select Custumer</option>
                      {payment_methods.map((payment_method) => (
                        <option key={payment_method.id} value={payment_method.id}>
                          {buyer.payment_type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>



                <div className="col-lg-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Price</label>
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

            

           

                <div className="col-lg-12">
                  <button type="submit" className="btn btn-submit me-2">
                    Submit
                  </button>
                  <button type="button" className="btn btn-cancel">
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrder;
