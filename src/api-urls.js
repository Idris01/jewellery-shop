const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const products = `${BASE_URL}/api/products/`
export const register = `${BASE_URL}/api_auth/register/`
export const login = `${BASE_URL}/api_auth/token/`
export const token_refresh = `${BASE_URL}/api_auth/token/refresh/`
export const getCartApiUrl = (userId) =>`${BASE_URL}/api/users/${userId}/cart/`
export const getProfileUrl = (userId) =>`${BASE_URL}/api/users/${userId}/profile/`
export const token_validity = 300
export const getProductApiUrl = (unique_id) => `${BASE_URL}/api/products/${unique_id}/`