import Image from 'next/image';
import ToggleTheme from './ToggleTheme';

export default function Header() {
  return (
    <div className="w-full h-auto pl-2 py-2 shadow-lg flex justify-between">
      <Image src="/logo.svg" height={200} width={200} alt="logo" />
      <ToggleTheme />
    </div>
  );
}
