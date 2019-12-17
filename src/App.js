import React, { Component, Fragment } from 'react';
import Modal from 'react-modal';

import logo from './login.svg';
import './App.css';

const style = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.66)",
    zIndex: 10000,
  },
};
const emailMock = ['demo@demo.demo']

class App extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      count: 0,
      step: 1,
      isLogin: false,
      password: '',
      email: '',
      submitErr: {},
      acceptRules: false,
    };

  }

  toggleLoginMode = () => {
    this.setState(({isLogin}) => ({isLogin: !isLogin}))
  }
  openModal(isLogin) {
    const st = { isLogin: false, modalIsOpen: true, }
    if(isLogin){
      st.isLogin = true
    }
    this.setState(st);
  }

  closeModal() {
    this.setState({ submitErr:{}, password:'', email:'', modalIsOpen: false, acceptRules: false, });
  }

  okRules() {
    this.setState(({acceptRules}) => ({acceptRules: !acceptRules}))
  }

  handleOnSubmit(e) {
    e.preventDefault();
    const { isLogin, email, password, acceptRules, } = this.state
    let errState = {wiggleInput: true,}
    let submitErr = {}
    if(!acceptRules){
      submitErr.acceptRules = 'Примите условия Соглашения'
    }
    if(!(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,32}$/.test(password))){
      submitErr.password = 'Обязательно наличие цифр и символов'
    }
    if(!password || typeof password !== 'string' || password.length < 6){
      submitErr.password = 'Введите не менее 6 символов'
    }
    if(emailMock.filter(e=>e===email).length>0){
      submitErr.email = 'Такой E-mail уже зарегистрирован'
    }
    if(!emailIsValid(email)){
      submitErr.email = 'Введите корректный E-mail'
    }
    if(!email || typeof email !== 'string'){
      submitErr.email = 'Введите E-mail'
    }
    if(Object.keys(submitErr)){
      setTimeout(()=>this.setState({wiggleInput: false}), 2000)
      return this.setState({...errState, submitErr})
    }
    this.setState({submitErr: {}})
  }
  changePassword = e => {
    let v = e.target.value
    if(v.length > 32)return null;
    this.setState({password: v})
  }
  changeEmail = e => {
    let v = e.target.value
    if(v.length > 60)return null;
    this.setState({email: v})
  }

  render() {
    const { isLogin, email, password, acceptRules, submitErr, wiggleInput } = this.state
    let emailInputCl = 'input'
    if(submitErr.email){
      emailInputCl = 'input wrong'
      if(wiggleInput){ emailInputCl += ' animated shake' }
    }
    let submitStyle = 'button'
    if(isLogin){
      submitStyle = 'button login'
    }
    let passInputCl = 'input password'
    if(submitErr.password){
      passInputCl += ' wrong'
      if(wiggleInput){ passInputCl += ' animated shake' }
    }
    let contentModalCl = 'modal-content'
    if(isLogin){
      contentModalCl += ' mc_login'
    }
    return (
      <div className="App">
        <div className="App-header">
          <div className="head-container">
            <div className="register">
              <a href="#popup-login" className="btn-login" onClick={() => this.openModal(true)}>
                <span className="login-icon"></span><span>Войти</span>
              </a>
              <a title="Зарегистрироваться" className='alternative-link reg-link'
                onClick={() => this.openModal()}
              >Зарегистрироваться</a>
            </div>
          </div>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={()=>this.closeModal()}
          contentLabel="Example Modal"
          style={style}
          className={contentModalCl}
          overlayClassName={'modal-overlay'}
        >
          <div>
            <span className="close" onClick={()=>this.closeModal()}></span>
          </div>
          {!isLogin && <Fragment> <p className="registrationTitle">Регистрация</p>
              <p className="description">
                Регистрация занимает 30 секунд.<br/> После регистрации вы получите<br/> <span>7 дней бесплатного доступа.</span>
              </p> </Fragment>}
          {isLogin && <p className="registrationTitle">Личный кабинет</p>}
          <div className={'email-container'}>
            <form noValidate onSubmit={e => this.handleOnSubmit(e)}>
              <label>
                <span>Email</span>
                <input
                  value={email}
                  onChange={this.changeEmail}
                  className={emailInputCl}
                  type="email"
                  placeholder="E-mail"
                />
              </label>
              <div className="field-error">{submitErr.email}</div>
              <label>
                <span>Пароль</span>
                <input
                  value={password}
                  onChange={this.changePassword}
                  className={passInputCl}
                  type="password"
                  placeholder="●●●●●●●●"
                />
              </label>
              <div className="field-error">{submitErr.password}</div>
              {!isLogin && <div className="hint">Не менее 6 символов</div>}
              {!isLogin && <label className="rules-container">Я принимаю условия <a href="#" title="Прочитать Соглашение в новом окне" className="rules-link">Соглашения</a>
                <input name="rules" onChange={()=>this.okRules()} type="checkbox" checked={acceptRules}/>
                <span className="checkmark"></span>
              </label>}
              <div className="field-error">{submitErr.acceptRules}</div>
              <input
                title="Зарегистрироваться в SMM Aero!"
                className={submitStyle}
                type="submit"
                value={isLogin ? 'Войти' : 'Зарегистрироваться'} />

            </form>
            {isLogin && <div className='footer loginfooter'>
                <div>
                  <div>
                    Еще нет аккаунта?
                  </div>
                  <a title="Зарегистрироваться" className='alternative-link'
                    onClick={this.toggleLoginMode}
                  >Зарегистрироваться</a>
                </div>
                <div className="restorePass">
                  <div>
                    Забыли пароль?
                  </div>
                  <a title="Восстановить пароль"
                    className='alternative-link'
                    onClick={()=>''}
                  >Восстановить</a>
                </div></div> }
                {!isLogin && <div className='footer registration'><div>
                  Уже есть аккаунт?
                </div>
                  <a title='Войти в личный кабинет'
                    className='alternative-link'
                    onClick={this.toggleLoginMode}
                  >Войти в личный кабинет</a></div>}
          </div>
        </Modal>
      </div>
    );
  }
}

function emailIsValid (email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  // /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(email)
}
export default App;
