import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Offcanvas, Button, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header({ Rol }) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (

        <div>
          {Rol === 'administrador' && (
        <div>
        {/* Navbar principal */}
        <Navbar className="navbar-color" variant="dark" expand="md" fixed='top'>
          <Container>
            <Navbar.Brand href="#home">Videojuegos Marlon</Navbar.Brand>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              style={{ display: 'none' }}
              className="d-sm-none d-xs-none"
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">

                <Nav.Link>
                  <Link to="/inicio" className="link-unstyled">Inicio</Link>
                </Nav.Link>

                <Nav.Link>
                  <Link to="/about" className="link-unstyled">Informacion</Link>
                </Nav.Link>

                <NavDropdown title="Clientes" id="clientes">
                  <NavDropdown.Item>
                    <Link to="/cliente" className="link-unstyled">Registrar Clientes</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/clienteList" className="link-unstyled">Listar Clientes</Link>
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Producto" id="producto">
                  <NavDropdown.Item>
                    <Link to="/producto" className="link-unstyled">Registrar Productos</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/productoList" className="link-unstyled">Listar Productos</Link>
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link>
                    <Link to="/galeria" className="link-unstyled">Galeria</Link>
                </Nav.Link>

                <NavDropdown title="Categoria" id="categoria">
                  <NavDropdown.Item>
                    <Link to="/categoria" className="link-unstyled">Registrar Categoria</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/categoriaList" className="link-unstyled">Listar Categorias</Link>
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Ventas" id="ventas">
                  <NavDropdown.Item>
                    <Link to="/venta" className="link-unstyled">Registrar Ventas</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/ventaList" className="link-unstyled">Listar Ventas</Link>
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link>
                    <Link to="/estadisticas" className="link-unstyled">Estadísticas</Link>
                </Nav.Link>

              </Nav>
            </Navbar.Collapse>
            <Button
              variant="outline-light"
              onClick={toggleMenu}
              className="d-md-none d-block"
              aria-controls="basic-navbar-nav"
              aria-expanded={showMenu ? 'true' : 'false'}
            >
              Menú
            </Button>
          </Container>
        </Navbar>


        {/* Menú lateral (Offcanvas) */}
        <Offcanvas show={showMenu} onHide={toggleMenu} placement="start">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menú</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">

              <Nav.Link>
                <Link to="/" className="link-unstyled">Inicio</Link>
              </Nav.Link>

              <Nav.Link>
                <Link to="/about" className="link-unstyled">Informacion</Link>
              </Nav.Link>

              <NavDropdown title="Clientes" id="clientes">
                <NavDropdown.Item>
                  <Link to="/cliente" className="link-unstyled">Registrar Cliente</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/clienteList" className="link-unstyled">Listar Clientes</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Productos" id="productos">
                <NavDropdown.Item>
                  <Link to="/productos" className="link-unstyled">Registrar Productos</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/productoList" className="link-unstyled">Listar Productos</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link>
                    <Link to="/galeria" className="link-unstyled">Galeria</Link>
              </Nav.Link>

              <NavDropdown title="Categoria" id="categoria">
                <NavDropdown.Item>
                  <Link to="/categoria" className="link-unstyled">Registrar Categoria</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/categoriaList" className="link-unstyled">Listar Categoria</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Ventas" id="ventas">
                <NavDropdown.Item>
                  <Link to="/venta" className="link-unstyled">Registrar Ventas</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/ventaList" className="link-unstyled">Listar Ventas</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link>
                    <Link to="/estadisticas" className="link-unstyled">Estadísticas</Link>
              </Nav.Link>

            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </div>

      )}

      {Rol === 'vendedor' && (
    <div>
        {/* Navbar principal */}
        <Navbar className="navbar-color" variant="dark" expand="md">
          <Container>
            <Navbar.Brand href="#home">Videojuegos Marlon</Navbar.Brand>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              style={{ display: 'none' }}
              className="d-sm-none d-xs-none"
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">

                <Nav.Link>
                  <Link to="/" className="link-unstyled">Inicio</Link>
                </Nav.Link>

                <Nav.Link>
                  <Link to="/about" className="link-unstyled">Informacion</Link>
                </Nav.Link>

                <NavDropdown title="Clientes" id="productos">
                  <NavDropdown.Item>
                    <Link to="/cliente" className="link-unstyled">Registrar Clientes</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/clienteList" className="link-unstyled">Listar Clientes</Link>
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Producto" id="producto">
                  <NavDropdown.Item>
                    <Link to="/producto" className="link-unstyled">Registrar Productos</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/productoList" className="link-unstyled">Listar Productos</Link>
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Categoria" id="categoria">
                  <NavDropdown.Item>
                    <Link to="/categoria" className="link-unstyled">Registrar Categoria</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/categoriaList" className="link-unstyled">Listar Categorias</Link>
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Ventas" id="ventas">
                  <NavDropdown.Item>
                    <Link to="/venta" className="link-unstyled">Registrar Ventas</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/ventaList" className="link-unstyled">Listar Ventas</Link>
                  </NavDropdown.Item>
                </NavDropdown>

              </Nav>
            </Navbar.Collapse>
            <Button
              variant="outline-light"
              onClick={toggleMenu}
              className="d-md-none d-block"
              aria-controls="basic-navbar-nav"
              aria-expanded={showMenu ? 'true' : 'false'}
            >
              Menú
            </Button>
          </Container>
        </Navbar>


        {/* Menú lateral (Offcanvas) */}
        <Offcanvas show={showMenu} onHide={toggleMenu} placement="start">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menú</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">

              <Nav.Link>
                <Link to="/" className="link-unstyled">Inicio</Link>
              </Nav.Link>

              <Nav.Link>
                <Link to="/about" className="link-unstyled">Informacion</Link>
              </Nav.Link>

              <NavDropdown title="Clientes" id="clientes">
                <NavDropdown.Item>
                  <Link to="/cliente" className="link-unstyled">Registrar Cliente</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/clienteList" className="link-unstyled">Listar Clientes</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Productos" id="productos">
                <NavDropdown.Item>
                  <Link to="/productos" className="link-unstyled">Registrar Productos</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/productoList" className="link-unstyled">Listar Productos</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Categoria" id="categoria">
                <NavDropdown.Item>
                  <Link to="/categoria" className="link-unstyled">Registrar Categoria</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/categoriaList" className="link-unstyled">Listar Categoria</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Ventas" id="ventas">
                <NavDropdown.Item>
                  <Link to="/venta" className="link-unstyled">Registrar Ventas</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/ventaList" className="link-unstyled">Listar Ventas</Link>
                </NavDropdown.Item>
              </NavDropdown>

            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </div>

    )}
    </div>
  );
}

export default Header;