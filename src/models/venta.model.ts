import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {RetiroProducto} from './retiro-producto.model';

@model()
export class Venta extends Entity {
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
  subtotal: number;

  @property({
    type: 'number',
    required: true,
  })
  impuesto: number;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @belongsTo(() => Cliente)
  clienteId: string;

  @hasMany(() => RetiroProducto)
  retiroProductos: RetiroProducto[];

  constructor(data?: Partial<Venta>) {
    super(data);
  }
}

export interface VentaRelations {
  // describe navigational properties here
}

export type VentaWithRelations = Venta & VentaRelations;
