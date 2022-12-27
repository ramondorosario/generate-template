import html2canvas from "html2canvas";
import { useState } from "react";
import { Card } from "../../components/card";
import s from "./styles.module.scss";

export function Home() {
  const [text, setText] = useState<string>("");
  const [generate, setGenerate] = useState<boolean>(false);

  async function downloadImage() {
    const element = document.getElementById("capture")!;
    const canvas = await html2canvas(element);
    const image = canvas.toDataURL("image/png", 1.0);

    const fakeLink = document.createElement("a");
    fakeLink.style.display = "none";
    fakeLink.download = "card.png";

    fakeLink.href = image;

    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);

    fakeLink.remove();
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
          <button onClick={downloadImage}>Baixar template</button>
        </>
      )}
    </div>
  );
}
