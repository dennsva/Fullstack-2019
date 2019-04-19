import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => (
    <h1>{text}</h1>
)

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistics = ({good, neutral, bad}) => {
    if (good + neutral + bad === 0) return <p>Ei yhtään palautetta annettu</p>
    return (
        <div>
            <table>
                <tbody>
                    <Statistic text="hyvä" stat={good}/>
                    <Statistic text="neutraali" stat={neutral}/>
                    <Statistic text="huono" stat={bad}/>
                    <Statistic text="yhteensä" stat={good + bad + neutral}/>
                    <Statistic text="keskiarvo" stat={(good - bad) / (good + bad + neutral)}/>
                    <Statistic text="positiivisia" stat={good / (good + bad + neutral) * 100} append="%"/>
                </tbody>
            </table>
        </div>
    )
}

const Statistic = ({text, stat, append}) => (
    <tr>
        <td>{text}</td>
        <td>{stat} {append}</td>
    </tr>
)

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <Header text="anna palautetta"/>
            <Button 
                text="hyvä"
                handleClick={() => setGood(good + 1)}
            />
            <Button 
                text="neutraali"
                handleClick={() => setNeutral(neutral + 1)}
            />
            <Button 
                text="huono"
                handleClick={() => setBad(bad + 1)}
            />
            <Header text="statistiikka"/>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))