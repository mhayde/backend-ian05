import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {FacturaCompra, FacturaCompraRelations, Proveedor, IngresoProducto} from '../models';
import {ProveedorRepository} from './proveedor.repository';
import {IngresoProductoRepository} from './ingreso-producto.repository';

export class FacturaCompraRepository extends DefaultCrudRepository<
  FacturaCompra,
  typeof FacturaCompra.prototype.id,
  FacturaCompraRelations
> {

  public readonly proveedor: BelongsToAccessor<Proveedor, typeof FacturaCompra.prototype.id>;

  public readonly ingresoProductos: HasManyRepositoryFactory<IngresoProducto, typeof FacturaCompra.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>, @repository.getter('IngresoProductoRepository') protected ingresoProductoRepositoryGetter: Getter<IngresoProductoRepository>,
  ) {
    super(FacturaCompra, dataSource);
    this.ingresoProductos = this.createHasManyRepositoryFactoryFor('ingresoProductos', ingresoProductoRepositoryGetter,);
    this.registerInclusionResolver('ingresoProductos', this.ingresoProductos.inclusionResolver);
    this.proveedor = this.createBelongsToAccessorFor('proveedor', proveedorRepositoryGetter,);
    this.registerInclusionResolver('proveedor', this.proveedor.inclusionResolver);
  }
}
