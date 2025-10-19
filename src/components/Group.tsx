import { useState } from "react";
import { ClothingItem } from "../types";

interface GroupProps {
  caption: string;
  currentItem: ClothingItem;
  onPrev: () => void;
  onNext: () => void;
  isFocused?: boolean;
  onFocus?: () => void;
}

export function Group({
  caption,
  currentItem,
  onPrev,
  onNext,
  isFocused,
  onFocus,
}: GroupProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageError(false);
  };

  return (
    <fieldset className="group-fieldset" onMouseEnter={onFocus}>
      <legend>{caption}</legend>
      <div className="group-content">
        <button
          className="nav-button"
          onClick={onPrev}
          aria-label={`Previous ${caption.toLowerCase()}`}
          role="button"
        >
          &lt;
        </button>

        <div className="preview-container">
          {imageError ? (
            <div className="preview-placeholder">
              <div className="placeholder-content">
                <div className="placeholder-icon">👕</div>
                <div className="placeholder-text">{currentItem.name}</div>
              </div>
            </div>
          ) : (
            <img
              src={currentItem.imageUrl}
              alt={currentItem.name}
              className="preview-image"
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
          )}
        </div>

        <button
          className={`nav-button ${isFocused ? "focused" : ""}`}
          onClick={onNext}
          aria-label={`Next ${caption.toLowerCase()}`}
          role="button"
        >
          &gt;
        </button>
      </div>
    </fieldset>
  );
}
