import { useMemo, useState } from "react";
import { HiChat } from "react-icons/hi";
import { CiDark, CiLight } from "react-icons/ci";
import {
  HiArrowLeftOnRectangle,
  HiUsers
} from "react-icons/hi2";
import { signOut } from "next-auth/react";
import useConversation from "./useConversation";
import { usePathname } from "next/navigation";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();
  const [darkMode, setDarkMode] = useState(false);
  
  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const routes = useMemo(() => [
    {
      label: 'Read Mode',
      href: '##',
      icon: darkMode ? CiDark : CiLight,
      onClick: toggleDarkMode
    },
    {
      label: 'Chat',
      href: '/conversations',
      icon: HiChat,
      active: pathname === '/conversations' || !!conversationId
    },
    {
      label: 'Users',
      href: '/users',
      icon: HiUsers,
      active: pathname === '/users'
    },
    {
      label: 'Logout',
      href: '#',
      onClick: () => signOut(),
      icon: HiArrowLeftOnRectangle
    }
  ], [pathname, conversationId, darkMode]);

  return routes;
}

export default useRoutes;
