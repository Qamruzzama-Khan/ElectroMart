import { useNavigate } from "react-router-dom";

const GoBackBtn = () => {
  const navigate = useNavigate();

  const handleGoBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <span
      className="material-symbols-outlined cursor-pointer"
      onClick={handleGoBack}
    >
      arrow_back
    </span>
  );
};

export default GoBackBtn;
