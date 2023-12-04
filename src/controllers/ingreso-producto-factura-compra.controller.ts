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
  FacturaCompra,
} from '../models';
import {IngresoProductoRepository} from '../repositories';

export class IngresoProductoFacturaCompraController {
  constructor(
    @repository(IngresoProductoRepository)
    public ingresoProductoRepository: IngresoProductoRepository,
  ) { }

  @get('/ingreso-productos/{id}/factura-compra', {
    responses: {
      '200': {
        description: 'FacturaCompra belonging to IngresoProducto',
        content: {
          'application/json': {
            schema: getModelSchemaRef(FacturaCompra),
          },
        },
      },
    },
  })
  async getFacturaCompra(
    @param.path.string('id') id: typeof IngresoProducto.prototype.id,
  ): Promise<FacturaCompra> {
    return this.ingresoProductoRepository.facturaCompra(id);
  }
}
