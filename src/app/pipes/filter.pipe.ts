import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(arreglo: any[], texto: string, valor: string): any {

    if (texto === '') {
      return arreglo;
    }

    texto = texto.toLowerCase();
    return arreglo.filter(item => {
      return item[valor].toLowerCase().includes(texto);
    });

  }
}
