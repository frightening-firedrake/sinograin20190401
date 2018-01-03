import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { CommonsModule } from '../common/common.module';
import { HomePage } from './home';
import { DepartmentPage } from './department/department';
import { IntroducePage } from './introduce/introduce';
import { SearchPage } from './search/search';
import { DepartmentContentPage } from './department/view/department_view';
import { NewListPage } from "./newlist/newlist"

import { HomeService } from './home.serve';

@NgModule({
    declarations: [
        HomePage,
        DepartmentPage,
        IntroducePage,
        SearchPage,
        DepartmentContentPage,
        NewListPage
    ],
    imports: [
        CommonModule,
        IonicModule.forRoot(HomePage,{},{
             links :[ 
                 { component: HomePage, name: 'Home', segment: 'home'},
                 { component: DepartmentPage, name: 'Department', segment: 'department', defaultHistory: [HomePage] },
                 { component: IntroducePage, name: 'Introduce', segment: 'introduce', defaultHistory: [HomePage] },
                 { component: SearchPage, name: 'Search', segment: 'search', defaultHistory: [HomePage] },
             ]
        }
        ), 
        CommonsModule
    ],
    entryComponents: [
        HomePage,
        DepartmentPage,
        IntroducePage,
        SearchPage,
        DepartmentContentPage,
        NewListPage
    ],
    providers:[
        HomeService
    ]
})
export class HomeModule {

}