import React from 'react';
import './App.css';
import {
  BrowserRouter as Router, Route, Switch
} from 'react-router-dom';
import PageHeader from './components/pageHeader';
import LoginPage from './pages/loginPage';
import GroupListPage from './pages/groupListPage';
import GroupSearchPage from './pages/groupSearchPage';
import ThreadListPage from './pages/threadListPage';
import UserManagementPage from './pages/userManagementPage';

function App() {
  return (
    <>
    <Router>
      <div className="App">
        <PageHeader />
        <div>
          <Switch>
            <Route path='/' component={LoginPage} exact/>
            <Route path='/groups' component={GroupListPage} exact/>
            <Route path='/search-groups' component={GroupSearchPage} exact/>
            <Route path='/groups/:group/threads' component={ThreadListPage} exact/>
            <Route path='/groups/:group/manage' component={UserManagementPage} exact/>
          </Switch>
        </div>
      </div>
    </Router>
    </>
  );
}

export default App;
