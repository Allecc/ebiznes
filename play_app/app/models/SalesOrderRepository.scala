package models

import java.sql.Date
import java.util.UUID

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class SalesOrderRepository @Inject()(dbConfigProvider: DatabaseConfigProvider, val userRepository: UserRepository)(implicit ec: ExecutionContext) {
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  private val salesOrder = TableQuery[SalesOrderTable]

  import userRepository.UserTable

  private val user = TableQuery[UserTable]

  def create(order_date: Date, total: Double, user_id: UUID): Future[SalesOrder] =  {

    val newSalesOrder = SalesOrder(UUID.randomUUID(), order_date, total, user_id);
    val insertAction = (salesOrder += newSalesOrder).flatMap {
      case 0 => DBIO.failed(new Exception("Failed to insert `SalesOrder` object"))
      case _ => DBIO.successful(newSalesOrder)
    }
    db.run(insertAction)
  }

  def list(): Future[Seq[SalesOrder]] = db.run {
    salesOrder.result
  }

  def findById(id: UUID): Future[SalesOrder] = db.run {
    salesOrder.filter(_.id === id).result.head
  }

  def getByUserId(category_id: UUID): Future[Seq[SalesOrder]] = db.run {
    salesOrder.filter(_.user_id === category_id).result
  }

  def getByRolesId(category_ids: List[UUID]): Future[Seq[SalesOrder]] = db.run {
    salesOrder.filter(_.user_id inSet category_ids).result
  }

  class SalesOrderTable(tag: Tag) extends Table[SalesOrder](tag, "sales_orders") {
    def id = column[UUID]("id", O.PrimaryKey)
    def order_date = column[Date]("order_date")
    def total = column[Double]("total")
    def user_id = column[UUID]("user_id")
    def * = (id, order_date, total, user_id) <> ((SalesOrder.apply _).tupled, SalesOrder.unapply)
    def fk_user_sales_order = foreignKey("fk_user_sales_order", user_id, user)(_.id)

  }

}
