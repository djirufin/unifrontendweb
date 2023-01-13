import { useState } from "react";

export default function Sidebar({ item, index }) {
  const [open, setOpen] = useState(false);

  if (item.childrens) {
    return (
      <>
        <li key={index} className="row" onClick={() => setOpen(!open)}>
          <div id="icon">{item.icon}</div>
          <div id="title">{item.title}</div>
        </li>
        <div className={open ? "ouvert" : "ferme"}>
          {item.childrens.map((child, index) => {
            return (
              <li
                key={index}
                className="row "
                id={window.location.pathname === child.link ? "active" : ""}
                onClick={() => {
                  window.location.pathname = child.link;
                }}
              >
                <div id="icon">{child.icon}</div>
                <div id="title">{child.title}</div>
              </li>
            );
          })}
        </div>
      </>
    );
  } else {
    return (
      <li
        key={index}
        className="row"
        id={window.location.pathname === item.link ? "active" : ""}
        onClick={() => {
          window.location.pathname = item.link;
        }}
      >
        <div id="icon">{item.icon}</div>
        <div id="title">{item.title}</div>
      </li>
    );
  }
}
