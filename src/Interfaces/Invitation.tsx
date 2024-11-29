interface InvitationCreate {
  id?: string;
  company_id: string;
  recipient_id: string;
  invitation_text: string;
}

export interface InvitationGet{
  id: string;
  company_id: string;
  sender_id: string;
  recipient_id: string;
  invitation_text: string;

}
export default InvitationCreate;