import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'oderByPipe',
  pure: true
})
export class OderByPipePipe implements PipeTransform {

  transform(value: any[], propertyName: string): any[] {
    if (propertyName)
      return value.sort((a: any, b: any) => a[propertyName]- b[propertyName]);
        //b[propertyName].localeCompare(a[propertyName]));
    else
      return value;
  }


}
