import React, { useState, useEffect } from "react";
import CommonTable from "../components/Table/CommonTable";

const API_URL = "https://jsonplaceholder.typicode.com/posts"; 

function Home() {
  const columns = ["ID", "Title", "Description"];

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Fetch data from API
    fetch(API_URL)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setFilteredData(result);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle search filter
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);

    const filtered = data.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.body.toLowerCase().includes(searchTerm)
    );

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  // Handle sorting
  const handleSort = (e) => {
    const sortValue = e.target.value;
    setSortKey(sortValue);

    let sortedData = [...filteredData];

    switch (sortValue) {
      case "id":
        sortedData.sort((a, b) => a.id - b.id);
        break;
      case "title":
        sortedData.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setFilteredData(sortedData);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Search and Filter Controls */}
      <div className="bg-white shadow-lg p-4 rounded-lg mb-6">
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="🔍 Search by Title or Description..."
            value={search}
            onChange={handleSearch}
            className="border border-gray-300 p-3 rounded-lg w-full md:w-2/3 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
          />

          {/* Sort Dropdown */}
          <select
            value={sortKey}
            onChange={handleSort}
            className="border border-gray-300 p-3 rounded-lg w-full md:w-1/4 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm cursor-pointer"
          >
            <option value="">Sort by</option>
            <option value="id">🔢 ID</option>
            <option value="title">🔤 Title</option>
          </select>
        </div>
      </div>

      {/* Table with pagination */}
      <div className="bg-white shadow-lg p-6 rounded-lg">
        <CommonTable
          columns={columns}
          data={filteredData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
}

export default Home;
