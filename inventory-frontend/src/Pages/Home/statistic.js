


const Statistics = () => {


  return (
    <div className="row">
      <div className="col-lg-3 col-sm-6 col-12 d-flex">
        <div className="dash-count">
          <div className="dash-counts">
            <h4>100</h4>
            <h5>Customers</h5>
          </div>
          <div className="dash-imgs">
            <i data-feather="user"></i>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-sm-6 col-12 d-flex">
        <div className="dash-count das1">
          <div className="dash-counts">
            <h4>100</h4>
            <h5>Suppliers</h5>
          </div>
          <div className="dash-imgs">
            <i data-feather="user-check"></i>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-sm-6 col-12 d-flex">
        <div className="dash-count das2">
          <div className="dash-counts">
            <h4>100</h4>
            <h5>Purchase Invoice</h5>
          </div>
          <div className="dash-imgs">
            <i data-feather="file-text"></i>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-sm-6 col-12 d-flex">
        <div className="dash-count das3">
          <div className="dash-counts">
            <h4>105</h4>
            <h5>Sales Invoice</h5>
          </div>
          <div className="dash-imgs">
            <i data-feather="file"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
