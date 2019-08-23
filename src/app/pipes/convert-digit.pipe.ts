import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertDigit'
})
export class ConvertDigitPipe implements PipeTransform
{
  transform(value: any, _lang: string): string
  {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const lang = _lang || document.querySelector('html').getAttribute('lang');
    let retVal = value;

    if (typeof value === 'number')
    {
      retVal = retVal.toString();
    }

    switch (lang)
    {
      case 'fa':
        retVal = retVal.replace(/[0-9]/g, i => farsiDigits[i]);
        break;

      case 'en':
      default:
        break;
    }

    return retVal;
  }
}
