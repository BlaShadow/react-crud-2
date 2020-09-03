export interface ContactItem {
  name: string;
  lastName: string;
  age: number;
  phoneNumber: string;
  jobPosition: string;
  documentIdentifier: string;
  email: string;
  homeAddress: string;
}

export type PageSection = "LIST" | "ADD" | "VIEW";
