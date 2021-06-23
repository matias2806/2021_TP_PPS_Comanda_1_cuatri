import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'comidas'
})
export class ComidasPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {

    let aux = [];

    for(let item of Object.keys(value.platos))
    {
      if(value.platos[item].cantidad > 0)
        aux.push({comida: item, cantidad: value.platos[item].cantidad})
    }

    for(let item of Object.keys(value.postres))
    {
      if(value.postres[item].cantidad > 0)
        aux.push({comida: item, cantidad: value.postres[item].cantidad})
    }

    return aux;
  }

}
