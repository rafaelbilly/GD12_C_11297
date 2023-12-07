import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { FaPlusSquare, FaSave, FaEdit, FaTrashAlt } from "react-icons/fa";

const DashboardPage = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(date).toLocaleDateString("id-ID", options);
  };

  const [data, setData] = useState([]);
  const [ruangan, setRuangan] = useState({
    tanggal: "",
    tipe: "",
    biaya: "",
    tujuan: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [isEditing, setIsEditing] = useState(false);

  const [jumlahReservasi, setJumlahReservasi] = useState(0);

  const addDataRuangan = () => {
    let imageUrl = "";

    if (ruangan.tipe === "Ruang Rapat") {
      imageUrl =
        "https://images.unsplash.com/photo-1503423571797-2d2bb372094a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    } else if (ruangan.tipe === "Ruang Seminar") {
      imageUrl =
        "https://images.unsplash.com/photo-1596522354195-e84ae3c98731?q=80&w=1787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    } else {
      imageUrl =
        "https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    }

    if (
      !ruangan.tanggal ||
      !ruangan.tipe ||
      !ruangan.biaya ||
      !ruangan.tujuan
    ) {
      toast.error("Semua Field Harus Diisi!");
      return;
    }

    toast.success(
      `Berhasil Tambah Data ${ruangan.tipe}!`
    );
    
    if (isEditing) {
      const updatedData = [...data];
      updatedData[editIndex] = { ...ruangan, imageUrl };
      setData(updatedData);
      setShowModalEdit(false);
      setEditIndex(null);
    } else {
      setData([...data, { ...ruangan, imageUrl }]);
    }

    setJumlahReservasi((prevJumlah) =>
      isEditing ? prevJumlah : prevJumlah + 1
    );
    handleClose();

    setRuangan({
      tanggal: "",
      tipe: "",
      biaya: "",
      tujuan: "",
    });
    setIsEditing(false);
  };

  const handleEdit = (index) => {
    console.log("Edit Index:", index);
    setEditIndex(index);
    setEditRuangan(data[index]);
    setShowModalEdit(true);
  };

  const [showModalEdit, setShowModalEdit] = useState(false);
  const [editRuangan, setEditRuangan] = useState({
    tanggal: "",
    tipe: "",
    biaya: "",
    tujuan: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  const saveEditData = () => {
    if (
      !editRuangan.tanggal ||
      !editRuangan.tipe ||
      !editRuangan.biaya ||
      !editRuangan.tujuan
    ) {
      toast.error("Semua Field Harus Diisi!");
      return;
    }

    let updatedImageUrl = "";

    if (editRuangan.tipe === "Ruang Rapat") {
      updatedImageUrl =
        "https://images.unsplash.com/photo-1503423571797-2d2bb372094a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    } else if (editRuangan.tipe === "Ruang Seminar") {
      updatedImageUrl =
        "https://images.unsplash.com/photo-1596522354195-e84ae3c98731?q=80&w=1787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    } else {
      updatedImageUrl =
        "https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    }

    const updatedData = [...data];
    updatedData[editIndex] = { ...editRuangan, imageUrl: updatedImageUrl };
    toast.success(`Berhasil Update Data ${editRuangan.tipe}!`);

    setData(updatedData);
    setShowModalEdit(false);
    setEditIndex(null);
    setEditRuangan({
      tanggal: "",
      tipe: "",
      biaya: "",
      tujuan: "",
    });
  };

  const handleDelete = (index) => {
    const deleteRuang = data[index];
    const newData = [...data];
    newData.splice(index, 1);

    toast.success(`Berhasil Menghapus Data ${deleteRuang.tipe}!`);
    setData(newData);
    setJumlahReservasi((prevJumlah) => prevJumlah - 1);
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-3 border-bottom fw-bold">Dashboard</h1>
      <Row className="mb-4">
        <Col md={10}>
          <Card className="h-100 justify-content-center">
            <Card.Body>
              <h4>Selamat datang,</h4>
              <h1 className="fw-bold display-6 mb-3">{user?.username}</h1>
              <p className="mb-0">Kamu sudah login sejak:</p>
              <p className="fw-bold lead mb-0">{formatDate(user?.loginAt)}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={2}>
          <Card>
            <Card.Body>
              <p>Bukti sedang ngantor:</p>
              <img
                src="https://via.placeholder.com/150"
                className="img-fluid ronded"
                alt="Tidak Ada Gambar"
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1 className="mb-3 border-bottom fw-bold">
            Daftar Reservasi Ruangan
          </h1>
          <p>
            Saat ini terdapat <strong>{jumlahReservasi}</strong> reservasi yang
            akan mendatang.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            onClick={handleShow}
            className="btn btn-success d-flex align-items-center"
          >
            <FaPlusSquare className="me-2" /> Tambah Ruangan
          </Button>
        </Col>
      </Row>
      <Row
        className="mt-4"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {data.map((item, index) => (
          <Col key={index} md={12}>
            <Card className="mb-3">
              <Row className="g-0 align-items-center">
                <Col md={2}>
                  <Card.Img
                    variant="top center"
                    src={item.imageUrl}
                    alt="Gambar Ruangan"
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                      marginLeft: "5px",
                      marginRight: "5px",
                    }}
                  />
                </Col>
                <Col md={10}>
                  <Card.Body>
                    <Card.Title>
                      <strong>{item.tipe}</strong>
                    </Card.Title>
                    <Card.Text style={{ marginBottom: "0" }}>
                      Untuk Keperluan:
                    </Card.Text>
                    <Card.Text>{item.tujuan}</Card.Text>
                    <hr />
                    <Card.Text>
                      Tanggal Penggunaan: <strong>{item.tanggal}</strong> -
                      Harga: Rp <strong>{item.biaya}</strong>
                    </Card.Text>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(index)}
                        className="mx-2"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <FaTrashAlt style={{ marginRight: "5px" }} />
                        Hapus Ruangan
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => handleEdit(index)}
                        className="mx-2"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <FaEdit style={{ marginRight: "5px" }} />
                        Edit Ruangan
                      </Button>
                    </div>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            <strong>Tambah Ruangan</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTanggal">
              <Form.Label>Tanggal Pemesanan</Form.Label>
              <Form.Control
                type="date"
                value={ruangan.tanggal}
                onChange={(e) =>
                  setRuangan({ ...ruangan, tanggal: e.target.value })
                }
              />
            </Form.Group>
            <br />
            <Form.Group controlId="formTipe">
              <Form.Label>Ruang Yang Dipesan</Form.Label>
              <Form.Select
                value={ruangan.tipe}
                onChange={(e) =>
                  setRuangan({ ...ruangan, tipe: e.target.value })
                }
              >
                <option value="Unguid">Pilih Ruangan</option>
                <option value="Ruang Rapat">Ruang Rapat</option>
                <option value="Ruang Seminar">Ruang Seminar</option>
                <option value="Ruang Diskusi">Ruang Diskusi</option>
              </Form.Select>
            </Form.Group>
            <br />
            <Form.Group controlId="formBiaya">
              <Form.Label>Biaya Pemesanan</Form.Label>
              <Form.Control
                type="number"
                value={ruangan.biaya}
                onChange={(e) =>
                  setRuangan({ ...ruangan, biaya: e.target.value })
                }
              />
            </Form.Group>
            <br />
            <Form.Group controlId="formTujuan">
              <Form.Label>Tujuan Penggunaan</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={ruangan.tujuan}
                onChange={(e) =>
                  setRuangan({ ...ruangan, tujuan: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Batal
          </Button>
          <Button
            variant="primary"
            onClick={addDataRuangan}
            className="d-flex align-items-center"
          >
            <FaSave className="mx-auto me-1" />
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showModalEdit}
        onHide={() => setShowModalEdit(false)}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <strong>Edit Ruangan</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTanggal">
              <Form.Label>Tanggal Pemesanan</Form.Label>
              <Form.Control
                type="date"
                value={editRuangan.tanggal}
                onChange={(e) =>
                  setEditRuangan({ ...editRuangan, tanggal: e.target.value })
                }
              />
            </Form.Group>
            <br />
            <Form.Group controlId="formTipe">
              <Form.Label>Ruang Yang Dipesan</Form.Label>
              <Form.Select
                value={editRuangan.tipe}
                onChange={(e) =>
                  setEditRuangan({ ...editRuangan, tipe: e.target.value })
                }
              >
                <option value="Unguid" disabled>
                  Pilih Ruangan
                </option>
                <option value="Ruang Rapat">Ruang Rapat</option>
                <option value="Ruang Seminar">Ruang Seminar</option>
                <option value="Ruang Diskusi">Ruang Diskusi</option>
              </Form.Select>
            </Form.Group>
            <br />
            <Form.Group controlId="formBiaya">
              <Form.Label>Biaya Pemesanan</Form.Label>
              <Form.Control
                type="number"
                value={editRuangan.biaya}
                onChange={(e) =>
                  setEditRuangan({ ...editRuangan, biaya: e.target.value })
                }
              />
            </Form.Group>
            <br />
            <Form.Group controlId="formTujuan">
              <Form.Label>Tujuan Penggunaan</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editRuangan.tujuan}
                onChange={(e) =>
                  setEditRuangan({ ...editRuangan, tujuan: e.target.value })
                }
              />
            </Form.Group>
            <br />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalEdit(false)}>
            Batal
          </Button>
          <Button
            variant="primary"
            onClick={saveEditData}
            className="d-flex align-items-center"
          >
            <FaSave className="mx-auto me-1" />
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-center" autoClose={3000} />
    </Container>
  );
};

export default DashboardPage;