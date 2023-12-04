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
  IngresoProducto,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoIngresoProductoController {
  constructor(
    @repository(ProductoRepository) protected productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/ingreso-productos', {
    responses: {
      '200': {
        description: 'Array of Producto has many IngresoProducto',
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
    return this.productoRepository.ingresoProductos(id).find(filter);
  }

  @post('/productos/{id}/ingreso-productos', {
    responses: {
      '200': {
        description: 'Producto model instance',
        content: {'application/json': {schema: getModelSchemaRef(IngresoProducto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Producto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(IngresoProducto, {
            title: 'NewIngresoProductoInProducto',
            exclude: ['id'],
            optional: ['productoId']
          }),
        },
      },
    }) ingresoProducto: Omit<IngresoProducto, 'id'>,
  ): Promise<IngresoProducto> {
    return this.productoRepository.ingresoProductos(id).create(ingresoProducto);
  }

  @patch('/productos/{id}/ingreso-productos', {
    responses: {
      '200': {
        description: 'Producto.IngresoProducto PATCH success count',
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
    return this.productoRepository.ingresoProductos(id).patch(ingresoProducto, where);
  }

  @del('/productos/{id}/ingreso-productos', {
    responses: {
      '200': {
        description: 'Producto.IngresoProducto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(IngresoProducto)) where?: Where<IngresoProducto>,
  ): Promise<Count> {
    return this.productoRepository.ingresoProductos(id).delete(where);
  }
}
