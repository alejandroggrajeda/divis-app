import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonText,
  IonSearchbar,
  IonModal,
  IonButtons,
  IonList,
} from "@ionic/react";
import { swapHorizontalOutline, closeOutline } from "ionicons/icons";
import React, { useState, useEffect, useMemo, useRef } from "react";
import "./CurrencyConverter.css";

const API_URL = "https://open.er-api.com/v6/latest/USD";

interface Rates {
  [key: string]: number;
}

export const CurrencyConverter: React.FC = () => {
  const [rates, setRates] = useState<Rates>({});
  const [currencyCodes, setCurrencyCodes] = useState<string[]>([]);
  const [amount, setAmount] = useState<number>(1);
  const [amountInput, setAmountInput] = useState<string>("1");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("GTQ");
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"from" | "to">("from");
  const [searchText, setSearchText] = useState<string>("");
  const [isRotated, setIsRotated] = useState<boolean>(false);
  const searchbarRef = useRef<HTMLIonSearchbarElement>(null);

  // carga de datos (rates)
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const fetchedRates: Rates = data.rates;
        setRates(fetchedRates);
        setCurrencyCodes(Object.keys(fetchedRates).sort());

        setLoading(false);
      } catch (error) {
        console.error("Error al obtener las tasas de cambio:", error);
        setLoading(false);
      }
    };
    fetchRates();
  }, []);

  // lógica de conversión
  const convertedAmount = useMemo(() => {
    if (rates && fromCurrency && toCurrency && Object.keys(rates).length > 0) {
      const rateFrom = rates[fromCurrency];
      const rateTo = rates[toCurrency];

      if (rateFrom && rateTo && amount >= 0) {
        const amountInBase = amount / rateFrom;
        const result = amountInBase * rateTo;
        return parseFloat(result.toFixed(4));
      }
    }
    return null;
  }, [amount, fromCurrency, toCurrency, rates]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setIsRotated(!isRotated);
  };

  const filteredCurrencies = useMemo(() => {
    if (!searchText) return currencyCodes;
    return currencyCodes.filter((code) => code.toLowerCase().includes(searchText.toLowerCase()));
  }, [searchText, currencyCodes]);

  const openCurrencyModal = (type: "from" | "to") => {
    setModalType(type);
    setSearchText("");
    setShowModal(true);
  };

  const selectCurrency = (code: string) => {
    if (modalType === "from") {
      setFromCurrency(code);
    } else {
      setToCurrency(code);
    }
    setShowModal(false);
  };

  const currentRate = rates[toCurrency] / rates[fromCurrency] || 0;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>DivisApp 18011502</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="currency-container">
          <div className="amount-wrapper">
            <IonLabel className="full-label">Amount</IonLabel>
            <IonInput
              className="amount-input"
              type="text"
              inputMode="decimal"
              value={amountInput}
              onKeyDown={(e: any) => {
                // permite solo numeros, punto y teclas de control
                if (
                  !/[0-9.]/.test(e.key) &&
                  !["Backspace", "Delete", "Tab", "Enter", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(
                    e.key
                  )
                ) {
                  e.preventDefault();
                }
              }}
              // formatea la cantidad formato en-US
              onIonInput={(e: any) => {
                let raw = String(e.target.value || "").replace(/[^0-9.]/g, "");
                const parts = raw.split(".");
                if (parts.length > 2) {
                  raw = parts[0] + "." + parts.slice(1).join("");
                }
                // manejo de ingreso de puntos como primer input value (ej: .5 == 0.5)
                if (raw === "" || raw === ".") {
                  setAmountInput(raw);
                  setAmount(0);
                } else {
                  setAmountInput(Number(raw).toLocaleString("en-US"));
                  setAmount(parseFloat(raw));
                }
              }}
            />
          </div>

          <div className="currency-row">
            <IonItem button onClick={() => openCurrencyModal("from")} className="currency-selector">
              <div className="currency-info">
                <IonLabel>From</IonLabel>
                <IonLabel className="currency-value">{fromCurrency}</IonLabel>
              </div>
            </IonItem>

            <div className="swap-button">
              <IonButton fill="clear" onClick={swapCurrencies}>
                <IonIcon icon={swapHorizontalOutline} slot="icon-only" className={isRotated ? "rotated" : ""}></IonIcon>
              </IonButton>
            </div>

            <IonItem button onClick={() => openCurrencyModal("to")} className="currency-selector">
              <div className="currency-info">
                <IonLabel>To</IonLabel>
                <IonLabel className="currency-value">{toCurrency}</IonLabel>
              </div>
            </IonItem>
          </div>

          {loading && (
            <div className="loading-text">
              <span className="loading-spinner"></span>
              <IonText>
                <p>Loading exchange rates...</p>
              </IonText>
            </div>
          )}

          {!loading && convertedAmount !== null && (
            <IonCard className="result-card">
              <IonCardHeader>
                <IonCardTitle>Converted Amount</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <div>
                  <h2>
                    {convertedAmount.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 4,
                    })}
                    <span className="currency-badge">{toCurrency}</span>
                  </h2>
                </div>
                <div className="exchange-rate">
                  <p>Exchange Rate</p>
                  <p>
                    1 {fromCurrency} = {currentRate.toFixed(2)} {toCurrency}
                  </p>
                </div>
              </IonCardContent>
            </IonCard>
          )}
        </div>

        <IonModal
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
          onDidPresent={() => {
            setTimeout(() => {
              searchbarRef.current?.setFocus();
            }, 100);
          }}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>{modalType === "from" ? "From Currency" : "To Currency"}</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowModal(false)}>
                  <IonIcon icon={closeOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
            <IonToolbar>
              <IonSearchbar
                ref={searchbarRef}
                value={searchText}
                onIonInput={(e: any) => setSearchText(e.target.value)}
                placeholder="Search currency code..."
                animated={true}
              />
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              {filteredCurrencies.map((code) => (
                <IonItem key={code} button onClick={() => selectCurrency(code)} detail={false}>
                  <IonLabel>
                    <h2>{code}</h2>
                  </IonLabel>
                </IonItem>
              ))}
              {filteredCurrencies.length === 0 && (
                <IonItem>
                  <IonLabel className="ion-text-center">
                    <p>No currencies found</p>
                  </IonLabel>
                </IonItem>
              )}
            </IonList>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};
