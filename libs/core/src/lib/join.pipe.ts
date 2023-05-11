import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinPipe',
  standalone: true,
})
export class JoinPipe implements PipeTransform {
  transform<T extends any[]>(array: T): string {
    return array.join(', ');
  }
}
