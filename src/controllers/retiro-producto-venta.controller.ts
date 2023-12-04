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
  Venta,
} from '../models';
import {RetiroProductoRepository} from '../repositories';

export class RetiroProductoVentaController {
  constructor(
    @repository(RetiroProductoRepository)
    public retiroProductoRepository: RetiroProductoRepository,
  ) { }

  @get('/retiro-productos/{id}/venta', {
    responses: {
      '200': {
        description: 'Venta belonging to RetiroProducto',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Venta),
          },
        },
      },
    },
  })
  async getVenta(
    @param.path.string('id') id: typeof RetiroProducto.prototype.id,
  ): Promise<Venta> {
    return this.retiroProductoRepository.venta(id);
  }
}
