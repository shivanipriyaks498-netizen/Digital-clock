
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [message, setMessage] = useState("");
  const [time, setTime] = useState(new Date());

  const correctPin = "1234";

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // PIN keypad
  const handleNumber = (number) => {
    if (unlocked || pin.length >= 4) return;

    setPin((previous) => previous + number);
    setMessage("");
  };

  // Check PIN
  const handleUnlock = () => {
    if (pin === correctPin) {
      setUnlocked(true);
      setMessage("The vault has been opened!");
    } else {
      setMessage("Incorrect PIN! Try again.");
      setPin("");
    }
  };

  // Reset lock
  const handleReset = () => {
    setUnlocked(false);
    setPin("");
    setMessage("");
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key >= "0" && event.key <= "9") {
        handleNumber(event.key);
      }

      if (event.key === "Backspace") {
        setPin((previous) => previous.slice(0, -1));
      }

      if (event.key === "Enter" && !unlocked) {
        handleUnlock();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div className="vault-container">

      <div className="vault-card">

        <div className="brand">
          <span>✦</span>
          CHRONOVAULT
          <span>✦</span>
        </div>

        <p className="subtitle">
          THE KEEPER OF TIME
        </p>

        <div className="clock">
          {time.toLocaleTimeString()}
        </div>

        <p className="date">
          {time.toDateString()}
        </p>

        {/* Vintage Hourglass */}
        <div className={`hourglass ${unlocked ? "flipped" : ""}`}>
          <div className="glass">
            <div className="top-sand"></div>
            <div className="falling-sand"></div>
            <div className="bottom-sand"></div>
          </div>
        </div>

        <h2>
          {unlocked ? "VAULT UNLOCKED" : "ENTER SECRET PIN"}
        </h2>

        <p className="description">
          {unlocked
            ? "Your secrets are now revealed."
            : "Only time knows the secret."}
        </p>

        <div className="pin-display">
          {Array.from({ length: 4 }).map((_, index) => (
            <span key={index} className="pin-dot">
              {pin[index] ? "●" : "○"}
            </span>
          ))}
        </div>

        {!unlocked && (
          <div className="keypad">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "⌫"].map(
              (key) => (
                <button
                  key={key}
                  className="key"
                  onClick={() => {
                    if (key === "C") {
                      setPin("");
                      setMessage("");
                    } else if (key === "⌫") {
                      setPin((previous) => previous.slice(0, -1));
                    } else {
                      handleNumber(key);
                    }
                  }}
                >
                  {key}
                </button>
              )
            )}
          </div>
        )}

        <button
          className="unlock-button"
          onClick={unlocked ? handleReset : handleUnlock}
        >
          {unlocked ? "LOCK AGAIN" : "UNLOCK THE VAULT"}
        </button>

        <p className={`message ${message.includes("Incorrect") ? "error" : ""}`}>
          {message}
        </p>

        <div className="footer">
          EST. 1890 • TIME IS THE KEY
        </div>

      </div>
    </div>
  );
}

export default App;