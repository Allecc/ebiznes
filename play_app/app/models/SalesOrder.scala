package models

import java.sql.Date
import java.util.UUID

import play.api.libs.json.{Json, OFormat}

case class SalesOrder(id: UUID, order_date: Date, total: Double, user_id: UUID)

object SalesOrder {
  implicit val salesOrdersFormat: OFormat[SalesOrder] = Json.format[SalesOrder]

}
