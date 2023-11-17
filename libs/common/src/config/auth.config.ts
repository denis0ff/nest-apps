export const JWT_OPTIONS = {
  SECRET: '__________________secret_jwt_key_32_length__________________',
  SECRET_EXPIRES_IN: '15m',
};

export const jwtConfig = {
  secret: JWT_OPTIONS.SECRET,
  signOptions: { expiresIn: JWT_OPTIONS.SECRET_EXPIRES_IN },
};
