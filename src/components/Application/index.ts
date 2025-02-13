/*
 * @Description  :
 * @Date         : 2022-12-23 01:42:02
 * @LastEditors  : Hu
 * @LastEditTime : 2023-05-18 10:03:42
 */
import { withInstall } from '/@/utils';

import appLogo from './src/AppLogo.vue';
import appBlackLogo from './src/AppBlackLogo.vue';
import appProvider from './src/AppProvider.vue';
import appSearch from './src/search/AppSearch.vue';
import appLocalePicker from './src/AppLocalePicker.vue';

export { useAppProviderContext } from './src/useAppContext';

export const AppLogo = withInstall(appLogo);
export const AppBlackLogo = withInstall(appBlackLogo);
export const AppProvider = withInstall(appProvider);
export const AppSearch = withInstall(appSearch);
export const AppLocalePicker = withInstall(appLocalePicker);
