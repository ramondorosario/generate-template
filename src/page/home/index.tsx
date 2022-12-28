import { toPng } from "html-to-image";
import { useState } from "react";
import { Card, TemplateType } from "../../components/card";
import s from "./styles.module.scss";

export function Home() {
  const [text, setText] = useState<string>("");
  const [templateValue, setTemplateValue] = useState<TemplateType>("generic");
  const [generate, setGenerate] = useState<boolean>(false);
  const [settingsFontSizeList, setSettingsFontSizeList] = useState<{
    fontSize: string;
    showInput: boolean;
  }>({ fontSize: "22", showInput: false });

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
          <div className={s.containerSelect}>
            <label htmlFor="select">Template</label>
            <select
              name="select"
              id="select"
              value={templateValue}
              onChange={(e) => setTemplateValue(e.target.value as TemplateType)}
            >
              <option value="FIEB">FIEB</option>
              <option value="generic">Genérico</option>
            </select>
          </div>

          <div>
            <input
              type="checkbox"
              id="checkbox"
              onChange={(e) => {
                const checked = e.target.checked;
                setSettingsFontSizeList({
                  showInput: checked,
                  fontSize: checked ? settingsFontSizeList.fontSize : "22",
                });
              }}
            />
            <label htmlFor="checkbox">Editar fonte da lista</label>
          </div>

          {settingsFontSizeList.showInput && (
            <input
              type="tel"
              value={settingsFontSizeList.fontSize.toString()}
              onChange={(e) =>
                setSettingsFontSizeList({
                  ...settingsFontSizeList,
                  fontSize: e.target.value,
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
            fontSizeList={Number(settingsFontSizeList.fontSize)}
            text={text}
            templateValue={templateValue}
          />
          <button onClick={downloadImage}>Baixar template</button>
        </>
      )}
    </div>
  );
}
