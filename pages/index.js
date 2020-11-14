import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [valorSaque, setValorSaque] = useState(null);
  const [cedulasQtd, setCedulasQtd] = useState([0, 0, 0, 0, 0, 0, 0]);

  const [error, setError] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showSaque, setShowSaque] = useState(false);

  function isPositiveInteger(n) {
    return n >>> 0 === parseFloat(n);
  }

  function Saque() {
    setError(false);

    if (!isPositiveInteger(valorSaque)) {
      setError(true);
      setErrorMsg("Digite apenas numeros");
    } else {
      const valor = parseInt(valorSaque);

      if (valor > 1000) {
        setError(true);
        setErrorMsg("Saque maximo 1.000");
      } else {
        let total = valor;

        const notas = [200, 100, 50, 20, 10, 5, 2];

        let conta = [0, 0, 0, 0, 0, 0, 0];

        for (var indice = 0; indice < 7; indice++) {
          if (total >= notas[indice]) {
            conta[indice] = parseInt(total / notas[indice]);
            total = total - notas[indice] * conta[indice];
          }

          if (total === 0) {
            break;
          } else if (total < 2) {
            total = valor;
            conta = [0, 0, 0, 0, 0, 0, 0];

            for (var indice = 6; indice > 0; indice--) {
              if (total >= notas[indice]) {
                conta[indice] = parseInt(total / notas[indice]);
                total = total - notas[indice] * conta[indice];
              }

              if (total < 2) break;
            }
          }
        }

        if (total === 1 || total === 3 || conta[6] > 5) {
          let totalprev;
          let total = valor;
          let conta = [0, 0, 0, 0, 0, 0, 0];

          for (var indice = 0; indice < 7; indice++) {
            if (total > notas[indice]) {
              let prev = parseInt(total / notas[indice]);
              totalprev = total - notas[indice] * prev;

              if (totalprev === 1 || totalprev === 3) {
                let prev = total / 3;
                if (isPositiveInteger(prev) && prev > 1) {
                  conta[indice + 1] = parseInt(total / notas[indice + 1]);
                  total = total - notas[indice + 1] * conta[indice + 1];
                } else {
                  prev = total - notas[indice];

                  if (isPositiveInteger(prev) && prev > 1 && prev !== 3) {
                    conta[indice] = 1;
                    total = total - notas[indice];
                  } else {
                  }
                }
              } else {
                conta[indice] = parseInt(total / notas[indice]);
                total = total - notas[indice] * conta[indice];
              }
            }

            if (total === 1) {
              break;
            }
          }

          if (total > 0) {
            setError(true);
            setErrorMsg(
              "Não conseguimos devolver este valor já que não existe nota de R$1,00"
            );
          } else {
            setCedulasQtd(conta);
            setShowSaque(true);
          }
        } else {
          setCedulasQtd(conta);
          setShowSaque(true);
        }
      }
    }
  }

  function handleChange(evt) {
    setValorSaque(evt.target.validity.valid ? evt.target.value : valorSaque);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Sistema ATM </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Sistema ATM</h1>
        <div className={styles.grid}>
          <p className={styles.description}>
            Sua tarefa consiste em devolver o menor número de notas que
            corresponda ao valor total pedido pelo cliente do banco.
          </p>
        </div>

        <div className={styles.gridBox}>
          <p className={styles.description}>Digite um valor para sacar</p>

          <input
            className={styles.inputText}
            type="text"
            pattern="[0-9]*"
            placeholder="Digite um valor "
            onInput={handleChange.bind(this)}
            value={valorSaque}
          />
          <button className={styles.button} onClick={() => Saque()}>
            Sacar{" "}
          </button>

          {error ? <p className={styles.error}>{errorMsg}</p> : null}
        </div>
        {showSaque ? (
          <>
            <div className={styles.grid}>
              {cedulasQtd[6] > 0 ? (
                <div className={styles.card}>
                  <h2>
                    {cedulasQtd[6]} <span>X</span>
                  </h2>
                  <img src="/notas/2_front.jpg" />
                </div>
              ) : null}

              {cedulasQtd[5] > 0 ? (
                <div className={styles.card}>
                  <h2>
                    {cedulasQtd[5]} <span>X</span>
                  </h2>
                  <img src="/notas/5_front.jpg" />
                </div>
              ) : null}

              {cedulasQtd[4] > 0 ? (
                <div className={styles.card}>
                  <h2>
                    {cedulasQtd[4]} <span>X</span>
                  </h2>
                  <img src="/notas/10_front.jpg" />
                </div>
              ) : null}
              {cedulasQtd[3] > 0 ? (
                <div className={styles.card}>
                  <h2>
                    {cedulasQtd[3]} <span>X</span>
                  </h2>
                  <img src="/notas/20_front.jpg" />
                </div>
              ) : null}
              {cedulasQtd[2] > 0 ? (
                <div className={styles.card}>
                  <h2>
                    {cedulasQtd[2]} <span>X</span>
                  </h2>
                  <img src="/notas/50_front.jpg" />
                </div>
              ) : null}
              {cedulasQtd[1] > 0 ? (
                <div className={styles.card}>
                  <h2>
                    {cedulasQtd[1]} <span>X</span>
                  </h2>
                  <img src="/notas/100_front.jpg" />
                </div>
              ) : null}
              {cedulasQtd[0] > 0 ? (
                <div className={styles.card}>
                  <h2>
                    {cedulasQtd[0]} <span>X</span>
                  </h2>
                  <img src="/notas/200_front.jpg" />
                </div>
              ) : null}
            </div>
          </>
        ) : null}
      </main>

      <footer className={styles.footer}>
        Powered by {"  "}
        <a href="https://carlosstenzel.com/" target="_blank">
          Carlos Stenzel
        </a>
      </footer>
    </div>
  );
}
