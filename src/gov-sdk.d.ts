import type {
  MiniAppSdkInterface,
  PlatformUser,
  DevicePermissionStatus,
  DeviceLocationResult,
  DeviceCameraResult,
  DeviceGalleryResult,
  DeviceFileResult,
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
  type SdkFileModule = FileModule;

  interface Window {
    __GSA_SDK__?: MiniAppSdk;
  }
}

export {};
