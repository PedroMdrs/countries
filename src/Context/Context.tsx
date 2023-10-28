import React from "react";

type theme = "light" | "dark";
export interface countrie {
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  capital: string[];
  region: string;
  subregion: string;
  cca3: string;
  currencies: {
    [key: string]: { name: string; symbol: string };
  };
  independent: boolean;
  languages: {
    [key: string]: string;
  };
  population: number;
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  borders: string[];
}

interface IMainContext {
  theme: theme;
  setTheme: React.Dispatch<React.SetStateAction<theme>>;
  countries: countrie[];
  setCountries: React.Dispatch<React.SetStateAction<countrie[]>>;
}

const MainContext = React.createContext<null | IMainContext>(null);

export const useTheme = () => {
  const context = React.useContext(MainContext);
  if (!context)
    throw new Error("Theme context must be contained inside provider");
  return context.theme;
};

export const useSetTheme = () => {
  const context = React.useContext(MainContext);
  if (!context)
    throw new Error("Theme context must be contained inside provider");
  return context.setTheme;
};
export const useCountries = () => {
  const context = React.useContext(MainContext);
  if (!context)
    throw new Error("Theme context must be contained inside provider");
  return context.countries;
};
export const useSetCountries = () => {
  const context = React.useContext(MainContext);
  if (!context)
    throw new Error("Theme context must be contained inside provider");
  return context.setCountries;
};

export const ContextProvider = ({ children }: React.PropsWithChildren) => {
  const [theme, setTheme] = React.useState<theme>(() => {
    const localTheme = localStorage.getItem("theme");
    if (!localTheme) return "light";
    return JSON.parse(localTheme) === "dark" ? "dark" : "light";
  });
  const [countries, setCountries] = React.useState<countrie[]>([]);

  React.useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (!localTheme) {
      document.querySelector("body")?.setAttribute("data-theme", "light");
      return;
    }
    return JSON.parse(localTheme) === "dark"
      ? document.querySelector("body")?.setAttribute("data-theme", "dark")
      : document.querySelector("body")?.setAttribute("data-theme", "light");
  }, [theme]);

  React.useEffect(() => {
    async function doFetch() {
      const data = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,capital,currencies,population,independent,region,subregion,languages,tld,currencies,cca3,flags,borders"
      ).then((data) => data);
      const json = await data.json();
      const countries = json.filter(
        (item: countrie) => item.independent === true
      );
      setCountries(countries);
    }
    doFetch();
  }, []);
  const value = { theme, setTheme, countries, setCountries };
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};
