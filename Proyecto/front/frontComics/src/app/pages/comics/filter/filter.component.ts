import { Component } from '@angular/core';
import { ComicService } from 'src/app/shared/services/comic.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

export class FilterComponent {
  @Output() filterChanged: EventEmitter<string> = new EventEmitter<string>();

  filterForm: FormGroup;

  companyList: any[] = [];

  constructor (private service : ComicService, private fb: FormBuilder){

    service.getComics().subscribe((data:any) => {
      this.companyList = [...new Set( data.map((e:any) => e.company))];
    });

    this.filterForm = this.fb.group({
      company: "",
      text: ""
    });

  }

  submitForm(){
    console.log(this.filterForm.value);
    this.filterChanged.emit(this.filterForm.value);
  }

 
}