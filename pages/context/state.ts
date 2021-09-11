import React from 'react';

type InitState = {
  text: string
  binID: string | null
}

const state: InitState = {
  text: "",
  binID: null
}

const Context = React.createContext(state);

//
