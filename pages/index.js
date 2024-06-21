import { useState, useEffect } from "react";
import Router from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { getListFunction } from "../utils/funtions";
import dynamic from 'next/dynamic';

const CardLazy = dynamic(() => import('../component/list-card/card'), {
  ssr: false,
  loading: () => (
    <div className="row justify-content-center">
      <div className="col-md-12 loader">
        <Box sx={{ display: "flex" }}>
          <CircularProgress style={{ color: "#F54A00" }} />
        </Box>
      </div>
    </div>
  ),
});

export default function Dashboard() {

  const [list, setList] = useState([]);

  // const getList = (id, page, limit) => {
  //   ApiList.getApiList(id, page, limit)
  //     .then((response) => {
  //       setList(prevList =>
  //         response.data.map(list => ({
  //           ...list,
  //           favourite: localStorage.getItem('favorites') ?
  //             JSON.parse(localStorage.getItem('favorites')).findIndex((item) => item.id === list.id) != -1 ? true : false
  //             :
  //             false,
  //         }))
  //       );
  //     })
  //     .catch((error) => {
  //       toast.error("Unable to process your request, please try after sometime");
  //     });
  // };

  useEffect(() => {
    // getList(1, 1, 5);

    getListFunction(1, 1, 5).then((newList) => {
      setList(newList);
    })
      .catch((error) => {
        console.error(error);
      });;
  }, []);


  return (
    <div data-component="DashboardComponent">
      <main>
        <div className="Heading">
          List
          <div className="gotoFavourites point-text" onClick={() => Router.push("/list")}>
            Favourites
          </div>
        </div>

        <div>
          <CardLazy list={list} favoritePage={false} setList={setList.bind(this)} />
        </div>
      </main>
    </div>
  );
}
