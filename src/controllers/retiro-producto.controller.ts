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
import {RetiroProducto} from '../models';
import {RetiroProductoRepository} from '../repositories';

export class RetiroProductoController {
  constructor(
    @repository(RetiroProductoRepository)
    public retiroProductoRepository : RetiroProductoRepository,
  ) {}

  @post('/retiro-productos')
  @response(200, {
    description: 'RetiroProducto model instance',
    content: {'application/json': {schema: getModelSchemaRef(RetiroProducto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RetiroProducto, {
            title: 'NewRetiroProducto',
            exclude: ['id'],
          }),
        },
      },
    })
    retiroProducto: Omit<RetiroProducto, 'id'>,
  ): Promise<RetiroProducto> {
    return this.retiroProductoRepository.create(retiroProducto);
  }

  @get('/retiro-productos/count')
  @response(200, {
    description: 'RetiroProducto model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(RetiroProducto) where?: Where<RetiroProducto>,
  ): Promise<Count> {
    return this.retiroProductoRepository.count(where);
  }

  @get('/retiro-productos')
  @response(200, {
    description: 'Array of RetiroProducto model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(RetiroProducto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(RetiroProducto) filter?: Filter<RetiroProducto>,
  ): Promise<RetiroProducto[]> {
    return this.retiroProductoRepository.find(filter);
  }

  @patch('/retiro-productos')
  @response(200, {
    description: 'RetiroProducto PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RetiroProducto, {partial: true}),
        },
      },
    })
    retiroProducto: RetiroProducto,
    @param.where(RetiroProducto) where?: Where<RetiroProducto>,
  ): Promise<Count> {
    return this.retiroProductoRepository.updateAll(retiroProducto, where);
  }

  @get('/retiro-productos/{id}')
  @response(200, {
    description: 'RetiroProducto model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(RetiroProducto, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(RetiroProducto, {exclude: 'where'}) filter?: FilterExcludingWhere<RetiroProducto>
  ): Promise<RetiroProducto> {
    return this.retiroProductoRepository.findById(id, filter);
  }

  @patch('/retiro-productos/{id}')
  @response(204, {
    description: 'RetiroProducto PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RetiroProducto, {partial: true}),
        },
      },
    })
    retiroProducto: RetiroProducto,
  ): Promise<void> {
    await this.retiroProductoRepository.updateById(id, retiroProducto);
  }

  @put('/retiro-productos/{id}')
  @response(204, {
    description: 'RetiroProducto PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() retiroProducto: RetiroProducto,
  ): Promise<void> {
    await this.retiroProductoRepository.replaceById(id, retiroProducto);
  }

  @del('/retiro-productos/{id}')
  @response(204, {
    description: 'RetiroProducto DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.retiroProductoRepository.deleteById(id);
  }
}
