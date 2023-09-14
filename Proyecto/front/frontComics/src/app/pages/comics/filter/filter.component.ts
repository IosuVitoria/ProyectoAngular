import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComicService } from 'src/app/shared/services/comic.service';
import { ComicI } from 'src/interfaces/model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Output() filterChanged: EventEmitter<any> = new EventEmitter<any>();

  filterForm: FormGroup;
  companyList: any[] = [];
  filteredList!: ComicI[];
  comicList!: ComicI[];

  constructor(private service: ComicService, private fb: FormBuilder) {
    service.getComics().subscribe((data: any) => {
      this.companyList = [...new Set(data.map((e: any) => e.company))];
    });

    this.filterForm = this.fb.group({
      company: "",
      text: ""
    });
  }

  submitForm() {
    console.log(this.filterForm.value);
    this.filterChanged.emit(this.filterForm.value);
  }

  resetFilters() {
    this.filterForm.reset();
    this.filterChanged.emit({ company: "", text: "" });
  }
}
