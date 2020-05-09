import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material';

import { OpenLPService } from '../../openlp.service';
import { PageTitleService } from '../../page-title.service';

@Component({
  selector: 'openlp-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss'],
  providers: [OpenLPService]
})
export class ThemesComponent implements OnInit {
  private _theme = null;
  private _themeList = [];
  private _themeLevel = null;

  constructor(private pageTitleService: PageTitleService, private openlpService: OpenLPService) {
    pageTitleService.changePageTitle('Themes');
  }

  ngOnInit() {
    this.getThemeLevel();
    this.getThemes();
    this.getTheme();
  }

  get theme(): string {
    return this._theme;
  }

  set theme(themeName: string) {
    this._theme = themeName;
    this.openlpService.setTheme(themeName).subscribe();
  }

  get themeList(): Array<string> {
    return this._themeList;
  }

  get themeLevel(): string {
    return this._themeLevel;
  }

  set themeLevel(level: string) {
    this._themeLevel = level;
    this.openlpService.setThemeLevel(level).subscribe();
  }

  isThemeLevelSupported(): boolean {
    return this._themeLevel !== 'song';
  }

  getThemeLevel() {
    this.openlpService.getThemeLevel().subscribe(themeLevel => this._themeLevel = themeLevel);
  }

  getThemes() {
    this.openlpService.getThemes().subscribe(themeList => this._themeList = themeList);
  }

  getTheme() {
    this.openlpService.getTheme().subscribe(theme => this._theme = theme);
  }
}
