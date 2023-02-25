export const products = 'http://refidas-shop-dev.us-east-1.elasticbeanstalk.com/api/products/'
export const register = 'http://refidas-shop-dev.us-east-1.elasticbeanstalk.com/api_auth/register/'
export const login = 'http://refidas-shop-dev.us-east-1.elasticbeanstalk.com/api_auth/token/'
export const token_refresh = 'http://refidas-shop-dev.us-east-1.elasticbeanstalk.com/api_auth/token/refresh/'
export const getCartApiUrl = (userId) =>`http://refidas-shop-dev.us-east-1.elasticbeanstalk.com/api/users/${userId}/cart`
export const token_validity = 300