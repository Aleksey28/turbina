import React from 'react';
import { links } from '../utils/constants';

const validators = {
  userName: {
    required: (value) => {
      return value === '';
    },
    minLength: (value) => {
      return value.length < 2;
    },
  },
  userPhone: {
    required: (value) => {
      return value === '';
    },
    minLength: (value) => {
      return value.length < 3;
    },
    containNumbers: (value) => {
      return !/[0-9]/.test(value);
    },
  },
  userEmail: {
    required: (value) => {
      return value === '';
    },
    minLength: (value) => {
      return value.length < 3;
    },
    isEmail: (value) => {
      return !value.includes('@' && '.');
    },
  },
  userText: {
    required: (value) => {
      return value === '';
    },
    minLength: (value) => {
      return value.length < 50;
    },
  },
};

export default function Form(props) {
  const [userNameDirty, setUserNameDirty] = React.useState(false);
  const [userPhoneDirty, setUserPhoneDirty] = React.useState(false);
  const [userEmailDirty, setUserEmailDirty] = React.useState(false);
  const [userTextDirty, setUserTextDirty] = React.useState(false);
  const [isOfferAccepted, setOfferAccepted] = React.useState(false);
  const [isFormSubmitted, setFormSubmitted] = React.useState(false);

  const [formValues, setFormValues] = React.useState({
    userName: '',
    userPhone: '',
    userEmail: '',
    userText: '',
  });

  function handleOfferAccept() {
    setOfferAccepted(!isOfferAccepted);
  }

  const [errors, setErrors] = React.useState({
    userName: {
      required: true,
      minLength: true,
    },
    userPhone: {
      required: true,
      minLength: true,
      containNumbers: true,
    },
    userEmail: {
      required: true,
      minLength: true,
      isEmail: true,
    },
    userText: {
      required: true,
      minLength: true,
    },
  });

  const handleInputChange = React.useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormValues((prevState) => ({ ...prevState, [name]: value })); // объект меняется при каждом изменении, в setFormValues возвращаем этот новый объект, кот состоит из старых и нового перезаписанного поля
    },
    [setFormValues],
  );

    function handleFocusOut(e) {
      const { name } = e.target;
      if (name === 'userName') {
        setUserNameDirty(true);
      }

      if (name === 'userPhone') {
        setUserPhoneDirty(true);
      }

      if (name === 'userEmail') {
        setUserEmailDirty(true);
      }

      if (name === 'userText') {
        setUserTextDirty(true);
      }
    }

  React.useEffect(
    function validateInputs() {
      const { userName, userPhone, userEmail, userText } = formValues;

      const userNameValidationResult = Object.keys(validators.userName)
        .map((errorKey) => {
          const errorResult = validators.userName[errorKey](userName);

          return { [errorKey]: errorResult };
        })
        .reduce((acc, el) => ({ ...acc, ...el }), {});

      const userPhoneValidationResult = Object.keys(validators.userPhone)
        .map((errorKey) => {
          const errorResult = validators.userPhone[errorKey](userPhone);

          return { [errorKey]: errorResult };
        })
        .reduce((acc, el) => ({ ...acc, ...el }), {});

      const userEmailValidationResult = Object.keys(validators.userEmail)
        .map((errorKey) => {
          const errorResult = validators.userEmail[errorKey](userEmail);

          return { [errorKey]: errorResult };
        })
        .reduce((acc, el) => ({ ...acc, ...el }), {});

      const userTextValidationResult = Object.keys(validators.userText)
        .map((errorKey) => {
          const errorResult = validators.userText[errorKey](userText);

          return { [errorKey]: errorResult };
        })
        .reduce((acc, el) => ({ ...acc, ...el }), {});

      setErrors({
        userName: userNameValidationResult,
        userPhone: userPhoneValidationResult,
        userEmail: userEmailValidationResult,
        userText: userTextValidationResult,
      });
    },
    [formValues, setErrors],
  );

  const { userName, userPhone, userEmail, userText } = formValues;
  const isUserNameInvalid = Object.values(errors.userName).some(Boolean);
  const isUserPhoneInvalid = Object.values(errors.userPhone).some(Boolean);
  const isUserEmailInvalid = Object.values(errors.userEmail).some(Boolean);
  const isUserTextInvalid = Object.values(errors.userText).some(Boolean);
  const isSubmitDisabled =
    isUserNameInvalid || isUserPhoneInvalid || isUserEmailInvalid || isUserTextInvalid || !isOfferAccepted;

  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onFormSubmit({
      name: userName,
      phone: userPhone,
      email: userEmail,
      text: userText,
    });

    setFormSubmitted(true);
  }

  return (
    <>
      <h2 className="content__title">Форма</h2>
      <p className="content__paragraph">Заполняя эту форму, вы&nbsp;становитесь частью проекта</p>
      <form className="form" noValidate onSubmit={handleSubmit}>
        <input
          type="text"
          className={userNameDirty && isUserNameInvalid ? `form__input form__input_type_error` : `form__input`}
          name="userName"
          value={userName}
          placeholder="Имя и фамилия автора"
          minLength="2"
          maxLength="40"
          required
          onChange={handleInputChange}
          onBlur={handleFocusOut}
        />
        {userNameDirty && errors.userName.required && <span className="form__error">Заполните это поле</span>}
        {userNameDirty && errors.userName.minLength && (
          <span className="form__error">Текст должен быть не короче 2 символов</span>
        )}
        <input
          type="tel"
          className={userPhoneDirty && isUserPhoneInvalid ? `form__input form__input_type_error` : `form__input`}
          name="userPhone"
          value={userPhone}
          placeholder="Телефон"
          minLength="3"
          maxLength="18"
          required
          onChange={handleInputChange}
          onBlur={handleFocusOut}
        />
        {userPhoneDirty && errors.userPhone.required && <span className="form__error">Заполните это поле</span>}
        {userPhoneDirty && errors.userPhone.containNumbers && (
          <span className="form__error">Поле должно содержать цифры</span>
        )}
        {userPhoneDirty && errors.userPhone.minLength && (
          <span className="form__error">Минимальная длина - 3 цифры</span>
        )}
        <input
          type="email"
          className={userEmailDirty && isUserEmailInvalid ? `form__input form__input_type_error` : `form__input`}
          name="userEmail"
          value={userEmail}
          placeholder="Почта"
          minLength="5"
          maxLength="30"
          required
          onChange={handleInputChange}
          onBlur={handleFocusOut}
        />
        {userEmailDirty && errors.userEmail.required && <span className="form__error">Заполните это поле</span>}
        {userEmailDirty && errors.userEmail.minLength && (
          <span className="form__error">Минимальная длина - 5 символов</span>
        )}
        {userEmailDirty && errors.userEmail.isEmail && <span className="form__error">Введите e-mail</span>}
        <textarea
          className={userTextDirty && isUserTextInvalid ? `form__input form__input_type_error` : `form__input`}
          name="userText"
          value={userText}
          placeholder="Стихи"
          minLength="50"
          maxLength="10000"
          required
          onChange={handleInputChange}
          onBlur={handleFocusOut}
        ></textarea>
        {userTextDirty && errors.userText.required && <span className="form__error">Заполните это поле</span>}
        {userTextDirty && errors.userText.minLength && (
          <span className="form__error">Минимальная длина - 50 символов</span>
        )}
        <label className="form__agreement">
          <input type="checkbox" className="form__checkbox-hidden" name="agree" required onClick={handleOfferAccept} />
          <span className="form__pseudo-checkbox form__cursor"></span>
          <span className="form__agree-text">
            Согласен с&nbsp;
            <a className="form__link form__cursor" href={links.offer}>
              офертой
            </a>
          </span>
        </label>
        <span className="form__error"></span>
        <button
          type="submit"
          className="form__btn form__cursor"
          disabled={isSubmitDisabled}
          children={isFormSubmitted && !props.isSubmitError ? `Ура, форма отправлена!` : `Отправить форму`}
        ></button>
        {props.isSubmitError && (
          <span className="form__error-btn_visible">
            Упс, что-то пошло не&nbsp;так и&nbsp;форма не&nbsp;отправилась, попробуйте ещё раз!
          </span>
        )}
        {props.isLoading && (
          <div className="spinner">
            <i></i>
          </div>
        )}
      </form>
    </>
  );
}
