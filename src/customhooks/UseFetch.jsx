import axios from "axios";
import { enqueueSnackbar } from "notistack";
import React, { useCallback, useEffect, useState } from "react";

export function UseFetch({
  url,
  method,
  // body = null,
  headers = {},
  autofetch,
}){
  const [apiData, setApiData] = useState([]);
  const [apiErr, setApiErr] = useState(null);
  const [apiLoading, setApiLoading] = useState(false);
  


  const fetchingData = useCallback(async (customBody = null, body= null) => {
    setApiLoading(true);
    try {
      const res = await axios({
        url,
        method,  
        headers, 
       data: customBody || body,
      });
      setApiData((prev) =>
        method.toLowerCase() === "post"?
        [...prev, res.data]:  
        res.data);
      console.log("this is api data", res.data)
      enqueueSnackbar("✅ Request successful", { variant: "success" });
    } catch (err) {
      setApiErr(err);
      enqueueSnackbar("❌ Request failed", { variant: "error" });
    } finally {
      setApiLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (autofetch) fetchingData();
  }, [autofetch, fetchingData]);

  return { apiData, apiErr, apiLoading, fetchingData };
}
