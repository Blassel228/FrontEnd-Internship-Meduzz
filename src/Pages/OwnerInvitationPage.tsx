import React, { useState } from "react";
import useCompanyActions from "../Hooks/useCompanyActions";
import { InvitationGet } from "../Interfaces/Invitation";

const OwnerInvitationsPage = () => {
  const {
    ownerFetchInvitations,
    cancelInvitation,
    sendInvitation,
  } = useCompanyActions();

  const [invitations, setInvitations] = useState<InvitationGet[]>([]);
  const [companyId, setCompanyId] = useState<string>("");
  const [invitationData, setInvitationData] = useState({
    company_id: "",
    recipient_id: "",
    invitation_text: "",
  });
  const [error, setError] = useState<string>("");

  const loadInvitations = async () => {
    if (!companyId) return;

    try {
      const invitationsData: InvitationGet[] = await ownerFetchInvitations(companyId);
      setInvitations(invitationsData);
    } catch (err) {
      setError("Error fetching invitations.");
      console.error("Error fetching invitations:", err);
    }
  };

  const handleCancelInvitation = async (invitationId: string) => {
    try {
      await cancelInvitation(invitationId);
      const invitationsData = await ownerFetchInvitations(companyId);
      setInvitations(invitationsData);
    } catch (err) {
      setError("Error declining invitation.");
      console.error("Error declining invitation:", err);
    }
  };

  const handleSendInvitation = async (event: React.FormEvent) => {
    event.preventDefault();

    const { company_id, recipient_id, invitation_text } = invitationData;
    if (!company_id || !recipient_id || !invitation_text) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await sendInvitation({ company_id, recipient_id, invitation_text });
      setInvitationData({ company_id: "", recipient_id: "", invitation_text: "" });
      const updatedInvitations = await ownerFetchInvitations(companyId);
      setInvitations(updatedInvitations);
    } catch (err) {
      setError("Error sending invitation.");
      console.error("Error sending invitation:", err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvitationData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="invitations-page">
      <input
        placeholder="Set your company ID"
        value={companyId}
        onChange={(e) => setCompanyId(e.target.value)}
      />
      <button onClick={loadInvitations} disabled={companyId === ""}>
        Select Your Company ID
      </button>
      <h1>Invitations</h1>
      {error && <p className="error-message">{error}</p>}
      <ul>
        {invitations.map((invitation) => (
          <li key={invitation.id}>
            <p>{invitation.invitation_text || "No invitation text."}</p>
            <button onClick={() => handleCancelInvitation(invitation.id)}>Cancel Invitation</button>
          </li>
        ))}
      </ul>

      <h2>Send Invitation</h2>
      <form onSubmit={handleSendInvitation}>
        <div>
          <label>Company ID:</label>
          <input
            type="text"
            name="company_id"
            value={invitationData.company_id}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Recipient ID:</label>
          <input
            type="text"
            name="recipient_id"
            value={invitationData.recipient_id}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Invitation Text:</label>
          <input
            type="text"
            name="invitation_text"
            value={invitationData.invitation_text}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Send Invitation</button>
      </form>
    </div>
  );
};

export default OwnerInvitationsPage;
