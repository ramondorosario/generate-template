export interface ISplitter {
  role: string;
  locale: string;
  registrationDeadline: string;
  rp: {
    codes: string;
    amount: number;
  };
  list: string[];
}

export function formatCodes(arr: string[]) {
  if (!arr.length) return "";

  return arr.join(" - ");
}

function formatList(arr: string[]) {
  const list = arr
    .map((v, i) => {
      return v.trim().replace(/\$.\s/g, "");
    })
    .filter((v) => !!v && v !== "");

  const newList = list.map((item) => {
    const split = item.split(/:/);

    return `<b>${split[0]}:</b> ${split.slice(1).join(" ")}`;
  });

  return newList;
}

export function splitterDefault(text: string): ISplitter | null {
  if (!text) return null;

  const [role, locale, time, rp, ...list] = text
    .split(/\n/)
    .map((v) => v.trim())
    .filter((t) => !!t);

  if (!rp || !list.length) return null;

  const orderedList = list.sort((a, b) => a.localeCompare(b));

  const arrRp = rp.split(/[\s,]/).filter((v) => !!v && v !== "e" && v !== "RP");

  const formated = {
    role,
    locale,
    registrationDeadline: time.replace(/prazo:/iu, ""),
    rp: {
      codes: formatCodes(arrRp),
      amount: arrRp.length,
    },
    list: formatList(orderedList),
  };

  return formated;
}

export function splitterAutomatic(text: string): ISplitter | null {
  const data = text
    .split(/\n/)
    .map((v) => v.trim())
    .filter((t) => !!t);

  const indices: {
    delete: number | null;
    startInterval: number | null;
    endInterval: number | null;
  } = {
    delete: null,
    startInterval: null,
    endInterval: null,
  };

  data.forEach((value, index) => {
    const valueUpperCase = value.toUpperCase();

    if (valueUpperCase.includes("conhecimentos desejáveis".toUpperCase()))
      return (indices.delete = index);

    if (valueUpperCase.includes("atividades desenvolvidas".toUpperCase()))
      return (indices.startInterval = index + 1);

    if (valueUpperCase.includes("conhecimentos técnicos".toUpperCase()))
      return (indices.endInterval = index - 1);
  });

  if (!indices.delete || !indices.endInterval || !indices.startInterval)
    return null;

  data[indices.endInterval + 1] = data[indices.endInterval + 1].replace(
    /conhecimentos técnicos/i,
    "Experiência"
  );

  const arrWithDeletedData = data.slice(0, indices.delete);

  const part1 = arrWithDeletedData.slice(0, indices.startInterval);

  const part2 = arrWithDeletedData.slice(
    indices.startInterval,
    indices.endInterval
  );

  const join =
    "Informações Adicionais: " +
    part2
      .filter((v) => !v.toUpperCase().includes("REQUISITOS"))
      .map((v) => v.replace(":", ""))
      .join(" ");

  const part3 = arrWithDeletedData.slice(indices.endInterval);

  const result = [...part1, join, ...part3];

  const [role, locale, time, rp, ...list] = result;

  const arrRp = rp.split(/[\s,]/).filter((v) => !!v && v !== "e" && v !== "RP");

  const formated = {
    role,
    locale,
    registrationDeadline: time.replace(/prazo:/iu, ""),
    rp: {
      codes: formatCodes(arrRp),
      amount: arrRp.length,
    },
    list: sortList(list),
  };

  return formated;
}

function sortList(arr: string[]) {
  const ordem = [
    "escolaridade",
    "experiência",
    "atividades desenvolvidas",
    "informações adicionais",
  ];

  arr.forEach((value) => {
    const index = ordem.findIndex((v) => value.toLowerCase().includes(v));

    ordem[index] = value;
  });

  return ordem;
}
