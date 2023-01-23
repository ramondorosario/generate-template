import { useState } from "react";
import { splitterDefault, splitterAutomatic } from "../../components/card/card";
import { NewCard, LogoType } from "../../components/card";
import s from "./styles.module.scss";
import html2canvas from "html2canvas";

export function Home() {
  const [text, setText] = useState<string>("");
  const [logoValue, setLogoValue] = useState<LogoType>("generic");
  const [generate, setGenerate] = useState<boolean>(false);
  const [centerLocale, setCenterLocale] = useState<boolean>(false);
  const [mode, setMode] = useState<"default" | "automatic">("automatic");
  const [settingsFontSizeList, setSettingsFontSizeList] = useState<{
    fontSize: string;
    showInput: boolean;
    space: string;
  }>({ fontSize: "24", showInput: false, space: "16" });
  const [settingsHeader, setSettingsHeader] = useState<{
    showInput: boolean;
    space: string;
    fontSize: string;
  }>({ showInput: false, space: "8", fontSize: "34" });

  async function downloadImage() {
    const element = document.getElementById("card")!;
    html2canvas(element, { scale: 1 }).then((v) => {
      const link = document.createElement("a");
      const dataUrl = v.toDataURL();

      link.download = "card.png";
      link.href = dataUrl;
      link.click();
    });

    // const dataUrl = await toPng(element);
  }

  const data =
    mode === "default" ? splitterDefault(text) : splitterAutomatic(text);

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

      <div>
        <label htmlFor="mode" style={{ marginRight: 4 }}>
          Modo automático
        </label>
        <input
          type="checkbox"
          id="mode"
          checked={mode === "automatic"}
          onChange={(e) => setMode(e.target.checked ? "automatic" : "default")}
        />
      </div>

      <div className={s.settings}>
        <div>
          <label htmlFor="select">Logo</label>
          <select
            name="select"
            id="select"
            value={logoValue}
            onChange={(e) => setLogoValue(e.target.value as LogoType)}
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
                  space: checked ? settingsHeader.space : "8",
                  fontSize: checked ? settingsHeader.fontSize : "34",
                });
              }}
            />
            <label htmlFor="header">Config. cabeçalho</label>
          </div>

          {settingsHeader.showInput && (
            <div className={s.adjusts}>
              <div>
                <label htmlFor="fontHeader">Tamanho: </label>
                <input
                  id="fontHeader"
                  type="text"
                  value={settingsHeader.fontSize.toString()}
                  onChange={(e) =>
                    setSettingsHeader({
                      ...settingsHeader,
                      fontSize: e.target.value,
                    })
                  }
                />
              </div>

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
            <label htmlFor="checkbox">Config. lista</label>
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
      {generate &&
        (!!data?.list ? (
          <>
            <NewCard
              id="card"
              fontSizes={{
                header: Number(settingsHeader.fontSize),
                list: Number(settingsFontSizeList.fontSize),
              }}
              spaces={{
                header: Number(settingsHeader.space),
                list: Number(settingsFontSizeList.space),
              }}
              data={data}
              logoValue={logoValue}
              adjustPhone11={centerLocale}
            />
            <div style={{ marginTop: 12 }}>
              <input
                id="center"
                type="checkbox"
                onChange={(e) => setCenterLocale(e.target.checked)}
              />
              <label htmlFor="center">Centralizar localidade</label>
            </div>
            <button onClick={downloadImage}>Baixar template</button>
          </>
        ) : (
          <div className={s.error}>
            Algumas informações estam faltando. Verifique se os tópicos foram
            informados corretamente.
          </div>
        ))}
    </div>
  );
}
