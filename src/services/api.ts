import { LoginCredentials, LoginResponse } from '@/types/auth.types';

const API_BASE_URL = 'https://flownet-back.vercel.app/api';

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Error de conexión con el servidor');
    }
  }

  // Auth endpoints
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  // Movimientos endpoints
  async getMovimientos() {
    return this.request('/movimientos', { method: 'GET' });
  }

  async getMovimiento(id: number) {
    return this.request(`/movimientos/${id}`, { method: 'GET' });
  }

  async getMovimientosByNegocio(negocioId: number) {
    return this.request(`/movimientos/negocio/${negocioId}`, { method: 'GET' });
  }

  async getKardex(negocioId: number) {
    return this.request(`/movimientos/kardex/${negocioId}`, { method: 'GET' });
  }

  async getSaldo(negocioId: number) {
    return this.request(`/movimientos/kardex/${negocioId}/saldo`, { method: 'GET' });
  }

  async getKardexByProducto(negocioId: number, productoId: number) {
    return this.request(`/movimientos/kardex/${negocioId}/producto/${productoId}`, { method: 'GET' });
  }

  async getMovimientosByTipo(negocioId: number, tipo: 'entrada' | 'salida') {
    return this.request(`/movimientos/negocio/${negocioId}/tipo/${tipo}`, { method: 'GET' });
  }

  async getMovimientosByRango(negocioId: number, fechaInicio: string, fechaFin: string) {
    return this.request(`/movimientos/negocio/${negocioId}/rango?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`, { method: 'GET' });
  }

  async createMovimiento(data: any) {
    return this.request('/movimientos', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateMovimiento(id: number, data: any) {
    return this.request(`/movimientos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteMovimiento(id: number) {
    return this.request(`/movimientos/${id}`, { method: 'DELETE' });
  }

  // Productos endpoints
  async getProductos() {
    return this.request('/productos', { method: 'GET' });
  }

  async getProducto(id: number) {
    return this.request(`/productos/${id}`, { method: 'GET' });
  }
}

export const apiService = new ApiService(API_BASE_URL);
export default apiService;

