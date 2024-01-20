import React, { useState } from "react";
import { useFirebase } from "../context/Firebase";

export default function List() {
  const firebase = useFirebase();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [distributer, setdistributer] = useState("");
  const [contact, setContact] = useState("");
  const [price, setPrice] = useState("");
  const [coverPic, setCoverPic] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.handleCreateNewListing(
      name,
      description,
      distributer,
      contact,
      price,
      coverPic
    );
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            placeholder="Enter Product Details"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Product Description</label>
          <textarea
            placeholder="Enter Product Description"
            className="form-control"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            rows="4" // Set the number of visible rows
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Distributer Details</label>
          <input
            type="text"
            placeholder="Enter Distributer Details"
            className="form-control"
            onChange={(e) => setdistributer(e.target.value)}
            value={distributer}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Distributer Contact</label>
          <input
            type="number"
            placeholder="Contact"
            className="form-control"
            onChange={(e) => setContact(e.target.value)}
            value={contact}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="text"
            placeholder="Enter Price"
            className="form-control"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Add Cover picture</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setCoverPic(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}
