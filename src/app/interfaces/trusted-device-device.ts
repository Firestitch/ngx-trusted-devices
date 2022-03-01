import { DeviceType } from '@firestitch/device';
import { DeviceBrowser } from '@firestitch/device';
import { DeviceOs } from '@firestitch/device';


export interface ITrustedDeviceDevice {
  readonly id: number;
  type: DeviceType;
  osType: DeviceOs;
  osName: string;
  browserType: DeviceBrowser;
  browserVersion: string;
  browserName?: string;
  userAgent: string;
}
