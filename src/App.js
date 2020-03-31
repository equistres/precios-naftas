import React, {useEffect, useState} from 'react';
import './index.css';
import Layout from './components/Layout';

export default function App() {

  const [data, setData] = useState({resultados:false});
  const [initialValues, setInitialValues] = useState({ url: `https://preciosensurtidor.minem.gob.ar/ws/rest/rest/server.php?method=getEmpresasAgrupadasBanderasCombustible&combustible=2&bounds={"so":{"lat":-34.67562659242818,"lng":-58.532635474890164},"ne":{"lat":-34.558088297983694,"lng":-58.24716260501712}}&banderas=["26","24","20","28","4","2"]`, id:2 })
  const [loading, setLoading] = useState(true);

  const customHooks = {
    data,
    setData,
    initialValues,
    setInitialValues,
    loading, 
    setLoading
  }
  
  useEffect(() => {
    const corsHost = 'https://cors-anywhere.herokuapp.com/';
    async function fetchData() {
      fetch(corsHost+initialValues.url)
        .then(function(response) {
          return response.json();
        })
        .then(function(res) {
        setData((data) => ({
            ...data,
            resultados: res.resultado,
        }));
        setLoading(false);
      });
    };
    fetchData();
  }, [initialValues]);
  return (
    <Layout customHooks={customHooks} />
  );
};