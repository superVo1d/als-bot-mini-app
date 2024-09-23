"use client";

import { type PropsWithChildren, useEffect, useState } from "react";
import {
  SDKProvider,
  useLaunchParams,
  useMiniApp,
  useThemeParams,
  useViewport,
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  useBackButton,
  useSwipeBehavior,
} from "@telegram-apps/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ErrorPage } from "@/components/ErrorPage";
import { useTelegramMock } from "@/hooks/useTelegramMock";
import { useDidMount } from "@/hooks/useDidMount";

import "./styles.css";
import { usePathname, useRouter } from "next/navigation";
import { DataProvider } from "@/context/DataContext";
import { LangProvider } from "@/context/LangContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Button } from "../Button";
import HomeIcon from "@/assets/media/home.svg";

function App(props: PropsWithChildren) {
  const lp = useLaunchParams(true);
  const miniApp = useMiniApp(true);
  const themeParams = useThemeParams(true);
  const viewport = useViewport(true);
  const bb = useBackButton(true);
  const router = useRouter();
  const pathname = usePathname();
  const swipeBehavior = useSwipeBehavior(true);
  const [showBackButton, setShowBackButton] = useState(false);

  const { auth, getData } = useAuth();

  useEffect(() => {
    if (lp?.initDataRaw) {
      auth(lp.initDataRaw).then(() => getData());
    }
  }, [lp]);

  useEffect(() => {
    return miniApp && themeParams && bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return themeParams && bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  useEffect(() => {
    if (pathname === "/") {
      bb?.hide();
      setShowBackButton(false);
    } else if (pathname === "/map") {
      bb?.show();
      setShowBackButton(false);
    } else {
      bb?.show();
      setShowBackButton(true);
    }
    if (bb) {
      bb.on("click", () => router.back());
    }
  }, [bb, pathname]);

  useEffect(() => {
    if (viewport && !viewport.isExpanded) {
      viewport.expand();
    }

    try {
      swipeBehavior?.disableVerticalSwipe();
    } catch (e) {
      console.log("Can`t disableVerticalSwipe natively.");

      // Some versions of Telegram don't need the classes above.
      if (
        lp &&
        ["macos", "tdesktop", "weba", "web", "webk"].includes(lp.platform)
      ) {
        return;
      }

      document.body.classList.add("mobile-body");
      document.getElementById("wrap")?.classList.add("mobile-wrap");
      document.getElementById("content")?.classList.add("mobile-content");
    }
  }, [viewport, swipeBehavior]);

  return (
    <LangProvider>
      <DataProvider>
        <AppRoot
          appearance={miniApp?.isDark ? "dark" : "light"}
          platform={
            lp && ["macos", "ios"].includes(lp.platform) ? "ios" : "base"
          }
        >
          {props.children}
          {showBackButton && (
            <Button className="back-home" href="/">
              <HomeIcon />
            </Button>
          )}
        </AppRoot>
      </DataProvider>
    </LangProvider>
  );
}

function RootInner({ children }: PropsWithChildren) {
  // Mock Telegram environment in development mode if needed.
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTelegramMock();
  }

  const debug = useLaunchParams().startParam === "debug";

  // Enable debug mode to see all the methods sent and events received.
  useEffect(() => {
    if (debug) {
      import("eruda").then((lib) => lib.default.init());
    }
  }, [debug]);

  return (
    <SDKProvider acceptCustomStyles debug={debug}>
      <AuthProvider>
        <App>{children}</App>
      </AuthProvider>
    </SDKProvider>
  );
}

export function Root(props: PropsWithChildren) {
  // Unfortunately, Telegram Mini Apps does not allow us to use all features of the Server Side
  // Rendering. That's why we are showing loader on the server side.
  const didMount = useDidMount();

  return didMount ? (
    <ErrorBoundary fallback={ErrorPage}>
      <RootInner {...props} />
    </ErrorBoundary>
  ) : (
    <div className="root__loading">Loading</div>
  );
}
