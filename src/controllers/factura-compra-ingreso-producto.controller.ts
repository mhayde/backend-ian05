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
  FacturaCompra,
  IngresoProducto,
} from '../models';
import {FacturaCompraRepository} from '../repositories';

export class FacturaCompraIngresoProductoController {
  constructor(
    @repository(FacturaCompraRepository) protected facturaCompraRepository: FacturaCompraRepository,
  ) { }

  @get('/factura-compras/{id}/ingreso-productos', {
    responses: {
      '200': {
        description: 'Array of FacturaCompra has many IngresoProducto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(IngresoProducto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<IngresoProducto>,
  ): Promise<IngresoProducto[]> {
    return this.facturaCompraRepository.ingresoProductos(id).find(filter);
  }

  @post('/factura-compras/{id}/ingreso-productos', {
    responses: {
      '200': {
        description: 'FacturaCompra model instance',
        content: {'application/json': {schema: getModelSchemaRef(IngresoProducto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof FacturaCompra.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(IngresoProducto, {
            title: 'NewIngresoProductoInFacturaCompra',
            exclude: ['id'],
            optional: ['facturaCompraId']
          }),
        },
      },
    }) ingresoProducto: Omit<IngresoProducto, 'id'>,
  ): Promise<IngresoProducto> {
    return this.facturaCompraRepository.ingresoProductos(id).create(ingresoProducto);
  }

  @patch('/factura-compras/{id}/ingreso-productos', {
    responses: {
      '200': {
        description: 'FacturaCompra.IngresoProducto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(IngresoProducto, {partial: true}),
        },
      },
    })
    ingresoProducto: Partial<IngresoProducto>,
    @param.query.object('where', getWhereSchemaFor(IngresoProducto)) where?: Where<IngresoProducto>,
  ): Promise<Count> {
    return this.facturaCompraRepository.ingresoProductos(id).patch(ingresoProducto, where);
  }

  @del('/factura-compras/{id}/ingreso-productos', {
    responses: {
      '200': {
        description: 'FacturaCompra.IngresoProducto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(IngresoProducto)) where?: Where<IngresoProducto>,
  ): Promise<Count> {
    return this.facturaCompraRepository.ingresoProductos(id).delete(where);
  }
}
