import { useState } from "react";
import baseApi from "../Api/baseApi";
import InvitationCreate from "../Interfaces/Invitation";
import RequestCreate from "../Interfaces/Request";

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
    await makeApiCall(
    () => baseApi.delete(`/request/${requestId}/reject`),
    "Request declined successfully!"
  );

  const ownerGetSentRequests = async (companyId: string)=>
    await makeApiCall(
    () => baseApi.get(`/request/company/${companyId}/owner/sent`),
    "Requests fetched successfully")

  const acceptRequest = async (requestId: string) =>
    await makeApiCall(
      () => baseApi.post(`/request/${requestId}/accept`),
      "Request accepted successfully!"
    );

  const fetchUserRequests = async () =>
    await makeApiCall(
      () => baseApi.get(`/request/sent`),
      "Join requests fetched successfully!"
    );

  const sendJoinRequest = async (data: RequestCreate) =>
    await makeApiCall(
      () => baseApi.post(`request/send`, data),
      "Request to join sent successfully!"
    );

  const cancelRequest = async (requestId: string) =>
    await makeApiCall(
      () => baseApi.delete(`/request/${requestId}/delete`),
      "Request canceled successfully!"
    );

  const sendInvitation = async (data: InvitationCreate) =>
    await makeApiCall(
      () => baseApi.post(`/invitation/send`, data),
      "Invitation sent successfully!"
    );

  const cancelInvitation = async (invitationId: string) =>
    await makeApiCall(
      () => baseApi.delete(`/invitation/${invitationId}`),
      "Invitation canceled successfully!"
    );

  const acceptInvitation = async (invitationId: string) =>
    await makeApiCall(
      () => baseApi.post(`/invitation/${invitationId}/accept`),
      "Invitation accepted successfully!"
    );

  const declineInvitation = async (invitationId: string) =>
    await makeApiCall(
      () => baseApi.delete(`/invitation/${invitationId}/reject`),
      "Invitation declined successfully!"
    );

  const fetchInvitations = async () =>
    await makeApiCall(
      () => baseApi.get(`/invitation/sent`),
      "Invitations fetched successfully!"
    );

  const ownerFetchInvitations = async (companyId: string) =>
    await makeApiCall(
      () => baseApi.get(`/invitation/company/${companyId}/owner/sent`),
      "Invited users fetched successfully!"
    );

  const fetchCompanyMembers = async (companyId: string) =>
    await makeApiCall(
      () => baseApi.get(`/members/company/${companyId}/users`),
      "Company users fetched successfully!"
    );

  const removeCompanyMember = async (memberId: string) =>
    await makeApiCall(
      () => baseApi.delete(`/members/${memberId}/fire`),
      "User removed successfully!"
    );

    const leaveCompany = async () =>
    await makeApiCall(
      () => baseApi.delete(`/members/resign`),
      "You have left the company."
    );


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
