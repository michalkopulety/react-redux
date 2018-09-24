/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectFinesContainer = (state) => state.get('finesContainer');

const makeSelectSelectedTab = () => createSelector(
  selectFinesContainer,
  (finesContainerState) => finesContainerState.get('selectedTab')
);

const makeSelectPaidSettings = () => createSelector(
  selectFinesContainer,
  (finesContainerState) => {
    const settingsMap = finesContainerState.get('paid');
    return {
      selected: settingsMap.get("selected").toArray(),
      order: settingsMap.get("order"),
      orderBy: settingsMap.get("orderBy"),
      selectedAmount: settingsMap.get("selectedAmount"),
      page: settingsMap.get("page"),
      rowsPerPage: settingsMap.get("rowsPerPage")
    };
  }
);

const makeSelectUnpaidSettings = () => createSelector(
  selectFinesContainer,
  (finesContainerState) => {
    const settingsMap = finesContainerState.get('unpaid');
    return {
      selected: settingsMap.get("selected").toArray(),
      order: settingsMap.get("order"),
      orderBy: settingsMap.get("orderBy"),
      selectedAmount: settingsMap.get("selectedAmount"),
      page: settingsMap.get("page"),
      rowsPerPage: settingsMap.get("rowsPerPage")
    };
  }
);

export {
  selectFinesContainer,
  makeSelectSelectedTab,
  makeSelectPaidSettings,
  makeSelectUnpaidSettings
};
