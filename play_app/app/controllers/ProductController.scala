package controllers

import javax.inject.Inject
import models.{CategoryRepository, ProductRepository}
import play.api.data.Form
import play.api.data.Forms._
import play.api.data.format.Formats._
import play.api.libs.json.Json
import play.api.mvc.{Action, AnyContent, MessagesAbstractController, MessagesControllerComponents}

import scala.concurrent.ExecutionContext

class ProductController @Inject()(productsRepo: ProductRepository,
                                  categoryRepo: CategoryRepository,
                                  cc: MessagesControllerComponents
                                 )(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  val productForm: Form[CreateProductForm] = Form {
    mapping(
      "name" -> nonEmptyText,
      "sku" -> nonEmptyText,
      "description" -> nonEmptyText,
      "regular_price" -> of[Double],
      "discount_price" -> of[Double],
      "quantity" -> number,
      "taxable" -> boolean,
      "category" -> number
    )(CreateProductForm.apply)(CreateProductForm.unapply)
  }

  def getProducts: Action[AnyContent] = Action.async { implicit request =>
    productsRepo.list().map { p =>
      Ok(Json.toJson(p))
    }
  }

  def getProductById(id: Int): Action[AnyContent] = Action.async { implicit request =>
    productsRepo.findById(id).map { p =>
      Ok(Json.toJson(p))
    }
  }

  def getByCategory(id: Int): Action[AnyContent] = Action.async { implicit request =>
    productsRepo.getByCategory(id).map { products =>
      Ok(Json.toJson(products))
    }
  }

  def getByCategories(categories: List[Int]): Action[AnyContent] = Action.async { implicit request =>
    productsRepo.getByCategories(categories).map { products =>
      Ok(Json.toJson(products))
    }
  }

  def post: Action[AnyContent] = Action.async { implicit request =>
    val name = request.body.asJson.get("name").as[String]
    val sku = request.body.asJson.get("sku").as[String]
    val description = request.body.asJson.get("description").as[String]
    val regular_price = request.body.asJson.get("regular_price").as[String].toDouble
    val discount_price = request.body.asJson.get("discount_price").as[String].toDouble
    val quantity = Integer.valueOf(request.body.asJson.get("quantity").as[String])
    val taxable = request.body.asJson.get("taxable").as[Boolean]
    val category = Integer.valueOf(request.body.asJson.get("category").as[String])
    val image = request.body.asJson.get("image").as[String]

    productsRepo.create(name, sku, description, regular_price, discount_price, quantity, taxable, category, image).map { product =>
      Ok(Json.toJson(product))
    }
  }

}

case class CreateProductForm(name: String, sku: String, description: String, regular_price: Double, discount_price: Double, quantity: Int, taxable: Boolean, category: Int)
