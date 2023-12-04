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
  Venta,
  RetiroProducto,
} from '../models';
import {VentaRepository} from '../repositories';

export class VentaRetiroProductoController {
  constructor(
    @repository(VentaRepository) protected ventaRepository: VentaRepository,
  ) { }

  @get('/ventas/{id}/retiro-productos', {
    responses: {
      '200': {
        description: 'Array of Venta has many RetiroProducto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(RetiroProducto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<RetiroProducto>,
  ): Promise<RetiroProducto[]> {
    return this.ventaRepository.retiroProductos(id).find(filter);
  }

  @post('/ventas/{id}/retiro-productos', {
    responses: {
      '200': {
        description: 'Venta model instance',
        content: {'application/json': {schema: getModelSchemaRef(RetiroProducto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Venta.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RetiroProducto, {
            title: 'NewRetiroProductoInVenta',
            exclude: ['id'],
            optional: ['ventaId']
          }),
        },
      },
    }) retiroProducto: Omit<RetiroProducto, 'id'>,
  ): Promise<RetiroProducto> {
    return this.ventaRepository.retiroProductos(id).create(retiroProducto);
  }

  @patch('/ventas/{id}/retiro-productos', {
    responses: {
      '200': {
        description: 'Venta.RetiroProducto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RetiroProducto, {partial: true}),
        },
      },
    })
    retiroProducto: Partial<RetiroProducto>,
    @param.query.object('where', getWhereSchemaFor(RetiroProducto)) where?: Where<RetiroProducto>,
  ): Promise<Count> {
    return this.ventaRepository.retiroProductos(id).patch(retiroProducto, where);
  }

  @del('/ventas/{id}/retiro-productos', {
    responses: {
      '200': {
        description: 'Venta.RetiroProducto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(RetiroProducto)) where?: Where<RetiroProducto>,
  ): Promise<Count> {
    return this.ventaRepository.retiroProductos(id).delete(where);
  }
}
