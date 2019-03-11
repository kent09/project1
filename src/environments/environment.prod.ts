import { ENV } from './config/env';

const env = ENV;

export const environment = {
  production: true,
  hmr       : false,
  API_ENDPOINT: env.KRYPTONIA_API_HOST + '/api',
  HOST: env.KRYPTONIA_API_HOST,
  PROFILE_IMAGE: env.KIMG_HOST + '/',
  ATTACHMENT_IMAGE: env.KRYPTONIA_API_HOST + '/image/uploads/tasks-attachment',
  TASK_IMAGE : env.KRYPTONIA_API_HOST + '/image/uploads/tasks',
  BUSI_LOGO : env.KRYPTONIA_API_HOST + '/image/uploads/business_logo',
  ws_url: env.KRYPTONIA_HOST + ':2096/',
  // SITE_KEY : '6Ld9wnYUAAAAAGZSS8dHyvinsKWUhHzZFfGirSIW',
  SITE_KEY : '6LdZPG4UAAAAAHe-nmUcXBvubl3fmVUXs_ABH_WN',
  liveHost: env.KRYPTONIA_HOST + '/',
  MAPI_HOST : env.MANAGER_API_HOST + '/api',
  GOOGLE_PROVIDER_ID : '816410566993-f46ovj9pmkvkd1ns43ibc18cu1lggtt0.apps.googleusercontent.com',
  SECRET : 'PROGEEKZ_DAVAO_@)!*',

  socket: env.KRYPTONIA_HOST + ':2096',
  chat_host_api: env.KRYPTONIA_HOST + ':2087/api',
};
