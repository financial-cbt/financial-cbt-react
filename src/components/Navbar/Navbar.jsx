import React from "react";
import { List, Coin } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
const EXPAND_BREAKPOINT = "md";
import "./Navbar.css";
export default function Navibar({ brandTitle, offCanvasTitle = undefined }) {
  const navigate = useNavigate();
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
              marginLeft: "50px",
              fontWeight: "700",
            }}
          >
            <Coin />
            {brandTitle}
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle
          style={{
            color: "#4E5968",
            position: "absolute",
            right: "50px",
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
              {/* {!user ? ( */}
              {/* 비로그인 상태 */}
              <>
                <Link
                  to="/quiz"
                  className="text-decoration-none flex-grow-1 text-center border border-dark border-end-0"
                >
                  <Nav.Link
                    style={{ color: "#4E5968", fontWeight: "500" }}
                    as="div"
                    className=""
                  >
                    게임
                  </Nav.Link>
                </Link>
                <Link
                  to="/article"
                  className="text-decoration-none flex-grow-1 text-center border border-dark border-end-0"
                >
                  <Nav.Link
                    style={{ color: "#4E5968", fontWeight: "500" }}
                    as="div"
                    className=""
                  >
                    기사
                  </Nav.Link>
                </Link>
                <Link
                  to="/login"
                  className="text-decoration-none flex-grow-1 text-center border border-dark border-end-0"
                >
                  <Nav.Link
                    style={{ color: "#4E5968", fontWeight: "500" }}
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
                    }}
                    as="div"
                    className=""
                  >
                    회원가입
                  </Nav.Link>
                </Link>
              </>
              {/* ) : ( */}
              {/* 로그인 상태 */}
              {/* <Link
                  to="/game"
                  className="text-decoration-none flex-grow-1 text-center border border-dark border-end-0"
                >
                  <Nav.Link style={{ color: "#4E5968", fontWeight: "500" }} as="div" className="">
                    게임
                  </Nav.Link>
                </Link>
                <Link
                  to="/article"
                  className="text-decoration-none flex-grow-1 text-center border border-dark border-end-0"
                >
                  <Nav.Link style={{ color: "#4E5968", fontWeight: "500" }} as="div" className="">
                    기사
                  </Nav.Link>
                </Link>
                <Link
                  to="/mypage"
                  className="text-decoration-none flex-grow-1 text-center border border-dark border-end-0"
                >
                  <Nav.Link style={{ color: "#4E5968", fontWeight: "500" }} as="div" className="">
                    마이페이지
                  </Nav.Link>
                </Link>
              <Link>
                <Nav.Link
                style={{ color: "#4E5968", fontWeight: "500" }}
                  as="div"
                  className=""
                  onClick={() => {
                    clientLogout();
                    logout().then((resp) => {});
                  }}
                >
                  로그아웃
                </Nav.Link>
              </Link> */}
              {/* )} */}
            </Nav>
            {/* <Nav className="justify-content-start flex-grow-1 pe-3">
              <Link to="/" className="text-decoration-none">
                <Nav.Link style={{ color: "#4E5968" }} as="div">
                  Home
                </Nav.Link>
              </Link>
            </Nav> */}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
