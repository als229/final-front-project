import React from "react";
import styled from "styled-components";

const StarWrapper = styled.div`
  display: flex;
  gap: 4px;

  .star {
    position: relative;
    width: 24px;
    height: 24px;
    background-image: url("/images/ico-star-empty.svg");
    background-size: contain;
    background-repeat: no-repeat;
    pointer-events: none;
  }

  .star-click-area {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: auto;
    cursor: pointer;
  }

  .fill-full {
    background-image: url("/images/ico-star-fill.svg");
  }

  .fill-half {
    background-image: url("/images/ico-star-half.svg");
  }
`;

const StarSelector = ({ point, setPoint, hoverPoint, setHoverPoint }) => {
  const displayPoint = hoverPoint ?? point;

  return (
    <StarWrapper>
      {[1, 2, 3, 4, 5].map((i) => {
        let fill = "empty";
        if (displayPoint >= i) fill = "full";
        else if (displayPoint >= i - 0.5) fill = "half";

        return (
          <div key={i} className={`star fill-${fill}`}>
            <span
              className="star-click-area"
              onMouseMove={(e) => {
                const { left, width } = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - left;
                const ratio = x / width;
                const hoverValue = ratio <= 0.5 ? i - 0.5 : i;
                setHoverPoint(hoverValue);
              }}
              onMouseLeave={() => setHoverPoint(null)}
              onClick={() => setPoint(hoverPoint)}
            />
          </div>
        );
      })}
    </StarWrapper>
  );
};

export default StarSelector;
