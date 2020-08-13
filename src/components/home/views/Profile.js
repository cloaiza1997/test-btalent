import React from "react";

export default function Profile(props) {
  return (
    <div className="flx div-usr-create">
      <h1>Mi Perfil</h1>
      <div
        className="profile-logo"
        style={{ backgroundImage: `url(${props.user.avatar})` }}
      ></div>
      <h3>{props.user.name}</h3>
      <label>{props.user.rol}</label>
    </div>
  );
}
