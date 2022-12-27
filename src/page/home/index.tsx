import { toPng } from "html-to-image";
import { useState } from "react";
import { Card } from "../../components/card";
import s from "./styles.module.scss";

export function Home() {
  const [text, setText] = useState<string>("");
  const [generate, setGenerate] = useState<boolean>(false);
  const [settingsFontSizeList, setSettingsFontSizeList] = useState<{
    fontSize: number;
    showInput: boolean;
  }>({ fontSize: 22, showInput: false });

  async function downloadImage() {
    const element = document.getElementById("capture")!;
    const dataUrl = await toPng(element);

    const link = document.createElement("a");
    link.download = "card.png";
    link.href = dataUrl;
    link.click();
  }

  //   async function downloadImage() {
  //     const element = document.getElementById("capture")!;
  //     const canvas = await html2canvas(element);
  //     const image = canvas.toDataURL("image/png", 1.0);

  //     const fakeLink = document.createElement("a");
  //     fakeLink.style.display = "none";
  //     fakeLink.download = "card.png";

  //     fakeLink.href = image;

  //     document.body.appendChild(fakeLink);
  //     fakeLink.click();
  //     document.body.removeChild(fakeLink);

  //     fakeLink.remove();
  //   }

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
      <div className={s.btns}>
        <div className={s.settings}>
          <div>
            <input
              type="checkbox"
              id="checkbox"
              onChange={(e) => {
                const checked = e.target.checked;
                setSettingsFontSizeList({
                  showInput: checked,
                  fontSize: checked ? settingsFontSizeList.fontSize : 22,
                });
              }}
            />
            <label htmlFor="checkbox">Editar fonte da lista</label>
          </div>
          {settingsFontSizeList.showInput && (
            <input
              type="number"
              value={settingsFontSizeList.fontSize}
              onChange={(e) =>
                setSettingsFontSizeList({
                  ...settingsFontSizeList,
                  fontSize: e.target.valueAsNumber,
                })
              }
            />
          )}
        </div>

        <button className={s.btnGenerate} onClick={() => setGenerate(true)}>
          Gerar
        </button>
      </div>
      {generate && text && (
        <>
          <Card
            id="capture"
            fontSizeList={settingsFontSizeList.fontSize}
            text={text}
          />
          <button onClick={downloadImage}>Baixar template</button>
        </>
      )}
    </div>
  );
}
