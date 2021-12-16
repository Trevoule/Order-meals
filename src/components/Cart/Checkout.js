import { useRef, useState } from "react";
import useInput from "../hooks/use-input";

import classes from "./Checkout.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHanlder: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: streetInputHasError,
    valueChangeHandler: streetChangeHandler,
    inputBlurHanlder: streetBlurHandler,
    reset: resetStreetInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHanlder: cityBlurHandler,
    reset: resetCityInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredPostalCode,
    isValid: enteredPostalCodeIsValid,
    hasError: postalCodeInputHasError,
    valueChangeHandler: postalCodeChangeHandler,
    inputBlurHanlder: postalCodeBlurHandler,
    reset: resetPostalCodeInput,
  } = useInput(isFiveChars);

  //   const [formInputsValidity, setFormInputsValidity] = useState({
  //     name: true,
  //     street: true,
  //     city: true,
  //     postalCode: true,
  //   });

  //   const nameInputRef = useRef();
  //   const streetInputRef = useRef();
  //   const postalCodeInputRef = useRef();
  //   const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    // const enteredName = nameInputRef.current.value;
    // const enteredStreet = streetInputRef.current.value;
    // const enteredPostalCode = postalCodeInputRef.current.value;
    // const enteredCity = cityInputRef.current.value;

    // const enteredNameIsValid = !isEmpty(enteredName);
    // const enteredStreetIsValid = !isEmpty(enteredStreet);
    // const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);
    // const enteredCityIsValid = !isEmpty(enteredCity);

    // setFormInputsValidity({
    //   name: enteredNameIsValid,
    //   street: enteredStreetIsValid,
    //   city: enteredCityIsValid,
    //   postalCode: enteredPostalCodeIsValid,
    // });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    const orderData = {
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    };
    console.log(orderData);

    // props.onConfirm(orderData);
    // props.onCancel();

    resetNameInput();
    resetStreetInput();
    resetCityInput();
    resetPostalCodeInput();
  };

  //   const nameControlClasses = !formInputsValidity.name ? classes.invalid : "";
  //   const streetControlClasses = !formInputsValidity.name ? classes.invalid : "";
  //   const cityControlClasses = !formInputsValidity.city ? classes.invalid : "";
  //   const postalCodeControlClasses = !formInputsValidity.postalCode ? classes.invalid: "";

  const nameControlClasses = nameInputHasError ? classes.invalid : "";
  const streetControlClasses = streetInputHasError ? classes.invalid : "";
  const cityControlClasses = !cityInputHasError ? classes.invalid : "";
  const postalCodeControlClasses = !postalCodeInputHasError
    ? classes.invalid
    : "";

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${nameControlClasses}`}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && <p>Please enter a valid name.</p>}
      </div>
      <div className={`${classes.control} ${streetControlClasses}`}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
          value={enteredStreet}
        />
        {streetInputHasError && <p>Please enter a valid street.</p>}
      </div>
      <div className={`${classes.control} ${postalCodeControlClasses}`}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          onChange={postalCodeChangeHandler}
          onBlur={postalCodeBlurHandler}
          value={enteredPostalCode}
        />
        {postalCodeInputHasError && <p>Please enter a valid post code.</p>}
      </div>
      <div className={`${classes.control} ${cityControlClasses}`}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
          value={enteredCity}
        />
        {cityInputHasError && <p>Please enter a valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} type="submit">
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
