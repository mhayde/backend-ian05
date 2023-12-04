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
  Producto,
  RetiroProducto,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoRetiroProductoController {
  constructor(
    @repository(ProductoRepository) protected productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/retiro-productos', {
    responses: {
      '200': {
        description: 'Array of Producto has many RetiroProducto',
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
    return this.productoRepository.retiroProductos(id).find(filter);
  }

  @post('/productos/{id}/retiro-productos', {
    responses: {
      '200': {
        description: 'Producto model instance',
        content: {'application/json': {schema: getModelSchemaRef(RetiroProducto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Producto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RetiroProducto, {
            title: 'NewRetiroProductoInProducto',
            exclude: ['id'],
            optional: ['productoId']
          }),
        },
      },
    }) retiroProducto: Omit<RetiroProducto, 'id'>,
  ): Promise<RetiroProducto> {
    return this.productoRepository.retiroProductos(id).create(retiroProducto);
  }

  @patch('/productos/{id}/retiro-productos', {
    responses: {
      '200': {
        description: 'Producto.RetiroProducto PATCH success count',
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
    return this.productoRepository.retiroProductos(id).patch(retiroProducto, where);
  }

  @del('/productos/{id}/retiro-productos', {
    responses: {
      '200': {
        description: 'Producto.RetiroProducto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(RetiroProducto)) where?: Where<RetiroProducto>,
  ): Promise<Count> {
    return this.productoRepository.retiroProductos(id).delete(where);
  }
}
