import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import Store from '../../pages/store';
import ControlPanel from '../../pages/control-panel';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


function MainMenu() {
    return (
        <BrowserRouter>
            <div className="MainMenu">
                <ul>
                    <li><Link to="/store">Store</Link></li>
                    <li><Link to="/control-panel">Control Panel</Link></li>
                </ul>
            </div>

            <Switch>
                <Route exact path="/" component={Store} />
                <Route path="/store" component={Store} />
                <Route path="/control-panel" component={ControlPanel} />
            </Switch>
        </BrowserRouter>        
    );
}

export default MainMenu;