import React, { useState } from "react";
import CommonTable from "../components/Table/CommonTable";

function Home() {
  const columns = ["Product Name", "Brand", "Category", "Price", "Stock"];

  const initialData = [
    { product_name: "iPhone 15", brand: "Apple", category: "Smartphone", price: "$999", stock: "Available" },
    { product_name: "Samsung Galaxy S23", brand: "Samsung", category: "Smartphone", price: "$899", stock: "Available" },
    { product_name: "Dell XPS 13", brand: "Dell", category: "Laptop", price: "$1299", stock: "Out of Stock" },
    { product_name: "Sony WH-1000XM5", brand: "Sony", category: "Headphones", price: "$399", stock: "Available" },
    { product_name: "iPad Air", brand: "Apple", category: "Tablet", price: "$599", stock: "Available" },
    { product_name: "Lenovo Legion 5", brand: "Lenovo", category: "Gaming Laptop", price: "$1099", stock: "Limited Stock" },
    { product_name: "Google Pixel 8", brand: "Google", category: "Smartphone", price: "$699", stock: "Available" },
    { product_name: "Bose QuietComfort 45", brand: "Bose", category: "Headphones", price: "$329", stock: "Available" },
    { product_name: "Asus ROG Zephyrus G14", brand: "Asus", category: "Gaming Laptop", price: "$1499", stock: "Available" },
    { product_name: "Amazon Echo Dot", brand: "Amazon", category: "Smart Home", price: "$49", stock: "Available" },
    { product_name: "Apple Watch Series 9", brand: "Apple", category: "Wearable", price: "$499", stock: "Available" },
    { product_name: "DJI Mini 3 Pro", brand: "DJI", category: "Drone", price: "$759", stock: "Limited Stock" },
    { product_name: "Canon EOS R5", brand: "Canon", category: "Camera", price: "$3899", stock: "Limited Stock" },
    { product_name: "GoPro HERO12", brand: "GoPro", category: "Action Camera", price: "$499", stock: "Available" },
    { product_name: "Samsung QN90B", brand: "Samsung", category: "Television", price: "$1899", stock: "Out of Stock" },
    { product_name: "Sony A7 IV", brand: "Sony", category: "Camera", price: "$2499", stock: "Available" },
  ];

  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [data, setData] = useState(initialData);

  // Handle search filter
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);

    const filteredData = initialData.filter(
      (item) =>
        item.product_name.toLowerCase().includes(searchTerm) ||
        item.brand.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
    );
    setData(filteredData);
  };

  // Handle sorting
  const handleSort = (e) => {
    const sortValue = e.target.value;
    setSortKey(sortValue);

    let sortedData = [...data];

    switch (sortValue) {
      case "name":
        sortedData.sort((a, b) => a.product_name.localeCompare(b.product_name));
        break;
      case "brand":
        sortedData.sort((a, b) => a.brand.localeCompare(b.brand));
        break;
      case "price":
        sortedData.sort((a, b) => {
          const priceA = parseFloat(a.price.replace("$", ""));
          const priceB = parseFloat(b.price.replace("$", ""));
          return priceA - priceB;
        });
        break;
      case "stock":
        sortedData.sort((a, b) => a.stock.localeCompare(b.stock));
        break;
      default:
        break;
    }

    setData(sortedData);
  };

  return (
    <div className="p-6">
      {/* Search and Filter Controls */}
      <div className="flex justify-between mb-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by Product, Brand, or Category..."
          value={search}
          onChange={handleSearch}
          className="border p-2 rounded-md w-2/3"
        />

        {/* Sort Dropdown */}
        <select
          value={sortKey}
          onChange={handleSort}
          className="border p-2 rounded-md w-1/4"
        >
          <option value="">Sort by</option>
          <option value="name">Product Name</option>
          <option value="brand">Brand</option>
          <option value="price">Price</option>
          <option value="stock">Stock</option>
        </select>
      </div>

      {/* Table with pagination */}
      <CommonTable columns={columns} data={data} itemsPerPage={6} />
    </div>
  );
}

export default Home;
