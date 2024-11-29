import { useState } from "react";
import RequestsApi from "../Api/requestApi";
import InvitationsApi from "../Api/invitationApi";
import MembersApi from "../Api/membersApi";
import RequestCreate from "../Interfaces/Request";
import InvitationCreate from "../Interfaces/Invitation";

const useCompanyActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const makeApiCall = async (apiCall: () => Promise<any>, successMessage: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall();
      setSuccess(successMessage);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.detail || "An error occurred.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const declineRequest = async (requestId: string) =>
    await makeApiCall(() => RequestsApi.declineRequest(requestId), "Request declined successfully!");

  const acceptRequest = async (requestId: string) =>
    await makeApiCall(() => RequestsApi.acceptRequest(requestId), "Request accepted successfully!");

  const fetchUserRequests = async () =>
    await makeApiCall(() => RequestsApi.fetchUserRequests(), "Join requests fetched successfully!");

  const sendJoinRequest = async (data: RequestCreate) =>
    await makeApiCall(() => RequestsApi.sendJoinRequest(data), "Request to join sent successfully!");

  const cancelRequest = async (requestId: string) =>
    await makeApiCall(() => RequestsApi.cancelRequest(requestId), "Request canceled successfully!");

  const ownerGetSentRequests = async (companyId: string) =>
    await makeApiCall(() => RequestsApi.ownerGetSentRequests(companyId), "Requests fetched successfully!");

  const sendInvitation = async (data: InvitationCreate) =>
    await makeApiCall(() => InvitationsApi.sendInvitation(data), "Invitation sent successfully!");

  const cancelInvitation = async (invitationId: string) =>
    await makeApiCall(() => InvitationsApi.cancelInvitation(invitationId), "Invitation canceled successfully!");

  const acceptInvitation = async (invitationId: string) =>
    await makeApiCall(() => InvitationsApi.acceptInvitation(invitationId), "Invitation accepted successfully!");

  const declineInvitation = async (invitationId: string) =>
    await makeApiCall(() => InvitationsApi.declineInvitation(invitationId), "Invitation declined successfully!");

  const fetchInvitations = async () =>
    await makeApiCall(() => InvitationsApi.fetchInvitations(), "Invitations fetched successfully!");

  const ownerFetchInvitations = async (companyId: string) =>
    await makeApiCall(() => InvitationsApi.ownerFetchInvitations(companyId), "Invited users fetched successfully!");

  const fetchCompanyMembers = async (companyId: string) =>
    await makeApiCall(() => MembersApi.fetchCompanyMembers(companyId), "Company users fetched successfully!");

  const removeCompanyMember = async (memberId: string) =>
    await makeApiCall(() => MembersApi.removeCompanyMember(memberId), "User removed successfully!");

  const leaveCompany = async () =>
    await makeApiCall(() => MembersApi.leaveCompany(), "You have left the company.");

  return {
    loading,
    error,
    success,
    setError,
    setSuccess,
    sendInvitation,
    cancelInvitation,
    acceptRequest,
    declineRequest,
    removeCompanyMember,
    acceptInvitation,
    declineInvitation,
    sendJoinRequest,
    cancelRequest,
    leaveCompany,
    fetchUserRequests,
    fetchInvitations,
    ownerFetchInvitations,
    fetchCompanyMembers,
    ownerGetSentRequests
  };
};

export default useCompanyActions;
