import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  FacturaCompra,
  Proveedor,
} from '../models';
import {FacturaCompraRepository} from '../repositories';

export class FacturaCompraProveedorController {
  constructor(
    @repository(FacturaCompraRepository)
    public facturaCompraRepository: FacturaCompraRepository,
  ) { }

  @get('/factura-compras/{id}/proveedor', {
    responses: {
      '200': {
        description: 'Proveedor belonging to FacturaCompra',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Proveedor),
          },
        },
      },
    },
  })
  async getProveedor(
    @param.path.string('id') id: typeof FacturaCompra.prototype.id,
  ): Promise<Proveedor> {
    return this.facturaCompraRepository.proveedor(id);
  }
}
