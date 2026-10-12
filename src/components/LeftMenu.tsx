'use client';

import { useState } from 'react';
import MenuRounded from '@mui/icons-material/MenuRounded';
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded';
import CategoryRounded from '@mui/icons-material/CategoryRounded';
import DescriptionRounded from '@mui/icons-material/DescriptionRounded';
import WavingHandRounded from '@mui/icons-material/WavingHandRounded';
import SoapRounded from '@mui/icons-material/Soap';
import LocalLaundryServiceRounded from '@mui/icons-material/LocalLaundryServiceRounded';
import CookieRounded from '@mui/icons-material/CookieRounded';
import FastfoodRounded from '@mui/icons-material/FastfoodRounded';
import KitchenRounded from '@mui/icons-material/KitchenRounded';
import CleaningServicesRounded from '@mui/icons-material/CleaningServicesRounded';
import Face3Rounded from '@mui/icons-material/Face3Rounded';
import ToysRounded from '@mui/icons-material/ToysRounded';
import ChairRounded from '@mui/icons-material/ChairRounded';

const categories = [
  { label: 'Giấy vệ sinh', Icon: DescriptionRounded },
  { label: 'Giấy ăn, Khăn giấy', Icon: DescriptionRounded },
  { label: 'Khăn ướt', Icon: WavingHandRounded },
  { label: 'Xà phòng, Sữa tắm', Icon: SoapRounded },
  { label: 'Nước giặt, Nước xả', Icon: LocalLaundryServiceRounded },
  { label: 'Bánh kẹo', Icon: CookieRounded },
  { label: 'Đồ ăn vặt', Icon: FastfoodRounded },
  { label: 'Sản phẩm gia dụng', Icon: KitchenRounded },
  { label: 'Vệ sinh nhà cửa', Icon: CleaningServicesRounded },
  { label: 'Chăm sóc cá nhân', Icon: Face3Rounded },
  { label: 'Đồ dùng tiện ích', Icon: ChairRounded },
  { label: 'Mẹ & Bé', Icon: ToysRounded },
];

export function LeftMenu() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside className="min-h-11 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm lg:sticky lg:top-md lg:self-start">
      <button
        type="button"
        className="flex min-h-11 w-full items-center justify-between bg-primary-500 px-md text-left text-body font-bold text-white lg:cursor-default"
        aria-expanded={isExpanded}
        onClick={() => setIsExpanded((expanded) => !expanded)}
      >
        <span className="flex items-center gap-2"><MenuRounded fontSize="small" />Danh mục sản phẩm</span>
        <span className="flex items-center gap-1">
          <ChevronRightRounded className="hidden lg:inline-flex" fontSize="small" />
          <CategoryRounded className="lg:!hidden" fontSize="small" />
        </span>
      </button>
      <nav className={`${isExpanded ? 'grid' : 'hidden'} divide-y divide-neutral-200 lg:grid`} aria-label="Danh mục sản phẩm">
        {categories.map(({ label, Icon }) => (
          <a key={label} href="#products" className="flex min-h-10 items-center gap-sm px-md text-caption font-semibold text-neutral-700 transition-colors hover:bg-primary-100 hover:text-primary-700">
            <Icon className="text-primary-500" fontSize="small" />
            <span>{label}</span>
          </a>
        ))}
      </nav>
      <a href="#member" className="mt-md hidden items-center gap-md rounded-lg bg-warning-100 p-md lg:flex">
        <span className="text-4xl" aria-hidden="true">👧🏻</span>
        <span className="text-xs font-bold leading-5 text-neutral-800">Tích điểm đổi quà<br /><span className="font-medium text-neutral-700">Nhiều ưu đãi hấp dẫn!</span></span>
        <span className="text-2xl" aria-hidden="true">🎁</span>
      </a>
    </aside>
  );
}