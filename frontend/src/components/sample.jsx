import React, { useState } from "react";

function Calculator() {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");

    const handleClick = (value) => {
        setInput((prev) => prev + value);
    };

    const handleClear = () => {
        setInput("");
        setResult("");
    };

    const handleEqual = () => {
        try {
            // eslint-disable-next-line no-eval
            setResult(eval(input).toString());
        } catch {
            setResult("Error");
        }
    };

    return (
        <div style={{ maxWidth: 220, margin: "2rem auto", border: "1px solid #ccc", padding: 20, borderRadius: 8 }}>
            <div style={{ marginBottom: 10, minHeight: 40, background: "#f9f9f9", padding: 8, borderRadius: 4 }}>
                <div>{input || "0"}</div>
                <div style={{ color: "#888", fontSize: 14 }}>{result}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 40px)", gap: 8 }}>
                {["7", "8", "9", "/",
                    "4", "5", "6", "*",
                    "1", "2", "3", "-",
                    "0", ".", "C", "+"].map((btn) =>
                    btn === "C" ? (
                        <button key={btn} onClick={handleClear}>{btn}</button>
                    ) : (
                        <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
                    )
                )}
                <button style={{ gridColumn: "span 4" }} onClick={handleEqual}>=</button>
            </div>
        </div>
    );
}

export default Calculator;