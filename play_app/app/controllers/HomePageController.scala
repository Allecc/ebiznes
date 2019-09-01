package controllers

import javax.inject.Inject
import play.api.mvc.{AbstractController, ControllerComponents}

class HomePageController @Inject() (cc: ControllerComponents) extends AbstractController(cc){

  def index = Action{
    Ok("Homepage ok!")
  }
}
