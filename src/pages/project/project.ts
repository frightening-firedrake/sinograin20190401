import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { projectViewPage } from './view/project_view';

@Component({
  selector: 'page-about',
  templateUrl: 'project.html'
})
export class ProjectPage {
  project: string;
  list:number = 1;
  projects: object = {
    thumb: "assets/image/pront_03.png",
    name: "海信金融PPP項目",
    date: "17-05",
    content: "在等待的日子里刻苦读书锻炼身体谦卑做人............"
  }
  items = [];
  constructor(public navCtrl: NavController) {
    this.project = "pc"
    for (let i = 0; i < 5; i++) {
      this.items.push(this.projects);
    }
  }
  listPage() {
    this.list+=1
    this.navCtrl.push(projectViewPage,{
      list:this.list
    })
  }
  // 下拉刷新
  doRefresh(refresher) {
    console.log('Begin async operation', refresher.currentY);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  // 上啦加载
  doInfinite(infiniteScroll) {
    {
      console.log('Begin async operation');

      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          this.items.push(this.projects);
        }
        infiniteScroll.complete();
      }, 500);
    }
  }
}
