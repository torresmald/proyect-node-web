import React from "react";

// ---- CAMBIADO A FormLogin
import   '../../styles/Form/Login.scss';
import FormLogin from '../../components/Form/FormLogin.jsx';
import ButtonHome from "../../components/ButtonHome/ButtonHome.jsx";

function Login({ handleOption, handleChangeLogin, user, handleResetValueLogin, setIsLogged, setUserLoggedEmail, setUserLoggedNickname, userLoggedNickname, userLoggedEmail, userLoggedAge, setUserLoggedAge}) {
    
    return (
        <div className="divLogin">
            <FormLogin setUserLoggedNickname={setUserLoggedNickname} setUserLoggedEmail={setUserLoggedEmail} handleChangeLogin={handleChangeLogin} user={user} handleResetValueLogin={handleResetValueLogin} userLoggedNickname={userLoggedNickname} userLoggedEmail={userLoggedEmail} setIsLogged={setIsLogged} userLoggedAge={userLoggedAge} setUserLoggedAge={setUserLoggedAge}/>
            <div className="divLogin__buttonHome">
            <ButtonHome handleOption={handleOption} />
            </div>
        </div>
    )
}

export default Login; 