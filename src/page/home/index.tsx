import html2canvas from "html2canvas";
import { useState } from "react";
import { Card } from "../../components/card";
import s from "./styles.module.scss";

export function Home() {
  const [text, setText] = useState<string>("");
  const [generate, setGenerate] = useState<boolean>(false);

  function onClick() {
    html2canvas(document.querySelector("#capture")!, {
      allowTaint: true,
      removeContainer: true,
      backgroundColor: null,
      imageTimeout: 15000,
      logging: true,
      scale: 2,
      useCORS: true,
    }).then((canvas) => {
      if (window.screen.width < 1024) {
        document
          .getElementById("viewportMeta")!
          .setAttribute("content", "width=device-width, initial-scale=1");
      }

      const cardUrl = canvas.toDataURL("image/png", 1);

      const link = document.createElement("a");
      link.download = "card.png";
      link.href = cardUrl;
      link.click();
    });
  }

  return (
    <div className={s.container}>
      <h1>Gerador de Template</h1>

      <div className={s.input}>
        <label htmlFor="text">Conteúdo</label>
        <textarea
          placeholder="Digite aqui o texto para popular o template"
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <button className={s.btnGenerate} onClick={() => setGenerate(true)}>
        Gerar
      </button>
      {generate && text && (
        <>
          <Card id="capture" text={text} />
          <button onClick={onClick}>Baixar template</button>
        </>
      )}
    </div>
  );
}
