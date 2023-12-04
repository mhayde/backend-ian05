import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {IngresoProducto, IngresoProductoRelations, Producto, FacturaCompra} from '../models';
import {ProductoRepository} from './producto.repository';
import {FacturaCompraRepository} from './factura-compra.repository';

export class IngresoProductoRepository extends DefaultCrudRepository<
  IngresoProducto,
  typeof IngresoProducto.prototype.id,
  IngresoProductoRelations
> {

  public readonly producto: BelongsToAccessor<Producto, typeof IngresoProducto.prototype.id>;

  public readonly facturaCompra: BelongsToAccessor<FacturaCompra, typeof IngresoProducto.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>, @repository.getter('FacturaCompraRepository') protected facturaCompraRepositoryGetter: Getter<FacturaCompraRepository>,
  ) {
    super(IngresoProducto, dataSource);
    this.facturaCompra = this.createBelongsToAccessorFor('facturaCompra', facturaCompraRepositoryGetter,);
    this.registerInclusionResolver('facturaCompra', this.facturaCompra.inclusionResolver);
    this.producto = this.createBelongsToAccessorFor('producto', productoRepositoryGetter,);
    this.registerInclusionResolver('producto', this.producto.inclusionResolver);
  }
}
