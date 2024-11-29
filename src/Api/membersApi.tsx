import baseApi from "../Api/baseApi";

const MembersApi = {
  fetchCompanyMembers: (companyId: string) => baseApi.get(`/members/company/${companyId}/users`),
  removeCompanyMember: (memberId: string) => baseApi.delete(`/members/${memberId}/fire`),
  leaveCompany: () => baseApi.delete(`/members/resign`)
};

export default MembersApi;
