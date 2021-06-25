import { Component, OnInit } from "@angular/core";
import { FirebaseDataService } from "src/app/services/firebase-data.service";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/comingCandidates",
    title: "Yaklaşan Görüşmeler",
    icon: "icon-time-alarm",
    class: ""
  },
  {
    path: "/candidates",
    title: "Adaylar",
    icon: "icon-badge",
    class: ""
  },
  {
    path: "/questions",
    title: "Sorular",
    icon: "icon-single-copy-04",
    class: ""
  },
  {
    path: "/istatistik",
    title: "İSTATİSTİK",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/user",
    title: "Profil",
    icon: "icon-single-02",
    class: ""
  },
  {
    path: "/settings",
    title: "Ayarlar",
    icon: "icon-settings-gear-63",
    class: "" 
  }
  
]

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[] = ROUTES
  adminRoutes = ["/istatistik"]
  userRoutes = ["/candidates"]

  constructor(public fbService: FirebaseDataService) {}
  
  removeForUser() {
    this.adminRoutes.forEach(each => {
      this.menuItems = this.menuItems.filter(obj => obj.path !== each)
    })
  }

  removeForAdmin(){
    this.userRoutes.forEach(each => {
      this.menuItems = this.menuItems.filter(obj => obj.path !== each)
    })
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem)
    this.fbService.adminCheck().then(res=>{
        if (!res.claims.admin) {
          this.removeForUser()
        }else {
          this.removeForAdmin()
        }
      })

  }

  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false
    }
    return true
  }

}
