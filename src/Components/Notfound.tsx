import React from "react";
import { useTheme } from "../Context/Context";
import styles from "./Styles/NotFound.module.css";
import { useNavigate } from "react-router-dom";

export const Notfound = () => {
  const [timeleft, setTimeLeft] = React.useState(5);
  const theme = useTheme();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (timeleft === 0) {
      navigate("/");
    }
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeleft, navigate]);

  return (
    <div className={`${styles[theme]} ${styles.notfound}`}>
      <p>This page doesn't exist :(</p>
      <p>Going back in {timeleft}</p>
    </div>
  );
};
