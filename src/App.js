import "./App.css"
// import ReactSlider from "react-slider"
import Chevron from "./components.js/Chevron"
import { useState, useEffect, useRef } from "react"
import CopyIcon from "./components.js/CopyIcon"

const alpha = Array.from(Array(26)).map((e, i) => i + 65)
const lowerCase = alpha
  .map((x) => String.fromCharCode(x).toLowerCase())
  .join("")
const upperCase = alpha
  .map((x) => String.fromCharCode(x).toUpperCase())
  .join("")
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].join("")
const symbols = "!@#$%^&*"

function App() {
  const [includeLowerCase, setIncludeLowerCase] = useState(false)
  const [includeUpperCase, setIncludeUpperCase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)

  const passwordLength = 10

  let validCharacters = ""

  const chooseCharacterSet = () => {
    if (includeUpperCase) {
      validCharacters += upperCase
    }
    if (includeLowerCase) {
      validCharacters += lowerCase
    }
    if (includeNumbers) {
      validCharacters += numbers
    }
    if (includeSymbols) {
      validCharacters += symbols
    }
    console.log(validCharacters)
  }

  const generatePassword = () => {
    const textField = document.querySelector("#passwordSuggestion")
    console.log(textField)
    if (validCharacters) {
      let password = ""
      for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * validCharacters.length)
        password += validCharacters[randomNumber]
      }
      console.log(password)
      return password
    } else {
      console.log("Please enable a character set")
    }
  }
  const ref = useRef(null)
  useEffect(() => {
    chooseCharacterSet()
  }, [includeUpperCase, includeLowerCase, includeNumbers, includeSymbols])
  return (
    <div className="App">
      <h1>Password Generator</h1>
      <div className="password">
        <p className="passwordSuggestion" ref={ref}>
          P4$5W0rD!
        </p>
        <CopyIcon />
      </div>
      <div className="options-container">
        <article className="length">
          <p>Character Length</p>
          <span>{passwordLength}</span>
        </article>
        <article style={{ textAlign: "center", marginBlock: "1rem" }}>
          <h2>SLIDER GOES HERE</h2>
        </article>
        <article className="checkboxes">
          <input
            type="checkbox"
            name=""
            id="upperCase"
            onChange={() => {
              setIncludeUpperCase(!includeUpperCase)
            }}
          />
          <label htmlFor="">Include Uppercase Letters</label>
        </article>
        <article className="checkboxes">
          <input
            type="checkbox"
            name=""
            id="upperCase"
            onChange={() => {
              setIncludeLowerCase(!includeLowerCase)
            }}
          />
          <label htmlFor="">Include Lowercase Letters</label>
        </article>
        <article className="checkboxes">
          <input
            type="checkbox"
            name=""
            id="upperCase"
            onChange={() => {
              setIncludeNumbers(!includeNumbers)
            }}
          />
          <label htmlFor="">Include Numbers</label>
        </article>
        <article className="checkboxes">
          <input
            type="checkbox"
            name=""
            id="upperCase"
            onChange={() => {
              setIncludeSymbols(!includeSymbols)
            }}
          />
          <label htmlFor="">Include Symbols</label>
        </article>
        <div className="evaluatePassword">
          <p>Strength</p>
          <div className="strengthIndicator">
            <h3>Medium</h3>
            <div className="chevrons">
              <Chevron color="red" />
              <Chevron color={"red"} />
              <Chevron />
              <Chevron />
            </div>
          </div>
        </div>
        <button className="generateBtn" onClick={generatePassword}>
          GENERATE
        </button>
      </div>
    </div>
  )
}

export default App
