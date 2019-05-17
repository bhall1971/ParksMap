import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Park } from '../shared/park';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-resultlist',
  templateUrl: './resultlist.component.html',
  styleUrls: ['./resultlist.component.sass']
})
export class ResultlistComponent implements OnInit {
  Parks$: Observable<Park[]>;
  Query = 'Lake George, NY';

  constructor(private restserv: RestService) { }

  ngOnInit() {
    /* assign the Parks$ observable */
    this.Parks$ = this.getParksList();    
  }
  getParksList() {

    return this.restserv.getParkData(this.Query).pipe(
      map(res => res as Park[])
    ); /* no subscribe because we're just passing the observalbe<Park[]> */

    // .subscribe((data: Park) => {
    //   this.Parks = {
    //     formattedaddress: data.formattedaddress,
    //     name: data.name
    //   };
    // });
  }
}
