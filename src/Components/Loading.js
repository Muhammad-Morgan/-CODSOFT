import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loading = () => {
    return (
        <div className="container container-lod">
        <h1>
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            style={{ color: "var(--primary-color-1)", fontSize: "5rem" }}
          />
        </h1>
      </div>
    );
}

export default Loading;
