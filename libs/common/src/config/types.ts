export interface AppConfig {
  accessJWTSecret: string;
  refreshJWTSecret: string;
  accessJWTExpiresIn: string;
  refreshJWTExpiresIn: string;
  port: number;
}
