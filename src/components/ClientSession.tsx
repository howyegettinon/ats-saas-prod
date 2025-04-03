'use client'

import { useSession, signOut } from "next-auth/react";

const ClientSession = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  if (loading) return null;

  return (
    <>
      {session ? (
        <>
          <li>
            <a 
              href="/dashboard" 
              className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
            >
              Dashboard
            </a>
          </li>
          <li>
            <button 
              onClick={() => signOut()}
              className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90"
            >
              Sign Out
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <a 
              href="/login"
              className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </a>
          </li>
          <li>
            <a 
              href="/signup"
              className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90"
            >
              Sign Up
            </a>
          </li>
        </>
      )}
    </>
  );
};

export default ClientSession;
