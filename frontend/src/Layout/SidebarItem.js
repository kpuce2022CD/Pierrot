import React from "react";

const SidebarItem = ({ menu }) => {
  return (
    <div className="sidebar-item">
      <p>{menu.name}</p>
    </div>
  );
};

export default SidebarItem;
