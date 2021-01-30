import { Component, OnInit } from '@angular/core';
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
  }

  get themeList(): Array<string> {
    return this._themeList;
  }

  get themeLevel(): string {
    return this._themeLevel;
  }

  set themeLevel(level: string) {
    this._themeLevel = level;
    this.openlpService.setThemeLevel(level).subscribe(() => this.getTheme());
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
    this.openlpService.getTheme().subscribe(theme => {
      this._theme = theme;
      // Modify the theme list with the current theme. We do this instead of getting all the themes again
      // We do this here to ensure that the program is the only source of truth for the current theme
      for (const i of this._themeList) {
        if ((i.name === theme) && (i.selected === false)) { i.selected = true; }
        else if ((i.name !== theme) && (i.selected === true)) { i.selected = false; }
      }
    });
  }

  setTheme(themeName: string) {
    this.openlpService.setTheme(themeName).subscribe(() => this.getTheme());
  }
}
