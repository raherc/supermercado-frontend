import { DetalleVenta } from "./detalle-venta.model";

export class Venta {
    id!: number ;
    fecha !:Date;
    estado !: string;
    idSucursal !: number | null;
    detalle: DetalleVenta[]= [];
    total !: number
}
