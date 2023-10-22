import React from "react";
import ListPackage from "../../components/package/ListPackage";

const PackageManagement = () => {
  return (
    <div className="mt-3 h-100">
      <div>
        <h6 className="mb-3">Package Management</h6>
      </div>
      <ListPackage/>
    </div>
  );
};

export default PackageManagement;
