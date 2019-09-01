package models

import java.util.UUID

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile
import scala.concurrent.Await


import scala.concurrent.{ExecutionContext, Future}

@Singleton
class OrderRepository @Inject()(dbConfigProvider: DatabaseConfigProvider, salesOrderRepository: SalesOrderRepository)(implicit ec: ExecutionContext) {
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._
  import salesOrderRepository.SalesOrderTable

  private val salesOrders = TableQuery[SalesOrderTable]
  private val order = TableQuery[OrderTable]

  def create(orderNew: Order): Future[Order] = {

    val insertAction = (order += orderNew).flatMap {
    case 0 => DBIO.failed(new Exception("Failed to insert `Order` object"))
    case _ => DBIO.successful(orderNew)
  }
    db.run(insertAction)
  }

  def createMany(list: List[Order]): Future[List[Int]] = {
    val toBeInserted = list.map { row => order += row }
    val inOneGo = DBIO.sequence(toBeInserted)
    db.run(inOneGo)
  }

  def list(): Future[Seq[Order]] = db.run {
    order.result
  }

  def findById(id: UUID): Future[Order] = db.run {
    order.filter(_.id === id).result.head
  }

  def getByOrderId(category_id: UUID): Future[Seq[Order]] = db.run {
    order.filter(_.orderId === category_id).result
  }

  def getByOrderIds(category_ids: List[UUID]): Future[Seq[Order]] = db.run {
    order.filter(_.orderId inSet category_ids).result
  }

  private class OrderTable(tag: Tag) extends Table[Order](tag, "order_products") {
    def orderId = column[UUID]("order_id")
    def id = column[UUID]("id", O.PrimaryKey)
    def name = column[String]("name")
    def sku = column[String]("sku")
    def description = column[String]("description")
    def quantity = column[Int]("quantity")
    def price = column[Double]("price")
    def subtotal = column[Double]("subtotal")
    def * = (id, orderId, sku, name, description, quantity, price, subtotal) <> ((Order.apply _).tupled, Order.unapply)
    def fk_sales_orders_order_products = foreignKey("fk_sales_orders_order_products", orderId, salesOrders)(_.id)
  }
}
