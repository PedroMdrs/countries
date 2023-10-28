import styles from "./Styles/Home.module.css";
import { country, useCountries, useTheme } from "../Context/Context";
import React from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const theme = useTheme();
  const countries = useCountries();
  const [dropdown, setDropDown] = React.useState(false);
  const [region, setRegion] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [regionCountries, setRegionCountries] = React.useState<
    country[] | null
  >(countries);
  const countriesRef = React.useRef(countries);
  const regionCountriesRef = React.useRef(regionCountries);
  const regionRef = React.useRef(region);
  const navigate = useNavigate();

  React.useEffect(() => {
    countriesRef.current = countries;
  }, [countries]);
  React.useEffect(() => {
    regionCountriesRef.current = regionCountries;
  }, [regionCountries]);

  React.useEffect(() => {
    setRegionCountries(countries);
  }, [countries]);

  // filter countries per region
  React.useEffect(() => {
    function filterCountriesPerRegion(countries: country[]) {
      if (region === "All" || region === "") return countries;
      return countries.filter((countrie) => countrie.region === region);
    }
    setRegionCountries(filterCountriesPerRegion(countriesRef.current));
  }, [region]);

  // search countrie
  React.useEffect(() => {
    function filterCountriesPerRegion(countries: country[]) {
      if (regionRef.current === "All" || regionRef.current === "")
        return countries;
      return countries.filter(
        (countrie) => countrie.region === regionRef.current
      );
    }

    setRegionCountries(countriesRef.current);
    console.log(regionCountriesRef.current);
    console.log("RegionCountries setado para todos os paises");

    if (regionCountriesRef.current) {
      filterCountriesPerRegion(regionCountriesRef.current);
      console.log("RegionCountries filtrado");
    }
    function searchCountrie(countries: country[]) {
      if (search === "") return countries;
      console.log(countries);
      const searchedCountries = countries.filter((countrie) =>
        countrie.name.common.toLowerCase().startsWith(search.toLowerCase())
      );

      if (searchedCountries.length === 0) return null;
      console.log("searchCountrie executado");
      return searchedCountries;
    }
    if (regionCountriesRef.current) {
      setRegionCountries(searchCountrie(regionCountriesRef.current));
      console.log("setregion setado novamente");
    }
  }, [search]);

  return (
    <div className={styles.content}>
      <form className={`${styles[theme]} ${styles.form}`}>
        <div className={`${styles[theme]} ${styles.search}`}>
          <input
            className={styles[theme]}
            type="text"
            placeholder="Search for a country..."
            onChange={({ target }) => setSearch(target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ionicon"
            viewBox="0 0 512 512"
          >
            <path
              d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
              fill="none"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="50"
            />
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="50"
              d="M338.29 338.29L448 448"
            />
          </svg>
        </div>
        <div className={`${styles[theme]} ${styles.regions}`}>
          <div
            onClick={() => setDropDown((value) => !value)}
            className={styles[theme]}
          >
            <p>{region === "" ? "Filter by Region" : region}</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </svg>
          </div>
          <ul className={`${styles[theme]} ${dropdown ? styles.active : ""}`}>
            <li
              onClick={() => {
                setRegion("All");
                setDropDown(false);
              }}
            >
              All
            </li>
            <li
              onClick={() => {
                setRegion("Africa");
                setDropDown(false);
              }}
            >
              Africa
            </li>
            <li
              onClick={() => {
                setRegion("Americas");
                setDropDown(false);
              }}
            >
              America
            </li>
            <li
              onClick={() => {
                setRegion("Asia");
                setDropDown(false);
              }}
            >
              Asia
            </li>
            <li
              onClick={() => {
                setRegion("Europe");
                setDropDown(false);
              }}
            >
              Europe
            </li>
            <li
              onClick={() => {
                setRegion("Oceania");
                setDropDown(false);
              }}
            >
              Oceania
            </li>
          </ul>
        </div>
      </form>
      <ul className={styles.countries}>
        {regionCountries &&
          regionCountries.length > 0 &&
          regionCountries
            .sort((a, b) => a.name.common.localeCompare(b.name.common))
            .map((countrie) => (
              <li
                onClick={() => navigate(`${countrie.name.common}`)}
                className={`${styles.card} ${styles[theme]}`}
                key={countrie.cca3}
              >
                <div
                  className={styles.flag}
                  style={{
                    background: `URL(${countrie.flags.png})`,
                  }}
                ></div>

                <div className={styles.description}>
                  <p>{countrie.name.common}</p>
                  <div>
                    <p>
                      Population:
                      <span> {countrie.population.toLocaleString()}</span>
                    </p>
                    <p>
                      Region: <span>{countrie.region}</span>
                    </p>
                    <p>
                      Capital: <span>{countrie.capital}</span>
                    </p>
                  </div>
                </div>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default Home;
