import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bebidas'
})
export class BebidasPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {

    let aux = [];

    for(let item of Object.keys(value))
    {
      if(value[item].cantidad > 0)
        aux.push({bebida: item, cantidad: value[item].cantidad})
    }

    return aux
  }

}
