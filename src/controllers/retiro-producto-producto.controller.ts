import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  RetiroProducto,
  Producto,
} from '../models';
import {RetiroProductoRepository} from '../repositories';

export class RetiroProductoProductoController {
  constructor(
    @repository(RetiroProductoRepository)
    public retiroProductoRepository: RetiroProductoRepository,
  ) { }

  @get('/retiro-productos/{id}/producto', {
    responses: {
      '200': {
        description: 'Producto belonging to RetiroProducto',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Producto),
          },
        },
      },
    },
  })
  async getProducto(
    @param.path.string('id') id: typeof RetiroProducto.prototype.id,
  ): Promise<Producto> {
    return this.retiroProductoRepository.producto(id);
  }
}
