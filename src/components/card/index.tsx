import { splitter } from "./card";
import s from "./styles.module.scss";

export function Card({ text, id }: { text: string; id: string }) {
  const data = splitter(text);

  if (!data) return null;

  const amount = data.rp.amount;
  const amountJobsText = `${amount.toString().padStart(2, "0")} vaga${
    amount > 1 ? "s" : ""
  } para:`;

  return (
    <div className={s.container} id={id}>
      <main>
        <div className={s.header}>
          <p className={s.regular}>{amountJobsText}</p>
          <p>{data.role}</p>
          <p>{`Código da vaga: ${data.rp.codes}`}</p>
        </div>

        <div className={s.row}>
          <p>{data.locale}</p>
          <p>
            Período de inscrição: <span>{data.registrationDeadline}</span>
          </p>
        </div>

        <div className={s.content}>
          <ul>
            {data.list.map((item, i) => (
              <li key={item + i} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>

          <div className={s.footer}>
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

// Instrutor II - Sistemas
// Salvador/BA
// Prazo: 20/12/22 e 05/01/23

// RP 432166 e 432145

// $3 Atividades Desenvolvidas: Atender as demandas dos cursos técnicos da área de desenvolvimento de sistemas. Responsável por desenvolver ações referentes ao processo de ensino e aprendizagem que possibilitem aos alunos adquirirem as capacidades e conhecimentos necessários a sua formação profissional, bem como acompanhar o desenvolvimento das competências requeridas, preparando-os para atuar no mercado de trabalho.

// $4 Informações adicionais: Salário + Benefícios. Horista Contrato de tempo Indeterminado. Carga Horária: 20h semanais (Noturno) 18:00 às 22:00

// $1 Escolaridade: Ensino Superior em Análise e Desenvolvimento de Sistemas, Sistemas de Informação, Ciência da Computação ou áreas afins.

// $2 Experiência: Ter atuado ou possuir conhecimentos ou certificados em gestão de projetos, possuir experiência em docência ou treinamento em inovação, empreendedorismo, startup de software, possuir conhecimento e aplicações da indústria 4.0.
