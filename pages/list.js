import { useState, useEffect } from "react";
import Router from "next/router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
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

export default function List() {

    const [list, setList] = useState([]);

    useEffect(() => {
        setList(localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : []);
    }, []);


    return (
        <div data-component="DashboardComponent">
            <main>
                <div className="Heading">
                    Favourites

                    <div className="backButton point-text" onClick={() => Router.push("/")}>
                        <ArrowBackIcon />
                    </div>
                </div>

                <div>
                    {
                        list?.length > 0 ?
                            <>
                                <CardLazy list={list} favoritePage={true} setList={setList.bind(this)} />
                            </>
                            :
                            <div className="d-flex flex-wrap justify-content-center align-items-center text-danger">
                                No Favourite List Item Found
                            </div>
                    }
                </div>
            </main>
        </div>
    );
}
