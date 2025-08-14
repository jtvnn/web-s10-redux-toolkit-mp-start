// ✨ create your `quotesSlice` in this module
import { createSlice } from "@reduxjs/toolkit";

let id = 1;
export const getNextId = () => id++;
const initialState = {
  displayAllQuotes: true,
  highlightedQuote: null,
  quotes: [
    {
      id: getNextId(),
      quoteText: "Don't cry because it's over, smile because it happened.",
      authorName: "Dr. Seuss",
      apocryphal: true,
    },
    {
      id: getNextId(),
      quoteText: "So many books, so little time.",
      authorName: "Frank Zappa",
      apocryphal: false,
    },
    {
      id: getNextId(),
      quoteText: "Be yourself; everyone else is already taken.",
      authorName: "Oscar Wilde",
      apocryphal: false,
    },
  ],
};

export const quotesSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    toggleVisibility(state) {
      state.displayAllQuotes = !state.displayAllQuotes;
    },
    deleteQuote(state, action) {
      const quoteId = action.payload;
      state.quotes = state.quotes.filter((qt) => qt.id !== quoteId);
      if (state.highlightedQuote === quoteId) {
        state.highlightedQuote = null;
      }
    },
    editQuoteAuthenticity(state, action) {
      const quoteId = action.payload;
      const quote = state.quotes.find((qt) => qt.id === quoteId);
      if (quote) {
        quote.apocryphal = !quote.apocryphal;
      }
    },
    setHighlightedQuote(state, action) {
      if (state.highlightedQuote === action.payload) {
        state.highlightedQuote = null;
      } else {
        state.highlightedQuote = action.payload;
      }
    },
    createQuote(state, action) {
      state.quotes.push(action.payload)
    }
  },
});

export const {
  toggleVisibility,
  deleteQuote,
  editQuoteAuthenticity,
  setHighlightedQuote,
  createQuote,
} = quotesSlice.actions;

export default quotesSlice.reducer;
