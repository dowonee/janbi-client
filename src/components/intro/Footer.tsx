import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-20 py-8 text-center text-sm text-gray-500">
      <p>© 2025 JANBI. All rights reserved.</p>
      <div className="mt-3 flex justify-center gap-4">
        <Link to="/support" className="text-indigo-600 hover:underline">
          고객지원
        </Link>
        <Link to="/terms" className="text-indigo-600 hover:underline">
          서비스 이용약관
        </Link>
      </div>
    </footer>
  );
}
