import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';

@Injectable()
export class PageTitleService {
  private pageTitleSource = new Subject<string>();
  public pageTitleChanged$ = this.pageTitleSource.asObservable();

  constructor(private titleService: Title) {}

  changePageTitle(pageTitle: string) {
    this.pageTitleSource.next(pageTitle);
    this.titleService.setTitle(pageTitle + ' | OpenLP Remote');
  }
}
