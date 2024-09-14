using System.ComponentModel.DataAnnotations;

namespace api_shop.Model
{
    public class Products
    {

        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "A product name is required.")]
        public string Title { get; set; }
        public string Description { get; set; } = string.Empty;
        public string ImgCover { get; set; } = string.Empty;

        public string AllImg { get; set; } = string.Empty;
        //json string 
        /*AllImg: [
          '/assets/5s-1.jpeg',
          '/assets/5s-2.jpeg',
        ]*/

        //เอาไว้ใช้ส่งไปคิดเงินที่ payment stcripe น่ะ
        public string PriceID { get; set; } = string.Empty;
        //เอาไว้คำนวณคิดเงินแสดงผลที่หน้าบ้าน

        [Required(ErrorMessage = "The product price is required.")]
        public long Price { get; set; }
        public long Quantity { get; set; } = 0;
        [Required(ErrorMessage = "The inventory quantity is required.")]
        public long Inventory { get; set; }
        public Boolean Select { get; set; } = false;
    }
}
