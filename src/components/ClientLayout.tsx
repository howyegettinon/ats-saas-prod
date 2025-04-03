import dynamic from 'next/dynamic';

const ClientSession = dynamic(() => import('./ClientSession'), { ssr: false });

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <a href="/" className="text-xl font-bold text-primary">
                ATS SaaS
              </a>
            </div>
            <ul className="flex items-center space-x-4">
              <li>
                <a href="/" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </a>
              </li>
              <ClientSession />
            </ul>
          </div>
        </nav>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default ClientLayout;
