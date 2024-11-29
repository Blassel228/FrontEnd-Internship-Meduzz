import React, { useState } from "react";
import useCompany from "../Hooks/useCompany";

interface ModalWindowProps {
  onClose: () => void;
}

const ModalWindow: React.FC<ModalWindowProps> = ({ onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visible, setVisibilityMode] = useState(true);
  const {handleCreate} = useCompany()

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleCreate({ name, description, visible });
      alert("Company created successfully!");
      onClose();
    } catch (error: any) {
      console.error("Error:", error);
      alert(error.response?.data?.detail || "An error occurred.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          <h2>Create Company</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <select
            value={visible ? "true" : "false"}
            onChange={(e) => setVisibilityMode(e.target.value === "true")}
          >
            <option value="true">Public</option>
            <option value="false">Private</option>
          </select>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default ModalWindow;

