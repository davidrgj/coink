export interface PersonalInfo {
    phoneNumber?: string;
    basicData?: BasicData;
    acceptPolicies?: boolean;
}

export interface BasicData {
    document_type: number;
    document_number: string;
    document_issue_date: string;
    birth_date: string;
    gender: number;
    email: string;
    email_confirmation?: string;
    pin: string;
    pin_confirmation?: string;
};