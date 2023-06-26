SELECT * FROM product_type;
SELECT * FROM product;
SELECT * FROM product_document;
SELECT * FROM product_document WHERE productid = 27;

SELECT product.id, product.number, product.name, product_type.name as category, product.housing, product.manufacturer
FROM product
INNER JOIN product_type ON product.category=product_type.id;

SELECT product.id, product.number, product.name, product_type.name as catageroy, product.manufacturer, product.factorynumber, product.housing, product.quantity, product.minimumquantity, product.storageplace, product.entrydate, product.updatedate
FROM product
INNER JOIN product_type ON product.category=product_type.id
WHERE product.id = 27;

SELECT * FROM unit
SELECT * FROM valuename
SELECT * FROM product_value

SELECT valuename.name, product_value.value, unit.unit
FROM product_value
INNER JOIN valuename ON valuename.id = product_value.valuenameid
INNER JOIN unit ON product_value.unitid = unit.id
WHERE product_value.productid = 27

SELECT * FROM product_price
SELECT * FROM supplier

SELECT supplier.name as supplier, product_price.quantity, product_price.price
FROM product_price
INNER JOIN supplier ON supplier.id=product_price.supplier_id
WHERE product_id = 110

SELECT * FROM product_supplier
SELECT product_supplier.number as supplier_productnumber,  FROM product_supplier

WHERE productid = 110