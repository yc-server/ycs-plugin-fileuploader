import { IContext } from '@ycs/core/lib/context';
import {
  IModel,
  Mongoose,
  paginate,
  patchUpdates,
  show,
} from '@ycs/core/lib/db';
import { Boom, handleError } from '@ycs/core/lib/errors';
import { response } from '@ycs/core/lib/response';
import { exists, unlink } from 'fs';
import { move } from 'fs-extra';
import * as mkdirp from 'mkdirp';
import { IConfigItem } from './config';
import { IErrors } from './errors';

function mkdirAsync(dir) {
  return new Promise((resolve, reject) => {
    mkdirp(dir, (err, made) => {
      if (err) return reject(err);
      return resolve(made);
    });
  });
}

function existsAsync(path) {
  return new Promise(resolve => {
    exists(path, yes => {
      return resolve(yes);
    });
  });
}

function rm(path) {
  return new Promise((resolve, reject) => {
    unlink(path, err => {
      if (err) return reject(err);
      return resolve();
    });
  });
}

export class Controller {
  constructor(private model: IModel, private item: IConfigItem) {}
  // Gets a list of Models
  public index = async (ctx: IContext) => {
    try {
      console.log('here', ctx);
      const paginateResult = await paginate(this.model, ctx);
      response(ctx, 200, paginateResult);
    } catch (e) {
      console.error(e);
      handleError(ctx, e);
    }
  };

  // Gets a single Model from the DB
  public show = async (ctx: IContext) => {
    try {
      const entity = await show(this.model, ctx);
      if (!entity) throw Boom.notFound();
      ctx.status = 200;
      ctx.body = entity;
    } catch (e) {
      handleError(ctx, e);
    }
  };

  // Creates a new Model in the DB
  public create = async (ctx: IContext) => {
    try {
      if (!ctx.request.fields) throw Boom.badData(this.item.errors.empty);
      delete ctx.request.fields._id;
      if (!ctx.request.fields.file || !ctx.request.fields.file.length)
        throw Boom.badData(this.item.errors.empty);
      const file = ctx.request.fields.file[0];
      if (!this.item.allowTypes.includes(file.type))
        throw Boom.badData(this.item.errors.type);
      if (file.size < this.item.min || file.size > this.item.max)
        throw Boom.badData(this.item.errors.size);

      const entity = new this.model();
      entity['type'] = this.item.name;
      const ss = file.name.split('.');
      const ext = ss[ss.length - 1];
      entity['ext'] = ext;
      entity['mime'] = file.type;
      entity['__auth'] = ctx.request.auth._id;

      const dir = this.item.path + '/' + ctx.request.auth._id;
      if (!await existsAsync(dir)) await mkdirAsync(dir);
      const filePath = dir + '/' + entity._id + '.' + ext;
      await move(file.path, filePath);
      await entity.save();
      response(ctx, 201, entity);
    } catch (e) {
      handleError(ctx, e);
    }
  };

  // Updates an existing Model in the DB
  public update = async (ctx: IContext) => {
    try {
      if (!ctx.request.fields) throw Boom.badData(this.item.errors.empty);
      delete ctx.request.fields._id;
      if (!ctx.request.fields.file || !ctx.request.fields.file.length)
        throw Boom.badData(this.item.errors.empty);
      const file = ctx.request.fields.file[0];
      if (!this.item.allowTypes.includes(file.type))
        throw Boom.badData(this.item.errors.type);
      if (file.size < this.item.min || file.size > this.item.max)
        throw Boom.badData(this.item.errors.size);

      const entity = await this.model.findById(ctx.params.id).exec();
      if (!entity) throw Boom.notFound();
      entity['type'] = this.item.name;
      const ss = file.name.split('.');
      const ext = ss[ss.length - 1];
      entity['ext'] = ext;
      entity['mime'] = file.type;

      const dir = this.item.path + '/' + ctx.request.auth._id;
      if (!await existsAsync(dir)) await mkdirAsync(dir);
      const filePath = dir + '/' + entity._id + '.' + ext;
      if (await existsAsync(filePath)) await rm(filePath);
      await move(file.path, filePath);
      await entity.save();
      response(ctx, 200, entity);
    } catch (e) {
      handleError(ctx, e);
    }
  };

  // Deletes a Model from the DB
  public destroy = async (ctx: IContext) => {
    try {
      const entity = await this.model.findById(ctx.params.id).exec();
      if (!entity) throw Boom.notFound();
      const dir = this.item.path + '/' + ctx.request.auth._id;
      const filePath = dir + '/' + entity._id + '.' + entity['ext'];
      if (await existsAsync(filePath)) await rm(filePath);
      await entity.remove();
      response(ctx, 204);
    } catch (e) {
      handleError(ctx, e);
    }
  };
}
