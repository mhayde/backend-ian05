import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Venta, VentaRelations, Cliente, RetiroProducto} from '../models';
import {ClienteRepository} from './cliente.repository';
import {RetiroProductoRepository} from './retiro-producto.repository';

export class VentaRepository extends DefaultCrudRepository<
  Venta,
  typeof Venta.prototype.id,
  VentaRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Venta.prototype.id>;

  public readonly retiroProductos: HasManyRepositoryFactory<RetiroProducto, typeof Venta.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('RetiroProductoRepository') protected retiroProductoRepositoryGetter: Getter<RetiroProductoRepository>,
  ) {
    super(Venta, dataSource);
    this.retiroProductos = this.createHasManyRepositoryFactoryFor('retiroProductos', retiroProductoRepositoryGetter,);
    this.registerInclusionResolver('retiroProductos', this.retiroProductos.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
