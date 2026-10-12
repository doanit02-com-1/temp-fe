import { Cart } from '@/components/Cart';

export function RightMenu() {
  return (
    <aside className="self-start lg:sticky lg:top-md" aria-label="Giỏ hàng và ưu đãi">
      <Cart />
      <a href="#member" className="mt-md hidden items-center justify-between gap-sm rounded-lg bg-secondary-100 p-md xl:flex">
        <span className="text-3xl" aria-hidden="true">🐱</span>
        <span className="text-xs font-extrabold leading-5 text-neutral-800">Thành viên thân thiết<br /><span className="font-semibold text-secondary-600">Tích điểm đổi quà</span></span>
        <span className="text-2xl" aria-hidden="true">🎁</span>
      </a>
    </aside>
  );
}