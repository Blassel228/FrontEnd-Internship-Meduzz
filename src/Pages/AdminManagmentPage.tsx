import { useState } from 'react';
import { MemberGet } from '../Interfaces/Member';
import useCompanyActions from '../Hooks/useCompanyActions';
import useUser from '../Hooks/useUser';

const AdminManagementPage = () => {
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [companyId, setCompanyId] = useState('');
  const [members, setMembers] = useState<MemberGet[]>([]);
  const [adminNames, setAdminNames] =  useState<Record<string, string>>({});
  const [memberNames, setMemberNames] = useState<Record<string, string>>({});
  const { fetchUser } = useUser();
  const { fetchCompanyMembers, fetchAdmins, promoteToAdmin, demoteFromAdmin } = useCompanyActions();

  const handleFetchCompanyMembers = async (companyId: string) => {
    setLoading(true);
    try {
      const members: MemberGet[] = await fetchCompanyMembers(companyId);
      setMembers(members);
      const usernamesMap: Record<string, string> = {};
      for (const member of members) {
        const user = await fetchUser(member.id);
        usernamesMap[member.id] = user.username;
      }
      setMemberNames(usernamesMap);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch members.');
    } finally {
      setLoading(false);
    }
  };

   const handleFetchCompanyAdmins = async (companyId: string) => {
      setLoading(true);
      try {
        const admins: MemberGet[] = await fetchAdmins(companyId);
        setAdmins(admins);

        const usernamesMap: Record<string, string> = {};
        for (const admin of admins) {
          const user = await fetchUser(admin.id);
          usernamesMap[admin.id] = user.username;
        }
        setAdminNames(usernamesMap);
      } catch (err: any) {
        if (err.response?.data?.detail === "There are no admins") {
          setAdmins([]);
          setAdminNames({});
          return;
        }
        setError(err.response?.data?.detail || "Failed to fetch admins");
        console.error("Error fetching admins:", err);
      } finally {
        setLoading(false);
      }
    };

  const handlePromoteToAdmin = async (memberId: string) => {
    try {
      setLoading(true);
      await promoteToAdmin(companyId, memberId);
      setSuccess('Admin role assigned successfully!');
      await handleFetchCompanyAdmins(companyId);
    } catch (err: any) {
       setError(err.response?.data?.detail || "Failed to promote to admin.");
       console.error("Error fetching requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoteAdmin = async (memberId: string) => {
    try {
      setLoading(true);
      await demoteFromAdmin(companyId, memberId);
      setSuccess('Admin role removed successfully!');
      await handleFetchCompanyAdmins(companyId);
    } catch (err: any) {
       setError(err.response?.data?.detail || "Failed to demote from admin role.");
      console.error("Error fetching requests:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Admin Management</h1>
      <input
        placeholder="Company Id"
        value={companyId}
        onChange={(e) => setCompanyId(e.target.value)}
      />
      <button onClick={() => handleFetchCompanyMembers(companyId)}>Fetch Members</button>
      <button onClick={() => handleFetchCompanyAdmins(companyId)}>Fetch Admins</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <div>
        <h3>Members</h3>
        <ul>
          {members.length > 0 ? (
            members.map((member) => (
              <li key={member.id}>
                {memberNames[member.id]}
                <button onClick={() => handlePromoteToAdmin(member.id)}>Promote to Admin</button>
              </li>
            ))
          ) : (
            <p>No members found.</p>
          )}
        </ul>
      </div>
      <div>
        <h3>Admins</h3>
        <ul>
          {admins.length > 0 ? (
            admins.map((admin) => (
              <li key={admin.id}>
                {adminNames[admin.id]}
                <button onClick={() => handleDemoteAdmin(admin.id)}>Remove Admin</button>
              </li>
            ))
          ) : (
            <p>No admins assigned yet.</p>
          )}
        </ul>
      </div>

      <div>
        <h3>Promote Member to Admin</h3>
      </div>
    </div>
  );
};

export default AdminManagementPage;
