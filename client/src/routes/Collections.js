import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import SingleCollectionComponent from "../components/SingleCollectionComponent";
import {
  getUserCollections,
  addCollection,
  changeCollectionName,
  deleteCollection,
} from "../services/collections";

import { FaPlus } from "react-icons/fa";

const Collections = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editCollection, setEditCollection] = useState(false);
  const [editCollectionName, setEditCollectionName] = useState("");
  const [newCollectionName, setNewCollectionName] = useState("");
  const [editCollectionId, setEditCollectionId] = useState(null);

  useEffect(() => {
    updateCollections();
  }, []);

  const displayModal = () => {
    setShowModal(true);
  };

  const deleteCollectionById = (collectionId) => {
    setLoading(true);
    deleteCollection(collectionId).then(() => {
      updateCollections();
    });
  };

  const updateCollectionById = (collectionId, collectionName) => {
    setEditCollectionName(collectionName);
    setEditCollectionId(collectionId);
    setShowModal(true);
    setEditCollection(true);
  };

  const updateCollections = async () => {
    try {
      const response = await getUserCollections();
      const { collections } = response.data;
      setCollections(collections);
    } catch {
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCollectionForm = (e) => {
    e.preventDefault();
    setLoading(true);
    setShowModal(false);

    addCollection(newCollectionName).then(() => {
      setNewCollectionName("");
      updateCollections();
    });
  };

  const handleEditCollectionForm = (e) => {
    e.preventDefault();
    setLoading(true);
    setShowModal(false);

    changeCollectionName(editCollectionId, editCollectionName).then(() => {
      setEditCollection(false);
      setEditCollectionId(null);
      setEditCollectionName("");
      updateCollections();
    });
  };

  if (loading) {
    return (
      <div className="main-container">
        <Loader />
      </div>
    );
  }

  if (showModal) {
    return (
      <div className="modal-container">
        <div className="modal">
          <form
            className="add-collection-form"
            // TODO:change class name
            onSubmit={
              editCollection
                ? handleEditCollectionForm
                : handleAddCollectionForm
            }
          >
            <input
              autoFocus
              type="text"
              id="newCollectionName"
              name="newCollectionName"
              value={editCollection ? editCollectionName : newCollectionName}
              onChange={(e) => {
                if (editCollection) {
                  setEditCollectionName(e.target.value);
                } else {
                  setNewCollectionName(e.target.value);
                }
              }}
              placeholder="Collection name"
            />
            <button className="form-btn btn">
              {editCollection ? "Save" : "Add"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="main-container">
        <div className="collections-center">
          {collections.map((col) => {
            return (
              <SingleCollectionComponent
                deleteCollectionById={deleteCollectionById}
                updateCollectionById={updateCollectionById}
                key={col._id}
                collection={col}
              />
            );
          })}
          <div className="add-collection" onClick={displayModal}>
            <FaPlus />
            Add a collection
          </div>
        </div>
      </div>
    </>
  );
};

export default Collections;
