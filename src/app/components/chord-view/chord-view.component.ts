import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OpenLPService } from '../../openlp.service';
import { Slide } from '../../responses';
import { Observable } from 'rxjs';
import { StageViewComponent } from '../stage-view/stage-view.component';

@Component({
  selector: 'app-chord-view',
  templateUrl: './chord-view.component.html',
  styleUrls: ['./chord-view.component.scss', '../overlay.scss', './chordpro.scss'],
  encapsulation: ViewEncapsulation.None // needed for the chords to be displayed

})
export class ChordViewComponent extends StageViewComponent {
  transpose = 0;

  transposeUp(): void {
    this.transpose++;
  }

  transposeDown(): void {
    this.transpose--;
  }

  chordproFormatted(slide: Slide): string {
    if (!slide) {
      return '';
    }
    let chordpro: string = slide.chords_text;
    chordpro = chordpro.replace(/<span class="\w*\s*\w*">/g, '');
    chordpro = chordpro.replace(/<span>/g, '');
    chordpro = chordpro.replace(/<\/span>/g, '');
    chordpro = chordpro.replace(/<strong>/g, '[');
    chordpro = chordpro.replace(/<\/strong>/g, ']');

    return chordpro;
  }
}
