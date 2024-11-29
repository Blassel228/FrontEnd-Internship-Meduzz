import React, { useState } from "react";
import useCompanyActions from "../Hooks/useCompanyActions";
import useUser from "../Hooks/useUser";
import { RequestGet } from "../Interfaces/Request";

const UserRequestsPage = () => {
  const { fetchUserRequests, cancelRequest, sendJoinRequest} = useCompanyActions();
  const [requests, setRequests] = useState<RequestGet[]>([]);
  const [usernames, setUsernames] = useState<Record<string, string>>({});
  const [companyId, setCompanyId] = useState<string>("");
  const [error, setError] = useState("");
  const [requestText, setRequestText] = useState<string>("");
  const { fetchUser } = useUser();

  const loadRequests = async () => {
    if (!companyId) return;

    try {
      const requestsData: RequestGet[] = await fetchUserRequests();
      setRequests(requestsData);

      const usernamesMap: Record<string, string> = {};
      for (const request of requestsData) {
        const user = await fetchUser(request.sender_id);
        usernamesMap[request.sender_id] = user.username;
      }
      setUsernames(usernamesMap);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to accept the request.");
      console.error("Error fetching requests:", err);
    }
  };

  const deleteRequest = async (requestId: string) => {
    try {
      await cancelRequest(requestId);
      const data = await fetchUserRequests();
      setRequests(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to accept the request.");
      console.error(err.response?.data?.detail || "Error declining request:", err);
    }
  };

  const handleSendRequest = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!requestText) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await sendJoinRequest({ request_text: requestText, company_id: companyId });
      setRequestText("");
      await loadRequests();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to accept the request.");
      console.error(err.response?.data?.detail || "Error accepting invitation:", err);
    }
  };

  return (
    <div className="requests-page">
      <input
        placeholder="Set your company ID"
        value={companyId}
        onChange={(e) => setCompanyId(e.target.value)}
      />
      <button onClick={loadRequests} disabled={companyId === ""}>
        Load Requests
      </button>

      <h1>Join Requests</h1>

      <form onSubmit={handleSendRequest}>
        <textarea
          placeholder="Request Text"
          value={requestText}
          onChange={(e) => setRequestText(e.target.value)}
        />
        <button type="submit">Send Request</button>
      </form>

      <ul>
        {requests.map((request) => (
          <li key={request.id}>
            <p>{usernames[request.sender_id] || "Loading user..."} has requested to join.</p>
            <button onClick={() => deleteRequest(request.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default UserRequestsPage;
