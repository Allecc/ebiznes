package controllers

import java.sql.Date
import java.util.UUID

import javax.inject.Inject
import models.{SalesOrderRepository, UserRepository}
import play.api.data.Form
import play.api.data.Forms._
import play.api.data.format.Formats._
import play.api.libs.json.Json
import play.api.mvc.{Action, AnyContent, MessagesAbstractController, MessagesControllerComponents}

import scala.concurrent.ExecutionContext

class SalesController @Inject()(salesOrderRepository: SalesOrderRepository,
                                userRepository: UserRepository,
                                cc: MessagesControllerComponents
                               )(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  val salesForm: Form[CreateSaleForm] = Form {
    mapping(
      "order_date" -> of[Date],
      "total" -> of[Double],
      "user_id" -> number
    )(CreateSaleForm.apply)(CreateSaleForm.unapply)
  }

  def getSales: Action[AnyContent] = Action.async { implicit request =>
    salesOrderRepository.list().map { p =>
      Ok(Json.toJson(p))
    }
  }

  def getSaleById(id: UUID): Action[AnyContent] = Action.async { implicit request =>
    salesOrderRepository.findById(id).map { p =>
      Ok(Json.toJson(p))
    }
  }

  def getByUserId(id: UUID): Action[AnyContent] = Action.async { implicit request =>
    salesOrderRepository.getByUserId(id).map { products =>
      Ok(Json.toJson(products))
    }
  }

  def getByRolesId(categories: List[UUID]): Action[AnyContent] = Action.async { implicit request =>
    salesOrderRepository.getByRolesId(categories).map { products =>
      Ok(Json.toJson(products))
    }
  }

  def post: Action[AnyContent] = Action.async { implicit request =>
    val order_date = new Date(request.body.asJson.get("order_date").as[Long])
    val total = request.body.asJson.get("total").as[Double]
    val user_id = UUID.fromString(request.body.asJson.get("user_id").as[String])

    salesOrderRepository.create( order_date, total, user_id ).map { s =>
      Ok(Json.toJson(s))
    }
  }
}

case class CreateSaleForm(order_date: Date, total: Double, user_id: Int)

