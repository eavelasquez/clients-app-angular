import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() pagination: any;
  public to: number;
  public from: number;
  public pages: number[];
  public arrayLength: number;

  constructor() { }

  ngOnInit(): void {
    this.initPagination();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const paginationUpdate = changes['pagination'];
    if (paginationUpdate.previousValue) {
      this.initPagination();
    }
  }

  private initPagination(): void {
    this.to = Math.max(Math.min(this.pagination.totalPages, this.pagination.number + 4), 6);
    this.from = Math.min(Math.max(1, this.pagination.number - 4), this.pagination.totalPages - 5);
    if (this.pagination.totalPages > 5) {
      this.pages = new Array<number>(this.to - this.from + 1).fill(0).map((_page, index) => index + this.from);
    } else {
      this.pages = new Array<number>(this.pagination.totalPages).fill(0).map((_page, index) => index + 1);
    }
  }

}
