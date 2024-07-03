import React from 'react';
import { Search } from 'lucide-react';

const Navbar = () => {
    return (
        <div className="navbar-container">
            <p className="greeting">Hello Evan <span role="img" aria-label="wave">👋</span>,</p>
            <SearchBar />
        </div>
    );
};

const SearchBar = () => {
    return (
        <div className="search">
            <Search className="search-icon" />
            <input type="text" placeholder="Search" />
        </div>
    );
};

export default Navbar;
