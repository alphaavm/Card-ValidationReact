import React, { useReducer, useState } from "react";
import FormElement from "./Form";
import "./Form.css";
import CreditCard from "../CreditCard/CreditCard";

const FormMain = (props) => {
  // const [overallValid,setOverallValid]=useState(false)
  const [isFormValid, setFormValid] = useState({
    name: false,
    cardNo: false,
    date: false,
    cvv: false,
  });
  const [touched, setTouched] = useState({
    name: false,
    cardNo: false,
    date: false,
    cvv: false,
  });

  const [cardSpaces, setCardSpaces] = useState([]);
  const initalState = { Name: "", cardNo: "", date: "", cvv: "" };

  const reducer = (state, action) => {
    switch (action.type) {
      case "Name":
        return { ...state, Name: action.name };
      case "cardNo":
        return { ...state, cardNo: action.cardNo };
      case "date":
        return { ...state, date: action.date };
      case "cvv":
        return { ...state, cvv: action.cvv };
    }
  };
  const [state, dispatch] = useReducer(reducer, initalState);
  // console.log(state.cardNo);

  const blurHandler = (e, val) => {
    if (val === 0) {
      e.target.value.length < 19
        ? setFormValid((prev) => {
            return { ...prev, cardNo: false };
          })
        : setFormValid((prev) => {
            return { ...prev, cardNo: true };
          });
      setTouched((prev) => {
        return { ...prev, cardNo: true };
      });
    }
    if (val === 1) {
      e.target.value.trim().length < 3
        ? setFormValid((prev) => {
            return { ...prev, name: false };
          })
        : setFormValid((prev) => {
            return { ...prev, name: true };
          });
      setTouched((prev) => {
        return { ...prev, name: true };
      });
    }
    if (val === 2) {
      e.target.value === ""
        ? setFormValid((prev) => {
            return { ...prev, date: false };
          })
        : setFormValid((prev) => {
            return { ...prev, date: true };
          });
      setTouched((prev) => {
        return { ...prev, date: true };
      });
    }
    if (val === 3) {
      e.target.value.length !== 3
        ? setFormValid((prev) => {
            return { ...prev, cvv: false };
          })
        : setFormValid((prev) => {
            return { ...prev, cvv: true };
          });
      setTouched((prev) => {
        return { ...prev, cvv: true };
      });
      console.log(state.cvv);
    }
  };

  const cardNoHandler = (e) => {
    const eventCount = e.target.value.length;
    const eventVal = e.target.value;
    let count = state.cardNo.length;
    let parse = eventVal.charCodeAt(count);
    let parsingCondition = (parse > 48 && parse < 58) || parse === 32;
    const cardSpaceCondition =
      eventCount === 4 || eventCount === 9 || eventCount === 14;

    if (count <= 19) {
      if (
        cardSpaceCondition &&
        cardSpaces.find((item) => item === eventCount)
      ) {
        const newArr = cardSpaces.filter((item) => item !== eventCount);
        setCardSpaces(newArr);
        dispatch({
          type: "cardNo",
          cardNo: eventVal.trim().slice(0, -1),
        });
      } else if (cardSpaceCondition && parsingCondition) {
        const arr = cardSpaces;
        arr.push(eventCount);
        setCardSpaces([...arr]);
        dispatch({
          type: "cardNo",
          cardNo: eventVal + " ",
        });
      } else if (eventCount < count) {
        dispatch({ type: "cardNo", cardNo: eventVal });
      } else {
        let parse = eventVal.charCodeAt(count);
        if ((parse > 48 && parse < 58) || parse === 32)
          dispatch({ type: "cardNo", cardNo: eventVal });
      }

      if (((parse > 48 && parse < 58) || parse === 32) && eventCount === 19) {
        setFormValid((prev) => {
          return { ...prev, cardNo: true };
        });
      } else
        setFormValid((prev) => {
          return { ...prev, cardNo: false };
        });
    }
  };

  const nameHandler = (e) => {
    dispatch({ type: "Name", name: e.target.value });
    if (e.target.value.length >= 6) {
      setFormValid((prev) => {
        return { ...prev, name: true };
      });
    }
  };

  const dateHandler = (e) => {
    dispatch({ type: "date", date: e.target.value });
    if (e.target.value !== "") {
      setFormValid((prev) => {
        return { ...prev, date: true };
      });
    }
  };
  const cvvHandler = (e) => {
    const parse = e.target.value.charCodeAt(state.cvv.length);
    if (e.target.value.length < state.cvv.length) {
      dispatch({ type: "cvv", cvv: e.target.value });
    } else if (parse > 48 && parse < 58) {
      dispatch({ type: "cvv", cvv: e.target.value });
      if (e.target.value.length === 3) {
        setFormValid((prev) => {
          return { ...prev, cvv: true };
        });
      }
    }
  };
  const submithandler = (e) => {
    e.preventDefault();
    if (
      isFormValid.cardNo &&
      isFormValid.name &&
      isFormValid.date &&
      isFormValid.cvv
    )
      alert("Success");
    else
      alert(
        "You tried to tamper the data. This will be treated as security breach and legal action will immediately taken. Your IP was recorded "
      );
  };

  const propsForForm = {
    submithandler,
    cvvHandler,
    nameHandler,
    cardNoHandler,
    dateHandler,
    blurHandler,
    touched,
    state,
    isFormValid,
  };
  return (
    <>
      <CreditCard state={state} />
      <FormElement {...propsForForm} />
    </>
  );
};

export default FormMain;
