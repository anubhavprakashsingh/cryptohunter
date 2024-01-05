import axios from "axios";
import React, { useEffect, useState } from "react";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
export function numberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();
  const fetchTrendingCoins = async () => {
    //warning kyu de rha hai ye wala React Hook useEffect has a missing dependency: 'fetchTrendingCoins'. Either include it or remove the dependency array
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };
  // console.log(trending);
  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    return (
      <Link to={`/coins/${coin.id}`} className="carousel-items">
        <img
          src={coin?.image}
          alt={coin?.symbol}
          height="80"
          style={{ marginBottom: 15 }}
        />
        <div className="carousel-text" style={{ lineHeight: 0 }}>
          <span>
            {coin?.name}
            &nbsp;
            <span
              style={{
                color:
                  coin?.price_change_percentage_24h_in_currency >= 0
                    ? "rgb(0, 175, 73)"
                    : "#ff0000",
              }}
            >
              {coin?.price_change_percentage_24h_in_currency >= 0 ? "+" : ""}
              {coin?.price_change_percentage_24h_in_currency.toFixed(2)}%
            </span>
          </span>
          <br />
          <span
            style={{
              fontSize: 22,
              display: "flex",
              gap: 5,
            }}
          >
            <span>{symbol}</span>{" "}
            <span>{numberWithCommas(coin?.current_price.toFixed(2))}</span>
          </span>
        </div>
      </Link>
    );
  });
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  return (
    <div>
      <AliceCarousel
        mouseTracking={true}
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
