package models

import java.util.UUID

import play.api.libs.json.{Json, OFormat}

case class Order(id: UUID, order_id: UUID, sku: String, name: String, description: String, quantity: Int, price: Double, subtotal: Double)


object Order {
  implicit val orderFormat: OFormat[Order] = Json.format[Order]
}
