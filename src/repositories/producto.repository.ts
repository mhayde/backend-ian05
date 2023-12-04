import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Producto, ProductoRelations, Categoria, Proveedor, IngresoProducto, RetiroProducto} from '../models';
import {CategoriaRepository} from './categoria.repository';
import {ProveedorRepository} from './proveedor.repository';
import {IngresoProductoRepository} from './ingreso-producto.repository';
import {RetiroProductoRepository} from './retiro-producto.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly categoria: BelongsToAccessor<Categoria, typeof Producto.prototype.id>;

  public readonly proveedor: BelongsToAccessor<Proveedor, typeof Producto.prototype.id>;

  public readonly ingresoProductos: HasManyRepositoryFactory<IngresoProducto, typeof Producto.prototype.id>;

  public readonly retiroProductos: HasManyRepositoryFactory<RetiroProducto, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('CategoriaRepository') protected categoriaRepositoryGetter: Getter<CategoriaRepository>, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>, @repository.getter('IngresoProductoRepository') protected ingresoProductoRepositoryGetter: Getter<IngresoProductoRepository>, @repository.getter('RetiroProductoRepository') protected retiroProductoRepositoryGetter: Getter<RetiroProductoRepository>,
  ) {
    super(Producto, dataSource);
    this.retiroProductos = this.createHasManyRepositoryFactoryFor('retiroProductos', retiroProductoRepositoryGetter,);
    this.registerInclusionResolver('retiroProductos', this.retiroProductos.inclusionResolver);
    this.ingresoProductos = this.createHasManyRepositoryFactoryFor('ingresoProductos', ingresoProductoRepositoryGetter,);
    this.registerInclusionResolver('ingresoProductos', this.ingresoProductos.inclusionResolver);
    this.proveedor = this.createBelongsToAccessorFor('proveedor', proveedorRepositoryGetter,);
    this.registerInclusionResolver('proveedor', this.proveedor.inclusionResolver);
    this.categoria = this.createBelongsToAccessorFor('categoria', categoriaRepositoryGetter,);
    this.registerInclusionResolver('categoria', this.categoria.inclusionResolver);
  }
}
