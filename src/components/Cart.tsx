import Image from 'next/image';
import Link from 'next/link';
import DeleteOutlineRounded from '@mui/icons-material/DeleteOutlineRounded';
import LocalShippingRounded from '@mui/icons-material/LocalShippingRounded';
import RedeemRounded from '@mui/icons-material/RedeemRounded';

const cartItems = [
  { name: 'Táo Fuji nhập khẩu', detail: 'Túi 1kg', quantity: 1, price: '59.000đ', image: 'https://cdn.dummyjson.com/product-images/groceries/apple/1.webp' },
  { name: 'Dầu ăn thực vật', detail: 'Chai 1 lít', quantity: 2, price: '84.000đ', image: 'https://cdn.dummyjson.com/product-images/groceries/cooking-oil/1.webp' },
  { name: 'Mật ong nguyên chất', detail: 'Hũ 500g', quantity: 1, price: '120.000đ', image: 'https://cdn.dummyjson.com/product-images/groceries/honey-jar/1.webp' },
  { name: 'Kem vani gia đình', detail: 'Hộp 1 lít', quantity: 1, price: '69.000đ', image: 'https://cdn.dummyjson.com/product-images/groceries/ice-cream/1.webp' },
  { name: 'Nước ép trái cây', detail: 'Lốc 6 chai', quantity: 1, price: '42.000đ', image: 'https://cdn.dummyjson.com/product-images/groceries/juice/1.webp' },
];

export function Cart() {
  return (
    <section id="cart" className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm" aria-labelledby="cart-heading">
      <div className="flex items-center justify-between border-b border-neutral-200 p-md">
        <h2 id="cart-heading" className="text-h3 font-extrabold text-neutral-800">Giỏ hàng của bạn</h2>
        <span className="text-2xl" aria-hidden="true">🐻</span>
      </div>
      <div className="divide-y divide-neutral-200 px-md">
        {cartItems.map((item) => (
          <article key={item.name} className="flex gap-sm py-md">
            <div className="grid size-14 shrink-0 place-items-center rounded-md bg-neutral-100 p-1">
              <Image src={item.image} alt={item.name} width={52} height={52} unoptimized className="size-full object-contain" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-1">
                <div className="min-w-0">
                  <h3 className="truncate text-xs font-bold text-neutral-800">{item.name}</h3>
                  <p className="mt-0.5 text-[11px] text-neutral-600">{item.detail}</p>
                </div>
                <button type="button" aria-label={`Xóa ${item.name}`} className="-mr-1 -mt-1 rounded p-1 text-neutral-500 hover:bg-secondary-100 hover:text-secondary-600">
                  <DeleteOutlineRounded fontSize="small" />
                </button>
              </div>
              <div className="mt-1.5 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-bold text-neutral-700"><span>−</span>{item.quantity}<span>+</span></span>
                <span className="text-xs font-extrabold text-primary-700">{item.price}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="mx-md border-t border-dashed border-neutral-300 py-md">
        <div className="flex items-center gap-sm text-primary-700"><LocalShippingRounded fontSize="small" /><span className="text-caption font-bold">Bạn được freeship!</span></div>
        <div className="mt-sm h-2 overflow-hidden rounded-full bg-primary-100"><div className="h-full w-4/5 rounded-full bg-primary-500" /></div>
        <p className="mt-xs text-caption text-neutral-600">Thêm 59K để được freeship <RedeemRounded className="float-right text-secondary-500" fontSize="small" /></p>
      </div>
      <div className="border-t border-neutral-200 p-md">
        <div className="mb-md flex justify-between text-body font-bold text-neutral-700"><span>Tạm tính</span><span>374.000đ</span></div>
        <Link href="/login" className="flex min-h-11 items-center justify-center gap-sm rounded-md bg-secondary-500 px-md text-body font-extrabold text-white transition-colors hover:bg-secondary-600">
          Tiến hành đặt hàng <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}