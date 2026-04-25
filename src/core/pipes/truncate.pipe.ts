import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncate',
    standalone: true,
})
export class TruncatePipe implements PipeTransform {
    transform(value: string, front = 3, back = 3): string {
        if (!value) return '';
        return value.length > front + back ? `${value.substring(0, front)}…${value.substring(value.length - back)}` : value;
    }
}
