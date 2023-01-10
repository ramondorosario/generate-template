import { splitter } from "./card";
import s from "./styles.module.scss";

import BackgroundFIEB from "../../assets/images/template-FIEB.svg";
import BackgroundGeneric from "../../assets/images/template-generic.svg";

export type TemplateType = "FIEB" | "generic";

interface ICard {
  text: string;
  id: string;
  fontSizeList: number;
  templateValue: TemplateType;
  spaces: {
    header: number;
    list: number;
  };
  centerLocale?: boolean;
}

export function Card({
  text,
  id,
  fontSizeList,
  templateValue,
  spaces,
  centerLocale = false,
}: ICard) {
  const data = splitter(text);

  if (!data) return null;

  const amount = data.rp.amount;
  const amountJobsText = `${amount.toString().padStart(2, "0")} vaga${
    amount > 1 ? "s" : ""
  } para:`;

  return (
    <div className={s.container} id={id}>
      <main
        style={{
          backgroundImage: `url(${
            templateValue === "FIEB" ? BackgroundFIEB : BackgroundGeneric
          })`,
        }}
      >
        <div className={s.header} style={{ gap: spaces.header }}>
          <p className={s.regular}>{amountJobsText}</p>
          <p>{data.role}</p>
          <p>
            Código da vaga:{" "}
            <span className={data.rp.amount >= 3 ? s.breakline : ""}>
              {data.rp.codes}
            </span>
          </p>
        </div>

        <div className={`${s.row} ${s[templateValue]}`}>
          <p style={{ paddingTop: centerLocale ? 15 : 0 }}>{data.locale}</p>
          <p style={{ paddingTop: centerLocale ? 10 : 0 }}>
            Período de inscrição: <span>{data.registrationDeadline}</span>
          </p>
        </div>

        <div className={s.content}>
          <ul style={{ fontSize: fontSizeList, gap: spaces.list }}>
            {data.list.map((item, i) => (
              <li key={item + i} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>

          <div className={`${s.footer} ${s[templateValue]}`}>
            <p>
              <span>
                Se interessou pela vaga? <br />
              </span>
              Cadastre seu currículo através do portal:
              <br /> <span>www.trinnusrh.com.br</span>
              <br />
              Aproveite e conheça as etapas do processo seletivo!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
