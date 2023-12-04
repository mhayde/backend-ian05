import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Venta} from './venta.model';
import {Producto} from './producto.model';

@model()
export class RetiroProducto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;
  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'date',
    required: true,
  })
  fechaVenta: string;

  @belongsTo(() => Venta)
  ventaId: string;

  @belongsTo(() => Producto)
  productoId: string;

  constructor(data?: Partial<RetiroProducto>) {
    super(data);
  }
}

export interface RetiroProductoRelations {
  // describe navigational properties here
}

export type RetiroProductoWithRelations = RetiroProducto & RetiroProductoRelations;
