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

export type TabId = "home" | "test-api" | "chat" | "location" | "camera" | "gallery" | "files" | "download" | "contact" | "biometric";

export interface SdkFileModule {
  rawFile?: File;
  url: string;
  fileName?: string;
  mimeType?: string;
  extension?: string;
  byteSize?: number;
  previewUrl?: string;
}

export interface SdkDeviceDownloadResult {
  file: SdkFileModule;
}

export interface SdkDevicePermissionStatus {
  status: "granted" | "denied" | "permanentlyDenied" | "restricted";
}

export interface SdkDevicePermissionBaseResponse<T> {
  status: SdkDevicePermissionStatus["status"];
  data?: T;
  error?: string;
}

export interface SdkDeviceDownloadResponse extends SdkDevicePermissionBaseResponse<SdkDeviceDownloadResult> {}

export interface SdkDeviceContactResult {
  contactName?: string;
  number?: string;
}

export interface SdkDeviceBiometricResult {
  success: boolean;
  error?: string;
}
