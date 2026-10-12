import Image from 'next/image';
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded';
import AddRounded from '@mui/icons-material/AddRounded';
import StarRounded from '@mui/icons-material/StarRounded';
import LocalShippingRounded from '@mui/icons-material/LocalShippingRounded';
import VerifiedRounded from '@mui/icons-material/VerifiedRounded';
import SellRounded from '@mui/icons-material/SellRounded';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { LeftMenu } from '@/components/LeftMenu';
import { RightMenu } from '@/components/RightMenu';

const quickCategories = [
  'Tất cả', 'Giấy vệ sinh', 'Giấy ăn', 'Khăn ướt', 'Xà phòng', 'Nước giặt', 'Bánh kẹo', 'Đồ ăn vặt', 'Gia dụng',
];

const products = [
  { name: 'Táo Fuji nhập khẩu', detail: 'Túi 1kg', price: '59.000đ', tag: 'Bán chạy', image: 'https://cdn.dummyjson.com/product-images/groceries/apple/1.webp' },
  { name: 'Dầu ăn thực vật', detail: 'Chai 1 lít', price: '42.000đ', tag: 'Đề xuất', image: 'https://cdn.dummyjson.com/product-images/groceries/cooking-oil/1.webp' },
  { name: 'Mật ong nguyên chất', detail: 'Hũ 500g', price: '120.000đ', tag: 'Yêu thích', image: 'https://cdn.dummyjson.com/product-images/groceries/honey-jar/1.webp' },
  { name: 'Kem vani gia đình', detail: 'Hộp 1 lít', price: '69.000đ', tag: 'Giảm 10%', image: 'https://cdn.dummyjson.com/product-images/groceries/ice-cream/1.webp' },
  { name: 'Nước ép trái cây', detail: 'Lốc 6 chai', price: '42.000đ', tag: 'Bán chạy', image: 'https://cdn.dummyjson.com/product-images/groceries/juice/1.webp' },
  { name: 'Nước giải khát', detail: 'Lốc 6 lon', price: '55.000đ', tag: 'Yêu thích', image: 'https://cdn.dummyjson.com/product-images/groceries/soft-drinks/1.webp' },
  { name: 'Thịt bò tươi', detail: 'Khay 500g', price: '139.000đ', tag: 'Mới', image: 'https://cdn.dummyjson.com/product-images/groceries/beef-steak/1.webp' },
  { name: 'Gà tươi sơ chế', detail: 'Khay 1kg', price: '89.000đ', tag: 'Đề xuất', image: 'https://cdn.dummyjson.com/product-images/groceries/chicken-meat/1.webp' },
];

