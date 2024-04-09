import useGetTimeseries from "../CustomHooks/useGetTimeseries"
import { NavLink, useNavigate, useParams } from "react-router-dom";
import './TestStyles.css';
import { useEffect, useState } from "react";
import TimeSerie from "../Charts/Timeseries";
import GridElement from "../../Aplicaciones/Utils/GridElement";
import CustomGrid from "../../Aplicaciones/Utils/CustomGrid";
import axios from "axios";

const TestComp = () => {
    const [token, setToken] = useState();

    function HandleClick() {

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        axios.get('https://esva-demo-soel3q6bbq-uw.a.run.app/test')
            .then(response => {
                // Handle successful response
                console.log('Response:', response.data);
            })
            .catch(error => {
                // Handle error
                console.error('Error:', error);
            });
    }

    function HandleClick2() {

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        const jsonData = {
            "username": "Admin@west.net.co",
            "password": "West2024"
        }

        axios.post('https://esva-demo-soel3q6bbq-uw.a.run.app/api/login', jsonData)
            .then(response => {
                console.log('Response:', response.data);
                setToken(response.data);
            })
            .catch(error => {
                // Handle error
                console.error('Error:', error);
            });
    }

    function HandleClick2() {

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        const jsonData = {
            "username": "Admin@west.net.co",
            "password": "West2024"
        }

        axios.post('https://esva-demo-soel3q6bbq-uw.a.run.app/api/login', jsonData, config)
            .then(response => {
                console.log('Response:', response.data);
                setToken(response.data);
            })
            .catch(error => {
                // Handle error
                console.error('Error:', error);
            });
    }

    function HandleClick3() {

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        const jsonData = {
            "query": "Cuales son las razones de un despido?",
        }

        axios.post('https://esva-demo-soel3q6bbq-uw.a.run.app/api/getAnswer', jsonData)
            .then(response => {
                console.log('Response:', response.data);
                setToken(response.data);
            })
            .catch(error => {
                // Handle error
                console.error('Error:', error);
            });
    }


    return (
        <div style={{ width: '100vw', height: 'calc(50vh - 50px)', display: "flex", gap: '40px' }}>
            <button onClick={HandleClick}>
                Test
            </button>
            <button onClick={HandleClick2}>
                Get Token
            </button>

            <button onClick={HandleClick3}>
                Ask
            </button>
        </div>
    );

}
export default TestComp