import { Ycs } from '@ycs/core';
import { IDocs } from '@ycs/core/lib/docs';
import { Router } from '@ycs/core/lib/routers';
import { IConfig } from './config';
import { Controller } from './controller';
import { createModel } from './model';

export async function setupRouter(app: Ycs): Promise<Router[]> {
  const config: IConfig = app.config.fileuploader;
  const routers: Router[] = [];
  for (const item of config) {
    const model = createModel(item);
    const controller = new Controller(model, item);
    routers.push(
      model.routes(
        item.endpoint,
        {
          path: '/',
          methods: ['get'],
          controller: controller.index,
          tags: item.tags,
          summary: 'List documents',
          description: 'List documents',
          consumes: ['application/json', 'application/xml'],
          produces: ['application/json', 'application/xml'],
          parameters: [model.docSchema.paginateOptions],
          responses: {
            200: {
              description: 'Successful operation',
              schema: model.docSchema.paginateResultWithOptions({
                exclude: '_id',
              }),
            },
            '4xx': model.docSchema.response4xx,
            '5xx': model.docSchema.response5xx,
          },
        },
        {
          path: '/',
          methods: ['post'],
          controller: controller.create,
          auth: {
            type: 'isAuthenticated',
          },
          tags: item.tags,
          summary: 'Upload a file',
          description: `<b>allow: </b>${item.allowTypes.join}`,
          consumes: ['multipart/form-data'],
          produces: ['application/json', 'application/xml'],
          parameters: [
            {
              name: 'file',
              in: 'formData',
              description: `<b>Min: </b>${item.min}<br /><b>Max: </b>${item.max}`,
              required: false,
              type: 'file',
            },
          ],
          responses: {
            201: {
              description: 'Successful operation',
              schema: model.docSchema.result,
            },
            '4xx': model.docSchema.response4xx,
            '5xx': model.docSchema.response5xx,
          },
        },
        {
          path: '/:id',
          methods: ['get'],
          controller: controller.show,
          tags: item.tags,
          summary: 'Retrieve a document',
          description: 'Retrieve a document',
          consumes: ['application/json', 'application/xml'],
          produces: ['application/json', 'application/xml'],
          parameters: [model.docSchema.showOptions, model.docSchema.paramId],
          responses: {
            200: {
              description: 'Successful operation',
              schema: model.docSchema.result,
            },
            '4xx': model.docSchema.response4xx,
            '5xx': model.docSchema.response5xx,
          },
        },
        {
          path: '/:id',
          methods: ['put', 'patch'],
          controller: controller.update,
          auth: {
            type: 'ownsOrHasRoles',
            roles: [item.authRole],
          },
          tags: item.tags,
          summary: 'Modify a document',
          description: `<b>allow: </b>${item.allowTypes.join}`,
          consumes: ['multipart/form-data'],
          produces: ['application/json', 'application/xml'],
          parameters: [
            model.docSchema.paramId,
            {
              name: 'file',
              in: 'formData',
              description: `<b>Min: </b>${item.min}<br /><b>Max: </b>${item.max}`,
              required: false,
              type: 'file',
            },
          ],
          responses: {
            200: {
              description: 'Successful operation',
              schema: model.docSchema.result,
            },
            '4xx': model.docSchema.response4xx,
            '5xx': model.docSchema.response5xx,
          },
        },
        {
          path: '/:id',
          methods: ['delete'],
          controller: controller.destroy,
          auth: {
            type: 'ownsOrHasRoles',
            roles: [item.authRole],
          },
          tags: item.tags,
          summary: 'Delete a document',
          description: 'Delete a document',
          produces: ['text/plain'],
          parameters: [model.docSchema.paramId],
          responses: {
            204: {
              description: 'Successful operation',
            },
            '4xx': model.docSchema.response4xx,
            '5xx': model.docSchema.response5xx,
          },
        }
      )
    );
  }
  return routers;
}