export function StoreHomePage() {
  return (
    <div className="storefront-shell flex h-screen min-h-screen flex-col overflow-hidden bg-neutral-100 font-sans text-neutral-800">
      <Header />
      <div className="mx-auto grid w-full max-w-[1600px] min-h-0 flex-1 grid-cols-1 grid-rows-[auto_auto_auto] content-start gap-md overflow-y-auto p-md lg:grid-cols-[220px_minmax(0,1fr)] lg:grid-rows-[auto_auto] xl:grid-cols-[235px_minmax(0,1fr)_286px] xl:grid-rows-[auto]">
        <LeftMenu />
        <main className="row-start-2 flex min-w-0 flex-1 flex-col gap-md lg:col-start-2 lg:row-start-1">
          <section className="relative isolate flex min-h-[190px] overflow-hidden rounded-lg border border-warning-200 bg-warning-100 md:min-h-[215px]" aria-labelledby="store-promo-title">
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-warning-100 via-secondary-100 to-primary-100" />
            <div className="relative z-10 flex w-full flex-col justify-center px-5 py-5 md:w-3/5 md:px-8">
              <p className="mb-1 text-xs font-extrabold uppercase text-primary-700 md:text-sm">Mỗi ngày thêm vui</p>
              <h1 id="store-promo-title" className="max-w-[420px] text-[27px] font-extrabold leading-[1.12] text-primary-800 md:text-[34px]">
                Ở nhà thật thích,<br /><span className="text-secondary-600">có Tạp Hóa Nhà Xinh</span>
              </h1>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-bold text-neutral-700"><LocalShippingRounded className="!text-base text-primary-500" />Giao nhanh 30 phút</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-bold text-neutral-700"><VerifiedRounded className="!text-base text-primary-500" />Hàng chính hãng</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-bold text-neutral-700"><SellRounded className="!text-base text-secondary-500" />Giá siêu tốt</span>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 hidden w-[46%] md:block">
              <Image
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=85"
                alt="Giỏ rau củ tươi tại cửa hàng tạp hóa"
                fill
                priority
                unoptimized
                sizes="(min-width: 768px) 46vw, 0px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-warning-100/80 via-warning-100/20 to-transparent" />
              <span className="absolute bottom-2 right-4 text-5xl" aria-hidden="true">🧺</span>
            </div>
            <span className="absolute right-4 top-3 text-2xl md:hidden" aria-hidden="true">🌼</span>
          </section>

          <nav className="flex gap-sm overflow-x-auto rounded-lg border border-neutral-200 bg-white p-sm scrollbar-hide" aria-label="Danh mục nhanh">
            {quickCategories.map((category, index) => (
              <a key={category} href="#products" className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-bold transition-colors ${index === 0 ? 'border-primary-200 bg-primary-100 text-primary-700' : 'border-neutral-200 bg-white text-neutral-700 hover:border-primary-200 hover:bg-primary-100'}`}>
                {index === 0 && <StarRounded className="!text-base text-primary-500" />}{category}
              </a>
            ))}
            <a href="#products" aria-label="Xem thêm danh mục" className="grid size-8 shrink-0 place-items-center rounded-full bg-primary-100 text-primary-600"><ChevronRightRounded fontSize="small" /></a>
          </nav>

          <section id="products" aria-labelledby="featured-heading">
            <div className="mb-sm flex items-center justify-between">
              <h2 id="featured-heading" className="flex items-center gap-sm text-h2 font-extrabold text-primary-800"><StarRounded className="text-primary-500" />Sản phẩm nổi bật</h2>
              <a href="#products" className="inline-flex items-center text-xs font-bold text-primary-700 hover:text-primary-500">Xem tất cả <ChevronRightRounded className="!text-base" /></a>
            </div>
            <div className="grid grid-cols-2 gap-md sm:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <article key={product.name} className="group min-w-0 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                  <div className="relative mx-2 mt-2 flex aspect-[1.2/1] items-center justify-center overflow-hidden rounded-md bg-neutral-100 p-2">
                    <Image src={product.image} alt={product.name} width={220} height={180} unoptimized className="size-full object-contain transition-transform group-hover:scale-105" />
                  </div>
                  <div className="p-md">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-warning-700"><StarRounded className="!text-xs text-warning-500" />{product.tag}</span>
                    <h3 className="mt-0.5 truncate text-xs font-extrabold text-neutral-800 md:text-sm">{product.name}</h3>
                    <p className="mt-0.5 text-[11px] text-neutral-600">{product.detail}</p>
                    <div className="mt-2 flex items-center justify-between gap-1">
                      <span className="text-xs font-extrabold text-primary-700 md:text-sm">{product.price}</span>
                      <button type="button" aria-label={`Thêm ${product.name} vào giỏ hàng`} className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary-500 text-white transition-colors hover:bg-secondary-600"><AddRounded /></button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <div className="flex items-center justify-center gap-sm rounded-lg bg-warning-100 p-md text-center text-caption font-bold text-neutral-700 xl:hidden">
            <span aria-hidden="true">🐱</span> Thành viên thân thiết · Tích điểm đổi quà <span aria-hidden="true">🎁</span>
          </div>
        </main>
        <div className="row-start-3 lg:col-start-2 lg:row-start-2 xl:col-start-3 xl:row-start-1">
          <RightMenu />
        </div>
      </div>
      <Footer />
    </div>
  );
}