import React, { useState } from "react";
import ModalWindow from "../Components/ModalWindow";
import useCompany from "../Hooks/useCompany";

const CompanyPage = () => {
  const [companyId, setCompanyId] = useState<number | string>("");

  const { company, setCompany, loading, error, handleUpdate, handleDelete, fetchCompany } = useCompany();

  const [isModalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  return (
    <div>
      <h1>{editMode ? "Edit Company" : "Company Details"}</h1>

      {loading && <p>Loading...</p>}

      <input
        type="text"
        value={companyId}
        onChange={(e) => setCompanyId(e.target.value)}
        placeholder="Enter Company ID"
      />
      <button onClick={() => fetchCompany(companyId)}>Fetch Company</button>

      <button onClick={() => setModalOpen(true)}>Create Company</button>
      {isModalOpen && <ModalWindow onClose={() => setModalOpen(false)} />}

      {editMode ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (company) {
              handleUpdate(companyId, {
                name: company.name,
                description: company.description,
                visible: company.visible,
              });
            }
          }}
        >
          <input
            type="text"
            value={company?.name || ""}
            onChange={(e) =>
              company && setCompany({ ...company, name: e.target.value })
            }
            placeholder="Name"
          />
          <textarea
            value={company?.description || ""}
            onChange={(e) =>
              company && setCompany({ ...company, description: e.target.value })
            }
            placeholder="Description"
          />
          <select
            value={company?.visible ? "true" : "false"}
            onChange={(e) =>
              company &&
              setCompany({
                ...company,
                visible: e.target.value === "true",
              })
            }
          >
            <option value="true">Public</option>
            <option value="false">Private</option>
          </select>

          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setEditMode(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <p>
            <strong>Name:</strong> {company?.name}
          </p>
          <p>
            <strong>Description:</strong> {company?.description}
          </p>
          <p>
            <strong>Visibility:</strong>{" "}
            {company?.visible ? "Public" : !company?.visible ? "Private" : ""}
          </p>

          <button onClick={() => setEditMode(true)}>Edit</button>
          <button
            onClick={() => handleDelete(companyId)}
            style={{ color: "red" }}
          >
            Delete Company
          </button>
        </div>
      )}
         {error && (
        <div style={{ color: "red", marginBottom: "16px" }}>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default CompanyPage;
