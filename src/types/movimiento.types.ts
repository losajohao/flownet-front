export interface Movimiento {
  id: number;
  negocio_id: number;
  producto_id?: number | null;
  descripcion_producto?: string | null;
  tipo: 'entrada' | 'salida';
  cantidad: number | string;
  monto_unitario: number | string;
  total: number | string;
  fecha: string;
  observaciones?: string;
  created_at?: string;
  updated_at?: string;
}

export interface MovimientoCreate {
  negocio_id: number;
  producto_id?: number | null;
  descripcion_producto?: string;
  tipo: 'entrada' | 'salida';
  cantidad: number;
  monto_unitario: number;
  total: number;
  fecha: string;
  observaciones?: string;
}

export interface MovimientoUpdate extends Partial<MovimientoCreate> {
  id: number;
}

export interface KardexResponse {
  total_entradas: number;
  total_salidas: number;
  saldo_global: number;
  movimientos: Movimiento[];
}

export interface SaldoResponse {
  negocio_id: number;
  saldo: number;
  total_entradas: number;
  total_salidas: number;
}

export interface MovimientosState {
  movimientos: Movimiento[];
  kardex: KardexResponse | null;
  saldo: SaldoResponse | null;
  loading: boolean;
  error: string | null;
}

