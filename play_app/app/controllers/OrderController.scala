package controllers

import java.util.UUID

import javax.inject.Inject
import models.{Order, OrderRepository, SalesOrderRepository}
import play.api.data.Form
import play.api.data.Forms._
import play.api.data.format.Formats._
import play.api.libs.json.{JsArray, JsObject, Json}
import play.api.mvc.{Action, AnyContent, MessagesAbstractController, MessagesControllerComponents}

import scala.collection.mutable.ListBuffer
import scala.concurrent.ExecutionContext

class OrderController @Inject()(orderRepository: OrderRepository,
                                salesOrderRepository: SalesOrderRepository,
                                cc: MessagesControllerComponents
                               )(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  val orderForm: Form[CreateOrderForm] = Form {
    mapping(
      "order_id" -> of[UUID],
      "sku" -> nonEmptyText,
      "name" -> nonEmptyText,
      "description" -> nonEmptyText,
      "price" -> of[Double],
      "quantity" -> number,
      "subtotal" -> of[Double]
    )(CreateOrderForm.apply)(CreateOrderForm.unapply)
  }

  def getOrders: Action[AnyContent] = Action.async { implicit request =>
    orderRepository.list().map { p =>
      Ok(Json.toJson(p))
    }
  }

  def getOrderById(id: UUID): Action[AnyContent] = Action.async { implicit request =>
    orderRepository.findById(id).map { p =>
      Ok(Json.toJson(p))
    }
  }

  def getOrdersByOrderId(id: UUID): Action[AnyContent] = Action.async { implicit request =>
    orderRepository.getByOrderId(id).map { products =>
      Ok(Json.toJson(products))
    }
  }

  def post: Action[AnyContent] = Action.async { implicit request =>
    val order_id = UUID.fromString(request.body.asJson.get("order_id").as[String])
    val sku = request.body.asJson.get("sku").as[String]
    val name = request.body.asJson.get("name").as[String]
    val description = request.body.asJson.get("description").as[String]
    val price = request.body.asJson.get("price").as[String].toDouble
    val quantity = request.body.asJson.get("quantity").as[String].toInt
    val subtotal = request.body.asJson.get("subtotal").as[String].toDouble

    orderRepository.create(Order(UUID.randomUUID(), order_id, sku, name, description, quantity, price, subtotal)).map { o =>
      Ok(Json.toJson(o))
    }
  }

  def postMany: Action[AnyContent] = Action.async { implicit request =>
    val items = request.body.asJson.get("order").as[JsArray].value
    val orders: ListBuffer[Order] = ListBuffer[Order]()

    for (item <- items) {
      val order_id = UUID.fromString(item.asInstanceOf[JsObject].value("order_id").as[String])
      val sku = item.asInstanceOf[JsObject].value("sku").as[String]
      val name = item.asInstanceOf[JsObject].value("name").as[String]
      val description = item.asInstanceOf[JsObject].value("description").as[String]
      val price = item.asInstanceOf[JsObject].value("price").as[Double]
      val quantity = item.asInstanceOf[JsObject].value("quantity").as[Int]
      val subtotal = item.asInstanceOf[JsObject].value("subtotal").as[Double]
      orders += Order( UUID.randomUUID(), order_id, sku, name, description, quantity, price, subtotal)
    }

    orderRepository.createMany(orders.toList).map { c =>
      Ok(Json.toJson(c))
    }
  }
}

case class CreateOrderForm(order_id: UUID, sku: String, name: String, description: String, price: Double, quantity: Int, subtotal: Double)

