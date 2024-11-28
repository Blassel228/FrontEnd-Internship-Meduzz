import { useState } from "react";
import RequestsApi from "../Api/requestApi";
import InvitationsApi from "../Api/invitationApi";
import MembersApi from "../Api/membersApi";
import AdminApi from "../Api/adminApi";  // Import AdminApi
import RequestCreate from "../Interfaces/Request";
import InvitationCreate from "../Interfaces/Invitation";
import useApiCall from "./useApiCall";

const useCompanyActions = () => {
  const { makeApiCall } = useApiCall();

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

  const fetchAdmins = async (companyId: string) =>
    await makeApiCall(() => AdminApi.fetchAdmins(companyId), "Admins fetched successfully!");

  const promoteToAdmin = async (companyId: string, memberId: string) =>
    await makeApiCall(() => AdminApi.promoteToAdmin(companyId, memberId), "Member promoted to admin successfully!");

  const demoteFromAdmin = async (companyId: string, memberId: string) =>
    await makeApiCall(() => AdminApi.demoteFromAdmin(companyId, memberId), "Member demoted from admin successfully!");

  return {
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
    ownerGetSentRequests,
    fetchAdmins,
    promoteToAdmin,
    demoteFromAdmin
  };
};

export default useCompanyActions;
