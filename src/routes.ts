import {
  Home,
  FileText,
  MessageCircle,
  MapPin,
  Camera,
  Image,
  Folder,
  DownloadIcon,
  Contact,
  Fingerprint,
} from "lucide-react";
import type { TabId } from "./types";

export type NavItem = {
  id: TabId;
  path: string;
  label: string;
  icon: typeof Home;
};

export const navItems: NavItem[] = [
  { id: "home", path: "/", label: "Home", icon: Home },
  { id: "test-api", path: "/test-api", label: "Test Api", icon: FileText },
  { id: "chat", path: "/chat", label: "Chat Here", icon: MessageCircle },
  { id: "location", path: "/location", label: "Location", icon: MapPin },
  { id: "camera", path: "/camera", label: "Camera", icon: Camera },
  { id: "gallery", path: "/gallery", label: "Gallery", icon: Image },
  { id: "files", path: "/files", label: "Files", icon: Folder },
  { id: "download", path: "/download", label: "Download", icon: DownloadIcon },
  { id: "contact", path: "/contact", label: "Contact", icon: Contact },
  { id: "biometric", path: "/biometric", label: "Biometric", icon: Fingerprint },
];

/** Normalizes a runtime-supplied path ("camera", "/camera") to a route path. */
export function toRoutePath(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}
