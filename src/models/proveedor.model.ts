import {Entity, model, property, hasMany} from '@loopback/repository';
import {Producto} from './producto.model';
import {FacturaCompra} from './factura-compra.model';

@model()
export class Proveedor extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  empresa: string;

  @hasMany(() => Producto)
  productos: Producto[];

  @hasMany(() => FacturaCompra)
  facturaCompras: FacturaCompra[];

  constructor(data?: Partial<Proveedor>) {
    super(data);
  }
}

export interface ProveedorRelations {
  // describe navigational properties here
}

export type ProveedorWithRelations = Proveedor & ProveedorRelations;
