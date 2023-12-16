import './App.css';
import 'react-toastify/dist/ReactToastify.min.css';
import PhoneBook from './components/PhoneBook';

function App() {
  return (
    <div className="App">
      <main className='main-content'>
        <PhoneBook />
      </main>
    </div>
  );
}

export default App;
