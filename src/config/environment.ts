type Environment = 'dev' | 'staging' | 'prod';

interface EnvironmentConfig {
  ui: string;
  api: string;
}

const ENV_URLS: Record<Environment, EnvironmentConfig> = {
  dev: {
    ui: 'https://www.saucedemo.com',
    api: 'https://restful-booker.herokuapp.com',
  },
  staging: {
    ui: 'https://www.saucedemo.com',
    api: 'https://restful-booker.herokuapp.com',
  },
  prod: {
    ui: 'https://www.saucedemo.com',
    api: 'https://restful-booker.herokuapp.com',
  },
};

function getEnvironment(): Environment {
  const env = (process.env.ENV || 'prod') as Environment;
  if (!ENV_URLS[env]) {
    throw new Error(`Unknown environment: ${env}. Use dev, staging, or prod.`);
  }
  return env;
}

export function getBaseUrl(): string {
  return process.env.BASE_URL || ENV_URLS[getEnvironment()].ui;
}

export function getApiBaseUrl(): string {
  return process.env.API_BASE_URL || ENV_URLS[getEnvironment()].api;
}
