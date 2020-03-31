import type { AppState } from 'app/store/modules/app/types';
import { Breakpoints } from 'app/types';

export const initialStateApp: AppState = {
  errors: [],
  serverSettings: {
    data: [],
  },
  basemaps: {
    data: [],
  },
  aclTypes: [],
  loggedIn: false,
  checked: false,
  login: '',
  error: '',
  user: undefined,
  permissions: [],
  serviceMode: false,
  passwordSettings: undefined,
  breakpoint: Breakpoints.DESKTOP,
  xAuthToken: null,
  isNearbyCameraEnabled: false,
  modalSessionExpiredError: undefined,

  mapData: null,

  themeName: 'light',

  globalLoadingCount: 0,
  showCars: false,
};
