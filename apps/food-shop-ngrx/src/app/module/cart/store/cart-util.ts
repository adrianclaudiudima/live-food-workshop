import {ProductOrder} from "@livesession-food-workshop-angular/core/model";

export const updateProductOrderQuantity = (
  allProductsOrder: Array<ProductOrder>,
  productOrder: ProductOrder
): Array<ProductOrder> => {
  if (allProductsOrder.length === 0) {
    return [productOrder];
  } else {
    if (allProductsOrder.find((po) => po.product.id === productOrder.product.id)) {
      return allProductsOrder.map((po) =>
        po.product.id === productOrder.product.id ? {...po, quantity: po.quantity + productOrder.quantity} : {...po}
      );
    } else {
      return allProductsOrder.concat(productOrder);
    }
  }
};
