package models

import java.util.UUID

import com.mohiva.play.silhouette.api.Identity
import play.api.libs.json.Json

case class  User(userID: UUID, providerId: String, providerKey: String, first_name: Option[String], last_name: Option[String], fullName: Option[String],
  email: Option[String], avatarURL: Option[String], activated: Boolean, roleId: Int) extends Identity {

  def name = fullName.orElse {
    first_name -> last_name match {
      case (Some(f), Some(l)) => Some(f + " " + l)
      case (Some(f), None) => Some(f)
      case (None, Some(l)) => Some(l)
      case _ => None
    }
  }
}
object User {
  implicit val userFormat = Json.format[User]
}

