import React from "react";
import { List, Coin } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import useAuth from "~/lib/hooks/useAuth";
import { logout } from "../../lib/apis/user";
import { removeCookie } from "../../lib/apis/cookie";
import "./Navbar.css";
const EXPAND_BREAKPOINT = "md";

export default function Navibar({ brandTitle, offCanvasTitle = undefined }) {
  const { user, clientLogout } = useAuth();
  const navigate = useNavigate();
  const postLogout = async () => {
    try {
      const response = await logout();
      console.log(response);
      removeCookie("token");
      clientLogout();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  console.log(user);

  return (
    <Navbar
      style={{ backgroundColor: "white" }}
      expand={EXPAND_BREAKPOINT}
      className="mb-3"
      sticky="top"
      variant="dark"
    >
      <Container style={{ position: "relative" }} fluid>
        <Link className="text-decoration-none" to={"/"}>
          <Navbar.Brand
            style={{
              color: "#000",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              marginLeft: "10px",
              fontWeight: "700",
            }}
          >
            <img
              src="/QnALogo.png"
              alt="로고"
              style={{ height: "45px", width: "157px" }}
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle
          style={{
            color: "#4E5968",
            position: "absolute",
            right: "10px",
          }}
          aria-controls={`Navbar-expand-${EXPAND_BREAKPOINT}`}
        >
          <List />
        </Navbar.Toggle>
        <Navbar.Offcanvas
          id={`Navbar-expand-${EXPAND_BREAKPOINT}`}
          // style={{ color: "black" }}
          aria-labelledby={`NavbarLabel-expand-${EXPAND_BREAKPOINT}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title
              style={{ color: "#4E5968" }}
              id={`NavbarLabel-expand-${EXPAND_BREAKPOINT}`}
            >
              {offCanvasTitle || brandTitle}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body
            // style={{ color: "#4E5968" }}
            className="flex-row-reverse"
          >
            <Nav
              style={{ color: "#4E5968", border: "none", marginRight: "50px" }}
              className={`justify-content-around flex-row pb-4 pb-${EXPAND_BREAKPOINT}-0`}
            >
              <>
                <Link
                  to="/quiz"
                  className="text-decoration-none flex-grow-1 text-center border border-dark border-end-0"
                >
                  <Nav.Link
                    style={{
                      color: "#4E5968",
                      fontWeight: "500",
                      fontSize: "20px",
                    }}
                    as="div"
                    className=""
                  >
                    퀴즈
                  </Nav.Link>
                </Link>
                <Link
                  to="/articlelist"
                  className="text-decoration-none flex-grow-1 text-center border border-dark border-end-0"
                >
                  <Nav.Link
                    style={{
                      color: "#4E5968",
                      fontWeight: "500",
                      fontSize: "20px",
                    }}
                    as="div"
                    className=""
                  >
                    기사
                  </Nav.Link>
                </Link>
                {!user ? (
                  <>
                    <Link
                      to="/login"
                      className="text-decoration-none flex-grow-1 text-center border border-dark border-end-0"
                    >
                      <Nav.Link
                        style={{
                          color: "#4E5968",
                          fontWeight: "500",
                          fontSize: "20px",
                        }}
                        as="div"
                        className=""
                      >
                        로그인
                      </Nav.Link>
                    </Link>
                    <Link
                      to="/signup"
                      className="text-decoration-none flex-grow-1 text-center border border-dark"
                    >
                      <Nav.Link
                        style={{
                          color: "#4E5968",
                          border: "none",
                          fontWeight: "500",
                          fontSize: "20px",
                        }}
                        as="div"
                        className=""
                      >
                        회원가입
                      </Nav.Link>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/board"
                      className="text-decoration-none flex-grow-1 text-center border border-dark border-end-0"
                    >
                      <Nav.Link
                        style={{
                          color: "#4E5968",
                          fontWeight: "500",
                          fontSize: "20px",
                        }}
                        as="div"
                        className=""
                      >
                        게시판
                      </Nav.Link>
                    </Link>
                    <Link
                      to="/mypage"
                      className="text-decoration-none flex-grow-1 text-center border border-dark border-end-0"
                    >
                      <Nav.Link
                        style={{
                          color: "#4E5968",
                          fontWeight: "500",
                          fontSize: "20px",
                        }}
                        as="div"
                        className=""
                      >
                        마이페이지
                      </Nav.Link>
                    </Link>
                    <Nav.Link
                      style={{
                        color: "#4E5968",
                        border: "none",
                        fontWeight: "500",
                        fontSize: "20px",
                      }}
                      as="div"
                      className="text-decoration-none flex-grow-1 text-center border border-dark border-end-0"
                      onClick={postLogout}
                    >
                      로그아웃
                    </Nav.Link>
                  </>
                )}
              </>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
