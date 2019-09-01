package models

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class CategoryRepository @Inject()(dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  def create(name: String): Future[Category] = db.run {
    (category.map(c => c.name)
      returning category.map(_.id)
      into { case (`name`, id) => Category(id, name) }
      ) += name
  }

  val category = TableQuery[CategoryTable]

  def findById(id: Int): Future[Category] = db.run {
    category.filter(_.id === id).result.head
  }

  def list(): Future[Seq[Category]] = db.run {
    category.result
  }

  class CategoryTable(tag: Tag) extends Table[Category](tag, "categories") {
    def name = column[String]("name")
    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
    def * = (id, name) <> ((Category.apply _).tupled, Category.unapply)
  }

}
