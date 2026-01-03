// ! Un reducer solo debe calcular y devolver el siguiente estado.
export interface ScrambleWordsState {
  currentWord: string;
  errorCounter: number;
  guessInput: string;
  isGameOver: boolean;
  maxAllowErrors: number;
  maxSkips: number;
  points: number;
  scrambledWord: string;
  skipCounter: number;
  words: string[];
  totalWords: number;
}

const GAME_WORDS = [
  "REACT",
  "JAVASCRIPT",
  "TYPESCRIPT",
  "HTML",
  "ANGULAR",
  "SOLID",
  "NODE",
  "VUEJS",
  "SVELTE",
  "EXPRESS",
  "MONGODB",
  "POSTGRES",
  "DOCKER",
  "KUBERNETES",
  "WEBPACK",
  "VITE",
  "TAILWIND",
];

// Esta función mezcla el arreglo para que siempre sea aleatorio
const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

// Esta función mezcla las letras de la palabra
const scrambleWord = (word: string = "") => {
  return word
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};

export const getInitialState = (): ScrambleWordsState => {
  const shuffleWords = shuffleArray([...GAME_WORDS]);

  return {
    currentWord: shuffleWords[0],
    errorCounter: 0,
    guessInput: "",
    isGameOver: false,
    maxAllowErrors: 3,
    maxSkips: 3,
    points: 0,
    scrambledWord: scrambleWord(shuffleWords[0]),
    skipCounter: 0,
    words: shuffleWords,
    totalWords: GAME_WORDS.length,
  };
};

export type ScrambleWordsActions =
  | {
      type: "SET_GUESS_INPUT";
      payload: string;
    }
  | { type: "CHECK_ANSWER" }
  | { type: "SKIP_WORD" }
  | { type: "START_NEW_GAME"; payload: ScrambleWordsState };

export const scrambleWordsReducer = (
  state: ScrambleWordsState,
  action: ScrambleWordsActions
): ScrambleWordsState => {
  switch (action.type) {
    case "SET_GUESS_INPUT":
      return {
        ...state,
        guessInput: action.payload.trim().toUpperCase(),
      };

    case "CHECK_ANSWER": {
      if (state.currentWord === state.guessInput) {
        const newWords = state.words.slice(1);
        // ! Put confetti here

        return {
          ...state,
          words: newWords,
          points: state.points + 1,
          guessInput: "",
          currentWord: newWords[0],
          scrambledWord: scrambleWord(newWords[0]),
        };
      }

      return {
        ...state,
        guessInput: "",
        errorCounter: state.errorCounter + 1,
        isGameOver: state.errorCounter + 1 >= state.maxAllowErrors,
      };
    }

    case "SKIP_WORD": {
      if (state.skipCounter >= state.maxSkips) return state;
      const updatedWords = state.words.slice(1);

      return {
        ...state,
        skipCounter: state.skipCounter + 1,
        words: updatedWords,
        currentWord: updatedWords[0],
        scrambledWord: scrambleWord(updatedWords[0]),
        guessInput: "",
      };
    }

    case "START_NEW_GAME": {
      // return getInitialState()
      return action.payload;
    }

    default:
      return state;
  }
};
