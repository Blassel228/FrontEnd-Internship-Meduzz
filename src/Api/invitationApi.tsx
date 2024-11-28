import baseApi from "../Api/baseApi";
import InvitationCreate from "../Interfaces/Invitation";

const InvitationsApi = {
  sendInvitation: (data: InvitationCreate) => baseApi.post(`/invitation/send`, data),
  cancelInvitation: (invitationId: string) => baseApi.delete(`/invitation/${invitationId}`),
  acceptInvitation: (invitationId: string) => baseApi.post(`/invitation/${invitationId}/accept`),
  declineInvitation: (invitationId: string) => baseApi.delete(`/invitation/${invitationId}/reject`),
  fetchInvitations: () => baseApi.get(`/invitation/sent`),
  ownerFetchInvitations: (companyId: string) => baseApi.get(`/invitation/company/${companyId}/owner/sent`)
};

export default InvitationsApi;
