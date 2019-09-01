package controllers

import javax.inject.Inject
import models._
import play.api.data.Form
import play.api.data.Forms._
import play.api.libs.json.Json
import play.api.mvc.{MessagesAbstractController, MessagesControllerComponents}

import scala.concurrent.{ExecutionContext, Future}

class CategoryController @Inject()(
                                    categoryRepo: CategoryRepository,
                                    cc: MessagesControllerComponents)
                                  (implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  val categoryForm: Form[CreateRoleForm] = Form {
    mapping("name" -> nonEmptyText,
    )(CreateRoleForm.apply)(CreateRoleForm.unapply)
  }

  def addCategory = Action.async { implicit request =>
    categoryForm.bindFromRequest.fold(
      _ => { Future.successful(Ok(Json.obj("result" -> false)))
      },
      category => { categoryRepo.create(category.name).map { _ =>
          Ok(Json.toJson("result" -> true))
        }
      }
    )
  }

  def getCategories = Action.async { implicit request =>
    categoryRepo.list().map { c =>
      Ok(Json.toJson(c))
    }
  }

  def getCategoryById(id: Int) = Action.async { implicit request =>
    categoryRepo.findById(id).map { c =>
      Ok(Json.toJson(c))
    }
  }

  def post = Action.async { implicit request =>
    val name = request.body.asJson.get("name").as[String]
    categoryRepo.create(
      name
    ).map { c =>
      Ok(Json.toJson(c))
    }
  }

}

case class CreateCategoryForm(name: String)
