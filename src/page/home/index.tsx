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
    space: string;
  }>({ fontSize: "22", showInput: false, space: "16" });
  const [settingsHeader, setSettingsHeader] = useState<{
    showInput: boolean;
    space: string;
  }>({ showInput: false, space: "24" });

  async function downloadImage() {
    const element = document.getElementById("capture")!;
    const dataUrl = await toPng(element);

    const link = document.createElement("a");
    link.download = "card.png";
    link.href = dataUrl;
    link.click();
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

      <div className={s.settings}>
        <div>
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

        <div className={s.containerAdjusts}>
          <div>
            <input
              type="checkbox"
              id="header"
              onChange={(e) => {
                const checked = e.target.checked;
                setSettingsHeader({
                  showInput: checked,
                  space: checked ? settingsFontSizeList.space : "24",
                });
              }}
            />
            <label htmlFor="header">Configurar cabeçalho</label>
          </div>

          {settingsHeader.showInput && (
            <div className={s.adjusts}>
              <div>
                <label htmlFor="spaceHeader">Espaçamento: </label>
                <input
                  id="spaceHeader"
                  type="text"
                  value={settingsHeader.space.toString()}
                  onChange={(e) =>
                    setSettingsHeader({
                      ...settingsHeader,
                      space: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
        </div>

        <div className={s.containerAdjusts}>
          <div>
            <input
              type="checkbox"
              id="checkbox"
              onChange={(e) => {
                const checked = e.target.checked;
                setSettingsFontSizeList({
                  showInput: checked,
                  fontSize: checked ? settingsFontSizeList.fontSize : "22",
                  space: checked ? settingsFontSizeList.space : "16",
                });
              }}
            />
            <label htmlFor="checkbox">Configurar lista</label>
          </div>

          {settingsFontSizeList.showInput && (
            <div className={s.adjusts}>
              <div>
                <label htmlFor="font">Tamanho: </label>
                <input
                  id="font"
                  type="text"
                  value={settingsFontSizeList.fontSize.toString()}
                  onChange={(e) =>
                    setSettingsFontSizeList({
                      ...settingsFontSizeList,
                      fontSize: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="space">Espaçamento: </label>
                <input
                  id="space"
                  type="text"
                  value={settingsFontSizeList.space.toString()}
                  onChange={(e) =>
                    setSettingsFontSizeList({
                      ...settingsFontSizeList,
                      space: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <button className={s.btnGenerate} onClick={() => setGenerate(true)}>
        Gerar
      </button>
      {generate && text && (
        <>
          <Card
            id="capture"
            fontSizeList={Number(settingsFontSizeList.fontSize)}
            spaces={{
              header: Number(settingsHeader.space),
              list: Number(settingsFontSizeList.space),
            }}
            text={text}
            templateValue={templateValue}
          />
          <button onClick={downloadImage}>Baixar template</button>
        </>
      )}
    </div>
  );
}
