package controllers

import java.util.UUID

import com.mohiva.play.silhouette.api.Silhouette
import com.mohiva.play.silhouette.impl.providers.CredentialsProvider
import javax.inject.Inject
import models.{RoleRepository, User, UserRepository}
import play.api.libs.json.Json
import play.api.mvc.{Action, AnyContent, MessagesAbstractController, MessagesControllerComponents}
import utils.auth.DefaultEnv

import scala.concurrent.{ExecutionContext, Future}

class UserController @Inject()(userRepository: UserRepository,
                               rolesRepository: RoleRepository,
                               silhouette: Silhouette[DefaultEnv],
                               cc: MessagesControllerComponents
                              )(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  def getUsers: Action[AnyContent] = Action.async { implicit request =>
    userRepository.list().map { u =>
      Ok(Json.toJson(u))
    }
  }

  def isAdmin: Action[AnyContent] = silhouette.SecuredAction.async { implicit request =>
    val userId = request.identity.userID
    userRepository.isAdmin(userId).map {
      case true => Ok(Json.toJson(userId))
      case false => Forbidden(Json.toJson(userId))
    }
  }

  def getUser: Action[AnyContent] = silhouette.SecuredAction.async { implicit request =>
    val identity: User = request.identity
    Future.successful(Ok(Json.toJson(identity)))
  }

  def getByRole(id: Int): Action[AnyContent] = Action.async { implicit request =>
    userRepository.getByRoleId(id).map { users =>
      Ok(Json.toJson(users))
    }
  }

  def getUserById(id: UUID): Action[AnyContent] = Action.async { implicit request =>
    userRepository.find(id).map { p =>
      Ok(Json.toJson(p))
    }
  }

  def post: Action[AnyContent] = Action.async { implicit request =>
    val email = request.body.asJson.get("email").as[String]
    val first_name = request.body.asJson.get("first_name").as[String]
    val last_name = request.body.asJson.get("last_name").as[String]
    val active = request.body.asJson.get("active").as[Boolean]
    val role_id = request.body.asJson.get("role_id").as[String].toInt

    userRepository.save(User( UUID.randomUUID, CredentialsProvider.ID, email, Option(first_name), Option(last_name), Option(first_name + " " + last_name), Option(email), Option(""), activated = true, 1)).map {
      user => Ok(Json.toJson(user))
    }
  }
}