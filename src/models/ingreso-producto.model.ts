import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Producto} from './producto.model';
import {FacturaCompra} from './factura-compra.model';

@model()
export class IngresoProducto extends Entity {
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
  fechaCompra: string;

  @belongsTo(() => Producto)
  productoId: string;

  @belongsTo(() => FacturaCompra)
  facturaCompraId: string;

  constructor(data?: Partial<IngresoProducto>) {
    super(data);
  }
}

export interface IngresoProductoRelations {
  // describe navigational properties here
}

export type IngresoProductoWithRelations = IngresoProducto & IngresoProductoRelations;
