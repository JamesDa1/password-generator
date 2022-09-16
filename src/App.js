import { useState, useEffect } from "react"
import ReactSlider from "react-slider"

import "./App.css"
import "./components/Slider.css"
import Chevron from "./components/Chevron"
import CopyIcon from "./components/CopyIcon"

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
  const textField = document.querySelector("#passwordSuggestion")
  const [passwordLength, setPasswordLength] = useState(8)

  const [includeLowerCase, setIncludeLowerCase] = useState(false)
  const [includeUpperCase, setIncludeUpperCase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)

  let validCharacters = ""
  let simplifiedStrength = 0

  const chooseCharacterSet = () => {
    if (includeUpperCase) {
      validCharacters += upperCase
      simplifiedStrength += 1
    }
    if (includeLowerCase) {
      validCharacters += lowerCase
      simplifiedStrength += 1
    }
    if (includeNumbers) {
      validCharacters += numbers
      simplifiedStrength += 1
    }
    if (includeSymbols) {
      validCharacters += symbols
      simplifiedStrength += 1
    }
  }

  const copyPassword = () => {
    const password = textField.textContent
    navigator.clipboard.writeText(password)
    textField.textContent = "Copied to clipboard"
  }

  const generatePassword = () => {
    if (validCharacters) {
      let password = ""
      for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * validCharacters.length)
        password += validCharacters[randomNumber]
      }
      textField.textContent = password
      return password
    } else {
      textField.textContent = "Select characters"
    }
  }
  useEffect(() => {
    chooseCharacterSet()
  }, [includeUpperCase, includeLowerCase, includeNumbers, includeSymbols])

  return (
    <div className="App">
      <h1>Password Generator</h1>
      <div className="password" onClick={() => copyPassword()}>
        <p className="passwordSuggestion" id={"passwordSuggestion"}>
          P4$5W0rD!
        </p>
        <CopyIcon />
      </div>
      <div className="options-container">
        <article className="length">
          <p>Character Length</p>
          <span>{passwordLength}</span>
        </article>
        <article>
          <div>
            <ReactSlider
              className="customSlider"
              thumbClassName="customSlider-thumb"
              trackClassName="customSlider-track"
              markClassName="customSlider-mark"
              marks={20}
              min={8}
              max={20}
              valueLabelDisplay="on"
              defaultValue={0}
              value={passwordLength}
              onChange={(value) => {
                setPasswordLength(value)
              }}
              renderMark={(props) => {
                if (props.key < passwordLength) {
                  props.className = "customSlider-mark customSlider-mark-before"
                } else if (props.key === passwordLength) {
                  props.className = "customSlider-mark customSlider-mark-active"
                }
                return <span {...props} />
              }}
            />
          </div>
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
