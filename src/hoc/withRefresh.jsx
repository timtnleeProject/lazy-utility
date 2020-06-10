import React, { useState, useCallback } from "react";

/**
 * this is a trick way to refresh the whole page/component
 * like account detail page refresh
 */ 
export default Component => {
  return props => {
    const [update, setUpdate] = useState(true);
    const refresh = useCallback(() => {
      setUpdate(prev => !prev);
    }, []);
    const Clone = props => <Component refresh={refresh} {...props} />;
    return (
      update ? <Component refresh={refresh} {...props} /> : <Clone />
    );
  };
};