import baseApi from "../Api/baseApi";

const AdminApi = {
  fetchAdmins: (companyId: string) => baseApi.get(`/members/company/${companyId}/admins`),
  promoteToAdmin: (companyId: string, memberId: string) =>
    baseApi.put(`/members/${memberId}/company/${companyId}/promote`),
  demoteFromAdmin: (companyId: string, memberId: string) =>
    baseApi.put(`/members/${memberId}/company/${companyId}/demote`)
};

export default AdminApi;
