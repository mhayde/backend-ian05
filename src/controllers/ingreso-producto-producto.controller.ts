import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  IngresoProducto,
  Producto,
} from '../models';
import {IngresoProductoRepository} from '../repositories';

export class IngresoProductoProductoController {
  constructor(
    @repository(IngresoProductoRepository)
    public ingresoProductoRepository: IngresoProductoRepository,
  ) { }

  @get('/ingreso-productos/{id}/producto', {
    responses: {
      '200': {
        description: 'Producto belonging to IngresoProducto',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Producto),
          },
        },
      },
    },
  })
  async getProducto(
    @param.path.string('id') id: typeof IngresoProducto.prototype.id,
  ): Promise<Producto> {
    return this.ingresoProductoRepository.producto(id);
  }
}
