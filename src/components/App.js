import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import getDataPaged from '../services/getDataPaged.js';
import getAllSeries from '../services/getAllSeries.js';
import DetailSeries from '../Views/DetailSeries.jsx';
import ListSeries from '../Views/ListSeries.jsx';
import Register from '../Views/Register/Register.jsx';
import Filter from './Filter/Filter.jsx';
import Option from './Option/OptionSerie.jsx';
import Navigation from '../Views/Navigation.jsx';
import Login from '../Views/Login/Login.jsx';
import Loader from '../Views/Loader.jsx';
import UrlNotFound from '../Views/UrlNotFound/urlNotFound.jsx';
import LoaderContext from '../context/LoaderContext.jsx';
import IsLogged from '../Views/Login/isLogged.jsx';
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx';
import ModalForm from '../Views/Modal/ModalForm.jsx';
import Footer from './Footer/Footer.jsx';
import '../styles/App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [allSeries, setAllSeries] = useState([]);
  const [series, setSeries] = useState([]);
  const [search, setSearch] = useState('');
  const [option, setOption] = useState('All');
  const [page, setPage] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);
  const [showPreviousButton, setShowPreviousButton] = useState(false);
  const [user, setUser] = useState({
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [userLoggedNickname, setUserLoggedNickname] = useState({
    nickname: ''
  });
  const [userLoggedEmail, setUserLoggedEmail] = useState({
    email: ''
  });
  const [isLogged, setIsLogged] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);


  useEffect(() => {
    getAllSeries().then((response) => {
      setAllSeries(response);
      setIsLoaded(true);
    })
    getDataPaged(page).then((response) => {
      const nextPage = response.map((item) => {
        return item.page;
      })
      setSeries(response);
      setIsLoaded(true);
      if (page <= 1) {
        setShowPreviousButton(false);
      } else if (nextPage.includes(null)) {
        setShowNextButton(false);
      }
    })
    setOption(option);
  }, [page, option, showNextButton, showPreviousButton]);

  // Controla el numero de pagina siguiente y si hubiera que ocultar el boton de next page
  const nextPage = () => {
    setPage(page + 1)
    setShowPreviousButton(true);
  };
  // Controla el numero de pagina anterior y si hubiera que ocultar el boton de previous page
  const previousPage = () => {
    setPage(page - 1)
    setShowNextButton(true);
  };
  // Controlado el value del Search
  const handleSearchInput = (value) => {
    setSearch(value);
  };
  // Controla el value del Option
  const handleOptionInput = (value) => {
    setOption(value)
  };
  //Controla el value del User cuando hace login
  const handleChangeLogin = (value) => {
    setUser(value);
  };
  // Controla el value del User cuando hace Register
  const handleChangeRegister = (value) => {
    setUser(value);
  };
  // Resetea los input del Login
  const handleResetValueLogin = () => {
    setUser({ email: '', password: '' })
  };
  // Resetea los input del Register
  const handleClickValueRegister = () => {
    setUser({ nickname: '', email: '', password: '', confirmPassword: '' })
  };

  const filteredSerie = series.filter((serie) => {
    return serie.title.toLowerCase().includes(search);
  });
  const selectedSerie = allSeries.filter((serie) => {
    return option === 'All' ? true : serie.title === option;
  });
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={
          <>
            {isLogged ? <ModalForm title={'Login'} body={'¡TE HAS LOGUEADO CON ÉXITO!'} setIsLogged={setIsLogged} userLoggedEmail={userLoggedEmail} userLoggedNickname={userLoggedNickname}/> : null}
            {isRegistered ? <ModalForm title={'Registro'} body={'¡TE HAS REGISTRADO CON ÉXITO!'} /> : null}

            <LoaderContext.Provider value={isLoaded}>
              {!isLogged ? <Navigation isLoaded={isLoaded} /> : <IsLogged setIsLogged={setIsLogged} userLoggedNickname={userLoggedNickname} userLoggedEmail={userLoggedEmail} />}
              <Filter handleSearchInput={handleSearchInput} />
              <Option series={selectedSerie} handleOptionInput={handleOptionInput} option={option} />
              <ListSeries series={filteredSerie} nextPage={nextPage} previousPage={previousPage} showNextButton={showNextButton} showPreviousButton={showPreviousButton} />
              <Loader />
            </LoaderContext.Provider>
          </>
        } />
        <Route path='/register' element={<Register handleOptionInput={handleOptionInput} handleChangeRegister={handleChangeRegister} user={user} handleClickValueRegister={handleClickValueRegister} setIsRegistered={setIsRegistered} />} />
        <Route path='/login' element={<Login handleOptionInput={handleOptionInput} handleChangeLogin={handleChangeLogin} user={user} handleResetValueLogin={handleResetValueLogin} setIsLogged={setIsLogged} userLoggedEmail={userLoggedEmail} setUserLoggedNickname={setUserLoggedNickname} setUserLoggedEmail={setUserLoggedEmail} userLoggedNickname={userLoggedNickname} />} />
        <Route path='/selected/:id' element={<PrivateRoute isLogged={isLogged} component={<DetailSeries series={selectedSerie} />} />} />
        <Route path='/detail/:id' element={<PrivateRoute isLogged={isLogged} component={<DetailSeries series={series} handleOptionInput={handleOptionInput} />} />} />
        <Route path='*' element={<UrlNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
