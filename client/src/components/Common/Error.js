import "./Common.css";
import error from "../../assets/8.png";

const Error = ({ data }) => {
  return (
    <div className="error-page">
      <h1> Status Code : {data.status}</h1>
      <img src={error} alt="error representation" />
    </div>
  );
};
export default Error;
