import type {
  MiniAppSdkInterface,
  PlatformUser,
  DevicePermissionStatus,
  DeviceLocationResult,
  DeviceCameraResult,
  DeviceGalleryResult,
  DeviceFileResult,
  DeviceDownloadResult,
  DeviceExtraOptions,
  DeviceContactResult,
  DeviceBiometricResult,
  DeviceBiometricOptions,
  FileModule,
} from '@lizuz/mini-app-types';


declare global {
  type MiniAppSdk = MiniAppSdkInterface;
  type SdkPlatformUser = PlatformUser;
  type SdkDevicePermissionStatus = DevicePermissionStatus;
  type SdkDeviceLocationResult = DeviceLocationResult;
  type SdkDeviceCameraResult = DeviceCameraResult;
  type SdkDeviceGalleryResult = DeviceGalleryResult;
  type SdkDeviceFileResult = DeviceFileResult;
   type SdkDeviceDownloadResult = DeviceDownloadResult;
   type SdkDeviceContactResult = DeviceContactResult;
  type SdkFileModule = FileModule;
  type SdkDeviceExtraOptions = DeviceExtraOptions;
  type SdkDeviceBiometricResult = DeviceBiometricResult;
  type SdkBiometricOptions = DeviceBiometricOptions;

  interface Window {
    __GSA_SDK__?: MiniAppSdk;
  }
}

export {};
