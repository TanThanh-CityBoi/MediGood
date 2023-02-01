import React from "react";
import { BallBeat } from "react-pure-loaders";
function LoadingScreen(props) {
  return (
    <div style={{
      display: 'flex',
      alignIten: 'center',
      justifyContent: 'center'
    }} >
      <rn color="#123abc" loading />
    </div>
  );
}

export default LoadingScreen;
