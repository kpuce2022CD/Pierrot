import Sidebar from "./Sidebar";

const Layout = (props) => {
  return (
    <div className="layout">
      <Sidebar />
      {props.children}
    </div>
  );
};

export default Layout;
