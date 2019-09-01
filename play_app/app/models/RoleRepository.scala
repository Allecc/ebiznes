package models

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class RoleRepository @Inject()(dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  val roles = TableQuery[RolesTable]

  def create(role: String): Future[Roles] = db.run {
    (roles.map(r => (r.role))
      returning roles.map(_.id)
      into { case ((role), id) => Roles(id, role) }
      ) += role
  }

  def list(): Future[Seq[Roles]] = db.run {
    roles.result
  }

  def findById(id: Int): Future[Option[Roles]] = db.run {
    roles.filter(_.id === id).result.headOption
  }

  class RolesTable(tag: Tag) extends Table[Roles](tag, "user_roles") {
    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
    def role = column[String]("role")
    def * = (id, role) <> ((Roles.apply _).tupled, Roles.unapply)
  }
}
