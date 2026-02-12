import {HashRouter, Redirect, Route} from 'react-router-dom';
import {IonApp, IonRouterOutlet, setupIonicReact} from '@ionic/react';
import {Home} from './pages/Home';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';
import React from "react";

setupIonicReact();

export const App: React.FC = () => (
    <IonApp>
        <HashRouter>
            <IonRouterOutlet>
                <Route exact path="/home">
                    <Home/>
                </Route>
                <Route exact path="/">
                    <Redirect to="/home"/>
                </Route>
            </IonRouterOutlet>
        </HashRouter>
    </IonApp>
);

