import reducer from '../reducer/ProductReducer';
import { createContext, useContext, useEffect, useReducer } from "react";
import itemsData from '../config/itemsData';

// Create the context
const AppContext = createContext();

// Initial state for product-related data
const initialState = {
    isLoading: false,
    isError: false,
    products: [], // Ensure consistency with this key
    featureProducts: [],
    isSingleLoading: false,
    singleProduct: []
}

// Provider component for providing product-related data
const AppProvider = ({ children }) => {
    // Reducer to manage state
    const [state, dispatch] = useReducer(reducer, initialState);

    // Function to load products from local data
    const getProducts = () => {
        dispatch({ type: "SET_LOADING" });
        try {
            // Use local data instead of API
            const products = itemsData;
            const featureProducts = products.filter(product => product.featured).slice(0, 3);
            
            dispatch({ type: "SET_API_DATA", payload: products });
            dispatch({ type: "SET_FEATURE_PRODUCTS", payload: featureProducts });
        } catch (error) {
            dispatch({ type: "API_ERROR" });
        }
    };

    // Function to get a single product by ID
    const getSingleProduct = (productId) => {
        dispatch({ type: "SET_SINGLE_LOADING" });
        try {
            // Find product in local data
            const singleProduct = itemsData.find(product => product.product_id === parseInt(productId));
            if (singleProduct) {
                dispatch({ type: "SET_SINGLE_DATA", payload: singleProduct });
            } else {
                dispatch({ type: "SINGLE_ERROR" });
            }
        } catch (error) {
            dispatch({ type: "SINGLE_ERROR" });
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <AppContext.Provider value={{ ...state, getSingleProduct }}>
            {children}
        </AppContext.Provider>
    );
}

// Custom hook to access product-related data
const useProductContext = () => {
    return useContext(AppContext);
}

export { AppProvider, AppContext, useProductContext };
