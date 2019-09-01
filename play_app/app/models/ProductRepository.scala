package models

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class ProductRepository @Inject()(dbConfigProvider: DatabaseConfigProvider, categoryRepository: CategoryRepository)(implicit ec: ExecutionContext) {
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import categoryRepository.CategoryTable
  import dbConfig._
  import profile.api._

  private val product = TableQuery[ProductTable]
  private val category = TableQuery[CategoryTable]

  def create(name: String, sku: String, description: String, regular_price: Double, discount_price: Double, quantity: Int, taxable: Boolean, category: Int, image: String): Future[Product] = db.run {
    (product.map(p => (p.name, p.sku, p.description, p.regular_price, p.discount_price, p.quantity, p.taxable, p.categoryId, p.image))
      returning product.map(_.id)
      into { case ((`name`, `sku`, `description`, `regular_price`, `discount_price`, `quantity`, `taxable`, `category`, `image`), id) =>
        Product(id, name, sku, description, regular_price, discount_price, quantity, taxable, category, image)
    }) += (name, sku, description, regular_price, discount_price, quantity, taxable, category, image)
  }

  def findById(id: Int): Future[Product] = db.run {
    product.filter(_.id === id).result.head
  }

  def list(): Future[Seq[Product]] = db.run {
    product.result
  }

  def getByCategory(category_id: Int): Future[Seq[Product]] = db.run {
    product.filter(_.categoryId === category_id).result
  }

  def getByCategories(category_ids: List[Int]): Future[Seq[Product]] = db.run {
    product.filter(_.categoryId inSet category_ids).result
  }

  private class ProductTable(tag: Tag) extends Table[Product](tag, "products") {
    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
    def name = column[String]("name")
    def sku = column[String]("sku")
    def description = column[String]("description")
    def quantity = column[Int]("quantity")
    def regular_price = column[Double]("regular_price")
    def discount_price = column[Double]("discount_price")
    def categoryId = column[Int]("category")
    def taxable = column[Boolean]("taxable")
    def image = column[String]("image")
    def fk_category_products = foreignKey("fk_category_products", categoryId, category)(_.id)
    def * = (id, name, sku, description, regular_price, discount_price, quantity, taxable, categoryId, image) <> ((Product.apply _).tupled, Product.unapply)
  }
}
