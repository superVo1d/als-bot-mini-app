"use client";

import { type PropsWithChildren, useEffect, useMemo } from "react";
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
} from "@telegram-apps/sdk-react";
import { initSwipeBehavior } from "@telegram-apps/sdk";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { AppRoot } from "@telegram-apps/telegram-ui";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ErrorPage } from "@/components/ErrorPage";
import { useTelegramMock } from "@/hooks/useTelegramMock";
import { useDidMount } from "@/hooks/useDidMount";

import "./styles.css";
import { usePathname, useRouter } from "next/navigation";
import { DataProvider } from "@/context/DataContext";
import { LangProvider } from "@/context/LangContext";

let previousPathname: string | null = null;

function App(props: PropsWithChildren) {
  const lp = useLaunchParams();
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();
  const bb = useBackButton();
  const router = useRouter();
  const pathname = usePathname();

  const [swipeBehavior] = initSwipeBehavior();

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  useEffect(() => {
    if (pathname === previousPathname) {
      return;
    }

    if (pathname === "/") {
      bb.hide();
    } else {
      bb.show();
    }
    if (bb) {
      bb.on("click", () => router.push(previousPathname || "/"));
      console.log(previousPathname || "/");
    }

    previousPathname = pathname;
  }, [bb, pathname]);

  useEffect(() => {
    if (viewport && !viewport.isExpanded) {
      viewport.expand();
    }

    try {
      swipeBehavior.disableVerticalSwipe();
    } catch (e) {
      console.log("Can`t disableVerticalSwipe natively.");

      // Some versions of Telegram don't need the classes above.
      if (["macos", "tdesktop", "weba", "web", "webk"].includes(lp.platform)) {
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
          appearance={miniApp.isDark ? "dark" : "light"}
          platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
        >
          {props.children}
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
  const manifestUrl = useMemo(() => {
    return new URL("tonconnect-manifest.json", window.location.href).toString();
  }, []);

  // Enable debug mode to see all the methods sent and events received.
  useEffect(() => {
    if (debug) {
      import("eruda").then((lib) => lib.default.init());
    }
  }, [debug]);

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <SDKProvider acceptCustomStyles debug={debug}>
        <App>{children}</App>
      </SDKProvider>
    </TonConnectUIProvider>
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
