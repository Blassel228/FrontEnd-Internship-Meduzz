import React, { useState } from "react";
import useCompanyActions from "../Hooks/useCompanyActions";
import Invitation from "../Interfaces/Invitation";

const InvitationsPage = () => {
  const { fetchInvitations, declineInvitation, acceptInvitation, loading } =
    useCompanyActions();
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [companyId, setCompanyId] = useState<string>("");
  const [error, setError] = useState<string>("");

  const loadInvitations = async () => {
    if (!companyId) return;

    try {
      const invitationsData: Invitation[] = await fetchInvitations();
      setInvitations(invitationsData);
      setError("");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to load invitations.");
      console.error("Error fetching invitations:", err);
    }
  };

  const handleAcceptInvitation = async (invitationId: string | undefined) => {
    if (!invitationId) return;

    try {
      await acceptInvitation(invitationId);
      const data = await fetchInvitations();
      setInvitations(data);
      setError("");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Error accepting invitation.");
      console.error(err.response?.data?.detail || "Error accepting invitation:", err);
    }
  };

  const handleDeclineInvitation = async (invitationId: string | undefined) => {
    if (!invitationId) return;

    try {
      await declineInvitation(invitationId);
      const data = await fetchInvitations();
      setInvitations(data);
      setError("");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Error declining invitation.");
      console.error(err.response?.data?.detail || "Error declining invitation:", err);
    }
  };

  if (loading) {
    return <div>Loading invitations...</div>;
  }

  return (
    <div className="invitations-page">
      <input
        placeholder="Set your company ID"
        value={companyId}
        onChange={(e) => setCompanyId(e.target.value)}
      />
      <button onClick={loadInvitations} disabled={companyId === ""}>
        Load Invitations
      </button>

      <h2>Invitations</h2>

      <ul>
        {invitations.map((invitation) => (
          <li key={invitation.id}>
            <p>{invitation.invitation_text || "No invitation text available."}</p>
            <button onClick={() => handleAcceptInvitation(invitation.id)}>Accept</button>
            <button onClick={() => handleDeclineInvitation(invitation.id)}>Decline</button>
          </li>
        ))}
      </ul>

      {error && <p className="error">{error}</p>}

    </div>
  );
};

export default InvitationsPage;
