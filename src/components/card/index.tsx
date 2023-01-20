import GenericLogoIcon from "../../assets/images/generic.svg";
import FiebLogoIcon from "../../assets/images/fieb.svg";
import LocaleIcon from "../../assets/images/locale.svg";
import CalendarIcon from "../../assets/images/calendar.svg";
import ClickIcon from "../../assets/images/click.svg";
import LogoTrinnus from "../../assets/images/trinnus.svg";
import { ISplitter } from "./card";

import s from "./styles.module.scss";

export type LogoType = "FIEB" | "generic";

interface ICard {
  data: ISplitter | null;
  id: string;
  fontSizes: {
    list: number;
    header: number;
  };
  logoValue: LogoType;
  spaces: {
    header: number;
    list: number;
  };
  adjustPhone11: boolean;
}

export function NewCard({
  data,
  id,
  fontSizes,
  spaces,
  logoValue,
  adjustPhone11,
}: ICard) {
  if (!data) return null;

  const amount = data.rp.amount;
  const amountJobsText = `${amount.toString().padStart(2, "0")} vaga${
    amount > 1 ? "s" : ""
  } para:`;

  return (
    <div className={s.container} id={id}>
      <header>
        <div className={s.infos}>
          <img
            src={logoValue === "generic" ? GenericLogoIcon : FiebLogoIcon}
            alt=""
          />
          <div style={{ gap: spaces.header, fontSize: fontSizes.header }}>
            <h2>{amountJobsText}</h2>
            <p>{data.role}</p>
            <p>
              Código da vaga:{" "}
              <span className={data.rp.amount >= 3 ? s.breakline : ""}>
                {data.rp.codes}
              </span>
            </p>
          </div>
        </div>

        <div className={s.footerInfos}>
          <p>
            <img src={LocaleIcon} alt="" />
            <span style={{ paddingTop: adjustPhone11 ? 15 : 0 }}>
              {data.locale}
            </span>
          </p>
          <p>
            <img src={CalendarIcon} alt="" />
            <span>
              Período de inscrição: <br /> {data.registrationDeadline}
            </span>
          </p>
        </div>
      </header>

      <section>
        <ul style={{ fontSize: fontSizes.list, gap: spaces.list }}>
          {data.list.map((item, i) => (
            <li key={item + i}>{item}</li>
          ))}
        </ul>
      </section>

      <footer>
        <div>
          <img src={ClickIcon} alt="" />
          <div>
            <p>
              Se interessou pela vaga? <br />
              Cadastre seu currículo através do portal: <br />
              www.trinnusrh.com.br
            </p>
          </div>
        </div>
        <img src={LogoTrinnus} alt="" />
      </footer>
    </div>
  );
}
