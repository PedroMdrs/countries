import { useLocation } from "react-router-dom";
import { countrie, useCountries, useTheme } from "../Context/Context";
import React from "react";

const Countrie = () => {
  const theme = useTheme();
  const countries = useCountries();
  const location = useLocation().pathname.slice(1);
  const [currentCountrie, setCurrentCountrie] = React.useState<
    null | countrie[]
  >(null);

  React.useEffect(() => {
    setCurrentCountrie(() =>
      countries.filter((x) => x.name.common === location)
    );
  }, [countries, location]);

  if (!currentCountrie || currentCountrie.length === 0) return;
  return (
    <section>
      <div>
        <svg
          color="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" />
        </svg>
        <button>Back</button>
      </div>
      <div>
        <div
          style={{
            background: `URL(${currentCountrie[0].flags.png})`,
          }}
        ></div>
        <div>
          <p>{currentCountrie[0].name.common}</p>
          <div>
            {/* <p>{currentCountrie[0].name.nativeName.nld.common}</p> */}
            <p>{currentCountrie[0].population}</p>
            <p>{currentCountrie[0].region}</p>
            <p>{currentCountrie[0].subregion}</p>
            <p>{currentCountrie[0].capital}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Countrie;
