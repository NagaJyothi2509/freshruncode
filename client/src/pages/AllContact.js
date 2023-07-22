
import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Spinner from "../pages/Spinner";
import ToastContext from "../context/ToastContext";

const AllContact = () => {
  const { toast } = useContext(ToastContext);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({});
  const [contacts, setContacts] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    let isMounted = true; // To handle cleanup on unmount
    setLoading(true);

    (async () => {
      try {
        const res = await fetch(`https://cms-backend-tq04.onrender.com/api/mycontacts`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!isMounted) return; // Check if the component is still mounted

        const result = await res.json();
        if (!result.error) {
          setContacts(result.contacts);
        } else {
          console.log(result);
        }

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })();

    return () => {
      isMounted = false; // Cleanup on unmount
    };
  }, []);

  const deleteContact = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        const res = await fetch(`https://cms-backend-tq04.onrender.com/api/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          setContacts(result.myContacts);
          toast.success("Deleted contact");
          setShowModal(false);
        } else {
          toast.error(result.error);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const newSearchUser = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    console.log(newSearchUser);
    setContacts(newSearchUser);
  };

  return (
    <>
      <div className="table-responsive"> 
        <h1>Your Contacts</h1>
        <a href="/mycontacts" className="btn btn-danger my-2">
          Reload Contact
        </a>
        <hr className="my-4" />
        {loading ? (
          <Spinner splash="Loading Contacts..." />
        ) : (
          <>
            {contacts.length === 0 ? (
              <h3>No contacts created yet</h3>
            ) : (
              <>
                <form className="d-flex" onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    name="searchInput"
                    id="searchInput"
                    className="form-control my-2"
                    placeholder="Search Contact"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <button type="submit" className="btn btn-info mx-2">
                    Search
                  </button>
                </form>

                <p>
                  Your Total Contacts: <strong>{contacts.length}</strong>
                </p>
                <table className="table table-hover">
                  <thead>
                    <tr className="table-dark">
                      <th scope="col">Name</th>
                      <th scope="col">Address</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr
                        key={contact._id}
                        onClick={() => {
                          setModalData({});
                          setModalData(contact);
                          setShowModal(true);
                        }}
                      >
                        <th scope="row">{contact.name}</th>
                        <td>{contact.address}</td>
                        <td>{contact.email}</td>
                        <td>{contact.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h3>{modalData.name}</h3>
          <p>
            <strong>Address</strong>: {modalData.address}
          </p>
          <p>
            <strong>Email</strong>: {modalData.email}
          </p>
          <p>
            <strong>Phone Number</strong>: {modalData.phone}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Link className="btn btn-info" to={`/edit/${modalData._id}`}>
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => deleteContact(modalData._id)}
          >
            Delete
          </button>
          <button
            className="btn btn-warning"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AllContact;
/*import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Spinner from "../pages/Spinner";
import ToastContext from "../context/ToastContext";

const AllContact = () => {
  const { toast } = useContext(ToastContext);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({});
  const [contacts, setContacts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5); // New state for entries per page
  const [currentPage, setCurrentPage] = useState(1); // New state for current page

  useEffect(() => {
    let isMounted = true; // To handle cleanup on unmount
    setLoading(true);

    (async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/mycontacts`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!isMounted) return; // Check if the component is still mounted

        const result = await res.json();
        if (!result.error) {
          setContacts(result.contacts);
        } else {
          console.log(result);
        }

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })();

    return () => {
      isMounted = false; // Cleanup on unmount
    };
  }, []);

  const deleteContact = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        const res = await fetch(`http://localhost:8000/api/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          setContacts(result.myContacts);
          toast.success("Deleted contact");
          setShowModal(false);
        } else {
          toast.error(result.error);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const newSearchUser = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    console.log(newSearchUser);
    setContacts(newSearchUser);
  };

  // Pagination Logic
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = contacts.slice(indexOfFirstEntry, indexOfLastEntry);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Dropdown options
  const entriesPerPageOptions = [5, 10, 20, 50];

  return (
    <>
      <div className="table-responsive">
        <h1>Your Contacts</h1>
        <a href="/mycontacts" className="btn btn-danger my-2">
          Reload Contact
        </a>
        <hr className="my-4" />
        {loading ? (
          <Spinner splash="Loading Contacts..." />
        ) : (
          <>
            {contacts.length === 0 ? (
              <h3>No contacts created yet</h3>
            ) : (
              <>
                <form className="d-flex" onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    name="searchInput"
                    id="searchInput"
                    className="form-control my-2"
                    placeholder="Search Contact"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <button type="submit" className="btn btn-info mx-2">
                    Search
                  </button>
                </form>

                <p>
                  Your Total Contacts: <strong>{contacts.length}</strong>
                </p>
                <div className="mb-3">
                
                  <label className="mr-2">Entries per page:</label>
                  <select
                    value={entriesPerPage}
                    onChange={(e) => setEntriesPerPage(parseInt(e.target.value))}
                  >
                    {entriesPerPageOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <table className="table table-hover">
                  <thead>
                    <tr className="table-dark">
                      <th scope="col">Name</th>
                      <th scope="col">Address</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentEntries.map((contact) => (
                      <tr
                        key={contact._id}
                        onClick={() => {
                          setModalData({});
                          setModalData(contact);
                          setShowModal(true);
                        }}
                      >
                        <th scope="row">{contact.name}</th>
                        <td>{contact.address}</td>
                        <td>{contact.email}</td>
                        <td>{contact.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              
                <nav>
                  <ul className="pagination">
                    {contacts.length > entriesPerPageOptions[0] && (
                      <li
                        className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                      >
                        <button
                          className="page-link"
                          onClick={() => paginate(currentPage - 1)}
                        >
                          Previous
                        </button>
                      </li>
                    )}
                    {Array.from({ length: Math.ceil(contacts.length / entriesPerPage) }).map(
                      (page, index) => (
                        <li
                          key={index}
                          className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                        >
                          <button className="page-link" onClick={() => paginate(index + 1)}>
                            {index + 1}
                          </button>
                        </li>
                      )
                    )}
                    {contacts.length > entriesPerPageOptions[0] && (
                      <li
                        className={`page-item ${
                          currentPage === Math.ceil(contacts.length / entriesPerPage)
                            ? "disabled"
                            : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => paginate(currentPage + 1)}
                        >
                          Next
                        </button>
                      </li>
                    )}
                  </ul>
                </nav>
              </>
            )}
          </>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        
      </Modal>
    </>
  );
};

export default AllContact;*/


