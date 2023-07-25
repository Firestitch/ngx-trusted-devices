import { DeviceType } from '@firestitch/device';
import { DeviceBrowser } from '@firestitch/device';
import { DeviceOs } from '@firestitch/device';


export interface ITrustedDeviceDevice {
  id?: number;
  type?: DeviceType;
  osType?: DeviceOs;
  osName?: string;
  osVersion?: string;
  browserType?: DeviceBrowser;
  browserVersion?: string;
  browserName?: string;
  userAgent?: string;
}
