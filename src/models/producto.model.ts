import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Categoria} from './categoria.model';
import {Proveedor} from './proveedor.model';
import {IngresoProducto} from './ingreso-producto.model';
import {RetiroProducto} from './retiro-producto.model';

@model()
export class Producto extends Entity {
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
    type: 'number',
    required: true,
  })
  existencia: number;

  @property({
    type: 'number',
    required: true,
  })
  precioCompra: number;

  @property({
    type: 'number',
    required: true,
  })
  precioVenta: number;

  @property({
    type: 'string',
    required: true,
  })
  ubicacion: string;
  @belongsTo(() => Categoria)
  categoriaId: string;

  @belongsTo(() => Proveedor)
  proveedorId: string;

  @hasMany(() => IngresoProducto)
  ingresoProductos: IngresoProducto[];

  @hasMany(() => RetiroProducto)
  retiroProductos: RetiroProducto[];

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
