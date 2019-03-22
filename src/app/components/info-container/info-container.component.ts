import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, UrlTree,
  UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';
import { InfoServiceService } from 'src/app/services/info-service.service';
import * as _ from 'lodash'; // lodash library good library to use!

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
  current: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private infoService: InfoServiceService) {
  }

  ngOnInit() {

    // get related data when component initiliazed
    this.route.data
      .subscribe(insertedData => this.place = insertedData.place);

    // trigger this whenever a ropute changes
    this.route.params
      .subscribe(routeParams => {
        // get url paramters /country/kanton/city/street
        // for instance: /s[0].path/s[1].path/s[2].path/s[3].path
        const tree: UrlTree = this.router.parseUrl(this.router.url);
        const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
        const s: UrlSegment[] = g.segments;

        // create a map to hold url datas
        const segments = this.createSegmentsMap();

        // set the map with the incoming current route information
        Array.from(segments.keys()).forEach((item, i ) => {
          segments.set(item,  _.get(s[i], 'path', ''));
        });

        // get related data and update view, when this.data is
        // filled up with new data view will be rendered - one way binding!
        this.data = this.infoService
          .getData(this.place, segments.get('kanton'), segments.get('city'));
    });
  }

  createSegmentsMap() {
    return new Map()
    .set('country', '')
    .set('kanton', '')
    .set('city', '')
    .set('street', '');
  }

  goTo(name) {
    this.current = name;
    // dont let if user clicks on street. no more route is available
    if (this.place !== 'street') {
      this.router.navigate([name], { relativeTo: this.route });
    }
  }
}
