import React, { useState } from "react";
import useCompanyActions from "../Hooks/useCompanyActions";
import useUser from "../Hooks/useUser";
import { RequestGet } from "../Interfaces/Request";

const OwnerRequestsPage = () => {
  const { ownerGetSentRequests, declineRequest, acceptRequest } = useCompanyActions();
  const [error, setError] = useState<string>("");
  const [requests, setRequests] = useState<RequestGet[]>([]);
  const [usernames, setUsernames] = useState<Record<string, string>>({});
  const [companyId, setCompanyId] = useState<string>("");
  const { fetchUser } = useUser();

  const loadRequests = async () => {
    setError("");
    try {
      const requestsData: RequestGet[] = await ownerGetSentRequests(companyId);
      setRequests(requestsData);

      const usernamesMap: Record<string, string> = {};
      for (const request of requestsData) {
        const user = await fetchUser(request.sender_id);
        usernamesMap[request.sender_id] = user.username;
      }
      setUsernames(usernamesMap);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to fetch requests.");
      console.error(err.response?.data?.detail || "Error fetching requests:");
    }
  };

  const deleteRequest = async (requestId: string) => {
    setError("");
    try {
      await declineRequest(requestId);
      await loadRequests();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to cancel the request.");
      console.error(err.response?.data?.detail || "Error canceling request:");
    }
  };

  const handleAcceptRequest = async (requestId: string) => {
    setError("");
    try {
      await acceptRequest(requestId);
      await loadRequests();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to accept the request.");
      console.error(err.response?.data?.detail || "Error accepting request:");
    }
  };

  return (
    <div className="requests-page">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        placeholder="Enter your company ID"
        value={companyId}
        onChange={(e) => setCompanyId(e.target.value)}
      />
      <button onClick={loadRequests} disabled={!companyId}>
        Select Your Company ID
      </button>
      <h1>Your Requests</h1>
      {!error && (
        <ul>
          {requests.map((request) => (
            <li key={request.id}>
              <p>
                {usernames[request.sender_id] || "Loading user..."} has requested to join.
              </p>
              <button onClick={() => handleAcceptRequest(request.id)}>Accept Request</button>
              <button onClick={() => deleteRequest(request.id)}>Cancel Request</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OwnerRequestsPage;
