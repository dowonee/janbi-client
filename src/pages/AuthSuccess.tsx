import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/history");
  }, [navigate]);

  return <p className="p-6">로그인 중입니다</p>;
}
