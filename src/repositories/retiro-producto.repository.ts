import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {RetiroProducto, RetiroProductoRelations, Venta, Producto} from '../models';
import {VentaRepository} from './venta.repository';
import {ProductoRepository} from './producto.repository';

export class RetiroProductoRepository extends DefaultCrudRepository<
  RetiroProducto,
  typeof RetiroProducto.prototype.id,
  RetiroProductoRelations
> {

  public readonly venta: BelongsToAccessor<Venta, typeof RetiroProducto.prototype.id>;

  public readonly producto: BelongsToAccessor<Producto, typeof RetiroProducto.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('VentaRepository') protected ventaRepositoryGetter: Getter<VentaRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(RetiroProducto, dataSource);
    this.producto = this.createBelongsToAccessorFor('producto', productoRepositoryGetter,);
    this.registerInclusionResolver('producto', this.producto.inclusionResolver);
    this.venta = this.createBelongsToAccessorFor('venta', ventaRepositoryGetter,);
    this.registerInclusionResolver('venta', this.venta.inclusionResolver);
  }
}
