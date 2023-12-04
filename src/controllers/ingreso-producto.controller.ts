import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {IngresoProducto} from '../models';
import {IngresoProductoRepository} from '../repositories';

export class IngresoProductoController {
  constructor(
    @repository(IngresoProductoRepository)
    public ingresoProductoRepository : IngresoProductoRepository,
  ) {}

  @post('/ingreso-productos')
  @response(200, {
    description: 'IngresoProducto model instance',
    content: {'application/json': {schema: getModelSchemaRef(IngresoProducto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(IngresoProducto, {
            title: 'NewIngresoProducto',
            exclude: ['id'],
          }),
        },
      },
    })
    ingresoProducto: Omit<IngresoProducto, 'id'>,
  ): Promise<IngresoProducto> {
    return this.ingresoProductoRepository.create(ingresoProducto);
  }

  @get('/ingreso-productos/count')
  @response(200, {
    description: 'IngresoProducto model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(IngresoProducto) where?: Where<IngresoProducto>,
  ): Promise<Count> {
    return this.ingresoProductoRepository.count(where);
  }

  @get('/ingreso-productos')
  @response(200, {
    description: 'Array of IngresoProducto model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(IngresoProducto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(IngresoProducto) filter?: Filter<IngresoProducto>,
  ): Promise<IngresoProducto[]> {
    return this.ingresoProductoRepository.find(filter);
  }

  @patch('/ingreso-productos')
  @response(200, {
    description: 'IngresoProducto PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(IngresoProducto, {partial: true}),
        },
      },
    })
    ingresoProducto: IngresoProducto,
    @param.where(IngresoProducto) where?: Where<IngresoProducto>,
  ): Promise<Count> {
    return this.ingresoProductoRepository.updateAll(ingresoProducto, where);
  }

  @get('/ingreso-productos/{id}')
  @response(200, {
    description: 'IngresoProducto model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(IngresoProducto, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(IngresoProducto, {exclude: 'where'}) filter?: FilterExcludingWhere<IngresoProducto>
  ): Promise<IngresoProducto> {
    return this.ingresoProductoRepository.findById(id, filter);
  }

  @patch('/ingreso-productos/{id}')
  @response(204, {
    description: 'IngresoProducto PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(IngresoProducto, {partial: true}),
        },
      },
    })
    ingresoProducto: IngresoProducto,
  ): Promise<void> {
    await this.ingresoProductoRepository.updateById(id, ingresoProducto);
  }

  @put('/ingreso-productos/{id}')
  @response(204, {
    description: 'IngresoProducto PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() ingresoProducto: IngresoProducto,
  ): Promise<void> {
    await this.ingresoProductoRepository.replaceById(id, ingresoProducto);
  }

  @del('/ingreso-productos/{id}')
  @response(204, {
    description: 'IngresoProducto DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.ingresoProductoRepository.deleteById(id);
  }
}
