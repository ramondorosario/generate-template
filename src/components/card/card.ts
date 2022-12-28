interface ISplitter {
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
    .map((v) => v.trim().replace(/\$.\s/g, ""))
    .filter((v) => !!v);
  const newList = list.map((item) => {
    const split = item.split(/:/);

    return `<b>${split[0]}:</b> ${split.slice(1).join(" ")}`;
  });

  console.log(list);

  return newList;
}

export function splitter(text: string): ISplitter | null {
  if (!text) return null;

  const [role, locale, time, rp, ...list] = text
    .split(/\n/)
    .filter((v) => v !== "");

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
