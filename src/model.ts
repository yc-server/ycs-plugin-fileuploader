import { IModel, Model, Schema } from '@ycs/core/lib/db';
import { IConfigItem } from './config';

export function createModel(item: IConfigItem): IModel {
  const schema = new Schema(
    {
      type: {
        type: String,
        required: true,
      },
      ext: {
        type: String,
        required: true,
      },
      mime: {
        type: String,
        required: true,
      },
    },
    { timestamps: {} }
  );
  schema.virtual('url').get(function() {
    return item.url(this);
  });
  return Model({
    name: `__plugin_fileuploader_${item.name}`,
    schema,
  });
}
