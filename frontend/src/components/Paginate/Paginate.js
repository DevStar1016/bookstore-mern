import React from "react";
import { NavLink } from "react-router-dom";
import "./Paginate.css";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <nav className="paginate">
        <ul className="pagination">
          {[...Array(pages).keys()].map((x) => (
            <li className="page-item " key={x + 1}>
              <NavLink
                to={
                  !isAdmin
                    ? keyword
                      ? `/search/${keyword}/page/${x + 1}`
                      : `/page/${x + 1}`
                    : `/admin/booklist/${x + 1}`
                }
                className="page-link"
              >
                {x + 1}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    )
  );
};

export default Paginate;
