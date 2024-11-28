import React, { useState } from "react";
import useCompanyActions from "../Hooks/useCompanyActions";
import useUser from "../Hooks/useUser";
import { MemberGet } from "../Interfaces/Member";

const CompanyMembersPage = () => {
  const {
    fetchCompanyMembers,
    removeCompanyMember,
    leaveCompany
  } = useCompanyActions();
  const [members, setMembers] = useState<MemberGet[]>([]);
  const [usernames, setUsernames] = useState<Record<string, string>>({});
  const [companyId, setCompanyId] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { fetchUser } = useUser();

  const loadMembers = async () => {
    if (!companyId) return;

    try {
      const membersData: MemberGet[] = await fetchCompanyMembers(companyId);
      setMembers(membersData);

      const usernamesMap: Record<string, string> = {};
      for (const member of membersData) {
        const user = await fetchUser(member.id);
         usernamesMap[member.id] = user.username;
      }
      setUsernames(usernamesMap);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to fetch members.");
      console.error("Error fetching members:", err);
    }
  };

  const deleteMember = async (memberId: string) => {
    try {
      await removeCompanyMember(memberId);
      await loadMembers()
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to remove member.");
      console.error(err.response?.data?.detail || "Error removing member:", err);
    }
  };

  const handleLeaveCompany = async () => {
    try {
      await leaveCompany();
      setCompanyId("");
      setError("");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to leave the company.");
      console.error("Error leaving the company:", err);
    }
  };

  return (
    <div className="company-members-page">
      <input
        placeholder="Enter your company ID"
        value={companyId}
        onChange={(e) => setCompanyId(e.target.value)}
      />
      <button onClick={loadMembers} disabled={companyId === ""}>
        Load Members
      </button>

      <h1>Company Members</h1>

      <ul>
        {members.map((member) => (
          <li key={member.id}>
            <p>{usernames[member.id] || "Loading user..."} is a member.</p>
            <button onClick={() => deleteMember(member.id)}>Remove Member</button>
          </li>
        ))}
      </ul>

      <button onClick={handleLeaveCompany}>Leave Company</button>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default CompanyMembersPage;
