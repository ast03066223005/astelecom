import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import Logo from './Logo'

function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const location = useLocation();

    // Sync search bar with URL parameters
    useEffect(() => {
        const urlSearchQuery = searchParams.get('search');
        if (urlSearchQuery) {
            setSearchQuery(urlSearchQuery);
        } else {
            setSearchQuery('');
        }
    }, [searchParams]);

    // Handle scroll effect for glass morphism
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    const handleSearch = (e) => {
        e.preventDefault();
        setShowMobileSearch(false);
        const trimmedQuery = searchQuery.trim();
        
        if (trimmedQuery) {
            // Check if we're on a product page
            const isProductPage = location.pathname.startsWith('/product/');
            
            if (isProductPage) {
                // If on product page, add search parameter to current URL
                const currentPath = location.pathname;
                navigate(`${currentPath}?search=${encodeURIComponent(trimmedQuery)}`);
            } else {
                // If on home page, navigate to home with search parameter
                navigate(`/?search=${encodeURIComponent(trimmedQuery)}`);
                // Scroll to store section after navigation
                setTimeout(() => {
                    const storeSection = document.getElementById('store');
                    if (storeSection) {
                        storeSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            }
        } else {
            // If search is empty, navigate to home without search params
            navigate('/');
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    }

    const clearSearch = () => {
        setSearchQuery('');
        navigate('/');
    }
    return (
        <>
            <div id='/' className={`w-screen sticky top-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-primary text-white  backdrop-blur-xl shadow-lg border-b border-white/20 py-1'
                    : 'bg-gray-100 backdrop-blur-md py-2'
                }`}>
                <nav className='container mx-auto flex flex-row justify-between gap-6 px-4 flex-wrap items-center'>
                    <ul className=' col-span-1 flex items-center'>
                        <li>
                            <Logo textSize="xl" text="Abdulrehman Sapra Telecom" fill={isScrolled ? 'white' : 'black'} className={` transition-colors duration-200 ${isScrolled
                                    ? 'text-white hover:text-gray-200 '
                                    : 'text-gray-800 hover:text-primary'
                                }`} />
                        </li>
                    </ul>

                    {/* Search Bar - always visible on md+, hidden on mobile unless toggled */}
                    <div className=' flex-1 max-w-2xl mx-4 hidden md:block'>
                        <form onSubmit={handleSearch} className="relative">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className={`w-full px-4 py-2 pl-10 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 ${isScrolled
                                            ? 'bg-white backdrop-blur-sm border border-gray-100/40 text-xs'
                                            : 'bg-white border border-gray-100 text-sm'
                                        } ${searchQuery ? 'pr-16' : 'pr-12'}`}
                                />
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <i className="fa-solid fa-search text-gray-400"></i>
                                </div>

                                {/* Clear button - only show when there's text */}
                                {searchQuery && (
                                    <button
                                        aria-label="Clear search"
                                        type="button"
                                        onClick={clearSearch}
                                        className="absolute inset-y-0 right-8 flex items-center pr-3 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <i className="fa-solid fa-times"></i>
                                    </button>
                                )}

                                {/* Search button */}
                                <button
                                    aria-label="Search"
                                    type="submit"
                                    className={`rounded-r-lg absolute inset-y-0 right-0 flex items-center px-3 ${isScrolled
                                        ? 'bg-primary text-white hover:text-gray-200 backdrop-blur-sm border-2 border-gray-100 text-xs'
                                        : 'bg-primary text-white hover:text-gray-200 border border-gray-100 text-sm'
                                    }`}
                                >
                                    <i className="fa-solid fa-arrow-right"></i>
                                </button>
                            </div>
                        </form>
                    </div>



                    {/* Contact Icon - always visible on all screens */}
                    <ul className='order-3 flex justify-end items-center gap-2'>
                        <button
                            aria-label="Open search"
                            className={` px-2 py-2 rounded-lg transition-colors duration-200 md:hidden ${isScrolled
                                ? 'text-white hover:text-gray-200 '
                                : 'text-gray-800 hover:text-primary'
                            }`}
                            onClick={() => setShowMobileSearch(true)}
                        >
                            <i className="fa-solid fa-search text-xl"></i>
                        </button>
                        <a href='#store'>
                            <button
                                aria-label="Store "
                                className={` px-2 py-2 rounded-lg transition-colors duration-200 ${isScrolled
                                    ? 'text-white hover:text-gray-200 '
                                    : 'text-gray-800 hover:text-primary'
                                }`}
                            >
                                <i className="fa-solid fa-bag-shopping text-xl"></i>
                            </button>
                        </a>
                    </ul>

                </nav>
                {showMobileSearch && (
                    <div className="relative top-0 left-0 w-full z-[100] bg-white/90 backdrop-blur-lg shadow-lg px-4 py-3 flex items-center animate-fade-in-down">
                        <form onSubmit={handleSearch} className="relative flex-1">
                            <input
                                aria-label="Search products..."
                                id="search"
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                autoFocus
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="w-full px-4 py-2 pl-10 pr-20 text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 bg-white"
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <i className="fa-solid fa-search text-gray-400"></i>
                            </div>
                            {/* Clear button */}
                            {searchQuery && (
                                <button
                                    aria-label="Clear search"
                                    type="button"
                                    onClick={clearSearch}
                                    className="absolute inset-y-0 right-12 flex items-center pr-3 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <i className="fa-solid fa-times"></i>
                                </button>
                            )}
                            {/* Search button */}
                            <button
                                aria-label="Search"
                                type="submit"
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-primary"
                            >
                                <i className="fa-solid fa-arrow-right"></i>
                            </button>
                        </form>
                        <button
                            aria-label="Close search"
                            id="close-search"
                            className="ml-2 text-gray-500 hover:text-red-500 text-2xl"
                            onClick={() => setShowMobileSearch(false)}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                )}
            </div>
            {/* Mobile search bar, full width, appears at bottom of header when search icon is clicked */}
        </>
    )
}

export default Header;
