import { useState } from "react";
import s from "./styles.module.scss";

export function Domino() {
  const btns = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

  const [participants, setParticipants] = useState<
    Array<{ name: string; score: number }>
  >([]);
  const [ready, setReady] = useState<boolean>(false);
  const [gamer, setGamer] = useState<string>("");
  const [selectedGamer, setSelectedGamer] = useState<string>("");
  const [button, setButton] = useState<number | null>(null);

  function addParticipant() {
    setParticipants([...participants, { name: gamer, score: 0 }]);
    setGamer("");
  }

  return (
    <main>
      <div className={s.container}>
        <h2>Pontuação Dominó</h2>

        {!ready && (
          <>
            <input
              type="text"
              placeholder="Nome do participante"
              value={gamer}
              onChange={(e) => setGamer(e.target.value)}
            />

            <ul>
              {participants.map((p, i) => (
                <li key={p.name + i}>{p.name}</li>
              ))}
            </ul>
          </>
        )}

        {!!participants.length && ready && (
          <div className={s.main}>
            {participants.map((p) => (
              <div
                className={`${s.participants} ${
                  selectedGamer === p.name ? s.selected : ""
                }`}
                onClick={() => setSelectedGamer(p.name)}
                key={p.name}
              >
                <p>{p.name}</p>
                <p className={s.score}>{p.score}</p>
              </div>
            ))}
          </div>
        )}

        {ready && (
          <div className={s.buttons}>
            {btns.map((b) => (
              <button
                className={button === b ? s.selected : ""}
                key={b}
                onClick={() => setButton(b)}
              >
                {b}
              </button>
            ))}
          </div>
        )}

        <footer>
          {!ready && (
            <button
              style={{ backgroundColor: "green" }}
              onClick={() => setReady(true)}
            >
              Iniciar
            </button>
          )}
          {ready && (
            <button
              onClick={() => {
                if (ready && button) {
                  const find = participants.find(
                    (p) => p.name === selectedGamer
                  )!;
                  find.score = find.score - button;
                  setButton(null);
                  setSelectedGamer("");

                  return setParticipants([...participants]);
                }
              }}
            >
              Remover
            </button>
          )}
          <button
            onClick={() => {
              if (ready && button) {
                const find = participants.find(
                  (p) => p.name === selectedGamer
                )!;
                find.score = find.score + button;
                setButton(null);
                setSelectedGamer("");

                return setParticipants([...participants]);
              }

              !ready && addParticipant();
            }}
          >
            Adicionar
          </button>
        </footer>
      </div>
    </main>
  );
}
