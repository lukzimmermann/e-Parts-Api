SELECT
  product.id,
  product.name,
  product.category AS category_id,
  product_type.name AS category,
  product.factory_number,
  product.housing,
  product.quantity,
  product.minimum_quantity,
  product.storageplace,
  product.entrydate,
  product.updatedate,
  product.number,
  product.manufacturer
FROM
  (
    product
    JOIN product_type ON ((product.category = product_type.id))
  );