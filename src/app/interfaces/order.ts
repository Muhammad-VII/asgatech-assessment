export interface IOrdersProduct {
  ProductId: string;
  Quantity: number;
}
export interface IOrder {
  OrderId: string;
  OrderDate: string;
  UserId: string;
  Products: IOrdersProduct[];
  PaymentType: string;
}
