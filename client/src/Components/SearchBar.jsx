function SearchBar() {
  return (
    <div className="flex items-center border border-[#B9E018] rounded-2xl px-4 mt-6 py-2 sm:w-1xl md:w-2xl lg:w-3xl xl:w-4xl">
      {/* Search Icon on the left */}
      <svg
        className="w-5 h-5 text-gray-500 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#B9E018"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>

      <input
        type="text"
        placeholder="Search"
        className="flex-1 bg-transparent outline-none text-[#B9E018]"
      />

      {/* Category Dropdown */}
      <select className="ml-4 bg-transparent text-[#B9E01880] border-none outline-none text-center">
        <option value="all">Categories</option>
      </select>
    </div>
  );
}

export default SearchBar;
