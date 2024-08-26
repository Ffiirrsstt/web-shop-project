import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  displayError(errorData: any) {
    const err = errorData?.error?.errors;
    let message = '';
    if (!err) {
      const valueError = Object.values(errorData.error); // ได้เฉพาะ value มาแบบ ["1","2"]
      message = valueError.join('\n');
      return message;
    }

    const dataError = Object.entries(err) as [string, string[]][];

    dataError.forEach(([key, value]: [string, string[]]) => {
      const formattedValue = value.join('\n');
      message += `<strong>${key} :</strong>\n${formattedValue}\n`;
    });

    return message;
  }
}
