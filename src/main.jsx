import React, { Suspense } from "react";
import ReactDOM from 'react-dom/client';
import { App as ZmpApp, ZMPRouter, SnackbarProvider } from 'zmp-ui';
import App from './App';
import './index.css';
import "zmp-ui/zaui.css";
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
// Providers
import { Providers } from './providers';
import { ConfigProvider as MobileConfigProvider } from '@antscorp/ama-ui';

window.Game = {
  init: () => {
    const root = document.getElementById('root')
    if (root?.dataset.initted) {
      return
    }
    root.dataset.initted = 1;

    ReactDOM.createRoot(root).render(
      <RecoilRoot>
        <ZmpApp>
          <React.StrictMode>
            <BrowserRouter>
              <Providers>
                <MobileConfigProvider>
                  <App />
                </MobileConfigProvider>
              </Providers>
            </BrowserRouter>
          </React.StrictMode>
        </ZmpApp>
        ,
      </RecoilRoot>
    )
  }
};

window.Game.init()