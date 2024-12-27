import { Outlet } from 'react-router-dom';
import NavBar from './components/common/NavBar/NavBar';
import Header from './components/common/Header/Header';

function App() {
  return (
    <div className="bg-gray-100 mx-auto flex min-h-screen max-w-[768px] flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-md">
        <Header />
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4">
        <Outlet />
      </main>

      {/* NavBar */}
      <nav className="shadow-t fixed bottom-0 left-0 w-full bg-white md:static md:shadow-none">
        <NavBar />
      </nav>
    </div>
  );
}

export default App;
