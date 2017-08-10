import { Ycs } from '@ycs/core';
import { IConfig } from 'ycs-plugin-fileuploader';

const config = Ycs.instance.config;

export const development: IConfig = [
  {
    name: 'images',
    tags: ['__plugin_fileuploader_images'],
    endpoint: '/fileuploads/images',
    path: config.root + '/fileuploads/images',
    authRole: 'fileuploader',
    allowTypes: ['image/png', 'image/jpeg'],
    min: 0,
    max: 1024 * 500,
    errors: {
      empty: 'Empty body',
      type: 'The mimetype of file is not allowed.',
      size: 'The size of file is not allowed.',
    },
    url: x => x.__auth + '/' + x._id + '.' + x.ext,
  },
  {
    name: 'audio',
    tags: ['__plugin_fileuploader_audio'],
    endpoint: '/fileuploads/audio',
    path: config.root + '/fileuploads/audio',
    authRole: 'fileuploader',
    allowTypes: ['audio/mpeg', 'audio/MPA', 'audio/mpa-robust', 'audio/ogg'],
    min: 0,
    max: 1024 * 500,
    errors: {
      empty: 'Empty body',
      type: 'The mimetype of file is not allowed.',
      size: 'The size of file is not allowed.',
    },
    url: x => x.__auth + '/' + x._id + '.' + x.ext,
  },
  {
    name: 'videos',
    tags: ['__plugin_fileuploader_videos'],
    endpoint: '/fileuploads/videos',
    path: config.root + '/fileuploads/videos',
    authRole: 'fileuploader',
    allowTypes: ['video/ogg', 'video/mp4'],
    min: 0,
    max: 1024 * 500,
    errors: {
      empty: 'Empty body',
      type: 'The mimetype of file is not allowed.',
      size: 'The size of file is not allowed.',
    },
    url: x => x.__auth + '/' + x._id + '.' + x.ext,
  },
];

export const production: IConfig = [
  {
    name: 'images',
    tags: ['__plugin_fileuploader_images'],
    endpoint: '/fileuploads/images',
    path: config.root + '/fileuploads/images',
    authRole: 'fileuploader',
    allowTypes: ['image/png', 'image/jpeg'],
    min: 0,
    max: 1024 * 500,
    errors: {
      empty: 'Empty body',
      type: 'The mimetype of file is not allowed.',
      size: 'The size of file is not allowed.',
    },
    url: x => x.__auth + '/' + x._id + '.' + x.ext,
  },
  {
    name: 'audio',
    tags: ['__plugin_fileuploader_audio'],
    endpoint: '/fileuploads/audio',
    path: config.root + '/fileuploads/audio',
    authRole: 'fileuploader',
    allowTypes: ['audio/mpeg', 'audio/MPA', 'audio/mpa-robust', 'audio/ogg'],
    min: 0,
    max: 1024 * 500,
    errors: {
      empty: 'Empty body',
      type: 'The mimetype of file is not allowed.',
      size: 'The size of file is not allowed.',
    },
    url: x => x.__auth + '/' + x._id + '.' + x.ext,
  },
  {
    name: 'videos',
    tags: ['__plugin_fileuploader_videos'],
    endpoint: '/fileuploads/videos',
    path: config.root + '/fileuploads/videos',
    authRole: 'fileuploader',
    allowTypes: ['video/ogg', 'video/mp4'],
    min: 0,
    max: 1024 * 500,
    errors: {
      empty: 'Empty body',
      type: 'The mimetype of file is not allowed.',
      size: 'The size of file is not allowed.',
    },
    url: x => x.__auth + '/' + x._id + '.' + x.ext,
  },
];
