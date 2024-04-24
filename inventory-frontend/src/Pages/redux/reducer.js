import { FILTER_DATA } from "./action";
import axios from 'axios';

const initialState = {
  data: [], // Initialize data as empty array
  filteredData: [], // Initialize filteredData as empty array
};

const token = localStorage.getItem('authToken');
// Fetch data asynchronously
axios.get('http://127.0.0.1:8000/api/products', {
  headers: {
    Authorization: `Bearer ${token}`,
  }
})
.then(response => {
  // Once data is fetched, update the state with it
  initialState.data = response.data;
})
.catch(error => {
  console.error("Error fetching data:", error);
});

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_DATA:
      const searchTerm = action.payload.toLowerCase();
      const filteredData = state.data.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
      );
      return {
        ...state,
        filteredData, // Update filteredData state
      };
    default:
      return state;
  }
};

export default dataReducer;
