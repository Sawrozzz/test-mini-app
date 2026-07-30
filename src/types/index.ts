export type DriverLicense = {
  licenseNumber: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  gender: "M" | "F" | "O";
  address: Address;
  issueDate: string;
  expiryDate: string;
  issuingAuthority: string;
  licenseClass: string;
  vehicleCategories: string[];
  restrictions: string;
  bloodGroup: string;
  photoUrl: string;
  signatureUrl: string;
  isOrganDonor: boolean;
  status: "Active" | "Inactive" | "Expired" | "Suspended";
};

export type Address = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
    catchPhrase: string;
  };
};

export type TabId = "home" | "test-api" | "chat" | "location" | "camera" | "gallery" | "files";
