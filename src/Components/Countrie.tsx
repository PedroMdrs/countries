import { NavLink, useLocation } from "react-router-dom";
import { country, useCountries, useTheme } from "../Context/Context";
import React from "react";
import styles from "./Styles/Countrie.module.css";

const Countrie = () => {
  const theme = useTheme();
  const countries = useCountries();
  const location = decodeURI(useLocation().pathname).slice(1);
  const [currentCountry, setCurrentCountry] = React.useState<null | country[]>(
    null
  );
  const [borders, setBorders] = React.useState<string[]>([]);

  // Find the common name of the countries on each border
  React.useEffect(() => {
    if (!currentCountry || currentCountry.length === 0) return;
    const borders = currentCountry[0].borders.map((border) => border);

    const bordersFiltered = borders
      .map((border) => {
        const country = countries.find((countrie) => countrie.cca3 === border);
        return country ? country.name.common : null;
      })
      .filter((border): border is string => border !== null);

    setBorders(bordersFiltered);
  }, [currentCountry, countries]);

  // Select country according to url
  React.useEffect(() => {
    setCurrentCountry(() =>
      countries.filter((x) => x.name.common === location)
    );
  }, [countries, location]);

  if (!currentCountry || currentCountry.length === 0) return;
  return (
    <section>
      <div className={`${styles[theme]} ${styles.back}`}>
        <NavLink to={"/"} className={styles[theme]}>
          <svg
            color="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" />
          </svg>
          Back
        </NavLink>
      </div>
      <div className={`${styles[theme]} ${styles.countrie}`}>
        <img src={currentCountry[0].flags.png} alt="" />
        <div className={styles.description}>
          <p>
            <span>{currentCountry[0].name.common}</span>
          </p>
          <div>
            <p>
              Native Name:{" "}
              <span>
                {
                  currentCountry[0].name.nativeName[
                    Object.keys(currentCountry[0].name.nativeName)[
                      Object.keys(currentCountry[0].name.nativeName).length - 1
                    ]
                  ].common
                }
              </span>
            </p>
            <p>
              Population:{" "}
              <span>
                {currentCountry[0].population.toLocaleString("pt-BR")}
              </span>
            </p>
            <p>
              Region: <span>{currentCountry[0].region}</span>
            </p>
            <p>
              Sub Region: <span>{currentCountry[0].subregion}</span>
            </p>
            <p>
              Capital: <span>{currentCountry[0].capital}</span>
            </p>
          </div>
          <div>
            <p>
              Top Level Domain: <span>{currentCountry[0].tld[0]} </span>
            </p>
            <div className={styles.currencies}>
              <p>
                Currencies:{" "}
                {Object.keys(currentCountry[0].currencies).map(
                  (currency, index, array) => (
                    <span className={styles.currencie} key={currency}>
                      {index === array.length - 1
                        ? currentCountry[0].currencies[currency].name
                        : `${currentCountry[0].currencies[currency].name}, `}
                    </span>
                  )
                )}
              </p>
            </div>
            <div className={styles.languages}>
              <p>
                Languages:{" "}
                {Object.keys(currentCountry[0].languages).map(
                  (language, index, array) => (
                    <span className={styles.language} key={language}>
                      {index === array.length - 1
                        ? currentCountry[0].languages[language]
                        : `${currentCountry[0].languages[language]}, `}
                    </span>
                  )
                )}{" "}
              </p>
            </div>
          </div>
          <div className={styles.borders}>
            {currentCountry[0].borders.length > 0 ? (
              <>
                <p>Border Countries:</p>
                <ul>
                  {borders.map((border) => (
                    <li className={styles[theme]} key={border}>
                      {border}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <p>Border Countries: None</p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Countrie;
