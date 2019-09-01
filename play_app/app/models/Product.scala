package models

import play.api.libs.json._

case class Product(id: Int, name: String, sku: String, description: String, regular_price: Double, discount_price: Double, quantity: Int, taxable: Boolean, category: Int, image: String)

object Product {
  implicit val produtFormat: OFormat[Product] = Json.format[Product]
}
