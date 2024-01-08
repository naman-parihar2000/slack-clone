import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "./Workspace.css";
import Error from "../Common/Error";
import { Outlet, useNavigate } from "react-router-dom";

import slack from "../../assets/slack1.png";
import img from "../../assets/6.png";
import Loading from "../Common/Loading";

const Workspace = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorData, setErrorData] = useState("");

  async function fetchData() {
    try {
      const { data } = await axios.get("http://localhost:5000/user", {
        withCredentials: true,
      });
      setUserData(data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setErrorData(error?.response?.data);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      {isLoading && <Loading />}
      {isError && <Error data={errorData} />}
      {!isLoading && !isError && (
        <section className="workspace-creation">
          <header className="workspace-header">
            <img src={slack} className="workspace-logo" alt="slack logo" />
            <span>
              Confirmed as <b>{userData.email}</b>
              <button
                onClick={() => {
                  navigate("/");
                }}
              >
                Change
              </button>
            </span>
          </header>

          <div className="workspace-section">
            <div className="workspace-section-1">
              <h1 className="workspace-heading">
                Create a new Slack Workspace!
              </h1>
              <p className="workspace-paragraph">
                Slack gives your team a home - a place where they can talk and
                work together. To create a new workspace, click on the button
                below.
              </p>
              <button
                className="workspace-create-button"
                onClick={() => {
                  navigate("/workspace/create", { state: userData });
                }}
              >
                Create A Workspace!
              </button>
            </div>
            <img src={img} className="workspace-image" alt="work-place" />
          </div>
        </section>
      )}

      <Outlet />
    </Fragment>
    // <div>
    //   <h1>WORKSPACE</h1>
    //   <p>{userData.email}</p>
    //   <p>{userData.username}</p>
    //   {userData.photo}
    // </div>
  );
};

export default Workspace;
