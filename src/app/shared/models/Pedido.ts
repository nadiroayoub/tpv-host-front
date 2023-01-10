export interface Pedido {
  Id: string;
  EstadoPedido: EstadoPedido;
  Fecha: string;
}
export enum EstadoPedido {
  comanda = 1,
  preparado = 2,
  rechazado = 3,
}
