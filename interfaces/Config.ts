export type Environment = "production" | "development" | "test" | undefined;

export interface Config {
  environment: Environment;
  base_url: string;
  db: {
    uri?: string;
    database?: string;
    host?: string;
    username?: string;
    password?: string;
    port?: number;
    pool?: number;
  };
}
