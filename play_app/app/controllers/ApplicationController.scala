package controllers

import javax.inject.Inject
import com.mohiva.play.silhouette.api.actions.SecuredRequest
import com.mohiva.play.silhouette.api.{LogoutEvent, Silhouette}
import org.webjars.play.WebJarsUtil
import play.api.i18n.I18nSupport
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents}
import utils.auth.DefaultEnv

import scala.concurrent.Future

class ApplicationController @Inject() ( components: ControllerComponents, silhouette: Silhouette[DefaultEnv])(
                                        implicit webJarsUtil: WebJarsUtil, assets: AssetsFinder
                                      ) extends AbstractController(components) with I18nSupport {

  def index: Action[AnyContent] = silhouette.SecuredAction.async { implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
    Future.successful(Redirect("http://localhost:3000/authenticate"))
  }

  def signOut: Action[AnyContent] = silhouette.SecuredAction.async { implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
    val result = Redirect("http://localhost:3000/authenticate")

    silhouette.env.eventBus.publish(LogoutEvent(request.identity, request))
    silhouette.env.authenticatorService.discard(request.authenticator, result)
  }
}
