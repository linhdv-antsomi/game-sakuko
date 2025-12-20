// Libraries
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

interface useTabsProps<T = string> {
  tabMenu?: T[];
  defaultTab?: T;
  key?: string;
}

/**
 * @param tabMenu: list tab menu using to check whether 'activeTab' is in tab menu list or not
 * @param defaultTab: Returns by default tab if no tab matches the value in the tabMenu or no active tab is found
 */
export const useTabs = <T = string>(props: useTabsProps<T>) => {
  const { tabMenu, defaultTab, key = "tab" } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  const currentTab = (searchParams.get(key)?.toString() || "") as T;
  const activeTab = tabMenu
    ? tabMenu.includes(currentTab)
      ? currentTab
      : defaultTab
    : currentTab || defaultTab;

  const onChangeTab = useCallback(
    (nextTab: string) => {
      try {
        searchParams.set(key, nextTab);
        setSearchParams(searchParams, { replace: true });
      } catch (error) {
        //
      }
    },
    [key, searchParams, setSearchParams]
  );

  return { onChangeTab, activeTab: (activeTab || "") as T };
};
