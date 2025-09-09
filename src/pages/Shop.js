import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useFilterContext } from '../context/FilterContext'
import ProductList from './pageComponents/shopComponents/ProductList';
import Sort from './pageComponents/shopComponents/Sort';
import FilterSection from './pageComponents/shopComponents/FilterSection';

function Shop() {
  const [searchParams] = useSearchParams();
  const { updateFilterValue } = useFilterContext();

  useEffect(() => {
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      // Create a synthetic event to update the text filter
      const syntheticEvent = {
        target: {
          name: 'text',
          value: searchQuery
        }
      };
      updateFilterValue(syntheticEvent);
    }
  }, [searchParams, updateFilterValue]);

  const searchQuery = searchParams.get('search');

  return (
    <>
      {/* Search Results Header */}
      {searchQuery && (
        <div className="container mx-auto px-4 py-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-blue-800">
              Search Results for: "{searchQuery}"
            </h2>
            <p className="text-blue-600 text-sm mt-1">
              Showing products matching your search criteria
            </p>
          </div>
        </div>
      )}

      <Sort />    

      <div className='container mx-auto px-4 md:p-4 flex flex-col md:flex-row transition-all ease-linear duration-300'>
        <FilterSection />
        <ProductList />
      </div>
    </>
  )
}

export default Shop


