import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET, NavigationEnd } from '@angular/router';
import { InfoServiceService } from 'src/app/services/info-service.service';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-info-container',
  templateUrl: './info-container.component.html',
  styleUrls: ['./info-container.component.scss']
})
export class InfoContainerComponent implements OnInit {
  data: any;
  place: any;
  kanton: string;
  city: string;
  street: string;
  country: string;

  constructor(private router: Router,
    private _ngZone: NgZone,
    private route: ActivatedRoute,
    private infoService: InfoServiceService) {
  }

  ngOnInit() {

    this.route.data
      .subscribe(insertedData => this.place = insertedData.place);

    this.route.params
      .subscribe(routeParams => {
      const tree: UrlTree = this.router.parseUrl(this.router.url);
      const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
      const s: UrlSegment[] = g.segments;

      if (s[0]) {
        this.country = s[0].path;
      }

      if (s[1]) {
        this.kanton = s[1].path;
      }

      if (s[2]) {
        this.city = s[2].path;
      }

      if (s[3]) {
        this.street = s[3].path;
      }

      this.data = this.infoService.getData(this.place, this.kanton, this.city);
    });
  }

  goTo(name) {
    if (this.place !== 'street') {
      this.router.navigate([name], { relativeTo: this.route });
    }
  }

}
