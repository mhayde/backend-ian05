import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Proveedor,
  FacturaCompra,
} from '../models';
import {ProveedorRepository} from '../repositories';

export class ProveedorFacturaCompraController {
  constructor(
    @repository(ProveedorRepository) protected proveedorRepository: ProveedorRepository,
  ) { }

  @get('/proveedors/{id}/factura-compras', {
    responses: {
      '200': {
        description: 'Array of Proveedor has many FacturaCompra',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(FacturaCompra)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<FacturaCompra>,
  ): Promise<FacturaCompra[]> {
    return this.proveedorRepository.facturaCompras(id).find(filter);
  }

  @post('/proveedors/{id}/factura-compras', {
    responses: {
      '200': {
        description: 'Proveedor model instance',
        content: {'application/json': {schema: getModelSchemaRef(FacturaCompra)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Proveedor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FacturaCompra, {
            title: 'NewFacturaCompraInProveedor',
            exclude: ['id'],
            optional: ['proveedorId']
          }),
        },
      },
    }) facturaCompra: Omit<FacturaCompra, 'id'>,
  ): Promise<FacturaCompra> {
    return this.proveedorRepository.facturaCompras(id).create(facturaCompra);
  }

  @patch('/proveedors/{id}/factura-compras', {
    responses: {
      '200': {
        description: 'Proveedor.FacturaCompra PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FacturaCompra, {partial: true}),
        },
      },
    })
    facturaCompra: Partial<FacturaCompra>,
    @param.query.object('where', getWhereSchemaFor(FacturaCompra)) where?: Where<FacturaCompra>,
  ): Promise<Count> {
    return this.proveedorRepository.facturaCompras(id).patch(facturaCompra, where);
  }

  @del('/proveedors/{id}/factura-compras', {
    responses: {
      '200': {
        description: 'Proveedor.FacturaCompra DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(FacturaCompra)) where?: Where<FacturaCompra>,
  ): Promise<Count> {
    return this.proveedorRepository.facturaCompras(id).delete(where);
  }
}
