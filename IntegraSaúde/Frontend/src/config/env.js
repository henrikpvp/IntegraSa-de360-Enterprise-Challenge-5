export const ENV = Object.freeze({
  API_URL: (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api').replace(/\/$/, ''),
  TOKEN_KEY: 'integrasaude_token',
  USER_KEY: 'integrasaude_user',
  TIMEOUT: 15000, // 15 segundos de timeout para chamadas de API
});