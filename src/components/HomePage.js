import Navbar from './Navbar';
import Footer from './Footer';

const HomePage = () => {
  return (
    <div className='navbar'>
      <nav>
        <Navbar />
      </nav>
      <main>
        <div>
          <h1>Ovdje ide glavni sadržaj stranice</h1>
        </div>
      </main>
      <footer className='footer'>
        <Footer />
      </footer>
    </div>
  );
};
export default HomePage;
