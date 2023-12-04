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
import {FacturaCompra} from '../models';
import {FacturaCompraRepository} from '../repositories';

export class FacturaCompraController {
  constructor(
    @repository(FacturaCompraRepository)
    public facturaCompraRepository : FacturaCompraRepository,
  ) {}

  @post('/factura-compras')
  @response(200, {
    description: 'FacturaCompra model instance',
    content: {'application/json': {schema: getModelSchemaRef(FacturaCompra)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FacturaCompra, {
            title: 'NewFacturaCompra',
            exclude: ['id'],
          }),
        },
      },
    })
    facturaCompra: Omit<FacturaCompra, 'id'>,
  ): Promise<FacturaCompra> {
    return this.facturaCompraRepository.create(facturaCompra);
  }

  @get('/factura-compras/count')
  @response(200, {
    description: 'FacturaCompra model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(FacturaCompra) where?: Where<FacturaCompra>,
  ): Promise<Count> {
    return this.facturaCompraRepository.count(where);
  }

  @get('/factura-compras')
  @response(200, {
    description: 'Array of FacturaCompra model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(FacturaCompra, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(FacturaCompra) filter?: Filter<FacturaCompra>,
  ): Promise<FacturaCompra[]> {
    return this.facturaCompraRepository.find(filter);
  }

  @patch('/factura-compras')
  @response(200, {
    description: 'FacturaCompra PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FacturaCompra, {partial: true}),
        },
      },
    })
    facturaCompra: FacturaCompra,
    @param.where(FacturaCompra) where?: Where<FacturaCompra>,
  ): Promise<Count> {
    return this.facturaCompraRepository.updateAll(facturaCompra, where);
  }

  @get('/factura-compras/{id}')
  @response(200, {
    description: 'FacturaCompra model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(FacturaCompra, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(FacturaCompra, {exclude: 'where'}) filter?: FilterExcludingWhere<FacturaCompra>
  ): Promise<FacturaCompra> {
    return this.facturaCompraRepository.findById(id, filter);
  }

  @patch('/factura-compras/{id}')
  @response(204, {
    description: 'FacturaCompra PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FacturaCompra, {partial: true}),
        },
      },
    })
    facturaCompra: FacturaCompra,
  ): Promise<void> {
    await this.facturaCompraRepository.updateById(id, facturaCompra);
  }

  @put('/factura-compras/{id}')
  @response(204, {
    description: 'FacturaCompra PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() facturaCompra: FacturaCompra,
  ): Promise<void> {
    await this.facturaCompraRepository.replaceById(id, facturaCompra);
  }

  @del('/factura-compras/{id}')
  @response(204, {
    description: 'FacturaCompra DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.facturaCompraRepository.deleteById(id);
  }
}
