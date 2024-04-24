
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import useAuthenticatedFetch from "../ExtraPages/api";


const CategoryList = () => {
    const authToken = localStorage.getItem('authToken');
    const [category, setCategory] = useState([]);
    const { data: categoriesData, error } = useAuthenticatedFetch("http://127.0.0.1:8000/api/categories");
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this item!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://127.0.0.1:8000/api/categories/${id}`, {
                    headers: {   
                        Authorization: `Bearer ${authToken}`
                    }
                })
                .then(response => {
                    setCategory(category.filter(category => category.id !== id));
                    console.log('Item deleted successfully');
                    Swal.fire(
                        'Deleted!',
                        'Your item has been deleted.',
                        'success'
                    );
                })
                .catch(error => {
                    console.error('Error deleting item:', error);
                    if (error.response && error.response.status === 400) {

                        Swal.fire(
                            'Error!',
                            error.response.data.message,
                            'error'
                        );
                    } else {
  
                        Swal.fire(
                            'Error!',
                            'An error occurred while deleting the item.',
                            'error'
                        );
                    }
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your item is safe :)',
                    'info'
                );
            }
        });
    };
    

      useEffect(() => {
        if (categoriesData) {
            setCategory(categoriesData);
        }
    }, [categoriesData]);

    return (
        <div class="page-wrapper">
            <div className="content">
                <div className="page-header">
                    <div className="page-title">
                        <h4>Product Category list</h4>
                        <h6>View/Search product Category</h6>
                    </div>
                    <div className="page-btn">
                    <Link to="/add" className="btn btn-added">

                            <img src="assets/img/icons/plus.svg" className="me-1" alt="img" />Add Category
                        </Link>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <div className="table-top">
                            <div className="search-set">
                                <div className="search-path">
                                    <a className="btn btn-filter" id="filter_search">
                                        <img src="assets/img/icons/filter.svg" alt="img" />
                                        <span><img src="assets/img/icons/closes.svg" alt="img" /></span>
                                    </a>
                                </div>
                                <div className="search-input">
                                    <a className="btn btn-searchset"><img src="assets/img/icons/search-white.svg" alt="img" /></a>
                                </div>
                            </div>
                            <div className="wordset">
                                <ul>
                                    <li>
                                        <a data-bs-toggle="tooltip" data-bs-placement="top" title="pdf"><img src="assets/img/icons/pdf.svg" alt="img" /></a>
                                    </li>
                                    <li>
                                        <a data-bs-toggle="tooltip" data-bs-placement="top" title="excel"><img src="assets/img/icons/excel.svg" alt="img" /></a>
                                    </li>
                                    <li>
                                        <a data-bs-toggle="tooltip" data-bs-placement="top" title="print"><img src="assets/img/icons/printer.svg" alt="img" /></a>
                                    </li>
                                </ul>
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
                                            <a className="btn btn-filters ms-auto"><img src="assets/img/icons/search-whites.svg" alt="img" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="table-responsive">
                            <table className="table  datanew">
                                <thead>
                                    <tr>
                                        <th>
                                            <label className="checkboxs">
                                                <input type="checkbox" id="select-all" />
                                                <span className="checkmarks"></span>
                                            </label>
                                        </th>
                                        <th>#</th>
                                        <th>Category name</th>
                                        <th>Description</th>
                                        
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {category.map((category) => (                              
<tr>
<td>
<label class="checkboxs">
<input type="checkbox"/>
<span class="checkmarks"></span>
</label>
</td>
<td ><a href="javascript:void(0);">
<img src={`http://127.0.0.1:8000/img/${category.Image}`} alt="product" style={{ maxWidth: '130px', maxHeight: '130px' }}/>
</a></td>
<td >

<a href="javascript:void(0);">{category.Name}</a>
</td>

<td>{category.description}</td>

<td>
<Link to={`/category/edit/${category.id}`} class="me-3">
<img src="assets/img/icons/edit.svg" alt="img"/>
</Link>
   <a className="me-3 confirm-text" href="javascript:void(0);" onClick={() => handleDelete(category.id)}>
<img src="assets/img/icons/delete.svg" alt="img"/>
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
}

export default CategoryList;
