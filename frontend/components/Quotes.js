import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleVisibility,
  deleteQuote,
  setHighlightedQuote,
  createQuote,
} from "../state/quotesSlice"; // ✨ import action

// pulls quotes, displayAllQuotes, and highlightedQuote from the Redux store
export default function Quotes() {
  const quotes = useSelector((state) => state.quotesState.quotes);
  const displayAllQuotes = useSelector(
    (state) => state.quotesState.displayAllQuotes
  ); // ✨ `displayAllQuotes` must come from the Redux store
  const highlightedQuote = useSelector(
    (state) => state.quotesState.highlightedQuote
  ); // ✨ `highlightedQuote` must come from the Redux store
  const dispatch = useDispatch(); // ✨ get the dispatch function

  return (
    <div id="quotes">
      <h3>Quotes</h3>
      <div>
        {quotes
          ?.filter((qt) => {
            return displayAllQuotes || !qt.apocryphal;
          })
          .map((qt) => (
            <div
              key={qt.id}
              className={`quote${qt.apocryphal ? " fake" : ""}${
                highlightedQuote === qt.id ? " highlight" : ""
              }`}
            >
              <div>{qt.quoteText}</div>
              <div>{qt.authorName}</div>
              <div className="quote-buttons">
                <button
                  onClick={() => {
                    /* ✨ dispatch an action */
                    const actionToDispatch = deleteQuote(qt.id); // ✨ dispatch the deleteQuote action
                    dispatch(actionToDispatch);
                  }}
                >
                  DELETE
                </button>
                <button
                  onClick={() => {
                    /* ✨ dispatch an action */
                    const actionToDispatch = setHighlightedQuote(qt.id); // ✨ dispatch the setHighlightedQuote action
                    dispatch(actionToDispatch);
                  }}
                >
                  HIGHLIGHT
                </button>
                <button
                  onClick={() => {
                    /* ✨ dispatch an action */
                    dispatch({
                      type: "quotes/editQuoteAuthenticity",
                      payload: qt.id,
                    });
                  }}
                >
                  FAKE
                </button>
              </div>
            </div>
          ))}
        {!quotes?.length && "No quotes here! Go write some."}
      </div>
      {!!quotes?.length && (
        <button
          onClick={() => {
            /* ✨ dispatch an action */
            const actionToDispatch = toggleVisibility(); // ✨ dispatch the toggleVisibility action
            dispatch(actionToDispatch);
          }}
        >
          {displayAllQuotes ? "HIDE" : "SHOW"} FAKE QUOTES
        </button>
      )}
    </div>
  );
}
