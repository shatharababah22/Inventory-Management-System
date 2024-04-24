import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

import html2canvas from "html2canvas";

const Stock = () => {
  const navigate = useNavigate();
  const [stock, setstock] = useState([]);
  const pdfRef = useRef();
  const authToken = localStorage.getItem("authToken");
  const handleDelete = (id) => {
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
          .delete(`http://127.0.0.1:8000/api/stock/${id}`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          })
          .then((response) => {
            setstock(stock.filter((stock) => stock.id !== id));
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
  useEffect(() => {
    if (authToken) {
      axios
        .get("http://127.0.0.1:8000/api/stock", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          setstock(response.data);
        });
    } else {
      navigate("/adminlogin");
    }
  }, []);
  const generatePDF = () => {
    const input = pdfRef.current;

    const tableContentClone = input.cloneNode(true);
    document.body.appendChild(tableContentClone);

    const checkboxes = tableContentClone.querySelectorAll(
      "td input[type='checkbox']"
    );
    checkboxes.forEach((checkbox) => {
      checkbox.parentNode.parentNode.removeChild(checkbox.parentNode);
    });

    const actionColumns = tableContentClone.querySelectorAll(
      " thead th:nth-child(7),  tbody td:nth-child(7)"
    );
    actionColumns.forEach((column) => {
      column.style.display = "none";
    });

    const imageColumnHeader = tableContentClone.querySelector(
      "thead th:nth-child(2)"
    );
    if (imageColumnHeader) {
      imageColumnHeader.style.display = "none";
    }

    const imageColumns = tableContentClone.querySelectorAll(
      "tbody td:nth-child(2)"
    );
    imageColumns.forEach((column) => {
      column.style.display = "none";
    });

    html2canvas(tableContentClone).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "mm", "a4", true);

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - pdfWidth * ratio) / 50;
      const imgY = 5;

      pdf.setFillColor(241, 243, 244);

      pdf.rect(0, 0, pdfWidth, pdfHeight, "F");

      pdf.text("Stock Report:", imgX, imgY + 10);

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY + 40,
        imgWidth * ratio,
        imgHeight * ratio
      );

      pdf.save("Stock.pdf");

      document.body.removeChild(tableContentClone);
    });
  };

  return (
    <div class="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Product stock list</h4>
            <h6>View product stock</h6>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="table-top">
              <div className="search-set">
                <div className="search-path">
                  <a className="btn btn-filter" id="filter_search">
                    <img src="assets/img/icons/filter.svg" alt="img" />
                    <span>
                      <img src="assets/img/icons/closes.svg" alt="img" />
                    </span>
                  </a>
                </div>
                <div className="search-input">
                  <a className="btn btn-searchset">
                    <img src="assets/img/icons/search-white.svg" alt="img" />
                  </a>
                </div>
              </div>
              <div className="wordset">
                <ul>
                  <li>
                    <a
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="pdf"
                      onClick={generatePDF}
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
            </div>

            <div className="table-responsive" ref={pdfRef}>
              <table className="table  datanew">
                <thead>
                  <tr>
                    <th>
                      <label className="checkboxs">
                        <input type="checkbox" id="select-all" />
                        <span className="checkmarks"></span>
                      </label>
                    </th>
                    <th>Product image</th>
                    <th>Product name</th>
                    <th>Current Quantity</th>
                    <th>Max Quantity</th>
                    <th>Min Quantity</th>

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {stock.map((stock) => (
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
                            src={`http://127.0.0.1:8000/img/${stock.product_image}`}
                            alt="product"
                            style={{ maxWidth: "130px", maxHeight: "130px" }}
                          />
                        </a>
                      </td>
                      <td>
                        <a href="javascript:void(0);">{stock.product_name}</a>
                      </td>

                      <td>{stock.current_qty}</td>
                      <td>{stock.max_qty}</td>
                      <td>{stock.min_qty}</td>

                      <td>
                        <Link to={`/stock/edit/${stock.id}`} class="me-3">
                          <img src="assets/img/icons/edit.svg" alt="img" />
                        </Link>
                        <a
                          className="me-3 confirm-text"
                          href="javascript:void(0);"
                          onClick={() => handleDelete(stock.id)}
                        >
                          <img src="assets/img/icons/delete.svg" alt="img" />
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
export default Stock;
