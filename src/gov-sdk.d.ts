interface GovSdkAuth {
  getUser(): Promise<GovSdkUser | null>;
  isAuthenticated(): Promise<boolean>;
  logout(): Promise<void>;
}

interface GovSdkUser {
  id: string;
  name: string;
  fullName?: string;
  email: string;
  nationalId?: string;
  roles: string[];
  permissions: string[];
  avatar?: string;
}

interface GovDeviceLocationModule {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

interface GovDeviceCameraModule {
  uri: string;
  base64?: string;
  width?: number;
  height?: number;
}

interface GovDeviceSdkModule {
  camera(): Promise<GovDeviceCameraModule>;
  location(): Promise<GovDeviceLocationModule>;
  gallery(options?: { reason?: string; multiple?: boolean }): Promise<any>;
  files(options?: { reason?: string; multiple?: boolean }): Promise<any>;
}

interface GovSdkHttp {
  get<T = unknown>(
    endpoint?: string,
    query?: Record<string, string>,
    headers?: Record<string, string>,
  ): Promise<{ status: number; data: T; headers: Record<string, string> }>;
  post<T = unknown>(
    endpoint?: string,
    body?: unknown,
    headers?: Record<string, string>,
  ): Promise<{ status: number; data: T; headers: Record<string, string> }>;
  put<T = unknown>(
    endpoint?: string,
    body?: unknown,
    headers?: Record<string, string>,
  ): Promise<{ status: number; data: T; headers: Record<string, string> }>;
  patch<T = unknown>(
    endpoint?: string,
    body?: unknown,
    headers?: Record<string, string>,
  ): Promise<{ status: number; data: T; headers: Record<string, string> }>;
  delete<T = unknown>(
    endpoint?: string,
    headers?: Record<string, string>,
  ): Promise<{ status: number; data: T; headers: Record<string, string> }>;
}

interface GovSdkApi {
  request<T = unknown, B = unknown>(params: {
    method?: string;
    endpoint?: string;
    path?: string;
    body?: B;
    headers?: Record<string, string>;
  }): Promise<{ status: number; data: T; headers: Record<string, string>; error?: string }>;
}

interface GovSdkStorage {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
  remove(key: string): Promise<void>;
}

interface GovSdkPlatform {
  readonly type: 'WEB' | 'FLUTTER';
  isWeb(): boolean;
  isFlutter(): boolean;
  isMobile(): boolean;
}

interface GovSdkNavigation {
  navigate(target: { route: string; app: string; params?: Record<string, string>; replace?: boolean }): Promise<void>;
  getCurrent(): Promise<{ app: string; route: string; params: Record<string, string>; historyLength: number }>;
}

interface GovSdkInstance {
  readonly miniAppId: string;
  readonly gsaProtocolVersion: string;
  readonly traceId: string;
  auth: GovSdkAuth;
  api: GovSdkApi;
  storage: GovSdkStorage;
  http: GovSdkHttp;
  platform: GovSdkPlatform;
  device: GovDeviceSdkModule;
  navigation: GovSdkNavigation;
  destroy(): void;
}

interface Window {
  __GSA_SDK__?: GovSdkInstance;
}
