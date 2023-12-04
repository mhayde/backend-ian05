import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Proveedor} from './proveedor.model';
import {IngresoProducto} from './ingreso-producto.model';

@model()
export class FacturaCompra extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;
  @property({
    type: 'string',
    required: true,
  })
  numeroFactura: string;

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

  @belongsTo(() => Proveedor)
  proveedorId: string;

  @hasMany(() => IngresoProducto)
  ingresoProductos: IngresoProducto[];

  constructor(data?: Partial<FacturaCompra>) {
    super(data);
  }
}

export interface FacturaCompraRelations {
  // describe navigational properties here
}

export type FacturaCompraWithRelations = FacturaCompra & FacturaCompraRelations;
