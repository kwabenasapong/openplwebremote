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
  theme_list = null;
  theme_level = null;

  themeLevelSwitching = false;
  unsupportedLevel = false;


  constructor(private pageTitleService: PageTitleService, private openlpService: OpenLPService) {
    pageTitleService.changePageTitle('Themes');
  }

  ngOnInit() {
    this.getThemeLevel();
    this.getThemes();
  }

  getThemeLevel() {
    this.openlpService.getThemeLevel().subscribe(theme_level => {
      this.theme_level = theme_level;
      this.unsupportedLevelCheck(this.theme_level);
    });
  }

  getThemes() {
    this.openlpService.getThemes().subscribe(theme_list => this.theme_list = theme_list);
  }

  onThemeLevelSelected(level: string) {
    this.openlpService.setThemeLevel(level).subscribe(res => this.getThemes());
  }

  onThemeSelected(theme: string) {
    this.openlpService.setTheme(theme).subscribe(res => this.getThemes());
  }

  levelSliderChanged(event: MatSlideToggleChange) {
    this.themeLevelSwitching = event.checked;
  }

  unsupportedLevelCheck(level) {
    this.getThemeLevel();
    if (level === 'song') {
      this.unsupportedLevel = true;
      this.themeLevelSwitching = true;
    }
    else {
      this.unsupportedLevel = false;
    }
  }
}
