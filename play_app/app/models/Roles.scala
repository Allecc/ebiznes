package models

import play.api.libs.json.{Json, OFormat}

case class Roles(id: Int, role: String)

object Roles {
  implicit val rolesFormat: OFormat[Roles] = Json.format[Roles]
}
