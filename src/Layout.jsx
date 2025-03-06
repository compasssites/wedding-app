import { Link } from "wasp/client/router";
import { useAuth, logout } from "wasp/client/auth";
import { Outlet } from "react-router-dom";
import { MantineProvider, ActionIcon, Tooltip } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import '@mantine/core/styles.css'; // Global Mantine styles
import "./Main.css";

// Helper function to capitalize the first letter
const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const Layout = () => {
  const { data: user } = useAuth();

  return (
    <MantineProvider>
      <div className="flex flex-col min-h-screen">
        <header className="bg-primary-800 text-white p-4">
          <div className="container mx-auto px-4 py-2 flex justify-between">
            <Link to="/">
              <h1 className="text-xl font-semibold">Welcome</h1>
            </Link>
            {user ? (
              <span className="flex items-center gap-1">
              Hi<span className="font-bold text-secondary-400">{capitalizeFirstLetter(user.identities.username?.id)}</span> {' '}
              <Tooltip label="Log out" position="bottom">
                <ActionIcon
                  onClick={logout}
                  color="red"
                  variant="subtle"
                  aria-label="Logout"
                  size="lg"
                >
                  <IconLogout size={20} />
                </ActionIcon>
              </Tooltip>
            </span>
            ) : (
              <Link to="/login">
                <h1 className="text-xl underline">Log in</h1>
              </Link>
            )}
          </div>
        </header>
        <main className="container mx-auto px-4 py-2 flex-grow">
          <Outlet />
        </main>
        <footer>
          <div className="container mx-auto p-4">
            <p className="text-center text-gray-500 text-sm">
              
            </p>
          </div>
        </footer>
      </div>
    </MantineProvider>
  );
};