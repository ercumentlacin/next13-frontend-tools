"use client";

import {
  Suspense,
  createContext,
  lazy,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const CreatePostDrawer = lazy(
  () => import("../components/drawers/CreatePostDrawer/")
);

export interface DrawerContext {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  setContent: React.Dispatch<React.SetStateAction<Content>>;
}

type Content = "create-post" | "";

export const DrawerContext = createContext<DrawerContext>({} as DrawerContext);

const DrawerProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [content, setContent] = useState<Content>("");

  const toggleDrawer = useCallback(() => setIsDrawerOpen((p) => !p), []);

  const value = useMemo(
    () => ({
      isDrawerOpen,
      toggleDrawer,
      setContent,
    }),
    [isDrawerOpen, toggleDrawer]
  );

  return (
    <DrawerContext.Provider value={value}>
      <div className="drawer drawer-end">
        <input
          id="my-drawer-4"
          type="checkbox"
          className="drawer-toggle"
          checked={isDrawerOpen}
          onChange={() => toggleDrawer()}
        />
        <div className="drawer-content">{children}</div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
          <div className="p-4 menu w-80 bg-base-100 text-base-content">
            <Suspense fallback={<div>Loading...</div>}>
              {content === "create-post" && <CreatePostDrawer />}
            </Suspense>
          </div>
        </div>
      </div>
    </DrawerContext.Provider>
  );
};

export default DrawerProvider;

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (context === undefined) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }
  return context;
};
