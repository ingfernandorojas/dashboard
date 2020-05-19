import { Component, OnInit, ViewChild } from '@angular/core';

import { UsersService } from '../../services/users.service';
import { Subject } from 'rxjs';
import { Users } from 'src/app/models/users';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  tabla: any[] = [];
  dtTrigger = new Subject();
  
  constructor(private Users: UsersService) { }


  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
  
    this.showData()
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  showData(){

    this.Users.getAllUsers()
              .subscribe(
                data => {
                  
                  this.tabla = data["data"];
                  this.dtTrigger.next();
                  
                },
                error => {console.error(error)}
              )

              

  }

}
