import { DeepLinkConfig } from 'ionic-angular';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { ProjectPage } from '../pages/project/project';
import { SearchPage } from '../pages/home/search/search';
import { projectViewPage } from '../pages/project/view/project_view'

export const linkConfig: DeepLinkConfig = {
  links: [
    { component: TabsPage, name: 'Tabs', segment: 'tab' },
    // { component: HomePage, name: 'Home', segment: 'home' },
    // { component: TeamsPage, name: 'Teams', segment: 'teams' },
    // { component: TechPage, name: 'Tech', segment: 'tech' },
    // { component: ProjectPage, name: 'Project', segment: 'project' },
    // { component: SearchPage, name: 'Search', segment: 'search', defaultHistory: [HomePage] },
    { component: projectViewPage,name:"Project_view",segment:'view/:list', defaultHistory:[ProjectPage]}
  ]
};