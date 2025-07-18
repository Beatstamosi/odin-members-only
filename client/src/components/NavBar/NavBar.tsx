import { Link } from "react-router-dom";
import { useAuth } from "../Authentication/useAuth.jsx";
import LogOut from "../Authentication/LogOut/LogOut.jsx";
import style from "./NavBar.module.css";
import useBecomeMember from "../becomeMember.js";
import useBecomeAdmin from "../becomeAdmin.js";

function NavBar() {
  const { user, loading, isAuthenticated } = useAuth();
  const becomeMember = useBecomeMember();
  const becomeAdmin = useBecomeAdmin();

  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <div className={style.navBarWrapper}>
        <div>
          <h2>
            {user?.email || "No user found"} {user?.member && <span>⭐</span>}{" "}
            {user?.admin && <span>🚀</span>}
          </h2>
        </div>
        <div className={style.navBarRightPart}>
          {!isAuthenticated && <Link to="/login">Log In</Link>}

          {isAuthenticated && (
            <>
              <Link to={"/post-message"} className={style.btn}>
                Create Message
              </Link>

              {!user?.member && (
                <button className={style.btn} onClick={(e) => becomeMember(e)}>
                  Become a Member
                </button>
              )}

              {user?.member && !user?.admin && (
                <button className={style.btn} onClick={(e) => becomeAdmin(e)}>
                  Become Admin
                </button>
              )}

              <LogOut />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default NavBar;
