import React, { useState } from 'react';

const AddOrder = () => {


  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Expense Add</h4>
            <h6>Add/Update Expenses</h6>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group">
                  <label>Expense Category</label>
                  <select className="select" name="category" value={expenseData.category} onChange={handleChange}>
                    <option>Choose Category</option>
                    <option>Category</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group">
                  <label>Expense Date </label>
                  <div className="input-groupicon">
                    <input type="text" placeholder="Choose Date" className="datetimepicker" name="date" value={expenseData.date} onChange={handleChange} />
                    <div className="addonset">
                      <img src="assets/img/icons/calendars.svg" alt="img" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group">
                  <label>Amount</label>
                  <div className="input-groupicon">
                    <input type="text" name="amount" value={expenseData.amount} onChange={handleChange} />
                    <div className="addonset">
                      <img src="assets/img/icons/dollar.svg" alt="img" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group">
                  <label>Reference No.</label>
                  <input type="text" name="referenceNo" value={expenseData.referenceNo} onChange={handleChange} />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Expense for</label>
                  <input type="text" name="expenseFor" value={expenseData.expenseFor} onChange={handleChange} />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Description</label>
                  <textarea className="form-control" name="description" value={expenseData.description} onChange={handleChange}></textarea>
                </div>
              </div>
              <div className="col-lg-12">
                <a href="javascript:void(0);" className="btn btn-submit me-2" onClick={handleSubmit}>Submit</a>
                <a href="expenselist.html" className="btn btn-cancel">Cancel</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrder;
