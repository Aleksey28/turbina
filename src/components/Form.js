import React from 'react';
import { links } from '../utils/constants';

export default function Form() {
  const [formValues, setFormValues] = React.useState({
    userName: '',
    userPhone: '',
    userEmail: '',
    userText: '',
    // offerAgreement: 
  }); 

  const [formValidity, setFormValidity] = React.useState({
    userNameValid: false,
    userPhoneValid: false
  })

  const handleInputChange = React.useCallback((e) => {
    const { name, value } = e.target;
    setFormValues(prevState => ({ ...prevState, [name]: value })); // объект меняется при каждом изменении на onChange - появляется новая ссылка на него, в setFormValues возвращаем этот новый объект, кот состоит из старых и нового перезаписанного поля
  }, [setFormValues]);
  
  React.useEffect(function validateInputs() {
    const isUserNameFilled = formValues.userName.length > 2;
    const isUserNameValid = isUserNameFilled;

    const isUserPhoneFilled = formValues.userPhone.length > 10;
    const isUserPhoneValid = isUserPhoneFilled;

    setFormValidity({ 
      userNameValid: isUserNameValid,
      userPhoneValid: isUserPhoneValid
    });
  }, [formValues, setFormValidity])

  const { userName, userPhone, userEmail, userText } = formValues;
  const { userNameValid, userPhoneValid } = formValidity;
  const isSubmitDisabled = !userNameValid || !userPhoneValid;

//   function handleSubmit(e) {
//     // Запрещаем браузеру переходить по адресу формы
//     e.preventDefault();

//     // Передаём значения управляемых компонентов во внешний обработчик
//     props.onFormSubmit({
//         name,
//         about: description,
//     });
// }

{/* <form className="form" noValidate onSubmit={handleSubmit}> */}

  return (
    <>
      <h2 className="content__title">Форма</h2>
      <p className="content__paragraph">Заполняя эту форму, вы&nbsp;становитесь частью проекта</p>
      <form className="form" noValidate>
        <input id="form-name-input" type="text" className="form__input form__input_type_error" name="userName"  
        value={userName} placeholder="Имя и фамилия автора" minLength="2" maxLength="40" required onChange={handleInputChange} />
        {!userNameValid && <span id="form-name-input-error" className="form__error">Какая-то ошибка*</span>}
        <input id="form-phone-input" type="tel" className="form__input" name="userPhone" value={userPhone}
        placeholder="Телефон" minLength="7" maxLength="15" required onChange={handleInputChange} />
        <span id="form-phone-input-error"></span>
        <input id="form-email-input" type="email" className="form__input" name="userEmail" value={userEmail}
        placeholder="Почта" minLength="5" maxLength="30" required onChange={handleInputChange} />
        <span id="form-email-input-error"></span>
        <textarea id="form-text-input" className="form__input" name="userText" value={userText} placeholder="Стихи" minLength="20" required onChange={handleInputChange}></textarea>
        <span id="form-text-input-error"></span>
        <label className="form__agreement">
          <input id="form-agree-input" type="checkbox" className="form__checkbox-hidden" name="agree" required /> 
          <span className="form__pseudo-checkbox form__cursor"></span>
          <span className="form__agree-text">Согласен с&nbsp;<a className="form__link form__cursor" href={links.offer}>офертой</a></span>
        </label>
        <span id="form-agree-input-error"></span>
        <button type="submit" className="form__btn form__cursor" disabled={isSubmitDisabled}>Отправить форму</button>
        <span id="input-error" className="form__error-btn_visible">Упс, что-то пошло не&nbsp;так и&nbsp;форма не&nbsp;отправилась, попробуйте ещё раз!</span>
      </form>
    </>
  )
}


