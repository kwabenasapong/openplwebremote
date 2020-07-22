import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({name: 'nl2br'})
export class Nl2BrPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }

    transform(value: string): string|SafeHtml {
      if (!value) {
        return value;
      }
      if (typeof value !== 'string') {
        throw Error(`Invalid pipe argument: '${value}' for pipe 'Nl2BrPipe'`);
      }
      return this.sanitizer.bypassSecurityTrustHtml(value.replace(/(?:\r\n|\r|\n)/g, '<br>'));
    }
}
