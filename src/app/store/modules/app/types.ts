import { User } from 'app/types';
import { RegionDataItem } from 'app/store/modules/semantics/types';
import themes from 'styles/themes';

export type AppState = {
  error: any;
  errors: any;
  serverSettings: {
    data: any;
  };
  basemaps: {
    data: any[];
  } | null;
  aclTypes: any[];
  checked: boolean;
  serviceMode: boolean;

  login: string;
  loggedIn: boolean;
  permissions: any;
  passwordSettings: any;
  isNearbyCameraEnabled: boolean;

  user: User;
  modalSessionExpiredError: any;

  breakpoint: any;
  xAuthToken: string;

  mapData: RegionDataItem;

  themeName: keyof typeof themes;

  globalLoadingCount: number;
  showCars: boolean;
};
