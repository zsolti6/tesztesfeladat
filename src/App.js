import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    favoriteGame: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name.match(/^[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű ]+$/)) {
      newErrors.name = "A név csak betűket tartalmazhat!";
    }
    if (!formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      newErrors.email = "Érvénytelen email cím!";
    }
    if (!formData.age.match(/^\d+$/)) {
      newErrors.age = "Az életkor csak szám lehet!";
    }
    if (formData.favoriteGame.trim() === "") {
      newErrors.favoriteGame = "A kedvenc játék nem lehet üres!";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Űrlap sikeresen elküldve!");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="w-50">
        <h2 className="mb-4 text-center">Tesztelhető Űrlap</h2>
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
          <div className="mb-3">
            <label className="form-label">Név</label>
            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
            {errors.name && <div className="text-danger">{errors.name}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Életkor</label>
            <input type="text" name="age" className="form-control" value={formData.age} onChange={handleChange} />
            {errors.age && <div className="text-danger">{errors.age}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Kedvenc játék</label>
            <input type="text" name="favoriteGame" className="form-control" value={formData.favoriteGame} onChange={handleChange} />
            {errors.favoriteGame && <div className="text-danger">{errors.favoriteGame}</div>}
          </div>
          <button type="submit" className="btn btn-primary">Küldés</button>
        </form>
      </div>
    </div>
  );
};

export default App;