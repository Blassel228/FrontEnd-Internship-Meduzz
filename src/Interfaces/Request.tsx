interface RequestCreate {
  id?: string;
  company_id: string;
  request_text: string;
}

export interface RequestGet{
    id: string;
    company_id: string,
    sender_id: string,
    request_text: string
}
export default RequestCreate;