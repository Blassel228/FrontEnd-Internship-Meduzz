import baseApi from "../Api/baseApi";
import RequestCreate from "../Interfaces/Request";

const RequestsApi = {
  declineRequest: (requestId: string) => baseApi.delete(`/request/${requestId}/reject`),
  acceptRequest: (requestId: string) => baseApi.post(`/request/${requestId}/accept`),
  fetchUserRequests: () => baseApi.get(`/request/sent`),
  sendJoinRequest: (data: RequestCreate) => baseApi.post(`/request/send`, data),
  cancelRequest: (requestId: string) => baseApi.delete(`/request/${requestId}/delete`),
  ownerGetSentRequests: (companyId: string) => baseApi.get(`/request/company/${companyId}/owner/sent`)
};

export default RequestsApi;
