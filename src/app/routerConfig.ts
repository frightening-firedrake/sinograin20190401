import { DeepLinkConfig } from 'ionic-angular';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { loginPage } from '../pages/login/login'
import { ProjectPage } from '../pages/project/project';

export const linkConfig: DeepLinkConfig = {
  links: [
    { component: loginPage, name: 'login' ,segment: 'login' },
    { component: TabsPage, name: 'Tabs', segment: 'tab', defaultHistory: [loginPage]},
    // { component: HomePage, name: 'Home', segment: 'home' },
    // { component: TeamsPage, name: 'Teams', segment: 'teams' },
    // { component: TechPage, name: 'Tech', segment: 'tech' },
    // { component: ProjectPage, name: 'Project', segment: 'project' },
    // { component: SearchPage, name: 'Search', segment: 'search', defaultHistory: [HomePage] },
  ]
};