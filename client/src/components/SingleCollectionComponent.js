import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";

const SingleCollectionComponent = ({
  collection,
  deleteCollectionById,
  updateCollectionById,
}) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate(collection._id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteCollectionById(collection._id);
  };

  const handleUpdate = (e) => {
    e.stopPropagation();
    updateCollectionById(collection._id, collection.name);
  };

  return (
    <div className="single-collection" onClick={handleClick}>
      <div className="single-collection-name">{collection.name}</div>
      <div className="single-collection-buttons">
        <div className="edit-btn" onClick={handleUpdate}>
          <MdEdit className="icon-btn" />
        </div>
        <div className="delete-btn" onClick={handleDelete}>
          <MdDelete className="icon-btn" />
        </div>
      </div>
    </div>
  );
};

export default SingleCollectionComponent;
