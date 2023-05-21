import { FC } from "react";
import classNames from "classnames";
import { useHasMobileSize } from "@lib/hooks/useHasMobileSize";
import { Plus, Minus, Box } from "@components/Icons";

const btnClasses =
  "shadow-lg hover:bg-textcolor hover:text-secondary bg-secondary text-textcolor h-10 w-10 mt-2 cursor-pointer list-none text-center grid place-items-center rounded-full";

export interface SidebarNavType {
  navViews: any;
  setNavView: (view: "info" | "filter") => void;
  navView?: "info" | "filter";
  sidebarMenuOpen: boolean;
  setSidebarMenuOpen: (open: boolean) => void;
  setModalOpen: (open: boolean) => void;
  entityId: number | null;
  setEntityId: (time: null | number) => void;
  mapZoom: number;
  setMapZoom: (time: number) => void;
  mapPitch: boolean;
  setMapPitch: (pitch: boolean) => void;
}

export const SidebarNav: FC<SidebarNavType> = ({
  navViews,
  setNavView,
  navView,
  sidebarMenuOpen,
  setSidebarMenuOpen,
  // setModalOpen,
  // entityId,
  // setEntityId,
  // mapZoom,
  // setMapZoom,
  // setMapPitch,
  // mapPitch,
}) => {
  const hasMobileSize = useHasMobileSize();
  let navPositionClasses =
    !sidebarMenuOpen || hasMobileSize ? "left-[0px]" : "left-sidebar";

  // if (entityId && !hasMobileSize) {
  //   navPositionClasses = 'left-sidebar'
  // }

  // const padding = hasMobileSize ? 'pl-4' : 'pl-0'
  const padding = sidebarMenuOpen ? (hasMobileSize ? "pl-4" : "pl-0") : "pl-4";

  const navClasses =
    "h-14 cursor-pointer list-none text-center grid place-items-center hover:bg-textcolor";
  function onNavClick(listView: any) {
    if (!sidebarMenuOpen) {
      setSidebarMenuOpen(true);
    }
    setNavView(listView.value);
  }
  return (
    <>
      <nav
        className={classNames(
          navPositionClasses,
          padding,
          "fixed top-0 p-4 transition-left ease-in-out duration-300 z-30 rounded overflow-hidden"
        )}
      >
        <div className="w-14 flex flex-col list-none overflow-hidden shadow-lg text-textcolor ">
          <div className="w-14 flex flex-col list-none rounded overflow-hidden shadow-lg">
            {navViews.map((listView: any) => (
              <div
                key={listView.value}
                title={listView.name}
                onClick={() => onNavClick(listView)}
                className={classNames(
                  listView.name,
                  "text-secondary",
                  "hover:text-secondary",
                  listView.value === navView && sidebarMenuOpen
                    ? "bg-white text-secondary"
                    : "bg-white text-textcolor",
                  navClasses
                )}
              >
                {listView.icon}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};
