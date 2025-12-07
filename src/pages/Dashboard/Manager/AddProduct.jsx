import React, { useState } from 'react';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add product logic
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Add Product</h2>
      <form onSubmit={handleSubmit} className="form-control mt-6">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          className="input input-bordered"
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="input input-bordered mt-4"
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered mt-4"
          onChange={handleChange}
        ></textarea>
        <button type="submit" className="btn btn-primary mt-4">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
