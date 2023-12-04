import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Proveedor, ProveedorRelations, Producto, FacturaCompra} from '../models';
import {ProductoRepository} from './producto.repository';
import {FacturaCompraRepository} from './factura-compra.repository';

export class ProveedorRepository extends DefaultCrudRepository<
  Proveedor,
  typeof Proveedor.prototype.id,
  ProveedorRelations
> {

  public readonly productos: HasManyRepositoryFactory<Producto, typeof Proveedor.prototype.id>;

  public readonly facturaCompras: HasManyRepositoryFactory<FacturaCompra, typeof Proveedor.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>, @repository.getter('FacturaCompraRepository') protected facturaCompraRepositoryGetter: Getter<FacturaCompraRepository>,
  ) {
    super(Proveedor, dataSource);
    this.facturaCompras = this.createHasManyRepositoryFactoryFor('facturaCompras', facturaCompraRepositoryGetter,);
    this.registerInclusionResolver('facturaCompras', this.facturaCompras.inclusionResolver);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productoRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
  }
}
