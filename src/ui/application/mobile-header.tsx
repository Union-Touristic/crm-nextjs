import { MobileSidebar } from "@/ui/application/mobile-sidebar";
import { ProfileDropdown } from "@/ui/profile-dropdown";
import { User } from "next-auth";

type Props = {
  user: Omit<User, "id">;
};

export default function MobileHeader({ user }: Props) {
  return (
    <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
      <MobileSidebar />
      <div className="flex-1 text-sm font-semibold leading-6 text-white">
        Дэшборд
      </div>
      <ProfileDropdown avatarSize="lg" image={user.image?.toString()} />
    </div>
  );
}
