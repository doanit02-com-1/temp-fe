import Link from 'next/link';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import SearchRounded from '@mui/icons-material/SearchRounded';
import StorefrontRounded from '@mui/icons-material/StorefrontRounded';
import LocalShippingRounded from '@mui/icons-material/LocalShippingRounded';
import VerifiedRounded from '@mui/icons-material/VerifiedRounded';
import ShoppingCartRounded from '@mui/icons-material/ShoppingCartRounded';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';

export function Header() {
  return (
    <header className="sticky top-0 z-30 shrink-0 border-b border-primary-100 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-[1600px] items-center gap-md p-md">
        <Link href="/" className="flex shrink-0 items-center gap-2 text-primary-700" aria-label="Tạp Hóa Nhà Xinh, trang chủ">
          <StorefrontRounded className="!text-[38px] text-primary-500 md:!text-[44px]" />
          <span className="flex flex-col text-[15px] font-extrabold leading-[17px] md:text-[18px] md:leading-5">
            <span>Tạp Hóa</span><span className="text-secondary-500">Nhà Xinh</span>
          </span>
        </Link>

        <div role="search" className="flex h-10 min-w-0 flex-1 items-center rounded-full border border-neutral-300 bg-neutral-100 px-3 focus-within:border-primary-400 md:mx-2 md:h-11 md:px-4">
          <input
            aria-label="Tìm kiếm sản phẩm"
            className="min-w-0 flex-1 bg-transparent text-sm text-neutral-800 outline-none placeholder:text-neutral-600"
            placeholder="Bạn cần tìm sản phẩm gì hôm nay?"
          />
          <IconButton aria-label="Tìm kiếm" size="small" color="primary">
            <SearchRounded fontSize="small" />
          </IconButton>
        </div>

        <div className="hidden items-center gap-5 xl:flex">
          <div className="flex items-center gap-2 text-primary-600">
            <LocalShippingRounded />
            <span className="text-xs font-bold leading-4 text-neutral-700">Giao nhanh<br />30 phút</span>
          </div>
          <div className="flex items-center gap-2 text-primary-600">
            <VerifiedRounded />
            <span className="text-xs font-bold leading-4 text-neutral-700">Cam kết<br />chất lượng</span>
          </div>
        </div>

        <Link href="/login" className="hidden shrink-0 items-center gap-2 md:flex">
          <span className="grid size-10 place-items-center rounded-full bg-secondary-100 text-xl" aria-hidden="true">😊</span>
          <span className="text-xs leading-4 text-neutral-700"><span className="block">Xin chào!</span><strong className="text-sm">Khách yêu</strong></span>
          <ExpandMoreRounded className="text-neutral-600" />
        </Link>

        <Link href="#cart" aria-label="Giỏ hàng" className="relative grid size-10 shrink-0 place-items-center rounded-full border border-primary-100 bg-primary-100 text-primary-600 md:size-11">
          <Badge badgeContent={8} color="secondary" overlap="circular">
            <ShoppingCartRounded />
          </Badge>
        </Link>
      </div>
    </header>
  );
}