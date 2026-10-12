import LocalShippingRounded from '@mui/icons-material/LocalShippingRounded';
import RedeemRounded from '@mui/icons-material/RedeemRounded';
import VerifiedRounded from '@mui/icons-material/VerifiedRounded';
import AutorenewRounded from '@mui/icons-material/AutorenewRounded';

const benefits = [
  { title: 'Giao nhanh 30 phút', detail: 'Nội thành', Icon: LocalShippingRounded },
  { title: 'Freeship đơn từ 199K', detail: 'Ưu đãi mỗi ngày', Icon: RedeemRounded },
  { title: 'Hàng chính hãng', detail: 'Đảm bảo chất lượng', Icon: VerifiedRounded },
  { title: 'Đổi trả dễ dàng', detail: 'Trong 7 ngày', Icon: AutorenewRounded },
];

export function Footer() {
  return (
    <footer className="sticky bottom-0 z-20 mt-auto shrink-0 border-t border-primary-100 bg-white">
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-md p-md md:grid-cols-4">
        {benefits.map(({ title, detail, Icon }) => (
          <div key={title} className="flex items-center gap-2.5">
            <Icon className="shrink-0 text-primary-500" />
            <div className="min-w-0"><p className="truncate text-xs font-extrabold text-neutral-800 md:text-sm">{title}</p><p className="text-[11px] text-neutral-600">{detail}</p></div>
          </div>
        ))}
      </div>
    </footer>
  );
}