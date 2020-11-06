import React from 'react';

export default function Form() {
  return (
    <> 
      <h2 className="content__title">Форма</h2>
      <p className="content__paragraph">Заполняя эту форму, вы&nbsp;становитесь частью проекта</p>
      <form className="form" noValidate>
        <input id="form-name-input" type="text" className="form__input form__input_type_error" name="name" // TBC name value
        placeholder="Имя и фамилия автора" minLength="2" maxLength="40" required />
        <span id="form-name-input-error" className="form__error_visible">Какая-то ошибка*</span>
        <input id="form-phone-input" type="tel" className="form__input" name="phone"
        placeholder="Телефон" minLength="7" maxLength="15" required />
        <span id="form-phone-input-error"></span>
        <input id="form-email-input" type="email" className="form__input" name="email"
        placeholder="Почта" minLength="5" maxLength="30" required />
        <span id="form-email-input-error"></span>
        <textarea id="form-text-input" className="form__input" name="text" placeholder="Стихи" minLength="20" required></textarea>
        <span id="form-text-input-error"></span>
        <label className="form__agreement">
          <input id="form-agree-input" type="checkbox" className="form__input_type_agree" name="agree" required />
          <span className="form__pseudo-item form__cursor"></span>
          Согласен с&nbsp;<a className="form__link form__cursor" href="https://api.kanye.rest"> офертой</a>
        </label>
        <span id="form-agree-input-error"></span>
        <button type="submit" className="form__btn form__cursor">Отправить форму</button>
        <span id="input-error" className="form__error-btn_visible">Упс, что-то пошло не&nbsp;так и&nbsp;форма не&nbsp;отправилась, попробуйте ещё раз!</span>
      </form>
    </>
  )
}