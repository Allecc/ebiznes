package controllers

import javax.inject.Inject
import models._
import play.api.data.Form
import play.api.data.Forms._
import play.api.libs.json.Json
import play.api.mvc.{Action, AnyContent, MessagesAbstractController, MessagesControllerComponents}

import scala.concurrent.ExecutionContext

class RoleController @Inject()( roleRepository: RoleRepository, cc: MessagesControllerComponents)
                              (implicit ec: ExecutionContext) extends MessagesAbstractController(cc) {

  val roleForm: Form[CreateRoleForm] = Form {
    mapping("name" -> nonEmptyText,
    )(CreateRoleForm.apply)(CreateRoleForm.unapply)
  }

  def getRoles: Action[AnyContent] = Action.async { implicit request =>
    roleRepository.list().map { c =>
      Ok(Json.toJson(c))
    }
  }

  def getRoleById(id: Int): Action[AnyContent] = Action.async { implicit request =>
    roleRepository.findById(id).map { c =>
      Ok(Json.toJson(c))
    }
  }

  def post: Action[AnyContent] = Action.async { implicit request =>
    val name = request.body.asJson.get("name").as[String]
    roleRepository.create( name ).map { c =>
      Ok(Json.toJson(c))
    }
  }
}

case class CreateRoleForm(name: String)

