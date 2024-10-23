interface IOrdersProduct {
  ProductId: string;
  Quantity: number;
}
export interface IOrder {
  OrderId: number;
  OrderDate: string;
  UserId: string;
  Products: IOrdersProduct[];
  PaymentType: string;
}
